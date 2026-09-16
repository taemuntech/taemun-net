"use client";

import React, { useState } from 'react';
import { ArrowRight, ExternalLink, CheckCircle2, Briefcase, ChevronRight, X, Award } from 'lucide-react';
import { NEWS_ITEMS } from '../data';
import { NewsItem } from '../types';

interface NewsRecruitSectionProps {
  onOpenCareers: () => void;
}

export const NewsRecruitSection: React.FC<NewsRecruitSectionProps> = ({
  onOpenCareers,
}) => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [talentCultureOpen, setTalentCultureOpen] = useState(false);
  const [jobIntroOpen, setJobIntroOpen] = useState(false);

  return (
    <section className="py-24 bg-[#f2f3ff] border-t border-[#c3c6d6]/30" id="recruit">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* PR News Section (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs text-[#003d9b] uppercase tracking-wider block font-bold">
                  Press Release
                </span>
                <h2 className="text-3xl font-bold text-[#131b2e] tracking-tight">
                  원익큐앤씨 뉴스센터
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNews(NEWS_ITEMS[0])}
                className="font-mono text-xs font-semibold text-[#003d9b] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>전체 뉴스</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {NEWS_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNews(item)}
                  className="p-5 rounded-xl bg-white border border-[#c3c6d6]/40 hover:border-[#003d9b] flex items-start justify-between group transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-sm"
                >
                  <div className="pr-4">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#003d9b] mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#dae2ff] text-[#001848] font-semibold text-[11px]">
                        {item.category}
                      </span>
                      <span className="text-[#434654]">{item.date}</span>
                      {item.readTime && (
                        <span className="text-gray-400 hidden lg:inline">
                          • {item.readTime}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#131b2e] group-hover:text-[#003d9b] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#434654] mt-1.5 line-clamp-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <span className="text-[#737685] group-hover:text-[#003d9b] transition-colors ml-4 mt-2 shrink-0">
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruit Banner & Philosophy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#003d9b] p-8 lg:p-10 rounded-xl text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="font-mono text-xs text-[#dae2ff] uppercase tracking-wider block mb-3 font-semibold">
                Career &amp; People
              </span>
              <h3 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4 text-white">
                “훌륭한 인재가
                <br />
                훌륭한 회사를 만듭니다”
              </h3>
              <p className="text-sm text-[#dae2ff] mb-8 leading-relaxed font-light">
                원익큐앤씨는 창의와 열정, 끝없는 도전정신으로 전 세계 반도체 소재의 새로운 역사를 함께 써 내려갈 글로벌 인재를 기다립니다.
              </p>

              <div className="space-y-3 font-medium text-sm">
                <button
                  type="button"
                  onClick={() => setTalentCultureOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/15 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c6e7ff]" />
                    인재상 및 기업 문화
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/70" />
                </button>

                <button
                  type="button"
                  onClick={() => setJobIntroOpen(true)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/15 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#c6e7ff]" />
                    연구개발 및 생산 직무소개
                  </span>
                  <ChevronRight className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/20 relative z-10 flex items-center justify-between">
              <div>
                <span className="font-mono text-[11px] block text-[#dae2ff]">
                  채용 전형 바로가기
                </span>
                <span className="text-lg font-bold text-white">원익 채용포털</span>
              </div>
              <button
                type="button"
                onClick={onOpenCareers}
                id="btn-recruit-portal"
                className="px-5 py-2.5 rounded-md bg-white text-[#003d9b] font-mono text-xs font-bold hover:bg-gray-100 transition-colors shadow cursor-pointer"
              >
                지원하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* News Article Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-xl p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded bg-[#dae2ff] text-[#001848] font-bold">
                  {selectedNews.category}
                </span>
                <span className="text-gray-500">{selectedNews.date}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-3">
              <h3 className="text-xl font-bold text-[#131b2e] leading-snug">
                {selectedNews.title}
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed pt-2">
                {selectedNews.summary}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-600 leading-relaxed border border-gray-100">
                원익큐앤씨는 '인간존중', '고객만족', '가치창조'의 경영철학을 바탕으로 기술 혁신과 더불어 사회적 동반성장을 지속적으로 실천하고 있습니다. 앞으로도 지역사회와 호흡하며 지속가능한 미래 가치를 만들어가겠습니다.
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-semibold rounded-md"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Talent & Culture Modal */}
      {talentCultureOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setTalentCultureOpen(false)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-xl p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#131b2e] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#003d9b]" />
                원익의 인재상 및 기업 문화
              </h3>
              <button
                type="button"
                onClick={() => setTalentCultureOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 text-sm text-gray-700">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#f2f3ff] rounded-lg border border-[#dae2fd]">
                  <span className="font-bold text-[#003d9b] block text-base mb-1">자유 (Freedom)</span>
                  <span className="text-xs text-gray-600">창의적 사고와 주도적인 실행력</span>
                </div>
                <div className="p-3 bg-[#f2f3ff] rounded-lg border border-[#dae2fd]">
                  <span className="font-bold text-[#003d9b] block text-base mb-1">소통 (Communication)</span>
                  <span className="text-xs text-gray-600">상호 신뢰와 투명한 협업</span>
                </div>
                <div className="p-3 bg-[#f2f3ff] rounded-lg border border-[#dae2fd]">
                  <span className="font-bold text-[#003d9b] block text-base mb-1">행복 (Happiness)</span>
                  <span className="text-xs text-gray-600">일과 삶의 조화로운 성장</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg text-xs leading-relaxed space-y-1.5">
                <p className="font-bold text-gray-800">복리후생 프로그램</p>
                <p>• 유연근무제(자율출퇴근제) 운영 및 패밀리데이 조기퇴근 지원</p>
                <p>• 사내 어학 및 직무역량 교육 전액 지원, 자녀 학자금 지원</p>
                <p>• 종합건강검진 지원, 주택자금 대출 이자 지원 및 사택/기숙사 운영</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setTalentCultureOpen(false)}
                className="px-4 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-semibold rounded-md"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Introduction Modal */}
      {jobIntroOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setJobIntroOpen(false)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-xl p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-[#131b2e] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#003d9b]" />
                연구개발 및 생산 핵심 직무 소개
              </h3>
              <button
                type="button"
                onClick={() => setJobIntroOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-3 text-xs text-gray-700">
              <div className="p-3 border border-gray-200 rounded-lg">
                <span className="font-bold text-sm text-[#003d9b] block mb-1">
                  1. R&amp;D 연구개발 (소재 / 공정 / 설계)
                </span>
                <p className="text-gray-600">
                  반도체용 합성 쿼츠 및 고순도 SiC, 플라즈마 내식 세라믹 신소재 배합 설계, VUV 광원 광학 시뮬레이션
                </p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <span className="font-bold text-sm text-[#003d9b] block mb-1">
                  2. 제조기술 및 생산엔지니어
                </span>
                <p className="text-gray-600">
                  초정밀 쿼츠웨어 열가공 로보틱스 공정 튜닝, 초음파 정밀 세정 챔버 라인 가동 및 생산성 극대화
                </p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg">
                <span className="font-bold text-sm text-[#003d9b] block mb-1">
                  3. 품질보증 (QA / QC)
                </span>
                <p className="text-gray-600">
                  클린룸 3차원 레이저 치수 측정, SEM/EDS 성분 분석, 글로벌 톱티어 반도체 고객사 인증 및 품질 감사 대응
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setJobIntroOpen(false);
                  onOpenCareers();
                }}
                className="px-4 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-semibold rounded-md"
              >
                채용공고 확인하러 가기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
