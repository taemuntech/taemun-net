"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import AtelierVaucluseApp from "@/components/demos/atelier-vaucluse/AtelierVaucluseApp";

interface Props {
  isEmbed: boolean;
}

export default function AtelierVauclusePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <AtelierVaucluseApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/atelier-vaucluse?embed=true"
      title="아뜰리에 보클루즈 (ATELIER VAUCLUSE)"
      category="건축 · 하이엔드 인테리어 스튜디오"
      client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (건축·인테리어 스튜디오 설정)"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "Responsive Modal",
      ]}
      inquiryUrl="/inquiry?from=atelier-vaucluse"
      specs={[
        { label: "반응형 규격", value: "PC · 태블릿 · 모바일 — lg(1024px) 한 경계로 통일" },
        { label: "인터랙션", value: "프로젝트 분류 필터, 상세·자재·저널 모달, 1:1 상담 신청 폼" },
        { label: "디자인 톤앤매너", value: "프렌치 모더니즘 샌드 오트밀 & 천연 트래버틴 웜톤" },
        { label: "화면 구성", value: "히어로 · 철학 · 프로젝트 아카이브 · 4단계 프로세스 · 상담" },
      ]}
    />
  );
}
