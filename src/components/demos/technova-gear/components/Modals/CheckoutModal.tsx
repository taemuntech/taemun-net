'use client';

import React, { useRef, useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  totalPrice: number;
}

// 결제 수단은 실존 간편결제·PG 상호를 쓰지 않는다. 내부 키 이름도 'toss'·'kakao'·'escrow' 를 쓰지 않는다 —
// 지우기 쉬운 화면 문구만 바꾸고 코드에 상호가 남으면 다음 사람이 그대로 되살린다.
type PaymentMethod = 'card' | 'easyA' | 'easyB' | 'transfer';

const PAYMENT_OPTIONS: Array<{ id: PaymentMethod; label: string; icon?: string }> = [
  { id: 'card', label: '신용/체크카드 (5% 할인 · 예시)', icon: 'credit_card' },
  { id: 'easyA', label: '간편결제 A (예시)' },
  { id: 'easyB', label: '간편결제 B (예시)' },
  { id: 'transfer', label: '실시간 계좌이체 (예시)' },
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  productTitle,
  totalPrice,
}) => {
  const [address, setAddress] = useState('서울특별시 용산구 청파로 109 (예시 주소)');
  const [phone, setPhone] = useState('010-0000-0000');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [installment, setInstallment] = useState<string>('24');
  // 샘플이라 주문을 받지 않는다 — 가짜 주문번호·운송장 대신 공용 안내(SampleNotice)만 열고 장바구니도 그대로 둔다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const dialogRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // 안내 모달이 열려 있는 동안에는 이 모달이 Esc·포커스를 가로채지 않게 비활성화한다.
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="technova-checkout-title"
        tabIndex={-1}
        onSubmit={handleConfirmOrder}
        className="bg-[#111827] border border-[#ec6a06] rounded-t-2xl lg:rounded-xl max-w-lg w-full max-h-[92vh] lg:max-h-[88vh] overflow-y-auto p-4 lg:p-6 spec-hairline shadow-2xl outline-none relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#424754] pb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#ec6a06] text-xl shrink-0">bolt</span>
            <h3 id="technova-checkout-title" className="text-sm lg:text-base font-headline font-bold text-[#dfe2ee]">
              주문서 (샘플 — 접수되지 않음)
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="주문서 닫기"
            className="shrink-0 min-h-11 min-w-11 flex items-center justify-center rounded hover:bg-[#1c2028] text-[#8c909f] hover:text-[#dfe2ee] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="py-4 space-y-3.5 text-xs">
          {/* Product Info */}
          <div className="bg-[#0a0e16] p-3 rounded border border-[#424754]">
            <span className="text-[#8c909f] text-[10px] font-label block uppercase">주문 품목</span>
            <span className="text-sm font-bold text-[#dfe2ee] block mt-0.5">{productTitle}</span>
            <div className="flex flex-wrap justify-between items-center gap-2 mt-2 pt-2 border-t border-[#424754]/60">
              <span className="text-[#4cd7f6]">⚡ 무료 새벽배송 (예시 조건)</span>
              <span className="text-sm font-headline font-bold text-[#ec6a06]">
                ₩{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <label htmlFor="technova-checkout-address" className="text-[11px] font-label text-[#8c909f] block mb-1">
              배송지 주소
            </label>
            <input
              id="technova-checkout-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 bg-[#181c24] border border-[#424754] rounded px-2 text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="technova-checkout-phone" className="text-[11px] font-label text-[#8c909f] block mb-1">
              연락처 (배송 안내 수신)
            </label>
            <input
              id="technova-checkout-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 bg-[#181c24] border border-[#424754] rounded px-2 text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:outline-none"
            />
          </div>

          {/* Payment Methods */}
          <fieldset>
            <legend className="text-[11px] font-label text-[#8c909f] mb-1">결제 수단 선택</legend>
            <div className="grid grid-cols-2 gap-2 text-xs font-label">
              {PAYMENT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPaymentMethod(opt.id)}
                  aria-pressed={paymentMethod === opt.id}
                  className={`min-h-11 px-2 rounded border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${ paymentMethod === opt.id ? 'bg-[#03b5d3]/20 border-[#4cd7f6] text-[#4cd7f6] font-bold' : 'bg-[#181c24] border-[#424754] text-[#c2c6d6]' }`}
                >
                  {opt.icon && <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Installment Plan */}
          {paymentMethod === 'card' && (
            <div>
              <label htmlFor="technova-checkout-installment" className="text-[11px] font-label text-[#8c909f] block mb-1">
                무이자 할부 기간 선택 (예시 조건)
              </label>
              <select
                id="technova-checkout-installment"
                value={installment}
                onChange={(e) => setInstallment(e.target.value)}
                className="w-full h-11 bg-[#181c24] border border-[#424754] rounded px-2 text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:outline-none cursor-pointer"
              >
                <option value="1">일시불</option>
                <option value="3">3개월 (월 ₩{Math.round(totalPrice / 3).toLocaleString()})</option>
                <option value="6">6개월 (월 ₩{Math.round(totalPrice / 6).toLocaleString()})</option>
                <option value="12">12개월 (월 ₩{Math.round(totalPrice / 12).toLocaleString()})</option>
                <option value="24">24개월 (월 ₩{Math.round(totalPrice / 24).toLocaleString()})</option>
              </select>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-[#424754] pt-3">
          <p className="mb-2.5 rounded border border-[#4cd7f6]/60 bg-[#0a0e16] px-3 py-2 text-center text-[12px] leading-relaxed text-[#dfe2ee]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>
          <button
            id="btn-confirm-checkout"
            type="submit"
            className="w-full h-11 bg-[#ec6a06] hover:bg-[#ff7a1a] text-[#4a1c00] font-label text-xs font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all orange-glow active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">lock</span> ₩{totalPrice.toLocaleString()} 결제 진행
          </button>
        </div>
      </form>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="technova-gear"
        industry="commerce"
        featureName="주문·결제 흐름"
      />
    </div>
  );
};
