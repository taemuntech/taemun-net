import { useEffect, useId, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onOpenVdr: () => void;
}

export default function PortfolioModal({ item, onClose, onOpenVdr }: PortfolioModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    // 이전 포커스를 기억했다가 닫을 때 돌려준다 — 카드에서 열었으면 그 카드로 돌아가야 한다.
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // 잠그기 전 값을 기억한다 — 무조건 'auto' 로 되돌리면 바깥이 정해 둔 값을 덮어쓴다.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      // Tab 을 모달 안에서 돌린다
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    // 모바일에선 아래에서 올라오는 시트, 태블릿부터 가운데 카드.
    // 높이 상한과 내부 스크롤이 없으면 배경이 잠긴 채 긴 내용이 화면 밖으로 잘린다.
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-[#161c24] border border-[#f2ca50]/40 rounded-t-2xl sm:rounded-xl max-w-2xl w-full max-h-[88dvh] sm:max-h-[86dvh] overflow-y-auto overscroll-contain p-5 sm:p-6 relative shadow-2xl outline-none animate-in fade-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="상세 창 닫기"
          className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded text-[#d0c5af] hover:text-[#f2ca50] hover:bg-[#252a33] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-wrap items-center gap-2 mb-3 pr-12">
          <span className="px-2.5 py-1 bg-[#f2ca50]/15 border border-[#f2ca50]/30 text-[#f2ca50] font-mono-metric text-[11px] rounded">
            {item.badge}
          </span>
          <span className="px-2.5 py-1 bg-[#00a572]/20 text-[#4edea3] font-mono-metric text-[11px] rounded">
            ESG RATING {item.esgRating}
          </span>
        </div>

        <h3
          id={titleId}
          className="font-serif-display text-2xl lg:text-3xl text-[#dee2ef] mb-1 [word-break:keep-all]"
        >
          {item.title}
        </h3>
        <p className="font-mono-metric text-xs text-[#d0c5af] mb-4 [word-break:keep-all]">
          {item.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 my-4 border-y border-[#4d4635]/30">
          <div>
            <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
              투자 집행 규모 (Ticket Size)
            </span>
            <div className="font-mono-metric text-base lg:text-lg text-[#f2ca50] font-semibold mt-1 break-words">
              {item.ticketSize}
            </div>
          </div>
          <div>
            <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
              목표 실현 배수 (Target MoIC)
            </span>
            <div className="font-mono-metric text-base lg:text-lg text-[#4edea3] font-semibold mt-1 break-words">
              {item.targetMoic}
            </div>
          </div>
          <div>
            <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
              딜 단계 (Deal Stage)
            </span>
            <div className="font-mono-metric text-base lg:text-lg text-[#dee2ef] font-semibold mt-1 break-words">
              {item.dealStage}
            </div>
          </div>
          <div>
            <span className="font-mono-metric text-[11px] text-[#d0c5af] uppercase block">
              진행 지표 (Progress)
            </span>
            <div className="font-mono-metric text-base lg:text-lg text-[#dee2ef] font-semibold mt-1 break-words">
              {item.growthMetric}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1">
            핵심 투자 가설 &amp; 밸류업 프로그램
          </span>
          <p className="text-sm text-[#d0c5af] leading-relaxed mb-3 [word-break:keep-all]">
            {item.description}
          </p>
          <p className="text-sm text-[#dee2ef] bg-[#090e17] p-3.5 rounded border border-[#4d4635]/30 leading-relaxed [word-break:keep-all]">
            {item.fullThesis}
          </p>
          {/* 상세를 단독으로 보는 화면이라 고지를 여기서 한 번 더 적는다 */}
          <p className="mt-3 font-mono-metric text-[11px] text-[#d0c5af]/70 leading-relaxed">
            * 이 포트폴리오 기업·투자 규모·회수 배수·ESG 등급은 모두 가상 설정의 예시이며 실제
            투자 실적이 아닙니다.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center min-h-11 px-4 bg-[#30353e] hover:bg-[#343943] text-[#dee2ef] rounded text-xs transition-colors"
          >
            닫기
          </button>
          <a
            href="#vdr"
            onClick={() => {
              onClose();
              onOpenVdr();
            }}
            className="flex items-center justify-center min-h-11 px-5 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] rounded text-xs font-semibold gap-1.5 text-center transition-all shadow-sm"
          >
            <span>LP 상세 실사보고서(VDR) 신청</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
