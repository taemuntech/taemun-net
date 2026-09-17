#!/usr/bin/env node
// 데모 화면이 물고 있는 **남의 서버 이미지**를 우리 저장소로 가져온다.
//
// 왜: 데모 30종의 이미지가 구글 AI 스튜디오 임시 CDN(lh3.googleusercontent.com)과 images.unsplash.com
// 을 직접 물고 있다. 그 주소는 우리가 통제하지 못한다 — 만료되면 영업에 쓰는 첫 화면이 한꺼번에 빈다
// (실제로 홈 썸네일 2장이 404 가 난 적이 있다).
//
// 어디에 두느냐는 **작업물의 kind 가 정한다**(src/content/portfolio/<slug>.json):
//   proposal (실존 업체를 허락 없이 만든 시안) → private-assets/portfolio/<slug>/
//       코드에서는 /portfolio/<slug>/<파일> 로 참조한다. proxy.ts 가 이 주소를 /api/asset/… 로 돌려
//       **공개 상태를 확인하고** 내준다 — 항의가 와서 내리면 이미지도 같이 404 가 되어야 하기 때문이다.
//   그 밖(sample·service)      → public/demo-media/<slug>/
//       지어낸 브랜드는 내려도 이미지가 남아 곤란할 일이 없고, 이 경로는 proxy 매처 밖이라 CDN 이 바로
//       내준다. 한 데모에 이미지가 수십 장인데 전부 서버 함수를 거치면 페이지가 느려지고 함수 호출이
//       장당 한 번씩 난다.
//
// public/portfolio/<slug>/desktop.png·mobile.png (자동 촬영 썸네일)은 **다른 체계라 건드리지 않는다** —
// 이 스크립트는 파일을 새로 쓰기만 하고 기존 파일을 지우지 않는다.
//
// 사용법:
//   node scripts/localize-images.mjs --dry-run   계획만 표로 보여 준다(네트워크를 쓰지 않는다)
//   node scripts/localize-images.mjs --apply     내려받고 소스의 주소를 새 경로로 바꾼다
//   옵션: --concurrency=6  --timeout=45000  --only=<slug>[,<slug>]
//
// 새 의존성 없이 node 내장 fetch·fs 만 쓴다.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** 우리가 가져올 호스트 — 임시 CDN 과 무료 사진 사이트 */
const TARGET_HOSTS = new Set(["lh3.googleusercontent.com", "images.unsplash.com"]);

/** 옮기면 안 되는 호스트(실존 업체 사이트·지도·폰트·분석 등) — 발견하면 보고만 한다 */
const IGNORED_HOST_SUFFIXES = [
  "taemun.net",
  "taemun.co.kr",
  "tdocs.kr",
  "w3.org",
  "schema.org",
  "googletagmanager.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "example.com",
];

/** 훑을 자리 */
const SCAN_DIRS = ["src/components/demos", "src/app/(demos)/demo"];
const SCAN_FILES = ["src/lib/portfolio/galleryData.ts"];
const SCAN_GLOB_DIRS = ["src/content/portfolio"];
const SCAN_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".css"]);

/** 따옴표·괄호·공백에서 끊는다 — 소스 안의 URL 은 항상 그 안에 들어 있다 */
const URL_RE = /https?:\/\/[^\s'"`)\\<>]+/g;

const CONTENT_TYPE_EXT = new Map([
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/pjpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/avif", ".avif"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
]);

/** Content-Type 을 못 믿을 때 첫 바이트로 본다 */
function sniffExt(buf) {
  const b = buf.subarray(0, 16);
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return ".jpg";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return ".png";
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return ".gif";
  const riff = b.subarray(0, 4).toString("latin1");
  const webp = b.subarray(8, 12).toString("latin1");
  if (riff === "RIFF" && webp === "WEBP") return ".webp";
  if (b.subarray(4, 8).toString("latin1") === "ftyp") {
    const brand = b.subarray(8, 12).toString("latin1");
    if (brand.startsWith("avif") || brand.startsWith("avis")) return ".avif";
  }
  if (b.subarray(0, 5).toString("latin1") === "<?xml" || b.subarray(0, 4).toString("latin1") === "<svg") return ".svg";
  return null;
}

function parseArgs(argv) {
  const opts = { apply: false, dryRun: false, concurrency: 6, timeout: 45_000, only: null };
  for (const arg of argv) {
    if (arg === "--apply") opts.apply = true;
    else if (arg === "--dry-run") opts.dryRun = true;
    else if (arg.startsWith("--concurrency=")) opts.concurrency = Math.max(1, Number(arg.split("=")[1]) || 6);
    else if (arg.startsWith("--timeout=")) opts.timeout = Math.max(1000, Number(arg.split("=")[1]) || 45_000);
    else if (arg.startsWith("--only=")) opts.only = new Set(arg.split("=")[1].split(",").filter(Boolean));
    else throw new Error(`모르는 옵션: ${arg}`);
  }
  if (opts.apply === opts.dryRun) {
    throw new Error("--dry-run 또는 --apply 중 하나를 고르세요.");
  }
  return opts;
}

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && SCAN_EXTS.has(path.extname(e.name))) out.push(full);
  }
  return out;
}

async function collectSourceFiles() {
  const files = [];
  for (const d of SCAN_DIRS) files.push(...(await walk(path.join(ROOT, d))));
  for (const f of SCAN_FILES) {
    const abs = path.join(ROOT, f);
    try {
      await fs.access(abs);
      files.push(abs);
    } catch {
      /* 없으면 넘어간다 */
    }
  }
  for (const d of SCAN_GLOB_DIRS) {
    const abs = path.join(ROOT, d);
    let entries = [];
    try {
      entries = await fs.readdir(abs, { withFileTypes: true });
    } catch {
      entries = [];
    }
    for (const e of entries) {
      if (e.isFile() && SCAN_EXTS.has(path.extname(e.name))) files.push(path.join(abs, e.name));
    }
  }
  return [...new Set(files)].sort();
}

/** 작업물 종류 레지스트리 — src/content/portfolio/*.json */
async function loadRegistry() {
  const dir = path.join(ROOT, "src/content/portfolio");
  const registry = new Map();
  let entries = [];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return registry;
  }
  for (const name of entries) {
    if (!name.endsWith(".json")) continue;
    const raw = await fs.readFile(path.join(dir, name), "utf8");
    try {
      const card = JSON.parse(raw);
      const slug = typeof card.slug === "string" ? card.slug : name.replace(/\.json$/, "");
      registry.set(slug, typeof card.kind === "string" ? card.kind : "unknown");
    } catch {
      registry.set(name.replace(/\.json$/, ""), "unknown");
    }
  }
  return registry;
}

/**
 * galleryData.ts 의 항목 블록 → **문자 위치 구간**.
 * 항목의 소유 slug 는 liveDemoUrl('/demo/<slug>') 이고, 없으면 갤러리 전용 카탈로그 항목이다
 * (어느 데모에도 안 붙는다 — 보고 대상).
 *
 * ⚠️ 줄 번호로 세지 않는다. 이 저장소의 소스는 **CRLF** 인데 줄 시작 위치를 `길이+1` 로 쌓으면
 * 줄마다 1바이트씩 밀려 파일 뒤쪽에서는 항목 하나를 통째로 건너뛴다 — 실제로 갤러리 썸네일이
 * 옆 카드 주인으로 잡혔다(celebris-biopharma 썸네일이 nano-advanced 폴더로). 정규식이 준
 * 문자 위치를 그대로 쓰면 줄바꿈 종류를 아예 안 탄다.
 */
function parseGalleryEntries(text) {
  const starts = [];
  for (const m of text.matchAll(/^[ \t]{4}id:\s*'([^']+)',[ \t]*\r?$/gm)) {
    starts.push({ index: m.index, id: m[1] });
  }
  return starts.map((s, idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1].index : text.length;
    const live = /liveDemoUrl:\s*'\/demo\/([^']+)'/.exec(text.slice(s.index, end));
    return { id: s.id, start: s.index, end, demoSlug: live ? live[1] : null };
  });
}

/** 파일 경로 → 데모 slug (components/demos/<slug>/… · app/(demos)/demo/<slug>/…) */
function slugFromPath(relPosix) {
  let m = /^src\/components\/demos\/([^/]+)\//.exec(relPosix);
  if (m) return m[1];
  m = /^src\/app\/\(demos\)\/demo\/([^/]+)\//.exec(relPosix);
  if (m) return m[1];
  m = /^src\/content\/portfolio\/([^/]+)\.json$/.exec(relPosix);
  if (m) return m[1];
  return null;
}

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function isIgnoredHost(host) {
  return IGNORED_HOST_SUFFIXES.some((s) => host === s || host.endsWith(`.${s}`));
}

/** 소스에서 URL 을 전수로 찾아 occurrence 목록을 만든다 */
async function scan(files) {
  /** @type {Map<string, {url: string, occurrences: {rel: string, slug: string|null, galleryId: string|null}[]}>} */
  const targets = new Map();
  /** @type {Map<string, Set<string>>} host → 참조한 파일들 */
  const foreign = new Map();
  const fileText = new Map();

  for (const abs of files) {
    const rel = path.relative(ROOT, abs).split(path.sep).join("/");
    const text = await fs.readFile(abs, "utf8");
    fileText.set(rel, text);

    const isGallery = rel === "src/lib/portfolio/galleryData.ts";
    const galleryEntries = isGallery ? parseGalleryEntries(text) : null;

    for (const m of text.matchAll(URL_RE)) {
      const url = m[0].replace(/[.,;:]+$/, "");
      const host = hostOf(url);
      if (!host) continue;
      if (!TARGET_HOSTS.has(host)) {
        if (isIgnoredHost(host)) continue;
        if (!foreign.has(host)) foreign.set(host, new Set());
        foreign.get(host).add(rel);
        continue;
      }

      let slug = slugFromPath(rel);
      let galleryId = null;
      if (isGallery) {
        const entry = galleryEntries.find((e) => m.index >= e.start && m.index < e.end);
        if (entry) {
          galleryId = entry.id;
          slug = entry.demoSlug;
        }
      }

      if (!targets.has(url)) targets.set(url, { url, occurrences: [] });
      // index 를 같이 들고 다닌다 — 치환은 **자리 단위**로 해야 한다(아래 「같은 파일 두 자리」 주석)
      targets.get(url).occurrences.push({ rel, slug, galleryId, index: m.index, length: url.length });
    }
  }

  return { targets, foreign, fileText };
}

/**
 * 소유 데모·놓을 자리를 정한다.
 *
 * 한 URL 을 **여러 데모가 같이 쓰면 데모마다 한 장씩 복사한다.** 한 자리에 두고 서로 참조하게 두면
 * (1) 데모 하나를 지울 때 남의 화면이 깨지고 (2) 제안 시안과 샘플이 같은 URL 을 쓰는 날 시안 쪽 사본이
 * public/ 에 남는다. 몇백 KB 를 더 쓰고 **데모 폴더를 그 자체로 완결**시킨다.
 */
function planPlacement(targets, registry) {
  /** @type {Map<string, number>} owner → 지금까지 매긴 번호 */
  const counters = new Map();
  /** @type {Map<string, {url, owner, bucket, kind, isProposal, dirRel, publicPrefix, baseName, occurrences}>} */
  const plans = new Map(); // key: `${url}::${owner}`
  const shared = [];
  const unattached = [];

  const ownerOf = (occ) => {
    if (occ.slug) return { owner: occ.slug, bucket: "demo" };
    if (occ.galleryId) return { owner: occ.galleryId, bucket: "gallery" };
    return { owner: "unassigned", bucket: "gallery" };
  };

  for (const url of [...targets.keys()].sort()) {
    const entry = targets.get(url);
    const owners = new Map();
    for (const occ of entry.occurrences) {
      const { owner, bucket } = ownerOf(occ);
      if (!owners.has(owner)) owners.set(owner, { owner, bucket, occurrences: [] });
      owners.get(owner).occurrences.push(occ);
      if (bucket === "gallery") {
        unattached.push({ url, galleryId: occ.galleryId, file: occ.rel });
      }
    }
    if (owners.size > 1) shared.push({ url, owners: [...owners.keys()].sort() });

    for (const owner of [...owners.keys()].sort()) {
      const { bucket, occurrences } = owners.get(owner);
      const kind = bucket === "demo" ? (registry.get(owner) ?? "unknown") : "gallery-only";
      // proposal 만 private-assets — 나머지는 public/demo-media (자세한 이유는 파일 머리말)
      const isProposal = kind === "proposal";
      const n = (counters.get(owner) ?? 0) + 1;
      counters.set(owner, n);

      const dirRel = isProposal
        ? `private-assets/portfolio/${owner}`
        : bucket === "gallery"
          ? "public/demo-media/gallery"
          : `public/demo-media/${owner}`;
      const publicPrefix = isProposal
        ? `/portfolio/${owner}`
        : bucket === "gallery"
          ? "/demo-media/gallery"
          : `/demo-media/${owner}`;

      plans.set(`${url}::${owner}`, {
        url,
        owner,
        bucket,
        kind,
        isProposal,
        dirRel,
        publicPrefix,
        baseName: `${owner}-${String(n).padStart(2, "0")}`,
        occurrences,
      });
    }
  }

  return { plans: [...plans.values()], shared, unattached };
}

async function fetchWithRetry(url, timeout, attempts = 3) {
  let lastError = null;
  for (let i = 1; i <= attempts; i += 1) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(timeout),
        headers: {
          // 사진 CDN 은 user-agent 없는 요청을 막는 경우가 있다
          "user-agent": "Mozilla/5.0 (compatible; taemun-net-light localize-images/1.0)",
          accept: "image/avif,image/webp,image/png,image/jpeg,image/*,*/*;q=0.8",
        },
      });
      if (!res.ok) {
        lastError = `HTTP ${res.status}`;
        // 4xx 는 다시 물어도 같다 — 바로 포기한다
        if (res.status >= 400 && res.status < 500) break;
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.byteLength === 0) {
        lastError = "빈 응답(0바이트)";
        continue;
      }
      const ctype = (res.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
      const ext = CONTENT_TYPE_EXT.get(ctype) ?? sniffExt(buf);
      if (!ext) {
        lastError = `이미지가 아님 (content-type: ${ctype || "없음"})`;
        break;
      }
      return { buf, ext, ctype };
    } catch (err) {
      lastError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    }
    if (i < attempts) await new Promise((r) => setTimeout(r, 500 * i));
  }
  return { error: lastError ?? "알 수 없는 실패" };
}

async function runPool(items, concurrency, worker) {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    for (;;) {
      const i = cursor;
      cursor += 1;
      if (i >= items.length) return;
      await worker(items[i], i);
    }
  });
  await Promise.all(runners);
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function printTable(rows, headers) {
  const widths = headers.map((h, i) => Math.max(stringWidth(h), ...rows.map((r) => stringWidth(String(r[i] ?? "")))));
  const line = (cells) => cells.map((c, i) => pad(String(c ?? ""), widths[i])).join("  ");
  console.log(line(headers));
  console.log(widths.map((w) => "-".repeat(w)).join("  "));
  for (const r of rows) console.log(line(r));
}

/** 한글은 두 칸을 먹는다 — 표가 어긋나지 않게 */
function stringWidth(s) {
  let w = 0;
  for (const ch of s) w += /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹯＀-｠￠-￦]/.test(ch) ? 2 : 1;
  return w;
}
function pad(s, w) {
  return s + " ".repeat(Math.max(0, w - stringWidth(s)));
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const files = await collectSourceFiles();
  const registry = await loadRegistry();
  const { targets, foreign, fileText } = await scan(files);
  let { plans, shared, unattached } = planPlacement(targets, registry);

  if (opts.only) plans = plans.filter((p) => opts.only.has(p.owner));

  const occurrenceCount = plans.reduce((n, p) => n + p.occurrences.length, 0);
  const uniqueUrls = new Set(plans.map((p) => p.url)).size;
  console.log(
    `훑은 파일 ${files.length}개 · 외부 이미지 URL ${uniqueUrls}종 (참조 ${occurrenceCount}곳) · 저장할 파일 ${plans.length}장 (공유 URL 은 데모마다 한 장씩)`,
  );
  console.log("");

  // ── 데모별 계획 표 ──
  const perOwner = new Map();
  for (const p of plans) {
    if (!perOwner.has(p.owner)) perOwner.set(p.owner, { owner: p.owner, kind: p.kind, dirRel: p.dirRel, publicPrefix: p.publicPrefix, count: 0, bytes: 0, failed: 0 });
    perOwner.get(p.owner).count += 1;
  }

  if (opts.dryRun) {
    printTable(
      [...perOwner.values()].map((o) => [o.owner, o.kind, o.count, o.dirRel, `${o.publicPrefix}/${o.owner}-01.<ext>`]),
      ["데모(소유)", "kind", "장수", "저장 위치", "코드에서 쓸 주소"],
    );
    console.log("");
    console.log(`합계 ${plans.length}장 · 확장자는 --apply 때 응답 Content-Type 으로 정합니다.`);
  } else {
    // ── 내려받기 ──
    const failures = [];
    const done = [];
    /** @type {Map<string, Promise<{buf?: Buffer, ext?: string, error?: string}>>} */
    const fetchCache = new Map();
    let downloaded = 0;
    await runPool(plans, opts.concurrency, async (plan) => {
      const dirAbs = path.join(ROOT, plan.dirRel);
      // 이미 받아 둔 파일이 있으면 다시 받지 않는다(재실행 대비)
      let existing = null;
      try {
        for (const name of await fs.readdir(dirAbs)) {
          if (name.startsWith(`${plan.baseName}.`)) existing = name;
        }
      } catch {
        /* 폴더가 아직 없다 */
      }
      if (existing) {
        const stat = await fs.stat(path.join(dirAbs, existing));
        plan.fileName = existing;
        plan.bytes = stat.size;
        done.push(plan);
        downloaded += 1;
        process.stdout.write(`\r받는 중 ${downloaded}/${plans.length}   `);
        return;
      }

      // 같은 URL 을 여러 데모가 쓰면 **한 번만 받아** 데모마다 한 장씩 쓴다
      // (동시에 도는 일꾼이 같은 URL 을 겹쳐 받지 않게 결과가 아니라 약속을 캐시한다)
      if (!fetchCache.has(plan.url)) fetchCache.set(plan.url, fetchWithRetry(plan.url, opts.timeout));
      const result = await fetchCache.get(plan.url);
      if (result.error) {
        failures.push({ url: plan.url, owner: plan.owner, reason: result.error, files: [...new Set(plan.occurrences.map((o) => o.rel))] });
      } else {
        await fs.mkdir(dirAbs, { recursive: true });
        plan.fileName = `${plan.baseName}${result.ext}`;
        await fs.writeFile(path.join(dirAbs, plan.fileName), result.buf);
        plan.bytes = result.buf.byteLength;
        done.push(plan);
      }
      downloaded += 1;
      process.stdout.write(`\r받는 중 ${downloaded}/${plans.length}   `);
    });
    process.stdout.write("\r");

    // ── 치환 ── 실패한 URL 은 **원래 주소 그대로 둔다**(깨진 링크로 바꿔치우지 않는다)
    //
    // ⚠️ 같은 파일 두 자리: galleryData.ts 에는 **같은 URL 이 두 항목에 들어 있는데 주인이 서로 다른**
    // 경우가 있다(데모에 붙은 카드 + 실행 화면 없는 카탈로그 카드). 파일 전체를 문자열 치환하면 먼저
    // 처리한 주인의 경로가 두 자리를 다 먹고, 나머지 한 장은 아무도 안 쓰는 고아 파일이 된다.
    // 그래서 **자리(index) 단위로 뒤에서부터** 바꾼다.
    const replacementsByFile = new Map();
    for (const plan of done) {
      const newPath = `${plan.publicPrefix}/${plan.fileName}`;
      for (const occ of plan.occurrences) {
        if (!replacementsByFile.has(occ.rel)) replacementsByFile.set(occ.rel, []);
        replacementsByFile.get(occ.rel).push({ index: occ.index, length: occ.length, url: plan.url, newPath });
      }
      perOwner.get(plan.owner).bytes += plan.bytes;
    }

    let replaced = 0;
    for (const [rel, list] of [...replacementsByFile.entries()].sort()) {
      let text = fileText.get(rel);
      // 뒤에서부터 — 앞자리를 바꿔도 뒷자리의 index 가 안 밀린다
      for (const r of list.sort((a, b) => b.index - a.index)) {
        if (text.slice(r.index, r.index + r.length) !== r.url) {
          throw new Error(`치환 자리가 어긋났습니다: ${rel} @${r.index}`);
        }
        text = text.slice(0, r.index) + r.newPath + text.slice(r.index + r.length);
        replaced += 1;
      }
      await fs.writeFile(path.join(ROOT, rel), text, "utf8");
    }

    for (const f of failures) {
      const o = perOwner.get(f.owner);
      if (o) o.failed += 1;
    }

    printTable(
      [...perOwner.values()].map((o) => [o.owner, o.kind, o.count - o.failed, o.failed || "", formatBytes(o.bytes), o.dirRel]),
      ["데모(소유)", "kind", "받음", "실패", "용량", "저장 위치"],
    );
    const totalBytes = [...perOwner.values()].reduce((n, o) => n + o.bytes, 0);
    console.log("");
    console.log(`받은 파일 ${done.length}장 · 총 ${formatBytes(totalBytes)} · 소스 치환 ${replaced}곳 (파일 ${replacementsByFile.size}개)`);

    if (failures.length > 0) {
      const byUrl = new Map();
      for (const f of failures) {
        if (!byUrl.has(f.url)) byUrl.set(f.url, { ...f, owners: new Set(), files: new Set(f.files) });
        byUrl.get(f.url).owners.add(f.owner);
        for (const r of f.files) byUrl.get(f.url).files.add(r);
      }
      console.log("");
      console.log(`⚠️ 실패 ${byUrl.size}건 — 원래 주소를 그대로 두었습니다(깨진 링크로 바꿔치우지 않습니다):`);
      for (const f of byUrl.values()) {
        console.log(`  · [${[...f.owners].join(", ")}] ${f.reason}`);
        console.log(`    ${f.url}`);
        console.log(`    ${[...f.files].join(", ")}`);
      }
    }
  }

  if (shared.length > 0) {
    console.log("");
    console.log(`ℹ️ 여러 데모가 같은 URL 을 쓴다 ${shared.length}건 — 데모마다 한 장씩 복사했습니다:`);
    for (const c of shared) console.log(`  · ${c.owners.join(", ")}`);
  }

  if (unattached.length > 0) {
    const byId = new Map();
    for (const u of unattached) byId.set(u.galleryId ?? "(미상)", (byId.get(u.galleryId ?? "(미상)") ?? 0) + 1);
    console.log("");
    console.log(
      `ℹ️ 어느 데모에도 안 붙는 이미지 ${unattached.length}장 / 항목 ${byId.size}개 — 갤러리 카탈로그 전용 카드(실행 화면이 없어 liveDemoUrl 이 없다)라 public/demo-media/gallery 로 보냈습니다:`,
    );
    for (const [id, n] of [...byId.entries()].sort()) console.log(`  · ${id} — ${n}장`);
  }

  if (foreign.size > 0) {
    console.log("");
    console.log(`ℹ️ 옮기지 않은 그 밖의 외부 호스트 ${foreign.size}종 (실존 업체·지도 등 — 보고만):`);
    for (const [host, refs] of [...foreign.entries()].sort()) {
      console.log(`  · ${host} — ${[...refs].join(", ")}`);
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exitCode = 1;
});
