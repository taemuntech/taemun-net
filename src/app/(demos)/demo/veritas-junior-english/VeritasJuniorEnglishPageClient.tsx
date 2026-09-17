'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { VeritasJuniorEnglishApp } from '@/components/demos/veritas-junior-english/VeritasJuniorEnglishApp';

interface Props {
  isEmbed: boolean;
}

export default function VeritasJuniorEnglishPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <VeritasJuniorEnglishApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/veritas-junior-english?embed=true"
      title="베리타스 주니어 프레스티지 어학원 (VERITAS JUNIOR)"
      category="학원 · 프리미엄 주니어 영어몰입 & 북클럽"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (주니어 영어몰입 어학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'Lexile Virtual Bookshelf',
        'AI Speech Diagnostic Lab',
        'Native Interview Wizard',
      ]}
      inquiryUrl="/inquiry?from=veritas-junior-english"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '렉사일 서재', value: '200L~1100L 슬라이더 조절 & 미국 사립학교 원서 3D 표지 큐레이션' },
        { label: '스피킹 랩', value: '발음·유창성·억양 5대 메트릭 AI 음성 진단 및 모범 발화 오디오 재생' },
        { label: '레벨테스트 전환', value: '1:1 원어민 인터뷰 및 렉사일 진단 레벨테스트 신청 위저드' },
      ]}
    />
  );
}
