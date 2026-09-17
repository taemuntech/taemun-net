'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { TerraCoreApp } from '@/components/demos/terra-core/TerraCoreApp';

interface Props {
  isEmbed: boolean;
}

export default function TerraCorePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <TerraCoreApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/terra-core?embed=true"
      title="테라코어 (TERRA-CORE)"
      category="건축 · 대심도 지중 토목 & TBM 관제"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (대심도 지중 엔지니어링 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Subterranean Strata HUD',
        '14.2M TBM Cutterhead Simulator',
        'Geotechnical Spec Archive',
      ]}
      inquiryUrl="/inquiry?from=terra-core"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '수직 심도(0~-80m) 지압 HUD, 14.2m TBM RPM 시뮬레이터, 4대 지층 핫스팟' },
        { label: '물성 아카이브', value: 'C60 강섬유 세그먼트, EPDM 개스킷, SD500 록볼트 등 특수 토목 스펙' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 대심도 지중 토목 기술 제안 신청 모달' },
      ]}
    />
  );
}
