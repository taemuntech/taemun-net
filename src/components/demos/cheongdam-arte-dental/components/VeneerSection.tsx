import React, { useState } from 'react';
import { VENEER_CASES } from '../data/clinicData';
import { 
  GripVertical, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  MoveHorizontal
} from 'lucide-react';

const SHADES = [
  { id: 'BL1', label: 'Hollywood White', hex: '#fbfbfb', desc: '화사하고 또렷한 연예인 톤' },
  { id: 'BL2', label: 'Natural Bright', hex: '#f7f5ed', desc: '자연스럽게 밝은 톤' },
  { id: 'A1', label: 'Natural Enamel', hex: '#f3efe4', desc: '한국인 자연치아 황금색조' },
  { id: 'A2', label: 'Warm Ivory', hex: '#ece6d5', desc: '따뜻하고 포근한 아이보리' }
];

export const VeneerSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<number>(1);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedShade, setSelectedShade] = useState<string>('A1');

  const currentCase = VENEER_CASES.find(c => c.id === selectedCaseId) || VENEER_CASES[0];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  // 항목을 고르면 그 항목에 맞춘 셰이드까지 함께 선택된다 — 오른쪽 셰이드 표가 선택과 따로 놀지 않게.
  const handleSelectCase = (id: number) => {
    setSelectedCaseId(id);
    const next = VENEER_CASES.find(c => c.id === id)?.shadeApplied;
    if (next) setSelectedShade(next);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 py-20 lg:py-28" id="veneer-section">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-semibold block mb-2 font-sans">
          BESPOKE AESTHETIC CERAMICS
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1c1a] font-medium tracking-tight">
          자연치아를 보존하는 0.1mm 초박막 미세삭제 라미네이트
        </h2>
        <p className="text-sm lg:text-base text-[#4e4639] mt-3 leading-relaxed">
          인위적인 하얀색이 아니라 입술 곡선(Smile Line)과 피부 톤에 어울리는 광택과 투명감을 목표로 1:1 맞춤 설계합니다. 적용 가능 여부와 결과는 치아·잇몸 상태에 따라 다릅니다.
        </p>
      </div>

      {/* Treatment Plan Navigation Tabs */}
      {/* justify-center + 가로 스크롤을 같이 쓰면 넘친 왼쪽 첫 탭에 손이 닿지 않는다 — 좁은 화면은 왼쪽 정렬 */}
      <div className="flex justify-start lg:justify-center mb-10 overflow-x-auto pb-2">
        <div className="inline-flex p-1.5 rounded-full bg-[#f4f3f1] border border-[#d1c5b4]/40 shadow-inner gap-1">
          {VENEER_CASES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCase(c.id)}
              className={`px-5 lg:px-6 py-2 lg:py-2.5 min-h-11 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCaseId === c.id
                  ? 'bg-white text-[#1a1c1a] shadow-sm ring-1 ring-black/5'
                  : 'text-[#4e4639] hover:text-[#1a1c1a]'
              }`}
            >
              {c.id === 1 && '① 치간 이개 • 벌어진 앞니'}
              {c.id === 2 && '② 변색 • 기존 레진 재치료'}
              {c.id === 3 && '③ 잇몸 라인 • 스마일 라인'}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Before & After Smile Slider Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 lg:p-8 lg:p-12 rounded-3xl shadow-xl border border-[#d1c5b4]/40">
        {/* Left Visual: Interactive Split Comparison Frame */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative w-full h-[360px] lg:h-[440px] rounded-2xl overflow-hidden shadow-md select-none bg-[#e9e8e5] border border-[#d1c5b4]/30">
            {/* Background "After" Image */}
            <img
              src={currentCase.afterImg}
              alt="치료 후 예시 이미지"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer" />

            {/* Foreground "Before" Image Masked — 두 사진을 같은 크기로 겹쳐 두고 clip 으로만 잘라야 좌우가 어긋나지 않는다 */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none transition-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={currentCase.beforeImg}
                alt="치료 전 예시 이미지"
                className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer" />
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
              BEFORE (예시)
            </div>
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-[#775a19]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
              AFTER (예시)
            </div>

            {/* Interactive Divider Line & Handle */}
            <div
              className="absolute top-0 bottom-0 -translate-x-1/2 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20 shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-white text-[#775a19] shadow-xl flex items-center justify-center border border-[#c5a059]/40">
                <GripVertical className="w-5 h-5" />
              </div>
            </div>

            {/* Range Input Overlay for full touch/mouse responsiveness */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              aria-label="치료 전후 미세 비교 슬라이더"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-3 text-[#7f7667] text-xs text-center">
            <MoveHorizontal className="w-4 h-4 text-[#775a19] shrink-0" />
            <span>중앙 바를 좌우로 옮겨 치료 전후 예시 이미지를 비교해 보세요</span>
          </div>

          {/* 의료광고 고지 — 치료 전후 이미지 옆에 같은 화면에서 보여야 한다 */}
          <p className="mt-3 p-3 rounded-xl bg-[#faf9f6] border border-[#d1c5b4]/40 text-[11px] lg:text-xs text-[#4e4639] leading-relaxed">
            예시 이미지입니다 — 실제 환자의 치료 전후 사진이 아니며, 세 가지 항목 모두 같은 예시 이미지로 치료 방향만 설명합니다.
            치료 결과에는 개인차가 있고 시린 증상, 잇몸 자극, 보철물 파절 등 부작용이 생길 수 있으므로 반드시 진단과 상담이 필요합니다.
          </p>
        </div>

        {/* Right Details & Shade Guide Matrix */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdea5] text-[#261900] text-[11px] font-bold mb-3">
              <span>{currentCase.tag}</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1a1c1a] font-semibold leading-snug">
              {currentCase.title}
            </h3>
            <p className="text-sm text-[#4e4639] mt-3 leading-relaxed">
              {currentCase.desc}
            </p>
          </div>

          {/* Interactive Shade Selector Display */}
          <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#1a1c1a] font-bold">맞춤 Enamel Shade Matrix</span>
              <span className="text-xs text-[#775a19] font-semibold">고강도 글라스 세라믹 (예시)</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-center">
              {SHADES.map((s) => {
                const isSelected = selectedShade === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedShade(s.id)}
                    className={`p-2 min-h-11 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center transition-all ${
                      isSelected 
                        ? 'ring-2 ring-[#775a19] shadow-md -translate-y-0.5' 
                        : 'border border-[#d1c5b4]/30 hover:border-[#775a19]/50'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-black/10 shadow-inner mb-1" 
                      style={{ backgroundColor: s.hex }} 
                    />
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-[#775a19]' : 'text-[#1a1c1a]'}`}>
                      {s.id} {isSelected && '(선택)'}
                    </span>
                    <span className={`text-[9px] truncate max-w-full ${isSelected ? 'text-[#775a19] font-semibold' : 'text-[#7f7667]'}`}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-[11px] text-[#7f7667] flex items-center gap-1.5 bg-[#f4f3f1] p-2 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#775a19]" />
              <span>선택된 셰이드: <strong className="text-[#1a1c1a]">{SHADES.find(s => s.id === selectedShade)?.label}</strong> — {SHADES.find(s => s.id === selectedShade)?.desc}. 최종 색조는 진단 후 상담으로 정합니다</span>
            </div>
          </div>

          {/* Care Badges */}
          <div className="flex flex-wrap items-center gap-4 text-[#4e4639] text-xs font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0" />
              <span>마취 최소화 진행</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0" />
              <span>시림 증상 관리 안내</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#775a19] shrink-0" />
              <span>정기 검진 리콜 안내</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
