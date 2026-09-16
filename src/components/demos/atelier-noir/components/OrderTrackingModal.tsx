import React, { useState } from 'react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orderId, setOrderId] = useState('AN-2026-981240');
  const [trackingResult, setTrackingResult] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#1b1c1d] hairline-all max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#e3e2e3] hover:text-[#caf300] p-1"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#caf300]"></span>
          <span className="font-label-sm text-xs text-[#caf300] uppercase tracking-wider">
            REAL-TIME LOGISTICS DISPATCH
          </span>
        </div>
        <h3 className="font-headline-sm text-lg text-[#ffffff] font-bold mb-4">
          실시간 주문 및 배송조회
        </h3>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="주문번호 또는 송장번호 입력"
            className="flex-1 bg-[#121314] hairline-all px-3 py-2 text-xs text-[#ffffff] focus:outline-none focus:border-[#caf300]"
          />
          <button
            onClick={() => setTrackingResult(true)}
            className="bg-[#caf300] text-[#171e00] px-4 py-2 text-xs font-bold uppercase hover:bg-[#ffffff] transition-colors"
          >
            조회
          </button>
        </div>

        {trackingResult && (
          <div className="space-y-4">
            <div className="bg-[#1f2021] p-3.5 hairline-all text-xs">
              <div className="flex justify-between text-[#8f9378] mb-1 font-label-sm">
                <span>주문번호: {orderId}</span>
                <span className="text-[#caf300] font-bold">배송중 (CJ대한통운)</span>
              </div>
              <div className="text-[#ffffff] font-medium mb-1">
                RECTO 오버사이즈 울 캐시미어 더블 블레이저 (Noir Black / L)
              </div>
              <div className="text-[#8f9378] text-[11px]">
                송장번호: 6819-2041-9812 · 배송기사: 김철수 (010-XXXX-5821)
              </div>
            </div>

            {/* Stepper */}
            <div className="py-2">
              <div className="grid grid-cols-4 text-center font-label-sm text-[11px] gap-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span className="text-[#e3e2e3]">결제완료</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center font-bold text-[10px]">
                    ✓
                  </div>
                  <span className="text-[#e3e2e3]">상품준비</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#caf300] text-[#171e00] flex items-center justify-center font-bold text-[10px] animate-pulse">
                    3
                  </div>
                  <span className="text-[#caf300] font-bold">배송중</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#343536] text-[#8f9378] flex items-center justify-center text-[10px]">
                    4
                  </div>
                  <span className="text-[#8f9378]">배송완료</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#121314] hairline-all text-[11px] text-[#8f9378] space-y-1">
              <div>📍 14:20 성수 곤지암 허브 간선상차 처리완료</div>
              <div>📍 11:30 아틀리에 누아르 강남 플래그십 센터 출고검수 완료</div>
              <div className="text-[#caf300] pt-1">
                ✨ 오늘 오후 18시 전 배송 예정 (도어투도어 프리미엄 안심배송)
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 bg-[#292a2b] hover:bg-[#343536] text-[#ffffff] font-label-sm text-xs tracking-wider uppercase transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
