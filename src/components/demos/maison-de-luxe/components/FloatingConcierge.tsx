import React from 'react';
import { Headphones } from 'lucide-react';

interface FloatingConciergeProps {
  onOpen: () => void;
}

// 예전에는 hover 로 펼쳐지는 `max-w-0` 글자띠가 붙어 있었다 — 터치 기기에서는 영영 안 펼쳐지고
// 검사에는 「가로 잘림」으로 잡혔다. 아이콘 버튼 + aria-label 로 바꿨다.
export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ onOpen }) => {
  return (
    <aside aria-label="빠른 실행" className="fixed bottom-6 right-6 z-30">
      <button
        type="button"
        className="h-14 w-14 bg-[#f2ca50] text-[#0e0e0e] rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
        onClick={onOpen}
        aria-label="프라이빗 컨시어지 상담 열기"
        title="프라이빗 컨시어지 상담"
      >
        <Headphones className="w-6 h-6" />
      </button>
    </aside>
  );
};
