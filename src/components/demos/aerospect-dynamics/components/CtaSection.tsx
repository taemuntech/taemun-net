import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { PocFormState } from '../types';

interface CtaSectionProps {
  onSuccessSubmit?: (ticket: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState<PocFormState>({
    company: '',
    infrastructure: '교량 / 터널 / 대심도 토목 구조물',
    name: '',
    phone: '',
    email: '',
  });
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
    if (onSuccessSubmit) {
      onSuccessSubmit('DEMO-SAMPLE');
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16">
      <div className="rounded-3xl bg-primary text-on-primary p-8 lg:p-14 shadow-2xl flex flex-col lg:flex-row gap-10 items-stretch justify-between relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-secondary/25 rounded-full blur-3xl pointer-events-none"></div>

        {/* Left Copy & Hotline */}
        <div className="lg:w-1/2 flex flex-col justify-between gap-6 z-10">
          <div className="flex flex-col gap-3">
            <span className="px-3 py-1 rounded bg-white/10 text-secondary-fixed font-telemetry-code text-telemetry-code inline-block w-fit">
              FIELD TRIAL &amp; FLIGHT DEMO
            </span>
            <h2 className="font-headline-lg text-headline-lg text-white tracking-tight leading-tight">
              귀사의 핵심 인프라 현장에서 직접 정밀도를 검증하십시오.
            </h2>
            <p className="font-body-md text-body-md text-white/80 leading-relaxed">
              에어로스펙트 기술 비행팀이 72시간 이내에 현장을 방문하여 0.1mm 오차 검측과 AI 자동 보고서 생성 과정을 1:1 실증해 드립니다.
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2 text-white/90">
              <span className="material-symbols-outlined text-amber-400">call</span>
              <span className="font-telemetry-label text-telemetry-label">
                총괄 수석 엔지니어 직통 핫라인
              </span>
            </div>
            <a
              className="text-2xl lg:text-3xl font-bold font-telemetry-label text-secondary-fixed tracking-wide hover:underline"
              href="tel:01000000000"
            >
              010-0000-0000
            </a>
            <span className="font-telemetry-code text-telemetry-code text-white/60">
              평일 08:30 ~ 18:30 긴급 기술 지원 및 현장 출동 상담 (샘플 번호)
            </span>
          </div>
        </div>

        {/* Right PoC Direct Form */}
        <div className="lg:w-1/2 rounded-2xl bg-white/5 backdrop-blur-md p-6 lg:p-8 flex flex-col gap-4 z-10 border border-white/15 shadow-xl">
          <h3 className="font-headline-sm text-headline-sm text-white font-semibold">
            현장 실증(PoC) 비행 문의 접수
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block font-telemetry-code text-telemetry-code text-white/70 mb-1">
                고객사 / 기관명
              </label>
              <input
                className="w-full px-3.5 py-2.5 rounded bg-white/10 text-white font-body-sm border border-white/20 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                placeholder="예: 인프라개발공사, 미래건설 플랜트사업부"
                required
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-telemetry-code text-telemetry-code text-white/70 mb-1">
                검측 대상 인프라
              </label>
              <select
                className="w-full px-3.5 py-2.5 rounded bg-zinc-900 text-white font-body-sm border border-white/20 focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                value={formData.infrastructure}
                onChange={(e) => setFormData({ ...formData, infrastructure: e.target.value })}
              >
                <option value="교량 / 터널 / 대심도 토목 구조물">교량 / 터널 / 대심도 토목 구조물</option>
                <option value="태양광 발전소 / 해상 풍력 블레이드">태양광 발전소 / 해상 풍력 블레이드</option>
                <option value="초고압 송전선 / 플랜트 전력 설비">초고압 송전선 / 플랜트 전력 설비</option>
                <option value="국가 보안 시설 / 항만 무인 경계">국가 보안 시설 / 항만 무인 경계</option>
                <option value="산불 방재 / 지자체 재난 관제">산불 방재 / 지자체 재난 관제</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label className="block font-telemetry-code text-telemetry-code text-white/70 mb-1">
                  담당자 성함 및 직함
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded bg-white/10 text-white font-body-sm border border-white/20 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                  placeholder="홍길동 책임연구원"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-telemetry-code text-telemetry-code text-white/70 mb-1">
                  연락처
                </label>
                <input
                  className="w-full px-3.5 py-2.5 rounded bg-white/10 text-white font-body-sm border border-white/20 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                  placeholder="010-0000-0000"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block font-telemetry-code text-telemetry-code text-white/70 mb-1">
                업무용 이메일
              </label>
              <input
                className="w-full px-3.5 py-2.5 rounded bg-white/10 text-white font-body-sm border border-white/20 focus:outline-none focus:border-secondary transition-colors placeholder:text-white/30"
                placeholder="contact@example.com"
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <p className="text-center text-xs text-white/60 pt-1">
              샘플 사이트입니다 · 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>

            <button
              className="w-full mt-1 py-3.5 rounded bg-amber-500 text-black font-telemetry-label text-telemetry-label uppercase tracking-wider font-bold hover:bg-amber-400 active:scale-[0.99] transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              type="submit"
            >
              <span>실증 비행 스케줄 확정 요청</span>
            </button>
          </form>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="aerospect-dynamics"
        industry="corporate"
        featureName="현장 실증(PoC) 비행 신청 폼"
      />
    </section>
  );
};
