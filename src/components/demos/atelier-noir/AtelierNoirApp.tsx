'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { HeroEditorial } from './components/HeroEditorial';
import { ProductGrid } from './components/ProductGrid';
import { StreetArchive } from './components/StreetArchive';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { PolicyModal } from './components/PolicyModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PRODUCTS, INITIAL_CART, LOOKBOOK_PIECES } from './data/mockData';
import { Product, CartItem } from './types';

export default function AtelierNoirApp({ isEmbed = false }: { isEmbed?: boolean }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedCategory, setSelectedCategory] = useState<string>('아우터 (OUTER)');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('오버사이즈 더블 블레이저');
  const [selectedColor, setSelectedColor] = useState<string>('Noir Black');
  const [selectedFit, setSelectedFit] = useState<string>('오버핏 (OVERSIZED)');
  const [selectedFabric, setSelectedFabric] = useState<string>('100% VIRGIN WOOL');
  const [activeNav, setActiveNav] = useState<string>('RANKING');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newState = !p.isWishlisted;
          showToast(
            newState
              ? `${p.name} 상품이 위시리스트에 담겼습니다.`
              : `${p.name} 상품이 위시리스트에서 제외되었습니다.`
          );
          return { ...p, isWishlisted: newState };
        }
        return p;
      })
    );
  };

  const wishlistedProducts = products.filter((p) => p.isWishlisted);

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    selectedSize: string = 'L (추천 사이즈)',
    selectedColor: string = 'Noir Black'
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${product.id}`,
        productId: product.id,
        brand: product.brand,
        name: product.name,
        selectedColor,
        selectedSize,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      setCart((prev) => [newItem, ...prev]);
    }

    setIsProductModalOpen(false);
    showToast(`"${product.name}" 장바구니에 담겼습니다.`);
    setIsCartOpen(true);
  };

  const handleInstantBuy = (
    product: Product,
    selectedSize: string = 'L (추천 사이즈)',
    selectedColor: string = 'Noir Black'
  ) => {
    handleAddToCart(product, selectedSize, selectedColor);
    setTimeout(() => {
      handleCheckout();
    }, 400);
  };

  const handleGiftItem = (product: Product) => {
    showToast(`카카오톡 선물하기로 "${product.name}" 연동 준비 중입니다.`);
  };

  // 3-Piece look set commit
  const handleAddLookSetToCart = () => {
    const lookPiece1 = products.find((p) => p.id === 1) || products[0];
    const lookPiece2 = products.find((p) => p.id === 2) || products[1];
    const lookPiece3 = products.find((p) => p.id === 7) || products[6];

    const setLookItems: CartItem[] = [
      {
        id: `cart-set-1-${Date.now()}`,
        productId: lookPiece1.id,
        brand: lookPiece1.brand,
        name: '테일러드 오버 블레이저 (LOOK SET 15% OFF)',
        selectedColor: 'Noir Black',
        selectedSize: 'L (100-105)',
        price: Math.round(348000 * 0.85),
        image: lookPiece1.image,
        quantity: 1,
      },
      {
        id: `cart-set-2-${Date.now()}`,
        productId: lookPiece2.id,
        brand: lookPiece2.brand,
        name: '딥 플리츠 와이드 슬랙스 (LOOK SET 15% OFF)',
        selectedColor: 'Dark Charcoal',
        selectedSize: '48 (M)',
        price: Math.round(178000 * 0.85),
        image: lookPiece2.image,
        quantity: 1,
      },
      {
        id: `cart-set-3-${Date.now()}`,
        productId: lookPiece3.id,
        brand: lookPiece3.brand,
        name: '스퀘어토 카프 더비슈즈 (LOOK SET 15% OFF)',
        selectedColor: 'Noir Black',
        selectedSize: '270 (EU 42)',
        price: Math.round(258000 * 0.85),
        image: lookPiece3.image,
        quantity: 1,
      },
    ];

    setCart((prev) => [...setLookItems, ...prev]);
    showToast('2026 S/S 3-PIECE 세트(15% 특가)가 장바구니에 담겼습니다!');
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
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

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('상품이 장바구니에서 삭제되었습니다.');
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    showToast(`토스페이먼츠 구매안전 에스크로(₩${total.toLocaleString()}) 결제창을 호출합니다.`);
  };

  // Open modal with partial or full product
  const handleOpenProductSpec = (partial: Partial<Product>) => {
    const found = products.find((p) => p.id === partial.id) || products[0];
    const target = { ...found, ...partial };
    setSelectedProduct(target as Product);
    setIsProductModalOpen(true);
  };

  const handleOpenProductByName = (name: string, price?: number) => {
    const matched =
      products.find((p) => p.name.includes(name) || name.includes(p.name)) ||
      products[0];
    setSelectedProduct(matched);
    setIsProductModalOpen(true);
  };

  const handleLoadMore = () => {
    if (!hasMore) {
      showToast('이미 모든 큐레이션 상품을 불러왔습니다.');
      return;
    }

    const moreProducts: Product[] = [
      {
        id: 9,
        rank: '09',
        brand: 'OUR LEGACY',
        name: '라돈 니켈 도금 체인 초커 목걸이',
        price: 185000,
        originalPrice: 220000,
        discountRate: '16% OFF',
        badge: 'EXCLUSIVE',
        badgeType: 'outline',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArV8Pno5ETDwgDQTkLZSLvyWXqydUVSF9C8XGs6TfYE2u8Cic3CIAqw0x0_CVoxg5emU1DLoUegbCBVQJI-mEIznP9gXtcvMH8iR0RUDwWbdLxedaOcBwr5D16bQKMuYXN965AQeH1hgUXTR6a8lfmIbqbg30spbBCHZ5H9BVN_kujPmFA4uW4sEoshx_Wj2q9aJhqJzduHXugpRXLJj8Ui78sPnPNnbCo8sGZCK351bAgEoypHxV6',
        altText: '아워레가시 라돈 목걸이',
        colors: ['#71717A'],
        category: '잡화/가방',
        fit: '원사이즈',
        fabric: 'Nickel Plated Brass',
        isWishlisted: false,
      },
      {
        id: 10,
        rank: '10',
        brand: 'KIKO KOSTADINOV',
        name: '다트 디테일 와이드 트라우저 팬츠',
        price: 540000,
        originalPrice: 650000,
        discountRate: '17% OFF',
        badge: '단독 입고',
        badgeType: 'primary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4hzLTOxEbHfDezxco-Ukebd-hrW8ampocQnMor2RhbB2G7fkB8j7BPWmWpijYPd9GPtiWiRZIW4tdpZ3W6uI-leaCHj7Olbn_uBO13sK2AbYYT_7xZ0iV_bMBIsDqBJzMpj97J7ctUjlOFhjm8ciAYGe_WYGbfYz43rDxu9n_WvgJcwiaKPhrDrlu7P29vaIfoHj0J5dwr2hP7fjpkrKYfMBnzB760oJs9xcSRrL57nfHcdZHm3YM',
        altText: '키코 코스타디노프 와이드 트라우저',
        colors: ['#0C0D0E', '#27272A'],
        category: '하의 (BOTTOMS)',
        fit: '와이드 테이퍼드',
        fabric: 'Virgin Wool 100%',
        isWishlisted: false,
      },
      {
        id: 11,
        rank: '11',
        brand: 'WOOYOUNGMI',
        name: '백스퀘어 시그니처 엠브로이더리 셔츠',
        price: 450000,
        originalPrice: 520000,
        discountRate: '13% OFF',
        badge: '오늘출발 (14:00 마감)',
        badgeType: 'primary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpYT4L4RvUb1-QoILsyLrmJD6ppOaKNDdWg_rJfafhWzgC8IdmLJdaOkB8X58mVblpbJHd1850Th0g4ZNQskhzlQjCm5YyW4BdJVvOz14L9QVR9gytzmyx2IGDQqzZo8XCTc5e-X3FtO0o6G_SjLgPqkZQKzamojvWWQlz6HBOg-xIaCtIanNgmYS-CaRXYCwL7udY6lZjFGQySDsBdhEcqFHPHy5rGA-LmD_2y2p9TX1QVniTLnSs',
        altText: '우영미 백스퀘어 셔츠',
        colors: ['#F4F4F5', '#0C0D0E'],
        category: '상의 (TOPS)',
        fit: '오버핏 (OVERSIZED)',
        fabric: 'Cotton Poplin 100%',
        isWishlisted: false,
      },
      {
        id: 12,
        rank: '12',
        brand: 'YOHJI YAMAMOTO',
        name: '아방가르드 드레이프 롱 테일러드 코트',
        price: 1280000,
        originalPrice: 1600000,
        discountRate: '20% OFF',
        badge: 'EXCLUSIVE',
        badgeType: 'primary',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB87FrfDuQGThl4_KP9H1ZmRBaMYhqeX-E7mQ5b3QSmPC-OFuVq_gIBMzgKOgYiN_SjCsjrYFZukxsctgR1UVF6hRUfmCTadcJxllhiG1L4DTu2McPLBkkBNgq1OltZ-qIRoVRngtUf3MfPkf7x41jVKjuKNlZx8GhvEbkfgax0ZYLvWup11NQkNAlG3VmxsZBx65ccf8azARolDNCIRg-FUgKq1HtcN6xuGEHqrvXHG7OwNhftEjvl',
        altText: '요지 야마모토 아방가르드 롱 코트',
        colors: ['#0C0D0E'],
        category: '아우터 (OUTER)',
        fit: '오버핏 (OVERSIZED)',
        fabric: 'Gabardine Wool 100%',
        isWishlisted: false,
      },
    ];

    setProducts((prev) => [...prev, ...moreProducts]);
    setHasMore(false);
    showToast('추가 24개 디자이너 랭킹 컬렉션이 업데이트되었습니다.');
  };

  // Filter products based on search or category
  const filteredProducts = products.filter((item) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory && selectedCategory !== '전체보기') {
      if (item.category !== selectedCategory) return false;
    }
    return true;
  });

  const handleResetFilters = () => {
    setSelectedCategory('아우터 (OUTER)');
    setSelectedSubCategory('오버사이즈 더블 블레이저');
    setSelectedColor('Noir Black');
    setSelectedFit('오버핏 (OVERSIZED)');
    setSelectedFabric('100% VIRGIN WOOL');
    setSearchQuery('');
    showToast('모든 필터가 기본값으로 초기화되었습니다.');
  };

  const scrollToCatalog = () => {
    const elem = document.getElementById('ranking');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#e3e2e3] font-body-md flex flex-col selection:bg-[#caf300] selection:text-black">
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
              [쇼핑몰 01] 아틀리에 누아르 (ATELIER NOIR) — K-패션 &amp; 디자이너 셀렉트샵
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=atelier-noir"
              className="px-3 py-1 rounded bg-[#caf300] hover:bg-[#b8db00] text-zinc-950 font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 쇼핑몰 구축 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Embedded Atelier Noir Custom CSS */}
      <style jsx global>{`
        .hairline-b { border-bottom: 1px solid #27272a; }
        .hairline-t { border-top: 1px solid #27272a; }
        .hairline-r { border-right: 1px solid #27272a; }
        .hairline-l { border-left: 1px solid #27272a; }
        .hairline-all { border: 1px solid #27272a; }
        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(202, 243, 0, 0.7);
          }
          50% {
            transform: scale(1.15);
            box-shadow: 0 0 0 8px rgba(202, 243, 0, 0);
          }
        }
        .pulse-pin {
          animation: pulseGlow 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* 1 & 2. Top Bar & Sticky Global Nav */}
      <Header
        wishlistCount={wishlistedProducts.length}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onSearch={(q) => {
          setSearchQuery(q);
          scrollToCatalog();
          showToast(`'${q}' 검색 결과를 표시합니다.`);
        }}
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'LOOKBOOK' || nav === 'RANKING') scrollToCatalog();
          if (nav === 'SALE') {
            setSelectedCategory('전체보기');
            scrollToCatalog();
          }
        }}
      />

      {/* 3. Deep 4-Tier Category Drawer & Attribute Filter HUD */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
        }}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={setSelectedSubCategory}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        selectedFit={selectedFit}
        onSelectFit={setSelectedFit}
        selectedFabric={selectedFabric}
        onSelectFabric={setSelectedFabric}
        onResetFilters={handleResetFilters}
      />

      {/* Main Page Canvas */}
      <main className="flex-1">
        {/* Active Search Banner if searching */}
        {searchQuery && (
          <div className="bg-[#1f2021] hairline-b px-6 py-2.5 flex items-center justify-between text-xs max-w-[1920px] mx-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#caf300]">search</span>
              <span>
                '<strong>{searchQuery}</strong>' 검색 결과 ({filteredProducts.length}개)
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8f9378] hover:text-[#ffffff] underline font-label-sm"
            >
              검색 필터 해제
            </button>
          </div>
        )}

        {/* 4. Editorial Hero Runway & Interactive Lookbook Showcase */}
        <HeroEditorial
          onOpenProductSpec={handleOpenProductSpec}
          onAddLookSetToCart={handleAddLookSetToCart}
          onScrollToCatalog={scrollToCatalog}
        />

        {/* 5. Real-Time Live Ranking & 4-Tab Switcher */}
        <ProductGrid
          products={filteredProducts}
          onOpenProductModal={(product) => {
            setSelectedProduct(product);
            setIsProductModalOpen(true);
          }}
          onToggleWishlist={handleToggleWishlist}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />

        {/* 6. Street Archive: Seongsu · Hannam · Dosan */}
        <StreetArchive
          onOpenProductModalByName={handleOpenProductByName}
        />
      </main>

      {/* 9. Trust & Commercial Assurance Footer */}
      <Footer
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenPolicy={(title) => setActivePolicy(title)}
      />

      {/* Modals & Slide-Over Drawers */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        onGiftItem={handleGiftItem}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
        onOpenProductModal={(p) => {
          setSelectedProduct(p);
          setIsProductModalOpen(true);
        }}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />

      <ConciergeChatModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <PolicyModal
        title={activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
