'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import TransoceanScmApp from '@/components/demos/transocean-scm/TransoceanScmApp';

interface Props {
  isEmbed: boolean;
}

export default function TransoceanScmPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <TransoceanScmApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/transocean-scm?embed=true"
      title="TRANSOCEAN GLOBAL SCM (트랜스오션)"
      category="기업랜딩 · 스마트 항만 & AI 복합물류"
      client="글로벌 해운·항공 복합운송 & 스마트 포트 엔터프라이즈"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'AIS Vessel & Reefer HUD',
        'Port Congestion Radar',
        'Multimodal Carbon Calculator',
        'Enterprise RFP Desk',
      ]}
      inquiryUrl="/inquiry?from=transocean-scm"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '실시간 화물 관제 HUD', value: 'B/L 선하증권별 실시간 GPS 항로, 냉동 리퍼 -18.2℃ 원격 온습도/충격 텔레메트리' },
        { label: '복합운임 & 탄소 계산기', value: '해상·항공·철도 운송모드별 운임, 리드타임 및 Scope-3 탄소 배출 절감액 시뮬레이션' },
        { label: '스마트 항만 레이더 모달', value: '부산신항, 로테르담, 싱가포르, LA 항만 혼잡도 및 크레인 가동률 실시간 브리핑' },
      ]}
    />
  );
}
