'use client';
import React, { useState } from 'react';
import { ScreenTab } from '../types';
import { CREST_IMAGE_URL } from '../data/admissionsData';
import { User, CheckCircle2, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  onRequestAudit: () => void;
  dossierCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onRequestAudit,
  dossierCount = 3,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] left-0 w-full z-50 bg-[#fbf9f5] border-b border-[#000000]">
      <div className="w-full px-4 lg:px-8 lg:px-14 pt-2 pb-0">
        <div className="max-w-7xl mx-auto flex flex-col justify-between">
          {/* Top Dateline & Gazette Folio Bar */}
          <div className="border-b border-[#000000]/40 pb-1.5 flex items-center justify-between text-[#444748] font-mono text-[11px] tracking-widest uppercase">
            <span className="font-semibold text-[#1b1c1a]">VOL. CXLII... No. 52,890</span>
            <span className="hidden hidden lg:inline">
              SPECIAL IVY LEAGUE COHORT DISPATCH · THE NEW YORK &amp; BOSTON ACADEMIC RECORD
            </span>
            <div className="flex items-center gap-2">
              <span>PRICE $5.00</span>
              <div className="relative">
                <button
                  type="button"
                  id="dean-profile-toggle"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white hover:bg-[#aa304f] transition-colors focus:outline-none"
                  title="Archival Docket & Dean Access"
                  aria-label="Dean Profile"
                >
                  <User size={15} />
                </button>

                {showProfileMenu && (
                  <div
                    id="dean-profile-popover"
                    className="absolute right-0 mt-2 w-72 bg-[#fbf9f5] border-2 border-black p-4 shadow-xl z-50 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-black/20 pb-2 mb-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#aa304f]">
                        SENATE LEDGER CREDENTIALS
                      </span>
                      <span className="bg-black text-white text-[9px] font-mono px-1.5 py-0.5 uppercase font-bold">
                        VERIFIED
                      </span>
                    </div>
                    <p className="font-serif text-[15px] font-bold text-black leading-snug">
                      Provost Registry Access
                    </p>
                    <p className="font-serif text-[12px] italic text-[#444748] mb-3">
                      H-Yard (예시), Brattle St. Bureau
                    </p>
                    <div className="space-y-1.5 text-[11px] font-mono border-t border-black/10 pt-2">
                      <div className="flex justify-between">
                        <span className="text-[#444748]">ACTIVE DOSSIERS:</span>
                        <strong className="text-black">{dossierCount} PROFILES</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#444748]">ACADEMIC INDEX:</span>
                        <strong className="text-[#aa304f]">239/240 MEDIAN</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#444748]">ENCRYPTION:</span>
                        <strong className="text-black">DEAN PRIVILEGE</strong>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        onRequestAudit();
                      }}
                      className="w-full mt-3 bg-black hover:bg-[#aa304f] text-white font-mono text-[10px] py-1.5 uppercase tracking-wider font-bold transition-colors"
                    >
                      Open Candidate Registry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Masthead & Heraldic Crest */}
          <div className="py-2.5 flex items-center justify-between gap-4">
            <div className="hidden lg:flex flex-col text-left flex-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#aa304f] font-bold">
                REGISTER EST. 1892
              </span>
              <span className="font-display text-[22px] leading-[26px] text-black italic">
                Ivy League Enrollment Ledger
              </span>
            </div>

            <div
              className="flex items-center justify-center gap-3 lg:gap-4 flex-none cursor-pointer"
              onClick={() => onSelectTab('dispatch')}
            >
              <img
                alt="Heritage Global Prep Crest & Masthead"
                className="h-8 lg:h-10 w-auto object-contain"
                src={CREST_IMAGE_URL}
                loading="eager"
              />
              <div className="text-center">
                <h1 className="font-display text-[24px] lg:text-[34px] lg:text-[38px] lg:text-[42px] font-bold tracking-tight text-black uppercase leading-none">
                  HERITAGE GLOBAL PREP
                </h1>
                <p className="font-serif text-[13px] lg:text-[16px] lg:text-[18px] italic text-[#444748] text-center hidden hidden lg:block mt-0.5">
                  An Institutional Gazette of Academic Strategy &amp; Matriculation
                </p>
              </div>
            </div>

            <div className="hidden lg:flex flex-col text-right items-end flex-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#444748]">
                CODE DISPATCH 2025
              </span>
              <span className="font-display text-[22px] leading-[26px] text-black">
                Digital SAT Codes
              </span>
            </div>
          </div>

          {/* Broadsheet Tab Navigation Bar */}
          <div className="border-t-2 border-b border-black py-1.5 flex items-center justify-between gap-2 overflow-x-auto">
            <nav
              aria-label="Broadsheet Navigation"
              className="flex items-center overflow-x-auto whitespace-nowrap gap-2 lg:gap-4 scrollbar-none"
            >
              <button
                type="button"
                id="nav-tab-dispatch"
                onClick={() => onSelectTab('dispatch')}
                className={`transition-colors py-1 px-2 font-mono text-[11px] tracking-wider uppercase ${
                  currentTab === 'dispatch'
                    ? 'bg-black text-white font-bold'
                    : 'text-[#444748] hover:text-black'
                }`}
              >
                I. THE DISPATCH (COVER STORY)
              </button>
              <span className="text-[#c4c7c7] select-none text-[11px]">/</span>

              <button
                type="button"
                id="nav-tab-calculator"
                onClick={() => onSelectTab('calculator')}
                className={`transition-colors py-1 px-2 font-mono text-[11px] tracking-wider uppercase ${
                  currentTab === 'calculator'
                    ? 'bg-black text-white font-bold'
                    : 'text-[#444748] hover:text-black'
                }`}
              >
                II. SAT 1600 CALCULATOR
              </button>
              <span className="text-[#c4c7c7] select-none text-[11px]">/</span>

              <button
                type="button"
                id="nav-tab-essay"
                onClick={() => onSelectTab('essay')}
                className={`transition-colors py-1 px-2 font-mono text-[11px] tracking-wider uppercase ${
                  currentTab === 'essay'
                    ? 'bg-black text-white font-bold'
                    : 'text-[#444748] hover:text-black'
                }`}
              >
                III. ESSAY DISSECTION
              </button>
              <span className="text-[#c4c7c7] select-none text-[11px]">/</span>

              <button
                type="button"
                id="nav-tab-roster"
                onClick={() => onSelectTab('roster')}
                className={`transition-colors py-1 px-2 font-mono text-[11px] tracking-wider uppercase ${
                  currentTab === 'roster'
                    ? 'bg-black text-white font-bold'
                    : 'text-[#444748] hover:text-black'
                }`}
              >
                IV. IVY CREST ROSTER
              </button>
              <span className="text-[#c4c7c7] select-none text-[11px]">/</span>

              <button
                type="button"
                id="nav-tab-registry"
                onClick={() => onSelectTab('registry')}
                className={`transition-colors py-1 px-2 font-mono text-[11px] tracking-wider uppercase ${
                  currentTab === 'registry'
                    ? 'bg-black text-white font-bold'
                    : 'text-[#444748] hover:text-black'
                }`}
              >
                V. DEAN'S REGISTRY 2025-2026
              </button>
            </nav>

            <div className="flex-none pl-2">
              <button
                type="button"
                id="header-cta-audit"
                onClick={onRequestAudit}
                className="inline-block bg-[#aa304f] text-white px-3 lg:px-4 py-1.5 font-mono text-[10px] lg:text-[11px] uppercase tracking-wider font-bold hover:bg-[#6f0028] transition-colors border border-[#aa304f] whitespace-nowrap shadow-sm"
              >
                REQUEST AUDIT &amp; PORTFOLIO REVIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
