'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { NexusWorkApp } from '@/components/demos/nexus-work/NexusWorkApp';

interface Props {
  isEmbed: boolean;
}

export default function NexusWorkPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <NexusWorkApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/nexus-work?embed=true"
      title="넥서스 워크 (NEXUS WORK)"
      category="인테리어 · 스마트 오피스 & 사옥 디자인"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (성수 테크 기업 사옥 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Smart Facility HUD',
        'Acoustic Spec Archive',
        'Spatial Zone Hotspots',
      ]}
      inquiryUrl="/inquiry?from=nexus-work"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '인터랙티브 기능', value: '스마트 회의실 IoT 환경 관제 HUD, 4대 업무 몰입 존 투어' },
        { label: '음향 엔지니어링', value: '음향 흡음 마감재 스펙 아카이브 4종 (NRC 등급은 예시 표기)' },
        { label: '클라이언트 기능', value: '회의실 예약 문의 연결 및 1:1 오피스 실측 상담 모달 (샘플 — 실제 접수 없음)' },
      ]}
    />
  );
}
