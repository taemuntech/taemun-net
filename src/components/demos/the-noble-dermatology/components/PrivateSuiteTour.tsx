import React, { useState } from 'react';
import { DoorClosed, Sparkles, Wind, Check, Eye } from 'lucide-react';

interface PrivateSuiteTourProps {
  onOpenBooking: () => void;
}

export const PrivateSuiteTour: React.FC<PrivateSuiteTourProps> = ({ onOpenBooking }) => {
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);

  const amenities = [
    {
      title: '프리미엄 헤어 스타일러 & 드라이어',
      desc: '시술 후 프라이빗 파우더룸에서 헤어를 정돈하실 수 있도록 고급 스타일링 기기를 비치해 두었습니다.',
    },
    {
      title: '기초 진정 스킨케어 라인',
      desc: '시술 후 민감해진 피부를 부드럽게 정돈하는 진정 중심의 기초 스킨케어 라인을 1인 1실마다 비치합니다.',
    },
    {
      title: '1회용 순면 멸균 가운 & 개인 슬리퍼',
      desc: '철저한 위생 관리를 위해 모든 직물류는 1회 사용 후 전문 세탁 및 멸균 밀봉 처리된 어메니티만을 제공합니다.',
    },
  ];

  return (
    <section id="private-suites" className="w-full py-16 lg:py-20 bg-[#eae8e5] border-b border-[#e4e2df]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          <div className="lg:col-span-6">
            <span className="px-3 py-1 rounded-full bg-[#fbf9f6] text-[#745a2a] text-xs font-semibold tracking-wider uppercase mb-2 inline-block border border-[#e4e2df]">
              100% Single-Person Private Suites
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-4">
              오직 한 분만을 위한<br />프라이빗 메디컬 안식처
            </h2>
            <p className="text-sm lg:text-base text-[#424845] leading-relaxed mb-6">
              더 노블 청담은 오픈형 베드나 공용 대기실을 운영하지 않습니다. 내원 순간부터 상담, 시술, 진정 케어, 파우더룸까지 이동 없이 1인 전용 독립 스위트에서 진행합니다.
            </p>

            {/* Quick Amenity Tabs — div onClick 이라 키보드로 열 수 없었다 */}
            <div className="space-y-2">
              {amenities.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAmenityIndex(idx)}
                  aria-expanded={activeAmenityIndex === idx}
                  className={`w-full text-left p-3 min-h-11 rounded-lg border transition-all cursor-pointer text-xs ${
                    activeAmenityIndex === idx
                      ? 'bg-[#ffffff] border-[#745a2a] shadow-sm text-[#00110b]'
                      : 'bg-[#f5f3f0] border-transparent text-[#424845] hover:bg-[#ffffff]/60'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <Check
                      className={`w-3.5 h-3.5 shrink-0 ${activeAmenityIndex === idx ? 'text-[#745a2a]' : 'text-[#c1c8c4]'}`}
                    />
                    <span>{item.title}</span>
                  </div>
                  {activeAmenityIndex === idx && (
                    <p className="text-[#424845] mt-1 pl-5 leading-relaxed">{item.desc}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-xl overflow-hidden shadow-2xl h-80 lg:h-96 border border-[#ffffff]/60 group">
              <img
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="High luxury private medical powder room in Cheongdam dermatology clinic."
                src="/demo-media/the-noble-dermatology/the-noble-dermatology-05.jpg"
               referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#00110b]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-[#ffffff]">
                <span className="text-[11px] font-semibold text-[#ffdea7] tracking-widest uppercase block mb-1">
                  Suite Amenity Standard
                </span>
                <div className="font-serif text-lg lg:text-xl text-[#ffffff] font-medium">
                  전 객실 프리미엄 스타일러 & 진정 스킨케어 어메니티
                </div>
                <p className="text-xs text-[#ffffff]/80 mt-1">
                  타인과 마주치지 않는 1:1 독립 룸에서 상담부터 시술 마무리까지 진행됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Feature Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#ffffff] shadow-sm border border-[#e4e2df]">
            <div className="w-12 h-12 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#745a2a] mb-4">
              <DoorClosed className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#00110b] mb-2">
              독립 동선 및 5중 특수 방음
            </h3>
            <p className="text-xs lg:text-sm text-[#424845] leading-relaxed">
              다른 고객과 마주치지 않는 1인 1실 독립 복도 동선과 차음 설계를 적용해, 외부의 소음과 시선을 줄인 환경에서 진료합니다.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#ffffff] shadow-sm border border-[#e4e2df]">
            <div className="w-12 h-12 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#745a2a] mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#00110b] mb-2">
              호텔급 파우더룸 & 프리미엄 케어
            </h3>
            <p className="text-xs lg:text-sm text-[#424845] leading-relaxed">
              시술 후 머리와 피부결을 정돈하실 수 있도록 헤어 스타일링 기기, 기초 진정 스킨케어, 1회용 멸균 비품을 룸마다 개별로 비치했습니다.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#ffffff] shadow-sm border border-[#e4e2df]">
            <div className="w-12 h-12 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#745a2a] mb-4">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#00110b] mb-2">
              HEPA-14 등급 개별 공조
            </h3>
            <p className="text-xs lg:text-sm text-[#424845] leading-relaxed">
              0.3㎛ 크기의 미세 입자를 걸러내는 HEPA-14 등급 필터를 각 룸마다 독립적으로 가동해 실내 공기를 관리합니다. (사양은 예시 표기입니다)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
