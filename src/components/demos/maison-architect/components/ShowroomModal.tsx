import React, { useRef, useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowroomModal: React.FC<ShowroomModalProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [showroom, setShowroom] = useState<'cheongdam' | 'hannam'>('cheongdam');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-09-20');
  const [time, setTime] = useState('14:00');
  const [apartmentSize, setApartmentSize] = useState('34평형');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // 안내 모달이 뜬 동안에는 예약 폼 쪽 잠금·포커스 가두기를 놓는다(두 다이얼로그가 서로 Tab 을 뺏지 않게).
  useSampleDialog({ open: isOpen && !isNoticeOpen, onClose, dialogRef });

  if (!isOpen) return null;

  // 제출해도 **아무 데도 보내지 않는다**. 예약번호·「접수되었습니다」 같은 가짜 성공 화면 대신
  // 이 파일에서 바로 샘플 안내를 연다.
  if (isNoticeOpen) {
    return (
      <SampleNotice
        open
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="maison-architect"
        industry="commerce"
        featureName={`${showroom === 'cheongdam' ? '청담 아틀리에' : '한남 갤러리'} 1:1 도슨트 쇼룸 예약`}
      />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 이 저장소는 alert()/confirm() 을 쓰지 않는다 — 폼 안 인라인 안내로 보여 준다.
    if (!name.trim() || !phone.trim()) {
      setError('성함과 연락처를 입력해 주세요.');
      return;
    }
    setError(null);
    setIsNoticeOpen(true);
  };

  const fieldClass =
    'w-full px-3 min-h-11 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]';

  return (
    <div
      className="fixed inset-0 z-50 bg-[#100e0d]/60 backdrop-blur-xs flex items-end lg:items-center justify-center p-0 lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 375 에서는 시트형 — 예전엔 높이 제한이 없어 폼 아래쪽이 화면 밖으로 잘려 제출 버튼을 누를 수 없었다 */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ma-showroom-title"
        tabIndex={-1}
        className="bg-[#fff8f4] max-w-lg w-full max-h-[92vh] lg:max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#d0c4c0]/60 p-6 lg:p-8 relative animate-in slide-in-from-bottom-4 lg:slide-in-from-bottom-0 lg:zoom-in-95 duration-200 outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-11 h-11 text-[#7f7571] hover:text-[#100e0d] transition-colors"
          aria-label="예약 창 닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="mb-6 pr-10">
            <span className="text-[10px] font-bold text-[#944931] uppercase tracking-widest">
              Private Curation Atelier
            </span>
            <h3 id="ma-showroom-title" className="font-serif text-2xl text-[#100e0d] mt-1">
              1:1 프라이빗 도슨트 예약
            </h3>
            <p className="text-xs text-[#7f7571] mt-1">
              고객님의 주거 평면도를 바탕으로 가구 모듈과 조명을 1:1 로 제안합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
            {/* Showroom Choice */}
            <div>
              <span className="font-semibold text-[#100e0d] block mb-1.5">방문 쇼룸 선택</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setShowroom('cheongdam')}
                  aria-pressed={showroom === 'cheongdam'}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    showroom === 'cheongdam'
                      ? 'border-[#100e0d] bg-[#100e0d] text-[#fff8f4]'
                      : 'border-[#d0c4c0] bg-[#fff8f4] text-[#100e0d] hover:bg-[#f6ece5]'
                  }`}
                >
                  <p className="font-bold">청담 플래그십 아틀리에</p>
                  <p className={`text-[10px] mt-0.5 ${showroom === 'cheongdam' ? 'text-[#ccc5c3]' : 'text-[#7f7571]'}`}>
                    강남구 ○○로 000 (예시 주소)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setShowroom('hannam')}
                  aria-pressed={showroom === 'hannam'}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    showroom === 'hannam'
                      ? 'border-[#100e0d] bg-[#100e0d] text-[#fff8f4]'
                      : 'border-[#d0c4c0] bg-[#fff8f4] text-[#100e0d] hover:bg-[#f6ece5]'
                  }`}
                >
                  <p className="font-bold">한남 레지덴셜 갤러리</p>
                  <p className={`text-[10px] mt-0.5 ${showroom === 'hannam' ? 'text-[#ccc5c3]' : 'text-[#7f7571]'}`}>
                    용산구 ○○로 00 (예시 주소)
                  </p>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ma-date" className="font-semibold text-[#100e0d] block mb-1">
                  방문 희망일
                </label>
                <input
                  id="ma-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="ma-time" className="font-semibold text-[#100e0d] block mb-1">
                  희망 시간
                </label>
                <select
                  id="ma-time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={fieldClass}
                >
                  <option value="11:00">11:00 (오전)</option>
                  <option value="14:00">14:00 (오후 2시)</option>
                  <option value="16:00">16:00 (오후 4시)</option>
                  <option value="18:00">18:00 (오후 6시)</option>
                </select>
              </div>
            </div>

            {/* Apartment Size */}
            <div>
              <label htmlFor="ma-size" className="font-semibold text-[#100e0d] block mb-1">
                거주/입주 예정 주거 형태
              </label>
              <select
                id="ma-size"
                value={apartmentSize}
                onChange={(e) => setApartmentSize(e.target.value)}
                className={fieldClass}
              >
                <option value="25평형">25평형 (84㎡ 이하 소형 아파트)</option>
                <option value="34평형">34평형 (112㎡ 국민 평형)</option>
                <option value="45평형+">45평형 이상 대형 평형 / 펜트하우스</option>
                <option value="단독주택">단독주택 / 빌라 레지던스</option>
              </select>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="ma-name" className="font-semibold text-[#100e0d] block mb-1">
                  예약자 성함
                </label>
                <input
                  id="ma-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  aria-invalid={Boolean(error) && !name.trim()}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="ma-phone" className="font-semibold text-[#100e0d] block mb-1">
                  연락처
                </label>
                <input
                  id="ma-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  aria-invalid={Boolean(error) && !phone.trim()}
                  className={fieldClass}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="ma-notes" className="font-semibold text-[#100e0d] block mb-1">
                상담 요청 사항 (선택)
              </label>
              <textarea
                id="ma-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="예: 거실 도면 지참 예정, 모듈 소파 및 다이닝 테이블 조합 추천 희망"
                className="w-full p-3 bg-[#fbf2eb] rounded-lg border border-[#d0c4c0] text-xs text-[#100e0d] focus:outline-none focus:border-[#100e0d]"
              />
            </div>

            <div aria-live="polite">
              {error && (
                <p className="flex items-start gap-1.5 px-3 py-2 rounded-lg bg-[#ffdbd0]/50 border border-[#944931]/30 text-[11px] font-semibold text-[#77331d]">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                  <span>{error}</span>
                </p>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-[11px] text-[#7f7571] text-center leading-relaxed">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않고 예약은 접수되지 않습니다.
              </p>
              <button
                type="submit"
                className="w-full min-h-12 rounded-lg bg-[#100e0d] hover:bg-[#262322] text-[#fff8f4] font-semibold transition-all shadow-md active:scale-95"
              >
                예약 요청 보내기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
