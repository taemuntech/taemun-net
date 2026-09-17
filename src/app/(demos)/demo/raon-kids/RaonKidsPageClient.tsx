'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { RaonKidsApp } from '@/components/demos/raon-kids/RaonKidsApp';

interface Props {
  isEmbed: boolean;
}

export default function RaonKidsPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <RaonKidsApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/raon-kids?embed=true"
      title="라온 키즈 아틀리에 (RAON KIDS)"
      category="인테리어 · 프리미엄 키즈 에듀 & 복합문화 라운지"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (판교 복합문화 교육센터 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Eco Safety Telemetry HUD',
        'Child-Safe Material Library',
        'Interactive Play Zones',
      ]}
      inquiryUrl="/inquiry?from=raon-kids"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '라돈 Zero/VOC Free 친환경 안전 모니터링 HUD, 3대 놀이/아트존 투어' },
        { label: '물성 아카이브', value: 'E0 자작나무, 천연 규조토, 식품 등급 실리콘 등 친환경 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 키즈 시설 맞춤 시공 상담 신청 모달' },
      ]}
    />
  );
}

