import React, { useState } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  totalPrice: number;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  productTitle,
  totalPrice,
  onOrderComplete,
}) => {
  const [address, setAddress] = useState('서울특별시 용산구 청파로 109 나진전자월드 701호');
  const [phone, setPhone] = useState('010-8842-1598');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'toss' | 'kakao' | 'escrow'>('card');
  const [installment, setInstallment] = useState<string>('24');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onOrderComplete();
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111827] border border-[#ec6a06] rounded-xl max-w-lg w-full p-4 lg:p-6 spec-hairline shadow-2xl relative">
        {isOrdered ? (
          <div className="py-10 flex flex-col items-center justify-center text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#ec6a06]/20 border border-[#ec6a06] flex items-center justify-center text-[#ec6a06] mb-3 orange-glow">
              <span className="material-symbols-outlined text-3xl">check</span>
            </div>
            <h3 className="text-xl font-headline font-bold text-[#dfe2ee]">
              주문 및 물류 배차 완료!
            </h3>
            <p className="text-xs text-[#c2c6d6] mt-2">
              서울 물류센터에서 로켓디지털 익일 새벽 7시 도착 배송이 접수되었습니다.
            </p>
            <div className="mt-4 bg-[#0a0e16] p-3 rounded border border-[#424754] text-xs font-mono text-[#4cd7f6]">
              운송장: TNV-EXP-20250916-9921
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#424754] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ec6a06] text-xl">bolt</span>
                <h3 className="text-base font-headline font-bold text-[#dfe2ee]">
                  로켓 익일 새벽 7시 즉시 주문
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-[#1c2028] text-[#8c909f] hover:text-[#dfe2ee] transition-colors cursor-pointer"
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
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#424754]/60">
                  <span className="text-[#4cd7f6]">⚡ 로켓디지털 무료 익일 새벽배송</span>
                  <span className="text-sm font-headline font-bold text-[#ec6a06]">
                    ₩{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <label className="text-[11px] font-label text-[#8c909f] block mb-1">
                  배송지 주소 (새벽 7시 수령지)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#181c24] border border-[#424754] rounded p-2 text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-label text-[#8c909f] block mb-1">
                  안심 연락처 (배송 완료 문자 수신)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181c24] border border-[#424754] rounded p-2 text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:outline-none"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-[11px] font-label text-[#8c909f] block mb-1">결제 수단 선택</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-label">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2 rounded border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${ paymentMethod === 'card' ? 'bg-[#03b5d3]/20 border-[#4cd7f6] text-[#4cd7f6] font-bold' : 'bg-[#181c24] border-[#424754] text-[#c2c6d6]' }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">credit_card</span>
                    신용/체크카드 (5% 할인)
                  </button>

                  <button
                    onClick={() => setPaymentMethod('toss')}
                    className={`p-2 rounded border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${ paymentMethod === 'toss' ? 'bg-[#03b5d3]/20 border-[#4cd7f6] text-[#4cd7f6] font-bold' : 'bg-[#181c24] border-[#424754] text-[#c2c6d6]' }`}
                  >
                    토스페이 간편결제
                  </button>

                  <button
                    onClick={() => setPaymentMethod('kakao')}
                    className={`p-2 rounded border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${ paymentMethod === 'kakao' ? 'bg-[#03b5d3]/20 border-[#4cd7f6] text-[#4cd7f6] font-bold' : 'bg-[#181c24] border-[#424754] text-[#c2c6d6]' }`}
                  >
                    카카오페이
                  </button>

                  <button
                    onClick={() => setPaymentMethod('escrow')}
                    className={`p-2 rounded border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${ paymentMethod === 'escrow' ? 'bg-[#03b5d3]/20 border-[#4cd7f6] text-[#4cd7f6] font-bold' : 'bg-[#181c24] border-[#424754] text-[#c2c6d6]' }`}
                  >
                    에스크로 실시간이체
                  </button>
                </div>
              </div>

              {/* Installment Plan */}
              {paymentMethod === 'card' && (
                <div>
                  <label className="text-[11px] font-label text-[#8c909f] block mb-1">
                    무이자 할부 기간 선택
                  </label>
                  <select
                    value={installment}
                    onChange={(e) => setInstallment(e.target.value)}
                    className="w-full bg-[#181c24] border border-[#424754] rounded p-2 text-xs text-[#dfe2ee] focus:border-[#4cd7f6] focus:outline-none cursor-pointer"
                  >
                    <option value="1">일시불</option>
                    <option value="3">3개월 무이자 (월 ₩{Math.round(totalPrice / 3).toLocaleString()})</option>
                    <option value="6">6개월 무이자 (월 ₩{Math.round(totalPrice / 6).toLocaleString()})</option>
                    <option value="12">12개월 무이자 (월 ₩{Math.round(totalPrice / 12).toLocaleString()})</option>
                    <option value="24">24개월 무이자 (월 ₩{Math.round(totalPrice / 24).toLocaleString()}) [추천]</option>
                  </select>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-[#424754] pt-3">
              <button
                id="btn-confirm-checkout"
                onClick={handleConfirmOrder}
                className="w-full h-11 bg-[#ec6a06] hover:bg-[#ff7a1a] text-[#4a1c00] font-label text-xs font-bold uppercase rounded flex items-center justify-center gap-1.5 transition-all orange-glow active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">lock</span> ₩{totalPrice.toLocaleString()} 결제 및 내일 새벽 배차하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
