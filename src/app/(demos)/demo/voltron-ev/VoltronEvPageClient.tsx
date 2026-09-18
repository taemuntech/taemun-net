'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import VoltronEvApp from '@/components/demos/voltron-ev/VoltronEvApp';

interface Props {
  isEmbed: boolean;
}

export default function VoltronEvPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <VoltronEvApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/voltron-ev?embed=true"
      title="VOLTRON ADVANCED EV (볼트론 전장)"
      category="기업랜딩 · 800V EV 전장 & SiC 전력반도체"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (800V EV 파워트레인·전력반도체 기업 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=voltron-ev"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '800V 초급속 충전 시뮬레이터', value: '배터리 용량(75~120kWh) 및 주변온도(-20~45℃) 조절 충전 곡선/열방출 실시간 계측' },
        { label: '파워트레인 구조 분해 뷰어', value: 'Gen-3 SiC 인버터, 고전압 정션박스, 헤어핀 권선 모터 마이크로 아키텍처' },
        { label: '글로벌 OEM 인증관', value: '기능안전·전장부품 인증 배지 표기(예시)와 엔지니어링 백서 신청 폼 (샘플 — 접수되지 않음)' },
      ]}
    />
  );
}
