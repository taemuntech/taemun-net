"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import SodamjaeApp from "@/components/demos/sodamjae/SodamjaeApp";

interface Props {
  isEmbed: boolean;
}

export default function SodamjaePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <SodamjaeApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/sodamjae?embed=true"
      title="소담재 건축공방 (SODAMJAE)"
      category="건축 · 프리미엄 전통한옥 / 중목구조 주거"
      client="국가유산수리공사업 등록 도편수 직영 목수단"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "Project Detail Modal",
        "Hanok Quote Wizard",
      ]}
      inquiryUrl="/inquiry?from=sodamjae"
      specs={[
        { label: "반응형 규격", value: "PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격" },
        { label: "공법 인터랙션", value: "사개맞춤 무금속 결구, 패시브 단열, 5단계 시공 로드맵" },
        { label: "아카이브 사양", value: "단독 살림집·별서 세컨하우스·도심형 한옥 상세 스펙 모달" },
        { label: "대지 분석 접수", value: "위성 지형 분석 및 지자체 한옥 보조금(최대 1억) 신청 지원 연동" },
      ]}
    />
  );
}
