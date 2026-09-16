"use client";

import React from 'react';
import { X, Download, FileText, CheckCircle2, Globe } from 'lucide-react';
import { LOGO_URL } from '../data';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleDownload = (filename: string) => {
    alert(`[${filename}] 브로슈어 다운로드가 시작되었습니다.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#283044] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="Wonik Logo"
              className="w-7 h-7 object-contain brightness-125"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-mono text-[10px] text-[#c6e7ff] tracking-wider uppercase block">
                OFFICIAL COMPANY BROCHURE
              </span>
              <h3 className="text-lg font-bold">원익큐앤씨 기업소개서 브로슈어</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-[#131b2e]">
          {/* Cover Preview Card */}
          <div className="bg-gradient-to-r from-[#283044] to-[#004866] p-6 rounded-xl text-white flex flex-col lg:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#c6e7ff] uppercase tracking-wider block mb-1">
                2025-2026 EDITION
              </span>
              <h4 className="text-xl font-bold leading-tight">
                원익큐앤씨 종합 기업소개서 &amp; 제품 카탈로그
              </h4>
              <p className="text-xs text-[#d2d9f4] mt-2 max-w-md">
                쿼츠웨어, 파인 세라믹, 정밀 세정·코팅, VUV 엑시머 광원 핵심 공정 기술 사양 및 글로벌 생산 인프라 수록
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleDownload('WONIK_QnC_Corporate_Brochure_2026_KR.pdf')}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-[#0052cc] hover:bg-[#0c56d0] text-white rounded-md text-xs font-bold shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              국문 PDF (24MB)
            </button>
          </div>

          {/* Languages Available */}
          <div className="space-y-3">
            <h5 className="font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#003d9b]" />
              글로벌 언어별 브로슈어 다운로드
            </h5>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="p-3.5 border border-gray-200 rounded-lg hover:border-[#0052cc] transition-colors flex items-center justify-between bg-gray-50">
                <div>
                  <span className="font-bold block text-xs">English Edition</span>
                  <span className="font-mono text-[10px] text-gray-500">PDF / 22.8 MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownload('WONIK_QnC_Brochure_EN.pdf')}
                  className="p-1.5 bg-white hover:bg-gray-100 text-[#0052cc] rounded border"
                  title="Download English"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 border border-gray-200 rounded-lg hover:border-[#0052cc] transition-colors flex items-center justify-between bg-gray-50">
                <div>
                  <span className="font-bold block text-xs">中文版 (Chinese)</span>
                  <span className="font-mono text-[10px] text-gray-500">PDF / 21.4 MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownload('WONIK_QnC_Brochure_CN.pdf')}
                  className="p-1.5 bg-white hover:bg-gray-100 text-[#0052cc] rounded border"
                  title="Download Chinese"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3.5 border border-gray-200 rounded-lg hover:border-[#0052cc] transition-colors flex items-center justify-between bg-gray-50">
                <div>
                  <span className="font-bold block text-xs">日本語版 (Japanese)</span>
                  <span className="font-mono text-[10px] text-gray-500">PDF / 23.1 MB</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownload('WONIK_QnC_Brochure_JP.pdf')}
                  className="p-1.5 bg-white hover:bg-gray-100 text-[#0052cc] rounded border"
                  title="Download Japanese"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Key Contents List */}
          <div className="bg-[#f2f3ff] p-4 rounded-lg border border-[#dae2fd] text-xs text-[#434654] space-y-2">
            <span className="font-bold text-[#003d9b] block font-mono text-[11px]">
              BROCHURE HIGHLIGHTS
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003d9b] shrink-0" />
                <span>40년 히스토리 및 연혁 (1984 ~ 현재)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003d9b] shrink-0" />
                <span>4대 핵심 사업 부문별 상세 제품 도면 및 규격</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003d9b] shrink-0" />
                <span>국내외 생산 거점 (구미·독일·오스틴·대만·시안)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#003d9b] shrink-0" />
                <span>품질 환경 인증 현황 (ISO 9001/14001/45001)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
