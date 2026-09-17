import React, { useState } from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';

export const Philosophy: React.FC = () => {
  const [scanLayer, setScanLayer] = useState<'bone' | 'nerve' | 'soft'>('nerve');

  return (
    <section className="w-full py-20 bg-[#f7f3ef] relative" id="philosophy">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#725b38] font-bold">
              ONSAEMIRO CORE PHILOSOPHY
            </span>
            <h2 className="font-serif text-[28px] lg:text-[34px] text-[#1c1c19] leading-snug">
              가르거나 쪼개지 않은 본연의 조화,<br />
              <span className="italic text-[#725b38] font-serif">온새미로 3대 원칙</span>
            </h2>
          </div>
          <p className="text-[14px] leading-relaxed text-[#4d463c] max-w-md">
            과도하게 찍어내는 일률적 미인이 아닌, 환자 고유의 골격과 표정 근육에 가장 안락하게 머무는 아름다움을 설계합니다.
          </p>
        </div>

        {/* 3 Luxury Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Bento 1: 과교정 배제 */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">balance</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-[#725b38] font-bold tracking-wider">PHILOSOPHY 01</span>
                <h3 className="font-serif text-[20px] font-semibold text-[#1c1c19]">
                  과교정 배제 (Natural Harmony)
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-[#4d463c]">
                성형수술의 가장 큰 실패는 '누가 봐도 수술한 얼굴'이 되는 것입니다. 온새미로는 인위적인 보형물 과다 사용과 무리한 거상을 지양하며, 본래 타고난 듯 자연스럽고 고상한 윤곽을 완성합니다.
              </p>
            </div>
            <div className="pt-8 mt-6">
              <div className="h-44 rounded-xl overflow-hidden bg-[#ebe7e4] relative group">
                <img
                  src={CLINIC_IMAGES.philosophyNatural}
                  alt="자연스러운 윤곽 보존"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-[#fdf9f5] text-[11px] font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded">
                  자연스러운 표정근육의 완벽한 보존
                </span>
              </div>
            </div>
          </div>

          {/* Bento 2: 3D 정밀 해부학 진단 */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">view_in_ar</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-[#725b38] font-bold tracking-wider">PHILOSOPHY 02</span>
                <h3 className="font-serif text-[20px] font-semibold text-[#1c1c19]">
                  3D 정밀 해부학 진단 (Precision Anatomy)
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-[#4d463c]">
                연부조직 뒤에 숨겨진 뼈의 각도, 신경선 주행 경로, 피부 두께를 3D-CT와 초고해상도 입체 스캐너로 0.05mm 단위까지 사전 계측하여 오차 없는 수술 계획을 수립합니다.
              </p>
            </div>
            <div className="pt-8 mt-6">
              <div className="h-44 rounded-xl overflow-hidden bg-[#ebe7e4] relative flex flex-col justify-between p-4 border border-[#d1c5b8]/40">
                {/* Layer switch buttons */}
                <div className="flex items-center justify-between text-[11px] z-10">
                  <span className="text-[#4d463c] font-medium">레이어 시뮬레이션:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setScanLayer('bone')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        scanLayer === 'bone' ? 'bg-[#725b38] text-white font-semibold' : 'bg-white/70 text-[#4d463c]'
                      }`}
                    >
                      골격
                    </button>
                    <button
                      onClick={() => setScanLayer('nerve')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        scanLayer === 'nerve' ? 'bg-[#725b38] text-white font-semibold' : 'bg-white/70 text-[#4d463c]'
                      }`}
                    >
                      신경선
                    </button>
                    <button
                      onClick={() => setScanLayer('soft')}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        scanLayer === 'soft' ? 'bg-[#725b38] text-white font-semibold' : 'bg-white/70 text-[#4d463c]'
                      }`}
                    >
                      피부층
                    </button>
                  </div>
                </div>

                {/* Animated CT SVG Visualizer */}
                <div className="flex items-center justify-center py-1">
                  <svg className="w-24 h-24 text-[#725b38] transition-all" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '24s' }} />
                    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth={scanLayer === 'bone' ? 3 : 1.5} opacity={scanLayer === 'bone' ? 1 : 0.6} />
                    <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    {scanLayer === 'nerve' && (
                      <path d="M35 30 Q50 48 65 30 M38 65 Q50 78 62 65" stroke="#ba1a1a" strokeWidth="2" strokeDasharray="2 2" />
                    )}
                    <circle cx="50" cy="22" r="3.5" fill="currentColor" />
                    <circle cx="68" cy="50" r="3.5" fill="currentColor" />
                    <circle cx="38" cy="65" r="3.5" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[11px] text-center text-[#4d463c] font-medium z-10">
                  {scanLayer === 'bone' && '3D 안면 골격 대칭 0.05mm 계측'}
                  {scanLayer === 'nerve' && '하치조신경 및 안면신경 주행선 완벽 회피'}
                  {scanLayer === 'soft' && '피부 연부조직 두께 및 탄력도 맵'}
                </span>
              </div>
            </div>
          </div>

          {/* Bento 3: 미세 다층 봉합 */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#725b38]/10 text-[#725b38] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">healing</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[11px] text-[#725b38] font-bold tracking-wider">PHILOSOPHY 03</span>
                <h3 className="font-serif text-[20px] font-semibold text-[#1c1c19]">
                  미세 다층 봉합 (Scarless Micro-Suture)
                </h3>
              </div>
              <p className="text-[14px] leading-relaxed text-[#4d463c]">
                피부 표면만을 닫는 단순 봉합이 아닌, 깊은 근막층-피하지방층-진피층을 3중으로 미세 분산 봉합하여 수술 후 흉터와 붉은 자국을 육안으로 찾기 어려울 정도로 최소화합니다.
              </p>
            </div>
            <div className="pt-8 mt-6">
              <div className="h-44 rounded-xl overflow-hidden bg-[#ebe7e4] relative group">
                <img
                  src={CLINIC_IMAGES.philosophySuture}
                  alt="미세 다층 봉합 기구"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <span className="absolute bottom-3 left-3 text-[#fdf9f5] text-[11px] font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded">
                  0.1mm 이하 미세 봉합사 3중 피하 봉합
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
