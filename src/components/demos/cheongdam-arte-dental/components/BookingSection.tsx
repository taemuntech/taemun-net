import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { CLINIC_IMAGES, FEAR_OPTIONS } from '../data/clinicData';
import { BookingFormData } from '../types';
import { 
  Calendar, 
  Clock, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Headphones,
  Lock,
  UserCheck
} from 'lucide-react';

interface BookingSectionProps {
  onCompleteBooking: (data: BookingFormData) => void;
}

const TREATMENTS = [
  { id: 'implant', name: '3D 네비게이션 임플란트', desc: '1-Day 무절개 • 상악동 거상 • 전악 재건' },
  { id: 'veneer', name: '0.1mm 미세삭제 라미네이트', desc: '초박막 세라믹 • 스마일 라인 리디자인' },
  { id: 'prosthetics', name: '지르코니아 올세라믹 & 충치', desc: '자연치아 보존 • 정밀 보철 치료' },
  { id: 'checkup', name: 'VIP 구강 종합 검진 & 스케일링', desc: '3D CT 정밀 진단 • 잇몸 집중 케어' }
];

const TIME_SLOTS = [
  '10:00 (오전 첫 타임)',
  '11:30 (오전)',
  '14:00 (오후 첫 타임)',
  '15:30 (오후)',
  '17:00 (오후)',
  '18:30 (화/목 야간진료)'
];

export const BookingSection: React.FC<BookingSectionProps> = ({ onCompleteBooking }) => {
  const [treatment, setTreatment] = useState('implant');
  const [doctor, setDoctor] = useState('min');

  // 내일 날짜(사용자 지역 시각 기준). toISOString 을 쓰면 UTC 로 밀려 새벽에 오늘 날짜가 나온다.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;

  const [date, setDate] = useState(defaultDateStr);
  const [time, setTime] = useState('14:00 (오후 첫 타임)');
  const [fears, setFears] = useState<string[]>(['pain']);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // 제출하면 샘플 고지부터 띄운다. 고지를 닫아야 예약 요약(시뮬레이션)이 열린다 — 가짜 접수를 먼저 보여주지 않는다.
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [pendingBooking, setPendingBooking] = useState<BookingFormData | null>(null);

  const handleNoticeClose = () => {
    setNoticeOpen(false);
    if (pendingBooking) {
      onCompleteBooking(pendingBooking);
      setPendingBooking(null);
    }
  };

  const handleToggleFear = (id: string) => {
    setFears(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('예약자 성함을 입력해주세요.');
      return;
    }
    if (!patientPhone.trim()) {
      setErrorMsg('연락처(휴대폰 번호)를 입력해주세요.');
      return;
    }
    setErrorMsg('');

    const treatmentObj = TREATMENTS.find(t => t.id === treatment);
    const doctorLabel = doctor === 'min' 
      ? '민경훈 대표원장 (구강악안면외과)' 
      : doctor === 'jeong' 
        ? '정서윤 원장 (치과보철과)' 
        : '빠른 일정 우선 전문의 배정';

    setPendingBooking({
      treatment: treatmentObj ? treatmentObj.name : treatment,
      doctor: doctorLabel,
      date,
      time,
      fears,
      patientName,
      patientPhone
    });
    setNoticeOpen(true);
  };

  return (
    <section className="w-full bg-[#f4f3f1] py-20 lg:py-28" id="booking-section">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-semibold block mb-2 font-sans">
            CONCIERGE RESERVATION
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1c1a] font-medium tracking-tight">
            VIP 온라인 간편예약 &amp; 안심 사전 문진
          </h2>
          <p className="text-sm lg:text-base text-[#4e4639] mt-3 leading-relaxed">
            내원 전 두려운 점이나 불편했던 경험을 미리 체크해주시면, 담당 의료진이 마취와 진료 방식을 그에 맞춰 준비합니다.
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#d1c5b4]/40 p-6 lg:p-10 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Step 1: Treatment Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#ffdea5] text-[#261900] text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-lg text-[#1a1c1a] font-bold">
                  진료 희망 과목을 선택해주세요
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {TREATMENTS.map((t) => {
                  const isChecked = treatment === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={isChecked}
                      onClick={() => setTreatment(t.id)}
                      className={`w-full text-left p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                        isChecked
                          ? 'border-[#775a19] bg-[#faf9f6] ring-1 ring-[#775a19]'
                          : 'border-[#d1c5b4]/40 hover:border-[#775a19]/50 bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm text-[#1a1c1a] block">
                          {t.name}
                        </span>
                        <span className="text-xs text-[#7f7667] mt-0.5 block">
                          {t.desc}
                        </span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'border-[#775a19] bg-[#775a19] text-white' : 'border-[#d1c5b4]'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Doctor Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#ffdea5] text-[#261900] text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-lg text-[#1a1c1a] font-bold">
                  전담 주치의를 지정해주세요
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {/* Doctor 1 */}
                <button
                  type="button"
                  aria-pressed={doctor === 'min'}
                  onClick={() => setDoctor('min')}
                  className={`w-full text-left p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    doctor === 'min'
                      ? 'border-[#775a19] bg-[#faf9f6] ring-1 ring-[#775a19]'
                      : 'border-[#d1c5b4]/40 hover:border-[#775a19]/50 bg-white'
                  }`}
                >
                  <img
                    src={CLINIC_IMAGES.drMinThumb}
                    alt="민경훈 원장"
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#d1c5b4]/30"
                  referrerPolicy="no-referrer" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-[#775a19] block">구강악안면외과</span>
                    <span className="text-sm font-bold text-[#1a1c1a] truncate block">민경훈 대표원장</span>
                    <span className="text-[11px] text-[#7f7667] truncate block">임플란트 • 외과수술</span>
                  </div>
                </button>

                {/* Doctor 2 */}
                <button
                  type="button"
                  aria-pressed={doctor === 'jeong'}
                  onClick={() => setDoctor('jeong')}
                  className={`w-full text-left p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    doctor === 'jeong'
                      ? 'border-[#775a19] bg-[#faf9f6] ring-1 ring-[#775a19]'
                      : 'border-[#d1c5b4]/40 hover:border-[#775a19]/50 bg-white'
                  }`}
                >
                  <img
                    src={CLINIC_IMAGES.drJeongThumb}
                    alt="정서윤 원장"
                    className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#d1c5b4]/30"
                  referrerPolicy="no-referrer" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-[#565e74] block">치과보철과</span>
                    <span className="text-sm font-bold text-[#1a1c1a] truncate block">정서윤 원장</span>
                    <span className="text-[11px] text-[#7f7667] truncate block">라미네이트 • 심미보철</span>
                  </div>
                </button>

                {/* Fastest Schedule */}
                <button
                  type="button"
                  aria-pressed={doctor === 'fastest'}
                  onClick={() => setDoctor('fastest')}
                  className={`w-full text-left p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3.5 ${
                    doctor === 'fastest'
                      ? 'border-[#775a19] bg-[#faf9f6] ring-1 ring-[#775a19]'
                      : 'border-[#d1c5b4]/40 hover:border-[#775a19]/50 bg-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#cce5ff] text-[#006398] flex items-center justify-center shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#006398] block">빠른 상담</span>
                    <span className="text-sm font-bold text-[#1a1c1a] block">일정 우선 배정</span>
                    <span className="text-[11px] text-[#7f7667] block">증상에 맞춘 전문의</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 3: Date & Time Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-[#ffdea5] text-[#261900] text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-lg text-[#1a1c1a] font-bold">
                  원하시는 방문 일시를 지정해주세요
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-4">
                  <label className="text-xs font-semibold text-[#4e4639] block mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#775a19]" />
                    희망 예약 일자
                  </label>
                  <input
                    type="date"
                    value={date}
                    min={defaultDateStr}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#d1c5b4]/60 bg-[#faf9f6] text-sm text-[#1a1c1a] font-medium focus:outline-none focus:ring-2 focus:ring-[#775a19]"
                  />
                  <span className="text-[11px] text-[#7f7667] mt-1.5 block">
                    * 일요일 및 공휴일은 휴진입니다.
                  </span>
                </div>

                <div className="lg:col-span-8">
                  <label className="text-xs font-semibold text-[#4e4639] block mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#775a19]" />
                    희망 시간대 (1:1 VIP 예약 타임)
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isTime = time === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`p-2.5 min-h-11 rounded-xl text-xs font-semibold border transition-all text-center ${
                            isTime
                              ? 'bg-[#775a19] text-white border-[#775a19] shadow-sm'
                              : 'bg-[#faf9f6] text-[#4e4639] border-[#d1c5b4]/40 hover:bg-white hover:text-[#1a1c1a]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Fear & Sensitivity Checklist */}
            <div className="p-6 rounded-2xl bg-[#faf9f6] border border-[#d1c5b4]/40">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#ffdea5] text-[#261900] text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="font-serif text-lg text-[#1a1c1a] font-bold">
                  안심 케어 사전 문진 (치과 공포증 &amp; 민감도 체크)
                </h3>
              </div>
              <p className="text-xs text-[#7f7667] mb-4">
                체크해주신 내용은 진료 전 담당 원장님과 전담 치위생사에게 전달되어 맞춤 케어로 진행됩니다.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
                {FEAR_OPTIONS.map((opt) => {
                  const isChecked = fears.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={isChecked}
                      onClick={() => handleToggleFear(opt.id)}
                      className={`w-full text-left p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked 
                          ? 'border-[#775a19] bg-white ring-1 ring-[#775a19]' 
                          : 'border-[#d1c5b4]/30 bg-[#faf9f6] hover:bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 ${
                        isChecked ? 'bg-[#775a19] border-[#775a19] text-white' : 'border-[#d1c5b4] bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#1a1c1a] block leading-tight">
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-[#775a19] mt-0.5 block font-medium">
                          {opt.detail}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Patient Contact Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-[#d1c5b4]/30">
                <div>
                  <label className="text-xs font-semibold text-[#4e4639] block mb-1.5">
                    예약자 성함 <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#d1c5b4]/60 bg-white text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#775a19]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4e4639] block mb-1.5">
                    연락처 (휴대폰) <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#d1c5b4]/60 bg-white text-sm text-[#1a1c1a] focus:outline-none focus:ring-2 focus:ring-[#775a19]"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="mt-3 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Submit CTA */}
            <div className="flex flex-col items-center gap-3">
              <p className="w-full p-3 rounded-xl bg-[#faf9f6] border border-[#d1c5b4]/40 text-xs text-[#4e4639] leading-relaxed text-center">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다. 증상·병력 등 민감한 정보는 적지 마세요.
              </p>
              <button
                type="submit"
                className="w-full lg:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#c5a059] to-[#775a19] text-white text-base font-bold shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-[#ffdea5]" />
                <span>VIP 진료 예약 신청하기</span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-[#7f7667]">
                <Lock className="w-3.5 h-3.5 text-[#775a19] shrink-0" />
                <span>실제 의료기관에서는 진료 예약 정보를 의료법·개인정보보호법에 따라 관리합니다.</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <SampleNotice
        open={noticeOpen}
        onClose={handleNoticeClose}
        slug="cheongdam-arte-dental"
        featureName="VIP 진료 예약 및 사전 문진"
        kind="sample"
        industry="corporate"
      />
    </section>
  );
};
