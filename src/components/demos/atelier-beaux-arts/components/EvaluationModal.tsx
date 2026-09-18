'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EvaluationModal({ isOpen, onClose }: EvaluationModalProps) {
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetUniv, setTargetUniv] = useState('S대(예시) 디자인학부');
  const [grade, setGrade] = useState('고3 / N수');
  const [experience, setExperience] = useState('');
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!isOpen) return null;

  if (isNoticeOpen) {
    return (
      <SampleNotice
        open
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="atelier-beaux-arts"
        industry="corporate"
        featureName="1:1 실기 심층 평가 예약"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#181B22] border border-[#2A303C] rounded-2xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#202530] border border-[#2A303C] text-zinc-400 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px]"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block mb-1">
              Admission Portfolio Review
            </span>
            <h3 className="text-xl lg:text-2xl font-bold font-sans">
              1:1 모의 실기 평가 & 포트폴리오 진단
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1">
              실기 원장단의 핀셋 피드백과 지망 대학별 실전 합격선 정밀 분석을 제공합니다.
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
                placeholder="예: 김민준"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#CBD5E1] mb-1">
                학부모 연락처 <span className="text-[#38BDF8]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#38BDF8]"
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
                  <option value="S대(예시) 디자인학부">S대(예시) 디자인학부</option>
                  <option value="K대(예시) 조형대학">K대(예시) 조형대학</option>
                  <option value="H대(예시) 미술우수자">H대(예시) 미술우수자</option>
                  <option value="K-ARTS(예시) 조형예술과">K-ARTS(예시) 조형예술과</option>
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
              <p className="text-[11px] text-[#94A3B8] text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
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
      </div>
    </div>
  );
}
