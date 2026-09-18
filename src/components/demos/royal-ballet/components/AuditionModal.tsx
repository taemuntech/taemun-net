'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface AuditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuditionModal({ isOpen, onClose }: AuditionModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('바가노바 영재 입시반 (예중·예고·한예종)');
  const [experience, setExperience] = useState('3년 이상');
  const [bodyNote, setBodyNote] = useState('');
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
        slug="royal-ballet"
        industry="corporate"
        featureName="1:1 체형 진단 & 실기 오디션 신청"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#18151F] border border-[#2D2636] rounded-3xl p-6 lg:p-8 text-[#F7F3F5] shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#0F0E11] border border-[#2D2636] text-[#9E939D] hover:text-white flex items-center justify-center min-h-[44px] min-w-[44px]"
          aria-label="닫기"
        >
          ✕
        </button>

        <div>
          <div className="mb-6">
            <span className="text-[11px] font-bold text-[#F4ACB7] uppercase tracking-wider block mb-1">
              Body Alignment & Audition
            </span>
            <h3 className="text-xl lg:text-2xl font-serif font-bold text-white">
              1:1 체형 진단 & 실기 오디션 신청
            </h3>
            <p className="text-xs text-[#BDB5BC] mt-1">
              골반 가동 범위와 발목 턴아웃 정렬을 실측하고 개인별 무용 진로를 설계해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#D5CDD4] mb-1">
                지원자 성함 <span className="text-[#F4ACB7]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 김채원 지원자"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0F0E11] border border-[#252229] text-sm text-white placeholder-[#6D636D] focus:outline-none focus:border-[#F4ACB7]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D5CDD4] mb-1">
                연락처 <span className="text-[#F4ACB7]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0F0E11] border border-[#252229] text-sm text-white placeholder-[#6D636D] focus:outline-none focus:border-[#F4ACB7]"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#D5CDD4] mb-1">
                  희망 클래스
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0F0E11] border border-[#252229] text-sm text-white focus:outline-none focus:border-[#F4ACB7]"
                >
                  <option value="바가노바 영재 입시반 (예중·예고·한예종)">바가노바 영재 입시반</option>
                  <option value="해외 유수 발레단 및 유학 프로페셔널">해외 발레단 유학반</option>
                  <option value="성인 클래식 발레 & 바레 체형 교정">성인 클래식 바레</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#D5CDD4] mb-1">
                  발레 경력
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0F0E11] border border-[#252229] text-sm text-white focus:outline-none focus:border-[#F4ACB7]"
                >
                  <option value="입문 / 1년 미만">입문 / 1년 미만</option>
                  <option value="1~3년">1~3년 전공 준비</option>
                  <option value="3년 이상">3년 이상 전공자</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D5CDD4] mb-1">
                체형 특이사항 또는 목표 대학/발레단
              </label>
              <textarea
                rows={3}
                placeholder="골반 유연성, 발등(고) 라인, 이전 부상 이력 또는 목표로 하는 예중·예고나 해외 발레단을 기재해 주십시오."
                value={bodyNote}
                onChange={(e) => setBodyNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0F0E11] border border-[#252229] text-sm text-white placeholder-[#6D636D] focus:outline-none focus:border-[#F4ACB7] resize-none"
              />
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-[#9E939D] text-center mb-2">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D8829D] to-[#F4ACB7] text-[#0F0E11] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all min-h-[44px] flex items-center justify-center shadow-lg"
              >
                오디션 신청서 제출하기
              </button>
            </div>

            <p className="text-[11px] text-[#786E77] text-center">
              ※ 신청 정보는 1:1 체형 진단 일정 조율 및 클래스 배정 용도로만 관리됩니다.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
