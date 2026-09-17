import React from 'react';
import Image from 'next/image';
import { ShieldAlert, ArrowDownCircle, HardHat, FileText } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0d1117] text-white border-b border-[#30363d]">
      {/* Background Subterranean Cross-Section Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/terra-core/desktop.png"
          alt="테라코어 대심도 TBM 터널 수직 단면도 (가상 연출 그래픽)"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 object-center"
        />
        {/* Engineering Grid & Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-[#0d1117]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-transparent to-[#0d1117]" />
        
        {/* Subtle Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ff6b2b 1px, transparent 1px), linear-gradient(to bottom, #ff6b2b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Category & Status Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-[#ff6b2b]/15 border border-[#ff6b2b]/40 text-[#ff6b2b] text-xs font-mono font-semibold tracking-widest uppercase mb-8 shadow-inner">
          <HardHat className="w-3.5 h-3.5 text-[#ff6b2b]" />
          <span>MEGA SUBTERRANEAN INFRASTRUCTURE &amp; TBM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b] animate-pulse"></span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl lg:text-6xl font-black font-mono tracking-tight text-white max-w-4xl leading-tight lg:leading-[1.15] mb-6">
          도시 아래 침묵의 거인을 깨우다, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b2b] via-[#ffa366] to-[#f4d03f]">
            대심도 지중 엔지니어링
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm lg:text-lg text-[#8b949e] max-w-2xl font-sans font-normal leading-relaxed mb-10">
          지상 0m 도심부터 지하 80m 경암층까지, 14.2m 초대구경 쉴드 TBM과 수밀 차수 공법으로
          완성하는 대한민국 지하 대동맥 메가 토목 인프라입니다.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
          <button
            onClick={onOpenConsultation}
            className="w-full lg:w-auto px-8 py-4 rounded bg-[#ff6b2b] hover:bg-[#ff8246] text-black font-mono font-bold text-sm tracking-wider flex items-center justify-center space-x-2 shadow-xl hover:shadow-[#ff6b2b]/30 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>대심도 기술 제안 의뢰</span>
          </button>
          <a
            href="#strata-hud"
            className="w-full lg:w-auto px-8 py-4 rounded bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white font-mono font-semibold text-sm tracking-wider flex items-center justify-center space-x-2 border border-[#30363d] transition-all"
          >
            <ArrowDownCircle className="w-4 h-4 text-[#ff6b2b]" />
            <span>지하 80m 수직 단면 탐사</span>
          </a>
        </div>

        {/* 4 Telemetry Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl border-t border-[#30363d]/80 pt-10">
          <div className="p-4 rounded bg-[#161b22]/80 border border-[#30363d] text-left font-mono">
            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block mb-1">
              MAX EXCAVATION DEPTH
            </span>
            <div className="text-xl lg:text-2xl font-black text-white">
              -80.0m <span className="text-xs font-normal text-[#8b949e]">(예시)</span>
            </div>
            <span className="text-[11px] text-[#ff6b2b] mt-1 block">대심도 경암층 관통</span>
          </div>

          <div className="p-4 rounded bg-[#161b22]/80 border border-[#30363d] text-left font-mono">
            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block mb-1">
              TBM CUTTER DIAMETER
            </span>
            <div className="text-xl lg:text-2xl font-black text-white">
              14.2m <span className="text-xs font-normal text-[#8b949e]">(예시)</span>
            </div>
            <span className="text-[11px] text-[#ff6b2b] mt-1 block">초대구경 쉴드 머신</span>
          </div>

          <div className="p-4 rounded bg-[#161b22]/80 border border-[#30363d] text-left font-mono">
            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block mb-1">
              TOTAL THRUST FORCE
            </span>
            <div className="text-xl lg:text-2xl font-black text-white">
              220,000 kN <span className="text-xs font-normal text-[#8b949e]">(예시)</span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">유압 추진 제어</span>
          </div>

          <div className="p-4 rounded bg-[#161b22]/80 border border-[#30363d] text-left font-mono">
            <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block mb-1">
              HYDROSTATIC RESISTANCE
            </span>
            <div className="text-xl lg:text-2xl font-black text-white">
              10 bar <span className="text-xs font-normal text-[#8b949e]">(예시)</span>
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 block">완전 수밀 120년 방수</span>
          </div>
        </div>
      </div>
    </section>
  );
};
