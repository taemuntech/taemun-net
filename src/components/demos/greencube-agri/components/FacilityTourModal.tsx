import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface FacilityTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FacilityTourModal: React.FC<FacilityTourModalProps> = ({ isOpen, onClose }) => {
  // 샘플이라 예약을 받지 않는다 — 제출하면 SampleNotice 안내만 연다(가짜 예약 완료 화면 금지).
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    location: 'jincheon',
    date: '',
    visitors: '2~4명',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#bccac0] shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#bccac0]/30 flex items-center justify-between bg-[#faf8ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#006948]/10 text-[#006948] flex items-center justify-center">
              <span className="material-symbols-outlined">domain</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-[#131b2e]">
                클린룸 스마트팜 현장 투어 예약
              </h3>
              <p className="font-mono text-xs text-[#006948]">
                진천 기가팜 제1센터 &amp; 세종 R&amp;D 실증관
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6d7a72] hover:text-[#131b2e] hover:bg-gray-100 transition cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-[#f2f3ff] rounded-lg border border-[#bccac0]/30 font-body text-xs text-[#3d4a42]">
                <strong className="text-[#006948]">안내:</strong> 진천 기가팜은 Class 1000급 클린룸 설정(예시)이라 에어샤워 및 정전기 방지 방진복 착용 후 참관이 진행됩니다.
              </div>

              <div>
                <label className="block font-mono text-xs text-[#131b2e] font-semibold mb-1">
                  참관 희망 시설
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccac0] text-sm"
                >
                  <option value="jincheon">충북 진천 제1 기가-바이오스피어 (대량 상용화 타워)</option>
                  <option value="sejong">세종 AI 아그로 R&amp;D 실증 센터 (예시)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs text-[#131b2e] font-semibold mb-1">
                    신청자 성함
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccac0] text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#131b2e] font-semibold mb-1">
                    소속 기업명
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="(주)그린푸드"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccac0] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-xs text-[#131b2e] font-semibold mb-1">
                    연락처
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccac0] text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#131b2e] font-semibold mb-1">
                    희망 일자
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#bccac0] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#131b2e] font-semibold mb-1">
                  방문 인원
                </label>
                <select
                  value={formData.visitors}
                  onChange={(e) => setFormData({ ...formData, visitors: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#bccac0] text-sm"
                >
                  <option>1인 (개별 사전 미팅)</option>
                  <option>2~4명 (실무진/의사결정자)</option>
                  <option>5인 이상 (단체 기업 세미나)</option>
                </select>
              </div>

              <p className="font-mono text-[11px] text-[#006948] font-semibold text-center">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-[#006948] hover:bg-[#00855d] text-white font-mono text-xs font-bold rounded-lg transition"
              >
                시설 투어 예약 확정하기
              </button>
          </form>
        </div>
      </div>

      <SampleNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        slug="greencube-agri"
        industry="corporate"
        featureName="클린룸 스마트팜 현장 투어 예약"
      />
    </div>
  );
};
