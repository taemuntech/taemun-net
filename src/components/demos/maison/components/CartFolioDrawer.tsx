"use client";

import React, { useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Product } from '../types';
import { useOverlay } from '../use-overlay';

interface CartFolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (productId: string) => void;
  onProceedToInquiry: () => void;
}

export const CartFolioDrawer: React.FC<CartFolioDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onProceedToInquiry,
}) => {
  // 샘플이라 소장 의뢰를 접수하지 않는다 — 「전달되었습니다」 대신 공용 안내(SampleNotice)를 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // ESC 닫기·배경 스크롤 잠금. 훅이라 `if (!isOpen) return null` 보다 먼저 불러야 한다.
  // 위에 겹치는 SampleNotice 가 열려 있는 동안엔 ESC 를 그쪽에 넘긴다.
  const dialogRef = useRef<HTMLDivElement>(null);
  useOverlay(isOpen && !isNoticeOpen, onClose, dialogRef);

  if (!isOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const formattedTotal = '₩ ' + totalPrice.toLocaleString('ko-KR');

  const handleSendInquiry = () => {
    setIsNoticeOpen(true);
  };

  // 안내를 닫으면 원래 흐름대로 서류함을 닫고 살롱 예약 섹션으로 보낸다.
  const handleNoticeClose = () => {
    setIsNoticeOpen(false);
    onClose();
    onProceedToInquiry();
  };

  return (
    <>
      <div
        id="cart-folio-drawer-backdrop"
        className="fixed inset-0 z-50 bg-[#14190e]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        onClick={onClose}
      >
        <aside
          id="cart-folio-drawer"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="소장 서류함 (Acquisition Folio)"
          tabIndex={-1}
          className="bg-[#fff8f5] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#d6c2c2] animate-in slide-in-from-right duration-300 outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#d6c2c2] flex justify-between items-center bg-[#fbf2ed]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#735b24] font-bold block">
                Acquisition Folio
              </span>
              <h3 className="font-serif text-[20px] text-[#300a10]">
                소장 희망 서류함 ({items.length})
              </h3>
            </div>
            <button
              id="btn-close-cart-drawer"
              type="button"
              onClick={onClose}
              aria-label="소장 희망 서류함 닫기"
              className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-[#514344] hover:text-[#300a10] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Content List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 text-[#514344]">
                <span className="material-symbols-outlined text-4xl text-[#d6c2c2]">
                  draft
                </span>
                <p className="font-serif text-[17px]">
                  서류함에 담긴 작품이 없습니다.
                </p>
                <p className="text-xs text-[#514344]/80 max-w-xs">
                  원하시는 오리지널 앤틱을 둘러보시고 '소장 의뢰서에 담기'를 선택해 주세요.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f5ece7] p-3 border border-[#d6c2c2] flex gap-3 items-center justify-between"
                >
                  <div className="w-16 h-16 bg-[#efe6e2] overflow-hidden shrink-0 border border-[#d6c2c2]">
                    <img
                      alt={item.imageAlt}
                      src={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[9px] uppercase tracking-wider text-[#735b24] font-semibold block">
                      {item.period}
                    </span>
                    <h4 className="font-serif text-[14px] text-[#300a10] font-bold truncate">
                      {item.name}
                    </h4>
                    <p className="font-serif text-[14px] text-[#735b24] font-medium">
                      {item.formattedPrice}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-[#847374] hover:text-[#300a10] cursor-pointer"
                    aria-label={`${item.name} 서류함에서 제거`}
                    title="제거"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#d6c2c2] bg-[#fbf2ed] space-y-4">
              <div className="space-y-1.5 text-xs font-serif text-[#514344]">
                <div className="flex justify-between">
                  <span>선택 작품 수</span>
                  <span className="font-medium text-[#1e1b18]">{items.length} 점</span>
                </div>
                <div className="flex justify-between">
                  <span>운송 &amp; 보존 포장</span>
                  <span className="text-[#735b24] font-semibold">화이트글러브 전담</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#d6c2c2] text-sm">
                  <span className="font-semibold text-[#300a10]">소장 가액 합계</span>
                  <span className="font-bold text-[#300a10] text-[18px]">
                    {formattedTotal}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendInquiry}
                className="w-full bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] py-3.5 text-[12px] uppercase tracking-widest font-semibold transition-colors cursor-pointer text-center"
              >
                소장 심사 및 프라이빗 상담 신청
              </button>

              <p className="text-[10px] text-[#514344] text-center font-serif">
                * 샘플 사이트입니다 — 화면의 작품·가격·합계는 모두 예시이고 결제는 진행되지 않습니다.
              </p>
            </div>
          )}
        </aside>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={handleNoticeClose}
        slug="maison"
        industry="commerce"
        featureName="소장 의뢰 상담 신청"
      />
    </>
  );
};
