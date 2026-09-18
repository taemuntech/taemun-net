'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import NexusRoboticsApp from '@/components/demos/nexus-robotics/NexusRoboticsApp';

interface Props {
  isEmbed: boolean;
}

export default function NexusRoboticsPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <NexusRoboticsApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/nexus-robotics?embed=true"
      title="NEXUS ROBOTICS (넥서스 로보틱스)"
      category="기업랜딩 · AI 자율주행 AMR & 클린룸 피지컬 로보틱스"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (클린룸 자율주행 로보틱스 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=nexus-robotics"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '디지털 트윈 HUD', value: '148노드 팹 관제 맵 구성 & 교착(Deadlock) 회피 라우팅 (예시 데이터)' },
        { label: 'ROI 시뮬레이터', value: '면적/교대 인력별 연간 절감액 & 회수 개월 즉시 계산 (예시 산출식)' },
        { label: '클린룸 규격', value: '클린룸 등급 표기(예시 수치), 무진동 마그네틱 휠 & 밀폐 섀시' },
      ]}
    />
  );
}
