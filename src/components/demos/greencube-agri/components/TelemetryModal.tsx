import React, { useState, useEffect } from 'react';

interface TelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryModal: React.FC<TelemetryModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'towerA' | 'towerB' | 'sejong'>('towerA');
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#bccac0] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#bccac0]/30 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#006948]/10 text-[#006948] flex items-center justify-center">
              <span className="material-symbols-outlined">vital_signs</span>
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold text-[#131b2e]">
                실시간 바이오스피어 SCADA 텔레메트리
              </h3>
              <p className="font-mono text-xs text-[#006948] font-semibold">
                SCADA CORE ENGINE v8.4 // LIVE GRID STREAMING
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6d7a72] hover:text-[#131b2e] hover:bg-gray-100 transition cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#bccac0]/20 px-6 pt-3 gap-2 bg-[#f2f3ff]">
          {[
            { id: 'towerA', label: '진천 제1 기가팜 타워 A (버터헤드 라인)' },
            { id: 'towerB', label: '진천 제1 기가팜 타워 B (로메인 라인)' },
            { id: 'sejong', label: '세종 AI R&D 연구소 (바이오 의약용)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`font-mono text-xs py-2 px-3 rounded-t-lg transition cursor-pointer ${ activeTab === tab.id ? 'bg-white text-[#006948] font-bold border-t-2 border-[#006948]' : 'text-[#3d4a42] hover:text-[#131b2e]' }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6">
          {/* Diagnostic Status Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">클린룸 양압 차압</span>
              <span className="text-lg font-bold text-[#006948]">
                {(18.2 + (ticks % 3) * 0.1).toFixed(1)} Pa
              </span>
              <span className="text-[10px] text-[#006948] block">정상 유지 (기준 &gt; 15Pa)</span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">공기 순환 횟수</span>
              <span className="text-lg font-bold text-[#00687a]">48.5 ACH</span>
              <span className="text-[10px] text-[#00687a] block">ISO 1000 클린룸</span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">양액 pH 밸런스</span>
              <span className="text-lg font-bold text-[#131b2e]">
                {(5.82 + ((ticks % 4) - 2) * 0.01).toFixed(2)}
              </span>
              <span className="text-[10px] text-[#006948] block">최적 흡수 범위</span>
            </div>

            <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#bccac0]/40">
              <span className="text-[10px] text-[#6d7a72] block">용존산소량 (DO)</span>
              <span className="text-lg font-bold text-[#00855b]">
                {(8.4 + (ticks % 2) * 0.1).toFixed(1)} mg/L
              </span>
              <span className="text-[10px] text-[#00855b] block">초포화 에어로포닉스</span>
            </div>
          </div>

          {/* Subsystem health details */}
          <div className="p-4 rounded-xl border border-[#bccac0]/40 bg-white space-y-3 font-mono text-xs">
            <h4 className="font-headline font-bold text-sm text-[#131b2e]">
              서브시스템 자율 관제 상태 (Autonomous Diagnostics)
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
                  초음파 에어로포닉스 분무 노즐 어레이
                </span>
                <span className="text-[#006948] font-bold">1,280/1,280 노즐 정상 분사</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
                  HEPA H14 필터 차압 및 청정도
                </span>
                <span className="text-[#006948] font-bold">0.3µm 입자 포집률 99.997%</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-lg">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00687a]"></span>
                  AI 멀티스펙트럼 LED 드라이버 전력망
                </span>
                <span className="text-[#00687a] font-bold">RE100 태양광 ESS 연계 100% 가동</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#bccac0]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#006948] text-white font-mono text-xs rounded-lg hover:bg-[#00855d] transition cursor-pointer"
          >
            모니터링 창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
