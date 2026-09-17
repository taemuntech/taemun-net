import React from 'react';
import { Sparkles, Bed, Wind, Sun, Clock, ChevronRight } from 'lucide-react';
import { RECOVERY_STEPS } from '../data/clinicData';

interface RecoveryLoungeSectionProps {
  onOpenRecoveryModal: () => void;
}

export const RecoveryLoungeSection: React.FC<RecoveryLoungeSectionProps> = ({
  onOpenRecoveryModal,
}) => {
  const treatments = [
    {
      title: '1인 단독 프라이빗 회복실',
      desc: '수술 직후 타 환자와 마주치지 않고 독립된 공간에서 전담 간호사의 밀착 케어를 받으며 충분한 휴식을 취할 수 있습니다.',
      icon: Bed,
    },
    {
      title: '고압산소 챔버 치료',
      desc: '2기압 이상의 고순도 산소를 공급하여 모세혈관 깊숙이 산소를 전달함으로써 수술 후 부종 완화와 조직 회복 속도를 향상시킵니다.',
      icon: Wind,
    },
    {
      title: '힐라이트 II 스마트 광선 케어',
      desc: '미세 혈류량을 증대시키고 멜라닌 생성을 억제하여 수술 부위의 멍과 미세 통증을 빠르게 진정시키는 프리미엄 광원 치료입니다.',
      icon: Sun,
    },
  ];

  return (
    <section id="recovery" className="py-20 lg:py-28 bg-[#FAF6F2] text-[#1A1817]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDD4] text-[#8C6D4F] text-[12px] font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[#B08968]" />
            <span>프리미엄 사후관리</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-[#1A1817] leading-tight mb-4">
            수술 후 일상 복귀까지 책임지는<br />
            <span className="text-[#8C6D4F]">1인 VIP 프라이빗 붓기 완화 힐링 케어</span>
          </h2>
          <p className="text-[15px] text-[#68625D] leading-relaxed">
            성형의 만족도는 수술 직후의 애프터케어에서 결정됩니다.<br className="hidden lg:block" />
            온새미로는 1:1 전담 회복실과 첨단 부종 관리 장비로 멍과 붓기를 최소화합니다.
          </p>
        </div>

        {/* 3 Treatments Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {treatments.map((t, idx) => {
            const IconComp = t.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-[#E8DDD4] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6F2] flex items-center justify-center text-[#8C6D4F] mb-6">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#1A1817] mb-3">
                    {t.title}
                  </h3>
                  <p className="text-[14px] text-[#68625D] leading-relaxed">
                    {t.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#F2ECE4] text-[12px] font-medium text-[#8C6D4F]">
                  무료 맞춤 애프터케어 패키지 포함
                </div>
              </div>
            );
          })}
        </div>

        {/* Recovery Step Preview Bar */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E8DDD4] shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F2ECE4]">
            <div>
              <div className="text-[16px] font-bold text-[#1A1817]">
                수술 후 14일 맞춤 회복 로드맵
              </div>
              <div className="text-[12px] text-[#8C857D] mt-0.5">
                당일부터 실밥 제거, 최종 라인 안착까지 일자별 체계적 프로토콜
              </div>
            </div>
            <button
              onClick={onOpenRecoveryModal}
              className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#8C6D4F] bg-[#FAF6F2] border border-[#E8DDD4] hover:bg-[#E8DDD4] transition-colors flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4" />
              <span>일자별 상세 붓기 가이드 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {RECOVERY_STEPS.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#E8DDD4]/80">
                <div className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider mb-1">
                  {step.day}
                </div>
                <div className="text-[14px] font-bold text-[#1A1817] mb-2">
                  {step.title}
                </div>
                <div className="text-[12px] text-[#68625D] line-clamp-2">
                  {step.careDetails[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
