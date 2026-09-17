'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import StellaOrbitalApp from '@/components/demos/stella-orbital/StellaOrbitalApp';

interface Props {
  isEmbed: boolean;
}

export default function StellaOrbitalPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <StellaOrbitalApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/stella-orbital?embed=true"
      title="STELLA ORBITAL SYSTEMS (스텔라 궤도 데이터)"
      category="기업랜딩 · 초소형 인공위성 군집 & 지구관측 AI"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (위성 데이터 기업 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Multi-Sensor Radar Explorer',
        'Constellation Telemetry HUD',
        'Planetary Analytics Suite',
      ]}
      inquiryUrl="/inquiry?from=stella-orbital"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '센서 스위트 익스플로러', value: '0.3m 광학(EO) · X-Band SAR · 초분광/열적외선 3대 센서 인터랙티브 비교 뷰어' },
        { label: '위성 촬영 의뢰 위저드', value: '관심 영역(AOI) 지정, 전천후 센서 선택, Cloud GeoTIFF 즉시 발주 플로우' },
        { label: '군집 텔레메트리 HUD', value: '32기 LEO 위성 다운링크(10Gbps OISL) 및 90분 재방문 주기 인포그래픽 (예시 수치)' },
      ]}
    />
  );
}
