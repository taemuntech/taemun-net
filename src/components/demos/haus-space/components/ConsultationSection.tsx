'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { ConsultationFormState } from '../types';

interface ConsultationSectionProps {
  initialProjectType?: string;
  initialMessage?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  initialProjectType = '하이엔드 주거 (아파트/펜트하우스)',
  initialMessage = '',
}) => {
  const [formData, setFormData] = useState<ConsultationFormState>({
    clientName: '',
    phone: '',
    location: '',
    area: '',
    projectType: initialProjectType,
    budgetRange: '3억 원 ~ 5억 원',
    timeline: '',
    message: initialMessage,
    privacyAgree: false,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [ticketNumber, setTicketNumber] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAgree) {
      alert('개인정보 수집 및 컨설팅 목적 이용에 동의해 주세요.');
      return;
    }

    const genTicket = `HS-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    setTicketNumber(genTicket);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      clientName: '',
      phone: '',
      location: '',
      area: '',
      projectType: '하이엔드 주거 (아파트/펜트하우스)',
      budgetRange: '3억 원 ~ 5억 원',
      timeline: '',
      message: '',
      privacyAgree: false,
    });
  };

  return (
    <section
      className="py-16 lg:py-24 bg-[#121315] max-w-[1440px] mx-auto px-5 lg:px-16"
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
              하우스앤스페이스는 프로젝트의 완벽한 퀄리티 관리를 위해 월 한정된 수의 주거 및 상업 프로젝트만을 엄선하여 전담 진행합니다.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-sm text-[#e3e2e5]">
                  서울시 강남구 압구정로 60길 18, 하우스앤스페이스 아틀리에
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-sm text-[#e3e2e5]">
                  02. 548. 9210 (VIP 직통 라인)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c5a880] shrink-0" />
                <span className="text-sm text-[#e3e2e5]">
                  atelier@hausandspace.com
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

          {/* Right Form or Submitted Confirmation (7 cols) */}
          <div className="lg:col-span-7 bg-[#121315] p-6 lg:p-8 border border-white/10 shadow-xl mt-8 lg:mt-0">
            {submitted ? (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#1b1c1e] border border-[#c5a880] flex items-center justify-center text-[#c5a880] shadow-[0_0_20px_rgba(197,168,128,0.2)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-semibold block mb-1">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-serif text-[#f4efea] break-keep [word-break:keep-all]">
                  프라이빗 컨설팅 신청이 접수되었습니다
                </h3>
                <p className="text-sm text-[#d1c5b8] mt-3 max-w-md mx-auto leading-relaxed">
                  귀하의 공간 요청서가 안전하게 암호화되어 수석 아키텍처 디렉터에게 전달되었습니다. 24시간 내 유선으로 전담 배정 및 1차 공간 진단 일정을 안내해 드립니다.
                </p>

                <div className="mt-6 p-4 bg-[#1b1c1e] border border-white/10 inline-block text-left text-xs max-w-md w-full">
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#998f83]">접수 번호 (Dossier Code):</span>
                    <span className="text-[#c5a880] font-mono font-bold">
                      {ticketNumber}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#998f83]">성함 / 법인:</span>
                    <span className="text-[#f4efea]">{formData.clientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
                    <span className="text-[#998f83]">프로젝트 유형:</span>
                    <span className="text-[#f4efea]">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#998f83]">예산 / 규모:</span>
                    <span className="text-[#f4efea]">
                      {formData.budgetRange} ({formData.area || '미입력'})
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    onClick={resetForm}
                    className="bg-[#c5a880] text-[#121315] font-semibold text-xs px-6 py-3 uppercase tracking-wider hover:bg-[#e0c298] transition cursor-pointer"
                  >
                    새로운 문의 작성
                  </button>
                </div>
              </div>
            ) : (
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
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="지향하시는 공간 분위기, 주요 선호 자재(트래버틴, 원목 등), 가족 구성원 수 등을 자유롭게 기재해 주세요."
                    className="w-full bg-[#1b1c1e] border border-white/10 p-3 text-sm text-[#f4efea] focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] transition"
                  />
                </div>

                <div className="flex items-start gap-3">
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
                    className="mt-1 w-4 h-4 text-[#c5a880] bg-[#1b1c1e] border-white/20 focus:ring-0 focus:ring-offset-0 rounded-none cursor-pointer"
                  />
                  <label
                    htmlFor="privacy-agree"
                    className="text-xs text-[#998f83] leading-relaxed cursor-pointer"
                  >
                    개인정보 수집 및 컨설팅 목적 이용에 동의합니다. (작성하신 정보는 오직 상담 예약 및 분석 목적으로만 활용됩니다)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5a880] text-[#121315] font-semibold py-4 text-xs uppercase tracking-[0.2em] hover:bg-[#e0c298] shadow-lg shadow-[#c5a880]/10 transition duration-300 cursor-pointer"
                >
                  컨설팅 예약 및 포트폴리오 도서 신청하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
