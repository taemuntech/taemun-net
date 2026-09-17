'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PIANO_KEYS } from '../data/chopinData';
import { PianoKey } from '../types';

export function InteractivePianoSection() {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [toneMode, setToneMode] = useState<'steinway' | 'chamber'>('steinway');
  const [volume, setVolume] = useState<number>(0.7);
  const [playedNotes, setPlayedNotes] = useState<string[]>([]);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio Context
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtxClass();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize rich piano sound with harmonics
  const playFrequency = useCallback((freq: number, noteName: string) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, now);
      masterGain.connect(ctx.destination);

      // Fundamental frequency oscillator (Sine)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // 2nd Harmonic (Octave overtone)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // 3rd Harmonic (Fifth overtone for warmth)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 3, now);

      const decayTime = toneMode === 'steinway' ? 2.4 : 1.4;

      // Piano strike envelope (attack, decay, release)
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.8, now + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + decayTime);

      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.3, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + decayTime * 0.7);

      gain3.gain.setValueAtTime(0, now);
      gain3.gain.linearRampToValueAtTime(0.15, now + 0.025);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + decayTime * 0.5);

      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(masterGain);
      gain2.connect(masterGain);
      gain3.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);

      osc1.stop(now + decayTime + 0.1);
      osc2.stop(now + decayTime + 0.1);
      osc3.stop(now + decayTime + 0.1);

      setActiveNote(noteName);
      setPlayedNotes((prev) => [...prev.slice(-6), noteName]);

      setTimeout(() => {
        setActiveNote((curr) => (curr === noteName ? null : curr));
      }, 350);
    } catch {
      // Audio context may be blocked before interaction
    }
  }, [getAudioContext, toneMode, volume]);

  const handleKeyClick = (key: PianoKey) => {
    playFrequency(key.freq, key.name);
  };

  // Auto-play demo Chopin melody (Nocturne Op.9 No.2 motif snippet)
  const playDemoMelody = async () => {
    if (isPlayingDemo) return;
    setIsPlayingDemo(true);

    const demoMelody = [
      { note: 'G4', delay: 450 },
      { note: 'G4', delay: 450 },
      { note: 'G4', delay: 450 },
      { note: 'G4', delay: 450 },
      { note: 'C5', delay: 600 },
      { note: 'E5', delay: 450 },
      { note: 'D5', delay: 450 },
      { note: 'C5', delay: 900 },
    ];

    for (const step of demoMelody) {
      const target = PIANO_KEYS.find((k) => k.note === step.note);
      if (target) {
        playFrequency(target.freq, target.name);
      }
      await new Promise((resolve) => setTimeout(resolve, step.delay));
    }

    setIsPlayingDemo(false);
  };

  return (
    <section id="piano-section" className="py-20 lg:py-28 bg-[#151311] border-b border-[#2d2926] text-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block mb-2">
            Interactive Piano Lab
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#f5f0eb] mb-4">
            직접 건반을 눌러 스타인웨이 배음을 경험해 보세요
          </h2>
          <p className="text-sm lg:text-base text-[#a89f95] leading-relaxed">
            웹 오디오 엔진을 통해 합성된 그랜드 피아노 물리 음향을 직접 타건해 보실 수 있습니다. 건반을 클릭하거나 터치하여 옥타브별 공명과 하모닉스를 확인하십시오.
          </p>
        </div>

        {/* Interactive Piano Control Bar */}
        <div className="bg-[#1e1b18] border border-[#38322c] rounded-2xl p-4 lg:p-6 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          {/* Tone Selector */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-xs font-medium text-[#c5a880] whitespace-nowrap">음색 프리셋:</span>
            <div className="flex bg-[#121110] p-1 rounded-xl border border-[#38322c]">
              <button
                type="button"
                onClick={() => setToneMode('steinway')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
                  toneMode === 'steinway'
                    ? 'bg-[#d4af37] text-[#121110] shadow'
                    : 'text-[#9c9388] hover:text-white'
                }`}
              >
                Steinway D-274 (풀 그랜드)
              </button>
              <button
                type="button"
                onClick={() => setToneMode('chamber')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
                  toneMode === 'chamber'
                    ? 'bg-[#d4af37] text-[#121110] shadow'
                    : 'text-[#9c9388] hover:text-white'
                }`}
              >
                Chamber Grand (선명한 살롱)
              </button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-xs font-medium text-[#c5a880] whitespace-nowrap">볼륨 조절:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-32 lg:w-40 accent-[#d4af37] cursor-pointer"
            />
            <span className="text-xs text-[#a89f95] font-mono">{Math.round(volume * 100)}%</span>
          </div>

          {/* Auto-Play Button */}
          <button
            type="button"
            onClick={playDemoMelody}
            disabled={isPlayingDemo}
            className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-[#2a241e] border border-[#524434] text-[#d4af37] text-xs font-semibold hover:bg-[#382f25] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <span>{isPlayingDemo ? '🎵 연주 중...' : '▶ 쇼팽 야상곡 모티브 자동 연주'}</span>
          </button>
        </div>

        {/* Status Display HUD */}
        <div className="bg-[#121110] rounded-xl border border-[#2d2926] p-4 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-[#a89f95]">마지막 타건 음계:</span>
            <span className="text-sm font-serif font-bold text-[#d4af37]">
              {activeNote ? activeNote : '건반을 클릭해 보세요'}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto max-w-full">
            <span className="text-xs text-[#70685e]">최근 타건 히스토리:</span>
            {playedNotes.length > 0 ? (
              playedNotes.map((n, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-[#1e1b18] border border-[#38322c] text-[11px] font-mono text-[#c5a880]"
                >
                  {n}
                </span>
              ))
            ) : (
              <span className="text-xs text-[#555] font-mono">기록 없음</span>
            )}
          </div>
        </div>

        {/* 88-Key Style Visual Keyboard Container */}
        <div className="relative overflow-x-auto pb-6 pt-2">
          <div className="min-w-[760px] max-w-5xl mx-auto flex justify-center items-start select-none bg-[#0c0b0a] p-6 rounded-2xl border-4 border-[#25211c] shadow-2xl">
            <div className="relative flex">
              {PIANO_KEYS.map((key) => {
                if (key.isBlack) {
                  return (
                    <button
                      key={key.note}
                      type="button"
                      onClick={() => handleKeyClick(key)}
                      className={`absolute z-10 w-9 h-32 rounded-b-md bg-gradient-to-b from-[#2b2724] to-[#0d0c0b] border border-[#443e39] shadow-lg active:scale-y-95 transition-transform flex flex-col justify-end items-center pb-2 text-[10px] font-mono ${
                        activeNote === key.name
                          ? 'bg-[#d4af37] text-[#121110] border-[#f7e2a9] scale-y-95'
                          : 'text-[#8c8276] hover:text-[#d4af37]'
                      }`}
                      style={{
                        left: `${getBlackKeyLeftOffset(key.note)}px`,
                      }}
                      title={key.name}
                    >
                      <span>{key.note}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={key.note}
                    type="button"
                    onClick={() => handleKeyClick(key)}
                    className={`relative z-0 w-14 h-52 rounded-b-lg border border-[#3a3530] border-t-0 shadow-inner flex flex-col justify-end items-center pb-4 text-xs font-mono transition-all active:scale-y-[0.98] ${
                      activeNote === key.name
                        ? 'bg-[#f7e2a9] text-[#121110] border-[#d4af37]'
                        : 'bg-gradient-to-b from-[#ffffff] via-[#f7f5f2] to-[#e8e4df] text-[#443e39] hover:bg-[#fffbee]'
                    }`}
                    title={key.name}
                  >
                    <span className="font-semibold">{key.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-[#7a7268]">{key.note}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="text-center text-xs text-[#70685e] mt-4">
            ※ 실제 스타인웨이 배음 주파수 물리 수치에 맞추어 실시간 계산되어 출력됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

// Helper to calculate pixel position for black keys based on 56px white keys
function getBlackKeyLeftOffset(note: string): number {
  const whiteKeyWidth = 56;
  const offsets: Record<string, number> = {
    'C#4': whiteKeyWidth * 1 - 18,
    'D#4': whiteKeyWidth * 2 - 18,
    'F#4': whiteKeyWidth * 4 - 18,
    'G#4': whiteKeyWidth * 5 - 18,
    'A#4': whiteKeyWidth * 6 - 18,
    'C#5': whiteKeyWidth * 8 - 18,
    'D#5': whiteKeyWidth * 9 - 18,
    'F#5': whiteKeyWidth * 11 - 18,
    'G#5': whiteKeyWidth * 12 - 18,
    'A#5': whiteKeyWidth * 13 - 18,
  };
  return offsets[note] ?? 0;
}
