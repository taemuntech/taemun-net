import React from 'react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="bg-[#0b0e13] border-t border-[#3b494c]/40 text-[#bac9cc]"
    >
      <div className="w-full px-6 lg:px-12 py-10 max-w-[1720px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        {/* Brand and Legal */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded border border-[#00e5ff]/40 p-0.5 bg-[#1d2025]">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Vfapt3CAgxnMQ5fSg-h_yZdJQOjQiRF3FYJvRx9sRg16uGwVJ9hzT3XgtCKxbyWON1K3Tcy4ewnGBKyoVkzZp99aP5Vwd8CrEoiWQUch8Qdn6MYbpoAI3x29LlTPM1_Mpj8zD7CMBfB4rD7JFZTbGSYPlXdlPcRTQTMy1NNB6snxpIx99ohMowlH4hsbfQ_5CSKL4sLkwNia7jMdta5W7_2P1CXZqyz7c5F2eTWJqJQvmPEUKXlnIa5w"
                alt="VOLTRON Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display text-sm font-bold text-[#c3f5ff] uppercase">
              VOLTRON ADVANCED EV
            </span>
          </div>

          <p className="font-code text-[11px] text-[#bac9cc]">
            © 2025 VOLTRON DYNAMICS AG // TIER-1 POWERTRAIN ARCHITECTURE // CLASSIFIED ISO-26262 ASIL-D
          </p>

          <div className="flex flex-wrap items-center gap-3 text-[10px] font-code text-[#849396]">
            <span>STUTTGART R&amp;D HUB</span>
            <span>•</span>
            <span>PANGYO SEMICONDUCTOR FAB (KR)</span>
            <span>•</span>
            <span>SILICON VALLEY AUTONOMOUS LAB (USA)</span>
          </div>
        </div>

        {/* Links Column / Cluster */}
        <div className="flex flex-wrap items-center gap-6 font-display text-[10px] tracking-wider uppercase text-[#bac9cc]">
          <button
            onClick={() => scrollTo('sic-semiconductor')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            SIC WAFER SPECS
          </button>
          <button
            onClick={() => scrollTo('charging-sim')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            THERMAL MODELING
          </button>
          <button
            onClick={() => scrollTo('powertrain')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            ASIL-D TELEMETRY
          </button>
          <button
            onClick={() => scrollTo('rfq-wizard')}
            className="text-[#00e5ff] font-bold hover:underline transition-colors cursor-pointer"
          >
            CONFIDENTIAL RFQ PORTAL
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            ITAR / OEM COMPLIANCE
          </button>
          <button
            onClick={() => {
              alert('All telemetry logs are retained in volatile RAM and cryptographically erased every 48 hours in accordance with ISO/SAE 21434.');
            }}
            className="hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            DATA RETENTION PROTOCOL
          </button>
        </div>
      </div>
    </footer>
  );
};
