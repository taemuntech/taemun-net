import React, { useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { RoomType } from '../../types';

interface InsuranceCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedBooking: () => void;
}

export const InsuranceCalculatorModal: React.FC<InsuranceCalculatorModalProps> = ({
  isOpen,
  onClose,
  onProceedBooking,
}) => {
  const [insurancePolicy, setInsurancePolicy] = useState<string>('gen2');
  const [roomType, setRoomType] = useState<RoomType>('royal');
  const [treatmentType, setTreatmentType] = useState<'oncology' | 'traffic' | 'rehab'>('oncology');
  const [days, setDays] = useState<number>(14);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 (샘플 공용 훅)
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  // 예시 단가(원/일). 실제 수가가 아니라 화면 시연용 숫자다.
  const dailyRoomBase = roomType === 'royal' ? 250000 : 90000;
  const dailyTreatmentCost =
    treatmentType === 'oncology' ? 320000 : treatmentType === 'traffic' ? 180000 : 210000;

  const roomTotal = dailyRoomBase * days;
  const treatmentTotal = dailyTreatmentCost * days;
  const totalEstimate = roomTotal + treatmentTotal;

  // 상급병실료 차액은 실손 약관에서 대부분 지급 대상이 아니다 — 계산 밑변에서 뺀다.
  // 자동차보험 대인접수는 치료비를 보험사가 직접 지급하므로 치료비 전액을 대상으로 둔다.
  const coverageRatio =
    insurancePolicy === 'auto'
      ? 1.0
      : insurancePolicy === 'gen1'
        ? 0.9
        : insurancePolicy === 'gen2'
          ? 0.85
          : insurancePolicy === 'gen3'
            ? 0.8
            : 0.7;

  const estimatedCovered = Math.round(treatmentTotal * coverageRatio);
  const estimatedSelfPay = totalEstimate - estimatedCovered;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end lg:items-center justify-center p-0 lg:p-6 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="boncho-insurance-title"
        tabIndex={-1}
        className="bg-[#faf9f6] w-full max-w-[850px] rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-2xl border border-[#e3e2e0] flex flex-col max-h-[92vh] outline-none"
      >
        {/* Header */}
        <div className="p-4 lg:px-6 bg-[#102a20] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ffd9b4] text-[24px]">calculate</span>
            <div>
              <h3 id="boncho-insurance-title" className="font-serif text-[18px] lg:text-[20px] font-bold break-keep">
                실손의료비 &amp; 자동차보험 비용 간편 시뮬레이터
              </h3>
              <p className="text-[12px] text-[#8fab9d]">
                보험 조건과 입원 기간을 넣으면 예시 단가로 대략적인 금액만 계산해 봅니다 (실제 지급액 아님).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="비용 계산기 닫기"
            className="w-11 h-11 lg:w-8 lg:h-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 lg:p-6 overflow-y-auto grow min-h-0 space-y-6">
          {/* 1. Insurance Type */}
          <div>
            <label className="block text-[14px] font-bold text-[#102a20] mb-2">
              1. 가입 중이신 보험 유형
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="ins_type"
                  checked={insurancePolicy === 'auto'}
                  onChange={() => setInsurancePolicy('auto')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-xl border bg-white peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all text-[13px]">
                  <div className="font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">directions_car</span>
                    <span>자동차보험 (대인접수)</span>
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">치료비는 보험사에 직접 청구</div>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="ins_type"
                  checked={insurancePolicy === 'gen1'}
                  onChange={() => setInsurancePolicy('gen1')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-xl border bg-white peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all text-[13px]">
                  <div className="font-bold">1세대 실손보험 (2009년 이전)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">입원비 약관 기준 최대 적용</div>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="ins_type"
                  checked={insurancePolicy === 'gen2'}
                  onChange={() => setInsurancePolicy('gen2')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-xl border bg-white peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all text-[13px]">
                  <div className="font-bold">2세대 실손보험 (2009~2017)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">입원비 약 90% 수준 적용</div>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="ins_type"
                  checked={insurancePolicy === 'gen3'}
                  onChange={() => setInsurancePolicy('gen3')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-xl border bg-white peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all text-[13px]">
                  <div className="font-bold">3세대 실손보험 (2017~2021)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">급여 90%, 비급여 80%</div>
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="ins_type"
                  checked={insurancePolicy === 'gen4'}
                  onChange={() => setInsurancePolicy('gen4')}
                  className="sr-only peer"
                />
                <div className="p-3 rounded-xl border bg-white peer-checked:border-[#102a20] peer-checked:bg-[#102a20] peer-checked:text-white transition-all text-[13px]">
                  <div className="font-bold">4세대 실손보험 (2021년 이후)</div>
                  <div className="text-[11px] opacity-80 mt-0.5">급여 80%, 비급여 70%</div>
                </div>
              </label>
            </div>
          </div>

          {/* 2. Room & Treatment Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-bold text-[#102a20] mb-2">
                2. 희망 병실
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRoomType('royal')}
                  className={`flex-1 py-2.5 px-3 max-lg:min-h-[44px] rounded-lg text-[13px] font-semibold transition-all border ${
                    roomType === 'royal'
                      ? 'bg-[#102a20] text-white border-[#102a20]'
                      : 'bg-white text-[#424844] border-[#c2c8c3]'
                  }`}
                >
                  1인실 로열 스위트
                </button>
                <button
                  type="button"
                  onClick={() => setRoomType('harmony')}
                  className={`flex-1 py-2.5 px-3 max-lg:min-h-[44px] rounded-lg text-[13px] font-semibold transition-all border ${
                    roomType === 'harmony'
                      ? 'bg-[#102a20] text-white border-[#102a20]'
                      : 'bg-white text-[#424844] border-[#c2c8c3]'
                  }`}
                >
                  2인실 하모니 스위트
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-bold text-[#102a20] mb-2">
                3. 입원 치료 프로그램
              </label>
              <select
                value={treatmentType}
                onChange={(e) => setTreatmentType(e.target.value as 'oncology' | 'traffic' | 'rehab')}
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#c2c8c3] text-[13px] font-medium"
              >
                {/* 화면 다른 곳은 전부 「암 통합진료」로 고쳤는데 이 선택지만 옛 문구가 남았다 —
                    「암면역」·「온열암」은 암 치료 효과 표방으로 읽힌다(의료법 제56조 제2항 제2호). */}
                <option value="oncology">암 통합진료 입원 (고주파 온열치료 + 수액 + 한약)</option>
                <option value="traffic">교통사고 집중 입원 (추나 + 약침 + 어혈탕)</option>
                <option value="rehab">수술 후 관절·뇌신경 재활 (도수 + 슬링)</option>
              </select>
            </div>
          </div>

          {/* 3. Duration */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[14px] font-bold text-[#102a20]">
                4. 예상 입원 기간
              </label>
              <span className="text-[14px] font-bold text-[#75593c]">{days} 일간</span>
            </div>
            <div className="flex gap-2 mb-2">
              {[7, 14, 21, 30].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`flex-1 py-1.5 max-lg:min-h-[44px] rounded-md text-[12px] font-semibold transition-all border ${
                    days === d
                      ? 'bg-[#75593c] text-white border-[#75593c]'
                      : 'bg-white text-[#424844] border-[#c2c8c3]'
                  }`}
                >
                  {d}일
                </button>
              ))}
            </div>
          </div>

          {/* Result Output Display */}
          <div className="bg-[#102a20] text-white p-5 lg:p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#264035] pb-3">
              <span className="text-[13px] text-[#8fab9d]">예시 단가로 계산한 결과 ({days}일 기준)</span>
              <span className="text-[12px] bg-[#264035] px-2.5 py-0.5 rounded text-[#cbe9da]">
                {insurancePolicy === 'auto' ? '자동차보험 대인접수 기준' : '실손의료비 청구 기준'} · 예시 계산
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-[12px] text-[#8fab9d] block">진료비 + 병실료 합계 (예시 단가)</span>
                <span className="text-[20px] font-bold text-[#e9e8e5]">
                  {totalEstimate.toLocaleString()}원
                </span>
              </div>
              <div>
                <span className="text-[12px] text-[#8fab9d] block">보험 적용 대상 금액 (예시)</span>
                <span className="text-[20px] font-bold text-[#ffd9b4]">
                  약 {estimatedCovered.toLocaleString()}원
                </span>
              </div>
              <div className="bg-[#264035] p-3 rounded-lg lg:-my-2">
                <span className="text-[11px] text-[#cbe9da] block font-semibold">
                  남는 금액 (예시)
                </span>
                <span className="text-[22px] font-bold text-white">
                  약 {estimatedSelfPay.toLocaleString()}원
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#8fab9d] leading-relaxed pt-1">
              * 화면 시연용 예시 단가로 계산한 값이며 실제 청구액·지급액이 아닙니다. 상급병실료 차액은 대부분의 실손 약관에서 지급 대상이 아니어서 위 계산에서도 빼 두었습니다. 가입 시기와 약관에 따라 결과가 크게 달라지므로 실제 지급 여부는 가입하신 보험사에 직접 확인하셔야 합니다.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#efeeeb] border-t border-[#e3e2e0] flex items-center justify-between">
          <span className="text-[12px] text-[#424844] hidden lg:inline">
            원무과 보험 문의: 02-0000-0000
          </span>
          <div className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 min-h-[44px] rounded-lg border border-[#c2c8c3] text-[13px] font-semibold hover:bg-[#e9e8e5]"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedBooking();
              }}
              className="grow lg:grow-0 px-5 py-2 min-h-[44px] rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035] flex items-center justify-center gap-1"
            >
              <span>이 조건으로 입원 상담 문의</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
