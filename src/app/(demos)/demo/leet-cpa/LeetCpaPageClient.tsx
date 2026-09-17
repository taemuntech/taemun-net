'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { LeetCpaApp } from '@/components/demos/leet-cpa/LeetCpaApp';

interface Props {
  isEmbed: boolean;
}

export default function LeetCpaPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <LeetCpaApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/leet-cpa?embed=true"
      title="렉스 로스쿨 LEET & CPA 고시관 (LEX ACADEMY)"
      category="학원 · 로스쿨 LEET & CPA 고시관"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (전문직 고시학원 설정)"
      techStack={[
        'Next.js 16',
        'TypeScript',
        'Tailwind CSS v4',
        'LEET Killer Question Pinset Lab',
        'LEET Standard Score Simulator',
        'Professional Exam Wizard',
      ]}
      inquiryUrl="/inquiry?from=leet-cpa"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '기출 핀셋 해체', value: '정답률 20%대 킬러 문항 지문 분석 및 오답 함정(Trap) 비율 텔레메트리' },
        { label: '표준점수 시뮬레이터', value: '학점(GPA) 및 토익 점수 입력 시 목표 로스쿨 군별 요구 표준점수 자동 산출' },
        { label: '합격 진단 전환', value: '1:1 로스쿨/CPA 합격 가능성 정밀 진단 및 스파르타 상담 위저드' },
      ]}
    />
  );
}
