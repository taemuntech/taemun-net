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
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (럭셔리 부티크 리조트 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Villa Suite Explorer',
        'Stay Estimate Calculator',
        'Gastronomy Showcase',
        'VIP Charter Gate',
      ]}
      inquiryUrl="/inquiry?from=atlas-resort"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '숙박 & 여정 계산기', value: '여행지·객실 등급·숙박일수·부가 프로그램을 반영한 예시 견적 산정' },
        { label: '빌라 스위트 셀렉터', value: '남해 절벽 풀빌라, 제주 원시림 에스테이트, 발리 생츄어리 3종 익스플로러 (예시 설정)' },
        { label: 'VIP 컨시어지 게이트', value: '프라이빗 요트·셰프 디너·헬리콥터 트랜스퍼 옵션 선택 폼 (샘플 — 접수되지 않음)' },
      ]}
    />
  );
}
