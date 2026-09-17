import React from 'react';
import { ArrowUpRight, CheckCircle2, Grid3X3, Box, Atom } from 'lucide-react';
import { PILLARS } from '../data/packagingData';

interface PlatformPillarsProps {
  onOpenWhitepaper: () => void;
  onOpenConsultation: () => void;
}

export const PlatformPillars: React.FC<PlatformPillarsProps> = ({
  onOpenWhitepaper,
  onOpenConsultation,
}) => {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Grid3X3 className="w-6 h-6" />;
      case 1:
        return <Box className="w-6 h-6" />;
      case 2:
      default:
        return <Atom className="w-6 h-6" />;
    }
  };

  const handlePillarAction = (index: number) => {
    if (index === 0) {
      onOpenWhitepaper();
    } else {
      onOpenConsultation();
    }
  };

  return (
    <section className="scroll-mt-20 py-16 lg:py-24 bg-[#f8f9ff] border-b border-[#c4c5d5]/30" id="solutions">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-[#00288e] uppercase tracking-widest mb-2 font-mono">
            Packaging Breakthroughs
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30] mb-4 tracking-tight">
            AI 하드웨어를 재정의하는 3대 핵심 플랫폼 기술
          </h2>
          <p className="text-base text-[#444653] leading-relaxed">
            실리콘 인터포저의 미세 배선 한계 돌파부터 차세대 유리기판 양산, 하이브리드 본딩까지
            턴키로 통합 제공합니다.
          </p>
        </div>

        {/* 태블릿(768)은 2단, 데스크톱은 3단 — 768 에서 카드가 한 줄로 늘어지던 자리 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            const accentColor = isFirst
              ? 'text-[#00288e]'
              : isSecond
              ? 'text-[#00687a]'
              : 'text-[#00563a]';
            const borderHover = isFirst
              ? 'hover:border-[#00288e]'
              : isSecond
              ? 'hover:border-[#00687a]'
              : 'hover:border-[#00563a]';

            return (
              <div
                key={pillar.code}
                className={`bg-white p-6 rounded-2xl border border-[#c4c5d5]/40 ${borderHover} transition-all duration-200 shadow-xs flex flex-col justify-between group`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-[#eff4ff] ${accentColor} flex items-center justify-center mb-6 group-hover:bg-[#00288e] group-hover:text-white transition-colors duration-200`}
                  >
                    {getPillarIcon(idx)}
                  </div>

                  <div className="font-mono text-[11px] text-[#757684] mb-2 font-semibold">
                    {pillar.code}
                  </div>

                  <h3 className="text-xl font-bold text-[#0b1c30] mb-3 group-hover:text-[#00288e] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#444653] mb-6 leading-relaxed">{pillar.desc}</p>

                  <ul className="space-y-2.5 text-xs text-[#444653] mb-8">
                    {pillar.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${accentColor}`} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handlePillarAction(idx)}
                  className={`${accentColor} min-h-11 font-semibold text-xs flex items-center gap-1.5 hover:underline cursor-pointer text-left`}
                >
                  <span>{pillar.actionText}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
