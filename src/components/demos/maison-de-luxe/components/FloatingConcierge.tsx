import React from 'react';
import { Headphones } from 'lucide-react';

interface FloatingConciergeProps {
  onOpen: () => void;
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ onOpen }) => {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-30">
      <button
        type="button"
        className="p-3.5 lg:p-4 bg-[#f2ca50] text-[#0e0e0e] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-all group cursor-pointer"
        onClick={onOpen}
        title="VIP 전담 컨시어지 연결"
      >
        <Headphones className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-[11px] tracking-widest px-0 group-hover:px-2 font-bold">
          PRIVATE CONCIERGE
        </span>
      </button>
    </aside>
  );
};
