import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, Activity } from 'lucide-react';
import { CLEANROOM_IMG_URL, TRUST_METRICS } from '../data/mockData';

interface HeroProps {
  onOpenMoAModal: () => void;
  onOpenDeckModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMoAModal, onOpenDeckModal }) => {
  // Live simulated particle count
  const [particleCount, setParticleCount] = useState(2.8);
  const [phLevel, setPhLevel] = useState(7.24);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticleCount(prev => Number((2.8 + (Math.random() * 0.4 - 0.2)).toFixed(2)));
      setPhLevel(prev => Number((7.24 + (Math.random() * 0.04 - 0.02)).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 cleanroom-grid relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Status Chip */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#c4c5d5]/50 shadow-xs mb-6">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="w-2 h-2 rounded-full bg-[#1e40af] animate-ping absolute"></span>
            <span className="w-2 h-2 rounded-full bg-[#1e40af] relative"></span>
          </div>
          <span className="text-[11px] font-code-mono text-[#00288e] font-bold tracking-tight">
            TECH LISTING PREPARATION • PRIORITY REVIEW TRACK (예시 표기)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-[36px] ] lg:text-[54px] font-bold text-[#0b1c30] leading-[1.18] tracking-tight">
              분자 표적의 정밀 분해로 여는<br />
              <span className="text-[#1e40af]">난치성 암 치료의 새로운 패러다임</span>
            </h1>
            <p className="text-[16px] ] text-[#444653] max-w-2xl leading-relaxed">
              자체 AI 신약 발굴 엔진 <strong className="text-[#0b1c30] font-semibold">'PROTEA-AI'</strong>를 통한 차세대 표적 단백질 분해제(TPD) 및 고효율 다중특이성 ADC 파이프라인. 글로벌 탑티어 제약사 기술이전(L/O) 및 글로벌 5개국 임상 2상이 순항 중입니다.
            </p>

            <div className="flex flex-col lg:flex-row gap-4 pt-2">
              <button
                onClick={onOpenDeckModal}
                className="inline-flex items-center justify-center space-x-2 bg-[#1e40af] hover:bg-[#00288e] text-white px-6 py-3.5 rounded-lg text-[14px] font-semibold transition shadow-sm active:scale-98 cursor-pointer"
              >
                <span>글로벌 임상 파이프라인 덱 신청</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenMoAModal}
                className="inline-flex items-center justify-center space-x-2 bg-white border border-[#c4c5d5]/60 hover:bg-[#eff4ff] text-[#0b1c30] px-6 py-3.5 rounded-lg text-[14px] font-medium transition cursor-pointer shadow-xs active:scale-98"
              >
                <PlayCircle className="w-5 h-5 text-[#1e40af]" />
                <span>3D 분자 작용 기전(MoA) 영상 보기</span>
              </button>
            </div>
          </div>

          {/* High-Key Lab Hero Visual with Telemetry */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#c4c5d5]/40 shadow-lg bg-white group">
              <img
                alt="Songdo cGMP Cleanroom Suite 03 Cell Cultivation Suite"
                className="w-full h-auto object-cover object-center max-h-[440px] transform group-hover:scale-102 transition-transform duration-700"
                src={CLEANROOM_IMG_URL}
                referrerPolicy="no-referrer"
              />

              {/* Cleanroom Telemetry Floating Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-lg border border-[#c4c5d5]/40 shadow-md">
                <div className="flex items-center justify-between border-b border-[#c4c5d5]/30 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6] animate-beacon"></span>
                    <span className="text-[11px] font-code-mono text-[#00288e] font-bold">
                      SONGDO cGMP SUITE 03
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px] font-code-mono text-[#00687a] font-bold">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>LIVE TELEMETRY</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-code-mono text-[#444653]">
                  <div>2,000L S.U.B.: <span className="text-[#0b1c30] font-semibold">Active (pH {phLevel})</span></div>
                  <div>Particulate: <span className="text-[#005236] font-semibold">ISO Class 5 ({particleCount} pt/m³)</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Trust Metrics Bar */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-[#c4c5d5]/40 shadow-xs hover:border-[#b8c4ff] hover:shadow-sm transition-all"
            >
              <div className="text-[11px] font-code-mono text-[#757684] mb-1 font-medium tracking-wide">
                {metric.label}
              </div>
              <div className={`text-[30px] font-bold ${metric.colorClass} mb-1 tracking-tight`}>
                {metric.value}
              </div>
              <div className="text-[13px] text-[#444653]">
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
