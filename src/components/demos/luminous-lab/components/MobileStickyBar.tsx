import React from 'react';
import { Heart, Zap } from 'lucide-react';

interface MobileStickyBarProps {
  isHeroWished: boolean;
  onToggleHeroWish: () => void;
  onQuickBuy: () => void;
  price: number;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  isHeroWished,
  onToggleHeroWish,
  onQuickBuy,
  price,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#bccac0]/30 p-3 shadow-2xl pb-safe">
      <div className="flex items-center gap-3">
        <button
          aria-label="관심상품 등록"
          onClick={onToggleHeroWish}
          className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#ae2f34] shrink-0 active:scale-95 transition-all cursor-pointer bg-white"
        >
          <Heart
            className={`w-6 h-6 transition-colors ${ isHeroWished ? 'fill-[#ae2f34] text-[#ae2f34]' : 'text-gray-500' }`}
          />
        </button>
        <button
          onClick={onQuickBuy}
          className="flex-1 h-12 bg-[#006948] active:scale-[0.98] text-white rounded-full font-bold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-[#006948]/20 cursor-pointer"
        >
          <Zap className="w-5 h-5 fill-white" />
          오늘드림 구매하기 (₩{price.toLocaleString()})
        </button>
      </div>
    </div>
  );
};
