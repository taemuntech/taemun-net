import type { Metadata } from "next";
import HomeView from "./HomeView";
import { GALLERY_CATEGORIES, GALLERY_PROJECTS, type GalleryProject } from "@/lib/portfolio/galleryData";
import { getPortfolio } from "@/lib/portfolio/registry";
import { listedDemoLinks } from "@/lib/portfolio/header-links";
import { getState, isListed, resolveStatus } from "@/lib/portfolio/state";

// 홈 — 화면은 HomeView(아라 화이트 갤러리, 클라이언트 컴포넌트) 그대로.
// 이 서버 래퍼가 하는 일 둘:
// 1) canonical 선언 — 레이아웃에 두면 모든 하위 페이지가 홈을 정본 주소로 물려받는다.
// 2) 공개 상태를 읽어 **목록에 실을 카드만 남긴 배열**을 내려 준다. 홈 갤러리는 galleryData.ts 에 손으로 적은
//    목록이라 상태를 모른다 — 그대로 두면 /portfolio 에서 빠진 실존 업체 제안 시안이 홈에는 회사 이름째로
//    남는다(관리자가 「전부 내리기」를 눌러도 링크만 막히고 홈 카드는 살아 있었다).
//    판정(resolveStatus·isListed)은 여기 서버에서만 하고 화면은 결과만 받는다 — 규칙을 두 벌로 만들지 않는다.
//
// ⚠️ **배열을 여기서 걸러 넘기는 것이 핵심이다.** 예전에는 「실을 slug 목록」만 넘기고 HomeView 가
// GALLERY_PROJECTS 를 직접 import 했는데, HomeView 는 'use client' 라 배열 전체가 클라이언트 청크에 박혔다.
// 실측: 홈 HTML 에는 회사 이름이 0건인데 홈이 부르는 /_next/static/chunks/*.js(72KB, immutable 1년 캐시)에
// 회사 이름·클라이언트 표기·설명·/demo/<slug> 가 그대로 있었다. 걸러낸 배열만 넘기면 청크에도 남지 않는다.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// 접속 때마다 상태를 다시 본다 — /portfolio 와 같은 이유다. 이게 없으면 빌드 시점 스냅숏(표가 아직 없으면
// 「읽기 실패」)이 정적 HTML 로 굳어, 관리자가 무엇을 눌러도 재배포 전까지 홈은 그대로다.
export const dynamic = "force-dynamic";

/** 갤러리 카드의 /demo/<slug> 링크에서 slug 를 뽑는다. 외부 서비스(externalUrl)는 상태 관리 대상이 아니다 */
function demoSlugOf(project: GalleryProject): string | null {
  const url = project.liveDemoUrl;
  if (!url || !url.startsWith("/demo/")) return null;
  return url.slice("/demo/".length).split(/[/?#]/)[0] || null;
}

export default async function Home() {
  const snapshot = await getState();
  const listedSlugs = new Set(
    getPortfolio()
      .filter((item) => isListed(resolveStatus(snapshot, item.slug, item.kind)))
      .map((item) => item.slug),
  );

  // 목록에 없는 slug(= 등록 안 된 데모, 내려간 시안)는 **싣지 않는 쪽**으로 넘어진다.
  const projects = GALLERY_PROJECTS.filter((p) => {
    const slug = demoSlugOf(p);
    return slug === null || listedSlugs.has(slug);
  });

  // 헤더 드롭다운도 같은 스냅숏으로 거른다. HomeView 는 받은 것을 Header 에 그대로 전달만 한다 —
  // 헤더 항목을 Header.tsx('use client')에 적어 두면 갤러리와 똑같이 회사 이름이 청크로 새기 때문이다.
  return <HomeView projects={projects} categories={GALLERY_CATEGORIES} demoLinks={listedDemoLinks(snapshot)} />;
}
