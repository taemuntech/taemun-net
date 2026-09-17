import React, { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck, CheckCircle, AlertCircle } from 'lucide-react';
import { DEFAULT_SERIAL_CODE, lookupVerification } from '../data/luxuryData';
import { VerificationResult } from '../types';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface SerialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

/**
 * 감정 이력 조회 모달.
 *
 * 예전에는 **무엇을 입력하든** 「정품 인증 승인됨(AUTHENTIC)」 + 배액 손해배상 + 실존 공항세관 이름을 적은
 * 통관 문구가 떴다. 실존 기관의 공인 인증처럼 읽히고, 없는 물건도 정품으로 찍어 주는 화면이었다.
 * 지금은 예시 대장(luxuryData)에 있는 로트 번호·태그 해시만 결과가 나오고, 없는 코드는 「기록 없음」이다.
 */
export const SerialModal: React.FC<SerialModalProps> = ({ isOpen, onClose, initialCode = DEFAULT_SERIAL_CODE }) => {
  const [code, setCode] = useState<string>(initialCode);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(() => lookupVerification(initialCode));
  const [notFoundCode, setNotFoundCode] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Esc · 배경 스크롤 잠금 · 포커스 순환 — 저장소 공용 훅
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: inputRef });

  // 대장 행을 눌러 열면 그 로트 번호로 바로 조회된 상태여야 한다
  useEffect(() => {
    if (!isOpen) return;
    setCode(initialCode);
    setResult(lookupVerification(initialCode));
    setNotFoundCode(lookupVerification(initialCode) ? null : initialCode);
    setIsVerifying(false);
  }, [isOpen, initialCode]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVerifying(true);
    timerRef.current = setTimeout(() => {
      const found = lookupVerification(code);
      setResult(found);
      setNotFoundCode(found ? null : code.trim());
      setIsVerifying(false);
    }, 450);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mdl-serial-title"
        tabIndex={-1}
        className="bg-[#0e0e0e] border border-[#d4af37]/40 max-w-xl w-full p-6 lg:p-8 relative shadow-2xl outline-none max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          className="absolute top-2 right-2 flex items-center justify-center h-11 w-11 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6 px-8">
          <div className="w-12 h-12 mx-auto mb-3 border border-[#f2ca50] rounded-full flex items-center justify-center text-[#f2ca50]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 id="mdl-serial-title" className="font-serif text-lg lg:text-xl text-[#e5e2e1] font-semibold [word-break:keep-all]">
            감정 이력 조회 (예시 대장)
          </h3>
          <p className="text-xs text-[#d0c5af] mt-1.5 font-light [word-break:keep-all]">
            상품에 붙은 봉인 태그의 로트 번호를 입력하면 검수 이력을 보여 줍니다. 샘플이라 아래 예시 번호만
            조회됩니다.
          </p>
        </div>

        <div className="space-y-4">
          {/* 화면 조작용 폼이라 role="search" — 어디에도 전송되지 않는다 */}
          <form role="search" onSubmit={handleVerify}>
            <label
              htmlFor="mdl-serial-input"
              className="block text-[11px] font-semibold tracking-wider text-[#f2ca50] mb-1.5 uppercase"
            >
              LOT № / TAG HASH
            </label>
            <div className="flex gap-2">
              <input
                id="mdl-serial-input"
                ref={inputRef}
                className="flex-1 min-w-0 min-h-11 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-3 text-xs lg:text-sm font-mono focus:border-[#f2ca50] focus:outline-none"
                placeholder="예: MDL-2025-08991"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#f2ca50] text-[#0e0e0e] text-[11px] font-bold tracking-wider px-4 min-h-11 hover:bg-[#ffe088] transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
                disabled={isVerifying}
              >
                {isVerifying ? '대조 중...' : '조회'}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-[#99907c] [word-break:keep-all]">
              예시 번호: MDL-2025-08991 ~ MDL-2025-08995 — 컬렉션 카드에 적힌 로트 번호를 그대로 넣으면 조회됩니다
            </p>
          </form>

          {/* Verification Result Card */}
          <div
            aria-live="polite"
            className={`p-4 bg-[#1c1b1b] border border-[#4d4635] space-y-3 transition-opacity ${
              isVerifying ? 'opacity-40' : 'opacity-100'
            }`}
          >
            {result ? (
              <>
                <div className="flex items-center justify-between gap-2 border-b border-[#4d4635] pb-2 flex-wrap">
                  <span className="text-[10px] text-[#99907c] tracking-widest font-semibold uppercase">
                    INSPECTION RECORD (예시)
                  </span>
                  <span className="text-[11px] text-[#f2ca50] font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#f2ca50]" />
                    {result.status}
                  </span>
                </div>

                <p className="text-xs text-[#e5e2e1] font-medium [word-break:keep-all]">{result.lotName}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-[#99907c] text-[10px] block">검수 담당:</span>
                    <span className="text-[#e5e2e1] font-medium text-[11px] [word-break:keep-all]">
                      {result.inspector}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#99907c] text-[10px] block">반품 정책:</span>
                    <span className="text-[#f2ca50] font-semibold text-[11px] [word-break:keep-all]">
                      {result.coverage}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#99907c] text-[10px] block">봉인 태그 해시:</span>
                    <span className="text-[#e5e2e1] font-mono text-[10px] break-all">{result.tagHash}</span>
                  </div>
                  <div>
                    <span className="text-[#99907c] text-[10px] block">출고 일자:</span>
                    <span className="text-[#e5e2e1] text-[11px]">{result.releasedAt}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-[#ffb4ab] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] text-[#ffb4ab] font-semibold">조회된 기록이 없습니다</p>
                  <p className="text-[11px] text-[#d0c5af] mt-1 [word-break:keep-all]">
                    {notFoundCode ? `「${notFoundCode}」 는 ` : ''}이 예시 대장에 없는 번호입니다. 위의 예시 번호로
                    조회해 보세요.
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="w-full min-h-11 border border-[#d4af37]/40 text-[#d0c5af] text-[11px] tracking-wider uppercase hover:text-[#f2ca50] hover:border-[#f2ca50] transition-colors cursor-pointer"
            onClick={onClose}
          >
            확인 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
