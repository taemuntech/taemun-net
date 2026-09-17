import React from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface HeroProps {
  onScrollToHUD: () => void;
  onScrollToReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToHUD, onScrollToReservation }) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fdf9f5] via-[#f7f3ef] to-[#fdf9f5] pt-6 pb-20 lg:pt-12 lg:pb-28">
      {/* Background ambient halos */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#fedeb2]/30 via-[#c5a880]/15 to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#e4dedc]/50 via-[#eabe9a]/25 to-transparent blur-3xl"></div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Poetic Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#ebe7e4]/90 text-[#725b38] text-[12px] font-semibold tracking-wider shadow-sm border border-[#c5a880]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#725b38] animate-pulse"></span>
              <span>압구정 프라이빗 에스테틱 메디컬 살롱</span>
            </div>

            <div className="flex flex-col gap-2.5 lg:gap-3 break-keep">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
                ONSAEMIRO AESTHETIC &amp; PLASTIC SURGERY
              </span>
              <h1 className="font-serif text-[26px] lg:text-[44px] text-[#1c1c19] tracking-tight leading-[1.25] break-keep">
                본연의 아름다움을 거스르지 않는<br />
                <span className="text-[#725b38] italic font-serif">자연스러움의 미학</span> — 순우리말 온새미로
              </h1>
            </div>

            <p className="text-[14px] lg:text-[16px] leading-[24px] lg:leading-[28px] text-[#4d463c] max-w-2xl break-keep">
              가르거나 쪼개지 않고 본래의 자연스러움을 온전히 지키는 1mm의 황금비율.<br className="hidden lg:inline" />
              과도한 성형 티를 배제하고, 타고난 고유한 선과 표정의 깊이를 존중하는 1:1 전담 실명 진료를 지향합니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-4 pt-2">
              <button
                onClick={onScrollToHUD}
                className="inline-flex items-center justify-center gap-2 px-6 lg:px-7 py-3.5 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[14px] lg:text-[15px] font-semibold hover:bg-[#2E2A27] shadow-[0_8px_24px_rgba(114,91,56,0.18)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#fedeb2] text-[20px]">tune</span>
                <span className="break-keep">1:1:0.8 안면 황금비율 시뮬레이터</span>
              </button>
              <button
                onClick={onScrollToReservation}
                className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-3.5 rounded-full bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de] text-[14px] lg:text-[15px] font-semibold shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#725b38] text-[20px]">mail</span>
                <span className="break-keep">1:1 프라이빗 시크릿 상담</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 lg:gap-4 pt-3 break-keep">
              <div className="p-2.5 lg:p-3.5 rounded-xl bg-[#f1ede9]/80 border border-[#d1c5b8]/30 shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[18px] lg:text-[22px] font-serif font-bold text-[#725b38]">100%</span>
                <span className="text-[11px] lg:text-[12px] text-[#4d463c] mt-0.5">한국인 전문의 실명집도</span>
              </div>
              <div className="p-2.5 lg:p-3.5 rounded-xl bg-[#f1ede9]/80 border border-[#d1c5b8]/30 shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[18px] lg:text-[22px] font-serif font-bold text-[#725b38]">0건</span>
                <span className="text-[11px] lg:text-[12px] text-[#4d463c] mt-0.5">철저한 안전 수술 원칙</span>
              </div>
              <div className="p-2.5 lg:p-3.5 rounded-xl bg-[#f1ede9]/80 border border-[#d1c5b8]/30 shadow-sm flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-[18px] lg:text-[22px] font-serif font-bold text-[#725b38]">1:1</span>
                <span className="text-[11px] lg:text-[12px] text-[#4d463c] mt-0.5">마취과 전문의 전담 상주</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Visual Editorial Portrait */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex justify-center">
            {/* Ambient Warm Golden Glow Backdrop */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#c5a880]/20 via-[#c5a880]/10 to-transparent rounded-[36px] blur-2xl -z-10 pointer-events-none" />

            <div className="group relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(114,91,56,0.14)] bg-[#ebe7e4] aspect-[3/4] w-full max-w-[460px] border border-[#d1c5b8]/50">
              <img
                src={CLINIC_IMAGES.heroModel}
                alt="온새미로 에스테틱 클리닉 앰버서더"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Soft Photographic Gradient Vignette (너무 쨍한 느낌을 부드럽게 감싸는 소프트 필름톤) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/15 pointer-events-none" />

              {/* Inset Top-Right Micro Tag */}
              <div className="absolute top-4 right-4 backdrop-blur-md bg-white/75 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#725b38] animate-pulse shrink-0" />
                <span className="text-[11px] text-[#1c1c19] font-medium tracking-wider whitespace-nowrap">
                  AESTHETIC CLINIC · 압구정 본원
                </span>
              </div>

              {/* Inset Bottom Signature Glass Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl backdrop-blur-md bg-white/85 shadow-lg border border-white/90 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#725b38] font-bold">
                    Natural Golden Ratio
                  </span>
                  <span className="font-serif text-[16px] lg:text-[17px] text-[#1c1c19] font-semibold break-keep">
                    본연의 선을 살리는 1mm 미학
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-[#4d463c] block">한국형 동안비율</span>
                  <span className="text-[13px] font-bold text-[#725b38] tracking-wider">1:1:0.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges: 3 horizontal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16 pt-10 border-t border-[#d1c5b8]/30">
          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#ebe7e4] text-[#725b38] shrink-0">
              <span className="material-symbols-outlined text-[24px]">badge</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#1c1c19]">100% 실명 집도의제</span>
              <p className="text-[13px] text-[#4d463c] leading-relaxed">
                쉐도우 닥터, 대리수술을 법적으로 영구 배제하며 담당 전문의가 모든 과정을 집도합니다.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#ebe7e4] text-[#725b38] shrink-0">
              <span className="material-symbols-outlined text-[24px]">monitor_heart</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#1c1c19]">마취통증의학과 1:1 전담 상주</span>
              <p className="text-[13px] text-[#4d463c] leading-relaxed">
                수술 시작부터 회복실 퇴실까지 마취과 전문의가 1초도 곁을 떠나지 않고 활력징후를 기록합니다.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#ebe7e4] text-[#725b38] shrink-0">
              <span className="material-symbols-outlined text-[24px]">videocam</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#1c1c19]">보호자 안심 참관 CCTV 가동</span>
              <p className="text-[13px] text-[#4d463c] leading-relaxed">
                원하시는 경우 보호자 전용 프라이빗 룸에서 실시간 수술실 CCTV를 투명하게 열람하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
