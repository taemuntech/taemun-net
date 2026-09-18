'use client';

import React, { useState } from 'react';

interface WaterCostEstimatorProps {
  onOpenConsultation?: () => void;
}

export default function WaterCostEstimator({ onOpenConsultation }: WaterCostEstimatorProps) {
  const [infraType, setInfraType] = useState<'stormwater' | 'treatment' | 'pipeline' | 'river'>('treatment');
  const [scale, setScale] = useState<number>(30); // 빗물터널: km(5~20), 하수처리: 만톤/일(10~100), 도수관: km(10~50), 하천: km(3~15)
  const [isUnderground, setIsUnderground] = useState<boolean>(true);

  // 간이 사업비 산출 로직 (순수 예시용)
  const calculateCost = () => {
    let baseMultiplier = 1.0;
    let unitCost = 0;

    switch (infraType) {
      case 'stormwater': // 대심도 빗물터널 (km당 약 350~500억)
        unitCost = 420;
        baseMultiplier = isUnderground ? 1.3 : 1.0;
        return Math.round((scale * unitCost * baseMultiplier) / 10);
      case 'treatment': // 지하화 하수처리장 (만톤당 약 400~600억)
        unitCost = 520;
        baseMultiplier = isUnderground ? 1.4 : 1.0;
        return Math.round((scale * unitCost * baseMultiplier) / 10);
      case 'pipeline': // 광역 도수관로 (km당 약 180~260억)
        unitCost = 210;
        baseMultiplier = isUnderground ? 1.25 : 1.0;
        return Math.round((scale * unitCost * baseMultiplier) / 10);
      case 'river': // 생태하천 복원 (km당 약 120~180억)
        unitCost = 140;
        return Math.round((scale * unitCost) / 10);
      default:
        return 1200;
    }
  };

  const estimatedCost = calculateCost();

  return (
    <section id="estimator" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Water Infrastructure Cost Model
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            수자원 · 환경 토목 인프라 개략 사업비 산출기
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            사업 공종과 계획 규모, 지하화 여부를 입력하시면 최적 토목 공법 조합과 개략 총사업비 및 소요 공기를 즉시 시뮬레이션해 드립니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 입력 폼 */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div className="space-y-8">
              {/* 사업 공종 선택 */}
              <div>
                <span className="text-sm font-bold text-slate-300 block mb-3">
                  수자원 인프라 공종 구분
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setInfraType('treatment');
                      setScale(30);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      infraType === 'treatment'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">지하화 하수처리장</div>
                    <div className="text-xs">MBR 분리막 + 상부 생태공원</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInfraType('stormwater');
                      setScale(10);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      infraType === 'stormwater'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">대심도 빗물 배수터널</div>
                    <div className="text-xs">내경 10m 쉴드 TBM 방수로</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInfraType('pipeline');
                      setScale(25);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      infraType === 'pipeline'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">광역 도수관로</div>
                    <div className="text-xs">Ø2,400mm 강관 실드 추진</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInfraType('river');
                      setScale(8);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      infraType === 'river'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">생태하천 복원</div>
                    <div className="text-xs">자연석 여울 + 어도 + 친수데크</div>
                  </button>
                </div>
              </div>

              {/* 계획 규모 슬라이더 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="scale-slider" className="text-sm font-bold text-slate-300">
                    {infraType === 'treatment'
                      ? '일일 시설 처리 용량 (만㎥/일)'
                      : '계획 구간 총 연장 (km)'}
                  </label>
                  <span className="text-cyan-400 font-mono font-black text-lg">
                    {scale} {infraType === 'treatment' ? '만㎥/일' : 'km'}
                  </span>
                </div>
                <input
                  id="scale-slider"
                  type="range"
                  min={infraType === 'treatment' ? 10 : 3}
                  max={infraType === 'treatment' ? 80 : 40}
                  step={infraType === 'treatment' ? 5 : 1}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>{infraType === 'treatment' ? '10만톤' : '3 km'}</span>
                  <span>{infraType === 'treatment' ? '45만톤' : '20 km'}</span>
                  <span>{infraType === 'treatment' ? '80만톤' : '40 km'}</span>
                </div>
              </div>

              {/* 특수 시공 조건 */}
              <div>
                <span className="text-sm font-bold text-slate-300 block mb-3">
                  지하화 및 친환경 상부 활용 옵션
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="underground"
                      checked={isUnderground}
                      onChange={() => setIsUnderground(true)}
                      className="accent-cyan-500"
                    />
                    <span className="text-xs text-slate-300">
                      완전 지하화 + 지상 생태시민공원 조성 (도심 친환경)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="underground"
                      checked={!isUnderground}
                      onChange={() => setIsUnderground(false)}
                      className="accent-cyan-500"
                    />
                    <span className="text-xs text-slate-300">반지하/지상 복합형</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 결과 디스플레이 패널 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  Project Estimate Summary
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  산출 결과 (예시)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-1">
                  추천 토목 시공 공법
                </span>
                <div className="text-xl font-black text-white">
                  {infraType === 'treatment'
                    ? '4단계 MBR 침지막 + 지하 3중 밀폐 생물탈취'
                    : infraType === 'stormwater'
                    ? 'EPB 토압식 쉴드 TBM + 소용돌이 감세 샤프트'
                    : infraType === 'pipeline'
                    ? '비개착 파이프 재킹(Pipe Jacking) + 서지탱크'
                    : '다공성 식생 호안블록 + 아이스하버식 자연석 어도'}
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 mb-6">
                <span className="text-xs text-slate-400 block mb-1">
                  개략 총사업비 (예시)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-cyan-400">
                    약 {estimatedCost.toLocaleString()}억
                  </span>
                  <span className="text-slate-300 text-sm font-semibold">원 내외</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  * 토공사, 구조물 공사, 플랜트 배관, 계측 제어 설비가 통합 반영된 추산치입니다(예시).
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 mb-6">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">예상 공사 기간</span>
                  <span className="font-bold">
                    {infraType === 'treatment' ? '42~48개월' : infraType === 'stormwater' ? '36~44개월' : '24~36개월'} (예시)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">국고 보조금/BTO 적격성</span>
                  <span className="font-bold text-emerald-400">민자 타당성 검토 지원(예시)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">방류수 목표 수질</span>
                  <span className="font-bold text-cyan-400">BOD 1.0mg/L 이하 1급수(예시)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <span>기본계획 및 타당성 분석 무료 기술 자문 신청</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
