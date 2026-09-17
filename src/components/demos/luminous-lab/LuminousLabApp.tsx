'use client';

import React, { useState, useMemo } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { HeroSpotlight } from './components/HeroSpotlight';
import { FilterHUD } from './components/FilterHUD';
import { RankingAwards } from './components/RankingAwards';
import { FormulaInspector } from './components/FormulaInspector';
import { SynergyBundle } from './components/SynergyBundle';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { CartDrawer } from './components/CartDrawer';
import { DiagnosisModal } from './components/DiagnosisModal';
import { ClinicalReportModal } from './components/ClinicalReportModal';
import { DeliveryCheckModal } from './components/DeliveryCheckModal';
import { CounselingModal } from './components/CounselingModal';
import { InfoDialog, type InfoDialogContent } from './components/InfoDialog';
import { WishlistModal } from './components/WishlistModal';
import { Toast } from './components/Toast';
import { RANKING_PRODUCTS, HERO_PRODUCT } from './data/mockData';
import { CartItem, Product, ToastInfo } from './types';

type FilterState = {
  searchTerm: string;
  category: string;
  skinType: string;
  skinConcern: string;
  cert: string;
};

/** 목록에 걸리는 조건 한 벌 — 화면과 안내 문구가 같은 판정을 쓰도록 한곳에 둔다 */
function filterProducts({ searchTerm, category, skinType, skinConcern, cert }: FilterState): Product[] {
  return RANKING_PRODUCTS.filter((prod) => {
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const matchesName = prod.name.toLowerCase().includes(term);
      const matchesDesc = prod.subTitle?.toLowerCase().includes(term) ?? false;
      const matchesBadges = prod.badges.some((b) => b.toLowerCase().includes(term));
      if (!matchesName && !matchesDesc && !matchesBadges) return false;
    }
    if (category !== '전체' && !prod.category.includes(category)) return false;
    if (skinType && !prod.skinType.some((st) => st.includes(skinType))) return false;
    if (skinConcern && !prod.skinConcern.some((sc) => sc.includes(skinConcern))) return false;
    if (cert && !prod.certifications.some((c) => c.includes(cert))) return false;
    return true;
  });
}

export default function LuminousLabApp({ isEmbed = false }: { isEmbed?: boolean }) {
  // 관심상품 — 화면에 실재하는 상품 id 만 담는다.
  // (예전 시드는 존재하지 않는 'wished-*' 12개를 넣어 하트 배지가 볼 수 없는 14를 가리켰다)
  const [wishlist, setWishlist] = useState<string[]>(['prod-1', 'prod-3']);

  // Initial cart seeded with 2 items to match mockup cart counter (2)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'item-hero-initial',
      name: '시카 엑소좀 수분 앰플 단독 리필 기획세트',
      price: HERO_PRODUCT.price,
      originalPrice: HERO_PRODUCT.originalPrice,
      quantity: 1,
      imageUrl: HERO_PRODUCT.imageUrl,
      optionText: '본품 50ml + 에코 리필 파우치 50ml 증정',
    },
    {
      id: 'item-cream-initial',
      name: '8중 히알루론산 장벽 리페어 크림 80ml',
      price: 29400,
      originalPrice: 39200,
      quantity: 1,
      imageUrl: RANKING_PRODUCTS[1].imageUrl,
      optionText: '본품 80ml 단품 (100시간 보습)',
    },
  ]);

  // 필터 초기값은 「전체」 — 예전 기본값(수부지 + 장벽강화/보습)은 예시 상품 4종 중 2종만 통과시켜
  // 랭킹 4열 그리드가 처음부터 절반 비어 보였다. 필터 동작은 눌러 보면 그대로 확인된다.
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('');
  const [selectedSkinConcern, setSelectedSkinConcern] = useState<string>('');
  const [selectedCert, setSelectedCert] = useState<string>('');

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Active navigation tab
  const [activeNav, setActiveNav] = useState<string>('실시간 랭킹');

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [isClinicalReportOpen, setIsClinicalReportOpen] = useState(false);
  const [isDeliveryCheckOpen, setIsDeliveryCheckOpen] = useState(false);
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<ToastInfo | null>(null);

  // 샘플 안내(주문하기를 눌렀을 때) — 입력값은 어디에도 보내지 않는다
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // 머리말·바닥글의 안내 문구 — alert() 대신 이 모달로 띄운다
  const [infoContent, setInfoContent] = useState<InfoDialogContent | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'cart' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  };

  // Wishlist toggle handler
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('관심상품 목록에서 삭제되었습니다.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('관심상품 목록에 추가되었습니다. (마이페이지에서 확인 가능)', 'success');
        return [...prev, productId];
      }
    });
  };

  // Add to Cart handler
  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    optionText?: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id || i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id || `cart-${Date.now()}`,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          quantity: 1,
          imageUrl: item.imageUrl,
          optionText: item.optionText || '기본 구성 옵션',
        },
      ];
    });

    showToast(`[${item.name}] 상품이 장바구니에 담겼습니다!`, 'cart');
  };

  const handleAddProductToCart = (product: Product) => {
    handleAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      imageUrl: product.imageUrl,
      optionText: product.subTitle || '단품 50ml',
    });
  };

  // Cart item quantity update
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove cart item
  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('상품이 장바구니에서 삭제되었습니다.', 'info');
  };

  // Checkout action — 샘플이라 주문을 받지 않는다. 가짜 주문번호·「접수됐다」 대신 공용 안내(SampleNotice)만 연다.
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsNoticeOpen(true);
  };

  // Filtered Products computation
  const filteredProducts = useMemo(
    () =>
      filterProducts({
        searchTerm,
        category: selectedCategory,
        skinType: selectedSkinType,
        skinConcern: selectedSkinConcern,
        cert: selectedCert,
      }),
    [searchTerm, selectedCategory, selectedSkinType, selectedSkinConcern, selectedCert]
  );

  // 필터·검색이 하나라도 걸려 있는가 — 0건일 때 안내 문구를 가른다
  const hasActiveFilters =
    selectedCategory !== '전체' ||
    selectedSkinType !== '' ||
    selectedSkinConcern !== '' ||
    selectedCert !== '' ||
    searchTerm.trim() !== '';

  // 관심상품 목록에 실제로 보여 줄 상품 — 하단 바로 담을 수 있는 히어로 기획세트까지 포함한다
  const HERO_WISH_ENTRY = {
    id: HERO_PRODUCT.id,
    name: '시카 엑소좀 수분 앰플 단독 리필 기획세트',
    price: HERO_PRODUCT.price,
    originalPrice: HERO_PRODUCT.originalPrice,
    imageUrl: HERO_PRODUCT.imageUrl,
    imageAlt: HERO_PRODUCT.imageAlt,
    optionText: '본품 50ml + 에코 리필 파우치 50ml 증정',
  };
  const wishlistProducts = [
    ...(wishlist.includes(HERO_PRODUCT.id) ? [HERO_WISH_ENTRY] : []),
    ...RANKING_PRODUCTS.filter((p) => wishlist.includes(p.id)).map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      imageUrl: p.imageUrl,
      imageAlt: p.imageAlt,
      optionText: p.subTitle || '단품 50ml',
    })),
  ];

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('전체');
    setSelectedSkinType('');
    setSelectedSkinConcern('');
    setSelectedCert('');
    setSearchTerm('');
    showToast('필터가 기본값으로 초기화되었습니다.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#141b2b] pb-20 lg:pb-0">
      {/* Toast Feedback */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* 1. Top Bar */}
      <TopBar
        onOpenDeliveryCheck={() => setIsDeliveryCheckOpen(true)}
        onOpenDiagnosis={() => setIsDiagnosisOpen(true)}
        onShowInfo={setInfoContent}
      />

      {/* 2. Main Header */}
      <Header
        wishlistCount={wishlist.length}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenDiagnosis={() => setIsDiagnosisOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onShowInfo={setInfoContent}
        onSearch={(term) => {
          setSearchTerm(term);
          if (term.trim()) {
            const hits = filterProducts({
              searchTerm: term,
              category: selectedCategory,
              skinType: selectedSkinType,
              skinConcern: selectedSkinConcern,
              cert: selectedCert,
            }).length;
            showToast(
              hits > 0
                ? `"${term}" 검색 결과 ${hits}건을 랭킹 목록에 반영했습니다.`
                : `"${term}" 조건에 맞는 예시 상품이 없습니다. 필터를 줄여 보세요.`,
              'info'
            );
          }
        }}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 3. Hero Runway & Skincare Spotlight */}
        <HeroSpotlight
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenClinicalReport={() => setIsClinicalReportOpen(true)}
        />

        {/* 4. 4-Tier Deep Skincare Filter HUD */}
        <FilterHUD
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedSkinType={selectedSkinType}
          setSelectedSkinType={setSelectedSkinType}
          selectedSkinConcern={selectedSkinConcern}
          setSelectedSkinConcern={setSelectedSkinConcern}
          selectedCert={selectedCert}
          setSelectedCert={setSelectedCert}
          onReset={handleResetFilters}
        />

        {/* 5. Real-time Ranking AWARDS */}
        <RankingAwards
          products={filteredProducts}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddProductToCart}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        {/* 6. Clean Ingredient & Formula Inspector */}
        <FormulaInspector />

        {/* 7. Deep Clinical Synergy Bundle Section */}
        <SynergyBundle onAddToCart={handleAddToCart} />

        {/* 8. Verified Reviews & Clean Beauty Assurance */}
        <ReviewsSection onOpenCounseling={() => setIsCounselingOpen(true)} />
      </main>

      {/* Persistent Mobile Bottom Sticky Interaction Bar */}
      <MobileStickyBar
        isHeroWished={wishlist.includes(HERO_PRODUCT.id)}
        onToggleHeroWish={() => handleToggleWishlist(HERO_PRODUCT.id)}
        onQuickBuy={() => {
          handleAddToCart({
            id: HERO_PRODUCT.id,
            name: '시카 엑소좀 수분 앰플 단독 리필 기획세트',
            price: HERO_PRODUCT.price,
            originalPrice: HERO_PRODUCT.originalPrice,
            imageUrl: HERO_PRODUCT.imageUrl,
            optionText: '본품 50ml + 에코 리필 파우치 50ml 증정',
          });
          setIsCartOpen(true);
        }}
        price={HERO_PRODUCT.price}
      />

      {/* 9. Rich Footer */}
      <Footer onOpenDeliveryCheck={() => setIsDeliveryCheckOpen(true)} onShowInfo={setInfoContent} />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlistProducts}
        onRemove={handleToggleWishlist}
        onAddToCart={(item) => {
          const full = wishlistProducts.find((p) => p.id === item.id);
          if (!full) return;
          handleAddToCart({
            id: full.id,
            name: full.name,
            price: full.price,
            originalPrice: full.originalPrice,
            imageUrl: full.imageUrl,
            optionText: full.optionText,
          });
        }}
      />

      <DiagnosisModal
        isOpen={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        onAddRecommendedToCart={(productIds) => {
          const picked = productIds
            .map((id) => RANKING_PRODUCTS.find((p) => p.id === id))
            .filter((p): p is Product => Boolean(p));
          picked.forEach((p) => handleAddProductToCart(p));
          setIsCartOpen(true);
          showToast(`진단 결과에 맞춘 ${picked.length}종이 장바구니에 담겼습니다.`, 'cart');
        }}
      />

      <ClinicalReportModal
        isOpen={isClinicalReportOpen}
        onClose={() => setIsClinicalReportOpen(false)}
      />

      <DeliveryCheckModal
        isOpen={isDeliveryCheckOpen}
        onClose={() => setIsDeliveryCheckOpen(false)}
      />

      <CounselingModal isOpen={isCounselingOpen} onClose={() => setIsCounselingOpen(false)} />

      <InfoDialog content={infoContent} onClose={() => setInfoContent(null)} />

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="luminous-lab"
        industry="commerce"
        featureName="장바구니 주문·결제"
      />
    </div>
  );
}
