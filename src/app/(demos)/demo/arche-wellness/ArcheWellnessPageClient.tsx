'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { ArcheWellnessApp } from '@/components/demos/arche-wellness/ArcheWellnessApp';

interface Props {
  isEmbed: boolean;
}

export default function ArcheWellnessPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ArcheWellnessApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/arche-wellness?embed=true"
      title="아르케 웰니스 (ARCHE WELLNESS)"
      category="인테리어 · 1:1 VIP 필라테스 & 스파 라운지"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (한남동 프라이빗 스튜디오 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=arche-wellness"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '실시간 클린 에어 텔레메트리 HUD, 3대 프라이빗 룸 투어' },
        { label: '물성 아카이브', value: '히노끼 편백, 테라코타 타일, 천연 규조토 등 친환경 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 필라테스 스튜디오 시공 상담 신청 모달' },
      ]}
    />
  );
}
