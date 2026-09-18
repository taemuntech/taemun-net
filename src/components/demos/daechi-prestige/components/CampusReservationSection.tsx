'use client';

// 샘플이라 레벨테스트 예약을 받지 않는다 — 지어낸 예약번호(DP-######)를 발급하던 「예약 확정」 카드를 걷어내고,
// 제출하면 공용 안내(SampleNotice)만 연다. 필수값 안내도 브라우저 alert 이 아니라 폼 안 문구로 띄운다.

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ASSETS } from '../data/mockData';
import { ReservationFormData } from '../types';

export const CampusReservationSection: React.FC = () => {
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

  const [missingRequired, setMissingRequired] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const formatPhone = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '').slice(0, 11);
    if (raw.length < 4) return raw;
    if (raw.length < 8) return `${raw.slice(0, 3)}-${raw.slice(3)}`;
    return `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.parentContact.trim()) {
      setMissingRequired(true);
      return;
    }
    setMissingRequired(false);
    setIsNoticeOpen(true);
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

                {missingRequired && (
                  <span role="alert" className="text-[12px] text-error">
                    학생 성명과 학부모님 연락처를 입력해 주십시오.
                  </span>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 rounded-xl bg-inverse-surface text-surface font-title-md hover:bg-on-surface transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]"
                >
                  <span>1:1 레벨테스트 및 심층진단 신청 완료하기</span>
                  <span className="material-symbols-outlined text-[20px] text-primary-fixed-dim">
                    arrow_forward
                  </span>
                </button>
                <span className="text-[11px] text-outline text-center">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
                </span>
              </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="daechi-prestige"
        industry="corporate"
        featureName="1:1 정밀진단 레벨테스트 & 심층상담 예약"
      />
    </section>
  );
};
