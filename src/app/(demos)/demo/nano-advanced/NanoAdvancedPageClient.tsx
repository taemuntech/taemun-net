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
      client="가상 브랜드 샘플 — 실제 고객사가 아닙니다"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Heterogeneous 4-Layer Explorer',
        'AI Thermal & Warpage Simulator',
        'Foundry Quality Inspection Flow',
      ]}
      inquiryUrl="/inquiry?from=nano-advanced"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '마이크로 아키텍처 익스플로러', value: 'L1 Top Logic~L4 Glass Substrate 4단계 마이크로 인터커넥트 인터랙티브 뷰어' },
        { label: '열/휨(Warpage) 시뮬레이터', value: 'HBM 스택 수 및 TDP(W) 를 고르면 화면에서 바로 산출되는 예시 발열·휨 값과 요약 보고 화면' },
        { label: '기술 미팅 신청 폼', value: '적용 분야·검토 공법·담당자 정보를 고르는 4단계 폼 (샘플 — 접수되지 않음)' },
      ]}
    />
  );
}
