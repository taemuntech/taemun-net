"use client";

import React, { useState } from 'react';
import { Send, Phone, Lock, CheckCircle2, Copy, Check } from 'lucide-react';
import { ConsultationFormData } from '../types';

interface ConsultationFormProps {
  currentLang: 'KR' | 'EN';
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ currentLang }) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    company: '',
    personName: '',
    phone: '',
    email: '',
    divisions: ['장비사업부 (FA설비)'],
    timeline: '즉시 협의 (1개월 이내)',
    requirements: '',
    agreedPrivacy: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [copiedPhone, setCopiedPhone] = useState(false);

  const toggleDivision = (division: string) => {
    if (formData.divisions.includes(division)) {
      if (formData.divisions.length > 1) {
        setFormData({
          ...formData,
          divisions: formData.divisions.filter((d) => d !== division),
        });
      }
    } else {
      setFormData({
        ...formData,
        divisions: [...formData.divisions, division],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedPrivacy) {
      alert(currentLang === 'KR' ? '개인정보 수집 및 이용 약관에 동의해 주세요.' : 'Please accept the privacy terms.');
      return;
    }

    const generatedRef = `HY-${new Date().getFullYear()}${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRefNumber(generatedRef);
    setSubmitted(true);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('031-434-7300');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section className="py-24 bg-white" id="consultation">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#faf8ff] rounded-2xl border border-[#c3c6d6]/40 p-8 lg:p-12 shadow-sm">
          {/* Header */}
          <div className="text-center space-y-2 mb-10">
            <span className="font-mono text-[11px] text-[#003d9b] font-semibold uppercase tracking-widest">
              ENGINEERING CONSULTATION &amp; QUOTE
            </span>
            <h2 className="text-[28px] lg:text-[34px] font-bold text-[#131b2e] tracking-tight">
              {currentLang === 'KR' ? '프로젝트 견적 및 기술 미팅 문의' : 'Project Consultation & Quote Inquiry'}
            </h2>
            <p className="text-[15px] text-[#434654] max-w-xl mx-auto leading-relaxed">
              {currentLang === 'KR'
                ? '설비 사양, 라인 증설, 특수가스 배관 개선 등 한양시스템 엔지니어링 전문가가 24시간 이내에 직접 답변드립니다.'
                : 'From custom FA rigs to UHP piping upgrades, our senior semiconductor engineers reply within 24 hours.'}
            </p>
          </div>

          {submitted ? (
            <div className="bg-white p-8 rounded-xl border border-[#0052cc]/30 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-[#e2e7ff] text-[#003d9b] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#0052cc]" />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-[#131b2e]">
                  {currentLang === 'KR' ? '기술 문의가 정상적으로 접수되었습니다' : 'Inquiry Successfully Submitted'}
                </h3>
                <p className="text-[14px] text-[#434654] mt-2">
                  {currentLang === 'KR' ? (
                    <>
                      접수번호: <strong className="font-mono text-[#0052cc]">{refNumber}</strong>
                      <br />
                      엔지니어링 기술팀에서 검토 후 기재해주신 연락처로 24시간 내 연락드리겠습니다.
                    </>
                  ) : (
                    <>
                      Reference No: <strong className="font-mono text-[#0052cc]">{refNumber}</strong>
                      <br />
                      Our engineering division will review your specs and contact you within 24 hours.
                    </>
                  )}
                </p>
              </div>

              <div className="p-4 bg-[#f2f3ff] rounded-lg text-left text-[13px] text-[#434654] max-w-md mx-auto space-y-1">
                <div><strong>{currentLang === 'KR' ? '회사명:' : 'Company:'}</strong> {formData.company}</div>
                <div><strong>{currentLang === 'KR' ? '담당자:' : 'Contact:'}</strong> {formData.personName}</div>
                <div><strong>{currentLang === 'KR' ? '부문:' : 'Divisions:'}</strong> {formData.divisions.join(', ')}</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    company: '',
                    personName: '',
                    phone: '',
                    email: '',
                    divisions: ['장비사업부 (FA설비)'],
                    timeline: '즉시 협의 (1개월 이내)',
                    requirements: '',
                    agreedPrivacy: false,
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0052cc] text-white rounded-lg text-[14px] font-semibold hover:bg-[#003d9b] transition-colors cursor-pointer"
              >
                {currentLang === 'KR' ? '추가 문의 접수하기' : 'Submit Another Request'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#131b2e]">
                    {currentLang === 'KR' ? '회사명 (Company)' : 'Company Name'} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={currentLang === 'KR' ? '예: 한양세미콘㈜' : 'e.g., Hanyang Semi Corp'}
                    className="w-full px-4 py-3 rounded-lg border border-[#c3c6d6]/60 bg-white text-[#131b2e] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 text-[14px] outline-hidden transition-all"
                  />
                </div>

                {/* Person Name */}
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#131b2e]">
                    {currentLang === 'KR' ? '담당자명 / 직함' : 'Contact Name / Title'} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personName}
                    onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                    placeholder={currentLang === 'KR' ? '예: 홍길동 팀장' : 'e.g., John Doe, Team Lead'}
                    className="w-full px-4 py-3 rounded-lg border border-[#c3c6d6]/60 bg-white text-[#131b2e] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 text-[14px] outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#131b2e]">
                    {currentLang === 'KR' ? '연락처' : 'Phone Number'} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={currentLang === 'KR' ? '예: 010-0000-0000' : 'e.g., +82-10-0000-0000'}
                    className="w-full px-4 py-3 rounded-lg border border-[#c3c6d6]/60 bg-white text-[#131b2e] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 text-[14px] outline-hidden transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-[14px] font-medium text-[#131b2e]">
                    {currentLang === 'KR' ? '이메일 주소' : 'Business Email'} <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={currentLang === 'KR' ? '예: engineer@company.com' : 'e.g., engineer@company.com'}
                    className="w-full px-4 py-3 rounded-lg border border-[#c3c6d6]/60 bg-white text-[#131b2e] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 text-[14px] outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Business Division Interest */}
              <div className="space-y-1.5">
                <label className="block text-[14px] font-medium text-[#131b2e]">
                  {currentLang === 'KR' ? '관심 사업 부문 (복수 선택 가능)' : 'Business Division of Interest'} <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {[
                    { id: '장비사업부 (FA설비)', label: currentLang === 'KR' ? '장비사업부 (FA설비)' : 'Equipment (FA)' },
                    { id: '가스사업부 (특수가스)', label: currentLang === 'KR' ? '가스사업부 (특수가스)' : 'Gas Delivery (UHP)' },
                    { id: '정보사업부 (제어S/W)', label: currentLang === 'KR' ? '정보사업부 (제어S/W)' : 'Smart S/W (SCADA)' },
                  ].map((div) => {
                    const isChecked = formData.divisions.includes(div.id);
                    return (
                      <label
                        key={div.id}
                        className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#eaedff] border-[#0052cc] text-[#003d9b] font-medium'
                            : 'bg-white border-[#c3c6d6]/50 text-[#131b2e] hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleDivision(div.id)}
                          className="rounded text-[#0052cc] focus:ring-[#0052cc] cursor-pointer"
                        />
                        <span className="text-[14px]">{div.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-1.5">
                <label className="block text-[14px] font-medium text-[#131b2e]">
                  {currentLang === 'KR' ? '예상 설비 도입 시기' : 'Target Schedule'}
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#c3c6d6]/60 bg-white text-[#131b2e] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 text-[14px] outline-hidden transition-all cursor-pointer"
                >
                  <option value="즉시 협의 (1개월 이내)">{currentLang === 'KR' ? '즉시 협의 (1개월 이내)' : 'Immediate (Within 1 month)'}</option>
                  <option value="단기 프로젝트 (3개월 이내)">{currentLang === 'KR' ? '단기 프로젝트 (3개월 이내)' : 'Short-term (Within 3 months)'}</option>
                  <option value="중장기 라인 구축 (6개월 ~ 1년 이내)">{currentLang === 'KR' ? '중장기 라인 구축 (6개월 ~ 1년 이내)' : 'Mid/Long-term (6-12 months)'}</option>
                  <option value="기술 사양 검토 및 예산 산출 단계">{currentLang === 'KR' ? '기술 사양 검토 및 예산 산출 단계' : 'Budget & Tech Spec Exploration'}</option>
                </select>
              </div>

              {/* Requirements Text */}
              <div className="space-y-1.5">
                <label className="block text-[14px] font-medium text-[#131b2e]">
                  {currentLang === 'KR' ? '기술 문의 및 프로젝트 상세 요건' : 'Technical Requirements & Inquiry Details'}
                </label>
                <textarea
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder={
                    currentLang === 'KR'
                      ? '공정 요건, 취급 가스 종류, 클린룸 Class 규격, 목표 가동 환경 등을 입력해주시면 더욱 신속한 견적 산출이 가능합니다.'
                      : 'Provide process requirements, gas types, cleanroom class ratings, or target operating parameters.'
                  }
                  className="w-full px-4 py-3 rounded-lg border border-[#c3c6d6]/60 bg-white text-[#131b2e] focus:border-[#0052cc] focus:ring-2 focus:ring-[#0052cc]/20 text-[14px] outline-hidden transition-all resize-none"
                />
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  checked={formData.agreedPrivacy}
                  onChange={(e) => setFormData({ ...formData, agreedPrivacy: e.target.checked })}
                  className="rounded text-[#0052cc] focus:ring-[#0052cc] cursor-pointer"
                />
                <label htmlFor="privacy" className="text-[13px] text-[#434654] cursor-pointer">
                  {currentLang === 'KR'
                    ? '개인정보 수집 및 기술 상담 목적의 이용 약관에 동의합니다.'
                    : 'I agree to the collection and processing of personal data for engineering consultation.'}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit-consultation"
                className="w-full py-4 rounded-lg bg-[#0052cc] hover:bg-[#003d9b] text-white text-[15px] font-bold transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{currentLang === 'KR' ? '기술 미팅 및 견적 요청 접수' : 'Submit Consultation & Quote Request'}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* Quick Contact & Security Disclaimer */}
          <div className="mt-8 pt-6 border-t border-[#c3c6d6]/30 flex flex-wrap items-center justify-between text-[#434654] text-[13px] gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003d9b] text-[18px]">call</span>
              <span>
                {currentLang === 'KR' ? '유선 긴급 기술 문의 :' : 'Direct Phone :'}
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="ml-1 text-[#131b2e] font-semibold hover:text-[#0052cc] underline cursor-pointer inline-flex items-center gap-1"
                >
                  031-434-7300
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003d9b] text-[18px]">lock</span>
              <span>
                {currentLang === 'KR'
                  ? '고객사 보안 규정 및 NDA(기밀유지협약) 엄격 준수'
                  : 'Strict adherence to client security protocols & NDA obligations'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
