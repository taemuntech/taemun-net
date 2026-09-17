import React from 'react';
import { LEDGER_ENTRIES } from '../data/luxuryData';

interface ArchivalLedgerProps {
  onSelectLot: (lotId: string) => void;
}

export const ArchivalLedger: React.FC<ArchivalLedgerProps> = ({ onSelectLot }) => {
  return (
    <section className="w-full px-4 lg:px-16 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block uppercase">
            ARCHIVAL LEDGER
          </span>
          <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mt-1 font-medium">
            공식 감정 및 안심 예치 집행 대장
          </h2>
          <p className="text-xs lg:text-sm text-[#d0c5af] mt-2 font-light max-w-xl mx-auto">
            모든 출고 건은 위변조 방지 블록체인 레저에 실시간 기록되며 신뢰할 수 있는 공식 진품 보증서가 발급됩니다.
          </p>
        </div>

        <div className="border border-[#d4af37]/40 bg-[#0e0e0e] divide-y divide-[#4d4635] overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-3 lg:p-4 text-[10px] text-[#99907c] uppercase tracking-wider font-semibold bg-[#1c1b1b]/50">
            <div className="col-span-4 lg:col-span-3">접수 고유 번호 (LOT ID)</div>
            <div className="col-span-4 lg:col-span-4">품목 및 아틀리에</div>
            <div className="hidden lg:block lg:col-span-3">감정 상태 (STATUS)</div>
            <div className="col-span-4 lg:col-span-2 text-right">보증 등급</div>
          </div>

          {/* Table Rows */}
          {LEDGER_ENTRIES.map((entry) => (
            <div
              key={entry.lotId}
              onClick={() => onSelectLot(entry.lotId)}
              className="grid grid-cols-12 p-3 lg:p-4 items-center hover:bg-[#1c1b1b] transition-colors cursor-pointer group"
              title="클릭하여 디지털 보증서 열람"
            >
              <div className="col-span-4 lg:col-span-3 font-mono text-xs lg:text-sm text-[#f2ca50] font-semibold group-hover:underline">
                {entry.lotId}
              </div>
              <div className="col-span-4 lg:col-span-4 text-xs lg:text-sm text-[#e5e2e1] truncate pr-2">
                {entry.item}
              </div>
              <div className="hidden lg:flex lg:col-span-3 items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
                <span className="text-[#d0c5af] text-[11px] truncate">
                  {entry.status}
                </span>
              </div>
              <div className="col-span-4 lg:col-span-2 text-right text-[10px] lg:text-[11px] tracking-wider font-semibold text-[#f2ca50]">
                {entry.grade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
