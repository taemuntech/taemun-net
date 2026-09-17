'use client';

import React, { useRef, useState } from 'react';
import { X, Sparkles, BrainCircuit, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { RANKING_PRODUCTS } from '../data/mockData';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRecommendedToCart: (productIds: string[]) => void;
}

// 고른 고민에 따라 결과 문장과 추천 2종이 실제로 갈린다 — 무엇을 골라도 같은 결과가 나오면 진단이 아니다.
const ROUTINE_BY_CONCERN: Record<string, { summary: string; productIds: [string, string] }> = {
  '속당김 & 건조함': {
    summary: '각질층 속 수분 손실(TEWL)이 커져 속당김이 먼저 오는 유형이라는 예시 결과입니다. 속수분을 채우고 겉에서 잠그는 2단 조합을 권합니다.',
    productIds: ['prod-1', 'prod-2'],
  },
  '붉은기 & 트러블': {
    summary: '외부 자극에 붉은기가 쉽게 올라오는 유형이라는 예시 결과입니다. 진정 앰플로 달래고 자외선 자극을 마일드하게 막는 조합을 권합니다.',
    productIds: ['prod-1', 'prod-3'],
  },
  '모공 늘어짐 & 탄력': {
    summary: '피지 분비 대비 탄력이 떨어져 모공이 늘어져 보이는 유형이라는 예시 결과입니다. 레티놀로 결을 정돈하고 장벽을 채우는 조합을 권합니다.',
    productIds: ['prod-4', 'prod-2'],
  },
  '칙칙한 피부톤 & 잡티': {
    summary: '턴오버가 느려져 피부톤이 가라앉아 보이는 유형이라는 예시 결과입니다. 레티놀 루틴에 수분 앰플을 겹쳐 자극을 낮추는 조합을 권합니다.',
    productIds: ['prod-4', 'prod-1'],
  },
};

export const DiagnosisModal: React.FC<DiagnosisModalProps> = ({
  isOpen,
  onClose,
  onAddRecommendedToCart,
}) => {
  const [concern, setConcern] = useState('속당김 & 건조함');
  const [washStatus, setWashStatus] = useState('수부지');
  const [showResult, setShowResult] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setShowResult(false);
    onClose();
  };

  useSampleDialog({ open: isOpen, onClose: handleClose, dialogRef, initialFocusRef: closeRef });

  if (!isOpen) return null;

  const concernsList = [
    { id: '1', title: '1. 속당김 & 건조함', key: '속당김 & 건조함' },
    { id: '2', title: '2. 턱/볼 붉은기 & 트러블', key: '붉은기 & 트러블' },
    { id: '3', title: '3. 모공 늘어짐 & 탄력', key: '모공 늘어짐 & 탄력' },
    { id: '4', title: '4. 칙칙한 피부톤 & 잡티', key: '칙칙한 피부톤 & 잡티' },
  ];

  const routine = ROUTINE_BY_CONCERN[concern] ?? ROUTINE_BY_CONCERN['속당김 & 건조함'];
  const recommended = routine.productIds
    .map((id) => RANKING_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof RANKING_PRODUCTS)[number] => Boolean(p));

  const handleDiagnose = () => {
    setShowResult(true);
  };

  const handleApplyRoutine = () => {
    onAddRecommendedToCart(recommended.map((p) => p.id));
    setShowResult(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end lg:items-center justify-center lg:p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="1분 피부 진단 테스트"
        tabIndex={-1}
        className="bg-white rounded-t-3xl lg:rounded-3xl lg:max-w-lg w-full p-6 shadow-2xl border border-white space-y-5 outline-none animate-in slide-in-from-bottom lg:zoom-in-95 duration-200 max-h-[85vh] lg:max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-[#006948]" />
            <h3 className="text-lg font-bold text-[#141b2b]">1분 피부 진단 테스트</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            aria-label="피부 진단 테스트 닫기"
            className="w-11 h-11 -mr-2 shrink-0 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
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
                    className={`p-3 min-h-11 flex items-center text-left rounded-xl border transition-all cursor-pointer font-medium ${ concern === item.key ? 'border-[#006948] bg-[#006948]/10 text-[#006948] font-bold shadow-2xs' : 'border-gray-200 hover:border-[#006948]/50 text-[#3d4a42] bg-white' }`}
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
                선택하신 답변만으로 화면에서 바로 결과를 보여 주는 예시 진단입니다. 입력값은 어디에도 전송되지 않습니다.
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
                  예시 결과
                </span>
              </div>
              <h4 className="text-lg font-black text-[#141b2b]">
                고객님은 <span className="text-[#006948]">[{washStatus} · {concern}]</span> 유형입니다.
              </h4>
              <p className="text-xs text-[#3d4a42] leading-relaxed">{routine.summary}</p>
              <p className="text-[11px] text-[#6d7a72] leading-relaxed">
                의학적 진단이 아니라, 고르신 답변에 따라 화면에서 바로 문구가 갈리는 예시 결과입니다.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#141b2b] block">이 답변에 맞춘 추천 루틴 (예시)</span>
              {recommended.map((product, idx) => (
                <div
                  key={product.id}
                  className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#006948] shrink-0" />
                  <div className="text-xs min-w-0">
                    <p className="font-bold text-[#141b2b]">
                      Step {idx + 1}. {product.name}
                    </p>
                    <p className="text-[11px] text-[#6d7a72]">
                      {product.subTitle} · ₩{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="w-1/3 h-12 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                다시 테스트
              </button>
              <button
                type="button"
                onClick={handleApplyRoutine}
                className="flex-1 h-12 bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                추천 루틴 2종 장바구니 담기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
