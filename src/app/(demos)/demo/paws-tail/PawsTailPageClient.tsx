'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import PawsTailApp from '@/components/demos/paws-tail/PawsTailApp';

interface Props {
  isEmbed: boolean;
}

export default function PawsTailPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <PawsTailApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/paws-tail?embed=true"
      title="PAWS & TAIL VET (포우즈 앤 테일)"
      category="이커머스 · 반려동물 임상영양 & 맞춤 처방식"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (프리미엄 펫 헬스케어 D2C 브랜드 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'AI Veterinary Nutrition Profiler (RER/DER)',
        '1:1 Kibble Scale Comparison Viewer',
        'Online Triage Diagnostic Modal',
        'Clinical Nutrition PDF Report Generator',
      ]}
      inquiryUrl="/inquiry?from=paws-tail&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '단일 lg: 브레이크포인트 모바일 퍼스트 4열 그리드' },
        { label: 'AI 영양 프로파일러', value: '체중·생애주기·중성화·건강고민별 1일 RER/DER 권장 칼로리 & 급여량 정밀 계산' },
        { label: '키블 스케일 뷰어', value: '실물 100원 동전 대비 8mm/12mm/15mm 알갱이 직경 1:1 비교 인터랙션' },
        { label: '온라인 문진 & 리포트', value: '임상영양 전문 수의사 1:1 문진 상담 연계 및 인쇄 최적화 처방 리포트' },
      ]}
    />
  );
}
