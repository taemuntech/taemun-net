import React from 'react';

interface PolicyModalProps {
  title: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#1b1c1d] hairline-all max-w-lg w-full p-6 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#e3e2e3] hover:text-[#caf300] p-1"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-[#caf300]"></span>
          <span className="font-label-sm text-xs text-[#caf300] uppercase tracking-wider">
            ATELIER NOIR REGULATORY COMPLIANCE
          </span>
        </div>
        <h3 className="font-headline-sm text-lg text-[#ffffff] font-bold mb-4">
          {title}
        </h3>

        <div className="space-y-3 text-xs text-[#c5c9ac] leading-relaxed max-h-80 overflow-y-auto pr-2">
          {title.includes('200%') ? (
            <p>
              아틀리에 누아르에서 유통되는 모든 디자이너 레이블 및 컨템포러리 컬렉션은 브랜드 본사 및 글로벌 공식 공급처를 통해 정식 통관 및 유통되는 100% 정품입니다. 만일 위조품으로 판명될 경우, 공인 감정서 발급 비용을 포함하여 결제금액의 200%를 무조건 환불 보상해 드립니다.
            </p>
          ) : title.includes('에스크로') ? (
            <p>
              전자상거래 등에서의 소비자보호에 관한 법률 제24조에 따라, 토스페이먼츠의 구매안전(에스크로) 서비스를 적용하고 있습니다. 소비자가 결제한 대금은 상품이 안전하게 배송 완료될 때까지 에스크로 계좌에 예치되어 안전하게 보호됩니다.
            </p>
          ) : title.includes('배송') ? (
            <p>
              아틀리에 누아르 전 상품은 무료배송으로 발송되며, 평일 14:00 이전 결제 건은 당일 출고를 원칙으로 합니다. 수령 후 7일 이내 사이즈 미스 시 1회 왕복 무료배송 교환 케어를 제공합니다.
            </p>
          ) : (
            <p>
              (주)아틀리에 누아르는 개인정보보호법 및 관계 법령을 준수하며 고객님의 소중한 개인정보를 안전하게 처리 및 보관하고 있습니다. 서비스 이용과 관련된 구체적인 조항은 상시 고객센터(1544-0982) 및 1:1 라이브 컨시어지를 통해 안내받으실 수 있습니다.
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-2.5 bg-[#292a2b] hover:bg-[#343536] text-[#ffffff] font-label-sm text-xs tracking-wider uppercase transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};
