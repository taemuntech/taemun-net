'use client';

// 샘플이라 실기 평가 신청을 받지 않는다 — 가짜 접수 완료 화면 대신 공용 안내(SampleNotice)만 연다.
// Esc·배경 클릭·배경 스크롤 잠금·포커스 가둠은 샘플 공용 훅(use-sample-dialog)을 쓴다.
// 위에 안내가 떠 있으면 Esc 는 그 안내만 닫는다(두 모달이 한꺼번에 닫히지 않게).
// 지망 대학은 실존 학교 이름을 쓰지 않는다 — 데이터 파일과 같은 머리글자 가상 표기(예시)로 통일했다.

import React, { useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EvaluationModal({ isOpen, onClose }: EvaluationModalProps) {
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetUniv, setTargetUniv] = useState('S대 디자인학부 (예시)');
  const [grade, setGrade] = useState('고3 / N수');
  const [experience, setExperience] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({
    open: isOpen,
    onClose: () => {
      if (!isNoticeOpen) onClose();
    },
    dialogRef,
    initialFocusRef: closeRef,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="1:1 모의 실기 평가 및 포트폴리오 진단 신청"
          tabIndex={-1}
          className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto bg-[#1A1D24] border border-[#2A303C] rounded-3xl p-6 lg:p-8 text-white shadow-2xl outline-none"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#12141A] border border-[#2A303C] text-[#94A3B8] hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px]"
            aria-label="닫기"
          >
            ✕
          </button>

          <div>
            <div className="mb-6 pr-12">
              <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider block mb-1">
                Diagnostic Portfolio Evaluation
              </span>
              <h3 className="text-xl lg:text-2xl font-serif font-bold text-white">
                1:1 모의 실기 평가 &amp; 포트폴리오 진단
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1">
                현재 실기 수준과 목표 전형별 평가 기준 사이의 차이를 데이터로 진단해 드립니다.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1" htmlFor="beaux-arts-name">
                  학생 성함 <span className="text-[#38BDF8]">*</span>
                </label>
                <input
                  id="beaux-arts-name"
                  type="text"
                  required
                  placeholder="예: 이서준 학생"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1" htmlFor="beaux-arts-phone">
                  연락처 <span className="text-[#38BDF8]">*</span>
                </label>
                <input
                  id="beaux-arts-phone"
                  type="tel"
                  required
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] min-h-[44px]"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1" htmlFor="beaux-arts-univ">
                    목표 지망 계열 (예시)
                  </label>
                  <select
                    id="beaux-arts-univ"
                    value={targetUniv}
                    onChange={(e) => setTargetUniv(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white focus:outline-none focus:border-[#38BDF8] min-h-[44px]"
                  >
                    <option value="S대 디자인학부 (예시)">S대 디자인학부 (예시)</option>
                    <option value="K대 조형대학 (예시)">K대 조형대학 (예시)</option>
                    <option value="H대 미술우수자 (예시)">H대 미술우수자 (예시)</option>
                    <option value="A예술대 조형예술과 (예시)">A예술대 조형예술과 (예시)</option>
                    <option value="기타 미대 실기 전형">기타 미대 실기 전형</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#CBD5E1] mb-1" htmlFor="beaux-arts-grade">
                    현재 학년
                  </label>
                  <select
                    id="beaux-arts-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white focus:outline-none focus:border-[#38BDF8] min-h-[44px]"
                  >
                    <option value="고1">고등학교 1학년</option>
                    <option value="고2">고등학교 2학년</option>
                    <option value="고3 / N수">고등학교 3학년 / N수</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#CBD5E1] mb-1" htmlFor="beaux-arts-exp">
                  실기 경력 및 주요 관심 분야
                </label>
                <textarea
                  id="beaux-arts-exp"
                  rows={3}
                  placeholder="미술 실기 시작 시기(예: 1년차, 기초소양 등) 또는 평소 자신 있는 표현 기법을 적어주십시오."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#12141A] border border-[#2A303C] text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#38BDF8] resize-none"
                />
              </div>

              <label
                htmlFor="beaux-arts-privacy"
                className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer text-[11px] text-[#94A3B8] leading-relaxed"
              >
                <input
                  id="beaux-arts-privacy"
                  type="checkbox"
                  required
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-0.5 w-5 h-5 shrink-0 accent-[#38BDF8]"
                />
                <span>
                  개인정보 수집·이용에 동의합니다. (성함·연락처 — 실기 심사 배정 및 입시 로드맵 상담 안내 목적, 상담 종료 후 파기)
                </span>
              </label>

              <div className="pt-2">
                <p className="text-[11px] text-[#64748B] text-center mb-3">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-semibold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg"
                >
                  모의 실기 심사 신청하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="atelier-beaux-arts"
        industry="corporate"
        featureName="1:1 모의 실기 평가 & 포트폴리오 진단 신청"
      />
    </>
  );
}
