import { useState, useMemo } from 'react';
import { Info, FileText } from 'lucide-react';

interface RoiCalculatorSectionProps {
 onDownloadReport: () => void;
}

export function RoiCalculatorSection({ onDownloadReport }: RoiCalculatorSectionProps) {
 const [area, setArea] = useState(4500);
 const [workers, setWorkers] = useState(28);
 const [is247, setIs247] = useState(true);

 // Calculation formula
 const simulation = useMemo(() => {
 const shiftFactor = is247 ? 1.35 : 1.0;
 const workerCostPerYear = 0.58; // 58 million KRW average cleanroom operator fully burdened cost
 const damagePreventionFactor = (area / 1000) * 0.12;

 // Annual total savings (억 원)
 const annualSavingsNum = workers * workerCostPerYear * shiftFactor * 0.85 + damagePreventionFactor;
 const annualSavings = annualSavingsNum.toFixed(1);

 // Recommended Robots: based on fab area & moves
 const recommendedRobots = Math.max(3, Math.round((area / 220) * (is247 ? 1.1 : 0.85)));

 // Estimated Payback Period in months: CAPEX estimate divided by monthly savings
 const capexEstimate = recommendedRobots * 0.72; // Avg unit + fleet OS install
 const monthlySavings = annualSavingsNum / 12;
 const paybackMonths = (capexEstimate / monthlySavings).toFixed(1);

 return {
 annualSavings,
 recommendedRobots,
 paybackMonths,
 };
 }, [area, workers, is247]);

 return (
 <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200" id="roi-matrix">
 <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
 <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
 <div className="inline-flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 DATA-DRIVEN FEASIBILITY
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [word-break:keep-all]">
 클린룸 무인 자동화 ROI 시뮬레이터
 </h2>
 <p className="text-sm lg:text-base text-slate-600 mt-2 leading-relaxed [word-break:keep-all]">
 귀사의 팹 규모와 운영 교대 인력을 입력하여 예상 인건비 절감액 및 투자비(CAPEX) 회수 시점을 즉시 산출해 보세요.
 </p>
 </div>

 <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 lg:p-12 shadow-sm">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
 {/* Left Side: Interactive Sliders & Inputs */}
 <div className="lg:col-span-7 space-y-8">
 {/* Slider 1: Fab Area */}
 <div>
 <div className="flex justify-between items-center mb-2">
 <label htmlFor="slider-area" className="text-sm font-semibold text-slate-900">
 클린룸 / 팹 면적 (평)
 </label>
 <span className="text-lg font-bold text-blue-600">
 {area.toLocaleString()} 평
 </span>
 </div>
 <input
 id="slider-area"
 type="range"
 min="1000"
 max="30000"
 step="500"
 value={area}
 onChange={(e) => setArea(Number(e.target.value))}
 className="w-full h-11 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-slate-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-slate-200 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600"
 />
 <div className="flex justify-between text-xs font-mono text-slate-400 mt-1">
 <span>1,000평</span>
 <span>15,000평</span>
 <span>30,000평</span>
 </div>
 </div>

 {/* Slider 2: Shift Workers */}
 <div>
 <div className="flex justify-between items-center mb-2">
 <label htmlFor="slider-workers" className="text-sm font-semibold text-slate-900">
 현재 물류 교대 근무 인력 (명)
 </label>
 <span className="text-lg font-bold text-blue-600">{workers} 명</span>
 </div>
 <input
 id="slider-workers"
 type="range"
 min="5"
 max="100"
 step="1"
 value={workers}
 onChange={(e) => setWorkers(Number(e.target.value))}
 className="w-full h-11 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-slate-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:shadow [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-lg [&::-moz-range-track]:bg-slate-200 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600"
 />
 <div className="flex justify-between text-xs font-mono text-slate-400 mt-1">
 <span>5명</span>
 <span>50명</span>
 <span>100명</span>
 </div>
 </div>

 {/* Toggle: 24/7 Operations */}
 <div className="p-4 rounded bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
 <div>
 <span className="text-sm font-bold text-slate-900 block">
 24시간 3교대 무중단 라인 가동
 </span>
 <span className="text-xs text-slate-500">
 야간 할증 및 교대 유휴 시간 최소화 계수 적용
 </span>
 </div>
 <label className="relative inline-flex items-center cursor-pointer min-h-11 shrink-0">
 <input
 type="checkbox"
 checked={is247}
 onChange={(e) => setIs247(e.target.checked)}
 className="sr-only peer"
 />
 <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
 </label>
 </div>

 <div className="text-xs text-slate-500 flex items-center gap-2">
 <Info className="w-4 h-4 text-slate-400 shrink-0" />
 <span>
 화면 구성을 보여 주기 위한 예시 산출식입니다(웨이퍼 파손율 저감 + 인건비 + 유휴 시간 단축 항목 구성).
 </span>
 </div>
 </div>

 {/* Right Side: Real-time Output Card */}
 <div className="lg:col-span-5 bg-slate-50 rounded border border-slate-200 p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
 <div>
 <span className="text-xs font-mono text-slate-500 uppercase block mb-1">
 SIMULATION RESULT (예시 산출)
 </span>
 <h3 className="text-lg font-bold text-slate-900 mb-6 [word-break:keep-all]">
 연간 총 절감 및 도입 예상 효과 (예시 수치)
 </h3>
 <div className="space-y-4 mb-6">
 <div className="p-4 rounded bg-white border border-slate-200">
 <span className="text-slate-400 text-xs font-mono block">
 연간 인건비 & 파손 손실 절감 예상액
 </span>
 <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 tabular-nums">
 ₩ {simulation.annualSavings} 억 원
 </div>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 rounded bg-white border border-slate-200">
 <span className="text-slate-400 text-xs font-mono block">
 권장 최적 AMR 대수
 </span>
 <div className="text-lg font-bold text-slate-900 mt-1">
 {simulation.recommendedRobots} 대
 </div>
 </div>
 <div className="p-4 rounded bg-white border border-slate-200">
 <span className="text-slate-400 text-xs font-mono block">
 예상 투자비 회수 시점
 </span>
 <div className="text-lg font-bold text-emerald-600 mt-1">
 {simulation.paybackMonths} 개월
 </div>
 </div>
 </div>
 </div>
 </div>

 <div>
 <button
 type="button"
 onClick={onDownloadReport}
 className="w-full py-3.5 min-h-12 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer [word-break:keep-all]"
 >
 <FileText className="w-4 h-4 shrink-0" />
 <span>상세 시뮬레이션 분석 리포트 PDF 받기</span>
 </button>
 <p className="mt-2 text-[11px] text-slate-500 text-center [word-break:keep-all]">
 샘플 사이트입니다 — 실제 PDF 파일은 만들어지지 않습니다.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
