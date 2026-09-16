// 샘플 사이트 공용 키트 계약 — 공장에서 찍어낸 샘플 사이트가 가져다 쓰는 것.
// 구현: SampleSiteBar.tsx · SampleNotice.tsx · sample-lead.ts (같은 폴더)

import type { IndustryKey } from "@/lib/portfolio/schema";

/**
 * (demos) 레이아웃이 모든 샘플 위에 자동으로 붙이는 얇은 바.
 * 주소(/demo/<slug>)에서 slug 를 읽는다. 샘플 코드는 이 바를 직접 넣지 않는다.
 * 내용: 태문 로고·「태문 DEV STUDIO 샘플 사이트」 · 포트폴리오로 · 「이런 사이트 제작 문의」(→ sampleInquiryHref)
 */
export type SampleSiteBarProps = Record<string, never>;

/**
 * 샘플 사이트 안의 문의·예약·상담 폼을 제출했을 때 띄우는 안내.
 * 「샘플 사이트라 실제로 접수되지 않았습니다 — 이 기능 그대로 만들어 드립니다」 + 태문 문의로 가는 버튼.
 * 샘플 폼의 onSubmit 은 반드시 이것을 연다(입력값을 어디에도 보내지 않는다).
 */
export type SampleNoticeProps = {
  open: boolean;
  onClose: () => void;
  /** 샘플 slug — 문의 페이지로 넘긴다 */
  slug: string;
  industry: IndustryKey;
  /** 방문자가 누른 기능 이름 (예: "1:1 상담 예약") — 안내 문구에 들어간다 */
  featureName?: string;
  /**
   * 이 화면의 종류. 기본값 "sample" 은 가상 브랜드 샘플 — 제목이 「샘플 사이트입니다」.
   * 실존 업체 제안 시안(카드 kind=proposal)은 "proposal" 을 넘긴다 — 제목이 「제안용 시안입니다」로 바뀌고
   * 「해당 회사가 만들었거나 의뢰한 사이트가 아닙니다」 한 줄이 붙는다.
   * (audit:portfolio 가 kind=proposal 카드의 SampleNotice 에 이 값이 있는지 본다)
   */
  kind?: SampleNoticeKind;
};

/** SampleNotice 가 구분하는 종류 — 카드 kind 중 화면에 모달로 띄우는 두 가지만 */
export type SampleNoticeKind = "sample" | "proposal";

/**
 * 문의 페이지로 넘기는 쿼리 — /inquiry?from=<slug>&industry=<key>
 * industry 는 선택: 상단 바는 주소(slug)만 알고 업종은 모른다. 문의 페이지는 없으면 포트폴리오 등록 정보에서 채운다.
 */
export type SampleInquiryParams = {
  from: string;
  industry?: IndustryKey;
};

/**
 * 상단 바 높이를 담는 CSS 변수 이름. 바가 보이면 44px, 접히면 0px.
 * 샘플의 sticky/fixed 헤더는 top-0 대신 `top-[var(--sample-bar-h,0px)]` 를 쓴다(바에 가려지지 않게).
 */
export const SAMPLE_BAR_HEIGHT_VAR = "--sample-bar-h";
export const SAMPLE_BAR_HEIGHT_PX = 44;
