// 홈 갤러리 카드(galleryData.ts) → 포트폴리오 등록 slug(src/content/portfolio/<slug>.json) 잇기.
//
// 갤러리 카드의 id 는 slug 와 다르다(예: 카드 id 「wonik-qnc-semiconductor-quartz」 ↔ slug 「wonik-qnc」).
// 그래서 id 를 slug 로 쓰면 안 되고, 카드가 가리키는 주소에서 slug 를 뽑는다:
//   - 데모 카드: liveDemoUrl 「/demo/<slug>」
//   - 운영 서비스 카드(externalUrl): 등록 정보의 liveUrl 이 같은 항목
// 서버 전용으로 쓴다 — galleryData 값을 클라이언트 컴포넌트로 끌어오지 않게(HomeView.tsx 머리말).

import type { GalleryProject } from "./galleryData";

/** 갤러리 카드의 /demo/<slug> 링크에서 slug 를 뽑는다. 외부 서비스(externalUrl)는 null */
export function demoSlugOf(project: GalleryProject): string | null {
  const url = project.liveDemoUrl;
  if (!url || !url.startsWith("/demo/")) return null;
  return url.slice("/demo/".length).split(/[/?#]/)[0] || null;
}

const trimSlash = (url: string) => url.replace(/\/+$/, "");

/** 카드가 가리키는 포트폴리오 slug — 데모면 /demo/<slug>, 운영 서비스면 liveUrl 이 같은 등록 항목. 못 찾으면 null */
export function gallerySlugOf(
  project: GalleryProject,
  portfolio: readonly { slug: string; liveUrl: string }[],
): string | null {
  const demo = demoSlugOf(project);
  if (demo) return demo;
  if (!project.externalUrl) return null;
  const target = trimSlash(project.externalUrl);
  return portfolio.find((item) => trimSlash(item.liveUrl) === target)?.slug ?? null;
}
