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
// 2026-09-19 밝은 톤 통일(형 피드백 — 아라 방향 A, 가온·아라 분담): 어두운 우주 배경(ParticleCanvas)과 옛 알록달록
// TM 아이콘 헤더 때문에 흰 홈에서 넘어오면 다른 사이트처럼 보였다. 바탕은 처리방침과 같은 zinc-50, 로고는 홈과 같은
// 모노그램(BrandMark), 카드는 흰 바탕·무채색 아이콘, 강조는 홈 버튼과 같은 zinc-950 한 가지.
// 위저드 본체는 원래 흰 카드라 손대지 않았다(홈 카드 모달 P4 도 같은 위저드를 그대로 쓴다).
// 헤더는 공용 Header 대신 **메뉴 없는 집중형**(로고 + 「메인으로」) — 입력 중에 다른 곳으로 새는 링크를 줄이고,
// 공용 Header 의 데모 드롭다운 때문에 이 화면이 공개 상태를 한 번 더 읽지 않아도 되게.
//
// 약속 문구 원칙: 연락 시각(「1시간 이내」「24시간」)·지체상금처럼 계약서에 없는 조건을 쓰지 않는다.
// 소스 이전·하자 무상 수정은 형이 09-19 에 승인한 홈 문장(b74afaf)과 같은 말로 쓴다.
// (고객 자동 접수 문자는 2026-09-18 없앴다 — 방문자가 적은 아무 번호로나 문자가 나가는 통로였다. api/inquiry 머리말)

import { ArrowLeft, Clock, Code, PhoneCall, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandMark";
import { InquiryWizard } from "@/components/inquiry/InquiryWizard";
import type { WizardReference } from "@/components/inquiry/types";
import type { InquiryEntry } from "@/lib/inquiry/validate";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";
import type { IndustryKey } from "@/lib/portfolio/schema";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "범위와 일정을 먼저 문서로 합의",
    body: "만들 기능·일정·납품물을 계약 전에 문서로 정리하고, 그 기준으로 진행합니다",
  },
  {
    icon: Code,
    title: "새로 만든 소스코드와 권리 이전",
    body: "잔금을 받으면 이번 프로젝트를 위해 새로 만든 소스코드와 권리를 넘겨 드립니다",
  },
  {
    icon: Clock,
    title: "개발 중 확인용 주소 공유",
    body: "만들고 있는 화면을 테스트 주소로 공유해 중간중간 직접 눌러 보실 수 있습니다",
  },
  {
    icon: Wrench,
    title: "오픈 후 1년 무상 수정",
    body: "오픈 후 1년 동안 계약서에 적은 기능의 결함은 무상으로 고쳐 드립니다",
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
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 overflow-x-clip selection:bg-zinc-900 selection:text-white [word-break:keep-all]">
      {/* 집중형 헤더 — 높이 h-20 을 바꾸면 main 의 pt-28 과 위저드의 scroll-mt-28(단계 이동 때 스크롤 위치)도 같이 바꿀 것 */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-3">
          <Link href="/" className="group min-w-0" aria-label="태문넷 홈으로">
            <BrandLockup tagline={null} />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 lg:px-4 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>메인으로</span>
          </Link>
        </div>
      </header>

      <main className="pt-28 lg:pt-32 pb-20 lg:pb-24 px-4 lg:px-6 max-w-6xl mx-auto relative space-y-10 lg:space-y-14">
        <div className="space-y-2">
          <span className="block text-[11px] uppercase tracking-[0.25em] font-semibold text-zinc-400 font-mono">Project Inquiry</span>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-950 leading-tight">프로젝트 견적 요청</h1>
          <p className="text-sm text-zinc-500">
            질문 3개에 답하고 연락처를 남기시면 총괄 아키텍트가 연락드립니다. 로그인은 필요 없습니다.
          </p>
        </div>

        <InquiryWizard reference={reference} entry={entry} industryLead={industryLead} />

        {/* 일하는 방식 — 계약서에 적을 수 있는 사실만(「보장」「0%」「24시간」 같은 단정 대신 계약서로 정하는 항목) */}
        <section aria-labelledby="inquiry-principles" className="space-y-4">
          <h2 id="inquiry-principles" className="text-lg lg:text-xl font-extrabold tracking-tight text-zinc-950">
            태문넷은 이렇게 일합니다
          </h2>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {PRINCIPLES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3.5 rounded-2xl border border-zinc-200 bg-white p-4 lg:p-5">
                <div className="flex h-9 w-9 lg:h-10 lg:w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-0.5 text-sm font-bold text-zinc-950">{title}</h3>
                  <p className="text-xs lg:text-[13px] leading-relaxed text-zinc-500">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded-2xl bg-zinc-950 p-4 text-xs text-white lg:flex-row lg:items-center lg:gap-6 lg:p-5">
            <span className="flex items-center gap-2 font-semibold text-zinc-400">
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              전화로 상담하셔도 됩니다
            </span>
            <a href={`tel:${STUDIO_PHONE}`} className="text-sm font-bold text-white underline-offset-4 hover:underline">
              총괄 아키텍트 직통 {STUDIO_PHONE}
            </a>
            <a href="mailto:contact@taemun.co.kr" className="text-zinc-400 underline-offset-4 hover:text-white hover:underline">
              이메일 contact@taemun.co.kr
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
