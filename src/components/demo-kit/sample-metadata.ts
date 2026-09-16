// 샘플 page.tsx 의 metadata 를 만드는 함수 — 서버 page 에서만 부른다.
// - 검색 제외(noindex)는 (demos) 레이아웃이 준다. 여기서 robots·canonical 을 넣지 않는다.
// - 카카오톡·메신저로 영업 링크를 보냈을 때 미리보기가 뜨게 openGraph 에 썸네일(capture:thumbs 결과)을 싣는다.
//   썸네일 경로 규칙은 schema.ts defaultThumbnail 한 곳을 쓴다.

import type { Metadata } from "next";
import { defaultThumbnail } from "@/lib/portfolio/schema";

export type SampleMetadataInput = {
  /** 카드 slug 와 같게 (audit 이 대조한다) */
  slug: string;
  /** 「<가상 브랜드> — <업종>」. 「샘플」은 레이아웃 제목 템플릿이 붙인다 */
  title: string;
  /** 「가상 브랜드 샘플」「실제 업체가 아니며 ○○은 접수되지 않습니다」를 넣는다 */
  description: string;
};

export function sampleMetadata({ slug, title, description }: SampleMetadataInput): Metadata {
  const thumb = defaultThumbnail(slug);
  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: "태문 DEV STUDIO 샘플 사이트",
      title: `${title} — 태문 DEV STUDIO 샘플 사이트`,
      description,
      url: `/demo/${slug}`,
      images: [{ url: thumb.desktop, width: 1440, height: 900, alt: `${title} 샘플 사이트 화면` }],
    },
  };
}
