import React, { useRef } from 'react';
import { X, Award, ShieldCheck, Printer } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { VerificationResult } from '../types';

interface CertificateModalProps {
  certificate: VerificationResult | null;
  onClose: () => void;
}

// 소모품 사용 확인서 미리보기.
// 원래는 실존 제조사 이름을 넣은 「정품 인증서」라 인쇄하면 진짜 인증서처럼 읽혔다 — 제조사 이름을 빼고
// 화면·인쇄본 모두에 「예시 서식」이라고 남겼다.
export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = certificate !== null;
  useSampleDialog({ open, onClose, dialogRef });

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="noble-certificate-title"
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[92vh] lg:max-h-[90vh] flex flex-col bg-[#ffffff] rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#eae8e5] overflow-hidden outline-none"
      >
        {/* Top Header */}
        <div className="px-4 lg:px-6 py-4 bg-[#00110b] text-[#ffffff] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Award className="w-5 h-5 text-[#fedb9e] shrink-0" />
            <span id="noble-certificate-title" className="font-serif text-sm lg:text-base font-medium break-keep">
              소모품 사용 확인서 (예시 서식)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="확인서 닫기"
            className="w-11 h-11 flex items-center justify-center rounded-full text-[#c1c8c4] hover:text-[#ffffff] hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Paper Canvas Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 bg-[#fbf9f6] text-[#1b1c1a] border-8 border-[#f5f3f0] m-3 rounded-xl relative print:m-0 print:border-none">
            {/* Certificate Watermark Stamp */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <ShieldCheck className="w-80 h-80 text-[#00110b]" />
            </div>

            <div className="text-center mb-6">
              <span className="text-[11px] font-semibold text-[#745a2a] tracking-[0.25em] uppercase block mb-1">
                THE NOBLE CHEONGDAM MEDICAL CLINIC
              </span>
              <h2 className="font-serif text-xl lg:text-3xl text-[#00110b] font-medium tracking-tight break-keep">
                1회용 멸균 소모품 사용 확인서
              </h2>
              <p className="text-xs text-[#727975] mt-1">Record of Single-Use Sterile Consumables</p>
              <p className="mt-3 inline-block rounded-full border border-[#745a2a]/40 bg-[#efeeeb] px-3 py-1 text-[11px] font-semibold text-[#745a2a]">
                예시 서식 — 실제로 발급된 확인서가 아닙니다
              </p>
            </div>

            {/* Certificate Details Table */}
            <div className="bg-[#ffffff] rounded-lg p-4 lg:p-5 border border-[#eae8e5] shadow-sm mb-6 space-y-2.5 text-xs">
              <div className="flex justify-between gap-3 py-1.5 border-b border-[#efeeeb]">
                <span className="text-[#727975] shrink-0">확인 번호</span>
                <span className="font-mono font-bold text-[#745a2a] text-right break-all">
                  {certificate.authenticityCode}
                </span>
              </div>
              <div className="flex justify-between gap-3 py-1.5 border-b border-[#efeeeb]">
                <span className="text-[#727975] shrink-0">사용 소모품</span>
                <span className="font-semibold text-[#00110b] text-right">{certificate.device}</span>
              </div>
              <div className="flex justify-between gap-3 py-1.5 border-b border-[#efeeeb]">
                <span className="text-[#727975] shrink-0">고유 번호</span>
                <span className="font-mono font-semibold text-[#00110b] text-right break-all">
                  {certificate.serialNumber}
                </span>
              </div>
              <div className="flex justify-between gap-3 py-1.5 border-b border-[#efeeeb]">
                <span className="text-[#727975] shrink-0">유효 기간 및 멸균 상태</span>
                <span className="text-[#00110b] text-right">{certificate.expiry}</span>
              </div>
              <div className="flex justify-between gap-3 py-1.5 border-b border-[#efeeeb]">
                <span className="text-[#727975] shrink-0">국내 공급처</span>
                <span className="text-[#00110b] text-right">{certificate.distributor}</span>
              </div>
              <div className="flex justify-between gap-3 py-1.5">
                <span className="text-[#727975] shrink-0">조회 일시</span>
                <span className="font-mono text-[#00110b] text-right">{certificate.verifiedAt}</span>
              </div>
            </div>

            <div className="text-xs text-[#424845] leading-relaxed mb-6 bg-[#f5f3f0] p-4 rounded-lg border border-[#eae8e5]">
              위 소모품은 1회용 멸균 제품으로, 시술 직전 고객 앞에서 미개봉 상태를 확인한 뒤 개봉하여 단 1회
              사용하고 폐기했음을 기록한 서식입니다. 표시된 모델명·공급처·번호는 모두 예시이며, 이 화면은 태문넷이
               만든 샘플 사이트의 일부입니다.
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-[#e4e2df]">
              <div>
                <span className="text-[11px] text-[#727975] block">의료기관명: 더 노블 청담 피부과의원 (가상)</span>
                <span className="text-xs font-semibold text-[#00110b]">대표원장 김도현 (예시)</span>
              </div>
              <div className="w-16 h-16 rounded-full border-2 border-[#745a2a]/70 flex items-center justify-center text-[#745a2a]/80 text-[10px] font-serif font-bold text-center leading-tight rotate-[-12deg]">
                예시
                <br />
                인영
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-4 lg:px-6 py-4 bg-[#f5f3f0] border-t border-[#eae8e5] flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 min-h-11 rounded-lg bg-[#ffffff] text-[#00110b] text-xs font-semibold border border-[#eae8e5] hover:bg-[#eae8e5] transition-colors"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 min-h-11 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Printer className="w-4 h-4 text-[#fedb9e]" />
            <span>인쇄 미리보기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
