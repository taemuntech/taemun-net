'use client';

import React, { useMemo, useState } from 'react';
import { COMPARISON_MODELS } from '../data/hardwareData';
import { ComparisonModel } from '../types';
import type { FlagshipConfig } from '../flagship-config';

interface ComparisonMatrixProps {
  currentConfig: FlagshipConfig;
  onSelectModel: (model: ComparisonModel) => void;
  onInstantBuy: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  currentConfig,
  onSelectModel,
  onInstantBuy,
}) => {
  const [showExtendedRows, setShowExtendedRows] = useState(false);

  /**
   * 「현재 선택 제품」 칸은 위 구성기에서 고른 값을 그대로 쓴다.
   *
   * 예전에는 이 칸이 data 파일의 고정 문자열(₩2,890,000)이라, 구성기에서 GPU 를 올리면 히어로는
   * ₩3,490,000 인데 바로 아래 이 칸은 ₩2,890,000 이었다 — 한 지면에 같은 모델의 가격이 두 개 떴고,
   * 이 칸의 「선택 모델 구매하기」를 누르면 주문서에는 또 다른 값이 찍혔다.
   */
  const models = useMemo<ComparisonModel[]>(
    () =>
      COMPARISON_MODELS.map((m) =>
        m.isCurrent
          ? {
              ...m,
              price: `₩${currentConfig.price.toLocaleString()}`,
              cpu: currentConfig.cpuName,
              cpuDetail: currentConfig.cpuDetail,
              gpu: `${currentConfig.gpuName} · ${currentConfig.tgpText}`,
              display: currentConfig.panelName,
              timeSpy: `${currentConfig.score.toLocaleString()} pts`,
            }
          : m,
      ),
    [currentConfig],
  );

  return (
    <section id="telemetry-matrix-section" className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[#424754] pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6]">data_thresholding</span>
            <h2 className="text-lg lg:text-xl font-headline font-bold text-[#dfe2ee]">
              하드웨어 스펙 대조 매트릭스
            </h2>
          </div>
          <p className="text-xs text-[#8c909f] mt-0.5">
            자체 테스트 랩 예시 데이터 — 지어낸 값이며 실제 측정 결과가 아닙니다
          </p>
        </div>

        <div className="flex items-center gap-3 font-label text-xs">
          <span className="text-[#8c909f]">선택 모델: {models.length}대 대조 중</span>
          <button
            id="btn-toggle-matrix-rows"
            type="button"
            onClick={() => setShowExtendedRows(!showExtendedRows)}
            className="px-3 min-h-11 rounded bg-[#262a33] text-[#4cd7f6] border border-[#424754] hover:border-[#4cd7f6] transition-all cursor-pointer"
          >
            {showExtendedRows ? '기본 항목만 보기 (-2)' : '비교 항목 변경 (+2)'}
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto bg-[#181c24] border border-[#424754] rounded-xl spec-hairline">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#0a0e16] border-b border-[#424754]">
              <th className="p-4 font-label text-xs text-[#8c909f] w-44">검증 파라미터</th>
              {models.map((model) => (
                <th
                  key={model.id}
                  className={`p-4 border-l border-[#424754]/60 w-1/3 relative ${ model.isCurrent ? 'bg-[#1c2028]/60' : '' }`}
                >
                  {model.isCurrent && (
                    <div className="absolute -top-px left-0 right-0 h-1 bg-[#4cd7f6]"></div>
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-label font-bold px-1.5 py-0.5 rounded ${ model.badgeType === 'secondary' ? 'bg-[#03b5d3] text-[#001f26]' : model.badgeType === 'accent' ? 'bg-[#31353e] text-[#adc6ff]' : 'bg-[#31353e] text-[#8c909f]' }`}
                    >
                      {model.badge}
                    </span>
                    {model.isCurrent && (
                      <span className="text-[11px] text-[#4cd7f6] font-bold">현재 선택 제품</span>
                    )}
                  </div>
                  <div className="font-headline font-bold text-[#dfe2ee] text-base">{model.name}</div>
                  <div
                    className={`text-sm font-bold mt-1 ${ model.isCurrent ? 'text-[#ec6a06]' : 'text-[#c2c6d6]' }`}
                  >
                    {model.price}
                  </div>
                  {model.isCurrent && (
                    <div className="text-[10px] text-[#8c909f] font-normal mt-0.5">
                      위 구성기에서 고른 구성 기준
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#424754]/50 text-xs">
            {/* CPU Row */}
            <tr className="hover:bg-[#1c2028] transition-colors">
              <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">memory</span> 프로세서 (CPU)
              </td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 ${m.isCurrent ? 'bg-[#1c2028]/20' : ''}`}
                >
                  <span className={`font-bold ${m.isCurrent ? 'text-[#adc6ff]' : 'text-[#dfe2ee]'}`}>
                    {m.cpu}
                  </span>
                  <span className="block text-[11px] text-[#8c909f] mt-0.5">{m.cpuDetail}</span>
                </td>
              ))}
            </tr>

            {/* GPU Row */}
            <tr className="hover:bg-[#1c2028] transition-colors">
              <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">developer_board</span> 그래픽 (GPU / TGP)
              </td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 ${m.isCurrent ? 'bg-[#1c2028]/20' : ''}`}
                >
                  <span
                    className={`font-bold ${ m.isCurrent ? 'text-[#4cd7f6]' : m.gpuPercent === 100 ? 'text-[#adc6ff]' : 'text-[#dfe2ee]' }`}
                  >
                    {m.gpu}
                  </span>
                  <div className="w-full bg-[#0a0e16] h-1.5 rounded mt-1.5 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${m.gpuPercent}%`,
                        backgroundColor: m.gpuColor,
                      }}
                    ></div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Display Row */}
            <tr className="hover:bg-[#1c2028] transition-colors">
              <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">tv</span> 패널 &amp; 주사율
              </td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 ${ m.isCurrent ? 'bg-[#1c2028]/20 font-semibold' : '' }`}
                >
                  <span className="text-[#dfe2ee]">{m.display}</span>
                  <span
                    className={`block text-[11px] mt-0.5 ${ m.isCurrent ? 'text-[#4cd7f6]' : m.id === 'quantum-workstation' ? 'text-[#adc6ff]' : 'text-[#8c909f]' }`}
                  >
                    {m.displayDetail}
                  </span>
                </td>
              ))}
            </tr>

            {/* Cooling Solution */}
            <tr className="hover:bg-[#1c2028] transition-colors">
              <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">mode_fan</span> 쿨링 아키텍처
              </td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 ${m.isCurrent ? 'bg-[#1c2028]/20' : ''}`}
                >
                  <span className={`block font-semibold ${m.isCurrent ? 'text-[#4cd7f6]' : 'text-[#dfe2ee]'}`}>
                    {m.cooling}
                  </span>
                  <span className="block text-[11px] text-[#8c909f] font-normal mt-0.5">
                    {m.coolingDetail}
                  </span>
                </td>
              ))}
            </tr>

            {/* USB4 & IO Ports */}
            <tr className="hover:bg-[#1c2028] transition-colors">
              <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">cable</span> I/O &amp; 확장성
              </td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 text-[#dfe2ee] ${ m.isCurrent ? 'bg-[#1c2028]/20' : '' }`}
                >
                  {m.io}
                </td>
              ))}
            </tr>

            {/* Weight & Battery */}
            <tr className="hover:bg-[#1c2028] transition-colors">
              <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">battery_charging_full</span> 무게 / 배터리용량
              </td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 text-[#dfe2ee] ${ m.isCurrent ? 'bg-[#1c2028]/20 font-bold' : '' }`}
                >
                  {m.weight}
                </td>
              ))}
            </tr>

            {/* Extended Rows (when toggled) */}
            {showExtendedRows && (
              <>
                <tr className="hover:bg-[#1c2028] transition-colors bg-[#0a0e16]/30">
                  <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px]">headphones</span> 오디오 DAC &amp; 사운드
                  </td>
                  <td className="p-4 border-l border-[#424754]/60 bg-[#1c2028]/20 text-[#4cd7f6]">
                    쿼드 Hi-Fi DAC (384kHz/32bit)
                  </td>
                  <td className="p-4 border-l border-[#424754]/60 text-[#c2c6d6]">
                    HD 오디오 코덱 + 서라운드 음향 처리
                  </td>
                  <td className="p-4 border-l border-[#424754]/60 text-[#adc6ff]">
                    프로급 Hi-Fi DAC + 고해상도 음원 재생
                  </td>
                </tr>
                <tr className="hover:bg-[#1c2028] transition-colors bg-[#0a0e16]/30">
                  <td className="p-4 font-label text-[#8c909f] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px]">power</span> 충전기 &amp; GaN 어댑터
                  </td>
                  <td className="p-4 border-l border-[#424754]/60 bg-[#1c2028]/20 text-[#dfe2ee]">
                    330W GaN 슬림 초경량 어댑터 (100W PD 동시 충전)
                  </td>
                  <td className="p-4 border-l border-[#424754]/60 text-[#c2c6d6]">
                    140W Type-C GaN 어댑터 (초소형 휴대용)
                  </td>
                  <td className="p-4 border-l border-[#424754]/60 text-[#dfe2ee]">
                    400W 듀얼 GaN 고출력 워크스테이션 어댑터
                  </td>
                </tr>
              </>
            )}

            {/* 그래픽 벤치 점수 행 — 실존 벤치마크 제품 이름을 지어낸 점수에 붙이지 않는다 */}
            <tr className="bg-[#0a0e16]">
              <td className="p-4 font-label text-xs text-[#8c909f]">자체 랩 그래픽 점수 (예시)</td>
              {models.map((m) => (
                <td
                  key={m.id}
                  className={`p-4 border-l border-[#424754]/60 ${m.isCurrent ? 'bg-[#1c2028]/40' : ''}`}
                >
                  <div
                    className={`flex items-center justify-between font-label font-bold text-sm ${ m.isCurrent ? 'text-[#4cd7f6]' : m.id === 'quantum-workstation' ? 'text-[#adc6ff]' : 'text-[#c2c6d6]' }`}
                  >
                    <span>{m.timeSpy}</span>
                    <span className="text-[10px] text-[#8c909f] font-normal">{m.timeSpyTarget}</span>
                  </div>
                </td>
              ))}
            </tr>

            {/* Interactive Direct Trigger Buttons */}
            <tr className="bg-[#181c24]">
              <td className="p-4 font-label text-xs text-[#8c909f]">즉시 주문</td>
              <td className="p-4 border-l border-[#424754]/60 bg-[#1c2028]/20">
                <button
                  id="btn-matrix-buy-current"
                  onClick={onInstantBuy}
                  type="button"
                  className="w-full min-h-11 bg-[#ec6a06] hover:bg-[#ff7a1a] text-[#4a1c00] font-label text-xs rounded font-bold transition-all orange-glow cursor-pointer"
                >
                  선택 모델 구매하기
                </button>
              </td>
              <td className="p-4 border-l border-[#424754]/60">
                <button
                  id="btn-matrix-view-aero"
                  onClick={() => onSelectModel(models[1])}
                  type="button"
                  className="w-full min-h-11 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-label text-xs rounded border border-[#424754] transition-all cursor-pointer"
                >
                  에어로 14 상세보기
                </button>
              </td>
              <td className="p-4 border-l border-[#424754]/60">
                <button
                  id="btn-matrix-view-quantum"
                  onClick={() => onSelectModel(models[2])}
                  type="button"
                  className="w-full min-h-11 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-label text-xs rounded border border-[#424754] transition-all cursor-pointer"
                >
                  퀀텀 워크스테이션 보기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
