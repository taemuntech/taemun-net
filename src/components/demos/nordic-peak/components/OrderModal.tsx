import SampleNotice from '@/components/demo-kit/SampleNotice';
import React, { useState } from 'react';
import { Product } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  totalPrice?: number;
  itemCount?: number;
  onSuccess: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  product,
  totalPrice = 1380000,
  itemCount = 1,
  onSuccess,
}) => {
  const [name, setName] = useState('김원정');
  const [phone, setPhone] = useState('010-0000-0000');
  const [address, setAddress] = useState('강원도 평창군 대관령면 횡계리 솔섬 캠핑장 A구역');
  const [courierType, setCourierType] = useState<'standard' | 'campsite'>('campsite');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleNoticeOpen(true);
  };

  const handleNoticeClose = () => {
    setSampleNoticeOpen(false);
    onSuccess();
    onClose();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest border-2 border-primary/60 rounded-sm shadow-2xl p-6 text-on-surface">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">local_shipping</span>
            <h3 className="font-headline-sm text-headline-sm font-bold">
              {isSubmitted ? '익스페디션 출고 접수 완료' : '익스페디션 특급 발송 신청'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-4 space-y-4 text-center">
            <div className="w-16 h-16 bg-primary-container text-primary rounded-full flex items-center justify-center mx-auto border border-primary">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <div>
              <h4 className="font-headline-sm font-bold text-on-surface">
                군용 방수 패킹 배송이 시작되었습니다
              </h4>
              <p className="font-body-sm text-outline mt-1">
                오후 3시 이전 마감 건으로 군용 규격 완전 방수 패킹 검수 후 즉시 출고됩니다.
              </p>
            </div>

            <div className="bg-surface-container p-4 rounded border border-outline-variant text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-outline">익스페디션 송장번호:</span>
                <span className="text-primary font-bold">{trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">수령자:</span>
                <span className="text-on-surface">{name} ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">도착 예정지:</span>
                <span className="text-on-surface truncate max-w-[240px]">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-outline">배송 방식:</span>
                <span className="text-tertiary font-bold">
                  {courierType === 'campsite'
                    ? '동계 캠핑장 직배송 퀵서비스 (2~3시간 내)'
                    : '군용 규격 방수 패킹 특급 택배'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-primary-container text-on-primary-container font-bold rounded-sm cursor-pointer hover:bg-surface-container-highest"
            >
              확인 및 스토어로 복귀
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sample Disclaimer */}
            <p className="text-xs text-primary bg-surface-container p-2.5 border border-outline-variant mb-3 font-mono">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>

            {/* Product summary */}
            <div className="bg-surface-container p-3 rounded border border-outline-variant flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-outline uppercase">주문 장비</span>
                <div className="font-semibold text-sm">
                  {product ? product.title : `바르그 4.2 외 ${itemCount}종 장비`}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-outline">결제 예정액</span>
                <div className="font-headline-sm font-bold text-primary">
                  ₩{totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Courier Choice */}
            <div>
              <label className="block text-xs font-mono text-outline mb-1.5 uppercase">
                [01] 특급 출고 옵션 선택
              </label>
              <div className="grid grid-cols-1 gap-2">
                <div
                  onClick={() => setCourierType('campsite')}
                  className={`p-2.5 rounded border cursor-pointer transition-colors ${
                    courierType === 'campsite'
                      ? 'bg-tertiary-container text-on-tertiary-container border-tertiary'
                      : 'bg-surface-container border-outline-variant text-outline'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1">
                    <span>🏔️</span> 캠핑장 직배송 퀵
                  </div>
                  <div className="text-[10px] mt-0.5 opacity-90">강원·경기 거점 현장 직배송</div>
                </div>

                <div
                  onClick={() => setCourierType('standard')}
                  className={`p-2.5 rounded border cursor-pointer transition-colors ${
                    courierType === 'standard'
                      ? 'bg-primary-container text-on-primary-container border-primary'
                      : 'bg-surface-container border-outline-variant text-outline'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1">
                    <span>📦</span> 군용 방수팩 택배
                  </div>
                  <div className="text-[10px] mt-0.5 opacity-90">당일 오후 3시 발송 보장</div>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-2.5">
              <div>
                <label className="block text-xs font-mono text-outline mb-1">
                  원정대원 성함 / 팀명
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded p-2 text-sm text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-outline mb-1">비상 연락처</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded p-2 text-sm text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-outline mb-1">
                  배송 주소 (캠핑장 사이트 번호 포함)
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded p-2 text-sm text-on-surface outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Notice */}
            <div className="text-[11px] text-outline leading-tight font-mono">
              * 출고 즉시 위성 SMS로 실시간 패킹 검수 영상 및 퀵 운행 현황이 전송됩니다.
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary font-label-mono-md text-label-mono-md font-bold rounded-sm shadow-lg shadow-tertiary-container/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                verified
              </span>
              특급 발송 승인 및 결제 완료
            </button>
          </form>
        )}
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