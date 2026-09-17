"use client";

import React from 'react';
import { BRAND_INFO } from '../data/antiqueData';

interface AtelierSectionProps {
  onConsultationClick: () => void;
}

export const AtelierSection: React.FC<AtelierSectionProps> = ({
  onConsultationClick,
}) => {
  return (
    <section
      id="atelier"
      className="py-20 lg:py-24 bg-[#300a10] text-[#ffffff] relative overflow-hidden scroll-mt-[calc(var(--sample-bar-h,0px)_+_88px)]"
    >
      {/* Background subtle atmospheric watermark */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none rounded-full border-[18px] border-[#735b24]"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] text-[#735b24] uppercase tracking-[0.25em] font-bold">
              Conservation &amp; Craftsmanship
            </span>

            <h2 className="font-serif text-[28px] lg:text-[36px] text-[#fff8f5] leading-tight">
              메종 당티크 복원 아틀리에 :<br />
              시간을 되돌리는 장인의 손길
            </h2>

            <p className="font-serif text-[16px] lg:text-[17px] text-[#e9e1dc] leading-relaxed">
              백 년의 세월을 견딘 목재의 자연스러운 호흡을 훼손하지 않는 뮤지엄급 보존 복원. 현대 화학 도료를 일체 배제하고 18세기 전통 셸락(French Polish)과 천연 밀랍 밤(Wax Balm)만을 사용하여 고유의 파티나(Patina)를 되살립니다.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-[#735b24] text-2xl mt-1 shrink-0">
                  carpenter
                </span>
                <div>
                  <h4 className="font-serif text-[17px] lg:text-[18px] text-[#fff8f5]">
                    전통 프렌치 폴리싱 (French Polishing)
                  </h4>
                  <p className="font-serif text-[#e9e1dc] text-[14px] leading-relaxed">
                    수백 겹의 천연 셸락 수지를 장인의 손으로 펴 바르며 깊고 그윽한 유리알 광택과 목재 본연의 결을 복원합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-[#735b24] text-2xl mt-1 shrink-0">
                  handyman
                </span>
                <div>
                  <h4 className="font-serif text-[17px] lg:text-[18px] text-[#fff8f5]">
                    목재 수축 및 장부맞춤 안정화
                  </h4>
                  <p className="font-serif text-[#e9e1dc] text-[14px] leading-relaxed">
                    국내 실내 기후(사계절 온습도 편차)에 적응할 수 있도록 고목재 내부 응력을 완화하는 보존 트리트먼트를 시행합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="material-symbols-outlined text-[#735b24] text-2xl mt-1 shrink-0">
                  auto_fix_high
                </span>
                <div>
                  <h4 className="font-serif text-[17px] lg:text-[18px] text-[#fff8f5]">
                    오르몰루 황동 하드웨어 초음파 세척
                  </h4>
                  <p className="font-serif text-[#e9e1dc] text-[14px] leading-relaxed">
                    원래의 금박과 앤틱 음영을 해치지 않는 비파괴 오가닉 클리닝으로 오리지널 잠금장치와 경첩을 하나씩 정비합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="btn-atelier-consultation"
                type="button"
                onClick={onConsultationClick}
                className="inline-flex items-center space-x-2 border border-[#735b24] text-[#ffdf9c] hover:bg-[#735b24] hover:text-[#fff8f5] px-6 py-3 text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
              >
                <span>복원 자문 및 컨설팅 요청</span>
                <span className="material-symbols-outlined text-[16px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative bg-[#4a1e23] p-3 lg:p-4 border border-[#735b24]/30 shadow-md">
              <div className="aspect-[4/3] overflow-hidden bg-[#300a10]/40">
                <img
                  id="atelier-craftsman-image"
                  alt="Master antique restorer hands applying French polish shellac"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  src={BRAND_INFO.atelierImageUrl}
                />
              </div>
              <div className="mt-4 flex justify-between items-center text-[11px] text-[#735b24] uppercase tracking-widest font-semibold">
                <span>Atelier Hannam Conservator Master</span>
                <span>Conservation Studio · Seongsu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
