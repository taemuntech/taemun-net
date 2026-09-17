'use client';

import React, { useState } from 'react';
import { VOCAL_SAMPLES } from '../data/vocalData';
import { VocalTrackSample } from '../types';

export function AuditionTracksSection() {
  const [activeTrackId, setActiveTrackId] = useState<string>(VOCAL_SAMPLES[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleTrack = (id: string) => {
    if (activeTrackId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveTrackId(id);
      setIsPlaying(true);
    }
  };

  return (
    <section id="audition-tracks" className="py-20 lg:py-28 bg-[#0F1117] border-t border-[#1F2430]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-2">
              STUDIO DEMO SHOWCASE
            </span>
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
              실제 수강생 오디션 &amp; 음원 포트폴리오
            </h2>
          </div>
          <p className="text-xs lg:text-sm text-zinc-400 max-w-md">
            전문 보컬 디렉터의 마이크 코칭과 믹싱 엔지니어의 정밀 튜닝을 거친 실전 마스터 음원 샘플입니다.
          </p>
        </div>

        <div className="space-y-4">
          {VOCAL_SAMPLES.map((sample: VocalTrackSample) => {
            const isSelected = activeTrackId === sample.id;
            const trackPlaying = isSelected && isPlaying;

            return (
              <div
                key={sample.id}
                className={`p-5 lg:p-6 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-[#161B26] border-pink-500/40 shadow-xl shadow-pink-500/10'
                    : 'bg-[#12151E] border-[#222938] hover:border-[#323D52]'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTrack(sample.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base transition-transform active:scale-90 cursor-pointer min-h-[44px] min-w-[44px] ${
                        trackPlaying
                          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                          : 'bg-[#222A3A] text-zinc-300 hover:text-white'
                      }`}
                      aria-label="재생 토글"
                    >
                      {trackPlaying ? '일시정지' : '재생'}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                          {sample.genre}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {sample.bpm} BPM · Key: {sample.key}
                        </span>
                      </div>
                      <h3 className="text-base lg:text-lg font-bold text-white">
                        {sample.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {sample.artist} · {sample.duration}
                      </p>
                    </div>
                  </div>

                  <div className="lg:max-w-md w-full">
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                      {sample.description}
                    </p>

                    <div className="w-full h-1.5 bg-[#202736] rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 ${
                          trackPlaying ? 'w-2/3 animate-pulse' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
