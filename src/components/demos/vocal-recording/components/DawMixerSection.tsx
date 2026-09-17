'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_TRACKS } from '../data/vocalData';
import { TrackChannel } from '../types';

export function DawMixerSection() {
  const [tracks, setTracks] = useState<TrackChannel[]>(INITIAL_TRACKS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(80);
  const [reverbWet, setReverbWet] = useState(30);
  const [playTime, setPlayTime] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
  const masterGainRef = useRef<GainNode | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  isPlayingRef.current = isPlaying;

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(masterVolume / 100, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    tracks.forEach((t) => {
      const g = ctx.createGain();
      g.gain.setValueAtTime((t.volume / 100) * (t.isMuted ? 0 : 1), ctx.currentTime);
      g.connect(masterGain);
      gainNodesRef.current.set(t.id, g);
    });
  };

  const startSynthesizer = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const chords = [
      { v: 440, p: [261.63, 329.63, 392.00], b: 130.81 },
      { v: 392, p: [220.00, 261.63, 329.63], b: 110.00 },
      { v: 349.23, p: [174.61, 220.00, 261.63], b: 87.31 },
      { v: 493.88, p: [196.00, 246.94, 293.66], b: 98.00 },
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (!isPlayingRef.current || !audioCtxRef.current) {
        clearInterval(interval);
        return;
      }
      const now = audioCtxRef.current.currentTime;
      const c = chords[step % chords.length];

      const vNode = gainNodesRef.current.get('track-1');
      if (vNode) {
        const osc = audioCtxRef.current.createOscillator();
        const g = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(c.v, now);
        g.gain.setValueAtTime(0.08, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(g);
        g.connect(vNode);
        osc.start(now);
        osc.stop(now + 0.5);
      }

      const pNode = gainNodesRef.current.get('track-2');
      if (pNode) {
        c.p.forEach((freq) => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const g = audioCtxRef.current.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          g.gain.setValueAtTime(0.04, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.connect(g);
          g.connect(pNode);
          osc.start(now);
          osc.stop(now + 0.45);
        });
      }

      const bNode = gainNodesRef.current.get('track-3');
      if (bNode) {
        const osc = audioCtxRef.current.createOscillator();
        const g = audioCtxRef.current.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(c.b, now);
        g.gain.setValueAtTime(0.05, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(g);
        g.connect(bNode);
        osc.start(now);
        osc.stop(now + 0.3);
      }

      const dNode = gainNodesRef.current.get('track-4');
      if (dNode) {
        const osc = audioCtxRef.current.createOscillator();
        const g = audioCtxRef.current.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(step % 2 === 0 ? 80 : 180, now);
        g.gain.setValueAtTime(0.03, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.connect(g);
        g.connect(dNode);
        osc.start(now);
        osc.stop(now + 0.08);
      }

      step++;
      setPlayTime((t) => t + 0.5);
    }, 500);
  }, []);

  const togglePlay = () => {
    initAudio();
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      startSynthesizer();
    }
  };

  const handleVolumeChange = (trackId: string, vol: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, volume: vol } : t))
    );
    const node = gainNodesRef.current.get(trackId);
    if (node && audioCtxRef.current) {
      const track = tracks.find((t) => t.id === trackId);
      const isMuted = track?.isMuted ?? false;
      node.gain.setValueAtTime(isMuted ? 0 : vol / 100, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = (trackId: string) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id !== trackId) return t;
        const nextMute = !t.isMuted;
        const node = gainNodesRef.current.get(trackId);
        if (node && audioCtxRef.current) {
          node.gain.setValueAtTime(nextMute ? 0 : t.volume / 100, audioCtxRef.current.currentTime);
        }
        return { ...t, isMuted: nextMute };
      })
    );
  };

  const toggleSolo = (trackId: string) => {
    setTracks((prev) => {
      const target = prev.find((t) => t.id === trackId);
      const nextSolo = !target?.isSolo;
      return prev.map((t) => {
        const isCurrent = t.id === trackId;
        const soloState = isCurrent ? nextSolo : false;
        const node = gainNodesRef.current.get(t.id);
        if (node && audioCtxRef.current) {
          const effectiveVol = nextSolo ? (isCurrent ? t.volume / 100 : 0) : t.volume / 100;
          node.gain.setValueAtTime(t.isMuted ? 0 : effectiveVol, audioCtxRef.current.currentTime);
        }
        return { ...t, isSolo: soloState };
      });
    });
  };

  const handleMasterChange = (vol: number) => {
    setMasterVolume(vol);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(vol / 100, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      tracks.forEach((track, index) => {
        if (track.isMuted) return;
        const ampFactor = isPlaying ? (track.volume / 100) * 24 : 3;
        const freq = 0.015 + index * 0.008;

        ctx.strokeStyle = track.color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < width; x += 2) {
          const y = midY + Math.sin(x * freq + phase + index) * ampFactor * Math.cos((x / width) * Math.PI);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      if (isPlaying) phase += 0.06;
      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [tracks, isPlaying]);

  const formatSecs = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="daw-mixer" className="py-20 lg:py-28 bg-[#0F1117] border-y border-[#1F2430]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-widest block mb-2">
            INTERACTIVE DAW CONSOLE
          </span>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
            멀티트랙 오디오 파형 &amp; DAW 믹서
          </h2>
          <p className="text-xs lg:text-sm text-zinc-400 mt-2">
            보컬, 피아노, 베이스, 드럼 각 스템(Stem)의 밸런스를 조절하며 실제 레코딩 엔지니어링 세션을 체험해 보십시오.
          </p>
        </div>

        <div className="bg-[#151922] border border-[#262F3E] rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 border-b border-[#242D3D] mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer min-h-[44px] shadow-lg ${
                  isPlaying
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                    : 'bg-pink-500 text-white hover:brightness-110 shadow-pink-500/20'
                }`}
              >
                <span>{isPlaying ? '일시정지' : '멀티트랙 재생'}</span>
              </button>

              <div className="px-3.5 py-1.5 rounded-lg bg-[#0B0C10] border border-[#242B38] text-mono text-xs text-pink-400 font-mono">
                {formatSecs(playTime)}
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Audio Engine Ready (Web Audio API)</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-400">Master</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={masterVolume}
                  onChange={(e) => handleMasterChange(Number(e.target.value))}
                  className="w-24 accent-pink-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-zinc-300 w-8">{masterVolume}%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-zinc-400">Reverb</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reverbWet}
                  onChange={(e) => setReverbWet(Number(e.target.value))}
                  className="w-20 accent-purple-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-zinc-300 w-8">{reverbWet}%</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-36 lg:h-44 bg-[#0B0C10] rounded-2xl border border-[#242B38] overflow-hidden mb-8">
            <canvas
              ref={canvasRef}
              width={1000}
              height={176}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-4 flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                MULTI-CHANNEL FREQUENCY SPECTRUM
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="p-4 rounded-2xl bg-[#0F1219] border border-[#232B3A] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: track.color }}
                    />
                    <span className="text-xs font-bold text-white truncate max-w-[130px]">
                      {track.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1A1F2C] text-zinc-400">
                    {track.category}
                  </span>
                </div>

                <div className="h-2 w-full bg-[#181D28] rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full transition-all duration-150 rounded-full"
                    style={{
                      width: track.isMuted ? '0%' : `${track.volume}%`,
                      backgroundColor: track.color,
                      opacity: isPlaying ? 1 : 0.4,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-[10px] text-zinc-500 font-mono">0</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={track.isMuted ? 0 : track.volume}
                    onChange={(e) => handleVolumeChange(track.id, Number(e.target.value))}
                    disabled={track.isMuted}
                    className="w-full accent-pink-500 cursor-pointer disabled:opacity-40"
                  />
                  <span className="text-[10px] text-zinc-300 font-mono w-7 text-right">
                    {track.isMuted ? 'M' : `${track.volume}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleMute(track.id)}
                    className={`py-2 rounded-lg text-xs font-bold transition-colors min-h-[38px] flex items-center justify-center cursor-pointer ${
                      track.isMuted
                        ? 'bg-red-500/25 text-red-400 border border-red-500/40'
                        : 'bg-[#1C2330] text-zinc-400 hover:text-white'
                    }`}
                  >
                    MUTE
                  </button>
                  <button
                    onClick={() => toggleSolo(track.id)}
                    className={`py-2 rounded-lg text-xs font-bold transition-colors min-h-[38px] flex items-center justify-center cursor-pointer ${
                      track.isSolo
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                        : 'bg-[#1C2330] text-zinc-400 hover:text-white'
                    }`}
                  >
                    SOLO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
