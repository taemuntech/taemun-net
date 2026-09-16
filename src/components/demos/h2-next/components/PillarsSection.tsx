import React from 'react';
import { PILLARS_DATA } from '../data/mockData';
import { Wind, Snowflake, Network, Cpu, ArrowUpRight } from './Icons';

interface PillarsSectionProps {
  onSelectAction?: (actionText: string) => void;
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ onSelectAction }) => {
  const getPillarIcon = (iconName: string, colorType: 'primary' | 'secondary') => {
    const colorClass = colorType === 'primary' ? 'text-[#00685f]' : 'text-[#006398]';
    switch (iconName) {
      case 'cyclone':
        return <Wind className={`w-6 h-6 ${colorClass} group-hover:scale-110 transition-transform`} />;
      case 'ac_unit':
        return <Snowflake className={`w-6 h-6 ${colorClass} group-hover:scale-110 transition-transform`} />;
      case 'hub':
        return <Network className={`w-6 h-6 ${colorClass} group-hover:scale-110 transition-transform`} />;
      default:
        return <Cpu className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  return (
    <section id="pillars" className="py-16 bg-[#f8f9ff] border-b border-[#bcc9c6]/30">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#00685f] font-mono text-xs uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>Proprietary Green Hydrogen Engineering</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30]">
              3대 핵심 청정에너지 솔루션
            </h2>
          </div>
          <p className="text-sm lg:text-base text-[#3d4947] max-w-lg mt-3 lg:mt-0 leading-relaxed">
            해상풍력의 잉여 전력을 완벽한 무탄소 분자(H2)로 치환하고, 극저온 액화와 분산형 전력망을 통해 산업 현장에 무손실 공급합니다.
          </p>
        </div>

        {/* Pillar Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS_DATA.map((pillar) => {
            const isPrimary = pillar.colorType === 'primary';
            const badgeBg = isPrimary ? 'bg-[#00685f]/10 text-[#00685f] border-[#00685f]/20' : 'bg-[#006398]/10 text-[#006398] border-[#006398]/20';
            const accentText = isPrimary ? 'text-[#00685f]' : 'text-[#006398]';

            return (
              <div
                key={pillar.id}
                id={pillar.id}
                className="bg-white rounded-xl border border-[#bcc9c6]/50 p-6 shadow-xs hover:border-[#00685f]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff] mb-4">
                    <span className={`font-mono text-xs px-2.5 py-1 rounded font-semibold border ${badgeBg}`}>
                      {pillar.pillarNum}
                    </span>
                    {getPillarIcon(pillar.icon, pillar.colorType)}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0b1c30] mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[#3d4947] mb-5 leading-relaxed">{pillar.desc}</p>

                  {/* Progress Metric Bar */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between font-mono text-xs text-[#3d4947]">
                      <span>{pillar.progressLabel}</span>
                      <span className={`font-bold ${accentText}`}>{pillar.progressValue}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isPrimary
                            ? 'bg-gradient-to-r from-[#006398] to-[#00685f]'
                            : 'bg-gradient-to-r from-[#00685f] to-[#006398]'
                        }`}
                        style={{ width: `${pillar.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Technical Specification Table */}
                  <div className="rounded-lg bg-[#eff4ff] p-3 space-y-2 border border-[#bcc9c6]/30 font-mono text-xs">
                    {pillar.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center text-[#3d4947]">
                        <span>{spec.label}</span>
                        <span className="font-bold text-[#0b1c30]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="mt-6 pt-3 border-t border-[#e5eeff] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#6d7a77]">{pillar.certLabel}</span>
                  <a
                    href={pillar.actionHref}
                    onClick={() => onSelectAction && onSelectAction(pillar.actionText)}
                    className={`text-sm font-semibold hover:underline inline-flex items-center gap-1 ${accentText}`}
                  >
                    <span>{pillar.actionText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
