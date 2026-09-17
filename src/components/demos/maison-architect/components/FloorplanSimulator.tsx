import React, { useState } from 'react';
import { ShieldCheck, CalendarCheck, Building2, CheckCircle2 } from 'lucide-react';
import { FLOORPLAN_PRESETS } from '../data/products';

interface FloorplanSimulatorProps {
  onOpenShowroomModal: () => void;
}

export const FloorplanSimulator: React.FC<FloorplanSimulatorProps> = ({
  onOpenShowroomModal
}) => {
  const [activePyeong, setActivePyeong] = useState<25 | 34 | 45>(34);
  const preset = FLOORPLAN_PRESETS[activePyeong];

  return (
    <section className="bg-[#f6ece5] py-16 lg:py-24 border-t border-b border-[#d0c4c0]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-semibold text-[#944931] uppercase tracking-widest">
            Architectural Dimension Guide
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl text-[#100e0d] font-light mt-1 tracking-tight">
            한국 표준 아파트 평형별 배치 시뮬레이션
          </h2>
          <p className="text-xs text-[#7f7571] mt-2 leading-relaxed">
            실패 없는 가구 선택을 위해 아파트 거실 평형대별 가구 여유 동선(최소 800mm 확보)과 시각적 개방감을
            검토하세요.
          </p>
        </div>

        {/* Pyeong Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#fff8f4] rounded-xl border border-[#d0c4c0]/60 shadow-xs">
            <button
              onClick={() => setActivePyeong(25)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activePyeong === 25
                  ? 'bg-[#100e0d] text-[#fff8f4] shadow-xs'
                  : 'text-[#4d4542] hover:text-[#100e0d]'
              }`}
            >
              25평형 (84㎡ 소형 아파트)
            </button>
            <button
              onClick={() => setActivePyeong(34)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activePyeong === 34
                  ? 'bg-[#100e0d] text-[#fff8f4] shadow-xs'
                  : 'text-[#4d4542] hover:text-[#100e0d]'
              }`}
            >
              34평형 (112㎡ 국민 평형)
            </button>
            <button
              onClick={() => setActivePyeong(45)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activePyeong === 45
                  ? 'bg-[#100e0d] text-[#fff8f4] shadow-xs'
                  : 'text-[#4d4542] hover:text-[#100e0d]'
              }`}
            >
              45평형+ (148㎡ 대형 펜트)
            </button>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Floorplan Blueprint Box (8 cols) */}
          <div className="lg:col-span-8 bg-[#fff8f4] rounded-2xl p-6 lg:p-10 border border-[#d0c4c0]/50 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between pb-6 border-b border-[#d0c4c0]/30">
              <div>
                <span className="text-[10px] font-bold text-[#944931] uppercase tracking-wider">
                  {preset.badge}
                </span>
                <h3 className="font-serif text-xl lg:text-2xl text-[#100e0d] mt-0.5">
                  {preset.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-medium text-[#7f7571]">거실 가로 x 세로 권장</span>
                <p className="text-sm font-bold text-[#100e0d] font-mono">{preset.roomSize}</p>
              </div>
            </div>

            {/* Architectural Blueprint Simulation Graphic */}
            <div className="relative my-8 py-12 px-6 bg-[#fbf2eb] rounded-xl border border-dashed border-[#d0c4c0]/80 flex flex-col items-center justify-center overflow-hidden">
              {/* Metric Ruler */}
              <div className="absolute top-2 left-6 right-6 flex justify-between text-[10px] text-[#7f7571] tracking-wider font-mono">
                <span>0mm</span>
                <span>1,500mm</span>
                <span>3,000mm</span>
                <span>4,500mm</span>
              </div>

              {/* Blueprint Floor Layout Container */}
              <div className="w-full max-w-lg aspect-[16/9] border border-[#d0c4c0] rounded-lg p-4 relative bg-[#fff8f4] shadow-inner flex items-center justify-center">
                {/* Window & Balcony Line */}
                <div className="absolute top-0 inset-x-8 h-1.5 bg-blue-100/90 border-b border-blue-200 flex justify-center">
                  <span className="text-[9px] text-blue-500 font-mono -top-4 relative font-medium">
                    전면 발코니창 (자연채광 유입)
                  </span>
                </div>

                {/* Sofa Block */}
                <div
                  className="h-16 rounded-md bg-[#eadcc9]/80 border-2 border-[#8c847e] flex flex-col items-center justify-center text-center shadow-xs transition-all duration-500 ease-out"
                  style={{ width: preset.sofaBlockWidth }}
                >
                  <span className="text-xs font-semibold text-[#100e0d]">{preset.sofaWidthText}</span>
                  <span className="text-[9px] text-[#4d4542]">{preset.walkwayClearance}</span>
                </div>

                {/* Coffee Table Block */}
                <div className="w-[28%] h-8 rounded-xs bg-[#e2dacb] border border-[#7f7571] absolute top-[62%] flex items-center justify-center text-[10px] font-semibold text-[#100e0d] shadow-2xs">
                  트래버틴 로우 (1200)
                </div>

                {/* TV Wall Guideline */}
                <div className="absolute bottom-1 inset-x-12 h-1 bg-[#d0c4c0]/60 flex justify-center">
                  <span className="text-[9px] text-[#7f7571] font-mono top-1 relative">
                    아트월 TV 간격: 3,200mm (최적 시야각)
                  </span>
                </div>
              </div>

              {/* Recommendation Note */}
              <p className="text-xs text-[#4d4542] text-center mt-6 max-w-md leading-relaxed">
                {preset.note}
              </p>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#d0c4c0]/30 text-center">
              <div>
                <span className="text-[10px] text-[#7f7571] font-medium">소파 가로 비율</span>
                <p className="text-lg font-bold text-[#100e0d] mt-0.5">{preset.statRatio}</p>
                <span className="text-[10px] text-[#944931] font-semibold">안정적 황금비</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7f7571] font-medium">측면 이동 통로</span>
                <p className="text-lg font-bold text-[#100e0d] mt-0.5">{preset.statWalkway}</p>
                <span className="text-[10px] text-[#7f7571] font-medium">보행 최적화</span>
              </div>
              <div>
                <span className="text-[10px] text-[#7f7571] font-medium">전문 시공 권장</span>
                <p className="text-lg font-bold text-[#100e0d] mt-0.5">{preset.statInstallation}</p>
                <span className="text-[10px] text-[#7f7571] font-medium">바닥 펠트 완벽장착</span>
              </div>
            </div>
          </div>

          {/* Deep Material & Safe Delivery Cards (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Material Performance Card */}
            <div className="bg-[#fff8f4] rounded-2xl p-6 border border-[#d0c4c0]/50 shadow-xs">
              <h4 className="font-sans text-sm font-bold text-[#100e0d] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#944931]" />
                <span>원단 성능 & 복원력 인증</span>
              </h4>
              <p className="text-xs text-[#7f7571] mb-4 leading-relaxed">
                벨기에 직수입 하이테크 부클레 원단은 오코텍스(OEKO-TEX Standard 100) 1등급을 획득하여
                유아 및 반려동물에게 무해합니다.
              </p>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#d0c4c0]/20">
                  <span className="text-[#4d4542]">마모 강도 (Martindale)</span>
                  <span className="font-semibold text-[#100e0d]">60,000회 통과</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#d0c4c0]/20">
                  <span className="text-[#4d4542]">발수 보호 코팅</span>
                  <span className="font-semibold text-[#100e0d]">이지클린 나노 쉴드</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#d0c4c0]/20">
                  <span className="text-[#4d4542]">내부 폼 스펙</span>
                  <span className="font-semibold text-[#100e0d]">38kg/m³ 고탄성 HR폼</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#4d4542]">목재 골조</span>
                  <span className="font-semibold text-[#100e0d]">E0 러시아산 자작합판</span>
                </div>
              </div>
            </div>

            {/* Safe Delivery & Installation Card */}
            <div className="bg-[#fff8f4] rounded-2xl p-6 border border-[#d0c4c0]/50 shadow-xs flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-sans text-sm font-bold text-[#100e0d] mb-2 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-[#100e0d]" />
                  <span>안심 배송 & 설치 프로세스</span>
                </h4>
                <p className="text-xs text-[#7f7571] mb-4 leading-relaxed">
                  주문 확인 후 전문 해피콜을 통해 엘리베이터/사다리차 진입 여부를 사전 진단합니다.
                </p>
                <ul className="space-y-2.5 text-xs text-[#4d4542]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#944931] shrink-0 mt-0.5" />
                    <span>수도권 무료 배송 및 기존 가구 내림 서비스 지원</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#944931] shrink-0 mt-0.5" />
                    <span>바닥재 손상 방지용 특수 펠트패드 무상 시공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#944931] shrink-0 mt-0.5" />
                    <span>설치 후 박스 및 완충재 100% 당일 수거</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-4 border-t border-[#d0c4c0]/30">
                <button
                  onClick={onOpenShowroomModal}
                  className="w-full py-3 px-4 rounded-lg bg-[#f6ece5] hover:bg-[#f0e7df] border border-[#d0c4c0]/60 flex items-center justify-center gap-2 text-xs font-semibold text-[#100e0d] transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span>청담 쇼룸에서 실물 만져보기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
