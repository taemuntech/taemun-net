import SampleNotice from '@/components/demo-kit/SampleNotice';
import React, { useState, useEffect } from 'react';
import { ReservationPayload, HUDParameters } from '../types';

interface ReservationSectionProps {
  selectedDoctorId?: string;
  prefilledNotes?: string;
  appliedHUDParams?: HUDParameters | null;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  selectedDoctorId,
  prefilledNotes,
  appliedHUDParams
}) => {
  const [interests, setInterests] = useState<string[]>(['eye']);
  const [doctorId, setDoctorId] = useState<string>('any');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(true);
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);

  useEffect(() => {
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId);
    }
  }, [selectedDoctorId]);

  useEffect(() => {
    if (prefilledNotes) {
      setNotes(prev => (prev ? `${prev}\n\n${prefilledNotes}` : prefilledNotes));
    }
  }, [prefilledNotes]);

  useEffect(() => {
    // Set default date to tomorrow or 3 days later
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const dateStr = d.toISOString().split('T')[0];
    setPreferredDate(dateStr);
  }, []);

  const toggleInterest = (val: string) => {
    setInterests(prev =>
      prev.includes(val) ? prev.filter(item => item !== val) : [...prev, val]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }
    if (!privacyAgreed) {
      alert('개인정보 수집 및 안심 상담 목적 이용에 동의해 주세요.');
      return;
    }
    setSampleNoticeOpen(true);
  };

  const getDoctorName = (id: string) => {
    if (id === 'kang') return '강민우 대표원장 (안면성형/코·눈)';
    if (id === 'yoon') return '윤서아 원장 (눈재수술/동안리프팅)';
    return '진료 과목에 맞춘 원장 추천 배정';
  };

  const getInterestLabels = (items: string[]) => {
    const map: Record<string, string> = {
      eye: '자연유착 눈',
      nose: '자가연골 코',
      lift: 'SMAS 리프팅',
      contour: '안면윤곽',
      petit: '스킨부스터/쁘띠'
    };
    return items.map(k => map[k] || k).join(', ');
  };

  return (
    <section className="w-full py-20 bg-[#f7f3ef] relative" id="vip-inquiry">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-3xl p-8 lg:p-12 shadow-[0_16px_50px_rgba(114,91,56,0.1)] border border-[#d1c5b8]/30">
          <div className="text-center max-w-xl mx-auto mb-10 flex flex-col items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
              1:1 PRIVATE RESERVATION
            </span>
            <h2 className="font-serif text-[28px] lg:text-[32px] text-[#1c1c19]">
              VIP 프라이빗 시크릿 상담 예약
            </h2>
            <p className="text-[13px] text-[#4d463c]">
              모든 상담은 독립된 VIP 룸에서 사전 예약제로만 운영되며, 개인정보는 철저히 암호화 보호됩니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Category Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-[15px] font-semibold text-[#1c1c19]">
                  상담 희망 부위 (중복 선택 가능)
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { id: 'eye', label: '자연유착 눈' },
                    { id: 'nose', label: '자가연골 코' },
                    { id: 'lift', label: 'SMAS 리프팅' },
                    { id: 'contour', label: '안면윤곽' },
                    { id: 'petit', label: '스킨부스터/쁘띠' }
                  ].map(item => (
                    <label
                      key={item.id}
                      className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors border ${
                        interests.includes(item.id)
                          ? 'bg-[#c5a880]/15 border-[#c5a880] text-[#1c1c19]'
                          : 'bg-[#f1ede9] border-transparent text-[#4d463c] hover:bg-[#ebe7e4]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={interests.includes(item.id)}
                        onChange={() => toggleInterest(item.id)}
                        className="accent-[#725b38] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-[13px] font-medium">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Doctor Selector & Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-semibold text-[#1c1c19]">
                    전담 희망 집도의
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="p-3.5 rounded-xl bg-[#f1ede9] text-[#1c1c19] text-[13px] outline-none focus:bg-[#ebe7e4] transition-colors border border-transparent focus:border-[#c5a880]"
                  >
                    <option value="any">진료 과목에 맞춘 원장 추천 배정</option>
                    <option value="kang">강민우 대표원장 (안면성형/코·눈)</option>
                    <option value="yoon">윤서아 원장 (눈재수술/동안리프팅)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-semibold text-[#1c1c19]">
                    희망 예약 일정
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="p-3.5 rounded-xl bg-[#f1ede9] text-[#1c1c19] text-[13px] outline-none focus:bg-[#ebe7e4] transition-colors border border-transparent focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-semibold text-[#1c1c19]">
                    성함
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3.5 rounded-xl bg-[#f1ede9] text-[#1c1c19] text-[13px] outline-none focus:bg-[#ebe7e4] transition-colors border border-transparent focus:border-[#c5a880]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[15px] font-semibold text-[#1c1c19]">
                    연락처 (안심 알림톡 발송)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3.5 rounded-xl bg-[#f1ede9] text-[#1c1c19] text-[13px] outline-none focus:bg-[#ebe7e4] transition-colors border border-transparent focus:border-[#c5a880]"
                  />
                </div>
              </div>

              {/* Extra note */}
              <div className="flex flex-col gap-2">
                <label className="text-[15px] font-semibold text-[#1c1c19]">
                  기타 문의사항 또는 이전 수술 이력
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="재수술 여부, 특별한 알레르기나 희망하시는 시간대를 자유롭게 적어주세요."
                  className="p-3.5 rounded-xl bg-[#f1ede9] text-[#1c1c19] text-[13px] outline-none focus:bg-[#ebe7e4] transition-colors resize-none border border-transparent focus:border-[#c5a880]"
                ></textarea>
              </div>

              {/* Privacy agreement */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="privacy-chk"
                  required
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="accent-[#725b38] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="privacy-chk" className="text-[13px] text-[#4d463c] cursor-pointer">
                  개인정보 수집 및 프라이빗 안심 상담 안내 목적 이용에 동의합니다. (제3자 제공 일체 없음)
                </label>
              </div>

              {/* Submit Button */}
              <p className="text-xs text-[#725b38] text-center mb-3">샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.</p>
              <button type="submit"
                className="mt-2 w-full py-4 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[15px] font-semibold hover:bg-[#2E2A27] transition-all shadow-[0_8px_24px_rgba(114,91,56,0.18)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#fedeb2] text-[20px]">lock</span>
                <span>1:1 VIP 시크릿 상담 신청하기</span>
              </button>

              <div className="text-center text-[12px] text-[#4d463c]">
                전화 문의: <a href="tel:02-0000-0000" className="text-[#725b38] font-bold hover:underline">02-0000-0000</a> (상담직통 10:00 ~ 19:00)
              </div>
            </form>
        </div>
      </div>
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="onsaemiro-plastic-surgery"
        featureName="VIP 프라이빗 시크릿 상담 예약"
        kind="sample"
        industry="corporate"
      />
    </section>
  );
};
