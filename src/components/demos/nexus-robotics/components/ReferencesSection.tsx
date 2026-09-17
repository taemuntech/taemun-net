import { CLIENT_LOGOS, TESTIMONIALS } from '../data/fleetData';

export function ReferencesSection() {
 return (
 <section className="py-14 lg:py-20 bg-white border-b border-slate-200" id="references">
 <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
 <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
 <div className="inline-flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 PRODUCTION REFERENCE LAYOUT (SAMPLE)
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [word-break:keep-all]">
 예시 고객사 구성 — 반도체 & 배터리 팹
 </h2>
 <p className="text-sm lg:text-base text-slate-600 mt-2 leading-relaxed [word-break:keep-all]">
 아래 고객사 이름과 도입 사례는 화면 구성을 보여 주기 위한 예시이며 실제 고객사가 아닙니다.
 </p>
 </div>

 {/* Monochrome Client Logo Cloud */}
 {/* 모바일↔웹 경계는 lg 그대로. sm/md 는 lg 미만 구간 안에서 열 수만 조정한다
 — 768 에서 2열 6행·1열 3장으로 늘어지던 것을 줄이기 위한 예외다. */}
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center mb-12 lg:mb-16 py-6 border-y border-slate-200">
 {CLIENT_LOGOS.map((logo) => (
 <div
 key={logo}
 className="text-center py-3 text-slate-400 hover:text-slate-700 font-bold font-mono text-base tracking-wider uppercase transition-colors"
 >
 {logo}
 </div>
 ))}
 </div>

 {/* 3 Curated Success Story Cards */}
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
 {TESTIMONIALS.map((item) => (
 <div
 key={item.title}
 className="p-6 rounded-lg bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
 >
 <div>
 <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
 <span className="text-xs font-mono text-blue-600 font-bold">
 {item.category}
 </span>
 <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
 {item.badge}
 </span>
 </div>
 <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
 <p className="text-xs lg:text-sm text-slate-600 mb-6 leading-relaxed [word-break:keep-all]">
 {item.quote}
 </p>
 </div>

 <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
 <span className="text-slate-500">배치 대수: {item.fleetCount}</span>
 <span className="text-blue-600 font-bold">{item.metricHighlight}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
