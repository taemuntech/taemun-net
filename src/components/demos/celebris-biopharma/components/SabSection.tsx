import React from 'react';
import { GraduationCap, FileText, ExternalLink, BookOpen } from 'lucide-react';
import { SAB_ADVISORS, PUBLICATIONS } from '../data/mockData';
import { Publication } from '../types';

interface SabSectionProps {
  onSelectPublication: (pub: Publication) => void;
}

export const SabSection: React.FC<SabSectionProps> = ({ onSelectPublication }) => {
  return (
    <section className="py-24 cleanroom-grid border-t border-[#c4c5d5]/30" id="sab">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#e5eeff] text-[#00288e] text-[12px] font-code-mono font-bold mb-3 shadow-xs">
            <GraduationCap className="w-4 h-4" />
            <span>SCIENTIFIC EXCELLENCE</span>
          </div>
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#0b1c30] tracking-tight">
            글로벌 과학 자문단 (SAB) & 주요 학술 성과
          </h2>
          <p className="text-[16px] text-[#444653] mt-3 leading-relaxed">
            세계적인 종양학 권위자들과 TPD 분야 석학들이 CELEBRIS의 임상 전략과 작용 기전을 검증합니다.
          </p>
        </div>

        {/* SAB Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {SAB_ADVISORS.map((advisor, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl border border-[#c4c5d5]/40 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-[18px] shrink-0 ${
                      advisor.colorTheme === 'primary'
                        ? 'bg-[#e5eeff] text-[#00288e]'
                        : advisor.colorTheme === 'secondary'
                        ? 'bg-[#dce9ff] text-[#00687a]'
                        : 'bg-[#eff4ff] text-[#00563a]'
                    }`}
                  >
                    {advisor.initials}
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0b1c30] tracking-tight">
                      {advisor.name}
                    </h3>
                    <p
                      className={`text-[12px] font-code-mono font-semibold ${
                        advisor.colorTheme === 'primary'
                          ? 'text-[#00288e]'
                          : advisor.colorTheme === 'secondary'
                          ? 'text-[#00687a]'
                          : 'text-[#00563a]'
                      }`}
                    >
                      {advisor.role}
                    </p>
                    <p className="text-[13px] text-[#444653]">
                      {advisor.affiliation}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] text-[#444653] leading-relaxed">
                  {advisor.bio}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#c4c5d5]/30 text-[11px] font-code-mono text-[#757684]">
                {advisor.specialty}
              </div>
            </div>
          ))}
        </div>

        {/* High-Impact Publications Container */}
        <div className="bg-white rounded-xl border border-[#c4c5d5]/40 p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-6 border-b border-[#c4c5d5]/30">
            <div>
              <h3 className="text-[20px] font-bold text-[#0b1c30]">
                국제 학술지 논문 지면 구성 (예시)
              </h3>
              <p className="text-[14px] text-[#444653] mt-1">
                피어리뷰 저널 게재 지면을 보여 주는 예시입니다 — 저널명·DOI·논문은 실제가 아닙니다
              </p>
            </div>
            <span className="text-[11px] font-code-mono text-[#757684] mt-2 lg:mt-0 font-medium">
              Peer-Reviewed Publications
            </span>
          </div>

          <div className="space-y-4">
            {PUBLICATIONS.map((pub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#eff4ff]/50 border border-[#c4c5d5]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#eff4ff] transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-code-mono font-bold ${pub.badgeBg}`}>
                      {pub.journal}
                    </span>
                    <span className="font-code-mono text-[12px] text-[#757684]">
                      DOI: {pub.doi}
                    </span>
                  </div>
                  <h4 className="text-[16px] font-bold text-[#0b1c30] mt-1.5">
                    {pub.title}
                  </h4>
                  <p className="text-[13px] text-[#444653] mt-0.5">
                    {pub.description}
                  </p>
                </div>

                <button
                  onClick={() => onSelectPublication(pub)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-white border border-[#c4c5d5]/50 text-[13px] font-semibold text-[#00288e] hover:bg-[#e5eeff] transition-all shadow-2xs shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>논문 브리핑 PDF 열람</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
