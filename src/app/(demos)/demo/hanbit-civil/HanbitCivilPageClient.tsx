'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { HanbitCivilApp } from '@/components/demos/hanbit-civil/HanbitCivilApp';

interface Props {
  isEmbed: boolean;
}

export default function HanbitCivilPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <HanbitCivilApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/hanbit-civil?embed=true"
      title="한빛토목이앤씨 (HANBIT CIVIL)"
      category="토목 · 고속도로 & 해상 장대교량"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (국가 인프라·장대교량·철도터널 토목 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Mega Civil Infrastructure Showcase',
        'Civil Cost & Timeline Estimator',
        'Advanced Bridge MSS & NATM Tech Archive',
      ]}
      inquiryUrl="/inquiry?from=hanbit-civil"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '공종별 메가 인프라 갤러리, 구간 연장(km) 기반 개략 사업비 & 공기 산출기' },
        { label: '특화 토목 공법', value: '이동식 비계공법(MSS), 대단면 NATM 터널 굴착, 드론 3D 라이다 정밀 지형 측량' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 인프라 개발 타당성 사전 검토 및 턴키 견적 신청 모달' },
      ]}
    />
  );
}
