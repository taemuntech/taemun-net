'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { NouveauDiningApp } from '@/components/demos/nouveau-dining/NouveauDiningApp';

interface Props {
  isEmbed: boolean;
}

export default function NouveauDiningPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <NouveauDiningApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/nouveau-dining?embed=true"
      title="누보 다이닝 (NOUVEAU DINING)"
      category="인테리어 · F&B 카페 & 파인다이닝 공간 디자인"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (성수동 프렌치 비스트로 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Ambience Lighting Simulator',
        'Tactile Material Library',
        'Spatial Zone Hotspots',
      ]}
      inquiryUrl="/inquiry?from=nouveau-dining"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '3단계 시간대별 조도(Lux) 시뮬레이션, 3대 조닝 핫스팟 투어' },
        { label: '물성 아카이브', value: '이탈리안 테라조, 브러시드 황동, 에크루 린넨 등 촉각적 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 F&B 공간 시공 상담 신청 모달' },
      ]}
    />
  );
}
