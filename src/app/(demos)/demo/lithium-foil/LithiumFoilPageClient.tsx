"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import DemoApp from "@/components/demo/lithium-foil/DemoApp";

interface Props {
  isEmbed: boolean;
}

export default function LithiumFoilPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <DemoApp />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/lithium-foil?embed=true"
      title="리튬박 공정 데이터 모니터링 플랫폼"
      category="제조 · 2차전지 소재 · 스마트팩토리"
      client="2차전지 배터리 소재 제조사 특화 레퍼런스 데모"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "Statistical Process Control",
        "Lot Traceability",
      ]}
      inquiryUrl="/inquiry?from=lithium-foil"
      specs={[
        { label: "실시간 SPC 관리도", value: "7대 미량 불순물(Fe, Cu 등) 관리한계선 자동 판정" },
        { label: "수율 워터폴 분석", value: "12주 시뮬레이션 데이터 기반 공정 손실 분석" },
        { label: "로트(Lot) 계보 추적", value: "잉곳 용해 ➔ 압출 ➔ 압연 ➔ 슬리팅 4단계 역추적" },
        { label: "현장 일지 동기화", value: "슬리팅 롤 일지 입력 즉시 전역 통계 실시간 갱신" },
      ]}
    />
  );
}
