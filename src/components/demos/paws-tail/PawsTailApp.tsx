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

import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from './data';
import { CartItem, PetSpecies, Product, ProfilerState } from './types';

interface PawsTailAppProps {
  isEmbed?: boolean;
}

export default function PawsTailApp({ isEmbed }: PawsTailAppProps = {}) {
  // Navigation & Search
  const [activeCategory, setActiveCategory] = useState<string>('custom-diet');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTriageOpen, setIsTriageOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
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
  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((prod) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesTags = prod.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesTags) return false;
      }

      // Life stage filter
      if (lifeStage !== 'all' && prod.lifeStage !== lifeStage) {
        return false;
      }

      // Clinical target filter
      if (clinicalTarget !== 'all' && prod.clinicalTarget !== clinicalTarget) {
        return false;
      }

      // Free-from filter
      if (freeFromFilters.includes('no-chicken') && !prod.tags.includes('단일단백질')) {
        return false;
      }
      if (freeFromFilters.includes('grain-free') && !prod.tags.includes('그레인프리')) {
        return false;
      }

      return true;
    });
  }, [searchQuery, lifeStage, clinicalTarget, freeFromFilters]);

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

  const handleViewPerks = () => {
    alert(
      'PAWS & TAIL VET VIP 혜택 안내 (예시):\n\n' +
        '1. 평생 15% 추가 할인 혜택 적용\n' +
        '2. 배송 주기(2주/4주/6주) 자유 설정 및 건너뛰기 지원\n' +
        '3. 매 분기 수의학 전문의 1:1 건강 차트 갱신 (예시)\n' +
        '4. 신선 제조 후 3일 이내 초신선 신속 배송 (예시)'
    );
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
          products={filteredProducts.length > 0 ? filteredProducts : INITIAL_PRODUCTS}
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

      {/* 9. Certified Footer with Legal & Licensing Disclosures */}
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
    </div>
  );
}
