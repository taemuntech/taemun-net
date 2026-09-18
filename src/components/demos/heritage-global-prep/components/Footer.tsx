'use client';
import React from 'react';
import { ScreenTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ScreenTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-[#efeeea] border-t-2 border-black mt-16 text-black">
      <div className="w-full px-4 lg:px-8 lg:px-14 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 border-b border-black/20 pb-8">
          <div className="lg:col-span-2">
            <h2 className="font-display text-[26px] leading-[32px] uppercase text-black tracking-tight font-bold mb-2">
              THE HERITAGE REGISTRY
            </h2>
            <p className="font-serif text-[16px] text-[#444748] max-w-xl italic leading-relaxed">
              Established for the preservation of rigorous academic standards, classical admissions
              scholarship, and definitive standardized prep for candidates to Cambridge, New Haven,
              and the Ivy League.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider font-bold text-black mb-3">
              COHORT GAZETTES
            </h3>
            <ul className="space-y-1.5 font-serif text-[14px] text-[#444748]">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('dispatch')}
                  className="hover:text-[#aa304f] transition-colors text-left"
                >
                  The Cambridge &amp; Boston Report
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('calculator')}
                  className="hover:text-[#aa304f] transition-colors text-left"
                >
                  Upper Percentile Mathematical Dissections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('essay')}
                  className="hover:text-[#aa304f] transition-colors text-left"
                >
                  Admissions Committee Internal Records
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectTab('roster')}
                  className="hover:text-[#aa304f] transition-colors text-left"
                >
                  Wharton &amp; Columbia Casefolio Analysis
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider font-bold text-black mb-3">
              INSTITUTIONAL OFFICES
            </h3>
            <p className="font-serif text-[14px] text-[#444748] leading-relaxed">
              Cambridge Office (예시): 120 Brattle St, Cambridge, MA
              <br />
              New York Dispatch: 590 Madison Ave, New York, NY
            </p>
            <p className="font-mono text-[11px] uppercase mt-3 text-[#aa304f] font-bold tracking-wider">
              SECURE ADMISSIONS TELETYPE
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between text-[#444748] font-mono text-[11px] uppercase tracking-wider gap-4">
          <p className="text-center lg:text-left">
            © 1892–2025 HERITAGE GLOBAL PREP PRESS. ALL RIGHTS RESERVED IN ACCORDANCE WITH BROADSHEET
            ARCHIVAL CONVENTIONS.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-black cursor-pointer">PROVOST CERTIFICATION</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">REGISTER ARCHIVES</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">HONOR SYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
