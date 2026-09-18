import React from 'react';
import { CartItem } from '../types';
import { formatPrice } from '../data/luxuryData';
import { useDrawerBehavior } from '../use-drawer-behavior';
import { X, ShoppingBag, Lock, Minus, Plus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onChangeQuantity: (id: string, delta: number) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onChangeQuantity,
  onProceedCheckout,
}) => {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  // Esc 로 닫기 + 열려 있는 동안 배경 스크롤 잠금
  useDrawerBehavior(isOpen, onClose);

  return (
    <>
      {/* Backdrop — 바깥을 눌러도 닫힌다 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:bg-black/40 lg:backdrop-blur-none"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Cart Drawer Panel */}
      <div
        id="cartDrawer"
        role="dialog"
        aria-modal="true"
        aria-label="컬렉션 장바구니"
        inert={!isOpen}
        // 닫힌 서랍은 마운트된 채 화면 오른쪽 바깥(translate-x-full)에 서 있다 — 눈에 안 보일 뿐 상자는 살아 있어서,
        // 1920 화면에서 잰 본문 폭이 화면보다 넓은 2269px 로 나왔다(이 서랍과 컨시어지 서랍, 폭 448px 두 개).
        // 닫히면 invisible 로 숨긴다. 닫을 때만 visibility 를 전환 목록에 넣어 미끄러져 나가는 300ms 동안은 보이게 두고,
        // 열 때는 transform 만 전환해 곧바로 보이게 한다.
        className={`fixed top-[var(--sample-bar-h,0px)] bottom-0 right-0 max-w-md w-full bg-[#0e0e0e] border-l border-[#d4af37]/40 z-50 transform duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0 transition-transform' : 'translate-x-full invisible transition-[transform,translate,visibility]'
        }`}
      >
        {/* Header */}
        <div className="p-4 lg:p-5 border-b border-[#4d4635] flex items-center justify-between bg-[#131313]">
          <span className="font-serif text-base lg:text-lg text-[#e5e2e1] font-bold tracking-wide">
            컬렉션 장바구니 ({totalCount})
          </span>
          <button
            type="button"
            className="flex items-center justify-center h-11 w-11 -mr-2 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="장바구니 닫기"
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
              <p className="text-xs text-[#99907c] [word-break:keep-all]">
                살롱 컬렉션에서 소장하실 피스를 담아 보세요.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-[#1c1b1b] border border-[#4d4635] relative group">
                <div className="w-16 h-16 bg-[#201f1f] flex-shrink-0 border border-[#4d4635] overflow-hidden">
                  <img alt="" className="w-full h-full object-cover" src={item.image} referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#f2ca50] font-semibold tracking-wider uppercase truncate">
                    {item.brand}
                  </p>
                  <h4 className="text-xs lg:text-sm text-[#e5e2e1] font-medium leading-snug [word-break:keep-all]">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-[#99907c] mt-0.5">{item.taxNote}</p>

                  {/* 수량 조절 — 예전엔 삭제밖에 없었다 */}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center border border-[#4d4635]">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                        className="flex items-center justify-center h-11 w-11 lg:h-9 lg:w-9 text-[#d0c5af] hover:text-[#f2ca50] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        aria-label={`${item.name} 수량 줄이기`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="min-w-8 text-center text-xs text-[#e5e2e1] font-mono" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, 1)}
                        className="flex items-center justify-center h-11 w-11 lg:h-9 lg:w-9 text-[#d0c5af] hover:text-[#f2ca50] transition-colors cursor-pointer"
                        aria-label={`${item.name} 수량 늘리기`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs lg:text-sm text-[#f2ca50] font-bold whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  className="flex items-center justify-center h-11 w-11 -mt-1 -mr-1 shrink-0 text-[#99907c] hover:text-[#ffb4ab] transition-colors self-start cursor-pointer"
                  aria-label={`${item.name} 장바구니에서 빼기`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}

          {/* Pricing Ledger Breakdown */}
          {items.length > 0 && (
            <div className="bg-[#0e0e0e] border border-[#4d4635] p-3.5 text-xs space-y-2 text-[#d0c5af]">
              <div className="flex justify-between gap-2">
                <span className="text-[#99907c]">상품 합계</span>
                <span className="font-mono text-[#e5e2e1]">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#99907c]">관·부가세</span>
                <span className="text-[#f2ca50] font-semibold">표시가에 포함</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#99907c]">컨시어지 배송비</span>
                <span className="text-[#f2ca50] font-semibold">₩ 0</span>
              </div>
              <div className="border-t border-[#4d4635] pt-2.5 flex justify-between gap-2 font-bold text-sm text-[#e5e2e1]">
                <span>결제 예정 금액</span>
                <span className="text-[#f2ca50] text-base font-mono">{formatPrice(totalAmount)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Action */}
        <div className="p-4 lg:p-5 border-t border-[#4d4635] bg-[#131313] space-y-2">
          <p className="text-[10px] text-[#99907c] text-center [word-break:keep-all]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={onProceedCheckout}
            className="w-full py-3.5 bg-[#f2ca50] text-[#0e0e0e] text-[12px] tracking-wider uppercase font-bold hover:bg-[#ffe088] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99]"
          >
            <Lock className="w-4 h-4" />
            주문서 작성하기
          </button>
        </div>
      </div>
    </>
  );
};
