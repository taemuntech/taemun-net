'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { StrataBuildApp } from '@/components/demos/strata-build/StrataBuildApp';

interface Props {
  isEmbed: boolean;
}

export default function StrataBuildPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <StrataBuildApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/strata-build?embed=true"
      title="스트라타 종합건설 (STRATA)"
      category="건축 · 종합건설 & 공정 시뮬레이터"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (종합건설 & 메가 시공 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=strata-build"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '0%~100% 4단계 공정 타임랩스 슬라이더, 러기드 감리 HUD 텔레메트리' },
        { label: '실적 아카이브', value: '초고층 메가 테크타워, 광역환승 플랫폼, 스마트 물류 플랜트 3대 랜드마크' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 종합건설 도급 견적 및 현장 합동 감리 신청 모달' },
      ]}
    />
  );
}
