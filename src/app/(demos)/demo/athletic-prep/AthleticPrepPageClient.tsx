'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { AthleticPrepApp } from '@/components/demos/athletic-prep/AthleticPrepApp';

interface Props {
  isEmbed: boolean;
}

export default function AthleticPrepPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AthleticPrepApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/athletic-prep?embed=true"
      title="아펙스 체대입시 & 엘리트 스포츠 아카데미 (APEX ATHLETIC)"
      category="학원 · 체대입시 & 엘리트 스포츠"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (체대입시 학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'Digital Sensor Biometrics HUD',
        'Admission Viability Matrix',
        'Elite Sports Wizard',
      ]}
      inquiryUrl="/inquiry?from=athletic-prep"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '4대 기초실기 HUD', value: '배근력·제멀·왕복달리기·좌전굴 디지털 전자 센서 계측 및 만점 환산 텔레메트리' },
        { label: '합격 예측 계산기', value: '수능 백분위와 실기 총 감점 연동 주요 명문 체대 실시간 지원 안정권 분석' },
        { label: '실기 측정 전환', value: '1:1 무료 전자기측기 실기 측정 및 목표 대학 합격 가능성 진단 위저드' },
      ]}
    />
  );
}
