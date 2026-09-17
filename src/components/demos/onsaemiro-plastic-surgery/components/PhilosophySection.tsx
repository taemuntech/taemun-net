import React from 'react';
import { Sparkles, Eye, Compass, HeartHandshake } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: '과교정 배제 (Natural Harmony)',
      subtitle: '인위적인 과장을 덜어내고 본연의 조화를 완성합니다',
      desc: '단순히 코를 높이거나 눈을 크게 만드는 식의 획일적인 수술은 얼굴 전체의 밸런스를 무너뜨립니다. 온새미로는 고객이 타고난 본연의 이목구비와 자연스럽게 어우러지는 조화로운 선을 최우선으로 고려합니다.',
      icon: HeartHandshake,
    },
    {
      num: '02',
      title: '3D 정밀 해부학 진단 (Precision Anatomy)',
      subtitle: '피부 두께, 골격, 근육 움직임까지 다각도로 분석합니다',
      desc: '가만히 있을 때뿐 아니라 웃고 말할 때의 표정 근육과 연조직의 변화까지 3D CT 및 정밀 안면 계측기를 통해 사전 입체 시뮬레이션하여 움직임 속에서도 자연스러운 결과를 도출합니다.',
      icon: Compass,
    },
    {
      num: '03',
      title: '미세 다층 봉합 (Scarless Micro-Suture)',
      subtitle: '수술의 흔적을 지우는 숙련된 전문의의 미세 테크닉',
      desc: '피부 장력을 분산시키는 특수 피하 다층 봉합(Subcuticular Suture)과 모발 및 결막선 내부 미세 절개를 통해 회복 후 흉터를 눈에 띄지 않게 최소화합니다.',
      icon: Eye,
    },
  ];

  return (
    <section id="philosophy" className="py-20 lg:py-28 bg-[#FAF6F2] text-[#1A1817]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDD4] text-[#8C6D4F] text-[12px] font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[#B08968]" />
            <span>온새미로의 철학</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-[#1A1817] leading-tight mb-4">
            가장 나다운 본래의 얼굴,<br />
            변하지 않는 자연스러운 기품
          </h2>
          <p className="text-[15px] text-[#68625D] leading-relaxed">
            순우리말 ‘온새미로’는 억지로 가르거나 쪼개지 않는 자연 그대로의 온전함을 뜻합니다.<br className="hidden lg:block" />
            우리는 본연의 개성을 존중하며 가장 아름다운 비율만을 섬세하게 찾아냅니다.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {principles.map((p) => {
            const IconComp = p.icon;
            return (
              <div
                key={p.num}
                className="bg-white rounded-3xl p-8 border border-[#E8DDD4] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[32px] font-serif font-bold text-[#C5A880]/50 group-hover:text-[#C5A880] transition-colors">
                      {p.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF6F2] flex items-center justify-center text-[#8C6D4F] group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-[19px] font-bold text-[#1A1817] mb-2 group-hover:text-[#8C6D4F] transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-[13px] font-medium text-[#B08968] mb-4">
                    {p.subtitle}
                  </div>
                  <p className="text-[14px] text-[#68625D] leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F2ECE4] text-[12px] font-medium text-[#8C6D4F] flex items-center gap-1">
                  <span>온새미로 표준 진료 원칙 준수</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
