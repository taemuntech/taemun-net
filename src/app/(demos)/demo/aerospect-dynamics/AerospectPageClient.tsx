'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import AerospectApp from '@/components/demos/aerospect-dynamics/AerospectApp';

interface Props {
  isEmbed: boolean;
}

export default function AerospectPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AerospectApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/aerospect-dynamics?embed=true"
      title="AEROSPECT DYNAMICS (에어로스펙트 다이내믹스)"
      category="기업랜딩 · 산업용 자율비행 드론 & AI 인프라 안전진단"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (산업 드론 로보틱스 기업 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=aerospect-dynamics"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '스플릿 듀얼 비전', value: '4K 광학 RGB 대역과 방사열 열화상(Radiometric Thermal) 실시간 드래그 비교 뷰어' },
        { label: 'AERO-CLOUD 지능형 진단', value: '0.1mm 미세 크랙 AI 자동 판독, 3D 디지털 트윈 토공량 시뮬레이터 및 원클릭 공학 보고서' },
        { label: '센티넬 무인 도크', value: '24/7 원격 비행 출격, 자율 복귀 및 충전 시뮬레이션 인터랙티브 HUD' },
      ]}
    />
  );
}
