import React, { useState } from 'react';
import { B2BInquiryData } from '../types';

interface B2BInquirySectionProps {
  onSuccessSubmit?: (data: B2BInquiryData) => void;
}

export const B2BInquirySection: React.FC<B2BInquirySectionProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState<B2BInquiryData>({
    inquiryType: 'turnkey',
    companyName: '',
    representative: '',
    email: '',
    phone: '',
    scaleOption: '1,000평 ~ 3,000평 (표준 상용화)',
    tourDate: '',
    details: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccessSubmit) {
      onSuccessSubmit(formData);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      inquiryType: 'turnkey',
      companyName: '',
      representative: '',
      email: '',
      phone: '',
      scaleOption: '1,000평 ~ 3,000평 (표준 상용화)',
      tourDate: '',
      details: '',
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-[#faf8ff]" id="b2b-contract">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Context & Value Proposition */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006948]/10 border border-[#006948]/20 mb-3">
              <span className="material-symbols-outlined text-sm text-[#006948]">handshake</span>
              <span className="font-mono text-[11px] text-[#006948] font-semibold">
                ENTERPRISE ENGAGEMENT
              </span>
            </div>

            <h2 className="font-headline text-2xl lg:text-[32px] text-[#131b2e] font-semibold tracking-tight">
              스마트팜 모듈러 턴키 구축 및 B2B 정기 계약 문의
            </h2>

            <p className="font-body text-base lg:text-lg text-[#3d4a42] mt-4 leading-relaxed">
              국내 최대 10,000평급 에어로포닉스 수직 스마트팜 시공 기술과 24시간 자율 AI 생육 제어 소프트웨어를 귀사의 사업장에 턴키 솔루션으로 이식해 드립니다.
            </p>

            <div className="mt-8 space-y-4 font-body text-sm text-[#131b2e]">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>
                  <strong>턴키 엔지니어링:</strong> 클린룸 설계, 에어로포닉스 설비, 양액 정밀 혼합기 및 통합 관제 SCADA 턴키 공급
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>
                  <strong>장기 오프테이크(Off-take):</strong> 연간 고정 단가 기반 대량 농산물 독점 정기 수급 계약 체결 가능
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#006948] mt-0.5 shrink-0">
                  check_circle
                </span>
                <span>
                  <strong>전문 아그로노미스트 파견:</strong> 초기 파종부터 안정 생산까지 6개월간 전문 재배 엔지니어 상주 지원
                </span>
              </div>
            </div>

            {/* Direct Contact Box */}
            <div className="mt-10 p-5 rounded-xl bg-[#f2f3ff] border border-[#bccac0]/40 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white rounded-lg border border-[#bccac0]/30 shadow-2xs">
                  <span className="material-symbols-outlined text-2xl text-[#00687a]">
                    support_agent
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-xs font-bold text-[#131b2e]">
                    기업 전담 B2B 핫라인
                  </span>
                  <a
                    href="tel:02-882-9400"
                    className="font-headline text-xl lg:text-2xl font-bold text-[#006948] hover:underline"
                  >
                    02-882-9400
                  </a>
                  <span className="block font-mono text-[11px] text-[#6d7a72] mt-0.5">
                    b2b-partnership@greencube.agritech.kr
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 lg:p-10 rounded-2xl border border-[#bccac0]/40 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-[#006948]/10 text-[#006948] rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">task_alt</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-[#131b2e]">
                  상담 신청이 성공적으로 접수되었습니다
                </h3>
                <p className="font-body text-sm text-[#3d4a42] max-w-md mx-auto leading-relaxed">
                  담당 수석 아그로노미스트가 2시간 이내로{' '}
                  <strong className="text-[#006948] font-mono">{formData.email}</strong> 및{' '}
                  <strong className="text-[#006948] font-mono">{formData.phone}</strong>로
                  연락드려 시설 도면 및 맞춤형 수율 시뮬레이션 리포트를 송부해 드립니다.
                </p>
                <div className="p-4 bg-[#f2f3ff] rounded-xl border border-[#bccac0]/30 text-left font-mono text-xs max-w-md mx-auto space-y-1">
                  <div>
                    <span className="text-[#6d7a72]">접수 기업:</span>{' '}
                    <span className="font-bold text-[#131b2e]">{formData.companyName}</span>
                  </div>
                  <div>
                    <span className="text-[#6d7a72]">담당자:</span>{' '}
                    <span className="font-bold text-[#131b2e]">{formData.representative}</span>
                  </div>
                  <div>
                    <span className="text-[#6d7a72]">문의 유형:</span>{' '}
                    <span className="font-bold text-[#006948]">
                      {formData.inquiryType === 'turnkey'
                        ? '스마트팜 턴키 구축'
                        : formData.inquiryType === 'supply'
                        ? 'B2B 농산물 대량 납품'
                        : '바이오 소재 R&D 제휴'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-[#006948] text-white font-mono text-xs rounded-lg hover:bg-[#00855d] transition cursor-pointer"
                >
                  새로운 문의 작성하기
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 1. Purpose of Inquiry */}
                <div>
                  <label className="block font-mono text-[12px] text-[#131b2e] font-bold uppercase tracking-wider mb-2">
                    문의 목적 (Inquiry Category) <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {[
                      { id: 'turnkey', label: '스마트팜 턴키 구축' },
                      { id: 'supply', label: 'B2B 농산물 대량 납품' },
                      { id: 'rnd', label: '바이오 소재 R&D 제휴' },
                    ].map((cat) => {
                      const isSelected = formData.inquiryType === cat.id;
                      return (
                        <label
                          key={cat.id}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer font-mono text-xs font-medium transition ${ isSelected ? 'border-[#006948] bg-[#006948]/5 text-[#006948] ring-1 ring-[#006948]' : 'border-[#bccac0] text-[#131b2e] hover:border-[#006948]' }`}
                        >
                          <input
                            type="radio"
                            name="inquiry_type"
                            value={cat.id}
                            checked={isSelected}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                inquiryType: cat.id as B2BInquiryData['inquiryType'],
                              })
                            }
                            className="text-[#006948] focus:ring-[#00687a] mr-2"
                          />
                          <span>{cat.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Company Name & Representative */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                      기업명 / 기관명 <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="(주)그린푸드홀딩스"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                      담당자 성함 및 직책 <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.representative}
                      onChange={(e) =>
                        setFormData({ ...formData, representative: e.target.value })
                      }
                      placeholder="홍길동 수석팀장"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                    />
                  </div>
                </div>

                {/* 3. Contact Email & Phone */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                      비즈니스 이메일 <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="partner@enterprise.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                      연락처 <span className="text-[#ba1a1a]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                    />
                  </div>
                </div>

                {/* 4. Estimated Scale or Volume */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                      구축 희망 규모 / 월 납품 수량
                    </label>
                    <select
                      value={formData.scaleOption}
                      onChange={(e) => setFormData({ ...formData, scaleOption: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                    >
                      <option>500평 미만 (소형 테스트베드)</option>
                      <option>1,000평 ~ 3,000평 (표준 상용화)</option>
                      <option>5,000평 이상 (엔터프라이즈 기가팜)</option>
                      <option>월 5톤 이상 B2B 대량 납품 계약</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                      시설 투어 희망 일자
                    </label>
                    <input
                      type="date"
                      value={formData.tourDate}
                      onChange={(e) => setFormData({ ...formData, tourDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                    />
                  </div>
                </div>

                {/* 5. Additional Requirement */}
                <div>
                  <label className="block font-mono text-[11px] text-[#131b2e] font-semibold mb-1">
                    상세 요구사항 및 제휴 제안 내용
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="구축 예정 부지(지목, 전력 수급 여부) 또는 정기 납품 희망 품종 및 납기 조건을 간략히 기재해 주십시오."
                    className="w-full px-4 py-2.5 rounded-lg border border-[#bccac0] focus:border-[#006948] focus:ring-1 focus:ring-[#006948] font-body text-sm bg-white"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#006948] hover:bg-[#00855d] text-white font-mono text-[12px] lg:text-[13px] font-bold rounded-lg shadow-xs active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>수석 스마트팜 아그로노미스트 1:1 현장 실사 및 맞춤형 수율 제안서 발송</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                  <p className="font-mono text-[10px] lg:text-[11px] text-[#6d7a72] text-center mt-3">
                    입력하신 정보는 비즈니스 상담 외 목적으로 활용되지 않으며 정보통신망법에 의거 보호됩니다.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
