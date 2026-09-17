"use client";

import React from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

interface DetailModalProps {
  divisionId: string | null;
  onClose: () => void;
  currentLang: 'KR' | 'EN';
  onNavigateToQuote: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  divisionId,
  onClose,
  currentLang,
  onNavigateToQuote,
}) => {
  if (!divisionId) return null;

  const dataMap: Record<
    string,
    {
      title: string;
      subtitle: string;
      desc: string;
      image: string;
      specs: { label: string; value: string }[];
      features: string[];
    }
  > = {
    fa: {
      title: currentLang === 'KR' ? '장비사업부 (FA & Semiconductor Equipment)' : 'FA & Semiconductor Equipment Division',
      subtitle: currentLang === 'KR' ? '초정밀 반도체 웨이퍼 이송 및 클린룸 자동화 머시너리' : 'Ultra-Precision Wafer Handling & Fab Automation Machinery',
      desc:
        currentLang === 'KR'
          ? '반도체 전/후공정에서 웨이퍼 손상을 제로화하는 고속 고정밀 반송 로봇, 커스텀 EFEM(Equipment Front End Module), 클린룸 자동화 물류 시스템을 자체 설계 및 제작합니다. 극저진동 서보 드라이브와 Class 10 청정 환경을 충족합니다.'
          : 'Custom EFEM, high-speed wafer transfer robots, and cleanroom automated guided logistics designed to eliminate wafer stress, particulate generation, and cycle micro-delays.',
      image:
        '/portfolio/hysfa/hysfa-01.jpg',
      specs: [
        { label: currentLang === 'KR' ? '반복 위치 정밀도' : 'Repeatability', value: '±0.02 mm' },
        { label: currentLang === 'KR' ? '적용 웨이퍼 규격' : 'Wafer Sizes', value: '200mm (8") / 300mm (12")' },
        { label: currentLang === 'KR' ? '청정 보증 등급' : 'Cleanliness Rating', value: 'ISO Class 1 / Class 10' },
        { label: currentLang === 'KR' ? '가동 신뢰도 MTBF' : 'Reliability MTBF', value: '> 80,000 hrs' },
      ],
      features: [
        currentLang === 'KR' ? '특허받은 공압 댐핑 및 나노 단위 진동 억제 서보 알고리즘' : 'Patented active pneumatic damping & anti-vibration servo controls',
        currentLang === 'KR' ? '듀얼 암(Dual-Arm) 고속 진공 엔드이펙터(End-Effector) 탑재' : 'Dual-arm high-speed vacuum end-effectors for high-throughput cycles',
        currentLang === 'KR' ? 'SECS/GEM 통신 프로토콜 완벽 지원 및 라인 실시간 인터락' : 'Native SECS/GEM compatibility with automated line safety interlocks',
      ],
    },
    gas: {
      title: currentLang === 'KR' ? '가스사업부 (High-Purity Gas Delivery)' : 'High-Purity Gas Delivery Division',
      subtitle: currentLang === 'KR' ? '초고순도 UHP 특수가스 공급 캐비닛 및 VMB 안전 솔루션' : 'Ultra-High-Purity Gas Cabinets & VMB Engineered Systems',
      desc:
        currentLang === 'KR'
          ? '초고순도(UHP) 반도체 특수가스를 안정적으로 웨이퍼 챔버로 공급하는 전자동 가스 캐비닛, VMB(Valve Manifold Box), 스크러버 연동 배관 및 가스 누출 긴급 자동 차단 시스템을 공급합니다.'
          : 'Fully automated UHP gas delivery cabinets, multi-channel Valve Manifold Boxes (VMB), and fast-acting emergency shutdown manifolds conforming to stringent SEMI S2/S8 standards.',
      image:
        '/portfolio/hysfa/hysfa-03.jpg',
      specs: [
        { label: currentLang === 'KR' ? '누출 허용 기준' : 'Helium Leak Rate', value: '1x10⁻⁹ mbar·l/s' },
        { label: currentLang === 'KR' ? '내부 표면 조도' : 'Internal Roughness', value: 'Ra ≤ 0.13 µm (EP grade)' },
        { label: currentLang === 'KR' ? '비상 차단 응답속도' : 'Emergency Shutdown', value: '< 50 ms' },
        { label: currentLang === 'KR' ? '안전 인증' : 'Safety Compliance', value: 'SEMI S2 / S8, KGS Code' },
      ],
      features: [
        currentLang === 'KR' ? '4중 다중화 가스 누출 센서 연동 자동 질소 퍼지 시퀀스' : '4-tier gas sensor interlock with automatic N2 purge sequences',
        currentLang === 'KR' ? '오비탈 챔버 용접 기술 적용으로 파티클 및 산소 유입 차단' : 'Orbital welded flow-paths avoiding trace metal and oxygen ingress',
        currentLang === 'KR' ? '방폭형 터치 HMI 탑재로 원격 실시간 압력/유량 모니터링' : 'Explosion-proof color touch HMI for remote telemetry and pressure alerts',
      ],
    },
    sw: {
      title: currentLang === 'KR' ? '정보사업부 (Smart Automation Software)' : 'Smart Automation Software Division',
      subtitle: currentLang === 'KR' ? '인더스트리 4.0 기반 실시간 PLC/SCADA 및 MES 연동 제어 플랫폼' : 'Industry 4.0 Real-time PLC/SCADA & MES Integration Suite',
      desc:
        currentLang === 'KR'
          ? '반도체 팹 라인 내 모든 장비의 상태를 초당 수천 개 파라미터로 실시간 수집 및 시각화하며, SECS/GEM 및 EDA(Interface-A) 프로토콜을 통해 상위 공정 MES와 매끄럽게 통신합니다.'
          : 'High-speed telemetry collection, predictive diagnostics, SCADA supervision, and bidirectional SECS/GEM protocol integration for seamless fab operations.',
      image:
        '/portfolio/hysfa/hysfa-01.jpg',
      specs: [
        { label: currentLang === 'KR' ? '통신 프로토콜' : 'Protocols', value: 'SECS-I, HSMS, SECS-II, GEM' },
        { label: currentLang === 'KR' ? '데이터 샘플링 속도' : 'Telemetry Latency', value: '< 10 ms Real-time' },
        { label: currentLang === 'KR' ? '호환 PLC 플랫폼' : 'PLC Support', value: 'Mitsubishi, Siemens, Omron, LS' },
        { label: currentLang === 'KR' ? '아키텍처' : 'Architecture', value: 'Microservices & Web HMI' },
      ],
      features: [
        currentLang === 'KR' ? '장비 이상 징후 실시간 예측 및 스마트 알람 에스컬레이션' : 'Real-time predictive anomaly detection with automated smart escalation',
        currentLang === 'KR' ? '국산화된 자체 모듈로 라이선스 비용 절감 및 신속한 커스텀 지원' : '100% proprietary localized codebase reducing licensing overhead',
        currentLang === 'KR' ? '고해상도 3D 디지털 트윈 기반 팹 라인 가상 뷰어 지원' : 'Interactive 3D digital-twin dashboard for remote multi-facility control',
      ],
    },
  };

  const active = dataMap[divisionId] || dataMap['fa'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#c3c6d6]/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 bg-[#faf8ff] border-b border-[#c3c6d6]/40">
          <div>
            <h3 className="text-[20px] font-bold text-[#131b2e] tracking-tight">{active.title}</h3>
            <p className="text-[13px] text-[#434654]">{active.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#737685] hover:text-[#131b2e] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image Banner */}
          <div className="relative h-56 rounded-xl overflow-hidden bg-[#283044]">
            <img
              src={active.image}
              alt={active.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-6 text-white text-[13px] font-mono">
              HANYANGSYSTEM ENGINEERED INFRASTRUCTURE
            </div>
          </div>

          {/* Description */}
          <p className="text-[15px] text-[#434654] leading-relaxed">{active.desc}</p>

          {/* Specifications Grid */}
          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#003d9b]" />
              <span>{currentLang === 'KR' ? '핵심 사양 및 엔지니어링 지표' : 'Core Engineering Specifications'}</span>
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {active.specs.map((spec, i) => (
                <div key={i} className="p-3 bg-[#f2f3ff] rounded-lg border border-[#c3c6d6]/30">
                  <div className="text-[11px] font-mono text-[#737685]">{spec.label}</div>
                  <div className="text-[14px] font-bold text-[#003d9b] mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Checklist */}
          <div className="space-y-3">
            <h4 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#003d9b]" />
              <span>{currentLang === 'KR' ? '기술적 강점 및 안전 보증' : 'Technical Highlights & Guarantees'}</span>
            </h4>
            <div className="space-y-2">
              {active.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#434654]">
                  <CheckCircle className="w-4 h-4 text-[#0052cc] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#faf8ff] border-t border-[#c3c6d6]/30 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-[#c3c6d6]/60 text-[#434654] hover:bg-slate-100 text-[14px] font-medium transition-colors cursor-pointer"
          >
            {currentLang === 'KR' ? '닫기' : 'Close'}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateToQuote();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded-lg text-[14px] font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>{currentLang === 'KR' ? '해당 부문 맞춤 견적 신청하기' : 'Inquire for this Division'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
