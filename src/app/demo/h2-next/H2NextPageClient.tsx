'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import H2NextApp from '@/components/demos/h2-next/H2NextApp';

interface Props {
  isEmbed: boolean;
}

export default function H2NextPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <H2NextApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/h2-next?embed=true"
      title="H2 NEXT (하이드로젠 넥스트)"
      category="기업랜딩 · 신재생에너지 & 그린수소 엔터프라이즈"
      client="글로벌 신재생에너지 & 액화수소 플랜트 엔지니어링 상장사"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Interactive SCADA Hub Map',
        'Enterprise Carbon & PPA Calculator',
        'Nordic Cleanroom Architecture',
      ]}
      inquiryUrl="/inquiry?from=h2-next"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '실시간 SCADA 허브', value: '신안·울산·포항 4대 발전 거점 실시간 텔레메트리 연동' },
        { label: 'PPA 금융 엔진', value: '연간 전력 사용량별 K-ETS 탄소배출권 절감액 실시간 산출' },
        { label: 'ESG 거버넌스', value: 'TÜV Rheinland 그린수소 인증 및 GRI/SASB 보고서 연동' },
      ]}
    />
  );
}
