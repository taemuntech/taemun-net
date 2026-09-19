import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, FileText, Users, FileCheck, Code2, CheckCircle } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      step: "01",
      title: "문의",
      desc: "레퍼런스를 고르고 질문 3개에 답합니다. 로그인 없음",
      icon: <FileText className="w-4 h-4 text-zinc-700" />,
    },
    {
      step: "02",
      title: "총괄 아키텍트 상담",
      desc: "전화나 미팅으로 요건을 정합니다",
      icon: <Users className="w-4 h-4 text-zinc-700" />,
    },
    {
      step: "03",
      title: "T-DOCS 견적서 · 전자계약",
      desc: "견적서를 받아 보고, 계약은 휴대폰으로 서명합니다",
      icon: <FileCheck className="w-4 h-4 text-zinc-700" />,
    },
    {
      step: "04",
      title: "제작",
      desc: "단계마다 확인을 요청드립니다",
      icon: <Code2 className="w-4 h-4 text-zinc-700" />,
    },
    {
      step: "05",
      title: "검수 · 오픈",
      desc: "검수가 끝나면 사이트를 엽니다",
      icon: <CheckCircle className="w-4 h-4 text-zinc-700" />,
    },
  ];

  return (
    <section id="process-flow" className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-zinc-200">
      {/* 상단 라벨 및 타이틀 */}
      <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400 block mb-2 font-mono">
          HOW IT WORKS
        </span>
        <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 tracking-tight [word-break:keep-all]">
          문의부터 오픈까지 <span className="font-serif italic text-zinc-800 font-normal">5단계 진행 방식</span>
        </h2>
        <p className="text-zinc-500 text-xs lg:text-sm mt-2 font-light [word-break:keep-all]">
          고객의 마음을 움직이는 실물 레퍼런스를 바탕으로, 전자계약과 단계별 검수를 거쳐 사이트를 완성합니다.
        </p>
      </div>

      {/* 5단계 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5 lg:gap-4 mb-10 lg:mb-12">
        {steps.map((item) => (
          <div
            key={item.step}
            className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-zinc-400">STEP {item.step}</span>
                <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="font-bold text-sm text-zinc-950 mb-1.5 [word-break:keep-all]">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed [word-break:keep-all]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 직통 전화 및 견적 요청 안내 바 */}
      <div className="bg-zinc-950 text-white rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-5 shadow-lg">
        <div className="space-y-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-mono font-semibold">
            <span>DIRECT INQUIRY</span>
          </div>
          <h3 className="text-base lg:text-lg font-medium text-white [word-break:keep-all]">
            궁금하신 점이 있으시면 언제든 편하게 문의해 주세요.
          </h3>
          <p className="text-xs text-zinc-400 [word-break:keep-all]">
            총괄 아키텍트가 직접 프로젝트 요건과 일정에 대해 상담해 드립니다.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto shrink-0">
          <a
            href="tel:010-8672-6463"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs lg:text-sm transition-all flex items-center justify-center gap-2.5"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>총괄 아키텍트 직통 010-8672-6463</span>
          </a>

          <Link
            href="/inquiry"
            className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs lg:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>견적 요청하기</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
