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
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (글로벌 해운·항공 복합운송, 스마트 항만 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=transocean-scm"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '화물 관제 HUD', value: 'B/L 선하증권별 항로 진행률, 냉동 리퍼 -18.2℃ 온습도·충격 텔레메트리 (예시 데이터)' },
        { label: '복합운임 & 탄소 계산기', value: '해상·씨앤에어·항공 운송모드별 운임, 리드타임, Scope-3 탄소 배출 비교 (예시 산식)' },
        { label: '스마트 항만 레이더 모달', value: '부산·로테르담·싱가포르·LA 4개 허브 혼잡도·크레인 가동률 브리핑 (예시 데이터)' },
      ]}
    />
  );
}
