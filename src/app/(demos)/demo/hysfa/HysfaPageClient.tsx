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
      ]}
      inquiryUrl="/inquiry?from=hysfa"
      specs={[
        { label: "삼성전자 세메스 협력사 인증", value: "SEMES SSQ 품질인증 및 27년(1999~) 연혁·R&D 특허 기술 아카이브" },
        { label: "3대 핵심 사업부 쇼케이스", value: "장비사업부(FA & Semiconductor Equipment), 배관사업부(UHP Gas), 정밀 제어 S/W" },
        { label: "5단계 전수 검사 파이프라인", value: "원자재 수입검사, 오비탈 자동용접, 헬륨 리크, 72시간 무중단 신뢰성 시운전, 클린룸 출하" },
        { label: "엔지니어링 견적 & 다국어", value: "견적 접수 위저드 실시간 채번 및 글로벌 바이어 대응 국/영문 원클릭 전환" },
      ]}
    />
  );
}
