'use client';

import React, { useRef, useState } from 'react';
import { X, Truck, Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface DeliveryCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryCheckModal: React.FC<DeliveryCheckModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{
    available: boolean;
    areaName: string;
    message: string;
  } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setResult(null);
    onClose();
  };

  useSampleDialog({ open: isOpen, onClose: handleClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const handleCheck = (areaName: string) => {
    const q = areaName.trim();
    if (!q) return;

    // Fast check logic: Seoul / Gyeonggi metropolitan areas are instant delivery
    const instantAreas = ['강남', '서초', '송파', '마포', '영등포', '용산', '성동', '분당', '수원', '판교', '일산'];
    const isInstant = instantAreas.some((area) => q.includes(area));

    if (isInstant) {
      setResult({
        available: true,
        areaName: q,
        message: '당일배송 권역으로 설정된 지역입니다. (오늘 출고 · 예시 결과)',
      });
    } else {
      setResult({
        available: false,
        areaName: q,
        message: '익일 특급 배송 지역입니다. (오늘 주문 시 택배사 편으로 내일 오전 도착 · 예시 결과)',
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end lg:items-center justify-center lg:p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="당일배송 가능지역 조회"
        tabIndex={-1}
        className="bg-white rounded-t-3xl lg:rounded-3xl lg:max-w-md w-full p-6 shadow-2xl border border-white space-y-5 outline-none animate-in slide-in-from-bottom lg:zoom-in-95 duration-200 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#006948]" />
            <h3 className="text-lg font-bold text-[#141b2b]">당일배송 가능지역 조회</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="배송지역 조회 닫기"
            className="w-11 h-11 -mr-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-[#3d4a42]">
            배송받으실 지역(구/동 또는 도로명)을 입력하시면 당일배송 가능 여부를 화면에서 바로 보여 드립니다. 샘플이라 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheck(query);
            }}
            data-sample-local
            className="relative flex items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예: 강남구 테헤란로, 마포구 서교동"
              className="w-full h-12 pl-4 pr-14 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#006948]/20 focus:border-[#006948] outline-none"
            />
            <button
              type="submit"
              aria-label="배송지역 조회"
              className="absolute right-1 top-0.5 w-11 h-11 flex items-center justify-center bg-[#006948] text-white rounded-lg hover:bg-[#00855d] cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick area chips */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#6d7a72]">
            <span>빠른 선택:</span>
            {['강남구 역삼동', '서초구 반포동', '마포구 상암동', '성남시 분당구'].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setQuery(area);
                  handleCheck(area);
                }}
                className="px-3 min-h-11 lg:min-h-0 lg:py-0.5 inline-flex items-center rounded-md bg-gray-100 hover:bg-gray-200 text-[#141b2b] transition-colors cursor-pointer font-medium"
              >
                {area}
              </button>
            ))}
          </div>

          {/* Result Card */}
          {result && (
            <div
              className={`p-4 rounded-xl border space-y-1 animate-in fade-in duration-200 ${ result.available ? 'bg-[#006948]/10 border-[#006948]/30 text-[#006948]' : 'bg-amber-50 border-amber-200 text-amber-900' }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                {result.available ? (
                  <CheckCircle2 className="w-4 h-4 text-[#006948]" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
                <span>[{result.areaName}] 조회 결과</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed">{result.message}</p>
            </div>
          )}

          <div className="p-3 bg-[#f1f3ff] rounded-xl text-[11px] text-[#3d4a42] space-y-1 leading-relaxed">
            <p className="font-bold text-[#141b2b]">당일배송 서비스 안내 (예시)</p>
            <p>• 오후 4시 이전 결제 완료 건: 당일 출고 (예시 기준)</p>
            <p>• 30,000원 이상 주문 시 당일배송 무료</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-full flex items-center justify-center cursor-pointer transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};
