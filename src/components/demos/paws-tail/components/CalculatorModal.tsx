import React, { useState } from 'react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState<number>(5);
  const [activity, setActivity] = useState<'low' | 'normal' | 'high'>('normal');
  const [bcs, setBcs] = useState<'lean' | 'ideal' | 'heavy'>('ideal');
  const [mealsPerDay, setMealsPerDay] = useState<number>(2);

  if (!isOpen) return null;

  // RER = 70 * weight^0.75
  const rer = 70 * Math.pow(Math.max(0.5, weight), 0.75);
  let factor = 1.6;

  if (activity === 'low') factor -= 0.2;
  if (activity === 'high') factor += 0.3;

  if (bcs === 'lean') factor += 0.2;
  if (bcs === 'heavy') factor -= 0.3;

  const totalKcal = Math.round(rer * factor);
  // Average 375 kcal / 100g
  const totalGrams = Math.round(totalKcal / 3.75);
  const perMealGrams = Math.round(totalGrams / mealsPerDay);
  const bagDays = Math.round(1500 / totalGrams);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#bfc9c1]/60 relative text-[#121c2a]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#707973] hover:text-[#121c2a] p-1"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-2 text-[#0f5238] font-bold text-sm mb-1">
          <span className="material-symbols-outlined text-base">calculate</span>
          <span>정밀 급여량 계산기</span>
        </div>
        <h3 className="text-lg font-bold text-[#121c2a]">반려동물 맞춤 칼로리 &amp; 급여량 산출</h3>
        <p className="text-xs text-[#404943] mt-1 mb-5">
          반려견의 체중과 활동량, 비만도를 기반으로 과학적인 1회 급여량을 계산합니다.
        </p>

        <div className="space-y-4 text-xs">
          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-[#404943]">아이의 체중</label>
              <span className="font-bold text-[#0f5238] text-sm">{weight} kg</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full accent-[#0f5238] h-2 bg-[#e6eeff] rounded-lg cursor-pointer"
            />
          </div>

          {/* Activity */}
          <div>
            <label className="font-bold text-[#404943] block mb-1">평소 활동량</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActivity('low')}
                className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                  activity === 'low'
                    ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                    : 'border-[#bfc9c1] text-[#404943]'
                }`}
              >
                적음 (실내견)
              </button>
              <button
                type="button"
                onClick={() => setActivity('normal')}
                className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                  activity === 'normal'
                    ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                    : 'border-[#bfc9c1] text-[#404943]'
                }`}
              >
                보통 (산책 1h)
              </button>
              <button
                type="button"
                onClick={() => setActivity('high')}
                className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                  activity === 'high'
                    ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                    : 'border-[#bfc9c1] text-[#404943]'
                }`}
              >
                많음 (활동견)
              </button>
            </div>
          </div>

          {/* BCS Body Condition */}
          <div>
            <label className="font-bold text-[#404943] block mb-1">체형 상태 (BCS)</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setBcs('lean')}
                className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                  bcs === 'lean'
                    ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                    : 'border-[#bfc9c1] text-[#404943]'
                }`}
              >
                마른 체형
              </button>
              <button
                type="button"
                onClick={() => setBcs('ideal')}
                className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                  bcs === 'ideal'
                    ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                    : 'border-[#bfc9c1] text-[#404943]'
                }`}
              >
                이상적 표준
              </button>
              <button
                type="button"
                onClick={() => setBcs('heavy')}
                className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                  bcs === 'heavy'
                    ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                    : 'border-[#bfc9c1] text-[#404943]'
                }`}
              >
                과체중/비만
              </button>
            </div>
          </div>

          {/* Meals per day */}
          <div>
            <label className="font-bold text-[#404943] block mb-1">1일 급여 횟수</label>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 4].map((times) => (
                <button
                  key={times}
                  type="button"
                  onClick={() => setMealsPerDay(times)}
                  className={`py-2 px-2 rounded-lg border text-center transition-colors ${
                    mealsPerDay === times
                      ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238] font-bold'
                      : 'border-[#bfc9c1] text-[#404943]'
                  }`}
                >
                  하루 {times}회
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#dee9fc]/70 p-4 rounded-xl border border-[#bfc9c1]/60 space-y-3 mt-4">
            <div className="text-center pb-2 border-b border-[#bfc9c1]/50">
              <span className="text-[11px] text-[#404943]">1일 권장 에너지 요구량</span>
              <p className="text-xl font-bold text-[#0f5238]">{totalKcal} kcal / 일</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] text-[#707973] block">1일 정량</span>
                <strong className="text-[#0f5238] text-sm">{totalGrams}g</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] text-[#707973] block">1회 급여량</span>
                <strong className="text-[#121c2a] text-sm">{perMealGrams}g</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg shadow-sm">
                <span className="text-[10px] text-[#707973] block">1.5kg 소진</span>
                <strong className="text-[#835418] text-sm">약 {bagDays}일</strong>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-[#0f5238] text-white font-bold text-xs hover:bg-[#2d6a4f] shadow-md mt-2"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
