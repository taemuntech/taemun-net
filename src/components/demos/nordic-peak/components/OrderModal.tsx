import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useId, useRef, useState } from 'react';
import { Product } from '../types';

// ⚠️ 예전 이 파일에는 「배송이 시작되었습니다 · 송장번호 ○○」를 그리는 성공 화면이 남아 있었다.
//    setIsSubmitted(true) 를 부르는 곳이 없어 화면에는 안 떴지만, 한 줄만 이으면 켜지는 가짜 접수 화면이라
//    통째로 지웠다. 제출 뒤에는 SampleNotice(「접수되지 않았습니다」) 만 연다.

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  totalPrice?: number;
  itemCount?: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
  totalPrice = 0,
  itemCount = 1,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [courierType, setCourierType] = useState<'standard' | 'campsite'>('campsite');
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 어디에도 보내지 않는다 — 안내 모달만 연다
    setSampleNoticeOpen(true);
  };

  // 안내를 닫으면 신청서도 함께 닫는다. 여기서 또 다른 안내 모달을 열지 않는다 —
  // 예전에는 부모가 같은 SampleNotice 를 한 번 더 열어 같은 안내가 두 번 떴다.
  const handleNoticeClose = () => {
    setSampleNoticeOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-surface-container-lowest border-t-2 lg:border-2 border-primary rounded-t-xl lg:rounded-sm shadow-2xl p-5 lg:p-6 text-on-surface outline-none"
      >
        <div className="flex items-center justify-between gap-3 border-b border-outline-variant pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">local_shipping</span>
            <h3 id={titleId} className="font-headline-sm text-headline-sm font-bold">
              익스페디션 특급 발송 신청
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="신청서 닫기"
            className="h-11 w-11 shrink-0 flex items-center justify-center text-outline hover:text-on-surface rounded cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 제출 버튼 위에도 같은 고지가 한 번 더 붙는다 */}
          <p className="text-xs text-primary bg-surface-container p-2.5 border border-outline-variant font-mono [word-break:keep-all]">
            샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <div className="bg-surface-container p-3 rounded border border-outline-variant flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[11px] font-mono text-outline uppercase">주문 장비</span>
              <div className="font-semibold text-sm [word-break:keep-all]">
                {product ? product.title : `기어백에 담은 ${itemCount}종 장비`}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] font-mono text-outline">결제 예정액</span>
              <div className="font-headline-sm font-bold text-primary">
                ₩{totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="block text-xs font-mono text-outline mb-1.5 uppercase">
              [01] 특급 출고 옵션 선택
            </legend>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setCourierType('campsite')}
                aria-pressed={courierType === 'campsite'}
                className={`min-h-11 p-2.5 rounded border cursor-pointer transition-colors text-left ${
                  courierType === 'campsite'
                    ? 'bg-tertiary-container text-on-tertiary-container border-tertiary'
                    : 'bg-surface-container border-outline-variant text-outline'
                }`}
              >
                <span className="font-bold text-xs flex items-center gap-1">🏔️ 캠핑장 직배송 퀵</span>
                <span className="block text-[10px] mt-0.5">강원·경기 거점 현장 직배송 (예시)</span>
              </button>

              <button
                type="button"
                onClick={() => setCourierType('standard')}
                aria-pressed={courierType === 'standard'}
                className={`min-h-11 p-2.5 rounded border cursor-pointer transition-colors text-left ${
                  courierType === 'standard'
                    ? 'bg-primary-container text-on-primary-container border-primary'
                    : 'bg-surface-container border-outline-variant text-outline'
                }`}
              >
                <span className="font-bold text-xs flex items-center gap-1">📦 방수팩 택배</span>
                <span className="block text-[10px] mt-0.5">당일 오후 3시 발송 기준 (예시)</span>
              </button>
            </div>
          </fieldset>

          <div className="space-y-2.5">
            <div>
              <label htmlFor="np-name" className="block text-xs font-mono text-outline mb-1">
                원정대원 성함 / 팀명
              </label>
              <input
                id="np-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 김원정"
                className="w-full min-h-11 bg-surface-container border border-outline-variant rounded px-3 text-sm text-on-surface placeholder:text-outline outline-none focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="np-phone" className="block text-xs font-mono text-outline mb-1">
                비상 연락처
              </label>
              <input
                id="np-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="예: 010-0000-0000"
                className="w-full min-h-11 bg-surface-container border border-outline-variant rounded px-3 text-sm text-on-surface placeholder:text-outline outline-none focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="np-addr" className="block text-xs font-mono text-outline mb-1">
                배송 주소 (캠핑장 사이트 번호 포함)
              </label>
              <input
                id="np-addr"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="예: 강원도 평창군 ○○캠핑장 A구역"
                className="w-full min-h-11 bg-surface-container border border-outline-variant rounded px-3 text-sm text-on-surface placeholder:text-outline outline-none focus:border-primary"
              />
            </div>
          </div>

          <p className="text-[11px] text-outline leading-tight font-mono [word-break:keep-all]">
            * 샘플 화면이라 문자·알림 발송, 결제, 배송 조회는 동작하지 않습니다.
          </p>

          <button
            type="submit"
            className="w-full min-h-11 py-3 bg-tertiary-container hover:bg-tertiary text-on-tertiary font-label-mono-md text-label-mono-md font-bold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              send
            </span>
            특급 발송 신청 (샘플)
          </button>
        </form>
      </div>

      <SampleNotice
        open={sampleNoticeOpen}
        onClose={handleNoticeClose}
        slug="nordic-peak"
        industry="commerce"
        featureName="익스페디션 특급 발송 신청"
      />
    </div>
  );
};
