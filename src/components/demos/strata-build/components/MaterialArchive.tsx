'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { STRUCTURAL_MATERIALS } from '../data/strataData';
import { StructuralMaterial } from '../types';
import MaterialModal from './MaterialModal';

export default function MaterialArchive() {
  const [selectedMaterial, setSelectedMaterial] = useState<StructuralMaterial | null>(null);

  return (
    <section id="materials" className="relative w-full border-t border-slate-800 bg-slate-900/60 py-16 text-white lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>ADVANCED STRUCTURAL MATERIALS</span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white lg:text-4xl">
            초고층 메가 스트럭처를 지탱하는 고성능 자재 아카이브
          </h2>
          <p className="mt-3 text-sm text-slate-400 lg:text-base">
            SM460B 고강도 내진 강재부터 150MPa UHPC, 삼중 로이 커튼월 및 면진 댐퍼의 물성치를 확인해 보세요.
          </p>
        </div>

        {/* 4대 자재 그리드 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {STRUCTURAL_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]"
            >
              <div>
                {/* 썸네일 이미지 */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={mat.image}
                    alt={mat.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 rounded bg-slate-950/80 px-2 py-0.5 font-mono text-[10px] text-amber-400 border border-amber-500/30">
                    {mat.category}
                  </div>
                </div>

                {/* 본문 정보 */}
                <div className="p-4">
                  <span className="font-mono text-[10px] text-slate-500">{mat.code}</span>
                  <h3 className="mt-1 text-sm font-bold text-white group-hover:text-amber-300">
                    {mat.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
                    {mat.summary}
                  </p>

                  <div className="mt-4 border-t border-slate-800/80 pt-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">강도 / 성능:</span>
                      <span className="font-bold text-amber-400">{mat.strength}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 모달 열기 버튼 */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => setSelectedMaterial(mat)}
                  className="w-full rounded border border-slate-700 bg-slate-800/60 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-amber-500/60 hover:bg-amber-500/10 hover:text-amber-300"
                >
                  상세 물성치 및 성적서 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 상세 모달 */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />
    </section>
  );
}
