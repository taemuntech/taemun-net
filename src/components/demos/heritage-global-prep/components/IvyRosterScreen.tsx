'use client';
import React, { useState } from 'react';
import { IVY_INSTITUTIONS, SENATE_FELLOWS } from '../data/admissionsData';
import { ScreenTab, IvyInstitution, SenateFellow } from '../types';
import {
  Compass,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  ExternalLink,
  ArrowRight,
  Shield,
  UserCheck,
} from 'lucide-react';

interface IvyRosterScreenProps {
  onSelectTab: (tab: ScreenTab) => void;
}

export const IvyRosterScreen: React.FC<IvyRosterScreenProps> = ({ onSelectTab }) => {
  const [selectedInst, setSelectedInst] = useState<IvyInstitution | null>(null);
  const [selectedFellow, setSelectedFellow] = useState<SenateFellow | null>(null);
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredInstitutions = IVY_INSTITUTIONS.filter(
    (inst) =>
      inst.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      inst.shortName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      inst.location.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full font-serif text-[#1b1c1a]">
      {/* Masthead Header */}
      <section className="w-full bg-[#efeeea] px-4 lg:px-8 lg:px-14 py-8 border-b border-black">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#aa304f] font-bold block mb-1">
              SENATUS ACADEMICUS // INSTITUTIONAL ENROLLMENT LEDGER
            </span>
            <h1 className="font-display text-[26px] lg:text-[36px] lg:text-[42px] font-bold text-black uppercase tracking-tight leading-tight">
              Ivy Crest Roster &amp; The Scholastic Fellowship
            </h1>
          </div>
          <p className="font-serif text-[15px] italic text-[#444748] max-w-md text-left lg:text-right">
            Direct forensic advisory from former Ivy League admissions chairs, Rhodes Scholars, and
            curators of Sovereign Scholarship.
          </p>
        </div>
      </section>

      {/* 1. THE 8 IVY LEAGUE INSTITUTIONAL MATRIX */}
      <section className="w-full px-4 lg:px-8 lg:px-14 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-3 mb-6 border-b-2 border-black gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#aa304f] font-bold block">
                IVY LEAGUE OCTET // MATRICULATION LEDGER
              </span>
              <h2 className="font-display text-[24px] font-bold text-black uppercase">
                The Eight Historic Colonial Colleges
              </h2>
            </div>
            <div className="w-full lg:w-auto">
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search college, location, motto..."
                className="w-full lg:w-64 bg-[#f5f3ef] border border-black/20 px-3 py-1.5 font-mono text-[11px] focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* Grid of 8 Ivy League Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredInstitutions.map((inst) => (
              <div
                key={inst.id}
                onClick={() => setSelectedInst(inst)}
                className="bg-[#f5f3ef] p-5 border border-black/20 hover:border-black transition-all cursor-pointer shadow-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full inline-block"
                        style={{ backgroundColor: inst.crestColor }}
                      ></span>
                      <span className="font-mono text-[11px] font-bold text-black">
                        {inst.shortName}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] bg-black text-white px-1.5 py-0.5 font-bold">
                      {inst.admitCount} ADMITS
                    </span>
                  </div>

                  <h3 className="font-display text-[20px] font-bold text-black leading-tight group-hover:text-[#aa304f] transition-colors">
                    {inst.name}
                  </h3>

                  <p className="font-serif text-[12px] italic text-[#444748] mt-1 mb-3">
                    “{inst.latinMotto}” — {inst.mottoTranslation}
                  </p>

                  <div className="space-y-1.5 font-mono text-[11px] bg-[#fbf9f5] p-2.5 border border-black/10">
                    <div className="flex justify-between">
                      <span className="text-[#444748]">ADM RATE:</span>
                      <strong className="text-[#aa304f] font-bold">{inst.admitRate}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#444748]">MEDIAN SAT:</span>
                      <strong className="text-black font-bold">{inst.medianSat}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#444748]">AI THRESHOLD:</span>
                      <strong className="text-black font-bold">{inst.academicIndexThreshold}/240</strong>
                    </div>
                  </div>

                  <p className="font-serif text-[12px] text-[#444748] mt-3 line-clamp-2">
                    {inst.facultyReadingFocus}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-black/10 flex items-center justify-between font-mono text-[10px] text-[#aa304f] font-bold uppercase">
                  <span>Inspect Folio</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE SCHOLASTIC FELLOWSHIP & ADMISSIONS SENATE (Matches HTML Section 4) */}
      <section className="w-full bg-[#f5f3ef] px-4 lg:px-8 lg:px-14 py-12 border-t border-b border-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-3 mb-8 gap-4 border-b border-black">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#aa304f] font-bold block mb-1">
                SENATUS ACADEMICUS
              </span>
              <h2 className="font-display text-[26px] lg:text-[34px] lg:text-[38px] font-bold text-black uppercase tracking-tight">
                The Scholastic Fellowship &amp; Admissions Senate
              </h2>
            </div>
            <p className="font-serif text-[14px] lg:text-[15px] italic text-[#444748] max-w-md text-left lg:text-right">
              Direct advisory from former Ivy League admissions chairs, Rhodes Scholars, and USAMO
              champions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {SENATE_FELLOWS.map((fellow) => (
              <div
                key={fellow.id}
                className="bg-[#fbf9f5] p-6 shadow-xs flex flex-col justify-between border border-black/20"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black">
                    <span className="font-mono text-[11px] uppercase font-bold text-[#aa304f]">
                      {fellow.role}
                    </span>
                    <span className="font-mono text-[10px] bg-[#eae8e4] text-[#444748] px-1.5 py-0.5 font-bold">
                      {fellow.cohort}
                    </span>
                  </div>

                  <h3 className="font-display text-[22px] lg:text-[24px] font-bold text-black">
                    {fellow.name}
                  </h3>

                  <p className="font-mono text-[11px] text-[#444748] uppercase mt-1 mb-4 leading-snug">
                    {fellow.credentials}
                  </p>

                  <p className="font-serif text-[14px] text-[#1b1c1a] leading-relaxed mb-4">
                    {fellow.bio}
                  </p>

                  <div className="border-t border-black/10 pt-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#444748] block mb-2">
                      SENATE ADVISORY FOCUS:
                    </span>
                    <ul className="space-y-1 font-serif text-[13px] text-[#1b1c1a]">
                      {fellow.specialties.map((spec, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#aa304f] font-bold font-mono">✓</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-black/10 flex justify-between items-center font-mono text-[11px] text-[#444748] uppercase">
                  <span>{fellow.cohort}</span>
                  <span className="font-bold text-black">{fellow.titleStatus}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => onSelectTab('registry')}
              className="inline-flex items-center gap-2 bg-black hover:bg-[#aa304f] text-white font-mono text-[11px] uppercase tracking-wider font-bold px-6 py-3 transition-colors shadow-sm"
            >
              <span>SUBMIT CANDIDACY TO SENATE FOR EVALUATION</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Modal for detailed Institution Inspection */}
      {selectedInst && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#fbf9f5] max-w-xl w-full border-2 border-black p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedInst(null)}
              className="absolute top-4 right-4 text-black hover:text-[#aa304f] font-mono text-[14px] font-bold"
            >
              [✕ CLOSE]
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedInst.crestColor }}
              ></span>
              <span className="font-mono text-[11px] uppercase font-bold text-[#aa304f]">
                OFFICIAL SENATE FOLIO // EST. {selectedInst.founded}
              </span>
            </div>

            <h2 className="font-display text-[28px] font-bold text-black uppercase">
              {selectedInst.name}
            </h2>
            <p className="font-serif text-[15px] italic text-[#444748] mb-4">
              “{selectedInst.latinMotto}” — {selectedInst.mottoTranslation}
            </p>

            <div className="grid grid-cols-2 gap-3 font-mono text-[11px] bg-[#f5f3ef] p-3 border border-black/15 mb-4">
              <div>
                <span className="text-[#444748] block">LOCATION:</span>
                <strong className="text-black">{selectedInst.location}</strong>
              </div>
              <div>
                <span className="text-[#444748] block">UNDERGRAD ENROLLMENT:</span>
                <strong className="text-black">{selectedInst.undergradEnrollment}</strong>
              </div>
              <div>
                <span className="text-[#444748] block">MEDIAN SAT SCORE:</span>
                <strong className="text-[#aa304f] font-bold">{selectedInst.medianSat}</strong>
              </div>
              <div>
                <span className="text-[#444748] block">ACADEMIC INDEX FLOOR:</span>
                <strong className="text-black">{selectedInst.academicIndexThreshold} / 240</strong>
              </div>
            </div>

            <div className="space-y-3 font-serif text-[14px] leading-relaxed">
              <div>
                <strong className="font-mono text-[11px] uppercase text-black block mb-1">
                  FACULTY READING COMMITTEE PRIORITIES:
                </strong>
                <p className="text-[#1b1c1a] bg-[#eae8e4] p-3 border-l-2 border-[#aa304f]">
                  {selectedInst.facultyReadingFocus}
                </p>
              </div>

              <div>
                <strong className="font-mono text-[11px] uppercase text-black block mb-1">
                  DISTINGUISHED DISCIPLINES &amp; CONCENTRATIONS:
                </strong>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {selectedInst.popularMajors.map((m, i) => (
                    <span key={i} className="bg-black text-white px-2 py-0.5">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-black/15 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedInst(null);
                  onSelectTab('calculator');
                }}
                className="font-mono text-[11px] uppercase font-bold text-[#aa304f] hover:underline"
              >
                Compute Admissions Odds →
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedInst(null);
                  onSelectTab('registry');
                }}
                className="bg-black text-white px-4 py-2 font-mono text-[11px] uppercase font-bold hover:bg-[#aa304f] transition-colors"
              >
                Request Audit For {selectedInst.shortName}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
