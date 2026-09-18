'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { MetroBuildApp } from '@/components/demos/metro-build/MetroBuildApp';

interface Props {
  isEmbed: boolean;
}

export default function MetroBuildPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <MetroBuildApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/metro-build?embed=true"
      title="메트로 종합건설 (METRO BUILD)"
      category="건축 · 기업사옥 & 첨단 지식산업센터"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (기업사옥·지식산업센터 턴키 종합건설 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=metro-build"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '스마트 건설 기술', value: 'BIM 4D 디지털 트윈 공정 시뮬레이션 및 IoT 현장 안전 통합 관제' },
        { label: '턴키 엔지니어링', value: '부지 분석부터 인허가, 토공사, 골조 상량, 책임준공까지 원스톱' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 신축 부지 무료 법적 검토 및 턴키 견적 의뢰 모달' },
      ]}
    />
  );
}
