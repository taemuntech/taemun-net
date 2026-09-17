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
            © 2026 VOLTRON DYNAMICS AG // TIER-1 POWERTRAIN ARCHITECTURE // ISO-26262 ASIL-D 표기 (예시)
          </p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-code text-[#849396]">
            <span className="text-[#5be9ad]">거점 (예시 표기)</span>
            <span>•</span>
            <span>STUTTGART R&amp;D HUB</span>
            <span>•</span>
            <span>PANGYO SEMICONDUCTOR FAB (KR)</span>
            <span>•</span>
            <span>SILICON VALLEY AUTONOMOUS LAB (USA)</span>
          </div>

          {/* 샘플 고지 — 접을 수 없는 자리에 남긴다(?embed=true 로 화면만 직접 열어도 보인다) */}
          <div className="max-w-2xl rounded-lg border border-[#3b494c]/50 bg-[#101319] px-4 py-3 text-[11px] leading-relaxed text-[#e1e2ea] [word-break:keep-all]">
            <span className="font-bold text-[#c3f5ff]">
              이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
            </span>{' '}
            화면의 회사 이름·성능 수치·인증 표기·거점·연락처는 모두 예시이며, 백서 신청·견적 요청 폼은 접수되지 않습니다.
          </div>
        </div>

        {/* Links Column / Cluster */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-display text-[10px] tracking-wider uppercase text-[#bac9cc]">
          <button
            onClick={() => scrollTo('sic-semiconductor')}
            className="flex items-center min-h-11 lg:min-h-0 lg:py-1 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            SIC WAFER SPECS
          </button>
          <button
            onClick={() => scrollTo('charging-sim')}
            className="flex items-center min-h-11 lg:min-h-0 lg:py-1 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            THERMAL MODELING
          </button>
          <button
            onClick={() => scrollTo('powertrain')}
            className="flex items-center min-h-11 lg:min-h-0 lg:py-1 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            ASIL-D TELEMETRY
          </button>
          <button
            onClick={() => scrollTo('rfq-wizard')}
            className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-[#00e5ff] font-bold hover:underline transition-colors cursor-pointer"
          >
            CONFIDENTIAL RFQ PORTAL
          </button>
          {/*
            두 링크가 똑같이 #certifications 로 가서 「눌러도 같은 데」였다. 게다가 「DATA RETENTION PROTOCOL」은
            개인정보 보존정책처럼 읽히는데 도착지에는 그런 내용이 없었다 —
            이름을 그 구역에 실제로 있는 규격에 맞추고, 각자 해당 배지로 보낸다.
          */}
          <button
            onClick={() => scrollTo('badge-unece-r100')}
            className="flex items-center min-h-11 lg:min-h-0 lg:py-1 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            EXPORT / OEM COMPLIANCE
          </button>
          <button
            onClick={() => scrollTo('badge-iso21434')}
            className="flex items-center min-h-11 lg:min-h-0 lg:py-1 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            TELEMETRY CYBERSECURITY
          </button>
        </div>
      </div>
    </footer>
  );
};
