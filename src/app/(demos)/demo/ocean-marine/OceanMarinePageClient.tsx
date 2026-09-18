'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { OceanMarineApp } from '@/components/demos/ocean-marine/OceanMarineApp';

interface Props {
  isEmbed: boolean;
}

export default function OceanMarinePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <OceanMarineApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/ocean-marine?embed=true"
      title="오션마린건설 (OCEAN MARINE)"
      category="토목 · 스마트 항만 & 케이슨 방파제"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (초대형 스마트항만·외해 케이슨·준설매립 해양토목 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Maritime Caisson Process Viewer',
        'Port & Harbor Cost Estimator',
        'Deepwater Quay Wall Showcase',
      ]}
      inquiryUrl="/inquiry?from=ocean-marine"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '12,000톤급 케이슨 플로팅 독 제작 및 침설 거치 4단계 뷰어, 선석 규모별 개략 사업비 산출기' },
        { label: '특화 토목 공법', value: '수심 20m 중력식 케이슨 안벽, 외해 유공 슬릿형 케이슨, 80톤 TTP 인터로킹, 대형 CSD 펌프 준설' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 항만 개발 기본계획 수리 검토 및 턴키 견적 의뢰 모달' },
      ]}
    />
  );
}
