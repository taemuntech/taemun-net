import React, { useState } from 'react';

interface BedStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBed: (roomType: 'royal' | 'harmony', roomNumber: string) => void;
}

export const BedStatusModal: React.FC<BedStatusModalProps> = ({
  isOpen,
  onClose,
  onSelectBed,
}) => {
  const [filter, setFilter] = useState<'all' | 'single' | 'double'>('all');

  if (!isOpen) return null;

  const rooms = [
    // 3F~5F 1인실 로열 스위트
    { floor: '3F', room: '301호', type: 'royal', status: 'occupied', view: '도심 조망' },
    { floor: '3F', room: '302호', type: 'royal', status: 'occupied', view: '정원 테라스' },
    { floor: '3F', room: '303호', type: 'royal', status: 'occupied', view: '편백 테라스' },
    { floor: '3F', room: '304호', type: 'royal', status: 'available', view: '편백나무 힐링 테라스', highlight: '즉시 입원 가능' },
    { floor: '4F', room: '401호', type: 'royal', status: 'occupied', view: '정원 테라스' },
    { floor: '4F', room: '402호', type: 'royal', status: 'occupied', view: '정원 테라스' },
    { floor: '4F', room: '403호', type: 'royal', status: 'occupied', view: '편백 테라스' },
    { floor: '4F', room: '404호', type: 'royal', status: 'occupied', view: '편백 테라스' },
    { floor: '5F', room: '501호', type: 'royal', status: 'occupied', view: '스카이 정원' },
    { floor: '5F', room: '502호', type: 'royal', status: 'available', view: '스카이 힐링 테라스', highlight: '즉시 입원 가능' },
    { floor: '5F', room: '503호', type: 'royal', status: 'occupied', view: '스카이 테라스' },

    // 6F~7F 2인실 하모니 스위트
    { floor: '6F', room: '601호-A', type: 'harmony', status: 'available', view: '창가 독립구역', highlight: '즉시 입원 가능' },
    { floor: '6F', room: '601호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
    { floor: '6F', room: '602호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
    { floor: '6F', room: '602호-B', type: 'harmony', status: 'available', view: '내측 독립구역', highlight: '즉시 입원 가능' },
    { floor: '6F', room: '603호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
    { floor: '6F', room: '603호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
    { floor: '7F', room: '701호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
    { floor: '7F', room: '701호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
    { floor: '7F', room: '702호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
    { floor: '7F', room: '702호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
    { floor: '7F', room: '703호-A', type: 'harmony', status: 'available', view: '창가 독립구역', highlight: '즉시 입원 가능' },
    { floor: '7F', room: '703호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
  ];

  const filteredRooms = rooms.filter((r) => {
    if (filter === 'single') return r.type === 'royal';
    if (filter === 'double') return r.type === 'harmony';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 lg:p-6 animate-in fade-in duration-200">
      <div className="bg-[#faf9f6] w-full max-w-[850px] rounded-2xl overflow-hidden shadow-2xl border border-[#e3e2e0] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 lg:px-6 bg-[#102a20] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#cbe9da] text-[24px]">hotel</span>
            <div>
              <h3 className="font-serif text-[18px] lg:text-[20px] font-bold">
                본초 전 병상(80Beds) 실시간 현황
              </h3>
              <p className="text-[12px] text-[#8fab9d]">
                오늘 기준 즉시 입원 가능한 병상을 실시간 확인하고 사전 지정하실 수 있습니다.
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

        {/* Status Summary & Filter */}
        <div className="p-4 bg-[#efeeeb] border-b border-[#e3e2e0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[13px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#102a20] animate-ping"></span>
              <span>1인실 로열 잔여: <strong className="text-[#102a20]">2실</strong></span>
            </div>
            <span className="text-[#c2c8c3]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#75593c] animate-ping"></span>
              <span>2인실 하모니 잔여: <strong className="text-[#75593c]">3병상</strong></span>
            </div>
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#102a20] text-white'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              전체 보기
            </button>
            <button
              onClick={() => setFilter('single')}
              className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                filter === 'single'
                  ? 'bg-[#102a20] text-white'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              1인실 (3F~5F)
            </button>
            <button
              onClick={() => setFilter('double')}
              className={`px-3 py-1 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
                filter === 'double'
                  ? 'bg-[#102a20] text-white'
                  : 'bg-white text-[#424844] hover:bg-[#e9e8e5]'
              }`}
            >
              2인실 (6F~7F)
            </button>
          </div>
        </div>

        {/* Room Grid */}
        <div className="p-6 overflow-y-auto grow">
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredRooms.map((r, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  r.status === 'available'
                    ? 'bg-white border-[#102a20] shadow-md ring-2 ring-[#102a20]/10 hover:border-[#264035] cursor-pointer'
                    : 'bg-[#f4f3f0] border-[#e3e2e0] opacity-60'
                }`}
                onClick={() => {
                  if (r.status === 'available') {
                    onClose();
                    onSelectBed(r.type as any, r.room);
                  }
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-[15px] text-[#102a20]">{r.room}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#efeeeb] text-[#75593c]">
                    {r.floor}
                  </span>
                </div>

                <div className="text-[12px] text-[#424844] mb-2">
                  <span>{r.type === 'royal' ? '1인실 로열' : '2인실 하모니'}</span>
                  <div className="text-[11px] text-[#727974]">{r.view}</div>
                </div>

                {r.status === 'available' ? (
                  <div className="pt-2 border-t border-[#cbe9da] flex items-center justify-between">
                    <span className="text-[11px] text-[#102a20] font-bold">즉시 배정 가능</span>
                    <span className="material-symbols-outlined text-[16px] text-[#102a20]">
                      check_circle
                    </span>
                  </div>
                ) : (
                  <div className="pt-2 border-t border-[#e3e2e0] text-[11px] text-[#727974]">
                    재원 중 (입원중)
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#cbe9da]/30 border border-[#b0cdbe] flex items-center gap-3 text-[13px] text-[#052017]">
            <span className="material-symbols-outlined text-[22px] text-[#102a20] shrink-0">
              support_agent
            </span>
            <div>
              <strong>당일 응급 입원 안내:</strong> 대학병원에서 당일 퇴원 후 즉시 전원이 필요하신 경우, 전화 <strong>02-0000-0000</strong>으로 연락 주시면 즉시 입원 병상을 우선 지정하여 대기 없이 바로 병실로 안내해 드립니다.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#faf9f6] border-t border-[#e3e2e0] flex items-center justify-between">
          <div className="text-[12px] text-[#424844]">
            * 초록색 테두리로 표시된 병실을 클릭하시면 즉시 예약 접수로 연결됩니다.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035]"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
