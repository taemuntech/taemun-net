'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { ChopinPianoApp } from '@/components/demos/chopin-piano/ChopinPianoApp';

interface Props {
  isEmbed: boolean;
}

export default function ChopinPianoPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <ChopinPianoApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/chopin-piano?embed=true"
      title="쇼팽하우스 피아노 아카데미 (CHOPIN HAUS)"
      category="학원 · 클래식 피아노 마스터클래스 & 살롱"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (클래식 피아노 전문 아카데미 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Web Audio API Synthesizer',
      ]}
      inquiryUrl="/inquiry?from=chopin-piano"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '물리 음향 합성', value: 'Web Audio API 기반 88건반 실시간 하모닉스 배음 사운드 엔진' },
        { label: '어쿠스틱 계측', value: '스타인웨이 D-274 룸 잔향(RT60) 및 1~8차 고조파 배음 분포도' },
        { label: '도제식 클래스', value: '예중·예고·국내외 명문 음대 실기 대비 1:1 오디션 및 청강 신청' },
      ]}
    />
  );
}
