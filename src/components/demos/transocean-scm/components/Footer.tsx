import React from 'react';
import { BRAND_LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020e21] border-t border-[#434655]/30 w-full px-4 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-10 border-b border-[#434655]/30">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                alt="TRANSOCEAN GLOBAL SCM Brand Logo"
                referrerPolicy="no-referrer"
                className="w-8 h-8 object-contain rounded border border-[#434655]/40 bg-[#0e1c2f] p-0.5"
                src={BRAND_LOGO_URL}
              />
              <span className="text-base font-bold text-white tracking-tight">
                TRANSOCEAN GLOBAL SCM
              </span>
            </div>
            <p className="text-xs text-[#c3c6d7] leading-relaxed">
              World-class autonomous container vessel operation, artificial intelligence port terminal infrastructure, and decarbonized intermodal supply chain orchestration.
            </p>

            {/* Certifications Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#132033] text-[#b4c5ff] border border-[#434655]/50">
                Carrier License 000-00000 (예시)
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#132033] text-[#b4c5ff] border border-[#434655]/50">
                IMO Reg. 0000000 (예시)
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#132033] text-emerald-400 border border-[#434655]/50">
                공급망 보안 프로토콜 (예시)
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#132033] text-[#ffb693] border border-[#434655]/50">
                통관 파트너 등급 (예시)
              </span>
            </div>
          </div>

          {/* Col 2: Global Hub Direct Terminals */}
          <div>
            <h4 className="font-mono text-xs text-[#ffb693] uppercase tracking-widest font-semibold mb-4">
              Global Hub Direct Terminals
            </h4>
            <ul className="space-y-2 text-xs text-[#c3c6d7]">
              <li>
                <a href="#hubsSection" className="hover:text-white hover:underline transition-all">
                  Busan Operational Hub (Terminal 4)
                </a>
              </li>
              <li>
                <a href="#hubsSection" className="hover:text-white hover:underline transition-all">
                  Rotterdam Gateway Terminal (Maasvlakte 2)
                </a>
              </li>
              <li>
                <a href="#hubsSection" className="hover:text-white hover:underline transition-all">
                  Singapore Maritime Hub (Tuas Port)
                </a>
              </li>
              <li>
                <a href="#hubsSection" className="hover:text-white hover:underline transition-all">
                  Los Angeles Operations (San Pedro Bay)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Marine Governance */}
          <div>
            <h4 className="font-mono text-xs text-[#ffb693] uppercase tracking-widest font-semibold mb-4">
              Governance &amp; Protocols
            </h4>
            <ul className="space-y-2 text-xs text-[#c3c6d7]">
              <li>
                <a href="#automationSection" className="hover:text-white hover:underline transition-all">
                  Maritime Compliance Protocols
                </a>
              </li>
              <li>
                <a href="#trackingSection" className="hover:text-white hover:underline transition-all">
                  EDI Telemetry Node Status
                </a>
              </li>
              <li>
                <a href="#rfpSection" className="hover:text-white hover:underline transition-all">
                  Marine Privacy &amp; Cyber Policies
                </a>
              </li>
              <li>
                <a href="#rfpSection" className="hover:text-white hover:underline transition-all">
                  Terms of Global Carriage (Incoterms 2020)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Telemetry Node Status */}
          <div>
            <h4 className="font-mono text-xs text-[#ffb693] uppercase tracking-widest font-semibold mb-4">
              System Telemetry Nodes (예시 수치)
            </h4>
            <div className="bg-[#0e1c2f] p-3.5 rounded border border-[#434655]/40 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8d90a0]">ANSI X12 Gateway:</span>
                <span className="text-emerald-400 font-semibold">99.99% ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8d90a0]">UN/EDIFACT EDI:</span>
                <span className="text-emerald-400 font-semibold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8d90a0]">AIS LEO Latency:</span>
                <span className="text-[#b4c5ff] font-semibold">48 ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8d90a0]">Active Tracked Units:</span>
                <span className="text-white font-semibold">1,850,214 TEU</span>
              </div>
            </div>
          </div>
        </div>

        {/* 접을 수 없는 자리에 남는 고지 — 이 화면은 가상 브랜드 샘플이다 */}
        <p className="pt-6 text-center lg:text-left text-xs text-[#c3c6d7]">
          이 사이트는 <strong className="font-bold text-white">태문 DEV STUDIO 가 만든 가상 브랜드 샘플</strong>입니다. 실제 업체가
          아니며 화면의 회사·선박·항만 운영 수치·연락처는 모두 예시입니다.
        </p>

        {/* Bottom Disclaimers */}
        <div className="pt-4 flex flex-col lg:flex-row justify-between items-center text-[#8d90a0] font-mono text-xs gap-3">
          <p className="text-center lg:text-left">
            &copy; 2025 Transocean Global SCM (가상 브랜드). 태문 DEV STUDIO 샘플 화면입니다.
          </p>
          <div className="flex flex-wrap justify-center space-x-4">
            <span>B/L STANDARD: TOCU-2025 (예시)</span>
            <span className="text-[#b4c5ff]">KOREA • NETHERLANDS • SINGAPORE • USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
