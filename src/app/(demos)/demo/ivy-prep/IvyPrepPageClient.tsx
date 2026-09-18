'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { IvyPrepApp } from '@/components/demos/ivy-prep/IvyPrepApp';

interface Props {
  isEmbed: boolean;
}

export default function IvyPrepPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <IvyPrepApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/ivy-prep?embed=true"
      title="아이비 프렙 아카데미 (IVY PREP ACADEMY)"
      category="학원 · 미국 보딩스쿨 & SAT/AP 전문관"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (아이비리그 입시학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        '6-Axis Competency Radar SVG Lab',
        'Digital SAT 1600 Score Telemetry',
        'Holistic Admissions Wizard',
      ]}
      inquiryUrl="/inquiry?from=ivy-prep"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '6대 역량 Radar', value: 'GPA·SAT·AP·EC·Honors·에세이 6축 다각도 방사형 차트 인터랙션' },
        { label: 'Digital SAT 진단', value: '목표 대학 컷라인(25th~75th) 대비 실시간 백분위 점수 분석 HUD' },
        { label: '입시 진단 전환', value: '1:1 프라이빗 입시 로드맵 및 스파이크(Spike) 심층 컨설팅 위저드' },
      ]}
    />
  );
}
