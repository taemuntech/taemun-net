import React, { useState } from 'react';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

export const GourmetNutritionSection: React.FC = () => {
  const [activeMealType, setActiveMealType] = useState<'immune' | 'soft'>('immune');

  return (
    <section id="gourmet-nutrition" className="w-full bg-[#faf9f6] py-16">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[12px] text-[#75593c] tracking-widest uppercase font-semibold">
              Therapeutic Gourmet Nutrition
            </span>
            <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold leading-tight">
              음식이 곧 약이 되는 순간,<br />
              1:1 임상 항암 약선 식단
            </h2>
            <p className="text-[15px] text-[#424844] leading-relaxed">
              항암 및 수술 치료 중에는 소화기 점막 손상과 미각 변화로 식욕이 급격히 저하됩니다. 본초 전문 셰프와 임상영양사가 환자의 백혈구 수치, 신장·간 기능 수치를 분석하여 매 끼니 활력을 불어넣는 미식 치유식을 정갈히 올립니다.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#cbe9da] flex items-center justify-center text-[#102a20] shrink-0 font-bold text-[14px]">
                  1
                </div>
                <div className="text-[13px] text-[#1a1c1a]">
                  <strong>저염 발효 약선장:</strong> 3년 숙성 전통 옹기 간장 및 천일염으로 나트륨 부담 완화
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#ffd9b4] flex items-center justify-center text-[#533417] shrink-0 font-bold text-[14px]">
                  2
                </div>
                <div className="text-[13px] text-[#1a1c1a]">
                  <strong>단백질 강화 연하식:</strong> 소화기 암 및 구내염 환자를 위한 부드러운 고단백 특수죽 제공
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#e9e8e5] flex items-center justify-center text-[#75593c] shrink-0 font-bold text-[14px]">
                  3
                </div>
                <div className="text-[13px] text-[#1a1c1a]">
                  <strong>파이토케미컬 항산화 컬러푸드:</strong> 5색 컬러 채소와 유기농 버섯 균사체 활용
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[13px] text-[#75593c]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>입원 환자 전원 임상영양사 1:1 맞춤 영양 상담 및 칼로리 설계</span>
            </div>
          </div>

          {/* Visual Mosaic Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Meal 1 */}
            <div 
              onClick={() => setActiveMealType('immune')}
              className={`rounded-xl overflow-hidden shadow-md bg-white border transition-all cursor-pointer ${
                activeMealType === 'immune' ? 'border-[#102a20] ring-2 ring-[#102a20]/20' : 'border-[#e3e2e0]'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="완도산 전복 영양솥밥 & 보혈 약선탕 한상차림"
                  src={HOSPITAL_IMAGES.mealAbalone}
                />
                <div className="absolute top-3 left-3 bg-[#102a20] text-white px-2.5 py-1 rounded text-[11px] font-semibold">
                  면역 강화 특식
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-[#75593c] font-semibold block">고단백 아미노산 보충</span>
                <h4 className="font-serif text-[17px] font-bold text-[#102a20] mt-0.5">
                  완도산 전복 영양솥밥 &amp; 보혈 약선탕
                </h4>
                <p className="text-[13px] text-[#424844] mt-1 leading-relaxed">
                  항암 주기별 체력 소모를 보충하는 필수 아미노산 공급 및 기혈 순환 촉진
                </p>
              </div>
            </div>

            {/* Meal 2 */}
            <div 
              onClick={() => setActiveMealType('soft')}
              className={`rounded-xl overflow-hidden shadow-md bg-white border transition-all cursor-pointer ${
                activeMealType === 'soft' ? 'border-[#102a20] ring-2 ring-[#102a20]/20' : 'border-[#e3e2e0]'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="저자극 흰살생선 찜 & 단호박 보양죽"
                  src={HOSPITAL_IMAGES.mealFishPorridge}
                />
                <div className="absolute top-3 left-3 bg-[#75593c] text-white px-2.5 py-1 rounded text-[11px] font-semibold">
                  소화 순응식
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-[#75593c] font-semibold block">위장 점막 보호</span>
                <h4 className="font-serif text-[17px] font-bold text-[#102a20] mt-0.5">
                  저자극 흰살생선 찜 &amp; 단호박 보양죽
                </h4>
                <p className="text-[13px] text-[#424844] mt-1 leading-relaxed">
                  오심과 연하 곤란을 겪는 환자를 위한 맞춤형 멸균 저자극 조리
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
