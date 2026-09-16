'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import AtlasResortApp from '@/components/demos/atlas-resort/AtlasResortApp';

interface Props {
  isEmbed: boolean;
}

export default function AtlasResortPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AtlasResortApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/atlas-resort?embed=true"
      title="ATLAS RESORTS (아틀라스 리조트 컬렉션)"
      category="기업랜딩 · 럭셔리 부티크 호스피탈리티 & 프라이빗 빌라"
      client="글로벌 하이엔드 호스피탈리티 & 에스테이트 엔터프라이즈"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '360 Villa Suite Explorer',
        'Dynamic Season Calculator',
        'Michelin Gastronomy',
        'VIP Charter Gate',
      ]}
      inquiryUrl="/inquiry?from=atlas-resort"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '숙박 & 여정 계산기', value: '여행지·객실 등급·숙박일수·비포크 애드온 실시간 산정 및 즉시 예약 플로우' },
        { label: '빌라 스위트 셀렉터', value: '남해 절벽 풀빌라, 제주 원시림 에스테이트, 발리 생츄어리 3대 건축 익스플로러' },
        { label: 'VIP 컨시어지 게이트', value: '프라이빗 요트, 미쉐린 소믈리에 디너, 전용 헬리콥터 트랜스퍼 원클릭 접수' },
      ]}
    />
  );
}
