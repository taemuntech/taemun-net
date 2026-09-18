'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { AetherMedicalApp } from '@/components/demos/aether-medical/AetherMedicalApp';

interface Props {
  isEmbed: boolean;
}

export default function AetherMedicalPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AetherMedicalApp />;
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
        'Acoustic & Circadian HUD',
        'Medical Material Library',
        'VIP Zone Selector',
      ]}
      inquiryUrl="/inquiry?from=aether-medical"
      // 스펙 표는 화면에 실제로 있는 것만 적는다 — 「핫스팟 투어」·「무광 테라조/항균 패브릭」은 이 데모에 없던 설명이었다
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '차음 & 서카디언 조도 텔레메트리 HUD(시뮬레이션), 3대 VIP 존 전환' },
        { label: '물성 아카이브', value: '항균 규조 미장, 로만 트래버틴, 샴페인 골드, 차음 오크 패널, 플루티드 글라스' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 메디컬 클리닉 시공 상담 신청 모달' },
      ]}
    />
  );
}

