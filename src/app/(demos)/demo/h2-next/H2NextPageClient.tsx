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
      client="가상 브랜드 — 신재생에너지·액화수소 플랜트 엔지니어링 기업 (실제 업체가 아닙니다)"
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
        { label: '거점 계기판 화면', value: '거점 4곳을 눌러 바꿔 보는 계기판 구성 (예시 데이터, 외부 연동 없음)' },
        { label: '절감액 계산기', value: '전력 사용량·목표 연도·수소차 대수 슬라이더로 화면에서 바로 계산' },
        { label: 'ESG 구역', value: '인증 배지·보고서 안내 구역 구성 (표기된 인증·기관명은 예시)' },
      ]}
    />
  );
}
