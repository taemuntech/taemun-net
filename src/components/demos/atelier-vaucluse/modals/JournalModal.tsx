'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { X, BookOpen, Newspaper } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface JournalModalProps {
  isOpen: boolean;
  initialTab?: 'journal' | 'press';
  onClose: () => void;
}

// 실존 매체 이름은 쓰지 않는다 — 지어낸 회사에 붙은 보도 이력은 그 자체로 허위 레퍼런스가 된다.
// 기사 제목·요약도 전부 가상이고, 열릴 원문이 없으므로 아무 데도 안 가는 빈 링크는 아예 두지 않는다.
const PRESS_ITEMS = [
  {
    publisher: '글로벌 건축 매거진 (예시)',
    date: '2024.10 Issue',
    title: '시간을 짓는 사람들 — 아뜰리에 보클루즈의 촉각적 미니멀리즘',
    summary:
      '인위적인 장식을 덜어내고 천연 석재와 참나무의 묵직한 물성으로 하이엔드 주거를 다시 읽어낸 권진우, 서유경 소장의 공간 철학 인터뷰.',
  },
  {
    publisher: '인테리어 라이프스타일 매거진 (예시)',
    date: '2024.06 Issue',
    title: '한남동 테라스 빌라 리노베이션에 담긴 빛의 궤적과 안식',
    summary:
      '마이크로시멘트 바닥과 나보나 트래버틴이 이루는 고요한 조화. 도심 속 프라이빗 생추어리로 탈바꿈한 72평형 펜트하우스 심층 탐방.',
  },
  {
    publisher: '국내 인테리어 전문지 (예시)',
    date: '2023.11 Issue',
    title: '직영 1:1 감리와 정밀 시공으로 구현한 무몰딩 미학',
    summary:
      '설계 의도가 현장에서 왜곡되지 않도록 직영 장인팀과 소장이 상주하는 보클루즈 특유의 책임 시공 체계 분석 리포트.',
  },
];

const JOURNAL_ITEMS = [
  {
    category: 'Material Essay',
    date: '2024.11.12',
    title: '왜 우리는 균일한 인공 대리석보다 거친 기공의 트래버틴을 선호하는가',
    excerpt:
      '매끄럽고 균일한 인공 자재는 처음엔 정갈해 보이지만 시간에 닳아 빛을 잃습니다. 반면 천연 트래버틴은 세월이 남기는 손때와 자연광의 그림자를 흡수하며 더욱 깊은 기품을 발합니다...',
  },
  {
    category: 'Spatial Geometry',
    date: '2024.08.24',
    title: '보이지 않는 1mm의 미학: 무몰딩과 히든 도어가 주는 심리적 정적',
    excerpt:
      '몰딩과 걸레받이가 사라진 벽면은 공간의 경계를 허물고 시선을 무한히 확장시킵니다. 하지만 이 고요를 얻기 위해선 밑바탕 미장과 목공의 극단적인 수직·수평 정밀도가 요구됩니다...',
  },
  {
    category: 'Daily Rhythm',
    date: '2024.05.08',
    title: '동선 설계가 결정하는 집의 호흡과 하루의 피로 해소',
    excerpt:
      '현관에서 거실로, 그리고 가장 내밀한 침실과 욕조로 이어지는 마이크로 동선은 단순한 이동 경로가 아니라 외부의 긴장을 점진적으로 내려놓는 심리적 완충 지대입니다...',
  },
];

export const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  initialTab = 'journal',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'journal' | 'press'>(initialTab);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const panelId = useId();

  // 헤더의 Press 를 눌렀는데 지난번에 보던 Journal 이 그대로 열리던 문제 —
  // useState 초기값은 첫 마운트 때 한 번만 읽히므로, 열릴 때마다 요청받은 탭으로 맞춘다.
  useEffect(() => {
    if (isOpen) setActiveTab(initialTab);
  }, [isOpen, initialTab]);

  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-[#faf9f7] rounded max-w-3xl w-full max-h-[88vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden outline-none"
      >
        {/* Header with Tabs */}
        {/* 375px 에서 탭 두 개 + 닫기가 가로로 넘치지 않게 모바일은 글자·여백·아이콘을 줄인다 */}
        <div className="flex items-center justify-between px-4 lg:px-6 py-4 border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
          <h2 id={titleId} className="sr-only">
            아뜰리에 보클루즈 스튜디오 저널과 미디어 소개
          </h2>
          <div role="tablist" aria-label="저널·미디어" className="flex items-center gap-3 lg:gap-6 min-w-0">
            <button
              role="tab"
              type="button"
              aria-selected={activeTab === 'journal'}
              aria-controls={panelId}
              onClick={() => setActiveTab('journal')}
              className={`text-[11px] lg:text-sm uppercase tracking-[0.15em] font-sans min-h-11 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'journal'
                  ? 'border-b-2 border-[#161714] text-[#161714] font-bold'
                  : 'text-[#474741] hover:text-[#161714]'
              }`}
            >
              <BookOpen size={15} className="hidden lg:block" />
              <span>Studio Journal</span>
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={activeTab === 'press'}
              aria-controls={panelId}
              onClick={() => setActiveTab('press')}
              className={`text-[11px] lg:text-sm uppercase tracking-[0.15em] font-sans min-h-11 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'press'
                  ? 'border-b-2 border-[#161714] text-[#161714] font-bold'
                  : 'text-[#474741] hover:text-[#161714]'
              }`}
            >
              <Newspaper size={15} className="hidden lg:block" />
              <span>Press &amp; Media</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] w-11 h-11 -mr-2 shrink-0 flex items-center justify-center rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div id={panelId} role="tabpanel" className="overflow-y-auto p-6 lg:p-8 space-y-6">
          {activeTab === 'journal' ? (
            <div className="space-y-6">
              <p className="text-xs text-[#474741] font-sans">
                아뜰리에 보클루즈 디자인 팀이 공간과 자재, 빛과 사람에 대해 사유한 기록입니다.
              </p>

              <div className="space-y-4">
                {JOURNAL_ITEMS.map((item, idx) => (
                  <article
                    key={idx}
                    className="p-5 rounded bg-[#f4f3f1] border border-[#c8c7bf]/30 space-y-2 hover:border-[#161714] transition-colors"
                  >
                    <div className="flex justify-between text-xs text-[#777770] font-sans">
                      <span className="text-[#904b35] font-medium">{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="text-lg font-serif text-[#161714] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#474741] leading-relaxed font-sans font-light">
                      {item.excerpt}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-xs text-[#474741] font-sans">
                건축·라이프스타일 미디어 소개 지면을 본뜬 화면입니다. 가상 브랜드 샘플이라 아래 매체명·기사·날짜는 모두 예시이며 실제 보도가 아닙니다.
              </p>

              <div className="space-y-4">
                {PRESS_ITEMS.map((item, idx) => (
                  <article
                    key={idx}
                    className="p-5 rounded bg-[#f4f3f1] border border-[#c8c7bf]/30 space-y-2 hover:border-[#161714] transition-colors"
                  >
                    <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-1 text-xs text-[#777770] font-sans">
                      <span className="text-xs font-semibold text-[#161714] uppercase tracking-wider break-keep [word-break:keep-all]">
                        {item.publisher}
                      </span>
                      <span className="shrink-0">{item.date}</span>
                    </div>
                    {/* 예전엔 제목 옆에 바깥 링크 화살표가 있었는데 열릴 원문이 없다 — 눌러도 아무 일 없는 표시는 지운다 */}
                    <h4 className="text-lg font-serif text-[#161714] leading-snug break-keep [word-break:keep-all]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#474741] leading-relaxed font-sans font-light">
                      {item.summary}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#c8c7bf]/30 bg-[#f4f3f1] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-6 min-h-11 rounded text-xs uppercase tracking-wider font-semibold font-sans transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
