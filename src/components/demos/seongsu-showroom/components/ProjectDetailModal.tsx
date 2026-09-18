'use client';
import React, { useId, useRef } from 'react';
import Image from 'next/image';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { ProjectCase } from '../types';

interface ProjectDetailModalProps {
  project: ProjectCase | null;
  onClose: () => void;
  onConsult: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onConsult }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc·배경 스크롤 잠금·포커스 순환 — 샘플 공용 훅. 훅이라 early return 앞에서 부른다
  useSampleDialog({ open: project !== null, onClose, dialogRef });

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
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
        className="bg-[#141519] border border-white/15 rounded-t-xl lg:rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto overscroll-contain text-white p-6 lg:p-8 space-y-6 shadow-2xl relative outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded text-stone-400 hover:text-white text-lg z-10"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 머리 판 — 전용 사진이 있을 때만 사진, 없으면 개념 판(목록 카드와 같은 규격) */}
        <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-white/10 bg-stone-950">
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 1023px) 100vw, 640px"
              className="object-cover"
            />
          ) : (
            <>
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(135deg,#1b1c20_0%,#111216_55%,#191a1e_100%)]"
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.18] bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_9px,rgba(245,197,110,0.5)_9px,rgba(245,197,110,0.5)_10px)]"
              />
              <span className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-stone-400 tracking-wider">
                가상 사례 · 시공 사진 없음
              </span>
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-mono text-amber-400 block mb-1">
              {project.category} · {project.concept}
            </span>
            <h3 id={titleId} className="font-serif text-xl lg:text-2xl font-bold text-white [word-break:keep-all]">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Meta Stats Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-3 bg-stone-900/80 rounded border border-white/5 text-xs font-mono">
          <div>
            <span className="text-stone-400 block mb-0.5">위치</span>
            <span className="text-stone-200 block [word-break:keep-all]">{project.location}</span>
          </div>
          <div>
            <span className="text-stone-400 block mb-0.5">시공 면적</span>
            <span className="text-stone-200 block">{project.area}</span>
          </div>
          <div>
            <span className="text-stone-400 block mb-0.5">공사 기간</span>
            <span className="text-stone-200 block">{project.period}</span>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            SPACE DESIGN STORY
          </h4>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            {project.summary}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            KEY ARCHITECTURAL HIGHLIGHTS
          </h4>
          <ul className="space-y-2">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start text-xs text-stone-300">
                <span className="text-amber-400 mr-2 font-mono font-bold">0{idx + 1}.</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Client Quote — 지어낸 후기다. 수치가 실적으로 읽히지 않게 예시임을 같은 상자 안에 적는다 */}
        <div className="p-4 bg-amber-500/10 border-l-2 border-amber-400 rounded-r text-stone-200 text-xs leading-relaxed">
          <span className="block font-mono text-[10px] not-italic text-amber-300/80 uppercase tracking-wider mb-1.5">
            가상 고객 후기 (예시 · 실제 후기가 아닙니다)
          </span>
          <span className="italic [word-break:keep-all]">{project.clientQuote}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              onClose();
              onConsult(project.title);
            }}
            className="flex-1 min-h-11 py-3.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-widest uppercase transition-colors"
          >
            이 프로젝트 스타일로 상담 신청하기
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 px-6 py-3.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono uppercase"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
