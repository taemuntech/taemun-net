'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export function ConsultationModal({ isOpen, onClose, defaultCourse }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [track, setTrack] = useState('법학전문대학원(로스쿨 LEET)');
  const [course, setCourse] = useState(defaultCourse || '로스쿨 LEET 140+ 프레스티지 스파르타 종합반');
  const [gpa, setGpa] = useState('');
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
        slug="leet-cpa"
        industry="corporate"
        featureName="1:1 합격 가능성 진단 및 입학 상담"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif">
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-amber-500/40 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
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
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
              ADMISSION &amp; SCORE DIAGNOSIS
            </span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              1:1 합격 가능성 정밀 진단 신청
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              수험생의 GPA, 공인영어 성적, 기출 응시 이력을 다각도로 분석하여 최적의 합격 로드맵을 제안해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 font-serif">
                지원자 성함 <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 이준혁"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 font-serif">
                휴대전화 번호 <span className="text-amber-400">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 font-serif">
                  준비 시험 트랙
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="법학전문대학원(로스쿨 LEET)">로스쿨 LEET</option>
                  <option value="KICPA 공인회계사 1차/2차">KICPA 공인회계사</option>
                  <option value="변호사시험 기록형/사례형">변호사시험 대비</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1 font-serif">
                  희망 프로그램
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="로스쿨 LEET 140+ 프레스티지 스파르타 종합반">LEET 140+ 종합반</option>
                  <option value="추리논증 킬러 정복 & 규범 수리추론 집중 단과">추리논증 킬러 단과</option>
                  <option value="KICPA 공인회계사 1차 파이널 & 2차 동차반">CPA 1·2차 유예반</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1 font-serif">
                현재 GPA 백분위 및 모의고사 점수 (선택)
              </label>
              <input
                type="text"
                placeholder="예: 학점 96.5, 최근 사설 LEET 128점 등"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-zinc-400 text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg shadow-amber-900/30 cursor-pointer font-serif"
              >
                1:1 합격 가능성 진단 신청서 제출하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
