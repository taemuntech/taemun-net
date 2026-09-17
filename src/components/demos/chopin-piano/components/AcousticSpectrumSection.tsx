'use client';

import React, { useState } from 'react';

export function AcousticSpectrumSection() {
  const [selectedHall, setSelectedHall] = useState<'vienna' | 'berlin' | 'salon'>('vienna');

  const hallProfiles = {
    vienna: {
      name: '빈 무지크페어라인 황금홀 시뮬레이션 (예시)',
      reverb: '2.05s',
      clarity: 'C80 +2.8dB',
      damping: '고음역 자연 감쇄율 18%',
      desc: '풍부하고 따뜻한 골든 배음이 공간 전체를 감싸는 낭만주의 대곡 최적 음향 세팅입니다.',
      harmonics: [100, 85, 72, 60, 48, 35, 24, 15],
    },
    berlin: {
      name: '베를린 필하모니 빈야드 스타일 (예시)',
      reverb: '1.82s',
      clarity: 'C80 +3.6dB',
      damping: '투명하고 정밀한 중고음 분해능',
      desc: '바흐, 모차르트, 베토벤의 폴리포니 성부 분리와 명료한 타건 아티큘레이션에 이상적입니다.',
      harmonics: [100, 78, 65, 58, 42, 38, 29, 21],
    },
    salon: {
      name: '쇼팽하우스 프라이빗 살롱 (Steinway D-274)',
      reverb: '1.45s',
      clarity: 'C80 +4.2dB',
      damping: '1:1 레슨 모니터링 최적 설계',
      desc: '연주자의 섬세한 손가락 타건 압력과 페달 배음의 번짐을 즉시 귀로 확인할 수 있는 정밀 음향 부스입니다.',
      harmonics: [100, 90, 80, 68, 55, 42, 30, 18],
    },
  };

  const current = hallProfiles[selectedHall];

  return (
    <section id="spectrum-section" className="py-20 lg:py-28 bg-[#121110] border-b border-[#2d2926] text-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block mb-2">
            Acoustic & Resonance Telemetry
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#f5f0eb] mb-4">
            음향 잔향과 배음 스펙트럼의 정밀 계측
          </h2>
          <p className="text-sm lg:text-base text-[#a89f95] leading-relaxed">
            클래식 피아노 연주는 타건의 세기뿐 아니라 공간 음향 잔향(Reverberation)과의 호흡이 결정합니다. 쇼팽하우스의 3대 음향 프로파일을 실시간 비교해 보십시오.
          </p>
        </div>

        {/* Hall Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(['vienna', 'berlin', 'salon'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setSelectedHall(mode)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                selectedHall === mode
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] shadow-lg'
                  : 'bg-[#1c1917] border border-[#38322c] text-[#b0a79d] hover:text-white'
              }`}
            >
              {hallProfiles[mode].name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Telemetry Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Reverb Metric */}
          <div className="bg-[#1a1715] border border-[#38322c] rounded-2xl p-6 shadow-md">
            <span className="text-xs text-[#a89f95] block mb-1">최적 공간 잔향 시간 (RT60)</span>
            <p className="text-3xl font-serif font-bold text-[#d4af37] mb-2">{current.reverb}</p>
            <p className="text-xs text-[#8c8276] leading-relaxed">{current.damping}</p>
          </div>

          {/* Card 2: Clarity Metric */}
          <div className="bg-[#1a1715] border border-[#38322c] rounded-2xl p-6 shadow-md">
            <span className="text-xs text-[#a89f95] block mb-1">음향 명료도 지수 (C80)</span>
            <p className="text-3xl font-serif font-bold text-[#d4af37] mb-2">{current.clarity}</p>
            <p className="text-xs text-[#8c8276] leading-relaxed">직접음과 초기 반사음의 황금비율</p>
          </div>

          {/* Card 3: Sound Feature */}
          <div className="bg-[#1a1715] border border-[#38322c] rounded-2xl p-6 shadow-md">
            <span className="text-xs text-[#a89f95] block mb-1">공간 튜닝 특성</span>
            <p className="text-lg font-serif font-semibold text-[#f5f0eb] mb-2">프리미엄 룸 어쿠스틱</p>
            <p className="text-xs text-[#8c8276] leading-relaxed">{current.desc}</p>
          </div>
        </div>

        {/* Harmonic Distribution Graph Visualization */}
        <div className="bg-[#181513] border border-[#38322c] rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-semibold text-[#f5f0eb]">
                기본 주파수 대비 1~8차 고조파 배음 분포도 (Harmonic Series)
              </h3>
              <p className="text-xs text-[#8c8276] mt-1">
                스타인웨이 D-274 타건 시 울려 퍼지는 배음의 공간 감쇄 패턴을 보여줍니다.
              </p>
            </div>
            <span className="text-xs font-mono text-[#d4af37] px-3 py-1 rounded bg-[#2a241e] border border-[#524434]">
              {current.name}
            </span>
          </div>

          <div className="grid grid-cols-8 gap-2 items-end h-48 pt-6 border-b border-[#2d2926]">
            {current.harmonics.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-mono text-[#c5a880]">{h}%</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#8c7322] to-[#d4af37] transition-all duration-500 shadow"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-[#70685e] font-mono whitespace-nowrap">
                  {i === 0 ? '기음(f0)' : `${i + 1}배음`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-6 text-xs text-[#8c8276]">
            <span>※ 음향 계측 데이터는 당사 음향 연구소의 실측 주파수 모델링을 기반으로 한 가상 예시입니다.</span>
            <span className="font-mono text-[#c5a880]">Steinway & Sons Acoustic Verified (예시)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
