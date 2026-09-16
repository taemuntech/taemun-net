'use client';

import React, { useState } from 'react';
import { X, Download, Printer, Layers, Cpu, ShieldCheck } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { SimSettings } from '../types';
import { LAYERS, SAMPLE_INDUSTRY, SAMPLE_SLUG } from '../data/packagingData';

// 샘플이라 백서·설계안 파일을 실제로 내려주지 않는다 — 내려받기 버튼은
// 「다운로드 완료」 같은 가짜 알림 대신 공용 안내(SampleNotice)를 연다.

// 1. 3D Exploded Layer Structural Visualizer Modal
interface ExplodedViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplodedViewModal: React.FC<ExplodedViewModalProps> = ({ isOpen, onClose }) => {
  const [explosionGap, setExplosionGap] = useState<number>(40);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-[#c4c5d5]/50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#c4c5d5]/30 flex items-center justify-between bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00288e]" />
            <span className="font-bold text-[#0b1c30] text-base">
              3D 이종 패키징(2.5D/3D Heterogeneous) 4계층 입체 분해도
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-[#dce9ff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 bg-[#f8f9ff] p-4 rounded-xl border border-[#c4c5d5]/40">
            <div>
              <div className="text-xs font-bold text-[#00288e] uppercase font-mono">
                Interactive Layer Explosion Slider
              </div>
              <div className="text-sm text-[#444653] mt-0.5">
                슬라이더를 조절하여 레이어 분해 간격을 조정하고 각 계층의 나노 인터페이스를 확인하세요.
              </div>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <span className="text-xs font-mono text-[#757684]">밀착</span>
              <input
                type="range"
                min="10"
                max="80"
                value={explosionGap}
                onChange={(e) => setExplosionGap(parseInt(e.target.value, 10))}
                className="w-32 h-2 bg-[#c4c5d5]/60 rounded-lg cursor-pointer accent-[#00288e]"
              />
              <span className="text-xs font-mono text-[#757684]">확장 ({explosionGap}px)</span>
            </div>
          </div>

          {/* Interactive Stack Visualization Canvas */}
          <div className="bg-[#0b1c30] rounded-xl p-8 text-white relative min-h-[360px] flex flex-col items-center justify-center cleanroom-grid overflow-hidden">
            <div className="w-full max-w-xl flex flex-col items-center">
              {/* L1: Logic Die & HBM */}
              <div
                onMouseEnter={() => setHoveredLayer(1)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{ marginBottom: `${explosionGap}px` }}
                className={`w-full max-w-md bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-4 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ hoveredLayer === 1 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-blue-400/50' }`}
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L1: TOP LAYER</span>
                  <span className="text-blue-200">1,200W 초고발열 소산</span>
                </div>
                <div className="font-bold text-sm mt-1">
                  GPU/NPU Logic Die (3nm) &amp; 8× HBM4 16-Hi Stack
                </div>
              </div>

              {/* L2: Silicon Interposer */}
              <div
                onMouseEnter={() => setHoveredLayer(2)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{ marginBottom: `${explosionGap}px` }}
                className={`w-full max-w-lg bg-gradient-to-r from-cyan-800 via-teal-700 to-cyan-900 p-3.5 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ hoveredLayer === 2 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-cyan-400/40' }`}
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L2: INTERPOSER</span>
                  <span className="text-cyan-200">4.8 TB/s Ultra-High Bandwidth</span>
                </div>
                <div className="font-bold text-sm mt-1">
                  Sub-5µm Fine Pitch Silicon Interposer (TSV 10,000 vias/mm²)
                </div>
              </div>

              {/* L3: Hybrid Cu-Cu Bonding */}
              <div
                onMouseEnter={() => setHoveredLayer(3)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{ marginBottom: `${explosionGap}px` }}
                className={`w-full max-w-lg bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 p-3 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ hoveredLayer === 3 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-emerald-400/40' }`}
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L3: BONDING INTERFACE</span>
                  <span className="text-emerald-200">0.01Ω Direct Contact</span>
                </div>
                <div className="font-bold text-sm mt-1">
                  Micro-Bump &amp; Hybrid Cu-Cu Direct Bonding (Pitch &lt; 9µm)
                </div>
              </div>

              {/* L4: Glass Core Substrate */}
              <div
                onMouseEnter={() => setHoveredLayer(4)}
                onMouseLeave={() => setHoveredLayer(null)}
                className={`w-full max-w-xl bg-gradient-to-r from-slate-700 via-slate-800 to-blue-950 p-4 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ hoveredLayer === 4 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-slate-500/40' }`}
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L4: BASE SUBSTRATE</span>
                  <span className="text-slate-300">Zero-Warpage Glass Core</span>
                </div>
                <div className="font-bold text-sm mt-1">
                  Next-Gen 24-Layer Glass Core Substrate (120×120mm Form Factor)
                </div>
              </div>
            </div>
          </div>

          {/* Active Layer Details */}
          {hoveredLayer && (
            <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#c4c5d5]/60 text-xs text-[#444653]">
              <strong className="text-[#00288e]">{LAYERS[hoveredLayer - 1].title}</strong>:{' '}
              {LAYERS[hoveredLayer - 1].desc}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#c4c5d5]/30 bg-[#f8f9ff] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#00288e] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1e40af] transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. White Paper & Specs Modal
interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({ isOpen, onClose }) => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const papers = [
    {
      id: 1,
      title: '2.5D Sub-5µm Silicon Interposer Signal Integrity & Yield Report (v2.6)',
      size: '4.8 MB',
      date: '2026.08',
      desc: 'HBM4 인터페이스 4.8 TB/s 무손실 전송 특성 및 TSV 고밀도 어레이 수율 99.85% 검증 데이터.',
    },
    {
      id: 2,
      title: '120×120mm Large-Panel Glass Core Substrate Warpage & Thermal Benchmark',
      size: '6.2 MB',
      date: '2026.07',
      desc: '기존 유기 기판(FC-BGA) 대비 휨 58% 저감 및 고주파 유전 손실률(Loss Tangent) 1/3 개선 분석.',
    },
    {
      id: 3,
      title: 'Hybrid Cu-Cu Direct Bonding Sub-9µm Bumpless Reliability Standards',
      size: '3.9 MB',
      date: '2026.06',
      desc: 'MIL-STD-883 극한 온도 1,000사이클 열충격 시험 및 접합 저항 0.01Ω 이하 장기 신뢰성 인증.',
    },
  ];

  // 샘플이라 파일을 주지 않는다 — 누르면 안내만 연다
  const handleDownload = () => setIsNoticeOpen(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#c4c5d5]/50 shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#c4c5d5]/30 flex items-center justify-between bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00288e]" />
            <span className="font-bold text-[#0b1c30] text-base">
              첨단 패키징 기술 백서 및 공정 사양서 아카이브
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {papers.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-[#c4c5d5]/50 hover:border-[#00288e]/60 transition-all bg-[#f8f9ff] flex flex-col lg:flex-row items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#757684] mb-1">
                  <span>PDF DOCUMENT</span>
                  <span>•</span>
                  <span>{p.size}</span>
                  <span>•</span>
                  <span>{p.date}</span>
                </div>
                <div className="font-bold text-sm text-[#0b1c30]">{p.title}</div>
                <div className="text-xs text-[#444653] mt-1 leading-relaxed">{p.desc}</div>
              </div>

              <button
                onClick={handleDownload}
                className="bg-[#00288e] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF 다운로드</span>
              </button>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-[#c4c5d5]/30 bg-[#f8f9ff] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <p className="text-[12px] font-semibold text-[#0b1c30]">
            샘플 사이트입니다 — 백서·사양서 파일은 실제로 내려받아지지 않습니다.
          </p>
          <button
            onClick={onClose}
            className="bg-white border border-[#c4c5d5]/70 text-[#0b1c30] px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 shrink-0"
          >
            닫기
          </button>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug={SAMPLE_SLUG}
        industry={SAMPLE_INDUSTRY}
        featureName="기술 백서·사양서 내려받기"
      />
    </div>
  );
};

// 3. Simulation Report Modal
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SimSettings;
  results: { bandwidth: string; warpage: string; solution: string };
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  settings,
  results,
}) => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#c4c5d5]/50 shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#c4c5d5]/30 flex items-center justify-between bg-[#00288e] text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#57dffe]" />
            <span className="font-bold text-base">
              AI 칩셋 패키징 아키텍처 실시간 FEA 해석 보고서
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-[#0b1c30]">
          {/* Top metadata */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-[#eff4ff] p-4 rounded-xl border border-[#c4c5d5]/40 font-mono text-xs">
            <div>
              <div className="text-[#757684]">DOC ID</div>
              <div className="font-bold text-[#00288e]">#NA-SIM-2026-X80</div>
            </div>
            <div>
              <div className="text-[#757684]">CALCULATOR ENGINE</div>
              <div className="font-bold">FEA ANSYS 2026.1</div>
            </div>
            <div>
              <div className="text-[#757684]">CERTIFICATION</div>
              <div className="font-bold text-emerald-600">JEDEC Compliant</div>
            </div>
            <div>
              <div className="text-[#757684]">ANALYSIS STATUS</div>
              <div className="font-bold text-emerald-600">PASS (High Yield)</div>
            </div>
          </div>

          {/* Config Summary */}
          <div>
            <h4 className="font-bold text-base text-[#00288e] mb-2">1. 입력된 타깃 칩셋 스펙</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#c4c5d5]/40 text-center">
                <div className="text-xs text-[#757684]">패키지 사이즈</div>
                <div className="text-base font-bold text-[#0b1c30]">
                  {settings.pkgDim}×{settings.pkgDim} mm
                </div>
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#c4c5d5]/40 text-center">
                <div className="text-xs text-[#757684]">HBM 스택 구성</div>
                <div className="text-base font-bold text-[#00288e]">
                  {settings.hbmCount}-Hi Stack
                </div>
              </div>
              <div className="bg-[#f8f9ff] p-3 rounded-lg border border-[#c4c5d5]/40 text-center">
                <div className="text-xs text-[#757684]">총 소비전력 TDP</div>
                <div className="text-base font-bold text-[#00687a]">{settings.tdp} W</div>
              </div>
            </div>
          </div>

          {/* Output Results */}
          <div>
            <h4 className="font-bold text-base text-[#00288e] mb-2">2. 시뮬레이션 해석 결과</h4>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-3 bg-[#f8f9ff] rounded-lg border border-[#c4c5d5]/40">
                <span className="font-medium text-[#444653]">총 신호 전송 대역폭:</span>
                <span className="font-bold text-lg text-[#00288e]">{results.bandwidth}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f8f9ff] rounded-lg border border-[#c4c5d5]/40">
                <span className="font-medium text-[#444653]">예상 열 팽창 휨 변형 (Warpage):</span>
                <span className="font-bold text-lg text-emerald-600">{results.warpage}</span>
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#00288e]/30">
                <div className="text-xs text-[#757684]">추천 최적 기판 솔루션:</div>
                <div className="font-bold text-base text-[#00288e] mt-0.5">
                  {results.solution}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#c4c5d5]/30 bg-[#f8f9ff] flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs text-[#444653] hover:text-[#00288e] font-semibold"
          >
            <Printer className="w-4 h-4" />
            <span>프린트 출력</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsNoticeOpen(true)}
              className="bg-[#00288e] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF 다운로드 및 엔지니어링 미팅 신청</span>
            </button>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug={SAMPLE_SLUG}
        industry={SAMPLE_INDUSTRY}
        featureName="패키징 설계안 내려받기"
      />
    </div>
  );
};
