'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { SejongTerraApp } from '@/components/demos/sejong-terra/SejongTerraApp';

interface Props {
  isEmbed: boolean;
}

export default function SejongTerraPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <SejongTerraApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/sejong-terra?embed=true"
      title="세종테라개발 (SEJONG TERRA)"
      category="토목 · 스마트 산업단지 & 대토공"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (100만평 스마트산단·디지털 토공·지하공동구 토목 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Mass-Haul Earthwork Balancer',
        'Industrial Land Cost Estimator',
        'Smart Machine Guidance Showcase',
      ]}
      inquiryUrl="/inquiry?from=sejong-terra"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '3D 절·성토 토공 밸런스 4단계 사이클 뷰어, 부지 면적(만평)별 개략 조성비 시뮬레이터' },
        { label: '특화 토목 공법', value: 'GNSS 스마트 머신가이던스(오차 ±20mm), 4련 지하 공동구 프리캐스트 조립, PBD 압밀 탈수' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 산업단지 개발 기본계획 검토 및 턴키 견적 의뢰 모달' },
      ]}
    />
  );
}
