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
    <section className="py-20 bg-[#0e141c] border-t border-[#4d4635]/20 scroll-mt-24" id="advisory">
      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
              STEWARDSHIP &amp; LEADERSHIP
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif-display text-[#dee2ef] mt-2">
              글로벌 파트너십 &amp; 시니어 자문 위원회
            </h2>
          </div>
          <p className="text-sm text-[#d0c5af] max-w-lg mt-4 lg:mt-0 leading-relaxed">
            투자은행·프라이빗 뱅킹·반도체·금융정책 경력자로 구성한 의결 조직 설정입니다.
            <span className="block mt-1 font-mono-metric text-[11px] text-[#d0c5af]/70">
              * 아래 인물과 약력은 모두 가상 인물의 예시이며 실존 인물·기관과 관계가 없습니다.
            </span>
          </p>
        </div>

        {/* 4 Leadership Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-xs lg:text-sm text-[#d0c5af] mt-3 leading-relaxed [word-break:keep-all]">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-[#4d4635]/20 font-mono-metric text-[11px] text-[#d0c5af] flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#4edea3]" />
                <span>{leader.credentialBadge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
