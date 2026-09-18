import React from 'react';
import { Check } from 'lucide-react';
import { PACKAGING_IMAGES } from '../data/luxuryData';
import { PackagingOptions } from '../types';

interface PackagingServiceProps {
  options: PackagingOptions;
  onChange: (next: PackagingOptions) => void;
}

/**
 * 체크 상자 — 네이티브 체크박스는 20px 라 모바일 44px 탭 대상에 못 미친다.
 * 실제 input 을 44x44 투명 상자로 깔고, 보이는 상자는 peer-checked 로 그린다(모양은 그대로, 누르는 곳만 넓힌다).
 */
function CheckBox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <span className="relative -my-2 flex h-11 w-11 shrink-0 items-center justify-center">
      <input
        type="checkbox"
        checked={checked}
        aria-label={label}
        onChange={(e) => onChange(e.target.checked)}
        className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <span
        aria-hidden="true"
        className="flex h-5 w-5 items-center justify-center border border-[#d4af37]/60 bg-[#131313] text-transparent transition-colors peer-checked:border-[#f2ca50] peer-checked:bg-[#f2ca50] peer-checked:text-[#0e0e0e] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#f2ca50]"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    </span>
  );
}

// 체크박스는 화면 안에서만 도는 상태였다 — 지금은 주문서 요약에 그대로 나온다.
// 걷어낸 것: 「무장 경호 보안 전문 요원」(지킬 수 없는 약속) · 「브랜드 정품 박스」(실존 브랜드 정품 포장 암시).
export const PackagingService: React.FC<PackagingServiceProps> = ({ options, onChange }) => {
  return (
    <section id="packaging" className="w-full bg-[#1c1b1b] border-y border-[#4d4635] py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-[10px] text-[#f2ca50] tracking-widest font-semibold block mb-2 uppercase">
              MAISON DE LUXE ATELIER SERVICE
            </span>
            <h2 className="font-serif text-xl lg:text-3xl text-[#e5e2e1] mb-3 font-medium leading-snug [word-break:keep-all]">
              시그니처 살롱 패키징 &amp; 컨시어지 대면 배송
            </h2>
            <p className="text-xs lg:text-sm text-[#d0c5af] mb-6 leading-relaxed font-light [word-break:keep-all]">
              주문 건마다 메종 드 럭스 전용 하드케이스와 맞춤 왁스 실링, 담당 컨시어지가 직접 전달하는 대면 인계
              배송을 선택하실 수 있다는 설정입니다. 선택한 옵션은 주문서 요약에 그대로 표시됩니다.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 min-h-14 bg-[#201f1f] border border-[#d4af37]/40 cursor-pointer hover:border-[#f2ca50] transition-colors">
                <CheckBox
                  checked={options.boutiquePackage}
                  onChange={(v) => onChange({ ...options, boutiquePackage: v })}
                  label="부티크 패키지 + 메종 드 럭스 왁스 실링 선택"
                />
                <span className="flex-1">
                  <span className="text-xs lg:text-sm text-[#e5e2e1] block font-bold [word-break:keep-all]">
                    부티크 패키지 + 메종 드 럭스 왁스 실링
                  </span>
                  <span className="text-[10px] text-[#99907c] [word-break:keep-all]">
                    전용 하드케이스, 더스트백, 리본, 손글씨 카드 (무료)
                  </span>
                </span>
              </label>

              <label className="flex items-center gap-3 p-3 min-h-14 bg-[#201f1f] border border-[#d4af37]/40 cursor-pointer hover:border-[#f2ca50] transition-colors">
                <CheckBox
                  checked={options.valetDelivery}
                  onChange={(v) => onChange({ ...options, valetDelivery: v })}
                  label="컨시어지 대면 인계 배송 선택"
                />
                <span className="flex-1">
                  <span className="text-xs lg:text-sm text-[#e5e2e1] block font-bold [word-break:keep-all]">
                    컨시어지 대면 인계 배송
                  </span>
                  <span className="text-[10px] text-[#99907c] [word-break:keep-all]">
                    담당 컨시어지가 직접 수령 확인 후 인계 (선택 옵션)
                  </span>
                </span>
              </label>
            </div>

            <p className="mt-3 text-[11px] text-[#d0c5af] [word-break:keep-all]">
              선택한 옵션:{' '}
              <span className="text-[#f2ca50] font-semibold">
                {[
                  options.boutiquePackage ? '부티크 패키지 + 왁스 실링' : null,
                  options.valetDelivery ? '컨시어지 대면 인계 배송' : null,
                ]
                  .filter(Boolean)
                  .join(' · ') || '선택 없음'}
              </span>
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative border border-[#d4af37]/40 overflow-hidden bg-[#201f1f] group">
              <img
                className="w-full h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                alt="짙은 녹색 리본과 금색 왁스 실링으로 마무리하는 부티크 선물 포장 작업 사진"
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
                alt="흰 장갑을 낀 유니폼 차림의 컨시어지가 봉인된 럭셔리 패키지를 들고 있는 사진"
                src={PACKAGING_IMAGES.valetDelivery}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-[#0e0e0e]/80 px-2.5 py-1 text-[10px] text-[#f2ca50] font-medium border border-[#4d4635]">
                컨시어지 대면 인계
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
