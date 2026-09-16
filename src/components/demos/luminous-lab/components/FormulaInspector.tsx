import React from 'react';
import { ShieldCheck, CheckCircle2, Sparkles, Droplet, Info } from 'lucide-react';
import { CAUTIONARY_INGREDIENTS, SKIN_COMPATIBILITY, CLINICAL_METRICS } from '../data/mockData';

export const FormulaInspector: React.FC = () => {
  return (
    <section id="formula-inspector" className="py-12 bg-[#f1f3ff]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full bg-[#006948]/10 text-[#006948] text-xs uppercase font-extrabold tracking-widest">
            Hwahae &amp; EWG Clinical Standard
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[#141b2b] mt-2 tracking-tight">
            전성분 투명성 &amp; 임상 검증 인스펙터
          </h2>
          <p className="text-sm text-[#3d4a42] mt-2 leading-relaxed">
            루미너스 랩은 전 제품에 대한 20가지 유해의심성분 0건 검출과 EWG All Green 등급을 과학적 데이터로 투명하게 공개합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: 20 Cautionary Ingredients Zero-Tolerance Card (5 cols) */}
          <div className="lg:col-span-5 dew-glass-tier2 rounded-2xl p-6 border border-white space-y-5 bg-white/95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#006948]" />
                <span className="text-base font-bold text-[#141b2b]">20가지 주의성분 판정</span>
              </div>
              <span className="text-xs font-bold bg-[#006948] text-white px-2.5 py-1 rounded-full">
                0건 검출 (ZERO)
              </span>
            </div>

            {/* Cautionary List Status Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {CAUTIONARY_INGREDIENTS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#f1f3ff] flex items-center justify-between font-medium"
                >
                  <span className="text-[#141b2b]">{item.name}</span>
                  <span className="text-[#006948] font-bold">{item.status}</span>
                </div>
              ))}
            </div>

            {/* Skin Type Compatibility Chart (Hwahae Style) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#141b2b] block">피부 타입별 적합도</span>
              <div className="space-y-2.5 text-[12px]">
                {SKIN_COMPATIBILITY.map((skin, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[#3d4a42] mb-1 font-medium">
                      <span>{skin.type}</span>
                      <span className="text-[#006948] font-bold">{skin.label}</span>
                    </div>
                    <div className="w-full h-2 bg-[#e1e8fd] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#006948] rounded-full transition-all duration-700"
                        style={{ width: `${skin.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EWG Green Grade Verification Banner */}
            <div className="bg-[#006948]/10 border border-[#006948]/20 rounded-xl p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#006948] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                1
              </div>
              <div>
                <p className="text-xs font-bold text-[#141b2b]">EWG 1~2등급(Green) 100% 포뮬러</p>
                <p className="text-[11px] text-[#3d4a42] mt-0.5 leading-snug">
                  미국 환경단체 EWG 기준 안전성이 확인된 성분만을 엄선 배합했습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Formula Metrics & Dewy Scale (7 cols) */}
          <div className="lg:col-span-7 dew-glass-tier1 rounded-2xl p-6 border border-[#bccac0]/40 space-y-6 bg-white/95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-base font-bold text-[#141b2b]">인체적용 임상 포뮬러 지표</span>
              <span className="text-[11px] text-[#6d7a72] font-semibold">
                시험기관: (주)한국피부과학연구원
              </span>
            </div>

            {/* 4 Visual Clinical Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {CLINICAL_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[#bccac0]/30 space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#3d4a42] font-semibold">{metric.title}</span>
                    <span
                      className={`text-lg font-extrabold ${ metric.color === 'secondary' ? 'text-[#ae2f34]' : 'text-[#006948]' }`}
                    >
                      {metric.value}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#e9edff] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ metric.color === 'secondary' ? 'bg-[#ae2f34]' : 'bg-[#006948]' }`}
                      style={{ width: `${metric.percent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#6d7a72]">{metric.desc}</p>
                </div>
              ))}
            </div>

            {/* Dewy Skin Scale (Design System Token Alignment) */}
            <div className="p-4 rounded-xl bg-[#f1f3ff] border border-gray-100 space-y-3">
              <span className="text-xs font-bold text-[#141b2b] block">
                듀이 스킨 스케일 (Dewy Skin Meter)
              </span>

              {/* Scale 1: Glow Level */}
              <div className="flex items-center justify-between text-xs">
                <span className="w-28 text-[#3d4a42] font-medium">자연스러운 수분광</span>
                <div className="flex-1 mx-3 flex gap-1.5">
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#dce2f7]" />
                </div>
                <span className="font-bold text-[#006948] w-12 text-right">Level 4</span>
              </div>

              {/* Scale 2: Moisture Retention */}
              <div className="flex items-center justify-between text-xs">
                <span className="w-28 text-[#3d4a42] font-medium">수분 유지력 (지속)</span>
                <div className="flex-1 mx-3 flex gap-1.5">
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                  <div className="h-2 flex-1 rounded-full bg-[#006948]" />
                </div>
                <span className="font-bold text-[#006948] w-12 text-right">Level 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
