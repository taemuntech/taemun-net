#!/usr/bin/env node
// 포트폴리오 썸네일 자동 촬영 — npm run capture:thumbs [-- --base http://localhost:3001 --only a,b --force]
//
// 로컬 Chrome(없으면 Edge) 헤드리스를 DevTools 프로토콜(Node 내장 WebSocket)로 몰아 찍는다. 새 의존성 없음.
// CLI `--screenshot --window-size=390,844` 는 Windows 헤드리스에서 창 최소 폭 500px 에 걸려
// 레이아웃이 500px 로 잡히고 390px 만 잘려 찍힌다(innerWidth 500 실측) — 그래서 Emulation 으로 뷰포트를 직접 지정한다.
// 대상: liveUrl 이 내부(/demo/…)이고 thumbnail 을 직접 지정하지 않은 카드.
// 결과: public/portfolio/<slug>/desktop.png (1440×900) · mobile.png (390×844, 모바일 UA)
// 경로 규칙은 schema.ts 의 defaultThumbnail 을 그대로 쓴다.

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.removeAllListeners("warning");
process.on("warning", (w) => {
  if (w.code === "MODULE_TYPELESS_PACKAGE_JSON") return;
  console.warn(`${w.name}: ${w.message}`);
});

const { validatePortfolioItem, defaultThumbnail } = await import("../src/lib/portfolio/schema.ts");

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIR = path.join(ROOT, "src", "content", "portfolio");
const PUBLIC_DIR = path.join(ROOT, "public");
const MIN_BYTES = 1024;
const CAPTURE_TIMEOUT_MS = 90_000;
const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

const SHOTS = [
  { name: "desktop", width: 1440, height: 900, mobile: false, ua: null },
  { name: "mobile", width: 390, height: 844, mobile: true, ua: MOBILE_UA },
];
/** load 이벤트 뒤 애니메이션·지연 이미지가 자리 잡을 시간 */
const SETTLE_MS = 3000;

function chromeCandidates() {
  const list = [];
  if (process.env.CHROME_PATH) list.push(["CHROME_PATH", process.env.CHROME_PATH]);
  list.push(["Chrome", "C:/Program Files/Google/Chrome/Application/chrome.exe"]);
  list.push(["Chrome (x86)", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"]);
  if (process.env.LOCALAPPDATA) {
    list.push(["Chrome (사용자 설치)", path.join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe")]);
  }
  list.push(["Edge", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"]);
  return list;
}
function findChrome() {
  for (const [label, p] of chromeCandidates()) {
    if (p && fs.existsSync(p)) return { label, path: p };
  }
  return null;
}

// ───────── 인자 ─────────
const argv = process.argv.slice(2);
function argValue(name) {
  const i = argv.indexOf(name);
  if (i !== -1) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith(`${name}=`));
  return eq ? eq.slice(name.length + 1) : undefined;
}

if (argv.includes("--help") || argv.includes("-h")) {
  const chrome = findChrome();
  console.log(`포트폴리오 썸네일 자동 촬영

사용법
  npm run capture:thumbs                                   http://localhost:3001 에서 전부(이미 있는 파일은 건너뜀)
  npm run capture:thumbs -- --base http://localhost:3055   다른 서버
  npm run capture:thumbs -- --only atelier-vaucluse,foo    일부만
  npm run capture:thumbs -- --force                        이미 있어도 다시 찍기

대상   liveUrl 이 /demo/… 이고 thumbnail 을 직접 지정하지 않은 카드 (src/content/portfolio/*.json)
결과   public/portfolio/<slug>/desktop.png (1440×900) · mobile.png (390×844, 모바일 UA)
브라우저 탐지 순서  CHROME_PATH → Chrome → Chrome(x86) → LOCALAPPDATA Chrome → Edge
${chromeCandidates()
  .map(([label, p]) => `  ${fs.existsSync(p) ? "있음" : "없음"}  ${label}: ${p}`)
  .join("\n")}
사용할 브라우저: ${chrome ? `${chrome.label} — ${chrome.path}` : "찾지 못함 (CHROME_PATH 환경변수로 지정하세요)"}

서버는 이 스크립트가 띄우지 않습니다. 먼저 dev/start 서버를 켜 두세요.`);
  process.exit(0);
}

const BASE = (argValue("--base") ?? "http://localhost:3001").replace(/\/+$/, "");
if (!/^https?:\/\/[^/]+/.test(BASE)) {
  console.error(`--base 값 「${BASE}」 가 http(s):// 주소가 아닙니다`);
  process.exit(2);
}
const onlyArg = argValue("--only");
const ONLY = onlyArg ? new Set(onlyArg.split(",").map((s) => s.trim()).filter(Boolean)) : null;
const FORCE = argv.includes("--force");

const chrome = findChrome();
if (!chrome) {
  console.error("Chrome/Edge 를 찾지 못했습니다 — CHROME_PATH 환경변수에 chrome.exe 경로를 지정하세요");
  process.exit(2);
}

// ───────── 대상 고르기 ─────────
const files = fs.existsSync(CONTENT_DIR) ? fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".json")).sort() : [];
const targets = [];
const notes = [];
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8").replace(/^\uFEFF/, ""));
  } catch (e) {
    notes.push(`건너뜀 ${f}: JSON 문법 오류 — ${e.message}`);
    continue;
  }
  if (ONLY && !ONLY.has(slug)) continue;
  const problems = validatePortfolioItem(raw, slug);
  if (problems.length) {
    notes.push(`건너뜀 ${f}: 규격 위반 ${problems.length}건 (npm run audit:portfolio 로 확인)`);
    continue;
  }
  if (!raw.liveUrl.startsWith("/demo/")) {
    if (ONLY) notes.push(`건너뜀 ${slug}: 외부 주소(${raw.liveUrl})라 촬영 대상이 아닙니다 — thumbnail 을 직접 넣으세요`);
    continue;
  }
  if (raw.thumbnail !== undefined) {
    if (ONLY) notes.push(`건너뜀 ${slug}: thumbnail 을 직접 지정한 카드입니다`);
    continue;
  }
  targets.push({ slug, url: `${BASE}${raw.liveUrl}`, thumb: defaultThumbnail(slug) });
}
if (ONLY) {
  const known = new Set(files.map((f) => f.replace(/\.json$/, "")));
  for (const s of ONLY) if (!known.has(s)) notes.push(`--only 「${s}」: 카드 JSON 이 없습니다`);
}

console.log(`썸네일 촬영 — 대상 ${targets.length}개 · ${BASE} · ${chrome.label}${FORCE ? " · 강제 재촬영" : ""}`);
for (const n of notes) console.log(`  ${n}`);
if (targets.length === 0) {
  console.log("\n요약: 찍을 대상이 없습니다");
  process.exit(0);
}

// 서버가 떠 있는지 먼저 — 안 떠 있으면 Chrome 이 에러 페이지를 찍어 1KB 를 넘겨 버린다
try {
  await fetch(BASE, { method: "GET", redirect: "manual", signal: AbortSignal.timeout(30_000) }).then((r) => r.body?.cancel());
} catch (e) {
  console.error(`\n서버에 연결할 수 없습니다 — ${BASE} (${e.cause?.code ?? e.message}). 서버를 먼저 켜세요`);
  process.exit(1);
}

// ───────── 촬영 ─────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 한 장 찍기: Chrome 헤드리스를 띄워 DevTools 로 뷰포트·UA 를 지정하고 load 뒤 SETTLE_MS 기다려 PNG 를 tmpFile 에 쓴다.
 * @returns {Promise<{ error: string | null, out: string }>}
 */
async function captureShot({ url, shot, profileDir, tmpFile }) {
  const child = spawn(
    chrome.path,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDir}`,
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"], windowsHide: true },
  );
  let out = "";
  let exited = false;
  child.on("exit", () => {
    exited = true;
  });
  const wsUrl = await new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 30_000);
    const onData = (b) => {
      out = (out + b.toString()).slice(-4000);
      const m = out.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) {
        clearTimeout(timer);
        resolve(m[1]);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("error", (e) => {
      out += `\n${e.message}`;
      clearTimeout(timer);
      resolve(null);
    });
    child.on("exit", () => {
      clearTimeout(timer);
      resolve(null);
    });
  });
  if (!wsUrl) {
    if (!exited) child.kill();
    return { error: "DevTools 연결 주소를 받지 못함", out };
  }

  const ws = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  const waiters = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(typeof ev.data === "string" ? ev.data : Buffer.from(ev.data).toString());
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(`${msg.error.message}`));
      else resolve(msg.result);
    } else if (msg.method) {
      for (const w of waiters) if (w.method === msg.method && w.sessionId === msg.sessionId) w.resolve(msg.params);
    }
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  const waitEvent = (method, sessionId) => new Promise((resolve) => waiters.push({ method, sessionId, resolve }));

  const run = async () => {
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", () => reject(new Error("DevTools WebSocket 연결 실패")), { once: true });
    });
    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send(
      "Emulation.setDeviceMetricsOverride",
      { width: shot.width, height: shot.height, deviceScaleFactor: 1, mobile: shot.mobile },
      sessionId,
    );
    if (shot.mobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 }, sessionId);
    if (shot.ua) await send("Emulation.setUserAgentOverride", { userAgent: shot.ua }, sessionId);
    const loaded = waitEvent("Page.loadEventFired", sessionId);
    const nav = await send("Page.navigate", { url }, sessionId);
    if (nav.errorText) throw new Error(`이동 실패 — ${nav.errorText}`);
    await loaded;
    await sleep(SETTLE_MS);
    const { data } = await send("Page.captureScreenshot", { format: "png" }, sessionId);
    fs.writeFileSync(tmpFile, Buffer.from(data, "base64"));
    await send("Browser.close").catch(() => {});
  };

  let error = null;
  try {
    await Promise.race([
      run(),
      sleep(CAPTURE_TIMEOUT_MS).then(() => {
        throw new Error(`${CAPTURE_TIMEOUT_MS / 1000}초 초과`);
      }),
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    try {
      ws.close();
    } catch {
      // 이미 닫힘
    }
    for (let i = 0; i < 20 && !exited; i++) await sleep(100);
    if (!exited) child.kill();
  }
  return { error, out };
}

let ok = 0;
let skipped = 0;
const failed = [];
for (const t of targets) {
  const profileDir = path.join(os.tmpdir(), `taemun-thumbs-${t.slug}`);
  for (const shot of SHOTS) {
    const publicPath = t.thumb[shot.name];
    const outFile = path.join(PUBLIC_DIR, publicPath.replace(/^\/+/, ""));
    const label = `${t.slug} ${shot.name}`;
    if (!FORCE && fs.existsSync(outFile)) {
      skipped += 1;
      console.log(`  건너뜀  ${label} — 이미 있음 (다시 찍으려면 --force)`);
      continue;
    }
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    // 임시 이름에 찍고 검사 통과 후 교체 — 실패해도 옛 썸네일이 남고, 옛 파일 크기로 성공을 착각하지 않는다
    const tmpFile = `${outFile}.capturing.png`;
    fs.rmSync(tmpFile, { force: true });
    const started = Date.now();
    // 오류·404 화면을 썸네일로 굳히지 않게 상태부터 본다
    let status = 0;
    try {
      const res = await fetch(t.url, { redirect: "manual", signal: AbortSignal.timeout(60_000) });
      status = res.status;
      await res.body?.cancel();
    } catch {
      status = 0;
    }
    const r =
      status === 200
        ? await captureShot({ url: t.url, shot, profileDir, tmpFile })
        : { error: `페이지 상태 ${status || "응답 없음"} (200 이어야 찍습니다)`, out: "" };
    const secs = ((Date.now() - started) / 1000).toFixed(1);
    const size = fs.existsSync(tmpFile) ? fs.statSync(tmpFile).size : 0;
    if (r.error || size < MIN_BYTES) {
      fs.rmSync(tmpFile, { force: true });
      const why = r.error ?? (size === 0 ? "파일이 생기지 않음" : `파일이 ${size}B 로 1KB 미만`);
      failed.push(`${label}: ${why}`);
      console.log(`  실패    ${label} — ${why} (${secs}초)`);
      const tail = r.out.trim().split(/\r?\n/).slice(-3).join("\n          ");
      if (tail) console.log(`          ${tail}`);
      continue;
    }
    fs.renameSync(tmpFile, outFile);
    ok += 1;
    console.log(`  완료    ${label} — public${publicPath} ${(size / 1024).toFixed(0)}KB (${secs}초)`);
  }
  try {
    fs.rmSync(profileDir, { recursive: true, force: true });
  } catch {
    // Chrome 이 프로필 잠금을 늦게 푸는 경우 — 임시 폴더라 남아도 무해
  }
}

console.log(`\n요약: 완료 ${ok} · 건너뜀 ${skipped} · 실패 ${failed.length}${failed.length ? ` — ${failed.join(" / ")}` : ""}`);
// process.exit() 대신 — 앞의 서버 확인 fetch 소켓이 남아 있으면 Windows Node 가 종료 중 assertion 으로 죽는다
process.exitCode = failed.length ? 1 : 0;
