import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { sampleInquiryHref } from "@/components/demo-kit/sample-lead";
import { GALLERY_PROJECTS } from "@/lib/portfolio/galleryData";
import { gallerySlugOf } from "@/lib/portfolio/gallery-ref";
import { getPortfolio } from "@/lib/portfolio/registry";
import { getState, isReachable, resolveStatus, type StateSnapshot } from "@/lib/portfolio/state";
import { SITE_OG_IMAGES } from "@/lib/site-og";
import InquiryView, { InquiryViewWithReferral, type SampleIndex } from "./InquiryView";

// 프로젝트 견적 문의 — 서버 래퍼. 화면은 InquiryView(클라이언트).
// 샘플 유입(?from=&industry=)은 useSearchParams 로 읽으므로 Suspense 안에 둔다.
// fallback 에 유입 정보 없는 같은 화면을 넣어 정적 HTML(검색·첫 화면)이 비지 않게 한다 — 수화 시 주소를 읽은 화면으로 바뀐다.

const DESCRIPTION =
  "홈페이지·쇼핑몰·예약 사이트·맞춤형 웹 개발 견적 문의. 필요한 서비스와 예산·일정을 4단계로 골라 보내 주시면 태문 DEV STUDIO 가 연락드립니다.";

// openGraph 를 페이지에서 따로 선언한다 — 없으면 레이아웃(홈)의 og:url·og:title 을 물려받아 공유 미리보기가 홈으로 샌다.
export const metadata: Metadata = {
  title: "프로젝트 견적 문의",
  description: DESCRIPTION,
  alternates: { canonical: "/inquiry" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문 DEV STUDIO",
    title: "프로젝트 견적 문의 | 태문 DEV STUDIO",
    description: DESCRIPTION,
    url: "/inquiry",
    images: SITE_OG_IMAGES,
  },
};

// 이 표는 그대로 HTML 에 실린다 — 내려간 시안의 제목(= 실존 업체 이름)이 남지 않게 상태를 본다.
// 빼는 기준은 「목록 노출(isListed)」이 아니라 「주소가 열리는가(isReachable)」다: 링크 전용(unlisted)
// 제안 시안은 영업 링크로 들어온 사람이 ?from= 을 달고 오므로 표에 있어야 유입 문구가 뜬다.
// 비공개(private)·전부 내리기·DB 읽기 실패로 막힌 것만 뺀다.
function buildSampleIndex(snapshot: StateSnapshot): SampleIndex {
  const index: SampleIndex = {};
  // 갤러리 카드는 운영 서비스(https 링크)에서도 ?from= 을 넘기므로 막히지 않은 것은 전부 싣는다
  for (const item of getPortfolio()) {
    if (!isReachable(resolveStatus(snapshot, item.slug, item.kind))) continue;
    index[item.slug] = { title: item.title, industry: item.industry, kind: item.kind };
  }
  return index;
}

/**
 * 옛 주소 `?project=<갤러리 카드 제목>` → `?from=<slug>`.
 *
 * 홈 카드 모달의 「이 레퍼런스로 제작 문의」가 카드 **제목**을 project 로 붙여 보냈는데, 이 화면은 from(slug)만 읽는다.
 * 그래서 홈에서 들어온 문의는 어느 레퍼런스를 보고 왔는지가 통째로 빠졌다 — 서비스 미리 고르기·안내 칩·형 문자의
 * 「유입」 줄 전부(2026-09-18 확인). 홈 버튼은 모달 개편(구현계획서 P4) 때 바뀌므로, 들어오는 쪽에서 먼저 잇는다.
 * 카드 id 는 slug 와 다를 수 있어(09-18 실측: 이어지는 카드 58장 중 22장) 제목 → 카드 → 카드가 가리키는 주소로
 * slug 를 찾는다(gallery-ref.ts). 같은 날 58장 전부 올바른 slug 로 되돌려지는 것을 로컬에서 확인했다.
 *
 * 되돌리지 않는 경우: 이미 from 이 있다 · 제목에 맞는 카드가 없다 · 막힌(내려간) 작업물이다(표에 없다).
 * 마지막 경우에 주소를 바꾸면 내려간 시안의 slug 가 주소창에 드러나므로 그대로 둔다.
 */
function legacyProjectHref(
  params: Record<string, string | string[] | undefined>,
  sampleIndex: SampleIndex,
): string | null {
  const title = typeof params.project === "string" ? params.project : null;
  if (!title || params.from !== undefined) return null;
  const card = GALLERY_PROJECTS.find((p) => p.title === title);
  if (!card) return null;
  const slug = gallerySlugOf(card, getPortfolio());
  if (!slug || !sampleIndex[slug]) return null;
  return sampleInquiryHref({ from: slug });
}

// 상태를 접속 때마다 다시 본다 — 홈·포트폴리오와 같은 이유(빌드 스냅숏이 굳으면 내려도 이름이 남는다)
export const dynamic = "force-dynamic";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sampleIndex = buildSampleIndex(await getState());
  const legacy = legacyProjectHref(await searchParams, sampleIndex);
  if (legacy) redirect(legacy);
  return (
    <Suspense fallback={<InquiryView referral={null} />}>
      <InquiryViewWithReferral sampleIndex={sampleIndex} />
    </Suspense>
  );
}
