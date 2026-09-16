import React from 'react';
import { LOGO_IMG_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-6 lg:px-12 max-w-7xl mx-auto bg-[#eff4ff]/60 border-t border-[#c4c5d5]/40 mt-12 rounded-t-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Col 1: Brand & KOSDAQ Badge */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <img
              alt="Celebris Biopharma Logo"
              className="h-8 w-8 object-contain rounded shadow-xs"
              src={LOGO_IMG_URL}
              referrerPolicy="no-referrer"
            />
            <span className="text-[20px] font-bold text-[#00288e] tracking-tight">
              CELEBRIS BIOPHARMA
            </span>
          </div>
          <p className="text-[13px] text-[#444653] max-w-sm leading-relaxed">
            Next-Generation Targeted Protein Degradation (TPD) & Multispecific ADC Biotherapeutics.
          </p>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white border border-[#c4c5d5]/50 font-code-mono text-[11px] text-[#00288e] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af] animate-pulse"></span>
            <span>KOSDAQ Listed Prep Stage • DART Verified</span>
          </div>
        </div>

        {/* Col 2: Locations & Campuses */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[11px] font-code-mono text-[#757684] uppercase font-bold tracking-wider">
            R&D Facilities & Headquarters
          </div>
          <div className="text-[13px] text-[#0b1c30] space-y-3">
            <div>
              <strong className="font-semibold text-[#00288e]">
                인천 송도 바이오클러스터 본사 & cGMP 캠퍼스
              </strong>
              <div className="text-[#444653] mt-0.5">
                인천광역시 연수구 송도바이오대로 123 셀레브리스 바이오타워 1-8F
              </div>
            </div>
            <div>
              <strong className="font-semibold text-[#00687a]">
                미국 보스턴 R&D 이노베이션 센터
              </strong>
              <div className="text-[#444653] mt-0.5">
                Kendall Square Bio-Hub Suite 940, Cambridge, MA 02142, USA
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Institutional Links */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[11px] font-code-mono text-[#757684] uppercase font-bold tracking-wider">
            Institutional Disclosures
          </div>
          <div className="grid grid-cols-2 gap-2 text-[13px]">
            <a className="text-[#444653] hover:text-[#00288e] transition-colors" href="#vision">
              Songdo Bio-Cluster HQ
            </a>
            <a className="text-[#444653] hover:text-[#00288e] transition-colors" href="#infrastructure">
              Boston R&D Center
            </a>
            <a className="text-[#444653] hover:text-[#00288e] transition-colors" href="#pipeline">
              DART IR Filing
            </a>
            <a className="text-[#444653] hover:text-[#00288e] transition-colors" href="#sab">
              Clinical Governance
            </a>
            <a className="text-[#444653] hover:text-[#00288e] transition-colors" href="#infrastructure">
              cGMP Certificates
            </a>
            <a className="text-[#444653] hover:text-[#00288e] transition-colors" href="#wizard">
              Privacy & Legal
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[#c4c5d5]/30 flex flex-col lg:flex-row items-center justify-between text-[12px] text-[#444653] gap-4">
        <div className="font-code-mono text-center lg:text-left">
          © 2025 CELEBRIS BIOPHARMA Inc. All Rights Reserved. Songdo Bio-Cluster HQ & Boston Innovation Center. KOSDAQ Listed Prep Stage.
        </div>
        <div className="flex flex-wrap justify-center space-x-6 font-code-mono text-[12px]">
          <a className="hover:text-[#00288e] transition" href="#vision">Terms of Research</a>
          <a className="hover:text-[#00288e] transition" href="mailto:ir@celebrisbio.com">IR: ir@celebrisbio.com</a>
          <a className="hover:text-[#00288e] transition" href="mailto:bd@celebrisbio.com">BD: bd@celebrisbio.com</a>
        </div>
      </div>
    </footer>
  );
};
