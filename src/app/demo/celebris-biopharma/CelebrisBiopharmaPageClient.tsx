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
      client="코스닥 기술특례상장 준비 바이오텍 (글로벌 5개국 임상 2상)"
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
        { label: '파이프라인 매트릭스', value: '임상 단계별(Discovery~Phase 2) 실시간 인터랙티브 현황판' },
        { label: 'MoA 3D 분자 모달', value: 'KRAS 변이 분해 및 Trop-2 ADC 작용 기전 영상 뷰어 연동' },
        { label: '기술이전(L/O) 위저드', value: '글로벌 빅파마 BD 전용 CDA/NDA 체결 및 가상데이터룸(VDR) 신청' },
      ]}
    />
  );
}
