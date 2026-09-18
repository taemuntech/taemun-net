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
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (사모펀드(PE)·대체자산운용사 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=apex-partners"
      specs={[
        { label: '반응형 규격', value: '모바일 375 단일 열 · 태블릿 768 2열 · PC 1024+ 전체 레이아웃 3단계' },
        { label: '수익률 시뮬레이터', value: '약정액·투자기간·목표배수 조절 실시간 Net IRR 및 DPI 분배금 계산기' },
        { label: '포트폴리오 매트릭스', value: '유니콘·회수·딥테크·헬스케어 필터(건수 표시)와 키보드로도 열리는 상세 모달' },
        { label: '기관투자자 VDR 게이트', value: '연기금·공제회·국부펀드 전용 데이터룸 신청 및 NDA 동의 플로우 (샘플 — 접수되지 않음)' },
      ]}
    />
  );
}
