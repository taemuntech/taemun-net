'use client';

import React, { useState } from 'react';

interface CanvasItem {
  id: number;
  type: string;
  emoji: string;
  name: string;
  color: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

const INITIAL_ITEMS: CanvasItem[] = [
  { id: 1, type: 'paper', emoji: '✂️', name: '자연 한지 꼴라주', color: '#FCD34D', x: 20, y: 30, rotate: -8, scale: 1.1 },
  { id: 2, type: 'clay', emoji: '🏺', name: '테라코타 흙 빚기', color: '#E07A5F', x: 60, y: 25, rotate: 12, scale: 1.2 },
  { id: 3, type: 'leaf', emoji: '🍃', name: '숲속 나뭇잎 오브제', color: '#81B29A', x: 35, y: 60, rotate: 25, scale: 1.0 },
  { id: 4, type: 'paint', emoji: '🖌️', name: '수채 물감 번짐', color: '#60A5FA', x: 75, y: 65, rotate: -15, scale: 1.3 },
];

export function InteractiveCollageSection() {
  const [items, setItems] = useState<CanvasItem[]>(INITIAL_ITEMS);
  const [selectedPalette, setSelectedPalette] = useState<'warm' | 'forest' | 'sunset'>('warm');
  const [activeItem, setActiveItem] = useState<CanvasItem | null>(INITIAL_ITEMS[0]);

  const palettes = {
    warm: { name: '선샤인 웜톤 (Yellow & Coral)', bg: 'bg-[#FFFDF9]', border: 'border-[#F4D06F]' },
    forest: { name: '자연 숲속 힐링톤 (Forest & Olive)', bg: 'bg-[#F4F9F5]', border: 'border-[#A3C9A8]' },
    sunset: { name: '노을 감성 팔레트 (Terracotta & Rose)', bg: 'bg-[#FCF5F3]', border: 'border-[#E8B4A6]' },
  };

  const handleShuffle = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        x: Math.floor(Math.random() * 60) + 15,
        y: Math.floor(Math.random() * 50) + 20,
        rotate: Math.floor(Math.random() * 50) - 25,
      }))
    );
  };

  const handleAddObject = (emoji: string, name: string, color: string) => {
    const newItem: CanvasItem = {
      id: Date.now(),
      type: 'custom',
      emoji,
      name,
      color,
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 50) + 20,
      rotate: Math.floor(Math.random() * 40) - 20,
      scale: 1.1,
    };
    setItems((prev) => [...prev, newItem]);
    setActiveItem(newItem);
  };

  return (
    <section id="collage-section" className="py-20 lg:py-28 bg-[#F4F0E8] border-b border-[#E8E2D9] text-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#E07A5F] block mb-2">
            Asymmetrical Creative Collage Canvas
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#2D2A26] mb-4">
            직접 오브제를 배치해보는 감성 꼴라주 캔버스
          </h2>
          <p className="text-sm lg:text-base text-[#5C554D] leading-relaxed">
            아틀리에 키즈의 시그니처 꼴라주 수업 방식을 웹에서 직접 체험해 보세요. 자연 재료 오브제를 클릭하고 캔버스에 조화롭게 얹으며 아이의 감수성을 느껴보실 수 있습니다.
          </p>
        </div>

        {/* Control Toolbar */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 lg:p-6 mb-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          {/* Palette Picker */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <span className="text-xs font-semibold text-[#7A7369] whitespace-nowrap">감성 테마:</span>
            <div className="flex gap-2">
              {(['warm', 'forest', 'sunset'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPalette(key)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all min-h-[44px] ${
                    selectedPalette === key
                      ? 'bg-[#2D2A26] text-white shadow'
                      : 'bg-[#F4F0E8] text-[#5C554D] hover:bg-[#E8E2D9]'
                  }`}
                >
                  {palettes[key].name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Add Elements */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 lg:pb-0">
            <span className="text-xs font-semibold text-[#7A7369] whitespace-nowrap">오브제 추가:</span>
            <button
              type="button"
              onClick={() => handleAddObject('🌟', '별빛 홀로그램지', '#FCD34D')}
              className="px-3 py-2 rounded-xl bg-[#FFF9E6] border border-[#FCD34D] text-xs font-medium text-[#B45309] hover:brightness-95 active:scale-95 min-h-[44px]"
            >
              🌟 홀로그램
            </button>
            <button
              type="button"
              onClick={() => handleAddObject('🐚', '바다 조개껍질', '#F472B6')}
              className="px-3 py-2 rounded-xl bg-[#FDF2F8] border border-[#F472B6] text-xs font-medium text-[#BE185D] hover:brightness-95 active:scale-95 min-h-[44px]"
            >
              🐚 조개껍질
            </button>
            <button
              type="button"
              onClick={() => handleAddObject('🌿', '야생 유칼립투스', '#34D399')}
              className="px-3 py-2 rounded-xl bg-[#ECFDF5] border border-[#34D399] text-xs font-medium text-[#047857] hover:brightness-95 active:scale-95 min-h-[44px]"
            >
              🌿 나뭇가지
            </button>
          </div>

          {/* Shuffle & Reset */}
          <button
            type="button"
            onClick={handleShuffle}
            className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-[#E07A5F] text-white text-xs font-semibold hover:bg-[#c9684f] active:scale-95 transition-all shadow min-h-[44px]"
          >
            🎲 캔버스 셔플 (자유 재배치)
          </button>
        </div>

        {/* Interactive Canvas Board */}
        <div className="relative">
          <div
            className={`relative w-full h-[460px] lg:h-[540px] rounded-3xl border-4 ${palettes[selectedPalette].border} ${palettes[selectedPalette].bg} overflow-hidden shadow-inner transition-colors duration-500`}
          >
            {/* Organic Background Texture Blobs */}
            <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#F4A261]/15 blur-2xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-[#81B29A]/15 blur-2xl pointer-events-none" />

            {/* Draggable/Clickable Elements */}
            {items.map((item) => {
              const isSelected = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className="absolute cursor-pointer select-none transition-all duration-300 group"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: `translate(-50%, -50%) rotate(${item.rotate}deg) scale(${item.scale})`,
                  }}
                >
                  <div
                    className={`p-4 rounded-3xl bg-white shadow-xl border-2 flex items-center gap-3 transition-transform group-hover:scale-110 active:scale-95 ${
                      isSelected ? 'border-[#E07A5F] ring-4 ring-[#E07A5F]/20' : 'border-[#E8E2D9]'
                    }`}
                  >
                    <span className="text-3xl">{item.emoji}</span>
                    <div className="pr-2">
                      <p className="text-xs font-bold text-[#2D2A26] whitespace-nowrap">{item.name}</p>
                      <span className="text-[10px] text-[#7A7369] block">터치하여 활성화</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canvas Inspector Tooltip */}
          {activeItem && (
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E8E2D9] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeItem.emoji}</span>
                <div>
                  <h4 className="text-sm font-bold text-[#2D2A26]">선택된 오브제: {activeItem.name}</h4>
                  <p className="text-xs text-[#7A7369]">
                    프랑스 꼴라주 커리큘럼에서 아이들의 소근육 감각과 공간 균형감을 길러주는 핵심 조형 재료입니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((i) => (i.id === activeItem.id ? { ...i, rotate: i.rotate + 15 } : i))
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#F4F0E8] text-xs font-semibold text-[#2D2A26] hover:bg-[#E8E2D9] min-h-[44px]"
                >
                  ↻ 회전하기
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((i) => (i.id === activeItem.id ? { ...i, scale: Math.min(i.scale + 0.1, 1.6) } : i))
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#F4F0E8] text-xs font-semibold text-[#2D2A26] hover:bg-[#E8E2D9] min-h-[44px]"
                >
                  ⊕ 확대
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
