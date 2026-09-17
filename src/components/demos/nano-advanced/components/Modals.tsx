'use client';

import React, { useRef, useState } from 'react';
import { X, Download, Printer, Layers, Cpu, ShieldCheck } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { SimSettings } from '../types';
import { LAYERS, SAMPLE_INDUSTRY, SAMPLE_SLUG } from '../data/packagingData';

// 샘플이라 백서·설계안 파일을 실제로 내려주지 않는다 — 내려받기 버튼은
// 「다운로드 완료」 같은 가짜 알림 대신 공용 안내(SampleNotice)를 연다.
//
// 세 모달 모두 공용 훅(use-sample-dialog)을 쓴다 — Esc 닫기·배경 스크롤 잠금·포커스 순환이
// 없던 자리라 열어 놓고 뒤 지면이 스크롤되고 Esc 도 먹지 않았다(2026-09-17).
// 배경(백드롭) 누르면 닫히는 것도 같이 붙였고, 좁은 화면에서는 시트처럼 화면을 꽉 채운다.

/** 배경 클릭으로 닫기 — 모달 안에서 시작한 드래그가 배경에서 끝나도 닫히지 않게 mousedown 대상만 본다 */
const backdropClose = (onClose: () => void) => (e: React.MouseEvent<HTMLDivElement>) => {
  if (e.target === e.currentTarget) onClose();
};

const BACKDROP_CLASS =
  'fixed inset-0 z-50 flex items-stretch lg:items-center justify-center p-0 lg:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200';

// 1. 3D Exploded Layer Structural Visualizer Modal
interface ExplodedViewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplodedViewModal: React.FC<ExplodedViewModalProps> = ({ isOpen, onClose }) => {
  const [explosionGap, setExplosionGap] = useState<number>(40);
  // hover 전용이면 터치 기기에서는 계층 설명을 영영 볼 수 없다 — 눌러서(포커스로도) 고르게 바꿨다
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const layerCardProps = (id: number) => ({
    type: 'button' as const,
    onMouseEnter: () => setActiveLayer(id),
    onMouseLeave: () => setActiveLayer((cur) => (cur === id ? null : cur)),
    onFocus: () => setActiveLayer(id),
    onClick: () => setActiveLayer((cur) => (cur === id ? null : id)),
    'aria-pressed': activeLayer === id,
  });

  return (
    <div className={BACKDROP_CLASS} onMouseDown={backdropClose(onClose)}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nano-exploded-title"
        tabIndex={-1}
        className="bg-white rounded-none lg:rounded-2xl max-w-4xl w-full border border-[#c4c5d5]/50 shadow-2xl overflow-hidden flex flex-col h-full lg:h-auto max-h-full lg:max-h-[90vh] outline-none"
      >
        {/* Modal Header */}
        <div className="px-4 lg:px-6 py-4 border-b border-[#c4c5d5]/30 flex items-center justify-between gap-3 bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00288e] shrink-0" />
            <span id="nano-exploded-title" className="font-bold text-[#0b1c30] text-sm lg:text-base">
              3D 이종 패키징(2.5D/3D Heterogeneous) 4계층 입체 분해도
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="분해도 닫기"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-[#dce9ff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 lg:p-6 flex-1 min-h-0 overflow-y-auto space-y-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 bg-[#f8f9ff] p-4 rounded-xl border border-[#c4c5d5]/40">
            <div>
              <div className="text-xs font-bold text-[#00288e] uppercase font-mono">
                Interactive Layer Explosion Slider
              </div>
              <div className="text-sm text-[#444653] mt-0.5">
                슬라이더로 레이어 분해 간격을 조정하고, 각 계층을 눌러(또는 마우스를 올려) 아래에서 설명을
                확인하세요.
              </div>
            </div>
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <span className="text-xs font-mono text-[#757684] shrink-0">밀착</span>
              <input
                type="range"
                min="10"
                max="80"
                value={explosionGap}
                aria-label="레이어 분해 간격 (px)"
                onChange={(e) => setExplosionGap(parseInt(e.target.value, 10))}
                className="flex-1 lg:flex-none w-full lg:w-32 h-11 -my-[18px] bg-transparent bg-[linear-gradient(to_right,rgba(196,197,213,0.7),rgba(196,197,213,0.7))] bg-[length:100%_8px] bg-center bg-no-repeat appearance-none cursor-pointer accent-[#00288e]"
              />
              <span className="text-xs font-mono text-[#757684] shrink-0">확장 ({explosionGap}px)</span>
            </div>
          </div>

          {/* Interactive Stack Visualization Canvas */}
          <div className="bg-[#0b1c30] rounded-xl p-4 lg:p-8 text-white relative min-h-[360px] flex flex-col items-center justify-center cleanroom-grid overflow-hidden">
            <div className="w-full max-w-xl flex flex-col items-center">
              {/* L1: Logic Die & HBM */}
              <button
                {...layerCardProps(1)}
                style={{ marginBottom: `${explosionGap}px` }}
                className={`text-left w-full max-w-md bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-4 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ activeLayer === 1 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-blue-400/50' }`}
              >
                <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-0.5 text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L1: TOP LAYER</span>
                  <span className="text-blue-200">1,200W 고발열 소산</span>
                </div>
                <div className="font-bold text-sm mt-1 break-words">
                  GPU/NPU Logic Die (3nm) &amp; 8× HBM4 16-Hi Stack
                </div>
              </button>

              {/* L2: Silicon Interposer */}
              <button
                {...layerCardProps(2)}
                style={{ marginBottom: `${explosionGap}px` }}
                className={`text-left w-full max-w-lg bg-gradient-to-r from-cyan-800 via-teal-700 to-cyan-900 p-3.5 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ activeLayer === 2 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-cyan-400/40' }`}
              >
                <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-0.5 text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L2: INTERPOSER</span>
                  <span className="text-cyan-200">4.8 TB/s High Bandwidth</span>
                </div>
                <div className="font-bold text-sm mt-1 break-words">
                  Sub-5µm Fine Pitch Silicon Interposer (TSV 10,000 vias/mm²)
                </div>
              </button>

              {/* L3: Hybrid Cu-Cu Bonding */}
              <button
                {...layerCardProps(3)}
                style={{ marginBottom: `${explosionGap}px` }}
                className={`text-left w-full max-w-lg bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 p-3 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ activeLayer === 3 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-emerald-400/40' }`}
              >
                <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-0.5 text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L3: BONDING INTERFACE</span>
                  <span className="text-emerald-200">0.01Ω Direct Contact</span>
                </div>
                <div className="font-bold text-sm mt-1 break-words">
                  Micro-Bump &amp; Hybrid Cu-Cu Direct Bonding (Pitch &lt; 9µm)
                </div>
              </button>

              {/* L4: Glass Core Substrate */}
              <button
                {...layerCardProps(4)}
                className={`text-left w-full max-w-xl bg-gradient-to-r from-slate-700 via-slate-800 to-blue-950 p-4 rounded-lg border-2 shadow-lg transition-all duration-300 cursor-pointer ${ activeLayer === 4 ? 'border-[#57dffe] scale-[1.02] ring-4 ring-[#57dffe]/30' : 'border-slate-500/40' }`}
              >
                <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-0.5 text-xs font-mono">
                  <span className="bg-white/20 px-2 py-0.5 rounded font-bold">L4: BASE SUBSTRATE</span>
                  <span className="text-slate-300">Low-Warpage Glass Core</span>
                </div>
                <div className="font-bold text-sm mt-1 break-words">
                  Next-Gen 24-Layer Glass Core Substrate (120×120mm Form Factor)
                </div>
              </button>
            </div>
          </div>

          {/* Active Layer Details — 고르기 전에도 빈 자리가 아니라 안내가 보이게 한다 */}
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#c4c5d5]/60 text-xs leading-relaxed text-[#444653]">
            {activeLayer ? (
              <>
                <strong className="text-[#00288e]">{LAYERS[activeLayer - 1].title}</strong>:{' '}
                {LAYERS[activeLayer - 1].desc}
              </>
            ) : (
              <span className="text-[#757684]">
                위 네 계층 중 하나를 누르면 그 계층의 나노 인터페이스 설명이 여기에 나옵니다.
              </span>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 lg:px-6 py-4 border-t border-[#c4c5d5]/30 bg-[#f8f9ff] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#00288e] text-white px-5 min-h-11 rounded-lg text-sm font-semibold hover:bg-[#1e40af] transition-colors"
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // 안내(SampleNotice)가 열려 있는 동안에는 Esc·포커스를 그쪽에 넘긴다 — 두 모달이 같은 키를 다투지 않게
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const papers = [
    {
      id: 1,
      title: '2.5D Sub-5µm Silicon Interposer Signal Integrity & Yield Report (v2.6)',
      size: '4.8 MB',
      date: '2026.08',
      desc: 'HBM4 인터페이스 4.8 TB/s 저손실 전송 특성 및 TSV 고밀도 어레이 수율 99.85%(예시 수치) 검토 데이터.',
    },
    {
      id: 2,
      title: '120×120mm Large-Panel Glass Core Substrate Warpage & Thermal Benchmark',
      size: '6.2 MB',
      date: '2026.07',
      desc: '기존 유기 기판(FC-BGA) 대비 휨 58% 저감 및 고주파 유전 손실률(Loss Tangent) 1/3 개선 분석 (예시 수치).',
    },
    {
      id: 3,
      title: 'Hybrid Cu-Cu Direct Bonding Sub-9µm Bumpless Reliability Standards',
      size: '3.9 MB',
      date: '2026.06',
      desc: '가혹 온도 1,000사이클 열충격 시험(군용 규격 수준 — 예시 표기) 및 접합 저항 0.01Ω 이하 장기 신뢰성 검토.',
    },
  ];

  // 샘플이라 파일을 주지 않는다 — 누르면 안내만 연다
  const handleDownload = () => setIsNoticeOpen(true);

  return (
    <div className={BACKDROP_CLASS} onMouseDown={backdropClose(onClose)}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nano-whitepaper-title"
        tabIndex={-1}
        className="bg-white rounded-none lg:rounded-2xl max-w-2xl w-full border border-[#c4c5d5]/50 shadow-2xl overflow-hidden flex flex-col h-full lg:h-auto max-h-full lg:max-h-[90vh] outline-none"
      >
        <div className="px-4 lg:px-6 py-4 border-b border-[#c4c5d5]/30 flex items-center justify-between gap-3 bg-[#eff4ff]">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#00288e] shrink-0" />
            <span id="nano-whitepaper-title" className="font-bold text-[#0b1c30] text-sm lg:text-base">
              첨단 패키징 기술 백서 및 공정 사양서 아카이브
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="백서 목록 닫기"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-[#dce9ff]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-4 flex-1 min-h-0 overflow-y-auto">
          {papers.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-[#c4c5d5]/50 hover:border-[#00288e]/60 transition-all bg-[#f8f9ff] flex flex-col lg:flex-row items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-[#757684] mb-1">
                  <span>PDF DOCUMENT</span>
                  <span>•</span>
                  <span>{p.size}</span>
                  <span>•</span>
                  <span>{p.date}</span>
                </div>
                <div className="font-bold text-sm text-[#0b1c30] break-words">{p.title}</div>
                <div className="text-xs text-[#444653] mt-1 leading-relaxed">{p.desc}</div>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="bg-[#00288e] hover:bg-[#1e40af] text-white px-4 min-h-11 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF 다운로드</span>
              </button>
            </div>
          ))}
        </div>

        <div className="px-4 lg:px-6 py-4 border-t border-[#c4c5d5]/30 bg-[#f8f9ff] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] font-semibold text-[#0b1c30]">
            샘플 사이트입니다 — 백서·사양서 파일은 실제로 내려받아지지 않습니다.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-[#c4c5d5]/70 text-[#0b1c30] px-4 min-h-11 rounded-lg text-xs font-semibold hover:bg-gray-50 shrink-0"
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div className={BACKDROP_CLASS} onMouseDown={backdropClose(onClose)}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="nano-report-title"
        tabIndex={-1}
        className="bg-white rounded-none lg:rounded-2xl max-w-2xl w-full border border-[#c4c5d5]/50 shadow-2xl overflow-hidden flex flex-col h-full lg:h-auto max-h-full lg:max-h-[90vh] outline-none"
      >
        <div className="px-4 lg:px-6 py-4 border-b border-[#c4c5d5]/30 flex items-center justify-between gap-3 bg-[#00288e] text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#57dffe] shrink-0" />
            <span id="nano-report-title" className="font-bold text-sm lg:text-base">
              AI 칩셋 패키징 아키텍처 예시 해석 보고서
            </span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="보고서 닫기"
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-6 text-sm text-[#0b1c30] flex-1 min-h-0 overflow-y-auto">
          {/* Top metadata — 실존 해석 소프트웨어·표준화 단체 이름을 쓰지 않는다(2026-09-17) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#eff4ff] p-4 rounded-xl border border-[#c4c5d5]/40 font-mono text-xs">
            <div>
              <div className="text-[#757684]">DOC ID</div>
              <div className="font-bold text-[#00288e]">#NA-SIM-2026-X80</div>
            </div>
            <div>
              <div className="text-[#757684]">CALCULATOR ENGINE</div>
              <div className="font-bold break-words">근사식 기반 예시 산출</div>
            </div>
            <div>
              <div className="text-[#757684]">판정 기준</div>
              <div className="font-bold text-emerald-600 break-words">사내 관리 기준 (예시)</div>
            </div>
            <div>
              <div className="text-[#757684]">ANALYSIS STATUS</div>
              <div className="font-bold text-emerald-600">PASS (High Yield)</div>
            </div>
          </div>

          {/* Config Summary */}
          <div>
            <h4 className="font-bold text-base text-[#00288e] mb-2">1. 입력된 타깃 칩셋 스펙</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            <h4 className="font-bold text-base text-[#00288e] mb-2">2. 시뮬레이션 해석 결과 (예시 산출)</h4>
            <div className="space-y-2.5">
              <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 p-3 bg-[#f8f9ff] rounded-lg border border-[#c4c5d5]/40">
                <span className="font-medium text-[#444653]">총 신호 전송 대역폭:</span>
                <span className="font-bold text-lg text-[#00288e]">{results.bandwidth}</span>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-x-3 gap-y-1 p-3 bg-[#f8f9ff] rounded-lg border border-[#c4c5d5]/40">
                <span className="font-medium text-[#444653]">예상 열 팽창 휨 변형 (Warpage):</span>
                <span className="font-bold text-lg text-emerald-600">{results.warpage}</span>
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#00288e]/30">
                <div className="text-xs text-[#757684]">추천 최적 기판 솔루션:</div>
                <div className="font-bold text-base text-[#00288e] mt-0.5 break-words">
                  {results.solution}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-6 py-4 border-t border-[#c4c5d5]/30 bg-[#f8f9ff] flex flex-wrap items-center justify-between gap-3">
          {/*
            window.print() 를 그대로 부르면 어두운 백드롭까지 찍히고, 본문은 자체 스크롤 영역이라
            화면 밖 내용이 잘려 나간다(저장소에 인쇄용 스타일이 없다). 보고서를 뽑으려던 사람이
            기대와 다른 결과를 받으므로, 같은 파일의 다른 내려받기 버튼과 같이 샘플 안내를 연다.
          */}
          <button
            type="button"
            onClick={() => setIsNoticeOpen(true)}
            className="flex min-h-11 items-center gap-1.5 text-xs text-[#444653] hover:text-[#00288e] font-semibold"
          >
            <Printer className="w-4 h-4" />
            <span>프린트 출력</span>
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsNoticeOpen(true)}
              className="bg-[#00288e] hover:bg-[#1e40af] text-white px-4 min-h-11 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors text-left"
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
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
