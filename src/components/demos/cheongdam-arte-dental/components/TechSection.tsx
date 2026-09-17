import React from 'react';
import { 
  Syringe, 
  Sparkles, 
  Wind, 
  Award, 
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

export const TechSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 py-20 lg:py-28" id="painless-section">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] text-[#006398] tracking-widest uppercase font-semibold block mb-2 font-sans">
          PAINLESS &amp; CLINICAL INFECTION-CONTROL
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1c1a] font-medium tracking-tight">
          두려움 없는 진료, 청담 아르떼 4대 안심 테크놀로지
        </h2>
        <p className="text-sm lg:text-base text-[#4e4639] mt-3 leading-relaxed">
          치과 치료 특유의 공포와 통증, 감염 우려를 근본적으로 지워내는 최첨단 안심 설비와 무통 프로토콜을 운영합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Feature 1 */}
        <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#cce5ff] flex items-center justify-center text-[#001d31] mb-6 group-hover:scale-110 transition-transform">
              <Syringe className="w-7 h-7 text-[#006398]" />
            </div>
            <span className="text-xs text-[#006398] font-bold tracking-wider uppercase block mb-1">
              TECH 01
            </span>
            <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-3">
              디지털 4단계 컴퓨터 무통 마취
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              체온과 일치시킨 36.5°C 앰플 보온기와 사람의 손보다 10배 정밀한 노보콜 컴퓨터 주입 제어로 주사 바늘의 압력 통증을 원천 차단합니다.
            </p>
          </div>
          <div className="mt-6 pt-4 bg-[#faf9f6] p-3 rounded-xl border border-[#d1c5b4]/30">
            <span className="text-[11px] text-[#1a1c1a] font-semibold block">• 도포 마취 크림 사전 처치</span>
            <span className="text-[11px] text-[#4e4639] block mt-0.5">• 초미세 31G 나노 니들 사용</span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#ffdea5] flex items-center justify-center text-[#261900] mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7 text-[#775a19]" />
            </div>
            <span className="text-xs text-[#775a19] font-bold tracking-wider uppercase block mb-1">
              TECH 02
            </span>
            <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-3">
              9단계 대학병원급 중앙 멸균실
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              모든 1회용 소모품은 즉시 폐기하며, 모든 진료 기구는 초음파 세척 후 의료용 멸균 파우치에 1인 1팩 밀봉 포장되어 환자 입회 하에 개봉됩니다.
            </p>
          </div>
          <div className="mt-6 pt-4 bg-[#faf9f6] p-3 rounded-xl border border-[#d1c5b4]/30">
            <span className="text-[11px] text-[#1a1c1a] font-semibold block">• 독일 Melag 고압증기멸균기</span>
            <span className="text-[11px] text-[#4e4639] block mt-0.5">• 화학적 인디케이터 멸균 검증</span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#dae2fd] flex items-center justify-center text-[#131b2e] mb-6 group-hover:scale-110 transition-transform">
              <Wind className="w-7 h-7 text-[#565e74]" />
            </div>
            <span className="text-xs text-[#565e74] font-bold tracking-wider uppercase block mb-1">
              TECH 03
            </span>
            <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-3">
              HEPA 14등급 양압 클린에어
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              수술실 외부의 오염 공기 유입을 100% 방지하는 양압 공조와 0.3μm 미세먼지 및 바이러스를 99.995% 포집하는 HEPA 14 의료 필터를 24시간 가동합니다.
            </p>
          </div>
          <div className="mt-6 pt-4 bg-[#faf9f6] p-3 rounded-xl border border-[#d1c5b4]/30">
            <span className="text-[11px] text-[#1a1c1a] font-semibold block">• 1인 독립 VIP 룸 개별 환기</span>
            <span className="text-[11px] text-[#4e4639] block mt-0.5">• 수술 구강 외 에어로졸 석션 구비</span>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all border border-[#d1c5b4]/30 flex flex-col justify-between group">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/20 flex items-center justify-center text-[#775a19] mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7 text-[#775a19]" />
            </div>
            <span className="text-xs text-[#775a19] font-bold tracking-wider uppercase block mb-1">
              TECH 04
            </span>
            <h3 className="font-serif text-lg text-[#1a1c1a] font-bold mb-3">
              100% 정품 인증서 &amp; 평생 보증제
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              식립된 정품 임플란트 고유 시리얼 넘버가 표기된 정품 인증서 카드를 수술 즉시 발급하며, 6개월 주기 정기 검진을 통해 평생 치아 건강을 책임집니다.
            </p>
          </div>
          <div className="mt-6 pt-4 bg-[#faf9f6] p-3 rounded-xl border border-[#d1c5b4]/30">
            <span className="text-[11px] text-[#1a1c1a] font-semibold block">• Straumann / Osstem 정품 보증</span>
            <span className="text-[11px] text-[#4e4639] block mt-0.5">• 보철물 파절 10년 안심 케어</span>
          </div>
        </div>
      </div>
    </section>
  );
};
