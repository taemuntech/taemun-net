'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { LogisParkApp } from '@/components/demos/logis-park/LogisParkApp';

interface Props {
  isEmbed: boolean;
}

export default function LogisParkPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <LogisParkApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/logis-park?embed=true"
      title="로지스파크 건설 (LOGIS PARK)"
      category="건축 · 스마트 저온 물류센터 & 첨단 플랜트"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (스마트 저온 물류센터·콜드체인 턴키 시공 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=logis-park"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '-25℃ 초저온/냉장/상온 3단 챔버 다이어그램, 연면적 및 램프형태별 공사비 시뮬레이터' },
        { label: '물류 플랜트 기술', value: 'FM1 규격 초평탄 바닥, 대형 PC 기둥 고속 양중, 바닥 동결 방지 히팅 시스템' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 물류부지 인허가 사전 검토 및 턴키 견적 신청 모달' },
      ]}
    />
  );
}
