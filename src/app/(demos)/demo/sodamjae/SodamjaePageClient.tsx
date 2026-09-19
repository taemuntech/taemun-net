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
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (한옥 설계·시공 공방 설정)"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
      ]}
      inquiryUrl="/inquiry?from=sodamjae"
      specs={[
        { label: "반응형 규격", value: "PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격" },
        { label: "공법 인터랙션", value: "사개맞춤 무금속 결구, 패시브 단열, 5단계 시공 로드맵" },
        { label: "아카이브 사양", value: "단독 살림집·별서 세컨하우스·도심형 한옥 상세 스펙 모달" },
        { label: "대지 분석 접수", value: "대지 정보와 지자체 한옥 지원 제도 안내를 받는 상담 화면 (샘플 — 접수되지 않음)" },
      ]}
    />
  );
}
