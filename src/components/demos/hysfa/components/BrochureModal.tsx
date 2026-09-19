"use client";

import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle2, Shield } from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'KR' | 'EN';
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose, currentLang }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const brochures = [
    {
      id: 'fa-catalog',
      title: currentLang === 'KR' ? '반도체 FA 설비 종합 카탈로그 (2025-2026)' : 'Semiconductor FA Equipment Catalog',
      desc: currentLang === 'KR' ? '웨이퍼 반송 로봇, 클린룸 물류 설비 상세 사양 및 치수도' : 'Wafer robotics, cleanroom logistics specs & dimensional drawings',
      size: '14.8 MB',
      updated: '2025.01',
    },
    {
      id: 'gas-brochure',
      title: currentLang === 'KR' ? 'UHP 가스 공급 캐비닛 & VMB 기술 자료집' : 'UHP Gas Cabinet & VMB Engineering Guide',
      desc: currentLang === 'KR' ? '가스 캐비닛, 밸브 매니폴드 박스 방폭 인증 및 P&ID' : 'Explosion-proof certification, flow diagrams & P&ID schemes',
      size: '9.2 MB',
      updated: '2025.02',
    },
    {
      id: 'sw-intro',
      title: currentLang === 'KR' ? '스마트 제어 S/W 및 SECS-GEM 연동 소개서' : 'Smart Automation S/W & SECS-GEM Protocol Spec',
      desc: currentLang === 'KR' ? 'PLC 통합 SCADA 아키텍처 및 MES 양방향 프로토콜 인터페이스' : 'SCADA control engine and MES bidirectional communication stack',
      size: '6.5 MB',
      updated: '2024.11',
    },
    {
      id: 'corp-overview',
      title: currentLang === 'KR' ? '한양시스템㈜ 회사소개서 (국/영문 종합본)' : 'HANYANGSYSTEM Corporate Profile (KR/EN)',
      desc: currentLang === 'KR' ? '기업 연혁, R&D 역량, 국내외 주요 고객사 레퍼런스, 품질 인증' : 'Corporate history, R&D milestones, fab clients & certifications',
      size: '21.4 MB',
      updated: '2025.03',
    },
  ];

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedId(id);
      setTimeout(() => setDownloadedId(null), 3000);

      // Create a mock download blob trigger
      const element = document.createElement('a');
      const file = new Blob([`HANYANGSYSTEM Document: ${title}\nDownloaded from official portal.`], {
        type: 'text/plain',
      });
      element.href = URL.createObjectURL(file);
      element.download = `${title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#c3c6d6]/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#faf8ff] border-b border-[#c3c6d6]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#003d9b]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#131b2e]">
                {currentLang === 'KR' ? '솔루션 기술 브로슈어 다운로드' : 'Download Technical Brochures'}
              </h3>
              <p className="text-[12px] text-[#434654]">
                {currentLang === 'KR'
                  ? '제품 카탈로그와 기술 사양서를 내려받는 화면 예시입니다.'
                  : 'Sample screen for downloading equipment catalogs and specification sheets.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#737685] hover:text-[#131b2e] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {brochures.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#faf8ff] border border-[#c3c6d6]/40 hover:border-[#0052cc] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-[15px] font-bold text-[#131b2e]">{item.title}</h4>
                <p className="text-[13px] text-[#434654]">{item.desc}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#737685]">
                  <span>{item.size}</span>
                  <span>•</span>
                  <span>Ver. {item.updated}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(item.id, item.title)}
                disabled={downloadingId === item.id}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded-lg text-[13px] font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {downloadingId === item.id ? (
                  <span className="animate-spin text-white">⟳</span>
                ) : downloadedId === item.id ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>{currentLang === 'KR' ? '완료' : 'Done'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{currentLang === 'KR' ? '다운로드' : 'Download'}</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#c3c6d6]/30 flex items-center justify-between text-[12px] text-[#434654]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#003d9b]" />
            <span>{currentLang === 'KR' ? '기밀 보안 파일은 NDA 체결 후 전송됩니다.' : 'Proprietary designs delivered under NDA.'}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded text-[#131b2e] hover:bg-slate-200 font-medium transition-colors cursor-pointer"
          >
            {currentLang === 'KR' ? '닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
