import React, { useState } from 'react';
import { Heart, MessageCircle, Star } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface ProductCollectionProps {
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
  onOrderProduct: (product: Product, selectedPackagingId: string) => void;
  onKakaoGift: (product: Product, selectedPackagingId: string) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  favorites,
  onToggleFavorite,
  onOrderProduct,
  onKakaoGift,
}) => {
  // Map of productId -> selectedPackagingId
  const [selectedPackaging, setSelectedPackaging] = useState<Record<string, string>>({
    'product-1': 'pack-1-1',
    'product-2': 'pack-2-1',
    'product-3': 'pack-3-1',
    'product-4': 'pack-4-1',
  });

  const handlePackagingChange = (productId: string, packagingId: string) => {
    setSelectedPackaging((prev) => ({
      ...prev,
      [productId]: packagingId,
    }));
  };

  const calculateDisplayPrice = (product: Product) => {
    const chosenPackagingId = selectedPackaging[product.id];
    const packaging = product.packagingOptions.find((opt) => opt.id === chosenPackagingId);
    const packagingFee = packaging ? packaging.price : 0;
    return product.price + packagingFee;
  };

  return (
    <section id="collection" className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-20">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 pb-4 border-b border-[#d6c3ba]/40">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-[#C84B31] uppercase">
            Masterpiece Collection
          </span>
          <h2 className="text-2xl lg:text-3xl font-serif text-[#3e1c06] mt-1.5">
            명장의 손길로 빚은 비스포크 공예 선물
          </h2>
        </div>
        <p className="text-xs lg:text-sm text-[#51443d] mt-2 lg:mt-0">
          모든 작품은 주문 즉시 해당 장인의 아틀리에에서 1:1 수작업으로 제작됩니다.
        </p>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => {
          const isFavorited = favorites.includes(product.id);
          const currentPackagingId = selectedPackaging[product.id] || product.packagingOptions[0].id;
          const displayPrice = calculateDisplayPrice(product);

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="bg-[#F1EBE1] border border-[#583119]/15 rounded overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Product Thumbnail Container */}
                <div className="relative aspect-square overflow-hidden bg-[#ebe8e3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-medium px-2 py-1 rounded shadow-xs ${
                      product.badgeColor || 'bg-[#3e1c06] text-white'
                    }`}
                  >
                    {product.badge}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(product.id)}
                    aria-label={`${product.name} 찜하기`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#3e1c06] hover:text-[#C84B31] transition-colors shadow-xs"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFavorited ? 'fill-[#C84B31] text-[#C84B31]' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Details Section */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#51443d]">
                    <span className="flex items-center text-[#C84B31] font-bold">
                      <Star className="w-3.5 h-3.5 fill-[#C84B31] text-[#C84B31] inline mr-0.5" />
                      {product.rating.toFixed(1)}
                    </span>
                    <span>({product.reviewCount}개 리뷰)</span>
                    <span className="text-[#d6c3ba]">·</span>
                    <span className="text-[#83746c]">{product.category}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#3e1c06] line-clamp-1 leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#51443d] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bojagi Packaging Selector */}
                  <div className="pt-2">
                    <label
                      htmlFor={`bojagi-select-${product.id}`}
                      className="block text-[11px] font-medium text-[#3e1c06] mb-1"
                    >
                      보자기 포장 선택
                    </label>
                    <select
                      id={`bojagi-select-${product.id}`}
                      value={currentPackagingId}
                      onChange={(e) => handlePackagingChange(product.id, e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#d6c3ba]/60 rounded px-2.5 py-1.5 text-xs text-[#1c1c19] focus:outline-none focus:border-[#583119] transition-colors"
                    >
                      {product.packagingOptions.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price & Action Cluster */}
              <div className="p-4 pt-0">
                <div className="flex items-baseline justify-between py-2 border-t border-[#d6c3ba]/40">
                  <span className="text-base font-bold text-[#3e1c06]">
                    ₩{displayPrice.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#83746c] font-medium">
                    {product.shippingText}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onKakaoGift(product, currentPackagingId)}
                    className="w-full py-2 bg-[#FEE500] text-[#191919] text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-[#ebd300] transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-[#191919]" />
                    카카오 선물
                  </button>

                  <button
                    type="button"
                    onClick={() => onOrderProduct(product, currentPackagingId)}
                    className="w-full py-2 bg-[#583119] text-white text-xs font-medium rounded hover:bg-[#422310] transition-colors shadow-xs"
                  >
                    주문하기
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
