"use client";


import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// 이 샘플의 색·글자 토큰. 저장소 어디에도 정의가 없어서 화면이 통째로 흰 바탕으로 렌더되고 있었다
// (자세한 사정은 theme.css 머리말).
import './theme.css';
import { FLAGSHIP_PRODUCT, PRODUCTS } from './data/products';
import { Product, CartItem, FilterState } from './types';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { HeroExpedition } from './components/HeroExpedition';
import { GearShowcase } from './components/GearShowcase';
import { BlueprintSimulator } from './components/BlueprintSimulator';
import { FieldServiceAssurance } from './components/FieldServiceAssurance';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WeatherHUDModal } from './components/WeatherHUDModal';
import { SearchHUDModal } from './components/SearchHUDModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderModal } from './components/OrderModal';
import { CompareModal } from './components/CompareModal';

interface NordicPeakAppProps {
  isEmbed?: boolean;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  season: 'all',
  capacity: 'all',
  pole: 'all',
  fabric: 'all',
};

export default function NordicPeakApp({ isEmbed }: NordicPeakAppProps = {}) {
  void isEmbed; // 틀(embed) 여부는 바깥 래퍼가 판단한다 — 화면 구성은 같다

  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 1 },
    { product: PRODUCTS[3], quantity: 1 },
  ]);

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchSeed, setSearchSeed] = useState<string>('');
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [orderTargetProduct, setOrderTargetProduct] = useState<Product | null>(FLAGSHIP_PRODUCT);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Command/Ctrl + K 로 검색 HUD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchSeed('');
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`「${product.title}」 장비를 기어백에 담았습니다.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('장비를 기어백에서 뺐습니다.');
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => setFilters(DEFAULT_FILTERS);

  const goToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectNav = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
    goToSection('gear-showcase');
  };

  const handleTagClick = (tag: string) => {
    setSearchSeed(tag);
    setIsSearchOpen(true);
  };

  const openSearch = () => {
    setSearchSeed('');
    setIsSearchOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);

  // 고른 조건이 실제로 목록을 거른다. 상품의 season 이 'all' 이면 어느 계절 조건에도 걸린다.
  const displayedProducts = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        if (filters.category !== 'all' && p.category !== filters.category) return false;
        if (filters.season !== 'all' && p.season !== 'all' && p.season !== filters.season) return false;
        if (filters.capacity !== 'all' && p.capacity !== filters.capacity) return false;
        if (filters.pole !== 'all' && p.pole !== filters.pole) return false;
        if (filters.fabric !== 'all' && p.fabric !== filters.fabric) return false;
        return true;
      }),
    [filters],
  );

  return (
    <div
      id="np-root"
      className="min-h-screen bg-background text-on-surface flex flex-col font-body-md text-body-md"
    >
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWeather={() => setIsWeatherOpen(true)}
        onOpenSearch={openSearch}
        activeNav={filters.category}
        onSelectNav={handleSelectNav}
        onTagClick={handleTagClick}
      />

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        resultCount={displayedProducts.length}
      />

      <main className="flex-grow">
        <HeroExpedition
          onOrderNow={() => {
            setOrderTargetProduct(FLAGSHIP_PRODUCT);
            setIsOrderOpen(true);
          }}
          onOpenPitchingGuide={() => goToSection('dimension-sim')}
          onCompare={() => setIsCompareOpen(true)}
          isComparing={isCompareOpen}
        />

        <div id="gear-showcase" className="scroll-mt-20">
          <GearShowcase
            products={displayedProducts}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onResetFilters={handleResetFilters}
          />
        </div>

        <BlueprintSimulator />

        <FieldServiceAssurance />
      </main>

      <Footer
        onSelectCategory={handleSelectNav}
        onGoToSection={goToSection}
        onOpenSearch={openSearch}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setOrderTargetProduct(null);
          setIsOrderOpen(true);
        }}
      />

      <WeatherHUDModal isOpen={isWeatherOpen} onClose={() => setIsWeatherOpen(false)} />

      <SearchHUDModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        initialQuery={searchSeed}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onOrderNow={(p) => {
          setSelectedProduct(null);
          setOrderTargetProduct(p);
          setIsOrderOpen(true);
        }}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        product={orderTargetProduct}
        totalPrice={orderTargetProduct ? orderTargetProduct.price : cartTotalPrice}
        itemCount={orderTargetProduct ? 1 : totalCartCount}
      />

      {/* 담기 알림 — 브라우저 기본 경고창 대신 화면 안 토스트 */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-sm z-[60] bg-surface-container-high border border-primary text-on-surface px-4 py-3 rounded-sm shadow-2xl flex items-center gap-2 font-label-mono-sm text-label-mono-sm"
        >
          <span className="material-symbols-outlined text-primary shrink-0" style={{ fontSize: 18 }}>
            check_circle
          </span>
          <span className="[word-break:keep-all]">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
