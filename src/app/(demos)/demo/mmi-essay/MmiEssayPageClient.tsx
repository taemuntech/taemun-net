'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { MmiEssayApp } from '@/components/demos/mmi-essay/MmiEssayApp';

interface Props {
  isEmbed: boolean;
}

export default function MmiEssayPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <MmiEssayApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/mmi-essay?embed=true"
      title="아고라 논술 & MMI 의대면접 센터 (AGORA)"
      category="학원 · 대입 논술 & 의대 MMI 심층면접"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (대입 논술 & 의대면접 학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'Red-Pen Critique Lab',
        'MMI Dilemma Simulator',
        'Admission Diagnostic Wizard',
      ]}
      inquiryUrl="/inquiry?from=mmi-essay"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '첨삭 비교 Lab', value: '초안(Before) vs 첨삭본(After) 동시 비교 및 평가위원 핀셋 코멘트' },
        { label: 'MMI 시뮬레이터', value: '8분 카운트다운 타이머 & 딜레마 제시문 꼬리질문 아코디언' },
        { label: '서면 진단 전환', value: '1:1 논술 답안 서면 진단평가 및 MMI 모의면접 예약 위저드' },
      ]}
    />
  );
}
