"use client";

import SampleNotice from '@/components/demo-kit/SampleNotice';

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
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

export default function NordicPeakApp({ isEmbed }: NordicPeakAppProps = {}) {
  // Initial cart with 3 items matching screenshot badge "3"
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 1 },
    { product: PRODUCTS[3], quantity: 1 },
  ]);

  // Filter state matching default selected tags in design
  const [filters, setFilters] = useState<FilterState>({
    category: 'shelter',
    season: 'winter',
    capacity: '4',
    pole: 'dac',
    fabric: '70d',
  });

  const [activeNav, setActiveNav] = useState<string>('shelter');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [orderTargetProduct, setOrderTargetProduct] = useState<Product | null>(PRODUCTS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);

  // Keyboard shortcut for Command+K (search HUD)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`'${product.title}' 장비가 기어백에 추가되었습니다.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('장비가 기어백에서 제거되었습니다.');
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      season: 'all',
      capacity: '4',
      pole: 'dac',
      fabric: '70d',
    });
  };

  const handleSelectNav = (category: string) => {
    setActiveNav(category);
    setFilters((prev) => ({ ...prev, category }));
    const showcase = document.getElementById('gear-showcase');
    showcase?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTagClick = (tag: string) => {
    setIsSearchOpen(true);
  };

  const handleOrderHero = () => {
    setOrderTargetProduct(PRODUCTS[0]);
    setIsOrderOpen(true);
  };

  const handlePitchingGuide = () => {
    const el = document.getElementById('dimension-sim');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products: by category or show full flagship lineup
  const displayedProducts = PRODUCTS.filter((p) => {
    if (filters.category === 'all') return true;
    if (filters.category === 'shelter') return true; // Show full flagship 4-card lineup
    return p.category === filters.category;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md selection:bg-tertiary-container selection:text-on-tertiary">
      {/* 1 & 2. Header & Live Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWeather={() => setIsWeatherOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onTagClick={handleTagClick}
      />

      {/* 3. 4-Tier Deep Category HUD & Tactical Attribute Filter */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* 4. Expedition Field Test Spotlight (Hero Section) */}
        <HeroExpedition
          onOrderNow={handleOrderHero}
          onOpenPitchingGuide={handlePitchingGuide}
          onCompare={() => setIsCompareOpen(true)}
          isComparing={isCompareOpen}
        />

        {/* 5. Technical Gear Showcase (4-Column Grid) */}
        <div id="gear-showcase">
          <GearShowcase
            products={displayedProducts.length > 0 ? displayedProducts : PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        </div>

        {/* 6. Interactive Tent Dimension & Pitching Simulator Section */}
        <BlueprintSimulator />

        {/* Field Service & Assurance Banners */}
        <FieldServiceAssurance />
      </main>

      {/* 7. Trust & Expedition Assurance Footer */}
      <Footer />

      {/* Slide-over Gear Bag Cart Drawer */}
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

      {/* Weather Telemetry HUD Modal */}
      <WeatherHUDModal isOpen={isWeatherOpen} onClose={() => setIsWeatherOpen(false)} />

      {/* Command-K Search HUD Modal */}
      <SearchHUDModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Product Spec Detail Modal */}
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

      {/* Gear Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* Quick Dispatch Order Modal */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        product={orderTargetProduct}
        totalPrice={
          orderTargetProduct
            ? orderTargetProduct.price
            : cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0)
        }
        itemCount={orderTargetProduct ? 1 : totalCartCount}
        onSuccess={() => {
          setSampleNoticeOpen(true);
        }}
      />

      {/* Tactical Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-container-high border border-primary text-on-surface px-4 py-3 rounded-sm shadow-2xl flex items-center gap-2 font-label-mono-sm text-label-mono-sm animate-bounce">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 18 }}>
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="nordic-peak"
        industry="commerce"
        featureName="익스페디션 장비 특급 출고"
      />
    </div>
  );
}