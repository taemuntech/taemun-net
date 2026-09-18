'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface TrialClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function TrialClassModal({ isOpen, onClose, defaultCourse }: TrialClassModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('초등 5학년');
  const [course, setCourse] = useState(defaultCourse || 'K-로봇대회 & FLL 국제 청소년 공학반');
  const [experience, setExperience] = useState('스크래치/엔트리 기초 경험 있음');
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
        slug="robot-stem"
        industry="corporate"
        featureName="1:1 로봇 공학 적성 체험 수업 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0E1526] border border-orange-500/30 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px] cursor-pointer"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-mono font-bold text-orange-400 uppercase tracking-wider block mb-1">
              STEM APTITUDE DIAGNOSIS
            </span>
            <h3 className="text-xl lg:text-2xl font-mono font-bold text-white">
              1:1 로봇 공학 적성 체험 수업 신청
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              실물 로봇암 조작 및 기구학 메커니즘 적성을 진단하고 개별 공학 로드맵을 제안해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                학생 성함 <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 정우진"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                학부모 연락처 <span className="text-orange-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  현재 학년
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="초등 3~4학년">초등 3~4학년</option>
                  <option value="초등 5학년">초등 5학년</option>
                  <option value="초등 6학년">초등 6학년</option>
                  <option value="중학교 1학년">중학교 1학년</option>
                  <option value="중학교 2학년">중학교 2학년</option>
                  <option value="중학교 3학년">중학교 3학년</option>
                  <option value="고등학생">고등학생</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  희망 프로그램
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="K-로봇대회 & FLL 국제 청소년 공학반">K-로봇대회반</option>
                  <option value="아두이노 & 마이크로컨트롤러 피지컬 컴퓨팅반">피지컬컴퓨팅반</option>
                  <option value="ROS 2 기반 AI 자율주행 & 매니퓰레이터 심화반">ROS 2 심화반</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                코딩/로봇 경험 여부
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:border-orange-500"
              >
                <option value="처음 시작 (입문)">완전 처음 시작 (입문)</option>
                <option value="스크래치/엔트리 기초 경험 있음">스크래치/엔트리 블록코딩 경험</option>
                <option value="아두이노/C언어 기초 경험 있음">아두이노/C++ 텍스트 코딩 경험</option>
                <option value="로봇 경진대회 출전 경험 있음">기존 로봇대회 출전 경험 있음</option>
              </select>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                1:1 공학 적성 체험 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
