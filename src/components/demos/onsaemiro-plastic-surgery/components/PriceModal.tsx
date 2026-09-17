import React from 'react';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'price';
}

export const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, title, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#fdf9f5] rounded-3xl max-w-xl w-full max-h-[85vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative flex flex-col gap-5 border border-[#c5a880]/30">
        <div className="flex items-center justify-between pb-3 border-b border-[#f1ede9]">
          <h3 className="font-serif text-[18px] font-semibold text-[#1c1c19]">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#ebe7e4] text-[#4d463c] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="space-y-3 text-[13px] text-[#4d463c] leading-relaxed">
          {type === 'price' ? (
            <>
              <p className="font-medium text-[#1c1c19]">
                의료법 제45조 및 동법 시행규칙에 의거한 주요 비급여 항목 안내입니다. 정확한 비용은 개개인의 해부학적 특성과 난이도에 따라 집도의 1:1 대면 진료 후 확정됩니다. (VAT 별도)
              </p>
              <div className="rounded-xl border border-[#d1c5b8]/30 overflow-hidden text-[12px]">
                <div className="grid grid-cols-2 bg-[#f1ede9] p-2.5 font-semibold text-[#1c1c19]">
                  <span>시술 및 수술 항목</span>
                  <span className="text-right">표준 금액 범위</span>
                </div>
                <div className="divide-y divide-[#f1ede9]">
                  <div className="grid grid-cols-2 p-2.5 bg-[#ffffff]">
                    <span>자연유착 쌍꺼풀 (매몰/연속결찰)</span>
                    <span className="text-right font-medium">80만 ~ 150만원</span>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 bg-[#ffffff]">
                    <span>비절개 눈매교정 / 트임 성형</span>
                    <span className="text-right font-medium">60만 ~ 120만원</span>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 bg-[#ffffff]">
                    <span>무보형물 자가연골 코끝성형</span>
                    <span className="text-right font-medium">250만 ~ 450만원</span>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 bg-[#ffffff]">
                    <span>미니 SMAS 안면거상 리프팅</span>
                    <span className="text-right font-medium">350만 ~ 600만원</span>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 bg-[#ffffff]">
                    <span>VIP 고압산소 &amp; 힐라이트 II 케어</span>
                    <span className="text-right font-medium">수술 환자 무상 포함</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="font-medium text-[#1c1c19]">
                온새미로 성형외과의원은 고객님의 개인정보를 소중히 여기며, 개인정보보호법 등 관련 법령을 철저히 준수합니다.
              </p>
              <p>
                1. 수집 항목: 성명, 연락처, 상담 희망 진료과목, 예약 희망일, 이전 수술 이력<br />
                2. 수집 목적: 1:1 프라이빗 VIP 상담 예약 접수 및 안심 유선 안내<br />
                3. 보유 기간: 상담 및 진료 완료 후 1년 또는 고객 요청 시 즉시 파기<br />
                4. 제3자 제공: 고객님의 동의 없이 어떠한 제3자에게도 개인정보를 제공하지 않습니다.
              </p>
            </>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-[#f1ede9]">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[12px] font-semibold hover:bg-[#2E2A27] transition-all cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
