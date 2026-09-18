#!/usr/bin/env node
// 데모 QA 하네스 — node scripts/qa-demos.mjs --base http://127.0.0.1:3093 [--only a,b] [--widths 375,768,1440]
//
// 로컬 Chrome(없으면 Edge) 헤드리스를 DevTools 프로토콜(Node 내장 WebSocket)로 몰아
// 데모 한 종을 화면 3종(375 모바일 UA · 768 · 1440)에서 열고 「팔 수 있는 품질」을 기계로 잰다.
// 새 의존성 없음 — 구조는 scripts/capture-portfolio-thumbs.mjs 를 그대로 물려받았다.
//
// ⚠️ **틀 안쪽을 잰다.** /demo/<slug> 는 대개 DevicePreviewFrame(상단 툴바 + iframe) 이고,
//    진짜 상품은 그 iframe 안의 /demo/<slug>?embed=true 다. 바깥 문서를 재면 iframe 은 자기 안의
//    가로 넘침·죽은 링크를 부모 scrollWidth 로 올려 보내지 않아 **무엇을 재도 초록**이 나온다
//    (실측: nexus-robotics 바깥 문서는 3화면 모두 넘침 0·죽은 링크 0).
//    그래서 바깥 HTML 에 embed=true 가 보이면 자동으로 안쪽 주소로 갈아타 잰다. --frame 을 주면 바깥을 잰다.
//
// 재는 것 (화면마다)
//   1. 가로 넘침        **목표 폭 기준** scrollWidth > min(innerWidth, 목표폭) + 1 · 원인 요소 최대 5개(가장 바깥쪽)
//                       (innerWidth 로 재면 안 된다 — 모바일에서 내용이 넘치면 Chrome 이 레이아웃 뷰포트를
//                        내용 폭까지 넓혀 축소 렌더하므로 scrollWidth === innerWidth 가 되어 항상 초록이 나온다)
//   2. 콘솔 에러·경고   Runtime.consoleAPICalled + Runtime.exceptionThrown
//   3. 실패한 요청      4xx·5xx·loadingFailed (깨진 이미지 탐지)
//   4. 작은 탭 대상     모바일에서만 — a,button,[role=button],input,select 중 44px 미만
//   5. 죽은 링크        a[href="#"] 개수 · a[href^="#"] 중 대상 id 가 문서에 없는 것
//   6. 가로 잘림 의심   scrollWidth > clientWidth + 2 인 텍스트 요소
//   결과물             .qa/<slug>/<width>.png · <width>-full.png · .qa/report.json · .qa/report.md
//
// 정적 정보도 같이 모은다 (다음 단계가 쓴다)
//   - audit-portfolio.mjs 결과 중 그 slug 에 해당하는 ERROR·WARN 줄
//   - slug 폴더 안 href="#" · onClick 없는 <button> · alert( · 외부 이미지 호스트 참조 개수
//
// 종료코드: 측정 자체가 실패한 화면이 있으면 1, 아니면 0 (품질 결함 개수로는 안 죽는다 — 기준선을 뜨는 도구다)

import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

process.removeAllListeners("warning");
process.on("warning", (w) => {
  if (w.code === "MODULE_TYPELESS_PACKAGE_JSON") return;
  console.warn(`${w.name}: ${w.message}`);
});

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const QA_DIR = path.join(ROOT, ".qa");
const CONTENT_DIR = path.join(ROOT, "src", "content", "portfolio");
/** 샘플 화면 코드 폴더 — 표준은 src/components/demos/<slug>/, 옛 위치가 src/components/demo/<slug>/ */
const COMPONENT_DEMO_DIRS = [
  path.join(ROOT, "src", "components", "demos"),
  path.join(ROOT, "src", "components", "demo"),
];
const ROUTE_DEMO_DIR = path.join(ROOT, "src", "app", "(demos)", "demo");

const DEFAULT_SLUGS = [
  "nexus-robotics",
  "h2-next",
  "celebris-biopharma",
  "nano-advanced",
  "stella-orbital",
  "apex-partners",
  "atlas-resort",
  "transocean-scm",
  "voltron-ev",
  "greencube-agri",
];

const MOBILE_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

/** 화면 3종 — 형이 정한 모바일 375 · 태블릿 768 · 데스크톱 1440 */
const VIEWPORTS = [
  { width: 375, height: 812, mobile: true, ua: MOBILE_UA, label: "모바일" },
  { width: 768, height: 1024, mobile: true, ua: MOBILE_UA, label: "태블릿" },
  { width: 1440, height: 900, mobile: false, ua: null, label: "데스크톱" },
];

/** 탭 대상 최소 변 길이(px) — 형 기준 */
const MIN_TAP_PX = 44;
/**
 * 본문 최대 폭(px) — 형 규칙(2026-09-18) 「본문은 max-w-7xl(1280px) 안에, 배경은 끝까지」.
 * 데스크톱(1440) 화면에서 잰다 — 폭 제한이 없는 데모는 여기서 1340~1400 으로 잡힌다. 16px 은 반올림·테두리 여유.
 */
const CONTENT_MAX_PX = 1280 + 16;
/** load 뒤 애니메이션·지연 이미지가 자리 잡을 시간 */
const SETTLE_MS = 3000;
const PAGE_TIMEOUT_MS = 120_000;
/** 전체 페이지 스크린샷 높이 상한 — 무한 스크롤·아주 긴 페이지에서 PNG 가 수백 MB 로 튀는 걸 막는다 */
const MAX_FULL_PAGE_PX = 12_000;

// ───────── 인자 ─────────
const argv = process.argv.slice(2);
function argValue(name) {
  const i = argv.indexOf(name);
  if (i !== -1) return argv[i + 1];
  const eq = argv.find((a) => a.startsWith(`${name}=`));
  return eq ? eq.slice(name.length + 1) : undefined;
}

function chromeCandidates() {
  const list = [];
  if (process.env.CHROME_PATH) list.push(["CHROME_PATH", process.env.CHROME_PATH]);
  list.push(["Chrome", "C:/Program Files/Google/Chrome/Application/chrome.exe"]);
  list.push(["Chrome (x86)", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"]);
  if (process.env.LOCALAPPDATA) {
    list.push([
      "Chrome (사용자 설치)",
      path.join(process.env.LOCALAPPDATA, "Google", "Chrome", "Application", "chrome.exe"),
    ]);
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

if (argv.includes("--help") || argv.includes("-h")) {
  const chrome = findChrome();
  console.log(`데모 QA 하네스 — 가로 넘침·콘솔 에러·실패 요청·작은 탭 대상·죽은 링크·가로 잘림

사용법
  node scripts/qa-demos.mjs --base http://127.0.0.1:3093
  node scripts/qa-demos.mjs --base http://127.0.0.1:3093 --only nexus-robotics,h2-next
  node scripts/qa-demos.mjs --base http://127.0.0.1:3093 --widths 375,1440
  node scripts/qa-demos.mjs --base http://127.0.0.1:3093 --no-audit        정적 검사(audit-portfolio) 건너뛰기
  node scripts/qa-demos.mjs --base http://127.0.0.1:3093 --frame           틀(DevicePreviewFrame) 바깥을 잰다 (기본은 안쪽 ?embed=true)
  node scripts/qa-demos.mjs --base http://127.0.0.1:3093 --selftest        「에러 0」 이 수집기가 죽어서 0인지 화면마다 검증

기본 대상  ${DEFAULT_SLUGS.join(",")}
결과       .qa/<slug>/<width>.png · <width>-full.png · .qa/report.json · .qa/report.md
브라우저   ${chrome ? `${chrome.label} — ${chrome.path}` : "찾지 못함 (CHROME_PATH 로 지정하세요)"}

서버는 이 스크립트가 띄우지 않습니다 — npx next build 뒤 next start -p 3093 으로 먼저 켜 두세요.`);
  process.exit(0);
}

const BASE = (argValue("--base") ?? "http://127.0.0.1:3093").replace(/\/+$/, "");
if (!/^https?:\/\/[^/]+/.test(BASE)) {
  console.error(`--base 값 「${BASE}」 가 http(s):// 주소가 아닙니다`);
  process.exit(2);
}
const onlyArg = argValue("--only");
const SLUGS = onlyArg
  ? onlyArg.split(",").map((s) => s.trim()).filter(Boolean)
  : DEFAULT_SLUGS;
const widthsArg = argValue("--widths");
const SHOTS = widthsArg
  ? widthsArg
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 0)
      .map((w) => VIEWPORTS.find((v) => v.width === w) ?? { width: w, height: 900, mobile: w < 1024, ua: w < 1024 ? MOBILE_UA : null, label: `${w}px` })
  : VIEWPORTS;
const RUN_AUDIT = !argv.includes("--no-audit");
/** true 면 틀 바깥(/demo/<slug>)을 잰다 — 기본은 틀 안쪽(?embed=true) */
const MEASURE_FRAME = argv.includes("--frame");
/** 수집기가 살아 있는지 스스로 확인 — 화면마다 가짜 에러·예외·404 를 심고 잡히는지 본 뒤 도로 걷어낸다 */
const SELFTEST = argv.includes("--selftest");

const chrome = findChrome();
if (!chrome) {
  console.error("Chrome/Edge 를 찾지 못했습니다 — CHROME_PATH 환경변수에 chrome.exe 경로를 지정하세요");
  process.exit(2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ───────── 페이지 안에서 돌 측정기 ─────────
// 브라우저 컨텍스트에서 평가된다 — 여기서 Node API 를 쓰면 안 된다.
const probeExpr = (targetWidth) => `(() => {
  const MIN_TAP = ${MIN_TAP_PX};
  // ⚠️ **잰 폭(innerWidth)이 목표 폭과 다를 수 있다.** 모바일 에뮬레이션에서 내용이 device-width 를 넘치면
  //    Chrome 이 레이아웃 뷰포트를 내용 폭까지 **넓혀** 버린다(축소 렌더). 그러면 scrollWidth === innerWidth 라
  //    「가로 넘침 0」 이 나오지만 실제 폰에서는 지면이 통째로 축소돼 보인다 — 결함을 초록으로 덮는 가짜 초록이다.
  //    (실측: transocean-scm 375 화면에서 innerWidth 422 · 넘침 0 으로 보고됐다.)
  //    그래서 판정 기준은 innerWidth 가 아니라 **목표 폭**이다.
  const TARGET = ${targetWidth};
  const vw = window.innerWidth;
  const ref = Math.min(vw, TARGET);
  const viewportWidened = vw > TARGET + 1;
  const desc = (el) => {
    const cls = typeof el.className === "string" ? el.className : (el.getAttribute?.("class") ?? "");
    const text = (el.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 40);
    return {
      tag: el.tagName.toLowerCase(),
      cls: String(cls).slice(0, 120),
      id: el.id || "",
      text,
    };
  };

  // ── 1. 가로 넘침 원인 ──
  // ⚠️ html·body 에 overflow-x:hidden 이 걸려 있으면 scrollWidth 가 잘려 이 검사가 **조용히 항상 초록**이 된다.
  //    가린 건지 없는 건지 사람이 알 수 있게 같이 내보낸다.
  const htmlOx = getComputedStyle(document.documentElement).overflowX;
  const bodyOx = document.body ? getComputedStyle(document.body).overflowX : "";
  const overflowMasked = htmlOx === "hidden" || htmlOx === "clip" || bodyOx === "hidden" || bodyOx === "clip";
  const docW = document.documentElement.scrollWidth;
  const overflow = docW > ref + 1;
  const offenders = [];
  // 가려져 있으면 scrollWidth 는 안 늘지만 요소 rect 는 여전히 넘친다 — 그 경우에도 원인을 훑는다
  if (overflow || overflowMasked || viewportWidened) {
    const hits = [];
    for (const el of document.querySelectorAll("body *")) {
      const st = getComputedStyle(el);
      if (st.display === "none" || st.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right > ref + 1) hits.push({ el, right: r.right, width: r.width });
    }
    // 가장 바깥쪽 = 넘친 조상이 이미 목록에 있으면 자식은 뺀다
    const outer = hits.filter((h) => !hits.some((o) => o.el !== h.el && o.el.contains(h.el)));
    // 일부러 만든 가로 스크롤 상자(표·타임라인) 안쪽은 지면을 밀지 않는다 — 거짓 단서라 뒤로 미루고 표시해 둔다
    const inScrollBox = (el) => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const ox = getComputedStyle(a).overflowX;
        if (ox === "auto" || ox === "scroll") return true;
      }
      return false;
    };
    for (const h of outer) h.boxed = inScrollBox(h.el);
    outer.sort((a, b) => (a.boxed === b.boxed ? b.right - a.right : a.boxed ? 1 : -1));
    for (const h of outer.slice(0, 5)) {
      offenders.push({ ...desc(h.el), right: Math.round(h.right), width: Math.round(h.width), inScrollBox: h.boxed });
    }
  }

  // ── 4. 작은 탭 대상 ──
  const tapSel = "a,button,[role=button],input,select";
  const smallTaps = [];
  let smallTapCount = 0;
  for (const el of document.querySelectorAll(tapSel)) {
    const st = getComputedStyle(el);
    if (st.display === "none" || st.visibility === "hidden" || st.pointerEvents === "none") continue;
    if (el.disabled) continue;
    if (el.type === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue; // 안 보이는 것은 세지 않는다
    if (r.height < MIN_TAP || r.width < MIN_TAP) {
      smallTapCount += 1;
      if (smallTaps.length < 5) smallTaps.push({ ...desc(el), w: Math.round(r.width), h: Math.round(r.height) });
    }
  }

  // ── 5. 죽은 링크 ──
  let hashOnly = 0;
  const hashOnlySamples = [];
  const brokenAnchors = [];
  for (const a of document.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href") || "";
    if (href === "#") {
      hashOnly += 1;
      if (hashOnlySamples.length < 5) hashOnlySamples.push(desc(a));
      continue;
    }
    if (href.startsWith("#") && href.length > 1) {
      let id = href.slice(1);
      try { id = decodeURIComponent(id); } catch (e) { /* 그대로 */ }
      const found = document.getElementById(id) || document.getElementsByName(id).length > 0;
      if (!found && brokenAnchors.length < 20) brokenAnchors.push({ href, ...desc(a) });
    }
  }

  // ── 6. 가로 잘림 의심 (텍스트를 직접 가진 요소만) ──
  const clipped = [];
  let clippedCount = 0;
  for (const el of document.querySelectorAll("body *")) {
    if (el.children.length > 0) continue; // 잎 노드만 — 컨테이너의 scrollWidth 는 넘침과 섞인다
    const t = (el.textContent || "").trim();
    if (!t) continue;
    const st = getComputedStyle(el);
    if (st.display === "none" || st.visibility === "hidden") continue;
    if (st.overflowX === "auto" || st.overflowX === "scroll") continue; // 일부러 만든 가로 스크롤 상자
    // 화면 낭독기 전용 텍스트(sr-only)는 **일부러** 1px 상자에 가둔 것이라 잘림이 아니다.
    // Tailwind sr-only = position:absolute · w/h 1px · overflow:hidden · clip-path(또는 clip) 지정.
    // 보이는 상자가 1px 이하이면서 클립까지 걸려 있으면 접근성 텍스트로 보고 세지 않는다.
    const clipHidden = (st.clipPath && st.clipPath !== "none") || (st.clip && st.clip !== "auto");
    if (el.clientWidth <= 1 && el.clientHeight <= 1 && clipHidden) continue;
    if (el.scrollWidth > el.clientWidth + 2) {
      clippedCount += 1;
      if (clipped.length < 5) {
        clipped.push({ ...desc(el), scrollW: el.scrollWidth, clientW: el.clientWidth, overflow: st.overflow });
      }
    }
  }

  // ── 7. 본문 폭 — 글·제목이 좌우로 얼마나 퍼지는가 (2026-09-18 형 규칙: 본문 최대 1280px, 배경은 끝까지) ──
  // 1920px 에서 재 보니 57종 중 44종은 본문이 1280 안에 모였는데 11종은 화면 끝까지 퍼져 한 줄이 너무 길었다.
  // 배경·사진은 끝까지 가도 되므로 **글을 가진 블록**(제목·문단·목록)만 잰다. 화면 밖으로 삐져나간 흐름 띠·
  // 캐러셀이 값을 부풀리지 않게 화면 안(0 ~ innerWidth)으로 잘라서 본다(가로 넘침은 1번이 따로 잡는다).
  let contentWidth = 0;
  {
    let L = Infinity;
    let R = -Infinity;
    for (const el of document.querySelectorAll("h1,h2,h3,p,li")) {
      if ((el.textContent || "").trim().length <= 8) continue;
      const r = el.getBoundingClientRect();
      if (r.width <= 40 || r.height <= 0) continue;
      const st = getComputedStyle(el);
      if (st.display === "none" || st.visibility === "hidden") continue;
      L = Math.min(L, Math.max(0, r.left));
      R = Math.max(R, Math.min(vw, r.right));
    }
    if (R > L) contentWidth = Math.round(R - L);
  }

  // ── 곁다리: 깨진 <img> (naturalWidth 0) ──
  const brokenImgs = [];
  for (const img of document.querySelectorAll("img")) {
    if (img.complete && img.naturalWidth === 0) {
      if (brokenImgs.length < 10) brokenImgs.push({ src: (img.currentSrc || img.src || "").slice(0, 160), ...desc(img) });
    }
  }

  return {
    innerWidth: vw,
    targetWidth: TARGET,
    viewportWidened,
    scrollWidth: docW,
    bodyScrollHeight: document.body ? document.body.scrollHeight : 0,
    overflow,
    overflowBy: overflow ? docW - ref : 0,
    overflowMasked,
    overflowGuard: { html: htmlOx, body: bodyOx },
    offenders,
    smallTapCount,
    smallTaps,
    hashOnly,
    hashOnlySamples,
    brokenAnchors,
    clippedCount,
    clipped,
    contentWidth,
    brokenImgs,
    title: document.title,
    linkCount: document.querySelectorAll("a[href]").length,
    buttonCount: document.querySelectorAll("button").length,
  };
})()`;

// ───────── CDP 세션 (브라우저 하나를 재사용한다) ─────────
async function launchBrowser(profileDir) {
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
    throw new Error(`DevTools 연결 주소를 받지 못함 — ${out.trim().split(/\r?\n/).slice(-2).join(" / ")}`);
  }

  const ws = new WebSocket(wsUrl);
  let nextId = 1;
  const pending = new Map();
  /** @type {Array<{method: string, sessionId: string|undefined, handler: (p: unknown) => void}>} */
  const listeners = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(typeof ev.data === "string" ? ev.data : Buffer.from(ev.data).toString());
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
      return;
    }
    if (!msg.method) return;
    for (const l of listeners.slice()) {
      if (l.method === msg.method && l.sessionId === msg.sessionId) l.handler(msg.params);
    }
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = nextId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  const on = (method, sessionId, handler) => {
    const entry = { method, sessionId, handler };
    listeners.push(entry);
    return () => {
      const i = listeners.indexOf(entry);
      if (i !== -1) listeners.splice(i, 1);
    };
  };
  const once = (method, sessionId) =>
    new Promise((resolve) => {
      const off = on(method, sessionId, (p) => {
        off();
        resolve(p);
      });
    });

  await new Promise((resolve, reject) => {
    if (ws.readyState === 1) return resolve();
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", () => reject(new Error("DevTools WebSocket 연결 실패")), { once: true });
  });

  return {
    send,
    on,
    once,
    async close() {
      await send("Browser.close").catch(() => {});
      try {
        ws.close();
      } catch {
        // 이미 닫힘
      }
      for (let i = 0; i < 30 && !exited; i++) await sleep(100);
      if (!exited) child.kill();
    },
  };
}

/** 콘솔 인자 하나를 사람이 읽을 문자열로 */
function stringifyArg(a) {
  if (!a) return "";
  if (a.value !== undefined) return typeof a.value === "string" ? a.value : JSON.stringify(a.value);
  if (a.description) return a.description;
  if (a.unserializableValue) return String(a.unserializableValue);
  return a.type ?? "";
}

/**
 * 한 화면 측정 — 새 탭을 열고 뷰포트·UA 를 지정한 뒤 load + SETTLE_MS 를 기다려 재고 찍는다.
 * @returns {Promise<object>}
 */
async function measure(browser, { url, shot, outDir }) {
  const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
  const offs = [];
  const consoleErrors = [];
  const consoleWarnings = [];
  const exceptions = [];
  const failedRequests = [];
  /** requestId → url — Network.responseReceived 시점에 주소를 붙이려고 */
  const reqUrl = new Map();

  try {
    await browser.send("Page.enable", {}, sessionId);
    await browser.send("Runtime.enable", {}, sessionId);
    await browser.send("Network.enable", {}, sessionId);
    await browser.send("Log.enable", {}, sessionId).catch(() => {});

    offs.push(
      browser.on("Runtime.consoleAPICalled", sessionId, (p) => {
        const text = (p.args ?? []).map(stringifyArg).join(" ").slice(0, 400);
        if (p.type === "error") consoleErrors.push(text);
        else if (p.type === "warning") consoleWarnings.push(text);
      }),
    );
    offs.push(
      browser.on("Runtime.exceptionThrown", sessionId, (p) => {
        const d = p.exceptionDetails ?? {};
        const msg = d.exception?.description ?? d.text ?? "알 수 없는 예외";
        exceptions.push(String(msg).slice(0, 400));
      }),
    );
    offs.push(
      browser.on("Log.entryAdded", sessionId, (p) => {
        const e = p.entry ?? {};
        // 네트워크 실패는 Network 쪽에서 이미 센다 — 중복을 피한다
        if (e.source === "network") return;
        if (e.level === "error") consoleErrors.push(`[${e.source}] ${String(e.text ?? "").slice(0, 400)}`);
        else if (e.level === "warning") consoleWarnings.push(`[${e.source}] ${String(e.text ?? "").slice(0, 400)}`);
      }),
    );
    offs.push(
      browser.on("Network.requestWillBeSent", sessionId, (p) => {
        reqUrl.set(p.requestId, p.request?.url ?? "");
      }),
    );
    offs.push(
      browser.on("Network.responseReceived", sessionId, (p) => {
        const status = p.response?.status ?? 0;
        if (status >= 400) {
          failedRequests.push({
            status,
            type: p.type ?? "",
            url: String(p.response?.url ?? reqUrl.get(p.requestId) ?? "").slice(0, 200),
          });
        }
      }),
    );
    offs.push(
      browser.on("Network.loadingFailed", sessionId, (p) => {
        if (p.canceled) return;
        failedRequests.push({
          status: 0,
          type: p.type ?? "",
          url: String(reqUrl.get(p.requestId) ?? "").slice(0, 200),
          error: String(p.errorText ?? "").slice(0, 120),
        });
      }),
    );

    await browser.send(
      "Emulation.setDeviceMetricsOverride",
      { width: shot.width, height: shot.height, deviceScaleFactor: 1, mobile: shot.mobile },
      sessionId,
    );
    if (shot.mobile) {
      await browser.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 }, sessionId);
    }
    if (shot.ua) await browser.send("Emulation.setUserAgentOverride", { userAgent: shot.ua }, sessionId);

    const loaded = browser.once("Page.loadEventFired", sessionId);
    const nav = await browser.send("Page.navigate", { url }, sessionId);
    if (nav.errorText) throw new Error(`이동 실패 — ${nav.errorText}`);
    await Promise.race([loaded, sleep(30_000)]);
    await sleep(SETTLE_MS);

    const { result, exceptionDetails } = await browser.send(
      "Runtime.evaluate",
      { expression: probeExpr(shot.width), returnByValue: true, awaitPromise: false },
      sessionId,
    );
    if (exceptionDetails) {
      throw new Error(`측정기 실행 실패 — ${exceptionDetails.exception?.description ?? exceptionDetails.text}`);
    }
    const probe = result.value;

    // 자체 시험 — 「콘솔 에러 0」 이 진짜 0인지, 수집기가 죽어서 0인지 가른다.
    // 빨간불을 한 번도 못 본 게이트는 게이트가 아니다(green-check-may-be-fake).
    if (SELFTEST) {
      const beforeErr = consoleErrors.length;
      const beforeExc = exceptions.length;
      const beforeFail = failedRequests.length;
      await browser.send(
        "Runtime.evaluate",
        {
          expression: `console.error("QA-SELFTEST-CONSOLE");
            setTimeout(() => { throw new Error("QA-SELFTEST-THROW"); }, 0);
            fetch("/__qa_selftest_404__").catch(() => {});
            undefined`,
          returnByValue: true,
        },
        sessionId,
      );
      await sleep(1200);
      probe.selftest = {
        console: consoleErrors.length > beforeErr,
        exception: exceptions.length > beforeExc,
        failedRequest: failedRequests.length > beforeFail,
      };
      // 심은 신호는 결과에서 도로 걷어낸다 — 기준선 숫자에 섞이면 안 된다
      const strip = (list) => {
        for (let i = list.length - 1; i >= 0; i--) if (String(list[i]).includes("QA-SELFTEST")) list.splice(i, 1);
      };
      strip(consoleErrors);
      strip(exceptions);
      for (let i = failedRequests.length - 1; i >= 0; i--) {
        if (String(failedRequests[i].url).includes("__qa_selftest_404__")) failedRequests.splice(i, 1);
      }

      // 레이아웃 검사도 빨간불을 한 번 보여야 한다 — 넘침·죽은 앵커·작은 탭·가로 잘림을
      // 일부러 심고 측정기가 잡는지 본다. 심은 것은 바로 걷어내고, **기준선 숫자는 위의 깨끗한 probe 것만 쓴다.**
      const { result: lay } = await browser.send(
        "Runtime.evaluate",
        {
          expression: `(() => {
            const host = document.createElement("div");
            host.id = "__qa_selftest_layout__";
            host.innerHTML =
              '<div style="width:3000px;height:8px"></div>' +
              '<a href="#__qa_missing_anchor__">qa</a>' +
              '<button style="width:10px;height:10px;padding:0">q</button>' +
              '<span style="display:block;width:20px;overflow:hidden;white-space:nowrap">${"가".repeat(40)}</span>';
            document.body.appendChild(host);
            const r = ${probeExpr(shot.width)};
            host.remove();
            return r;
          })()`,
          returnByValue: true,
        },
        sessionId,
      );
      const inj = lay?.value ?? {};
      probe.selftest.overflow = inj.overflow === true || (inj.offenders ?? []).length > 0;
      probe.selftest.brokenAnchor = (inj.brokenAnchors ?? []).some((a) => a.href === "#__qa_missing_anchor__");
      probe.selftest.smallTap = (inj.smallTapCount ?? 0) > (probe.smallTapCount ?? 0);
      probe.selftest.clipped = (inj.clippedCount ?? 0) > (probe.clippedCount ?? 0);
    }

    // 스크린샷 — 첫 화면
    fs.mkdirSync(outDir, { recursive: true });
    const viewShot = path.join(outDir, `${shot.width}.png`);
    const a = await browser.send("Page.captureScreenshot", { format: "png" }, sessionId);
    fs.writeFileSync(viewShot, Buffer.from(a.data, "base64"));

    // 스크린샷 — 전체 페이지
    //
    // ⚠️ 뷰포트를 문서 높이만큼 늘려 찍으면 안 된다. 높이를 vh 로 잡은 히어로(min-h-[85vh] 등)가 그 늘어난
    //    뷰포트를 따라 같이 부풀어, 실제 화면에 없는 「텅 빈 첫 화면」이 찍힌다(실측 문서 높이 — h2-next 768:
    //    늘려 찍기 14,875 vs 스크롤 촬영 8,511 · atlas-resort 768: 15,934 vs 8,479). 그 그림으로 리뷰하면
    //    없는 결함을 잡고 진짜 결함을 놓친다.
    //    그래서 **뷰포트는 그대로 두고** clip 으로 문서 전체를 그려 달라고 한다(vh 기준이 안 바뀐다).
    let fullShot = null;
    const fullH = Math.min(Math.max(probe.bodyScrollHeight || shot.height, shot.height), MAX_FULL_PAGE_PX);
    try {
      const b = await browser.send(
        "Page.captureScreenshot",
        {
          format: "png",
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width: shot.width, height: fullH, scale: 1 },
        },
        sessionId,
      );
      fullShot = path.join(outDir, `${shot.width}-full.png`);
      fs.writeFileSync(fullShot, Buffer.from(b.data, "base64"));
    } catch (e) {
      fullShot = null;
      consoleWarnings.push(`(하네스) 전체 페이지 스크린샷 실패 — ${e.message}`);
    }

    return {
      ok: true,
      width: shot.width,
      height: shot.height,
      label: shot.label,
      mobile: shot.mobile,
      probe,
      consoleErrors: dedupe(consoleErrors),
      consoleWarnings: dedupe(consoleWarnings),
      exceptions: dedupe(exceptions),
      failedRequests: dedupeBy(failedRequests, (r) => `${r.status}|${r.url}`),
      shots: { viewport: rel(viewShot), full: fullShot ? rel(fullShot) : null },
    };
  } catch (e) {
    return {
      ok: false,
      width: shot.width,
      height: shot.height,
      label: shot.label,
      mobile: shot.mobile,
      error: e.message,
      consoleErrors: dedupe(consoleErrors),
      consoleWarnings: dedupe(consoleWarnings),
      exceptions: dedupe(exceptions),
      failedRequests: dedupeBy(failedRequests, (r) => `${r.status}|${r.url}`),
    };
  } finally {
    for (const off of offs) off();
    await browser.send("Target.closeTarget", { targetId }, undefined).catch(() => {});
  }
}

function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join("/");
}
function dedupe(list) {
  const seen = new Set();
  const out = [];
  for (const x of list) {
    if (seen.has(x)) continue;
    seen.add(x);
    out.push(x);
  }
  return out;
}
function dedupeBy(list, key) {
  const seen = new Set();
  const out = [];
  for (const x of list) {
    const k = key(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

// ───────── 정적 정보 ─────────
function walk(dir, acc = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(tsx?|jsx?|json)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

/** 외부 이미지 호스트 — 데모에 박혀 있으면 언제든 깨진다 */
const EXTERNAL_IMAGE_HOSTS = [
  "lh3.googleusercontent.com",
  "images.unsplash.com",
  "source.unsplash.com",
  "picsum.photos",
  "via.placeholder.com",
  "placehold.co",
  "i.imgur.com",
  "cdn.pixabay.com",
  "images.pexels.com",
];

/**
 * slug 폴더(컴포넌트·라우트·카드 JSON)를 훑어 정적 위험 신호를 센다.
 * 정규식은 소스 텍스트를 보는 것뿐이라 거짓 양성이 있을 수 있다 — 개수와 예시만 내고 판정은 사람이 한다.
 */
function staticScan(slug) {
  const dirs = [
    ...COMPONENT_DEMO_DIRS.map((d) => path.join(d, slug)),
    path.join(ROUTE_DEMO_DIR, slug),
  ].filter((d) => fs.existsSync(d));
  const files = dirs.flatMap((d) => walk(d));
  const jsonFile = path.join(CONTENT_DIR, `${slug}.json`);
  if (fs.existsSync(jsonFile)) files.push(jsonFile);

  const res = {
    dirs: dirs.map(rel),
    fileCount: files.length,
    hrefHash: [],
    buttonsWithoutHandler: [],
    noopHandlers: [],
    alerts: [],
    externalImages: [],
  };
  for (const f of files) {
    const src = fs.readFileSync(f, "utf8");
    const lines = src.split(/\r?\n/);
    lines.forEach((line, i) => {
      const at = `${rel(f)}:${i + 1}`;
      if (/href=["']#["']/.test(line) || /href=\{["']#["']\}/.test(line)) {
        res.hrefHash.push({ at, text: line.trim().slice(0, 120) });
      }
      if (/\balert\s*\(/.test(line) && !/\/\//.test(line.slice(0, line.indexOf("alert")))) {
        res.alerts.push({ at, text: line.trim().slice(0, 120) });
      }
      for (const host of EXTERNAL_IMAGE_HOSTS) {
        if (line.includes(host)) res.externalImages.push({ at, host, text: line.trim().slice(0, 120) });
      }
      // 핸들러가 「있기는 한데 아무 것도 안 하는」 죽은 버튼 — 아래 여는 태그 검사는 onClick 이 있으면 통과시킨다
      if (/on[A-Z]\w*=\{\s*\(\s*\)\s*=>\s*(\{\s*\}|undefined|null|void 0)\s*\}/.test(line) || /on[A-Z]\w*=\{noop\}/.test(line)) {
        res.noopHandlers.push({ at, text: line.trim().slice(0, 120) });
      }
    });
    // <button …> 여는 태그 하나를 통째로 보고 onClick·type=submit·form 이 없으면 「죽은 버튼 후보」
    for (const m of src.matchAll(/<button\b[^>]*>/g)) {
      const tag = m[0];
      if (/onClick|type=["']submit["']|type=\{?["']?submit/.test(tag)) continue;
      if (/\bform=/.test(tag)) continue;
      const line = src.slice(0, m.index).split(/\r?\n/).length;
      res.buttonsWithoutHandler.push({ at: `${rel(f)}:${line}`, text: tag.replace(/\s+/g, " ").slice(0, 120) });
    }
  }
  return res;
}

/** audit-portfolio.mjs 를 한 번 돌려 slug 별 ERROR·WARN 줄을 모은다 */
function runAudit(slugs) {
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts", "audit-portfolio.mjs")], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  const text = `${r.stdout ?? ""}\n${r.stderr ?? ""}`;
  /** @type {Record<string, Array<{level: string, at: string, msg: string}>>} */
  const bySlug = Object.fromEntries(slugs.map((s) => [s, []]));
  let currentKey = "";
  for (const raw of text.split(/\r?\n/)) {
    const head = raw.match(/^■\s*(.+)$/);
    if (head) {
      currentKey = head[1].trim();
      continue;
    }
    const item = raw.match(/^\s+(ERROR|WARN)\s*(.*)$/);
    if (!item || !currentKey) continue;
    for (const slug of slugs) {
      // 키는 파일 경로거나 「사이트 문구 <경로>」 — slug 폴더/파일에 해당하는 것만 담는다
      const k = currentKey.replace(/\\/g, "/");
      if (k.includes(`/demos/${slug}/`) || k.includes(`/demo/${slug}/`) || k.endsWith(`/${slug}.json`) || k === `${slug}.json` || k.includes(`portfolio/${slug}.json`)) {
        bySlug[slug].push({ level: item[1], at: currentKey, msg: item[2].trim() });
      }
    }
  }
  return { bySlug, exitCode: r.status ?? -1, summary: (text.match(/^요약:.*$/m) ?? [""])[0] };
}
// ───────── 실행 ─────────
console.log(`데모 QA — 대상 ${SLUGS.length}종 × 화면 ${SHOTS.length}종 · ${BASE} · ${chrome.label}`);

try {
  await fetch(BASE, { method: "GET", redirect: "manual", signal: AbortSignal.timeout(30_000) }).then((r) =>
    r.body?.cancel(),
  );
} catch (e) {
  console.error(`\n서버에 연결할 수 없습니다 — ${BASE} (${e.cause?.code ?? e.message}). 먼저 서버를 켜세요`);
  process.exit(1);
}

fs.mkdirSync(QA_DIR, { recursive: true });

const audit = RUN_AUDIT ? runAudit(SLUGS) : { bySlug: {}, exitCode: null, summary: "(건너뜀)" };
if (RUN_AUDIT) console.log(`  정적 검사 audit-portfolio — ${audit.summary || "(요약 줄 없음)"}`);

const profileDir = path.join(os.tmpdir(), `taemun-qa-${process.pid}`);
const browser = await launchBrowser(profileDir);

/** @type {Array<object>} */
const results = [];
let hardFailures = 0;

for (const slug of SLUGS) {
  const pageUrl = `${BASE}/demo/${slug}`;
  const entry = {
    slug,
    pageUrl,
    url: pageUrl,
    framed: false,
    status: 0,
    screens: [],
    static: staticScan(slug),
    audit: audit.bySlug[slug] ?? [],
  };
  // 바깥 HTML 을 한 번 읽어 (a) 상태를 보고 (b) 틀(iframe ?embed=true)인지 판정한다
  try {
    const res = await fetch(pageUrl, { redirect: "manual", signal: AbortSignal.timeout(60_000) });
    entry.status = res.status;
    const html = res.status === 200 ? await res.text() : "";
    if (res.status !== 200) await res.body?.cancel();
    entry.framed = html.includes("embed=true") || html.includes("embed=%22true");
  } catch {
    entry.status = 0;
  }
  if (entry.status !== 200) {
    hardFailures += 1;
    entry.error = `페이지 상태 ${entry.status || "응답 없음"} (200 이어야 측정합니다)`;
    console.log(`  ✗ ${slug} — ${entry.error}`);
    results.push(entry);
    continue;
  }
  const url = entry.framed && !MEASURE_FRAME ? `${pageUrl}?embed=true` : pageUrl;
  entry.url = url;
  entry.measured = entry.framed ? (MEASURE_FRAME ? "틀 바깥" : "틀 안쪽(embed)") : "단일 문서";
  const line = [];
  for (const shot of SHOTS) {
    const started = Date.now();
    const r = await Promise.race([
      measure(browser, { url, shot, outDir: path.join(QA_DIR, slug) }),
      sleep(PAGE_TIMEOUT_MS).then(() => ({ ok: false, width: shot.width, label: shot.label, error: `${PAGE_TIMEOUT_MS / 1000}초 초과` })),
    ]);
    r.seconds = Number(((Date.now() - started) / 1000).toFixed(1));
    entry.screens.push(r);
    if (!r.ok) {
      hardFailures += 1;
      line.push(`${shot.width}:측정실패`);
      continue;
    }
    const p = r.probe;
    line.push(
      `${shot.width}:${p.overflow ? `넘침+${p.overflowBy}${p.viewportWidened ? "(축소)" : ""}` : "넘침0"}/에러${r.consoleErrors.length + r.exceptions.length}/실패${r.failedRequests.length}/작은탭${shot.mobile ? p.smallTapCount : "-"}/죽은링크${p.hashOnly + p.brokenAnchors.length}`,
    );
  }
  console.log(`  ✓ ${slug} [${entry.measured}] — ${line.join(" · ")}`);
  results.push(entry);
}

await browser.close();
try {
  fs.rmSync(profileDir, { recursive: true, force: true });
} catch {
  // Chrome 이 프로필 잠금을 늦게 푸는 경우 — 임시 폴더라 남아도 무해
}

// ───────── 보고서 ─────────
const meta = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  browser: `${chrome.label} — ${chrome.path}`,
  viewports: SHOTS.map((s) => ({ width: s.width, height: s.height, mobile: s.mobile, label: s.label })),
  slugs: SLUGS,
  auditSummary: audit.summary,
};
fs.writeFileSync(path.join(QA_DIR, "report.json"), `${JSON.stringify({ meta, results }, null, 2)}\n`, "utf8");

const md = [];
md.push(`# 데모 QA 기준선`);
md.push("");
md.push(`- 측정 시각: ${meta.generatedAt}`);
md.push(`- 기준 주소: ${BASE}`);
md.push(`- 브라우저: ${meta.browser}`);
md.push(`- 화면: ${SHOTS.map((s) => `${s.label} ${s.width}×${s.height}${s.mobile ? " (모바일 UA)" : ""}`).join(" · ")}`);
md.push(`- 정적 검사: ${audit.summary || "(건너뜀)"}`);
md.push(
  `- 측정 지점: ${MEASURE_FRAME ? "**틀 바깥** (/demo/<slug>)" : "**틀 안쪽** (/demo/<slug>?embed=true) — 틀이 있는 데모는 자동 전환"}. 바깥 문서를 재면 iframe 이 자기 안의 넘침·죽은 링크를 숨겨 **무엇을 재도 초록**이 나온다.`,
);
md.push("");
md.push(`## 요약표`);
md.push("");
md.push(`| 샘플 | 화면 | 가로 넘침 | 콘솔 에러 | 실패 요청 | 작은 탭 | 죽은 링크 | 가로 잘림 | 본문 폭 |`);
md.push(`| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |`);
for (const e of results) {
  if (e.error) {
    md.push(`| \`${e.slug}\` | — | — | — | — | — | — | (${e.error}) |`);
    continue;
  }
  for (const s of e.screens) {
    if (!s.ok) {
      md.push(`| \`${e.slug}\` | ${s.width} | — | — | — | — | — | (측정 실패: ${s.error}) |`);
      continue;
    }
    const p = s.probe;
    const ov = p.overflow
      ? `**+${p.overflowBy}px**${p.viewportWidened ? " ⚠️축소" : ""}`
      : p.overflowMasked
        ? `0 ⚠️가림(${p.offenders.length}개 튀어나옴)`
        : "0";
    md.push(
      `| \`${e.slug}\` | ${s.width} | ${ov} | ${s.consoleErrors.length + s.exceptions.length} | ${s.failedRequests.length} | ${s.mobile ? p.smallTapCount : "—"} | ${p.hashOnly + p.brokenAnchors.length} | ${p.clippedCount} | ${s.mobile ? "—" : p.contentWidth > CONTENT_MAX_PX ? `**${p.contentWidth} ⚠️넓음**` : p.contentWidth} |`,
    );
  }
}
md.push("");
md.push(`> 가로 넘침은 **목표 폭 기준** \`documentElement.scrollWidth - min(innerWidth, 목표폭)\` — ⚠️축소 는 내용이 넓어 브라우저가 레이아웃 뷰포트를 늘려(지면을 축소해) 넘침을 감춘 화면이다. 작은 탭은 모바일 폭에서만 세고(44px 미만), 죽은 링크는 \`href="#"\` + 대상 없는 \`#앵커\`. 가로 잘림은 잎 노드 \`scrollWidth > clientWidth + 2\` 라 거짓 양성이 섞인다. 본문 폭은 데스크톱에서 글 블록(제목·문단·목록)이 좌우로 퍼진 폭이다 — 규칙은 **1280px 이하**(배경·사진은 끝까지 가도 된다), 넘으면 ⚠️넓음.`);
md.push("");

for (const e of results) {
  md.push(`---`);
  md.push("");
  md.push(`## ${e.slug}`);
  md.push("");
  md.push(`- 잰 주소: ${e.url} (바깥 ${e.pageUrl} 상태 ${e.status} · ${e.measured ?? "—"})`);
  if (e.error) {
    md.push(`- **측정 못 함** — ${e.error}`);
    md.push("");
    continue;
  }
  for (const s of e.screens) {
    md.push(`### ${s.label ?? ""} ${s.width}px`);
    if (!s.ok) {
      md.push(`- **측정 실패** — ${s.error}`);
      md.push("");
      continue;
    }
    const p = s.probe;
    md.push(`- 스크린샷: \`${s.shots.viewport}\`${s.shots.full ? ` · 전체 \`${s.shots.full}\`` : ""} (${s.seconds}초)`);
    md.push(
      `- 문서 폭 ${p.scrollWidth} / 뷰포트 ${p.innerWidth}${p.targetWidth !== undefined && p.innerWidth !== p.targetWidth ? ` (목표 ${p.targetWidth})` : ""} → ${p.overflow ? `**가로 넘침 +${p.overflowBy}px**` : "가로 넘침 없음"}`,
    );
    if (p.viewportWidened) {
      md.push(
        `- ⚠️ **레이아웃 뷰포트가 ${p.targetWidth} → ${p.innerWidth}px 로 넓어졌다** — 내용이 화면보다 넓어 브라우저가 지면을 통째로 축소해 끼워 넣은 것이다. 실제 폰에서는 글자가 ${Math.round((p.targetWidth / p.innerWidth) * 100)}% 크기로 작아져 보인다. (이 화면의 넘침·잘림 수치는 목표 폭 ${p.targetWidth} 기준으로 다시 잰 값이다.)`,
      );
    }
    if (p.overflowMasked) {
      md.push(
        `- ⚠️ \`overflow-x\` 가 html=\`${p.overflowGuard.html}\` body=\`${p.overflowGuard.body}\` 로 **가려져 있다** — scrollWidth 검사는 이 화면에서 무효다. 아래 「넘침 원인」 은 rect 로 따로 잰 것.`,
      );
    }
    if (p.offenders.length) {
      md.push(`- 넘침 원인(가장 바깥쪽):`);
      for (const o of p.offenders) {
        md.push(
          `  - \`<${o.tag}${o.id ? ` id="${o.id}"` : ""} class="${o.cls}">\` right=${o.right} w=${o.width}${o.inScrollBox ? " · **가로 스크롤 상자 안**(지면을 밀지 않는다 — 거짓 단서일 확률 높음)" : ""} — ${o.text ? `「${o.text}」` : "(텍스트 없음)"}`,
        );
      }
    }
    if (p.selftest) {
      const st = p.selftest;
      const checks = [
        ["콘솔", st.console],
        ["예외", st.exception],
        ["실패 요청", st.failedRequest],
        ["넘침", st.overflow],
        ["죽은 앵커", st.brokenAnchor],
        ["작은 탭", st.smallTap],
        ["가로 잘림", st.clipped],
      ];
      const all = checks.every(([, v]) => v);
      md.push(
        `- 수집기 자체 시험: ${all ? "통과" : "**실패**"} (${checks.map(([k, v]) => `${k} ${v ? "잡음" : "**못 잡음**"}`).join(" · ")})`,
      );
    }
    if (s.exceptions.length) {
      md.push(`- 예외 ${s.exceptions.length}건:`);
      for (const x of s.exceptions.slice(0, 5)) md.push(`  - ${x.split("\n")[0]}`);
    }
    if (s.consoleErrors.length) {
      md.push(`- 콘솔 에러 ${s.consoleErrors.length}건:`);
      for (const x of s.consoleErrors.slice(0, 5)) md.push(`  - ${x.split("\n")[0]}`);
    }
    if (s.consoleWarnings.length) {
      md.push(`- 콘솔 경고 ${s.consoleWarnings.length}건:`);
      for (const x of s.consoleWarnings.slice(0, 3)) md.push(`  - ${x.split("\n")[0]}`);
    }
    if (s.failedRequests.length) {
      md.push(`- 실패한 요청 ${s.failedRequests.length}건:`);
      for (const x of s.failedRequests.slice(0, 8)) md.push(`  - ${x.status || x.error || "실패"} (${x.type}) ${x.url}`);
    }
    if (p.brokenImgs.length) {
      md.push(`- 깨진 \`<img>\` ${p.brokenImgs.length}건:`);
      for (const x of p.brokenImgs.slice(0, 5)) md.push(`  - ${x.src || "(src 없음)"} — class="${x.cls}"`);
    }
    if (s.mobile && p.smallTapCount) {
      md.push(`- 44px 미만 탭 대상 ${p.smallTapCount}개, 예시:`);
      for (const x of p.smallTaps) md.push(`  - \`<${x.tag} class="${x.cls}">\` ${x.w}×${x.h} — ${x.text ? `「${x.text}」` : "(텍스트 없음)"}`);
    }
    if (p.hashOnly) {
      md.push(`- \`href="#"\` ${p.hashOnly}개, 예시:`);
      for (const x of p.hashOnlySamples) md.push(`  - \`<a class="${x.cls}">\` 「${x.text}」`);
    }
    if (p.brokenAnchors.length) {
      md.push(`- 대상 없는 앵커 ${p.brokenAnchors.length}개:`);
      for (const x of p.brokenAnchors.slice(0, 10)) md.push(`  - \`${x.href}\` — 「${x.text}」`);
    }
    if (p.clippedCount) {
      md.push(`- 가로 잘림 의심 ${p.clippedCount}개, 예시:`);
      for (const x of p.clipped) md.push(`  - \`<${x.tag} class="${x.cls}">\` ${x.scrollW}>${x.clientW} — 「${x.text}」`);
    }
    md.push("");
  }
  // 정적
  const st = e.static;
  md.push(`### 정적 (소스)`);
  md.push(`- 폴더: ${st.dirs.length ? st.dirs.map((d) => `\`${d}\``).join(" · ") : "(없음)"} · 파일 ${st.fileCount}개`);
  md.push(
    `- \`href="#"\` ${st.hrefHash.length} · 핸들러 없는 \`<button>\` ${st.buttonsWithoutHandler.length} · 빈 핸들러 ${st.noopHandlers.length} · \`alert(\` ${st.alerts.length} · 외부 이미지 호스트 ${st.externalImages.length}`,
  );
  for (const [label, list] of [
    ['href="#"', st.hrefHash],
    ["핸들러 없는 button", st.buttonsWithoutHandler],
    ["빈 핸들러(() => {})", st.noopHandlers],
    ["alert(", st.alerts],
    ["외부 이미지", st.externalImages],
  ]) {
    if (!list.length) continue;
    md.push(`  - ${label}:`);
    for (const x of list.slice(0, 8)) md.push(`    - \`${x.at}\` — ${x.text ?? x.host}`);
    if (list.length > 8) md.push(`    - … 외 ${list.length - 8}건`);
  }
  md.push("");
  md.push(`### 정적 검사(audit-portfolio) — ${e.audit.length}건`);
  if (!e.audit.length) md.push(`- 없음`);
  const byKey = new Map();
  for (const a of e.audit) {
    if (!byKey.has(a.at)) byKey.set(a.at, []);
    byKey.get(a.at).push(a);
  }
  for (const [k, list] of byKey) {
    md.push(`- \`${k}\``);
    for (const a of list) md.push(`  - ${a.level}  ${a.msg}`);
  }
  md.push("");
}

fs.writeFileSync(path.join(QA_DIR, "report.md"), `${md.join("\n")}\n`, "utf8");

console.log(`\n보고서: ${rel(path.join(QA_DIR, "report.md"))} · ${rel(path.join(QA_DIR, "report.json"))}`);
console.log(`요약: 측정 실패 ${hardFailures}건`);
{
  // 본문 폭 규칙(1280px) — 데스크톱 화면에서 넘친 데모를 이름으로 드러낸다
  const wide = results
    .filter((e) => !e.error)
    .flatMap((e) => e.screens.filter((s) => s.ok && !s.mobile && s.probe.contentWidth > CONTENT_MAX_PX).map((s) => `${e.slug}(${s.probe.contentWidth}px)`));
  console.log(
    wide.length
      ? `⚠️ 본문 폭 1280px 넘침 ${wide.length}종: ${wide.join(", ")} — 글·카드 감싸개에 max-w-7xl mx-auto (배경은 끝까지 둬도 된다)`
      : `본문 폭: 전부 1280px 안`,
  );
}
// process.exit() 대신 — 서버 확인 fetch 소켓이 남아 있으면 Windows Node 가 종료 중 assertion 으로 죽는다
process.exitCode = hardFailures ? 1 : 0;
