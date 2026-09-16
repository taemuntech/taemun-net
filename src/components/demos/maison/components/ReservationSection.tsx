"use client";

import React, { useState } from 'react';
import { BRAND_INFO } from '../data/antiqueData';
import { ReservationSubmission } from '../types';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'furniture',
    dateTime: '',
    notes: '',
    agreePrivacy: true,
  });

  const [submittedBooking, setSubmittedBooking] =
    useState<ReservationSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('성함(존칭)을 입력해 주세요.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('연락처를 입력해 주세요.');
      return;
    }
    if (!formData.dateTime) {
      setErrorMessage('방문 희망 일시를 선택해 주세요.');
      return;
    }
    if (!formData.agreePrivacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    setErrorMessage('');
    const randomCode =
      'MDA-VIP-' + Math.floor(100000 + Math.random() * 900000);
    const submission: ReservationSubmission = {
      clientName: formData.name,
      clientPhone: formData.phone,
      interestCat: formData.interest,
      visitDateTime: formData.dateTime,
      notes: formData.notes,
      submittedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      reservationCode: randomCode,
    };
    setSubmittedBooking(submission);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setFormData({
      name: '',
      phone: '',
      interest: 'furniture',
      dateTime: '',
      notes: '',
      agreePrivacy: true,
    });
  };

  return (
    <section
      id="viewing"
      className="py-16 lg:py-24 bg-[#fff8f5] border-b border-[#d6c2c2]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] text-[#735b24] uppercase tracking-[0.25em] font-bold">
            Private Viewing Salon
          </span>
          <h2 className="font-serif text-[28px] lg:text-[38px] text-[#300a10] mt-2">
            한남동 살롱 프라이빗 뷰잉 예약
          </h2>
          <p className="font-serif text-[16px] text-[#514344] mt-2 leading-relaxed">
            오직 귀하만을 위해 메종 당티크의 문을 엽니다. 전문 큐레이터의 일대일 도슨트 투어와 작품 컨설팅을 경험해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Salon Experience & Policies (5 cols) */}
          <div className="lg:col-span-5 bg-[#fbf2ed] p-6 lg:p-8 border border-[#d6c2c2] space-y-6">
            <h3 className="font-serif text-[21px] text-[#300a10] border-b border-[#d6c2c2] pb-3">
              Salon Experience &amp; Policies
            </h3>

            <ul className="space-y-4 font-serif text-[15px] text-[#514344]">
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#735b24] text-[18px] mt-1 shrink-0">
                  check_circle
                </span>
                <div>
                  <strong className="text-[#300a10] block">
                    예약자 전용 살롱 프라이빗 대관
                  </strong>
                  <span>
                    동시간대 오직 1팀만을 단독으로 모셔 조용하고 프라이빗한 관람을 보장합니다.
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#735b24] text-[18px] mt-1 shrink-0">
                  check_circle
                </span>
                <div>
                  <strong className="text-[#300a10] block">
                    웰컴 티 &amp; 페어링 살롱 서비스
                  </strong>
                  <span>
                    파리 마리아쥬 프레르(Mariage Frères) 앤틱 찻잔 티 세레모니와 함께합니다.
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="material-symbols-outlined text-[#735b24] text-[18px] mt-1 shrink-0">
                  check_circle
                </span>
                <div>
                  <strong className="text-[#300a10] block">
                    작품 큐레이션 &amp; 실내 공간 3D 시뮬레이션
                  </strong>
                  <span>
                    소장 원하시는 공간 도면 또는 인테리어 사진 지참 시 최적의 배치 매칭을 지원합니다.
                  </span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#d6c2c2]/80 space-y-2 text-xs font-serif text-[#514344]">
              <p className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[16px] text-[#735b24]">
                  pin_drop
                </span>
                <span>{BRAND_INFO.contact.address}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[16px] text-[#735b24]">
                  phone_in_talk
                </span>
                <span>{BRAND_INFO.contact.phone}</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[16px] text-[#735b24]">
                  schedule
                </span>
                <span>화요일 — 일요일 11:00 - 19:00 (매주 월요일 휴관)</span>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form or Confirmed Ticket (7 cols) */}
          <div className="lg:col-span-7 bg-[#f5ece7] p-6 lg:p-10 border border-[#d6c2c2]">
            {submittedBooking ? (
              <div
                id="reservation-confirmed-card"
                className="bg-[#fff8f5] p-6 lg:p-8 border-2 border-[#735b24] space-y-6 text-center animate-in fade-in duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#fddc97]/40 border border-[#735b24] text-[#735b24] flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">
                    mark_email_read
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#735b24] font-bold">
                    Invitation Confirmed
                  </span>
                  <h4 className="font-serif text-[24px] text-[#300a10]">
                    살롱 프라이빗 뷰잉 예약 신청 완료
                  </h4>
                  <p className="font-serif text-[15px] text-[#514344]">
                    {submittedBooking.clientName} 님의 한남동 살롱 방문 예약이
                    정상적으로 접수되었습니다.
                  </p>
                </div>

                {/* Archival Ticket Seal */}
                <div className="bg-[#fbf2ed] p-4 border border-[#d6c2c2] text-left space-y-2 font-serif text-[14px]">
                  <div className="flex justify-between border-b border-[#d6c2c2]/60 pb-2">
                    <span className="text-[#514344]">예약 증표 코드</span>
                    <span className="font-bold text-[#300a10] font-sans">
                      {submittedBooking.reservationCode}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#d6c2c2]/60 pb-2">
                    <span className="text-[#514344]">방문 희망 일시</span>
                    <span className="font-medium text-[#1e1b18]">
                      {new Date(submittedBooking.visitDateTime).toLocaleString(
                        'ko-KR',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#514344]">담당 큐레이터</span>
                    <span className="font-medium text-[#735b24]">
                      선임 수석 아키비스트 배정
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#514344] leading-relaxed">
                  * 원활한 프라이빗 도슨트 진행을 위해 담당 큐레이터가 2시간
                  이내에 안내 전화를 드립니다.
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] px-6 py-2.5 text-[12px] uppercase tracking-wider font-semibold cursor-pointer"
                >
                  다른 일정 추가 예약하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="bg-[#fddc97]/30 border border-[#735b24] p-3 text-[13px] text-[#300a10] font-serif">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="clientName"
                      className="block text-[11px] uppercase tracking-wider text-[#514344] font-semibold"
                    >
                      성함 / 존칭 <span className="text-[#735b24]">*</span>
                    </label>
                    <input
                      id="clientName"
                      type="text"
                      required
                      placeholder="홍길동 님"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#fff8f5] border border-[#d6c2c2] p-3 text-[14px] text-[#1e1b18] focus:border-[#735b24] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="clientPhone"
                      className="block text-[11px] uppercase tracking-wider text-[#514344] font-semibold"
                    >
                      연락처 <span className="text-[#735b24]">*</span>
                    </label>
                    <input
                      id="clientPhone"
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#fff8f5] border border-[#d6c2c2] p-3 text-[14px] text-[#1e1b18] focus:border-[#735b24] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label
                      htmlFor="interestCategory"
                      className="block text-[11px] uppercase tracking-wider text-[#514344] font-semibold"
                    >
                      관심 작품 카테고리
                    </label>
                    <select
                      id="interestCategory"
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                      className="w-full bg-[#fff8f5] border border-[#d6c2c2] p-3 text-[14px] text-[#1e1b18] focus:border-[#735b24] focus:outline-none transition-colors"
                    >
                      <option value="all">전체 아카이브 관람</option>
                      <option value="furniture">대형 가구 (코모드/데스크/파퇴유)</option>
                      <option value="lighting">조명 &amp; 길트 샹들리에</option>
                      <option value="mirrors">오리지널 수은 거울 &amp; 벽장식</option>
                      <option value="objects">도자기 &amp; 은제 테이블웨어</option>
                      <option value="restoration">소장 앤틱 복원 의뢰 자문</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="visitDateTime"
                      className="block text-[11px] uppercase tracking-wider text-[#514344] font-semibold"
                    >
                      방문 희망 일시 <span className="text-[#735b24]">*</span>
                    </label>
                    <input
                      id="visitDateTime"
                      type="datetime-local"
                      required
                      value={formData.dateTime}
                      onChange={(e) =>
                        setFormData({ ...formData, dateTime: e.target.value })
                      }
                      className="w-full bg-[#fff8f5] border border-[#d6c2c2] p-3 text-[14px] text-[#1e1b18] focus:border-[#735b24] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="reservationNotes"
                    className="block text-[11px] uppercase tracking-wider text-[#514344] font-semibold"
                  >
                    공간 및 컬렉팅 요청사항 (선택)
                  </label>
                  <textarea
                    id="reservationNotes"
                    rows={3}
                    placeholder="배치를 계획 중이신 공간의 성격(거실, 서재, 부티크 라운지 등)이나 특별히 찾으시는 시대 양식을 적어주시면 사전 큐레이션을 준비해 드립니다."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full bg-[#fff8f5] border border-[#d6c2c2] p-3 text-[14px] text-[#1e1b18] focus:border-[#735b24] focus:outline-none transition-colors font-serif resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    id="privacyAgreement"
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        agreePrivacy: e.target.checked,
                      })
                    }
                    className="accent-[#300a10] w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="privacyAgreement"
                    className="text-xs text-[#514344] font-serif cursor-pointer"
                  >
                    살롱 프라이빗 뷰잉 진행을 위한 개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>

                <button
                  id="btn-submit-reservation"
                  type="submit"
                  className="w-full bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] py-4 text-[13px] uppercase tracking-widest font-semibold transition-all duration-200 border border-[#735b24]/40 shadow-sm cursor-pointer"
                >
                  살롱 프라이빗 뷰잉 신청하기
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
