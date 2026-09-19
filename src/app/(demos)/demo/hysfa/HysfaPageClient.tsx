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
      client="한양시스템㈜ (제안 시안 · 의뢰받지 않음)"
      techStack={[
        "Next.js 16",
        "React 19",
        "Tailwind CSS v4",
        "TypeScript",
      ]}
      inquiryUrl="/inquiry?from=hysfa"
      specs={[
        { label: "인증·연혁 화면", value: "품질 인증 소개와 연혁 타임라인 (예시 내용)" },
        { label: "3대 사업부 쇼케이스", value: "장비사업부(FA & Semiconductor Equipment), 배관사업부(UHP Gas), 정밀 제어 S/W" },
        { label: "검사 공정 소개", value: "수입검사·용접·리크 시험·시운전·출하 단계 소개 화면 (예시 내용)" },
        { label: "견적 문의 & 다국어", value: "기술 견적 문의 화면 (시안 — 접수되지 않음)과 국문·영문 화면 전환" },
      ]}
    />
  );
}
