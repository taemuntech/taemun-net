"use client";

import React, { useRef, useState } from 'react';
import { X, Headphones, Send } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface CounselingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CounselingModal: React.FC<CounselingModalProps> = ({ isOpen, onClose }) => {
  const [skinType, setSkinType] = useState('수부지 (수분부족지성)');
  const [content, setContent] = useState('');
  // 샘플이라 상담을 받지 않는다 — 「접수 완료」 화면 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // 안내 모달이 열려 있는 동안엔 Esc 를 그쪽이 받는다 — 두 겹으로 잠그지 않는다.
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end lg:items-center justify-center lg:p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="1:1 더마 상담 폼 (샘플)"
        tabIndex={-1}
        className="bg-white rounded-t-3xl lg:rounded-3xl lg:max-w-md w-full p-6 shadow-2xl border border-white space-y-5 outline-none animate-in slide-in-from-bottom lg:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Headphones className="w-6 h-6 text-[#006948]" />
            <h3 className="text-lg font-bold text-[#141b2b]">1:1 더마 상담 폼 (샘플)</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="상담 폼 닫기"
            className="w-11 h-11 -mr-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#141b2b] mb-1">피부 타입 선택</label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="w-full h-11 rounded-xl border border-gray-300 px-3 bg-white outline-none focus:border-[#006948]"
            >
              <option>수부지 (수분부족지성)</option>
              <option>민감성 & 붉은기</option>
              <option>극건성 & 각질</option>
              <option>지성 & 트러블</option>
              <option>복합성</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#141b2b] mb-1">
              궁금한 점이나 피부 고민을 남겨주세요
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="예: 시카 앰플과 레티놀 앰플을 저녁에 같이 사용해도 되나요? 붉은기 진정에 추천하는 순서가 궁금합니다."
              className="w-full p-3 rounded-xl border border-gray-300 bg-white outline-none focus:border-[#006948] resize-none"
            />
          </div>

          <div className="p-3 bg-[#f1f3ff] rounded-xl text-[11px] text-[#3d4a42]">
            실제 서비스라면 상담 담당자가 등록된 계정(member@example.com)으로 맞춤 루틴 가이드를 회신하는 흐름입니다. 이 샘플은 접수하지 않습니다.
          </div>

          <p className="text-center text-[11px] text-[#6d7a72] leading-relaxed">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
            상담 내용 보내보기 (샘플)
          </button>
        </form>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => {
          setIsNoticeOpen(false);
          setContent('');
          onClose();
        }}
        slug="luminous-lab"
        industry="commerce"
        featureName="1:1 더마 전문가 카운셀링"
      />
    </div>
  );
};
