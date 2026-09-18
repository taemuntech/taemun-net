'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import SeoulBarunOrthopedicsApp from "@/components/demos/seoul-barun-orthopedics/SeoulBarunOrthopedicsApp";

// 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 — 규격서 PORTFOLIO_FACTORY.md §0-10.
// ?embed=true 로 열린 안쪽 문서에서만 화면을 그대로 그린다(툴바의 iframe 이 여는 주소).
interface Props {
  isEmbed?: boolean;
}

export default function SeoulBarunOrthopedicsPageClient({ isEmbed = false }: Props) {
  if (isEmbed) {
    return <SeoulBarunOrthopedicsApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/seoul-barun-orthopedics?embed=true"
      title={"서울 바른마디 정형외과"}
      category={"병의원 · 비수술 척추·관절 & 100평 도수재활센터"}
      client={"가상 브랜드 샘플 — 실제 업체가 아닙니다 (비수술 척추·관절 & 100평 도수재활센터 설정)"}
      techStack={["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Pain Symptom Checker", "MRI Fast-Track Booking"]}
      inquiryUrl="/inquiry?from=seoul-barun-orthopedics"
      specs={[{"label": "기능 01", "value": "목·허리·무릎·발목 4대 부위별 5문항 대화형 통증 자가체크 및 진료 안내 매핑 (참고용, 진단 아님)"}, {"label": "기능 02", "value": "1.5T MRI 당일 원스톱 촬영·판독 패스트트랙 예약 화면 (시뮬레이션)"}, {"label": "기능 03", "value": "슬링 시스템·3D 척추감압기·체외충격파(ESWT) 비수술 치료 장비 쇼케이스 (예시 구성)"}, {"label": "기능 04", "value": "물리치료사 1:1 전담 도수운동치료 및 체형 교정 재활 프로그램 안내"}]}
    />
  );
}
