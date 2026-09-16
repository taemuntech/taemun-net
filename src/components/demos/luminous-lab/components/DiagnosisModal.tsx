import React, { useState } from 'react';
import { X, Sparkles, BrainCircuit, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecommendedToCart: (productNames: string[]) => void;
}

export const DiagnosisModal: React.FC<DiagnosisModalProps> = ({
  isOpen,
  onClose,
  onAddRecommendedToCart,
}) => {
  const [concern, setConcern] = useState('속당김 & 건조함');
  const [washStatus, setWashStatus] = useState('수부지');
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const concernsList = [
    { id: '1', title: '1. 속당김 & 건조함', key: '속당김 & 건조함' },
    { id: '2', title: '2. 턱/볼 붉은기 & 트러블', key: '붉은기 & 트러블' },
    { id: '3', title: '3. 모공 늘어짐 & 탄력', key: '모공 늘어짐 & 탄력' },
    { id: '4', title: '4. 칙칙한 피부톤 & 잡티', key: '칙칙한 피부톤 & 잡티' },
  ];

  const handleDiagnose = () => {
    setShowResult(true);
  };

  const handleApplyRoutine = () => {
    onAddRecommendedToCart([
      '시카 엑소좀 수분 진정 앰플 50ml',
      '8중 히알루론산 장벽 리페어 크림 80ml',
    ]);
    setShowResult(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-white space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-[#006948]" />
            <h3 className="text-lg font-bold text-[#141b2b]">1분 AI 피부 진단 테스트</h3>
          </div>
          <button
            onClick={() => {
              setShowResult(false);
              onClose();
            }}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#141b2b] mb-2">
                현재 가장 고민되는 피부 증상은 무엇인가요?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {concernsList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setConcern(item.key)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer font-medium ${ concern === item.key ? 'border-[#006948] bg-[#006948]/10 text-[#006948] font-bold shadow-2xs' : 'border-gray-200 hover:border-[#006948]/50 text-[#3d4a42] bg-white' }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141b2b] mb-1.5">
                세안 직후 5분 동안 아무것도 바르지 않았을 때 피부 상태는?
              </label>
              <select
                value={washStatus}
                onChange={(e) => setWashStatus(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-300 px-3 text-xs bg-white focus:ring-2 focus:ring-[#006948]/20 focus:border-[#006948] outline-none"
              >
                <option value="수부지">T존은 번들거리는데 볼과 입가는 당긴다 (수부지)</option>
                <option value="극건성">얼굴 전체가 찢어질 듯 당기며 각질이 일어난다 (극건성)</option>
                <option value="지성">전체적으로 유분이 바로 올라온다 (지성)</option>
                <option value="초민감성">붉어지고 가려운 자극감이 든다 (초민감성)</option>
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f1f3ff] border border-[#bccac0]/30 text-xs text-[#3d4a42] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#006948] shrink-0 mt-0.5" />
              <span>
                한국피부과학연구원 기준 알고리즘으로 유수분 밸런스와 장벽 손상도를 정밀 분석하여 맞춤 처방을 도출합니다.
              </span>
            </div>

            <button
              onClick={handleDiagnose}
              className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-sm rounded-full flex items-center justify-center gap-1.5 shadow-md cursor-pointer active:scale-98 transition-all"
            >
              진단 결과 확인 &amp; 맞춤 처방 보기
            </button>
          </div>
        ) : (
          /* Diagnosis Result View */
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-[#006948]/10 border border-[#006948]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006948] uppercase">진단 결과</span>
                <span className="text-[11px] font-bold bg-[#006948] text-white px-2 py-0.5 rounded-full">
                  신뢰도 99.2%
                </span>
              </div>
              <h4 className="text-lg font-black text-[#141b2b]">
                고객님은 <span className="text-[#006948]">[{washStatus} 장벽 손상형]</span> 입니다.
              </h4>
              <p className="text-xs text-[#3d4a42] leading-relaxed">
                피부 표면의 피지 분비 대비 각질층 내부 수분 손실(TEWL)이 심화되어 속당김과 붉은기가 복합 발생하고 있습니다. 고순도 마이크로 엑소좀 시카와 8중 히알루론산 수분 락킹 처방이 필수적입니다.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#141b2b] block">전문가 추천 맞춤 솔루션</span>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#006948] shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#141b2b]">Step 1. 시카 엑소좀 수분 진정 앰플 50ml</p>
                  <p className="text-[11px] text-[#6d7a72]">속수분 240.8% 충전 및 3초 진정</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#006948] shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-[#141b2b]">Step 2. 8중 히알루론산 장벽 리페어 크림 80ml</p>
                  <p className="text-[11px] text-[#6d7a72]">100시간 보습 락킹 및 장벽 89.4% 복원</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="w-1/3 h-11 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-100"
              >
                다시 테스트
              </button>
              <button
                type="button"
                onClick={handleApplyRoutine}
                className="flex-1 h-11 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                추천 루틴 2종 특가로 담기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
