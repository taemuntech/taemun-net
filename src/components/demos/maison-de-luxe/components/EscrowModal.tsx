import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatPrice } from '../data/luxuryData';
import { X, Gavel, ShieldCheck, CheckCircle } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface EscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onSuccess: () => void;
}

export const EscrowModal: React.FC<EscrowModalProps> = ({
  isOpen,
  onClose,
  items,
  onSuccess,
}) => {
  const [recipient, setRecipient] = useState<string>('김귀하');
  const [phone, setPhone] = useState<string>('010-0000-0000');
  const [address, setAddress] = useState<string>('서울특별시 강남구 압구정로 000 펜트하우스');
  const [specialNote, setSpecialNote] = useState<string>('경호원 직접 대면 인계 및 왁스 실링 패키징 요청');
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleNoticeOpen(true);
  };

  const handleNoticeClose = () => {
    setSampleNoticeOpen(false);
    onSuccess();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div className="bg-[#0e0e0e] border border-[#d4af37]/40 max-w-lg w-full p-6 lg:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
          <button
            type="button"
            className="absolute top-4 right-4 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer p-1"
            onClick={onClose}
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-2 border border-[#f2ca50] rounded-full flex items-center justify-center text-[#f2ca50]">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg lg:text-xl text-[#e5e2e1] font-semibold">
                공식 안심 예치 결제 계약
              </h3>
              <p className="text-xs text-[#d0c5af] mt-1 font-light">
                고객님의 결제 대금은 상품이 자택에 도착하여 진품 감정을 최종 확인할 때까지 보안 금고에 안전하게 예치됩니다.
              </p>
            </div>

            {/* Notice */}
            <p className="text-[11px] text-[#f2ca50] bg-[#1c1b1b] p-2.5 border border-[#4d4635] mb-4 text-center">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>

            {/* Summary Box */}
            <div className="p-3.5 bg-[#1c1b1b] border border-[#4d4635] mb-5 space-y-2 text-xs">
              <div className="flex justify-between text-[#99907c]">
                <span>주문 품목 ({items.length}종)</span>
                <span className="text-[#e5e2e1] font-medium truncate max-w-[200px]">
                  {items.map((i) => i.name).join(', ')}
                </span>
              </div>
              <div className="flex justify-between text-[#99907c]">
                <span>관·부가세 및 VIP 발렛 배송</span>
                <span className="text-[#f2ca50]">전액 면제 ₩ 0</span>
              </div>
              <div className="border-t border-[#4d4635] pt-2 flex justify-between font-bold text-[#e5e2e1]">
                <span>최종 안심 예치금</span>
                <span className="text-[#f2ca50] font-mono text-sm">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            {/* Delivery & Concierge Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  수령인 성함 (VIP CONNOISSEUR)
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-2 text-xs focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  전담 연락처 (SECURE PHONE)
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-2 text-xs focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  보안 배송 수령지 (DESTINATION VAULT / RESIDENCE)
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-2 text-xs focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div>
                <label className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  컨시어지 특별 요청사항 (SPECIAL HANDLING)
                </label>
                <textarea
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-2 text-xs focus:outline-none focus:border-[#f2ca50]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#f2ca50] text-[#0e0e0e] text-[12px] font-bold tracking-wider uppercase hover:bg-[#ffe088] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  200% 진품 보증 안심 예치 결제 승인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={sampleNoticeOpen}
        onClose={handleNoticeClose}
        slug="maison-de-luxe"
        industry="commerce"
        featureName="안심 예치 결제 계약"
      />
    </>
  );
};
