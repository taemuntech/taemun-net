'use client';
import React, { useState } from 'react';
import { ESSAY_CASES } from '../data/admissionsData';
import { ScreenTab, EssayCase } from '../types';
import {
  PenTool,
  CheckCheck,
  Award,
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  BadgeCheck,
} from 'lucide-react';

interface EssayDissectionScreenProps {
  selectedCaseId?: string;
  onSelectTab: (tab: ScreenTab) => void;
}

export const EssayDissectionScreen: React.FC<EssayDissectionScreenProps> = ({
  selectedCaseId = 'case-2024-h08',
  onSelectTab,
}) => {
  const [activeCaseId, setActiveCaseId] = useState<string>(selectedCaseId);
  const [expandedAct, setExpandedAct] = useState<number | null>(null);

  const activeCase: EssayCase =
    ESSAY_CASES.find((c) => c.id === activeCaseId) || ESSAY_CASES[0];

  return (
    <div className="flex flex-col w-full font-serif text-[#1b1c1a]">
      {/* Section Header */}
      <section className="w-full bg-[#efeeea] px-4 lg:px-8 lg:px-14 py-8 border-b border-black">
        <div className="max-w-6xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#aa304f] font-bold block mb-1">
            RHETORICAL DISSECTION // THE ADMISSIONS LECTERN
          </span>
          <h1 className="font-display text-[26px] lg:text-[36px] lg:text-[44px] font-bold text-black uppercase tracking-tight leading-tight">
            Dissectio Rhetorica // Common App Essay Anatomy &amp; Marginalia
          </h1>
          <p className="font-serif text-[16px] lg:text-[18px] italic text-[#444748] mt-2 max-w-2xl mx-auto">
            Archival inspection of verified admissions dissertations. Annotated with critical red-pen
            marginalia by former Ivy Admissions Committee chairs.
          </p>
        </div>
      </section>

      {/* Case Navigation Tabs */}
      <section className="w-full px-4 lg:px-8 lg:px-14 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase font-bold text-black">
                ARCHIVAL DOSSIER FILE:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ESSAY_CASES.map((ec) => (
                <button
                  key={ec.id}
                  type="button"
                  onClick={() => setActiveCaseId(ec.id)}
                  className={`px-3 py-1.5 font-mono text-[11px] uppercase transition-all border ${
                    activeCaseId === ec.id
                      ? 'bg-black text-white font-bold border-black shadow-xs'
                      : 'bg-[#f5f3ef] text-[#444748] border-black/20 hover:text-black hover:border-black'
                  }`}
                >
                  <span className="font-bold">{ec.caseNo}</span> · {ec.candidateName} (
                  {ec.institution})
                </button>
              ))}
            </div>
          </div>

          {/* Dossier Meta Strip */}
          <div className="mt-4 p-3 bg-[#f5f3ef] border border-black/15 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-[#aa304f] font-bold">{activeCase.caseNo}</span>
              <span>·</span>
              <strong className="text-black">{activeCase.candidateName}</strong>
              <span className="text-[#444748]">({activeCase.matriculationYear})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#444748]">
                CONCENTRATION: <strong className="text-black">{activeCase.concentration}</strong>
              </span>
              <span>·</span>
              <span className="text-[#444748]">
                SAT COMPOSITE: <strong className="text-[#aa304f]">{activeCase.satScore}</strong>
              </span>
            </div>
          </div>

          {/* Dissertation Title Plaque */}
          <div className="my-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#444748] block mb-1">
              DISSERTATION TITLE &amp; EXPOSITION
            </span>
            <h2 className="font-display text-[24px] lg:text-[30px] lg:text-[36px] font-bold text-black italic">
              “{activeCase.title}”
            </h2>
          </div>

          {/* 3-Column Broadsheet Print with Hand Marginalia Notes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Column 1: Act I - The Hook */}
            <div className="bg-[#f5f3ef] p-5 flex flex-col justify-between relative shadow-xs border border-black/20">
              <div>
                <div className="flex justify-between items-center pb-2 mb-3 border-b border-black">
                  <span className="font-mono text-[11px] font-bold uppercase text-black tracking-wider">
                    {activeCase.act1.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#aa304f]">
                    {activeCase.act1.paragraphs}
                  </span>
                </div>

                {/* Manuscript Extract */}
                <div className="bg-[#fbf9f5] p-4 mb-4 shadow-inner border border-black/10">
                  <p className="font-serif text-[15px] lg:text-[16px] italic text-black leading-relaxed">
                    {activeCase.act1.excerpt}
                  </p>
                </div>

                {/* Red Pen Marginalia Callout */}
                <div className="p-3 bg-[#ffd9dd] text-[#400014] border-l-3 border-[#aa304f]">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold mb-1">
                    <PenTool size={13} className="text-[#aa304f]" />
                    <span>{activeCase.act1.marginaliaTitle}</span>
                  </div>
                  <p className="font-serif text-[13px] leading-snug">
                    {activeCase.act1.marginaliaNote}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-2 border-t border-black/10 flex justify-between items-center font-mono text-[11px] uppercase text-[#444748]">
                <span>VOICE: {activeCase.act1.metrics.voice}</span>
                <span className="font-bold text-black">
                  HOOK RIGOR: {activeCase.act1.metrics.hook}
                </span>
              </div>
            </div>

            {/* Column 2: Act II - The Crisis */}
            <div className="bg-[#f5f3ef] p-5 flex flex-col justify-between relative shadow-xs border border-black/20">
              <div>
                <div className="flex justify-between items-center pb-2 mb-3 border-b border-black">
                  <span className="font-mono text-[11px] font-bold uppercase text-black tracking-wider">
                    {activeCase.act2.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#aa304f]">
                    {activeCase.act2.paragraphs}
                  </span>
                </div>

                {/* Manuscript Extract */}
                <div className="bg-[#fbf9f5] p-4 mb-4 shadow-inner border border-black/10">
                  <p className="font-serif text-[15px] lg:text-[16px] italic text-black leading-relaxed">
                    {activeCase.act2.excerpt}
                  </p>
                </div>

                {/* Red Pen Marginalia Callout */}
                <div className="p-3 bg-[#ffd9dd] text-[#400014] border-l-3 border-[#aa304f]">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold mb-1">
                    <Sparkles size={13} className="text-[#aa304f]" />
                    <span>{activeCase.act2.marginaliaTitle}</span>
                  </div>
                  <p className="font-serif text-[13px] leading-snug">
                    {activeCase.act2.marginaliaNote}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-2 border-t border-black/10 flex justify-between items-center font-mono text-[11px] uppercase text-[#444748]">
                <span>RHETORIC: {activeCase.act2.metrics.rhetoric}</span>
                <span className="font-bold text-[#aa304f]">
                  COGNITIVE DEPTH: {activeCase.act2.metrics.depth}
                </span>
              </div>
            </div>

            {/* Column 3: Act III - The Synthesis */}
            <div className="bg-[#f5f3ef] p-5 flex flex-col justify-between relative shadow-xs border border-black/20">
              <div>
                <div className="flex justify-between items-center pb-2 mb-3 border-b border-black">
                  <span className="font-mono text-[11px] font-bold uppercase text-black tracking-wider">
                    {activeCase.act3.label}
                  </span>
                  <span className="font-mono text-[11px] text-[#aa304f]">
                    {activeCase.act3.folio}
                  </span>
                </div>

                {/* Manuscript Extract */}
                <div className="bg-[#fbf9f5] p-4 mb-4 shadow-inner border border-black/10">
                  <p className="font-serif text-[15px] lg:text-[16px] italic text-black leading-relaxed">
                    {activeCase.act3.excerpt}
                  </p>
                </div>

                {/* Red Stamp Visual Box */}
                <div className="p-3 bg-[#fbf9f5] text-[#aa304f] relative overflow-hidden shadow-xs border border-[#aa304f]/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BadgeCheck size={18} className="text-[#aa304f]" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
                      COMMITTEE DISPOSITION
                    </span>
                  </div>
                  <p className="font-serif text-[13px] text-black leading-tight">
                    {activeCase.act3.committeeDisposition}
                  </p>
                  <div className="mt-2.5 text-right">
                    <span className="inline-block bg-[#aa304f] text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest">
                      {activeCase.act3.verdict}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-2 border-t border-black/10 flex justify-between items-center font-mono text-[11px] uppercase text-[#444748]">
                <span>FINAL RATING: {activeCase.act3.metrics.rating}</span>
                <span className="font-bold text-black">
                  STATUS: {activeCase.act3.metrics.status}
                </span>
              </div>
            </div>
          </div>

          {/* Rhetorical Rules of Elite Admissions Banner */}
          <div className="mt-10 p-6 bg-[#eae8e4] border-2 border-black">
            <h3 className="font-display text-[22px] font-bold text-black uppercase mb-3">
              The 4 Uncompromising Canon Rules of the Heritage Rhetoric Lectern
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-4 font-serif text-[14px]">
              <div className="p-3 bg-[#fbf9f5] border border-black/10">
                <strong className="font-mono text-[11px] uppercase text-[#aa304f] block mb-1">
                  RULE I: SENSORY IMMEDIACY
                </strong>
                Never begin with abstractions, family genealogies, or quotes from Albert Einstein.
                Anchor the reader in a concrete laboratory, archival text, or physical friction.
              </div>
              <div className="p-3 bg-[#fbf9f5] border border-black/10">
                <strong className="font-mono text-[11px] uppercase text-[#aa304f] block mb-1">
                  RULE II: EPISTEMIC CRISIS
                </strong>
                Show what happens when the student’s preexisting hypothesis collapses. The essay
                must depict the difficult moment where certainty is challenged and reconstructed.
              </div>
              <div className="p-3 bg-[#fbf9f5] border border-black/10">
                <strong className="font-mono text-[11px] uppercase text-[#aa304f] block mb-1">
                  RULE III: ANTI-PERFORMATIVE
                </strong>
                Banish sentimental self-aggrandizement. The student must demonstrate collegiate
                citizenship rather than treating community service as an admissions transaction.
              </div>
              <div className="p-3 bg-[#fbf9f5] border border-black/10">
                <strong className="font-mono text-[11px] uppercase text-[#aa304f] block mb-1">
                  RULE IV: SOVEREIGN SYNTHESIS
                </strong>
                Close not by predicting personal fame or career riches, but by declaring readiness
                to contribute to the university’s dialectical seminar and laboratory traditions.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/20 flex flex-col lg:flex-row items-center justify-between gap-4">
              <span className="font-serif text-[14px] italic text-[#444748]">
                Seeking line-by-line editorial annotation for your candidate dissertation?
              </span>
              <button
                type="button"
                onClick={() => onSelectTab('registry')}
                className="bg-black hover:bg-[#aa304f] text-white font-mono text-[11px] uppercase tracking-wider font-bold px-4 py-2 flex items-center gap-2 transition-colors"
              >
                <span>COMMISSION SENATE ESSAY AUDIT</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
