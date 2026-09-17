'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { DaechiPrestigeApp } from '@/components/demos/daechi-prestige/DaechiPrestigeApp';

interface Props {
  isEmbed: boolean;
}

export default function DaechiPrestigePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <DaechiPrestigeApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/daechi-prestige?embed=true"
      title="대치 프레스티지 학원 (DAECHI PRESTIGE)"
      category="학원 · 최상위권 의치약한 전문 입시학원"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (대치동 학원가 플래그십 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Med-Pass Simulator',
        'Killer Question Lab',
        'Level-Test Wizard',
      ]}
      inquiryUrl="/inquiry?from=daechi-prestige"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '합격진단 엔진', value: '국·수·탐 백분위 실시간 연동 의치약한 합격예측 시뮬레이터(예시)' },
        { label: '킬러문항 Lab', value: '수학 미적분·과탐 킬러문항 3단계 발문 해체 및 숏컷 인터랙티브' },
        { label: '원생 유치 전환', value: '지망 학과별 1:1 심층 입학 진단 레벨테스트 신청 위저드' },
      ]}
    />
  );
}
