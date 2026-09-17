import React, { useRef, useState } from 'react';
import { CartItem, PackagingOptions } from '../types';
import { formatPrice } from '../data/luxuryData';
import { X, Gavel, ShieldCheck } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  packaging: PackagingOptions;
  onSuccess: () => void;
}

/**
 * 주문서 모달.
 *
 * 예전 이름은 EscrowModal 이었고 「공식 안심 예치 결제 계약」·「최종 안심 예치금」이라고 적혀 있었다.
 * 금지어 「에스크로」만 피한 표기였을 뿐, 결제대금예치(전자상거래법상 요건이 붙는 제도)를 그대로 약속하는
 * 화면이었다. 지금은 평범한 주문서다 — 예치·보증 약속을 하지 않는다.
 *
 * 제출해도 아무 데도 보내지 않는다. SampleNotice 만 연다(가짜 주문번호·접수 완료 화면을 만들지 않는다).
 */
export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, packaging, onSuccess }) => {
  const [recipient, setRecipient] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [specialNote, setSpecialNote] = useState<string>('');
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // 안내 모달이 열리면 그쪽이 포커스·Esc 를 맡는다(두 개가 서로 포커스를 뺏지 않게)
  useSampleDialog({
    open: isOpen && !sampleNoticeOpen,
    onClose,
    dialogRef,
    initialFocusRef: firstFieldRef,
  });

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleNoticeOpen(true);
  };

  const handleNoticeClose = () => {
    setSampleNoticeOpen(false);
    onSuccess();
    onClose();
  };

  const packagingLabels = [
    packaging.boutiquePackage ? '부티크 패키지 + 왁스 실링' : null,
    packaging.valetDelivery ? '컨시어지 대면 인계 배송' : null,
  ].filter((v): v is string => Boolean(v));

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mdl-checkout-title"
          tabIndex={-1}
          className="bg-[#0e0e0e] border border-[#d4af37]/40 max-w-lg w-full p-6 lg:p-8 relative shadow-2xl outline-none max-h-[90vh] overflow-y-auto"
        >
          <button
            type="button"
            className="absolute top-2 right-2 flex items-center justify-center h-11 w-11 text-[#99907c] hover:text-[#f2ca50] transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            <div className="text-center mb-6 px-8">
              <div className="w-12 h-12 mx-auto mb-2 border border-[#f2ca50] rounded-full flex items-center justify-center text-[#f2ca50]">
                <Gavel className="w-6 h-6" />
              </div>
              <h3
                id="mdl-checkout-title"
                className="font-serif text-lg lg:text-xl text-[#e5e2e1] font-semibold [word-break:keep-all]"
              >
                주문서 작성
              </h3>
              <p className="text-xs text-[#d0c5af] mt-1 font-light [word-break:keep-all]">
                수령 정보와 컨시어지 요청사항을 적어 주시면 담당자가 배송 일정을 조율한다는 설정의 화면입니다.
              </p>
            </div>

            {/* Notice */}
            <p className="text-[11px] text-[#f2ca50] bg-[#1c1b1b] p-2.5 border border-[#4d4635] mb-4 text-center [word-break:keep-all]">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>

            {/* Summary Box */}
            <div className="p-3.5 bg-[#1c1b1b] border border-[#4d4635] mb-5 space-y-2 text-xs">
              <div className="flex justify-between gap-3 text-[#99907c]">
                <span className="whitespace-nowrap">주문 품목 ({totalCount}점)</span>
                <span className="text-[#e5e2e1] font-medium text-right [word-break:keep-all]">
                  {items.map((i) => i.name).join(', ')}
                </span>
              </div>
              <div className="flex justify-between gap-3 text-[#99907c]">
                <span className="whitespace-nowrap">패키징 옵션</span>
                <span className="text-[#f2ca50] text-right [word-break:keep-all]">
                  {packagingLabels.length > 0 ? packagingLabels.join(' · ') : '선택 없음'}
                </span>
              </div>
              <div className="flex justify-between gap-3 text-[#99907c]">
                <span className="whitespace-nowrap">관·부가세 · 배송비</span>
                <span className="text-[#f2ca50]">표시가에 포함</span>
              </div>
              <div className="border-t border-[#4d4635] pt-2 flex justify-between gap-3 font-bold text-[#e5e2e1]">
                <span>결제 예정 금액</span>
                <span className="text-[#f2ca50] font-mono text-sm">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Delivery & Concierge Form */}
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label
                  htmlFor="mdl-recipient"
                  className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1"
                >
                  수령인 성함
                </label>
                <input
                  id="mdl-recipient"
                  ref={firstFieldRef}
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full min-h-11 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-3 text-xs focus:outline-none focus:border-[#f2ca50] placeholder-[#6d6558]"
                />
              </div>

              <div>
                <label htmlFor="mdl-phone" className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  연락처
                </label>
                <input
                  id="mdl-phone"
                  type="tel"
                  required
                  placeholder="예: 010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full min-h-11 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-3 text-xs focus:outline-none focus:border-[#f2ca50] placeholder-[#6d6558]"
                />
              </div>

              <div>
                <label htmlFor="mdl-address" className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  배송 수령지
                </label>
                <input
                  id="mdl-address"
                  type="text"
                  required
                  placeholder="예: 서울특별시 ○○구 ○○로 00"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full min-h-11 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-3 text-xs focus:outline-none focus:border-[#f2ca50] placeholder-[#6d6558]"
                />
              </div>

              <div>
                <label htmlFor="mdl-note" className="block text-[#99907c] text-[10px] uppercase font-semibold mb-1">
                  컨시어지 요청사항
                </label>
                <textarea
                  id="mdl-note"
                  rows={2}
                  placeholder="예: 왁스 실링 포장과 대면 인계 요청"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full min-h-11 bg-[#1c1b1b] border border-[#d4af37]/40 text-[#e5e2e1] px-3 py-3 text-xs focus:outline-none focus:border-[#f2ca50] placeholder-[#6d6558]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#f2ca50] text-[#0e0e0e] text-[12px] font-bold tracking-wider uppercase hover:bg-[#ffe088] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  주문서 보내기
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
        featureName="장바구니 주문서"
      />
    </>
  );
};
