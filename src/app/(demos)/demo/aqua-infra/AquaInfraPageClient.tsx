'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { AquaInfraApp } from '@/components/demos/aqua-infra/AquaInfraApp';

interface Props {
  isEmbed: boolean;
}

export default function AquaInfraPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AquaInfraApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/aqua-infra?embed=true"
      title="아쿠아인프라엔지니어링 (AQUA INFRA)"
      category="토목 · 대용량 상수도 & 지하화 하수처리"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (광역 상수도·대심도 빗물터널·지하화 수처리 토목 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Underground Waterflow Process Diagram',
        'Water Infra Cost Estimator',
        'MBR Membrane Bioreactor Showcase',
      ]}
      inquiryUrl="/inquiry?from=aqua-infra"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '지하 4단계 MBR 분리막 수처리 공정 뷰어, 공종 및 시설용량별 개략 사업비 산출기' },
        { label: '특화 토목 공법', value: '쉴드 TBM 내경 Ø10m 대심도 방수로, 침지식 MBR 0.04㎛ 정밀 여과, Ø2,400mm 강관 실드 추진' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 공공 및 민간 수자원 인프라 턴키 기술 제휴 신청 모달' },
      ]}
    />
  );
}
