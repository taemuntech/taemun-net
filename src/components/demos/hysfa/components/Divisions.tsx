"use client";

import React from 'react';
import { Cpu, Flame, Terminal, Activity, Network, CheckCircle, ExternalLink } from 'lucide-react';
import { DivisionInfo } from '../types';

interface DivisionsProps {
  currentLang: 'KR' | 'EN';
  onSelectDivision: (divisionId: string) => void;
}

export const Divisions: React.FC<DivisionsProps> = ({ currentLang, onSelectDivision }) => {
  return (
    <section className="py-24 bg-white hairline-grid border-b border-[#c3c6d6]/30" id="divisions">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#003d9b] font-mono text-[11px] uppercase tracking-widest mb-3 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003d9b]"></span>
              <span>CORE BUSINESS DIVISIONS</span>
            </div>
            <h2 className="text-[30px] lg:text-[36px] font-bold text-[#131b2e] tracking-tight">
              {currentLang === 'KR' ? '3대 핵심 사업 영역 쇼케이스' : '3 Core Business Divisions'}
            </h2>
          </div>
          <p className="text-[15px] lg:text-[16px] text-[#434654] max-w-lg leading-relaxed">
            {currentLang === 'KR'
              ? '반도체 공정 전반의 생산 수율 극대화와 무결점 안전 운영을 위한 하드웨어 장비부터 UHP 가스 인프라, 지능형 S/W까지 통합 공급합니다.'
              : 'Delivering end-to-end semiconductor fab hardware, UHP gas infrastructure, and intelligent automation S/W to maximize yields and guarantee zero-defect safety.'}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Division 01: FA Equipment (Large Bento Card) */}
          <div 
            id="division-card-fa"
            onClick={() => onSelectDivision('fa')}
            className="lg:col-span-7 bg-[#faf8ff] rounded-xl border border-[#c3c6d6]/50 overflow-hidden flex flex-col justify-between group hover:border-[#0052cc] transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            <div className="p-8 lg:p-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#eaedff] text-[#003d9b] font-mono text-[11px] rounded-md font-semibold tracking-wider uppercase">
                  DIVISION 01
                </span>
                <span className="material-symbols-outlined text-[#737685] group-hover:text-[#003d9b] transition-colors text-[24px]">
                  precision_manufacturing
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-[22px] lg:text-[26px] text-[#131b2e] font-bold tracking-tight">
                  {currentLang === 'KR' ? '장비사업부 (FA & Semiconductor Equipment)' : 'FA & Semiconductor Equipment Div'}
                </h3>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0052cc] text-[13px] font-medium hidden lg:flex items-center gap-1">
                  {currentLang === 'KR' ? '상세보기' : 'Details'} <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>

              <p className="text-[15px] text-[#434654] leading-relaxed">
                {currentLang === 'KR'
                  ? '반도체 공정 자동화(FA) 설비, 웨이퍼 이송 및 초정밀 클린룸 물류 로보틱스, 고객사 맞춤형 커스텀 제조 장비를 직접 설계·제작합니다. 나노미터 단위의 반복 정밀도와 고청정 환경을 완벽히 보장합니다.'
                  : 'Design and manufacturing of semiconductor factory automation (FA), wafer handling robotics, cleanroom logistics, and tailored custom production rigs ensuring nanometer-grade repeatability.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-[11px] font-mono px-2.5 py-1 bg-[#e2e7ff] rounded-sm text-[#515f78] font-medium">
                  # 웨이퍼 반송 로봇
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 bg-[#e2e7ff] rounded-sm text-[#515f78] font-medium">
                  # 클린룸 로보틱스
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 bg-[#e2e7ff] rounded-sm text-[#515f78] font-medium">
                  # 공정 전후공정 자동화
                </span>
              </div>
            </div>

            <div className="relative h-64 lg:h-72 overflow-hidden bg-[#283044]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYWWRQL8TrOm6uhYUSENCtpc_flRXvG7tpaU04gam55xIYwlqOc5Bjzo_uqYhCwrrkUT5Opn3HsWSYHQ496EnRKjOI0NIIpH1NklHQkN-1iU2OWkkJF2rqlXQx0CGdpoGgGpdKcLb0Aw1wdEbv0uxHzg94ocoxLaZL9RxCwL_gh0S7zLo5Kr7KXGsHCYtSTiLDDXSrDj7xusKsYCQgPItrE2nGLQzBpEW4aiOfqZyqxyzXUFB8F6oN"
                alt="반도체 FA 자동화 장비 및 로보틱스 시스템"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#d2d9f4]">
                  High-Precision Wafer Transport Rig
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#81cfff]">verified</span>
              </div>
            </div>
          </div>

          {/* Right Stack: Division 02 & 03 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Division 02: Gas Systems */}
            <div 
              id="division-card-gas"
              onClick={() => onSelectDivision('gas')}
              className="bg-[#faf8ff] rounded-xl border border-[#c3c6d6]/50 overflow-hidden group hover:border-[#0052cc] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
            >
              <div className="p-7 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#d2e0fe] text-[#004866] font-mono text-[11px] rounded-md font-semibold tracking-wider uppercase">
                    DIVISION 02
                  </span>
                  <span className="material-symbols-outlined text-[#737685] group-hover:text-[#004866] transition-colors text-[24px]">
                    propane_tank
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] text-[#131b2e] font-bold tracking-tight">
                    {currentLang === 'KR' ? '가스사업부 (High-Purity Gas Delivery)' : 'High-Purity Gas Delivery Div'}
                  </h3>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0052cc] text-[12px] font-medium hidden lg:flex items-center gap-1">
                    {currentLang === 'KR' ? '상세보기' : 'Details'} <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-[14px] text-[#434654] leading-relaxed">
                  {currentLang === 'KR'
                    ? '초고순도(UHP) 반도체 특수가스 공급 캐비닛(Gas Cabinet), VMB(Valve Manifold Box), 정밀 압력 및 가스 누출 안전 제어 배관 시스템을 엔지니어링합니다.'
                    : 'Engineering of ultra-high-purity (UHP) Gas Cabinets, Valve Manifold Boxes (VMB), and real-time gas leakage safety piping infrastructure.'}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-[#e2e7ff] rounded-sm text-[#515f78]">
                    UHP Gas Cabinet
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 bg-[#e2e7ff] rounded-sm text-[#515f78]">
                    VMB &amp; Exhaust Control
                  </span>
                </div>
              </div>

              <div className="relative h-44 overflow-hidden bg-[#283044]">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1WCBpGVAHb5_-iReMeC1zV47SPzYE54GIsoZPddWvxxbemUbV7NJRCvq1dRIYIszxgFMLknUIJaUpnvJtaXTOluj2dIw3DYxV0O8GTQYqYCqH-MTdC_VuvyXy640fGhsumA-7oIw-aD9WxfA3PscsKqSmlTvMkpgmYt4ocqQG9kxny81pvqwMR2KjIUWgN7fOAj28jr2xNhCuBLlbe4hB4Pa3HKG9nN2yTFxs-wuuDVCIkOTxm_vng9pi0"
                  alt="초고순도 특수가스 공급 설비 캐비닛"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#283044]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-6 text-mono text-[11px] uppercase tracking-widest text-[#d2d9f4]">
                  Gas Cabinet &amp; Valve Manifold System
                </div>
              </div>
            </div>

            {/* Division 03: Smart Software */}
            <div 
              id="division-card-sw"
              onClick={() => onSelectDivision('sw')}
              className="bg-[#faf8ff] rounded-xl border border-[#c3c6d6]/50 p-7 space-y-4 group hover:border-[#0052cc] transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-[#e2e7ff] text-[#0052cc] font-mono text-[11px] rounded-md font-semibold tracking-wider uppercase">
                  DIVISION 03
                </span>
                <span className="material-symbols-outlined text-[#737685] group-hover:text-[#0052cc] transition-colors text-[24px]">
                  terminal
                </span>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-[20px] text-[#131b2e] font-bold tracking-tight">
                  {currentLang === 'KR' ? '정보사업부 (Smart Automation Software)' : 'Smart Automation Software Div'}
                </h3>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0052cc] text-[12px] font-medium hidden lg:flex items-center gap-1">
                  {currentLang === 'KR' ? '상세보기' : 'Details'} <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>

              <p className="text-[14px] text-[#434654] leading-relaxed">
                {currentLang === 'KR'
                  ? '반도체 팹 라인 실시간 모니터링, PLC/SCADA 통합 제어 시스템, 설비 데이터 실시간 수집 및 상위 MES/ERP 연동 맞춤형 인더스트리 4.0 솔루션.'
                  : 'Real-time fab line monitoring, PLC/SCADA unified control architectures, high-speed telemetry collection, and bidirectional MES/ERP integration.'}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white rounded-lg border border-[#c3c6d6]/40 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#003d9b] text-[20px]">monitor_heart</span>
                  <span className="text-[13px] font-semibold text-[#131b2e]">
                    {currentLang === 'KR' ? '실시간 통합 SCADA' : 'Real-time SCADA'}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#c3c6d6]/40 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#003d9b] text-[20px]">hub</span>
                  <span className="text-[13px] font-semibold text-[#131b2e]">
                    {currentLang === 'KR' ? 'MES 양방향 프로토콜' : 'MES Protocol Engine'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
