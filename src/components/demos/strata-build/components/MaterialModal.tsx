'use client';

import React from 'react';
import Image from 'next/image';
import { StructuralMaterial } from '../types';

interface MaterialModalProps {
  material: StructuralMaterial | null;
  onClose: () => void;
}

export default function MaterialModal({ material, onClose }: MaterialModalProps) {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl text-white">
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-800 text-slate-400 hover:text-white"
          aria-label="닫기"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 모달 헤더 */}
        <div className="font-mono text-xs text-amber-400">{material.code}</div>
        <h3 className="mt-1 text-xl font-bold text-white">{material.name}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{material.category}</p>

        {/* 이미지 */}
        <div className="relative mt-4 h-48 w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
          <Image
            src={material.image}
            alt={material.name}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center"
          />
        </div>

        {/* 상세 설명 */}
        <p className="mt-4 text-xs leading-relaxed text-slate-300 lg:text-sm">
          {material.summary}
        </p>

        {/* 물성치 및 품질 규격 그리드 */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[11px] text-slate-400">설계 강도 / 성능치</div>
            <div className="mt-0.5 font-mono text-xs font-bold text-amber-400">{material.strength}</div>
          </div>
          <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[11px] text-slate-400">품질 시험 기준</div>
            <div className="mt-0.5 font-mono text-xs font-bold text-white">{material.testStandard}</div>
          </div>
        </div>

        {/* 특화 물성 및 시공 강점 */}
        <div className="mt-5">
          <h4 className="font-mono text-xs font-bold text-slate-200">ENGINEERING HIGHLIGHTS</h4>
          <ul className="mt-2 space-y-2">
            {material.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 하단 닫기 */}
        <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="rounded border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            확인 및 창 닫기
          </button>
        </div>
      </div>
    </div>
  );
}
