'use client';
import React, { useState, useId } from 'react';
import { ScreenTab } from '../types';
import {
  Sliders,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bookmark,
  RotateCcw,
} from 'lucide-react';

interface CalculatorScreenProps {
  initialRw?: number;
  initialMath?: number;
  onApplyScoreToRegistry: (rw: number, math: number) => void;
  onSelectTab: (tab: ScreenTab) => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({
  initialRw = 790,
  initialMath = 800,
  onApplyScoreToRegistry,
  onSelectTab,
}) => {
  const rwSliderId = useId();
  const mathSliderId = useId();
  const [rwScore, setRwScore] = useState<number>(initialRw);
  const [mathScore, setMathScore] = useState<number>(initialMath);
  const [isHardTier, setIsHardTier] = useState<boolean>(true);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [appliedToast, setAppliedToast] = useState<boolean>(false);

  const compositeScore = rwScore + mathScore;

  // Academic Index (AI): (rw + math)/1600 * 240
  const academicIndex = Math.round((compositeScore / 1600) * 240);

  // Percentile calculation
  let percentile = '99.94th';
  if (compositeScore === 1600) percentile = '99.99th';
  else if (compositeScore >= 1580) percentile = '99.95th';
  else if (compositeScore >= 1550) percentile = '99.70th';
  else if (compositeScore >= 1500) percentile = '99.00th';
  else if (compositeScore >= 1450) percentile = '97.50th';
  else if (compositeScore >= 1400) percentile = '94.00th';
  else percentile = '88.00th';

  // Dynamic Probabilities
  const baseTierBonus = isHardTier ? 5 : -10;
  const scoreWeight = Math.max(0, (compositeScore - 1350) / 250);

  const probHarvard = Math.min(
    96,
    Math.max(6, Math.round(scoreWeight * 82 + baseTierBonus + (rwScore >= 780 ? 3 : 0)))
  );
  const probYale = Math.min(
    98,
    Math.max(8, Math.round(scoreWeight * 85 + baseTierBonus + (mathScore >= 790 ? 2 : 0)))
  );
  const probPrinceton = Math.min(
    97,
    Math.max(7, Math.round(scoreWeight * 84 + baseTierBonus + (mathScore === 800 ? 4 : 0)))
  );
  const probWharton = Math.min(
    99,
    Math.max(9, Math.round(scoreWeight * 88 + baseTierBonus + (mathScore >= 790 ? 4 : 0)))
  );
  const probColumbia = Math.min(
    95,
    Math.max(8, Math.round(scoreWeight * 81 + baseTierBonus + (rwScore >= 770 ? 3 : 0)))
  );

  // Verbal subscores computed dynamically
  const rwRatio = (rwScore - 400) / 400;
  const craftStruct = (90 + rwRatio * 9.8).toFixed(1);
  const infoIdeas = (91 + rwRatio * 8.8).toFixed(1);
  const engConventions = rwScore >= 790 ? '99.9% (예시)' : `${(88 + rwRatio * 11).toFixed(1)}%`;
  const expression = (89 + rwRatio * 9.9).toFixed(1);

  // Math subscores
  const mathRatio = (mathScore - 400) / 400;
  const algebraSub = Math.min(800, Math.round(400 + mathRatio * 400));
  const dataSub = Math.min(800, Math.round(400 + mathRatio * 400));
  const passportSub = Math.min(800, Math.round(400 + mathRatio * 400));

  const handleCommissionClick = () => {
    onApplyScoreToRegistry(rwScore, mathScore);
    setAppliedToast(true);
    setTimeout(() => {
      onSelectTab('registry');
    }, 900);
  };

  const applyPreset = (rw: number, m: number, hard: boolean) => {
    setRwScore(rw);
    setMathScore(m);
    setIsHardTier(hard);
  };

  return (
    <div className="flex flex-col w-full font-serif text-[#1b1c1a]">
      {/* Telemetry Header */}
      <section className="w-full bg-[#efeeea] px-4 lg:px-8 lg:px-14 py-8 border-b border-black">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#aa304f] font-bold block mb-1">
              ACTUARIAL TELEMETRY &amp; ADAPTIVE ENGINE
            </span>
            <h1 className="font-display text-[26px] lg:text-[34px] lg:text-[42px] font-bold text-black uppercase tracking-tight leading-none">
              Instrumentum Mathematicum // The 1600 Adaptive Algorithm
            </h1>
          </div>
          <div className="text-left lg:text-right font-mono text-[11px] text-[#444748]">
            <span className="font-bold text-black">CALIBRATION PROTOCOL V4.9</span>
            <br />
            <span className="font-serif italic lowercase tracking-normal">
              college board bluebook aligned
            </span>
          </div>
        </div>
      </section>

      {/* Main Computator Workspace */}
      <section className="w-full px-4 lg:px-8 lg:px-14 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Quick Presets Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 bg-[#f5f3ef] p-2 border border-black/10 text-[11px] font-mono">
            <span className="font-bold text-[#444748] uppercase">RAPID CALIBRATION PRESETS:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset(800, 800, true)}
                className="px-2 py-1 bg-black text-white hover:bg-[#aa304f] transition-colors"
              >
                1600 PERFECT COMPOSITE
              </button>
              <button
                type="button"
                onClick={() => applyPreset(780, 800, true)}
                className="px-2 py-1 bg-[#eae8e4] text-black hover:bg-black hover:text-white transition-colors border border-black/10"
              >
                1580 HARVARD / PRINCETON MEDIAN
              </button>
              <button
                type="button"
                onClick={() => applyPreset(770, 780, true)}
                className="px-2 py-1 bg-[#eae8e4] text-black hover:bg-black hover:text-white transition-colors border border-black/10"
              >
                1550 IVY LEAGUE BASELINE
              </button>
              <button
                type="button"
                onClick={() => applyPreset(710, 740, false)}
                className="px-2 py-1 bg-[#eae8e4] text-black hover:bg-black hover:text-white transition-colors border border-black/10"
              >
                1450 STANDARD TIER DIAGNOSTIC
              </button>
            </div>
          </div>

          {/* Mechanical Calculator Panel */}
          <div className="bg-[#eae8e4] p-4 lg:p-6 shadow-md border-2 border-black relative overflow-hidden">
            {/* Header Engraving Bar */}
            <div className="bg-black text-white px-4 py-2 flex flex-wrap items-center justify-between mb-6 border-b border-black">
              <div className="flex items-center gap-2">
                <Cpu size={18} className="text-[#aa304f]" />
                <span className="font-mono text-[11px] uppercase font-bold tracking-widest">
                  COLLEGE ADMISSIONS PROBABILITY COMPUTATOR · MODEL 1924-D
                </span>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 font-mono text-[10px] lg:text-[11px] text-[#858383]">
                <span>CHASSIS: CAST BRONZE</span>
                <span>·</span>
                <span>GAUGE: 0.001 TOLERANCE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              {/* Left Controls: Sliders & Adaptive Subscore Gauges */}
              <div className="lg:col-span-7 space-y-6">
                {/* Module 1: Reading & Writing Slider & Breakdown */}
                <div className="bg-[#fbf9f5] p-5 shadow-xs border border-black/15">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#aa304f] uppercase tracking-wider">
                        MODULE 01 // DIGITAL SECTION
                      </span>
                      <h3 className="font-display text-[20px] lg:text-[22px] text-black font-bold">
                        Reading &amp; Writing (Verbal)
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-[26px] lg:text-[30px] font-bold text-black">
                        {rwScore}
                      </span>
                      <span className="font-mono text-[11px] text-[#444748]"> / 800</span>
                    </div>
                  </div>

                  {/* Slider Range Input */}
                  <div className="py-2">
                    <label htmlFor={rwSliderId} className="sr-only">
                      Reading and Writing score slider
                    </label>
                    <input
                      id={rwSliderId}
                      className="w-full h-2.5 bg-[#e4e2de] appearance-none cursor-pointer accent-[#aa304f] my-2"
                      max={800}
                      min={400}
                      step={10}
                      type="range"
                      value={rwScore}
                      onChange={(e) => setRwScore(parseInt(e.target.value, 10))}
                    />
                    <div className="flex justify-between font-mono text-[9px] text-[#747878]">
                      <span>400 (MIN)</span>
                      <span>600 (NATIONAL MEAN)</span>
                      <span>750 (IVY THRESHOLD)</span>
                      <span>800 (CEILING)</span>
                    </div>
                  </div>

                  {/* Telemetry Subscore Indicators */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-3 border-t border-black/10 text-[10px] font-mono">
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">CRAFT &amp; STRUCT</span>
                      <strong className="text-black text-[12px]">{craftStruct}%</strong>
                    </div>
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">INFO &amp; IDEAS</span>
                      <strong className="text-black text-[12px]">{infoIdeas}%</strong>
                    </div>
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">ENG CONVENTIONS</span>
                      <strong className="text-[#aa304f] text-[12px]">{engConventions}</strong>
                    </div>
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">EXPRESSION</span>
                      <strong className="text-black text-[12px]">{expression}%</strong>
                    </div>
                  </div>
                </div>

                {/* Module 2: Advanced Mathematics Slider & Breakdown */}
                <div className="bg-[#fbf9f5] p-5 shadow-xs border border-black/15">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-[#aa304f] uppercase tracking-wider">
                        MODULE 02 // DIGITAL SECTION
                      </span>
                      <h3 className="font-display text-[20px] lg:text-[22px] text-black font-bold">
                        Advanced Mathematics
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-[26px] lg:text-[30px] font-bold text-black">
                        {mathScore}
                      </span>
                      <span className="font-mono text-[11px] text-[#444748]"> / 800</span>
                    </div>
                  </div>

                  {/* Slider Range Input */}
                  <div className="py-2">
                    <label htmlFor={mathSliderId} className="sr-only">
                      Advanced Mathematics score slider
                    </label>
                    <input
                      id={mathSliderId}
                      className="w-full h-2.5 bg-[#e4e2de] appearance-none cursor-pointer accent-[#aa304f] my-2"
                      max={800}
                      min={400}
                      step={10}
                      type="range"
                      value={mathScore}
                      onChange={(e) => setMathScore(parseInt(e.target.value, 10))}
                    />
                    <div className="flex justify-between font-mono text-[9px] text-[#747878]">
                      <span>400 (MIN)</span>
                      <span>600 (NATIONAL MEAN)</span>
                      <span>750 (STEM CALIBRATION)</span>
                      <span>800 (PERFECT CEILING)</span>
                    </div>
                  </div>

                  {/* Telemetry Subscore Indicators */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-black/10 text-[10px] font-mono">
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">ALGEBRA &amp; FUNCT.</span>
                      <strong className="text-black text-[12px]">{algebraSub}</strong>
                    </div>
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">DATA ANALYSIS</span>
                      <strong className="text-black text-[12px]">{dataSub}</strong>
                    </div>
                    <div className="p-2 bg-[#f5f3ef] text-center border border-black/5">
                      <span className="text-[#444748] block truncate">PASSPORT TO ADV.</span>
                      <strong className="text-black text-[12px]">{passportSub}</strong>
                    </div>
                  </div>
                </div>

                {/* Adaptive Difficulty Tier Selector */}
                <div className="flex flex-col lg:flex-row items-center justify-between p-4 bg-[#fbf9f5] border border-black/15 gap-3">
                  <div>
                    <span className="font-mono text-[11px] uppercase font-bold text-black block">
                      DIFFICULTY BRANCH ROUTING:
                    </span>
                    <span className="font-serif text-[12px] text-[#444748] italic">
                      Multi-stage adaptive routing determines upper-score ceiling
                    </span>
                  </div>
                  <div className="inline-flex p-1 bg-[#e4e2de] border border-black/20">
                    <button
                      type="button"
                      onClick={() => setIsHardTier(false)}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase transition-all ${
                        !isHardTier
                          ? 'bg-black text-white font-bold shadow-xs'
                          : 'text-[#444748] hover:text-black'
                      }`}
                    >
                      Standard Module II
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsHardTier(true)}
                      className={`px-3 py-1.5 font-mono text-[10px] uppercase transition-all ${
                        isHardTier
                          ? 'bg-black text-white font-bold shadow-xs'
                          : 'text-[#444748] hover:text-black'
                      }`}
                    >
                      Hard Module II (99.9th Tier)
                    </button>
                  </div>
                </div>

                {/* Adaptive Engine Technical Annotation */}
                <div className="p-3 bg-[#f5f3ef] border-l-2 border-black text-left font-serif text-[12px] text-[#444748]">
                  <strong className="text-black font-mono text-[11px] uppercase">
                    PROVOST CALIBRATION NOTE:
                  </strong>{' '}
                  The Digital SAT Item Response Theory (IRT) model penalizes careless errors on Hard
                  Module II far more severely than difficult-tier misses. A student securing Hard
                  Module II routing enters the sovereign 1540–1600 grading envelope.
                </div>
              </div>

              {/* Right: Brass Split-Flap Readout Display & Odds Matrix */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
                {/* Brass Mechanical Plaque Readout */}
                <div className="bg-[#fbf9f5] p-6 text-center shadow-inner border border-black/20 relative">
                  <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-[#aa304f] uppercase font-bold">
                    <span className="w-1.5 h-1.5 bg-[#aa304f] rounded-full animate-ping"></span>
                    ACTIVE TELEMETRY
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-widest text-[#444748] block mb-2 font-bold">
                    PROJECTED COMPOSITE RESULT
                  </span>

                  {/* Split Flap Style Dial */}
                  <div className="inline-flex items-center justify-center bg-black text-white px-8 py-3 tracking-wider font-display text-[48px] lg:text-[56px] leading-none font-bold shadow-md border-2 border-black">
                    <span>{compositeScore}</span>
                    <span className="text-[#858383] text-[20px] font-sans ml-2 font-normal">
                      / 1600
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 space-y-1.5">
                    <div className="font-mono text-[11px] uppercase text-[#444748]">
                      NATIONAL RANK:{' '}
                      <strong className="text-[#aa304f] font-bold">{percentile} PERCENTILE</strong>
                    </div>
                    <div className="font-mono text-[11px] uppercase text-[#444748]">
                      ACADEMIC INDEX:{' '}
                      <strong className="text-black font-bold">
                        {academicIndex} / 240 (
                        {academicIndex >= 238
                          ? 'TIER 1 SENATE REVIEW'
                          : academicIndex >= 232
                          ? 'TIER 2 COMMITTEE DOCKET'
                          : 'TIER 3 CONDITIONAL REVIEW'}
                        )
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Institutional Admission Probability Breakdown */}
                <div className="bg-[#fbf9f5] p-5 shadow-xs border border-black/20">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-black">
                    <span className="font-mono text-[11px] uppercase font-bold text-black tracking-wider">
                      INSTITUTIONAL ADMISSION PROBABILITY
                    </span>
                    <ShieldCheck size={18} className="text-[#aa304f]" />
                  </div>

                  <div className="space-y-3 font-mono text-[12px]">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-black font-bold">HARVARD COLLEGE</span>
                        <span className="font-bold text-[#aa304f]">{probHarvard}%</span>
                      </div>
                      <div className="w-full bg-[#e4e2de] h-2 overflow-hidden">
                        <div
                          className="bg-[#aa304f] h-full transition-all duration-300"
                          style={{ width: `${probHarvard}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-black font-bold">YALE UNIVERSITY</span>
                        <span className="font-bold text-black">{probYale}%</span>
                      </div>
                      <div className="w-full bg-[#e4e2de] h-2 overflow-hidden">
                        <div
                          className="bg-black h-full transition-all duration-300"
                          style={{ width: `${probYale}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-black font-bold">PRINCETON UNIVERSITY</span>
                        <span className="font-bold text-black">{probPrinceton}%</span>
                      </div>
                      <div className="w-full bg-[#e4e2de] h-2 overflow-hidden">
                        <div
                          className="bg-black h-full transition-all duration-300"
                          style={{ width: `${probPrinceton}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-black font-bold">WHARTON (UPENN)</span>
                        <span className="font-bold text-[#aa304f]">{probWharton}%</span>
                      </div>
                      <div className="w-full bg-[#e4e2de] h-2 overflow-hidden">
                        <div
                          className="bg-[#aa304f] h-full transition-all duration-300"
                          style={{ width: `${probWharton}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-black font-bold">COLUMBIA UNIVERSITY</span>
                        <span className="font-bold text-black">{probColumbia}%</span>
                      </div>
                      <div className="w-full bg-[#e4e2de] h-2 overflow-hidden">
                        <div
                          className="bg-black h-full transition-all duration-300"
                          style={{ width: `${probColumbia}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Action Button */}
                  <button
                    type="button"
                    id="commission-audit-btn"
                    onClick={handleCommissionClick}
                    className="w-full mt-5 bg-black hover:bg-[#aa304f] text-white font-mono text-[11px] py-3 uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>COMMISSION ADAPTIVE AUDIT LEDGER</span>
                    <ArrowRight size={15} />
                  </button>

                  {appliedToast && (
                    <div className="mt-2 p-2 bg-[#ffd9dd] text-[#400014] text-center font-mono text-[10px] uppercase font-bold">
                      ✓ Score telemetry transferred to Confidential Portfolio Audit Form!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
