'use client';

import React, { useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ArchitectureViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureViewerModal: React.FC<ArchitectureViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'thermal' | 'pcb' | 'chassis'>('all');
  const [fanSpeed, setFanSpeed] = useState<number>(4800);
  const [simRunning, setSimRunning] = useState<boolean>(true);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc · 배경 스크롤 잠금 · 포커스 순환
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="technova-arch-title"
        tabIndex={-1}
        className="bg-[#111827] border border-[#3b82f6] rounded-t-2xl lg:rounded-xl max-w-4xl w-full p-4 lg:p-6 spec-hairline shadow-2xl outline-none relative flex flex-col max-h-[88vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#424754] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">view_in_ar</span>
            <div>
              <h3 id="technova-arch-title" className="text-base lg:text-lg font-headline font-bold text-[#dfe2ee]">
                TECHNOVA TITAN 16 PRO 3D 아키텍처 &amp; 분해 시뮬레이터
              </h3>
              <span className="text-[11px] font-label text-[#8c909f]">
6000시리즈 CNC 알루미늄 + 3D 베이퍼 챔버 + 듀얼 에어로 블레이드 쿨링 (예시 사양)
              </span>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="시뮬레이터 닫기"
            className="shrink-0 min-h-11 min-w-11 flex items-center justify-center rounded hover:bg-[#1c2028] text-[#8c909f] hover:text-[#dfe2ee] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col lg:flex-row gap-6">
          {/* 3D Visualizer Stage */}
          <div className="flex-1 bg-[#0a0e16] border border-[#424754] rounded-lg p-6 flex flex-col items-center justify-center relative min-h-[320px] overflow-hidden hardware-mesh">
            {/* Ambient Lighting */}
            <div className="absolute inset-0 bg-radial from-[#4cd7f6]/15 via-transparent to-transparent pointer-events-none"></div>

            {/* Simulated 3D Exploded Layer Stack */}
            <div className="relative w-full max-w-md h-64 flex flex-col items-center justify-center">
              {/* Layer 1: Display & Top Shell */}
              {(activeLayer === 'all' || activeLayer === 'chassis') && (
                <div className="absolute top-2 w-72 h-14 bg-[#181c24]/90 border border-[#4cd7f6]/50 rounded-lg flex items-center justify-between px-4 transform -skew-x-12 transition-all duration-500 shadow-lg">
                  <span className="text-xs font-label text-[#4cd7f6] font-bold">16" 2.5K OLED 240Hz 패널 A-커버</span>
                  <span className="text-[10px] text-[#8c909f]">초박형 0.2ms</span>
                </div>
              )}

              {/* Layer 2: Keyboard & Optical Switches */}
              {(activeLayer === 'all' || activeLayer === 'chassis') && (
                <div className="absolute top-16 w-80 h-14 bg-[#1c2028]/90 border border-[#adc6ff]/50 rounded-lg flex items-center justify-between px-4 transform -skew-x-12 transition-all duration-500 shadow-md">
                  <span className="text-xs font-label text-[#adc6ff] font-bold">광학 기계식 RGB 키보드 C-커버</span>
                  <span className="text-[10px] text-[#8c909f]">0.1ms 래피드</span>
                </div>
              )}

              {/* Layer 3: 3D Vapor Chamber & Dual Fans */}
              {(activeLayer === 'all' || activeLayer === 'thermal') && (
                <div className="absolute top-30 w-84 h-16 bg-[#03b5d3]/20 border-2 border-[#4cd7f6] rounded-lg flex items-center justify-between px-4 transform -skew-x-12 active-glow transition-all duration-500 z-10">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4cd7f6] animate-spin">mode_fan</span>
                    <div>
                      <span className="text-xs font-label text-[#4cd7f6] font-bold block">
                        풀커버 3D 베이퍼 챔버 + 듀얼 0.1mm 팬
                      </span>
                      <span className="text-[10px] text-[#dfe2ee]">
                        열방출 면적 +340% (예시 수치 · 풍량 67 CFM)
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-label text-[#ec6a06] font-bold">
                    {simRunning ? `${fanSpeed} RPM` : '정지'}
                  </span>
                </div>
              )}

              {/* Layer 4: Mainboard PCB & Core Silicon */}
              {(activeLayer === 'all' || activeLayer === 'pcb') && (
                <div className="absolute top-44 w-80 h-16 bg-[#0f131c]/95 border border-[#ec6a06]/60 rounded-lg flex items-center justify-between px-4 transform -skew-x-12 transition-all duration-500 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ec6a06]">memory</span>
                    <div>
                      <span className="text-xs font-label text-[#dfe2ee] font-bold block">
                        16코어 CPU + 외장 GPU 16GB (175W)
                      </span>
                      <span className="text-[10px] text-[#8c909f]">
                        리퀴드 메탈 도포 / 32GB DDR5 / 1TB NVMe
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#4cd7f6] bg-[#0a0e16] px-1.5 py-0.5 rounded border border-[#424754]">
                    TGP 175W
                  </span>
                </div>
              )}
            </div>

            {/* Live Telemetry Ticker Overlay */}
            <div className="w-full flex flex-wrap items-center justify-around gap-x-3 gap-y-1 bg-[#181c24]/90 border border-[#424754] rounded-lg p-2 mt-4 text-[11px] font-label z-20">
              <span className="text-[#8c909f] w-full text-center lg:w-auto lg:text-left">예시 수치</span>
              <span className="text-[#8c909f]">
                GPU 다이: <span className="text-[#4cd7f6] font-bold">64°C</span>
              </span>
              <span className="text-[#8c909f]">
                CPU 패키지: <span className="text-[#adc6ff] font-bold">68°C</span>
              </span>
              <span className="text-[#8c909f]">
                VRM 전원부: <span className="text-[#dfe2ee] font-bold">58°C</span>
              </span>
              <span className="text-[#8c909f]">
                소음도: <span className="text-[#ec6a06] font-bold">42.4 dB</span>
              </span>
            </div>
          </div>

          {/* Controls & Inspection Sidebar */}
          <div className="w-full lg:w-72 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-label text-[#8c909f] uppercase block mb-1.5 font-bold">
                  분해 레이어 필터
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-label">
                  <button
                    type="button"
                    onClick={() => setActiveLayer('all')}
                    className={`min-h-11 px-2 rounded border transition-colors cursor-pointer ${ activeLayer === 'all' ? 'bg-[#4cd7f6] text-[#001f26] font-bold border-[#4cd7f6]' : 'bg-[#181c24] text-[#c2c6d6] border-[#424754]' }`}
                  >
                    전체 통합 뷰
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer('thermal')}
                    className={`min-h-11 px-2 rounded border transition-colors cursor-pointer ${ activeLayer === 'thermal' ? 'bg-[#4cd7f6] text-[#001f26] font-bold border-[#4cd7f6]' : 'bg-[#181c24] text-[#c2c6d6] border-[#424754]' }`}
                  >
                    베이퍼 챔버
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer('pcb')}
                    className={`min-h-11 px-2 rounded border transition-colors cursor-pointer ${ activeLayer === 'pcb' ? 'bg-[#4cd7f6] text-[#001f26] font-bold border-[#4cd7f6]' : 'bg-[#181c24] text-[#c2c6d6] border-[#424754]' }`}
                  >
                    실리콘 다이/PCB
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLayer('chassis')}
                    className={`min-h-11 px-2 rounded border transition-colors cursor-pointer ${ activeLayer === 'chassis' ? 'bg-[#4cd7f6] text-[#001f26] font-bold border-[#4cd7f6]' : 'bg-[#181c24] text-[#c2c6d6] border-[#424754]' }`}
                  >
                    알루미늄 섀시
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-label mb-1">
                  <span className="text-[#8c909f]">팬 풍량 시뮬레이션</span>
                  <span className="text-[#4cd7f6] font-bold">{fanSpeed} RPM</span>
                </div>
                <input
                  type="range"
                  aria-label="팬 풍량 시뮬레이션 (RPM)"
                  min="2000"
                  max="6200"
                  step="200"
                  value={fanSpeed}
                  onChange={(e) => setFanSpeed(Number(e.target.value))}
                  className="w-full accent-[#4cd7f6] cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#0a0e16] border border-[#424754] rounded text-xs space-y-1">
                <span className="font-bold text-[#dfe2ee] block">핵심 엔지니어링 스펙:</span>
                <p className="text-[11px] text-[#8c909f]">
                  • 0.1mm 초극세 구리 핀 280매 레이저 마이크로 용접
                  <br />• 리퀴드 메탈(GaInSn 합금) 다이 직접 접촉
                  <br />• 6000시리즈 단조 CNC 유니바디 섀시
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSimRunning(!simRunning)}
              className="w-full min-h-11 bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] border border-[#4cd7f6] rounded font-label text-xs font-bold transition-all cursor-pointer"
            >
              {simRunning ? '시뮬레이션 일시 정지' : '시뮬레이션 재개'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
