'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { RobotStemApp } from '@/components/demos/robot-stem/RobotStemApp';

interface Props {
  isEmbed: boolean;
}

export default function RobotStemPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <RobotStemApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/robot-stem?embed=true"
      title="키네틱스 영재로봇공학 & STEM 센터 (KINETICS STEM LAB)"
      category="학원 · 영재로봇공학 & STEM"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (영재 로보틱스 학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'SVG 4-DOF Kinematics Lab',
        'Live C++ Arduino Code Sync',
        'STEM Engineering Wizard',
      ]}
      inquiryUrl="/inquiry?from=robot-stem"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '4-DOF 분해도', value: '0%~100% 슬라이더 연동 기구 분해도(Exploded View) 인터랙션' },
        { label: '관절 제어 & 코드', value: '각도 슬라이더 연동 실시간 C++ 아두이노 PWM 코드 출력 Live Sync' },
        { label: '체험 수업 전환', value: '1:1 로봇 공학 적성 체험 및 대회 입시 상담 신청 위저드' },
      ]}
    />
  );
}
