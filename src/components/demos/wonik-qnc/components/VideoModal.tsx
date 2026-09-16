"use client";

import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Film,
} from 'lucide-react';
import { VideoItem } from '../types';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(84); // 01:24 simulated default
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!video) return;
    setIsPlaying(true);
    setCurrentTime(Math.min(84, Math.floor(video.durationSeconds / 3)));
  }, [video]);

  // Simulation timer for playback
  useEffect(() => {
    let interval: any;
    if (isPlaying && video) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= video.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, video]);

  if (!video) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / (video.durationSeconds || 1)) * 100;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      id="videoModal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#283044] rounded-xl overflow-hidden border border-[#c6e7ff]/30 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#283044]/95">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c6e7ff] animate-pulse" />
            <span className="font-bold text-white text-base truncate max-w-lg">
              {video.title}
            </span>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 transition-colors cursor-pointer rounded hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cinematic Viewport Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden select-none">
          <img
            src={video.posterUrl}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-70 scale-[1.02]' : 'opacity-85'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Live Playback HUD Animation Simulation */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/90 via-transparent to-black/50">
            <div className="flex justify-between items-center text-white font-mono text-xs">
              <span className="bg-[#0052cc]/70 px-2.5 py-0.5 rounded font-semibold tracking-wider flex items-center gap-1.5">
                <Film className="w-3 h-3 text-[#c6e7ff]" />
                {video.badge || "DIRECTOR'S CUT"}
              </span>
              <span className="bg-black/50 px-2 py-0.5 rounded">
                TOTAL {video.duration}
              </span>
            </div>

            {/* Centered Interactive Play/Pause Simulator */}
            <div className="flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#0052cc] hover:bg-[#003d9b] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl border border-white/30 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white translate-x-0.5" />
                )}
              </button>
              <span className="font-mono text-xs text-white/85 mt-3 tracking-wider bg-black/60 px-3 py-1 rounded-full">
                {isPlaying
                  ? 'HIGH FIDELITY STREAMING ACTIVE'
                  : 'STREAMING PAUSED (클릭하여 재생)'}
              </span>
            </div>

            {/* Scrub Bar & Controls */}
            <div>
              <div className="flex justify-between items-center font-mono text-xs text-white/80 mb-2">
                <span>{formatTime(currentTime)} / {video.duration}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentTime(0)}
                    className="hover:text-white p-1"
                    title="처음으로"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white p-1"
                    title={isMuted ? '음소거 해제' : '음소거'}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <span>HD 1080P 60FPS</span>
                </div>
              </div>

              {/* Progress Slider */}
              <div
                className="w-full bg-white/25 h-2 rounded-full overflow-hidden cursor-pointer relative"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(
                    Math.floor(clickPos * (video.durationSeconds || 100))
                  );
                }}
              >
                <div
                  className="bg-[#c6e7ff] h-full transition-all duration-150"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Details */}
        <div className="p-4 bg-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
          <span className="text-xs lg:text-sm text-[#131b2e] font-medium">
            원익큐앤씨 미디어 아카이브 공식 등록 영상 • 고화질 스트리밍
          </span>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs text-[#003d9b] font-bold hover:underline cursor-pointer"
          >
            플레이어 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
