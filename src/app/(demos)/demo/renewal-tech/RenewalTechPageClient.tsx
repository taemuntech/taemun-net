'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { RenewalTechApp } from '@/components/demos/renewal-tech/RenewalTechApp';

interface Props {
  isEmbed: boolean;
}

export default function RenewalTechPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <RenewalTechApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/renewal-tech?embed=true"
      title="리뉴얼 테크 (RENEWAL TECH)"
      category="건축 · 도심 노후 빌딩 대수선 & 밸류애드"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (도심 대형 빌딩 대수선·리모델링 엔지니어링 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=renewal-tech"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '마우스/터치 드래그형 실시간 비포&애프터 비교 슬라이더, 연면적별 신축 대비 대수선 ROI 비교기' },
        { label: '엔지니어링 특화', value: 'CFRP 탄소섬유 내진 보강, 삼중 로이 커튼월 외단열, 수직 2개층 경량 증축 기술' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 노후 빌딩 무료 자산 진단 및 수지분석 리포트 신청 모달' },
      ]}
    />
  );
}
