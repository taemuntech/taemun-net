'use client';

import React, { useState } from 'react';
import { MusicGenreMode } from '../types';

export const RT60AcousticHUD: React.FC = () => {
  const [genre, setGenre] = useState<MusicGenreMode>('vocal-jazz');

  const getAcousticProfile = () => {
    switch (genre) {
      case 'vocal-jazz':
        return {
          rt60: '0.38s (예시)',
          clarity: '보컬 포커스 98% (예시)',
          feel: '밀도 높고 건조하며 정위감이 뚜렷한 스튜디오 사운드',
          diffusers: '후면 집중 확산 (QRD 2D)',
        };
      case 'chamber':
        return {
          rt60: '0.55s (예시)',
          clarity: '현악 잔향감 94% (예시)',
          feel: '바이올린과 첼로의 배음이 풍성하게 살아나는 자연스러운 홀 톤',
          diffusers: '측벽 및 천장 복합 확산',
        };
      case 'symphony':
        return {
          rt60: '0.78s (예시)',
          clarity: '대편성 공간감 91% (예시)',
          feel: '오케스트라 투티의 웅장한 다이내믹과 광활한 사운드 스테이지',
          diffusers: '전방향 입체 분산 모드',
        };
    }
  };

  const profile = getAcousticProfile();

  return (
    <section id="rt60" className="scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)] py-24 bg-[#faf6f0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-[#8c6544] tracking-widest uppercase block mb-2">
            ROOM ACOUSTIC SIMULATOR
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#2e2319] tracking-tight mb-4">
            음악 장르별 최적의 울림, <br />
            <span className="italic font-light text-[#8c6544]">잔향 시간(RT60) 튜닝 시뮬레이션</span>
          </h2>
          <p className="text-xs lg:text-sm text-[#6b523e] font-light leading-relaxed">
            보컬 재즈의 정확한 음상부터 대편성 오케스트라의 웅장한 여운까지, 가변 어쿠스틱 벽체로 제어되는 잔향 시간을 체험해 보세요.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 lg:p-10 border border-[#ebdcd0] shadow-sm space-y-8">
          {/* Genre Toggle Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#ebdcd0] pb-6">
            <div>
              <span className="text-[10px] font-mono text-[#856b54] uppercase block">ACTIVE ACOUSTIC MODE</span>
              <h3 className="font-serif text-xl font-bold text-[#2e2319]">장르별 가변 어쿠스틱 프리셋</h3>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['vocal-jazz', 'chamber', 'symphony'] as MusicGenreMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={genre === mode}
                  onClick={() => setGenre(mode)}
                  className={`min-h-[44px] py-2.5 px-4 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    genre === mode
                      ? 'bg-[#5c422c] text-white shadow'
                      : 'bg-[#faf6f0] text-[#6b523e] hover:bg-[#eedbc9]'
                  }`}
                >
                  {mode === 'vocal-jazz' && '재즈 & 보컬'}
                  {mode === 'chamber' && '현악 실내악'}
                  {mode === 'symphony' && '대편성 교향곡'}
                </button>
              ))}
            </div>
          </div>

          {/* Telemetry Readout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#ebdcd0] text-center">
              <span className="text-[11px] font-mono text-[#856b54] block mb-1">REVERBERATION (RT60)</span>
              <span className="font-serif text-3xl lg:text-4xl font-bold text-[#5c422c]">{profile.rt60}</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf6f0] border border-[#ebdcd0] text-center">
              <span className="text-[11px] font-mono text-[#856b54] block mb-1">CLARITY INDEX (C80)</span>
              <span className="font-serif text-3xl lg:text-4xl font-bold text-[#2e2319]">{profile.clarity}</span>
            </div>

            <div className="lg:col-span-2 p-5 rounded-2xl bg-[#faf6f0] border border-[#ebdcd0] space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#856b54] font-mono">음향 디퓨저 구동:</span>
                <span className="font-medium text-[#2e2319]">{profile.diffusers}</span>
              </div>
              <p className="text-xs text-[#6b523e] font-light pt-1 border-t border-[#ebdcd0]/60">
                {profile.feel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
