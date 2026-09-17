import React, { useState } from 'react';
import { Gift, Info, Check } from 'lucide-react';
import { EngravingConfig, EngravingFont, EngravingMethod, LeatherColor } from '../types';

interface EngravingSimulatorProps {
  onApplyEngraving: (config: EngravingConfig) => void;
}

export const EngravingSimulator: React.FC<EngravingSimulatorProps> = ({ onApplyEngraving }) => {
  const [text, setText] = useState('H. G. LEE');
  const [method, setMethod] = useState<EngravingMethod>('gold');
  const [font, setFont] = useState<EngravingFont>('serif');
  const [leatherColor, setLeatherColor] = useState<LeatherColor>('cognac');
  const [appliedNotification, setAppliedNotification] = useState(false);

  const maxLength = 24;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const getMethodTagText = () => {
    switch (method) {
      case 'gold':
        return '24K GOLD FOIL STAMP';
      case 'blind':
        return 'HEAT BLIND DEBOSS';
      case 'rosegold':
        return 'ANTIQUE ROSE GOLD FOIL';
    }
  };

  const getTextClass = () => {
    let classes = 'text-2xl lg:text-3xl lg:text-4xl tracking-widest transition-all duration-300 ';

    // Font selection
    if (font === 'serif') {
      classes += 'font-serif ';
    } else if (font === 'script') {
      classes += 'font-script tracking-normal ';
    } else {
      classes += 'font-sans font-medium ';
    }

    // Effect styling
    if (method === 'gold') {
      classes += 'gold-foil-text';
    } else if (method === 'blind') {
      classes += 'embossed-blind';
    } else if (method === 'rosegold') {
      classes += 'rose-gold-foil';
    }

    return classes;
  };

  const getLeatherCanvasBg = () => {
    if (leatherColor === 'ebony') return 'leather-swatch-ebony';
    if (leatherColor === 'green') return 'leather-swatch-green';
    return 'leather-swatch-canvas';
  };

  const handleApply = () => {
    onApplyEngraving({
      text: text.trim() || 'H. G. LEE',
      method,
      font,
      leatherColor,
    });
    setAppliedNotification(true);
    setTimeout(() => {
      setAppliedNotification(false);
    }, 3500);
  };

  return (
    <section
      id="bespoke-simulator"
      className="bg-[#f6f3ee] border-y border-[#d6c3ba]/30 py-12 lg:py-20 paper-texture scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3 py-1 text-[11px] font-semibold tracking-widest bg-[#583119]/10 text-[#583119] rounded uppercase">
            Interactive Customization
          </span>
          <h2 className="text-2xl lg:text-3xl lg:text-4xl font-serif text-[#3e1c06] mt-3">
            실시간 이니셜 &amp; 문구 각인 시뮬레이터
          </h2>
          <p className="text-sm lg:text-[15px] text-[#51443d] mt-2.5 leading-relaxed">
            선물 받는 분의 성함 또는 소중한 메시지를 미리 시각화해보세요. 공방 장인의 숙련된 손으로 금형 온도를
            조절하여 깊이감 있게 각인됩니다.
          </p>
        </div>

        {/* Simulator Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#fcf9f4] border border-[#d6c3ba]/50 rounded-xl p-5 lg:p-10 shadow-sm brass-edge">
          {/* Left Canvas: Live Leather Engraving Display */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              id="leather-preview-canvas"
              className={`w-full max-w-lg aspect-[16/10] ${getLeatherCanvasBg()} rounded-xl p-6 relative flex flex-col justify-between overflow-hidden border border-[#583119]/60 shadow-lg select-none transition-colors duration-500`}
            >
              {/* Subtle Stitched Border */}
              <div className="absolute inset-3.5 border border-dashed border-[#8A6412]/40 rounded-lg pointer-events-none"></div>

              {/* Canvas Header */}
              <div className="flex justify-between items-start z-10">
                <span className="text-[11px] font-mono tracking-widest text-[#D4AF37]/70">
                  ARTISAN &amp; GIFT BESPOKE
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#C84B31]/90 shadow-sm"></span>
              </div>

              {/* Centered Live Embossed Text */}
              <div className="text-center my-auto py-6 z-10 px-4">
                <div id="preview-engraving" className={getTextClass()}>
                  {text.trim() === '' ? 'YOUR INITIALS' : text}
                </div>
                <div
                  id="preview-subtext"
                  className="text-[11px] text-[#FAF7F2]/40 tracking-widest mt-2 uppercase font-mono"
                >
                  Bespoke Handcrafted Leather
                </div>
              </div>

              {/* Canvas Footer Tag */}
              <div className="flex justify-between items-end text-[10px] text-[#FAF7F2]/50 font-mono z-10">
                <span>GENUINE VEGETABLE LEATHER</span>
                <span id="preview-method-tag" className="font-semibold text-[#D4AF37]/80">
                  {getMethodTagText()}
                </span>
              </div>
            </div>

            {/* Micro disclaimer */}
            <p className="text-[11px] text-[#83746c] mt-3.5 flex items-center gap-1.5 text-center">
              <Info className="w-3.5 h-3.5 text-[#815439] shrink-0" />
              실제 각인 시 제품의 질감 및 가죽의 결에 따라 자연스러운 농담의 차이가 발생할 수 있습니다.
            </p>
          </div>

          {/* Right Panel: Controls & Options */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* 1. Text Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="engraving-input" className="block text-xs font-semibold text-[#3e1c06]">
                  1. 각인 영문 / 한글 문구 입력
                </label>
                <span id="char-count" className="text-[11px] text-[#83746c] font-mono">
                  {text.length}/{maxLength}
                </span>
              </div>
              <div className="relative">
                <input
                  id="engraving-input"
                  type="text"
                  maxLength={maxLength}
                  value={text}
                  onChange={handleTextChange}
                  placeholder="예: With Love, Minji"
                  className="w-full bg-[#FAF7F2] border border-[#d6c3ba] rounded px-4 py-3 text-sm text-[#3e1c06] focus:border-[#583119] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors"
                />
              </div>
              <p className="text-[11px] text-[#51443d] mt-1.5">
                영문 대소문자, 숫자, 한글 및 특수기호(♡, ☆, &amp;) 지원
              </p>
            </div>

            {/* 2. Engraving Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#3e1c06] mb-2">
                2. 각인 기법 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('gold')}
                  className={`py-2.5 px-2 rounded text-xs font-medium text-center transition-all ${
                    method === 'gold'
                      ? 'border-2 border-[#583119] bg-[#f0ede9] text-[#3e1c06] font-semibold shadow-xs'
                      : 'border border-[#d6c3ba] bg-[#fcf9f4] text-[#51443d] hover:border-[#583119]'
                  }`}
                >
                  24K 순금박
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('blind')}
                  className={`py-2.5 px-2 rounded text-xs font-medium text-center transition-all ${
                    method === 'blind'
                      ? 'border-2 border-[#583119] bg-[#f0ede9] text-[#3e1c06] font-semibold shadow-xs'
                      : 'border border-[#d6c3ba] bg-[#fcf9f4] text-[#51443d] hover:border-[#583119]'
                  }`}
                >
                  불도장 음각
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('rosegold')}
                  className={`py-2.5 px-2 rounded text-xs font-medium text-center transition-all ${
                    method === 'rosegold'
                      ? 'border-2 border-[#583119] bg-[#f0ede9] text-[#3e1c06] font-semibold shadow-xs'
                      : 'border border-[#d6c3ba] bg-[#fcf9f4] text-[#51443d] hover:border-[#583119]'
                  }`}
                >
                  앤틱 로즈골드
                </button>
              </div>
            </div>

            {/* 3. Font Style Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#3e1c06] mb-2">
                3. 서체 스타일 선택
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFont('serif')}
                  className={`py-2.5 px-2 rounded text-xs text-center font-serif transition-all ${
                    font === 'serif'
                      ? 'border-2 border-[#583119] bg-[#f0ede9] text-[#3e1c06] font-semibold'
                      : 'border border-[#d6c3ba] bg-[#fcf9f4] text-[#51443d] hover:border-[#583119]'
                  }`}
                >
                  클래식 세리프
                </button>
                <button
                  type="button"
                  onClick={() => setFont('script')}
                  className={`py-2.5 px-2 rounded text-xs text-center transition-all ${
                    font === 'script'
                      ? 'border-2 border-[#583119] bg-[#f0ede9] text-[#3e1c06] font-semibold'
                      : 'border border-[#d6c3ba] bg-[#fcf9f4] text-[#51443d] hover:border-[#583119]'
                  }`}
                >
                  우아한 필기체
                </button>
                <button
                  type="button"
                  onClick={() => setFont('sans')}
                  className={`py-2.5 px-2 rounded text-xs text-center font-sans transition-all ${
                    font === 'sans'
                      ? 'border-2 border-[#583119] bg-[#f0ede9] text-[#3e1c06] font-semibold'
                      : 'border border-[#d6c3ba] bg-[#fcf9f4] text-[#51443d] hover:border-[#583119]'
                  }`}
                >
                  단정한 고딕
                </button>
              </div>
            </div>

            {/* Leather Swatch Choice (Subtle tactile toggle) */}
            <div>
              <label className="block text-xs font-semibold text-[#3e1c06] mb-2">
                가죽 색상 시각화
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLeatherColor('cognac')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all ${
                    leatherColor === 'cognac'
                      ? 'bg-[#583119] text-white font-medium'
                      : 'bg-[#ebe8e3] text-[#51443d] hover:bg-[#e0dcd5]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#815439] inline-block"></span>
                  코냑 브라운
                </button>
                <button
                  type="button"
                  onClick={() => setLeatherColor('ebony')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all ${
                    leatherColor === 'ebony'
                      ? 'bg-[#583119] text-white font-medium'
                      : 'bg-[#ebe8e3] text-[#51443d] hover:bg-[#e0dcd5]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1c1c19] inline-block"></span>
                  에보니 블랙
                </button>
                <button
                  type="button"
                  onClick={() => setLeatherColor('green')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all ${
                    leatherColor === 'green'
                      ? 'bg-[#583119] text-white font-medium'
                      : 'bg-[#ebe8e3] text-[#51443d] hover:bg-[#e0dcd5]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1f3629] inline-block"></span>
                  포레스트 그린
                </button>
              </div>
            </div>

            {/* Apply and Gift CTA */}
            <div className="pt-2">
              <button
                id="apply-engraving-cta"
                type="button"
                onClick={handleApply}
                className="w-full py-3.5 bg-[#C84B31] text-[#FAF7F2] text-sm font-medium rounded hover:bg-[#a83b23] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Gift className="w-4 h-4" />
                이 문구로 맞춤 선물 제작하기 (무료 각인 포함)
              </button>

              {appliedNotification && (
                <div className="mt-2.5 p-2.5 bg-[#f0ede9] border border-[#d6c3ba] rounded text-xs text-[#3e1c06] flex items-center justify-center gap-1.5 animate-fadeIn">
                  <Check className="w-4 h-4 text-[#C84B31]" />
                  <span>
                    각인 문구 <strong>"{text || 'H. G. LEE'}"</strong> ({getMethodTagText()})가 맞춤 제작 옵션에 적용되었습니다.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
