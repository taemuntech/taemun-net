import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedSize: string, selectedColor: string) => void;
  onInstantBuy: (product: Product, selectedSize: string, selectedColor: string) => void;
  onGiftItem: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBuy,
  onGiftItem,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('L (추천 사이즈)');
  const [selectedColor, setSelectedColor] = useState<string>('Noir Black');

  useEffect(() => {
    if (product) {
      setActiveImage(product.thumbnails?.[0] || product.image);
      setSelectedSize('L (추천 사이즈)');
      setSelectedColor(product.colors[0] || 'Noir Black');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const defaultThumbnails = [
    product.image,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDE0p3rlPqKlwPw7V0lTWkn4UxMtnRZqs3jgWM2xEMCMy_yAijFU0vGZWdpuXcnkOv5Sx00UAUC-kmbBywdCZ3UOj8XYKKVCNsICB2PbEbHDBmBbLzo8TozgwHcJ71rZsuCMcax6_ELa-6MVGD2zX-cL09ghHoKZHTecekq3ar2P7cZWjpnKOETI1eisUoMFc2gCo99jPh5dyOe_Jb_Kutt0-EdHOIFHLqdvLN81-oXCGz7sh19btmL',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnDZBOhkaFpLVDJJxC0wYUUAKui9V6AyMOkDbt1QBN-S_6dFAU-eyDkGpGHwN6hp0Se7K0D2U9XhxVxJBlGVQTZXj7x5NBgXKpWu1LPP16SC1jZALHvCxgc64ZOgc-Mmlj57M4gXrQFMdINCkU73nhdhcGEMk9ffzbXsyKoOTqdujia4r9h2LguVHS0JjbkTjT4o_CwgxuYr5jykUYuHdNIvV6iv0h9s_vFndWUKIV4rOCCrlcIV3K',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuArV8Pno5ETDwgDQTkLZSLvyWXqydUVSF9C8XGs6TfYE2u8Cic3CIAqw0x0_CVoxg5emU1DLoUegbCBVQJI-mEIznP9gXtcvMH8iR0RUDwWbdLxedaOcBwr5D16bQKMuYXN965AQeH1hgUXTR6a8lfmIbqbg30spbBCHZ5H9BVN_kujPmFA4uW4sEoshx_Wj2q9aJhqJzduHXugpRXLJj8Ui78sPnPNnbCo8sGZCK351bAgEoypHxV6',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDeTJv3X1iduas21wljGtdxcWUvkbbeZCIXuFFtexeP922E1wB21nScHm3wmnRbIO_jUfjv1Uhvcs5uDB1ruPYiXepyoxJxj9vKv5QoHOUvxvbPtB5WvVpOdt0j5NP0FrpPU-H4eC----XOEUbFmsi713kMvomBGZN5a5Ym4mKddfae4IGvAileeLdid59-iwVSVOHze37CvOPIlGj2WTEKX2EcvHlVnvJwb0iJN82IxeKphOL1PSFw',
  ];

  const galleryImages = product.thumbnails && product.thumbnails.length > 0 ? product.thumbnails : defaultThumbnails;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 lg:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#1b1c1d] hairline-all max-w-4xl w-full max-h-[92vh] overflow-y-auto relative p-5 lg:p-8 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#e3e2e3] hover:text-[#caf300] p-1.5 transition-colors z-20 cursor-pointer"
          aria-label="닫기"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Multi-Angle Gallery Preview (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="aspect-[3/4] hairline-all overflow-hidden bg-[#121314]">
              <img
                src={activeImage || product.image}
                alt={product.altText}
                className="w-full h-full object-cover transition-transform duration-300"
              referrerPolicy="no-referrer" />
            </div>

            {/* Thumbnail Matrix */}
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.slice(0, 4).map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`aspect-square hairline-all overflow-hidden transition-all cursor-pointer ${ activeImage === thumb ? 'border-[#caf300] opacity-100 ring-1 ring-[#caf300]' : 'opacity-60 hover:opacity-100 border-[#27272a]' }`}
                >
                  <img
                    src={thumb}
                    alt={`Angle thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Spec, Fit Guide & Purchasing Controls (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#caf300] text-[#171e00] font-label-sm text-[10px] font-bold px-2 py-0.5">
                  EXCLUSIVE ARCHIVE
                </span>
                <span className="text-[#ffb4ab] font-label-sm text-xs font-bold">
                  {product.discountRate}
                </span>
                <span className="text-[#8f9378] font-label-sm text-[10px] uppercase">
                  {product.brand}
                </span>
              </div>

              <h2 className="font-headline-lg text-lg lg:text-xl text-[#ffffff] font-bold mb-1">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <div className="font-display-hero text-2xl font-bold text-[#caf300]">
                  ₩{product.price.toLocaleString()}
                </div>
                <div className="text-xs text-[#8f9378] line-through font-label-sm">
                  ₩{product.originalPrice.toLocaleString()}
                </div>
              </div>

              {/* Model Spec Highlight */}
              <div className="bg-[#1f2021] p-3 hairline-all mb-4 text-xs">
                <div className="text-[#caf300] font-label-sm text-[10px] uppercase mb-1">
                  MODEL FITTING SPEC
                </div>
                <p className="text-[#e3e2e3]">
                  {product.modelSpec || '모델 신체스펙: 186cm / 71kg, L사이즈 착용 (여유로운 세미 오버핏 연출)'}
                </p>
              </div>

              {/* Precision Measurement Table */}
              <div className="mb-4">
                <div className="font-label-sm text-[11px] text-[#8f9378] uppercase mb-2">
                  실측 정밀 치수표 (CM · 예시 데이터)
                </div>
                <table className="w-full text-left font-label-sm text-xs hairline-all border-collapse">
                  <thead>
                    <tr className="bg-[#121314] hairline-b text-[#8f9378]">
                      <th className="p-2 font-medium">사이즈</th>
                      <th className="p-2 font-medium">어깨너비</th>
                      <th className="p-2 font-medium">가슴단면</th>
                      <th className="p-2 font-medium">소매길이</th>
                      <th className="p-2 font-medium">총장</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272A] text-[#e3e2e3]">
                    <tr>
                      <td className="p-2 font-bold text-[#ffffff]">M (95-100)</td>
                      <td className="p-2">52 cm</td>
                      <td className="p-2">59 cm</td>
                      <td className="p-2">63 cm</td>
                      <td className="p-2">76 cm</td>
                    </tr>
                    <tr className="bg-[#1f2021]/60">
                      <td className="p-2 font-bold text-[#caf300]">L (100-105) *착용</td>
                      <td className="p-2 font-bold text-[#caf300]">54 cm</td>
                      <td className="p-2 font-bold text-[#caf300]">62 cm</td>
                      <td className="p-2 font-bold text-[#caf300]">65 cm</td>
                      <td className="p-2 font-bold text-[#caf300]">78 cm</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-[#ffffff]">XL (105-110)</td>
                      <td className="p-2">56 cm</td>
                      <td className="p-2">65 cm</td>
                      <td className="p-2">67 cm</td>
                      <td className="p-2">80 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Verified Fit Review Summary */}
              <div className="hairline-all bg-[#1f2021] p-3 mb-4 text-xs">
                <div className="text-[#8f9378] font-label-sm text-[10px] uppercase mb-1">
                  체형별 핏 리뷰 요약 (예시 데이터)
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#c5c9ac]">
                  <span>사이즈감: <strong className="text-[#ffffff]">약간 큼 (정사이즈 오버핏)</strong></span>
                  <span>두께감: <strong className="text-[#ffffff]">도톰함 (봄/가을/초겨울)</strong></span>
                  <span>신축성: <strong className="text-[#ffffff]">보통</strong></span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-4">
                <label className="font-label-sm text-[11px] text-[#8f9378] block mb-2">
                  SIZE SELECT:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['M (재고 3개)', 'L (추천 사이즈)', 'XL (품절임박)'].map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 hairline-all text-center font-label-sm text-xs cursor-pointer transition-all ${ isSelected ? 'bg-[#caf300] text-[#171e00] font-bold border-[#caf300]' : 'bg-[#121314] text-[#e3e2e3] hover:border-[#ffffff]' }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Purchasing Commitment Actions */}
            <div className="flex flex-col gap-2 pt-4 hairline-t">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onInstantBuy(product, selectedSize, selectedColor)}
                  className="bg-[#caf300] text-[#171e00] py-3.5 px-4 font-label-lg text-xs font-bold uppercase tracking-wider hover:bg-[#ffffff] transition-colors text-center cursor-pointer active:scale-98"
                >
                  바로 구매하기
                </button>
                <button
                  onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                  className="bg-[#292a2b] text-[#ffffff] hairline-all py-3.5 px-4 font-label-lg text-xs font-bold uppercase tracking-wider hover:bg-[#343536] transition-colors text-center cursor-pointer active:scale-98"
                >
                  장바구니 담기
                </button>
              </div>

              <button
                onClick={() => onGiftItem(product)}
                className="w-full bg-transparent hairline-all py-2.5 text-[#e3e2e3] hover:text-[#ffffff] hover:bg-[#1f2021] font-label-sm text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-[#caf300]">
                  featured_seasonal_and_gifts
                </span>
                <span>선물하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
