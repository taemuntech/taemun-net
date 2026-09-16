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
      client="글로벌 K-뷰티 & 클린 더마 코스메틱 D2C 플래그십"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'EWG Safety Grade Inspector',
        'Skin Concern 4-Tier HUD',
        'Clinical Trial Telemetry',
        'Live Beauty Awards Engine',
      ]}
      inquiryUrl="/inquiry?from=luminous-lab"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 뷰티 그리드 & 데스크톱 4열 단일 lg: 브레이크포인트 규격' },
        { label: 'EWG 전성분 안전 등급', value: '20가지 유해의심성분 제로 & 전성분 100% 그린등급 실시간 검사 위젯' },
        { label: '피부고민 맞춤 4단계 필터', value: '건성·수부지·지성·민감성 피부타입 및 진정·모공·미백 고민별 맞춤 필터링' },
        { label: '실시간 어워즈 랭킹 & 세트 번들', value: '올리브영 스타일 실시간 1~8위 랭킹 탭 및 앰플+장벽크림 시너지 번들 15% 할인' },
      ]}
    />
  );
}
