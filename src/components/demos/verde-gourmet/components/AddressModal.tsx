import React, { useId, useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: string;
  onSelectAddress: (addr: string) => void;
}

// 번지까지 적힌 실주소는 실존 건물을 가리킨다 — 구·동까지만 남긴 예시로 둔다
const POPULAR_ADDRESSES = [
  { name: '서울 용산구 한남동 일대 (예시)', isDawn: true },
  { name: '서울 성동구 성수동 일대 (예시)', isDawn: true },
  { name: '서울 강남구 압구정동 일대 (예시)', isDawn: true },
  { name: '경기 성남시 분당구 판교동 일대 (예시)', isDawn: true },
  { name: '부산 해운대구 우동 일대 (예시)', isDawn: false }
];

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  currentAddress,
  onSelectAddress
}) => {
  const [inputAddress, setInputAddress] = useState('');
  const [checkedResult, setCheckedResult] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc·배경 스크롤 잠금·포커스 순환 — 조건부 호출이 되지 않게 early return 위에서 부른다
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAddress.trim()) return;
    setCheckedResult(inputAddress.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden p-5 lg:p-6 space-y-5 outline-none"
        >
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-outline-variant">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-secondary text-2xl shrink-0">location_on</span>
              <h3 id={titleId} className="text-lg font-bold text-primary truncate">새벽배송 지역 조회</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="배송지역 조회 닫기"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div>
            <p className="text-xs text-on-surface-variant mb-3">
              현재 배송지: <strong className="text-primary font-bold">{currentAddress}</strong>
            </p>

            {/* 접수 폼이 아니라 화면 안 배송지 표시만 바꾸는 조회 — 입력값은 어디에도 전송되지 않는다 */}
            <p className="mb-2 text-[11px] leading-relaxed text-outline">
              샘플 사이트입니다 — 실제 배송 가능 지역 조회가 아니고, 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>
            <form data-sample-local onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
                aria-label="주소 입력"
                placeholder="도로명 또는 지번 주소를 입력하세요"
                className="flex-1 min-w-0 bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2.5 min-h-11 text-xs focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 shrink-0 items-center bg-primary text-on-primary px-4 rounded-xl text-xs font-mono font-bold hover:bg-secondary transition-colors"
              >
                조회
              </button>
            </form>

            {checkedResult && (
              <div className="mt-3 p-3 bg-surface-container-low rounded-xl border border-secondary/40 flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-primary break-words">{checkedResult}</div>
                  <div className="text-[11px] text-secondary font-medium mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    새벽배송 가능 지역 예시입니다 (내일 아침 7시 전 도착 예정)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSelectAddress(checkedResult);
                    onClose();
                  }}
                  className="inline-flex min-h-11 shrink-0 items-center bg-secondary text-on-secondary px-3 rounded-lg text-xs font-mono font-bold"
                >
                  선택
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="text-xs font-bold text-primary mb-2">추천 배송지 목록</div>
            <div className="space-y-2">
              {POPULAR_ADDRESSES.map((addr) => (
                <button
                  key={addr.name}
                  type="button"
                  onClick={() => {
                    onSelectAddress(addr.name);
                    onClose();
                  }}
                  className="w-full min-h-11 p-3 bg-surface-container/60 hover:bg-surface-container rounded-xl border border-outline-variant flex items-center justify-between gap-3 text-left transition-colors"
                >
                  <span className="text-xs text-primary font-medium">{addr.name}</span>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${ addr.isDawn ? 'bg-secondary text-on-secondary' : 'bg-surface-container-highest text-on-surface-variant' }`}
                  >
                    {addr.isDawn ? '새벽배송' : '택배배송'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
