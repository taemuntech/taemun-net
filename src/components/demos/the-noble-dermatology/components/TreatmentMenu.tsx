import React from 'react';
import { Verified, ChevronRight } from 'lucide-react';
import { TREATMENTS } from '../data/clinicData';
import { Treatment } from '../types';

interface TreatmentMenuProps {
  onSelectTreatment: (treatment: Treatment) => void;
}

export const TreatmentMenu: React.FC<TreatmentMenuProps> = ({ onSelectTreatment }) => {
  return (
    <section id="signature-lifting" className="w-full py-16 lg:py-20 bg-[#fbf9f6] border-b border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs font-semibold tracking-widest uppercase mb-2 inline-block border border-[#e4e2df]">
            Cheongdam Signature Anti-Aging Protocols
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-3">
            과학적 근거에 기반한 하이엔드 안티에이징 메뉴
          </h2>
          <p className="text-sm lg:text-base text-[#424845] leading-relaxed break-keep">
            정식 수입·허가된 장비와 제품만 사용하며, 피부 상태와 생활 패턴에 맞춰 시술 종류와 강도를 상담에서 함께 정합니다. 시술 반응과 유지 기간에는 개인차가 있고 부작용이 생길 수 있습니다.
          </p>
        </div>

        {/* 4 Cards Bento Treatment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="rounded-xl bg-[#ffffff] p-6 lg:p-8 shadow-md hover:shadow-xl border border-[#eae8e5] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs font-semibold border border-[#e4e2df]">
                    {treatment.category}
                  </span>
                  <span className="font-mono text-xs text-[#727975]">{treatment.partner}</span>
                </div>

                <h3 className="font-serif text-xl lg:text-2xl text-[#00110b] mb-3 group-hover:text-[#745a2a] transition-colors">
                  {treatment.title}
                </h3>

                <p className="text-xs lg:text-sm text-[#424845] mb-6 leading-relaxed">
                  {treatment.description}
                </p>

                {/* 2x2 Specs Grid */}
                <div className="grid grid-cols-2 gap-3 bg-[#f5f3f0] p-4 rounded-lg mb-6 text-xs border border-[#eae8e5]">
                  <div>
                    <span className="text-[#727975] block text-[11px] mb-0.5">시술 시간</span>
                    <span className="font-semibold text-[#00110b]">{treatment.duration}</span>
                  </div>
                  <div>
                    <span className="text-[#727975] block text-[11px] mb-0.5">일상 복귀 / 회복</span>
                    <span className="font-semibold text-[#00110b]">{treatment.recovery}</span>
                  </div>
                  <div>
                    <span className="text-[#727975] block text-[11px] mb-0.5">통증 제어 / 쿨링</span>
                    <span className="font-semibold text-[#00110b]">{treatment.painCare}</span>
                  </div>
                  <div>
                    <span className="text-[#727975] block text-[11px] mb-0.5">추천 설계 / 용량</span>
                    <span className="font-semibold text-[#745a2a]">{treatment.recommendation}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#efeeeb] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs text-[#424845] flex items-center gap-1.5">
                  <Verified className="w-4 h-4 text-[#745a2a] shrink-0" />
                  {treatment.badge}
                </span>

                {/* 누른 시술이 예약 폼 1단계에 실제로 선택된 채 내려간다 */}
                <button
                  type="button"
                  onClick={() => onSelectTreatment(treatment)}
                  className="min-h-11 text-[#00110b] font-semibold text-xs lg:text-sm hover:text-[#745a2a] flex items-center gap-1 transition-colors group-hover:translate-x-1"
                >
                  <span>이 시술로 상담 신청</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
