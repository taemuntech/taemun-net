import React, { useState, useEffect } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { BookingState } from '../types';

interface FastTrackBookingProps {
  initialState?: Partial<BookingState>;
  onCompleteBooking: (state: BookingState) => void;
}

export const FastTrackBooking: React.FC<FastTrackBookingProps> = ({
  initialState,
  onCompleteBooking,
}) => {
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    part: '허리/요추 센터',
    doctor: '박진우 대표원장 (척추)',
    date: '2024년 10월 22일 (화) [야간진료 가능]',
    time: '오전 10:00 (MRI 즉시 연계)',
    vas: 7,
    duration: '1~3개월 지속',
    patientName: '홍길동',
    patientTel: '010-0000-0000',
  });

  useEffect(() => {
    if (initialState) {
      setBooking((prev) => ({ ...prev, ...initialState }));
    }
  }, [initialState]);

  const partOptions = [
    { key: 'neck', label: '목/경추', center: '목/경추 센터', icon: 'personal_injury' },
    { key: 'lumbar', label: '허리/요추', center: '허리/요추 센터', icon: 'accessibility_new' },
    { key: 'shoulder', label: '어깨', center: '어깨 관절 센터', icon: 'sports_martial_arts' },
    { key: 'knee', label: '무릎', center: '무릎 관절 센터', icon: 'directions_walk' },
    { key: 'ankle', label: '고관절/발목', center: '고관절/발목 센터', icon: 'steps' },
  ];

  const doctorOptions = [
    {
      name: '박진우 대표원장',
      full: '박진우 대표원장 (척추)',
      desc: '척추센터 / 대학병원(예시) 외래교수',
    },
    {
      name: '최윤석 원장',
      full: '최윤석 원장 (관절)',
      desc: '관절·스포츠의학 / 대학병원(예시)',
    },
    {
      name: '당일 빠른 배정',
      full: '당일 빠른 진료 배정',
      desc: '대기 시간 최소화 우선 배정',
    },
  ];

  const getVasLabel = (val: number) => {
    if (val <= 3) return `VAS ${val}단계 (경미한 뻐근함)`;
    if (val <= 6) return `VAS ${val}단계 (중등도 일상장애)`;
    return `VAS ${val}단계 (중증 통증/정밀진단 권장)`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleNoticeOpen(true);
    onCompleteBooking(booking);
  };

  return (
    <section id="fast-track-booking" className="w-full bg-[#F4F3F1] py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007D73] text-[#C5FFF5] text-xs font-bold mb-2">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>1.5T MRI FAST-TRACK SYSTEM</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1C1A] tracking-tight">
            당일 진료 &amp; 1.5T MRI 원스톱 예약 (대기 최소화)
          </h2>
          <p className="text-sm lg:text-base text-[#3F493F] mt-2">
            대학병원(예시)에서 몇 주씩 걸리던 고해상도 MRI 검사와 전문의 판독을 내원 당일 1시간 내에 원스톱으로 제공합니다.
          </p>
        </div>

        {/* Booking Interactive Wizard Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Interactive Steps Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-[#E9E8E5] space-y-6">
            {/* Step 1: Pain Region */}
            <div>
              <label className="font-bold text-sm lg:text-base text-[#1A1C1A] mb-2.5 flex items-center justify-between">
                <span>Step 1. 통증 부위 선택</span>
                <span className="text-[#00652C] text-xs font-semibold">필수 입력</span>
              </label>
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                {partOptions.map((p) => {
                  const isSelected = booking.part === p.center;
                  return (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setBooking({ ...booking, part: p.center })}
                      className={`p-3 rounded-xl text-xs lg:text-sm text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-[#00652C] text-white shadow-sm font-bold'
                          : 'bg-[#F4F3F1] text-[#3F493F] hover:bg-[#FAF9F6] border border-[#E9E8E5]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Doctor Selection */}
            <div>
              <label className="block font-bold text-sm lg:text-base text-[#1A1C1A] mb-2.5">
                Step 2. 전담 전문의 선택
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {doctorOptions.map((doc, idx) => {
                  const isSelected = booking.doctor === doc.full;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBooking({ ...booking, doctor: doc.full })}
                      className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1 cursor-pointer border ${
                        isSelected
                          ? 'bg-[#00652C] text-white border-[#00652C] shadow-sm'
                          : 'bg-[#F4F3F1] text-[#3F493F] border-[#E9E8E5] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      <span className={`text-xs lg:text-sm font-bold ${isSelected ? 'text-white' : 'text-[#1A1C1A]'}`}>
                        {doc.name}
                      </span>
                      <span className={`text-[11px] leading-tight ${isSelected ? 'text-white/85' : 'text-[#545F73]'}`}>
                        {doc.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Date & Night Care */}
            <div>
              <label className="font-bold text-sm lg:text-base text-[#1A1C1A] mb-2.5 flex items-center justify-between">
                <span>Step 3. 방문 희망일 및 시간대</span>
                <span className="text-[#00652C] text-xs font-bold">화/목 야간진료 ~20:00 지원</span>
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <select
                  value={booking.date}
                  onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                  className="h-12 px-3.5 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5] text-xs lg:text-sm text-[#1A1C1A] focus:outline-none focus:border-[#00652C] focus:bg-white cursor-pointer"
                >
                  <option value="2024년 10월 22일 (화) [야간진료 가능]">2024년 10월 22일 (화) [야간진료 가능]</option>
                  <option value="2024년 10월 23일 (수)">2024년 10월 23일 (수)</option>
                  <option value="2024년 10월 24일 (목) [야간진료 가능]">2024년 10월 24일 (목) [야간진료 가능]</option>
                  <option value="2024년 10월 25일 (금)">2024년 10월 25일 (금)</option>
                  <option value="2024년 10월 26일 (토) [오전·점심없이 진료]">2024년 10월 26일 (토) [09:00-14:00]</option>
                </select>

                <select
                  value={booking.time}
                  onChange={(e) => setBooking({ ...booking, time: e.target.value })}
                  className="h-12 px-3.5 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5] text-xs lg:text-sm text-[#1A1C1A] focus:outline-none focus:border-[#00652C] focus:bg-white cursor-pointer"
                >
                  <option value="오전 10:00 (MRI 즉시 연계)">오전 10:00 (MRI 당일 슬롯 가능)</option>
                  <option value="오전 11:30 (MRI 즉시 연계)">오전 11:30 (MRI 당일 슬롯 가능)</option>
                  <option value="오후 14:30 (오후 진료 시작)">오후 14:30</option>
                  <option value="오후 16:00 (MRI 당일 슬롯 가능)">오후 16:00 (MRI 당일 슬롯 가능)</option>
                  <option value="야간 18:30 (화/목 야간진료)">야간 18:30 [화·목 직장인 특화]</option>
                  <option value="야간 19:20 (화/목 야간진료)">야간 19:20 [화·목 직장인 특화]</option>
                </select>
              </div>
            </div>

            {/* Step 4: Pain Scale (VAS) Slider & Duration */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-sm lg:text-base text-[#1A1C1A]">
                  Step 4. 통증 강도(VAS 척도) 및 지속기간
                </span>
                <span className="text-xs lg:text-sm text-[#00652C] font-bold">
                  {getVasLabel(booking.vas)}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={booking.vas}
                onChange={(e) => setBooking({ ...booking, vas: Number(e.target.value) })}
                className="w-full accent-[#00652C] cursor-pointer h-2 bg-[#EFEEEB] rounded-lg"
              />
              <div className="flex justify-between text-[#545F73] text-[11px] mt-1">
                <span>1점 (경미한 뻐근함)</span>
                <span>5점 (일상 생활 지장)</span>
                <span>10점 (수면 불가 / 극심한 통증)</span>
              </div>

              {/* Duration radio buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {['1주일 이내 급성 통증', '1~3개월 지속', '3개월 이상 만성 재발'].map((dur) => (
                  <label
                    key={dur}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs cursor-pointer border transition-colors ${
                      booking.duration === dur
                        ? 'bg-[#E9E8E5] border-[#00652C] text-[#1A1C1A] font-bold'
                        : 'bg-[#F4F3F1] border-[#E9E8E5] text-[#3F493F]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="duration"
                      value={dur}
                      checked={booking.duration === dur}
                      onChange={(e) => setBooking({ ...booking, duration: e.target.value })}
                      className="accent-[#00652C]"
                    />
                    <span>{dur}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Patient Input Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#545F73] mb-1">환자 성함</label>
                <input
                  type="text"
                  required
                  placeholder="환자 성함"
                  value={booking.patientName}
                  onChange={(e) => setBooking({ ...booking, patientName: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5] text-xs lg:text-sm text-[#1A1C1A] focus:outline-none focus:border-[#00652C] focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#545F73] mb-1">연락처 (알림톡 수신)</label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={booking.patientTel}
                  onChange={(e) => setBooking({ ...booking, patientTel: e.target.value })}
                  className="w-full h-12 px-3.5 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5] text-xs lg:text-sm text-[#1A1C1A] focus:outline-none focus:border-[#00652C] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Realtime Confirmation Preview & KakaoTalk Sheet (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 lg:p-6 rounded-2xl shadow-md border border-[#E9E8E5] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EFEEEB] mb-4">
                <span className="font-bold text-sm lg:text-base text-[#1A1C1A] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00652C] text-[20px]">
                    receipt_long
                  </span>
                  <span>실시간 예약 확인 카드</span>
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#00652C]/10 text-[#00652C] text-xs font-bold">
                  Fast-Track 승인대기
                </span>
              </div>

              {/* Simulated Kakao Notification Box */}
              <div className="p-3.5 rounded-xl bg-[#F4F3F1] mb-5 border border-[#E9E8E5] space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#FEE500] flex items-center justify-center text-[#1A1C1A] font-bold text-[10px] shadow-xs">
                    TALK
                  </div>
                  <span className="text-xs lg:text-sm text-[#1A1C1A] font-bold">
                    [바른마디] 알림톡 시뮬레이션
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg text-[#3F493F] text-xs space-y-1.5 border border-[#E9E8E5]">
                  <div>
                    <strong>예약 환자:</strong>{' '}
                    <span className="text-[#1A1C1A] font-medium">{booking.patientName || '환자'} 님</span>
                  </div>
                  <div>
                    <strong>진료 부위:</strong>{' '}
                    <span className="text-[#00652C] font-bold">{booking.part}</span>
                  </div>
                  <div>
                    <strong>담당 의료진:</strong>{' '}
                    <span className="text-[#1A1C1A] font-medium">{booking.doctor}</span>
                  </div>
                  <div>
                    <strong>예약 일시:</strong>{' '}
                    <span className="text-[#1A1C1A] font-medium">
                      {booking.date} {booking.time}
                    </span>
                  </div>
                  <div>
                    <strong>증상 강도:</strong>{' '}
                    <span className="text-[#BA1A1A] font-bold">
                      VAS {booking.vas}단계 ({booking.duration})
                    </span>
                  </div>
                </div>
              </div>

              {/* MRI Pre-examination Preparation Notice */}
              <div className="p-3.5 rounded-xl bg-[#D5E0F8]/40 border border-[#D5E0F8] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#586377]">
                  <span className="material-symbols-outlined text-[18px]">announcement</span>
                  <span>당일 1.5T MRI 검사 준비사항 안내</span>
                </div>
                <ul className="text-[#586377] text-xs space-y-1 pl-4 list-disc leading-relaxed">
                  <li>척추/복부 인접 부위 정밀검사 시 검사 3시간 전 금식을 권장합니다.</li>
                  <li>인공 심장 박동기, 뇌동맥류 클립 등 금속성 체내 삽입물이 있는 경우 문진 시 미리 알려주십시오.</li>
                  <li>타 병원 영상 자료(CD 또는 판독지)를 지참하시면 중복 검사 없이 비교 판독해 드립니다.</li>
                </ul>
              </div>
            </div>

            {/* Submit Button & Disclaimer */}
            <div className="pt-5 mt-4 border-t border-[#EFEEEB]">
              <p className="text-[11px] text-stone-500 text-center mb-3">※ 본 화면은 포트폴리오용 시뮬레이션으로 실제 예약이나 개인정보가 외부로 전송되지 않습니다.</p>
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#00652C] hover:bg-[#15803D] text-white text-sm lg:text-base font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,101,44,0.25)] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>당일 진료·MRI Fast-Track 예약 신청 (시뮬레이션)</span>
              </button>
              <p className="text-[11px] text-[#6F7A6E] text-center mt-2 leading-tight">
                ※ 본 화면은 포트폴리오용 시뮬레이션으로 실제 전송되거나 예약이 접수되지 않습니다.
              </p>
            </div>
          </div>
        </form>
      </div>

      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="seoul-barun-orthopedics"
        featureName="당일 1.5T MRI 및 비수술 척추관절 진료 예약"
        kind="sample"
        industry="corporate"
      />
    </section>
  );
};
