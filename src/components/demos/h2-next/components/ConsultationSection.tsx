'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Send, Lock } from './Icons';

export const ConsultationSection: React.FC = () => {
  const [partnershipType, setPartnershipType] = useState('ppa');
  const [location, setLocation] = useState('');
  const [timeline, setTimeline] = useState('2026-H1');
  const [company, setCompany] = useState('');
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [ndaAccepted, setNdaAccepted] = useState(false);

  // 샘플이라 미팅 신청을 받지 않는다 — 가짜 접수 문구·「24시간 안에 연락」 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaAccepted) {
      setErrorMessage('비밀유지(NDA) 약관에 동의해 주세요.');
      return;
    }
    setErrorMessage('');
    setIsNoticeOpen(true);
  };

  return (
    <section id="consultation" className="py-16 bg-[#f8f9ff]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-[#00685f] font-mono text-xs uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00685f]"></span>
            <span>Enterprise PPA Consultation</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30]">
            RE100 전력 제휴 및 수소 엔지니어링 미팅 신청
          </h2>
          <p className="text-sm lg:text-base text-[#3d4947] mt-2 leading-relaxed">
            귀사의 에너지 사용 특성에 맞춘 전력 직거래(PPA) 계약 조건과 온사이트 수소 인프라 구축 솔루션을 전문 엔지니어가 1:1로 분석하여 제안해 드립니다.
          </p>
        </div>

        {/* 4-Step Form Container */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#bcc9c6]/50 p-6 shadow-md">
          <form className="space-y-8" id="consultationForm" onSubmit={handleSubmit}>
            {/* Step 1: Partnership Type */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00685f] text-white font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <label className="text-sm lg:text-base font-bold text-[#0b1c30]">
                  파트너십 제휴 유형을 선택해 주세요
                </label>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <label
                  className={`border rounded-xl p-3.5 flex items-start gap-2.5 cursor-pointer transition-all ${
                    partnershipType === 'ppa'
                      ? 'border-[#00685f] bg-[#00685f]/5 shadow-2xs'
                      : 'border-[#bcc9c6]/40 hover:border-[#00685f]/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="partnershipType"
                    value="ppa"
                    checked={partnershipType === 'ppa'}
                    onChange={() => setPartnershipType('ppa')}
                    className="mt-1 text-[#00685f] focus:ring-[#00685f] h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-[#0b1c30] block">RE100 직접 PPA</span>
                    <span className="text-xs text-[#3d4947] block mt-0.5">
                      해상풍력 20년 장기 고정 단가 전력 직거래
                    </span>
                  </div>
                </label>

                <label
                  className={`border rounded-xl p-3.5 flex items-start gap-2.5 cursor-pointer transition-all ${
                    partnershipType === 'cell'
                      ? 'border-[#00685f] bg-[#00685f]/5 shadow-2xs'
                      : 'border-[#bcc9c6]/40 hover:border-[#00685f]/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="partnershipType"
                    value="cell"
                    checked={partnershipType === 'cell'}
                    onChange={() => setPartnershipType('cell')}
                    className="mt-1 text-[#00685f] focus:ring-[#00685f] h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-[#0b1c30] block">
                      분산형 수소연료전지
                    </span>
                    <span className="text-xs text-[#3d4947] block mt-0.5">
                      공장 부지 내 열·전력 트라이젠 온사이트 구축
                    </span>
                  </div>
                </label>

                <label
                  className={`border rounded-xl p-3.5 flex items-start gap-2.5 cursor-pointer transition-all ${
                    partnershipType === 'epc'
                      ? 'border-[#00685f] bg-[#00685f]/5 shadow-2xs'
                      : 'border-[#bcc9c6]/40 hover:border-[#00685f]/60'
                  }`}
                >
                  <input
                    type="radio"
                    name="partnershipType"
                    value="epc"
                    checked={partnershipType === 'epc'}
                    onChange={() => setPartnershipType('epc')}
                    className="mt-1 text-[#00685f] focus:ring-[#00685f] h-4 w-4"
                  />
                  <div>
                    <span className="text-sm font-semibold text-[#0b1c30] block">
                      수전해 플랜트 EPC
                    </span>
                    <span className="text-xs text-[#3d4947] block mt-0.5">
                      대규모 PEM 전해조 설계 및 극저온 탱크 공동개발
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 2: Location & Timeline */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00685f] text-white font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <label className="text-sm lg:text-base font-bold text-[#0b1c30]">
                  사업장 소재지 및 희망 공급 개시일
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-[#6d7a77] block mb-1.5">
                    고객사 주 사업장 위치
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full h-11 px-3 rounded-lg border border-[#bcc9c6]/50 bg-white text-[#0b1c30] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] text-sm"
                  >
                    <option value="">지역을 선택해 주세요</option>
                    <option value="ulsan">울산·온산 국가산업단지</option>
                    <option value="yeosu">여수·광양 국가산업단지</option>
                    <option value="pohang">포항 블루밸리 및 영일만단지</option>
                    <option value="chungnam">서산·대산·당진 철강/화학벨트</option>
                    <option value="capital">수도권(경기·인천) 반도체·첨단IT</option>
                    <option value="overseas">기타 및 해외 사업장</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs text-[#6d7a77] block mb-1.5">
                    희망 청정에너지 공급 시점
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    required
                    className="w-full h-11 px-3 rounded-lg border border-[#bcc9c6]/50 bg-white text-[#0b1c30] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] text-sm"
                  >
                    <option value="2026-H1">2026년 상반기 (즉시 검토)</option>
                    <option value="2026-H2">2026년 하반기</option>
                    <option value="2027">2027년 연내 도입</option>
                    <option value="2028+">2028년 이후 장기 인프라 기획</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Corporate Contact Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00685f] text-white font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <label className="text-sm lg:text-base font-bold text-[#0b1c30]">
                  기업 및 담당자 실무 정보
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-xs text-[#6d7a77] block mb-1.5">
                    기업명 (법인명)
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="예: (주)한국제조"
                    className="w-full h-11 px-3 rounded-lg border border-[#bcc9c6]/50 bg-white text-[#0b1c30] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#6d7a77] block mb-1.5">
                    담당 부서 / 직책
                  </label>
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="예: ESG경영실 팀장 / 구매총괄"
                    className="w-full h-11 px-3 rounded-lg border border-[#bcc9c6]/50 bg-white text-[#0b1c30] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#6d7a77] block mb-1.5">
                    담당자 성함
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full h-11 px-3 rounded-lg border border-[#bcc9c6]/50 bg-white text-[#0b1c30] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] text-sm"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#6d7a77] block mb-1.5">
                    업무용 이메일
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@example.com"
                    className="w-full h-11 px-3 rounded-lg border border-[#bcc9c6]/50 bg-white text-[#0b1c30] focus:outline-none focus:border-[#00685f] focus:ring-1 focus:ring-[#00685f] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: NDA & Confidentiality */}
            <div className="pt-3 border-t border-[#bcc9c6]/30">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={ndaAccepted}
                  onChange={(e) => setNdaAccepted(e.target.checked)}
                  className="mt-1 rounded text-[#00685f] focus:ring-[#00685f] h-4 w-4"
                />
                <span className="text-xs text-[#3d4947] leading-relaxed [word-break:keep-all]">
                  [필수] 기술 보안 및 상호 비밀유지(NDA) 약관에 동의합니다. 제출된 전력 사용량 및 공장 인프라 정보는 에너지 기술 타당성 검토 목적으로만 보호됩니다.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              {errorMessage && (
                <p
                  role="alert"
                  className="mb-3 rounded-lg border border-[#a33a2f]/40 bg-[#fdf2f0] px-3 py-2.5 text-sm text-[#7c2d22]"
                >
                  {errorMessage}
                </p>
              )}

              <p className="mb-3 rounded-lg border border-[#00685f]/40 bg-white px-3 py-2.5 text-center text-[13px] leading-relaxed text-[#0b1c30]">
                샘플 사이트입니다 — 실제로 접수되지 않으며, 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>

              <button
                id="btn-submit-consultation"
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white text-base font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>전문 에너지 컨설턴트 1:1 미팅 신청</span>
                <Send className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[#6d7a77] font-mono text-[11px] mt-3">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 샘플 화면이라 전송·저장되는 값이 없습니다
                </span>
                <span>•</span>
                <span>실제 상담 창구는 태문 DEV STUDIO 문의로 이어집니다</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="h2-next"
        industry="corporate"
        featureName="기업 제휴·미팅 신청 폼"
      />
    </section>
  );
};
