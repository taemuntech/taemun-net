import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle } from 'lucide-react';

interface SerialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const SerialModal: React.FC<SerialModalProps> = ({
  isOpen,
  onClose,
  initialCode = 'MDL-CH-89210-KR',
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedData, setVerifiedData] = useState<{
    status: string;
    inspector: string;
    warranty: string;
    nfcHash: string;
    customsDate: string;
  }>({
    status: '정품 인증 승인됨 (AUTHENTIC)',
    inspector: '메종 드 럭스 파리 아틀리에 & 공인 명품 감정원 (예시)',
    warranty: '200% 책임 손해배상 공제',
    nfcHash: '0x7f4e89b12a884c90',
    customsDate: '2025. 01. 14 (인천공항 특송세관)',
  });

  if (!isOpen) return null;

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const hash =
        '0x' +
        code
          .split('')
          .map((c) => c.charCodeAt(0).toString(16))
          .join('')
          .slice(0, 16);
      setVerifiedData({
        status: '정품 인증 승인됨 (AUTHENTIC)',
        inspector: '메종 드 럭스 파리 아틀리에 & 공인 명품 감정원 수석 2차 검수 (예시)',
        warranty: '200% 책임 손해배상 공제 보증서 유효',
        nfcHash: hash || '0x7f4e89b12a884c90',
        customsDate: '2025. 01. 14 (인천공항 특송세관 정식 통관)',
      });
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0e0e0e] border border-[#d4af37]/40 max-w-xl w-full p-6 lg:p-8 relative shadow-2xl">
        <button
          type="button"
          className="absolute top-4 right-4 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer p-1"
          onClick={onClose}
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 border border-[#f2ca50] rounded-full flex items-center justify-center text-[#f2ca50]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg lg:text-xl text-[#e5e2e1] font-semibold">
            실시간 정품 검수 조회 및 디지털 보증서 발급
          </h3>
          <p className="text-xs text-[#d0c5af] mt-1.5 font-light">
            제품 수령 시 부착된 NFC 보안 태그 또는 제품 시리얼 8자리를 입력하십시오.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold tracking-wider text-[#f2ca50] mb-1.5 uppercase">
              SERIAL OR NFC HASH CODE
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-2 text-xs lg:text-sm font-mono focus:border-[#f2ca50] focus:outline-none"
                placeholder="예: MDL-2025-0012"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="button"
                className="bg-[#f2ca50] text-[#0e0e0e] text-[11px] font-bold tracking-wider px-4 py-2 hover:bg-[#ffe088] transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? '분광 대조 중...' : '검수 조회'}
              </button>
            </div>
          </div>

          {/* Verification Result Card */}
          <div
            className={`p-4 bg-[#1c1b1b] border border-[#4d4635] space-y-3 transition-opacity ${
              isVerifying ? 'opacity-40' : 'opacity-100'
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#4d4635] pb-2">
              <span className="text-[10px] text-[#99907c] tracking-widest font-semibold uppercase">
                AUTHENTICATION STATUS
              </span>
              <span className="text-[11px] text-[#f2ca50] font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                {verifiedData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 text-xs">
              <div>
                <span className="text-[#99907c] text-[10px] block">판독 감정원:</span>
                <span className="text-[#e5e2e1] font-medium text-[11px]">
                  {verifiedData.inspector}
                </span>
              </div>
              <div>
                <span className="text-[#99907c] text-[10px] block">보증 책임 한도:</span>
                <span className="text-[#f2ca50] font-semibold text-[11px]">
                  {verifiedData.warranty}
                </span>
              </div>
              <div>
                <span className="text-[#99907c] text-[10px] block">NFC 보안 고유 해시:</span>
                <span className="text-[#e5e2e1] font-mono text-[10px] break-all">
                  {verifiedData.nfcHash}
                </span>
              </div>
              <div>
                <span className="text-[#99907c] text-[10px] block">최초 통관 일자:</span>
                <span className="text-[#e5e2e1] text-[11px]">{verifiedData.customsDate}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-2.5 border border-[#d4af37]/40 text-[#d0c5af] text-[11px] tracking-wider uppercase hover:text-[#f2ca50] hover:border-[#f2ca50] transition-colors cursor-pointer"
            onClick={onClose}
          >
            확인 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
