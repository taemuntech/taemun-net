'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import TechnovaGearApp from '@/components/demos/technova-gear/TechnovaGearApp';

interface Props {
  isEmbed: boolean;
}

export default function TechnovaGearPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <TechnovaGearApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/technova-gear?embed=true"
      title="TECHNOVA GEAR (테크노바 기어)"
      category="이커머스 · 디지털 가전 & 하이테크 기어"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (게이밍 랩탑·정밀 테크 하드웨어 D2C 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=technova-gear&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 벤토 랙 & 데스크톱 4열 단일 lg: 브레이크포인트 규격' },
        { label: '정밀 하드웨어 스펙 매트릭스', value: '외장 GPU(12~16GB) · 모바일 CPU · 240Hz OLED · 32GB RAM 다면 대조' },
        { label: '3D 쿨링 챔버 분해도 뷰어', value: '베이퍼 챔버 및 듀얼 블로우 팬 열역학 분해도 인터랙티브 CAD 모달' },
        { label: '섀시 I/O 포트 텔레메트리', value: 'USB4 40Gbps, HDMI 2.1, SDExpress 전후좌우 6면 입출력 단자 매크로 뷰' },
      ]}
    />
  );
}
