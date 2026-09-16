"use client";

import React from 'react';
import { Award, BookOpen, HeartPulse, Clock } from 'lucide-react';

interface CareersWelfareProps {
  currentLang: 'KR' | 'EN';
}

export const CareersWelfare: React.FC<CareersWelfareProps> = ({ currentLang }) => {
  return (
    <section className="py-24 bg-[#f2f3ff] border-b border-[#c3c6d6]/30" id="careers">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[11px] text-[#003d9b] font-semibold uppercase tracking-widest">
              CAREERS &amp; TALENT MANAGEMENT
            </span>

            <h2 className="text-[28px] lg:text-[36px] text-[#131b2e] font-bold leading-tight tracking-tight">
              {currentLang === 'KR' ? (
                <>
                  “직원이 행복한 회사로<br />만들기 위한 복지 제공”
                </>
              ) : (
                <>
                  “Empowering People to Build<br />A Truly Happy Workplace”
                </>
              )}
            </h2>

            <p className="text-[15px] lg:text-[16px] text-[#434654] leading-relaxed">
              {currentLang === 'KR'
                ? '한양시스템의 가장 큰 자산은 첨단 반도체 기술을 일구는 임직원입니다. 전문성과 도전정신을 지닌 인재들이 소통과 화합 속에서 마음껏 역량을 펼칠 수 있는 최상의 근무 환경을 제공합니다.'
                : 'Our people are our greatest engineering asset. We provide an inspiring environment where professional mastery and bold challenge flourish with mutual respect and harmony.'}
            </p>

            {/* Talent Profile Tags */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#003d9b] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                  01
                </span>
                <span className="text-[14px] font-bold text-[#131b2e]">
                  {currentLang === 'KR'
                    ? '전문성 (Professional Mastery) : 끊임없는 기술 탐구와 품질 완벽주의'
                    : 'Professional Mastery : Relentless technical inquiry & quality perfection'}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#003d9b] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                  02
                </span>
                <span className="text-[14px] font-bold text-[#131b2e]">
                  {currentLang === 'KR'
                    ? '도전정신 (Challenging Spirit) : 불가능을 기술력으로 극복하는 열정'
                    : 'Challenging Spirit : Overcoming technical limits with bold passion'}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#003d9b] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                  03
                </span>
                <span className="text-[14px] font-bold text-[#131b2e]">
                  {currentLang === 'KR'
                    ? '소통과 화합 (Harmony & Respect) : 원팀(One Team)으로 함께 성장하는 문화'
                    : 'Harmony & Respect : One-Team culture fostering shared elevation'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Welfare Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Welfare 1 */}
            <div className="p-6 rounded-xl bg-white border border-[#c3c6d6]/40 shadow-xs space-y-3 hover:border-[#0052cc] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#d2e0fe] text-[#004866] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">payments</span>
              </div>
              <h4 className="text-[16px] font-bold text-[#131b2e]">
                {currentLang === 'KR' ? '성과 포상 및 인센티브' : 'Performance Bonus & Rewards'}
              </h4>
              <p className="text-[13px] text-[#434654] leading-relaxed">
                {currentLang === 'KR'
                  ? '경영 성과에 따른 정기 인센티브 지급, 우수 엔지니어 프로젝트 특별 포상 제도 운영.'
                  : 'Company performance-based profit sharing and custom project reward bonuses for distinguished engineers.'}
              </p>
            </div>

            {/* Welfare 2 */}
            <div className="p-6 rounded-xl bg-white border border-[#c3c6d6]/40 shadow-xs space-y-3 hover:border-[#0052cc] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#d2e0fe] text-[#004866] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">school</span>
              </div>
              <h4 className="text-[16px] font-bold text-[#131b2e]">
                {currentLang === 'KR' ? '자기계발 및 직무 교육' : 'Education & Skill Upskilling'}
              </h4>
              <p className="text-[13px] text-[#434654] leading-relaxed">
                {currentLang === 'KR'
                  ? '외부 전문 기술 세미나 및 자격증 취득 비용 100% 지원, 도서 구매비 정기 지급.'
                  : '100% tuition subsidy for specialized technology seminars, certifications, and technical book allowances.'}
              </p>
            </div>

            {/* Welfare 3 */}
            <div className="p-6 rounded-xl bg-white border border-[#c3c6d6]/40 shadow-xs space-y-3 hover:border-[#0052cc] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#d2e0fe] text-[#004866] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
              </div>
              <h4 className="text-[16px] font-bold text-[#131b2e]">
                {currentLang === 'KR' ? '건강검진 & 단체보험' : 'Comprehensive Health & Insurance'}
              </h4>
              <p className="text-[13px] text-[#434654] leading-relaxed">
                {currentLang === 'KR'
                  ? '임직원 및 직계 가족 정밀 종합 건강검진 지원, 단체 상해보험 가입을 통한 안전망 구축.'
                  : 'Comprehensive medical checkups for employees and immediate family, plus group accident coverage.'}
              </p>
            </div>

            {/* Welfare 4 */}
            <div className="p-6 rounded-xl bg-white border border-[#c3c6d6]/40 shadow-xs space-y-3 hover:border-[#0052cc] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#d2e0fe] text-[#004866] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">work_history</span>
              </div>
              <h4 className="text-[16px] font-bold text-[#131b2e]">
                {currentLang === 'KR' ? '워라밸 및 유연근무' : 'Work-Life Balance & Flexibility'}
              </h4>
              <p className="text-[13px] text-[#434654] leading-relaxed">
                {currentLang === 'KR'
                  ? '시차출퇴근제, 리프레시 휴가 지원, 명절 귀향비 및 각종 경조금·경조휴가 지원.'
                  : 'Staggered commute hours, refresh sabbatical leaves, holiday transportation bonuses, and family occasion grants.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
