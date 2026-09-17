'use client';

import React, { useState } from 'react';
import { LEXILE_BOOKS } from '../data/veritasData';
import { LexileBook } from '../types';

export function LexileLibrarySection() {
  const [selectedBook, setSelectedBook] = useState<LexileBook>(LEXILE_BOOKS[1]);
  const [lexileFilter, setLexileFilter] = useState<number>(500);

  const handleSelectBook = (book: LexileBook) => {
    setSelectedBook(book);
    setLexileFilter(book.lexile);
  };

  return (
    <section id="lexile-library" className="py-20 lg:py-28 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            INTERACTIVE LEXILE BOOKSHELF
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-[#0F2942] tracking-tight">
            렉사일(Lexile) 레벨별 원서 큐레이션 서재
          </h2>
          <p className="text-xs lg:text-sm text-slate-600 mt-2">
            슬라이더를 조절하여 아이의 학년과 읽기 역량에 정확히 일치하는 미국 사립학교 필독서를 탐색해 보십시오.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-12 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#0F2942]">현재 탐색 렉사일 지수</span>
            <span className="text-base font-serif font-black text-blue-700">
              {lexileFilter}L
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="1100"
            step="50"
            value={lexileFilter}
            onChange={(e) => {
              const val = Number(e.target.value);
              setLexileFilter(val);
              let closest = LEXILE_BOOKS[0];
              let minDiff = Math.abs(closest.lexile - val);
              LEXILE_BOOKS.forEach((b) => {
                const diff = Math.abs(b.lexile - val);
                if (diff < minDiff) {
                  minDiff = diff;
                  closest = b;
                }
              });
              setSelectedBook(closest);
            }}
            className="w-full accent-blue-700 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
            <span>200L (유치~초1)</span>
            <span>500L (초2~3)</span>
            <span>800L (초4~5)</span>
            <span>1100L (초6~중등)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {LEXILE_BOOKS.map((book) => {
            const isSelected = selectedBook.id === book.id;
            return (
              <div
                key={book.id}
                onClick={() => handleSelectBook(book)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/60 border-blue-600 shadow-lg ring-2 ring-blue-600/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className={`h-48 rounded-xl bg-gradient-to-br ${book.coverColor} p-4 text-white flex flex-col justify-between mb-4 shadow-inner relative overflow-hidden`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/20">
                      Lexile {book.lexile}L
                    </span>
                    <span className="text-[10px] font-mono opacity-80">AR {book.arLevel}</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base leading-tight mb-1 line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-[11px] opacity-80">{book.author}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{book.targetAge}</span>
                  <span className="font-semibold text-blue-700">{book.genre}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {book.summary}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-10 shadow-xl border border-slate-800">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                  선택 도서 상세 분석
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Target: {selectedBook.targetAge}
                </span>
              </div>
              <h3 className="text-xl lg:text-3xl font-serif font-bold text-white mb-3">
                {selectedBook.title}
              </h3>
              <p className="text-xs lg:text-sm text-slate-300 leading-relaxed mb-6">
                {selectedBook.summary}
              </p>

              <div>
                <span className="text-xs font-bold text-blue-400 block mb-2 uppercase tracking-wider">
                  핵심 학습 어휘 (Target Vocabulary)
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedBook.keyVocabulary.map((vocab, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-200 border border-slate-700"
                    >
                      {vocab}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl lg:w-72 w-full shrink-0">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 pb-2 border-b border-slate-700">
                수업 리딩 가이드 지표
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">렉사일 지수</span>
                  <span className="font-bold text-blue-400">{selectedBook.lexile}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AR 지수 (미국 학년)</span>
                  <span className="font-bold text-white">Grade {selectedBook.arLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">디베이트 토론형</span>
                  <span className="font-bold text-emerald-400">적용 가능</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">북리포트 과제</span>
                  <span className="font-bold text-white">에세이 1편</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
