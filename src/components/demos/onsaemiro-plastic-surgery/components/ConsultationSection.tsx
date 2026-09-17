import React, { useState } from 'react';
import { Sparkles, Lock, ShieldCheck, Check, Calendar, Phone, Send } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ProcedureCategory } from '../types';

export const ConsultationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ProcedureCategory[]>(['eye']);
  const [contactMethod, setContactMethod] = useState<'kakao' | 'call'>('kakao');
  const [message, setMessage] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(true);

  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const toggleCategory = (cat: ProcedureCategory) => {
    if (selectedCategories.includes(cat)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== cat));
      }
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = `OS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingCode(generatedCode);
    setSampleNoticeOpen(true);
  };

  const categories = [
    { id: 'eye' as ProcedureCategory, label: '눈성형 (쌍꺼풀·눈매교정)' },
    { id: 'nose' as ProcedureCategory, label: '코성형 (자가연골·직반버선)' },
    { id: 'lifting' as ProcedureCategory, label: '리프팅 (SMAS 안면거상)' },
    { id: 'contour' as ProcedureCategory, label: '안면윤곽 (광대·턱끝)' },
    { id: 'petit' as ProcedureCategory, label: '쁘띠 (보톡스·필러·스킨부스터)' },
  ];

  return (
    <section id="consultation" className="py-20 lg:py-28 bg-[#FAF6F2] text-[#1A1817]">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDD4] text-[#8C6D4F] text-[12px] font-semibold mb-3">
            <Lock className="w-3 h-3 text-[#B08968]" />
            <span>프라이빗 1:1 비밀상담</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-[#1A1817] leading-tight mb-4">
            나만을 위한 조화로운 선,<br />
            <span className="text-[#8C6D4F]">비공개 사전 문진 및 맞춤 상담</span>
          </h2>
          <p className="text-[15px] text-[#68625D] leading-relaxed">
            고민 부위와 희망 일정을 남겨주시면 전담 상담 실장이 1:1 비공개로 친절히 안내해 드립니다.<br />
            개인정보는 암호화되어 안전하게 보호됩니다.
          </p>
        </div>

        {/* Consultation Form Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-12 border border-[#E8DDD4] shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Procedure Category Selection */}
            <div>
              <label className="block text-[14px] font-bold text-[#1A1817] mb-3">
                관심 상담 부위 <span className="text-[#8C6D4F] text-[12px] font-normal">(중복 선택 가능)</span>
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
                {categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`p-3 rounded-xl border text-[13px] font-medium transition-all text-left flex items-center justify-between ${
                        isChecked
                          ? 'border-[#8C6D4F] bg-[#FAF6F2] text-[#8C6D4F] font-bold shadow-sm'
                          : 'border-[#E8DDD4] bg-white text-[#68625D] hover:bg-[#FAF6F2]/50'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isChecked && <Check className="w-4 h-4 text-[#8C6D4F]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#1A1817] mb-2">
                  성함 (실명) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김온새"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD4] focus:outline-none focus:border-[#8C6D4F] text-[14px] bg-[#FAF6F2]/30"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1A1817] mb-2">
                  연락처 (휴대전화) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD4] focus:outline-none focus:border-[#8C6D4F] text-[14px] bg-[#FAF6F2]/30"
                />
              </div>
            </div>

            {/* Preferred Date & Contact Method */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-[13px] font-bold text-[#1A1817] mb-2">
                  상담 희망 일자
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8DDD4] focus:outline-none focus:border-[#8C6D4F] text-[14px] bg-[#FAF6F2]/30"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#1A1817] mb-2">
                  선호 연락 방식
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setContactMethod('kakao')}
                    className={`py-3 rounded-xl border text-[13px] font-medium transition-all ${
                      contactMethod === 'kakao'
                        ? 'border-[#8C6D4F] bg-[#FAF6F2] text-[#8C6D4F] font-bold'
                        : 'border-[#E8DDD4] text-[#68625D]'
                    }`}
                  >
                    카카오톡 비밀 상담
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactMethod('call')}
                    className={`py-3 rounded-xl border text-[13px] font-medium transition-all ${
                      contactMethod === 'call'
                        ? 'border-[#8C6D4F] bg-[#FAF6F2] text-[#8C6D4F] font-bold'
                        : 'border-[#E8DDD4] text-[#68625D]'
                    }`}
                  >
                    전화 안심 상담
                  </button>
                </div>
              </div>
            </div>

            {/* Message / Symptoms */}
            <div>
              <label className="block text-[13px] font-bold text-[#1A1817] mb-2">
                상담 희망 내용 및 기존 수술 여부 <span className="text-[#8C857D] font-normal">(선택)</span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="과거 수술 이력(재수술 여부)이나 원하시는 라인 등 궁금하신 점을 자유롭게 적어주세요."
                className="w-full px-4 py-3 rounded-xl border border-[#E8DDD4] focus:outline-none focus:border-[#8C6D4F] text-[14px] bg-[#FAF6F2]/30 resize-none"
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="agree"
                checked={agreePrivacy}
                onChange={(e) => setAgreePrivacy(e.target.checked)}
                className="mt-1 rounded border-[#E8DDD4] text-[#8C6D4F] focus:ring-[#8C6D4F]"
              />
              <label htmlFor="agree" className="text-[12px] text-[#68625D] leading-snug cursor-pointer">
                개인정보 수집 및 이용에 동의합니다. (상담 진행 및 예약 안내 목적 외에 일절 사용되지 않으며 암호화 보관됩니다)
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!agreePrivacy}
              className="w-full py-4 rounded-2xl text-[16px] font-bold text-white bg-[#1A1817] hover:bg-[#2E2A27] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-[#C5A880]" />
              <span>프라이빗 1:1 맞춤 상담 신청하기</span>
            </button>
          </form>
        </div>
      </div>

      {/* SampleNotice Modal Integration */}
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="onsaemiro-plastic-surgery"
        featureName="비공개 1:1 맞춤 상담 신청"
        kind="sample"
        industry="corporate"
      />
    </section>
  );
};
