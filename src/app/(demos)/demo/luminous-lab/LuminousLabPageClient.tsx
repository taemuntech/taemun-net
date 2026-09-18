'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import LuminousLabApp from '@/components/demos/luminous-lab/LuminousLabApp';

interface Props {
  isEmbed: boolean;
}

export default function LuminousLabPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <LuminousLabApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/luminous-lab?embed=true"
      title="LUMINOUS LAB (루미너스 랩)"
      category="이커머스 · K-뷰티 & 클린 더마 코스메틱"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (클린 더마 코스메틱 D2C 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=luminous-lab&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 뷰티 그리드 & 데스크톱 4열 단일 lg: 브레이크포인트 규격' },
        { label: '전성분 인스펙터', value: '20가지 주의성분 판정표·피부 타입별 적합도·임상 지표 카드 (모두 예시 수치)' },
        { label: '피부고민 맞춤 4단계 필터', value: '카테고리·피부타입·피부고민·클린 인증 4단 필터가 랭킹 목록에 바로 반영' },
        { label: '랭킹 & 세트 번들', value: '카테고리 탭 랭킹 목록과 듀오 기획 세트(예시 특가), 장바구니 드로어·무료배송 게이지' },
      ]}
    />
  );
}
