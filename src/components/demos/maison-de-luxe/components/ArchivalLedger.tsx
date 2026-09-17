import React from 'react';
import { LEDGER_ENTRIES } from '../data/luxuryData';
import { ChevronRight } from 'lucide-react';

interface ArchivalLedgerProps {
  onSelectLot: (lotId: string) => void;
}

// 걷어낸 것: 「안심 예치 집행 대장」(결제대금예치 표기) · 「블록체인 레저에 실시간 기록」(없는 기술 주장)
// · 「신뢰할 수 있는 공식 진품 보증서」(단정).
// 행은 div 였다 — 키보드로 못 눌러서 button 으로 바꿨다.
export const ArchivalLedger: React.FC<ArchivalLedgerProps> = ({ onSelectLot }) => {
  return (
    <section id="ledger" className="w-full px-4 lg:px-16 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block uppercase">
            ARCHIVAL LEDGER (예시)
          </span>
          <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mt-1 font-medium [word-break:keep-all]">
            검수 · 출고 이력 대장
          </h2>
          <p className="text-xs lg:text-sm text-[#d0c5af] mt-2 font-light max-w-xl mx-auto [word-break:keep-all]">
            출고 건마다 로트 번호로 검수 이력을 남긴다는 설정입니다. 행을 누르면 그 번호의 예시 이력이 열립니다.
          </p>
        </div>

        <div className="border border-[#d4af37]/40 bg-[#0e0e0e] divide-y divide-[#4d4635] overflow-hidden shadow-2xl">
          {/* Table Header — lg 미만에서는 상태 열을 접는다 */}
          <div className="grid grid-cols-12 gap-2 p-3 lg:p-4 text-[10px] text-[#99907c] uppercase tracking-wider font-semibold bg-[#1c1b1b]/50">
            <div className="col-span-4 lg:col-span-3">LOT ID</div>
            <div className="col-span-5 lg:col-span-4">품목</div>
            <div className="hidden lg:block lg:col-span-3">검수 상태</div>
            <div className="col-span-3 lg:col-span-2 text-right">등급</div>
          </div>

          {/* Table Rows */}
          {LEDGER_ENTRIES.map((entry) => (
            <button
              key={entry.lotId}
              type="button"
              onClick={() => onSelectLot(entry.lotId)}
              className="w-full text-left grid grid-cols-12 gap-2 p-3 lg:p-4 items-center min-h-14 hover:bg-[#1c1b1b] transition-colors cursor-pointer group"
              aria-label={`${entry.lotId} ${entry.item} 검수 이력 열기`}
            >
              <span className="col-span-4 lg:col-span-3 font-mono text-[11px] lg:text-sm text-[#f2ca50] font-semibold group-hover:underline break-all">
                {entry.lotId}
              </span>
              <span className="col-span-5 lg:col-span-4 text-xs lg:text-sm text-[#e5e2e1] leading-snug [word-break:keep-all]">
                {entry.item}
              </span>
              <span className="hidden lg:flex lg:col-span-3 items-center gap-2 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse shrink-0"></span>
                <span className="text-[#d0c5af] text-[11px] [word-break:keep-all]">{entry.status}</span>
              </span>
              <span className="col-span-3 lg:col-span-2 flex items-center justify-end gap-1 text-right text-[10px] lg:text-[11px] tracking-wider font-semibold text-[#f2ca50]">
                {entry.grade}
                <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
