'use client';
import React, { useState, useEffect } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { HISTORIC_DOCKETS, IVY_INSTITUTIONS } from '../data/admissionsData';
import { CandidateDossier } from '../types';
import {
  Lock,
  CheckCircle2,
  FileCheck,
  Shield,
  Printer,
  Download,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface RegistryScreenProps {
  initialSatScore?: number;
  onDossierCreated?: (dossier: CandidateDossier) => void;
}

export const RegistryScreen: React.FC<RegistryScreenProps> = ({
  initialSatScore = 1590,
  onDossierCreated,
}) => {
  const [candidateName, setCandidateName] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [cohortClass, setCohortClass] = useState<string>(
    'Class of 2026 (Upcoming Early Decision)'
  );
  const [gpa, setGpa] = useState<string>('3.98 / 4.00');
  const [satScore, setSatScore] = useState<number>(initialSatScore);
  const [concentration, setConcentration] = useState<string>('');
  const [guardianEmail, setGuardianEmail] = useState<string>('');
  const [selectedColleges, setSelectedColleges] = useState<string[]>([
    'H-Univ (예시) College',
    'Yale University',
  ]);

  const [dockets, setDockets] = useState<CandidateDossier[]>(HISTORIC_DOCKETS);
  const [submittedDossier, setSubmittedDossier] = useState<CandidateDossier | null>(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  useEffect(() => {
    if (initialSatScore) {
      setSatScore(initialSatScore);
    }
  }, [initialSatScore]);

  const toggleCollege = (shortName: string) => {
    if (selectedColleges.includes(shortName)) {
      setSelectedColleges(selectedColleges.filter((c) => c !== shortName));
    } else {
      setSelectedColleges([...selectedColleges, shortName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scoreVal = Number(satScore) || 1550;
    const ai = Math.round((scoreVal / 1600) * 240);
    const senateTier =
      ai >= 238
        ? 'Tier 1 Senate Review (Priority Docket)'
        : ai >= 232
        ? 'Tier 2 Committee Review'
        : 'Tier 3 Provisional Review';

    const folioId = `#HG-2025-${Math.floor(100 + Math.random() * 900)}`;

    const newDossier: CandidateDossier = {
      id: `doc-${Date.now()}`,
      folioNumber: folioId,
      fullName: candidateName || 'Anonymous Scholar Candidate',
      school: school || 'Secondary Academy',
      matriculationClass: cohortClass,
      gpa: gpa || '3.98 UW',
      satScore: scoreVal,
      concentration: concentration || 'Liberal Arts & Sciences',
      targetColleges: selectedColleges.length > 0 ? selectedColleges : ['H-Univ (예시) College'],
      guardianEmail: guardianEmail || 'patron@academy-trust.org',
      submissionDate: 'Immediate Cycle',
      academicIndex: ai,
      senateTier: senateTier,
    };

    setDockets([newDossier, ...dockets]);
    setSubmittedDossier(newDossier);
    if (onDossierCreated) onDossierCreated(newDossier);
    setIsNoticeOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full font-serif text-[#1b1c1a]">

      {isNoticeOpen && (
        <SampleNotice
          open={isNoticeOpen}
          onClose={() => setIsNoticeOpen(false)}
          slug="heritage-global-prep"
          industry="corporate"
          featureName="1:1 아이비리그 입시 정밀 진단 및 포트폴리오 감사"
        />
      )}

      {/* 1. REGISTRY HEADER */}
      <section className="w-full bg-[#efeeea] px-4 lg:px-8 lg:px-14 py-8 border-b border-black">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#aa304f] font-bold block mb-1">
            REGISTRUM CANDIDATORUM // COHORT 2025–2026
          </span>
          <h1 className="font-display text-[28px] lg:text-[36px] lg:text-[44px] font-bold text-black uppercase tracking-tight leading-tight">
            Application for Confidential Portfolio Audit
          </h1>
          <p className="font-serif text-[16px] lg:text-[18px] italic text-[#444748] mt-2 max-w-xl mx-auto">
            Submit official telemetry for review by the Senate. Strictly limited to 18 prospective
            scholars per admissions cycle under Dean-Candidate Privilege.
          </p>
        </div>
      </section>

      {/* 2. FORM OR SUBMITTED CONFIRMATION */}
      <section className="w-full px-4 lg:px-8 lg:px-14 py-10">
        <div className="max-w-4xl mx-auto">
          {submittedDossier ? (
            <div className="bg-[#fbf9f5] border-2 border-black p-6 lg:p-8 shadow-md">
              <div className="border-b-2 border-black pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-[#aa304f] rounded-full inline-block"></span>
                    <span className="font-mono text-[11px] uppercase font-bold text-[#aa304f]">
                      HERITAGE GLOBAL PREP // ARCHIVAL FOLIO TRANSMISSION
                    </span>
                  </div>
                  <h2 className="font-display text-[26px] lg:text-[32px] font-bold text-black uppercase mt-1">
                    Dossier Logged: {submittedDossier.folioNumber}
                  </h2>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 bg-[#eae8e4] hover:bg-black hover:text-white px-3 py-1.5 font-mono text-[11px] uppercase font-bold transition-colors border border-black"
                  >
                    <Printer size={14} />
                    <span>Print Ledger</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmittedDossier(null)}
                    className="bg-black text-white hover:bg-[#aa304f] px-3 py-1.5 font-mono text-[11px] uppercase font-bold transition-colors"
                  >
                    New Docket
                  </button>
                </div>
              </div>

              {/* Verified Certificate Plaque */}
              <div className="bg-[#f5f3ef] border border-black/20 p-6 relative">
                <div className="text-center mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#444748] mb-1 font-bold">
                    OFFICIAL SENATE DOCKET TRANSMISSION
                  </p>
                  <h3 className="font-display text-[24px] lg:text-[28px] font-bold text-black uppercase">
                    {submittedDossier.fullName}
                  </h3>
                  <p className="font-serif text-[15px] italic text-[#444748]">
                    Candidate from {submittedDossier.school} · {submittedDossier.matriculationClass}
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-[11px] bg-[#fbf9f5] p-4 border border-black/15 mb-6 text-center">
                  <div>
                    <span className="text-[#444748] block">SAT TELEMETRY</span>
                    <strong className="text-black text-[15px]">{submittedDossier.satScore}</strong>
                  </div>
                  <div>
                    <span className="text-[#444748] block">ACADEMIC INDEX</span>
                    <strong className="text-[#aa304f] text-[15px]">
                      {submittedDossier.academicIndex} / 240
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#444748] block">UNWEIGHTED GPA</span>
                    <strong className="text-black text-[15px]">{submittedDossier.gpa}</strong>
                  </div>
                  <div>
                    <span className="text-[#444748] block">SENATE REVIEW TIER</span>
                    <strong className="text-[#aa304f] text-[12px] block mt-0.5">
                      TIER 1 (PROVOST)
                    </strong>
                  </div>
                </div>

                <div className="space-y-3 font-serif text-[14px]">
                  <p>
                    <strong>Intended Concentration:</strong> {submittedDossier.concentration}
                  </p>
                  <p>
                    <strong>Target Ivy Institutions:</strong>{' '}
                    {submittedDossier.targetColleges.join(', ')}
                  </p>
                  <p>
                    <strong>Registered Guardian Ledger Dispatch:</strong>{' '}
                    <code className="font-mono text-[12px] bg-[#eae8e4] px-1.5 py-0.5 text-black">
                      {submittedDossier.guardianEmail}
                    </code>
                  </p>
                </div>

                <div className="mt-6 p-4 bg-[#ffd9dd] text-[#400014] font-serif text-[13px] border-l-4 border-[#aa304f]">
                  <strong>PROVOST ACTION DISPATCH:</strong> Your docket has been transmitted to Dr.
                  Alistair Montgomery (Cambridge Chair) and Eleanor Vance, Esq. (New Haven Chair).
                  The H-Univ (예시) Square Bureau will contact your guardian dispatch 1 영업일 내 (예시)
                  with initial Academic Index calibration findings.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#efeeea] p-6 lg:p-10 shadow-md border-2 border-black">
              <form id="admissionsAuditForm" onSubmit={handleSubmit} className="space-y-6">
                <p className="text-[11px] text-zinc-400 text-center mb-4">샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Candidate Full Name */}
                  <div>
                    <label
                      htmlFor="candidate-name-input"
                      className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                    >
                      Candidate Full Legal Name *
                    </label>
                    <input
                      id="candidate-name-input"
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g., Julian P. Harrington III"
                      className="w-full bg-[#fbf9f5] p-3 font-serif text-[16px] text-black border border-black/20 placeholder:italic placeholder:text-[#444748]/60 focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Current Secondary Institution */}
                  <div>
                    <label
                      htmlFor="secondary-school-input"
                      className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                    >
                      Current Secondary Institution *
                    </label>
                    <input
                      id="secondary-school-input"
                      type="text"
                      required
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="e.g., Phillips Exeter Academy, St. Paul's, Daewon FLHS"
                      className="w-full bg-[#fbf9f5] p-3 font-serif text-[16px] text-black border border-black/20 placeholder:italic placeholder:text-[#444748]/60 focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Target Graduation Year */}
                  <div>
                    <label
                      htmlFor="matriculation-cycle-select"
                      className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                    >
                      Matriculation Cycle / Class *
                    </label>
                    <select
                      id="matriculation-cycle-select"
                      value={cohortClass}
                      onChange={(e) => setCohortClass(e.target.value)}
                      className="w-full bg-[#fbf9f5] p-3 font-mono text-[12px] text-black border border-black/20 focus:outline-none focus:border-black"
                    >
                      <option>Class of 2026 (Upcoming Early Decision)</option>
                      <option>Class of 2027 (Underclass Honors)</option>
                      <option>Class of 2028 (Foundation Cohort)</option>
                    </select>
                  </div>

                  {/* Current Unweighted GPA */}
                  <div>
                    <label
                      htmlFor="unweighted-gpa-input"
                      className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                    >
                      Current Unweighted GPA (4.0 Scale) *
                    </label>
                    <input
                      id="unweighted-gpa-input"
                      type="text"
                      required
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      placeholder="e.g., 3.98 / 4.00"
                      className="w-full bg-[#fbf9f5] p-3 font-serif text-[16px] text-black border border-black/20 placeholder:italic placeholder:text-[#444748]/60 focus:outline-none focus:border-black"
                    />
                  </div>

                  {/* Practice / Official SAT Score */}
                  <div>
                    <label
                      htmlFor="sat-score-input"
                      className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                    >
                      Highest Official or Practice SAT *
                    </label>
                    <input
                      id="sat-score-input"
                      type="number"
                      min={1000}
                      max={1600}
                      step={10}
                      required
                      value={satScore}
                      onChange={(e) => setSatScore(Number(e.target.value))}
                      placeholder="e.g., 1560"
                      className="w-full bg-[#fbf9f5] p-3 font-serif text-[16px] text-black border border-black/20 placeholder:italic placeholder:text-[#444748]/60 focus:outline-none focus:border-black"
                    />
                    <span className="font-mono text-[10px] text-[#747878] mt-1 block">
                      Estimated Academic Index:{' '}
                      <strong className="text-black">
                        {Math.round((satScore / 1600) * 240)} / 240
                      </strong>
                    </span>
                  </div>

                  {/* Intended Concentration */}
                  <div>
                    <label
                      htmlFor="concentration-input"
                      className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                    >
                      Intended Academic Concentration *
                    </label>
                    <input
                      id="concentration-input"
                      type="text"
                      required
                      value={concentration}
                      onChange={(e) => setConcentration(e.target.value)}
                      placeholder="e.g., Applied Mathematics, Classics, Molecular Biophysics"
                      className="w-full bg-[#fbf9f5] p-3 font-serif text-[16px] text-black border border-black/20 placeholder:italic placeholder:text-[#444748]/60 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Target Ivy Institutions Checkboxes */}
                <div>
                  <label className="block font-mono text-[11px] uppercase font-bold text-black mb-2">
                    Target Ivy League Dockets (Select all intended admissions submissions):
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {IVY_INSTITUTIONS.map((inst) => {
                      const checked = selectedColleges.includes(inst.shortName);
                      return (
                        <label
                          key={inst.id}
                          className={`p-2 border cursor-pointer flex items-center gap-2 font-mono text-[11px] transition-colors ${
                            checked
                              ? 'bg-black text-white border-black font-bold'
                              : 'bg-[#fbf9f5] text-black border-black/20 hover:bg-[#eae8e4]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCollege(inst.shortName)}
                            className="sr-only"
                          />
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block flex-none"
                            style={{ backgroundColor: inst.crestColor }}
                          ></span>
                          <span className="truncate">{inst.shortName}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Guardian Ledger Contact */}
                <div>
                  <label
                    htmlFor="guardian-email-input"
                    className="block font-mono text-[11px] uppercase font-bold text-black mb-1"
                  >
                    Guardian / Legal Representative Ledger Dispatch (Email) *
                  </label>
                  <input
                    id="guardian-email-input"
                    type="email"
                    required
                    value={guardianEmail}
                    onChange={(e) => setGuardianEmail(e.target.value)}
                    placeholder="patron.registry@harrington-family.ch"
                    className="w-full bg-[#fbf9f5] p-3 font-serif text-[16px] text-black border border-black/20 placeholder:italic placeholder:text-[#444748]/60 focus:outline-none focus:border-black"
                  />
                </div>

                {/* Confidentiality Covenant Notice (Matches HTML) */}
                <div className="bg-[#eae8e4] p-4 flex items-start gap-3 text-[12px] font-mono text-[#444748] border-l-3 border-[#aa304f]">
                  <Lock size={20} className="text-[#aa304f] flex-none mt-0.5" />
                  <p className="leading-snug">
                    <strong className="text-black">DEAN-CANDIDATE PRIVILEGE:</strong> All academic
                    transcripts, standardized testing reports, and written manuscripts are treated
                    under absolute admissions confidentiality. Heritage Global Prep does not
                    disclose client rosters under any circumstances.
                  </p>
                </div>

                {/* Submission Trigger */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full lg:w-auto px-8 py-3.5 bg-black hover:bg-[#aa304f] text-white font-mono text-[11px] uppercase tracking-[0.2em] font-bold shadow-md transition-colors border border-black"
                  >
                    SUBMIT CANDIDACY TO ADMISSIONS SENATE
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. SENATE REGISTRY RECENT COHORT DOCKETS */}
          <div className="mt-12">
            <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-black">
              <h3 className="font-display text-[22px] font-bold text-black uppercase">
                Active Admissions Senate Dockets (Redacted Folios)
              </h3>
              <span className="font-mono text-[11px] text-[#aa304f] font-bold">
                COHORT 2024–2026 ARCHIVES
              </span>
            </div>

            <div className="space-y-2">
              {dockets.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#f5f3ef] p-3 lg:p-4 border border-black/15 flex flex-wrap items-center justify-between gap-3 text-[12px] font-mono hover:bg-[#eae8e4] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-black text-white px-2 py-0.5 font-bold text-[10px]">
                      {doc.folioNumber}
                    </span>
                    <strong className="text-black font-serif text-[15px]">
                      {doc.fullName}
                    </strong>
                    <span className="text-[#444748] hidden hidden lg:inline font-serif italic">
                      ({doc.school})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#444748]">
                      SAT: <strong className="text-black">{doc.satScore}</strong>
                    </span>
                    <span className="text-[#444748]">
                      AI: <strong className="text-[#aa304f]">{doc.academicIndex}/240</strong>
                    </span>
                    <span className="bg-[#ffd9dd] text-[#400014] px-2 py-0.5 text-[10px] font-bold hidden hidden lg:inline">
                      {doc.senateTier}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
