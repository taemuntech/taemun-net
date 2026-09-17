import React from 'react';
import { ShoppingBag, CheckCircle2, Plus } from 'lucide-react';
import { SYNERGY_BUNDLE } from '../data/mockData';

interface SynergyBundleProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    optionText: string;
  }) => void;
}

export const SynergyBundle: React.FC<SynergyBundleProps> = ({ onAddToCart }) => {
  const handleAddBundle = () => {
    onAddToCart({
      id: SYNERGY_BUNDLE.id,
      name: '장벽 앰플 & 100시간 크림 듀오 시너지 케어 세트',
      price: SYNERGY_BUNDLE.price,
      originalPrice: SYNERGY_BUNDLE.originalPrice,
      imageUrl: SYNERGY_BUNDLE.thumb1,
      optionText: '시카 앰플 50ml + 장벽 리페어 크림 80ml (기획 특가 42% OFF)',
    });
  };

  return (
    <section id="bundle-section" className="py-12 bg-[#f9f9ff]">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="dew-glass-tier2 rounded-3xl p-6 lg:p-10 border border-white shadow-xl relative overflow-hidden bg-white">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 max-w-[60vw] bg-[#85f8c4]/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Narrative Column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[#ff6b6b]/20 text-[#ae2f34] text-xs font-bold">
                {SYNERGY_BUNDLE.subBadge}
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-[#141b2b] leading-tight tracking-tight">
                장벽 앰플 &amp; 100시간 크림 <br />
                듀오 시너지 케어 솔루션
              </h2>
              <p className="text-sm text-[#3d4a42] leading-relaxed">
                {SYNERGY_BUNDLE.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#3d4a42] pt-2 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006948]" />
                  <span>{SYNERGY_BUNDLE.items[0]}</span>
                </div>
                <span className="text-[#6d7a72] font-bold">+</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006948]" />
                  <span>{SYNERGY_BUNDLE.items[1]}</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Duo Preview & Commerce Box */}
            <div className="lg:col-span-7 flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#f1f3ff]/70 rounded-2xl p-6 border border-[#bccac0]/30 shadow-2xs">
              {/* Duo Preview Thumbnails */}
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200 shadow-2xs">
                  <img
                    src={SYNERGY_BUNDLE.thumb1}
                    alt="Cica ampoule preview"
                    className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" />
                </div>
                <span className="text-2xl font-black text-[#006948]">+</span>
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-200 shadow-2xs">
                  <img
                    src={SYNERGY_BUNDLE.thumb2}
                    alt="Barrier cream preview"
                    className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" />
                </div>
              </div>

              {/* Price & CTA Block */}
              <div className="text-right flex-1 lg:border-l lg:border-gray-200 lg:pl-6 space-y-3 w-full">
                <div>
                  <span className="text-xs bg-[#ffdad6] text-[#ae2f34] px-2 py-0.5 rounded font-bold">
                    {SYNERGY_BUNDLE.badge}
                  </span>
                  <div className="flex items-baseline justify-end gap-2.5 mt-1.5">
                    <span className="text-2xl lg:text-3xl font-extrabold text-[#141b2b]">
                      ₩{SYNERGY_BUNDLE.price.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-[#6d7a72]">
                      ₩{SYNERGY_BUNDLE.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddBundle}
                  className="w-full py-3.5 bg-[#006948] hover:bg-[#00855d] active:scale-[0.98] text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  듀오 세트 특가로 담기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
