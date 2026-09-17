import React from 'react';
import { CheckCircle2, Award, Sparkles, ShieldCheck, PenTool, Star } from 'lucide-react';
import { MASTER_ARTISAN_HERO_IMAGE } from '../data';

export const HeroSection: React.FC = () => {
  return (
    <section id="leathercraft" className="max-w-7xl mx-auto px-4 lg:px-12 py-10 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Editorial Story & Headline */}
        <div className="lg:col-span-6 flex flex-col space-y-4 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2">
            <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider bg-[#583119]/10 text-[#583119] rounded">
              30-YEAR MASTER ATELIER
            </span>
            <span className="text-xs text-[#83746c]">장인의 정성과 시간의 기록</span>
          </div>

          <h1 className="text-3xl lg:text-4xl lg:text-[40px] font-serif text-[#3e1c06] tracking-tight leading-[1.2]">
            세상에 단 하나뿐인 당신만의 시간을 새깁니다
            <span className="block text-[#815439] text-lg lg:text-xl font-serif mt-2 font-normal">
              ARTISAN &amp; GIFT "베지터블 레더 비스포크 월렛"
            </span>
          </h1>

          <p className="text-sm lg:text-[15px] text-[#51443d] leading-relaxed">
            30년 경력의 가죽공예 대한민국 전승 명장이 전통 오크 통 무두질을 거친 이탈리아산 최고급 풀그레인
            베지터블 레더 위에, 한 땀 한 땀 마구용 새들 스티치를 놓아 완성합니다. 당신만을 위한 불도장 인장을 새겨
            단 하나의 가치를 전해보세요.
          </p>

          {/* 4 Critical Badges */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            <div className="p-3 bg-[#f6f3ee] border border-[#d6c3ba]/50 rounded">
              <div className="flex items-center gap-2 text-[#583119]">
                <CheckCircle2 className="w-4 h-4 text-[#815439] shrink-0" />
                <span className="text-xs font-semibold">이탈리아 베지터블 풀그레인</span>
              </div>
              <p className="text-[11px] text-[#83746c] mt-1">친환경 식물성 탄닌 무두질 가죽</p>
            </div>

            <div className="p-3 bg-[#f6f3ee] border border-[#d6c3ba]/50 rounded">
              <div className="flex items-center gap-2 text-[#583119]">
                <Sparkles className="w-4 h-4 text-[#815439] shrink-0" />
                <span className="text-xs font-semibold">린카블레 린넨사 스티치</span>
              </div>
              <p className="text-[11px] text-[#83746c] mt-1">프랑스 전통 공정 수작업 무소음 새들스티치</p>
            </div>

            <div className="p-3 bg-[#f6f3ee] border border-[#d6c3ba]/50 rounded">
              <div className="flex items-center gap-2 text-[#583119]">
                <PenTool className="w-4 h-4 text-[#815439] shrink-0" />
                <span className="text-xs font-semibold">에지코트 4회 핸드 마감</span>
              </div>
              <p className="text-[11px] text-[#83746c] mt-1">사포질과 건조를 반복한 단면 결착</p>
            </div>

            <div className="p-3 bg-[#f6f3ee] border border-[#d6c3ba]/50 rounded">
              <div className="flex items-center gap-2 text-[#583119]">
                <ShieldCheck className="w-4 h-4 text-[#815439] shrink-0" />
                <span className="text-xs font-semibold">장인 정기 품질 케어 (예시)</span>
              </div>
              <p className="text-[11px] text-[#83746c] mt-1">마스터 아틀리에 1:1 전담 보증제</p>
            </div>
          </div>

          {/* Hero Actions */}
          <div className="pt-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            <a
              id="hero-simulator-cta"
              href="#bespoke-simulator"
              className="px-6 py-3.5 bg-[#583119] text-[#FAF7F2] text-sm font-medium rounded hover:bg-[#422310] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Award className="w-4 h-4" />
              실시간 맞춤 각인 주문하기
            </a>
            <a
              id="hero-collection-cta"
              href="#collection"
              className="px-6 py-3.5 border border-[#3e1c06]/30 text-[#3e1c06] text-sm font-medium rounded hover:bg-[#3e1c06]/5 transition-colors flex items-center justify-center"
            >
              아틀리에 컬렉션 둘러보기
            </a>
          </div>

          {/* Trust Citation */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#51443d] pt-2">
            <span className="flex items-center gap-1 text-[#C84B31]">
              <Star className="w-4 h-4 fill-[#C84B31] text-[#C84B31]" />
              <strong className="text-[#3e1c06] font-bold">4.98</strong>
              <span className="text-[#83746c]">(누적 2,420건 제작)</span>
            </span>
            <span className="text-[#d6c3ba]">|</span>
            <span className="text-[#51443d]">한국전통문화전당 공예공모전 명장선정작</span>
          </div>
        </div>

        {/* Right Column: Master Artisan Workshop Photograph */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative bg-[#ebe8e3] p-2 rounded-xl shadow-lg border border-[#d6c3ba]/40">
            <div className="relative overflow-hidden rounded-lg group">
              <img
                src={MASTER_ARTISAN_HERO_IMAGE}
                alt="공방에서 손바느질로 지갑을 제작 중인 장인의 모습"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Floating Origin Stamp Chip */}
              <div className="absolute bottom-3 left-3 bg-[#fcf9f4]/95 backdrop-blur-md px-3 py-2 .5 rounded border border-[#d6c3ba]/60 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C84B31] flex items-center justify-center text-white text-xs font-serif font-bold shrink-0">
                  匠
                </div>
                <div>
                  <p className="text-xs text-[#3e1c06] font-bold">
                    한국가죽공예협회 공인 장인
                  </p>
                  <p className="text-[10px] text-[#83746c]">
                    박 명 훈 수석 아르티장 직조
                  </p>
                </div>
              </div>

              {/* Top Right Authenticity Seal */}
              <div className="absolute top-3 right-3 bg-[#3e1c06]/90 text-[#FAF7F2] text-[10px] font-medium px-3 py-1.5 rounded tracking-wider shadow-sm">
                ORIGINAL HERITAGE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
