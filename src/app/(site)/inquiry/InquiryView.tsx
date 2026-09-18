"use client";

// 프로젝트 견적 문의 화면 — 서버 래퍼는 page.tsx(주소를 읽어 레퍼런스 한 건을 넘긴다 — src/lib/inquiry/context.ts),
// 위저드 본체는 src/components/inquiry/InquiryWizard.tsx.
// 샘플·포트폴리오에서 넘어온 경우(/inquiry?from=<slug>) 레퍼런스를 위저드 머리에 고정하고 서비스를 미리 고른다.
// 어느 샘플을 보고 왔는지는 방문자가 고칠 수 있는 칸이 아니라 요청 본문의 referral 로 따로 보낸다
// (API 가 다시 검증해 저장·문자에 넣는다 — 샘플별 전환을 셀 수 있게). 백엔드는 src/app/api/inquiry.
//
// 2026-09-19 위저드 개편(구현계획서 P3): 4단계 입력을 한 컴포넌트로 모으고, 옆에 견적요청서가 채워진다.
// 위저드가 옆 요청서와 2열을 쓰도록 화면 전체 폭을 주고, 「일하는 방식」 카드는 그 아래로 내렸다.
//
// 약속 문구 원칙: 연락 시각(「1시간 이내」「24시간」)·지체상금·무상 A/S 기간처럼 계약서에 없는 조건을 쓰지 않는다.
// 형이 조건을 확정하면 화면·홈(진행 방식 섹션 포함)·상담 위젯을 같은 문구로 맞춘다.
// (고객 자동 접수 문자는 2026-09-18 없앴다 — 방문자가 적은 아무 번호로나 문자가 나가는 통로였다. api/inquiry 머리말)

import ParticleCanvas from "@/components/ParticleCanvas";
import { ArrowLeft, Clock, Code, PhoneCall, ShieldCheck, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { InquiryWizard } from "@/components/inquiry/InquiryWizard";
import type { WizardReference } from "@/components/inquiry/types";
import type { InquiryEntry } from "@/lib/inquiry/validate";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";
import type { IndustryKey } from "@/lib/portfolio/schema";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    tone: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    title: "범위와 일정을 먼저 문서로 합의",
    body: "만들 기능·일정·납품물을 계약 전에 문서로 정리하고, 그 기준으로 진행합니다",
  },
  {
    icon: Code,
    tone: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    title: "소스코드·데이터 이전",
    body: "납품할 때 소스코드와 데이터베이스를 넘겨 드립니다. 이전 범위는 계약서에 적습니다",
  },
  {
    icon: Clock,
    tone: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    title: "개발 중 확인용 주소 공유",
    body: "만들고 있는 화면을 테스트 주소로 공유해 중간중간 직접 눌러 보실 수 있습니다",
  },
  {
    icon: ThumbsUp,
    tone: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    title: "오픈 후 수정 지원",
    body: "오픈 뒤 발견된 오류의 무상 수정 기간과 범위는 계약서에 명시합니다",
  },
] as const;

export default function InquiryView({
  reference = null,
  entry = "inquiry_page",
  industryLead = null,
}: {
  reference?: WizardReference | null;
  entry?: InquiryEntry;
  industryLead?: IndustryKey | null;
}) {
  return (
    // overflow-x-clip(hidden 아님) — hidden 은 이 상자를 스크롤 상자로 만들어 위저드 아래 이동 막대의 sticky 가 풀린다
    <div className="relative min-h-screen bg-[#030712] text-gray-100 overflow-x-clip selection:bg-indigo-500 selection:text-white [word-break:keep-all]">
      <ParticleCanvas />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/images/logo/icon-192-transparent.png"
                alt="태문 로고"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white">
              태문넷 <span className="text-indigo-400 text-xs lg:text-sm font-semibold ml-1">DEV STUDIO</span>
            </span>
          </Link>
          <Link
            href="/"
            className="px-3.5 lg:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-all flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
      </header>

      <main className="pt-28 lg:pt-32 pb-20 lg:pb-24 px-4 lg:px-6 max-w-6xl mx-auto relative z-10 space-y-10 lg:space-y-14">
        <div className="space-y-2">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">프로젝트 견적 요청</h1>
          <p className="text-xs lg:text-sm text-gray-400">
            질문 3개에 답하고 연락처를 남기시면 총괄 아키텍트가 연락드립니다. 로그인은 필요 없습니다.
          </p>
        </div>

        <InquiryWizard reference={reference} entry={entry} industryLead={industryLead} />

        {/* 일하는 방식 — 계약서에 적을 수 있는 사실만(「보장」「0%」「24시간」 같은 단정 대신 계약서로 정하는 항목) */}
        <section aria-labelledby="inquiry-principles" className="space-y-4">
          <h2 id="inquiry-principles" className="text-lg lg:text-xl font-extrabold text-white">
            태문넷은 이렇게 일합니다
          </h2>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, tone, title, body }) => (
              <div key={title} className="p-4 lg:p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-3.5">
                <div className={`w-9 lg:w-10 h-9 lg:h-10 rounded-xl border flex items-center justify-center shrink-0 ${tone}`}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xs lg:text-sm font-bold text-white mb-0.5">{title}</h3>
                  <p className="text-[11px] lg:text-xs text-gray-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6 p-4 lg:p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 text-xs">
            <span className="flex items-center gap-2 font-bold text-indigo-300">
              <PhoneCall className="w-4 h-4" aria-hidden="true" />
              전화로 상담하셔도 됩니다
            </span>
            <a href={`tel:${STUDIO_PHONE}`} className="text-sm font-bold text-white hover:underline">
              총괄 아키텍트 직통 {STUDIO_PHONE}
            </a>
            <span className="text-gray-400">이메일: contact@taemun.co.kr</span>
          </div>
        </section>
      </main>
    </div>
  );
}
