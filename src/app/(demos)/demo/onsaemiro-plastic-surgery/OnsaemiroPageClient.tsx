'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { OnsaemiroApp } from '@/components/demos/onsaemiro-plastic-surgery/OnsaemiroApp';

// 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 — 규격서 PORTFOLIO_FACTORY.md §0-10.
// ?embed=true 로 열린 안쪽 문서에서만 화면을 그대로 그린다(툴바의 iframe 이 여는 주소).
interface Props {
  isEmbed?: boolean;
}

export default function OnsaemiroPageClient({ isEmbed = false }: Props) {
  if (isEmbed) {
    return <OnsaemiroApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/onsaemiro-plastic-surgery?embed=true"
      title={"온새미로 성형외과"}
      category={"병의원 · 순우리말 자연미 & 안면 황금비율 센터"}
      client={"가상 브랜드 샘플 — 실제 업체가 아닙니다 (순우리말 자연미 & 안면 황금비율 센터 설정)"}
      techStack={["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "3D Facial Ratio HUD", "Before-After Split Viewer"]}
      inquiryUrl="/inquiry?from=onsaemiro-plastic-surgery"
      specs={[{"label": "기능 01", "value": "상안·중안·하안 1:1:0.8 비율 및 비순각(90~110도) 3D 실시간 안면 조화도 계산기"}, {"label": "기능 02", "value": "마우스·터치 제스처로 전후 변화를 교차 비교하는 듀얼 슬라이더 (예시 이미지 · 개인차·부작용 고지 포함)"}, {"label": "기능 03", "value": "실명 집도의제·마취과 1:1 상주·보호자 안심 CCTV 등 5대 안전망 안내 섹션"}, {"label": "기능 04", "value": "천재지변 대비 무정전 전원 공급 장치(UPS) 및 10단계 무균 양압 클린 수술실 시스템"}]}
    />
  );
}
