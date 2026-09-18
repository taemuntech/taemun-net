'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import { LumenBuildApp } from '@/components/demos/lumen-build/LumenBuildApp';

interface Props {
  isEmbed: boolean;
}

export default function LumenBuildPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <LumenBuildApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/lumen-build?embed=true"
      title="루멘 빌드 (LUMEN BUILD)"
      category="건축 · 꼬마빌딩 & 상업 근린생활시설"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (상업 꼬마빌딩 전문 건축·시공 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
      ]}
      inquiryUrl="/inquiry?from=lumen-build"
      specs={[
        { label: '반응형 규격', value: '모바일 퍼스트 단일 lg: 브레이크포인트 규격 준수' },
        { label: '핵심 인터랙션', value: '성수 팝업 등 4대 완공 꼬마빌딩 갤러리, 대지 조건별 임대수익률 간이 계산기' },
        { label: '상업 건축 전략', value: '일조사선 테라스화, 1층 층고 5m 개방 파사드 및 전용률 73% 극대화 설계' },
        { label: '고객 전환 장치', value: 'SampleNotice 연동 꼬마빌딩 신축 무료 사업성 검토 신청 모달' },
      ]}
    />
  );
}
