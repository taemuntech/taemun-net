import React, { useState, useEffect } from 'react';

export const HeroSection: React.FC = () => {
  const [temp, setTemp] = useState(21.4);
  const [humidity, setHumidity] = useState(62);
  const [co2, setCo2] = useState(950);
  const [ec, setEc] = useState(1.82);

  // Subtle real-time micro-fluctuations for authentic telemetry feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(Number((21.3 + Math.random() * 0.3).toFixed(1)));
      setHumidity(Math.round(61 + Math.random() * 2));
      setCo2(Math.round(945 + Math.random() * 10));
      setEc(Number((1.81 + Math.random() * 0.03).toFixed(2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#faf8ff] to-[#f2f3ff] overflow-hidden border-b border-[#bccac0]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006948]/10 border border-[#006948]/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
          <span className="font-mono text-[10px] lg:text-[11px] text-[#006948] tracking-wider uppercase font-semibold">
            BIOPHILIC PRECISION AI VERTICAL FARMING // RENEWABLE ENERGY TARGET
          </span>
        </div>

        {/* Hero Headline & Pitch */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-headline text-3xl lg:text-[44px] lg:leading-[52px] text-[#131b2e] font-semibold tracking-tight">
              Cultivating Sustainable Nutrition in <br />
              <span className="text-[#006948] underline decoration-[#6ffbbe] decoration-4 underline-offset-4">
                Zero-Pesticide Cleanroom
              </span>{' '}
              Biospheres.
            </h1>
            <p className="mt-4 font-headline text-xl lg:text-2xl text-[#3d4a42] font-medium [word-break:keep-all]">
              기후 변화에 흔들리지 않는 무농약 클린룸 AI 수직 스마트팜
            </p>
            <p className="mt-3 font-body text-base lg:text-lg text-[#3d4a42] max-w-3xl leading-relaxed [word-break:keep-all]">
              365일 기후 변화와 병충해에서 분리된 밀폐형 바이오스피어에서 초정밀 AI 에어로포닉스 분무 재배와 맞춤형 분광 제어로 높은 영양 밀도를 목표로 설계한 구성입니다.
            </p>

            {/* CTA Row */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#calculator"
                className="px-6 py-3.5 bg-[#006948] text-white font-mono text-[12px] font-semibold rounded-lg shadow-xs hover:bg-[#00855d] active:scale-95 transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>수확량 시뮬레이터 가동</span>
                <span className="material-symbols-outlined text-sm">calculate</span>
              </a>
              <a
                href="#b2b-contract"
                className="px-6 py-3.5 bg-white text-[#131b2e] border border-[#bccac0] font-mono text-[12px] font-semibold rounded-lg hover:border-[#006948] hover:text-[#006948] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>B2B 기업 공급 문의</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Hero Quick Diagnostic Metric Pod */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#bccac0]/40 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#bccac0]/20 mb-4">
              <span className="font-mono text-[10px] uppercase text-[#6d7a72] font-bold tracking-wider">
                BIOSYSTEM TELEMETRY
              </span>
              {/* 아래 네 줄은 설비 규격처럼 읽히는 값이라 구역 머리에 예시 표시를 단다 */}
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#6d7a72]/10 text-[#6d7a72] font-bold">
                  예시 수치
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#006948]/10 text-[#006948] font-bold">
                  ONLINE
                </span>
              </span>
            </div>
            <div className="space-y-3 font-mono text-[12px]">
              <div className="flex justify-between items-center">
                <span className="text-[#3d4a42]">Air Purification</span>
                <span className="font-semibold text-[#131b2e]">HEPA H14 (99.995%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3d4a42]">Target Cultivars</span>
                <span className="font-semibold text-[#006948]">24 Specialized Lines</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3d4a42]">Nutrient Recirculation</span>
                <span className="font-semibold text-[#00687a]">Closed Loop 98.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#3d4a42]">Autonomous Dosing</span>
                <span className="font-semibold text-[#006947]">Real-time EC/pH AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase with Live HUD Overlays */}
        <div className="relative rounded-2xl overflow-hidden border border-[#bccac0]/50 shadow-lg bg-white">
          <img
            alt="Cleanroom AI Vertical Farm Biosphere with scientists in protective gear inspecting hydroponic racks"
            className="w-full h-[400px] lg:h-[620px] object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy43GOmTnr2T8zFUP4t4l8gCmRafBwVHRK3QC-R1sXlbby4-Do0Lf8ukKqlomkfQAD5cbaUdcxYvgJDQmowqHJMVj9qzPoHLLLbBPemx3bKkBiqjbiThMAlGOPuGE7IHPNxwGF89JD5MhkkOO45WCnvM7WhI8BwrXvtiP-iBBoPNCwmdSYpic-KmPyNzNcUloj7YW8lJShKrggigr_z1sGhFae9hCMuGm3YcpXobqGHbUTjvfiqIa9"
            referrerPolicy="no-referrer"
          />

          {/* Translucent Gradient Veil */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-[#131b2e]/25 to-transparent pointer-events-none"></div>

          {/* HUD Overlay 1: Top Left Chamber Analytics */}
          <div className="absolute top-4 left-4 hud-glass rounded-xl p-3.5 lg:p-4 max-w-xs shadow-md border-l-4 border-l-[#006948]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[10px] lg:text-[11px] font-bold text-[#006948] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">tune</span> AI SPECTRAL TUNING
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#006948]/15 text-[#006948] rounded font-semibold">
                ACTIVE
              </span>
            </div>
            <p className="font-mono text-[11px] lg:text-[12px] text-[#131b2e] font-semibold">
              450nm (B) / 660nm (R) OPTIMAL
            </p>
            <p className="font-body text-[11px] lg:text-[12px] text-[#3d4a42] mt-1 leading-snug">
              Photosynthetic photon flux tuned for maximum crispness &amp; chlorophyll.
            </p>
          </div>

          {/* HUD Overlay 2: Top Right Microclimate Matrix */}
          <div className="absolute top-6 right-6 hud-glass rounded-xl p-4 max-w-xs shadow-md border-l-4 border-l-[#00687a] hidden lg:block">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[11px] font-bold text-[#00687a] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">thermostat</span> MICROCLIMATE
              </span>
              <span className="font-mono text-[10px] text-[#6d7a72]">SENSOR #04</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
              <div className="bg-white/80 p-1.5 rounded">
                <span className="block text-[#6d7a72] text-[9px]">TEMP</span>
                <span className="font-bold text-[#131b2e] text-[12px]">{temp}°C</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded">
                <span className="block text-[#6d7a72] text-[9px]">RH</span>
                <span className="font-bold text-[#131b2e] text-[12px]">{humidity}%</span>
              </div>
              <div className="bg-white/80 p-1.5 rounded">
                <span className="block text-[#6d7a72] text-[9px]">CO2</span>
                <span className="font-bold text-[#006948] text-[12px]">{co2}ppm</span>
              </div>
            </div>
          </div>

          {/* HUD Overlay 3: Bottom Live Chamber Feeds */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 lg:gap-4">
            <div className="hud-glass-dark text-[#faf8ff] rounded-xl px-4 lg:px-5 py-3 lg:py-3.5 flex items-center gap-3.5 shadow-lg backdrop-blur-md">
              <div className="p-2 rounded-lg bg-[#00855d] text-[#f5fff7] shrink-0">
                <span className="material-symbols-outlined text-lg">water_drop</span>
              </div>
              <div>
                <span className="font-mono text-[10px] lg:text-[11px] text-[#85f8c4] block font-bold">
                  ROOT MIST AEROPONICS
                </span>
                <span className="font-mono text-[11px] lg:text-[12px] text-[#faf8ff]">
                  15s PULSE ACTIVE // EC {ec} mS/cm
                </span>
              </div>
            </div>

            <div className="hud-glass-dark text-[#faf8ff] rounded-xl px-4 lg:px-5 py-3 lg:py-3.5 flex items-center gap-3.5 shadow-lg backdrop-blur-md">
              <div className="p-2 rounded-lg bg-[#00687a] text-white shrink-0">
                <span className="material-symbols-outlined text-lg">event_repeat</span>
              </div>
              <div>
                <span className="font-mono text-[10px] lg:text-[11px] text-[#4cd7f6] block font-bold">
                  HARVEST CYCLE
                </span>
                <span className="font-mono text-[11px] lg:text-[12px] text-[#faf8ff]">
                  28-DAY CONTINUOUS BATCH SYSTEM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Key Sustainability Stats Banner
            모바일/웹 경계는 그대로 lg 다. md 는 태블릿(768)에서 카드 셋이 한 장씩 늘어지던 걸 3열로 접는 중간 단계일 뿐이다. */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="p-5 lg:p-6 rounded-xl bg-white border border-[#bccac0]/40 hover:border-[#006948] transition-all shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#006948]/10 text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">water</span>
              </div>
              <span className="font-headline text-2xl md:text-lg lg:text-3xl font-bold text-[#131b2e] [word-break:keep-all]">
                95% Water Saved
              </span>
            </div>
            <p className="font-body text-sm text-[#3d4a42] leading-relaxed">
              순환 여과 에어로포닉스 분무 시스템을 통해 관행 토경 재배 대비 농업용수를 95% 이상 절감하는 것을 목표로 설계했습니다. (예시 수치)
            </p>
          </div>

          <div className="p-5 lg:p-6 rounded-xl bg-white border border-[#bccac0]/40 hover:border-[#006948] transition-all shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#00687a]/10 text-[#00687a] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">layers</span>
              </div>
              <span className="font-headline text-2xl md:text-lg lg:text-3xl font-bold text-[#131b2e] [word-break:keep-all]">
                40x Yield Per Sqm
              </span>
            </div>
            <p className="font-body text-sm text-[#3d4a42] leading-relaxed">
              최대 16단 고밀도 수직 스택 타워와 24시간 분광 가속으로 일반 노지 농업 대비 단위면적당 40배 생산성을 목표로 합니다. (예시 수치)
            </p>
          </div>

          <div className="p-5 lg:p-6 rounded-xl bg-white border border-[#bccac0]/40 hover:border-[#006948] transition-all shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#006947]/10 text-[#006947] flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">shield</span>
              </div>
              <span className="font-headline text-2xl md:text-lg lg:text-3xl font-bold text-[#131b2e] [word-break:keep-all]">
                Zero Weather Impact
              </span>
            </div>
            <p className="font-body text-sm text-[#3d4a42] leading-relaxed [word-break:keep-all]">
              혹서기, 혹한기, 가뭄, 장마 및 미세먼지와 분리된 양압 클린룸에서 365일 규격화된 원료를 정시 공급하도록 설계한 운영 구성입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
