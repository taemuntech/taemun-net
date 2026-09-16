import type { Metadata } from "next";
import { Suspense } from "react";
import { getPortfolio } from "@/lib/portfolio/registry";
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

function buildSampleIndex(): SampleIndex {
  const index: SampleIndex = {};
  // 갤러리 카드는 운영 서비스(https 링크)에서도 ?from= 을 넘기므로 전부 싣는다
  for (const item of getPortfolio()) {
    index[item.slug] = { title: item.title, industry: item.industry, kind: item.kind };
  }
  return index;
}

export default function InquiryPage() {
  const sampleIndex = buildSampleIndex();
  return (
    <Suspense fallback={<InquiryView referral={null} />}>
      <InquiryViewWithReferral sampleIndex={sampleIndex} />
    </Suspense>
  );
}
