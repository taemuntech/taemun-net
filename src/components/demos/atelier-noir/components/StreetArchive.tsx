import React, { useState } from 'react';
import { STREET_SNAPS } from '../data/mockData';
import { StreetSnap, Product } from '../types';

interface StreetArchiveProps {
  onOpenProductModalByName: (name: string, price?: number) => void;
}

export const StreetArchive: React.FC<StreetArchiveProps> = ({
  onOpenProductModalByName,
}) => {
  const [selectedSnap, setSelectedSnap] = useState<StreetSnap | null>(null);

  return (
    <section className="py-12 lg:py-16 bg-[#1b1c1d] hairline-t hairline-b">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 hairline-b pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-[#caf300]"></span>
              <span className="font-label-sm text-[11px] text-[#caf300] tracking-wider uppercase font-medium">
                SEOUL STREET SNAPSHOT
              </span>
            </div>
            <h2 className="font-display-hero text-2xl lg:text-4xl font-extrabold tracking-tight text-[#ffffff] uppercase">
              STREET ARCHIVE: SEONGSU · HANNAM · DOSAN
            </h2>
          </div>
          <p className="font-body-sm text-xs lg:text-sm text-[#8f9378] max-w-md leading-relaxed">
            실제 패션 인플루언서 및 아틀리에 누아르 크루들이 착용한 성수동, 한남동, 도산공원 일대의 실시간 리얼웨이 스트릿 룩북입니다.
          </p>
        </div>

        {/* Street Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STREET_SNAPS.map((snap) => (
            <div
              key={snap.id}
              className="group relative hairline-all overflow-hidden bg-[#121314] cursor-pointer"
              onClick={() => setSelectedSnap(snap)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={snap.image}
                  alt={snap.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer" />
              </div>

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e0f] via-transparent to-transparent opacity-90"></div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="font-label-sm text-[10px] text-[#caf300] mb-1">
                  {snap.location}
                </div>
                <h4 className="font-headline-sm text-sm text-[#ffffff] font-bold">
                  {snap.title}
                </h4>

                <div className="flex items-center justify-between mt-2 pt-2 hairline-t text-[#8f9378] font-label-sm text-[11px]">
                  <span>
                    {snap.curator} ({snap.bodySpec})
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSnap(snap);
                    }}
                    className="text-[#ffffff] hover:text-[#caf300] transition-colors font-medium flex items-center"
                  >
                    착용상품 ({snap.taggedCount}) &gt;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tagged Products Modal / Dialog */}
        {selectedSnap && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1b1c1d] hairline-all max-w-lg w-full p-6 relative">
              <button
                onClick={() => setSelectedSnap(null)}
                className="absolute top-4 right-4 text-[#e3e2e3] hover:text-[#caf300] p-1"
                aria-label="닫기"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#caf300] font-label-sm text-xs font-bold">
                  {selectedSnap.location}
                </span>
              </div>
              <h3 className="font-headline-sm text-lg text-[#ffffff] font-bold mb-1">
                {selectedSnap.title}
              </h3>
              <p className="font-label-sm text-xs text-[#8f9378] mb-4">
                크루: {selectedSnap.curator} ({selectedSnap.bodySpec})
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-label-sm text-[#8f9378] uppercase">
                  착용 아이템 상세 정보 ({selectedSnap.taggedProducts.length})
                </div>
                {selectedSnap.taggedProducts.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#1f2021] hairline-all flex items-center justify-between hover:border-[#caf300] transition-colors"
                  >
                    <div>
                      <span className="inline-block font-label-sm text-[10px] text-[#caf300] bg-[#0d0e0f] px-1.5 py-0.5 mr-2">
                        {item.tag}
                      </span>
                      <span className="text-xs font-medium text-[#ffffff]">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-label-sm text-xs text-[#caf300] font-bold">
                        ₩{item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedSnap(null);
                          onOpenProductModalByName(item.name, item.price);
                        }}
                        className="text-[11px] font-label-sm bg-[#caf300] text-[#171e00] px-2 py-0.5 font-bold hover:bg-[#ffffff]"
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedSnap(null)}
                className="w-full py-2.5 bg-[#292a2b] hover:bg-[#343536] text-[#ffffff] font-label-sm text-xs tracking-wider uppercase transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
