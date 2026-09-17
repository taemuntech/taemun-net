'use client';

import React, { useState } from 'react';

interface VipPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export const VipPortalModal: React.FC<VipPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenReservation,
}) => {
  const [studentCode, setStudentCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentCode.trim().length < 4) {
      setCodeError(true);
    } else {
      setCodeError(false);
      alert(`[${studentCode}] 학생의 실시간 학부모 피드로 연결되었습니다. (가상 데모 시연)`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-surface-container-high relative flex flex-col gap-5">
        <div className="flex items-start justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">
                lock
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-on-surface text-base">
                학부모 VIP 전용 포털(예시)
              </h3>
              <p className="font-label-sm text-outline">
                재원생 실시간 순공 및 모의평가 데이터 조회
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="창 닫기"
            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-on-surface" htmlFor="vip-code">
              재원생 고유 학번 (6자리)
            </label>
            <input
              id="vip-code"
              type="text"
              placeholder="예: DP-202601"
              value={studentCode}
              onChange={(e) => {
                setStudentCode(e.target.value);
                setCodeError(false);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-primary min-h-[44px]"
            />
            {codeError && (
              <span className="text-[11px] text-error">
                유효한 6자리 학번 또는 예약번호를 입력해 주십시오.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-inverse-surface text-surface text-sm font-semibold hover:bg-on-surface transition-colors cursor-pointer min-h-[44px]"
          >
            VIP 포털 로그인
          </button>

          <div className="p-3 rounded-lg bg-surface-container-low text-xs text-on-surface-variant flex flex-col gap-1">
            <span className="font-bold text-on-surface">신규 상담 및 입학 안내:</span>
            <span>아직 학번을 발급받지 않은 학부모님께서는 1:1 레벨테스트를 먼저 신청해 주십시오.</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="text-primary font-bold hover:underline text-left mt-1 cursor-pointer min-h-[44px] flex items-center"
            >
              ➔ 1:1 정밀진단 레벨테스트 예약 바로가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
