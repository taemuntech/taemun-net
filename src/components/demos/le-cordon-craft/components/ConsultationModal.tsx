'use client';

import React, { useState } from 'react';
import { X, Calendar, User, Phone, BookOpen, Send } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [discipline, setDiscipline] = useState('patisserie');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  if (submitted) {
    return (
      <SampleNotice
        open
        onClose={() => {
          setSubmitted(false);
          setName('');
          setPhone('');
          onClose();
        }}
        slug="le-cordon-craft"
        industry="corporate"
        featureName="1:1 아틀리에 참관 & 입학 상담 예약"
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-stone-900 border border-amber-800/50 rounded-2xl p-6 lg:p-8 shadow-2xl text-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-1 mb-4">
              <span className="text-[10px] font-mono text-amber-400 uppercase">
                PRIVATE ATELIER CONSULTATION (예시)
              </span>
              <h3 className="text-lg lg:text-xl font-serif font-bold text-stone-50">
                1:1 아틀리에 참관 & 입학 상담 예약
              </h3>
              <p className="text-xs text-stone-300 font-light">
                소수정예 클래스의 생생한 실습 현장을 직접 확인해 보십시오.
              </p>
            </div>

            {/* 샘플 사이트 안내 문구 필수 */}
            <p className="text-[11px] text-zinc-400 text-center mb-2">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  신청자 성함
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  연락처 (예시)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">
                  희망 전공 분야
                </label>
                <div className="relative">
                  <BookOpen className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="patisserie">파티시에 프로 디플로마 과정 (예시)</option>
                    <option value="floral">오뜨 꾸뛰르 플로랄 마스터 과정 (예시)</option>
                    <option value="startup">디저트 & 플라워 카페 복합 창업 과정 (예시)</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold text-xs shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>상담 신청서 제출하기 (예시)</span>
            </button>
          </form>
      </div>
    </div>
  );
}
