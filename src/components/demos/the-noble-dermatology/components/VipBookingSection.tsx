import React, { useState } from 'react';
import { CheckCircle2, Lock, MessageSquare, PhoneCall, Calendar, Clock, AlertCircle } from 'lucide-react';
import { BookingFormState } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface VipBookingSectionProps {
  formData: BookingFormState;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormState>>;
  onSubmitBooking: (data: BookingFormState) => void;
}

export const VipBookingSection: React.FC<VipBookingSectionProps> = ({
  formData,
  setFormData,
  onSubmitBooking,
}) => {
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  const allConcerns = [
    '탄력 / 페이스 리프팅 (초음파·고주파)',
    '난치성 색소 / 기미 / 화이트닝',
    '스킨부스터 / 장벽 재생 (PN·PDLLA)',
    '모공 축소 / 피부결 / 흉터 케어',
    '웨딩 & 프라이빗 VIP 토탈 케어',
    '4광원 정밀 피부 진단만 희망',
  ];

  const doctorsList = [
    { name: '김도현 대표원장', sub: '리프팅 마스터' },
    { name: '이정서 원장', sub: '스킨부스터' },
    { name: '박시윤 원장', sub: '색소/레이저' },
    { name: '전문의 빠른 배정', sub: '가장 빠른 일정' },
  ];

  const toggleConcern = (concern: string) => {
    setFormData((prev) => {
      const exists = prev.concerns.includes(concern);
      if (exists) {
        if (prev.concerns.length === 1) return prev; // keep at least 1
        return { ...prev, concerns: prev.concerns.filter((c) => c !== concern) };
      } else {
        return { ...prev, concerns: [...prev.concerns, concern] };
      }
    });
  };

  const selectDoctor = (docName: string) => {
    setFormData((prev) => ({ ...prev, doctor: docName }));
  };

  /** 표시용 문자열이 아니라 숫자 개수로만 판정한다 — 하이픈이 섞인 길이를 재면 8·9자리가 통과한다. */
  const phoneDigits = (value: string): string => value.replace(/[^0-9]/g, '');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = phoneDigits(e.target.value);
    if (val.length > 11) val = val.slice(0, 11);
    let formatted = val;
    if (val.length > 7) {
      formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
    } else if (val.length > 3) {
      formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    }
    setFormData((prev) => ({ ...prev, customerPhone: formatted }));
    if (val.length >= 10) {
      setPhoneError('');
    }
  };

  // 브라우저 alert() 대신 입력칸 아래 인라인 오류로 알린다
  const handleSubmit = () => {
    const missingName = !formData.customerName.trim();
    const badPhone = phoneDigits(formData.customerPhone).length < 10;
    setNameError(missingName ? '성함을 입력해 주세요.' : '');
    setPhoneError(badPhone ? '올바른 휴대폰 번호를 입력해 주세요.' : '');
    if (missingName || badPhone) {
      document.getElementById(missingName ? 'noble-booking-name' : 'noble-booking-phone')?.focus();
      return;
    }
    onSubmitBooking(formData);
  };

  return (
    <section id="vip-reservation" className="w-full py-16 lg:py-20 bg-[#f5f3f0] border-b border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="px-3 py-1 rounded-full bg-[#eae8e5] text-[#745a2a] text-xs font-semibold tracking-wider uppercase mb-2 inline-block border border-[#e4e2df]">
            1:1 VIP Bespoke Concierge
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-3">
            스마트 1:1 VIP 사전 문진 및 프라이빗 예약
          </h2>
          <p className="text-sm lg:text-base text-[#424845] leading-relaxed">
            원하시는 피부 고민과 전문의를 선택하시면, 전담 매니저가 유선 또는 카카오 알림톡으로 예약 가능한 일정을 안내해 드립니다.
          </p>
        </div>

        {/* Multi-step Form & Realtime Confirmation Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Step by Step Interactive Flow */}
          <div className="lg:col-span-7 bg-[#ffffff] p-6 lg:p-8 lg:p-10 rounded-xl shadow-lg border border-[#eae8e5] space-y-8">
            {/* Step 1: Concern Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00110b] text-[#ffffff] text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h4 className="font-serif text-base lg:text-lg font-medium text-[#00110b]">
                  집중 상담 및 개선을 희망하는 피부 고민 (복수 선택 가능)
                </h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
                {allConcerns.map((concern) => {
                  const isSelected = formData.concerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => toggleConcern(concern)}
                      className={`p-3 min-h-11 rounded-lg text-left text-xs lg:text-sm flex items-center justify-between transition-colors border ${
                        isSelected
                          ? 'bg-[#efeeeb] border-[#745a2a] text-[#00110b] font-semibold'
                          : 'bg-[#f5f3f0] border-transparent text-[#424845] hover:text-[#00110b] hover:bg-[#eae8e5]'
                      }`}
                    >
                      <span className="truncate pr-2">{concern}</span>
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-[#745a2a]' : 'text-[#c1c8c4]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Doctor Choice */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00110b] text-[#ffffff] text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h4 className="font-serif text-base lg:text-lg font-medium text-[#00110b]">
                  전담 피부과 전문의 선택
                </h4>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                {doctorsList.map((doc) => {
                  const isSelected = formData.doctor === doc.name;
                  return (
                    <button
                      key={doc.name}
                      type="button"
                      onClick={() => selectDoctor(doc.name)}
                      className={`p-3 min-h-11 rounded-lg text-center text-xs transition-all border ${
                        isSelected
                          ? 'bg-[#efeeeb] border-[#745a2a] text-[#00110b] shadow-sm'
                          : 'bg-[#f5f3f0] border-transparent text-[#424845] hover:text-[#00110b] hover:bg-[#eae8e5]'
                      }`}
                    >
                      <span className={`block font-semibold ${isSelected ? 'text-[#00110b]' : 'text-[#424845]'}`}>
                        {doc.name}
                      </span>
                      <span className={`text-[11px] mt-0.5 block ${isSelected ? 'text-[#745a2a] font-medium' : 'text-[#727975]'}`}>
                        {doc.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Date & Preferred Time */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00110b] text-[#ffffff] text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <h4 className="font-serif text-base lg:text-lg font-medium text-[#00110b]">
                  희망 일시 및 야간진료 선택
                </h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#727975] mb-1.5 font-medium">방문 희망일</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-lg bg-[#f5f3f0] text-[#00110b] text-xs lg:text-sm border border-[#eae8e5] focus:outline-none focus:ring-2 focus:ring-[#00110b]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#727975] mb-1.5 font-medium">방문 희망 시간대</label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData((prev) => ({ ...prev, timeSlot: e.target.value }))}
                    className="w-full h-11 px-3.5 rounded-lg bg-[#f5f3f0] text-[#00110b] text-xs lg:text-sm border border-[#eae8e5] focus:outline-none focus:ring-2 focus:ring-[#00110b]"
                  >
                    <option value="오전 10:30 (여유로운 프라이빗 타임)">오전 10:30 (여유로운 프라이빗 타임)</option>
                    <option value="오후 14:00 (오후 집중 케어)">오후 14:00 (오후 집중 케어)</option>
                    <option value="오후 16:30 (티타임 슬롯)">오후 16:30 (티타임 슬롯)</option>
                    <option value="야간 18:30 [월·금 야간 특별진료]">야간 18:30 [월·금 야간 특별진료]</option>
                    <option value="야간 19:30 [월·금 야간 특별진료]">야간 19:30 [월·금 야간 특별진료]</option>
                    <option value="토요일 11:00 [주말 VIP 집중]">토요일 11:00 [주말 VIP 집중]</option>
                  </select>
                </div>
              </div>
              <div className="mt-2.5 text-xs text-[#745a2a] flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>매주 월요일 / 금요일은 바쁜 VIP 고객을 위한 20:30 야간 연장 진료를 운영합니다.</span>
              </div>
            </div>

            {/* Step 4: Sensitivity & Down-time Preferences */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00110b] text-[#ffffff] text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <h4 className="font-serif text-base lg:text-lg font-medium text-[#00110b]">
                  피부 민감도 및 시술 환경 선호도
                </h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#f5f3f0] p-3 rounded-lg border border-[#eae8e5]">
                  <span className="text-[#727975] block mb-1 font-medium">통증 민감도</span>
                  <select
                    value={formData.painSensitivity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, painSensitivity: e.target.value }))}
                    className="w-full min-h-11 bg-transparent font-medium text-[#00110b] focus:outline-none"
                  >
                    <option>보통 (일반 마취크림)</option>
                    <option>예민함 (수면/복합마취 희망)</option>
                    <option>통증에 매우 둔감함</option>
                  </select>
                </div>
                <div className="bg-[#f5f3f0] p-3 rounded-lg border border-[#eae8e5]">
                  <span className="text-[#727975] block mb-1 font-medium">다운타임 (멍/부기)</span>
                  <select
                    value={formData.downtimePreference}
                    onChange={(e) => setFormData((prev) => ({ ...prev, downtimePreference: e.target.value }))}
                    className="w-full min-h-11 bg-transparent font-medium text-[#00110b] focus:outline-none"
                  >
                    <option>즉각적인 일상 복귀 필요</option>
                    <option>2~3일 정도 휴식 가능</option>
                    <option>상관 없음</option>
                  </select>
                </div>
                <div className="bg-[#f5f3f0] p-3 rounded-lg border border-[#eae8e5]">
                  <span className="text-[#727975] block mb-1 font-medium">주차 및 발렛</span>
                  <select
                    value={formData.valetRequired}
                    onChange={(e) => setFormData((prev) => ({ ...prev, valetRequired: e.target.value }))}
                    className="w-full min-h-11 bg-transparent font-medium text-[#00110b] focus:outline-none"
                  >
                    <option>발렛 파킹 신청</option>
                    <option>도보 / 대중교통 이용</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 5: Patient Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#00110b] text-[#ffffff] text-xs flex items-center justify-center font-bold">
                  5
                </span>
                <h4 className="font-serif text-base lg:text-lg font-medium text-[#00110b]">
                  예약 고객 인적 사항
                </h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="noble-booking-name" className="block text-xs text-[#727975] mb-1.5 font-medium">
                    성함
                  </label>
                  <input
                    id="noble-booking-name"
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, customerName: e.target.value }));
                      if (e.target.value.trim()) setNameError('');
                    }}
                    placeholder="성함을 입력하세요"
                    aria-invalid={nameError ? true : undefined}
                    className="w-full h-11 px-3.5 rounded-lg bg-[#f5f3f0] text-[#00110b] text-xs lg:text-sm border border-[#eae8e5] focus:outline-none focus:ring-2 focus:ring-[#00110b]"
                  />
                  {nameError && (
                    <div className="flex items-center gap-1 text-[11px] text-[#ba1a1a] mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{nameError}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="noble-booking-phone" className="block text-xs text-[#727975] mb-1.5 font-medium">
                    연락처 (안내받으실 번호)
                  </label>
                  <input
                    id="noble-booking-phone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={handlePhoneChange}
                    placeholder="010-0000-0000"
                    aria-invalid={phoneError ? true : undefined}
                    className="w-full h-11 px-3.5 rounded-lg bg-[#f5f3f0] text-[#00110b] text-xs lg:text-sm border border-[#eae8e5] focus:outline-none focus:ring-2 focus:ring-[#00110b]"
                  />
                  {phoneError && (
                    <div className="flex items-center gap-1 text-[11px] text-[#ba1a1a] mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{phoneError}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Live Realtime Booking Confirmation Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="rounded-xl bg-[#ffffff] p-6 lg:p-8 shadow-xl border border-[#eae8e5] relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#efeeeb]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#745a2a]" />
                  <span className="font-serif text-lg font-medium text-[#00110b]">
                    VIP 예약 실시간 프리뷰
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#745a2a]/10 text-[#745a2a] text-xs font-semibold">
                  단독 스위트 배정
                </span>
              </div>

              {/* 샘플에서는 아무것도 발송되지 않는다 — 발송을 약속하던 문구를 실제 운영 기준 설명으로 바꿨다 */}
              <div className="mb-4 p-3 rounded-lg bg-[#FEE500]/25 text-[#3C1E1E] flex items-start gap-2 text-xs font-medium border border-[#FEE500]/40">
                <MessageSquare className="w-4 h-4 text-[#3C1E1E] shrink-0 mt-0.5" />
                <span className="break-keep">
                  실제 운영 시에는 예약 확정 안내를 알림톡으로 보내는 화면입니다. 이 샘플에서는 아무것도
                  발송되지 않습니다.
                </span>
              </div>

              {/* Summary Details */}
              <div className="space-y-2 text-xs text-[#424845] mb-6">
                <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
                  <span className="text-[#727975]">예약자 성함</span>
                  <span className="font-semibold text-[#00110b]">
                    {formData.customerName || '고객'} 님
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
                  <span className="text-[#727975]">안내 연락처</span>
                  <span className="font-mono text-[#00110b]">
                    {formData.customerPhone || '010-0000-0000'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
                  <span className="text-[#727975]">전담 전문의</span>
                  <span className="font-semibold text-[#745a2a]">{formData.doctor}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
                  <span className="text-[#727975]">예약 희망 일정</span>
                  <span className="font-medium text-[#00110b]">
                    {formData.date} ({formData.timeSlot.split(' ')[0]} {formData.timeSlot.split(' ')[1] || ''})
                  </span>
                </div>
                <div className="py-1.5 border-b border-[#efeeeb]">
                  <span className="text-[#727975] block mb-1.5">상담 희망 영역 ({formData.concerns.length}건)</span>
                  <div className="flex flex-wrap gap-1">
                    {formData.concerns.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#efeeeb] text-[#00110b] text-[11px] font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
                  <span className="text-[#727975]">배정 공간</span>
                  <span className="font-medium text-[#00110b]">1인 프라이빗 스위트 룸 (파우더룸 포함)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#727975]">발렛 파킹</span>
                  <span className="text-[#745a2a] font-medium">
                    {formData.valetRequired.includes('발렛')
                      ? 'B1층 발렛 파킹 지원'
                      : '대중교통 / 도보'}
                  </span>
                </div>
              </div>

              {/* 증상·연락처를 적는 칸이라 「전송되지 않는다」가 작은 회색 글씨로 묻히면 안 된다 */}
              <div className="mb-3 rounded-lg border border-[#745a2a]/30 bg-[#efeeeb] p-3 text-xs leading-relaxed text-[#00110b]">
                <strong className="font-semibold">샘플 사이트입니다.</strong> 입력하신 성함·연락처·피부 고민은
                어디에도 전송되지 않고 이 브라우저 화면에만 남으며, 진료 예약은 접수되지 않습니다.
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 rounded-lg bg-[#00110b] text-[#ffffff] font-semibold text-sm lg:text-base shadow-xl hover:bg-[#0d2820] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#ffdea7]" />
                <span>1:1 프라이빗 예약 문의 보내기</span>
              </button>

              <p className="text-center text-[11px] text-[#727975] mt-3 leading-normal break-keep">
                더 노블 청담은 사전 예약제로 운영되며, 고객님의 개인정보는 의료법 및 개인정보보호법에 따라
                관리합니다.
              </p>
            </div>

            {/* Direct Line Banner — 「직통 연결」이 제자리 앵커라 눌러도 아무 일이 없었다 → 전화 걸기로 */}
            <div className="p-4 rounded-xl bg-[#eae8e5] border border-[#e4e2df] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fbf9f6] flex items-center justify-center text-[#745a2a] shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-[#727975]">전화 예약 및 문의</div>
                  <div className="font-serif text-lg font-semibold text-[#00110b]">
                    {CLINIC_INFO.phone}
                  </div>
                </div>
              </div>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="px-3.5 min-h-11 flex items-center rounded-lg bg-[#ffffff] text-[#00110b] text-xs font-semibold hover:bg-[#efeeeb] transition-colors border border-[#e4e2df] shrink-0"
              >
                전화 걸기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
