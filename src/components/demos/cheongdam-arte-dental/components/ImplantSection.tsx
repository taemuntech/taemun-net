import React, { useState } from 'react';
import { COMPARISON_DATA } from '../data/clinicData';
import { 
  Scan, 
  Cpu, 
  Printer, 
  Utensils, 
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
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
              잇몸을 크게 째는 과거의 직관적 수술에서 벗어나, 3차원 컴퓨터 모의수술을 통해 최적의 골질 경로를 확정하고 신경 손상 위험을 사전에 차단합니다.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e9e8e5] text-[#4e4639] text-xs font-medium border border-[#d1c5b4]/40">
            <FlaskConical className="w-4 h-4 text-[#006398]" />
            <span>스위스 3D 네비게이션 임플란트 공인 시스템 탑재</span>
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
                고무 인상재의 구토감 없이, 0.01mm 해상도의 3D 구강 스캐너와 저선량 고화질 CT로 턱뼈, 치신경관, 혈관의 입체적 주행을 오차 없이 디지털화합니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Scan className="w-4 h-4 text-[#775a19]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">3D Trios 5 구강 스캐닝</span>
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
                전문의가 전용 CAD/CAM 소프트웨어로 가상 수술을 수차례 선행. 잇몸뼈 골밀도가 가장 단단한 축을 찾아 이상적인 식립 깊이와 각도를 0.1도 단위로 결정합니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Cpu className="w-4 h-4 text-[#006398]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">하치조 신경관 100% 보호 마진</span>
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
                가이드 홈을 통해 잇몸을 째지 않고 1mm 미세 홀만으로 빠르고 안전하게 식립. 붓기와 출혈이 거의 없어 당일 임시보철물 체결 후 저녁 일상 식사가 가능합니다.
              </p>
            </div>
            <div className="mt-6 pt-3 bg-[#faf9f6] p-3 rounded-xl flex items-center gap-2.5 border border-[#d1c5b4]/30">
              <Utensils className="w-4 h-4 text-[#775a19]" />
              <span className="text-[11px] text-[#1a1c1a] font-medium">당일 식사 및 빠른 일상 복귀</span>
            </div>
          </div>
        </div>

        {/* Comparative Toggle Widget: Conventional vs Arte Navigation */}
        <div className="p-6 lg:p-8 lg:p-10 rounded-3xl bg-white shadow-lg border border-[#d1c5b4]/40">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#d1c5b4]/30">
            <div>
              <span className="text-[11px] text-[#7f7667] uppercase tracking-wider font-semibold">
                CLINICAL COMPARISON
              </span>
              <h3 className="font-serif text-2xl text-[#1a1c1a] font-medium mt-1">
                수술 방식 심층 비교 분석표
              </h3>
            </div>
            
            <div className="inline-flex rounded-full p-1 bg-[#e9e8e5] border border-[#d1c5b4]/30">
              <button
                onClick={() => setComparisonMode('arte')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  comparisonMode === 'arte'
                    ? 'bg-[#775a19] text-white shadow-sm'
                    : 'text-[#4e4639] hover:text-[#1a1c1a]'
                }`}
              >
                청담 아르떼 3D 네비게이션
              </button>
              <button
                onClick={() => setComparisonMode('conv')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  comparisonMode === 'conv'
                    ? 'bg-[#565e74] text-white shadow-sm'
                    : 'text-[#4e4639] hover:text-[#1a1c1a]'
                }`}
              >
                전통적 일반 절개 수술
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
                {comparisonMode === 'arte' ? '최소 침습 프로토콜' : '기존 방식 절개'}
              </span>
            </div>

            {/* Item 2 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">통증 및 수술 후 붓기</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#ba1a1a]'}`}>
                  {activeComp.painVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.painDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />}
                {comparisonMode === 'arte' ? '환자 안심 만족도 99.2%' : '진통소염제 처방'}
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
                {comparisonMode === 'arte' ? '해외 및 지방 VIP 최적화' : '반복 내원 필수'}
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
                {comparisonMode === 'arte' ? '고령 및 당뇨 질환자 안심' : '장시간 체어 타임'}
              </span>
            </div>

            {/* Item 5 */}
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/30 flex flex-col justify-between">
              <span className="text-xs text-[#7f7667] font-semibold">신경 손상 안전성</span>
              <div className="my-4">
                <span className={`font-serif text-lg font-bold block ${comparisonMode === 'arte' ? 'text-[#775a19]' : 'text-[#ba1a1a]'}`}>
                  {activeComp.safeVal}
                </span>
                <p className="text-xs text-[#4e4639] mt-1 leading-relaxed">
                  {activeComp.safeDesc}
                </p>
              </div>
              <span className="text-[10px] text-[#7f7667] flex items-center gap-1 font-medium">
                {comparisonMode === 'arte' ? <CheckCircle2 className="w-3 h-3 text-[#775a19]" /> : <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />}
                {comparisonMode === 'arte' ? '대학병원 수술 기준 준수' : '육안 감각 의존'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
