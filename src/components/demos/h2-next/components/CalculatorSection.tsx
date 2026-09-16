'use client';

import React, { useState, useId } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Sliders, Info, Download } from './Icons';

export const CalculatorSection: React.FC = () => {
  // 샘플이라 제안서 파일을 만들지 않는다 — 「다운로드되었습니다」 대신 공용 안내(SampleNotice)를 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [power, setPower] = useState<number>(25000);
  const [year, setYear] = useState<number>(2027);
  const [trucks, setTrucks] = useState<number>(12);

  const powerInputId = useId();
  const yearInputId = useId();
  const truckInputId = useId();

  // Calculation formulas
  const co2GridSaved = power * 0.474;
  const co2MobilitySaved = trucks * 32.5;
  const totalCO2Tons = Math.round(co2GridSaved + co2MobilitySaved);

  const creditValueWon = totalCO2Tons * 15500 + power * 45000;
  const creditValueBillion = (creditValueWon / 100000000).toFixed(1);

  let baseRate = 70;
  if (year >= 2029) baseRate = 100;
  else if (year === 2028) baseRate = 92;
  else if (year === 2027) baseRate = 84;
  else if (year === 2026) baseRate = 76;

  const re100Rate = Math.min(100, Math.round(baseRate + trucks * 0.3));

  const mixWind = re100Rate >= 90 ? '70%' : '65%';
  const mixH2 = re100Rate >= 90 ? '20%' : '25%';
  const mixSolar = '10%';

  const handleDownload = () => {
    setIsNoticeOpen(true);
  };

  return (
    <section id="calculator" className="py-16 bg-[#f8f9ff] border-b border-[#bcc9c6]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#00685f] font-mono text-xs uppercase tracking-wider mb-2">
            <Sliders className="w-4 h-4" />
            <span>Enterprise PPA Financial Engine</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30]">
            기업 맞춤형 RE100 및 탄소 배출 절감 산출기
          </h2>
          <p className="text-sm lg:text-base text-[#3d4947] mt-2 leading-relaxed">
            귀사의 연간 전력 사용량과 사업 전환 목표를 슬라이더로 조절하시면, H2 NEXT 해상풍력·수소 전력망 연동 시 예상되는 배출권 절감액과 PPA 최적 전력 믹스를 즉시 산출합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Slider Control Panel (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#bcc9c6]/50 p-6 lg:p-8 shadow-xs space-y-6">
            {/* Slider 1: Power Consumption */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={powerInputId} className="text-sm lg:text-base font-semibold text-[#0b1c30]">
                  고객사 연간 산업용 전력 사용량 (MWh)
                </label>
                <div className="font-mono text-lg lg:text-xl text-[#00685f] font-bold">
                  <span>{power.toLocaleString()}</span>{' '}
                  <span className="text-xs font-medium text-[#3d4947]">MWh/년</span>
                </div>
              </div>
              <input
                id={powerInputId}
                type="range"
                min="1000"
                max="100000"
                step="500"
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
                className="w-full h-2 bg-[#e5eeff] rounded-lg appearance-none cursor-pointer accent-[#00685f]"
              />
              <div className="flex justify-between font-mono text-[11px] text-[#6d7a77] mt-1.5">
                <span>1,000 MWh (중견 연구소)</span>
                <span>50,000 MWh</span>
                <span>100,000 MWh (대형 반도체/화학단지)</span>
              </div>
            </div>

            {/* Slider 2: Target Year */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={yearInputId} className="text-sm lg:text-base font-semibold text-[#0b1c30]">
                  전력 조달 목표 연도 (RE100 Target)
                </label>
                <div className="font-mono text-lg lg:text-xl text-[#006398] font-bold">
                  <span>{year}</span>{' '}
                  <span className="text-xs font-medium text-[#3d4947]">년 목표</span>
                </div>
              </div>
              <input
                id={yearInputId}
                type="range"
                min="2026"
                max="2030"
                step="1"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full h-2 bg-[#e5eeff] rounded-lg appearance-none cursor-pointer accent-[#006398]"
              />
              <div className="flex justify-between font-mono text-[11px] text-[#6d7a77] mt-1.5">
                <span>2026 (조기 달성)</span>
                <span>2027</span>
                <span>2028</span>
                <span>2029</span>
                <span>2030 (글로벌 규제 기준)</span>
              </div>
            </div>

            {/* Slider 3: Mobility Transition */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor={truckInputId} className="text-sm lg:text-base font-semibold text-[#0b1c30]">
                  수소 모빌리티(통근버스 / 물류 트럭) 전환 대수
                </label>
                <div className="font-mono text-lg lg:text-xl text-[#00685f] font-bold">
                  <span>{trucks}</span>{' '}
                  <span className="text-xs font-medium text-[#3d4947]">대</span>
                </div>
              </div>
              <input
                id={truckInputId}
                type="range"
                min="0"
                max="50"
                step="1"
                value={trucks}
                onChange={(e) => setTrucks(Number(e.target.value))}
                className="w-full h-2 bg-[#e5eeff] rounded-lg appearance-none cursor-pointer accent-[#00685f]"
              />
              <div className="flex justify-between font-mono text-[11px] text-[#6d7a77] mt-1.5">
                <span>0대 (전력 전용)</span>
                <span>25대</span>
                <span>50대 (대규모 플릿 풀 전환)</span>
              </div>
            </div>

            {/* Benchmark Reference Callout */}
            <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#bcc9c6]/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#006398] flex-shrink-0 mt-0.5" />
              <p className="text-xs ] text-[#3d4947] leading-relaxed">
                화면 구성을 보여 주기 위한 예시 산출식입니다. 배출권 단가·요금 비교 값은 모두 예시 수치이며 실제 계획·거래 단가가 아닙니다.
              </p>
            </div>
          </div>

          {/* Real-Time Result Cards (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#bcc9c6]/50 p-6 lg:p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#00685f]/5 rounded-full pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff] mb-4">
                <span className="font-mono text-xs text-[#00685f] font-semibold tracking-wider">
                  CALCULATED VALUE PROPOSITION
                </span>
                <span className="font-mono text-[11px] text-[#6d7a77]">실시간 연동</span>
              </div>

              {/* Big Metric 1: Carbon Offset Value */}
              <div className="mb-5">
                <span className="text-xs lg:text-sm text-[#3d4947] block mb-1">
                  예상 탄소 배출권 연간 절감 가치 (예시)
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-lg font-bold text-[#00685f]">₩</span>
                  <span
                    id="costSavingDisplay"
                    className="font-mono text-3xl font-bold text-[#00685f]"
                  >
                    {creditValueBillion}억
                  </span>
                  <span className="text-sm lg:text-base font-semibold text-[#0b1c30] ml-1">
                    원 / 년
                  </span>
                </div>
                <span id="co2TonsDisplay" className="font-mono text-xs text-[#6d7a77] block mt-1">
                  연간 {totalCO2Tons.toLocaleString()} tCO2 순 감축 효과
                </span>
              </div>

              {/* Big Metric 2: RE100 Ratio */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs lg:text-sm text-[#3d4947]">
                    RE100 달성 비율 (Target Coverage)
                  </span>
                  <span id="re100Display" className="font-mono text-lg font-bold text-[#006398]">
                    {re100Rate}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#e5eeff] rounded-full overflow-hidden">
                  <div
                    id="re100Bar"
                    className="h-full bg-[#006398] transition-all duration-300 rounded-full"
                    style={{ width: `${re100Rate}%` }}
                  ></div>
                </div>
              </div>

              {/* Recommended Power Mix */}
              <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#bcc9c6]/30 mb-6">
                <span className="text-xs font-semibold text-[#0b1c30] block mb-2 font-mono">
                  맞춤형 PPA 추천 청정에너지 믹스
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#3d4947]">서남해 1.2GW 해상풍력 (기저부하)</span>
                    <span id="mixWind" className="font-bold text-[#0b1c30]">
                      {mixWind}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4947]">필바라 수소·연료전지 (피크제어)</span>
                    <span id="mixH2" className="font-bold text-[#0b1c30]">
                      {mixH2}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3d4947]">온사이트 태양광 루프탑 연계</span>
                    <span id="mixSolar" className="font-bold text-[#0b1c30]">
                      {mixSolar}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div>
              <button
                id="btn-download-proposal"
                type="button"
                onClick={handleDownload}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow transition-all duration-200 active:scale-95 cursor-pointer text-sm lg:text-base"
              >
                <Download className="w-5 h-5" />
                <span>우리 기업 맞춤형 RE100 제안서 PDF 받기</span>
              </button>
              <span className="font-mono text-[11px] text-[#6d7a77] text-center block mt-2">
                샘플 화면이라 실제 파일은 만들어지지 않습니다 — 버튼 동작만 보여 드립니다
              </span>
            </div>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="h2-next"
        industry="corporate"
        featureName="맞춤형 제안서 내려받기"
      />
    </section>
  );
};
