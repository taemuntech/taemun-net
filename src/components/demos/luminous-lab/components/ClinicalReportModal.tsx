import React from 'react';
import { X, FileText, CheckCircle2, Award } from 'lucide-react';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-white space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#006948]" />
            <h3 className="text-lg font-bold text-[#141b2b]">인체적용시험 임상 리포트 (예시)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-[#3d4a42]">
          <div className="bg-[#f1f3ff] p-3.5 rounded-xl border border-[#bccac0]/30 space-y-1">
            <span className="text-[11px] font-bold text-[#006948] uppercase tracking-wide">
              Sample Clinical Protocol (예시)
            </span>
            <p className="font-bold text-[#141b2b] text-sm">
              시험 과제명: 'LUMINOUS LAB 시카 엑소좀 수분 진정 앰플'의 손상 장벽 개선 및 수분 손실 억제 효능 평가
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
              <span className="text-[11px] block text-[#6d7a72] font-medium">시험 대상자</span>
              <span className="font-bold text-[#141b2b] text-xs">성인 여성 32인 (민감성 피부 포함)</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
              <span className="text-[11px] block text-[#6d7a72] font-medium">시험 기간</span>
              <span className="font-bold text-[#141b2b] text-xs">4주간 (예시 기간)</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <h4 className="font-bold text-[#141b2b] text-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#006948]" />
              임상 주요 결과 요약 (예시 수치)
            </h4>
            <ul className="space-y-2 text-xs bg-white p-3 rounded-xl border border-gray-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
                <span>
                  <strong>화학적 자극 후 손상 장벽 회복률:</strong> 대조군 대비{' '}
                  <span className="text-[#006948] font-bold">+89.4%</span> 촉진
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
                <span>
                  <strong>경피 수분 손실량 (TEWL):</strong> 도포 4주 후{' '}
                  <span className="text-[#006948] font-bold">-42.8%</span> 대폭 감소
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#ae2f34] shrink-0 mt-0.5" />
                <span>
                  <strong>외부 자극에 의한 피부 붉은기 완화:</strong> 단 1회 도포 10분 후{' '}
                  <span className="text-[#ae2f34] font-bold">-34.2%</span> 개선
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
                <span>
                  <strong>피부 첩포 시험 자극 지수:</strong> 0.00 판정으로{' '}
                  <strong className="text-[#006948]">'저자극'</strong> 등급 (예시)
                </span>
              </li>
            </ul>
          </div>

          <div className="p-3 bg-[#e8f5e9] rounded-xl text-[#006948] text-[11px] font-medium leading-relaxed">
            * 이 리포트는 샘플 사이트의 예시 화면입니다. 실제로 수행된 시험이 아니며 시험기관·수치는 모두 가상입니다.
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-full flex items-center justify-center cursor-pointer transition-all"
        >
          임상 리포트 확인 완료
        </button>
      </div>
    </div>
  );
};
