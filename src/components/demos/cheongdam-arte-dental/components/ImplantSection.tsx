import React, { useState } from 'react';
import { COMPARISON_DATA } from '../data/clinicData';
import { 
  Scan, 
  Cpu, 
  Printer, 
  Utensils, 
  FlaskConical,
  CheckCircle2,
  Info
} from 'lucide-react';

export const ImplantSection: React.FC = () => {
  const [comparisonMode, setComparisonMode] = useState<'arte' | 'conv'>('arte');
  const activeComp = COMPARISON_DATA[comparisonMode];

  return (
    <section className="w-full bg-[#f4f3f1] py-20 lg:py-28" id="navigation-section">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-semibold block mb-2 font-sans">
              PRECISION DIGITAL SURGERY
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1c1a] font-medium tracking-tight">
              Arte 3D 디지털 네비게이션 임플란트
            </h2>
            <p className="text-sm lg:text-base text-[#4e4639] mt-3 leading-relaxed">
              3차원 컴퓨터 모의수술로 골질과 신경관 위치를 미리 확인해 식립 경로를 계획하고, 신경 손상 위험을 줄이는 것을 목표로 합니다. 적용 가능 여부는 진단 후 결정됩니다.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e9e8e5] text-[#4e4639] text-xs font-medium border border-[#d1c5b4]/40">
            <FlaskConical className="w-4 h-4 text-[#006398]" />
            <span>3D 네비게이션 가이드 시스템 운영</span>
          </div>
        </div>

        {/* 4-Step Surgical Process Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#ffdea5] flex items-center justify-center text-[#261900] font-serif text-lg font-bold">
                  01
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f4f3f1] text-[#4e4639] text-[11px] font-semibold tracking-wider">
                  3D SCAN
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-2">
                초정밀 구강 &amp; CT 채득
              </h3>
              <p className="text-xs text-[#4e4639] leading-relaxed">
                고무 인상재 대신 3D 구강 스캐너와 저선량 CT로 턱뼈와 치신경관의 입체적 주행을 정밀하게 디지털화합니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Scan className="w-4 h-4 text-[#775a19]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">3D 디지털 구강 스캐닝</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#ffdea5] flex items-center justify-center text-[#261900] font-serif text-lg font-bold">
                  02
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f4f3f1] text-[#4e4639] text-[11px] font-semibold tracking-wider">
                  SIMULATION
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-2">
                컴퓨터 모의수술 설계
              </h3>
              <p className="text-xs text-[#4e4639] leading-relaxed">
                전문의가 전용 소프트웨어로 가상 수술을 먼저 진행합니다. 잇몸뼈 골밀도가 충분한 축을 찾아 식립 깊이와 각도를 세밀하게 계획합니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Cpu className="w-4 h-4 text-[#006398]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">하치조 신경관 안전 마진 계획</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#ffdea5] flex items-center justify-center text-[#261900] font-serif text-lg font-bold">
                  03
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#f4f3f1] text-[#4e4639] text-[11px] font-semibold tracking-wider">
                  SURGICAL GUIDE
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-2">
                맞춤형 가이드 3D 출력
              </h3>
              <p className="text-xs text-[#4e4639] leading-relaxed">
                시뮬레이션 결과를 실물화하는 의료용 생체적합 레진 가이드를 원내 3D 프린터로 정밀 제작. 실제 수술 시 계획된 위치에 드릴이 정확히 진입하도록 유도합니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Printer className="w-4 h-4 text-[#775a19]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">원내 3D 밀링 &amp; 프린팅 센터</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#775a19] flex items-center justify-center text-white font-serif text-lg font-bold">
                  04
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#ffdea5] text-[#261900] text-[11px] font-bold tracking-wider">
                  1-DAY LOADING
                </span>
              </div>
              <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-2">
                무절개 1-Day 식립 &amp; 보철
              </h3>
              <p className="text-xs text-[#4e4639] leading-relaxed">
                가이드 홈을 통해 약 1mm 미세 홀로 계획된 위치에 식립합니다. 조건이 맞으면 당일 임시보철물을 체결하기도 하며, 가능 여부와 회복 경과는 개인차가 있습니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Utensils className="w-4 h-4 text-[#775a19]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">식사·일상 복귀는 개인차 안내</span>
            </div>
          </div>
        </div>

        {/* Comparative Toggle Widget: Conventional vs Arte Navigation */}
        <div className="p-6 lg:p-8 lg:p-10 rounded-3xl bg-white shadow-lg border border-[#d1c5b4]/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#d1c5b4]/30">
            <div>
              <span className="text-[11px] text-[#7f7667] uppercase tracking-wider font-semibold">
                SURGICAL METHODS
              </span>
              <h3 className="font-serif text-2xl text-[#1a1c1a] font-medium mt-1">
                술식별 특징 안내
              </h3>
            </div>

            <div className="inline-flex rounded-full p-1 bg-[#e9e8e5] border border-[#d1c5b4]/30">
              <button
                type="button"
                onClick={() => setComparisonMode('arte')}
                className={`px-5 py-2 min-h-11 rounded-full text-xs font-bold transition-all ${
                  comparisonMode === 'arte'
                    ? 'bg-[#775a19] text-white shadow-sm'
                    : 'text-[#4e4639] hover:text-[#1a1c1a]'
                }`}
              >
                3D 네비게이션 가이드 술식
              </button>
              <button
                type="button"
                onClick={() => setComparisonMode('conv')}
                className={`px-5 py-2 min-h-11 rounded-full text-xs font-bold transition-all ${
                  comparisonMode === 'conv'
                    ? 'bg-[#565e74] text-white shadow-sm'
                    : 'text-[#4e4639] hover:text-[#1a1c1a]'
                }`}
              >
                절개 술식 (일반)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Item 1 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">잇몸 절개 방식</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#565e74]'}`}>
                  {activeComp.cutVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.cutDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <Info className="w-3 h-3 text-[#565e74]" />}
                {comparisonMode === 'arte' ? '최소 침습 프로토콜' : '절개 · 봉합 과정 포함'}
              </span>
            </div>

            {/* Item 2 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">통증 및 수술 후 붓기</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#565e74]'}`}>
                  {activeComp.painVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.painDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <Info className="w-3 h-3 text-[#565e74]" />}
                {comparisonMode === 'arte' ? '수술 후 관리 안내 제공' : '수술 후 투약 관리 필요'}
              </span>
            </div>

            {/* Item 3 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">총 내원 횟수</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#565e74]'}`}>
                  {activeComp.visitVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.visitDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <Info className="w-3 h-3 text-[#565e74]" />}
                {comparisonMode === 'arte' ? '원거리 내원 일정에 유리' : '단계별 내원 필요'}
              </span>
            </div>

            {/* Item 4 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">수술 시간 (개당)</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#565e74]'}`}>
                  {activeComp.timeVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.timeDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <Info className="w-3 h-3 text-[#565e74]" />}
                {comparisonMode === 'arte' ? '전신질환은 사전 협진 후 판단' : '체어 타임이 길어짐'}
              </span>
            </div>

            {/* Item 5 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">신경 손상 안전성</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#565e74]'}`}>
                  {activeComp.safeVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.safeDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <Info className="w-3 h-3 text-[#565e74]" />}
                {comparisonMode === 'arte' ? '표준 감염관리 절차 준수' : '직접 시야로 골 상태 확인'}
              </span>
            </div>
          </div>

          <p className="mt-6 text-[11px] lg:text-xs text-[#7f7667] leading-relaxed">
            ※ 두 술식은 적응증이 서로 다르며 우열을 가리는 비교가 아닙니다. 골량·잇몸 상태·전신질환에 따라 절개 술식이 더 적합한 경우가 있고,
            어떤 방식으로 진행할지는 진단과 상담을 거쳐 결정합니다. 표의 수치는 예시이며 실제 경과는 개인차가 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};
