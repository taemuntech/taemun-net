import React from 'react';
import { HardwareProduct } from '../../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: HardwareProduct[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCart: (product: HardwareProduct) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveFromCompare,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#111827] border border-[#4cd7f6] rounded-xl max-w-5xl w-full p-4 lg:p-6 spec-hairline shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#424754] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-xl">compare_arrows</span>
            <h3 className="text-base font-headline font-bold text-[#dfe2ee]">
              선택 하드웨어 실시간 대조 매트릭스 ({products.length}대 비교 중)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#1c2028] text-[#8c909f] hover:text-[#dfe2ee] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-x-auto py-4">
          {products.length === 0 ? (
            <div className="py-12 text-center text-[#8c909f]">
              <p className="text-sm">비교함에 담긴 제품이 없습니다.</p>
              <p className="text-xs mt-1">제품 카드의 '비교' 체크박스를 클릭하여 매트릭스를 구성해 보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-w-[680px]">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#181c24] border border-[#424754] rounded-lg p-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-label text-[#4cd7f6] bg-[#0a0e16] px-1.5 py-0.5 rounded border border-[#424754]">
                        {p.tag}
                      </span>
                      <button
                        onClick={() => onRemoveFromCompare(p.id)}
                        className="text-[#8c909f] hover:text-[#ffb4ab] text-xs"
                        title="비교함에서 제거"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="h-28 w-auto object-contain mx-auto bg-[#0a0e16] rounded p-2"
                    />
                    <h4 className="text-xs font-bold text-[#dfe2ee] mt-2 line-clamp-1">{p.name}</h4>
                    <div className="text-xs font-headline font-bold text-[#ec6a06] mt-1">
                      ₩{p.discountPrice.toLocaleString()}
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#424754] space-y-1.5 text-[11px]">
                      {p.specs.cpu && (
                        <div>
                          <span className="text-[#8c909f] block text-[10px]">CPU</span>
                          <span className="text-[#dfe2ee] font-semibold">{p.specs.cpu}</span>
                        </div>
                      )}
                      {p.specs.gpu && (
                        <div>
                          <span className="text-[#8c909f] block text-[10px]">GPU / TGP</span>
                          <span className="text-[#4cd7f6] font-semibold">{p.specs.gpu}</span>
                        </div>
                      )}
                      {p.specs.display && (
                        <div>
                          <span className="text-[#8c909f] block text-[10px]">디스플레이</span>
                          <span className="text-[#dfe2ee]">{p.specs.display}</span>
                        </div>
                      )}
                      {p.specs.cooling && (
                        <div>
                          <span className="text-[#8c909f] block text-[10px]">쿨링 솔루션</span>
                          <span className="text-[#c2c6d6]">{p.specs.cooling}</span>
                        </div>
                      )}
                      {p.specs.ports && (
                        <div>
                          <span className="text-[#8c909f] block text-[10px]">포트/인터페이스</span>
                          <span className="text-[#c2c6d6]">{p.specs.ports}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(p);
                      onClose();
                    }}
                    className="w-full mt-3 py-1.5 bg-[#31353e] hover:bg-[#ec6a06] hover:text-[#4a1c00] text-[#dfe2ee] rounded font-label text-xs font-bold transition-all cursor-pointer"
                  >
                    장바구니 담기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
