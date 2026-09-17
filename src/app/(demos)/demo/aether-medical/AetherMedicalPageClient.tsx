'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { AetherMedicalApp } from '@/components/demos/aether-medical/AetherMedicalApp';

interface Props {
  isEmbed: boolean;
}

export default function AetherMedicalPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AetherMedicalApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/aether-medical?embed=true"
      title="에테르 메디컬 (AETHER MEDICAL)"
      category="인테리어 · VIP 프라이빗 피부과 & 안티에이징 센터"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (청담동 하이엔드 클리닉 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Acoustic Silence & Circadian HUD',
        'Medical Material Library',
        'VIP Suite Hotspots',
      ]}
      inquiryUrl="/inquiry?from=aether-medical"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '45dB 차음 & 서카디언 조도 텔레메트리 HUD, 3대 VIP 존 투어' },
        { label: '물성 아카이브', value: '무광 테라조, 항균 패브릭, 베이지 트라버틴 등 친환경 자재 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 메디컬 클리닉 시공 상담 신청 모달' },
      ]}
    />
  );
}

