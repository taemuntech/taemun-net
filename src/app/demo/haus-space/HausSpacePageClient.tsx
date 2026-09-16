"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import HausSpaceApp from "@/components/demos/haus-space/HausSpaceApp";

interface Props {
  isEmbed: boolean;
}

export default function HausSpacePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <HausSpaceApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/haus-space?embed=true"
      title="HAUS & SPACE (하우스 앤 스페이스)"
      category="인테리어 · 최고급 펜트하우스 주거 아카이브"
      client="한남 더 힐 펜트하우스 프라이빗 아틀리에"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "Before & After Slider",
        "360 VR Spatial Tour",
        "Architectural Dossier",
      ]}
      inquiryUrl="/inquiry?from=haus-space"
      specs={[
        { label: "반응형 규격", value: "PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격" },
        { label: "시공 비교 인터랙션", value: "3D 렌더링 대비 완공 8K 실물 비교 슬라이더 & 핀 마킹" },
        { label: "가상 공간 투어", value: "마스터 베드룸 & 테라스 360 파노라마 실감형 시뮬레이션" },
        { label: "자재 디지털 아카이브", value: "이탈리아 나보나 트래버틴, 북미산 월넛, Flos 조명 스펙" },
      ]}
    />
  );
}
