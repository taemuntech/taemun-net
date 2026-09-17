import React, { useState } from 'react';

interface KibbleGuideProps {
  onOpenCalculator: () => void;
}

export const KibbleGuide: React.FC<KibbleGuideProps> = ({ onOpenCalculator }) => {
  const [activeKibble, setActiveKibble] = useState<'8mm' | '12mm' | '15mm'>('8mm');

  return (
    <section className="py-12 lg:py-20 bg-[#f8f9ff]" id="kibble-detail">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#0f5238] text-xs font-bold bg-[#dee9fc] px-3 py-1 rounded-full mb-2 shadow-sm">
            <span className="material-symbols-outlined text-sm">straighten</span>
            <span>오프라인 실측 정밀 반영 인터랙션</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#121c2a] tracking-tight">
            키블 실측 크기 &amp; 1일 정량 급여 가이드
          </h2>
          <p className="text-sm text-[#404943] mt-2 leading-relaxed">
            입이 작은 소형견과 까다로운 고양이도 편안하게 씹을 수 있도록 설계된 키블 직경을 100원 동전과
            직접 비교해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 6 Cols: 100-Won Coin Interactive Comparison */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#bfc9c1]/80 p-6 lg:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-[#bfc9c1]/50 pb-4 mb-6">
                <span className="text-base font-bold text-[#121c2a] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238]">toll</span>
                  <span>실물 동전(100원) 대비 알갱이 크기</span>
                </span>
                <span className="text-[11px] bg-[#b1f0ce] text-[#0f5238] px-2.5 py-1 rounded font-bold">
                  1:1 스케일 뷰어
                </span>
              </div>

              {/* Visual Coin & Kibble Scale Demo */}
              <div className="bg-[#eff4ff] rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden border border-[#bfc9c1]/30">
                <div className="flex items-center justify-center gap-8 lg:gap-12 relative z-10">
                  {/* 100 Won Coin Render (Diameter 24mm -> ~96px) */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 border-2 border-slate-400 shadow-md flex items-center justify-center flex-col text-slate-700 font-bold select-none">
                      <span className="text-xs font-semibold tracking-tight">대한민국</span>
                      <span className="text-2xl leading-none font-black tracking-tight">100</span>
                      <span className="text-[9px] font-medium text-slate-600">직경 24mm</span>
                    </div>
                    <span className="text-xs text-[#404943] font-bold">대한민국 100원 동전</span>
                  </div>

                  <div className="text-[#707973] text-xl font-bold font-mono">VS</div>

                  {/* Interactive Kibble Render */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-24 flex items-center justify-center">
                      {activeKibble === '8mm' && (
                        <div className="w-8 h-8 rounded-full bg-[#934c00] shadow-inner border border-[#703800] flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300 transform scale-100 hover:scale-110 animate-fade-in">
                          8mm
                        </div>
                      )}
                      {activeKibble === '12mm' && (
                        <div className="w-12 h-12 rounded-full bg-[#fdbd77] shadow-inner border border-[#835418] flex items-center justify-center text-xs text-[#784a0d] font-bold transition-all duration-300 transform scale-100 hover:scale-110 animate-fade-in">
                          12mm
                        </div>
                      )}
                      {activeKibble === '15mm' && (
                        <div className="w-14 h-14 rounded-lg bg-[#835418] shadow-inner border border-[#703800] flex items-center justify-center text-xs text-white font-bold transition-all duration-300 transform scale-100 hover:scale-110 animate-fade-in">
                          15mm
                        </div>
                      )}
                    </div>

                    <span className="text-xs text-[#0f5238] font-bold text-center">
                      {activeKibble === '8mm' && '스몰바이트 (소형견/묘용)'}
                      {activeKibble === '12mm' && '12mm 레귤러 바이트 (중대형견용)'}
                      {activeKibble === '15mm' && '15mm 동결건조 큐브 (전연령 화식)'}
                    </span>
                  </div>
                </div>

                {/* Measurement ruler line */}
                <div className="w-full max-w-xs h-px bg-[#bfc9c1] mt-6 relative flex justify-between text-[10px] text-[#707973] font-mono">
                  <span>| 0mm</span>
                  <span>| 8mm</span>
                  <span>| 12mm</span>
                  <span>| 24mm (동전)</span>
                </div>
              </div>

              {/* Size Selector Tabs */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setActiveKibble('8mm')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                    activeKibble === '8mm'
                      ? 'bg-[#0f5238] text-white shadow-sm'
                      : 'bg-[#dee9fc] hover:bg-[#d9e3f6] text-[#121c2a]'
                  }`}
                >
                  8mm 스몰바이트
                  <br />
                  <span className="font-normal text-[10px] opacity-80">말티즈/포메/반려묘</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveKibble('12mm')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                    activeKibble === '12mm'
                      ? 'bg-[#0f5238] text-white shadow-sm'
                      : 'bg-[#dee9fc] hover:bg-[#d9e3f6] text-[#121c2a]'
                  }`}
                >
                  12mm 레귤러
                  <br />
                  <span className="font-normal text-[10px] opacity-80">리트리버/진도/중형견</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveKibble('15mm')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                    activeKibble === '15mm'
                      ? 'bg-[#0f5238] text-white shadow-sm'
                      : 'bg-[#dee9fc] hover:bg-[#d9e3f6] text-[#121c2a]'
                  }`}
                >
                  동결건조 큐브
                  <br />
                  <span className="font-normal text-[10px] opacity-80">물에 불려먹는 생식</span>
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#bfc9c1]/50 text-xs text-[#404943] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#835418] text-base shrink-0">
                info
              </span>
              <span>
                특수 에어 크런치 공법으로 치아가 약한 자견이나 노령견도 부드럽게 씹어 넘길 수 있습니다.
              </span>
            </div>
          </div>

          {/* Right 6 Cols: 체중별 1일 급여량 조견표 */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#bfc9c1]/80 p-6 lg:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-[#bfc9c1]/50 pb-4 mb-4">
                <span className="text-base font-bold text-[#121c2a] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0f5238]">calculate</span>
                  <span>체중별 1일 권장 급여량 조견표</span>
                </span>
                <span className="text-xs text-[#835418] font-bold">1일 2회 급여 기준</span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#bfc9c1]/70 bg-[#eff4ff] text-[#121c2a] font-bold">
                      <th className="py-3 px-3">반려동물 체중</th>
                      <th className="py-3 px-3">1일 권장 급여량</th>
                      <th className="py-3 px-3">1회 급여량 (아침/저녁)</th>
                      <th className="py-3 px-3">급여 지속 일수(1.5kg)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#bfc9c1]/40">
                    <tr className="hover:bg-[#eff4ff]/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#0f5238]">초소형견 (1 ~ 3kg)</td>
                      <td className="py-3 px-3 font-semibold">35 ~ 55g</td>
                      <td className="py-3 px-3 text-[#404943]">약 18 ~ 27g</td>
                      <td className="py-3 px-3 text-[#835418] font-bold">약 30 ~ 42일</td>
                    </tr>
                    <tr className="bg-[#b1f0ce]/25 hover:bg-[#b1f0ce]/35 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#0f5238] flex items-center gap-1">
                        <span>소형견 (3 ~ 5kg)</span>
                        <span className="bg-[#0f5238] text-white text-[9px] px-1 rounded font-normal">
                          표준
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#0f5238]">55 ~ 85g</td>
                      <td className="py-3 px-3 text-[#404943]">약 28 ~ 42g</td>
                      <td className="py-3 px-3 text-[#835418] font-bold">약 18 ~ 27일</td>
                    </tr>
                    <tr className="hover:bg-[#eff4ff]/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#0f5238]">중형견 (5 ~ 10kg)</td>
                      <td className="py-3 px-3 font-semibold">85 ~ 145g</td>
                      <td className="py-3 px-3 text-[#404943]">약 43 ~ 72g</td>
                      <td className="py-3 px-3 text-[#835418] font-bold">약 10 ~ 17일</td>
                    </tr>
                    <tr className="hover:bg-[#eff4ff]/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-[#0f5238]">중대형견 (10kg 이상)</td>
                      <td className="py-3 px-3 font-semibold">145g 이상</td>
                      <td className="py-3 px-3 text-[#404943]">약 73g 이상</td>
                      <td className="py-3 px-3 text-[#835418] font-bold">대용량 6kg 권장</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Vet Tip Callout */}
              <div className="mt-4 p-4 rounded-xl bg-[#dee9fc] border border-[#bfc9c1]/60 text-xs space-y-1">
                <p className="font-bold text-[#0f5238] flex items-center gap-1.5 text-xs">
                  <span className="material-symbols-outlined text-base">medical_services</span>
                  <span>수의 영양학 팁 (사료 교체 시 주의점)</span>
                </p>
                <p className="text-[#404943] text-xs leading-relaxed">
                  기존 사료에서 포우즈 앤 테일로 교체 시, 1~2일차(25%), 3~4일차(50%), 5~6일차(75%),
                  7일차 이후(전량 전환) 비율로 일주일간 서서히 혼합 급여하시기를 권장합니다.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#707973]">계량 스쿱(30g 정량) 본품 기본 동봉</span>
              <button
                onClick={onOpenCalculator}
                className="text-xs text-[#0f5238] font-bold hover:underline flex items-center gap-1 transition-colors"
              >
                <span>내 반려동물 맞춤 급여량 정밀 계산하기</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
