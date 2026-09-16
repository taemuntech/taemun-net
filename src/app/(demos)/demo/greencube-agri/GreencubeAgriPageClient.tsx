'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import GreencubeAgriApp from '@/components/demos/greencube-agri/GreencubeAgriApp';

interface Props {
  isEmbed: boolean;
}

export default function GreencubeAgriPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <GreencubeAgriApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/greencube-agri?embed=true"
      title="GREENCUBE AGRI-TECH (그린큐브 버티컬 팜)"
      category="기업랜딩 · AI 밀폐형 수직 스마트팜 & 바이오 소재"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (친환경 수직 스마트팜·바이오 소재 기업 설정)"
      techStack={[
        'Next.js 16',
        'React 19',
        'Tailwind CSS v4',
        'TypeScript',
        'Spectral AI Growth Matrix',
        'Harvest Yield Calculator',
        '4-Hour Cold Chain Telemetry',
        'B2B Turnkey Portal',
      ]}
      inquiryUrl="/inquiry?from=greencube-agri"
      specs={[
        { label: '반응형 규격', value: 'PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격' },
        { label: '수확량 & 절감 계산기', value: '재배 면적(1,000~10,000평) 및 품종별 연간 생산량(톤)·용수 절감·탄소 감축 ROI (예시 수치)' },
        { label: 'AI 분광 생육 매트릭스', value: 'Blue(450nm) 엽록소 강화 vs Red(660nm) 개화 촉진 분광 LED 파장 실시간 튜너' },
        { label: 'Class 1000 클린룸 관제', value: '온습도, CO2 농도, 청정 공조 모니터링 및 B2B 정기 계약 위저드' },
      ]}
    />
  );
}
