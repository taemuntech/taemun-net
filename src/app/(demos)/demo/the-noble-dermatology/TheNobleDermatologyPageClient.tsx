'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import TheNobleDermatologyApp from "@/components/demos/the-noble-dermatology/TheNobleDermatologyApp";

// 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 — 규격서 PORTFOLIO_FACTORY.md §0-10.
// ?embed=true 로 열린 안쪽 문서에서만 화면을 그대로 그린다(툴바의 iframe 이 여는 주소).
interface Props {
  isEmbed?: boolean;
}

export default function TheNobleDermatologyPageClient({ isEmbed = false }: Props) {
  if (isEmbed) {
    return <TheNobleDermatologyApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/the-noble-dermatology?embed=true"
      title={"더 노블 청담 피부과"}
      category={"병의원 · 안티에이징 & 1인 프라이빗 룸 피부과의원"}
      client={"가상 브랜드 샘플 — 실제 업체가 아닙니다 (안티에이징 & 1인 프라이빗 룸 피부과의원 설정)"}
      techStack={["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Serial Lookup Widget", "Skin Spectrum Showcase"]}
      inquiryUrl="/inquiry?from=the-noble-dermatology"
      specs={[{"label": "기능 01", "value": "1회용 멸균 소모품 번호 조회 및 사용 확인서 미리보기 위젯 (예시 데이터)"}, {"label": "기능 02", "value": "일반광·편광·교차편광·UV광 4종 광원 피부 영상 분석 쇼케이스"}, {"label": "기능 03", "value": "타 고객과 마주치지 않는 1인 단독 독립 VIP 케어룸 투어 모달"}, {"label": "기능 04", "value": "초음파·고주파·스킨부스터·색소 레이저 시술 안내와 개인차·부작용 고지"}]}
    />
  );
}
