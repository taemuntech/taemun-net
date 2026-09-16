"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import AtelierVaucluseApp from "@/components/demos/atelier-vaucluse/AtelierVaucluseApp";

interface Props {
  isEmbed: boolean;
}

export default function AtelierVauclusePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AtelierVaucluseApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/atelier-vaucluse?embed=true"
      title="아뜰리에 보클루즈 (ATELIER VAUCLUSE)"
      category="건축 · 하이엔드 인테리어 스튜디오"
      client="건축·인테리어 업종 특화 레퍼런스 데모"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "Responsive Modal",
        "Booking Wizard",
      ]}
      inquiryUrl="/inquiry?from=atelier-vaucluse"
      specs={[
        { label: "반응형 규격", value: "PC(5열/와이드) · 태블릿 · 모바일 단일 lg: 규격" },
        { label: "인터랙션", value: "프로젝트 갤러리 필터, 자재 아카이브, 1:1 예약 위저드" },
        { label: "디자인 톤앤매너", value: "프렌치 모더니즘 샌드 오트밀 & 천연 트래버틴 웜톤" },
        { label: "렌더링 성능", value: "Turbopack 100% 정적 프리렌더링 (LCP < 0.9s)" },
      ]}
    />
  );
}
