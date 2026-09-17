'use client';

import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ReservationFormData } from '../types';

interface CampusReservationSectionProps {
  onReservationSuccess: (data: ReservationFormData) => void;
}

export const CampusReservationSection: React.FC<CampusReservationSectionProps> = ({
  onReservationSuccess,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    grade: '고3',
    targetMajor: '의예과',
    preferredDate: '2026-03-24',
    preferredTime: '오후 14:00',
    studentName: '',
    parentContact: '',
    currentMathPercentile: '98%',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const formatPhone = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '').slice(0, 11);
    if (raw.length < 4) return raw;
    if (raw.length < 8) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.parentContact.trim()) {
      alert('학생 성명과 학부모님 연락처를 입력해 주십시오.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomTicket = `DP-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketNumber(randomTicket);
      setIsSubmitting(false);
      setIsSubmitted(true);
      onReservationSuccess(formData);
    }, 600);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-surface" id="reservation-section">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center gap-3 max-w-2xl mx-auto">
          <span className="font-label-md text-primary tracking-widest uppercase">
            PREMIUM SPACES &amp; RESERVATION
          </span>
          <h2 className="font-headline-lg text-on-surface">
            최상위 0.01%의 몰입 공간 &amp; 1:1 정밀진단 신청(예시)
          </h2>
          <p className="font-body-md text-on-surface-variant">
            대치동 단독 프리미엄 1인 독립 부스와 1:1 심층 컨설팅 룸(예시). 자녀의 정확한 메디컬 역량 분석을 위한 90분 정밀 진단 테스트를 선착순 예약해 주십시오.
          </p>
        </div>

        {/* 2-Column: Left Facility Showcase, Right Reservation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Facility Showcase (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden bg-surface-container-low p-6 flex flex-col gap-5 border border-surface-container-high/40 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-title-lg text-on-surface">
                  대치 본원 단독 프리미엄 시설(예시)
                </span>
                <span className="px-2.5 py-1 rounded bg-primary/10 text-primary font-label-sm font-bold">
                  상위 0.01% 전용
                </span>
              </div>

              {/* Photo 1: Oak Booth */}
              <div className="rounded-xl overflow-hidden aspect-video bg-surface-container relative group shadow-xs">
                <img
                  alt="프리미엄 1인 독립 오크 원목 부스"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={ASSETS.boothStudent}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="font-title-md font-bold text-white">
                    프리미엄 1인 독립 오크 원목 부스(예시)
                  </span>
                  <span className="text-xs text-stone-200">
                    방음 및 공기 순환 양압 공조 시스템, 집중력 극대화(예시)
                  </span>
                </div>
              </div>

              {/* Photo 2: Consulting Room */}
              <div className="rounded-xl overflow-hidden aspect-video bg-surface-container relative group shadow-xs">
                <img
                  alt="VIP 전용 1:1 입시 데이터 전략 컨설팅룸"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={ASSETS.consultingRoom}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="font-title-md font-bold text-white">
                    VIP 1:1 입시 데이터 전략 컨설팅룸(예시)
                  </span>
                  <span className="text-xs text-stone-200">
                    명문대 출신 전임 디렉터와 1:1 심층 로드맵 설계(예시)
                  </span>
                </div>
              </div>

              {/* Facilities Feature Bullets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-on-surface-variant p-2.5 rounded-lg bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    air
                  </span>
                  <span>양압 무균·항온항습 공조(예시)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant p-2.5 rounded-lg bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    videocam
                  </span>
                  <span>스마트 순공 모니터링(예시)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant p-2.5 rounded-lg bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    support_agent
                  </span>
                  <span>의예과 튜터 상주 질문(예시)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant p-2.5 rounded-lg bg-surface-container-lowest">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    directions_car
                  </span>
                  <span>대치역 VIP 셔틀 운행(예시)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1:1 Precision Level Test Reservation Form (Right) */}
          <div className="lg:col-span-6 p-6 lg:p-8 rounded-3xl bg-surface-container-lowest shadow-xl border border-surface-container-high/40">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1 pb-3 border-b border-surface-container">
                  <h3 className="font-headline-sm text-on-surface">
                    1:1 정밀진단 레벨테스트 &amp; 심층상담(예시)
                  </h3>
                  <p className="font-body-sm text-on-surface-variant">
                    90분 정밀 모의 테스트 + 5각 역량 리포트 발급(가상 시연)
                  </p>
                </div>

                {/* Grade & Target Major */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-grade">
                      수험생 학년 *
                    </label>
                    <select
                      id="field-grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                    >
                      <option value="고3">고등학교 3학년</option>
                      <option value="N수">N수/재수 최상위반</option>
                      <option value="고2">고등학교 2학년 (조기반)</option>
                      <option value="고1">고등학교 1학년</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-target">
                      희망 진학 계열 *
                    </label>
                    <select
                      id="field-target"
                      value={formData.targetMajor}
                      onChange={(e) =>
                        setFormData({ ...formData, targetMajor: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                    >
                      <option value="의예과">의예과 (메디컬 1지망)</option>
                      <option value="치의예과">치의예과</option>
                      <option value="약학과">약학과</option>
                      <option value="한의예과">한의예과</option>
                      <option value="수의예과">수의예과</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Date & Preferred Time */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-date">
                      희망 예약 일자 *
                    </label>
                    <input
                      id="field-date"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredDate: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-time">
                      희망 타임슬롯 *
                    </label>
                    <select
                      id="field-time"
                      value={formData.preferredTime}
                      onChange={(e) =>
                        setFormData({ ...formData, preferredTime: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                    >
                      <option value="오전 10:00">오전 10:00 (오전 첫 타임)</option>
                      <option value="오후 14:00">오후 14:00 (심층 추천)</option>
                      <option value="오후 16:30">오후 16:30</option>
                      <option value="오후 19:00">오후 19:00 (야간)</option>
                    </select>
                  </div>
                </div>

                {/* Student Name & Parent Contact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-name">
                      학생 성명 *
                    </label>
                    <input
                      id="field-name"
                      type="text"
                      placeholder="예: 김민준"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-phone">
                      학부모님 연락처 *
                    </label>
                    <input
                      id="field-phone"
                      type="tel"
                      placeholder="010-0000-0000"
                      value={formData.parentContact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          parentContact: formatPhone(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                      required
                    />
                  </div>
                </div>

                {/* Current Math Percentile & Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-math">
                      최근 수학 모의 백분위 (선택)
                    </label>
                    <input
                      id="field-math"
                      type="text"
                      placeholder="예: 98% / 1등급"
                      value={formData.currentMathPercentile}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentMathPercentile: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-on-surface" htmlFor="field-notes">
                      추가 상담 희망사항 (선택)
                    </label>
                    <input
                      id="field-notes"
                      type="text"
                      placeholder="예: 미적분 킬러 시간 단축 희망"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 rounded-xl bg-inverse-surface text-surface font-title-md hover:bg-on-surface transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <span>진단 예약 전송 중...</span>
                  ) : (
                    <>
                      <span>1:1 레벨테스트 및 심층진단 신청 완료하기</span>
                      <span className="material-symbols-outlined text-[20px] text-primary-fixed-dim">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
                <span className="text-[11px] text-outline text-center">
                  * 본 웹사이트는 포트폴리오 시연용 가상 샘플입니다. 실제 데이터는 외부로 전송되지 않습니다.
                </span>
              </form>
            ) : (
              /* Success Confirmation Card */
              <div className="flex flex-col items-center text-center p-6 gap-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[36px]">
                    check_circle
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-primary font-bold uppercase tracking-wider">
                    RESERVATION CONFIRMED
                  </span>
                  <h4 className="font-headline-md text-on-surface mt-1">
                    1:1 심층진단 예약이 접수되었습니다(예시)
                  </h4>
                  <p className="font-body-sm text-on-surface-variant mt-2 max-w-md">
                    {formData.studentName} 학생 ({formData.grade}, {formData.targetMajor} 목표)의 레벨테스트가 정상 등록되었습니다.
                  </p>
                </div>

                {/* Ticket Details */}
                <div className="w-full p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 text-xs border border-surface-container text-left">
                  <div className="flex justify-between font-mono">
                    <span className="text-on-surface-variant">예약 번호:</span>
                    <span className="font-bold text-primary">{ticketNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">일시:</span>
                    <span className="font-semibold text-on-surface">
                      {formData.preferredDate} ({formData.preferredTime})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">연락처:</span>
                    <span className="font-semibold text-on-surface">
                      {formData.parentContact}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">장소:</span>
                    <span className="font-semibold text-on-surface">
                      대치 본원 5층 VIP 컨설팅룸 (예시)
                    </span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-3 w-full">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        ...formData,
                        studentName: '',
                        parentContact: '',
                        notes: '',
                      });
                    }}
                    className="flex-1 py-3 rounded-lg border border-surface-container text-xs text-on-surface font-semibold hover:bg-surface-container transition-colors cursor-pointer min-h-[44px]"
                  >
                    추가 신청하기
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                    }}
                    className="flex-1 py-3 rounded-lg bg-inverse-surface text-surface text-xs font-semibold hover:bg-on-surface transition-colors text-center cursor-pointer min-h-[44px]"
                  >
                    확인 및 닫기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
