'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { EulerMathApp } from '@/components/demos/euler-math/EulerMathApp';

interface Props {
  isEmbed: boolean;
}

export default function EulerMathPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <EulerMathApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/euler-math?embed=true"
      title="오일러 수학 영재학술원 (EULER MATHEMATICS)"
      category="학원 · 영재수학 & KMO 올림피아드"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (영재 수학학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'HTML5 3D Wireframe Canvas',
        'Euler Characteristic Lab',
        'Olympiad Diagnostic Wizard',
      ]}
      inquiryUrl="/inquiry?from=euler-math"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '3D 기하학 Lab', value: '플라톤 5대 정다면체 회전 렌더링 및 V - E + F = 2 실시간 검증' },
        { label: '기출 논증 해체', value: 'KMO 1·2차 및 영재교 심층 구술 문항 발문과 단계별 증명 해체' },
        { label: '영재성 진단 전환', value: '1:1 정밀 수리 역량 진단평가 및 심층 면접 예약 위저드' },
      ]}
    />
  );
}
