'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Download, ShieldCheck, FileText, Atom } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { PipelineItem, Publication } from '../types';

interface MoAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoAVideoModal: React.FC<MoAModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "01. 리간드 고속 탐색 및 결합", desc: "PROTEA-AI가 최적화한 PROTAC 분자가 KRAS G12D 돌연변이 단백질의 스위치 영역에 0.2초 내 유도적합(Induced-fit) 도킹합니다." },
    { title: "02. 3성분 복합체(Ternary Complex) 형성", desc: "VHL E3 유비퀴틴 리가아제를 동시 동원하여 고안정성 삼원 복합체를 견고히 구축합니다." },
    { title: "03. 폴리유비퀴틴화 (Ubiquitination)", desc: "E3 리가아제에 의해 표적 암 유발 단백질의 라이신(Lys) 잔기에 유비퀴틴 사슬이 급속 결합합니다." },
    { title: "04. 26S 프로테아좀 분해 및 재순환", desc: "암세포 내 프로테아좀이 KRAS 표적을 아미노산 단위로 완전 소멸시키며, PROTAC은 분리되어 차기 표적을 연속 분해합니다." }
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, steps.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#213145]/70 backdrop-blur-xs p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-white max-w-3xl w-full rounded-2xl border border-[#c4c5d5]/60 shadow-2xl p-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#e5eeff] text-[#00288e]">
              <Atom className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#0b1c30]">
                3D 분자 작용 기전(MoA) 시뮬레이션
              </h3>
              <p className="text-[11px] font-code-mono text-[#00687a]">
                PROTEA-AI Guided PROTAC Ternary Complex Simulation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#757684] hover:text-[#0b1c30] hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="aspect-video bg-[#0b1c30] rounded-xl relative overflow-hidden flex flex-col justify-between p-6 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00288e]/40 via-transparent to-[#00687a]/30 pointer-events-none"></div>

          {/* Animated 3D Simulation Elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Center Complex */}
            <div className="relative flex items-center justify-center">
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
          <div className="relative z-10 flex items-center justify-between text-[11px] font-code-mono text-white/90">
            <span className="px-2.5 py-1 rounded bg-black/40 backdrop-blur-xs border border-white/10 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>MOLECULAR DYNAMICS 60 FPS</span>
            </span>
            <span className="text-cyan-300">
              Kd: 3.2 nM | Binding ΔG: -12.4 kcal/mol
            </span>
          </div>

          {/* Bottom Controls Overlay */}
          <div className="relative z-10 bg-black/60 backdrop-blur-md rounded-lg p-3 border border-white/10 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 transition text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <div className="text-[12px]">
                <strong className="text-cyan-300">{steps[activeStep].title}</strong>
                <p className="text-[11px] text-gray-300 line-clamp-1 max-w-md mt-0.5">
                  {steps[activeStep].desc}
                </p>
              </div>
            </div>

            <div className="flex space-x-1">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeStep === i ? 'w-5 bg-cyan-400' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mechanism Step Cards */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2 text-[12px]">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-2.5 rounded-lg border cursor-pointer transition ${
                activeStep === idx
                  ? 'border-[#1e40af] bg-[#eff4ff]'
                  : 'border-[#c4c5d5]/40 hover:bg-gray-50'
              }`}
            >
              <div className="font-bold text-[#0b1c30]">{step.title}</div>
              <div className="text-[#444653] text-[11px] line-clamp-2 mt-0.5">{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-[#c4c5d5]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#eff4ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold hover:bg-[#dce9ff] transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProtocolModalProps {
  item: PipelineItem | null;
  onClose: () => void;
}

export const ProtocolModal: React.FC<ProtocolModalProps> = ({ item, onClose }) => {
  // 샘플이라 내려받을 파일이 없다 — 「다운로드 완료」를 흉내 내지 않고 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#213145]/70 backdrop-blur-xs p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-white max-w-xl w-full rounded-2xl border border-[#c4c5d5] shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#e5eeff] text-[#00288e]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#0b1c30]">
                {item.code} 임상 프로토콜 요약
              </h3>
              <p className="text-[11px] font-code-mono text-[#00687a]">
                Confidential Clinical Study Protocol (IRB/IND Reference)
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#757684] hover:text-[#0b1c30] cursor-pointer">
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

          <div className="grid grid-cols-2 gap-3">
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
            <div>보안 상태: <strong className="text-[#00563a]">VDR Authentication Verified</strong></div>
            <div>파일명: <span className="text-[#00288e] font-bold">{item.protocolFileName}</span></div>
            <div>워터마크: Encrypted Institutional Review Only</div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-3 border-t border-[#c4c5d5]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff4ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold hover:bg-[#dce9ff] transition cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => setIsNoticeOpen(true)}
            className="px-5 py-2 bg-[#1e40af] text-white rounded-lg text-[13px] font-semibold hover:bg-[#00288e] transition flex items-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>보안 PDF 다운로드</span>
          </button>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="celebris-biopharma"
        industry="corporate"
        featureName="임상 프로토콜 요약본 내려받기"
      />
    </div>
  );
};

interface PublicationModalProps {
  publication: Publication | null;
  onClose: () => void;
}

export const PublicationModal: React.FC<PublicationModalProps> = ({ publication, onClose }) => {
  // 샘플이라 리프린트 파일이 없다 — 「다운로드되었습니다」 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!publication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#213145]/70 backdrop-blur-xs p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-white max-w-xl w-full rounded-2xl border border-[#c4c5d5] shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-code-mono font-bold bg-[#1e40af] text-white">
              {publication.journal}
            </span>
            <span className="text-[12px] font-code-mono text-[#757684]">
              {publication.doi}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#757684] hover:text-[#0b1c30] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-[14px]">
          <h3 className="text-[17px] font-bold text-[#0b1c30] leading-snug">
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

          <div className="p-3 bg-gray-50 rounded-lg text-[12px] font-code-mono text-[#757684]">
            Reprint File: <strong className="text-[#00288e]">{publication.filePdfName}</strong> (High-Resolution PDF, 14.8 MB)
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-3 border-t border-[#c4c5d5]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#eff4ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold hover:bg-[#dce9ff] transition cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => setIsNoticeOpen(true)}
            className="px-5 py-2 bg-[#1e40af] text-white rounded-lg text-[13px] font-semibold hover:bg-[#00288e] transition flex items-center space-x-1.5 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>논문 전문 PDF 다운로드</span>
          </button>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="celebris-biopharma"
        industry="corporate"
        featureName="논문 리프린트 내려받기"
      />
    </div>
  );
};

interface DeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToWizard: () => void;
}

export const DeckModal: React.FC<DeckModalProps> = ({ isOpen, onClose, onNavigateToWizard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#213145]/70 backdrop-blur-xs p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-white max-w-lg w-full rounded-2xl border border-[#c4c5d5] shadow-2xl p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#c4c5d5]/30 mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#1e40af]" />
            <h3 className="text-[17px] font-bold text-[#0b1c30]">
              글로벌 임상 파이프라인 덱 신청 안내
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[#757684] hover:text-[#0b1c30] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-[14px] text-[#444653]">
          <p className="leading-relaxed">
            CELEBRIS BIOPHARMA의 임상 파이프라인 덱에는 미공개 전임상 유효성 데이터(In Vivo/In Vitro) 및 글로벌 5개국 임상 2a상 설계안이 포함되어 있습니다.
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
            * 본 자료는 기관 및 기업 담당자 인증 후 암호화된 링크로 제공됩니다.
          </p>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-3 border-t border-[#c4c5d5]/30">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-[#0b1c30] rounded-lg text-[13px] font-medium hover:bg-gray-200 transition cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={() => {
              onClose();
              onNavigateToWizard();
            }}
            className="px-5 py-2 bg-[#1e40af] text-white rounded-lg text-[13px] font-semibold hover:bg-[#00288e] transition shadow-sm cursor-pointer"
          >
            파트너링 신청서로 이동
          </button>
        </div>
      </div>
    </div>
  );
};
