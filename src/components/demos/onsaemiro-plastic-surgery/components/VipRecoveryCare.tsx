import React, { useState } from 'react';
import { CLINIC_IMAGES, ROADMAP_STAGES } from '../data/clinicData';

export const VipRecoveryCare: React.FC = () => {
  const [activeDay, setActiveDay] = useState<string>('day0');
  const currentStage = ROADMAP_STAGES[activeDay] || ROADMAP_STAGES['day0'];

  return (
    <section className="w-full py-20 bg-[#f7f3ef] relative" id="vip-recovery-care">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Text & Spec list */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
              PRIVATE HEALING SUITE
            </span>
            <h2 className="font-serif text-[28px] lg:text-[34px] text-[#1c1c19] leading-snug">
              수술 후 일상 복귀까지,<br />
              <span className="italic text-[#725b38] font-serif">1인 VIP 메디컬 케어 라운지</span>
            </h2>
            <p className="text-[14px] leading-relaxed text-[#4d463c]">
              온새미로는 수술실 밖을 나서는 순간부터 진정한 결과가 만들어진다고 믿습니다. 타인과의 마주침이 전혀 없는 100% 단독 1인 프라이빗 스위트에서 빠른 회복을 위한 최첨단 메디컬 케어를 제공합니다.
            </p>

            {/* 3-Stage Quick Specs */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm">
                <span className="material-symbols-outlined text-[#725b38] text-[20px] mt-0.5">hotel</span>
                <div>
                  <span className="text-[15px] font-semibold text-[#1c1c19]">1인 전용 스위트룸</span>
                  <p className="text-[13px] text-[#4d463c] mt-0.5">
                    호텔급 베딩, 독립 산소 공조, 전담 에스테티션 1:1 밀착 케어
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm">
                <span className="material-symbols-outlined text-[#725b38] text-[20px] mt-0.5">bubble_chart</span>
                <div>
                  <span className="text-[15px] font-semibold text-[#1c1c19]">고압산소 챔버 (Hyperbaric 2.0 ATA)</span>
                  <p className="text-[13px] text-[#4d463c] mt-0.5">
                    혈장 내 용해 산소 농도를 10배 이상 끌어올려 미세혈관 신생 및 붓기 70% 가속 완화
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm">
                <span className="material-symbols-outlined text-[#725b38] text-[20px] mt-0.5">lightbulb</span>
                <div>
                  <span className="text-[15px] font-semibold text-[#1c1c19]">스마트 힐라이트 II (Healite II) 듀얼 파장</span>
                  <p className="text-[13px] text-[#4d463c] mt-0.5">
                    830nm + 590nm 복합 파장으로 섬유아세포 활성화 및 흉터 예방
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl bg-[#ebe7e4] aspect-[4/3] relative border border-[#d1c5b8]/40">
              <img
                src={CLINIC_IMAGES.recoverySuite}
                alt="1인 VIP 회복 스위트룸"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl backdrop-blur-md bg-[#fdf9f5]/90 border border-[#c5a880]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[13px] text-[#1c1c19] font-bold">
                    1인 프라이빗 스위트 상시 살균 가동 중
                  </span>
                </div>
                <span className="text-[11px] text-[#725b38] font-bold uppercase tracking-wider">
                  RECOVERY PROTOCOL
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 14-Day Recovery Roadmap */}
        <div className="bg-[#ffffff] rounded-3xl p-6 lg:p-8 shadow-sm border border-[#d1c5b8]/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <span className="font-serif text-[18px] font-semibold text-[#1c1c19]">
              14일 쾌속 붓기 완화 로드맵
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveDay('day0')}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  activeDay === 'day0'
                    ? 'bg-[#1A1817] text-[#fdf9f5]'
                    : 'bg-[#f1ede9] text-[#1c1c19] hover:bg-[#ebe7e4]'
                }`}
              >
                수술 당일
              </button>
              <button
                onClick={() => setActiveDay('day3')}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  activeDay === 'day3'
                    ? 'bg-[#1A1817] text-[#fdf9f5]'
                    : 'bg-[#f1ede9] text-[#1c1c19] hover:bg-[#ebe7e4]'
                }`}
              >
                3일차 (피크 붓기)
              </button>
              <button
                onClick={() => setActiveDay('day7')}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  activeDay === 'day7'
                    ? 'bg-[#1A1817] text-[#fdf9f5]'
                    : 'bg-[#f1ede9] text-[#1c1c19] hover:bg-[#ebe7e4]'
                }`}
              >
                7일차 (실밥 발거)
              </button>
              <button
                onClick={() => setActiveDay('day14')}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
                  activeDay === 'day14'
                    ? 'bg-[#1A1817] text-[#fdf9f5]'
                    : 'bg-[#f1ede9] text-[#1c1c19] hover:bg-[#ebe7e4]'
                }`}
              >
                14일차 (일상 복귀)
              </button>
            </div>
          </div>

          {/* Active Stage Details Card */}
          <div className="p-6 rounded-2xl bg-[#f7f3ef] border border-[#d1c5b8]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all">
            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                {currentStage.stageBadge}
              </span>
              <h4 className="font-serif text-[20px] font-semibold text-[#1c1c19]">
                {currentStage.title}
              </h4>
              <p className="text-[14px] leading-relaxed text-[#4d463c]">
                {currentStage.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {currentStage.careDetails.map((care, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#ffffff] text-[11px] text-[#725b38] font-medium border border-[#c5a880]/30">
                    • {care}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 p-5 rounded-xl bg-[#ffffff] shadow-sm border border-[#d1c5b8]/30 flex flex-col gap-1 min-w-[210px] items-center text-center">
              <span className="text-[12px] text-[#4d463c]">붓기 잔여율 예측</span>
              <span className="font-serif text-[38px] font-bold text-[#725b38] leading-none my-1">
                {currentStage.residualEdemaPct}%
              </span>
              <div className="w-full bg-[#ebe7e4] h-2 rounded-full overflow-hidden my-1">
                <div
                  className="bg-[#725b38] h-full rounded-full transition-all duration-500"
                  style={{ width: `${currentStage.residualEdemaPct}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold mt-1">
                {currentStage.badge}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
