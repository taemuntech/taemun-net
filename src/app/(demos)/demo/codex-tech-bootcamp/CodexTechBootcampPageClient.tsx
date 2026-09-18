'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { CodexTechBootcampApp } from '@/components/demos/codex-tech-bootcamp/CodexTechBootcampApp';

interface Props {
  isEmbed: boolean;
}

export default function CodexTechBootcampPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <CodexTechBootcampApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/codex-tech-bootcamp?embed=true"
      title="코덱스 아카데미 풀스택 & AI 테크 캠프 (CODEX ACADEMY)"
      category="학원 · 코딩 & AI 테크 아카데미"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (IT 부트캠프 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'Interactive CLI Terminal Sandbox',
        '16-Week Git Heatmap Grid',
        'Production Architecture Showcase',
      ]}
      inquiryUrl="/inquiry?from=codex-tech-bootcamp"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: 'CLI 샌드박스', value: 'npm test 및 docker compose up 실시간 실행 터미널 시뮬레이터' },
        { label: 'Git 잔디 뷰어', value: '16주차 7x16 커밋 히트맵 및 일자별 PR 상세 툴팁 인터랙션' },
        { label: '입학 지원 전환', value: '1:1 코딩테스트 및 이력서/깃허브 사전 역량 진단 위저드' },
      ]}
    />
  );
}
