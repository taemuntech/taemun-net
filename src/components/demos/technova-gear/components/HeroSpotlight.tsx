import React, { useState } from 'react';
import { FlagshipViewTab, PowerMode } from '../types';
import { SpecFilterState } from './SpecFilterHUD';

interface HeroSpotlightProps {
  filters: SpecFilterState;
  powerMode: PowerMode;
  onPowerModeChange: (mode: PowerMode) => void;
  onInstantBuy: () => void;
  onOpen3DModal: () => void;
  isCompared: boolean;
  onToggleCompare: () => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  filters,
  powerMode,
  onPowerModeChange,
  onInstantBuy,
  onOpen3DModal,
  isCompared,
  onToggleCompare,
}) => {
  const [activeTab, setActiveTab] = useState<FlagshipViewTab>('exterior');

  // Dynamic specs based on filter selections
  const getDynamicSpecs = () => {
    let price = 2890000;
    let originalPrice = 3520000;
    let score = 21500;
    let gpuName = 'RTX 4080 16GB';
    let tgpText = '최대 TGP 175W + Dynamic Boost';

    if (filters.gpu === 'RTX 4090') {
      price = 3490000;
      originalPrice = 4190000;
      score = 24800;
      gpuName = 'RTX 4090 16GB';
      tgpText = '최대 TGP 175W 풀언락 (OC 모드)';
    } else if (filters.gpu === '4070 Ti') {
      price = 2490000;
      originalPrice = 2990000;
      score = 17900;
      gpuName = 'RTX 4070 Ti 12GB';
      tgpText = '최대 TGP 140W 저소음 고효율';
    } else if (filters.gpu === 'RX 7900') {
      price = 2650000;
      originalPrice = 3190000;
      score = 19800;
      gpuName = 'Radeon RX 7900M 16GB';
      tgpText = '최대 TGP 180W SmartShift';
    }

    if (filters.ram === '64GB') {
      price += 250000;
      originalPrice += 300000;
    } else if (filters.ram === '16GB') {
      price -= 120000;
      originalPrice -= 150000;
    }

    const cpuName = filters.cpu === 'Ryzen 9 7945HX' ? 'Ryzen 9 7945HX' : 'Core Ultra 9 185H';
    const cpuDetail = filters.cpu === 'Ryzen 9 7945HX' ? '16코어 32스레드 + 풀 Zen4 고성능' : '16코어 22스레드 + 내장 NPU AI 가속';
    const panelName = filters.display === '4K Mini-LED 165Hz' ? '16형 4K Mini-LED 165Hz' : filters.display === 'QHD 360Hz' ? '16형 QHD+ 360Hz Fast-IPS' : '16형 2.5K OLED 240Hz';

    const monthlyInstallment = Math.round(price / 24);

    return {
      price,
      originalPrice,
      score,
      gpuName,
      tgpText,
      cpuName,
      cpuDetail,
      panelName,
      monthlyInstallment,
    };
  };

  const currentSpecs = getDynamicSpecs();

  // Segmented meter blocks based on power mode
  const getPowerBlocks = () => {
    switch (powerMode) {
      case 'silent':
        return [
          'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]',
          'bg-[#31353e]', 'bg-[#31353e]', 'bg-[#31353e]', 'bg-[#31353e]', 'bg-[#31353e]', 'bg-[#31353e]'
        ];
      case 'balanced':
        return [
          'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]',
          'bg-[#adc6ff]', 'bg-[#31353e]', 'bg-[#31353e]', 'bg-[#31353e]'
        ];
      case 'turbo':
      default:
        return [
          'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]', 'bg-[#4cd7f6]',
          'bg-[#adc6ff]', 'bg-[#ec6a06] animate-pulse', 'bg-[#31353e]'
        ];
    }
  };

  return (
    <section id="hero-spotlight-bay" className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 bg-[#181c24] border border-[#424754] rounded-xl p-4 lg:p-6 spec-hairline relative overflow-hidden hardware-mesh">
      {/* Top Telemetry Status Header */}
      <div className="lg:col-span-12 flex flex-wrap items-center justify-between border-b border-[#424754]/70 pb-2 gap-2">
        <div className="flex items-center gap-2 font-label text-xs">
          <span className="bg-[#ec6a06]/20 text-[#ffb690] border border-[#ffb690]/40 px-2 py-0.5 rounded flex items-center gap-1 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ec6a06] animate-ping"></span> 2025 플래그십 리미티드
          </span>
          <span className="text-[#8c909f] font-mono">SKU: TN-G16-{filters.cpu.replace(/\s+/g, '')}-{filters.gpu.replace(/\s+/g, '')}</span>
          <span className="text-[#8c909f]">|</span>
          <span className="text-[#4cd7f6] flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[14px]">verified</span> 공장 직배송 정밀 캘리브레이션 완료
          </span>
        </div>
        <div className="text-xs font-label text-[#8c909f] flex items-center gap-4">
          <span>안전 인증 표기 자리 (예시)</span>
          <span className="text-[#4cd7f6] font-bold">잔여 수량: 14대 (실시간 재고 연동)</span>
        </div>
      </div>

      {/* Left Column: Visual Hardware Bay & Interactive Telemetry Overlay */}
      <div className="lg:col-span-7 flex flex-col justify-between gap-4 relative">
        <div className="relative bg-[#0a0e16] border border-[#424754] rounded-lg p-4 flex flex-col items-center justify-center overflow-hidden group min-h-[380px] lg:min-h-[440px]">
          {/* Ambient Radial Halo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4d8eff]/10 via-transparent to-[#4cd7f6]/10 pointer-events-none"></div>

          {/* Tab Conditional Display */}
          {activeTab === 'exterior' && (
            <img
              id="flagship-hero-image"
              src="/demo-media/technova-gear/technova-gear-02.jpg"
              alt="TECHNOVA TITAN 16 PRO G-EDITION 랩탑 실물 렌더링"
              className="w-full h-auto max-h-[380px] lg:max-h-[420px] object-contain transition-transform duration-500 group-hover:scale-[1.02] z-10"
            referrerPolicy="no-referrer" />
          )}

          {activeTab === 'vapor' && (
            <div className="z-10 w-full flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
              <div className="relative w-64 h-64 border border-[#4cd7f6]/40 rounded-full flex items-center justify-center bg-[#111827]/80 active-glow">
                <span className="material-symbols-outlined text-6xl text-[#4cd7f6] animate-spin" style={{ animationDuration: '6s' }}>
                  mode_fan
                </span>
                <div className="absolute inset-0 border-2 border-dashed border-[#03b5d3]/50 rounded-full animate-pulse"></div>
              </div>
              <div className="mt-4 bg-[#181c24] border border-[#424754] rounded-lg p-3 max-w-md">
                <span className="text-xs font-label text-[#4cd7f6] font-bold block">3D 베이퍼 챔버 분해도 텔레메트리</span>
                <p className="text-[11px] text-[#c2c6d6] mt-1">
                  순수 구리 히트스프레더 + 초미세 소결 모세관 구조. 액체 금속(Liquid Metal) 도포로 다이 접촉 열저항 -68% 달성.
                </p>
                <div className="flex justify-around text-[10px] font-label text-[#8c909f] mt-2 pt-2 border-t border-[#424754]">
                  <span>풍량: 67 CFM (듀얼 팬)</span>
                  <span>핀 두께: 0.1mm x 280매</span>
                  <span>열전도율: 4,000 W/m·K</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'switches' && (
            <div className="z-10 w-full flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
              <div className="p-6 bg-[#181c24] border border-[#adc6ff]/50 rounded-xl shadow-lg max-w-md">
                <span className="material-symbols-outlined text-5xl text-[#adc6ff] mb-2">keyboard</span>
                <h4 className="text-sm font-label font-bold text-[#dfe2ee]">로우 프로파일 RGB 광학 기계식 스위치</h4>
                <p className="text-xs text-[#c2c6d6] mt-1">
                  0.1ms 광속 반응 / 1.2mm 입력 지점 / 0.2mm 래피드 리셋. 개별 Per-Key RGB 1,680만 컬러 커스텀 지원.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-label">
                  <div className="bg-[#0a0e16] p-1.5 rounded border border-[#424754]">
                    <span className="text-[#8c909f] block">키 수명</span>
                    <span className="text-[#4cd7f6] font-bold">1억 회</span>
                  </div>
                  <div className="bg-[#0a0e16] p-1.5 rounded border border-[#424754]">
                    <span className="text-[#8c909f] block">작동 압력</span>
                    <span className="text-[#adc6ff] font-bold">45g 리니어</span>
                  </div>
                  <div className="bg-[#0a0e16] p-1.5 rounded border border-[#424754]">
                    <span className="text-[#8c909f] block">동시입력</span>
                    <span className="text-[#ffb690] font-bold">N-Key 롤오버</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ports' && (
            <div className="z-10 w-full flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
              <div className="p-4 bg-[#181c24] border border-[#4cd7f6]/40 rounded-xl max-w-md w-full">
                <span className="material-symbols-outlined text-4xl text-[#4cd7f6] mb-1">cable</span>
                <h4 className="text-xs font-label font-bold text-[#dfe2ee]">후면 및 측면 I/O 대역폭 맵</h4>
                <div className="space-y-1.5 text-left text-xs mt-3 font-label">
                  <div className="flex justify-between bg-[#0a0e16] p-2 rounded border border-[#424754]">
                    <span className="text-[#4cd7f6]">Thunderbolt™ 4 x2</span>
                    <span className="text-[#c2c6d6]">40Gbps / 100W PD / eGPU</span>
                  </div>
                  <div className="flex justify-between bg-[#0a0e16] p-2 rounded border border-[#424754]">
                    <span className="text-[#adc6ff]">HDMI 2.1 FRL</span>
                    <span className="text-[#c2c6d6]">48Gbps 4K 144Hz / 8K 60Hz</span>
                  </div>
                  <div className="flex justify-between bg-[#0a0e16] p-2 rounded border border-[#424754]">
                    <span className="text-[#ffb690]">Killer 2.5G LAN</span>
                    <span className="text-[#c2c6d6]">E3100G 초저지연 게이밍 NIC</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive 3D Cutout Telemetry Callout */}
          <div className="absolute bottom-4 left-4 z-20 bg-[#0f131c]/90 backdrop-blur-md border border-[#03b5d3]/60 rounded p-2 text-xs font-label shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              <span className="text-[#4cd7f6] font-bold">3D VAPOR CHAMBER COOLING</span>
            </div>
            <p className="text-[11px] text-[#c2c6d6] mt-0.5">히트파이프 대비 열방출 면적 +340% 향상 (67 CFM 풍량)</p>
          </div>

          {/* Benchmark Stamp Badge */}
          <div className="absolute top-4 right-4 z-20 bg-[#262a33]/90 backdrop-blur-md border border-[#ec6a06]/60 rounded px-2.5 py-1 text-right">
            <span className="text-[10px] text-[#8c909f] block font-label uppercase">3DMARK TIME SPY GRAPHICS</span>
            <span className="text-lg font-headline font-bold text-[#ec6a06]">
              {currentSpecs.score.toLocaleString()} <span className="text-xs text-[#8c909f]">점</span>
            </span>
            <span className="text-[10px] text-[#4cd7f6] block font-bold">전 세계 랩탑 상위 1% 공인</span>
          </div>
        </div>

        {/* Micro Thumbnail Gallery & Exploded View Thumbnails */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setActiveTab('exterior')}
            className={`rounded p-1.5 flex flex-col items-center gap-0.5 transition-all ${ activeTab === 'exterior' ? 'bg-[#1c2028] border-2 border-[#4cd7f6] active-glow' : 'bg-[#262a33] border border-[#424754] hover:border-[#adc6ff]' }`}
          >
            <span className={`text-[10px] font-label font-bold ${activeTab === 'exterior' ? 'text-[#4cd7f6]' : 'text-[#dfe2ee]'}`}>
              외관 및 OLED
            </span>
            <span className="text-[9px] text-[#8c909f]">240Hz 0.2ms</span>
          </button>

          <button
            onClick={() => setActiveTab('vapor')}
            className={`rounded p-1.5 flex flex-col items-center gap-0.5 transition-all ${ activeTab === 'vapor' ? 'bg-[#1c2028] border-2 border-[#4cd7f6] active-glow' : 'bg-[#262a33] border border-[#424754] hover:border-[#adc6ff]' }`}
          >
            <span className={`text-[10px] font-label font-bold ${activeTab === 'vapor' ? 'text-[#4cd7f6]' : 'text-[#dfe2ee]'}`}>
              베이퍼 챔버 분해도
            </span>
            <span className="text-[9px] text-[#8c909f]">듀얼 블레이드 팬</span>
          </button>

          <button
            onClick={() => setActiveTab('switches')}
            className={`rounded p-1.5 flex flex-col items-center gap-0.5 transition-all ${ activeTab === 'switches' ? 'bg-[#1c2028] border-2 border-[#4cd7f6] active-glow' : 'bg-[#262a33] border border-[#424754] hover:border-[#adc6ff]' }`}
          >
            <span className={`text-[10px] font-label font-bold ${activeTab === 'switches' ? 'text-[#4cd7f6]' : 'text-[#dfe2ee]'}`}>
              RGB 기계식 스위치
            </span>
            <span className="text-[9px] text-[#8c909f]">0.1ms 응답속도</span>
          </button>

          <button
            onClick={() => setActiveTab('ports')}
            className={`rounded p-1.5 flex flex-col items-center gap-0.5 transition-all ${ activeTab === 'ports' ? 'bg-[#1c2028] border-2 border-[#4cd7f6] active-glow' : 'bg-[#262a33] border border-[#424754] hover:border-[#adc6ff]' }`}
          >
            <span className={`text-[10px] font-label font-bold ${activeTab === 'ports' ? 'text-[#4cd7f6]' : 'text-[#dfe2ee]'}`}>
              포트 &amp; I/O 맵
            </span>
            <span className="text-[9px] text-[#8c909f]">TB4 / HDMI 2.1</span>
          </button>
        </div>
      </div>

      {/* Right Column: Specs HUD, Benchmark Meters & Purchase Terminal */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-4">
        <div>
          {/* Model Identity & Badges */}
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#4d8eff] text-[#00285d] font-label text-[10px] font-bold">
              NEW FLAGSHIP
            </span>
            <span className="px-2 py-0.5 rounded bg-[#31353e] text-[#8c909f] font-label text-[10px]">
              TGP 175W UNLOCKED
            </span>
          </div>

          <h1 className="text-xl lg:text-2xl font-headline font-bold text-[#dfe2ee] leading-tight">
            TECHNOVA TITAN 16 PRO G-EDITION
          </h1>

          <p className="text-xs text-[#c2c6d6] mt-1 leading-relaxed">
            {currentSpecs.cpuName} 프로세서와 {currentSpecs.tgpText}의 {currentSpecs.gpuName}, 정밀 CNC 가공 아노다이징 알루미늄 섀시 및 3D 베이퍼 챔버 아키텍처 탑재.
          </p>

          {/* Core Metric Grid HUD */}
          <div className="grid grid-cols-2 gap-2 my-3">
            <div className="bg-[#0a0e16] border border-[#424754] rounded p-2 spec-hairline">
              <span className="text-[#8c909f] text-[10px] font-label block uppercase">GPU / POWER LIMIT</span>
              <span className="text-xs font-bold text-[#4cd7f6] block truncate">{currentSpecs.gpuName}</span>
              <span className="text-[10px] text-[#8c909f] block truncate">{currentSpecs.tgpText}</span>
            </div>

            <div className="bg-[#0a0e16] border border-[#424754] rounded p-2 spec-hairline">
              <span className="text-[#8c909f] text-[10px] font-label block uppercase">CPU ARCHITECTURE</span>
              <span className="text-xs font-bold text-[#adc6ff] block truncate">{currentSpecs.cpuName}</span>
              <span className="text-[10px] text-[#8c909f] block truncate">{currentSpecs.cpuDetail}</span>
            </div>

            <div className="bg-[#0a0e16] border border-[#424754] rounded p-2 spec-hairline">
              <span className="text-[#8c909f] text-[10px] font-label block uppercase">PANEL TELEMETRY</span>
              <span className="text-xs font-bold text-[#dfe2ee] block truncate">{currentSpecs.panelName}</span>
              <span className="text-[10px] text-[#8c909f] block">DCI-P3 100%, 0.2ms 응답속도</span>
            </div>

            <div className="bg-[#0a0e16] border border-[#424754] rounded p-2 spec-hairline">
              <span className="text-[#8c909f] text-[10px] font-label block uppercase">MEMORY / STORAGE</span>
              <span className="text-xs font-bold text-[#dfe2ee] block truncate">{filters.ram} 5600MHz</span>
              <span className="text-[10px] text-[#8c909f] block">1TB PCIe 4.0 NVMe (확장슬롯 보유)</span>
            </div>
          </div>

          {/* Power & Thermal Budget Meter */}
          <div className="bg-[#0a0e16] border border-[#424754] rounded p-2.5">
            <div className="flex items-center justify-between text-xs font-label mb-1.5">
              <span className="text-[#8c909f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">thermostat</span> 쿨링 풍량 및 전력 버짓 레벨
              </span>
              <span className="text-[#4cd7f6] font-bold">
                {powerMode === 'silent' ? '65W / 120W 저소음' : powerMode === 'balanced' ? '120W / 180W 균형' : '175W / 240W 풀로드 모드'}
              </span>
            </div>

            {/* Segmented Bar Meter (10 Blocks) */}
            <div className="grid grid-cols-10 gap-1 h-3">
              {getPowerBlocks().map((cls, idx) => (
                <div key={idx} className={`${cls} rounded-xs transition-colors duration-300`}></div>
              ))}
            </div>

            <div className="flex justify-between text-[10px] font-label text-[#8c909f] mt-1.5">
              <button
                onClick={() => onPowerModeChange('silent')}
                className={`transition-colors cursor-pointer ${powerMode === 'silent' ? 'text-[#4cd7f6] font-bold underline' : 'hover:text-[#dfe2ee]'}`}
              >
                사일런트 (38dB)
              </button>
              <button
                onClick={() => onPowerModeChange('balanced')}
                className={`transition-colors cursor-pointer ${powerMode === 'balanced' ? 'text-[#adc6ff] font-bold underline' : 'hover:text-[#dfe2ee]'}`}
              >
                균형 모드 (44dB)
              </button>
              <button
                onClick={() => onPowerModeChange('turbo')}
                className={`transition-colors cursor-pointer ${powerMode === 'turbo' ? 'text-[#ec6a06] font-bold underline' : 'hover:text-[#dfe2ee]'}`}
              >
                터보 익스트림 (52dB Max)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing & Transaction Console */}
        <div className="border-t border-[#424754]/70 pt-3 flex flex-col gap-2">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#ec6a06] font-label text-sm font-bold">18% OFF</span>
                <span className="text-[#8c909f] line-through text-xs">
                  ₩{currentSpecs.originalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-headline font-bold text-[#dfe2ee]">
                  ₩{currentSpecs.price.toLocaleString()}
                </span>
                <span className="text-xs font-label text-[#4cd7f6]">로켓새벽배송</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#8c909f] block">카드 무이자 최장 24개월 시</span>
              <span className="text-sm font-label font-bold text-[#adc6ff]">
                월 ₩{currentSpecs.monthlyInstallment.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card Benefit Banner */}
          <div className="bg-[#262a33] border border-[#424754] rounded px-2.5 py-1.5 flex items-center justify-between text-xs font-label">
            <span className="text-[#c2c6d6] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">credit_card</span> 제휴 카드 결제 시 추가 5% 청구할인 (예시 · 최대 10만원)
            </span>
            <button
              onClick={() => alert('카드사별 혜택 (예시): A사 5% 청구할인, B사 5% 청구할인, C사 24개월 무이자')}
              className="text-[#8c909f] hover:text-[#dfe2ee] cursor-pointer underline text-[11px]"
            >
              혜택 확인
            </button>
          </div>

          {/* Purchase Call To Action Cluster */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 pt-1">
            {/* Primary Cyber Action */}
            <button
              id="btn-instant-buy"
              onClick={onInstantBuy}
              className="lg:col-span-7 h-11 bg-[#ec6a06] hover:bg-[#ff7a1a] text-[#4a1c00] font-label text-xs font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all orange-glow active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span> 즉시 구매하기 (내일 새벽 도착)
            </button>

            {/* Secondary Precision Action */}
            <button
              id="btn-open-3d-arch"
              onClick={onOpen3DModal}
              className="lg:col-span-5 h-11 bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] border border-[#4cd7f6] rounded font-label text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">view_in_ar</span> 3D 아키텍처 보기
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#8c909f] pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">shield</span> 정품 판매 &amp; 2년 A/S
            </span>
            <button
              id="btn-toggle-compare"
              onClick={onToggleCompare}
              className={`hover:text-[#adc6ff] flex items-center gap-0.5 text-xs transition-colors cursor-pointer ${ isCompared ? 'text-[#4cd7f6] font-bold' : 'text-[#8c909f]' }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {isCompared ? 'check_circle' : 'add_circle'}
              </span>
              {isCompared ? '비교함 담김 (클릭 시 해제)' : '비교함에 추가하기'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
