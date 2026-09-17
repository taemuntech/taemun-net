import React from 'react';
import { CartItem } from '../types';
import { formatPrice } from '../data/luxuryData';
import { X, ShoppingBag, Lock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Cart Drawer Panel */}
      <div
        id="cartDrawer"
        className={`fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-md w-full bg-[#0e0e0e] border-l border-[#d4af37]/40 z-50 transform transition-transform duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-[#4d4635] flex items-center justify-between bg-[#131313]">
          <span className="font-serif text-base lg:text-lg text-[#e5e2e1] font-bold tracking-wide">
            컬렉션 장바구니 ({items.reduce((s, i) => s + i.quantity, 0)})
          </span>
          <button
            type="button"
            className="text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer p-1"
            onClick={onClose}
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 p-4 lg:p-5 space-y-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-16 text-[#99907c] space-y-3">
              <ShoppingBag className="w-10 h-10 mx-auto text-[#4d4635]" />
              <p className="text-sm text-[#d0c5af]">장바구니가 비어 있습니다.</p>
              <p className="text-xs text-[#99907c]">살롱 컬렉션에서 소장하실 명품을 담아보세요.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-[#1c1b1b] border border-[#4d4635] relative group"
              >
                <div className="w-16 h-16 bg-[#201f1f] flex-shrink-0 border border-[#4d4635] overflow-hidden">
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover"
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-[10px] text-[#f2ca50] font-semibold tracking-wider uppercase">
                    {item.brand}
                  </p>
                  <h4 className="text-xs lg:text-sm text-[#e5e2e1] font-medium truncate">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#99907c] mt-0.5">{item.taxNote}</p>
                  <p className="text-xs lg:text-sm text-[#f2ca50] font-bold mt-1">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-[#99907c] hover:text-[#ffb4ab] transition-colors p-1 self-start"
                  title="삭제"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}

          {/* Pricing Ledger Breakdown */}
          {items.length > 0 && (
            <div className="bg-[#0e0e0e] border border-[#4d4635] p-3.5 text-xs space-y-2 text-[#d0c5af]">
              <div className="flex justify-between">
                <span className="text-[#99907c]">기본 상품가</span>
                <span className="font-mono text-[#e5e2e1]">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99907c]">수입 관·부가세 (전액 지원)</span>
                <span className="text-[#f2ca50] font-semibold">₩ 0 (포함)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99907c]">VIP 발렛 안심 배송비</span>
                <span className="text-[#f2ca50] font-semibold">₩ 0 (무료)</span>
              </div>
              <div className="border-t border-[#4d4635] pt-2.5 flex justify-between font-bold text-sm text-[#e5e2e1]">
                <span>최종 결제 예정 금액</span>
                <span className="text-[#f2ca50] text-base font-mono">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Action */}
        <div className="p-4 lg:p-5 border-t border-[#4d4635] bg-[#131313]">
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onProceedCheckout}
            className="w-full py-3.5 bg-[#f2ca50] text-[#0e0e0e] text-[12px] tracking-wider uppercase font-bold hover:bg-[#ffe088] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
          >
            <Lock className="w-4 h-4" />
            안심 예치 결제 진행
          </button>
        </div>
      </div>
    </>
  );
};
