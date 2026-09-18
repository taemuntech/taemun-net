'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import PrimeVisionEyeClinicApp from "@/components/demos/prime-vision-eye-clinic/PrimeVisionEyeClinicApp";

// 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 — 규격서 PORTFOLIO_FACTORY.md §0-10.
// ?embed=true 로 열린 안쪽 문서에서만 화면을 그대로 그린다(툴바의 iframe 이 여는 주소).
interface Props {
  isEmbed?: boolean;
}

export default function PrimeVisionEyeClinicPageClient({ isEmbed = false }: Props) {
  if (isEmbed) {
    return <PrimeVisionEyeClinicApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/prime-vision-eye-clinic?embed=true"
      title={"프라임 스마트 아이 안과"}
      category={"병의원 · 시력교정 & 노안백내장 센터 안과의원"}
      client={"가상 브랜드 샘플 — 실제 업체가 아닙니다 (시력교정 & 노안백내장 센터 안과의원 설정)"}
      techStack={["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"]}
      inquiryUrl="/inquiry?from=prime-vision-eye-clinic"
      specs={[{"label": "기능 01", "value": "4세대 펨토초 레이저 기반 7초 렌티큘 추출술 vs 라식·라섹 3대 시술 비교 화면"}, {"label": "기능 02", "value": "디옵터·각막두께·라이프스타일을 고르면 먼저 검토할 시술을 안내하는 참고용 적합도 계산기"}, {"label": "기능 03", "value": "단초점 vs 다초점 인공수정체 백내장 수술 전후 스마트폰·모니터·원거리 시야 체감 뷰어"}, {"label": "기능 04", "value": "각막 지형도·OCT 망막 단층 등 50단계 정밀 안종합검진 인터랙티브 로드맵"}]}
    />
  );
}
