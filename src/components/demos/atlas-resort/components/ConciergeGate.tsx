import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import { BookingFormData } from '../types';

interface ConciergeGateProps {
  defaultDestination?: string;
}

export const ConciergeGate: React.FC<ConciergeGateProps> = ({ defaultDestination = '남해 오션 클리프 (Namhae Cliffside)' }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    destination: defaultDestination,
    partySize: '',
    preferredDates: '',
    specialRequirements: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#fcf9f3] border-t border-[#c6c7c0]/20" id="concierge">
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
                모든 예약과 여정 상담은 최고 수준의 기밀 유지 프로토콜(NDA) 하에 진행됩니다. 
                전용기 운항 슬롯 조율, 보안 경호 지원, 식단 제한 사항에 이르기까지 전담 총지배인이 직접 핸들링합니다.
              </p>

              <div className="pt-6 border-t border-[#c6c7c0]/20 space-y-4">
                <div className="flex items-center gap-3 text-[#030402]">
                  <Phone className="w-5 h-5 text-[#725b38] shrink-0" />
                  <div>
                    <span className="text-[9px] text-[#767872] block uppercase tracking-[0.2em]">
                      VIP Direct Line (24/7)
                    </span>
                    <a
                      href="tel:+8227908820"
                      className="text-sm lg:text-base font-medium tracking-wide hover:text-[#725b38] transition-colors"
                    >
                      +82 (0)2 790 8820
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#030402]">
                  <MessageSquare className="w-5 h-5 text-[#725b38] shrink-0" />
                  <div>
                    <span className="text-[9px] text-[#767872] block uppercase tracking-[0.2em]">
                      KakaoTalk Concierge
                    </span>
                    <span className="text-sm lg:text-base font-medium tracking-wide">
                      @ATLAS_SANCTUARY
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="bg-[#fcf9f3] p-8 rounded border border-[#c6c7c0]/40 text-center space-y-4 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-[#725b38] mx-auto" />
                  <h3 className="font-editorial text-2xl text-[#030402]">
                    비공개 VIP 접수가 완료되었습니다
                  </h3>
                  <p className="text-xs lg:text-sm text-[#454742] max-w-md mx-auto leading-relaxed">
                    귀하의 안식처 여정 세부 사항이 전담 총괄 버틀러 데스크로 암호화 전송되었습니다. 
                    지정하신 비상 연락망으로 30분 이내에 기밀 연락드립니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-2 inline-block text-xs uppercase tracking-[0.2em] text-[#725b38] underline hover:text-[#030402]"
                  >
                    새로운 문의 작성하기
                  </button>
                </div>
              ) : (
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
                        className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] transition-colors"
                      >
                        <option value="남해 오션 클리프 (Namhae Cliffside)">남해 오션 클리프 (Namhae Cliffside)</option>
                        <option value="제주 곶자왈 (Jeju Gotjawal)">제주 곶자왈 (Jeju Gotjawal)</option>
                        <option value="발리 우붓 (Bali Ubud)">발리 우붓 (Bali Ubud)</option>
                        <option value="교토 아라시야마 (Kyoto Arashiyama)">교토 아라시야마 (Kyoto Arashiyama)</option>
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
                      placeholder="김포공항 전용 헬리패드 조율, 웰컴 샴페인 선호 브랜드, 엄격한 글루텐 프리 식단, 비공개 익명 체크인 요청..."
                      className="w-full bg-transparent border-0 border-b border-[#767872]/30 focus:border-[#725b38] focus:ring-0 px-0 py-2 text-sm text-[#030402] placeholder-[#767872]/50 resize-none transition-colors"
                    />
                  </div>

                  <div className="pt-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <span className="text-[10px] text-[#767872] tracking-[0.16em] uppercase">
                      엄격한 NDA 보안 유지 보장
                    </span>
                    <button
                      type="submit"
                      id="btn-concierge-submit"
                      className="w-full bg-[#030402] text-[#fcf9f3] px-8 py-3.5 rounded text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#31312d] transition-colors duration-300"
                    >
                      컨시어지 직통 문의 발송
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
