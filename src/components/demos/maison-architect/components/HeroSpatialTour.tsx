import React from 'react';
import { Sun, Moon, Plus, Sparkles } from 'lucide-react';
import { ROOM_HERO_IMAGE } from '../data/products';

interface HeroSpatialTourProps {
  lightingMood: 'day' | 'night';
  setLightingMood: (mood: 'day' | 'night') => void;
  /** 핀 하나 = 그 상품 하나. 상세 모달을 연다(그 상품만 장바구니에 담긴다). */
  onOpenProduct: (productId: string) => void;
  /** 번들 배너 전용 — 3종 묶음 드로어 */
  onOpenBundle: () => void;
}

type HotspotProps = {
  top: string;
  left: string;
  label: string;
  title: string;
  price: string;
  note: string;
  onOpen: () => void;
};

/**
 * 이미지 위 펄스 핀.
 * 눌리는 영역은 모바일에서 44px 가 되게 **바깥 버튼에 여백**을 주고, 보이는 동그라미는 안쪽 span 이 그린다.
 * (동그라미 자체를 키우면 사진 위 디자인이 달라진다.)
 */
function Hotspot({ top, left, label, title, price, note, onOpen }: HotspotProps) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group" style={{ top, left }}>
      <button
        onClick={onOpen}
        className="flex items-center justify-center p-1.5 max-lg:p-2.5 cursor-pointer"
        aria-label={label}
      >
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#fff8f4] text-[#100e0d] shadow-lg transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
          <span className="absolute inset-0 rounded-full bg-[#fff8f4]/70 pulse-ring pointer-events-none" />
          <Plus className="w-4 h-4 z-10" />
        </span>
      </button>
      <div className="hidden lg:group-hover:flex absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-[#100e0d]/95 text-[#fff8f4] rounded-lg shadow-xl text-left pointer-events-none whitespace-nowrap flex-col gap-0.5 backdrop-blur-sm border border-[#d0c4c0]/20 animate-in fade-in zoom-in-95 duration-150">
        <span className="text-[11px] font-semibold text-[#e9c176]">{title}</span>
        <span className="text-xs font-medium">{price}</span>
        <span className="text-[10px] text-[#ccc5c3]">{note}</span>
      </div>
    </div>
  );
}

/** 공간 번들 배너 — lg 에서는 사진 위에 떠 있고, 모바일에서는 사진 아래 블록으로 내려온다 */
function BundleBanner({ onOpen }: { onOpen: () => void }) {
  return (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <Sparkles className="w-3 h-3 text-[#944931] shrink-0" />
          <p className="text-[10px] font-bold text-[#944931] uppercase tracking-wider">
            SPATIAL BUNDLE CURATION
          </p>
        </div>
        <h4 className="text-sm font-semibold text-[#100e0d]">이 공간의 모든 가구 한 번에 구매</h4>
        <p className="text-xs text-[#7f7571] mt-0.5">
          소파 + 황동 조명 + 트래버틴 테이블 <span className="text-[#944931] font-semibold">(12% 세트 특가)</span>
        </p>
      </div>
      <button
        onClick={onOpen}
        className="px-4 min-h-11 lg:min-h-0 lg:py-2 shrink-0 bg-[#100e0d] text-[#fff8f4] rounded-lg text-xs font-semibold tracking-wider whitespace-nowrap hover:bg-[#262322] transition-colors active:scale-95 shadow-sm"
      >
        패키지 보기
      </button>
    </>
  );
}

export const HeroSpatialTour: React.FC<HeroSpatialTourProps> = ({
  lightingMood,
  setLightingMood,
  onOpenProduct,
  onOpenBundle
}) => {
  return (
    <section id="spatial-tour" className="relative w-full bg-[#fbf2eb] overflow-hidden border-b border-[#d0c4c0]/30">
      {/* Top HUD / Breadcrumbs & Ambient Lighting Switcher */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#7f7571] mb-2 uppercase">
            <span>RESIDENTIAL SHOWCASE</span>
            <span>•</span>
            <span className="text-[#944931]">한남 르가든 레지던스 컬렉션</span>
          </div>
          <h1 className="font-serif text-3xl lg:text-5xl text-[#100e0d] font-light tracking-tight">
            고요한 텍스처와 빛이 머무는 거실
          </h1>
        </div>

        {/* Ambient Lighting Switcher Control HUD */}
        <div className="flex items-center gap-2 p-1.5 bg-[#fff8f4] rounded-xl border border-[#d0c4c0]/60 shadow-xs self-start lg:self-auto">
          <button
            onClick={() => setLightingMood('day')}
            aria-pressed={lightingMood === 'day'}
            className={`px-3.5 min-h-11 lg:min-h-0 lg:py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
              lightingMood === 'day'
                ? 'bg-[#100e0d] text-[#fff8f4] shadow-xs'
                : 'text-[#4d4542] hover:text-[#100e0d]'
            }`}
          >
            <Sun className="w-3.5 h-3.5 shrink-0" />
            <span>자연광 5000K</span>
          </button>
          <button
            onClick={() => setLightingMood('night')}
            aria-pressed={lightingMood === 'night'}
            className={`px-3.5 min-h-11 lg:min-h-0 lg:py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
              lightingMood === 'night'
                ? 'bg-[#100e0d] text-[#fff8f4] shadow-xs'
                : 'text-[#4d4542] hover:text-[#100e0d]'
            }`}
          >
            <Moon className="w-3.5 h-3.5 shrink-0" />
            <span>나이트 무드 3000K</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Viewport with Hotspots */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pb-10">
        <div className="relative w-full aspect-[16/10] lg:aspect-[21/9] rounded-xl overflow-hidden shadow-[0_16px_40px_-8px_rgba(38,35,34,0.08)] border border-[#d0c4c0]/50 bg-[#100e0d]/5">
          {/* Base Visual Image */}
          <img
            id="roomHeroImg"
            src={ROOM_HERO_IMAGE}
            alt="MAISON ARCHITECT Living Room Spatial Showcase"
            className="w-full h-full object-cover transition-transform duration-700"
          referrerPolicy="no-referrer" />

          {/* 3000K Ambient Indirect Lighting Warm Overlay */}
          <div
            className={`absolute inset-0 bg-[#312100]/30 mix-blend-color-burn pointer-events-none transition-opacity duration-700 ${
              lightingMood === 'night' ? 'opacity-80' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#261900]/50 via-[#312100]/20 to-transparent pointer-events-none transition-opacity duration-700 ${
              lightingMood === 'night' ? 'opacity-90' : 'opacity-0'
            }`}
          />

          <Hotspot
            top="68%"
            left="28%"
            label="아틀리에 부클레 4인 소파 상세 보기"
            title="아틀리에 부클레 4인 소파"
            price="₩2,850,000"
            note="클릭하여 상세 스펙 및 옵션 보기"
            onOpen={() => onOpenProduct('sofa')}
          />
          <Hotspot
            top="18%"
            left="46%"
            label="황동 아크 플로어 스탠드 상세 보기"
            title="황동 아크 플로어 스탠드"
            price="₩620,000"
            note="핸드크래프트 솔리드 브라스 3000K"
            onOpen={() => onOpenProduct('lamp')}
          />
          <Hotspot
            top="78%"
            left="54%"
            label="트래버틴 로우 오가닉 테이블 상세 보기"
            title="트래버틴 로우 오가닉 테이블"
            price="₩980,000"
            note="직수입 천연석 혼드 마감"
            onOpen={() => onOpenProduct('table')}
          />

          {/* Floating Spatial Bundle Banner — lg 이상에서만 사진 위에 얹는다.
              375 에서는 이 배너가 사진의 절반과 핀 두 개를 덮어 핀을 누를 수 없었다. */}
          <div className="hidden lg:flex absolute bottom-4 left-8 max-w-md bg-[#fff8f4]/92 backdrop-blur-md p-4 rounded-xl border border-[#d0c4c0]/60 shadow-lg items-center justify-between gap-4">
            <BundleBanner onOpen={onOpenBundle} />
          </div>
        </div>

        {/* 모바일·태블릿에서는 사진 아래 블록으로 */}
        <div className="lg:hidden mt-4 bg-[#fff8f4] p-4 rounded-xl border border-[#d0c4c0]/60 shadow-xs flex items-center justify-between gap-3">
          <BundleBanner onOpen={onOpenBundle} />
        </div>
      </div>
    </section>
  );
};
