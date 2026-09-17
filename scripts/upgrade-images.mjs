#!/usr/bin/env node
// 이미 내려받은 데모 이미지를 원본 해상도로 다시 받는다.
//
// 왜: localize-images.mjs 가 처음 받을 때 lh3 CDN 의 **기본 주소**를 썼는데, 그건 미리보기용으로
// 줄인 512px 판이었다(실측: 512x286 54KB ↔ 원본 1376x768 182KB). 히어로 사진이 뿌옇게 보였다.
// 구글 사용자 콘텐츠 주소는 뒤에 =s0 을 붙이면 원본을 준다. unsplash 는 쿼리 w= 를 키운다.
//
// 원본 주소는 치환 커밋의 diff 에서 되찾는다(- 줄의 URL ↔ + 줄의 로컬 경로).
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const COMMITS = process.argv.includes("--commits")
  ? process.argv[process.argv.indexOf("--commits") + 1].split(",")
  : ["71d9e93", "781e8c0"];
const APPLY = process.argv.includes("--apply");
const ROOT = process.cwd();

const URL_RE = /https:\/\/(?:lh3\.googleusercontent\.com|images\.unsplash\.com)\/[^\s"'`)]+/g;
const LOCAL_RE = /\/(?:demo-media|portfolio)\/[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp|avif|gif)/g;

/** 치환 커밋 diff 에서 (원본 URL → 로컬 경로) 짝을 모은다 */
const pairs = new Map();
for (const c of COMMITS) {
  let diff;
  try { diff = execSync(`git show ${c} -U0 -- src`, { maxBuffer: 256 * 1024 * 1024 }).toString("utf8"); }
  catch { console.error(`  커밋 ${c} 을 읽지 못했습니다 — 건너뜁니다`); continue; }
  for (const line of diff.split("\n")) {
    if (!line.startsWith("+")) continue;
    const locals = line.match(LOCAL_RE);
    if (!locals) continue;
    // 같은 hunk 의 - 줄에서 URL 을 찾는다: diff 를 다시 훑기보다 앞 줄들을 기억해 짝짓는다
    pairs.set(locals[0], null); // 자리만 확보, 아래에서 채운다
  }
  // - 줄과 + 줄을 순서대로 짝짓는다(같은 hunk 안에서 1:1 로 치환됐다)
  let pendingUrls = [];
  for (const line of diff.split("\n")) {
    if (line.startsWith("@@")) { pendingUrls = []; continue; }
    if (line.startsWith("-") && !line.startsWith("---")) {
      const us = line.match(URL_RE);
      if (us) pendingUrls.push(...us);
    } else if (line.startsWith("+") && !line.startsWith("+++")) {
      const ls = line.match(LOCAL_RE);
      if (ls) for (const l of ls) { const u = pendingUrls.shift(); if (u) pairs.set(l, u); }
    }
  }
}

const resolved = [...pairs.entries()].filter(([, u]) => u);
console.log(`짝지은 이미지 ${resolved.length}장 (커밋 ${COMMITS.join(", ")})`);

/** 원본을 요구하는 주소로 바꾼다 */
function hiRes(u) {
  if (u.includes("images.unsplash.com")) return u.replace(/([?&])w=\d+/, "$1w=2000").replace(/([?&])q=\d+/, "$1q=85");
  return u.replace(/=[swh]\d+(-[a-z0-9-]+)?$/, "") + "=s0";
}

function localPath(webPath) {
  // /demo-media/x/y.jpg → public/demo-media/x/y.jpg · /portfolio/x/y.jpg → private-assets/portfolio/x/y.jpg
  if (webPath.startsWith("/demo-media/")) return path.join(ROOT, "public", webPath.slice(1));
  return path.join(ROOT, "private-assets", webPath.slice(1));
}

let bigger = 0, same = 0, failed = 0, gained = 0, missing = 0;
for (const [web, url] of resolved) {
  const file = localPath(web);
  if (!fs.existsSync(file)) { missing++; continue; }
  const before = fs.statSync(file).size;
  try {
    const res = await fetch(hiRes(url), { signal: AbortSignal.timeout(45000) });
    if (!res.ok) { failed++; console.log(`  실패 ${res.status} ${web}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length <= before * 1.05) { same++; continue; }   // 더 크지 않으면 그대로 둔다
    if (APPLY) fs.writeFileSync(file, buf);
    bigger++; gained += buf.length - before;
  } catch (e) { failed++; console.log(`  실패 ${web} — ${e.message}`); }
}
console.log(`\n${APPLY ? "적용" : "미리보기"}: 더 큰 원본 ${bigger}장 · 그대로 ${same}장 · 실패 ${failed}장 · 파일없음 ${missing}장`);
console.log(`늘어나는 용량 ${(gained / 1048576).toFixed(1)}MB`);
if (!APPLY) console.log("실제로 바꾸려면 --apply");
