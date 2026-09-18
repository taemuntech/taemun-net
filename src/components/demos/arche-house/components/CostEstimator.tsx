'use client';

import React, { useState } from 'react';

interface CostEstimatorProps {
  onOpenConsultation: () => void;
}

export default function CostEstimator({ onOpenConsultation }: CostEstimatorProps) {
  const [pyeong, setPyeong] = useState<number>(75);
  const [structure, setStructure] = useState<'rc' | 'timber' | 'hybrid'>('rc');

  const structureOptions = {
    rc: {
      name: '철근콘크리트 (노출 콘크리트 / 석재 마감)',
      designRate: 100, // 평당 100만원
      buildRate: 1250, // 평당 1,250만원
      features: '견고한 조형미, 우수한 차음성, 프라이빗 중정 구조 최적화',
    },
    timber: {
      name: '친환경 중목구조 (글루램 구조목 / 박공지붕)',
      designRate: 110, // 평당 110만원
      buildRate: 1350, // 평당 1,350만원
      features: '자연 친화적 원목 노출, 사계절 습도 자동 조절, 높은 층고 개방감',
    },
    hybrid: {
      name: '스틸 하이브리드 (캔틸레버 테라스 / 파노라마 창)',
      designRate: 115, // 평당 115만원
      buildRate: 1300, // 평당 1,300만원
      features: '기둥 없는 광폭 거실, 호수/산세 파노라마 조망 테라스',
    },
  };

  const selected = structureOptions[structure];
  const estimatedDesignCost = Math.round(pyeong * selected.designRate);
  const estimatedBuildCost = Math.round(pyeong * selected.buildRate);
  const totalCost = estimatedDesignCost + estimatedBuildCost;

  return (
    <section id="estimator" className="w-full bg-stone-900 py-16 text-stone-100 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* 헤더 */}
        <div className="text-center">
          <p className="font-serif text-xs font-semibold tracking-widest text-amber-300 uppercase">
            Budget Estimation Guide
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-white lg:text-4xl">
            단독주택 · 별서 예상 건축 예산 가이드 (예시)
          </h2>
          <p className="mt-3 text-xs text-stone-400 lg:text-sm">
            희망하시는 주택의 연면적과 구조를 선택하시면 대략적인 설계비와 시공비 범위를 미리 확인하실 수 있습니다.
          </p>
        </div>

        {/* 계산기 카드 */}
        <div className="mt-10 rounded-sm border border-stone-800 bg-stone-950 p-6 shadow-2xl lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* 좌측: 조건 선택 컨트롤 */}
            <div className="space-y-6">
              {/* 연면적 슬라이더 */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-stone-300">
                    희망 연면적 (지상 + 지하 실내 면적)
                  </label>
                  <span className="font-serif text-base font-bold text-amber-200">
                    {pyeong}평 ({Math.round(pyeong * 3.3058)}㎡)
                  </span>
                </div>
                <input
                  type="range"
                  min={45}
                  max={150}
                  step={5}
                  value={pyeong}
                  onChange={(e) => setPyeong(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-ew-resize appearance-none rounded-lg bg-stone-800 accent-amber-300"
                />
                <div className="mt-1 flex justify-between text-[11px] font-mono text-stone-500">
                  <span>45평 (소형 단독)</span>
                  <span>75평 (표준 패밀리)</span>
                  <span>150평 (대형 레지던스)</span>
                </div>
              </div>

              {/* 구조 선택 라디오 */}
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-3">
                  희망 건축 구조 및 외장
                </label>
                <div className="space-y-2">
                  {(['rc', 'timber', 'hybrid'] as const).map((key) => {
                    const opt = structureOptions[key];
                    const isChecked = structure === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setStructure(key)}
                        className={`w-full rounded-sm border p-3 text-left transition-all ${
                          isChecked
                            ? 'border-amber-400 bg-amber-400/10 text-white shadow-sm'
                            : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{opt.name.split('(')[0]}</span>
                          <span className="text-[11px] font-mono text-amber-300">
                            평당 약 {opt.buildRate.toLocaleString()}만원선
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-stone-400">{opt.features}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 우측: 예상 산출 결과 패널 */}
            <div className="flex flex-col justify-between rounded-sm border border-stone-800 bg-stone-900/50 p-6">
              <div>
                <span className="text-[11px] font-mono text-stone-400">ESTIMATED ARCHITECTURAL BUDGET</span>
                <h3 className="mt-1 font-serif text-lg font-bold text-white">
                  예상 소요 예산 총계 (예시)
                </h3>

                {/* 총액 디스플레이 */}
                <div className="my-6 rounded border border-stone-800 bg-stone-950/80 p-4 text-center">
                  <span className="text-[11px] text-stone-400">설계비 + 시공비 합계 예상치</span>
                  <div className="mt-1 font-serif text-3xl font-black text-amber-200 lg:text-4xl">
                    약 {(totalCost / 10000).toFixed(1)}억 원
                  </div>
                  <p className="mt-1 text-[11px] text-stone-500 font-mono">
                    (VAT 별도 기준 / 인허가 및 정밀 시공비 포함 예시)
                  </p>
                </div>

                {/* 세부 항목 breakdown */}
                <div className="space-y-2 border-t border-stone-800 pt-4 text-xs">
                  <div className="flex justify-between text-stone-400">
                    <span>건축 기획 및 실시설계비:</span>
                    <span className="font-mono text-stone-200">
                      약 {(estimatedDesignCost / 10000).toFixed(2)}억 원 ({pyeong}평 기준)
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>직영 정밀 주거 시공비:</span>
                    <span className="font-mono text-stone-200">
                      약 {(estimatedBuildCost / 10000).toFixed(2)}억 원 ({pyeong}평 기준)
                    </span>
                  </div>
                </div>
              </div>

              {/* 하단 안내 및 상담 버튼 */}
              <div className="mt-6 border-t border-stone-800 pt-4">
                <p className="text-[11px] leading-relaxed text-stone-500">
                  ※ 대지 조건(경사도, 암반, 진입로 폭) 및 내외장 마감재 사양에 따라 예산이 달라질 수 있습니다.
                  자세한 내용은 1:1 상담을 통해 안내해 드립니다.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="mt-4 w-full rounded-sm bg-amber-400 py-3 text-xs font-bold text-stone-950 transition-all hover:bg-amber-300 shadow-md"
                >
                  1:1 정밀 가견적 및 대지 답사 상담 신청
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
