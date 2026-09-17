'use client';

import React, { useEffect, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ESG_CERTIFICATES } from '../data/mockData';
import { ShieldCheck, BookOpen, Download, ExternalLink } from './Icons';

interface GovernanceSectionProps {
  /** 푸터 IR 링크가 고른 문서 — nonce 가 바뀌면 같은 문서를 다시 눌러도 안내가 열린다 */
  requestedDoc?: { name: string; nonce: number } | null;
}

export const GovernanceSection: React.FC<GovernanceSectionProps> = ({ requestedDoc = null }) => {
  // 샘플이라 보고서 파일이 없다 — 「발송되었습니다」 대신 공용 안내(SampleNotice)를 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  // 푸터 IR 링크가 요청한 문서 이름 — 어느 문서를 눌렀는지 안내에 그대로 싣는다
  const [docName, setDocName] = useState('지속가능경영보고서 내려받기');

  useEffect(() => {
    if (!requestedDoc) return;
    setDocName(requestedDoc.name);
    setIsNoticeOpen(true);
  }, [requestedDoc]);

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
          <div className="mt-3 lg:mt-0 lg:text-right">
            <p className="text-sm lg:text-base text-[#3d4947] max-w-lg leading-relaxed [word-break:keep-all]">
              수전해·액화수소 공정에 제3자 검증과 환경·에너지 경영 체계를 어떻게 붙여 보여 줄지 구성한 구역입니다.
            </p>
            {/* 실존 인증기관·검증기관 이름과 조회 가능한 인증번호는 넣지 않는다 — 자리만 표시한다 */}
            <span className="mt-2 inline-block rounded-full border border-[#00685f]/30 bg-[#eff4ff] px-2.5 py-1 font-mono text-[11px] text-[#00685f] [word-break:keep-all]">
              아래 인증기관·인증번호는 실제 기관이 아닌 예시 표기 자리입니다
            </span>
          </div>
        </div>

        {/* 4 Badges Row — 태블릿(640~1023)에서 한 줄씩 늘어지던 자리를 2열로 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                  <h4 className="text-base lg:text-lg font-bold text-[#0b1c30] mb-1.5 [word-break:keep-all]">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#3d4947] leading-relaxed [word-break:keep-all]">
                    {cert.description}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#6d7a77] mt-4 pt-2.5 border-t border-[#bcc9c6]/30 block [word-break:keep-all]">
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
              <h3 className="text-lg lg:text-xl font-bold text-[#0b1c30] [word-break:keep-all]">
                2025 지속가능경영보고서 &amp; 정기 주주총회 소집공고
              </h3>
              <p className="text-xs lg:text-sm text-[#3d4947] mt-1 leading-relaxed [word-break:keep-all]">
                거버넌스 원칙과 넷제로 이행 로드맵, ESG 핵심 지표를 담는 연차보고서 지면입니다 (예시 — 실제 보고서 파일은 없습니다).
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <button
              id="btn-download-sustainability-report"
              type="button"
              onClick={() => setIsNoticeOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white text-sm font-semibold px-5 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer text-center"
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span className="[word-break:keep-all]">지속가능경영보고서 다운로드</span>
            </button>
            {/* 전에는 자기 페이지(#governance)를 새 탭으로 여는 링크였다 — 아무 데도 가지 않으므로 같은 안내를 여는 버튼으로 바꾼다 */}
            <button
              id="link-dart-disclosure"
              type="button"
              onClick={() => setIsNoticeOpen(true)}
              className="inline-flex min-h-11 items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-[#bcc9c6]/40 text-[#0b1c30] text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-150 text-center cursor-pointer"
            >
              <span className="[word-break:keep-all]">전자공시 지면 (예시)</span>
              <ExternalLink className="w-4 h-4 text-[#6d7a77] flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="h2-next"
        industry="corporate"
        featureName={docName}
      />
    </section>
  );
};
