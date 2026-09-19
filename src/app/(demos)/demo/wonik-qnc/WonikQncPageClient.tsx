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
      category="반도체 쿼츠웨어 · 정밀 세라믹 · 첨단 세정"
      client="원익큐앤씨 (제안 시안 · 의뢰받지 않음)"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
      ]}
      inquiryUrl="/inquiry?from=wonik-qnc"
      specs={[
        { label: "제품 소개 영역", value: "웨이퍼 공정용 쿼츠웨어 제품 소개 화면 (예시 내용)" },
        { label: "4대 사업부 쇼케이스", value: "쿼츠(Quartz), 세라믹(Ceramics), 정밀 세정·코팅(Cleaning), 옵틱(Optics)" },
        { label: "주가·IR 화면 구성", value: "예시 시세·공시·배당·실적 화면 (실제 주가와 연동하지 않음)" },
        { label: "비즈니스 문의 화면", value: "협력 제안·공장 견학 예약·브로슈어 열람 화면 (시안 — 접수되지 않음)" },
      ]}
    />
  );
}
