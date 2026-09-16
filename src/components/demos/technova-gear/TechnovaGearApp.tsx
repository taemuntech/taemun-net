'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

import { TopNavBar } from './components/TopNavBar';
import { SpecFilterHUD, SpecFilterState } from './components/SpecFilterHUD';
import { HeroSpotlight } from './components/HeroSpotlight';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ProductBentoRack } from './components/ProductBentoRack';
import { ChassisIOMap } from './components/ChassisIOMap';
import { Footer } from './components/Footer';
import { ArchitectureViewerModal } from './components/Modals/ArchitectureViewerModal';
import { CartDrawer } from './components/Modals/CartDrawer';
import { CompareModal } from './components/Modals/CompareModal';
import { CheckoutModal } from './components/Modals/CheckoutModal';
import { INITIAL_PRODUCTS, COMPARISON_MODELS } from './data/hardwareData';
import { HardwareProduct, CartItem, PowerMode, ComparisonModel } from './types';

const DEFAULT_FILTERS: SpecFilterState = {
  segment: '게이밍 랩탑',
  gpu: 'RTX 4080',
  cpu: 'Ultra 9 185H',
  display: 'OLED 240Hz',
  ram: '32GB DDR5',
};

export default function TechnovaGearApp({ isEmbed = false }: { isEmbed?: boolean }) {
  // Navigation & Search State
  const [activeCategory, setActiveCategory] = useState<string>('laptop');
  const [searchQuery, setSearchQuery] = useState<string>('TECHNOVA TITAN 16 PRO RTX 4080');

  // Spec Filters
  const [filters, setFilters] = useState<SpecFilterState>(DEFAULT_FILTERS);

  // Power Mode for flagship
  const [powerMode, setPowerMode] = useState<PowerMode>('turbo');

  // Cart State (Initialized with 2 items to match the user screenshot badge '2')
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      productId: 'titan-16-pro',
      name: '테크노바 타이탄 16 프로 G-EDITION',
      sku: 'TITAN-16',
      image: INITIAL_PRODUCTS[0].image,
      price: 2890000,
      quantity: 1,
      specsSummary: 'Ultra 9 185H / RTX 4080 16GB / 32GB DDR5 / OLED 240Hz',
    },
    {
      id: 'cart-2',
      productId: 'mag-alu75',
      name: '래피드 트리거 풀알루미늄 무선 키보드',
      sku: 'MAG-ALU75',
      image: INITIAL_PRODUCTS[2].image,
      price: 249000,
      quantity: 1,
      specsSummary: '자석축 홀센서 0.02mm 스트로크 조절 / 무선 2.4G',
    },
  ]);

  // Comparison IDs (Initialized with 3 items to match user screenshot badge '3')
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([
    'titan-16-pro',
    'qd-oled-32',
    'mag-alu75',
  ]);

  // Modals
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Active checkout target
  const [checkoutInfo, setCheckoutInfo] = useState<{ title: string; price: number }>({
    title: '테크노바 타이탄 16 프로 G-EDITION',
    price: 2890000,
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Filter Handler
  const handleFilterChange = <K extends keyof SpecFilterState>(key: K, value: SpecFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    showToast(`스펙 필터 [${key.toUpperCase()}]: ${value} 적용`);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('스펙 필터가 기본 엔지니어링 값으로 초기화되었습니다.');
  };

  // Cart Handlers
  const handleAddToCart = (product: HardwareProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) => (i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          productId: product.id,
          name: product.name,
          sku: product.sku,
          image: product.image,
          price: product.discountPrice,
          quantity: 1,
          specsSummary: product.subtitle,
        },
      ];
    });
    showToast(`장바구니에 [${product.name}]이(가) 추가되었습니다.`);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('장바구니에서 상품이 제거되었습니다.');
  };

  // Compare Handlers
  const handleToggleCompare = (id: string) => {
    setComparedProductIds((prev) => {
      if (prev.includes(id)) {
        showToast('대조 매트릭스에서 상품이 제외되었습니다.');
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 4) {
        showToast('비교 매트릭스는 최대 4개까지 동시에 가능합니다.');
        return prev;
      }
      showToast('대조 매트릭스에 상품이 추가되었습니다.');
      return [...prev, id];
    });
  };

  // Instant Checkout Trigger
  const handleInstantBuyFlagship = () => {
    // calculate price based on filters
    let price = 2890000;
    if (filters.gpu === 'RTX 4090') price = 3490000;
    else if (filters.gpu === '4070 Ti') price = 2490000;
    else if (filters.gpu === 'RX 7900') price = 2650000;
    if (filters.ram === '64GB') price += 250000;
    else if (filters.ram === '16GB') price -= 120000;

    setCheckoutInfo({
      title: `TECHNOVA TITAN 16 PRO (${filters.cpu} / ${filters.gpu} / ${filters.ram})`,
      price,
    });
    setIsCheckoutOpen(true);
  };

  const handleCartProceedCheckout = () => {
    const total = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    setCheckoutInfo({
      title: `테크노바 장바구니 통합 주문 (${cartItems.length}개 품목)`,
      price: total,
    });
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Comparison products
  const comparedProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((p) => comparedProductIds.includes(p.id));
  }, [comparedProductIds]);

  // Filtered Products for Bento Rack based on search or category
  const displayedProducts = useMemo(() => {
    let list = INITIAL_PRODUCTS;
    if (activeCategory !== 'laptop') {
      const match = list.filter((p) => p.category === activeCategory);
      if (match.length > 0) list = match;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().replace('#', '').trim();
      const filtered = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.chips.some((c) => c.toLowerCase().includes(q))
      );
      if (filtered.length > 0) return filtered;
    }
    return list;
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#0f131c] text-[#dfe2ee] min-h-screen flex flex-col font-body selection:bg-[#03b5d3] selection:text-[#001f26]">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-0 z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/#category-ecommerce"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>갤러리 아카이브로 돌아가기</span>
            </Link>
            <span className="text-zinc-600 hidden lg:inline">|</span>
            <span className="text-zinc-400 hidden lg:inline font-mono">
              [쇼핑몰 04] 테크노바 기어 (TECHNOVA GEAR) — 디지털 가전 &amp; 하이테크 하드웨어
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=technova-gear"
              className="px-3 py-1 rounded bg-[#06b6d4] hover:bg-[#0891b2] text-zinc-950 font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 쇼핑몰 구축 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Embedded Technova Gear CSS Styles */}
      <style jsx global>{`
        .spec-hairline {
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
        }
        .active-glow {
          box-shadow: 0 0 0 1px #03b5d3, 0 0 14px rgba(3, 181, 211, 0.35);
        }
        .orange-glow {
          box-shadow: 0 0 16px rgba(236, 106, 6, 0.45);
        }
        .hardware-mesh {
          background-image: radial-gradient(rgba(77, 142, 255, 0.08) 1px, transparent 0);
          background-size: 20px 20px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181c24] border border-[#4cd7f6] text-[#dfe2ee] px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 text-xs font-label active-glow animate-fadeIn">
          <span className="material-symbols-outlined text-[#4cd7f6] text-base">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <TopNavBar
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        compareCount={comparedProductIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpen3DModal={() => setIs3DModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Deep Engineering Subcategory & Parametric Spec Filter HUD */}
      <SpecFilterHUD
        filters={filters}
        onChangeFilter={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-6 py-6 lg:py-8 flex flex-col gap-8 lg:gap-10">
        {/* Hero Flagship Spotlight Bay */}
        <HeroSpotlight
          filters={filters}
          powerMode={powerMode}
          onPowerModeChange={setPowerMode}
          onInstantBuy={handleInstantBuyFlagship}
          onOpen3DModal={() => setIs3DModalOpen(true)}
          isCompared={comparedProductIds.includes('titan-16-pro')}
          onToggleCompare={() => handleToggleCompare('titan-16-pro')}
        />

        {/* Side-by-Side Danawa-Style Hardware Spec Comparison Matrix */}
        <ComparisonMatrix
          onSelectModel={(model: ComparisonModel) => {
            showToast(`[${model.name}] 세부 텔레메트리 스펙 로드 완료`);
          }}
          onInstantBuy={handleInstantBuyFlagship}
        />

        {/* Curated High-Tech Product Cards (4-Column Bento Hardware Rack) */}
        <ProductBentoRack
          products={displayedProducts}
          comparedIds={comparedProductIds}
          onToggleCompare={handleToggleCompare}
          onAddToCart={handleAddToCart}
          onViewProduct={(product) => {
            showToast(`[${product.name}] 제품 상세 데이터시트 조회`);
          }}
        />

        {/* Interactive I/O Port & Cooling Architecture Inspector */}
        <ChassisIOMap />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ArchitectureViewerModal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={handleCartProceedCheckout}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={comparedProducts}
        onRemoveFromCompare={handleToggleCompare}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productTitle={checkoutInfo.title}
        totalPrice={checkoutInfo.price}
      />
    </div>
  );
}
