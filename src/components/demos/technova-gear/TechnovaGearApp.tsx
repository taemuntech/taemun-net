'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

import { TopNavBar } from './components/TopNavBar';
import { SpecFilterHUD } from './components/SpecFilterHUD';
import {
  DEFAULT_FILTERS,
  computeFlagshipConfig,
  labelOf,
  type SpecFilterState,
} from './flagship-config';
import { HeroSpotlight } from './components/HeroSpotlight';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ProductBentoRack } from './components/ProductBentoRack';
import { ChassisIOMap } from './components/ChassisIOMap';
import { Footer } from './components/Footer';
import { ArchitectureViewerModal } from './components/Modals/ArchitectureViewerModal';
import { CartDrawer } from './components/Modals/CartDrawer';
import { CompareModal } from './components/Modals/CompareModal';
import { CheckoutModal } from './components/Modals/CheckoutModal';
import { InfoModal, type InfoModalContent } from './components/Modals/InfoModal';
import { SpecSheetModal, type SpecSheetData } from './components/Modals/SpecSheetModal';
import { INITIAL_PRODUCTS } from './data/hardwareData';
import { HardwareProduct, CartItem, PowerMode, ComparisonModel } from './types';

const CATEGORY_LABELS: Record<string, string> = {
  laptop: 'PC/노트북',
  display: '디스플레이',
  gear: '게이밍기어',
  audio: '오디오/음향',
};

/** 상품 → 상세 데이터시트. 값이 없는 칸은 아예 내보내지 않는다(빈 자리표시를 만들지 않기 위해). */
function toSpecSheet(product: HardwareProduct): SpecSheetData {
  const rows: SpecSheetData['rows'] = [];
  const push = (label: string, value?: string) => {
    if (value) rows.push({ label, value });
  };
  push('프로세서', product.specs.cpu);
  push('그래픽', product.specs.gpu);
  push('전력 한계', product.specs.tgp);
  push('메모리', product.specs.ram);
  push('저장장치', product.specs.storage);
  push('디스플레이', product.specs.display);
  push('쿨링', product.specs.cooling);
  push('무게/배터리', product.specs.weight);
  push('포트', product.specs.ports);
  rows.push({ label: '모델 코드', value: `SKU ${product.sku}` });

  return {
    id: product.id,
    title: product.name,
    badge: product.categoryName,
    subtitle: product.subtitle,
    image: product.image,
    price: product.discountPrice,
    originalPrice: product.originalPrice,
    discountRate: product.discountRate,
    rating: product.rating,
    reviewCount: product.reviewCount,
    chips: product.chips,
    rows,
    purchasable: true,
  };
}

/** 대조 매트릭스의 참고 모델 → 상세 데이터시트. 벤토 랙에 없는 모델은 장바구니에 담지 않는다. */
function comparisonToSpecSheet(model: ComparisonModel): SpecSheetData {
  return {
    id: model.id,
    title: model.name,
    badge: model.badge,
    price: Number(model.price.replace(/[^\d]/g, '')) || 0,
    rows: [
      { label: '프로세서', value: model.cpu, detail: model.cpuDetail },
      { label: '그래픽', value: model.gpu },
      { label: '디스플레이', value: model.display, detail: model.displayDetail },
      { label: '쿨링', value: model.cooling, detail: model.coolingDetail },
      { label: 'I/O', value: model.io },
      { label: '무게/배터리', value: model.weight },
      { label: '그래픽 점수', value: model.timeSpy, detail: `자체 랩 예시 점수 (${model.timeSpyTarget})` },
    ],
    purchasable: INITIAL_PRODUCTS.some((p) => p.id === model.id),
  };
}

export default function TechnovaGearApp({ isEmbed = false }: { isEmbed?: boolean }) {
  // Navigation & Search State
  // 'all' = 전체. 예전 기본값은 'laptop' 이었는데 판정에서 laptop 을 「필터 없음」으로 써서,
  // 「PC/노트북」 탭이 켜진 채 모니터·키보드·헤드셋까지 같이 나왔다(탭이 거짓말을 했다).
  const [activeCategory, setActiveCategory] = useState<string>('all');
  // 예전 기본값은 「TECHNOVA TITAN 16 PRO RTX 4080」 이었는데 이 말로는 아무 상품도 걸리지 않아
  // 검색이 조용히 전체 목록으로 되돌아갔다 — 검색이 죽은 것처럼 보이던 원인이다.
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Spec Filters — 플래그십 한 대의 구성. 가격·점수 계산은 flagship-config 한 곳에서만 한다.
  const [filters, setFilters] = useState<SpecFilterState>(DEFAULT_FILTERS);
  const flagshipConfig = useMemo(() => computeFlagshipConfig(filters), [filters]);

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
      specsSummary: '16코어 CPU / 외장 GPU 16GB / 32GB DDR5 / OLED 240Hz',
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
  const [infoContent, setInfoContent] = useState<InfoModalContent | null>(null);
  const [specSheet, setSpecSheet] = useState<SpecSheetData | null>(null);

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

  const showInfo = useCallback((content: InfoModalContent) => setInfoContent(content), []);

  // Filter Handler
  const handleFilterChange = <K extends keyof SpecFilterState>(key: K, value: SpecFilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // 「필터」가 아니라 「구성」이다 — 이 칩들은 목록을 거르지 않고 플래그십 한 대의 사양을 바꾼다.
    showToast(`플래그십 구성 변경 [${key.toUpperCase()}]: ${labelOf(key, value)}`);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    showToast('플래그십 구성이 기본값으로 되돌아갔습니다.');
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

  const handleAddToCartById = (id: string) => {
    const product = INITIAL_PRODUCTS.find((p) => p.id === id);
    if (product) handleAddToCart(product);
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
    // 가격은 flagship-config 한 곳에서만 계산한다 — 히어로·대조 매트릭스·주문서가 같은 값을 써야 한다.
    setCheckoutInfo({
      title: `TECHNOVA TITAN 16 PRO (${flagshipConfig.summary})`,
      price: flagshipConfig.price,
    });
    setIsCheckoutOpen(true);
  };

  /** 상세 데이터시트에서 바로 주문서로 — 그 화면에 적힌 이름·가격 그대로 넘긴다 */
  const handleBuyFromSpecSheet = () => {
    if (!specSheet) return;
    setCheckoutInfo({ title: specSheet.title, price: specSheet.price });
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

  /**
   * 벤토 랙에 보일 목록.
   * 예전에는 분류·검색에서 걸리는 게 없으면 **조용히 전체 목록으로 되돌아갔다** — 눌러도 화면이 그대로라
   * 필터가 죽은 것처럼 보였고, 실제로는 「없다」를 「전부」로 바꿔 보여 주는 거짓말이었다.
   * 이제는 걸러진 결과를 그대로 내주고, 0건이면 랙이 「없다」고 말한다.
   */
  const displayedProducts = useMemo(() => {
    const q = searchQuery.toLowerCase().replace(/#/g, '').trim();
    return INITIAL_PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.chips.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  // 'all' 은 전체 목록을 뜻하므로 「걸린 조건」으로 세지 않는다.
  const categoryLabel = activeCategory === 'all' ? null : CATEGORY_LABELS[activeCategory] ?? null;

  const handleResetBrowse = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  const handleSubmitSearch = () => {
    // 검색어는 입력과 동시에 이미 목록에 반영돼 있다 — 버튼은 그 결과로 데려다 준다.
    document.getElementById('curated-hardware-rack')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-[#0f131c] text-[#dfe2ee] min-h-screen flex flex-col font-body selection:bg-[#03b5d3] selection:text-[#001f26]">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-[var(--sample-bar-h,0px)] z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
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
        /* animate-fadeIn · animate-slideLeft 는 이 데모가 쓰는데 어디에도 정의가 없어
           지금까지 아무 효과도 나지 않았다(클래스만 붙어 있는 죽은 이름이었다). */
        @keyframes technovaFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes technovaSlideLeft {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fadeIn {
          animation: technovaFadeIn 0.2s ease-out both;
        }
        .animate-slideLeft {
          animation: technovaSlideLeft 0.25s ease-out both;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-slideLeft {
            animation: none;
          }
        }
      `}</style>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-4 lg:right-6 left-4 lg:left-auto z-[70] bg-[#181c24] border border-[#4cd7f6] text-[#dfe2ee] px-4 py-2.5 rounded-lg shadow-2xl flex items-center gap-2 text-xs font-label active-glow animate-fadeIn"
        >
          <span className="material-symbols-outlined text-[#4cd7f6] text-base shrink-0">info</span>
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
        onShowInfo={showInfo}
        onSubmitSearch={handleSubmitSearch}
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
          onShowInfo={showInfo}
        />

        {/* Side-by-Side Hardware Spec Comparison Matrix */}
        <ComparisonMatrix
          currentConfig={flagshipConfig}
          onSelectModel={(model: ComparisonModel) => setSpecSheet(comparisonToSpecSheet(model))}
          onInstantBuy={handleInstantBuyFlagship}
        />

        {/* Curated High-Tech Product Cards (4-Column Bento Hardware Rack) */}
        <ProductBentoRack
          products={displayedProducts}
          totalCount={INITIAL_PRODUCTS.length}
          categoryLabel={categoryLabel}
          searchQuery={searchQuery}
          onResetBrowse={handleResetBrowse}
          comparedIds={comparedProductIds}
          onToggleCompare={handleToggleCompare}
          onAddToCart={handleAddToCart}
          onViewProduct={(product) => setSpecSheet(toSpecSheet(product))}
        />

        {/* Interactive I/O Port & Cooling Architecture Inspector */}
        <ChassisIOMap />
      </main>

      {/* Footer */}
      <Footer onShowInfo={showInfo} />

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

      <SpecSheetModal
        data={specSheet}
        onClose={() => setSpecSheet(null)}
        onAddToCart={handleAddToCartById}
        onBuyNow={handleBuyFromSpecSheet}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productTitle={checkoutInfo.title}
        totalPrice={checkoutInfo.price}
      />

      <InfoModal content={infoContent} onClose={() => setInfoContent(null)} />
    </div>
  );
}
