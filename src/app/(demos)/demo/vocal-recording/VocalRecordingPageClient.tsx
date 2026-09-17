'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { VocalRecordingApp } from '@/components/demos/vocal-recording/VocalRecordingApp';

interface Props {
  isEmbed: boolean;
}

export default function VocalRecordingPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <VocalRecordingApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/vocal-recording?embed=true"
      title="보컬하우스 레코딩 스튜디오 (VOCAL HOUSE)"
      category="학원 · 실용음악 & 멀티트랙 보컬 스튜디오"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (실용음악 보컬 아카데미 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Web Audio API',
        'DAW Multi-track Mixer',
        'Canvas Spectrum Waveform',
        'Vocal Range Diagnostic',
      ]}
      inquiryUrl="/inquiry?from=vocal-recording"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: 'DAW 믹서', value: '4트랙 스템 볼륨·Mute·Solo 조절 및 Canvas 실시간 파형 애니메이션' },
        { label: '성구 진단기', value: 'C3~C6 건반 음정 오디오 신디사이저 및 흉성·믹스·두성 가이드' },
        { label: '전환 리드 폼', value: '목표별 1:1 보컬 진단 및 마이크 테스트 예약 전환' },
      ]}
    />
  );
}
