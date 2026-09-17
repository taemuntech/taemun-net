import React, { useState } from 'react';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

type MealType = 'immune' | 'soft';

// 예전에는 식단 카드를 눌러도 테두리 색만 바뀌고 왼쪽 설명은 그대로였다 — 고른 식단이 본문까지 내려오게 한다.
const MEALS: Record<
  MealType,
  { eyebrow: string; heading: string; points: Array<{ title: string; body: string }> }
> = {
  immune: {
    eyebrow: '면역 강화 특식 — 회복기 일반식',
    heading: '치료 사이 회복 기간에 드시는 일반식 구성입니다.',
    points: [
      { title: '저염 발효 약선장', body: '3년 숙성 옹기 간장과 천일염으로 간을 맞춰 나트륨 양을 조절합니다' },
      { title: '단백질 중심 한상', body: '해산물·두부·달걀을 조합해 하루 단백질 목표량을 나눠 담습니다' },
      { title: '5색 채소 곁들임', body: '계절 채소와 버섯을 색깔별로 나눠 매 끼니 구성에 넣습니다' },
    ],
  },
  soft: {
    eyebrow: '소화 순응식 — 연하·구내염 대응',
    heading: '입안이 헐거나 삼키기 힘드실 때 드리는 부드러운 식단입니다.',
    points: [
      { title: '단백질 강화 연하식', body: '부드럽게 갈아 만든 고단백 죽으로, 점도는 상태에 맞춰 조절합니다' },
      { title: '저자극 조리', body: '맵고 신 양념을 빼고 온도도 미지근하게 맞춰 자극을 줄입니다' },
      { title: '소량·잦은 배식', body: '한 번에 많이 못 드시면 양을 나눠 하루 여러 번 올려 드립니다' },
    ],
  },
};

export const GourmetNutritionSection: React.FC = () => {
  const [activeMealType, setActiveMealType] = useState<MealType>('immune');
  const meal = MEALS[activeMealType];

  return (
    <section id="gourmet-nutrition" className="w-full bg-[#faf9f6] py-16">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-[12px] text-[#75593c] tracking-widest uppercase font-semibold">
              Therapeutic Gourmet Nutrition
            </span>
            <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold leading-tight break-keep">
              치료 기간에도 잘 드시도록,<br />
              1:1 임상영양 맞춤 식단
            </h2>
            <p className="text-[15px] text-[#424844] leading-relaxed break-keep">
              항암·수술 치료 기간에는 소화기 점막 손상이나 미각 변화로 식사량이 줄어드는 경우가 많습니다. 임상영양사가
              담당 의료진과 함께 혈액검사 수치와 식사 상태를 보고 끼니마다 드실 수 있는 구성을 조정합니다.
            </p>

            {/* 오른쪽에서 고른 식단의 구성이 여기로 내려온다 */}
            <div className="space-y-3 pt-2">
              <div className="text-[13px] font-semibold text-[#102a20] break-keep">
                <span className="text-[#75593c]">{meal.eyebrow}</span> · {meal.heading}
              </div>
              {meal.points.map((point, idx) => (
                <div
                  key={`${activeMealType}-${point.title}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#e3e2e0] shadow-sm"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-[14px] ${
                      idx === 0
                        ? 'bg-[#cbe9da] text-[#102a20]'
                        : idx === 1
                          ? 'bg-[#ffd9b4] text-[#533417]'
                          : 'bg-[#e9e8e5] text-[#75593c]'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="text-[13px] text-[#1a1c1a] break-keep">
                    <strong>{point.title}:</strong> {point.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-[13px] text-[#75593c] break-keep">
              <span className="material-symbols-outlined text-[18px] shrink-0">verified</span>
              <span>입원 환자 전원 임상영양사 1:1 영양 상담 및 칼로리 설계</span>
            </div>
          </div>

          {/* Visual Mosaic Bento */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Meal 1 */}
            <button
              type="button"
              aria-pressed={activeMealType === 'immune'}
              onClick={() => setActiveMealType('immune')}
              className={`text-left rounded-xl overflow-hidden shadow-md bg-white border transition-all cursor-pointer ${
                activeMealType === 'immune' ? 'border-[#102a20] ring-2 ring-[#102a20]/20' : 'border-[#e3e2e0]'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="전복 영양솥밥과 국·나물을 담은 회복기 한상차림"
                  src={HOSPITAL_IMAGES.mealAbalone}
                />
                <div className="absolute top-3 left-3 bg-[#102a20] text-white px-2.5 py-1 rounded text-[11px] font-semibold">
                  면역 강화 특식
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-[#75593c] font-semibold block">고단백 구성</span>
                <h4 className="font-serif text-[17px] font-bold text-[#102a20] mt-0.5 break-keep">
                  전복 영양솥밥 &amp; 약선 국물 한상
                </h4>
                <p className="text-[13px] text-[#424844] mt-1 leading-relaxed break-keep">
                  치료 사이 회복 기간에 드시는 일반식 구성입니다
                </p>
              </div>
            </button>

            {/* Meal 2 */}
            <button
              type="button"
              aria-pressed={activeMealType === 'soft'}
              onClick={() => setActiveMealType('soft')}
              className={`text-left rounded-xl overflow-hidden shadow-md bg-white border transition-all cursor-pointer ${
                activeMealType === 'soft' ? 'border-[#102a20] ring-2 ring-[#102a20]/20' : 'border-[#e3e2e0]'
              }`}
            >
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                  alt="저자극 흰살생선 찜과 단호박 죽 상차림"
                  src={HOSPITAL_IMAGES.mealFishPorridge}
                />
                <div className="absolute top-3 left-3 bg-[#75593c] text-white px-2.5 py-1 rounded text-[11px] font-semibold">
                  소화 순응식
                </div>
              </div>
              <div className="p-4">
                <span className="text-[11px] text-[#75593c] font-semibold block">부드러운 조리</span>
                <h4 className="font-serif text-[17px] font-bold text-[#102a20] mt-0.5 break-keep">
                  저자극 흰살생선 찜 &amp; 단호박 죽
                </h4>
                <p className="text-[13px] text-[#424844] mt-1 leading-relaxed break-keep">
                  입안이 헐거나 삼키기 힘드실 때 드리는 구성입니다
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
