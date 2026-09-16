"use client";

import React from 'react';
import { Play, ArrowRight, Video, ListMusic } from 'lucide-react';
import { VIDEOS } from '../data';
import { VideoItem } from '../types';

interface MediaShowcaseSectionProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const MediaShowcaseSection: React.FC<MediaShowcaseSectionProps> = ({
  onSelectVideo,
}) => {
  const mainVideo = VIDEOS[0];
  const brandVideo = VIDEOS[1];
  const highlightClips = VIDEOS.slice(2);

  return (
    <section className="py-20 bg-[#f2f3ff] relative" id="media">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-4 bg-[#003d9b] rounded-full" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#003d9b] font-semibold">
                Media Room &amp; PR Theater
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#131b2e] tracking-tight">
              원익큐앤씨 공식 홍보영상 쇼케이스
            </h2>
            <p className="text-base text-[#434654] mt-2">
              반도체 혁신을 이끄는 40년의 담대한 여정과 첨단 클린룸 제조 설비를 영상으로 확인하십시오.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectVideo(mainVideo)}
            className="mt-4 lg:mt-0 inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#003d9b] hover:text-[#0c56d0] transition-colors cursor-pointer"
          >
            <span>홍보영상 아카이브 전체보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Two-Channel Prominent Video Players */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Feature Channel 1: 40주년 기념 홍보 영상 (8 cols) */}
          <div className="lg:col-span-8 group relative bg-[#283044] rounded-xl overflow-hidden border border-[#c3c6d6]/40 shadow-md flex flex-col justify-between">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={mainVideo.posterUrl}
                alt={mainVideo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#283044] via-transparent to-black/30 pointer-events-none" />

              {/* Cinematic Player Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#283044]/85 backdrop-blur-md px-3 py-1 rounded border border-white/15 text-white font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping" />
                <span>40th ANNIVERSARY SPECIAL FILM</span>
                <span className="bg-[#0052cc]/60 text-[#c6e7ff] px-1.5 py-0.5 rounded text-[10px] font-bold">
                  4K UHD
                </span>
              </div>

              {/* Central Play Button */}
              <button
                type="button"
                onClick={() => onSelectVideo(mainVideo)}
                aria-label="Play 40th Anniversary Video"
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-[#0052cc]/90 hover:bg-[#0052cc] text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110 border border-white/30 backdrop-blur-sm cursor-pointer z-10"
              >
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </button>

              {/* Video Progress Bar HUD */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-5">
                <div className="flex justify-between items-center text-white mb-2 text-xs font-mono">
                  <span className="font-medium text-[#c6e7ff]">원익큐앤씨 40주년 기념 홍보 영상</span>
                  <span>{mainVideo.duration} / HD</span>
                </div>
                <div
                  className="w-full bg-white/20 h-1 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => onSelectVideo(mainVideo)}
                >
                  <div className="bg-[#0052cc] h-full w-2/5 relative">
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#283044]">
              <h3 className="text-xl font-bold text-white mb-2">
                {mainVideo.title}
              </h3>
              <p className="text-sm text-[#d2d9f4] leading-relaxed">
                {mainVideo.description}
              </p>
            </div>
          </div>

          {/* Feature Channel 2: 첨단 제조 및 혁신 기업 홍보 영상 & Highlight Clips (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Top Card: Brand Film */}
            <div className="group relative bg-[#283044] rounded-xl overflow-hidden border border-[#c3c6d6]/40 shadow-md flex-1 flex flex-col justify-between">
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={brandVideo.posterUrl}
                  alt={brandVideo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#283044] via-transparent to-black/30 pointer-events-none" />

                <div className="absolute top-3 left-3 bg-[#003d9b]/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-white font-mono text-[11px] font-semibold">
                  BRAND FILM
                </div>

                <button
                  type="button"
                  onClick={() => onSelectVideo(brandVideo)}
                  aria-label="Play Corporate Brand Video"
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 hover:bg-white text-[#003d9b] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 cursor-pointer z-10"
                >
                  <Play className="w-6 h-6 fill-[#003d9b] translate-x-0.5" />
                </button>

                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-white font-mono text-xs">
                  {brandVideo.duration}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {brandVideo.title}
                  </h4>
                  <p className="text-xs text-[#d2d9f4] leading-relaxed line-clamp-3">
                    {brandVideo.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[#c6e7ff] text-xs font-mono">
                  <span>CHAPTER: {brandVideo.chapterText}</span>
                  <Video className="w-4 h-4 text-[#c6e7ff]" />
                </div>
              </div>
            </div>

            {/* Video Chapter Quick Select Panel */}
            <div className="bg-white p-5 rounded-xl border border-[#c3c6d6]/40 shadow-xs">
              <h5 className="text-base font-bold text-[#131b2e] mb-3 flex items-center gap-2">
                <ListMusic className="w-5 h-5 text-[#003d9b]" />
                추천 하이라이트 클립
              </h5>

              <div className="space-y-2">
                {highlightClips.map((clip, index) => (
                  <button
                    key={clip.id}
                    type="button"
                    onClick={() => onSelectVideo(clip)}
                    className="w-full p-2.5 rounded-lg hover:bg-[#eaedff] flex items-center justify-between text-sm text-[#131b2e] transition-colors text-left cursor-pointer group"
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className="font-mono text-xs text-[#003d9b] font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate group-hover:text-[#003d9b] transition-colors">
                        {clip.title}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-[#737685] shrink-0 ml-2">
                      {clip.duration}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
