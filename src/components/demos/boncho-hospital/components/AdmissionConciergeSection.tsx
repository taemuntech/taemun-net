import SampleNotice from '@/components/demo-kit/SampleNotice';
import React, { useState } from 'react';
import { ConciergeBookingForm } from '../types';

interface AdmissionConciergeProps {
  initialRoomType?: 'royal' | 'harmony' | 'undecided';
  initialPurpose?: 'oncology' | 'traffic' | 'rehab' | 'outpatient';
}

export const AdmissionConciergeSection: React.FC<AdmissionConciergeProps> = ({
  initialRoomType = 'royal',
  initialPurpose = 'oncology',
}) => {
  const [formData, setFormData] = useState<ConciergeBookingForm>({
    admissionPurpose: initialPurpose,
    roomType: initialRoomType,
    insuranceType: 'auto',
    patientName: '',
    contactNumber: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    symptoms: '',
    agreePrivacy: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `BC-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(generatedRef);
    setSampleNoticeOpen(true);
    setIsSubmitted(true);
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case 'oncology': return '암면역 집중치료';
      case 'traffic': return '교통사고 입원';
      case 'rehab': return '수술 후 재활';
      case 'outpatient': return '외래 집중 진료';
      default: return purpose;
    }
  };

  const getRoomLabel = (room: string) => {
    switch (room) {
      case 'royal': return '1인실 로열 스위트 (프라이빗 테라스)';
      case 'harmony': return '2인실 하모니 스위트 (독립 방음 칸막이형)';
      default: return '상담 후 의료진 추천에 따라 결정';
    }
  };

  const getInsuranceLabel = (ins: string) => {
    switch (ins) {
      case 'auto': return '자동차보험 (대인접수번호 0원 처리)';
      case 'silson': return '개인 실손의료비 보험';
      default: return '국민건강보험 일반 적용';
    }
  };

  return (
    <section id="admission-concierge" className="w-full bg-[#efeeeb] py-16">
      <div className="max-w-[1100px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-[700px] mx-auto mb-10">
          <span className="text-[12px] text-[#75593c] tracking-widest uppercase font-semibold">
            24/7 Smart Admission Concierge
          </span>
          <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold mt-1">
            실시간 입원실 간편 예약 &amp; 보험 상담
          </h2>
          <p className="text-[15px] text-[#424844] mt-2">
            원하시는 진료 목적과 병실 형태를 선택하시면 24시간 당직 상담간호사가 입원 가능 여부와 예상 비용을 10분 이내 유선 안내해 드립니다.
          </p>
        </div>

        {/* Wizard Form Container */}
        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-xl border border-[#e3e2e0]">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Step 1: 입원 목적 선택 */}
              <div>
                <label className="block text-[16px] font-bold text-[#102a20] mb-3">
                  1. 입원 및 진료 목적을 선택해주세요
                </label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <label className="cursor-pointer">
                    <input
                      checked={formData.admissionPurpose === 'oncology'}
                      onChange={() => setFormData({ ...formData, admissionPurpose: 'oncology' })}
                      className="peer sr-only"
                      name="admission_purpose"
                      type="radio"
                    />
                    <div className="p-4 rounded-xl bg-[#f4f3f0] text-center border-2 border-transparent peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[24px] block mb-1">
                        ecg_heart
                      </span>
                      <span className="text-[14px] font-semibold block">암면역 집중치료</span>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      checked={formData.admissionPurpose === 'traffic'}
                      onChange={() => setFormData({ ...formData, admissionPurpose: 'traffic' })}
                      className="peer sr-only"
                      name="admission_purpose"
                      type="radio"
                    />
                    <div className="p-4 rounded-xl bg-[#f4f3f0] text-center border-2 border-transparent peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[24px] block mb-1">
                        car_crash
                      </span>
                      <span className="text-[14px] font-semibold block">교통사고 입원</span>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      checked={formData.admissionPurpose === 'rehab'}
                      onChange={() => setFormData({ ...formData, admissionPurpose: 'rehab' })}
                      className="peer sr-only"
                      name="admission_purpose"
                      type="radio"
                    />
                    <div className="p-4 rounded-xl bg-[#f4f3f0] text-center border-2 border-transparent peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[24px] block mb-1">
                        accessibility_new
                      </span>
                      <span className="text-[14px] font-semibold block">수술 후 재활</span>
                    </div>
                  </label>

                  <label className="cursor-pointer">
                    <input
                      checked={formData.admissionPurpose === 'outpatient'}
                      onChange={() => setFormData({ ...formData, admissionPurpose: 'outpatient' })}
                      className="peer sr-only"
                      name="admission_purpose"
                      type="radio"
                    />
                    <div className="p-4 rounded-xl bg-[#f4f3f0] text-center border-2 border-transparent peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[24px] block mb-1">
                        stethoscope
                      </span>
                      <span className="text-[14px] font-semibold block">외래 집중 진료</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 2: 병실 유형 & 보험 적용 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-[15px] font-semibold text-[#102a20] mb-2">
                    2. 희망 병실 유형
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) =>
                      setFormData({ ...formData, roomType: e.target.value as any })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                  >
                    <option value="royal">
                      1인실 로열 스위트 (프라이빗 테라스 / 편백 인테리어)
                    </option>
                    <option value="harmony">2인실 하모니 스위트 (독립 방음 칸막이형)</option>
                    <option value="undecided">상담 후 의료진 추천에 따라 결정</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[15px] font-semibold text-[#102a20] mb-2">
                    3. 보험 적용 형태
                  </label>
                  <select
                    value={formData.insuranceType}
                    onChange={(e) =>
                      setFormData({ ...formData, insuranceType: e.target.value as any })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                  >
                    <option value="auto">
                      자동차보험 (대인사고 접수번호 보유 · 본인부담금 0원)
                    </option>
                    <option value="silson">개인 실손의료비 보험 적용 요청</option>
                    <option value="health">국민건강보험 일반 적용</option>
                  </select>
                </div>
              </div>

              {/* Step 3: 예약자 정보 입력 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-[13px] font-medium text-[#424844] mb-1">
                    환자명 / 보호자명 <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                    placeholder="홍길동"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#424844] mb-1">
                    연락처 <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                    placeholder="010-0000-0000"
                    type="tel"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-[#424844] mb-1">
                    희망 입원(내원) 일시 <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                    type="date"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#424844] mb-1">
                  현재 주요 증상 및 요청사항 (선택)
                </label>
                <textarea
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                  placeholder="현재 겪고 계신 질환(예: 유방암 2기 항암 중, 교통사고 후 경추 통증 등)이나 필요하신 케어를 남겨주시면 더욱 정확히 안내해 드립니다."
                  rows={2}
                />
              </div>

              {/* Privacy & Submit */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 bg-[#efeeeb] p-4 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    required
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                    className="w-4 h-4 rounded text-[#102a20] accent-[#102a20]"
                    type="checkbox"
                  />
                  <span className="text-[13px] text-[#424844]">
                    입원 상담을 위한 개인정보 수집 및 안내 메시지 수신에 동의합니다.
                  </span>
                </label>

                <div className="w-full text-center mb-2"><p className="text-[11px] text-stone-500">※ 본 화면은 포트폴리오용 시뮬레이션으로 실제 예약이나 개인정보가 외부로 전송되지 않습니다.</p></div>
                <button
                  className="w-full lg:w-auto px-8 py-3.5 rounded-lg bg-[#102a20] text-white text-[14px] font-semibold shadow-md hover:bg-[#264035] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>입원 상담 시뮬레이션 신청</span>
                </button>
              </div>
            </form>
          ) : (
            /* Dynamic Success Toast & Booking Confirmation */
            <div className="p-6 rounded-xl bg-[#102a20] text-white shadow-lg animate-in fade-in duration-300">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-[#cbe9da] text-[36px] shrink-0">
                  task_alt
                </span>
                <div className="space-y-4 grow">
                  <div>
                    <span className="inline-block bg-[#264035] text-[#cbe9da] px-2.5 py-0.5 rounded text-[11px] font-mono font-bold mb-1">
                      가상 시뮬레이션 코드: {bookingRef}
                    </span>
                    <h4 className="font-serif text-[24px] font-semibold">
                      입원 상담 시뮬레이션 안내 (가상 시연)
                    </h4>
                    <p className="text-[14px] text-[#e9e8e5] mt-1 leading-relaxed">
                      ※ 본 화면은 포트폴리오용 가상 시연으로 실제 메시지 전송이나 진료 예약 접수는 이루어지지 않습니다.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#1a382c] p-4 rounded-lg text-[13px] grid grid-cols-1 lg:grid-cols-3 gap-3 border border-[#264035]">
                    <div>
                      <span className="text-[#8fab9d] block text-[11px]">진료/입원 목적</span>
                      <strong className="text-white font-medium">
                        {getPurposeLabel(formData.admissionPurpose)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#8fab9d] block text-[11px]">선택 병실</span>
                      <strong className="text-white font-medium">
                        {getRoomLabel(formData.roomType)}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#8fab9d] block text-[11px]">희망 일자 / 보험</span>
                      <strong className="text-white font-medium">
                        {formData.preferredDate} ({getInsuranceLabel(formData.insuranceType)})
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-[13px] text-[#cbe9da]">
                      <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                      <span>급한 문의는 24시간 직통 전화(02-0000-0000)로 즉시 연결 가능합니다.</span>
                    </div>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          ...formData,
                          patientName: '',
                          contactNumber: '',
                          symptoms: '',
                        });
                      }}
                      className="px-4 py-2 rounded-lg bg-[#264035] hover:bg-[#324c41] text-[12px] font-semibold text-white transition-colors cursor-pointer"
                    >
                      새로운 상담 접수하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="boncho-hospital"
        featureName="80병상 입원 상담 및 병실 예약"
        kind="sample"
        industry="corporate"
      />
    </section>
  );
};
