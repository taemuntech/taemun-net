"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import HausSpaceApp from "@/components/demos/haus-space/HausSpaceApp";

interface Props {
  isEmbed: boolean;
}

export default function HausSpacePageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <HausSpaceApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/haus-space?embed=true"
      title="HAUS & SPACE (하우스 앤 스페이스)"
      category="인테리어 · 하이엔드 펜트하우스 주거 아카이브"
      client="가상 브랜드 샘플 — 실존 고객사 아님"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
      ]}
      inquiryUrl="/inquiry?from=haus-space"
      specs={[
        { label: "반응형 규격", value: "PC(와이드) · 태블릿 · 모바일 단일 lg: 브레이크포인트 규격" },
        { label: "시공 비교 인터랙션", value: "3D 렌더링 대비 완공 실물 비교 슬라이더 & 자재 핀 마킹" },
        { label: "와이드 장면 뷰어", value: "리빙 파빌리온 · 중정 · 착공 전 골조 — 좌우로 끌어 보는 한 장면 뷰어" },
        // 태문넷 자신의 스펙 표라, 실존 조명 브랜드 이름을 적으면 취급·제휴로 읽힌다 — 자재 계열만 남긴다.
        { label: "자재 디지털 아카이브", value: "나보나 트래버틴, 북미산 월넛, 고연색 매립 조명 스펙" },
      ]}
    />
  );
}
