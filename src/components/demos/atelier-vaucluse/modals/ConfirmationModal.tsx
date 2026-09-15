'use client';

import React from 'react';
import { CheckCircle2, X, PhoneCall, Calendar, MapPin, Layers } from 'lucide-react';
import { SubmissionRecord } from '../types';

interface ConfirmationModalProps {
  record: SubmissionRecord | null;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ record, onClose }) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#faf9f7] rounded max-w-lg w-full p-6 lg:p-8 border border-[#c8c7bf]/40 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#474741] hover:text-[#161714] p-1 cursor-pointer transition-colors"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#efeeec] text-[#904b35] flex items-center justify-center mx-auto border border-[#c8c7bf]/30">
            <CheckCircle2 size={28} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#904b35] font-sans block">
            Submission Confirmed
          </span>
          <h3 className="text-2xl font-serif text-[#161714]">
            상담 신청이 접수되었습니다
          </h3>
          <p className="text-xs lg:text-sm text-[#474741] font-sans font-light max-w-sm mx-auto">
            보클루즈 디자인 팀에서 프로젝트 세부 사항을 면밀히 검토 후 24시간 이내에 직접 연락드리겠습니다.
          </p>
        </div>

        {/* Receipt Information Card */}
        <div className="bg-[#f4f3f1] rounded p-5 border border-[#c8c7bf]/30 space-y-3 text-xs font-sans text-[#474741] mb-6">
          <div className="flex justify-between pb-2 border-b border-[#c8c7bf]/30">
            <span className="font-semibold text-[#161714]">접수 번호</span>
            <span className="font-mono text-[#904b35] font-bold">{record.id}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#777770]" />
              신청 일시
            </span>
            <span className="text-[#161714]">{record.submittedAt}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>성함 / 법인</span>
            <span className="font-medium text-[#161714]">{record.name} ({record.phone})</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5">
              <Layers size={13} className="text-[#777770]" />
              공간 유형 &amp; 면적
            </span>
            <span className="text-[#161714]">{record.spaceType} · {record.area}</span>
          </div>

          {record.location && (
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#777770]" />
                현장 위치
              </span>
              <span className="text-[#161714]">{record.location}</span>
            </div>
          )}

          {record.notes && (
            <div className="pt-2 border-t border-[#c8c7bf]/20">
              <span className="block text-[11px] uppercase tracking-wider text-[#777770] mb-1">
                요청 사항
              </span>
              <p className="text-[#161714] text-[11px] leading-relaxed bg-[#faf9f7] p-2.5 rounded border border-[#c8c7bf]/20 line-clamp-3">
                {record.notes}
              </p>
            </div>
          )}
        </div>

        {/* Emergency Inquiry Footer */}
        <div className="flex items-center justify-between text-xs text-[#474741] font-sans pb-4">
          <span className="flex items-center gap-1.5">
            <PhoneCall size={13} className="text-[#904b35]" />
            긴급 유선 문의: +82 (02) 548-2890
          </span>
          <span className="text-[11px] text-[#777770]">평일 09:30 - 18:30</span>
        </div>

        {/* Taemun Dev Studio Agency Lead Conversion Banner */}
        <div className="mb-6 p-4 rounded bg-[#f4f3f1] border border-[#161714]/20 space-y-2 text-center">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#904b35] text-white text-[10px] font-semibold tracking-wider uppercase">
            TAEMUN DEV STUDIO DEMO
          </span>
          <h4 className="text-xs font-semibold text-[#161714]">
            이와 동일한 프리미엄 포트폴리오 웹사이트를 제작해 드립니다
          </h4>
          <p className="text-[11px] text-[#474741] font-light leading-relaxed">
            건축·인테리어 전문 맞춤 레이아웃, 모바일 완벽 최적화, 1:1 상담 접수 시스템까지 원스톱으로 구축해 드립니다.
          </p>
          <a
            href="/inquiry?from=atelier-vaucluse"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#904b35] hover:text-[#161714] border-b border-[#904b35] hover:border-[#161714] pb-0.5 transition-colors pt-1"
          >
            <span>태문 데브스튜디오에 제작 의뢰하기 &rarr;</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] transition-colors py-3.5 rounded text-xs font-semibold uppercase tracking-[0.18em] font-sans cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
};
