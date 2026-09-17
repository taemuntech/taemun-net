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
        '4단계 속성 필터',
        '텐트 평면도 시뮬레이터',
        '필드 기상 관측 HUD (예시 데이터)',
        '기어 스펙 비교표',
      ]}
      inquiryUrl="/inquiry?from=nordic-peak&industry=commerce"
      specs={[
        { label: '반응형 규격', value: '단일 lg: 브레이크포인트 모바일 퍼스트 4열 그리드' },
        { label: '속성 필터 HUD', value: '계절·수용인원·폴대규격·데니어 4단계 조합 필터 (결과 수·초기화 포함)' },
        { label: '텐트 평면도 시뮬레이터', value: '야전침대 배치·화목난로 홀·모의 풍속에 따라 지표가 바뀌는 설계도' },
        { label: '직배송 신청서', value: '강원·경기 동계 캠핑장 직배송 신청 폼 (샘플 — 접수되지 않습니다)' },
      ]}
    />
  );
}
