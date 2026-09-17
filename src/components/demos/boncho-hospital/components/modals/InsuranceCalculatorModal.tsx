import React, { useState } from 'react';

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
  const [roomType, setRoomType] = useState<'royal' | 'harmony'>('royal');
  const [treatmentType, setTreatmentType] = useState<'oncology' | 'traffic' | 'rehab'>('oncology');
  const [days, setDays] = useState<number>(14);

  if (!isOpen) return null;

  // Calculation Logic
  let dailyRoomBase = roomType === 'royal' ? 250000 : 90000;
  let dailyTreatmentCost = 0;

  if (treatmentType === 'oncology') {
    dailyTreatmentCost = 320000; // Hyperthermia + IV + herbs
  } else if (treatmentType === 'traffic') {
    dailyTreatmentCost = 180000; // Chuna + herbs + physio
  } else {
    dailyTreatmentCost = 210000; // Sling + Joint rehab
  }

  const totalEstimate = (dailyRoomBase + dailyTreatmentCost) * days;
  let coverageRatio = 0.85;

  if (insurancePolicy === 'auto') {
    coverageRatio = 1.0; // 전액 지원 (자동차보험 약관 기준)
  } else if (insurancePolicy === 'gen1') {
    coverageRatio = 0.95; // 1st gen 약관 기준 최대 지원
  } else if (insurancePolicy === 'gen2') {
    coverageRatio = 0.88;
  } else if (insurancePolicy === 'gen3') {
    coverageRatio = 0.82;
  } else if (insurancePolicy === 'gen4') {
    coverageRatio = 0.75;
  }

  const estimatedCovered = Math.round(totalEstimate * coverageRatio);
  const estimatedSelfPay = insurancePolicy === 'auto' ? 0 : totalEstimate - estimatedCovered;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-[#faf9f6] w-full max-w-[850px] rounded-2xl overflow-hidden shadow-2xl border border-[#e3e2e0] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 lg:px-6 bg-[#102a20] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ffd9b4] text-[24px]">calculate</span>
            <div>
              <h3 className="font-serif text-[18px] lg:text-[20px] font-bold">
                실손의료비 &amp; 자동차보험 비용 간편 시뮬레이터
              </h3>
              <p className="text-[12px] text-[#8fab9d]">
                가입하신 보험 조건과 입원 기간을 선택하여 예상 지원금과 본인부담금을 확인하세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* 1. Insurance Type */}
          <div>
            <label className="block text-[14px] font-bold text-[#102a20] mb-2">
              1. 가입 중이신 보험 유형
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-2.5">
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
                  <div className="text-[11px] opacity-80 mt-0.5">본인부담금 0원 (보험사 직불)</div>
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
                  className={`flex-1 py-2.5 px-3 rounded-lg text-[13px] font-semibold transition-all border ${
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
                  className={`flex-1 py-2.5 px-3 rounded-lg text-[13px] font-semibold transition-all border ${
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
                onChange={(e) => setTreatmentType(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#c2c8c3] text-[13px] font-medium"
              >
                <option value="oncology">암면역 집중 프로그램 (고주파 온열암 + 주사 + 한약)</option>
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
                  className={`flex-1 py-1.5 rounded-md text-[12px] font-semibold transition-all border ${
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
              <span className="text-[13px] text-[#8fab9d]">시뮬레이션 예상 결과 ({days}일 기준)</span>
              <span className="text-[12px] bg-[#264035] px-2.5 py-0.5 rounded text-[#cbe9da]">
                {insurancePolicy === 'auto' ? '자동차보험 100% 적용' : '실손의료비 청구 지원'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="text-[12px] text-[#8fab9d] block">총 예상 진료비</span>
                <span className="text-[20px] font-bold text-[#e9e8e5]">
                  {totalEstimate.toLocaleString()}원
                </span>
              </div>
              <div>
                <span className="text-[12px] text-[#8fab9d] block">보험사 지급 예상액</span>
                <span className="text-[20px] font-bold text-[#ffd9b4]">
                  약 {estimatedCovered.toLocaleString()}원
                </span>
              </div>
              <div className="bg-[#264035] p-3 rounded-lg lg:-my-2">
                <span className="text-[11px] text-[#cbe9da] block font-semibold">
                  실제 예상 환자 부담금
                </span>
                <span className="text-[22px] font-bold text-white">
                  {estimatedSelfPay === 0 ? '0 원 (전액 지원)' : `약 ${estimatedSelfPay.toLocaleString()}원`}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#8fab9d] leading-relaxed pt-1">
              * 위 산정 결과는 보험사 표준 약관에 기반한 예상치이며, 가입 시기 및 비급여 담보 특약 여부에 따라 실제 지급액은 일부 변동될 수 있습니다. 본초 전담 원무팀에서 고객님의 증권을 무료로 정밀 사전 검토해 드립니다.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#efeeeb] border-t border-[#e3e2e0] flex items-center justify-between">
          <span className="text-[12px] text-[#424844] hidden lg:inline">
            원무과 실손보험 전담 데스크: 02-0000-0000
          </span>
          <div className="flex gap-2 w-full lg:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#c2c8c3] text-[13px] font-semibold hover:bg-[#e9e8e5]"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedBooking();
              }}
              className="grow lg:grow-0 px-5 py-2 rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035] flex items-center justify-center gap-1"
            >
              <span>이 조건으로 입원 상담 접수</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
