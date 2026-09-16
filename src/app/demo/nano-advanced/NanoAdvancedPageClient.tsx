'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import NanoAdvancedApp from '@/components/demos/nano-advanced/NanoAdvancedApp';

interface Props {
  isEmbed: boolean;
}

export default function NanoAdvancedPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <NanoAdvancedApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/nano-advanced?embed=true"
      title="NANO ADVANCED (나노어드밴스드)"
      category="기업랜딩 · 2.5D/3D 반도체 첨단 이종 패키징 & 글래스 기판"
      client="차세대 AI 가속기 & HBM4 패키징 엔터프라이즈"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Heterogeneous 4-Layer Explorer',
        'AI Thermal & Warpage Simulator',
        'Foundry Zero-Defect Inspection',
      ]}
      inquiryUrl="/inquiry?from=nano-advanced"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '마이크로 아키텍처 익스플로러', value: 'L1 Top Logic~L4 Glass Substrate 4단계 마이크로 인터커넥트 인터랙티브 뷰어' },
        { label: '열/휨(Warpage) 시뮬레이터', value: 'HBM 스택 수 및 TDP(W)에 따른 실시간 발열·휨 계측 및 엔지니어링 리포트 생성' },
        { label: '샘플 요청 위저드', value: '글로벌 팹리스·파운드리 전용 웨이퍼 테스트 샘플 및 기술 실무 미팅 접수' },
      ]}
    />
  );
}
