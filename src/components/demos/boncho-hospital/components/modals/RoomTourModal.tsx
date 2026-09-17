import React, { useEffect, useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { AVAILABLE_HARMONY, AVAILABLE_ROYAL, HOSPITAL_IMAGES } from '../../data/hospitalData';
import { RoomType } from '../../types';

const BED_ANGLE_NOTE: Record<0 | 30 | 45, string> = {
  0: '* 평면 자세 — 취침이나 수액 투여 중에 쓰는 기본 각도입니다.',
  30: '* 독서 각도 — 등받이를 세워 책을 보거나 대화하실 때 씁니다.',
  45: '* 식사 각도 — 병상에서 식사하실 때 권하는 각도입니다.',
};

interface RoomTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRoom?: RoomType;
  onBookRoom: (room: RoomType) => void;
}

export const RoomTourModal: React.FC<RoomTourModalProps> = ({
  isOpen,
  onClose,
  initialRoom = 'royal',
  onBookRoom,
}) => {
  const [activeRoom, setActiveRoom] = useState<RoomType>(initialRoom);
  const [bedAngle, setBedAngle] = useState<0 | 30 | 45>(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 (샘플 공용 훅)
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  // 닫힐 때 언마운트되지 않으므로(아래 `return null`) useState 초기값은 최초 1회뿐이다.
  // 열릴 때마다 호출부가 넘긴 병실로 맞춰 주지 않으면 「무엇을 눌러도 같은 투어」가 된다.
  useEffect(() => {
    if (isOpen) {
      setActiveRoom(initialRoom);
      setActiveHotspot(null);
      setBedAngle(0);
    }
  }, [isOpen, initialRoom]);

  if (!isOpen) return null;

  const hotspotsRoyal = [
    {
      id: 'bed',
      x: '50%',
      y: '65%',
      title: '4모터 전동 모션베드',
      desc: '리모컨 원터치로 상체/하체 각도를 자유자재로 조절하여 척추 압력을 최소화합니다.',
    },
    {
      id: 'terrace',
      x: '75%',
      y: '45%',
      title: '편백나무 힐링 정원 테라스',
      desc: '자연 채광과 피톤치드를 들이마실 수 있는 독립 전용 발코니 정원입니다.',
    },
    {
      id: 'air',
      x: '25%',
      y: '30%',
      title: '병실별 공기청정 · 환기 설비',
      desc: '헤파 필터 공기청정기와 개별 환기 노즐을 두고, 은은한 편백 향을 냅니다.',
    },
    {
      id: 'shower',
      x: '15%',
      y: '55%',
      title: '프라이빗 건식 화장실 & 샤워부스',
      desc: '환자의 미끄럼 방지 논슬립 타일과 비상 호출 벨이 24시간 연결되어 있습니다.',
    },
  ];

  const hotspotsHarmony = [
    {
      id: 'partition',
      x: '50%',
      y: '45%',
      title: '천장 일체형 독립 차음 칸막이',
      desc: '2인실이지만 시선과 생활 소음을 줄이도록 천장까지 올린 차음 파티션을 뒀습니다.',
    },
    {
      id: 'monitor',
      x: '35%',
      y: '50%',
      title: '개별 암형 모니터 & 무선 헤드셋',
      desc: '침상 각도에 맞춰 각도를 조절할 수 있으며 무선 헤드셋으로 조용히 시청합니다.',
    },
    {
      id: 'locker',
      x: '70%',
      y: '60%',
      title: '전자식 개인 락커 & 냉장고',
      desc: '비밀번호 잠금 방식의 대형 수납장과 개별 냉장고가 침상마다 배치되어 있습니다.',
    },
  ];

  const currentHotspots = activeRoom === 'royal' ? hotspotsRoyal : hotspotsHarmony;

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
        aria-labelledby="boncho-tour-title"
        tabIndex={-1}
        className="bg-[#faf9f6] w-full max-w-[1000px] rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-2xl border border-[#e3e2e0] flex flex-col max-h-[92vh] outline-none"
      >
        {/* Modal Header */}
        <div className="p-4 lg:px-6 bg-[#102a20] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#cbe9da] text-[24px]">view_in_ar</span>
            <div>
              <h3 id="boncho-tour-title" className="font-serif text-[18px] lg:text-[20px] font-bold break-keep">
                본초 360° VIP 병실 가상 체험관
              </h3>
              <p className="text-[12px] text-[#8fab9d]">
                병실 내 핫스팟 아이콘을 터치하여 주요 시설 및 전동 모션베드 각도를 체험해보세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="가상 체험관 닫기"
            className="w-11 h-11 lg:w-8 lg:h-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Room Switcher Tabs */}
        <div className="bg-[#efeeeb] px-6 py-2.5 flex items-center justify-between border-b border-[#e3e2e0]">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setActiveRoom('royal');
                setActiveHotspot(null);
              }}
              className={`px-4 py-1.5 max-lg:min-h-[44px] rounded-lg text-[13px] font-semibold transition-colors cursor-pointer ${
                activeRoom === 'royal'
                  ? 'bg-[#102a20] text-white shadow-sm'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              1인실 로열 스위트 ({AVAILABLE_ROYAL}실)
            </button>
            <button
              onClick={() => {
                setActiveRoom('harmony');
                setActiveHotspot(null);
              }}
              className={`px-4 py-1.5 max-lg:min-h-[44px] rounded-lg text-[13px] font-semibold transition-colors cursor-pointer ${
                activeRoom === 'harmony'
                  ? 'bg-[#75593c] text-white shadow-sm'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              2인실 하모니 스위트 ({AVAILABLE_HARMONY}병상)
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[12px] text-[#75593c] font-medium">
            <span className="material-symbols-outlined text-[16px]">touch_app</span>
            <span>화면 위 핀을 클릭하세요</span>
          </div>
        </div>

        {/* Interactive Viewer Body */}
        <div className="relative grow overflow-hidden bg-black flex items-center justify-center min-h-[350px] lg:min-h-[440px]">
          <img
            alt="360 가상 투어 병실 전경"
            className="w-full h-full object-cover transition-all duration-700 select-none"
            src={activeRoom === 'royal' ? HOSPITAL_IMAGES.royalSuite : HOSPITAL_IMAGES.harmonySuite}
          />

          {/* Interactive Hotspots */}
          {currentHotspots.map((hs) => (
            <button
              key={hs.id}
              type="button"
              aria-label={`${hs.title} 설명 보기`}
              style={{ left: hs.x, top: hs.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer w-11 h-11 flex items-center justify-center"
              onClick={() => setActiveHotspot(hs.id)}
            >
              <div className="relative">
                <span className="w-8 h-8 rounded-full bg-[#102a20]/90 text-white flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </span>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#102a20] text-white text-[11px] font-semibold px-2.5 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                  {hs.title}
                </div>
              </div>
            </button>
          ))}

          {/* Hotspot Detailed Drawer (Bottom) */}
          {activeHotspot && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#e3e2e0] z-30 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] text-[#75593c] font-semibold uppercase">
                    시설 상세 안내
                  </span>
                  <h4 className="font-serif text-[17px] font-bold text-[#102a20]">
                    {currentHotspots.find((h) => h.id === activeHotspot)?.title}
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-1">
                    {currentHotspots.find((h) => h.id === activeHotspot)?.desc}
                  </p>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-[#727974] hover:text-[#102a20] p-1 w-11 h-11 lg:w-auto lg:h-auto flex items-center justify-center shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>
          )}

          {/* Bed Angle Simulator Controller Box (Top Right) */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-[#e3e2e0] text-[#102a20] text-[12px] z-20 hidden lg:block w-52">
            <div className="flex items-center justify-between font-bold mb-1.5">
              <span>전동 모션베드 시뮬레이션</span>
              <span className="text-[#75593c]">{bedAngle}°</span>
            </div>
            <div className="flex gap-1 mb-2">
              <button
                onClick={() => setBedAngle(0)}
                className={`flex-1 py-1 rounded text-[11px] font-semibold ${
                  bedAngle === 0 ? 'bg-[#102a20] text-white' : 'bg-[#efeeeb] text-[#424844]'
                }`}
              >
                평면 (0°)
              </button>
              <button
                onClick={() => setBedAngle(30)}
                className={`flex-1 py-1 rounded text-[11px] font-semibold ${
                  bedAngle === 30 ? 'bg-[#102a20] text-white' : 'bg-[#efeeeb] text-[#424844]'
                }`}
              >
                독서 (30°)
              </button>
              <button
                onClick={() => setBedAngle(45)}
                className={`flex-1 py-1 rounded text-[11px] font-semibold ${
                  bedAngle === 45 ? 'bg-[#102a20] text-white' : 'bg-[#efeeeb] text-[#424844]'
                }`}
              >
                식사 (45°)
              </button>
            </div>
            {/* 각도를 눌러도 숫자만 바뀌던 자리 — 고른 각도의 설명이 실제로 바뀐다 */}
            <p className="text-[10px] text-[#727974] leading-tight">{BED_ANGLE_NOTE[bedAngle]}</p>
          </div>
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="p-4 bg-[#faf9f6] border-t border-[#e3e2e0] flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="text-[13px] text-[#424844]">
            현재 선택된 객실:{' '}
            <strong className="text-[#102a20]">
              {activeRoom === 'royal' ? '1인실 로열 스위트' : '2인실 하모니 스위트'}
            </strong>{' '}
            (화면 시연용 예시입니다)
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 min-h-[44px] rounded-lg border border-[#c2c8c3] text-[#424844] text-[13px] font-semibold hover:bg-[#efeeeb]"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onBookRoom(activeRoom);
              }}
              className="grow lg:grow-0 px-5 py-2.5 min-h-[44px] rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035] flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>이 병실로 입원 예약하기</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
