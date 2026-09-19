"use client";

import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { LOGO_URL, FAMILY_SITES } from '../data';

export const Footer: React.FC = () => {
  const [legalModalContent, setLegalModalContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const handleFamilySiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = e.target.value;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      e.target.value = '';
    }
  };

  const openLegalModal = (type: string) => {
    switch (type) {
      case 'privacy':
        setLegalModalContent({
          title: '개인정보처리방침',
          content: `원익큐앤씨(이하 "회사")는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다.

1. 개인정보의 처리 목적: 회사는 채용 전형, 고객 문의 및 협력 제안, 주주 상담 등의 목적을 위하여 최소한의 개인정보를 수집·처리합니다.
2. 처리하는 개인정보의 항목: 성명, 연락처, 이메일 주소, 소속 회사명 등.
3. 개인정보의 보유 및 이용기간: 정보주체의 동의를 받은 기간 또는 법령에 따른 보존기간 내에서 처리·보유합니다.
4. 안전성 확보 조치: 암호화 전송, 접근 권한 관리, 침입 차단 시스템 가동 등 철저한 보안 체계를 유지합니다.`,
        });
        break;
      case 'terms':
        setLegalModalContent({
          title: '이용약관',
          content: `이 화면은 태문넷이 만든 제안용 시안이며 공식 사이트가 아닙니다.

1. 이용자는 회사의 사전 서면 동의 없이 본 사이트의 텍스트, 이미지, 영상, 도면 등 지식재산권을 무단 복제, 배포할 수 없습니다.
2. 회사는 투자자 및 고객의 편의를 위해 정확한 정보를 제공하고자 노력하나, 주가 정보 및 실적 추정치 등은 시장 상황에 따라 변동될 수 있습니다.
3. 본 약관은 대한민국 관계 법령에 따라 해석 및 규율됩니다.`,
        });
        break;
      case 'email':
        setLegalModalContent({
          title: '이메일무단수집거부',
          content: `본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.

이를 위반할 시 정보통신망 이용촉진 및 정보보호 등에 관한 법률 제50조의 2 등에 의해 형사처벌을 받을 수 있음을 유념하시기 바랍니다.
(게시일: 2024년 1월 1일)`,
        });
        break;
      case 'ethics':
        setLegalModalContent({
          title: '윤리경영 사이버신문고',
          content: `원익큐앤씨는 공정하고 투명한 기업 윤리 확립을 위해 비윤리 행위 제보 채널을 24시간 상시 운영하고 있습니다.

[제보 대상]
- 직무 관련 금품, 향응 수수 행위
- 불공정한 거래 및 협력업체에 대한 부당한 대우
- 회계 부정 및 회사 자산의 횡령, 유용
- 직장 내 괴롭힘 및 성희롱 행위

제보자의 신원과 제보 내용은 철저하게 비밀로 보장되며, 어떠한 불이익도 받지 않도록 보호됩니다.
(제보 이메일: audit@wonik.com / 직통 핫라인: 054-479-2510)`,
        });
        break;
    }
  };

  return (
    <footer className="bg-[#283044] text-[#d2d9f4] border-t border-white/10" id="footer">
      <div className="w-full py-16 px-6 max-w-[1320px] mx-auto flex flex-col gap-8">
        {/* Top Brand & Family Site Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img
              src={LOGO_URL}
              alt="Wonik QnC Logo"
              className="h-9 w-9 object-contain brightness-125"
              referrerPolicy="no-referrer"
            />
            <span className="text-2xl font-extrabold text-white tracking-tight">
              WONIK QnC
            </span>
          </div>

          {/* Family Site Selector Menu */}
          <div className="relative inline-block w-full lg:w-64">
            <select
              className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-[#0052cc] appearance-none cursor-pointer pr-10"
              onChange={handleFamilySiteChange}
              defaultValue=""
              aria-label="Select Family Site"
            >
              <option className="bg-[#283044] text-white" value="">
                FAMILY SITE 바로가기
              </option>
              {FAMILY_SITES.map((site) => (
                <option
                  key={site.name}
                  className="bg-[#283044] text-white"
                  value={site.url}
                >
                  {site.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Center Links & Legal Navigation */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <button
            type="button"
            onClick={() => openLegalModal('privacy')}
            className="text-[#c6e7ff] font-bold underline hover:text-white transition-colors cursor-pointer"
          >
            개인정보처리방침
          </button>
          <button
            type="button"
            onClick={() => openLegalModal('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            이용약관
          </button>
          <button
            type="button"
            onClick={() => openLegalModal('email')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            이메일무단수집거부
          </button>
          <button
            type="button"
            onClick={() => openLegalModal('ethics')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            윤리경영사이버신문고
          </button>
          <a
            href="https://wonik.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Family Site
          </a>
        </div>

        {/* Bottom Corporate Address & Copyright Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between text-sm text-[#d2d9f4]/80 gap-4 pt-4 border-t border-white/5">
          <div>
            <p>
              © 2025 WONIK QnC Corp. All Rights Reserved. 경상북도 구미시 산동읍 5공단 3로 14 | T. 054-479-2500
            </p>
            <p className="font-mono text-xs text-[#d2d9f4]/60 mt-1">
              FAX: 054-479-2680 | 통신판매업신고 제2012-경북구미-0105호
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#c6e7ff] tracking-wider font-semibold">
            <span>GUMI HQ</span>
            <span>•</span>
            <span>DRESDEN LAB</span>
            <span>•</span>
            <span>AUSTIN FAB CENTER</span>
          </div>
        </div>
      </div>

      {/* Legal Content Modal */}
      {legalModalContent && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalModalContent(null)}
        >
          <div
            className="bg-white text-[#131b2e] max-w-xl w-full rounded-xl p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold">{legalModalContent.title}</h3>
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 text-sm text-gray-700 whitespace-pre-line leading-relaxed max-h-[60vh] overflow-y-auto">
              {legalModalContent.content}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalContent(null)}
                className="px-4 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-semibold rounded-md"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
