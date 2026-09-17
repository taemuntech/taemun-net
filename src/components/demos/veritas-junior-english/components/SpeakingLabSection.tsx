'use client';

import React, { useState, useRef } from 'react';

export function SpeakingLabSection() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const sampleSentence = "The mysterious lighthouse guided the sailors safely through the stormy sea.";

  const playVoiceSample = () => {
    setIsPlayingAudio(true);
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    // Harmonic warm beep simulation of model reading
    const freqs = [330, 392, 440, 523, 587, 440, 392];
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.25);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.25 + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.25);
      osc.stop(ctx.currentTime + idx * 0.25 + 0.22);
    });

    setTimeout(() => {
      setIsPlayingAudio(false);
    }, freqs.length * 250);
  };

  const metrics = [
    { label: '파닉스 발음 정확도 (Phonics Accuracy)', score: 94, color: 'bg-emerald-500' },
    { label: '스피킹 유창성 및 쉼표 휴지 (Fluency & Pausing)', score: 91, color: 'bg-blue-600' },
    { label: '억양 및 강세 자연스러움 (Intonation & Stress)', score: 88, color: 'bg-indigo-500' },
    { label: '어휘 활용 풍부도 (Lexical Variety)', score: 92, color: 'bg-purple-600' },
    { label: '복문 구문 완성도 (Sentence Complexity)', score: 85, color: 'bg-teal-500' },
  ];

  return (
    <section id="speaking-lab" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            AI SPEECH TELEMETRY LAB
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-[#0F2942] tracking-tight">
            AI 음성인식 기반 스피킹 &amp; 발음 진단 리포트
          </h2>
          <p className="text-xs lg:text-sm text-slate-600 mt-2">
            원어민 표준 발화 데이터와 실시간 비교하여 강세, 연음, 억양의 오차를 0.1초 단위로 분석합니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 lg:p-10 shadow-lg">
          {/* Audio Test Bar */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                실전 발화 모범 구문 (Grade 3 Chapter Book)
              </span>
              <p className="font-serif text-base lg:text-lg font-bold text-[#0F2942]">
                &ldquo;{sampleSentence}&rdquo;
              </p>
            </div>

            <button
              onClick={playVoiceSample}
              disabled={isPlayingAudio}
              className="px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer min-h-[44px]"
            >
              <span>{isPlayingAudio ? '🔊 음성 재생 중...' : '▶️ 원어민 발음 듣기'}</span>
            </button>
          </div>

          {/* Metrics Bars */}
          <div className="space-y-6 mb-8">
            {metrics.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>{item.label}</span>
                  <span className="font-mono font-bold text-[#0F2942]">{item.score}점 / 100</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Badge */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <p className="font-bold text-slate-800">원어민 수준 유창성 판정 (Advanced High - 예시)</p>
                <p className="text-slate-500">모음 장단음 및 자음 클러스터(/str/, /th/) 발화 정확도 상위 3% (예시)</p>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono text-[11px]">
              Veritas AI Diagnostics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
