"use client";

import React, { useState } from 'react';
import { MapPin, Hammer, PhoneCall, ShieldCheck, Send } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ConsultationInquiry } from '../types';

export const ConsultationForm: React.FC = () => {
  const [formData, setFormData] = useState<ConsultationInquiry>({
    name: '',
    phone: '',
    location: '',
    landStatus: '토지 매입 완료 (100평 이상)',
    targetArea: '40~50평형대 (패밀리 주거 한옥)',
    startDate: '3개월 이내 (즉시 착공 희망)',
    message: '',
    privacyAgreed: false,
  });

  const [noticeOpen, setNoticeOpen] = useState(false);
  const [privacyError, setPrivacyError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgreed) {
      setPrivacyError('개인정보 수집 및 대지 현장 분석을 위한 기본 정보 제공에 동의해 주세요.');
      return;
    }
    setPrivacyError(null);

    // 가상 브랜드 샘플 — 입력값을 어디에도 보내지 않고 공용 안내만 연다
    setNoticeOpen(true);
  };

  return (
    <section id="consultation" className="py-16 lg:py-24 bg-[#faf9f7] border-b border-[#c8c7bf]/30">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Narrative & Atelier Information */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold text-[#904b35] uppercase tracking-wider block mb-2 font-mono">
              Architectural Inquiry
            </span>
            <h2 className="font-serif text-3xl lg:text-[2.75rem] text-[#161714] font-normal leading-[1.2] mb-6">
              대지 현장 답사 및<br />
              한옥 건축 상담 신청
            </h2>
            <p className="text-sm lg:text-base text-[#474741] leading-relaxed mb-8 font-light">
              소담재는 건축주의 삶과 취향을 깊이 경청한 후, 대지의 형세에 가장 조화로운 한옥만을 짓습니다. 대지 주소를 남겨주시면 도편수와 전문 설계팀이 위성 지형 분석 후 1:1 방문 상담을 준비해 드립니다.
            </p>

            <div className="space-y-6 pt-6 border-t border-[#c8c7bf]/30">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#904b35] mt-1 shrink-0" />
                <div>
                  <div className="text-sm lg:text-base font-semibold text-[#161714]">
                    서울 본사 디자인 쇼룸
                  </div>
                  <p className="text-xs lg:text-sm text-[#474741] mt-0.5 font-light">
                    서울특별시 종로구 북촌로 42길 11, 소담재 건축사옥
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Hammer className="w-5 h-5 text-[#904b35] mt-1 shrink-0" />
                <div>
                  <div className="text-sm lg:text-base font-semibold text-[#161714]">
                    경기 양평 치목 공방 및 목재 야적장
                  </div>
                  <p className="text-xs lg:text-sm text-[#474741] mt-0.5 font-light">
                    경기도 양평군 (예시 주소)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <PhoneCall className="w-5 h-5 text-[#904b35] mt-1 shrink-0" />
                <div>
                  <div className="text-sm lg:text-base font-semibold text-[#161714]">
                    직통 건축 상담실
                  </div>
                  <p className="text-xs lg:text-sm text-[#474741] mt-0.5 font-mono">
                    02-0000-0000 / 010-0000-0000 (예시 번호)
                  </p>
                </div>
              </div>
            </div>

            {/* Government Subsidy Guidance Card */}
            <div className="mt-8 p-5 bg-[#efeeec] rounded-xs border border-[#c8c7bf]/40">
              <div className="flex items-center gap-2 mb-2 text-[#904b35] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium tracking-wide">정부 한옥 건축 지원금 안내</span>
              </div>
              <p className="text-xs text-[#474741] leading-relaxed font-light">
                지자체별 한옥 건축 지원 제도와 인허가 절차를 안내하는 영역입니다. (예시 문구)
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-[#f4f3f1] p-6 lg:p-10 rounded-xs border border-[#c8c7bf]/40 shadow-xs">
              <div>
                <h3 className="font-serif text-xl lg:text-2xl text-[#161714] mb-2 font-medium">
                  한옥 건축 기획 문의서
                </h3>
                <p className="text-xs lg:text-sm text-[#474741] mb-8 font-light">
                  대지 정보를 상세히 기재해 주실수록 보다 정확한 법규 검토 및 예상 공사비 가이드를 받아보실 수 있습니다.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                        건축주 성함 / 법인명 *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="홍길동"
                        className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs px-4 py-3 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="010-0000-0000"
                        className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs px-4 py-3 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                        대지 위치 (시/군/구 및 지번) *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="예: 경기도 양평군 서종면 문호리..."
                        className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs px-4 py-3 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                        대지 면적 및 보유 현황
                      </label>
                      <select
                        value={formData.landStatus}
                        onChange={(e) => setFormData({ ...formData, landStatus: e.target.value })}
                        className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs px-4 py-3 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors cursor-pointer"
                      >
                        <option>토지 매입 완료 (100평 이상)</option>
                        <option>토지 매입 완료 (200평 이상)</option>
                        <option>토지 매입 예정 / 후보지 검토 중</option>
                        <option>기존 구옥 철거 후 신축</option>
                        <option>노후 고한옥 리노베이션</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                        희망 건축 연면적
                      </label>
                      <select
                        value={formData.targetArea}
                        onChange={(e) => setFormData({ ...formData, targetArea: e.target.value })}
                        className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs px-4 py-3 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors cursor-pointer"
                      >
                        <option>30평형대 (실속형 주거 한옥)</option>
                        <option>40~50평형대 (패밀리 주거 한옥)</option>
                        <option>60평 이상 대저택 / 별서</option>
                        <option>상업용 한옥 (카페, 갤러리, 스테이)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                        희망 착공 시기
                      </label>
                      <select
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs px-4 py-3 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors cursor-pointer"
                      >
                        <option>3개월 이내 (즉시 착공 희망)</option>
                        <option>6개월 이내</option>
                        <option>1년 이내</option>
                        <option>사전 법규 및 예산 기획 단계</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1a1c1b] mb-2 uppercase tracking-wider font-mono">
                      희망하는 공간 구성 및 남기실 말씀
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="예: ㄷ자형 중정과 누마루가 포함된 살림집을 원하며, 입식 주방과 시스템 단열창호 시공을 희망합니다. 현장 지형 답사를 요청드립니다."
                      className="w-full bg-[#faf9f7] border border-[#c8c7bf]/70 rounded-xs p-4 text-sm text-[#1a1c1b] focus:border-[#161714] focus:ring-0 outline-none transition-colors leading-relaxed"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="privacy"
                      type="checkbox"
                      required
                      checked={formData.privacyAgreed}
                      onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                      className="mt-1 rounded-xs text-[#161714] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="privacy" className="text-xs text-[#474741] cursor-pointer select-none leading-relaxed font-light">
                      개인정보 수집 및 대지 현장 분석을 위한 기본 정보 제공에 동의합니다.
                    </label>
                  </div>

                  {privacyError && (
                    <p className="text-xs text-[#ba1a1a] font-medium leading-relaxed">{privacyError}</p>
                  )}

                  <p className="text-xs lg:text-sm text-[#904b35] font-medium text-center">
                    샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
                  </p>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#161714] text-[#faf9f7] rounded-xs text-sm font-medium tracking-wider hover:bg-[#904b35] transition-colors duration-200 shadow-none flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>대지 현장 답사 및 건축 기획 상담 신청하기</span>
                    <Send className="w-4 h-4 text-[#fea58a]" />
                  </button>
                </form>
              </div>
          </div>
        </div>
      </div>

      <SampleNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        slug="sodamjae"
        industry="construction"
        featureName="상담 신청"
      />
    </section>
  );
};
