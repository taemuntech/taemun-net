'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { ResonanceSoundApp } from '@/components/demos/resonance-sound/ResonanceSoundApp';

interface Props {
  isEmbed: boolean;
}

export default function ResonanceSoundPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ResonanceSoundApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/resonance-sound?embed=true"
      title="공명 하이파이 (RESONANCE SOUND)"
      category="인테리어 · 하이파이 오디오 청음실 & 바이닐 스튜디오"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (성수동 바이닐 청음 라운지 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'RT60 Acoustic Simulator HUD',
        'Acoustic Material Library',
        'Sweet-Spot Spatial Zones',
      ]}
      inquiryUrl="/inquiry?from=resonance-sound"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '장르 프리셋 RT60 잔향 시간 시뮬레이터 HUD, 3대 청음/시네마 존 투어' },
        { label: '물성 아카이브', value: '2D QRD 우드 디퓨저, 재생 PET 흡음 펠트, 코르크-러버 방진 시트 등 음향 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 음향 공간 시공 상담 신청 모달' },
      ]}
    />
  );
}

