import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useRef, useState } from 'react';

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TriageModal: React.FC<TriageModalProps> = ({ isOpen, onClose }) => {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [age, setAge] = useState('3');
  const [symptom, setSymptom] = useState('관절/슬개골');
  const [notes, setNotes] = useState('');
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc·배경 클릭 닫기와 배경 스크롤 잠금 — 공용 훅(demo-kit)에 맡긴다.
  // SampleNotice 가 떠 있는 동안에는 끈다(같은 훅을 쓰므로 포커스 가둠·Esc 가 서로 물린다).
  useSampleDialog({ open: isOpen && !sampleNoticeOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSampleNoticeOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm lg:items-center lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="온라인 무료 문진 접수"
        tabIndex={-1}
        className="bg-white rounded-t-2xl lg:rounded-2xl max-w-lg w-full max-h-[92vh] lg:max-h-[88vh] overflow-y-auto p-6 shadow-2xl border border-[#bfc9c1]/60 relative outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 text-[#707973] hover:text-[#121c2a] min-h-11 min-w-11 flex items-center justify-center rounded-full hover:bg-slate-100"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <SampleNotice
          open={sampleNoticeOpen}
          onClose={() => {
            setSampleNoticeOpen(false);
            onClose();
          }}
          slug="paws-tail"
          featureName="온라인 수의사 무료 문진 접수"
          kind="sample"
          industry="commerce"
        />

        <div>
          <div className="flex items-center gap-2 text-[#0f5238] font-bold text-sm mb-1">
            <span className="material-symbols-outlined text-base">medical_services</span>
            <span>온라인 무료 문진 접수</span>
          </div>
          <h3 className="text-lg font-bold text-[#121c2a]">전문의 1:1 임상 진료 연계 상담</h3>
          <p className="text-xs text-[#404943] mt-1 mb-5">
            슬개골, 식이 알러지, 요로결석 등 전담 수의사가 맞춤 진료 피드백을 제공합니다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#404943] font-bold mb-1">반려동물 구분</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSpecies('dog')}
                    className={`py-2 rounded-lg font-bold border transition-colors ${
                      species === 'dog'
                        ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238]'
                        : 'border-[#bfc9c1] text-[#404943]'
                    }`}
                  >
                    🐶 반려견
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpecies('cat')}
                    className={`py-2 rounded-lg font-bold border transition-colors ${
                      species === 'cat'
                        ? 'border-[#0f5238] bg-[#eff4ff] text-[#0f5238]'
                        : 'border-[#bfc9c1] text-[#404943]'
                    }`}
                  >
                    🐱 반려묘
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#404943] font-bold mb-1">아이 이름</label>
                <input
                  type="text"
                  required
                  placeholder="예: 구름이, 탄이"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full border border-[#bfc9c1] rounded-lg py-2 px-3 focus:outline-none focus:border-[#0f5238]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#404943] font-bold mb-1">나이</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full border border-[#bfc9c1] rounded-lg py-2 px-3 bg-white"
                >
                  <option value="1">1세 이하 (퍼피/키튼)</option>
                  <option value="3">2~6세 (어덜트)</option>
                  <option value="7">7~10세 (시니어)</option>
                  <option value="11">11세 이상 (노령기)</option>
                </select>
              </div>

              <div>
                <label className="block text-[#404943] font-bold mb-1">주요 건강 고민</label>
                <select
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  className="w-full border border-[#bfc9c1] rounded-lg py-2 px-3 bg-white"
                >
                  <option value="관절/슬개골">관절/슬개골 탈구</option>
                  <option value="눈물자국/식이알러지">눈물자국/식이 알러지</option>
                  <option value="장건강/묽은변">소화기/묽은변/구토</option>
                  <option value="신장/스트루바이트">신장/스트루바이트 결석</option>
                  <option value="체중감량">비만/체중 조절</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#404943] font-bold mb-1">
                상세 증상 및 기존 식이 기록
              </label>
              <textarea
                rows={3}
                required
                placeholder="예: 3주 전부터 눈물자국이 심해지고 발을 자주 핥아요. 현재 닭고기 사료 급여 중입니다."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-[#bfc9c1] rounded-lg p-2.5 focus:outline-none focus:border-[#0f5238] resize-none"
              />
            </div>

            <div className="p-3 bg-[#dee9fc] rounded-xl text-[11px] text-[#0f5238] flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">verified_user</span>
              <span>
                실제 서비스라면 수의사법·개인정보보호법에 따라 진료 데이터를 보호합니다. 이 샘플은
                입력값을 저장하지도 보내지도 않습니다.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 min-h-11 rounded-full border border-[#bfc9c1] text-[#404943] font-bold hover:bg-slate-50"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 min-h-11 rounded-full bg-[#0f5238] text-white font-bold hover:bg-[#2d6a4f] shadow-md"
              >
                무료 문진 제출하기
              </button>
            </div>
            <p className="text-[11px] text-[#707973] text-center pt-1">
              샘플 사이트입니다. 입력하신 내용은 어디에도 전송되지 않습니다.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
