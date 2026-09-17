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
          치과 치료에 대한 두려움과 통증, 감염 우려를 줄이기 위한 설비와 진료 절차를 갖추고 운영합니다.
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
              디지털 4단계 컴퓨터 제어 저통증 마취
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              체온과 일치시킨 36.5°C 앰플 보온기와 컴퓨터 제어 주입 방식으로 마취액이 들어가는 속도를 일정하게 유지해, 주입 압력에 따른 통증을 줄입니다.
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
              9단계 중앙 멸균실 운영
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              모든 1회용 소모품은 즉시 폐기하며, 모든 진료 기구는 초음파 세척 후 의료용 멸균 파우치에 1인 1팩 밀봉 포장되어 환자 입회 하에 개봉됩니다.
            </p>
          </div>
          <div className="mt-6 pt-4 bg-[#faf9f6] p-3 rounded-xl border border-[#d1c5b4]/30">
            <span className="text-[11px] text-[#1a1c1a] font-semibold block">• 클래스 B 고압증기 멸균기</span>
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
              수술실 외부 공기의 유입을 억제하는 양압 공조와, 규격상 0.3μm 입자를 99.995% 포집하는 HEPA 14 등급 필터를 24시간 가동합니다.
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
              정품 확인서 &amp; 정기 검진 관리
            </h3>
            <p className="text-xs text-[#4e4639] leading-relaxed">
              식립한 임플란트의 고유 시리얼 넘버가 적힌 정품 확인서를 수술 후 발급하고, 6개월 주기 정기 검진으로 보철물과 잇몸 상태를 함께 관리합니다.
            </p>
          </div>
          <div className="mt-6 pt-4 bg-[#faf9f6] p-3 rounded-xl border border-[#d1c5b4]/30">
            <span className="text-[11px] text-[#1a1c1a] font-semibold block">• 국내 허가 임플란트 정품 확인서</span>
            <span className="text-[11px] text-[#4e4639] block mt-0.5">• 보철물 사후 관리 기준 안내</span>
          </div>
        </div>
      </div>
    </section>
  );
};
