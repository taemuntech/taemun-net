'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import NordicPeakApp from '@/components/demos/nordic-peak/NordicPeakApp';

interface Props {
  isEmbed: boolean;
}

export default function NordicPeakPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <NordicPeakApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/nordic-peak?embed=true"
      title="NORDIC PEAK (노르딕 피크)"
      category="이커머스 · 아웃도어 & 테크니컬 캠핑 기어"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (북유럽 극지 익스페디션 장비 브랜드 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        '4-Tier Tactical HUD Filter Matrix',
        'Interactive Tent Dimension Simulator',
        'Weather Telemetry & Gust Warning Radar',
        'Side-by-Side Gear Spec Comparison Engine',
      ]}
      inquiryUrl="/inquiry?from=nordic-peak&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '단일 lg: 브레이크포인트 모바일 퍼스트 4열 그리드' },
        { label: '택티컬 어트리뷰트 HUD', value: '계절·수용정원·폴대소재(DAC)·데니어(70D) 다차원 원클릭 필터링' },
        { label: '텐트 피칭 블루프린트', value: '1~6인 풋프린트/이너텐트 레이아웃 시각화 및 내수압·돌풍 저항도 시뮬레이션' },
        { label: '동계 긴급 직배송 신청', value: '강원·경기 동계 캠핑장 당일 퀵서비스 & 군용 방수팩 패킹 배송 연동' },
      ]}
    />
  );
}
