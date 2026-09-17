'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSpatialTour } from './components/HeroSpatialTour';
import { FilterBar } from './components/FilterBar';
import { ProductGrid } from './components/ProductGrid';
import { FloorplanSimulator } from './components/FloorplanSimulator';
import { ShowroomSection } from './components/ShowroomSection';
import { Footer } from './components/Footer';
import { BundleDrawer } from './components/BundleDrawer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShowroomModal } from './components/ShowroomModal';
import { PolicyModal, type PolicyTopic } from './components/PolicyModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Toast } from './components/Toast';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

interface MaisonArchitectAppProps {
  isEmbed?: boolean;
}

export default function MaisonArchitectApp({ isEmbed = false }: MaisonArchitectAppProps) {
  // Lighting mood: 'day' (5000K) or 'night' (3000K)
  const [lightingMood, setLightingMood] = useState<'day' | 'night'>('day');
  const [noticeFeature, setNoticeFeature] = useState<string | null>(null);

  // Initial cart with 2 items as in original design
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: PRODUCTS[0], // Sofa
      selectedColor: '바닐라 크림',
      quantity: 1
    },
    {
      id: 'cart-init-2',
      product: PRODUCTS[2], // Table
      selectedColor: '로마노 트래버틴',
      quantity: 1
    }
  ]);

  // Initial wishlist with 3 items as in original design
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    'sofa',
    'dining-table',
    'lamp'
  ]);

  // Filters and search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // 예전 기본값은 ['boucle'] 이었는데, 부클레 상품이 소파 하나뿐이라 첫 화면의 「마스터피스 컬렉션」에
  // 4종 중 1종만 보였다. 기본은 필터 없음으로 두고, 소재 칩은 눌렀을 때 걸러지는 것을 보여 준다.
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals and Drawers
  const [isBundleDrawerOpen, setIsBundleDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isShowroomModalOpen, setIsShowroomModalOpen] = useState(false);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [policyTopic, setPolicyTopic] = useState<PolicyTopic | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  const handleToggleLighting = () => {
    if (lightingMood === 'day') {
      setLightingMood('night');
      showToast('3000K 은은한 간접조명 나이트 무드로 전환되었습니다.');
    } else {
      setLightingMood('day');
      showToast('자연광 5000K 주광색 무드로 전환되었습니다.');
    }
  };

  const handleSetLightingMood = (mood: 'day' | 'night') => {
    setLightingMood(mood);
    if (mood === 'night') {
      showToast('3000K 은은한 간접조명 나이트 무드로 전환되었습니다.');
    } else {
      showToast('자연광 5000K 주광색 무드로 전환되었습니다.');
    }
  };

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedMaterials([]);
    setSearchQuery('');
  }, []);

  const handleToggleMaterial = (matId: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(matId) ? prev.filter((m) => m !== matId) : [...prev, matId]
    );
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('위시리스트에서 제외되었습니다.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('관심 상품(위시리스트)에 저장되었습니다.');
        return [...prev, productId];
      }
    });
  };

  const handleAddToCart = (product: Product, selectedColor: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${product.id}`,
            product,
            selectedColor,
            quantity: 1
          }
        ];
      }
    });
    showToast(`[${product.name}]이(가) 장바구니에 추가되었습니다.`);
  };

  const handleAddBundleToCart = () => {
    const sofa = PRODUCTS.find((p) => p.id === 'sofa')!;
    const table = PRODUCTS.find((p) => p.id === 'table')!;
    const lamp = PRODUCTS.find((p) => p.id === 'lamp')!;

    setCartItems((prev) => [
      ...prev,
      {
        id: `bundle-sofa-${Date.now()}`,
        product: sofa,
        selectedColor: '바닐라 크림 (번들)',
        quantity: 1
      },
      {
        id: `bundle-table-${Date.now()}`,
        product: table,
        selectedColor: '로마노 트래버틴 (번들)',
        quantity: 1
      },
      {
        id: `bundle-lamp-${Date.now()}`,
        product: lamp,
        selectedColor: '새틴 솔리드 브라스 (번들)',
        quantity: 1
      }
    ]);
    showToast('3D 룸투어 번들 세트 (소파+테이블+조명) 3종이 장바구니에 담겼습니다.');
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
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('상품이 장바구니에서 삭제되었습니다.');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setNoticeFeature('장바구니 주문·결제');
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter — 'all' 이 아니면 **반드시** 같은 카테고리여야 한다.
      // 예전 방식(id 마다 if 한 줄)은 목록에 없는 id 가 오면 조건을 하나도 못 만나 전체가 통과했다.
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;

      // Material filter (if any selected, item must contain at least one)
      if (selectedMaterials.length > 0) {
        const matchesMaterial = product.materialTags.some((tag) =>
          selectedMaterials.includes(tag)
        );
        if (!matchesMaterial) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack = [
          product.name,
          product.subtitle,
          product.description,
          product.highlight,
          product.categoryLabel,
          ...product.materialTags
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'price-asc') return a.price - b.price;
      return 0; // recommended or newest keeps order
    });
  }, [selectedCategory, selectedMaterials, searchQuery, sortBy]);

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fff8f4] text-[#1f1b17] font-sans selection:bg-[#e1d8d1] selection:text-[#100e0d]">
      <style>{`
        @keyframes pulseAnimation {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        .pulse-ring {
          animation: pulseAnimation 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

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
              [쇼핑몰 05] 메종 아키텍트 (MAISON ARCHITECT) — 홈퍼니싱 &amp; 감성 인테리어
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=maison-architect&industry=commerce"
              className="px-3 py-1 rounded bg-[#944931] hover:bg-[#77331d] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <Send className="w-3 h-3" />
              <span>이커머스 제작 의뢰하기</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Sticky Header */}
      <Header
        lightingMood={lightingMood}
        onToggleLighting={handleToggleLighting}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="w-full">
        {/* HERO SPATIAL SHOWCASE: "Shop the Room" 3D Interactive Canvas */}
        <HeroSpatialTour
          lightingMood={lightingMood}
          setLightingMood={handleSetLightingMood}
          onOpenProduct={(productId) => {
            // 핀 하나 = 그 상품 하나. 예전에는 핀 3개가 전부 번들 드로어를 열어서, 조명 핀을 눌렀는데
            // 유일한 단추가 「번들 세트 장바구니」라 소파·테이블까지 같이 담기고 금액도 번들 합계가 찍혔다.
            const product = PRODUCTS.find((p) => p.id === productId);
            if (product) setInspectedProduct(product);
          }}
          onOpenBundle={() => setIsBundleDrawerOpen(true)}
        />

        {/* CATEGORY & MATERIAL FILTER HUD */}
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedMaterials={selectedMaterials}
          onToggleMaterial={handleToggleMaterial}
          onResetMaterials={() => setSelectedMaterials([])}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* CURATED MASTERPIECE COLLECTION (4 Flagship Items) */}
        <ProductGrid
          products={filteredProducts}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenProductDetail={setInspectedProduct}
          onResetFilters={handleResetFilters}
        />

        {/* APARTMENT FLOORPLAN PLACEMENT SIMULATION */}
        <FloorplanSimulator
          onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
        />

        {/* SHOWROOM & PRIVATE HOSPITALITY SECTION */}
        <ShowroomSection
          onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
        />
      </main>

      {/* FOOTER */}
      <Footer
        onOpenShowroomModal={() => setIsShowroomModalOpen(true)}
        onOpenPolicy={setPolicyTopic}
      />

      {/* DRAWERS & MODALS */}
      <BundleDrawer
        isOpen={isBundleDrawerOpen}
        onClose={() => setIsBundleDrawerOpen(false)}
        onAddBundleToCart={handleAddBundleToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* 예약 폼은 ShowroomModal 안에서 스스로 SampleNotice 를 연다 — 여기서 또 열지 않는다 */}
      <ShowroomModal
        isOpen={isShowroomModalOpen}
        onClose={() => setIsShowroomModalOpen(false)}
      />

      <ProductDetailModal
        product={inspectedProduct}
        isOpen={Boolean(inspectedProduct)}
        onClose={() => setInspectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={inspectedProduct ? wishlistIds.includes(inspectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <PolicyModal topic={policyTopic} onClose={() => setPolicyTopic(null)} />

      {/* Toast Notification */}
      <Toast message={toastMessage} />

      <SampleNotice
        open={noticeFeature !== null}
        onClose={() => setNoticeFeature(null)}
        slug="maison-architect"
        industry="commerce"
        featureName={noticeFeature ?? undefined}
      />
    </div>
  );
}
