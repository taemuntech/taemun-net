"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import HysfaApp from "@/components/demos/hysfa/HysfaApp";

interface Props {
  isEmbed: boolean;
}

export default function HysfaPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <HysfaApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/hysfa?embed=true"
      title="한양시스템㈜ (HANYANG SYSTEM)"
      category="반도체 장비 · 특수가스 공급 설비 · 4K SCADA 관제"
      client="세메스(SEMES㈜) SSQ 품질인증 공식 협력사"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "4K SCADA Live Simulator",
        "Interlock Telemetry",
        "Bilingual (KO/EN)",
      ]}
      inquiryUrl="/inquiry?from=hysfa"
      specs={[
        { label: "실시간 4K SCADA 시뮬레이터", value: "PGMS/GDMS/LSS 밸브 제어 및 0.05초 인터록 셧다운 시연" },
        { label: "삼성전자 세메스 협력사 인증", value: "SEMES SSQ 공식 인증 및 27년(1999~) 연혁 인터랙티브 타임라인" },
        { label: "3대 핵심 사업부 쇼케이스", value: "매엽식 세정(Single Wafer Wet Clean), 특수가스 캐비닛, VMB 정밀 분배" },
        { label: "글로벌 수주 다국어", value: "해외 반도체 팹 및 바이어 대응 국문/영문(KO/EN) 원클릭 전환" },
      ]}
    />
  );
}
