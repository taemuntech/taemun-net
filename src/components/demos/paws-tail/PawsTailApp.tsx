"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { HeroSection } from './components/HeroSection';
import { NutritionProfiler } from './components/NutritionProfiler';
import { ProductGrid } from './components/ProductGrid';
import { KibbleGuide } from './components/KibbleGuide';
import { ClinicalReviews } from './components/ClinicalReviews';
import { SubscriptionBanner } from './components/SubscriptionBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { TriageModal } from './components/TriageModal';
import { ReportModal } from './components/ReportModal';
import { CalculatorModal } from './components/CalculatorModal';
import { InfoModal } from './components/InfoModal';

import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data';
import { CartItem, PetSpecies, Product, ProfilerState } from './types';

interface PawsTailAppProps {
  isEmbed?: boolean;
}

export default function PawsTailApp({ isEmbed }: PawsTailAppProps = {}) {
  // Navigation & Search
  // 'custom-diet' 는 카테고리 표에 없는 값이라 상단 탭이 아무것도 안 켜져 있었다 — 'all' 이 기본이다
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTriageOpen, setIsTriageOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isPerksOpen, setIsPerksOpen] = useState<boolean>(false);
  const [activeReportState, setActiveReportState] = useState<{
    profilerState: ProfilerState;
    dailyGrams: number;
  } | null>(null);

  // Cart State (Initialized with the signature salmon recipe)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: INITIAL_PRODUCTS[0],
      quantity: 1,
      isSubscription: true,
    },
  ]);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(['prod-1']);

  // Filters
  const [lifeStage, setLifeStage] = useState<string>('all');
  const [clinicalTarget, setClinicalTarget] = useState<string>('all');
  const [freeFromFilters, setFreeFromFilters] = useState<string[]>([]);

  const handleToggleFreeFrom = (filter: string) => {
    setFreeFromFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleResetFilters = () => {
    setLifeStage('all');
    setClinicalTarget('all');
    setFreeFromFilters([]);
  };

  // Filtered Products
  //
  // ⚠️ 예전에는 이 목록이 **언제나 빈 배열**이었다: 상품 데이터에 lifeStage·clinicalTarget 이 아예 없었고
  //    free-from 칩은 어느 상품에도 없는 태그('단일단백질'·'그레인프리')를 찾고 있었다. 그래도 화면은
  //    멀쩡해 보였는데, 아래 ProductGrid 가 «비면 전체 목록»으로 되돌리고 있었기 때문이다 — 즉 필터가
  //    죽은 채로 「누르면 아무 일도 안 일어나는」 상태였다. 이제는 상품 필드로 판정하고, 0건이면 0건을 보여 준다.
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      // Category tab (상단 내비게이션)
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }

      // Search query filter
      //
      // 낱말 단위로 «하나라도» 걸리면 통과시킨다. 헤더의 인기태그가 「슬개골 글루코사민」처럼 두 낱말인데,
      // 통문자열로만 찾으면 다섯 개 중 넷이 결과 0건으로 떨어졌다(상품명·태그에 그 조합이 그대로는 없다).
      if (searchQuery.trim()) {
        const haystack = [prod.name, prod.badge, prod.subBadge, prod.kibbleBadge, ...prod.tags]
          .join(' ')
          .toLowerCase();
        const tokens = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
        if (!tokens.some((token) => haystack.includes(token))) return false;
      }

      // Life stage filter — 'allStage' 상품은 어떤 생애주기에도 걸린다
      if (lifeStage !== 'all' && prod.lifeStage !== lifeStage && prod.lifeStage !== 'allStage') {
        return false;
      }

      // Clinical target filter
      if (clinicalTarget !== 'all' && prod.clinicalTarget !== clinicalTarget) {
        return false;
      }

      // Free-from filter
      if (freeFromFilters.includes('no-chicken') && !prod.chickenFree) {
        return false;
      }
      if (freeFromFilters.includes('grain-free') && !prod.grainFree) {
        return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, lifeStage, clinicalTarget, freeFromFilters]);

  const isFilterActive =
    activeCategory !== 'all' ||
    searchQuery.trim().length > 0 ||
    lifeStage !== 'all' ||
    clinicalTarget !== 'all' ||
    freeFromFilters.length > 0;

  const handleResetAll = () => {
    handleResetFilters();
    setActiveCategory('all');
    setSearchQuery('');
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, isSub = false) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, isSubscription: isSub }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleToggleSubscription = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, isSubscription: !item.isSubscription }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorites handler
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Prescription handler from AI Profiler
  const handleAddPrescriptionToCart = (prescription: {
    name: string;
    dailyGrams: number;
    price: number;
    species: PetSpecies;
  }) => {
    const customProduct: Product = {
      id: `prescription-${Date.now()}`,
      name: prescription.name,
      category: prescription.species === 'cat' ? 'cat' : 'dog',
      badge: 'AI 처방식',
      subBadge: `${prescription.dailyGrams}g/일 권장`,
      badgeType: prescription.species === 'cat' ? 'cat' : 'primary',
      kibbleBadge: '8mm 맞춤소형',
      image:
        prescription.species === 'cat'
          ? INITIAL_PRODUCTS[2].image
          : INITIAL_PRODUCTS[0].image,
      rating: 5.0,
      reviewCount: 312,
      tags: ['임상처방', '수의사조제', '맞춤식단'],
      price: prescription.price,
      originalPrice: Math.round(prescription.price / 0.85),
      discountRate: 15,
      unitPrice: `(100g당 약 ₩${Math.round(prescription.price / 15)}원)`,
      lifeStage: 'adult',
      clinicalTarget: 'joints',
      allergySafe: true,
    };

    handleAddToCart(customProduct, true);
  };

  const handleOpenReportModal = (profilerState: ProfilerState, dailyGrams: number) => {
    setActiveReportState({ profilerState, dailyGrams });
    setIsReportOpen(true);
  };

  const handleStartSubscription = () => {
    const profilerEl = document.getElementById('profiler');
    if (profilerEl) {
      profilerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 저장소 규칙상 alert() 는 쓰지 않는다 — 같은 내용을 이 데모의 모달로 보여 준다
  const handleViewPerks = () => {
    setIsPerksOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#121c2a] selection:bg-[#b1f0ce] selection:text-[#0f5238]">
      {/* 1. Sticky Veterinary Header with Search, Announcement Ticker & Cart Counter */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTriage={() => setIsTriageOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoriteCount={favorites.length}
        subscriptionCount={cartItems.filter((item) => item.isSubscription).length}
      />

      {/* 2. Quick Nutritional Filter Pills */}
      <FilterBar
        lifeStage={lifeStage}
        onSelectLifeStage={setLifeStage}
        clinicalTarget={clinicalTarget}
        onSelectClinicalTarget={setClinicalTarget}
        freeFromFilters={freeFromFilters}
        onToggleFreeFrom={handleToggleFreeFrom}
        onResetFilters={handleResetFilters}
      />

      <main className="flex-1 flex flex-col">
        {/* 3. Hero Editorial Section with Clinical Badges & Product Showcase */}
        <HeroSection onStartSubscription={handleStartSubscription} />

        {/* 4. AI Veterinary Nutrition Profiler (Interactive 3-Step Calculator) */}
        <NutritionProfiler
          onAddPrescriptionToCart={handleAddPrescriptionToCart}
          onOpenReportModal={handleOpenReportModal}
        />

        {/* 5. Clinical Signature Diet & Prescription Product Grid */}
        <ProductGrid
          products={filteredProducts}
          totalCount={INITIAL_PRODUCTS.length}
          isFilterActive={isFilterActive}
          onResetFilters={handleResetAll}
          onAddToCart={(prod) => handleAddToCart(prod, false)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 6. Kibble Scale Comparison & 1-Day Feeding Dosage Guide */}
        <KibbleGuide onOpenCalculator={() => setIsCalculatorOpen(true)} />

        {/* 7. Clinical Reviews & Specialist Doctor Endorsement */}
        <ClinicalReviews reviews={INITIAL_REVIEWS} />

        {/* 8. VIP Subscription Callout Banner */}
        <SubscriptionBanner
          onStartSubscription={handleStartSubscription}
          onViewPerks={handleViewPerks}
        />
      </main>

      {/* 9. 푸터 — 고지·표기 자리(전부 예시)와 열리는 안내 모달 5종 */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleSubscription={handleToggleSubscription}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Vet Online Triage Modal */}
      <TriageModal isOpen={isTriageOpen} onClose={() => setIsTriageOpen(false)} />

      {/* Nutritional PDF Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        profilerState={activeReportState?.profilerState || null}
        dailyGrams={activeReportState?.dailyGrams || 70}
      />

      {/* Precise Calorie & Feeding Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* 정기구독 혜택 안내 — 예전에는 브라우저 기본 경고창이었다 */}
      <InfoModal
        isOpen={isPerksOpen}
        onClose={() => setIsPerksOpen(false)}
        eyebrow="정기구독 혜택 안내"
        title="PAWS & TAIL VET 정기구독으로 달라지는 것"
        lead="아래 혜택 구성은 화면을 보여 주기 위한 예시입니다."
        sections={[
          {
            heading: '구독 유지 기간 15% 추가 할인',
            body: '구독을 유지하는 동안 정가 대비 15% 를 더 깎아 드리는 구성입니다. 장바구니에서 상품별로 구독을 켜고 끌 수 있고, 켜는 즉시 합계에 반영됩니다.',
          },
          {
            heading: '배송 주기 2주 / 4주 / 6주 선택 · 건너뛰기',
            body: '남은 사료량에 맞춰 주기를 바꾸거나 이번 회차만 건너뛸 수 있는 구성입니다. 발송 전 알림을 보내 드립니다.',
          },
          {
            heading: '분기별 영양 차트 갱신 (예시)',
            body: '체중·생애주기·건강 고민이 바뀌면 AI 영양 프로파일러로 급여량을 다시 계산해 처방 리포트를 갱신하는 구성입니다.',
          },
          {
            heading: '제조 후 빠른 출고',
            body: '소량 생산 후 재고를 길게 쌓아 두지 않고 출고하는 운영을 가정한 구성입니다. 실제 배송 일정은 계약 조건에 따라 달라집니다.',
          },
        ]}
      />
    </div>
  );
}
