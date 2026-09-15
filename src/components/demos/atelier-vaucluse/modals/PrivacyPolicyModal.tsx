'use client';

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#faf9f7] rounded max-w-2xl w-full max-h-[85vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#904b35]" />
            <h3 className="text-lg font-serif text-[#161714]">개인정보 처리방침 안내</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] p-1.5 rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-4 text-xs lg:text-sm text-[#474741] font-sans font-light leading-relaxed">
          <p>
            아뜰리에 보클루즈(이하 ‘스튜디오’)는 고객의 소중한 개인정보를 보호하며, 「개인정보 보호법」 등 관련 법령을 엄격히 준수합니다.
          </p>

          <h4 className="font-semibold text-[#161714] text-xs uppercase tracking-wider pt-2">
            1. 수집하는 개인정보 항목
          </h4>
          <p>
            - 필수항목: 성함/법인명, 연락처(휴대전화번호), 프로젝트 공간 유형 및 면적
            <br />
            - 선택항목: 현장 위치(지역구), 예상 착공 시기, 기타 요청 사항
          </p>

          <h4 className="font-semibold text-[#161714] text-xs uppercase tracking-wider pt-2">
            2. 개인정보 수집 및 이용 목적
          </h4>
          <p>
            - 인테리어 설계 및 시공 견적 상담, 3D 시뮬레이션 제안, 현장 실측 일정 조율 및 고객 문의 응대
          </p>

          <h4 className="font-semibold text-[#161714] text-xs uppercase tracking-wider pt-2">
            3. 보유 및 이용 기간
          </h4>
          <p>
            - 상담 접수일로부터 1년간 보관 후 지체 없이 파기하며, 계약 체결 시 관계 법령에 따른 법정 보존 기간을 준수합니다.
          </p>
        </div>

        <div className="px-6 py-4 border-t border-[#c8c7bf]/30 bg-[#f4f3f1] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-6 py-2 rounded text-xs uppercase tracking-wider font-semibold font-sans transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
