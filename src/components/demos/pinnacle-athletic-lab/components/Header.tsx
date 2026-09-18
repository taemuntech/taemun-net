import React, { useState, useEffect } from 'react';
import { Bolt, User, ShieldCheck } from 'lucide-react';
import { LAB_IMAGES } from '../data/labData';

interface HeaderProps {
  activeNav: string;
  onSelectNav: (path: string) => void;
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeNav,
  onSelectNav,
  onBookClick,
}) => {
  const [precisionTime, setPrecisionTime] = useState('00:10.284');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    let t = 10.284;
    const timer = setInterval(() => {
      t += 0.013;
      if (t > 15.0) t = 10.12;
      setPrecisionTime(`00:${t.toFixed(3)}`);
    }, 55);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'track-and-field-lab', label: '01. TRACK & FIELD LAB' },
    { id: 'score-converter', label: '02. SCORE CONVERTER' },
    { id: 'biomechanics-3d', label: '03. BIOMECHANICS 3D' },
    { id: 'cohort-records', label: '04. COHORT RECORDS' },
    { id: 'admissions-diagnostic', label: '05. ADMISSIONS DIAGNOSTIC' },
  ];

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 w-full z-50 bg-[#131313]/95 backdrop-blur-md border-b border-[#2a2a2a] shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
      <div className="h-20 w-full px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4 lg:gap-6">
          <div
            onClick={() => onSelectNav('track-and-field-lab')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              alt="Pinnacle Athletic Lab Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={LAB_IMAGES.logo}
            />
            <div className="flex flex-col">
              <span className="font-sans text-[20px] lg:text-[22px] font-bold tracking-tight text-[#ffffff] leading-none">
                PINNACLE
              </span>
              <span className="font-telemetry text-[10px] text-[#e7bdb2] tracking-wider uppercase leading-tight mt-0.5">
                Athletic Lab // Spec Grade
              </span>
            </div>
          </div>

          {/* Active Sensor Live Hardware Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-[#1c1b1b] border border-[#2a2a2a]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#c3f400] animate-pulse"></span>
            <span className="font-telemetry text-[11px] text-[#c3f400] font-bold tracking-wider">
              1,000Hz OPTOTRAK ACTIVE // SENSOR SYNC 0.001s
            </span>
          </div>
        </div>

        {/* Center: Monolithic Tactical Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                className={`px-3.5 py-2 font-telemetry text-[12px] font-bold tracking-wider uppercase transition-all duration-150 ${
                  isActive
                    ? 'bg-[#ff5625] text-[#541100] shadow-[2px_2px_0px_#000000]'
                    : 'text-[#9e9b9a] hover:bg-[#2a2a2a] hover:text-[#ffffff]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Precision Telemetry HUD & Booking Action */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Precision Timer HUD */}
          <div className="hidden lg:flex items-center gap-3 bg-[#1c1b1b] px-3.5 py-1.5 border border-[#2a2a2a]">
            <div className="flex flex-col">
              <span className="font-telemetry text-[9px] text-[#9e9b9a] uppercase tracking-wider leading-none">
                PRECISION TIMER
              </span>
              <span className="font-telemetry text-[17px] text-[#c3f400] font-bold tabular-nums leading-tight">
                [{precisionTime}]
              </span>
            </div>
            <div className="flex flex-col border-l border-[#353534] pl-3">
              <span className="font-telemetry text-[9px] text-[#9e9b9a] uppercase tracking-wider leading-none">
                CALIB STATUS
              </span>
              <span className="font-telemetry text-[11px] text-[#ffffff] font-bold leading-tight flex items-center gap-1">
                <Bolt className="w-3 h-3 text-[#c3f400] fill-current" />
                99.8% READY
              </span>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onBookClick}
            className="hidden lg:inline-flex items-center justify-center bg-[#ff5625] hover:bg-[#ff7147] active:translate-y-0.5 text-[#541100] px-4 py-2 font-sans text-[13px] lg:text-[14px] font-bold tracking-tight shadow-[2px_2px_0px_#000000] transition-colors uppercase whitespace-nowrap cursor-pointer"
          >
            1:1 실기 진단평가 신청 (BOOK SENSOR AUDIT)
          </button>

          {/* Profile Operator Badge */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              title="센서 관제관 프로필"
              className="w-9 h-9 bg-[#ffb5a0] hover:bg-[#ffdbd1] text-[#601400] flex items-center justify-center transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[2.5]" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#1c1b1b] border border-[#2a2a2a] p-4 shadow-[4px_4px_0px_#000000] z-50">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#2a2a2a]">
                  <ShieldCheck className="w-4 h-4 text-[#c3f400]" />
                  <span className="font-telemetry text-[11px] text-[#c3f400] font-bold uppercase">
                    CERTIFIED BIOMECHANICS OPERATOR
                  </span>
                </div>
                <div className="font-sans text-[13px] text-[#ffffff] font-bold">
                  관제관: 박서연 책임연구원
                </div>
                <div className="font-telemetry text-[10px] text-[#9e9b9a] mt-0.5">
                  ID: PINNACLE-LAB-DAECHI #04
                </div>
                <div className="mt-3 pt-2 border-t border-[#2a2a2a] text-[11px] text-[#9e9b9a]">
                  실기 측정베이 1~4번 전 채널 1,000Hz 동기화 상태 정상 유지중.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
