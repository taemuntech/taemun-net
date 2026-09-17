import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface PolicyModalProps {
  title: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ title, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기
  useSampleDialog({ open: title !== null, onClose, dialogRef });

  if (!title) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end lg:items-center justify-center lg:p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="atelier-noir-policy-title"
        tabIndex={-1}
        className="bg-[#1b1c1d] hairline-all max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 relative shadow-2xl outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-11 h-11 flex items-center justify-center text-[#e3e2e3] hover:text-[#caf300] cursor-pointer"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#caf300]"></span>
          <span className="font-label-sm text-xs text-[#caf300] uppercase tracking-wider">
            ATELIER NOIR POLICY (예시 문안)
          </span>
        </div>
        <h3 id="atelier-noir-policy-title" className="font-headline-sm text-lg text-[#ffffff] font-bold mb-4 pr-10">
          {title}
        </h3>

        <div className="space-y-3 text-xs text-[#c5c9ac] leading-relaxed max-h-80 overflow-y-auto pr-2">
          {title.includes('검수') ? (
            <p>
              입고되는 상품을 판매 전 검수하고 결과를 상품 상세에 남기는 절차를 두는 화면입니다. 여기 적힌 절차·보상
              조건은 실제 운영 규정이 아니라 화면 구성을 보여 주기 위한 예시 문안이고, 공인 감정이나 인증이 아닙니다.
            </p>
          ) : title.includes('결제') ? (
            <p>
              카드·간편결제·계좌이체 등 결제 수단 안내와 보안 고지를 담는 자리입니다. 이 화면은 샘플이라 결제창이 열리지
              않고 결제도 이루어지지 않습니다. 실제 사이트에서는 계약한 결제대행사의 안내 문구가 들어갑니다.
            </p>
          ) : title.includes('배송') ? (
            <p>
              배송비·출고 기준·교환 및 반품 조건을 적는 자리입니다. 아래 내용은 예시 문안으로, 무료배송과 평일 14:00
              이전 결제 건 당일 출고, 수령 후 7일 이내 사이즈 교환을 가정해 적어 두었을 뿐 실제 약속이 아닙니다.
            </p>
          ) : (
            <p>
              이용약관·개인정보처리방침·사업자 정보를 싣는 자리입니다. 이 화면은 태문 DEV STUDIO 가 만든 가상 브랜드
              샘플이라 회사명·사업자번호·대표번호(1588-0000)가 모두 예시이며, 실제로 문의를 접수하지 않습니다.
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 min-h-11 py-2.5 bg-[#292a2b] hover:bg-[#343536] text-[#ffffff] font-label-sm text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
};
