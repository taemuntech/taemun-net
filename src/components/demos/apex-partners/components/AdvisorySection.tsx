import { Landmark, Shield, Cpu, Scale, CheckCircle2 } from 'lucide-react';
import { LEADERS } from '../data/investmentData';

export default function AdvisorySection() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'bank':
        return <Landmark className="w-8 h-8 text-[#f2ca50]" />;
      case 'shield':
        return <Shield className="w-8 h-8 text-[#f2ca50]" />;
      case 'chip':
        return <Cpu className="w-8 h-8 text-[#f2ca50]" />;
      case 'policy':
        return <Scale className="w-8 h-8 text-[#f2ca50]" />;
      default:
        return <Landmark className="w-8 h-8 text-[#f2ca50]" />;
    }
  };

  return (
    <section className="py-20 bg-[#0e141c] border-t border-[#4d4635]/20" id="advisory">
      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
              STEWARDSHIP &amp; LEADERSHIP
            </span>
            <h2 className="text-2xl lg:text-4xl font-serif-display text-[#dee2ef] mt-2">
              글로벌 파트너십 &amp; 시니어 자문 위원회
            </h2>
          </div>
          <p className="text-sm text-[#d0c5af] max-w-lg mt-4 lg:mt-0 leading-relaxed">
            글로벌 최상위 투자은행, 스위스 프라이빗 뱅킹, 반도체 및 국가 금융정책 최고위 전문가들로 구성된 의결 조직
          </p>
        </div>

        {/* 4 Leadership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {LEADERS.map((leader, idx) => (
            <div
              key={idx}
              className="bg-[#161c24] border border-[#4d4635]/30 rounded-xl p-6 relative overflow-hidden group hover:border-[#f2ca50]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-[#30353e] border border-[#f2ca50]/40 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {getIcon(leader.iconType)}
                </div>

                <span className="font-mono-metric text-[11px] text-[#f2ca50] uppercase block">
                  {leader.title}
                </span>
                <h3 className="font-serif-display text-xl text-[#dee2ef] mt-1">
                  {leader.name}
                </h3>
                <p className="text-xs lg:text-sm text-[#d0c5af] mt-3 leading-relaxed">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#4d4635]/20 font-mono-metric text-[11px] text-[#d0c5af] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
                <span>{leader.credentialBadge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
