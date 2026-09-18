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
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (산지 직송 프리미엄 신선식품 새벽배송 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=verde-gourmet"
      specs={[
        { label: '반응형 규격', value: '모바일 2열 신선 그리드 & 데스크톱 4열 단일 lg: 브레이크포인트 규격' },
        { label: '콜드체인 이력 화면', value: '산지 ➔ 저온물류센터 ➔ 냉장탑차 ➔ 문앞 단계별 온도 이력 카드·검증서 모달 (예시 데이터)' },
        { label: '셰프 레시피 일괄 담기', value: '레시피 식재료를 체크해 장바구니에 한 번에 담고 번들 할인가를 다시 계산' },
        { label: '온도대별 보관 카테고리', value: '냉장 · 유기농 · 상온 분류와 100g당 단가 표기 (예시 수치)' },
      ]}
    />
  );
}
