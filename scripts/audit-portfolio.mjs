#!/usr/bin/env node
// 포트폴리오 입고 검사 — npm run audit:portfolio [-- --base http://localhost:3055] [--strict <slug>]
//
// 규칙의 정본은 src/lib/portfolio/schema.ts 다. 여기서는 그 모듈을 그대로 불러 쓰고(Node 24 타입 제거 실행),
// 규칙을 복제하지 않는다. 이 스크립트가 더하는 건 「파일 밖」 사실 — 페이지 폴더·썸네일 파일·샘플 소스·실측 응답.
//
// 종료코드: ERROR 가 하나라도 있으면 1, WARN 만 있으면 0. --strict <slug> 면 그 샘플의 WARN 도 ERROR 로 센다.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// schema.ts 는 package.json 에 "type" 이 없어 ESM 재해석 경고가 한 줄 뜬다 — 그 경고만 삼킨다.
process.removeAllListeners("warning");
process.on("warning", (w) => {
  if (w.code === "MODULE_TYPELESS_PACKAGE_JSON") return;
  console.warn(`${w.name}: ${w.message}`);
});

const { validatePortfolioItem, thumbnailOf, BANNED_PHRASES } = await import("../src/lib/portfolio/schema.ts");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "portfolio");
const DEMOS_DIR = path.join(ROOT, "src", "app", "(demos)", "demo");
const SITE_DEMO_DIR = path.join(ROOT, "src", "app", "(site)", "demo");
/**
 * 샘플 화면 코드 폴더 — 표준은 src/components/demos/<slug>/ (얇은 서버 page + <Slug>App.tsx, 골든 샘플 atelier-vaucluse).
 * src/components/demo/<slug>/ 는 옛 위치(lithium-foil). 두 곳 모두 폴더 이름이 slug 와 같아야 검사 범위에 들어간다.
 */
const COMPONENT_DEMO_DIRS = [path.join(ROOT, "src", "components", "demos"), path.join(ROOT, "src", "components", "demo")];
const PUBLIC_DIR = path.join(ROOT, "public");
/** 상태를 보고 내주는 자산(제안 시안 썸네일·업체 원본 이미지) — public/ 밖에 둔다 */
const PRIVATE_ASSETS_DIR = path.join(ROOT, "private-assets");

/** (demos) 루트 레이아웃이 공용 제안 시안 고지를 렌더하는가 — 렌더하면 데모별 문구를 따로 요구하지 않는다 */
const LAYOUT_PROPOSAL_DISCLAIMER = (() => {
  try {
    const layout = fs.readFileSync(path.join(ROOT, "src", "app", "(demos)", "layout.tsx"), "utf8");
    return layout.includes("<DemoDisclaimer");
  } catch {
    return false;
  }
})();
const SITE_DEFAULT_TITLE = "홈페이지 제작 & 웹·앱 개발 외주 전문";
const DEMOS_DEFAULT_TITLE = "샘플 사이트 — 태문 DEV STUDIO";
/** 사이트 틀(다크) 문구 검사 대상 — 게이트가 샘플만 보면 사이트 페이지의 과장 문구가 어디에도 안 걸린다 */
const SITE_COPY_DIRS = [path.join(ROOT, "src", "app", "(site)")];
const SITE_COPY_FILES = [
  path.join(ROOT, "src", "components", "Header.tsx"),
  // 헤더 드롭다운 문구(회사 이름·배지·설명)는 Header.tsx 에서 이 파일로 옮겼다 — 검사 범위도 같이 옮긴다.
  // 안 넣으면 실존 업체에 대한 단정 표현이 어디에도 안 걸린다.
  path.join(ROOT, "src", "lib", "portfolio", "header-links.ts"),
  // 홈 분류 머리의 바로가기 문구(회사 이름·라벨)도 같은 이유로 HomeView.tsx 에서 이 파일로 옮겼다
  // (청크 누수를 막느라 옮긴 것이라, 안 넣으면 옮긴 순간 그 문구들이 어느 검사에도 안 걸린다).
  path.join(ROOT, "src", "lib", "portfolio", "home-shortcuts.ts"),
  path.join(ROOT, "src", "components", "FloatingChatWidget.tsx"),
  path.join(ROOT, "src", "app", "api", "inquiry", "route.ts"),
];

// ───────── 인자 ─────────
const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`포트폴리오 입고 검사

사용법
  npm run audit:portfolio                                         정적 검사만
  npm run audit:portfolio -- --base http://localhost:3055         정적 검사 + 떠 있는 서버 실측 (포트는 띄운 서버에 맞춘다)
  npm run audit:portfolio -- --base http://localhost:3055 --strict haneul-dental
                                                                  그 샘플(카드·소스·실측)의 WARN 도 ERROR 로 센다 — 입고할 땐 이걸로

정적 검사 — ERROR
  - src/content/portfolio/*.json 규격 (schema.ts validatePortfolioItem)
  - liveUrl /demo/<slug> 의 페이지 폴더 존재 · kind=sample 인데 (site) 아래에 있음
  - page.tsx 가 "use client" · metadata 없음 · sampleMetadata/SAMPLE_SLUG/SampleNotice 의 slug·industry 가 카드와 다름
  - kind=proposal 인데 SampleNotice 에 kind="proposal" 이 없음 · 화면 안(components/demos/<slug>)에 제안 시안 고지가 없음
  - page.tsx 가 다른 slug 의 컴포넌트 폴더(@/components/demos/<다른 slug>/)를 import
  검사 범위: src/app/(demos)/demo/<slug>/** + src/components/demos/<slug>/** (+ 옛 위치 src/components/demo/<slug>/**)
  - 카드 JSON 이 git 추적 대상이 아님(카드 없는 데모가 커밋된다)
  - 실존 기관·기업·매체 이름 · 실존 저널 접두사를 쓴 DOI · 조회 가능한 식별번호(사업자등록번호·종목코드·등록번호·면허번호)
    → kind=sample(가상 브랜드)에서 ERROR, kind=proposal(그 회사 자신의 정보)에서는 WARN
  - 데모가 참조하는 /public 파일이 proxy 의 matcher 밖(내려도 그대로 열린다 — 태문 자체 자산 /images·/fonts 는 제외)
    · kind=sample 이 **자기** /demo-media/<자기 slug>/ 에 둔 이미지는 면제(일부러 게이트 밖 — CDN 이 바로 내준다)
    · kind=proposal 은 면제 없음 — /demo-media/ 에 두면 그대로 ERROR (private-assets/portfolio/<slug>/ 로)
  - kind=sample 데모의 기기 전환 툴바 client= 에 가상 브랜드 표시가 없음(툴바가 「클라이언트: …」로 찍는다)
  - 폼인데 SampleNotice 를 렌더하지 않음(같은 샘플의 다른 파일이 열어도 — onSubmit 을 props 로 받는 폼만 WARN)
  - SampleNotice 의 open 상태를 true 로 만드는 setter 호출이 없음
  - 가짜 접수 문구(「접수되었습니다」「예약이 완료되었습니다」「전송되었습니다」…)
  - 외부 전송: fetch( · axios · "/api/" · sendBeacon · XMLHttpRequest · WebSocket · EventSource
               · formspree/getform/formsubmit/web3forms/emailjs · <form action="http…"> · 폼 내용을 실은 mailto
  - fixed 이면서 top-0 인 요소(className 여러 줄·cn()·템플릿 리터럴·style position:"fixed"+top:0 포함) — 샘플 바에 가려진다
정적 검사 — WARN
  - 카드 JSON 없는 (demos)/demo 폴더 · 페이지·카드 없는 components/demos 폴더(slug 오타) · 썸네일 파일 없음 · 샘플 카드에 thumbnail/featured/order
  - proposal 카드 summary 에 「실제 계약·납품한 사례가 아니다」 취지 문장이 없음
  - 실존처럼 보이는 전화(하이픈·점·공백·괄호·붙여 쓴 번호·tel:)·대표번호·사업자번호·이메일 · mailto 링크
  - sticky 이면서 top-0 · fixed inset-y-0 · z-[9000 이상] · data-sample-local 폼에 신청·예약·문의 버튼
  - localStorage/sessionStorage 저장 · 「접수 완료」 같은 상태 문구 · 폼 없이 「예약하기」 버튼인데 SampleNotice 없음
  - 실적 수치(1,200건·만족도 98%·ISO 9001·2주 완성 — 파일에 「예시 수치」가 있으면 면제) · 보장·최상급 · 금지 표현
  - 화면에 샘플·시안 고지가 없음(가상 브랜드 샘플 문구 또는 실존 업체 제안 시안 문구) · 접수 폼 파일에 「전송되지 않습니다」 제출 전 고지가 없음
  - 사이트 페이지((site)·Header·FloatingChatWidget·문의 API) 문구의 과장·약속 표현
  - 데모 공용 파일(src/components/demos/*.tsx — 기기 전환 툴바)의 100%·무결점·최상급 문구
  - 외부 이미지 호스트 직접 참조(핫링크) — 데모 하나당 한 줄로 개수만
안 잡는 것 (눈으로 본다)
  - 이미지 속 글자·실존 업체 사진 · 브랜드명이 실존하는지 · 변수에 담아 조립한 전화번호·주소
  - 헤더를 fixed 로 두고 top 을 JS 로 계산하는 경우 · 버튼 onClick 이 다른 파일 함수로 가짜 성공 화면을 여는 경우
실측 (--base) — ERROR
  - 상태 200 · 기본 제목이 아님 · 사이트 페이지(/ · /portfolio · /inquiry)는 canonical·og:url 이 자기 주소
  - 샘플은 noindex · 상단 태문 표시(기기 전환 툴바 또는 SampleSiteBar) 있음 · 사이트 틀의 dark class·JSON-LD 없음
  - kind=proposal 은 HTML 에 제안 시안 고지 문구가 실려 있음
  - 페이지 안 <img> 주소 응답 (페이지당 최대 30개, 8초)                           WARN

종료코드: ERROR 있으면 1, WARN 만 있으면 0`);
  process.exit(0);
}
function argValue(name) {
  const i = argv.indexOf(name);
  if (i !== -1) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith(`${name}=`));
  return eq ? eq.slice(name.length + 1) : undefined;
}
const baseArg = argValue("--base");
const BASE = baseArg ? baseArg.replace(/\/+$/, "") : null;
if (baseArg !== undefined && !/^https?:\/\/[^/]+/.test(baseArg)) {
  console.error(`--base 값 「${baseArg}」 가 http(s):// 주소가 아닙니다`);
  process.exit(2);
}
const strictArg = argValue("--strict") ?? argValue("--strict-slug");
if ((argv.includes("--strict") || argv.includes("--strict-slug")) && !strictArg) {
  console.error("--strict 뒤에 slug 를 적으세요 (여러 개면 쉼표로)");
  process.exit(2);
}
const STRICT_SLUGS = new Set((strictArg ?? "").split(",").map((s) => s.trim()).filter(Boolean));

// ───────── 보고 모음 ─────────
/** @type {Map<string, Array<{level: "ERROR" | "WARN", msg: string}>>} */
const report = new Map();
/** 보고 키 → 샘플 slug (--strict 승격용) */
const keySlug = new Map();
const rel = (p) => path.relative(ROOT, p).split(path.sep).join("/");
function add(fileKey, level, msg) {
  if (!report.has(fileKey)) report.set(fileKey, []);
  report.get(fileKey).push({ level, msg });
}
const error = (f, m) => add(f, "ERROR", m);
const warn = (f, m) => add(f, "WARN", m);

// ───────── 1. 카드 JSON ─────────
/**
 * 형·가온이 고른 홈 대표작 샘플 — 공장 샘플은 featured/order 를 넣지 않는다(6장).
 * 여기 없는 샘플 카드에 featured/order 가 있으면 WARN.
 */
const CURATED_SAMPLE_SLUGS = new Set(["atelier-vaucluse", "lithium-foil", "maison"]);

/** 카드 summary 에 「계약·납품한 사례가 아니다」 취지가 있는지 — schema 는 「제안용 시안」이라는 말만 ERROR 로 본다 */
const PROPOSAL_SUMMARY_NOT_A_CASE =
  /실제 계약|계약·납품|납품한 사례가 아니|납품 사례가 아니|의뢰한 사이트도? 아니|의뢰하거나 만든 사이트가 아니/;

const cards = []; // { file, slug, item }  — 규격 통과 여부와 무관하게 읽힌 것
/** 카드 JSON 의 글(제목·부제·요약·기능) — 패턴 상수가 정의된 뒤에 공용 텍스트 검사로 돌린다 */
const cardCopyQueue = [];
if (!fs.existsSync(CONTENT_DIR)) {
  warn(rel(CONTENT_DIR), "포트폴리오 폴더가 없습니다 — 카드 0개로 검사합니다");
}
const jsonFiles = fs.existsSync(CONTENT_DIR)
  ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json")).sort()
  : [];
/** 파일 이름 기준 slug — JSON 문법 오류로 못 읽은 카드도 들어간다(「카드 JSON 을 만드세요」 오안내 방지) */
const jsonSlugs = new Set(jsonFiles.map((f) => f.replace(/\.json$/, "")));
for (const f of jsonFiles) {
  const full = path.join(CONTENT_DIR, f);
  const key = rel(full);
  const slug = f.replace(/\.json$/, "");
  keySlug.set(key, slug);
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(full, "utf8").replace(/^﻿/, ""));
  } catch (e) {
    error(key, `JSON 문법 오류 — ${e.message}`);
    continue;
  }
  for (const m of validatePortfolioItem(raw, slug)) error(key, m);
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    cards.push({ file: full, key, slug, item: raw });
    const isFactorySample = raw.kind === "sample" && typeof raw.liveUrl === "string" && raw.liveUrl.startsWith("/demo/");
    if (isFactorySample && raw.thumbnail !== undefined) {
      warn(key, "샘플 카드에 thumbnail 칸이 있습니다 — capture:thumbs 가 이 카드를 건너뜁니다. 칸을 지우면 /portfolio/<slug>/desktop.png 를 씁니다");
    }
    if (isFactorySample && !CURATED_SAMPLE_SLUGS.has(slug) && (raw.featured !== undefined || raw.order !== undefined)) {
      warn(key, "샘플 카드에 featured/order 가 있습니다 — 홈 대표작·순서는 형·가온이 고릅니다. 칸을 지우세요");
    }
    // 카드에 적힌 글도 데모 소스와 같은 잣대로 본다 — 예전에는 카드 JSON 이 구조 검사와 금지 표현 4개만 통과하고
    // 실존 기관·기업명·DOI·사업자등록번호·종목코드 검사에는 한 번도 들어가지 않았다.
    // (검사 자체는 패턴 상수들이 정의된 뒤에 돌린다 — 여기서 부르면 초기화 전 접근이라 죽는다.)
    cardCopyQueue.push({
      key,
      kind: raw.kind,
      fields: [
        ["title", raw.title],
        ["subtitle", raw.subtitle],
        ["summary", raw.summary],
        ...(Array.isArray(raw.features) ? raw.features.map((f, n) => [`features[${n}]`, f]) : []),
      ].filter(([, v]) => typeof v === "string"),
    });

    // 제안용 시안 카드 — schema 는 「제안용 시안」이라는 말만 ERROR 로 본다. 한 걸음 더: 「계약·납품한 사례가 아니다」도 적는 게 좋다
    if (raw.kind === "proposal" && typeof raw.summary === "string" && !PROPOSAL_SUMMARY_NOT_A_CASE.test(raw.summary)) {
      warn(
        key,
        "제안용 시안 summary 에 「실제 계약·납품한 사례가 아니고 해당 회사가 의뢰한 것도 아니다」 취지 문장이 없습니다 — 카드만 읽고 지나가는 사람이 구축 사례로 읽습니다",
      );
    }
  }
}

// ───────── 2·3. 페이지 폴더 ─────────
const listDirs = (dir) =>
  fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort() : [];
const demosSlugs = listDirs(DEMOS_DIR);
const siteDemoSlugs = listDirs(SITE_DEMO_DIR);

/** slug → { dir, group } (page.tsx 가 있는 곳 우선, (demos) 먼저) */
function findDemoPage(slug) {
  for (const [dir, group] of [
    [path.join(DEMOS_DIR, slug), "demos"],
    [path.join(SITE_DEMO_DIR, slug), "site"],
  ]) {
    if (fs.existsSync(path.join(dir, "page.tsx"))) return { dir, group };
  }
  return null;
}

/** 소스 검사 대상: { slug, dir, group, kind, card } */
const sampleSources = [];
const cardSlugs = new Set(cards.map((c) => c.slug));
for (const c of cards) {
  const url = typeof c.item.liveUrl === "string" ? c.item.liveUrl : "";
  if (!url.startsWith("/demo/")) continue;
  const target = url.slice("/demo/".length).replace(/[/?#].*$/, "");
  const page = target ? findDemoPage(target) : null;
  if (!page) {
    error(c.key, `liveUrl 「${url}」 의 페이지가 없습니다 — src/app/(demos)/demo/${target}/page.tsx 를 만드세요`);
    continue;
  }
  if (page.group === "site" && c.item.kind === "sample") {
    error(
      c.key,
      `샘플인데 페이지가 src/app/(site)/demo/${target}/ 에 있습니다 — 사이트 틀의 다크 class·JSON-LD 를 물려받고 샘플 바가 없습니다. (demos)/demo/ 로 옮기세요(git mv)`,
    );
  }
  sampleSources.push({ slug: target, dir: page.dir, group: page.group, kind: c.item.kind, card: c.item });
}
for (const slug of demosSlugs) {
  if (cardSlugs.has(slug)) continue;
  const dir = path.join(DEMOS_DIR, slug);
  keySlug.set(rel(dir), slug);
  if (!jsonSlugs.has(slug)) {
    warn(rel(dir), `카드 JSON 이 없어 포트폴리오 목록에 안 보입니다 — src/content/portfolio/${slug}.json 을 만드세요`);
  }
  if (fs.existsSync(path.join(dir, "page.tsx"))) sampleSources.push({ slug, dir, group: "demos", kind: "sample", card: null });
}

// ───────── 4. 썸네일 파일 ─────────
for (const c of cards) {
  if (typeof c.item.slug !== "string") continue;
  let th;
  try {
    th = thumbnailOf(c.item);
  } catch {
    continue;
  }
  const missing = [];
  for (const [label, p] of [
    ["desktop", th?.desktop],
    ["mobile", th?.mobile],
  ]) {
    if (typeof p !== "string") continue;
    if (/^https?:\/\//.test(p)) continue; // 외부 주소는 실측(--base)에서만 본다
    // 상태를 따라야 하는 썸네일(제안 시안)은 public/ 밖(private-assets/)에 있고 주소만 그대로다 —
    // 두 곳을 다 본다. 한 곳만 보면 「내려도 열리는 파일」을 고친 뒤 이 검사가 거짓으로 짖는다.
    const rel = p.replace(/^\/+/, "");
    const inPublic = fs.existsSync(path.join(PUBLIC_DIR, rel));
    const privateRel = rel.startsWith("portfolio/") ? rel : `company/${rel}`;
    const inPrivate = fs.existsSync(path.join(PRIVATE_ASSETS_DIR, privateRel));
    if (!inPublic && !inPrivate) missing.push(`${label} public${p.startsWith("/") ? "" : "/"}${p}`);
  }
  if (missing.length) {
    const hint =
      c.item.thumbnail === undefined && typeof c.item.liveUrl === "string" && c.item.liveUrl.startsWith("/demo/")
        ? `npm run capture:thumbs -- --only ${c.item.slug} 실행`
        : "이미지를 해당 경로에 넣으세요";
    warn(c.key, `썸네일 파일 없음 (${missing.join(", ")}) — ${hint}`);
  }
}

// ───────── 5. 샘플 소스 ─────────
function walkSources(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) out.push(...walkSources(full));
    else if (/\.(tsx|ts|jsx|js)$/.test(d.name)) out.push(full);
  }
  return out.sort();
}

const blank = (s) => s.replace(/[^\n]/g, " ");

/**
 * 코드 검사용 — 주석을 같은 길이의 공백으로 지운다(줄 번호 유지). 주석 속 옛 코드·설명이 걸리지 않게.
 * 줄 끝 주석(`code // 설명`)까지 지우므로 JSX 텍스트 속 ` // ` 뒤도 지워진다 → 글자 검사에는 쓰지 않는다.
 */
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/(^|[\s;,{}()])(\/\/.*)$/gm, (_, pre, c) => pre + blank(c));
}

/**
 * 글자 검사용(전화·이메일·금지 표현·접수 문구) — 블록 주석과 「줄 전체가 주석」인 줄만 지운다.
 * `<span>대표번호 // 02-…</span>` 처럼 JSX 텍스트에 ` // ` 가 있어도 뒤 글자가 검사에서 빠지지 않는다.
 * 대신 코드 뒤에 붙인 줄 끝 주석의 전화번호는 걸린다(샘플엔 주석에도 실번호를 적지 않는다).
 */
function stripCommentsForText(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/^([ \t]*)(\/\/.*)$/gm, (_, pre, c) => pre + blank(c));
}

/** 인덱스 → 1부터 세는 줄 번호 */
function lineIndexer(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === "\n") starts.push(i + 1);
  return (idx) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= idx) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };
}

// ── 문자열 리터럴 모으기(className 속성값·cn() 인자·템플릿 리터럴) ──
function readQuoted(src, j, q) {
  for (let k = j + 1; k < src.length; k++) {
    if (src[k] === "\\") {
      k++;
      continue;
    }
    if (src[k] === q || src[k] === "\n") return k;
  }
  return src.length;
}
function readTemplate(src, j) {
  const parts = [];
  let buf = "";
  for (let k = j + 1; k < src.length; k++) {
    const ch = src[k];
    if (ch === "\\") {
      buf += src[k + 1] ?? "";
      k++;
      continue;
    }
    if (ch === "`") {
      parts.push(buf);
      return { end: k, parts };
    }
    if (ch === "$" && src[k + 1] === "{") {
      parts.push(buf);
      buf = "";
      const r = scanExpr(src, k + 1, "{", "}");
      parts.push(...r.lits);
      k = r.end;
      continue;
    }
    buf += ch;
  }
  parts.push(buf);
  return { end: src.length, parts };
}
/** src[i] 가 open 인 괄호식을 닫는 곳까지 읽고, 안의 문자열 리터럴 내용을 모은다 */
function scanExpr(src, i, open, close) {
  let depth = 0;
  const lits = [];
  for (let j = i; j < src.length; j++) {
    const ch = src[j];
    if (ch === '"' || ch === "'") {
      const end = readQuoted(src, j, ch);
      lits.push(src.slice(j + 1, end));
      j = end;
      continue;
    }
    if (ch === "`") {
      const r = readTemplate(src, j);
      lits.push(...r.parts);
      j = r.end;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return { end: j, lits };
    }
  }
  return { end: src.length, lits };
}
/** 클래스 문자열 묶음: { text, index } — 한 묶음 안에서 fixed·top-0 을 같이 찾는다 */
function classGroups(src) {
  const groups = [];
  for (const m of src.matchAll(/\bclassName\s*=\s*/g)) {
    const i = m.index + m[0].length;
    const ch = src[i];
    if (ch === '"' || ch === "'") {
      const end = src.indexOf(ch, i + 1); // JSX 속성 문자열은 여러 줄일 수 있다
      groups.push({ text: src.slice(i + 1, end < 0 ? undefined : end), index: m.index });
    } else if (ch === "{") {
      groups.push({ text: scanExpr(src, i, "{", "}").lits.join(" "), index: m.index });
    }
  }
  for (const m of src.matchAll(/\b(?:cn|clsx|classnames|classNames|twMerge|twJoin|cva)\s*\(/g)) {
    const i = m.index + m[0].length - 1;
    groups.push({ text: scanExpr(src, i, "(", ")").lits.join(" "), index: m.index });
  }
  // 변수·객체 값으로 둔 한 줄 클래스 문자열
  for (const m of src.matchAll(/(["'`])((?:(?!\1)[^\\\n]|\\.)*)\1/g)) groups.push({ text: m[2], index: m.index });
  return groups;
}
/** Tailwind 토큰의 바탕 이름 (lg:fixed → fixed, !top-0 → top-0) */
function classBases(text) {
  const out = new Set();
  for (const tok of text.split(/\s+/)) {
    if (!tok) continue;
    // 임의 변형([&_x]:y)은 마지막 조각만, 그 외 변형 접두(lg:·hover:)도 마지막 조각만
    const base = tok.replace(/^.*:(?![^[]*\])/, "").replace(/^!/, "");
    out.add(base);
  }
  return out;
}

const SEQ_FREE = true; // 자리표시는 같은 숫자 반복(0000)과 010-1234-5678 만 인정한다
const sameDigits = (s) => /^(\d)\1*$/.test(s);
const PHONE_AREA = "02|0[3-6][1-5]|01[016789]|070";
const TAEMUN_PHONE_DIGITS = "01086726463";
function isPlaceholderPhone(area, mid, last) {
  if (sameDigits(mid) && sameDigits(last)) return true;
  // 입력칸 placeholder 관례 — 휴대폰 010-1234-5678 한 가지만
  return SEQ_FREE && area.startsWith("01") && mid === "1234" && last === "5678";
}
/** 한 줄에서 전화번호 후보를 뽑는다: [{ shown, area, mid, last }] */
function phoneCandidates(line) {
  const out = [];
  const seen = new Set();
  const push = (shown, area, mid, last, at) => {
    if (seen.has(at)) return;
    seen.add(at);
    out.push({ shown, area, mid, last });
  };
  // 구분자(하이픈·점·공백·괄호). 「02. 548. 9210」처럼 **점 뒤에 공백**이 오는 표기도 잡는다 —
  // 구분자를 한 글자로 묶어 두었더니 haus-space 푸터의 실존 국번 전화가 통째로 빠져나갔다(실측).
  const sep = new RegExp(`(?<![\\d.\\-])\\(?(${PHONE_AREA})\\)?(?:[-.]\\s?|\\s)(\\d{3,4})(?:[-.]\\s?|\\s)(\\d{4})(?![\\d\\-])`, "g");
  for (const m of line.matchAll(sep)) push(m[0], m[1], m[2], m[3], m.index);
  // 붙여 쓴 번호 (0212345678 · tel:01012345678)
  const joined = new RegExp(`(?<![\\w.\\-])((?:${PHONE_AREA})\\d{7,8})(?![\\w])`, "g");
  for (const m of line.matchAll(joined)) {
    const d = m[1];
    const areaLen = d.startsWith("02") ? 2 : 3;
    const mid = d.slice(areaLen, -4);
    if (mid.length < 3 || mid.length > 4) continue;
    push(m[0], d.slice(0, areaLen), mid, d.slice(-4), m.index);
  }
  return out;
}

/**
 * 폼 검사 면제 — 파일에 data-sample-local 을 붙일 수 없는(담당 밖) 기존 샘플만, 사유를 적어 올린다.
 * 면제해도 WARN 으로 남겨 목록이 잊히지 않게 한다. 새 샘플은 여기 넣지 말고 파일에 표시할 것.
 */
const LOCAL_FORM_EXEMPTIONS = {
  "src/components/demo/lithium-foil/screens/RollLogForm.tsx":
    "롤 일지 입력 폼 — 제출값은 브라우저 안 DemoDataContext 에만 들어가 KPI·관리도를 다시 계산한다(외부 전송·「접수됐다」 문구 없음)",
};
/**
 * fixed top-0 면제 — 담당 밖 파일이라 고칠 수 없고, 바깥에서 보정해 둔 경우만. WARN 으로 남긴다.
 */
const FIXED_HEADER_EXEMPTIONS = {
  "src/components/demo/lithium-foil/DemoApp.tsx":
    "사이트 틀 시절 헤더 — (demos)/demo/lithium-foil/page.tsx 래퍼가 top 을 샘플 바 높이만큼 내려 준다. DemoApp 이 top-[var(--sample-bar-h,0px)] 를 쓰게 바뀌면 목록에서 지울 것",
};

const PLACEHOLDER_EMAIL_DOMAIN = /(^|\.)(example\.(com|net|org|kr|co\.kr)|example|test|invalid|localhost)$/i;
const IMAGE_TLD = /\.(png|jpe?g|webp|svg|gif|avif|ico)$/i;
/** 가짜 접수 성공 문구 — 문장형(되었/됐)만 ERROR. 같은 줄에 부정(않·아닙)이 있으면 안내문으로 보고 넘긴다 */
const FAKE_SUCCESS = /(접수|예약|신청|전송|발송|주문)(?:이|가)?\s*(?:정상적?으로\s*)?(?:접수|완료)?\s*(?:되었|됐)/;
const STATUS_DONE = /(접수|신청|예약|주문)\s*완료/;
const NEGATION = /않|아닙|안 됩|없습니다/;
const SUBMIT_WORDS = /신청|예약|문의|상담|접수|주문|가입|구매|결제/;
const FAKE_BUTTON = /(신청|예약|접수|주문|결제|구매)\s*(하기|완료|확정)/;
// 실적처럼 읽히는 수치. 예전에는 「N건·N명·만족도 N%·ISO NNNN·N주 완성」만 봐서, 기업 랜딩 10종이 실제로 쓰는
// 수율·감축률·IRR·AUM·설비 용량은 **한 줄도** 걸리지 않았다(실측: FIGURES 로 걸린 줄 0건).
// 2026-09-17 보강(의료 6종): 수량 단위에 「례|케이스|증례」가 없어 「18,000+ 케이스」·「84,000례」가
// 한 줄도 걸리지 않았다. 「18,000+」처럼 숫자와 단위 사이에 오는 + 도 함께 건넌다.
const FIGURES =
  /\d{1,3}(?:,\d{3})+\s*\+?\s*(?:건|명|개사|곳|세대|개|례|케이스|증례)|\d{3,}\s*\+?\s*(?:건|개사|세대|례|증례)|\d{2,}\s*개?\s*리뷰|리뷰\s*\d{2,}\s*개|★\s*\d(?:\.\d+)?|별점\s*\d(?:\.\d+)?|만족도\s*\d+(?:\.\d+)?\s*%|재구매율\s*\d+|ISO\s*\d{4,5}|\d+\s*(?:주|일|개월)\s*(?:만에\s*)?완성|\d+(?:\.\d+)?\s*%\s*(?:수율|절감|감축|저감|향상|단축|개선|증가|상승|감소|달성)|(?:수율|가동률|정시율|회수율)\s*\d+(?:\.\d+)?\s*%|\b(?:Net\s*)?IRR\b\s*[:=]?\s*\d|\bAUM\b\s*[:=]?\s*\d|\d+(?:\.\d+)?\s*조\s*원/;
// 대소문자를 가리지 않는다 — 「GLOBAL NO.1」 은 히어로 배지에서 대문자로 쓰여 소문자 규칙을 그냥 지나갔다(실측).
// 「1위」·「#1」·「점유율 1위」 같은 순위 주장도 같은 부류라 같이 본다.
const GUARANTEE = /보장|보증합니다|책임 보증|\bNo\.?\s?1\b|#\s?1\b|넘버원|최고의|무조건|(?<![\d.])1\s*위(?![원험])/i;
// 화면에 남아 있어야 하는 고지. 가상 브랜드 샘플(「실제 업체가 아닙니다」)과
// 실존 업체 제안 시안(「제안용으로 만든 시안 · 의뢰하거나 만든 사이트가 아닙니다」)은 문장이 다르다 — 둘 다 인정한다.
const SAMPLE_DISCLOSURE =
  /가상 브랜드|가상 데이터|가상의|샘플 사이트|샘플입니다|실제 (?:업체|회사|병원|매장|기업)가 아니|제안용으로 만든 시안|제안용 시안입니다|의뢰하거나 만든 사이트가 아니/;
/**
 * kind=proposal 전용 고지 — 실존 회사 이름이 걸린 화면이라 「가상 브랜드 샘플」 문구로는 대신할 수 없다.
 * 「그 회사가 만들었거나 의뢰한 사이트가 아니다」가 화면 글자로 남아 있어야 한다(schema.ts PROPOSAL_DISCLAIMER 와 같은 취지).
 */
// 「제안용 시안입니다」 한 마디는 인정하지 않는다 — 폼 위 안내 한 줄만 있어도 통과해 버린다.
// 「그 회사가 만들었거나 의뢰한 것이 아니다」라는 말이 실제로 화면에 있어야 한다.
// 「아니며」와 「아닙니다」는 음절이 달라 「아니」 하나로는 「아닙니다」를 못 잡는다 — 둘 다 적는다(실측에서 걸렸다).
const PROPOSAL_DISCLOSURE = /(?:의뢰하거나 만든|만들었거나 의뢰한|만들거나 의뢰한)\s*사이트(?:가|도)?\s*(?:아니|아닙)/;
const PRE_SUBMIT_NOTICE = /전송되지 않|접수되지 않/;
const EXTERNAL_FORM_SERVICE = /formspree|getform\.io|formsubmit\.co|web3forms|emailjs|staticforms|basin\.com/i;

// ───────── 실존 기관·식별번호 (2026-09-16 추가) ─────────
//
// 왜 넣었나(실측): 가상 브랜드 샘플 6종에 실존 대기업이 「고객사 로고」로, 실존 대학·규제기관이 자문단
// 약력으로, 실존 저널의 진짜 DOI 접두사가 논문 목록으로 들어와 있었는데 이 검사는 **경고를 한 건도**
// 내지 않았다. 「초록불 = 검사했는데 깨끗하다」가 아니라 「그 범주를 아예 안 봤다」였다.
//
// 종류에 따라 세기가 다르다:
// - kind=sample(가상 브랜드) → ERROR. 없는 회사가 실존 기업·기관의 이름을 빌리면 무단 사칭·허위 레퍼런스다.
// - kind=proposal(실존 업체 제안 시안) → WARN. 그 회사 자신의 이름·번호는 시안에 있는 게 자연스럽다.
//
// ⚠️ 이름표를 늘릴 때는 **짧고 흔한 토막**(LG·SK·SEMI 같은 두세 글자)을 그냥 넣지 말 것 —
//    다른 낱말 안에서 걸려 거짓 양성이 된다. 경계(\b)나 뒷말까지 묶어서 적는다.
const REAL_ORG_PATTERNS = [
  { re: /삼성(?:전자|SDI|디스플레이|바이오|물산|중공업)?\b/, why: "실존 기업명" },
  { re: /\bSAMSUNG\b/i, why: "실존 기업명" },
  { re: /SK\s?(?:하이닉스|이노베이션|온|H-SEMIC)|하이닉스/i, why: "실존 기업명" },
  { re: /LG\s?(?:전자|에너지솔루션|화학|디스플레이|EN-SOL)/i, why: "실존 기업명" },
  { re: /\bTSMC\b|\bASML\b|\bINTEL\b|\bNVIDIA\b/i, why: "실존 기업명" },
  { re: /셀트리온|\bCELLTRION\b/i, why: "실존 기업명" },
  { re: /현대자동차|기아자동차|포스코|\bPOSCO\b/i, why: "실존 기업명" },
  { re: /\bSpaceX\b|\bArianespace\b|\bFalcon[ -]?9\b|\bAriane[ -]?6\b|\bNASA\b|\bESA\b/i, why: "실존 발사업체·우주기관" },
  { re: /\bFDA\b|\bEMA\b|\bMFDS\b|식품의약품안전처|유럽 의약품청/i, why: "실존 규제기관" },
  { re: /\bODAC\b|희귀의약품\(ODD\) 지정|Fast[ -]?Track\s+Designat/i, why: "실존 규제 제도의 지정 실적" },
  { re: /서울대|연세대|고려대|카이스트|\bKAIST\b|존스홉킨스|Johns\s?Hopkins|\bMIT\b|하버드|\bHarvard\b|\bStanford\b/i, why: "실존 대학·연구기관" },
  { re: /Nature\s+Medicine|Cancer\s+Discovery|\bThe\s+Lancet\b|\bNEJM\b/i, why: "실존 학술지" },
  { re: /ELLE\s?(?:DÉCOR|DECOR)|ARCHITECTURAL\s+DIGEST|모노클|\bWALLPAPER\*/i, why: "실존 매체" },
  { re: /한남\s?더\s?힐|타워팰리스|롯데월드타워/i, why: "실존 건축물·단지" },
  { re: /한국거래소|\bKRX\b|산업통상자원부|금융감독원|\bDART\b\s*(?:전자공시|Verified)|dart\.fss\.or\.kr/i, why: "실존 기관·공시 시스템" },
  { re: /\bITAR\b|\bFCC\b\s|\bITU\b\s|\bK-ETS\b|\bTÜV\b|TUV\s?Rheinland/i, why: "실존 제도·인증기관" },
  // 2026-09-17 보강: 갤러리 카드 설명에 실존 호텔·해운·오디오·미식 가이드 브랜드가 그대로 박혀 있었다.
  // 「○○ 감성」·「○○ 스타일」처럼 비유로 쓰더라도 지어낸 브랜드의 소개글에 실존 상표를 얹는 것은 같은 문제다.
  { re: /\bAman\b|\bCheval\s?Blanc\b|슈발\s?블랑|\bFour\s?Seasons\b|\bRitz[- ]?Carlton\b|\bBanyan\s?Tree\b|아만리조트/i, why: "실존 호텔·리조트 브랜드" },
  { re: /미쉐린|미슐랭|\bMichelin\b/i, why: "실존 미식 가이드" },
  { re: /\bMaersk\b|머스크|\bCMA\s?CGM\b/i, why: "실존 선사·인물" },
  { re: /\bBang\s*&\s*Olufsen\b|\bB&O\b|\bBose\b|\bSonos\b|\bDevialet\b/i, why: "실존 오디오 브랜드" },
  // 2026-09-17 보강 ②(커머스 10종): 이 범주가 통째로 비어 있어서 가장 위험한 데모들이 경고 **0건**으로
  // 통과했다. 국내 커머스 플랫폼이 카드 설명에 「○○ 스타일」로 박히고, 실존 단체(EWG)가 기능 이름이 되고,
  // 현존 자기 제조사의 제품이 진품으로 팔리고, 실존 GPU·CPU **제품 라인 이름**이 지어낸 브랜드의 사양표에
  // 들어와 있었다. 기업 이름만 세면 제품 라인 이름은 한 번도 걸리지 않는다.
  { re: /무신사|\b29\s?CM\b|마켓컬리|올리브영|다나와|쿠팡|오늘의집|지그재그|에이블리|\bSSG\s?닷컴/i, why: "실존 커머스 플랫폼" },
  { re: /\bEWG\b|Environmental\s+Working\s+Group/i, why: "실존 환경단체(성분 등급) — 자체 기준이면 「자체 클린 등급」으로" },
  // 「마이센 양식(Meissen-Style)」·「세브르 지역」처럼 양식·지역 표기는 정직한 쓰임이라 뺀다.
  { re: /마이센(?!\s*양식)|\bMeissen\b(?!-?\s?Style)|세브르(?!\s*(?:양식|지역))|\bS[èe]vres\b(?!-?\s?Style)/i, why: "현존하는 자기 제조사 — 진품 단정 대신 「○○ 양식(-Style)」으로" },
  { re: /에르메스|\bHerm[èe]s\b|샤넬|\bChanel\b|루이\s?비통|\bLouis\s?Vuitton\b|구찌|\bGucci\b|프라다|\bPrada\b|롤렉스|\bRolex\b|까르띠에|\bCartier\b|디올|\bDior\b|버킨|\bBirkin\b/i, why: "실존 명품 하우스" },
  { re: /\bRTX\s?\d{3,4}|\bGTX\s?\d{3,4}|\bGeForce\b|\bRadeon\b|\bRX\s?\d{4}\b|Core\s?Ultra\s?\d|\bRyzen\b|(?<!트)라이젠|\bi[3579]-\d{4,5}\b|\bThunderbolt\s?\d|썬더볼트|\bGDDR6X\b|\bZen\s?\d\b/i, why: "실존 기업의 제품 라인 이름 — 「외장 GPU 16GB」·「USB4 40Gbps」처럼 일반 규격으로" },
  // 2026-09-17 보강 ③(의료 6종): 이 범주가 통째로 비어 있어서 **가장 위험한** 데모 6종이 문구 경고 0건으로
  // 통과했다. 실측으로 나온 것들: 실존 상급종합병원 4곳을 「(가상 협력망)」 딱지만 붙여 협력 기관으로 내세운 줄,
  // 전문의약품 성분명(싸이모신 알파-1·미슬토)을 암 진료 카드 제목으로 건 줄, 관절강 주사 제품명(콘쥬란) 한 줄.
  // 병원 이름은 지명이 붙어 변형되므로(「서초 성모 …」) **고유한 토막**을 본다.
  {
    re: /서울대병원|분당서울대|서울아산|아산병원|세브란스|성모병원|서울성모|강남성모|여의도성모|삼성서울병원|국립암센터|서울백병원|경희의료원|아주대병원|고대안암|고대구로|한양대병원|건국대병원|중앙대병원|차병원/,
    why: "실존 의료기관 — 지어낸 병원에 실존 병원의 이름·협력 관계를 붙이지 않습니다",
  },
  {
    re: /(?:서울대|연세대|고려대|한양대|경희대|가톨릭대|성균관대|울산대|아주대|인제대|순천향대|중앙대|이화여대|전남대|부산대|경북대)\s*(?:의과대학|의대|치과대학|한의과대학|의학전문대학원)/,
    why: "실존 의과대학 — 지어낸 의료진에 실존 대학 직함을 붙이지 않습니다",
  },
  {
    re: /대한(?:의사|치과의사|한의사|성형외과|피부과|안과|정형외과|신경외과|산부인과|소아청소년과|내과|외과|비뇨의학|이비인후과|마취통증의학|영상의학|재활의학)\s*(?:학회|협회|의사회)|의료기관평가인증원|상급종합병원\s*지정|보건복지부\s*지정/,
    why: "실존 학회·평가기관·정부 지정 — 지어낸 병원이 소속·인증을 주장하지 않습니다",
  },
  {
    re: /자이스|\bZEISS\b|비쥬맥스|\bVisuMax\b|아마리스|인모드|\bInMode\b|써마지|\bThermage\b|울쎄라|\bUlthera(?:py)?\b|슈링크|인비절라인|\bInvisalign\b|스트라우만|\bStraumann\b|오스템\s?임플란트|덴티움|루트로닉|올리지오|볼뉴머|포텐자|피코슈어|피코웨이|\bAccuvue\b|아큐브/i,
    why: "실존 의료기기·장비 브랜드 — 「고주파(RF) 장비」·「집속초음파 장비」처럼 일반 명칭으로",
  },
  {
    re: /콘쥬란|리쥬란|쥬베룩|스컬트라|\bSculptra\b|엘란쎄|쥬비덤|\bJuv[eé]derm\b|레스틸렌|\bRestylane\b|보톡스|\bBotox\b|미슬토|싸이모신|자닥신|이뮨셀|키트루다|옵디보|아바스틴|허셉틴/i,
    why: "실존 의약품·전문의약품 이름 — 일반인 대상 광고가 약사법으로 금지됩니다. 성분 일반명이나 「(진료 후 결정)」으로",
  },
];

/**
 * 실존 **기준·인증 제도** 이름 — WARN 이다(ERROR 가 아니다).
 *
 * 왜 세기를 낮추나: 지어낸 브랜드가 「AAFCO 급여기준 참고 (예시 표기)」처럼 기준 이름을 **참고 표기로** 쓰는 것은
 * 이 저장소가 인정하는 쓰임이다(실측: paws-tail 은 「인증서를 발급하는 기관이 아닙니다」까지 지면에 적어 뒀다).
 * 막아야 하는 건 그 표시가 **없는 채로** 인증·등급을 받은 것처럼 읽히는 쪽이라, 앞뒤 2줄에 「예시」가 있으면
 * 넘어가고 없을 때만 짚는다(FIGURES 와 같은 면제 규칙).
 */
const REAL_STANDARD_PATTERNS = [
  { re: /\bAAFCO\b|\bFEDIAF\b/i, why: "실존 사료 영양기준 단체 — 개별 제품에 인증서를 내지 않습니다" },
  { re: /유기농\s?인증|무항생제|친환경\s?인증|비건\s?인증|크루얼티\s?프리|Leaping\s?Bunny|\bKC\s?인증/i, why: "실존 인증 제도" },
  { re: /1\+\+|축산물품질평가원/, why: "정부 공인 축산물 등급" },
];
/** 실존 저널의 진짜 등록 접두사를 쓴 가짜 DOI — 자리표시(00.0000/…)는 걸리지 않는다 */
const REAL_DOI = /\b10\.\d{4,9}\/[^\s"'`<>]+/;
/** 조회 가능한 식별번호 — 없는 회사가 달고 있으면 실존 번호와 부딪힌다 */
const FAKE_IDENTIFIERS = [
  { re: /\bKOSPI\b\s*\d{6}|\bKOSDAQ\b\s*\d{6}|종목코드\s*[:：]?\s*\d{6}/, why: "거래소가 실제로 발급하는 6자리 종목코드" },
  // 사업자등록번호는 위의 전용 검사가 따로 본다(여기서 두 번 짖지 않게).
  { re: /(?<!사업자)등록번호\s*[:：]\s*([A-Z0-9][A-Z0-9-]{4,})/, why: "제도 등록번호 — 조회 가능한 값일 수 있습니다" },
  { re: /등록면허\s*[:：]\s*\S+\s*제\d{4}-\d+호/, why: "지자체가 실제로 발급하는 면허번호 형식" },
  { re: /통신판매업신고\s*[:：]\s*제\d{4}-/, why: "실제로 발급되는 신고번호 형식" },
  // 2026-09-17 보강(의료): 건강보험공단·심평원·보건소가 실제로 발급하는 번호들이다.
  // 지어낸 병원이 달고 있으면 실존 기관의 번호와 부딪힌다. 0 으로만 채운 자리표시는 위 sameDigits 검사가 넘긴다.
  { re: /요양기관\s*(?:기호|번호)\s*[:：]?\s*(\d[\d-]{5,})/, why: "건강보험 요양기관 기호 — 조회 가능한 번호입니다" },
  { re: /의(?:사|료인)?\s*면허\s*(?:번호)?\s*[:：]?\s*(?:제\s*)?(\d{3,})/, why: "실제로 발급되는 의사면허번호" },
  {
    re: /의료기관\s*(?:개설)?\s*(?:신고|허가)\s*(?:번호)?\s*[:：]?\s*(?:제\s*)?(\d{2,}[\d-]*)/,
    why: "보건소가 실제로 발급하는 개설신고번호",
  },
];

/**
 * 의료광고 규칙 — **kind=sample 이면서 의료 계열인 데모에만** 건다(아래 isMedicalDemo).
 *
 * 왜 따로 두나(실측 2026-09-17): 의료 6종을 넣고 `node scripts/audit-portfolio.mjs` 를 돌렸더니
 * 「ERROR 0 · WARN 98」인데 그 여섯에서 나온 경고는 썸네일 경로 3건뿐이고 **문구 경고는 0건**이었다.
 * 검사기에 의료 범주가 통째로 없었기 때문이다 — 초록불이 「봤는데 깨끗하다」가 아니라 「안 봤다」였다.
 *
 * 왜 의료에만 거나: 「완치」·「이벤트」·「후기」는 다른 업종에서는 정상적인 낱말이다(커머스 후기 구역·행사 안내).
 * 의료법 제56조 제2항과 제27조 제3항이 금지하는 것은 **의료광고**에서의 그 주장이라, 범위를 의료로 좁혀야
 * 다른 업종에 거짓 양성을 내지 않는다.
 *
 * ⚠️ 낱말이 아니라 **주장**을 본다. 「부작용이 있을 수 있습니다」 같은 고지 문장이 「부작용」만 보고 걸리면
 *    고지를 적은 쪽이 벌을 받는다 — 그래서 효과 단정은 「없/무/100%」가 붙은 모양만 잡고,
 *    같은 줄에 「단정하지·보장하지·싣지 않습니다」 류의 부정이 있으면 규칙 설명문으로 보고 넘긴다.
 */
const MEDICAL_DISCLAIMER_NEGATION = /단정하지|보장하지|장담하지|싣지 않|쓰지 않|적지 않|하지 않습니다|아닙니다|아니며|없습니다만/;

const MEDICAL_RULES = [
  {
    id: "testimonial",
    // 의료법 제56조 제2항 제2호 — 치료경험담 광고는 명시적 금지다. 「후기」 홀로는 안 본다(너무 흔하다).
    re: /(?:환자|치료|시술|수술|진료|고객|내원)\s*(?:후기|리뷰|체험담|사례담|스토리)|치료\s*경험담|리얼\s*후기|생생한\s*후기|\b후기\s*이벤트\b/,
    why: "치료경험담·환자 후기 광고는 의료법 제56조 제2항이 금지합니다. 구역을 없애거나 진료 안내·자주 묻는 질문으로 바꾸세요",
  },
  {
    id: "guarantee",
    // 치료 효과 보장·단정. 「무통」은 통증이 없다는 절대 단정이라 같은 부류로 본다.
    // 「통증 없는 관절의 움직임」처럼 형용사로 쓰인 이상(理想) 표현까지 잡으면 규칙이 소음이 된다.
    // 약속으로 읽히는 꼴 — 「…없이」·「…없습니다」·「무통」·「부작용 없는 시술」 — 만 본다.
    re: /완치(?!\s*(?:를|가)?\s*(?:보장|약속)하지)|부작용\s*(?:이|은|도)?\s*(?:전혀\s*)?없(?:이|습니다|는\s*(?:시술|수술|치료|주사))|무통(?!증\s*의학)|통증\s*(?:이|은)?\s*(?:전혀\s*)?없(?:이|습니다)|흉터\s*(?:가|는)?\s*(?:전혀\s*)?없(?:이|습니다)|재발\s*(?:이|은)?\s*없(?:이|습니다|는)|재발을\s*막|100\s*%\s*(?:성공|완치|만족|안전)|반드시\s*(?:낫|좋아|개선|회복)|영구적으로\s*(?:유지|지속)/,
    why: "치료 효과를 단정·보장하는 표현은 의료법 제56조 제2항 제2호 위반입니다. 「통증 저감」·「재발 위험을 낮추는 것을 목표로」처럼 단정을 지우세요",
  },
  {
    id: "comparison",
    // 다른 의료기관과의 비교 — GUARANTEE 가 1위·최고를 보므로 여기서는 비교·유일·최다만 본다.
    re: /(?:타|다른)\s*(?:병원|의원|치과|한의원|클리닉)\s*(?:대비|보다|과\s*달리)|타원\s*(?:대비|보다)|업계\s*유일|국내\s*유일|유일한\s*(?:병원|의원|치과|한의원)|최다\s*(?:시술|수술|증례|케이스|건수)/,
    why: "다른 의료기관과의 비교·유일·최다 표현은 의료법 제56조 제2항이 금지합니다",
  },
  {
    id: "inducement",
    // 환자 유인(의료법 제27조 제3항). 가격표 자체는 되지만 할인·이벤트 형태는 안 된다.
    re: /선착순|무료\s*(?:시술|수술|체험|치료)|\d+\s*%\s*할인|(?:비급여|진료비|시술비|수술비|성형|교정|임플란트|레이저)[^\n]{0,14}할인|이벤트\s*(?:가격|가\b|진행|중|특가)|특가\s*이벤트|반값\s*(?:시술|수술|이벤트)|\b1\s*\+\s*1\b/,
    why: "비급여 진료비 할인·이벤트·선착순은 환자 유인 행위(의료법 제27조 제3항)입니다. 가격표는 두되 할인·이벤트 형태는 지우세요",
  },
];

/**
 * 전후 사진 구역을 가리키는 표시 — 있으면 같은 파일에 부작용·개인차 고지가 함께 있어야 한다.
 * `before-after-cases` 같은 **앵커 id** 는 이동 링크일 뿐 사진이 아니라서 세지 않는다(실측: onsaemiro 헤더가
 * 그 id 하나로 ERROR 를 냈다). 그래서 영문형은 하이픈으로 이어진 식별자를 빼고 낱말 사이 구분자만 허용한다.
 */
const MEDICAL_BEFORE_AFTER =
  /비포\s*[·&/]?\s*애프터|(?<![-\w])before\s*(?:[·&/]|and)?\s*after(?![-\w])|전후\s*(?:사진|비교|이미지|슬라이더)|시술\s*전\s*[·/]\s*후|수술\s*전\s*[·/]\s*후/i;

/** 「개인차」를 그 낱말로만 찾으면 「사람마다 달라질 수 있고」로 제대로 적은 고지가 걸린다 — 뜻으로 본다 */
const MEDICAL_VARIATION_NOTICE = /개인차|개인에 따라|사람마다|환자(?:의)?\s*상태에 따라|경과가 다르|달라질 수 있|다를 수 있/;

/**
 * 이 데모가 의료 계열인가.
 *
 * 정본은 **갤러리 카드의 category: 'medical'** 이다 — 사람이 이미 분류해 둔 값이라 다음 배치의 새 의료
 * 데모도 자동으로 들어온다. 카드 JSON 의 industry 는 쓸 수 없었다(의료 6종이 전부 "corporate" 였다 — 실측).
 *
 * ⚠️ 낱말 개수로 세는 방식은 **버렸다**. 「진료·처방·병원·시술」을 세니 반려동물 처방식 커머스(paws-tail)가
 *    의료로 잡혀 「15% 할인」이 환자 유인으로 ERROR 가 났다(실측). 업종을 잘못 잡으면 규칙이 아니라 소음이 된다.
 */
/**
 * 갤러리 카드에서 「이 분류에 속한 데모 slug」를 모은다 — 의료·인테리어 규칙의 **범위 정본**.
 *
 * ⚠️ 예전 방식(`category …[\s\S]{0,2000}?… liveDemoUrl` 한 방 정규식)은 **조용히 카드를 흘렸다**.
 *    갤러리에는 liveDemoUrl 이 없는 카드(화면 없는 참고 카드)가 섞여 있어서, 그런 카드의 category 가
 *    **다음 카드의** liveDemoUrl 을 집어삼키고 lastIndex 를 그 뒤로 옮겨 버린다. 그래서 그 다음 카드는
 *    분류를 잃는다(실측 2026-09-18: chemical-reactor-portal 이 atelier-vaucluse 의 주소를 먹어
 *    인테리어 11종 중 atelier-vaucluse 하나가 통째로 규칙 밖에 있었다).
 *    → liveDemoUrl 을 기준으로 잘라, **그 앞 토막의 마지막 category** 를 그 데모의 분류로 읽는다.
 */
function slugsByGalleryCategory(wanted) {
  const out = new Set();
  let src;
  try {
    src = stripComments(fs.readFileSync(path.join(ROOT, "src", "lib", "portfolio", "galleryData.ts"), "utf8"));
  } catch {
    return out; // 못 읽으면 각 규칙의 폴백만 쓴다
  }
  let cursor = 0;
  for (const m of src.matchAll(/liveDemoUrl\s*:\s*["'`]\/demo\/([a-z0-9-]+)["'`]/g)) {
    const before = src.slice(cursor, m.index);
    cursor = m.index + m[0].length;
    const cats = [...before.matchAll(/category\s*:\s*["'`](\w+)["'`]/g)];
    if (cats.length && cats[cats.length - 1][1] === wanted) out.add(m[1]);
  }
  return out;
}

const MEDICAL_SLUGS = slugsByGalleryCategory("medical");

/** 폴백 — 갤러리에 아직 안 올라온 새 데모용. 카드 제목·부제에 의료기관 이름이 있으면 의료로 본다. */
const MEDICAL_TITLE = /병원|의원\b|치과|한의원|클리닉|메디컬\s?센터|성형외과|피부과|안과|정형외과|산부인과|이비인후과/;
const NOT_HUMAN_MEDICAL = /반려동물|수의|동물병원|펫\b/;

function isMedicalDemo(slug, card) {
  if (MEDICAL_SLUGS.has(slug)) return true;
  const head = `${card?.title ?? ""} ${card?.subtitle ?? ""}`;
  return MEDICAL_TITLE.test(head) && !NOT_HUMAN_MEDICAL.test(`${head} ${card?.summary ?? ""}`);
}

/**
 * 의료 데모 전용 문구 검사 — 이 데모가 의료 계열일 때만 부른다.
 *
 * ⚠️ 부정은 **줄 단위로 보면 안 된다**. 「…치료경험담·환자 후기, 시술 전후\n비교 사진 … 싣지 않습니다」처럼
 *    고지 한 문장이 여러 줄에 걸치면, 금지어가 있는 줄에는 부정이 없어서 **고지를 제대로 적은 쪽이** 걸린다
 *    (실측: boncho·seoul-barun 푸터의 의료광고 고지 두 곳이 그렇게 ERROR 가 났다). 앞뒤 2줄까지 함께 본다.
 */
function scanMedicalCopy(key, textLines, flag) {
  const fileText = textLines.join("\n");
  const negatedNear = (i) => textLines.slice(Math.max(0, i - 2), i + 3).some((l) => MEDICAL_DISCLAIMER_NEGATION.test(l));
  textLines.forEach((line, i) => {
    const at = `${i + 1}행`;
    if (negatedNear(i)) return;
    for (const r of MEDICAL_RULES) {
      const m = line.match(r.re);
      if (m) flag(key, `${at}: 의료광고 「${m[0]}」 — ${r.why}`);
    }
  });
  // 전후 사진은 「같은 화면에」 부작용·개인차 고지가 있어야 한다. 파일 단위로 본다.
  // 「실제 수술 전후 사진이 아닙니다」처럼 전후 사진이 **아니라고** 적은 줄은 대상이 아니다.
  const baLine = textLines.findIndex((l) => MEDICAL_BEFORE_AFTER.test(l) && !MEDICAL_DISCLAIMER_NEGATION.test(l));
  const ba = baLine >= 0 ? textLines[baLine].match(MEDICAL_BEFORE_AFTER) : null;
  if (ba && !(/부작용/.test(fileText) && MEDICAL_VARIATION_NOTICE.test(fileText))) {
    flag(
      key,
      `${baLine + 1}행: 전후(Before/After) 비교 「${ba[0].slice(0, 30)}」 — 같은 화면에 「예시 이미지 · 개인차가 있으며 부작용이 있을 수 있습니다」 고지가 없습니다`,
    );
  }
}

/**
 * 인테리어·공간디자인 규칙 — **kind=sample 이면서 인테리어 계열인 데모에만** 건다(아래 isInteriorDemo).
 *
 * 왜 따로 두나(실측 2026-09-18): 인테리어 11종을 넣고 `node scripts/audit-portfolio.mjs` 를 돌렸더니
 * 그 열한 종에서 나온 지적이 **0건**이었다. 검사기에 인테리어 범주가 통째로 없었기 때문이다.
 *
 * 왜 인테리어에만 거나: 「보증」·「평당」·「무상」은 다른 업종에서 정상적인 낱말이다(제품 보증 안내·평당 단가표가
 * 있는 부동산·건자재 커머스). 시공 계약 조건으로 읽히는 건 **공간 시공을 파는 지면**에서라, 범위를 좁혀야
 * 다른 업종에 거짓 양성을 내지 않는다. 판정 정본은 의료 규칙과 같은 방식 — 갤러리 카드의 category 다.
 *
 * ⚠️ 낱말이 아니라 **주장**을 본다. 「무상 보증 같은 약속은 하지 않습니다」처럼 **부정**을 적은 고지 문장이
 *    걸리면 제대로 적은 쪽이 벌을 받는다(의료 규칙 때 처음 12건 중 6건이 그런 거짓 양성이었다).
 *    그래서 앞뒤 2줄에 부정·예시 표시가 있으면 넘긴다.
 */
const INTERIOR_NEGATION =
  /단정하지|보장하지|약속하지|쓰지 않|적지 않|싣지 않|하지 않습니다|아닙니다|아니며|없습니다만|지어낸|가상|예시|자리표시/;

const INTERIOR_RULES = [
  {
    id: "brand",
    // 실존 가구·조명·자재·설비 브랜드. **구별되는 표기만** 넣는다 —
    // 「놀」·「헤이」·「무토」 같은 짧은 한글 음차는 일반 낱말과 겹쳐 거짓 양성이 된다.
    re: /허먼\s?밀러|Herman\s?Miller|비트라(?!지)|\bVitra\b|USM\s?할러|프리츠\s?한센|Fritz\s?Hansen|루이스\s?폴센|Louis\s?Poulsen|톰\s?딕슨|Tom\s?Dixon|아르텍\b|\bArtek\b|까시나|카시나|\bCassina\b|미노티|\bMinotti\b|폴리폼|\bPoliform\b|B&B\s?Italia|\bMolteni\b|\bKnoll\b|\bKartell\b|크바드라트|\bKvadrat\b|플로스\s?조명|\bFLOS\b|아르테미데|\bArtemide\b|\bGUBI\b|듀라빗|\bDuravit\b|그로헤|\bGROHE\b|한스그로헤|\bHansgrohe\b|도른브라흐트|\bDornbracht\b|콜러\s?(?:수전|위생도기)|\bKohler\b|\bTOTO\s?(?:위생도기|변기|수전)|아메리칸\s?스탠다드|포셀라노사|\bPorcelanosa\b|\bBoffi\b|\bBulthaup\b|가게나우|\bGaggenau\b|\bMiele\b|서브제로|\bSub-?Zero\b|한샘|현대리바트|리바트\b|이케아|\bIKEA\b|벤자민\s?무어|Benjamin\s?Moore|던\s?에드워드|Dunn-?Edwards|\bFarrow\s?&\s?Ball\b|노루페인트|삼화페인트|KCC\s?(?:글라스|창호|실리콘)|LX\s?하우시스|이건창호|\bJUNG\b\s?스위치|르그랑|\bLegrand\b|필립스\s?휴|\bPhilips\s?Hue\b/i,
    why:
      "실존 가구·조명·자재·설비 브랜드 — 지어낸 스튜디오가 실존 브랜드를 적으면 제휴·공식 취급처로 읽힙니다. " +
      "「덴마크산 펜던트 조명」·「유럽산 위생도기」처럼 계열·산지로 적으세요",
  },
  {
    id: "award",
    // 실존 건축·디자인 수상·매체. 「iF」·「AD」 처럼 짧은 것은 뒤에 오는 말까지 묶어야 거짓 양성이 안 난다.
    re: /(?:한국)?건축문화대상|공간문화대상|서울시\s?건축상|김수근\s?건축상|레드닷|Red\s?Dot|iF\s?(?:디자인|Design)\s?(?:어워드|Award)|IDEA\s?(?:디자인\s?)?어워드|\bIDEA\s?Design\s?Award\b|German\s?Design\s?Award|Dezeen\s?Award|디젠\s?어워드|엘르\s?데코|ELLE\s?DECO|아키텍처럴?\s?다이제스트|Architectural\s?Digest|월페이퍼\s?매거진|Wallpaper\*|굿디자인\s?(?:마크|어워드)|GD\s?마크|우수디자인\s?선정/i,
    why: "실존 수상·매체 이름 — 지어낸 스튜디오의 수상·보도 이력으로 쓰지 않습니다. 구역을 없애거나 「가상 수상 설정(예시)」로 명시하세요",
  },
  {
    id: "license",
    // 실내건축공사업 등록증·건설업 면허 번호. 「강남 제2015-18호」 같은 모양이 실제로 나왔다.
    re: /(?:실내건축(?:공사업)?|건설업|전문건설업|종합건설업)[^\n]{0,20}(?:등록|면허)[^\n]{0,10}(?:제\s*)?\d[\d-]*\s*호?|제\s*\d{4}\s*-\s*\d+\s*호/,
    why: "조회 가능한 면허·등록번호 형식 — 실존 업체를 가리킬 수 있습니다. 「등록번호 표기 자리 (예시)」로 두세요",
  },
  {
    id: "warranty",
    // 하자보수 보증은 계약 조건이다. 기간·범위·면책을 안 적은 약속은 분쟁을 만든다.
    re: /무상\s*(?:하자\s*)?(?:보수|보증|A\/?S)|\d+\s*년\s*(?:간\s*)?(?:무상\s*)?(?:하자\s*)?(?:보수|보증)|하자\s*보증\s*\d+\s*년|평생\s*(?:무상\s*)?(?:보증|보수|A\/?S)|하자\s*(?:를)?\s*(?:100\s*%|전액)\s*(?:보상|책임)/,
    why: "하자보수 보증 약속은 계약 조건입니다. 기간·범위·면책 없이 적으면 분쟁이 됩니다. 「하자보수 절차 안내 (예시)」처럼 조건 설명으로 바꾸세요",
  },
  {
    id: "unitprice",
    // 평단가 단정은 표시광고법상 실체가 있어야 한다. 범위·예시로 적으면 통과한다(아래 예외 처리).
    re: /평당\s*[\d,]+\s*만?\s*원|㎡\s*당\s*[\d,]+\s*만?\s*원|[\d,]+\s*만\s*원\s*\/\s*평/,
    why: "평단가 단정 — 실체가 있어야 쓸 수 있습니다. 「평당 300~400만 원 (예시 범위)」처럼 범위·예시로 적으세요",
  },
];

/** 평단가는 「부터·~·범위·예시」가 붙으면 단정이 아니다 — 앞뒤 2줄에서 함께 본다 */
const INTERIOR_PRICE_RANGE = /부터|[~〜]|범위|예상|예시|안팎|내외/;

/**
 * 이 데모가 인테리어·공간디자인 계열인가.
 * 정본은 **갤러리 카드의 category: 'interior'** — 사람이 이미 분류해 둔 값이라 다음 배치의 새 인테리어
 * 데모도 자동으로 들어온다(의료 규칙에서 쓴 방식 그대로).
 */
const INTERIOR_SLUGS = slugsByGalleryCategory("interior");

function isInteriorDemo(slug, card) {
  if (INTERIOR_SLUGS.has(slug)) return true;
  // 폴백 — 갤러리에 아직 안 올라온 새 데모용. 카드 JSON 의 industry 는 사람이 적은 값이라 그대로 믿는다.
  return card?.industry === "interior";
}

/** 인테리어 데모 전용 문구 검사 — 이 데모가 인테리어 계열일 때만 부른다. */
function scanInteriorCopy(key, textLines, flag) {
  const near = (i, re) => textLines.slice(Math.max(0, i - 2), i + 3).some((l) => re.test(l));
  textLines.forEach((line, i) => {
    const at = `${i + 1}행`;
    if (near(i, INTERIOR_NEGATION)) return;
    for (const r of INTERIOR_RULES) {
      const m = line.match(r.re);
      if (!m) continue;
      if (r.id === "unitprice" && near(i, INTERIOR_PRICE_RANGE)) continue;
      flag(key, `${at}: 인테리어 「${m[0]}」 — ${r.why}`);
    }
  });
}

/**
 * 실존 이름·조회 가능한 번호·실적 수치·보장 표현 검사 — **한 함수**로 두고 세 곳(데모 소스·카드 JSON·홈
 * 갤러리 카드 데이터)에서 부른다.
 *
 * 왜 뽑았나(실측 2026-09-17): 이 검사들이 데모 소스 스캔 루프 **안에만** 있어서, 카드 JSON
 * (src/content/portfolio/*.json)과 홈 갤러리 카드 데이터(src/lib/portfolio/galleryData.ts)는 여기에 한 번도
 * 들어오지 않았다. 그래서 갤러리 카드에 실존 브랜드가 박힌 채로도 「ERROR 0」이 나왔다.
 *
 * 실적 수치 면제는 **파일 단위가 아니라 앞뒤 2줄**로 본다 — 예전에는 파일 어딘가에 「예시 수치」가 한 번만
 * 있으면 그 파일 전체가 면제라, 바로 옆 줄의 단정형 수치가 조용히 지나갔다.
 */
function scanCopyForImpersonation(key, textLines, { impersonation = error, report = warn, atOf = null } = {}) {
  const exemptNear = (idx) => textLines.slice(Math.max(0, idx - 2), idx + 3).some((l) => /예시/.test(l));
  textLines.forEach((line, i) => {
    const at = atOf ? atOf(i) : `${i + 1}행`;
    for (const m of line.matchAll(/(?<![\d-])(\d{3})-(\d{2})-(\d{5})(?![\d-])/g)) {
      if ([m[1], m[2], m[3]].every(sameDigits)) continue;
      impersonation(key, `${at}: 사업자등록번호 형식 「${m[0]}」 — 실존 번호일 수 있습니다. 000-00-00000 으로`);
    }
    for (const r of REAL_ORG_PATTERNS) {
      const m = line.match(r.re);
      if (m) {
        impersonation(
          key,
          `${at}: ${r.why} 「${m[0]}」 — 실존 기관·기업·매체 이름을 지어낸 회사에 붙이지 않습니다. 「해외 규제기관(예시)」·「A-FOUNDRY (예시)」처럼 가상 표기로`,
        );
      }
    }
    {
      const m = line.match(REAL_DOI);
      if (m) {
        impersonation(
          key,
          `${at}: DOI 「${m[0]}」 — 조회 가능한 논문으로 읽힙니다. 줄을 지우거나 00.0000/example-0000 같은 자리표시로`,
        );
      }
    }
    for (const r of FAKE_IDENTIFIERS) {
      const m = line.match(r.re);
      if (!m) continue;
      const value = (m[1] ?? m[0]).replace(/[^0-9A-Za-z]/g, "");
      if (/^(\d)\1*$/.test(value)) continue;
      impersonation(key, `${at}: 「${m[0]}」 — ${r.why}. 지우거나 「표기 자리 (예시)」로`);
    }
    for (const r of REAL_STANDARD_PATTERNS) {
      const m = line.match(r.re);
      if (m && !exemptNear(i)) {
        report(key, `${at}: ${r.why} 「${m[0]}」 — 그 자리에 「(예시 표기)」를 적거나 제도 이름을 빼세요`);
      }
    }
    if (FIGURES.test(line) && !exemptNear(i)) {
      report(key, `${at}: 실적·인증·기간 수치 「${line.match(FIGURES)[0]}」 — 샘플엔 쓰지 않거나 **그 수치 옆에** 「예시」라고 적습니다`);
    }
    if (GUARANTEE.test(line)) {
      report(key, `${at}: 보장·최상급 표현 「${line.match(GUARANTEE)[0]}」 — 가상 브랜드라도 보증·1위를 단정하지 않습니다`);
    }
    for (const b of BANNED_PHRASES) {
      if (b.pattern.test(line)) report(key, `${at}: 금지 표현 ${b.pattern} — ${b.why}`);
    }
  });
}

/**
 * 데모가 참조하는 /public 정적 파일 중 **태문 자체 자산**의 앞자리.
 * 데모를 내려도 남아야 하는 것들이라 proxy matcher 밖에 있어도 괜찮다(로고·파비콘·사이트 폰트).
 * 그 외의 파일(데모가 들고 온 영상·스크린샷)은 matcher 안에 있어야 한다 — 없으면 내려도 그대로 열린다.
 */
const SITE_OWNED_PUBLIC_PREFIXES = ["/images/", "/fonts/", "/favicon"];

/**
 * 가상 브랜드 샘플(kind=sample)이 **자기** 이미지를 두는 자리 — public/demo-media/<자기 slug>/.
 *
 * 일부러 게이트 밖에 둔다. 지어낸 브랜드라 내려도 이미지가 남아 곤란할 일이 없고, 이 앞자리는
 * proxy matcher 밖이라 CDN 이 바로 내준다. 한 데모에 이미지가 30장인데 전부 /api/asset 을 거치면
 * 지면이 느려지고 함수 호출이 장당 한 번씩 난다(실측 2026-09-17: 이 자리 212장·8.49MB).
 *
 * ⚠️ **실존 업체 제안 시안(kind=proposal)에는 면제가 없다.** 회사 이름이 걸린 시안은 항의가 오면
 *    이미지까지 같이 404 가 돼야 하므로 private-assets/portfolio/<slug>/ 에 두고 /portfolio/<slug>/ 로
 *    참조한다. 아래 검사는 proposal 에서 이 앞자리도 그대로 ERROR 를 낸다.
 *    (실측 2026-09-17: sample 을 private 로 내리면 주소는 307 인데 /demo-media/ 이미지는 200 으로 남았고,
 *     proposal 을 private 로 내리니 /portfolio/<slug>/ 이미지가 5장 다 404 였다. 그 차이가 이 규칙의 근거다.)
 * **남의 slug 폴더는 면제하지 않는다** — 자기 폴더만 쓴다(면제를 앞자리로만 주면 제안 시안 이미지를
 * /demo-media/ 아무 데나 두고 빠져나갈 길이 생긴다).
 */
const SAMPLE_MEDIA_PREFIX = "/demo-media/";

/** 데모 소스에 적힌 정적 파일 주소 */
const PUBLIC_ASSET_REF = /["'`](\/[a-z0-9][a-z0-9._-]*(?:\/[a-z0-9][a-z0-9._-]*)+\.(?:mp4|webm|mov|png|jpe?g|webp|avif|gif|svg|pdf|ico))["'`]/gi;

/** proxy 의 config.matcher 를 읽어 「상태를 따르는 주소」 앞자리 목록으로 바꾼다 */
const PROXY_MATCHER_PREFIXES = (() => {
  try {
    const src = fs.readFileSync(path.join(ROOT, "src", "proxy.ts"), "utf8");
    const block = /matcher\s*:\s*\[([^\]]*)\]/.exec(stripComments(src));
    if (!block) return null;
    return [...block[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((m) => m[1].split("/:")[0].replace(/\/+$/, "") + "/");
  } catch {
    return null;
  }
})();

/**
 * protected-assets.ts 의 COMPANY_ASSET_OWNERS(업체 원본 이미지 폴더 → 작업물 slug)를 읽는다.
 * 이 스크립트는 .ts 를 import 할 수 없어 글자로 읽는다 — 못 읽으면 null 이고, 부르는 쪽은
 * 「첫 칸이 곧 slug」라는 느슨한 규칙으로 물러선다(없는 규칙을 지어내 거짓 ERROR 를 내지 않으려고).
 */
const COMPANY_ASSET_OWNERS = (() => {
  try {
    const src = stripComments(fs.readFileSync(path.join(ROOT, "src", "lib", "portfolio", "protected-assets.ts"), "utf8"));
    const block = /COMPANY_ASSET_OWNERS\s*:\s*Record<[^>]*>\s*=\s*\{([^}]*)\}/.exec(src);
    if (!block) return null;
    const out = {};
    for (const m of block[1].matchAll(/["']?([A-Za-z0-9._-]+)["']?\s*:\s*["']([^"']+)["']/g)) out[m[1]] = m[2];
    return out;
  } catch {
    return null;
  }
})();

/**
 * 홈 갤러리 카드(galleryData.ts)의 썸네일이 **kind 에 맞는 자리**에 있는가.
 *
 * 왜 따로 도나: 자리 검사(scanFile)는 데모 **폴더**만 돈다. 카드 썸네일은 이 파일 한 곳에 모여 있어
 * 그 검사에 한 번도 걸리지 않았다 — 제안 시안 썸네일을 /demo-media/ 에 두어도 「ERROR 0 · exit 0」이
 * 나온다(실측 2026-09-17: 제안 시안 3장이 규칙에 맞은 건 기계가 막아서가 아니라 손으로 맞춰서였다).
 *
 * 판정 기준은 카드 JSON 의 kind 다(화면 검사와 같은 잣대):
 * - **proposal** — 실존 업체 이름이 걸린 시안이라 썸네일도 상태를 따라야 한다. /portfolio/<slug>/ 또는
 *   그 시안의 업체 폴더(COMPANY_ASSET_OWNERS)만 허용하고, proxy matcher 밖이면 ERROR.
 * - **그 외(sample·service·카탈로그 카드)** — 지어낸 브랜드라 내려도 곤란할 일이 없다. /demo-media/ 와
 *   태문 자체 자산(/images/ 등)이 제자리고, 게이트 안에 두면 장당 함수 호출이 나므로 WARN 만 남긴다.
 */
function scanGalleryThumbnails(key, gsrc) {
  const lineOf = lineIndexer(gsrc);
  const kindOf = new Map(cards.map((c) => [c.slug, c.item?.kind]));
  const arrStart = gsrc.indexOf("GALLERY_PROJECTS");
  if (arrStart < 0) return;
  const region = gsrc.slice(arrStart);
  const starts = [...region.matchAll(/^ {2}\{\r?$/gm)].map((m) => m.index); // CRLF 저장본에서도 카드 경계를 찾는다
  for (let i = 0; i < starts.length; i += 1) {
    const chunk = region.slice(starts[i], starts[i + 1] ?? region.length);
    const tm = /thumbnailUrl\s*:\s*["'`]([^"'`]+)["'`]/.exec(chunk);
    if (!tm) continue;
    const url = tm[1];
    const at = `${lineOf(arrStart + starts[i] + tm.index)}행`;
    const live = /liveDemoUrl\s*:\s*["'`]([^"'`]+)["'`]/.exec(chunk)?.[1] ?? "";
    const slug = live.startsWith("/demo/") ? live.slice("/demo/".length).replace(/[/?#].*$/, "") : "";
    const kind = slug ? kindOf.get(slug) : undefined;

    if (/^https?:\/\//i.test(url)) {
      // 데모 소스 쪽과 같은 이유의 경고다 — 남의 호스트라 만료되면 홈 첫 화면이 예고 없이 빈다(실측: 404 2건).
      warn(key, `${at}: 썸네일이 외부 호스트 직접 참조입니다 「${url.slice(0, 80)}」 — 내려받아 ${kind === "proposal" ? `private-assets/portfolio/${slug}/` : "public/demo-media/"} 로 옮기세요`);
      continue;
    }
    if (!url.startsWith("/")) continue;

    if (kind === "proposal") {
      const first = url.split("/").filter(Boolean)[0] ?? "";
      const ownedFolder = COMPANY_ASSET_OWNERS ? COMPANY_ASSET_OWNERS[first] === slug : first === slug;
      const inOwnPortfolio = url.startsWith(`/portfolio/${slug}/`);
      const gated = !PROXY_MATCHER_PREFIXES || PROXY_MATCHER_PREFIXES.some((p) => url.startsWith(p));
      if (!(inOwnPortfolio || ownedFolder) || !gated) {
        error(
          key,
          `${at}: kind=proposal 인 「${slug}」 의 썸네일이 「${url}」 입니다 — 실존 업체 시안이라 항의가 오면 이미지도 같이 404 가 돼야 합니다. ` +
            `private-assets/portfolio/${slug}/ 에 두고 주소를 /portfolio/${slug}/<파일> 로 바꾸세요(업체 원본 이미지 폴더를 쓰면 protected-assets.ts 의 COMPANY_ASSET_OWNERS 와 proxy matcher 에 한 줄씩 추가)`,
        );
      }
      continue;
    }

    if (SITE_OWNED_PUBLIC_PREFIXES.some((p) => url.startsWith(p))) continue; // 태문 자체 자산(로고·목업)
    if (url.startsWith(SAMPLE_MEDIA_PREFIX)) continue;
    if (PROXY_MATCHER_PREFIXES?.some((p) => url.startsWith(p))) {
      warn(
        key,
        `${at}: 가상 브랜드 카드인데 썸네일 「${url}」 이 게이트(proxy matcher) 안에 있습니다 — 내려도 곤란할 일이 없는 이미지라 장당 함수 호출만 더 납니다. public/demo-media/${slug || "gallery"}/ 로 옮기는 편이 빠릅니다`,
      );
      continue;
    }
    warn(key, `${at}: 썸네일 「${url}」 이 정해진 자리 밖입니다 — 가상 브랜드 카드 썸네일은 public/demo-media/ 아래에 둡니다`);
  }
}

const buttonTexts = (src) =>
  [...src.matchAll(/<button\b(?:=>|[^>])*>([\s\S]*?)<\/button>/g)].map((m) => ({
    text: m[1].replace(/<[^>]*>|\{[^}]*\}/g, " ").replace(/\s+/g, " ").trim(),
    index: m.index,
  }));

/**
 * @param full 파일 경로
 * @param ctx { isPage, slug, card, slugRendersNotice }
 * @returns { rendersNotice, hasSubmitForm, hasDisclosure }
 */
function scanFile(full, { isPage, slug, card, slugRendersNotice, kind, medical = false, interior = false }) {
  const key = rel(full);
  /**
   * 가상 브랜드 샘플에서는 실존 기관·식별번호가 ERROR, 실존 업체 제안 시안에서는 WARN.
   * (제안 시안에는 **그 회사 자신의** 이름·번호가 적혀 있는 게 정상이다 — 없는 회사가 남의 이름을 쓰는 것과 다르다.)
   */
  const impersonation = (kind ?? card?.kind) === "proposal" ? warn : error;
  const original = fs.readFileSync(full, "utf8").replace(/^﻿/, "");
  const src = stripComments(original);
  const textSrc = stripCommentsForText(original);
  const lines = src.split(/\r?\n/);
  const textLines = textSrc.split(/\r?\n/);
  const lineOf = lineIndexer(src);

  if (isPage) {
    const firstCode = lines.find((l) => l.trim().length > 0) ?? "";
    if (/^\s*["']use client["']/.test(firstCode)) {
      error(key, `page.tsx 가 "use client" 입니다 — metadata 를 못 써 제목·검색 정보가 사라집니다. 서버 page + 클라이언트 컴포넌트로 나누세요`);
    }
    const hasMeta =
      /export\s+(const|let|var)\s+metadata\b/.test(src) ||
      /export\s+(async\s+)?function\s+generateMetadata\b/.test(src) ||
      /export\s+const\s+generateMetadata\b/.test(src) ||
      /export\s*\{[^}]*\b(metadata|generateMetadata)\b[^}]*\}/.test(src);
    if (!hasMeta) error(key, "page.tsx 에 metadata 또는 generateMetadata export 가 없습니다 — 탭 제목이 기본값으로 나옵니다");
  }

  // ── slug·업종이 카드와 같은가 (리드 추적이 조용히 틀린 slug 로 들어가지 않게) ──
  if (card) {
    for (const m of src.matchAll(/\bSAMPLE_SLUG\s*=\s*["'`]([^"'`]+)["'`]/g)) {
      if (m[1] !== card.slug) error(key, `${lineOf(m.index)}행: SAMPLE_SLUG 「${m[1]}」 가 카드 slug 「${card.slug}」 와 다릅니다`);
    }
    for (const m of src.matchAll(/\bsampleMetadata\s*\(\s*\{[^}]*?\bslug\s*:\s*["'`]([^"'`]+)["'`]/g)) {
      if (m[1] !== card.slug) error(key, `${lineOf(m.index)}행: sampleMetadata slug 「${m[1]}」 가 카드 slug 「${card.slug}」 와 다릅니다`);
    }
  }

  // ── page.tsx 가 자기 slug 의 컴포넌트 폴더를 쓰는가 (다른 샘플 화면을 복사해 import 경로를 안 고친 경우) ──
  if (isPage && slug) {
    for (const m of src.matchAll(/from\s+["'`]@\/components\/demos?\/([^/"'`]+)\//g)) {
      if (m[1] !== slug) {
        error(key, `${lineOf(m.index)}행: page.tsx 가 다른 slug 의 컴포넌트 폴더 「${m[1]}」 를 import 합니다 — src/components/demos/${slug}/ 를 쓰세요`);
      }
    }
  }

  // ── SampleNotice: 렌더하는가 · 실제로 열리는가 · slug/industry ──
  const noticeTags = [...src.matchAll(/<SampleNotice\b(?:=>|[^>])*\/?>/g)];
  const rendersNotice = noticeTags.length > 0;
  for (const t of noticeTags) {
    const at = `${lineOf(t.index)}행`;
    const tag = t[0];
    if (card) {
      const slugM = tag.match(/\bslug\s*=\s*["']([^"']+)["']/);
      if (slugM && slugM[1] !== card.slug) error(key, `${at}: SampleNotice slug 「${slugM[1]}」 가 카드 slug 「${card.slug}」 와 다릅니다`);
      const indM = tag.match(/\bindustry\s*=\s*(?:["']([^"']+)["']|\{\s*["']([^"']+)["']\s*\})/);
      const ind = indM?.[1] ?? indM?.[2];
      if (ind && ind !== card.industry) error(key, `${at}: SampleNotice industry 「${ind}」 가 카드 industry 「${card.industry}」 와 다릅니다`);
      // 제안용 시안의 모달 제목은 「제안용 시안입니다」여야 한다 — 기본값이면 실존 회사 화면에서 「샘플 사이트입니다」가 뜬다
      if (card.kind === "proposal") {
        const kindM = tag.match(/\bkind\s*=\s*(?:["']([^"']+)["']|\{\s*["']([^"']+)["']\s*\})/);
        const noticeKind = kindM?.[1] ?? kindM?.[2];
        if (noticeKind !== "proposal") {
          error(
            key,
            `${at}: 제안용 시안(kind=proposal)인데 SampleNotice 의 kind 가 「${noticeKind ?? "없음(기본 sample)"}」 입니다 — kind="proposal" 을 넘기세요(모달 제목이 「샘플 사이트입니다」로 나와 실존 회사 화면에서 오해를 부릅니다)`,
          );
        }
      }
    }
    const openM = tag.match(/\bopen\s*=\s*\{\s*([A-Za-z_$][\w$]*)\s*\}/);
    if (openM && openM[1] !== "true") {
      const stateName = openM[1];
      const decl = src.match(new RegExp(`\\[\\s*${stateName}\\s*,\\s*([A-Za-z_$][\\w$]*)\\s*\\]\\s*=\\s*(?:React\\.)?useState`));
      if (decl) {
        const setter = decl[1];
        const refs = [...src.matchAll(new RegExp(`\\b${setter.replace(/\$/g, "\\$")}\\b`, "g"))].length - 1; // 선언 1회 제외
        const closes = [...src.matchAll(new RegExp(`\\b${setter.replace(/\$/g, "\\$")}\\s*\\(\\s*false\\s*\\)`, "g"))].length;
        if (refs - closes <= 0) {
          error(key, `${at}: SampleNotice 가 한 번도 열리지 않습니다 — open 에 넘긴 ${stateName} 을 true 로 바꾸는 ${setter}(true) 호출이 없습니다(폼 제출 때 열어야 함)`);
        }
      }
    }
  }

  // ── 폼 ──
  // onSubmit 은 JSX 속성(onSubmit={…})만 센다. `const onSubmit = (e) => …` 선언까지 세면
  // role="search" 폼이 「폼 밖 onSubmit 이 있다」로 오판돼 면제가 풀린다(TraceExplorer.tsx 에서 실측).
  const ONSUBMIT_ATTR = /\bonSubmit\s*=\s*\{/;
  const hasForm = /<form\b/.test(src) || ONSUBMIT_ATTR.test(src);
  // 접수가 아닌 폼은 표시해서 뺀다: 검색창(role="search") · 화면 안 상태만 바꾸는 폼(data-sample-local).
  // 파일 안 <form> 이 전부 그런 폼이고, <form> 밖 onSubmit(커스텀 폼 컴포넌트)이 없을 때만 면제.
  const formMatches = [...src.matchAll(/<form\b(?:=>|[^>])*>/g)];
  const formTags = formMatches.map((m) => m[0]);
  const localOnly =
    formTags.length > 0 &&
    formTags.every((t) => /\brole\s*=\s*["']search["']|\bdata-sample-local\b/.test(t)) &&
    [...src.matchAll(new RegExp(ONSUBMIT_ATTR.source, "g"))].length <= formTags.filter((t) => ONSUBMIT_ATTR.test(t)).length;

  // data-sample-local 은 스스로 붙이는 표시라, 접수처럼 보이는 버튼이 들어 있으면 알린다
  for (const m of formMatches) {
    if (!/\bdata-sample-local\b/.test(m[0])) continue;
    const bodyEnd = src.indexOf("</form>", m.index);
    const body = src.slice(m.index, bodyEnd < 0 ? undefined : bodyEnd);
    const hit = buttonTexts(body).find((b) => SUBMIT_WORDS.test(b.text)) ?? null;
    const valueHit = body.match(/type\s*=\s*["']submit["'][^>]*\bvalue\s*=\s*["']([^"']+)["']/);
    const label = hit?.text ?? (valueHit && SUBMIT_WORDS.test(valueHit[1]) ? valueHit[1] : null);
    if (label) {
      warn(key, `${lineOf(m.index)}행: data-sample-local 폼인데 버튼이 「${label}」 입니다 — 신청·예약·문의 폼이면 표시를 떼고 SampleNotice 를 여세요`);
    }
  }

  let hasSubmitForm = false;
  if (hasForm && !localOnly) {
    hasSubmitForm = true;
    const line = lines.findIndex((l) => /<form\b/.test(l) || ONSUBMIT_ATTR.test(l)) + 1;
    const exemption = LOCAL_FORM_EXEMPTIONS[key];
    const submitValues = [...src.matchAll(/\bonSubmit\s*=\s*\{\s*([^}\s]*)/g)].map((m) => m[1]);
    const submitFromProps = submitValues.length > 0 && submitValues.every((v) => /^props\.|^on[A-Z]/.test(v));
    if (exemption) {
      warn(key, `${line}행: 폼 면제 목록(스크립트 안) — ${exemption}. 파일에 <form data-sample-local> 을 붙이면 목록에서 지울 것`);
      hasSubmitForm = false;
    } else if (rendersNotice) {
      // 이 파일이 연다 — 위에서 실제로 열리는지 봤다
    } else if (slugRendersNotice && submitFromProps) {
      warn(key, `${line}행: 폼의 onSubmit 을 props 로 받습니다 — 부모 파일이 SampleNotice 를 여는지 확인하세요(가짜 접수 금지)`);
    } else if (slugRendersNotice) {
      error(
        key,
        `${line}행: 폼이 있는데 이 파일은 SampleNotice 를 렌더하지 않습니다 — 같은 샘플의 다른 파일에 있어도 이 폼이 여는지 알 수 없습니다. 이 파일에서 SampleNotice 를 열거나, onSubmit 을 props(onSubmit={onBook})로 받으세요`,
      );
    } else {
      error(
        key,
        `${line}행: 폼이 있는데 SampleNotice 를 렌더하지 않습니다 — 제출 시 SampleNotice 를 열어야 합니다(가짜 접수 금지). 접수가 아닌 검색·화면 조작 폼이면 <form role="search"> 또는 <form data-sample-local>`,
      );
    }
    if (hasSubmitForm && !PRE_SUBMIT_NOTICE.test(textSrc)) {
      warn(key, `${line}행: 접수 폼인데 제출 전 고지가 없습니다 — 제출 버튼 위에 「샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다」 한 줄`);
    }
  }

  // 폼 태그 없이 onClick 만으로 예약·신청을 흉내 낸 버튼
  if (!hasForm && !rendersNotice && !slugRendersNotice) {
    for (const b of buttonTexts(src)) {
      if (FAKE_BUTTON.test(b.text)) {
        warn(key, `${lineOf(b.index)}행: 「${b.text}」 버튼이 있는데 샘플 어디에도 SampleNotice 가 없습니다 — 누르면 SampleNotice 를 여세요`);
      }
    }
  }

  // ── 고정 헤더·쌓임 (className 전체·cn()·템플릿 리터럴) ──
  const flagged = new Set();
  const flagOnce = (kind, idx, fn) => {
    const k = `${kind}:${lineOf(idx)}`;
    if (flagged.has(k)) return;
    flagged.add(k);
    fn(`${lineOf(idx)}행`);
  };
  for (const g of classGroups(src)) {
    const bases = classBases(g.text);
    if (bases.has("fixed") && bases.has("top-0")) {
      flagOnce("fixed", g.index, (at) => {
        const ex = FIXED_HEADER_EXEMPTIONS[key];
        if (ex) warn(key, `${at}: fixed top-0 면제 목록(스크립트 안) — ${ex}`);
        else error(key, `${at}: fixed + top-0 — 샘플 바(44px)를 붙이면 가려집니다. 헤더는 sticky top-[var(--sample-bar-h,0px)] 로 (바가 없으면 0px 라 지금 화면은 그대로)`);
      });
    }
    if (bases.has("fixed") && bases.has("inset-y-0")) {
      flagOnce("inset-y", g.index, (at) => warn(key, `${at}: fixed inset-y-0 — 샘플 바를 붙이면 위 44px 가 가려집니다. top-[var(--sample-bar-h,0px)] bottom-0 으로`));
    }
    if (bases.has("sticky") && bases.has("top-0")) {
      flagOnce("sticky", g.index, (at) => warn(key, `${at}: sticky top-0 — 샘플 바를 붙이면 그 밑으로 사라집니다. sticky top-[var(--sample-bar-h,0px)] 로 (바가 없으면 0px 라 지금 화면은 그대로)`));
    }
    for (const b of bases) {
      const z = b.match(/^z-\[(\d+)\]$/);
      if (z && Number(z[1]) >= 9000) {
        flagOnce(`z${z[1]}`, g.index, (at) => warn(key, `${at}: ${b} — 샘플 z-index 는 9000 미만(샘플 바 9999 · SampleNotice 10000 위로 올라갑니다)`));
      }
    }
  }
  for (const m of src.matchAll(/\bposition\s*:\s*["'`]fixed["'`]/g)) {
    const from = src.lastIndexOf("{", m.index);
    const to = src.indexOf("}", m.index);
    const obj = src.slice(from < 0 ? m.index : from, to < 0 ? undefined : to);
    if (/\btop\s*:\s*(?:0\b|["'`]0(?:px|rem)?["'`])/.test(obj)) {
      flagOnce("fixed", m.index, (at) => error(key, `${at}: style position:"fixed" + top:0 — 공용 샘플 바에 가려집니다. sticky + top: "var(--sample-bar-h,0px)" 로`));
    }
  }

  // ── 외부 전송 (코드) ──
  lines.forEach((line, i) => {
    const at = `${i + 1}행`;
    if (/\bfetch\s*\(/.test(line)) error(key, `${at}: fetch( 호출 — 샘플은 아무 데도 보내지 않습니다`);
    if (/\baxios\b/.test(line)) error(key, `${at}: axios 사용 — 샘플은 아무 데도 보내지 않습니다`);
    if (/["'`]\/api\//.test(line)) error(key, `${at}: "/api/" 호출 — 샘플은 아무 데도 보내지 않습니다`);
    if (/\bsendBeacon\b|\bXMLHttpRequest\b|\bnew\s+WebSocket\b|\bnew\s+EventSource\b/.test(line)) {
      error(key, `${at}: sendBeacon/XMLHttpRequest/WebSocket/EventSource — 샘플은 아무 데도 보내지 않습니다`);
    }
    if (EXTERNAL_FORM_SERVICE.test(line)) error(key, `${at}: 외부 폼 전송 서비스 주소 — 샘플은 아무 데도 보내지 않습니다`);
    if (/<form\b[^>]*\baction\s*=\s*["'{`]*https?:/.test(line)) error(key, `${at}: <form action="http…"> — 샘플 폼은 외부로 제출하지 않습니다`);
    if (/\b(?:localStorage|sessionStorage)\s*\.\s*setItem\b/.test(line)) {
      warn(key, `${at}: 브라우저 저장소에 저장 — 「신청 내역」 같은 가짜 접수 기록이면 금지(화면 설정 기억이면 무시)`);
    }
  });

  // ── 글자 (주석 제외 원문) ──
  textLines.forEach((line, i) => {
    const at = `${i + 1}행`;

    for (const p of phoneCandidates(line)) {
      const digits = `${p.area}${p.mid}${p.last}`;
      if (digits === TAEMUN_PHONE_DIGITS) {
        warn(key, `${at}: 태문 실번호 「${p.shown.trim()}」 — 샘플 안에는 넣지 않습니다(제작 문의는 샘플 바·SampleNotice 가 한다)`);
        continue;
      }
      if (isPlaceholderPhone(p.area, p.mid, p.last)) continue;
      warn(key, `${at}: 실존처럼 보이는 전화번호 「${p.shown.trim()}」 — 02-0000-0000 · 010-0000-0000 같은 자리표시 번호로`);
    }
    for (const m of line.matchAll(/(?<![\d.\-])(1[5-9]\d{2})[-.](\d{4})(?![\d\-])/g)) {
      if (sameDigits(m[2])) continue;
      warn(key, `${at}: 대표번호처럼 보이는 번호 「${m[0]}」 — 실제 회사 번호일 수 있습니다. 1588-0000 으로`);
    }
    // 실존 이름·번호·식별자 검사는 공용 함수가 한다(카드 JSON·갤러리 데이터와 같은 잣대) — forEach 밖에서 부른다.
    for (const m of line.matchAll(/[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,})/g)) {
      if (PLACEHOLDER_EMAIL_DOMAIN.test(m[1]) || IMAGE_TLD.test(m[0])) continue;
      warn(key, `${at}: 실존처럼 보이는 이메일 「${m[0]}」 — example.com 주소로`);
    }
    if (/mailto:/i.test(line)) {
      if (/[?&](?:body|subject)=|location\s*\.\s*href|window\s*\.\s*open|location\s*=/.test(line)) {
        error(key, `${at}: 폼 내용을 실은 mailto — 메일 앱으로 「발송」을 흉내 냅니다(가짜 접수). SampleNotice 로`);
      } else if (!/mailto:[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)*(?:example\.(?:com|net|org|kr|co\.kr)|example|test|invalid)\b/i.test(line)) {
        warn(key, `${at}: mailto 링크 — 샘플엔 hello@example.com 같은 자리표시 주소만 씁니다`);
      }
    }
    if (FAKE_SUCCESS.test(line) && !NEGATION.test(line)) {
      error(key, `${at}: 가짜 접수 문구 「${line.match(FAKE_SUCCESS)[0]}」 — 샘플은 접수하지 않습니다. 제출하면 SampleNotice 를 여세요`);
    } else if (STATUS_DONE.test(line) && !NEGATION.test(line)) {
      warn(key, `${at}: 「${line.match(STATUS_DONE)[0]}」 — 관리 화면의 상태 표시면 괜찮지만, 폼 제출 뒤 보여 주는 성공 문구면 가짜 접수입니다`);
    }
  });

  scanCopyForImpersonation(key, textLines, { impersonation });

  // 의료광고 규칙 — 가상 브랜드 의료 샘플에만 건다.
  // 실존 업체 제안 시안(kind=proposal)은 그 병원이 실제로 쓰는 문구일 수 있으므로 WARN 으로 낮춘다.
  if (medical) scanMedicalCopy(key, textLines, (kind ?? card?.kind) === "proposal" ? warn : error);

  // 인테리어·공간디자인 규칙 — 가상 브랜드 인테리어 샘플에만 건다.
  // 실존 업체 제안 시안(kind=proposal)은 그 업체가 실제로 가진 면허·보증일 수 있으므로 WARN 으로 낮춘다.
  if (interior) scanInteriorCopy(key, textLines, (kind ?? card?.kind) === "proposal" ? warn : error);

  // ── 외부 이미지 호스트 직접 참조(핫링크) ──
  // 게이트 바깥이라 데모를 내려도 이미지는 계속 살아 있고, 주소가 만료되면 예고 없이 깨진다(실측: 홈에서 404 2건).
  // 방문자 IP·referer 도 그 호스트로 나간다. 당장 막지는 않고 **개수를 눈에 보이게** 둔다.
  // (파일마다 짖으면 목록이 묻힌다 — 데모 하나당 한 줄로 모아서 아래 반복문이 보고한다)
  const externalImageHosts = [...src.matchAll(/https?:\/\/(lh\d\.googleusercontent\.com|images\.unsplash\.com|[a-z0-9.-]*\.cloudfront\.net)/gi)].map(
    (m) => m[1].toLowerCase(),
  );

  // ── 데모가 들고 온 정적 파일이 게이트 밖에 있는가 ──
  // 데모를 내려도 그 데모의 영상·스크린샷이 200 으로 그대로 열리면 내린 의미가 없다(실측: /videos/*.mp4).
  // 판정 기준은 proxy 의 config.matcher 다 — 거기 안 걸린 주소는 상태를 아예 안 본다.
  // kind 는 카드에서 온다 — 못 읽으면 가장 엄한 쪽(proposal)으로 다룬다(gate.ts·/api/asset 과 같은 규칙).
  const assetKind = kind ?? card?.kind ?? "proposal";
  if (PROXY_MATCHER_PREFIXES) {
    for (const m of src.matchAll(PUBLIC_ASSET_REF)) {
      const url = m[1];
      if (SITE_OWNED_PUBLIC_PREFIXES.some((p) => url.startsWith(p))) continue; // 태문 자체 자산(로고·폰트)은 남아야 한다
      if (PROXY_MATCHER_PREFIXES.some((p) => url.startsWith(p))) continue;
      // 가상 브랜드 샘플이 자기 폴더에 둔 이미지는 면제 (위 SAMPLE_MEDIA_PREFIX 주석 — proposal 은 면제 없음)
      if (assetKind !== "proposal" && url.startsWith(`${SAMPLE_MEDIA_PREFIX}${slug}/`)) continue;
      error(
        key,
        `${lineOf(m.index)}행: 「${url}」 는 proxy 의 matcher 밖입니다 — 이 데모를 내려도 파일은 200 으로 열립니다. ` +
          `private-assets/portfolio/${slug}/ 로 옮기고 주소를 /portfolio/${slug}/<파일> 로 바꾸세요(그 앞자리는 이미 matcher 에 있습니다)`,
      );
    }
  }

  return {
    rendersNotice,
    hasDisclosure: SAMPLE_DISCLOSURE.test(textSrc),
    hasProposalDisclosure: PROPOSAL_DISCLOSURE.test(textSrc),
    externalImageHosts,
  };
}

const scannedFiles = new Set();
for (const s of sampleSources) {
  const files = [...walkSources(s.dir)];
  for (const cdir of COMPONENT_DEMO_DIRS) files.push(...walkSources(path.join(cdir, s.slug)));
  const unique = files.filter((f) => !scannedFiles.has(f));
  const slugRendersNotice = files.some((f) => /<SampleNotice\b/.test(stripComments(fs.readFileSync(f, "utf8"))));
  // 의료 계열 판정은 파일 하나가 아니라 데모 전체 글자로 한다 — 한 파일만 보면 컴포넌트마다 판정이 갈린다.
  const medical = isMedicalDemo(s.slug, s.card);
  // 인테리어 계열 판정도 같은 이유로 데모 전체 단위로 한 번만 한다.
  const interior = isInteriorDemo(s.slug, s.card);
  let disclosure = false;
  let proposalDisclosure = false;
  const externalImages = [];
  for (const f of unique) {
    scannedFiles.add(f);
    keySlug.set(rel(f), s.slug);
    const isPage = path.dirname(f) === s.dir && path.basename(f) === "page.tsx";
    const r = scanFile(f, { isPage, slug: s.slug, card: s.card, slugRendersNotice, kind: s.kind, medical, interior });
    externalImages.push(...r.externalImageHosts);
    // 고지는 「화면 안」에 있어야 인정한다. 라우트 폴더(page.tsx·<Slug>PageClient.tsx)는 기기 전환 툴바 쪽 껍데기라
    // ?embed=true 로 화면만 직접 열면 안 보인다 — 샘플 화면 컴포넌트에 있는 글자만 센다.
    if (f.startsWith(s.dir + path.sep)) continue;
    disclosure ||= r.hasDisclosure;
    proposalDisclosure ||= r.hasProposalDisclosure;
  }
  // (demos) 루트 레이아웃이 공용 고지(DemoDisclaimer)를 붙이면 화면 컴포넌트에 문구가 없어도 인정한다.
  // 레이아웃은 ?embed=true 로 직접 열어도 함께 렌더되므로(실측: /demo/wonik-qnc?embed=true 에 고지 1건),
  // 데모마다 같은 문구를 복사해 넣는 것보다 한 곳에서 붙이는 쪽이 새 시안에도 자동으로 걸린다.
  if (unique.length && !disclosure) {
    const key = rel(s.dir);
    keySlug.set(key, s.slug);
    warn(
      key,
      "화면에 샘플·시안 고지가 없습니다 — 푸터에 한 줄 남기세요. 가상 브랜드면 「이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다」, 실존 업체 제안 시안이면 「태문 DEV STUDIO 가 제안용으로 만든 시안이며, 해당 회사가 의뢰하거나 만든 사이트가 아닙니다」 (샘플 바를 접어도 남는 표시)",
    );
  }
  // 실존 업체 제안 시안은 「가상 브랜드 샘플」 문구로 대신할 수 없다 — 회사 이름이 걸린 화면이라 ERROR 로 막는다
  if (unique.length && s.card?.kind === "proposal" && !proposalDisclosure && !LAYOUT_PROPOSAL_DISCLAIMER) {
    const key = rel(s.dir);
    keySlug.set(key, s.slug);
    error(
      key,
      `kind=proposal 인데 제안 시안 고지가 없습니다 — 「태문 DEV STUDIO 가 제안용으로 만든 시안이며, 해당 회사가 만들었거나 의뢰한 사이트가 아닙니다」를 헤더 아래 띠·푸터처럼 접을 수 없는 자리에 넣으세요. 툴바(DevicePreviewFrame)의 고지 띠는 iframe 바깥이라 ?embed=true 를 직접 열면 안 보입니다`,
    );
  }

  // ── 외부 이미지 호스트 직접 참조(핫링크) — 데모 하나당 한 줄 ──
  if (externalImages.length) {
    const key = rel(s.dir);
    keySlug.set(key, s.slug);
    warn(
      key,
      `외부 이미지 호스트 직접 참조 ${externalImages.length}건 (${[...new Set(externalImages)].join(", ")}) — 게이트 밖이라 이 데모를 내려도 이미지는 살아 있고, 주소가 만료되면 예고 없이 깨집니다(실측: 홈 썸네일 2건이 404 였다). private-assets/portfolio/${s.slug}/ 로 내려받아 /portfolio/${s.slug}/<파일> 로 쓰면 상태를 따릅니다`,
    );
  }

  // ── 하단 고지는 공용 컴포넌트 한 곳에서만 ──
  // 2026-09-18 형 지시: 데모마다 하단 고지가 10가지 넘게 제각각이었다(「실제 업체가 아닙니다」 · 「실제 업체가 아니며
  // 화면의 회사명·…」 · 「주문·결제는 접수되지 않습니다」 …). <SampleFooterNote /> 하나로 통일했고 문구는
  // src/components/demo-kit/SampleFooterNote.tsx 가 정본이다 — 데모 파일에 문구를 직접 적지 않는다.
  // 가상 브랜드는 반드시 쓰고, 실존 업체 시안(kind=proposal)은 쓰면 안 된다(그 회사는 「가상」이 아니다).
  {
    const usesNote = files.some((f) => /<SampleFooterNote\b/.test(stripComments(fs.readFileSync(f, "utf8"))));
    const key = rel(s.dir);
    if (s.kind === "proposal" && usesNote) {
      keySlug.set(key, s.slug);
      error(
        key,
        "제안용 시안(실존 업체)인데 <SampleFooterNote /> 를 씁니다 — 그 회사는 「가상 브랜드」가 아닙니다. 빼세요(제안 시안 고지는 (demos) 레이아웃의 DemoDisclaimer 가 붙입니다)",
      );
    } else if (s.kind !== "proposal" && !usesNote) {
      keySlug.set(key, s.slug);
      error(
        key,
        "하단 고지 <SampleFooterNote /> 가 없습니다 — 푸터에 한 줄 넣으세요(import 는 @/components/demo-kit/SampleFooterNote). 문구는 그 컴포넌트 한 곳이 정본이라 데모에 직접 적지 않습니다",
      );
    }
  }

  // ── 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 ──
  // 2026-09-18 형 지시: 의료 6종이 툴바 없이 화면만 그려 「메인 갤러리로」·「제작 의뢰」 버튼이 아예 없었다.
  // 툴바가 곧 영업 동선(돌아가기 · PC/모바일 비교 · 제작 의뢰)이라 빠지면 그 데모에서 문의로 이어질 길이 없다.
  // 라우트 폴더(page.tsx · <Slug>PageClient.tsx)에서 ?embed=true 가 아닐 때 <DevicePreviewFrame> 을 그려야 한다.
  {
    const routeFiles = [...walkSources(s.dir)];
    const framed = routeFiles.some((f) => /<DevicePreviewFrame\b/.test(stripComments(fs.readFileSync(f, "utf8"))));
    if (!framed) {
      const key = rel(s.dir);
      keySlug.set(key, s.slug);
      error(
        key,
        "태문 툴바 <DevicePreviewFrame> 이 없습니다 — <Slug>PageClient 에서 isEmbed 면 화면을 그대로, 아니면 <DevicePreviewFrame src=\"/demo/<slug>?embed=true\" …/> 로 감싸세요(본보기: src/app/(demos)/demo/nexus-robotics/NexusRoboticsPageClient.tsx)",
      );
    }
  }

  // ── 저장한 이미지가 실제로 쓸 만한 크기인가 ──
  // 왜 보는가: 2026-09-17 에 데모 이미지 227장을 저장소로 가져오면서 lh3 CDN 의 **기본 주소**를 썼는데
  // 그건 미리보기용 512px 판이었다(원본은 =s0 을 붙이면 1376px). 히어로가 1400px 자리에 늘어나 뿌옇게
  // 보였고, 「외부 참조 0건」 검사는 초록불을 줬다 — 파일이 있는지만 보고 **쓸 만한 물건인지는 안 봤다**.
  // 그래서 크기를 잰다. 로고·아이콘처럼 원래 작은 것은 뺀다.
  {
    const LONG_SIDE_MIN = 1024;
    const SMALL_BY_DESIGN = /(logo|icon|emblem|mark|favicon|badge|avatar|seal|crest)/i;
    const localImgRe = new RegExp(
      "[/](?:demo-media|portfolio)[/][A-Za-z0-9._-]+[/][A-Za-z0-9._-]+[.](?:jpg|jpeg|png|webp)",
      "g",
    );

    /** 헤더만 읽어 가로·세로를 잰다(새 의존성 없이). 못 읽으면 null — avif 등은 건너뛴다. */
    const imageSize = (file) => {
      let fd;
      try {
        fd = fs.openSync(file, "r");
        const buf = Buffer.alloc(65536);
        const read = fs.readSync(fd, buf, 0, 65536, 0);
        if (read > 24 && buf[0] === 0x89 && buf[1] === 0x50) {
          return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
        }
        if (read > 4 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
          const chunk = buf.toString("ascii", 12, 16);
          if (chunk === "VP8X") return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
          if (chunk === "VP8 ") {
            const i = buf.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
            if (i > 0) return { w: buf.readUInt16LE(i + 3) & 0x3fff, h: buf.readUInt16LE(i + 5) & 0x3fff };
          }
          if (chunk === "VP8L") {
            const n = buf.readUInt32LE(21);
            return { w: (n & 0x3fff) + 1, h: ((n >> 14) & 0x3fff) + 1 };
          }
          return null;
        }
        if (read > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
          let i = 2;
          while (i < read - 9) {
            if (buf[i] !== 0xff) { i += 1; continue; }
            const m = buf[i + 1];
            const isSof = (m >= 0xc0 && m <= 0xc3) || (m >= 0xc5 && m <= 0xc7) || (m >= 0xc9 && m <= 0xcb) || (m >= 0xcd && m <= 0xcf);
            if (isSof) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
            if (m === 0xd8 || m === 0xd9 || (m >= 0xd0 && m <= 0xd7)) { i += 2; continue; }
            i += 2 + buf.readUInt16BE(i + 2);
          }
        }
        return null;
      } catch {
        return null;
      } finally {
        if (fd !== undefined) try { fs.closeSync(fd); } catch {}
      }
    };

    const seen = new Set();
    const tooSmall = [];
    for (const f of files) {
      const text = fs.readFileSync(f, "utf8");
      for (const m of text.matchAll(localImgRe)) {
        const web = m[0];
        if (seen.has(web)) continue;
        seen.add(web);
        if (SMALL_BY_DESIGN.test(web)) continue;
        const candidates = web.startsWith("/demo-media/")
          ? [path.join(ROOT, "public", web.slice(1))]
          : [path.join(ROOT, "private-assets", web.slice(1)), path.join(ROOT, "public", web.slice(1))];
        const file = candidates.find((c) => fs.existsSync(c));
        if (!file) continue;
        const size = imageSize(file);
        if (!size || !size.w || !size.h) continue;
        const longSide = Math.max(size.w, size.h);
        // 정사각 작은 것은 로고로 본다(이름에 logo 가 없어도 흔하다)
        if (size.w === size.h && longSide <= 640) continue;
        // 가로로 길고 납작한 것(워드마크·구분선 띠)도 로고로 본다 — 512x96 같은 모양
        const shortSide = Math.min(size.w, size.h);
        if (shortSide < 200 && longSide / shortSide >= 3) continue;
        if (longSide < LONG_SIDE_MIN) tooSmall.push(web + " (" + size.w + "x" + size.h + ")");
      }
    }
    if (tooSmall.length) {
      const key = rel(s.dir);
      keySlug.set(key, s.slug);
      warn(
        key,
        "화면에 쓰는 이미지 " + tooSmall.length + "장이 긴 변 " + LONG_SIDE_MIN + "px 미만입니다 — " +
          tooSmall.slice(0, 5).join(" · ") + (tooSmall.length > 5 ? " 외 " + (tooSmall.length - 5) + "장" : "") +
          ". 히어로·대표 사진이면 노트북 화면에서 늘어나 뿌옇게 보입니다. AI 스튜디오 이미지라면 원본 주소(=s0)로 다시 받으세요 — scripts/upgrade-images.mjs. 로고·아이콘이면 파일 이름에 logo/icon 을 넣으면 이 검사에서 빠집니다",
      );
    }
  }

  // ── 기기 전환 툴바의 client= 문구 ──
  // 툴바는 **태문이 자기 목소리로 말하는 자리**다. DevicePreviewFrame 이 「클라이언트: {client}」로 찍으므로
  // 여기에 업종 설명만 적어 두면 영업 상대가 이 데모를 수주 실적으로 읽는다(실측: 6개 중 2개가 그랬다).
  if (s.kind === "sample") {
    for (const f of walkSources(s.dir)) {
      const m = /client\s*=\s*["'`]([^"'`]*)["'`]/.exec(stripComments(fs.readFileSync(f, "utf8")));
      if (!m) continue;
      if (/가상|실제 (?:업체|고객사|회사)가 아니|실존 고객사 아님/.test(m[1])) continue;
      const key = rel(f);
      keySlug.set(key, s.slug);
      error(
        key,
        `기기 전환 툴바의 client 문구 「${m[1]}」 에 가상 브랜드 표시가 없습니다 — 「가상 브랜드 샘플 — 실제 업체가 아닙니다 (…설정)」 형식으로 적으세요(툴바가 「클라이언트: …」로 그대로 찍습니다)`,
      );
    }
  }
}

// 페이지·카드 어느 쪽에도 안 걸린 컴포넌트 폴더 — slug 오타면 검사를 통째로 빠져나간다
{
  const sourceSlugs = new Set(sampleSources.map((s) => s.slug));
  for (const cdir of COMPONENT_DEMO_DIRS) {
    for (const name of listDirs(cdir)) {
      if (sourceSlugs.has(name)) continue;
      const key = rel(path.join(cdir, name));
      keySlug.set(key, name);
      warn(
        key,
        `페이지(src/app/(demos)/demo/${name}/page.tsx)도 카드도 없는 샘플 컴포넌트 폴더입니다 — 폴더 이름이 slug 와 다르면 입고 검사에서 통째로 빠집니다`,
      );
    }
  }
}

// ───────── 5-2. 카드 JSON 이 git 추적 대상인가 (ERROR) ─────────
//
// 왜: 데모 page.tsx 만 스테이징되고 카드 JSON 은 추적조차 안 된 채 남은 적이 있다(새 데모 6개 중 3개).
// 그대로 커밋하면 **카드 없는 데모**가 배포된다 — gate.ts 는 종류를 모르는 데모를 가장 엄한 종류
// (proposal)로 다루므로, 가상 브랜드 샘플에 「해당 회사가 만들었거나 의뢰한 사이트가 아닙니다」라는
// 틀린 고지가 붙고, 관리자 목록에서 사라져 개별로 내릴 수도 없다.
{
  let tracked = null;
  try {
    const { execFileSync } = await import("node:child_process");
    const out = execFileSync("git", ["ls-files", "--", "src/content/portfolio"], { cwd: ROOT, encoding: "utf8" });
    tracked = new Set(out.split(/\r?\n/).filter(Boolean).map((p) => path.posix.basename(p)));
  } catch {
    tracked = null; // git 이 없거나 저장소가 아니면 이 검사는 건너뛴다
  }
  if (tracked) {
    for (const c of cards) {
      if (tracked.has(path.basename(c.file))) continue;
      error(
        c.key,
        "카드 JSON 이 git 추적 대상이 아닙니다 — 이대로 커밋하면 카드 없는 데모가 배포됩니다(게이트가 「모르는 것 = 제안 시안」으로 다뤄 틀린 고지가 붙고 관리자 목록에서 사라집니다). git add 하세요",
      );
    }
  }
}

// ───────── 5-3. 카드 JSON 의 글 (데모 소스와 같은 잣대) ─────────
for (const entry of cardCopyQueue) {
  scanCopyForImpersonation(
    entry.key,
    entry.fields.map(([, v]) => v),
    {
      impersonation: entry.kind === "proposal" ? warn : error,
      atOf: (i) => entry.fields[i][0],
    },
  );
}

// ───────── 6. 사이트 문구 (WARN) ─────────
const SITE_COPY_RULES = [
  { re: /압도적|원천 차단|태문만의|업계 최고/, why: "근거 없는 최상급" },
  { re: /100\s*%|(?<![\d.])0\s*%(?!\s*[~-])/, why: "100%·0% 단정 — 계약서로 지킬 수 있는 문장으로" },
  { re: /24시간|1시간 이내|\d+분 이내|즉시 연락/, why: "연락 시각 약속 — 형이 확정한 조건만" },
  { re: /(?<!\d)3초/, why: "근거 없는 속도 표현" },
  { re: /실시간/, why: "실제로 실시간이 아닌 기능을 암시" },
  { re: /지체상금|보장/, why: "계약상 보장 — 계약서에 없는 조건을 화면에 쓰지 않는다" },
];
const siteCopyFiles = [...SITE_COPY_DIRS.flatMap((d) => walkSources(d)), ...SITE_COPY_FILES.filter((f) => fs.existsSync(f))];
for (const f of siteCopyFiles) {
  const textLines = stripCommentsForText(fs.readFileSync(f, "utf8")).split(/\r?\n/);
  const key = `사이트 문구 ${rel(f)}`;
  textLines.forEach((line, i) => {
    // 코드 줄(클래스·import)은 건너뛰고 한글이 있는 줄만 본다
    if (!/[가-힣]/.test(line)) return;
    const visible = line.replace(/className\s*=\s*(?:"[^"]*"|\{`[^`]*`\})/g, "");
    for (const r of SITE_COPY_RULES) {
      const m = visible.match(r.re);
      if (m) warn(key, `${i + 1}행: 「${m[0]}」 — ${r.why}`);
    }
    for (const b of BANNED_PHRASES) {
      if (b.pattern.test(visible)) warn(key, `${i + 1}행: 금지 표현 ${b.pattern} — ${b.why}`);
    }
  });
}

// ───────── 6-1. 홈 갤러리 카드 데이터 (실존 이름·수치) ─────────
//
// 왜 따로 두나: 홈 갤러리 카드(제작 대상·요약·하이라이트)는 화면과 카드 모달에 그대로 실리는데
// 어느 검사에도 들어가지 않았다 — 데모 소스 스캔은 <slug> 폴더만 돌고, 사이트 문구 검사는 파일 목록만 본다.
// 그 사이로 실존 호텔·해운·오디오·미식 가이드 브랜드가 카드 설명에 박힌 채 「ERROR 0」이 나왔다(실측 2026-09-17).
// SITE_COPY_RULES(실시간·100% 같은 태문 자기 목소리 규칙)는 여기 걸지 않는다 — 데모 기능 설명이라 뜻이 다르다.
//
// 2026-09-17: 카드 문구를 전부 정리해 이 파일이 깨끗해졌으므로 ERROR 로 올렸다(그 전에는 WARN — 고칠 수
//    없는 남의 파일을 빨간불로 두면 전원의 커밋이 막히기 때문). 새 카드에 실존 기업·브랜드·인증 이름이
//    들어오면 여기서 막힌다. 되돌리지 말고 카드 문구를 고칠 것.
const GALLERY_DATA_SEVERITY = "error";
{
  const galleryFile = path.join(ROOT, "src", "lib", "portfolio", "galleryData.ts");
  if (fs.existsSync(galleryFile)) {
    const sev = GALLERY_DATA_SEVERITY === "error" ? error : warn;
    const gsrc = fs.readFileSync(galleryFile, "utf8");
    const textLines = stripCommentsForText(gsrc).split(/\r?\n/);
    const galleryKey = `갤러리 카드 ${rel(galleryFile)}`;
    scanCopyForImpersonation(galleryKey, textLines, { impersonation: sev, report: sev });
    scanGalleryThumbnails(galleryKey, gsrc);
  }
}

// ───────── 6-2. 데모 공용 파일(태문 자기 목소리) 문구 (WARN) ─────────
//
// 왜 따로 두나: 기기 전환 툴바(src/components/demos/DevicePreviewFrame.tsx)는 데모 12종 **전부**를 감싸는데
// 어느 검사에도 안 들어갔다 — 소스 검사는 <slug> 폴더만 돌고, 사이트 문구 검사는 파일 목록만 본다.
// 그 사이로 「100% PRODUCTION READY」가 데모 전부에 붙은 채 지나갔다(실측).
// CSS 값(width:"100%")에 걸리지 않도록 **단정 문구 모양**만 본다.
const SHARED_DEMO_COPY_RULES = [
  { re: /100\s*%\s*(?:PRODUCTION|보장|완전|완벽|이전|충족|해소|달성|검증|대응)/i, why: "100% 단정 — 계약서로 지킬 수 있는 문장으로" },
  { re: /무결점|무상 하자보증|하자 보증/, why: "지킬 수 없는 약속" },
  { re: /압도적|업계 최고|최고의|무조건/, why: "근거 없는 최상급" },
];
{
  const sharedDir = path.join(ROOT, "src", "components", "demos");
  const sharedFiles = fs.existsSync(sharedDir)
    ? fs
        .readdirSync(sharedDir, { withFileTypes: true })
        .filter((d) => d.isFile() && /\.(tsx|ts)$/.test(d.name))
        .map((d) => path.join(sharedDir, d.name))
    : [];
  for (const f of sharedFiles) {
    const textLines = stripCommentsForText(fs.readFileSync(f, "utf8")).split(/\r?\n/);
    const key = `사이트 문구 ${rel(f)}`;
    textLines.forEach((line, i) => {
      for (const r of SHARED_DEMO_COPY_RULES) {
        const m = line.match(r.re);
        if (m) warn(key, `${i + 1}행: 「${m[0]}」 — ${r.why} (데모 전부에 붙는 공용 툴바 문구입니다)`);
      }
    });
  }
}

// ───────── 실측 (--base) ─────────
const livePages = [];
if (BASE) {
  const decode = (s) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;|&#39;/g, "'")
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
  const attrs = (tag) => {
    const o = {};
    for (const m of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) o[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? "");
    return o;
  };
  const samePath = (a, b) => a.replace(/\/+$/, "") === b.replace(/\/+$/, "");

  const targets = [
    // 홈은 레이아웃 기본 제목이 곧 홈 제목이다 — 기본 제목 검사만 뺀다(canonical·og:url 은 본다)
    { path: "/", sample: false, home: true },
    { path: "/portfolio", sample: false },
    { path: "/inquiry", sample: false },
  ];
  for (const s of sampleSources) {
    if (!cardSlugs.has(s.slug)) continue; // 카드 없는 폴더는 목록 밖 — 정적 WARN 으로 충분
    const card = cards.find((c) => c.slug === s.slug || c.item.liveUrl === `/demo/${s.slug}`);
    targets.push({
      path: `/demo/${s.slug}`,
      sample: s.group === "demos" || card?.item.kind === "sample",
      kind: card?.item.kind ?? null,
      slug: s.slug,
    });
  }

  const imgCache = new Map();
  async function checkImage(url) {
    if (imgCache.has(url)) return imgCache.get(url);
    const run = async () => {
      try {
        let res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
        if ([400, 403, 405, 501].includes(res.status)) {
          res = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(8000) });
          await res.body?.cancel();
        }
        return res.status === 200 ? null : `상태 ${res.status}`;
      } catch (e) {
        return e.name === "TimeoutError" ? "8초 안에 응답 없음" : `요청 실패 — ${e.message}`;
      }
    };
    const p = run();
    imgCache.set(url, p);
    return p;
  }

  let serverDown = false;
  for (const t of targets) {
    const pageUrl = `${BASE}${t.path}`;
    const key = `실측 ${pageUrl}`;
    if (t.slug) keySlug.set(key, t.slug);
    livePages.push(pageUrl);
    let res;
    let html;
    try {
      res = await fetch(pageUrl, { redirect: "manual", signal: AbortSignal.timeout(90000) });
      html = await res.text();
    } catch (e) {
      error(key, `요청 실패 — ${e.cause?.code ?? e.message}${e.name === "TimeoutError" ? " (90초)" : ""}`);
      if (e.cause?.code === "ECONNREFUSED") {
        serverDown = true;
        break;
      }
      continue;
    }
    if (res.status !== 200) {
      error(key, `상태 ${res.status}${res.headers.get("location") ? ` → ${res.headers.get("location")}` : ""} (200 이어야 합니다)`);
      continue;
    }
    const head = html.split(/<\/head>/i)[0];
    const titleM = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleM ? decode(titleM[1]).trim() : "";
    if (!title) error(key, "<title> 이 없습니다");
    else if ((!t.home && title.includes(SITE_DEFAULT_TITLE)) || title === DEMOS_DEFAULT_TITLE) {
      error(key, `<title> 이 레이아웃 기본 제목 「${title}」 입니다 — 페이지 metadata.title 을 지정하세요`);
    }

    const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
    const links = [...html.matchAll(/<link\b[^>]*>/gi)].map((m) => attrs(m[0]));
    const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] ?? "";
    if (t.sample) {
      const robots = metas.filter((m) => (m.name ?? "").toLowerCase() === "robots").map((m) => m.content ?? "");
      if (!robots.some((c) => /noindex/i.test(c))) {
        error(key, `샘플인데 <meta name="robots"> 에 noindex 가 없습니다${robots.length ? ` (현재 「${robots.join(" / ")}」)` : ""} — 가상 브랜드가 검색에 뜹니다`);
      }
      if (/\bclass\s*=\s*["'][^"']*\bdark\b/.test(htmlTag)) error(key, "샘플인데 <html class=\"dark\"> — 사이트 틀 레이아웃을 물려받았습니다. (demos) 로 옮기세요");
      if (/application\/ld\+json/i.test(html)) error(key, "샘플인데 JSON-LD 가 있습니다 — 태문 사업자 정보가 가상 브랜드 페이지에 붙습니다. (demos) 로 옮기세요");
      // 상단 태문 표시 — 지금은 기기 전환 툴바(DevicePreviewFrame)가 맡고, 툴바 없는 샘플은 SampleSiteBar 가 맡는다.
      // 둘 중 하나는 반드시 있어야 「누가 만든 무슨 화면인지」와 포트폴리오·제작 문의 길이 화면에 남는다.
      // 표시 문구는 툴바(아라 DevicePreviewFrame: 「태문 DEV STUDIO 직영 …」)와 SampleSiteBar 가 서로 다르다.
      // 클라이언트에서 그려지는 툴바는 SSR HTML 본문 대신 RSC 페이로드에 실리므로 문자열 존재로 판정한다.
      const hasStudioBar = html.includes("태문 DEV STUDIO");
      if (!hasStudioBar) {
        error(
          key,
          "상단 태문 표시가 없습니다 — 기기 전환 툴바(DevicePreviewFrame, <Slug>PageClient) 또는 SampleSiteBar 중 하나는 있어야 합니다",
        );
      }
      if (t.kind === "proposal" && !PROPOSAL_DISCLOSURE.test(html)) {
        error(
          key,
          "제안용 시안인데 화면에 「제안용으로 만든 시안 · 해당 회사가 만들었거나 의뢰한 사이트가 아닙니다」 고지가 없습니다 — 툴바 disclaimer 와 화면 안 고지 띠를 확인하세요",
        );
      }
    } else {
      const canon = links.find((l) => (l.rel ?? "").toLowerCase().split(/\s+/).includes("canonical"));
      if (!canon?.href) error(key, "canonical 이 없습니다 — alternates.canonical 을 자기 주소로");
      else {
        let canonPath;
        try {
          canonPath = new URL(canon.href, pageUrl).pathname;
        } catch {
          canonPath = canon.href;
        }
        if (!samePath(decodeURIComponent(canonPath), t.path)) {
          error(key, `canonical 이 자기 주소가 아닙니다 — 「${canon.href}」 (기대 ${t.path})`);
        }
      }
      const ogUrl = metas.find((m) => (m.property ?? "").toLowerCase() === "og:url")?.content;
      if (ogUrl) {
        let ogPath;
        try {
          ogPath = new URL(ogUrl, pageUrl).pathname;
        } catch {
          ogPath = ogUrl;
        }
        if (!samePath(decodeURIComponent(ogPath), t.path)) {
          error(key, `og:url 이 자기 주소가 아닙니다 — 「${ogUrl}」 (기대 ${t.path}). 페이지 metadata 에 openGraph 를 선언하세요(공유 미리보기가 홈으로 샙니다)`);
        }
      }
    }

    const srcs = [];
    for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
      const src = attrs(m[0]).src;
      if (!src || src.startsWith("data:") || src.startsWith("blob:")) continue;
      let abs;
      try {
        abs = new URL(src, pageUrl).href;
      } catch {
        warn(key, `이미지 주소 해석 불가 「${src}」`);
        continue;
      }
      if (!srcs.includes(abs)) srcs.push(abs);
    }
    const checked = srcs.slice(0, 30);
    const results = await Promise.all(checked.map(async (u) => [u, await checkImage(u)]));
    for (const [u, problem] of results) if (problem) warn(key, `이미지 ${problem} — ${u}`);
    if (srcs.length > 30) warn(key, `<img> ${srcs.length}개 중 앞 30개만 확인했습니다`);
  }
  if (serverDown) error(`실측 ${BASE}`, `서버에 연결할 수 없습니다 — ${BASE} 가 떠 있는지 확인하세요. 나머지 실측은 건너뜁니다`);
}

// ───────── 출력 ─────────
let errors = 0;
let warns = 0;
let promoted = 0;
const header = `포트폴리오 입고 검사 — 카드 ${jsonFiles.length}개 · 샘플 소스 파일 ${scannedFiles.size}개 · 사이트 문구 파일 ${siteCopyFiles.length}개${BASE ? ` · 실측 페이지 ${livePages.length}개 (${BASE})` : ""}${STRICT_SLUGS.size ? ` · strict ${[...STRICT_SLUGS].join(",")}` : ""}`;
console.log(header);
if (siteDemoSlugs.length) {
  console.log(`  참고: (site)/demo 폴더 ${siteDemoSlugs.join(", ")} — 샘플은 (demos)/demo 에 둡니다`);
}
for (const s of STRICT_SLUGS) {
  if (!jsonSlugs.has(s) && !demosSlugs.includes(s)) console.log(`  참고: --strict 「${s}」 에 해당하는 카드·폴더가 없습니다`);
}
const keys = [...report.keys()].sort((a, b) => {
  const rank = (k) => (k.startsWith("실측 ") ? 2 : k.startsWith("사이트 문구 ") ? 1 : 0);
  return rank(a) - rank(b) || a.localeCompare(b);
});
for (const k of keys) {
  const strict = STRICT_SLUGS.has(keySlug.get(k) ?? "");
  const items = report
    .get(k)
    .map((it) => (strict && it.level === "WARN" ? { level: "ERROR", msg: `(strict) ${it.msg}`, promoted: true } : it))
    .sort((a, b) => (a.level === b.level ? 0 : a.level === "ERROR" ? -1 : 1));
  console.log(`\n■ ${k}`);
  for (const it of items) {
    if (it.level === "ERROR") errors += 1;
    else warns += 1;
    if (it.promoted) promoted += 1;
    console.log(`  ${it.level === "ERROR" ? "ERROR" : "WARN "}  ${it.msg}`);
  }
}
console.log(
  `\n요약: ${errors === 0 && warns === 0 ? "통과" : `ERROR ${errors}${promoted ? ` (strict 승격 ${promoted})` : ""} · WARN ${warns}`} — 문제 있는 곳 ${keys.length} / 카드 ${jsonFiles.length} · 소스 ${scannedFiles.size}${BASE ? ` · 실측 ${livePages.length}` : ""}${errors ? " → 입고 불가" : ""}`,
);
// process.exit() 은 쓰지 않는다 — 실측 fetch 의 keep-alive 소켓이 열린 채 끊으면 Windows Node 가
// libuv assertion(UV_HANDLE_CLOSING)으로 죽어 종료코드가 3221226505 로 바뀐다(실측).
process.exitCode = errors > 0 ? 1 : 0;
