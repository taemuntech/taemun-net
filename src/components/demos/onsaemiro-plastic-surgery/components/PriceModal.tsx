import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'privacy' | 'price';
}

export const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, title, type }) => {
  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useSampleDialog({ open: isOpen, onClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 backdrop-blur-sm p-0 lg:p-4 animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="onsaemiro-simple-modal-title"
        tabIndex={-1}
        className="bg-[#fdf9f5] rounded-t-3xl lg:rounded-3xl max-w-xl w-full max-h-[88vh] lg:max-h-[85vh] overflow-y-auto p-6 lg:p-8 shadow-2xl relative flex flex-col gap-5 border border-[#c5a880]/30 outline-none"
      >
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#f1ede9]">
          <h3 id="onsaemiro-simple-modal-title" className="font-serif text-[18px] font-semibold text-[#1c1c19]">
            {title}
          </h3>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-full hover:bg-[#ebe7e4] text-[#4d463c] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="space-y-3 text-[13px] text-[#4d463c] leading-relaxed break-keep">
          {type === 'price' ? (
            <>
              <p className="font-medium text-[#1c1c19]">
                의료법 제45조 및 동법 시행규칙에 의거한 주요 비급여 항목 안내입니다. 정확한 비용은 개개인의 해부학적 특성과 난이도에 따라 집도의 1:1 대면 진료 후 확정됩니다. (부가세 포함 금액)
              </p>
              {/* 표는 좁은 화면에서 가로 스크롤 상자 안에 둔다 */}
              <div className="rounded-xl border border-[#d1c5b8]/30 overflow-x-auto text-[12px]">
                <div className="min-w-[320px]">
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
                      <span>VIP 회복 케어 (고압산소 · 광 케어)</span>
                      <span className="text-right font-medium">30만 ~ 60만원</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#4d463c]">
                ※ 가상 브랜드 샘플의 예시 금액입니다. 실제 진료비가 아니며, 할인·이벤트 형태의 가격 제시는 하지 않습니다.
              </p>
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
              <p className="text-[11px] text-[#4d463c]">
                ※ 본 화면은 가상 브랜드 샘플입니다. 예약 폼에 입력한 내용은 어디에도 전송·저장되지 않습니다.
              </p>
            </>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-[#f1ede9]">
          <button
            onClick={onClose}
            className="px-5 min-h-[44px] rounded-full bg-[#1A1817] text-[#fdf9f5] text-[12px] font-semibold hover:bg-[#2E2A27] transition-all cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
