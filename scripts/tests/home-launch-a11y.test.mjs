// 오픈 주간 홈 묶음(2026-09-19 오픈 점검 P1-13·15·16)의 되돌림 방지.
// 화면을 띄우지 않고 소스·레지스트리만 읽는다 — 브라우저 확인은 따로 했다(보고서 참고).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { bypassImageOptimizer } from "../../src/components/portfolio/thumbnail-optimizer.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
// 주석은 걷어내고 본다 — 규약상 옛 코드·이유를 주석에 적으므로(「<img> 로 원본을 받았다」 같은 말) 주석까지 읽으면 거짓 빨간불이 난다.
// 줄 주석은 앞이 공백·줄머리일 때만 걷는다(주소 문자열 안의 // 는 남긴다).
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/.*$/gm, "$1");
const HOME = stripComments(read("src/app/(site)/HomeView.tsx"));
const HEADER = stripComments(read("src/components/Header.tsx"));
const CARD = stripComments(read("src/components/portfolio/PortfolioCardView.tsx"));
const OPTIMIZER = stripComments(read("src/components/portfolio/thumbnail-optimizer.ts"));

test("주석 걷기 자체 시험 — 주석 속 낱말은 사라지고 주소 속 // 는 남는다", () => {
  const s = stripComments('a /* <img> */ b\n// <img>\nconst u = "https://x"; // <img>\n{/* <img> */}');
  assert.doesNotMatch(s, /<img/);
  assert.match(s, /https:\/\/x/);
});

// ── P1-15 이미지 최적화기 판정 ──
test("bypassImageOptimizer: 제안 시안·모르는 것은 최적화기를 건너뛰고, 샘플·운영 서비스만 태운다", () => {
  assert.equal(bypassImageOptimizer("proposal"), true);
  assert.equal(bypassImageOptimizer(undefined), true);
  assert.equal(bypassImageOptimizer(null), true);
  assert.equal(bypassImageOptimizer("sample"), false);
  assert.equal(bypassImageOptimizer("service"), false);
});

test("등록된 제안 시안(proposal)은 전부 최적화기를 건너뛴다 — 새 종류가 생기면 여기서 걸린다", () => {
  const dir = path.join(ROOT, "src/content/portfolio");
  const kinds = new Set();
  let proposals = 0;
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".json"))) {
    const item = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    kinds.add(item.kind);
    if (item.kind === "proposal") {
      proposals += 1;
      assert.equal(bypassImageOptimizer(item.kind), true, `${item.slug} 가 최적화기에 탄다`);
    }
  }
  assert.ok(proposals > 0, "제안 시안이 0건 — 레지스트리를 못 읽었다");
  for (const k of kinds) assert.ok(["sample", "proposal", "service"].includes(k), `모르는 종류 ${k} — 판정을 다시 볼 것`);
});

test("판정 모듈은 클라이언트 청크에 들어가므로 주소 표(protected-assets)를 끌어오지 않는다", () => {
  assert.doesNotMatch(OPTIMIZER, /protected-assets/);
  assert.doesNotMatch(OPTIMIZER, /COMPANY_ASSET_OWNERS/);
});

test("홈·/portfolio 썸네일은 next/image 이고 같은 판정을 쓴다", () => {
  assert.doesNotMatch(HOME, /<img\b/, "홈에 <img> 가 남아 원본을 받는다");
  assert.match(HOME, /import Image from "next\/image"/);
  // 모달 대표 화면을 그리는 세 갈래(데모 링크·외부 링크·링크 없음)가 모두 같은 판정을 넘긴다
  assert.equal((HOME.match(/unoptimized=\{previewUnoptimized\}/g) ?? []).length, 3, "모달 세 갈래");
  assert.match(HOME, /previewUnoptimized = bypassImageOptimizer\(/);
  assert.match(HOME, /bypassImageOptimizer\(inquiryRefs\[project\.id\]\?\.kind\)/);
  assert.match(CARD, /unoptimized=\{bypassImageOptimizer\(item\.kind\)\}/);
});

// ── P1-13 헤더 링크 ──
test("헤더의 구획 링크는 /# 절대 주소 — 다른 페이지에서 눌러도 홈으로 간다", () => {
  assert.doesNotMatch(HEADER, /href="#/, "상대 해시(href=\"#…\")가 남았다");
  for (const id of ["gallery", "capabilities", "process"]) {
    assert.match(HEADER, new RegExp(`href: "/#${id}"`));
    assert.match(HOME, new RegExp(`id="${id}"`), `홈에 #${id} 구획이 없다`);
  }
});

test("홈에서는 구획 링크가 해시만 — 쿼리 붙은 홈(/?utm_source=…)에서 문서를 다시 불러오지 않는다", () => {
  assert.match(HEADER, /const sectionHref = \(href: string\) => \(pathname === "\/" \? href\.slice\(1\) : href\)/);
  assert.equal((HEADER.match(/href=\{sectionHref\(link\.href\)\}/g) ?? []).length, 2, "데스크톱·모바일 두 자리 모두");
  assert.doesNotMatch(HEADER, /href=\{link\.href\}/, "그대로 /# 를 쓰는 자리가 남았다");
});

test("헤더(데스크톱·모바일)와 홈 꼬리말에 /portfolio 링크가 있다", () => {
  assert.match(HEADER, /PORTFOLIO_HREF = "\/portfolio"/);
  assert.equal((HEADER.match(/href=\{PORTFOLIO_HREF\}/g) ?? []).length, 2, "데스크톱·모바일 두 자리");
  assert.match(HOME, /<Link href="\/portfolio"/);
});

// ── P1-16 키보드 ──
test("홈 카드는 키보드로 열리고, 모달은 이름 있는 대화상자다", () => {
  assert.match(HOME, /role="button"\s+tabIndex=\{0\}/);
  assert.match(HOME, /onKeyDown=\{\(e\) => onCardKeyDown\(e, project\)\}/);
  assert.match(HOME, /e\.key !== "Enter" && e\.key !== " "/);
  assert.match(HOME, /role="dialog"\s+aria-modal="true"\s+aria-labelledby=\{PREVIEW_TITLE_ID\}/);
  assert.match(HOME, /<h3 id=\{PREVIEW_TITLE_ID\}/);
  assert.match(HOME, /previewPanelRef\.current\?\.focus/);
  assert.match(HOME, /returnFocusRef\.current = document\.activeElement/);
});

test("모달의 기록(뒤로가기) 처리는 그대로다", () => {
  // openPreview·openInquiry·closeModal 의 기록 조작이 바뀌지 않았는지 — 줄 모양을 그대로 본다
  assert.match(HOME, /window\.history\.pushState\(\{ tmHome: "preview" \}, "", window\.location\.href\)/);
  assert.match(HOME, /window\.history\.pushState\(\{ tmHome: "inquiry" \}, "", window\.location\.href\)/);
  assert.match(HOME, /window\.history\.go\(-depth\)/);
  assert.equal((HOME.match(/history\.(pushState|go|back|replaceState)\(/g) ?? []).length, 3);
});
