'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { AtelierBeauxArtsApp } from '@/components/demos/atelier-beaux-arts/AtelierBeauxArtsApp';

interface Props {
  isEmbed: boolean;
}

export default function AtelierBeauxArtsPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AtelierBeauxArtsApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/atelier-beaux-arts?embed=true"
      title="아틀리에 보자르 미대입시 (ATELIER BEAUX-ARTS)"
      category="학원 · 최상위권 명문 미대 실기 & 디자인 조형 랩"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (명문 미대입시 아카데미 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '3D Perspective Tilt Gallery',
        'Golden Ratio Grid Overlay',
        'Exam Rubric Lab',
      ]}
      inquiryUrl="/inquiry?from=atelier-beaux-arts"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '3D 갤러리', value: '3D 원근 틸트 인터랙티브 합격작 & 황금분할 그리드 오버레이' },
        { label: '기출 발문 Lab', value: '상위권 미대 실기 전형 모의 발문(예시) 제시물 물성 및 전략 해체' },
        { label: '실기 진단 전환', value: '목표 대학별 1:1 모의 실기 평가 및 포트폴리오 심층 진단' },
      ]}
    />
  );
}
