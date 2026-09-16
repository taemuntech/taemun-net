import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenVdr: () => void;
}

export default function PortfolioModal({ item, onClose, onOpenVdr }: PortfolioModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#161c24] border border-[#f2ca50]/40 rounded-xl max-w-2xl w-full p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 bg-[#f2ca50]/15 border border-[#f2ca50]/30 text-[#f2ca50] font-mono-metric text-[11px] rounded">
            {item.badge}
          </span>
          <span className="px-2.5 py-1 bg-[#00a572]/20 text-[#4edea3] font-mono-metric text-[11px] rounded">
            ESG RATING {item.esgRating}
          </span>
        </div>

        <h3 className="font-serif-display text-2xl lg:text-3xl text-[#dee2ef] mb-1">
          {item.title}
        </h3>
        <p className="font-mono-metric text-xs text-[#d0c5af] mb-4">{item.subtitle}</p>

        <div className="grid grid-cols-2 gap-4 py-4 my-4 border-y border-[#4d4635]/30">
          <div>
            <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
              투자 집행 규모 (Ticket Size)
            </span>
            <div className="font-mono-metric text-base lg:text-lg text-[#f2ca50] font-semibold mt-1">
              {item.ticketSize}
            </div>
          </div>
          <div>
            <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
              목표 실현 배수 (Target MoIC)
            </span>
            <div className="font-mono-metric text-base lg:text-lg text-[#4edea3] font-semibold mt-1">
              {item.targetMoic}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1">
            핵심 투자 가설 &amp; 밸류업 프로그램
          </span>
          <p className="text-sm text-[#d0c5af] leading-relaxed mb-3">
            {item.description}
          </p>
          <p className="text-sm text-[#dee2ef] bg-[#090e17] p-3.5 rounded border border-[#4d4635]/30 leading-relaxed">
            {item.fullThesis}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-[#30353e] hover:bg-[#343943] text-[#dee2ef] rounded text-xs transition-colors"
          >
            닫기
          </button>
          <a
            href="#vdr"
            onClick={() => {
              onClose();
              onOpenVdr();
            }}
            className="px-5 py-2.5 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] rounded text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>LP 상세 실사보고서(VDR) 열람</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
