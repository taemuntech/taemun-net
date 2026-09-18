'use client';
import React, { useState } from 'react';
import {
  ARTHUR_STERLING_IMAGE_URL,
  IVY_INSTITUTIONS,
} from '../data/admissionsData';
import { ScreenTab, IvyInstitution } from '../types';
import {
  ArrowRight,
  Sparkles,
  Award,
  Scroll,
  Calculator,
  Compass,
  CheckCircle2,
} from 'lucide-react';

interface DispatchScreenProps {
  onSelectTab: (tab: ScreenTab) => void;
  onSelectInstitution?: (inst: IvyInstitution) => void;
  onOpenCandidateCase?: (caseId: string) => void;
}

export const DispatchScreen: React.FC<DispatchScreenProps> = ({
  onSelectTab,
  onSelectInstitution,
  onOpenCandidateCase,
}) => {
  const [selectedIvyId, setSelectedIvyId] = useState<string>('h-univ');

  const activeIvy =
    IVY_INSTITUTIONS.find((i) => i.id === selectedIvyId) || IVY_INSTITUTIONS[0];

  return (
    <div className="flex flex-col w-full font-serif text-[#1b1c1a]">
      {/* 1. TOP BROADSHEET TELEMETRY & ACADEMIC WEATHER BANNER */}
      <section className="w-full bg-[#f5f3ef] px-4 lg:px-8 lg:px-14 py-2 border-b border-black/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 text-[#444748] font-mono text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block w-2 h-2 bg-[#aa304f] rounded-full animate-pulse"></span>
            <span className="font-bold text-black">H-YARD (예시): 52°F</span>
            <span className="text-[#c4c7c7]">·</span>
            <span>
              EARLY DECISION ADMIT RATE:{' '}
              <strong className="text-[#aa304f] font-bold">3.41%</strong>
            </span>
            <span className="text-[#c4c7c7] hidden hidden lg:inline">·</span>
            <span className="hidden hidden lg:inline">
              DIGITAL SAT 99.9TH PERCENTILE:{' '}
              <strong className="text-black font-bold">1570+</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-[#444748] italic font-serif lowercase tracking-normal">
              centennial jubilee edition
            </span>
            <span className="text-[#c4c7c7]">·</span>
            <span className="font-bold text-black">ANNO DOMINI MCMXXIV</span>
          </div>
        </div>
      </section>

      {/* 2. HERO COVER STORY — "THE PRESTIGE DISPATCH" */}
      <section className="w-full px-4 lg:px-8 lg:px-14 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Secondary Broadsheet Masthead */}
          <div className="text-center py-2 my-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#444748] mb-1 font-semibold">
              LATE CITY EDITION · WITH WHICH IS INCORPORATED THE BOSTON SCHOLASTIC CHRONICLE
            </p>
            <h2 className="font-display text-[32px] lg:text-[44px] lg:text-[56px] lg:leading-[64px] font-black uppercase tracking-tight text-black">
              THE PRESTIGE DISPATCH
            </h2>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="h-px bg-black flex-1 max-w-xs"></span>
              <span className="font-mono text-[10px] lg:text-[11px] uppercase text-[#aa304f] font-bold tracking-widest px-2">
                AN ARCHIVAL INQUIRY INTO HIGHER MATRICULATION
              </span>
              <span className="h-px bg-black flex-1 max-w-xs"></span>
            </div>
          </div>

          {/* Main Headline & Standfirst */}
          <div className="max-w-5xl mx-auto text-center my-6">
            <h1 className="font-display text-[28px] lg:text-[36px] lg:text-[52px] lg:text-[60px] font-bold tracking-tight text-black leading-[1.12]">
              Securing the 0.01% Ivy League Seat: Inside the Dialectical Crucible of Modern Elite Admissions
            </h1>
            <p className="font-serif text-[17px] lg:text-[20px] lg:text-[24px] lg:leading-[34px] italic text-[#444748] mt-4 max-w-4xl mx-auto">
              How three decades of forensic portfolio curation, perfect 1600 adaptive metrics, and
              uncompromising rhetorical essays shatter the statistical barrier to Cambridge and New
              Haven.
            </p>
          </div>

          {/* Multi-Column Broadsheet Layout (Desktop 3-Column Spread) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-4">
            {/* Left Column: Editorial & Holistic Rubrics */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-[#f5f3ef] p-4 border-l-2 border-[#aa304f]">
                <span className="font-mono text-[10px] lg:text-[11px] text-[#aa304f] font-bold uppercase tracking-widest block mb-1">
                  EX OFFICIO DEAN DISPATCH
                </span>
                <p className="font-serif text-[17px] italic text-black leading-snug">
                  “Holistic review is not leniency; it is the uncompromising search for intellectual
                  sovereignty.”
                </p>
              </div>

              <div className="text-justify font-serif text-[16px] leading-relaxed text-[#1b1c1a] space-y-3">
                <p>
                  <span className="float-left font-display text-[52px] leading-[44px] font-bold text-[#aa304f] pr-2 pt-1 select-none">
                    I
                  </span>
                  nstitutional priorities within the Ivy League Admissions Senate have shifted from
                  rudimentary score-accumulation to what committee registers codify as{' '}
                  <em className="font-serif italic font-semibold">"Sovereign Scholarship."</em> With
                  over 56,000 applicants vying for fewer than 1,900 first-year places at H-Univ (예시)
                  College, the threshold Academic Index (AI) now functions merely as a preliminary
                  gatekeeper.
                </p>
                <p>
                  The genuine sorting crucible occurs within second-round dialectical audits. Here, an
                  applicant’s Common App portfolio is examined by senior faculty readers who assess
                  not whether a student <em className="font-serif italic">can</em> perform collegiate
                  work, but whether their intellectual trajectory alters the laboratory, seminar, or
                  forensic register of the university.
                </p>
              </div>

              <div className="bg-[#eae8e4] p-4 my-3 border border-black/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#444748] block mb-1 font-bold">
                  ARCHIVAL LATINATE MAXIMS
                </span>
                <p className="font-display text-[20px] italic text-black mb-1">
                  “Ad Astra Per Aspera”
                </p>
                <p className="font-serif text-[13px] text-[#444748] leading-relaxed">
                  Through hardships to the stars — the governing rubric of rigorous applicant
                  evaluation across Cambridge and Providence.
                </p>
                <div className="mt-3 pt-2 border-t border-black/10">
                  <p className="font-display text-[20px] italic text-black mb-1">
                    “Scientia Potentia Est”
                  </p>
                  <p className="font-serif text-[13px] text-[#444748] leading-relaxed">
                    Knowledge is power; authenticated through verifiable national scholarship and
                    original inquiry.
                  </p>
                </div>
              </div>

              <p className="font-serif text-[13px] text-[#444748] italic leading-normal border-t border-black/10 pt-2">
                Published under seal of the Heritage Global Prep Senate, H-Univ (예시) Square &amp; Madison
                Avenue Bureaus.
              </p>
            </div>

            {/* Center Column: Primary Visual (Archival Candidate Case Portrait) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-[#efeeea] p-2.5 shadow-sm border border-black/20">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-black group">
                  <img
                    alt="Editorial portrait of Arthur V. Sterling, H-Univ (예시) 2028 REA Admit at Widener Memorial Library"
                    className="w-full h-full object-cover grayscale contrast-125 filter transition-transform duration-700 group-hover:scale-105"
                    src={ARTHUR_STERLING_IMAGE_URL}
                    loading="eager"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white font-mono text-[10px] px-2 py-1 uppercase tracking-widest font-bold">
                    CASE NO. 2024-H08 // RECORD VERIFIED
                  </div>

                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] px-2 py-1 uppercase">
                    OCTOBER 1958 ARCHIVAL RECONSTRUCTION
                  </div>
                </div>

                <div className="pt-3 px-1 text-left">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
                    <span className="font-mono text-[11px] font-bold text-[#aa304f] uppercase tracking-wider">
                      ARTHUR V. STERLING (H-UNIV ’28 (예시) — REA ADMIT)
                    </span>
                    <span className="font-mono text-[10px] text-[#444748] font-bold bg-[#eae8e4] px-1.5 py-0.5">
                      SINGLE-SITTING 1600
                    </span>
                  </div>
                  <p className="font-serif text-[13px] lg:text-[14px] italic text-[#1b1c1a] leading-snug">
                    Pictured inside the Widener Memorial Library reading room following the delivery
                    of the 2024 National Forensics Valedictory Address. Common Application
                    Dissertation:{' '}
                    <em className="font-bold">“The Mechanics of Horology and Historical Amnesia.”</em>{' '}
                    Matriculating AB Candidate in Philosophy &amp; Mathematics.
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-black/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenCandidateCase) onOpenCandidateCase('case-2024-h08');
                        onSelectTab('essay');
                      }}
                      className="font-mono text-[10px] uppercase font-bold text-[#aa304f] hover:text-black transition-colors flex items-center gap-1"
                    >
                      <span>INSPECT 3-ACT ESSAY MARGINALIA</span>
                      <ArrowRight size={12} />
                    </button>
                    <span className="font-mono text-[10px] text-[#444748]">FOLIO #HG-2024-H08</span>
                  </div>
                </div>
              </div>

              {/* Metric Highlight Bar */}
              <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-[#f5f3ef] p-2.5 border border-black/10">
                  <span className="block font-display text-[26px] lg:text-[30px] font-bold text-black leading-none">
                    1600
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#444748] block mt-1">
                    SAT COMPOSITE
                  </span>
                </div>
                <div className="bg-[#f5f3ef] p-2.5 border border-black/10">
                  <span className="block font-display text-[26px] lg:text-[30px] font-bold text-[#aa304f] leading-none">
                    239/240
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#444748] block mt-1">
                    ACADEMIC INDEX
                  </span>
                </div>
                <div className="bg-[#f5f3ef] p-2.5 border border-black/10">
                  <span className="block font-display text-[26px] lg:text-[30px] font-bold text-black leading-none">
                    RANK I
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#444748] block mt-1">
                    SENATE RATING
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: The Admissions Ledger & Ivy Crest Matrix */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-1 mb-2 border-b border-black">
                  <h3 className="font-display text-[20px] uppercase font-bold text-black tracking-tight">
                    THE ADMISSIONS LEDGER
                  </h3>
                  <span className="font-mono text-[11px] text-[#aa304f] font-bold">
                    COHORT 2024
                  </span>
                </div>
                <p className="font-serif text-[13px] text-[#444748] mb-3 italic leading-snug">
                  Official matriculation yields &amp; verified median SAT scores across the Ivy League
                  institutions for Heritage Global candidates. Click to inspect institution.
                </p>

                {/* 8 Ivy League Matrix Ledger */}
                <div className="space-y-1.5 font-mono text-[12px]">
                  {IVY_INSTITUTIONS.map((item) => {
                    const isSelected = item.id === selectedIvyId;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedIvyId(item.id);
                          if (onSelectInstitution) onSelectInstitution(item);
                        }}
                        className={`p-2 flex items-center justify-between transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#eae8e4] border-black shadow-xs'
                            : 'bg-[#f5f3ef] border-black/5 hover:bg-[#efeeea]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block flex-none"
                            style={{ backgroundColor: item.crestColor }}
                          ></span>
                          <span className="font-bold text-black">{item.shortName}</span>
                          <span className="text-[#444748] text-[10px] hidden hidden lg:inline">
                            ADM: {item.admitRate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-3">
                          <span className="font-serif font-bold text-black">{item.medianSat}</span>
                          <span
                            className={`px-1.5 py-0.5 text-[9px] lg:text-[10px] font-bold ${
                              item.id === 'upenn'
                                ? 'bg-[#aa304f] text-white'
                                : 'bg-black text-white'
                            }`}
                          >
                            {item.admitCount} ADMITS
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Ivy Mini Inspector Callout */}
                <div className="mt-3 p-3 bg-[#f5f3ef] border border-black/20 text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="font-bold text-black uppercase">{activeIvy.name}</span>
                    <span className="text-[#aa304f] italic font-serif">
                      “{activeIvy.latinMotto}” ({activeIvy.mottoTranslation})
                    </span>
                  </div>
                  <p className="font-serif text-[12px] text-[#444748] leading-snug">
                    <strong>Faculty Reading Focus:</strong> {activeIvy.facultyReadingFocus}
                  </p>
                  <div className="mt-2 flex justify-between items-center pt-1 border-t border-black/10">
                    <span className="font-mono text-[10px] text-[#444748]">
                      AI THRESHOLD: {activeIvy.academicIndexThreshold}/240
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectTab('roster')}
                      className="font-mono text-[10px] uppercase font-bold text-[#aa304f] hover:underline"
                    >
                      View Roster Dossier →
                    </button>
                  </div>
                </div>
              </div>

              {/* Summary Stat Ribbon */}
              <div className="mt-2 p-3 bg-[#e4e2de] border border-black/20">
                <div className="grid grid-cols-1 divide-y divide-black/10">
                  <div className="py-1 flex justify-between items-center font-mono text-[11px]">
                    <span className="uppercase text-[#444748]">Top-20 Placement Rate</span>
                    <strong className="font-display text-black text-[18px]">99.4%</strong>
                  </div>
                  <div className="py-1 flex justify-between items-center font-mono text-[11px]">
                    <span className="uppercase text-[#444748]">Average SAT Cohort Score</span>
                    <strong className="font-display text-[#aa304f] text-[18px]">1580</strong>
                  </div>
                  <div className="py-1 flex justify-between items-center font-mono text-[11px]">
                    <span className="uppercase text-[#444748]">Alumni Interview Distinction</span>
                    <strong className="font-display text-black text-[18px]">100%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK DISPATCH TELEGRAPH INTERFACING PANELS */}
      <section className="w-full bg-[#efeeea] px-4 lg:px-8 lg:px-14 py-8 border-t border-b border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#aa304f] font-bold block mb-1">
              THE GAZETTE PORTAL // OPERATIONAL SECTORS
            </span>
            <h3 className="font-display text-[26px] lg:text-[32px] font-bold text-black uppercase">
              Explore The Complete Heritage Global Prep Dossier
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Box 1: SAT 1600 Calculator */}
            <div
              onClick={() => onSelectTab('calculator')}
              className="bg-[#fbf9f5] p-4 border border-black/20 hover:border-black cursor-pointer shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-[#aa304f] uppercase">
                    SECTOR II
                  </span>
                  <Calculator size={18} className="text-black group-hover:text-[#aa304f]" />
                </div>
                <h4 className="font-display text-[18px] font-bold text-black mb-1">
                  1600 Adaptive Computator
                </h4>
                <p className="font-serif text-[13px] text-[#444748] leading-relaxed">
                  Real-time simulation of the Digital SAT adaptive engine with domain subscores and
                  Ivy odds modeling.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-[#aa304f] font-bold uppercase">
                <span>Launch Engine</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Box 2: Essay Dissection */}
            <div
              onClick={() => onSelectTab('essay')}
              className="bg-[#fbf9f5] p-4 border border-black/20 hover:border-black cursor-pointer shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-[#aa304f] uppercase">
                    SECTOR III
                  </span>
                  <Scroll size={18} className="text-black group-hover:text-[#aa304f]" />
                </div>
                <h4 className="font-display text-[18px] font-bold text-black mb-1">
                  Dissectio Rhetorica
                </h4>
                <p className="font-serif text-[13px] text-[#444748] leading-relaxed">
                  Annotated 3-act dissection of Case No. 2024-H08 and other verified Common App
                  dissertations.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-[#aa304f] font-bold uppercase">
                <span>Inspect Essays</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Box 3: Ivy Crest Roster */}
            <div
              onClick={() => onSelectTab('roster')}
              className="bg-[#fbf9f5] p-4 border border-black/20 hover:border-black cursor-pointer shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-[#aa304f] uppercase">
                    SECTOR IV
                  </span>
                  <Compass size={18} className="text-black group-hover:text-[#aa304f]" />
                </div>
                <h4 className="font-display text-[18px] font-bold text-black mb-1">
                  Ivy Crest Roster &amp; Senate
                </h4>
                <p className="font-serif text-[13px] text-[#444748] leading-relaxed">
                  Institutional profiles for all 8 Ivy League universities plus advisory profiles of
                  the Scholastic Fellowship.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-[#aa304f] font-bold uppercase">
                <span>Review Senate</span>
                <ArrowRight size={12} />
              </div>
            </div>

            {/* Box 4: Dean's Registry */}
            <div
              onClick={() => onSelectTab('registry')}
              className="bg-[#fbf9f5] p-4 border border-[#aa304f] hover:bg-[#aa304f] hover:text-white cursor-pointer shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-[#aa304f] group-hover:text-white uppercase">
                    SECTOR V
                  </span>
                  <Award size={18} className="text-[#aa304f] group-hover:text-white" />
                </div>
                <h4 className="font-display text-[18px] font-bold text-black group-hover:text-white mb-1">
                  Portfolio Audit Registry
                </h4>
                <p className="font-serif text-[13px] text-[#444748] group-hover:text-white/90 leading-relaxed">
                  Confidential evaluation under Dean-Candidate Privilege. Limited to 18 scholars per
                  cycle.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-black/10 group-hover:border-white/20 flex items-center justify-between font-mono text-[10px] text-[#aa304f] group-hover:text-white font-bold uppercase">
                <span>Apply For Audit</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BROADSHEET IMPRINT & COORDINATES */}
      <section className="w-full px-4 lg:px-8 lg:px-14 py-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between text-[#444748] font-mono text-[11px] gap-2 uppercase">
          <span>PRESS NO. 901-44-B · ARCHIVAL BROADSHEET EDITION</span>
          <div className="flex items-center gap-3">
            <span>CAMBRIDGE: BRATTLE ST.</span>
            <span>·</span>
            <span>SEOUL: DAECHI-DONG CORRIDOR</span>
            <span>·</span>
            <span>NEW YORK: MADISON AVE.</span>
          </div>
        </div>
      </section>
    </div>
  );
};
