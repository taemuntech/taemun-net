'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import BonchoHospitalApp from "@/components/demos/boncho-hospital/BonchoHospitalApp";

// 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 — 규격서 PORTFOLIO_FACTORY.md §0-10.
// ?embed=true 로 열린 안쪽 문서에서만 화면을 그대로 그린다(툴바의 iframe 이 여는 주소).
interface Props {
  isEmbed?: boolean;
}

export default function BonchoHospitalPageClient({ isEmbed = false }: Props) {
  if (isEmbed) {
    return <BonchoHospitalApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/boncho-hospital?embed=true"
      title={"본초 통합한방병원"}
      category={"병의원 · 의·한의 협진 80병상 입원 한방병원"}
      client={"가상 브랜드 샘플 — 실제 업체가 아닙니다 (의·한의 협진 80병상 입원 한방병원 설정)"}
      techStack={["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"]}
      inquiryUrl="/inquiry?from=boncho-hospital"
      specs={[{"label": "기능 01", "value": "1·2인실 전동 모션베드 및 편백 테라스 360 파노라마 가상 투어 뷰어"}, {"label": "기능 02", "value": "3대 진료 특화 센터(암 통합진료·교통사고 척추관절·수술 후 재활) 인터랙티브 가이드"}, {"label": "기능 03", "value": "원내 탕전실 처방코드 기반 잔류농약·중금속 시험성적서 예시 조회 (없는 코드는 「조회 결과 없음」으로)"}, {"label": "기능 04", "value": "1세대~4세대 실손의료비 및 자동차보험 예상 비용 계산기 (상급병실료 차액 제외 계산)"}]}
    />
  );
}
