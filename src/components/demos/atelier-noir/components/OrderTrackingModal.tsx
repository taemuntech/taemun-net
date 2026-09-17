import React, { useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 샘플이라 실제 주문이 없다 — 조회 버튼은 미리 넣어 둔 예시 주문번호에만 결과를 돌려주고,
// 다른 번호에는 「조회되지 않는다」고 말한다. 항상 같은 화면을 띄우면 진짜 조회처럼 읽힌다.
const SAMPLE_ORDER_ID = 'AN-0000-000000';

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orderId, setOrderId] = useState(SAMPLE_ORDER_ID);
  const [queriedId, setQueriedId] = useState<string>(SAMPLE_ORDER_ID);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const normalized = queriedId.trim().toUpperCase();
  const trackingResult = normalized === SAMPLE_ORDER_ID;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end lg:items-center justify-center lg:p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="atelier-noir-tracking-title"
        tabIndex={-1}
        className="bg-[#1b1c1d] hairline-all max-w-md w-full max-h-[92vh] overflow-y-auto p-6 relative outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-[#e3e2e3] hover:text-[#caf300] cursor-pointer"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#caf300]"></span>
          <span className="font-label-sm text-xs text-[#caf300] uppercase tracking-wider">
            LOGISTICS TRACKING (예시)
          </span>
        </div>
        <h3 id="atelier-noir-tracking-title" className="font-headline-sm text-lg text-[#ffffff] font-bold mb-2 pr-10">
          주문 및 배송조회 (예시 데이터)
        </h3>
        <p className="text-[11px] text-[#8f9378] mb-4 leading-relaxed">
          샘플 사이트라 실제 주문이 없습니다. 예시 주문번호 <strong className="text-[#c5c9ac]">{SAMPLE_ORDER_ID}</strong> 로만
          화면 구성을 보여 드리고, 입력하신 내용은 어디에도 전송되지 않습니다.
        </p>

        <form
          data-sample-local
          onSubmit={(e) => {
            e.preventDefault();
            setQueriedId(orderId);
          }}
          className="flex gap-2 mb-5"
        >
          <label className="sr-only" htmlFor="atelier-noir-order-id">
            주문번호
          </label>
          <input
            id="atelier-noir-order-id"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="주문번호 입력 (예: AN-0000-000000)"
            className="flex-1 min-w-0 bg-[#121314] hairline-all px-3 min-h-11 text-xs text-[#ffffff] focus:outline-none focus:border-[#caf300]"
          />
          <button
            type="submit"
            className="bg-[#caf300] text-[#171e00] px-4 min-h-11 text-xs font-bold uppercase hover:bg-[#ffffff] transition-colors shrink-0 cursor-pointer"
          >
            조회
          </button>
        </form>

        {!trackingResult && (
          <div className="hairline-all bg-[#121314] p-4 text-xs text-[#c5c9ac] leading-relaxed">
            <span className="material-symbols-outlined text-[#8f9378] text-[18px] align-middle mr-1">info</span>
            '{queriedId.trim() || '(빈 값)'}' 로는 조회되지 않습니다. 이 화면은 샘플이라 예시 주문번호{' '}
            <strong className="text-[#ffffff]">{SAMPLE_ORDER_ID}</strong> 하나만 준비돼 있습니다.
            <button
              onClick={() => {
                setOrderId(SAMPLE_ORDER_ID);
                setQueriedId(SAMPLE_ORDER_ID);
              }}
              className="mt-3 flex items-center min-h-11 px-3 hairline-all bg-[#1f2021] hover:bg-[#292a2b] text-[#caf300] font-label-sm text-[11px] uppercase cursor-pointer"
            >
              예시 주문번호로 보기
            </button>
          </div>
        )}

        {trackingResult && (
          <div className="space-y-4">
            <div className="bg-[#1f2021] p-3.5 hairline-all text-xs">
              <div className="flex flex-wrap justify-between gap-2 text-[#8f9378] mb-1 font-label-sm">
                <span>주문번호: {normalized} (예시)</span>
                <span className="text-[#caf300] font-bold">배송중 (택배사 A · 예시)</span>
              </div>
              <div className="text-[#ffffff] font-medium mb-1">
                BRAND A (예시) 오버사이즈 울 캐시미어 더블 블레이저 (Noir Black / L)
              </div>
              <div className="text-[#8f9378] text-[11px]">
                송장번호: 0000-0000-0000 · 배송기사: 홍길동 (예시) 010-0000-0000
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
              <div>📍 14:20 ○○ 물류허브 (예시) 간선상차 처리완료</div>
              <div>📍 11:30 아틀리에 누아르 강남 플래그십 센터 출고검수 완료</div>
              <div className="text-[#caf300] pt-1">
                ✨ 예상 도착: 오늘 저녁 (예시 표기 — 도착 시각을 약속하는 문구가 아닙니다)
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-5 min-h-11 py-2.5 bg-[#292a2b] hover:bg-[#343536] text-[#ffffff] font-label-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
