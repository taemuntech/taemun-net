"use client";

import { MessageCircle, Phone, Send, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Modal Box */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] bg-gray-950/90 border border-indigo-500/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-indigo-500/20 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/20">
                TM
              </div>
              <div>
                <h4 className="text-base font-bold text-white leading-none">태문 DEV STUDIO</h4>
                <p className="text-xs text-indigo-400 font-medium mt-1">실시간 외주 견적 & 개발 상담</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* KakaoTalk Direct Chat */}
            <a
              href="https://pf.kakao.com/_PfmBX/chat"
              target="_blank"
              rel="noreferrer"
              className="w-full p-4 rounded-2xl bg-[#FEE500] hover:bg-[#FADA00] text-[#191919] font-bold text-sm flex items-center justify-between transition-all shadow-lg shadow-yellow-500/10 group"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 fill-current" />
                <div className="text-left">
                  <div className="text-sm font-extrabold">카카오톡 1:1 톡 상담</div>
                  <div className="text-[11px] text-[#191919]/70 font-medium">3초 실시간 채팅 문의</div>
                </div>
              </div>
              <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href="tel:1588-2622"
              className="w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm flex items-center justify-between transition-all group"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <div className="text-sm font-bold">대표전화 직통 상담</div>
                  <div className="text-[11px] text-gray-400">1588-2622 (24시간)</div>
                </div>
              </div>
              <span className="text-xs text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Web Quote Form Anchor */}
            <Link
              href="/inquiry"
              onClick={() => setIsOpen(false)}
              className="w-full p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-xs flex items-center justify-center gap-2 hover:bg-indigo-500/20 transition-all text-center"
            >
              <Send className="w-3.5 h-3.5" />
              <span>3초 대화형 스마트 견적 페이지로 이동</span>
            </Link>
          </div>

          <div className="mt-5 pt-3 border-t border-white/5 text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>총괄 개발자가 직접 1:1로 친절하게 상담해 드립니다.</span>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-extrabold text-sm shadow-2xl shadow-indigo-500/40 border border-white/20 flex items-center gap-3 transition-all hover:scale-105 group"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        </div>
        <span>실시간 1:1 상담 문의</span>
      </button>
    </div>
  );
}
