"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import MaisonApp from "@/components/demos/maison/MaisonApp";

interface Props {
  isEmbed: boolean;
}

export default function MaisonPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <MaisonApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/maison?embed=true"
      title="메종 당티크 (Maison d'Antique)"
      category="커머스 · 하이엔드 앤틱 살롱 / D2C 아카이브"
      client="1884 파리·런던 직영 앤틱 아카이브 살롱"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "Curator Dossier Modal",
        "Acquisition Folio Drawer",
      ]}
      inquiryUrl="/inquiry?from=maison-antique"
      specs={[
        { label: "반응형 규격", value: "PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격" },
        { label: "인터랙션", value: "실시간 아카이브 검색, 소장 서류함(CartFolio), 관심작 보관함" },
        { label: "살롱 예약 시스템", value: "한남동 프라이빗 살롱 1:1 관람 및 18세기 복원 컨설팅 예약" },
        { label: "디자인 톤앤매너", value: "프렌치 버건디(#300a10) & 앤틱 골드(#735b24) 헤리티지 럭셔리" },
      ]}
    />
  );
}
