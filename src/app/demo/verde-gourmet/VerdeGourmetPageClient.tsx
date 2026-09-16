'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import VerdeGourmetApp from '@/components/demos/verde-gourmet/VerdeGourmetApp';

interface Props {
  isEmbed: boolean;
}

export default function VerdeGourmetPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <VerdeGourmetApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/verde-gourmet?embed=true"
      title="VERDE GOURMET (베르데 고메)"
      category="이커머스 · 프리미엄 신선식품 & 새벽배송"
      client="산지 직송 오가닉 식료품 & 미식가 큐레이션 D2C 그로서리"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Full Cold-Chain Telemetry',
        'Chef Recipe Batch Cart',
        'Dawn Delivery Countdown',
        'Temperature Zone Matrix',
      ]}
      inquiryUrl="/inquiry?from=verde-gourmet"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 신선 그리드 & 데스크톱 4열 단일 lg: 브레이크포인트 규격' },
        { label: '풀콜드체인 실시간 관제', value: '산지 ➔ 저온물류센터 ➔ 냉동탑차 ➔ 문앞 종이보냉백 전 구간 온도 텔레메트리' },
        { label: '셰프 레시피 일괄 담기', value: '지중해식 한우 타르타르 레시피 식재료 선택 후 원클릭 장바구니 일괄 추가' },
        { label: '온도대별 보관 카테고리', value: '냉장(0~2℃) · 냉동(-18℃) · 상온 분류 및 100g당 투명 단가 공시' },
      ]}
    />
  );
}
