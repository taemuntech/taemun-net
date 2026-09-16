'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import CelebrisBiopharmaApp from '@/components/demos/celebris-biopharma/CelebrisBiopharmaApp';

interface Props {
  isEmbed: boolean;
}

export default function CelebrisBiopharmaPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <CelebrisBiopharmaApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/celebris-biopharma?embed=true"
      title="CELEBRIS BIOPHARMA (셀레브리스 바이오파마)"
      category="기업랜딩 · 표적단백질분해(TPD) & 차세대 ADC 혁신신약"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (바이오텍 기업 홈페이지 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Interactive Pipeline Matrix',
        'PROTEA-AI Platform Engine',
        'Songdo cGMP Cleanroom Spec',
      ]}
      inquiryUrl="/inquiry?from=celebris-biopharma"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '파이프라인 매트릭스', value: '임상 단계별(Discovery~Phase 2) 인터랙티브 현황판 (예시 데이터)' },
        { label: 'MoA 분자 모달', value: '표적 분해 기전을 4단계로 넘겨 보는 시뮬레이션 모달' },
        { label: '기술이전(L/O) 위저드', value: '관심 파이프라인·제휴 유형을 고르는 4단계 신청 폼 (샘플 — 접수되지 않음)' },
      ]}
    />
  );
}
