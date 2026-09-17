'use client';

import React, { useState } from 'react';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EvaluationModal({ isOpen, onClose }: EvaluationModalProps) {
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetUniv, setTargetUniv] = useState('서울대 디자인학부 (예시)');
  const [grade, setGrade] = useState('고3 / N수');
  const [experience, setExperience] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#1A1D24] border border-[#2A303C] rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#12141A] border border-[#2A303C] text-[#94A3B8] hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px]"
          aria-label="닫기"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#1E293B] border border-[#38BDF8] text-[#38BDF8] text-3xl flex items-center justify-center mx-auto mb-4 font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              실기 평가 신청이 접수되었습니다
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
              남겨주신 연락처로 전임 실기 원장단이 1:1 포트폴리오 지참 일정 및 모의 실기 평가실 배정 안내를 드리겠습니다. (본 화면은 가상 샘플 데모로 실제 전송되지 않습니다)
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-semibold text-xs hover:brightness-110 min-h-[44px]"
            >
              확인
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block mb-1">
                Diagnostic Portfolio Evaluation
              </span>
              <h3 className="text-xl lg:text-2xl font-serif font-bold text-white">
                1:1 모의 실기 평가 & 포트폴리오 진단
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                현재 실기 수준과 목표 대학별 합격선 간의 차이를 정밀 데이터로 진단해 드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                  학생 성함 <span className="text-[#38BDF8]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 이서준 학생"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                  연락처 <span className="text-[#38BDF8]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                    목표 지망 대학
                  </label>
                  <select
                    value={targetUniv}
                    onChange={(e) => setTargetUniv(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="서울대 디자인학부 (예시)">서울대 디자인학부 (예시)</option>
                    <option value="국민대 조형대학 (예시)">국민대 조형대학 (예시)</option>
                    <option value="홍익대 미술우수자 (예시)">홍익대 미술우수자 (예시)</option>
                    <option value="한예종 조형예술과 (예시)">한예종 조형예술과 (예시)</option>
                    <option value="기타 주요 미대">기타 주요 미대</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                    현재 학년
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white focus:outline-none focus:border-[#38BDF8]"
                  >
                    <option value="고1">고등학교 1학년</option>
                    <option value="고2">고등학교 2학년</option>
                    <option value="고3 / N수">고등학교 3학년 / N수</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                  실기 경력 및 주요 관심 분야
                </label>
                <textarea
                  rows={3}
                  placeholder="미술 실기 시작 시기(예: 1년차, 기초소양 등) 또는 평소 자신 있는 표현 기법을 적어주십시오."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-semibold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg"
                >
                  모의 실기 심사 신청하기
                </button>
              </div>

              <p className="text-[11px] text-[#64748B] text-center">
                ※ 신청하신 정보는 1:1 실기 심사 배정 및 입시 로드맵 상담 용도로만 활용됩니다.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
