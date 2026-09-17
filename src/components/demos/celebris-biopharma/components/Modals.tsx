'use client';

import React, { useState, useEffect, useId, useRef } from 'react';
import { X, Play, Pause, Download, ShieldCheck, FileText, Atom } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { PipelineItem, Publication } from '../types';

// 네 모달 모두 Esc·배경 클릭으로 닫히지 않았고, 열려 있어도 뒤쪽 지면이 계속 스크롤됐으며,
// 모바일에서 세로로 넘치는 부분은 그냥 잘려 나갔다. 동작은 공용 훅(use-sample-dialog)에 맡기고
// 껍데기를 하나로 모은다 — 모바일은 아래에서 올라오는 시트, lg 이상은 가운데 카드.

type DialogShellProps = {
  open: boolean;
  /** 위에 또 다른 모달(SampleNotice)이 떠 있는 동안 false — 화면에는 그대로 두고 Esc·포커스만 그쪽에 넘긴다 */
  active?: boolean;
  onClose: () => void;
  /** 제목 요소의 id — aria-labelledby 로 잇는다 */
  labelledBy: string;
  /** 가로 최대 폭 (Tailwind max-w-* 클래스) */
  maxWidth: string;
  children: React.ReactNode;
};

function DialogShell({ open, active = true, onClose, labelledBy, maxWidth, children }: DialogShellProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useSampleDialog({ open: open && active, onClose, dialogRef });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-[#213145]/70 backdrop-blur-xs p-0 lg:p-6 animate-in fade-in duration-200"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`bg-white w-full ${maxWidth} max-h-[92dvh] lg:max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-2xl lg:rounded-2xl border border-[#c4c5d5]/60 shadow-2xl p-5 lg:p-6 relative outline-hidden [word-break:keep-all]`}
      >
        {children}
      </div>
    </div>
  );
}

interface MoAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoAVideoModal: React.FC<MoAModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const titleId = useId();

  const steps = [
    { title: "01. 리간드 고속 탐색 및 결합", desc: "PROTEA-AI가 최적화한 PROTAC 분자가 KRAS G12D 돌연변이 단백질의 스위치 영역에 0.2초 내 유도적합(Induced-fit) 도킹합니다." },
    { title: "02. 3성분 복합체(Ternary Complex) 형성", desc: "VHL E3 유비퀴틴 리가아제를 동시 동원하여 고안정성 삼원 복합체를 견고히 구축합니다." },
    { title: "03. 폴리유비퀴틴화 (Ubiquitination)", desc: "E3 리가아제에 의해 표적 암 유발 단백질의 라이신(Lys) 잔기에 유비퀴틴 사슬이 급속 결합합니다." },
    { title: "04. 26S 프로테아좀 분해 및 재순환", desc: "암세포 내 프로테아좀이 KRAS 표적을 아미노산 단위로 분해하고, PROTAC은 분리되어 다음 표적으로 넘어갑니다." }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, steps.length]);

  return (
    <DialogShell open={isOpen} onClose={onClose} labelledBy={titleId} maxWidth="max-w-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#e5eeff] text-[#00288e] shrink-0">
              <Atom className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 id={titleId} className="text-[17px] lg:text-[18px] font-bold text-[#0b1c30]">
                3D 분자 작용 기전(MoA) 시뮬레이션
              </h3>
              <p className="text-[11px] font-code-mono text-[#00687a]">
                PROTEA-AI Guided PROTAC Ternary Complex Simulation (예시)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="aspect-video bg-[#0b1c30] rounded-xl relative overflow-hidden flex flex-col justify-between p-3 lg:p-6 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00288e]/40 via-transparent to-[#00687a]/30 pointer-events-none"></div>

          {/* Animated 3D Simulation Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Center Complex — 375px 에서 좌우가 잘려 나가던 자리라 모바일에서만 줄인다 */}
            <div className="relative flex items-center justify-center scale-[0.62] sm:scale-[0.8] lg:scale-100">
              {/* Protein Target (KRAS G12D) */}
              <div className={`w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500/80 to-blue-700/80 flex items-center justify-center text-white text-xs font-code-mono font-bold shadow-2xl transition-all duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
                <div className="text-center p-2">
                  <span className="block text-[11px] text-blue-200 font-mono">Target Oncoprotein</span>
                  <span className="text-sm font-bold">KRAS G12D</span>
                </div>
              </div>

              {/* PROTAC Linker */}
              <div className="w-20 h-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 relative mx-1 rounded-full shadow-lg animate-pulse">
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-300 whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded">
                  Novel Linker
                </span>
              </div>

              {/* E3 Ligase (VHL) */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500/80 to-teal-700/80 flex items-center justify-center text-white text-xs font-code-mono font-bold shadow-2xl">
                <div className="text-center p-2">
                  <span className="block text-[11px] text-emerald-200 font-mono">E3 Ligase</span>
                  <span className="text-sm font-bold">VHL</span>
                </div>
              </div>

              {/* Ubiquitin Tags */}
              <div className="absolute -top-6 right-2 flex space-x-1 animate-bounce">
                <span className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 text-[8px] font-bold text-black flex items-center justify-center">Ub</span>
                <span className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 text-[8px] font-bold text-black flex items-center justify-center">Ub</span>
                <span className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 text-[8px] font-bold text-black flex items-center justify-center">Ub</span>
              </div>
            </div>
          </div>

          {/* Top Status Bar */}
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-1.5 text-[10px] lg:text-[11px] font-code-mono text-white/90">
            <span className="px-2.5 py-1 rounded bg-black/40 backdrop-blur-xs border border-white/10 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>MOLECULAR DYNAMICS 60 FPS</span>
            </span>
            <span className="text-cyan-300">
              Kd: 3.2 nM | Binding ΔG: -12.4 kcal/mol
            </span>
          </div>

          {/* Bottom Controls Overlay */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-lg p-2 lg:p-3 border border-white/10 text-white flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center space-x-2 lg:space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? '일시정지' : '재생'}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/20 hover:bg-white/30 transition text-white cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="min-w-0 text-[11px] lg:text-[12px]">
                <strong className="text-cyan-300 line-clamp-1">{steps[activeStep].title}</strong>
                <p className="hidden sm:block text-[11px] text-gray-300 line-clamp-1 max-w-md mt-0.5">
                  {steps[activeStep].desc}
                </p>
              </div>
            </div>

            {/* 점 자체는 2px 이라 누르기 어려웠다 — 보이는 점은 그대로 두고 누르는 면만 넓힌다 */}
            <div className="flex shrink-0">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  aria-label={`${i + 1}단계 보기`}
                  aria-current={activeStep === i ? 'true' : undefined}
                  className="flex h-11 w-7 items-center justify-center cursor-pointer"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${activeStep === i ? 'w-5 bg-cyan-400' : 'w-2 bg-white/40'}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mechanism Step Cards */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
          {steps.map((step, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStep(idx)}
              aria-current={activeStep === idx ? 'true' : undefined}
              className={`min-h-11 p-2.5 rounded-lg border text-left cursor-pointer transition ${
                activeStep === idx
                  ? 'border-[#1e40af] bg-[#eff4ff]'
                  : 'border-[#c4c5d5]/40 hover:bg-gray-50'
              }`}
            >
              <div className="font-bold text-[#0b1c30]">{step.title}</div>
              <div className="text-[#444653] text-[11px] mt-0.5">{step.desc}</div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#c4c5d5]/30 flex items-center justify-between gap-3">
          <p className="text-[11px] text-[#757684]">
            모식도로 만든 예시 화면입니다 — 실제 실험 영상·데이터가 아닙니다.
          </p>
          <button
            onClick={onClose}
            className="min-h-11 shrink-0 px-5 py-2 bg-[#eff4ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold hover:bg-[#dce9ff] transition cursor-pointer"
          >
            닫기
          </button>
        </div>
    </DialogShell>
  );
};

interface ProtocolModalProps {
  item: PipelineItem | null;
  onClose: () => void;
}

export const ProtocolModal: React.FC<ProtocolModalProps> = ({ item, onClose }) => {
  // 샘플이라 내려받을 파일이 없다 — 「다운로드 완료」를 흉내 내지 않고 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      {/* 안내 모달이 떠 있는 동안에는 Esc·포커스를 그쪽에 넘긴다(Esc 한 번에 두 겹이 같이 닫히지 않게) */}
      <DialogShell open={item !== null} active={!isNoticeOpen} onClose={onClose} labelledBy={titleId} maxWidth="max-w-xl">
        {item && (
          <>
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#e5eeff] text-[#00288e] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 id={titleId} className="text-[17px] font-bold text-[#0b1c30]">
                {item.code} 임상 프로토콜 요약
              </h3>
              <p className="text-[11px] font-code-mono text-[#00687a]">
                Clinical Study Protocol Summary — 예시 문서
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 text-[13px] text-[#444653]">
          <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#c4c5d5]/30 space-y-2">
            <div>
              <span className="font-code-mono text-[11px] text-[#757684] uppercase block">시험 과제명</span>
              <strong className="text-[#0b1c30] text-[14px]">{item.protocolDetails.title}</strong>
            </div>
            <div>
              <span className="font-code-mono text-[11px] text-[#757684] uppercase block">임상 목적</span>
              <p className="text-[#0b1c30]">{item.protocolDetails.objective}</p>
            </div>
          </div>

          {/* 375px 에서 두 칸이 각각 손가락 폭보다 좁게 눌리던 자리 — 모바일은 한 칸씩 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-code-mono text-[11px] text-[#757684] uppercase block">대상 환자군</span>
              <span className="text-[#0b1c30] font-medium">{item.protocolDetails.targetPatient}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <span className="font-code-mono text-[11px] text-[#757684] uppercase block">투여 용량 및 주기</span>
              <span className="text-[#0b1c30] font-medium">{item.protocolDetails.dosingRegimen}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <span className="font-code-mono text-[11px] text-[#757684] uppercase block">주요 바이오마커</span>
            <span className="text-[#0b1c30] font-medium">{item.protocolDetails.biomarkers}</span>
          </div>

          <div className="p-3.5 bg-[#f8f9ff] rounded-lg border border-[#c4c5d5]/40 font-code-mono text-[11px] text-[#757684] space-y-1">
            <div>표기 상태: <strong className="text-[#00563a]">샘플 표기 — 실제 인증이 아닙니다</strong></div>
            <div>파일명(예시): <span className="text-[#00288e] font-bold">{item.protocolFileName}</span></div>
            <div>이 문서는 화면 구성을 보여 주려고 지어낸 예시입니다.</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-3 border-t border-[#c4c5d5]/30">
          <button
            onClick={onClose}
            className="min-h-11 px-4 py-2 bg-[#eff4ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold hover:bg-[#dce9ff] transition cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => setIsNoticeOpen(true)}
            className="min-h-11 px-5 py-2 bg-[#1e40af] text-white rounded-lg text-[13px] font-semibold hover:bg-[#00288e] transition flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>보안 PDF 다운로드</span>
          </button>
        </div>
          </>
        )}
      </DialogShell>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="celebris-biopharma"
        industry="corporate"
        featureName="임상 프로토콜 요약본 내려받기"
      />
    </>
  );
};

interface PublicationModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const PublicationModal: React.FC<PublicationModalProps> = ({ publication, onClose }) => {
  // 샘플이라 리프린트 파일이 없다 — 「다운로드되었습니다」 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      {/* 안내 모달이 떠 있는 동안에는 Esc·포커스를 그쪽에 넘긴다 */}
      <DialogShell
        open={publication !== null}
        active={!isNoticeOpen}
        onClose={onClose}
        labelledBy={titleId}
        maxWidth="max-w-xl"
      >
        {publication && (
          <>
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-code-mono font-bold bg-[#1e40af] text-white">
              {publication.journal}
            </span>
            <span className="text-[12px] font-code-mono text-[#757684] break-all">
              {publication.doi}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-[14px]">
          <h3 id={titleId} className="text-[17px] font-bold text-[#0b1c30] leading-snug">
            {publication.title}
          </h3>

          <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#c4c5d5]/30">
            <span className="text-[11px] font-code-mono text-[#00288e] font-bold uppercase tracking-wider block mb-1">
              Executive Abstract
            </span>
            <p className="text-[13px] text-[#444653] leading-relaxed">
              {publication.abstract}
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg text-[12px] font-code-mono text-[#757684] break-all">
            Reprint File (예시): <strong className="text-[#00288e]">{publication.filePdfName}</strong> — 내려받을 수 있는 실제 파일은 없습니다.
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-3 border-t border-[#c4c5d5]/30">
          <button
            onClick={onClose}
            className="min-h-11 px-4 py-2 bg-[#eff4ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold hover:bg-[#dce9ff] transition cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => setIsNoticeOpen(true)}
            className="min-h-11 px-5 py-2 bg-[#1e40af] text-white rounded-lg text-[13px] font-semibold hover:bg-[#00288e] transition flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>논문 전문 PDF 다운로드</span>
          </button>
        </div>
          </>
        )}
      </DialogShell>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="celebris-biopharma"
        industry="corporate"
        featureName="논문 리프린트 내려받기"
      />
    </>
  );
};

interface DeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToWizard: () => void;
}

export const DeckModal: React.FC<DeckModalProps> = ({ isOpen, onClose, onNavigateToWizard }) => {
  const titleId = useId();

  return (
    <DialogShell open={isOpen} onClose={onClose} labelledBy={titleId} maxWidth="max-w-lg">
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#1e40af] shrink-0" />
            <h3 id={titleId} className="text-[17px] font-bold text-[#0b1c30]">
              글로벌 임상 파이프라인 덱 신청 안내
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-[14px] text-[#444653]">
          <p className="leading-relaxed">
            CELEBRIS BIOPHARMA 의 임상 파이프라인 덱은 전임상 유효성 데이터(In Vivo/In Vitro)와 다국가 임상 2a상 설계안을 담는 구성으로 소개합니다.
          </p>
          <div className="p-3.5 bg-[#eff4ff] rounded-xl border border-[#c4c5d5]/30 space-y-1 text-[13px]">
            <div className="font-semibold text-[#00288e]">포함된 핵심 자료:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-[#0b1c30]">
              <li>CB-101 KRAS G12D/V 경구 분해제 임상 2상 중간 데이터 요약</li>
              <li>CB-204 Trop-2 ADC 신규 펩타이드 링커 합성 CMC 밸리데이션</li>
              <li>PROTEA-AI 플랫폼 14억 개 화학 라이브러리 스크리닝 역량 보고서</li>
            </ul>
          </div>
          <p className="text-[12px] text-[#757684]">
            * 샘플 사이트입니다 — 실제로 신청을 받거나 자료를 보내 드리지 않습니다. 아래 버튼은 같은 지면의 파트너링 신청 구역으로 이동합니다.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-3 border-t border-[#c4c5d5]/30">
          <button
            onClick={onClose}
            className="min-h-11 px-4 py-2 bg-gray-100 text-[#0b1c30] rounded-lg text-[13px] font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToWizard();
            }}
            className="min-h-11 px-5 py-2 bg-[#1e40af] text-white rounded-lg text-[13px] font-semibold hover:bg-[#00288e] transition shadow-sm cursor-pointer"
          >
            파트너링 신청서로 이동
          </button>
        </div>
    </DialogShell>
  );
};
