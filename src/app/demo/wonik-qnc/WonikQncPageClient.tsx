"use client";

import DevicePreviewFrame from "@/components/demos/DevicePreviewFrame";
import WonikQncApp from "@/components/demos/wonik-qnc/WonikQncApp";

interface Props {
  isEmbed: boolean;
}

export default function WonikQncPageClient({ isEmbed }: Props) {
  if (isEmbed) {
    return <WonikQncApp isEmbed={true} />;
  }

  return (
    <DevicePreviewFrame
      src="/demo/wonik-qnc?embed=true"
      title="원익큐앤씨 (WONIK QnC)"
      category="반도체 쿼츠웨어 · 정밀 세라믹 · 첨단 세정 · 글로벌 No.1"
      client="코스닥 상장사 (KOSDAQ: 074600) 공식 프로토타입"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
        "40th Anniversary Film",
        "Real-time KOSDAQ IR",
        "SRM Partner Portal",
        "Multilingual (KR/EN/CN/JP)",
      ]}
      inquiryUrl="/inquiry?from=wonik-qnc"
      specs={[
        { label: "글로벌 쿼츠웨어 점유율 1위", value: "300mm 웨이퍼 식각·확산 공정 핵심 쿼츠웨어 글로벌 No.1 공급사" },
        { label: "4대 핵심 사업부 쇼케이스", value: "쿼츠(Quartz), 세라믹(Ceramics), 정밀 세정·코팅(Cleaning), 옵틱(Optics)" },
        { label: "KOSDAQ 실시간 주가 & IR 허브", value: "실시간 주가 지표 연동 및 전자공시·배당·경영실적 리포트 제공" },
        { label: "글로벌 비즈니스 포털", value: "SRM 협력제안 접수, 공장 견학 예약, 다국어 브로슈어 및 4개국어(KR/EN/CN/JP) 지원" },
      ]}
    />
  );
}
