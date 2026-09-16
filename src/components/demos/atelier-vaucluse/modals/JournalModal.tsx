'use client';

import React, { useState } from 'react';
import { X, BookOpen, Newspaper, ArrowUpRight } from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  initialTab?: 'journal' | 'press';
  onClose: () => void;
}

const PRESS_ITEMS = [
  {
    publisher: '글로벌 건축 매거진 (예시)',
    date: '2024.10 Issue',
    title: '시간을 짓는 사람들 — 아뜰리에 보클루즈의 촉각적 미니멀리즘',
    summary:
      '인위적인 장식을 덜어내고 천연 석재와 참나무의 묵직한 물성을 통해 하이엔드 주거의 새로운 표준을 제시한 권진우, 서유경 소장의 공간 철학 인터뷰.',
    link: '#',
  },
  {
    publisher: '인테리어 라이프스타일 매거진 (예시)',
    date: '2024.06 Issue',
    title: '한남동 테라스 빌라 리노베이션에 담긴 빛의 궤적과 안식',
    summary:
      '마이크로시멘트 바닥과 이탈리아 나보나 트래버틴이 이루는 고요한 조화. 도심 속 프라이빗 생추어리로 탈바꿈한 72평형 펜트하우스 심층 탐방.',
    link: '#',
  },
  {
    publisher: '월간 INTERIOR',
    date: '2023.11 Issue',
    title: '직영 1:1 감리와 정밀 시공으로 구현한 1mm 오차 없는 무몰딩 미학',
    summary:
      '설계 의도가 현장에서 왜곡되지 않도록 직영 장인팀과 소장이 상주하는 보클루즈 특유의 책임 시공 체계 분석 리포트.',
    link: '#',
  },
];

const JOURNAL_ITEMS = [
  {
    category: 'Material Essay',
    date: '2024.11.12',
    title: '왜 우리는 완벽한 인공 대리석보다 거친 기공의 트래버틴을 선호하는가',
    excerpt:
      '매끄럽고 완벽하게 균일한 인공 자재는 처음엔 정갈해 보이지만 시간에 닳아 빛을 잃습니다. 반면 천연 트래버틴은 세월이 남기는 손때와 자연광의 그림자를 흡수하며 더욱 깊은 기품을 발합니다...',
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#faf9f7] rounded max-w-3xl w-full max-h-[88vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('journal')}
              className={`text-sm uppercase tracking-[0.15em] font-sans pb-1 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'journal'
                  ? 'border-b-2 border-[#161714] text-[#161714] font-bold'
                  : 'text-[#474741] hover:text-[#161714]'
              }`}
            >
              <BookOpen size={15} />
              <span>Studio Journal</span>
            </button>
            <button
              onClick={() => setActiveTab('press')}
              className={`text-sm uppercase tracking-[0.15em] font-sans pb-1 transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === 'press'
                  ? 'border-b-2 border-[#161714] text-[#161714] font-bold'
                  : 'text-[#474741] hover:text-[#161714]'
              }`}
            >
              <Newspaper size={15} />
              <span>Press &amp; Media</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] p-1.5 rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-6">
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
                주요 건축 및 라이프스타일 미디어에 소개된 아뜰리에 보클루즈의 프로젝트와 기사입니다.
              </p>

              <div className="space-y-4">
                {PRESS_ITEMS.map((item, idx) => (
                  <article
                    key={idx}
                    className="p-5 rounded bg-[#f4f3f1] border border-[#c8c7bf]/30 space-y-2 hover:border-[#161714] transition-colors"
                  >
                    <div className="flex justify-between items-baseline text-xs text-[#777770] font-sans">
                      <span className="text-xs font-semibold text-[#161714] uppercase tracking-wider">
                        {item.publisher}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <h4 className="text-lg font-serif text-[#161714] flex items-center justify-between gap-2">
                      <span>{item.title}</span>
                      <ArrowUpRight size={14} className="text-[#904b35] shrink-0" />
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
            className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-6 py-2.5 rounded text-xs uppercase tracking-wider font-semibold font-sans transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
