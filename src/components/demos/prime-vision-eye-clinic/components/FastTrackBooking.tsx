import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { BookingState, Language } from '../types';
import { SERVICE_LIST, DOCTOR_LIST, SAMPLE_FORM_NOTICE } from '../constants';

interface FastTrackBookingProps {
  language: Language;
  bookingState: BookingState;
  setBookingState: React.Dispatch<React.SetStateAction<BookingState>>;
}

export const FastTrackBooking: React.FC<FastTrackBookingProps> = ({
  language,
  bookingState,
  setBookingState,
}) => {
  const [formError, setFormError] = useState<string>('');
  // 개인정보를 받는 폼이 있는 파일에서 직접 고지 모달을 연다.
  // 부모에 맡겨 두면 「이 폼이 정말 고지를 여는지」를 이 파일만 보고는 알 수 없다.
  const [noticeOpen, setNoticeOpen] = useState(false);

  const timeSlots = ['09:30 (오전 첫 타임)', '11:00', '14:00 (오후 첫 타임)', '16:00', '18:30 (야간)'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingState.patientName.trim()) {
      setFormError('예약자 성함을 입력해 주세요.');
      return;
    }
    if (!bookingState.patientPhone.trim() || bookingState.patientPhone.length < 8) {
      setFormError('올바른 연락처 번호를 입력해 주세요.');
      return;
    }
    if (!bookingState.lensCautionAccepted) {
      setFormError('안전 검진을 위한 렌즈 착용 중단 안내 항목에 동의해 주세요.');
      return;
    }

    setFormError('');
    // 입력값은 어디에도 보내지 않고, 가짜 접수번호도 만들지 않는다 — SampleNotice 만 연다.
    setNoticeOpen(true);
  };

  return (
    <section id="fast-track-section" className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12 break-keep">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
            SAME-DAY PRECISION CARE
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR' ? '1-Day 원데이 당일 검사 · 수술 신청' : '1-Day Fast-Track Same-Day Exam & Surgery'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '바쁜 직장인, 대학생, 군인을 위한 오전 50단계 정밀검진 후 오후 맞춤 수술 및 당일 귀가 프로그램. 전담 코디네이터가 1:1로 신속히 예약을 확정해 드립니다.'
              : 'Designed for professionals, students, and military: Morning 50-step comprehensive diagnostic exam followed by afternoon customized surgery and same-day recovery.'}
          </p>
        </div>

        {/* Booking Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (7 Cols) */}
          <form onSubmit={handleSubmit}
            className="lg:col-span-7 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm flex flex-col gap-6 border border-surface-container/50"
          >
            {/* Step 1: Service */}
            <div>
              <label className="block font-headline-sm text-[16px] text-on-surface font-bold mb-3">
                1. 희망 진료 및 수술 항목
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {SERVICE_LIST.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => setBookingState((s) => ({ ...s, service: svc }))}
                    className={`flex items-center p-3 min-h-[44px] rounded-xl text-left font-body-sm text-[13px] lg:text-[14px] font-medium transition-all border cursor-pointer ${
                      bookingState.service === svc
                        ? 'bg-primary-fixed border-primary/40 text-on-primary-fixed font-bold shadow-sm'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Doctor */}
            <div>
              <label className="block font-headline-sm text-[16px] text-on-surface font-bold mb-3">
                2. 희망 의료진 지정
              </label>
              <div className="space-y-2">
                {DOCTOR_LIST.map((doc) => (
                  <label
                    key={doc}
                    className={`flex items-center gap-3 p-3 min-h-[44px] rounded-xl border cursor-pointer transition-all ${
                      bookingState.doctor === doc
                        ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed font-bold'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    <input
                      type="radio"
                      name="doctorSelect"
                      checked={bookingState.doctor === doc}
                      onChange={() => setBookingState((s) => ({ ...s, doctor: doc }))}
                      className="text-primary focus:ring-primary w-4 h-4"
                    />
                    <span className="font-body-sm text-[14px]">{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Same-day Surgery Preference */}
            <div>
              <label className="block font-headline-sm text-[16px] text-on-surface font-bold mb-3">
                3. 당일 수술 동시 진행 희망 여부
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setBookingState((s) => ({
                      ...s,
                      sameday: '검사 당일 즉시 수술까지 희망 (원데이 패스트트랙)',
                    }))
                  }
                  className={`p-3.5 rounded-xl text-left border cursor-pointer transition-all ${
                    bookingState.sameday.includes('즉시 수술')
                      ? 'bg-primary-fixed border-primary/40 text-on-primary-fixed font-bold shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <div className="font-headline-sm text-[14px] font-bold">검사 당일 즉시 수술 희망</div>
                  <div className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    오전 검진 후 오후 즉시 수술 진행
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setBookingState((s) => ({
                      ...s,
                      sameday: '당일은 50단계 정밀 검진 및 상담만 진행',
                    }))
                  }
                  className={`p-3.5 rounded-xl text-left border cursor-pointer transition-all ${
                    bookingState.sameday.includes('상담만')
                      ? 'bg-primary-fixed border-primary/40 text-on-primary-fixed font-bold shadow-sm'
                      : 'bg-surface-container-low border-transparent hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <div className="font-headline-sm text-[14px] font-bold">정밀 검진 및 상담만 희망</div>
                  <div className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                    눈 상태 확인 후 추후 일정 조율
                  </div>
                </button>
              </div>
            </div>

            {/* Step 4: Date & Time */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-headline-sm text-[14px] text-on-surface font-bold mb-2">
                  예약 희망 일자
                </label>
                <input
                  type="date"
                  value={bookingState.date}
                  onChange={(e) => setBookingState((s) => ({ ...s, date: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-headline-sm text-[14px] text-on-surface font-bold mb-2">
                  예약 희망 시간대
                </label>
                <select
                  value={bookingState.time}
                  onChange={(e) => setBookingState((s) => ({ ...s, time: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {timeSlots.map((ts) => (
                    <option key={ts} value={ts}>
                      {ts}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Patient Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block font-headline-sm text-[14px] text-on-surface font-bold mb-2">
                  예약자 성함 <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 홍길동"
                  value={bookingState.patientName}
                  onChange={(e) => setBookingState((s) => ({ ...s, patientName: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-headline-sm text-[14px] text-on-surface font-bold mb-2">
                  휴대폰 번호 <span className="text-error">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="예: 010-0000-0000"
                  value={bookingState.patientPhone}
                  onChange={(e) => setBookingState((s) => ({ ...s, patientPhone: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface font-body-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Step 6: Contact Lens Precaution Agreement */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingState.lensCautionAccepted}
                  onChange={(e) =>
                    setBookingState((s) => ({ ...s, lensCautionAccepted: e.target.checked }))
                  }
                  className="mt-1 w-4 h-4 text-primary rounded border-outline focus:ring-primary"
                />
                <span className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                  <strong>[필독 사전 안전 수칙]</strong> 정확한 각막 곡률 측정을 위해 소프트렌즈는 최소 3일, 난시교정용/하드렌즈는 최소 7일간 착용을 완전히 중단한 후 내원하셔야 함을 확인하고 동의합니다.
                </span>
              </label>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-error-container text-on-error-container font-body-sm text-[13px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{formError}</span>
              </div>
            )}

            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed text-center break-keep">
              {SAMPLE_FORM_NOTICE}
            </p>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-headline-sm text-[16px] font-bold shadow-lg transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              <span>원데이 패스트트랙 예약 보내기</span>
            </button>
          </form>

          {/* Live Review Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-surface-container-lowest to-surface-container-low p-6 lg:p-8 rounded-2xl shadow-xl border border-surface-container lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-surface-container">
              <span className="font-headline-sm text-[16px] font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                <span>입력하신 내용 요약</span>
              </span>
              <span className="font-label-caps text-[11px] px-2.5 py-1 rounded-full bg-primary-fixed text-primary font-bold">
                1:1 FAST TRACK
              </span>
            </div>

            <div className="py-5 space-y-4 font-body-sm text-[14px]">
              <div>
                <span className="font-label-caps text-[11px] text-on-surface-variant block">선택 진료 과목</span>
                <span className="font-headline-sm text-[15px] font-bold text-primary mt-0.5 block">
                  {bookingState.service}
                </span>
              </div>

              <div>
                <span className="font-label-caps text-[11px] text-on-surface-variant block">담당 희망 의료진</span>
                <span className="font-medium text-on-surface mt-0.5 block">{bookingState.doctor}</span>
              </div>

              <div>
                <span className="font-label-caps text-[11px] text-on-surface-variant block">당일 수술 여부</span>
                <span className="font-medium text-on-surface mt-0.5 block">{bookingState.sameday}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-container">
                <div>
                  <span className="font-label-caps text-[11px] text-on-surface-variant block">예약 희망일</span>
                  <span className="font-label-numeric font-bold text-on-surface">
                    {bookingState.date || '미지정'}
                  </span>
                </div>
                <div>
                  <span className="font-label-caps text-[11px] text-on-surface-variant block">예약 시간</span>
                  <span className="font-label-numeric font-bold text-on-surface">{bookingState.time}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container">
                <span className="font-label-caps text-[11px] text-on-surface-variant block">신청자 정보</span>
                <span className="font-medium text-on-surface block mt-0.5">
                  {bookingState.patientName ? bookingState.patientName : '성함 미입력'} /{' '}
                  {bookingState.patientPhone ? bookingState.patientPhone : '연락처 미입력'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container text-on-surface-variant font-body-sm text-[12px] leading-relaxed break-keep">
              💡 <strong>샘플 안내:</strong> 이 요약은 왼쪽에 입력하신 내용을 화면에서 그대로 보여 줄 뿐이며, 어디에도 저장·전송되지 않습니다. 실제 사이트라면 접수 후 담당 코디네이터가 유선으로 주의사항과 동선을 안내하는 자리입니다.
            </div>
          </div>
        </div>
      </div>

      <SampleNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        slug="prime-vision-eye-clinic"
        featureName="1-Day 원데이 패스트트랙 수술 예약"
        kind="sample"
        industry="corporate"
      />
    </section>
  );
};
