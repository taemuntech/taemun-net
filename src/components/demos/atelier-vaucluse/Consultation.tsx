'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, CheckCircle } from 'lucide-react';
import { ConsultationFormData, SubmissionRecord } from './types';

interface ConsultationProps {
  onSubmitSuccess: (record: SubmissionRecord) => void;
}

export const Consultation: React.FC<ConsultationProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    spaceType: '아파트 / 주거 리노베이션',
    area: '',
    location: '',
    expectedDate: '',
    notes: '',
    privacyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFillSample = () => {
    setFormData({
      name: '강태민 (클라이언트)',
      phone: '010-8923-4152',
      spaceType: '단독주택 신축 및 인테리어',
      area: '85평 / 약 280m²',
      location: '서울시 용산구 한남동',
      expectedDate: '2025년 6월 예정',
      notes: '자연 채광을 극대화한 중정과 마이크로시멘트 바닥, 트래버틴 아일랜드 시공을 희망합니다. 도면 검토 요청드립니다.',
      privacyAgreed: true,
    });
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('성함 또는 법인명을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('연락처를 입력해 주세요.');
      return;
    }
    if (!formData.area.trim()) {
      setErrorMessage('공간 면적(평수 또는 m²)을 입력해 주세요.');
      return;
    }
    if (!formData.privacyAgreed) {
      setErrorMessage('개인정보 수집 및 상담 연락에 동의해 주세요.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord: SubmissionRecord = {
        ...formData,
        id: `VC-${Date.now().toString().slice(-6)}`,
        submittedAt: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: '접수 완료',
      };

      // Save to localStorage history
      try {
        const existing = JSON.parse(localStorage.getItem('vaucluse_submissions') || '[]');
        localStorage.setItem('vaucluse_submissions', JSON.stringify([newRecord, ...existing]));
      } catch {
        // ignore storage errors
      }

      setIsSubmitting(false);
      onSubmitSuccess(newRecord);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        spaceType: '아파트 / 주거 리노베이션',
        area: '',
        location: '',
        expectedDate: '',
        notes: '',
        privacyAgreed: false,
      });
    }, 600);
  };

  return (
    <section className="py-24 bg-[#faf9f7]" id="consultation">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Studio Information Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#904b35] block mb-2 font-sans">
                Private Consultation
              </span>
              <h2 className="text-3xl lg:text-5xl font-serif font-normal text-[#161714] leading-tight tracking-[-0.015em] break-keep [word-break:keep-all]">
                당신의 공간을 위한 <br className="hidden lg:inline" />첫 걸음
              </h2>
              <p className="text-sm lg:text-base text-[#474741] mt-4 leading-relaxed font-sans font-light break-keep [word-break:keep-all]">
                공간의 성격과 규모, 예상 착공 일정에 맞춰 전문 디자이너가 사전 검토 후 24시간 이내에 직접 회신드립니다.
              </p>
            </div>

            {/* Atelier Showroom Details Card */}
            <div className="bg-[#f4f3f1] p-6 lg:p-8 rounded border border-[#c8c7bf]/30 space-y-5 shadow-xs">
              <h4 className="text-lg font-semibold text-[#161714] font-sans">
                Atelier &amp; Material Showroom
              </h4>

              <div className="space-y-3.5 text-xs lg:text-sm text-[#474741] font-sans">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="text-[#777770] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    서울특별시 강남구 압구정로 60길 21, 보클루즈 빌딩 3F/4F
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={17} className="text-[#777770] shrink-0" />
                  <span>+82 (02) 548-2890</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-[#777770] shrink-0" />
                  <span>inquiry@atelier-vaucluse.kr</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={17} className="text-[#777770] shrink-0" />
                  <span>월 - 금: 09:30 - 18:30 (주말 100% 사전 예약제)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#c8c7bf]/30 flex items-center gap-4 text-xs">
                <a
                  href="https://pf.kakao.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-wider text-[#161714] hover:text-[#904b35] flex items-center gap-1 font-medium font-sans transition-colors"
                >
                  <span>Kakao Channel</span>
                  <ExternalLink size={12} />
                </a>
                <span className="text-[#c8c7bf]">·</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-wider text-[#161714] hover:text-[#904b35] flex items-center gap-1 font-medium font-sans transition-colors"
                >
                  <span>Instagram</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Quality Promise Callout */}
            <div className="p-5 rounded border border-[#c8c7bf]/20 bg-[#efeeec] space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#161714] font-sans">
                <CheckCircle size={15} className="text-[#904b35]" />
                <span>투명한 3D 견적 및 사전 실측 무상 지원</span>
              </div>
              <p className="text-xs text-[#474741] font-sans font-light leading-relaxed">
                설계 단계에서 자재 브랜드, 원산지 규격 및 상세 단가를 100% 투명하게 공개하여 추가 비용에 대한 불안을 제거합니다.
              </p>
            </div>
          </div>

          {/* Quick Consultation Form Column */}
          <div className="lg:col-span-7 bg-[#faf9f7] p-8 lg:p-10 rounded border border-[#c8c7bf]/30 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl lg:text-2xl font-serif text-[#161714]">
                상담 예약 신청서
              </h3>
              <button
                type="button"
                onClick={handleFillSample}
                className="text-[11px] font-sans text-[#904b35] hover:underline cursor-pointer tracking-wider"
              >
                예시 데이터 채우기
              </button>
            </div>

            <p className="text-xs lg:text-sm text-[#474741] mb-8 font-sans font-light">
              원활한 상담을 위해 프로젝트 개요를 작성해 주시면 담당 실장이 직접 연락드립니다.
            </p>

            {errorMessage && (
              <div className="mb-6 p-3 rounded bg-[#ffdad6]/40 border border-[#ba1a1a]/30 text-xs text-[#ba1a1a] font-sans">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                    성함 / 법인명 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    required
                    className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors placeholder:text-[#474741]/40 font-sans"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    required
                    className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors placeholder:text-[#474741]/40 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Space Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                    공간 유형 *
                  </label>
                  <select
                    name="spaceType"
                    value={formData.spaceType}
                    onChange={handleChange}
                    className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors font-sans cursor-pointer"
                  >
                    <option value="아파트 / 주거 리노베이션">아파트 / 주거 리노베이션</option>
                    <option value="단독주택 신축 및 인테리어">단독주택 신축 및 인테리어</option>
                    <option value="상업 / 부티크 플래그십 쇼룸">상업 / 부티크 플래그십 쇼룸</option>
                    <option value="오피스 / 사옥 공간 기획">오피스 / 사옥 공간 기획</option>
                    <option value="기타 공간">기타 공간</option>
                  </select>
                </div>

                {/* Area Size */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                    공간 면적 (평수 또는 m²) *
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="예: 65평 / 약 215m²"
                    required
                    className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors placeholder:text-[#474741]/40 font-sans"
                  />
                </div>
              </div>

              {/* Timeline & Location */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                    현장 위치 (지역구)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: 서울시 용산구 한남동"
                    className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors placeholder:text-[#474741]/40 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                    예상 착공 희망 시기
                  </label>
                  <input
                    type="text"
                    name="expectedDate"
                    value={formData.expectedDate}
                    onChange={handleChange}
                    placeholder="예: 2025년 4월경"
                    className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors placeholder:text-[#474741]/40 font-sans"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#474741] mb-2 font-sans">
                  요청 사항 및 특별 고려 사항
                </label>
                <textarea
                  rows={3}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="선호하시는 마감재 분위기나 레이아웃 변경 요구사항을 자유롭게 작성해주세요."
                  className="w-full bg-[#f4f3f1] border border-[#c8c7bf]/50 rounded px-4 py-3 text-sm text-[#161714] focus:outline-none focus:border-[#161714] focus:ring-0 transition-colors placeholder:text-[#474741]/40 font-sans resize-none"
                />
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleChange}
                  required
                  className="rounded border-[#c8c7bf] text-[#161714] focus:ring-0 cursor-pointer h-4 w-4"
                />
                <label htmlFor="privacy" className="text-xs lg:text-sm text-[#474741] font-sans cursor-pointer select-none">
                  개인정보 수집 및 상담 연락에 동의합니다.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] disabled:bg-[#777770] transition-all duration-300 py-4 rounded text-xs font-semibold uppercase tracking-[0.2em] font-sans flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                {isSubmitting ? (
                  <span>신청서 전송 중...</span>
                ) : (
                  <>
                    <span>1:1 상담 및 견적 신청서 발송</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
