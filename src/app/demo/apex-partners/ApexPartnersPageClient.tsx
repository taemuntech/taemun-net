'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import ApexPartnersApp from '@/components/demos/apex-partners/ApexPartnersApp';

interface Props {
  isEmbed: boolean;
}

export default function ApexPartnersPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ApexPartnersApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/apex-partners?embed=true"
      title="APEX PARTNERS (아펙스 파트너스)"
      category="기업랜딩 · 글로벌 사모펀드(PE) & VC 대체투자"
      client="글로벌 기관투자자(LP) 및 AUM 4.2조 원 대체자산운용사"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Actuarial IRR & DPI Simulator',
        'Air-Gapped VDR Gate',
        '4-Pillar Strategy Matrix',
        'Global Timezone Ticker',
      ]}
      inquiryUrl="/inquiry?from=apex-partners"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '수익률 시뮬레이터', value: '약정액·투자기간·목표배수 조절 실시간 Net IRR 및 DPI 분배금 계산기' },
        { label: '포트폴리오 매트릭스', value: '바이아웃·딥테크·인프라 펀드별 포트폴리오 기업 및 회수(Exit) 실적 모달' },
        { label: '기관투자자 VDR 게이트', value: '연기금·공제회·국부펀드 전용 데이터룸 신청 및 NDA 전자 서약 플로우' },
      ]}
    />
  );
}
