'use client';

import DevicePreviewFrame from '@/components/demos/DevicePreviewFrame';
import CheongdamArteDentalApp from "@/components/demos/cheongdam-arte-dental/CheongdamArteDentalApp";

// 모든 데모는 태문 툴바(DevicePreviewFrame)로 감싼다 — 규격서 PORTFOLIO_FACTORY.md §0-10.
// ?embed=true 로 열린 안쪽 문서에서만 화면을 그대로 그린다(툴바의 iframe 이 여는 주소).
interface Props {
  isEmbed?: boolean;
}

export default function CheongdamArteDentalPageClient({ isEmbed = false }: Props) {
  if (isEmbed) {
    return <CheongdamArteDentalApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/cheongdam-arte-dental?embed=true"
      title={"청담 아르떼 치과"}
      category={"병의원 · 3D 디지털 네비게이션 임플란트 & 심미치과 클리닉"}
      client={"가상 브랜드 샘플 — 실제 업체가 아닙니다 (3D 디지털 네비게이션 임플란트 & 심미치과 클리닉 설정)"}
      techStack={["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"]}
      inquiryUrl="/inquiry?from=cheongdam-arte-dental"
      specs={[{"label": "기능 01", "value": "3D CT 및 구강스캐너 컴퓨터 모의수술 네비게이션 임플란트 가이드 프로세스 쇼케이스"}, {"label": "기능 02", "value": "치료 전후 예시 이미지 비교 슬라이더 + 개인차·부작용 고지를 같은 화면에 붙인 의료광고 대응 구성"}, {"label": "기능 03", "value": "진료과목·전담의·일시 및 치과공포증 민감도를 사전 체크하는 온라인 예약 문진 화면"}, {"label": "기능 04", "value": "체온 일치 주입 4단계 컴퓨터 제어 마취기 및 HEPA 필터 양압 수술실 안내"}]}
    />
  );
}
