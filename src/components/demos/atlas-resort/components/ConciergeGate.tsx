'use client';

import React, { useEffect, useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { DESTINATIONS } from '../data/resorts';
import { BookingFormData } from '../types';

interface ConciergeGateProps {
  /** 견적기에서 고른 목적지 id — 폼의 목적지 칸이 그걸 따라간다 */
  selectedDestinationId: string;
  /** 푸터 컨시어지 항목이 고른 주제 — 요청 사항 칸을 그 문장으로 채운다 */
  prefillRequest?: string | null;
}

// 예전엔 선택지 문자열과 상위가 넘기던 값의 표기가 서로 달라(Namhae Cliffside vs Namhae Ocean Cliff)
// 견적기에서 무엇을 고르든 폼은 늘 첫 항목으로 되돌아갔다. 이제 선택지도 값도 같은 데이터에서 만든다.
const DESTINATION_OPTIONS = DESTINATIONS.map((dest) => ({
  id: dest.id,
  label: `${dest.nameKo} (${dest.name})`,
}));

export const ConciergeGate: React.FC<ConciergeGateProps> = ({
  selectedDestinationId,
  prefillRequest = null,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    destination: selectedDestinationId,
    partySize: '',
    preferredDates: '',
    specialRequirements: '',
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, destination: selectedDestinationId }));
  }, [selectedDestinationId]);

  // 푸터에서 고른 컨시어지 주제를 요청 사항 칸에 넣는다(이미 쓰던 내용이 있으면 덮지 않고 뒤에 잇는다)
  useEffect(() => {
    if (!prefillRequest) return;
    setFormData((prev) =>
      prev.specialRequirements.includes(prefillRequest)
        ? prev
        : {
            ...prev,
            specialRequirements: prev.specialRequirements
              ? `${prev.specialRequirements.trimEnd()} ${prefillRequest}`
              : prefillRequest,
          },
    );
  }, [prefillRequest]);

  // 샘플이라 문의를 받지 않는다 — 가짜 접수 완료 화면 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <section
      className="py-16 lg:py-24 bg-[#fcf9f3] border-t border-[#c6c7c0]/20 scroll-mt-[calc(var(--sample-bar-h,0px)_+_64px)]"
      id="concierge"
    >
      <div className="w-full px-6 lg:px-14 mx-auto max-w-6xl">
        <div className="bg-[#f6f3ed] border border-[#c6c7c0]/30 rounded p-6 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Editorial Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-semibold">
                Discreet Handling
              </span>
              <h2 className="font-editorial text-3xl lg:text-4xl text-[#030402] leading-tight">
                VIP Private Concierge Gate
              </h2>
              <p className="text-xs lg:text-sm text-[#454742] font-light leading-relaxed">
                모든 예약과 여정 상담은 비밀 유지 원칙 아래 전담 데스크가 처리하는 구성입니다(예시). 
                전용기 운항 슬롯 조율, 보안 경호 지원, 식단 제한 사항에 이르기까지 전담 총지배인이 직접 핸들링합니다.
              </p>

              <div className="pt-6 border-t border-[#c6c7c0]/20 space-y-4">
                <div className="flex items-center gap-3 text-[#030402]">
                  <Phone className="w-5 h-5 text-[#725b38] shrink-0" />
                  <div>
                    <span className="text-[9px] text-[#767872] block uppercase tracking-[0.2em]">
                      VIP Direct Line (24/7)
                    </span>
                    <span className="text-sm lg:text-base font-medium tracking-wide">
                      02-0000-0000 (예시)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#030402]">
                  <MessageSquare className="w-5 h-5 text-[#725b38] shrink-0" />
                  <div>
                    <span className="text-[9px] text-[#767872] block uppercase tracking-[0.2em]">
                      KakaoTalk Concierge
                    </span>
                    <span className="text-sm lg:text-base font-medium tracking-wide">
                      @ATLAS_SANCTUARY (예시)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6" id="concierge-inquiry-form">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                      성함 / 귀하 직함 (Full Name &amp; Title)
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="예: 김아틀라스 대표"
                      className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] placeholder-[#767872]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                      비상 연락망 (Mobile Phone / Signal)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+82 10-0000-0000"
                      className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] placeholder-[#767872]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                      희망 안식처 (Destination)
                    </label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full min-h-11 bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] transition-colors"
                    >
                      {DESTINATION_OPTIONS.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                      투숙 인원 (Travel Party Size)
                    </label>
                    <input
                      type="text"
                      name="partySize"
                      value={formData.partySize}
                      onChange={handleChange}
                      placeholder="성인 2인 / 전속 수행원 1인"
                      className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] placeholder-[#767872]/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                    투숙 희망 시기 (Preferred Dates)
                  </label>
                  <input
                    type="text"
                    name="preferredDates"
                    value={formData.preferredDates}
                    onChange={handleChange}
                    placeholder="2025. 10. 12 - 2025. 10. 16 (유동적 가능 여부 등)"
                    className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] placeholder-[#767872]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#767872] uppercase tracking-[0.16em] block mb-1 font-medium">
                    특별 요청 사항 (Special Requirements)
                  </label>
                  <textarea
                    name="specialRequirements"
                    rows={3}
                    value={formData.specialRequirements}
                    onChange={handleChange}
                    placeholder="공항 전용 헬리패드 조율, 웰컴 샴페인 선호 브랜드, 엄격한 글루텐 프리 식단, 비공개 익명 체크인 요청..."
                    className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] placeholder-[#767872]/50 resize-none transition-colors"
                  />
                </div>

                <div className="pt-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <span className="text-[10px] text-[#767872] tracking-[0.16em] normal-case leading-relaxed">
                    샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
                  </span>
                  <button
                    type="submit"
                    id="btn-concierge-submit"
                    className="w-full lg:w-auto shrink-0 min-h-12 bg-[#030402] text-[#fcf9f3] px-8 py-3.5 rounded text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#31312d] transition-colors duration-300 whitespace-nowrap"
                  >
                    컨시어지 직통 문의 발송
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="atlas-resort"
        industry="commerce"
        featureName="VIP 컨시어지 문의"
      />
    </section>
  );
};
