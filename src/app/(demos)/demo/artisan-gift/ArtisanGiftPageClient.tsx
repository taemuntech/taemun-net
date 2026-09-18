'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import ArtisanGiftApp from '@/components/demos/artisan-gift/ArtisanGiftApp';

interface Props {
  isEmbed: boolean;
}

export default function ArtisanGiftPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ArtisanGiftApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/artisan-gift?embed=true"
      title="ARTISAN & GIFT (아티장 앤 기프트)"
      category="이커머스 · 전통 공예 & 비스포크 기프트"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (전통 공예 장인 아틀리에 연합 셀렉트샵 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=artisan-gift&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '단일 lg: 브레이크포인트 모바일 퍼스트 4열 그리드' },
        { label: '실시간 각인 시뮬레이터', value: '지갑/펜에 이니셜 입력 시 24K 골드박·불도장 음각·폰트(세리프/필기체) 실시간 렌더링' },
        { label: '전통 보자기 매듭 룩북', value: '수국·나비·연꽃 매듭 4종 확대 뷰어(Esc·배경 클릭 닫힘) 및 포장 옵션' },
        { label: '기념일 맞춤 예약 배송', value: '생일·승진·명절 희망일 지정 출고 안내 및 보자기 선물 포장 패키징 (예시 기능)' },
      ]}
    />
  );
}
