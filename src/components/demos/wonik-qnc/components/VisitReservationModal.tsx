"use client";

import React, { useState } from 'react';
import { X, CalendarCheck, MapPin, Clock, ShieldCheck } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface VisitReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisitReservationModal: React.FC<VisitReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [formData, setFormData] = useState({
    visitorName: '',
    company: '',
    phone: '',
    email: '',
    location: 'gumi-hq',
    visitDate: '2026-09-20',
    visitTime: '14:00',
    purpose: 'business-meeting',
    securityAgreed: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 제안용 시안 — 입력값을 어디에도 보내지 않고 공용 안내만 연다
    setNoticeOpen(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
      <div
        className="bg-white max-w-xl w-full rounded-xl overflow-hidden shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#003d9b] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#dae2ff] tracking-wider uppercase block">
                VISITOR SECURITY ACCESS
              </span>
              <h3 className="text-lg font-bold">사업장 방문 및 미팅 예약</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-200 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  방문자 성명 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="홍길동"
                  value={formData.visitorName}
                  onChange={(e) =>
                    setFormData({ ...formData, visitorName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  소속 회사/기관명 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="한국반도체연구소"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] focus:ring-1 focus:ring-[#0052cc] text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  휴대전화 번호 *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  이메일 주소 *
                </label>
                <input
                  type="email"
                  required
                  placeholder="guest@domain.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-[#0052cc] text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  방문 사업장 *
                </label>
                <select
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-xs outline-none bg-white"
                >
                  <option value="gumi-hq">구미 본사 및 1공장</option>
                  <option value="gumi-rd">구미 첨단 R&amp;D 센터</option>
                  <option value="dongtan">동탄 마케팅 오피스</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  방문 희망일 *
                </label>
                <input
                  type="date"
                  required
                  value={formData.visitDate}
                  onChange={(e) =>
                    setFormData({ ...formData, visitDate: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  방문 시간 *
                </label>
                <select
                  value={formData.visitTime}
                  onChange={(e) =>
                    setFormData({ ...formData, visitTime: e.target.value })
                  }
                  className="w-full px-2.5 py-2 border border-gray-300 rounded-md text-xs outline-none bg-white"
                >
                  <option value="10:00">10:00 (오전)</option>
                  <option value="11:00">11:00 (오전)</option>
                  <option value="14:00">14:00 (오후)</option>
                  <option value="15:30">15:30 (오후)</option>
                  <option value="16:30">16:30 (오후)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                방문 목적 *
              </label>
              <select
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs outline-none bg-white"
              >
                <option value="business-meeting">기술 협력 및 비즈니스 미팅</option>
                <option value="audit">품질 및 환경안전 정기 실사(Audit)</option>
                <option value="facility-tour">클린룸 및 제조라인 투어</option>
                <option value="interview">채용 면접 및 현장 인터뷰</option>
              </select>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#003d9b] shrink-0 mt-0.5" />
              <div className="text-[11px] text-gray-600">
                <span>보안 시설물 보호를 위해 사업장 내 사진/영상 촬영 및 저장매체 반입이 엄격히 통제되며, 방문 시 신분증을 반드시 지참하셔야 합니다.</span>
                <label className="flex items-center gap-1.5 mt-1.5 font-semibold text-gray-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.securityAgreed}
                    onChange={(e) =>
                      setFormData({ ...formData, securityAgreed: e.target.checked })
                    }
                    className="rounded text-[#0052cc]"
                  />
                  <span>보안 수칙 준수에 동의합니다</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-3">
              <p className="text-xs font-semibold text-[#0052cc] text-center">
                제안용 시안 — 실제로 접수되지 않습니다
              </p>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-semibold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!formData.securityAgreed}
                  className="px-5 py-2 bg-[#0052cc] hover:bg-[#003d9b] disabled:opacity-50 text-white rounded-md text-xs font-semibold shadow-xs"
                >
                  예약 신청
                </button>
              </div>
            </div>
          </form>
      </div>
      </div>

      <SampleNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        slug="wonik-qnc"
        industry="manufacturing"
        featureName="방문 예약"
        kind="proposal"
      />
    </>
  );
};
