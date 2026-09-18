'use client';

import React, { useId, useRef, useState } from 'react';
import { Sparkles, X, Info } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { MATERIALS } from '../data/portfolioData';
import { imageCropStyle, MaterialSpecimen } from '../types';

export const MaterialArchiveSection: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSpecimen | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const closeModal = () => setSelectedMaterial(null);

  // Esc 닫기 · 배경 스크롤 잠금 · Tab 순환 (샘플 공용 훅)
  useSampleDialog({ open: selectedMaterial !== null, onClose: closeModal, dialogRef });

  return (
    <section
      className="py-16 lg:py-24 bg-[#0d0e10] border-y border-white/10 scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)]"
      id="material-archive"
    >
      <div className="max-w-[1440px] mx-auto px-5 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] block mb-2 font-semibold">
            Tactile Patina &amp; Provenance
          </span>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#f4efea] break-keep [word-break:keep-all]">
            Material Archive
          </h2>
          <p className="text-[15px] text-[#d1c5b8] mt-3 font-light leading-relaxed">
            공간에 머무는 사람의 손길과 햇살이 닿을 때 비로소 완성되는 천연 소재. 직수입 석재와 프리미엄 목재 라이브러리를 보유하고 있습니다.
          </p>
        </div>

        {/* Bento-style Material Grid — lg:grid-cols-2 는 바로 뒤 lg:grid-cols-4 에 덮여 죽은 클래스였다.
            이 저장소 규칙상 lg 미만(0~1023px)은 단일 열이라 의도대로 지운다. */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {MATERIALS.map((specimen) => (
            <div
              key={specimen.id}
              role="button"
              tabIndex={0}
              aria-label={`${specimen.title} 상세 보기`}
              onClick={() => setSelectedMaterial(specimen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMaterial(specimen);
                }
              }}
              className="group bg-[#1b1c1e] p-6 border border-white/10 flex flex-col justify-between hover:border-[#c5a880]/50 transition duration-300 shadow-xl cursor-pointer"
            >
              <div>
                <div className="aspect-square bg-[#121315] overflow-hidden mb-4 border border-white/10 relative">
                  {/* 확대 연출과 원본 잘라내기가 같은 scale 유틸리티를 쓰면 hover 때 잘라낸 부분이 다시 드러난다 */}
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={specimen.image}
                      alt={specimen.title}
                      className="w-full h-full object-cover"
                      style={imageCropStyle(specimen.imageCrop)}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                    <span className="bg-[#121315]/90 text-[#c5a880] text-[10px] px-2 py-0.5 uppercase tracking-wider flex items-center gap-1 border border-[#c5a880]/30">
                      <Info className="w-3 h-3" />
                      View Specimen
                    </span>
                  </div>
                </div>

                <span className="text-[11px] uppercase tracking-widest text-[#c5a880] font-semibold">
                  {specimen.tag}
                </span>
                <h4 className="text-base font-medium text-[#f4efea] mt-1 group-hover:text-[#c5a880] transition-colors break-keep [word-break:keep-all]">
                  {specimen.title}
                </h4>
                <p className="text-xs text-[#998f83] mt-2 leading-relaxed">
                  {specimen.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 text-[11px] text-[#998f83] font-mono flex items-center justify-between">
                <span>{specimen.origin}</span>
                <Sparkles className="w-3 h-3 text-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Material Specimen Modal */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="bg-[#1b1c1e] border border-[#c5a880]/40 max-w-xl w-full my-8 p-6 lg:p-8 shadow-2xl relative outline-none animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="마감재 상세 닫기"
              className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center text-[#998f83] hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] overflow-hidden bg-[#0d0e10] border border-white/10 mb-6">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.title}
                className="w-full h-full object-cover"
                style={imageCropStyle(selectedMaterial.imageCrop)}
              />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              {selectedMaterial.tag}
            </span>
            <h3
              id={titleId}
              className="text-xl font-serif text-[#f4efea] mt-1 break-keep [word-break:keep-all] pr-10"
            >
              {selectedMaterial.title}
            </h3>
            <p className="text-sm text-[#d1c5b8] mt-2 font-light leading-relaxed">
              {selectedMaterial.description}
            </p>

            {selectedMaterial.specsDetails && (
              <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#998f83] block">등급 (Grade):</span>
                  <span className="text-[#f4efea] font-medium">
                    {selectedMaterial.specsDetails.grade}
                  </span>
                </div>
                <div>
                  <span className="text-[#998f83] block">표면 마감 (Finish):</span>
                  <span className="text-[#f4efea] font-medium">
                    {selectedMaterial.specsDetails.finish}
                  </span>
                </div>
                <div>
                  <span className="text-[#998f83] block">규격/두께 (Spec):</span>
                  <span className="text-[#f4efea] font-medium">
                    {selectedMaterial.specsDetails.thickness}
                  </span>
                </div>
                <div>
                  <span className="text-[#998f83] block">추천 적용 공간:</span>
                  <span className="text-[#f4efea] font-medium">
                    {selectedMaterial.specsDetails.application}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#c5a880] font-mono">
                {selectedMaterial.origin}
              </span>
              <button
                type="button"
                onClick={closeModal}
                className="bg-[#c5a880] text-[#121315] font-semibold text-xs min-h-11 px-5 py-2 uppercase tracking-wider hover:bg-[#e0c298] transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
