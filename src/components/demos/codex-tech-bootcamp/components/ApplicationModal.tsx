'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function ApplicationModal({ isOpen, onClose, defaultCourse }: ApplicationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourse || '대규모 분산 백엔드 & 클라우드 인프라');
  const [background, setBackground] = useState('비전공자 (독학 3개월 이상)');
  const [githubUrl, setGithubUrl] = useState('');
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
        slug="codex-tech-bootcamp"
        industry="corporate"
        featureName="1:1 코딩 테스트 &amp; 테크 캠프 지원"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-lg bg-[#0B0F17] border border-emerald-500/30 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
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
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              ADMISSION &amp; TECH EVALUATION
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              1:1 코딩테스트 &amp; 사전 역량 진단 신청
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              알고리즘 사전 테스트 및 이력서/GitHub 코드 진단을 통해 최적의 기수 트랙을 배정해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                지원자 성함 <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 김코딩"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                휴대전화 번호 <span className="text-emerald-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  지원 트랙
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="CS 기초 & 모던 풀스택 아키텍처">CS & 풀스택 (Stage 1)</option>
                  <option value="대규모 분산 백엔드 & 클라우드 인프라">분산 백엔드 (Stage 2)</option>
                  <option value="엔터프라이즈 AI 엔지니어링">AI 엔지니어링 (Stage 3)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  현재 개발 역량
                </label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="완전 비전공자 (입문)">완전 비전공자 (입문)</option>
                  <option value="비전공자 (독학 3개월 이상)">독학 3개월 이상</option>
                  <option value="컴퓨터공학/IT 전공자">컴퓨터공학 관련 전공자</option>
                  <option value="주니어 현직 개발자 (이직/성장)">주니어 현직 개발자</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                GitHub 또는 블로그 URL (선택)
              </label>
              <input
                type="url"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                1:1 코딩테스트 &amp; 사전 역량 진단 제출
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
