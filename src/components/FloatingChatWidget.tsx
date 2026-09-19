"use client";

import {
  MessageSquare,
  Phone,
  Send,
  X,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // 열려 있을 때만 Esc 로 닫는다 — 트리거 버튼의 「ESC」 표시가 실제로 동작하게
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <aside
      aria-label="상담 문의 위젯"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans"
    >
      {/* Expanded Modal Box (High-Tech Obsidian HUD) */}
      {isOpen && (
        <div className="mb-3.5 w-[330px] lg:w-[360px] bg-zinc-950/95 border border-zinc-800/90 backdrop-blur-2xl rounded-2xl p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-4 duration-200 text-left">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-800/80 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-100 font-mono font-bold text-xs shadow-inner">
                TM
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-white tracking-tight leading-none">
                    태문넷
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 font-normal mt-1 font-mono">
                  총괄 아키텍트 직통 상담
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="상담창 닫기"
              className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Channels Grid */}
          <div className="space-y-2.5">
            {/* KakaoTalk Direct Chat */}
            <a
              href="https://pf.kakao.com/_PfmBX/chat"
              target="_blank"
              rel="noreferrer"
              className="w-full p-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800/90 hover:border-amber-400/40 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FEE500] text-[#191919] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  톡
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white flex items-center gap-1.5">
                    <span>카카오톡 채널로 문의</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    남겨 주시면 확인 후 답변드립니다
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:010-8672-6463"
              className="w-full p-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-800/90 hover:border-blue-400/40 flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white flex items-center gap-1.5">
                    <span>총괄 아키텍트 직통 통화</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    010-8672-6463
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Web Interactive Quote Wizard Link */}
            <Link
              href="/inquiry"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-[11px] flex items-center justify-center gap-2 transition-all text-center"
            >
              <Send className="w-3 h-3 text-zinc-400" />
              <span>견적 요청서 작성 →</span>
            </Link>
          </div>

          {/* Footer Security Badge */}
          <div className="mt-4 pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-zinc-400" />
              <span>NDA 비밀유지 준수</span>
            </span>
          </div>
        </div>
      )}

      {/* Modern High-Tech Precision Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-200 cursor-pointer shadow-xl ${
          isOpen
            ? "bg-white text-zinc-950 border-white ring-2 ring-white/20"
            : "bg-zinc-950/95 hover:bg-black text-white border-zinc-800 hover:border-zinc-600 ring-1 ring-white/10 hover:ring-white/20 shadow-black/60"
        }`}
      >
        {/* Technical Icon & Text */}
        <MessageSquare
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-90 text-zinc-950" : "text-zinc-300 group-hover:text-white"
          }`}
        />
        <span className="text-xs font-semibold tracking-tight">
          {isOpen ? "상담창 닫기" : "상담 문의"}
        </span>

        {/* 열렸을 때만 Esc 로 닫힌다는 표시(위 keydown 리스너가 실제로 닫는다) */}
        {isOpen && (
          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded tracking-wider uppercase font-semibold transition-colors bg-zinc-900 text-zinc-100">
            ESC
          </span>
        )}
      </button>
    </aside>
  );
}
