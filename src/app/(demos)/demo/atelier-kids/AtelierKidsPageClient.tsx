'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { AtelierKidsApp } from '@/components/demos/atelier-kids/AtelierKidsApp';

interface Props {
  isEmbed: boolean;
}

export default function AtelierKidsPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AtelierKidsApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/atelier-kids?embed=true"
      title="아틀리에 키즈 감성 미술원 (ATELIER KIDS)"
      category="학원 · 프랑스식 아동 감성미술 & 조형 아카데미"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (프랑스식 아동 미술원 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Collage Canvas Interactive',
        'Sensory Development HUD',
        'Kids Art Archive',
      ]}
      inquiryUrl="/inquiry?from=atelier-kids"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '비정형 캔버스', value: '자연 오브제 꼴라주 실시간 회전·확대·재배치 인터랙티브 캔버스' },
        { label: '발달 지표 HUD', value: '4세~13세 단계별 4대 감각(촉각·스토리텔링·공간·색채) 발달 지표' },
        { label: '체험 수업 전환', value: '연령 단계별 1회 무료 원데이 감각 체험 수업 신청 위저드' },
      ]}
    />
  );
}
