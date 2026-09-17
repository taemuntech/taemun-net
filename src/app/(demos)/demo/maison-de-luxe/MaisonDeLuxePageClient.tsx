'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import MaisonDeLuxeApp from '@/components/demos/maison-de-luxe/MaisonDeLuxeApp';

interface Props {
  isEmbed: boolean;
}

export default function MaisonDeLuxePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <MaisonDeLuxeApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/maison-de-luxe?embed=true"
      title="MAISON DE LUXE (메종 드 럭스)"
      category="이커머스 · 하이엔드 럭셔리 & 명품 부티크 살롱"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (파리·서울 명품 아카이브 부티크 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '3-Stage Authenticity Radar System',
        'NFC Hash Cryptographic Authenticator',
        'VIP Private Concierge Stream Engine',
        'Bonded Escrow Settlement Wizard',
      ]}
      inquiryUrl="/inquiry?from=maison-de-luxe&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '단일 lg: 브레이크포인트 모바일 퍼스트 4열 그리드' },
        { label: '3단계 정품 검수 시스템', value: 'AI 분광 스캔 · 공인 감정위원 2차 검수 · 위변조 방지 NFC 봉인' },
        { label: 'NFC 디지털 보증서 조회', value: '시리얼/해시코드 실시간 분광 대조 및 정품 감정서 출력 모달' },
        { label: '안심 예치 결제 시스템', value: '진품 감정 확인 시까지 안전 예치 및 VIP 발렛 핸드캐리 배송 지원' },
      ]}
    />
  );
}
