import React from 'react';
import { X, Award, ShieldCheck, Printer, CheckCircle, FileText } from 'lucide-react';
import { VerificationResult } from '../types';

interface CertificateModalProps {
  certificate: VerificationResult | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#ffffff] rounded-2xl shadow-2xl border border-[#eae8e5] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#00110b] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#fedb9e]" />
            <span className="font-serif text-sm lg:text-base font-medium">
              더 노블 청담 정품 팁 인증 보증서 (Official Certificate)
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-[#c1c8c4] hover:text-[#ffffff] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Paper Canvas Body */}
        <div className="p-8 bg-[#fbf9f6] text-[#1b1c1a] border-8 border-[#f5f3f0] m-3 rounded-xl relative print:m-0 print:border-none">
          {/* Certificate Watermark Stamp */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <ShieldCheck className="w-80 h-80 text-[#00110b]" />
          </div>

          <div className="text-center mb-6">
            <span className="text-[11px] font-semibold text-[#745a2a] tracking-[0.25em] uppercase block mb-1">
              THE NOBLE CHEONGDAM MEDICAL CLINIC
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-[#00110b] font-medium tracking-tight">
              정품 인증 의료기기 및 정품 팁 인증서
            </h2>
            <p className="text-xs text-[#727975] mt-1">
              Certificate of Authenticity & Genuine Medical Consumables
            </p>
          </div>

          {/* Certificate Details Table */}
          <div className="bg-[#ffffff] rounded-lg p-5 border border-[#eae8e5] shadow-sm mb-6 space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
              <span className="text-[#727975]">정품 인증 번호</span>
              <span className="font-mono font-bold text-[#745a2a]">{certificate.authenticityCode}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
              <span className="text-[#727975]">적용 의료 소모품</span>
              <span className="font-semibold text-[#00110b]">{certificate.device}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
              <span className="text-[#727975]">고유 전산 시리얼 번호</span>
              <span className="font-mono font-semibold text-[#00110b]">{certificate.serialNumber}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
              <span className="text-[#727975]">유효 기간 및 멸균 상태</span>
              <span className="text-[#00110b]">{certificate.expiry}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#efeeeb]">
              <span className="text-[#727975]">공식 수입 유통원</span>
              <span className="text-[#00110b]">{certificate.distributor}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#727975]">인증 및 전산 대조 일시</span>
              <span className="font-mono text-[#00110b]">{certificate.verifiedAt}</span>
            </div>
          </div>

          <div className="text-xs text-[#424845] leading-relaxed mb-6 bg-[#f5f3f0] p-4 rounded-lg border border-[#eae8e5]">
            위 제품은 제조사(Solta Medical / Merz Aesthetics / PharmaResearch)의 엄격한 품질 관리 기준을 통과한 정품 인증 소모품이며, 본 의원에서 고객 대면 즉석 개봉 후 단 1회 시술에 한하여 정품 차트와 함께 사용 및 폐기되었음을 공식 인증합니다.
          </div>

          <div className="flex items-end justify-between pt-4 border-t border-[#e4e2df]">
            <div>
              <span className="text-[11px] text-[#727975] block">의료기관명: 더 노블 청담 피부과의원</span>
              <span className="text-xs font-semibold text-[#00110b]">대표원장 김도현 (인)</span>
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-red-700/80 flex items-center justify-center text-red-700/80 text-[10px] font-serif font-bold text-center leading-tight rotate-[-12deg]">
              더노블청담<br />원장인
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="px-6 py-4 bg-[#f5f3f0] border-t border-[#eae8e5] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#ffffff] text-[#00110b] text-xs font-semibold border border-[#eae8e5] hover:bg-[#eae8e5] transition-colors"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Printer className="w-4 h-4 text-[#fedb9e]" />
            <span>인증서 인쇄하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
