import SampleNotice from '@/components/demo-kit/SampleNotice';
import React, { useState } from 'react';
import { Check, Cpu, CheckCircle2, Ticket } from 'lucide-react';
import { BookingFormData } from '../types';

export const AuditBookingSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    candidateName: '',
    phone: '',
    targetExam: 'snu',
    currentRecord: '',
    labLocation: 'daechi',
    slotDateTime: '',
    consent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [bookingTicket, setBookingTicket] = useState<{
    id: string;
    name: string;
    target: string;
    center: string;
    dateTime: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.candidateName || !formData.phone || !formData.consent) return;

    const ticketId = `PINNACLE-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetsMap: Record<string, string> = {
      snu: 'S대 사범대학 체육교육과 (예시)',
      korea: 'K대 체육교육과 (예시)',
      yonsei: 'Y대 스포츠응용산업학과 (예시)',
      knsu: '국립체육대학교 특수실기전형 (예시)',
      police: '경찰대학 / 경찰간부후보생 실기',
      fire: '중앙소방학교 구조대 / 소방특채',
      coast: '해양경찰 특공대 실기평가',
      other: '기타 체육대학 수시/정시',
    };
    const centersMap: Record<string, string> = {
      daechi: '강남 대치 체대입시 연구센터 (본원)',
      noryangjin: '노량진 공무원 텔레메트리 랩 (소방/경찰)',
    };

    setBookingTicket({
      id: ticketId,
      name: formData.candidateName,
      target: targetsMap[formData.targetExam] || formData.targetExam,
      center: centersMap[formData.labLocation] || formData.labLocation,
      dateTime: formData.slotDateTime || '2026-09-20 14:00 (배정 대기중)',
    });
    setIsSubmitted(true);
    setIsNoticeOpen(true);
  };

  return (
    <>
      {isNoticeOpen && (
        <SampleNotice
          open={isNoticeOpen}
          onClose={() => setIsNoticeOpen(false)}
          slug="pinnacle-athletic-lab"
          industry="corporate"
          featureName="1,000Hz 센서베이 체육 실기 정밀 진단 예약"
        />
      )}
      <section id="admissions-diagnostic"
      className="w-full bg-[#0e0e0e] py-10 lg:py-16 border-b border-[#201f1f]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Info Box (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#1c1b1b] p-6 lg:p-8 border border-[#2a2a2a] shadow-[2px_2px_0px_#000000]">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 bg-[#ff5625] animate-pulse"></span>
                <span className="font-telemetry text-[11px] text-[#ff5625] uppercase font-bold tracking-wider">
                  RESERVATION DISPATCH // LIVE
                </span>
              </div>

              <h2 className="font-sans text-[26px] lg:text-[32px] font-bold text-[#ffffff] uppercase tracking-tight mb-2">
                1:1 센서 정밀
                <br />
                실기 진단평가 신청
              </h2>

              <p className="font-sans text-[14px] text-[#9e9b9a] mb-6 leading-relaxed">
                단 60분의 진단으로 당신의 무릎 각도 1도, 발목 토크 10Nm의 결함을 찾아내어 즉각 5~15점을 상승시키는 1:1 풀센서 바이오메카닉스 리포트를 제공합니다.
              </p>

              {/* Status Box */}
              <div className="p-4 bg-[#0e0e0e] border border-[#2a2a2a] mb-6 shadow-[1px_1px_0px_#000000]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-telemetry text-[11px] text-[#c3f400] font-bold uppercase">
                    TODAY'S SENSOR LAB QUOTA
                  </span>
                  <span className="font-telemetry text-[14px] text-[#c3f400] font-bold">
                    3 / 12 SLOTS
                  </span>
                </div>
                <div className="w-full bg-[#2a2a2a] h-2">
                  <div className="bg-[#c3f400] h-full w-[25%]"></div>
                </div>
                <span className="font-sans text-[11px] text-[#9e9b9a] mt-2 block">
                  ※ 정밀 계측 장비 캘리브레이션을 위해 일일 최대 12명으로 측정이 제한됩니다.
                </span>
              </div>

              {/* Included Diagnostic Modules */}
              <div className="flex flex-col gap-2.5 text-[#e5e2e1] font-sans text-[13px]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5625] shrink-0" />
                  <span>1,000Hz Kistler 포스플레이트 지면반력 측정 리포트</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5625] shrink-0" />
                  <span>3D 고속 관절 궤적 및 도약각 바이오메카닉스 분석지</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#ff5625] shrink-0" />
                  <span>전국 체육대학 및 경찰·소방 특채 실시간 환산점수표 발급</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2a2a2a] mt-8">
              <span className="font-telemetry text-[10px] text-[#9e9b9a] block">
                DIRECT HOTLINE:
              </span>
              <span className="font-sans text-[17px] text-[#ffffff] font-bold tracking-tight">
                02-0000-0000 (대치 본원 실기 관제실 (예시))
              </span>
            </div>
          </div>

          {/* Right Interactive Intake Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#1c1b1b] p-6 lg:p-8 border border-[#2a2a2a] shadow-[2px_2px_0px_#000000]">
            {isSubmitted && bookingTicket ? (
              <div className="flex flex-col gap-6 py-4">
                <div className="p-4 bg-[#c3f400] text-[#161e00] font-telemetry text-[14px] font-bold flex items-center gap-2 shadow-[2px_2px_0px_#000000]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>[AUDIT SIMULATION] 포트폴리오 가상 진단 티켓이 발급되었습니다 (실제 예약되지 않음).</span>
                </div>

                {/* Spec-Grade Reservation Ticket Card */}
                <div className="bg-[#0e0e0e] border-2 border-[#c3f400] p-6 flex flex-col gap-4 relative">
                  <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-3">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-[#c3f400]" />
                      <span className="font-telemetry text-[12px] text-[#ffffff] font-bold">
                        BIOMECHANICS AUDIT PASS // SPEC TICKET
                      </span>
                    </div>
                    <span className="font-telemetry text-[12px] text-[#ff5625] font-bold">
                      {bookingTicket.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-sans">
                    <div>
                      <span className="text-[11px] text-[#9e9b9a] block">지원자 성명</span>
                      <span className="text-[16px] text-[#ffffff] font-bold">
                        {bookingTicket.name} 님
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#9e9b9a] block">목표 전형</span>
                      <span className="text-[14px] text-[#c3f400] font-bold">
                        {bookingTicket.target}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#9e9b9a] block">진단 연구센터</span>
                      <span className="text-[14px] text-[#ffffff]">
                        {bookingTicket.center}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-[#9e9b9a] block">배정 일시</span>
                      <span className="text-[14px] text-[#ffb5a0] font-telemetry font-bold">
                        {bookingTicket.dateTime}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#2a2a2a] text-[12px] text-[#9e9b9a]">
                    ※ 담당 수석 코치가 15분 이내로 사전 준비사항(운동복, 신발 센서 장착 가이드)을 유선 안내드립니다.
                  </div>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="self-start px-4 py-2 bg-[#2a2a2a] hover:bg-[#353534] text-[#ffffff] font-telemetry text-[12px] uppercase font-bold border border-[#353534] transition-colors cursor-pointer"
                >
                  + 새 진단평가 추가 예약
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="font-telemetry text-[11px] text-[#9e9b9a] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff5625]"></span>
                      01. 지원자 성명 (CANDIDATE NAME)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={formData.candidateName}
                      onChange={(e) =>
                        setFormData({ ...formData, candidateName: e.target.value })
                      }
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#c3f400] transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1">
                    <label className="font-telemetry text-[11px] text-[#9e9b9a] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff5625]"></span>
                      02. 비상 연락처 (MOBILE PHONE)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#c3f400] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Target Exam Category */}
                  <div className="flex flex-col gap-1">
                    <label className="font-telemetry text-[11px] text-[#9e9b9a] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff5625]"></span>
                      03. 목표 대학 / 채용 시험 (TARGET)
                    </label>
                    <select
                      value={formData.targetExam}
                      onChange={(e) =>
                        setFormData({ ...formData, targetExam: e.target.value })
                      }
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#c3f400] transition-colors cursor-pointer"
                    >
                      <option value="snu">S대 사범대학 체육교육과 (예시)</option>
                      <option value="korea">K대 체육교육과 (예시)</option>
                      <option value="yonsei">Y대 스포츠응용산업학과 (예시)</option>
                      <option value="knsu">국립체육대학교 특수실기전형 (예시)</option>
                      <option value="police">경찰대학 / 경찰간부후보생 실기</option>
                      <option value="fire">중앙소방학교 구조대 / 소방특채</option>
                      <option value="coast">해양경찰 특공대 실기평가</option>
                      <option value="other">기타 체육대학 수시/정시</option>
                    </select>
                  </div>

                  {/* Current Self Record */}
                  <div className="flex flex-col gap-1">
                    <label className="font-telemetry text-[11px] text-[#9e9b9a] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff5625]"></span>
                      04. 현재 본인 추정 기록 (제멀/100m/악력)
                    </label>
                    <input
                      type="text"
                      placeholder="예: 제멀 275cm / 악력 62kg"
                      value={formData.currentRecord}
                      onChange={(e) =>
                        setFormData({ ...formData, currentRecord: e.target.value })
                      }
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#c3f400] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Campus Choice */}
                  <div className="flex flex-col gap-1">
                    <label className="font-telemetry text-[11px] text-[#9e9b9a] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff5625]"></span>
                      05. 진단 희망 센터 (LAB SELECTION)
                    </label>
                    <select
                      value={formData.labLocation}
                      onChange={(e) =>
                        setFormData({ ...formData, labLocation: e.target.value })
                      }
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#c3f400] transition-colors cursor-pointer"
                    >
                      <option value="daechi">강남 대치 체대입시 연구센터 (본원)</option>
                      <option value="noryangjin">
                        노량진 공무원 텔레메트리 랩 (소방/경찰)
                      </option>
                    </select>
                  </div>

                  {/* Desired Date & Time */}
                  <div className="flex flex-col gap-1">
                    <label className="font-telemetry text-[11px] text-[#9e9b9a] uppercase font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#ff5625]"></span>
                      06. 진단 희망 일시 (PREFERRED SLOT)
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.slotDateTime}
                      onChange={(e) =>
                        setFormData({ ...formData, slotDateTime: e.target.value })
                      }
                      className="w-full bg-[#0e0e0e] border border-[#2a2a2a] p-3 text-[#ffffff] font-sans text-[14px] focus:outline-none focus:border-[#c3f400] transition-colors"
                    />
                  </div>
                </div>

                {/* Notice disclaimer check */}
                <div className="flex items-start gap-2.5 mt-2">
                  <input
                    id="consent-check"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) =>
                      setFormData({ ...formData, consent: e.target.checked })
                    }
                    className="mt-1 accent-[#ff5625] w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="consent-check"
                    className="font-sans text-[13px] text-[#9e9b9a] leading-tight cursor-pointer"
                  >
                    1,000Hz 키네틱 센서 장비 보호 및 안전 수칙을 준수하며, 계측된 바이오메카닉스 데이터의 익명 학술 연구 활용에 동의합니다.
                  </label>
                </div>

                {/* Submit CTA */}
                <p className="text-[11px] text-[#9e9b9a] text-center font-sans mb-2">※ 본 화면은 포트폴리오 시연용 가상 샘플이며, 입력하신 정보는 실제로 전송되지 않습니다.</p>
              <button type="submit"
                  className="w-full py-4 bg-[#ff5625] hover:bg-[#ff7147] active:translate-y-0.5 text-[#541100] font-sans text-[16px] font-bold uppercase tracking-tight shadow-[2px_2px_0px_#000000] flex items-center justify-center gap-2 transition-colors mt-2 cursor-pointer"
                >
                  <Cpu className="w-5 h-5" />
                  1:1 정밀 센서 바이오메카닉스 진단 예약 (CONFIRM AUDIT)
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};
