import React from 'react';
import { Language } from '../types';

interface DiagnosticSuiteProps {
  language: Language;
}

export const DiagnosticSuite: React.FC<DiagnosticSuiteProps> = ({ language }) => {
  const devices = [
    {
      name: 'Pentacam HR 3D',
      sub: '3차원 회전 각막 단층 분석기',
      metric: '138,000 포인트 입체 스캔',
      icon: 'blur_on',
      desc: '독일 Oculus사의 정밀 회전 샤임플러그 카메라로 각막 전면뿐만 아니라 후면 곡률, 전방 깊이, 잠재적 원추각막 징후를 0.1㎛ 단위로 입체 감지합니다.',
    },
    {
      name: 'Cirrus HD-OCT 6000',
      sub: '자이스 초고해상도 망막·시신경 단층',
      metric: '초당 100,000회 A-스캔',
      icon: 'radar',
      desc: '망막 중심 황반부의 미세 병변과 녹내장 조기 발견을 위한 시신경 섬유층 두께를 비침습 광간섭 방식으로 10배 이상 빠르고 정밀하게 촬영합니다.',
    },
    {
      name: 'Corvis ST',
      sub: '생체역학적 각막 탄성도 분석',
      metric: '초고속 4,330 fps 카메라',
      icon: 'air',
      desc: '각막에 순간 공기압을 분사하여 각막이 변형되었다 복원되는 생체역학적 반응을 분석. 수술 후 각막확장증(원추각막) 발생 위험을 과학적으로 수치화합니다.',
    },
    {
      name: 'IOL Master 700',
      sub: '스웨프트소스 백내장 안축장 계측기',
      metric: '광학식 비접촉 0.01mm 오차율',
      icon: 'straighten',
      desc: '레이저 광간섭을 통해 각막 중심부터 망막 중심와까지의 안구 길이를 정확히 측정하여, 백내장 수술 시 삽입할 인공수정체의 오차 없는 도수를 산출합니다.',
    },
  ];

  return (
    <section id="diagnostic-suite" className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12 break-keep">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
            50-STEP PRECISION DIAGNOSTICS
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR'
              ? '수술 전 반드시 거치는 50단계 정밀 안종합 검진'
              : '50-Step Precision Comprehensive Ophthalmic Examination'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '단 1%의 부작용 가능성도 사전에 낮추기 위해, 대학병원급 첨단 진단 장비 4종을 크로스체크합니다.'
              : 'Cross-checking with 4 top-tier hospital-grade diagnostic instruments to eliminate any subtle anatomical risk.'}
          </p>
        </div>

        {/* 4 Diagnostics Devices Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 break-keep">
          {devices.map((dev, idx) => (
            <div
              key={idx}
              className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px]">{dev.icon}</span>
                  </div>
                  <span className="font-label-numeric text-[11px] px-2 py-0.5 rounded bg-surface-container font-semibold text-secondary">
                    DEVICE 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">{dev.name}</h3>
                <div className="font-label-caps text-[11px] text-primary font-semibold mt-0.5">{dev.sub}</div>
                <div className="font-label-numeric text-[13px] font-bold text-tertiary mt-2">{dev.metric}</div>
                <p className="font-body-sm text-[13px] text-on-surface-variant mt-3 leading-relaxed break-keep">{dev.desc}</p>
              </div>

              <div className="pt-4 mt-6 border-t border-surface-container flex items-center gap-1.5 text-primary text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>원내 전수 검진 포함</span>
              </div>
            </div>
          ))}
        </div>

        {/* Strict Non-Surgery Protocol Promise Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary text-on-primary rounded-2xl p-6 lg:p-8 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 break-keep">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-on-primary/10 rounded-xl shrink-0 mt-1">
              <span className="material-symbols-outlined text-[32px] text-primary-fixed">verified_user</span>
            </div>
            <div>
              <div className="font-label-caps text-[11px] text-primary-fixed font-bold tracking-wider mb-1">
                SAFETY FIRST POLICY
              </div>
              <h4 className="font-headline-lg text-[20px] lg:text-[24px] font-bold leading-snug">
                프라임 안과의 절대 타협 없는 안전 약속
              </h4>
              <p className="font-body-md text-[14px] text-primary-fixed/90 mt-2 max-w-3xl leading-relaxed">
                잔여 각막 두께 최소 350㎛ 엄격 준수 (규제기관(예시) 기준 250㎛보다 100㎛ 더 안전한 마진 확보). 유전성 아벨리노 각막이상증 DNA 5종 정밀 검사를 전원 의무 시행하며, 3차 크로스 체킹을 통과하지 못할 시 과감히 수술 불가 판정 및 안전한 비수술 대안을 제시합니다.
              </p>
            </div>
          </div>

          <div className="shrink-0 self-stretch lg:self-auto flex items-center justify-center">
            <span className="px-5 py-3 rounded-xl bg-on-primary text-primary font-headline-sm text-[14px] font-bold shadow-md whitespace-nowrap">
              수술 불가 판정 안심 원칙
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
