'use client';

import React, { useState, useRef } from 'react';

interface PitchKey {
  note: string;
  octave: number;
  freq: number;
}

const KEYS: PitchKey[] = [
  { note: 'C', octave: 3, freq: 130.81 },
  { note: 'D', octave: 3, freq: 146.83 },
  { note: 'E', octave: 3, freq: 164.81 },
  { note: 'F', octave: 3, freq: 174.61 },
  { note: 'G', octave: 3, freq: 196.00 },
  { note: 'A', octave: 3, freq: 220.00 },
  { note: 'B', octave: 3, freq: 246.94 },
  { note: 'C', octave: 4, freq: 261.63 },
  { note: 'D', octave: 4, freq: 293.66 },
  { note: 'E', octave: 4, freq: 329.63 },
  { note: 'F', octave: 4, freq: 349.23 },
  { note: 'G', octave: 4, freq: 392.00 },
  { note: 'A', octave: 4, freq: 440.00 },
  { note: 'B', octave: 4, freq: 493.88 },
  { note: 'C', octave: 5, freq: 523.25 },
  { note: 'D', octave: 5, freq: 587.33 },
  { note: 'E', octave: 5, freq: 659.25 },
  { note: 'F', octave: 5, freq: 698.46 },
  { note: 'G', octave: 5, freq: 783.99 },
  { note: 'A', octave: 5, freq: 880.00 },
  { note: 'C', octave: 6, freq: 1046.50 },
];

export function VocalRangeSection() {
  const [selectedKey, setSelectedKey] = useState<PitchKey>(KEYS[7]); // C4
  const [genderTab, setGenderTab] = useState<'male' | 'female'>('male');
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = (key: PitchKey) => {
    setSelectedKey(key);

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(key.freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  };

  const getRegisterInfo = (key: PitchKey) => {
    if (key.octave === 3) {
      return {
        register: '흉성 (Chest Voice)',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        desc: '성대의 두터운 접촉과 가슴 공명이 주를 이루는 안정적인 중저음 구간입니다.',
      };
    }
    if (key.octave === 4 && (key.note === 'C' || key.note === 'D' || key.note === 'E')) {
      return {
        register: '중성 / 1차 파사지오 (Bridge)',
        color: 'text-pink-400',
        bg: 'bg-pink-500/10 border-pink-500/30',
        desc: '성대 긴장이 높아지며 성구 전환이 시작되는 구간으로, 릴랙스와 호흡 지지가 필수적입니다.',
      };
    }
    if (key.octave === 4 || (key.octave === 5 && (key.note === 'C' || key.note === 'D'))) {
      return {
        register: '믹스보이스 / 두성 (Head Voice)',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10 border-purple-500/30',
        desc: '윤상갑상근(CT) 활성화와 인두강 공명을 통한 파워풀하고 날카로운 고음 구간입니다.',
      };
    }
    return {
      register: '초고음 두성 / 휘슬 레지스터',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/30',
      desc: '초고역 공명강을 활용하여 왜곡 없이 맑고 청명하게 뻗어나가는 고난도 음역대입니다.',
    };
  };

  const currentInfo = getRegisterInfo(selectedKey);

  return (
    <section id="vocal-range" className="py-20 lg:py-28 bg-[#0B0C10]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-2">
            PITCH &amp; REGISTER DIAGNOSTIC
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
            보컬 음역대 &amp; 성구 전환(Passaggio) 진단
          </h2>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2">
            건반을 클릭하여 음정을 듣고, 현재 나의 발성 상태가 흉성·믹스·두성 중 어디에 속하는지 확인해 보십시오.
          </p>
        </div>

        <div className="bg-[#151922] border border-[#262F3E] rounded-3xl p-6 lg:p-8 max-w-4xl mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setGenderTab('male')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] flex items-center ${
                genderTab === 'male'
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                  : 'bg-[#1D2330] text-zinc-400 hover:text-white'
              }`}
            >
              남성 보컬 기준 음역 (C3 - A4)
            </button>
            <button
              onClick={() => setGenderTab('female')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[44px] flex items-center ${
                genderTab === 'female'
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20'
                  : 'bg-[#1D2330] text-zinc-400 hover:text-white'
              }`}
            >
              여성 보컬 기준 음역 (A3 - C6)
            </button>
          </div>

          <div className="overflow-x-auto pb-4 mb-8">
            <div className="flex items-end justify-center min-w-[620px] gap-1.5 p-3 bg-[#0B0C10] rounded-2xl border border-[#232B3A]">
              {KEYS.map((k) => {
                const isSelected = selectedKey.note === k.note && selectedKey.octave === k.octave;
                return (
                  <button
                    key={`${k.note}${k.octave}`}
                    onClick={() => playTone(k)}
                    className={`flex flex-col items-center justify-end pb-3 rounded-lg transition-all min-h-[110px] w-8 lg:w-10 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-t from-pink-500 to-purple-500 text-white scale-105 shadow-lg shadow-pink-500/30'
                        : 'bg-[#1E2532] text-zinc-300 hover:bg-[#2A3446]'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-zinc-400">{k.octave}</span>
                    <span className="text-xs font-bold">{k.note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`p-6 rounded-2xl border ${currentInfo.bg} flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6`}>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl lg:text-2xl font-black text-white">
                  {selectedKey.note}
                  {selectedKey.octave}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  ({selectedKey.freq.toFixed(1)} Hz)
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-[#0B0C10] ${currentInfo.color}`}>
                  {currentInfo.register}
                </span>
              </div>
              <p className="text-xs lg:text-sm text-zinc-300 leading-relaxed">
                {currentInfo.desc}
              </p>
            </div>

            <div className="lg:text-right shrink-0">
              <span className="text-[11px] text-zinc-400 block mb-1">권장 훈련 테크닉</span>
              <span className="text-xs font-bold text-pink-300 bg-[#0B0C10] px-3 py-1.5 rounded-xl border border-pink-500/20">
                립트릴(Lip Trill) &amp; 포먼트 튜닝
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
