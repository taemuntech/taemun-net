import React from 'react';
import { ESG_CERTIFICATES } from '../data/mockData';
import { ShieldCheck, BookOpen, Download, ExternalLink } from './Icons';

interface GovernanceSectionProps {
  onDownloadReport: () => void;
}

export const GovernanceSection: React.FC<GovernanceSectionProps> = ({ onDownloadReport }) => {
  return (
    <section id="governance" className="py-16 bg-white border-b border-[#bcc9c6]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#00685f] font-mono text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Global Standards &amp; ESG Transparency</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30]">
              글로벌 인증 및 ESG 투명 경영
            </h2>
          </div>
          <p className="text-sm lg:text-base text-[#3d4947] max-w-lg mt-3 lg:mt-0 leading-relaxed">
            H2 NEXT의 모든 수전해 및 액화수소 공정은 글로벌 공인기관의 엄격한 제3자 실사를 통해 전 주기 청정성을 인증받습니다.
          </p>
        </div>

        {/* 4 Badges Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {ESG_CERTIFICATES.map((cert, index) => {
            const isSecondary = cert.highlightColor === 'secondary';
            return (
              <div
                key={index}
                className="p-5 rounded-xl bg-[#eff4ff] border border-[#bcc9c6]/40 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div>
                  <span
                    className={`font-mono text-xs font-bold tracking-wider block mb-1.5 ${
                      isSecondary ? 'text-[#006398]' : 'text-[#00685f]'
                    }`}
                  >
                    {cert.issuer}
                  </span>
                  <h4 className="text-base lg:text-lg font-bold text-[#0b1c30] mb-1.5">{cert.title}</h4>
                  <p className="text-xs ] text-[#3d4947] leading-relaxed">
                    {cert.description}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#6d7a77] mt-4 pt-2.5 border-t border-[#bcc9c6]/30 block">
                  {cert.certCode}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sustainability Report & DART Financial Disclosure Box */}
        <div
          id="ir"
          className="rounded-2xl bg-[#eff4ff] border border-[#bcc9c6]/40 p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div className="flex items-start lg:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#00685f]/10 flex items-center justify-center text-[#00685f] flex-shrink-0">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-[#0b1c30]">
                2025 지속가능경영보고서 (GRI Standards) &amp; 정기 주주총회 소집공고
              </h3>
              <p className="text-xs lg:text-sm text-[#3d4947] mt-1 leading-relaxed">
                H2 NEXT의 투명한 거버넌스 원칙과 넷제로 이행 로드맵, ESG 핵심 지표가 상세히 수록된 연차보고서 전문을 열람하세요.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <button
              id="btn-download-sustainability-report"
              type="button"
              onClick={onDownloadReport}
              className="inline-flex items-center justify-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer text-center"
            >
              <Download className="w-4 h-4" />
              <span>지속가능경영보고서 다운로드</span>
            </button>
            <a
              id="link-dart-disclosure"
              className="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-[#bcc9c6]/40 text-[#0b1c30] text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 text-center"
              href="https://dart.fss.or.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>DART 금융감독원 공시</span>
              <ExternalLink className="w-4 h-4 text-[#6d7a77]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
