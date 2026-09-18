'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { GeoFoundationApp } from '@/components/demos/geo-foundation/GeoFoundationApp';

interface Props {
  isEmbed: boolean;
}

export default function GeoFoundationPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <GeoFoundationApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/geo-foundation?embed=true"
      title="지오파운데이션 (GEO FOUNDATION)"
      category="토목 · 대심도 흙막이 & 특수기초"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (대심도 흙막이·지하연속벽·RCD 암반말뚝 토목 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Deep Strata Stratum Viewer',
        'Deep Excavation Cost Estimator',
        'D-Wall & RCD Tech Showcase',
      ]}
      inquiryUrl="/inquiry?from=geo-foundation"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '지하 50m 심도별 4대 지층 특성 뷰어, 굴착 심도·면적별 가시설 공사비 시뮬레이터' },
        { label: '특화 토목 공법', value: '하이드로프리즈 지하연속벽(D-Wall), 역순환 굴착(RCD Ø2,500mm), 400bar 초고압 차수 그라우팅(JSP)' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 지반 시추조사보고서 기반 무료 기술 검토 및 가시설 견적 신청 모달' },
      ]}
    />
  );
}
