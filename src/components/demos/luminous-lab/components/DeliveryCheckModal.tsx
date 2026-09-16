import React, { useState } from 'react';
import { X, Truck, Search, CheckCircle2, AlertCircle } from 'lucide-react';

interface DeliveryCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryCheckModal: React.FC<DeliveryCheckModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{
    available: boolean;
    areaName: string;
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleCheck = (areaName: string) => {
    const q = areaName.trim();
    if (!q) return;

    // Fast check logic: Seoul / Gyeonggi metropolitan areas are instant delivery
    const instantAreas = ['강남', '서초', '송파', '마포', '영등포', '용산', '성동', '분당', '수원', '판교', '일산'];
    const isInstant = instantAreas.some((area) => q.includes(area));

    if (isInstant) {
      setResult({
        available: true,
        areaName: q,
        message: '오늘 저녁 8시 전 도착 가능 지역입니다. (당일배송 3시간 내 픽업/배송 · 예시 결과)',
      });
    } else {
      setResult({
        available: false,
        areaName: q,
        message: '익일 특급 배송 지역입니다. (오늘 주문 시 택배사 편으로 내일 오전 도착 · 예시 결과)',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#006948]" />
            <h3 className="text-lg font-bold text-[#141b2b]">당일배송 가능지역 조회</h3>
          </div>
          <button
            onClick={() => {
              setResult(null);
              onClose();
            }}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-[#3d4a42]">
            배송받으실 지역(구/동 또는 도로명)을 입력하시면 당일배송 가능 여부를 화면에서 바로 보여 드립니다. 샘플이라 입력하신 내용은 어디에도 전송되지 않습니다.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheck(query);
            }}
            data-sample-local
            className="relative flex items-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="예: 강남구 테헤란로, 마포구 서교동"
              className="w-full h-11 pl-4 pr-12 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#006948]/20 focus:border-[#006948] outline-none"
            />
            <button
              type="submit"
              className="absolute right-2.5 p-1.5 bg-[#006948] text-white rounded-lg hover:bg-[#00855d] cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick area chips */}
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#6d7a72]">
            <span>빠른 선택:</span>
            {['강남구 역삼동', '서초구 반포동', '마포구 상암동', '성남시 분당구'].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setQuery(area);
                  handleCheck(area);
                }}
                className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 text-[#141b2b] transition-colors cursor-pointer font-medium"
              >
                {area}
              </button>
            ))}
          </div>

          {/* Result Card */}
          {result && (
            <div
              className={`p-4 rounded-xl border space-y-1 animate-in fade-in duration-200 ${ result.available ? 'bg-[#006948]/10 border-[#006948]/30 text-[#006948]' : 'bg-amber-50 border-amber-200 text-amber-900' }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs">
                {result.available ? (
                  <CheckCircle2 className="w-4 h-4 text-[#006948]" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
                <span>[{result.areaName}] 조회 결과</span>
              </div>
              <p className="text-xs font-semibold leading-relaxed">{result.message}</p>
            </div>
          )}

          <div className="p-3 bg-[#f1f3ff] rounded-xl text-[11px] text-[#3d4a42] space-y-1 leading-relaxed">
            <p className="font-bold text-[#141b2b]">당일배송 서비스 안내 (예시)</p>
            <p>• 오후 4시 이전 결제 완료 건: 당일 저녁 8시 전 배송 완료</p>
            <p>• 30,000원 이상 주문 시 당일배송 무료</p>
          </div>
        </div>

        <button
          onClick={() => {
            setResult(null);
            onClose();
          }}
          className="w-full h-11 bg-[#006948] text-white font-bold text-xs rounded-full flex items-center justify-center cursor-pointer"
        >
          확인
        </button>
      </div>
    </div>
  );
};
