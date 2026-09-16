'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

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
import { Toast } from './components/Toast';
import { RANKING_PRODUCTS, HERO_PRODUCT } from './data/mockData';
import { CartItem, Product, ToastInfo } from './types';

export default function LuminousLabApp({ isEmbed = false }: { isEmbed?: boolean }) {
  // Wishlist state: initial seed includes 14 items to match design mockup
  const [wishlist, setWishlist] = useState<string[]>([
    'prod-1',
    'prod-3',
    'wished-1',
    'wished-2',
    'wished-3',
    'wished-4',
    'wished-5',
    'wished-6',
    'wished-7',
    'wished-8',
    'wished-9',
    'wished-10',
    'wished-11',
    'wished-12',
  ]);

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

  // Filter States matching the initial visual highlight in the screenshot
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('수부지 (수분부족지성)');
  const [selectedSkinConcern, setSelectedSkinConcern] = useState<string>('장벽강화/보습');
  const [selectedCert, setSelectedCert] = useState<string>('');

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Active navigation tab
  const [activeNav, setActiveNav] = useState<string>('실시간 랭킹');

  // Modals visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
  const [isClinicalReportOpen, setIsClinicalReportOpen] = useState(false);
  const [isDeliveryCheckOpen, setIsDeliveryCheckOpen] = useState(false);
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<ToastInfo | null>(null);

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

  // Checkout action
  const handleCheckout = () => {
    setIsCartOpen(false);
    showToast(
      '주문이 성공적으로 접수되었습니다! 오늘 저녁 8시 전 오늘드림 배송이 진행됩니다.',
      'success'
    );
  };

  // Filtered Products computation
  const filteredProducts = useMemo(() => {
    return RANKING_PRODUCTS.filter((prod) => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(term);
        const matchesDesc = prod.subTitle?.toLowerCase().includes(term);
        const matchesBadges = prod.badges.some((b) => b.toLowerCase().includes(term));
        if (!matchesName && !matchesDesc && !matchesBadges) return false;
      }

      // Category
      if (selectedCategory !== '전체') {
        if (!prod.category.includes(selectedCategory)) return false;
      }

      // Skin type
      if (selectedSkinType) {
        const matchesType = prod.skinType.some((st) => st.includes(selectedSkinType));
        if (!matchesType) return false;
      }

      // Skin concern
      if (selectedSkinConcern) {
        const matchesConcern = prod.skinConcern.some((sc) => sc.includes(selectedSkinConcern));
        if (!matchesConcern) return false;
      }

      // Certification
      if (selectedCert) {
        const matchesCert = prod.certifications.some((cert) => cert.includes(selectedCert));
        if (!matchesCert) return false;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedSkinType, selectedSkinConcern, selectedCert]);

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
      />

      {/* 2. Main Header */}
      <Header
        wishlistCount={wishlist.length}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenDiagnosis={() => setIsDiagnosisOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          showToast(`현재 관심상품에 ${wishlist.length}개 상품이 등록되어 있습니다.`, 'info');
        }}
        onSearch={(term) => {
          setSearchTerm(term);
          if (term) {
            showToast(`"${term}" 검색 결과를 불러왔습니다.`, 'info');
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
          products={filteredProducts.length > 0 ? filteredProducts : RANKING_PRODUCTS}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddProductToCart}
        />

        {/* 6. EWG Clean Ingredient & Formula Inspector */}
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
      <Footer onOpenDeliveryCheck={() => setIsDeliveryCheckOpen(true)} />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <DiagnosisModal
        isOpen={isDiagnosisOpen}
        onClose={() => setIsDiagnosisOpen(false)}
        onAddRecommendedToCart={(names) => {
          RANKING_PRODUCTS.slice(0, 2).forEach((p) => handleAddProductToCart(p));
          setIsCartOpen(true);
          showToast('진단 처방에 따른 맞춤 솔루션 2종이 장바구니에 담겼습니다.', 'cart');
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

      <CounselingModal
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
        onSubmitInquiry={(msg) => {
          showToast('1:1 전문가 상담 문의가 정상적으로 등록되었습니다.', 'success');
        }}
      />
    </div>
  );
}
