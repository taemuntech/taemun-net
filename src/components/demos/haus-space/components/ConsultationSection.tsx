'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ConsultationFormState, ConsultationPrefill } from '../types';

interface ConsultationSectionProps {
  prefill?: ConsultationPrefill | null;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({ prefill = null }) => {
  const [formData, setFormData] = useState<ConsultationFormState>({
    clientName: '',
    phone: '',
    location: '',
    area: '',
    // 첫 option 과 글자가 똑같아야 한다 — 다르면 제어 select 가 selectedIndex -1 로 떨어져 빈 칸으로 보인다.
    projectType: '하이엔드 주거 (아파트/펜트하우스)',
    budgetRange: '3억 원 ~ 5억 원',
    timeline: '',
    message: '',
    privacyAgree: false,
  });

  const messageRef = useRef<HTMLTextAreaElement>(null);
  const appliedNonce = useRef<number | null>(null);

  // 프로젝트에서 넘어온 값은 요청 사항 칸에만 싣는다. 재마운트가 아니라 nonce 비교라 이미 친 성함·연락처가 남는다.
  useEffect(() => {
    if (!prefill || prefill.nonce === appliedNonce.current) return;
    appliedNonce.current = prefill.nonce;
    setFormData((prev) => ({ ...prev, message: prefill.message }));
    setErrorMessage('');
    const t = window.setTimeout(() => messageRef.current?.focus({ preventScroll: true }), 600);
    return () => window.clearTimeout(t);
  }, [prefill]);

  // 샘플이라 상담을 접수하지 않는다 — 검증을 통과하면 가짜 접수번호·성공 화면 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgree) {
      setErrorMessage('개인정보 수집 및 컨설팅 목적 이용에 동의해 주세요.');
      return;
    }

    setErrorMessage('');
    setIsNoticeOpen(true);
  };

  return (
    <section
      className="py-16 lg:py-24 bg-[#121315] max-w-[1440px] mx-auto px-5 lg:px-16 scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)]"
      id="consultation"
    >
      <div className="bg-[#1b1c1e] border border-white/10 p-8 lg:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
          {/* Left Explanatory Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.8)]" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold">
                Private Bureau • By Appointment Only
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif text-[#f4efea] leading-tight break-keep [word-break:keep-all]">
              프라이빗 공간 진단 &amp;
              <br />
              컨설팅 신청
            </h2>
            <p className="text-base text-[#d1c5b8] mt-4 font-light leading-relaxed">
              하우스앤스페이스는 프로젝트 품질 관리를 위해 월 한정된 수의 주거 및 상업 프로젝트만 전담해 진행합니다.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-sm text-[#e3e2e5]">
                  서울시 강남구 압구정로 (가상 아틀리에)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-sm text-[#e3e2e5]">
                  02-0000-0000 (예시 번호)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-sm text-[#e3e2e5]">
                  hello@example.com
                </span>
              </div>
            </div>

            {/* Confidentiality Protocol */}
            <div className="mt-10 inline-flex items-center gap-4 p-4 border border-[#c5a880]/30 bg-[#121315]">
              <div className="w-12 h-12 border border-[#c5a880]/60 flex items-center justify-center text-[#c5a880] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#c5a880] font-semibold">
                  Confidentiality Protocol
                </p>
                <p className="text-xs text-[#998f83] leading-relaxed">
                  모든 상담 내용 및 현장 도면 정보는 비공개 보안 협약에 의해 보호됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right Consultation Form (7 cols) — 샘플이라 접수하지 않는다. 제출하면 SampleNotice 만 연다 */}
          <div className="lg:col-span-7 bg-[#121315] p-6 lg:p-8 border border-white/10 shadow-xl mt-8 lg:mt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                      htmlFor="client-name"
                    >
                      성함 / 법인명 *
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientName: e.target.value })
                      }
                      placeholder="홍길동 대표"
                      className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                      htmlFor="client-phone"
                    >
                      연락처 *
                    </label>
                    <input
                      id="client-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="010-0000-0000"
                      className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                      htmlFor="project-location"
                    >
                      프로젝트 위치 *
                    </label>
                    <input
                      id="project-location"
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="예: 서울 용산구 한남동"
                      className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                      htmlFor="project-area"
                    >
                      전용 면적 (평형대) *
                    </label>
                    <input
                      id="project-area"
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({ ...formData, area: e.target.value })
                      }
                      placeholder="예: 85평 / 280㎡"
                      className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                      htmlFor="project-type"
                    >
                      프로젝트 유형 *
                    </label>
                    <select
                      id="project-type"
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                    >
                      <option className="bg-[#1b1c1e]">
                        하이엔드 주거 (아파트/펜트하우스)
                      </option>
                      <option className="bg-[#1b1c1e]">
                        단독주택 신축 및 대수선 리노베이션
                      </option>
                      <option className="bg-[#1b1c1e]">
                        프라이빗 상업 공간 (라운지/클리닉/스파)
                      </option>
                      <option className="bg-[#1b1c1e]">
                        크리에이티브 사옥 및 워크스페이스
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                      htmlFor="budget-range"
                    >
                      예상 예산 범위 *
                    </label>
                    <select
                      id="budget-range"
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                    >
                      <option className="bg-[#1b1c1e]">1억 5천만 원 ~ 3억 원</option>
                      <option className="bg-[#1b1c1e]">3억 원 ~ 5억 원</option>
                      <option className="bg-[#1b1c1e]">5억 원 ~ 10억 원</option>
                      <option className="bg-[#1b1c1e]">
                        10억 원 이상 (하이엔드 맞춤)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                    htmlFor="timeline"
                  >
                    희망 착공 및 입주 예정 시기
                  </label>
                  <input
                    id="timeline"
                    type="text"
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    placeholder="예: 2025년 상반기 착공 희망"
                    className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider text-[#d1c5b8] mb-2"
                    htmlFor="consult-message"
                  >
                    상세 문의 및 요구사항
                  </label>
                  <textarea
                    id="consult-message"
                    ref={messageRef}
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="지향하시는 공간 분위기, 주요 선호 자재(트래버틴, 원목 등), 가족 구성원 수 등을 자유롭게 기재해 주세요."
                    className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                  />
                </div>

                {/* shrink-0 이 없으면 375px 에서 긴 라벨이 체크박스를 13x16 으로 눌러 찌그러뜨린다 */}
                <label
                  htmlFor="privacy-agree"
                  className="flex items-start gap-3 min-h-11 cursor-pointer"
                >
                  <input
                    id="privacy-agree"
                    type="checkbox"
                    required
                    checked={formData.privacyAgree}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privacyAgree: e.target.checked,
                      })
                    }
                    className="mt-1 w-5 h-5 shrink-0 text-[#c5a880] bg-[#1b1c1e] border-white/20 focus:ring-0 focus:ring-offset-0 rounded-none cursor-pointer"
                  />
                  <span className="text-xs text-[#998f83] leading-relaxed">
                    개인정보 수집 및 컨설팅 목적 이용에 동의합니다. (샘플 화면이라 실제로 수집·저장하지 않습니다)
                  </span>
                </label>

                {errorMessage && (
                  <p
                    role="alert"
                    className="border border-[#c5a880]/60 bg-[#1b1c1e] px-3 py-2.5 text-center text-[13px] leading-relaxed text-[#e0c298]"
                  >
                    {errorMessage}
                  </p>
                )}

                <p className="border border-[#c5a880]/50 bg-[#1b1c1e] px-3 py-2.5 text-center text-[13px] leading-relaxed text-[#f4efea]">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#c5a880] text-[#121315] font-semibold py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#e0c298] shadow-lg shadow-[#c5a880]/10 transition duration-300 cursor-pointer"
                >
                  컨설팅 예약 및 포트폴리오 도서 신청하기
                </button>
              </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="haus-space"
        industry="interior"
        featureName="프라이빗 공간 진단 상담 신청"
      />
    </section>
  );
};
