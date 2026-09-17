import React, { useState } from 'react';
import { PACKAGING_IMAGES } from '../data/luxuryData';

export const PackagingService: React.FC = () => {
  const [boutiquePackage, setBoutiquePackage] = useState<boolean>(true);
  const [valetDelivery, setValetDelivery] = useState<boolean>(false);

  return (
    <section className="w-full bg-[#1c1b1b] border-y border-[#4d4635] py-12 lg:py-16">
      <div className="w-full px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block mb-2 uppercase">
              MAISON DE LUXE SIGNATURE ATELIER SERVICE
            </span>
            <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mb-3 font-medium leading-snug">
              격조 높은 시그니처 샬롱 패키징 &amp; 발렛 특수 안심 배송
            </h2>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 leading-relaxed font-light">
              모든 주문 건은 메종 드 럭스 전용 오크 바인딩 하드케이스, 맞춤형 왁스 실링(Wax Seal), 그리고 무장 경호 보안 전문 요원이 자택까지 직접 배송하는 VIP 발렛 핸드캐리 서비스를 기본 옵션으로 선택하실 수 있습니다.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-[#201f1f] border border-[#d4af37]/40 cursor-pointer hover:border-[#f2ca50] transition-colors">
                <input
                  checked={boutiquePackage}
                  onChange={(e) => setBoutiquePackage(e.target.checked)}
                  className="w-4 h-4 text-[#f2ca50] bg-[#131313] accent-[#f2ca50] focus:ring-0 cursor-pointer"
                  type="checkbox"
                />
                <div className="flex-1">
                  <span className="text-xs lg:text-sm text-[#e5e2e1] block font-bold">
                    오리지널 부티크 패키지 + 메종 드 럭스 왁스 실링
                  </span>
                  <span className="text-[10px] text-[#99907c]">
                    브랜드 정품 박스, 더스트백, 리본, 캘리그라피 감사장 (무료)
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#201f1f] border border-[#d4af37]/40 cursor-pointer hover:border-[#f2ca50] transition-colors">
                <input
                  checked={valetDelivery}
                  onChange={(e) => setValetDelivery(e.target.checked)}
                  className="w-4 h-4 text-[#f2ca50] bg-[#131313] accent-[#f2ca50] focus:ring-0 cursor-pointer"
                  type="checkbox"
                />
                <div className="flex-1">
                  <span className="text-xs lg:text-sm text-[#e5e2e1] block font-bold">
                    발렛 특수 무장 안심 핸드캐리 배송
                  </span>
                  <span className="text-[10px] text-[#99907c]">
                    서울/경기권 당일 전담 배송 요원 직접 수령 인계 (선택 옵션)
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative border border-[#d4af37]/40 overflow-hidden bg-[#201f1f] group">
              <img
                className="w-full h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Luxury boutique gift wrapping process with dark emerald ribbon, golden wax seal stamp"
                src={PACKAGING_IMAGES.waxSeal}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-[#0e0e0e]/80 px-2.5 py-1 text-[10px] text-[#f2ca50] font-medium border border-[#4d4635]">
                장인 수작업 왁스 실링
              </div>
            </div>

            <div className="relative border border-[#d4af37]/40 overflow-hidden bg-[#201f1f] group">
              <img
                className="w-full h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Chic uniformed concierge courier wearing white gloves holding a sealed luxury package"
                src={PACKAGING_IMAGES.valetDelivery}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-[#0e0e0e]/80 px-2.5 py-1 text-[10px] text-[#f2ca50] font-medium border border-[#4d4635]">
                보안 발렛 특수 직배송
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
