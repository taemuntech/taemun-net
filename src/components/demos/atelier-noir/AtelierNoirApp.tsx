'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

import { Header } from './components/Header';
import { CategoryFilter, LUXURY_CATEGORY, type FilterOptions } from './components/CategoryFilter';
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
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { PRODUCTS, INITIAL_CART, colorNameOf } from './data/mockData';
import { CurrencyProvider } from './currency';
import { Product, CartItem } from './types';

// 카테고리 칩은 상품이 실제로 가진 category 값만 쓴다 —
// 예전 목록의 「남성의류」·「여성의류」는 어느 상품에도 안 붙어 눌러도 빈 화면이 됐다.
const CATEGORIES = [
  '전체보기',
  '아우터 (OUTER)',
  '상의 (TOPS)',
  '하의 (BOTTOMS)',
  '잡화/가방',
  '슈즈 (FOOTWEAR)',
  LUXURY_CATEGORY,
];

const LUXURY_MIN_PRICE = 700000;

function matchesCategory(item: Product, category: string): boolean {
  if (category === '전체보기') return true;
  if (category === LUXURY_CATEGORY) return item.price >= LUXURY_MIN_PRICE;
  return item.category === category;
}

function uniq(values: string[]): string[] {
  return Array.from(new Set(values));
}

export default function AtelierNoirApp({ isEmbed = false }: { isEmbed?: boolean }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedCategory, setSelectedCategory] = useState<string>('아우터 (OUTER)');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedFit, setSelectedFit] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string>('RANKING');
  const [activeTab, setActiveTab] = useState<'realtime' | 'md' | 'timedeal' | 'exclusive'>('realtime');
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
  // 샘플이라 결제·선물하기를 접수하지 않는다 — 「결제창을 호출합니다」 대신 공용 안내(SampleNotice)를 연다.
  const [noticeFeature, setNoticeFeature] = useState<string | null>(null);

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
    // 상세에서 넘어오는 값은 16진 색상코드라 사람이 읽는 이름으로 바꾼다 —
    // 예전엔 장바구니 줄에 '#0C0D0E / L (추천 사이즈)' 가 그대로 찍혔다.
    const colorLabel = selectedColor.startsWith('#') ? colorNameOf(selectedColor) : selectedColor;

    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === colorLabel
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
        selectedColor: colorLabel,
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

  const handleGiftItem = () => {
    setNoticeFeature('선물하기');
  };

  // 히어로의 3-PIECE 세트는 실제 상품 3개(블레이저·슬랙스·더비슈즈)를 가리킨다.
  // 목록도 담기도 이 배열 하나를 보므로 지면 가격과 장바구니 가격이 갈라지지 않는다.
  const LOOK_SET_IDS = [1, 2, 7];
  const lookSetProducts = useMemo(
    () => LOOK_SET_IDS.map((id) => products.find((p) => p.id === id)).filter((p): p is Product => Boolean(p)),
    [products]
  );

  // 3-Piece look set commit
  const handleAddLookSetToCart = () => {
    // 금액은 상품 데이터에서 가져온다 — 숫자를 따로 적어 두면 그리드·상세 가격과 어긋난다.
    const setLookItems: CartItem[] = lookSetProducts.map((piece, idx) => ({
      id: `cart-set-${idx + 1}-${Date.now()}`,
      productId: piece.id,
      brand: piece.brand,
      name: `${piece.name} (LOOK SET 15% OFF)`,
      selectedColor: colorNameOf(piece.colors[0] ?? '#0C0D0E'),
      selectedSize: piece.measurements?.[1]?.size ?? piece.sizeOptions?.[0] ?? 'L (추천 사이즈)',
      price: Math.round(piece.price * 0.85),
      image: piece.image,
      quantity: 1,
    }));

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
    setNoticeFeature('주문 결제');
  };

  // 스트릿 스냅·룩북 핀은 상품 id 로 잇는다 — 이름으로 찾던 예전에는 못 찾으면
  // 엉뚱하게 1번 상품이 열렸다(「스퀘어토 미니멀 로퍼」·「5.0 테크니컬 팬츠」가 그랬다).
  const handleOpenProductById = (productId: number) => {
    const matched = products.find((p) => p.id === productId);
    if (!matched) return;
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
        brand: 'BRAND I (예시)',
        name: '라돈 니켈 도금 체인 초커 목걸이',
        price: 185000,
        originalPrice: 220000,
        discountRate: '16% OFF',
        badge: 'EXCLUSIVE',
        badgeType: 'outline',
        image: '/demo-media/atelier-noir/atelier-noir-04.jpg',
        altText: '니켈 도금 체인 초커 목걸이 (예시)',
        colors: ['#71717A'],
        category: '잡화/가방',
        subCategory: '체인 목걸이',
        fit: '원사이즈',
        fabric: 'Nickel Plated Brass',
        isWishlisted: false,
        modelSpec: '체인 길이 42cm · 랍스터 클래스프 (예시 수치)',
        sizeOptions: ['ONE SIZE'],
      },
      {
        id: 10,
        rank: '10',
        brand: 'BRAND J (예시)',
        name: '다트 디테일 와이드 트라우저 팬츠',
        price: 540000,
        originalPrice: 650000,
        discountRate: '17% OFF',
        badge: '단독 입고',
        badgeType: 'primary',
        image: '/demo-media/atelier-noir/atelier-noir-13.jpg',
        altText: '다트 디테일 와이드 트라우저 (예시)',
        colors: ['#0C0D0E', '#27272A'],
        category: '하의 (BOTTOMS)',
        subCategory: '와이드 트라우저',
        fit: '와이드 테이퍼드',
        fabric: 'Virgin Wool 100%',
        isWishlisted: false,
        modelSpec: '183cm / 70kg, 48(M) 착용',
        measurements: [
          { size: '46 (S)', shoulder: '-', chest: '-', sleeve: '-', length: '103 cm', stock: '재고 3개' },
          { size: '48 (M)', shoulder: '-', chest: '-', sleeve: '-', length: '106 cm', isModelSize: true, stock: '추천 사이즈' },
          { size: '50 (L)', shoulder: '-', chest: '-', sleeve: '-', length: '109 cm', stock: '재고 1개' },
        ],
      },
      {
        id: 11,
        rank: '11',
        brand: 'BRAND K (예시)',
        name: '백스퀘어 시그니처 엠브로이더리 셔츠',
        price: 450000,
        originalPrice: 520000,
        discountRate: '13% OFF',
        badge: '오늘출발 (14:00 마감)',
        badgeType: 'primary',
        image: '/demo-media/atelier-noir/atelier-noir-10.jpg',
        altText: '엠브로이더리 코튼 포플린 셔츠 (예시)',
        colors: ['#F4F4F5', '#0C0D0E'],
        category: '상의 (TOPS)',
        subCategory: '엠브로이더리 셔츠',
        fit: '오버핏 (OVERSIZED)',
        fabric: 'Cotton Poplin 100%',
        isWishlisted: false,
        modelSpec: '180cm / 68kg, L 착용 (넉넉한 드롭 숄더)',
        measurements: [
          { size: 'M (95-100)', shoulder: '50 cm', chest: '57 cm', sleeve: '61 cm', length: '73 cm', stock: '재고 4개' },
          { size: 'L (100-105)', shoulder: '52 cm', chest: '60 cm', sleeve: '63 cm', length: '75 cm', isModelSize: true, stock: '추천 사이즈' },
          { size: 'XL (105-110)', shoulder: '54 cm', chest: '63 cm', sleeve: '65 cm', length: '77 cm', stock: '재고 2개' },
        ],
      },
      {
        id: 12,
        rank: '12',
        brand: 'BRAND L (예시)',
        name: '아방가르드 드레이프 롱 테일러드 코트',
        price: 1280000,
        originalPrice: 1600000,
        discountRate: '20% OFF',
        badge: 'EXCLUSIVE',
        badgeType: 'primary',
        image: '/demo-media/atelier-noir/atelier-noir-06.jpg',
        altText: '아방가르드 드레이프 롱 코트 (예시)',
        colors: ['#0C0D0E'],
        category: '아우터 (OUTER)',
        subCategory: '롱 테일러드 코트',
        fit: '오버핏 (OVERSIZED)',
        fabric: 'Gabardine Wool 100%',
        isWishlisted: false,
        modelSpec: '187cm / 75kg, L 착용 (종아리 아래로 떨어지는 기장)',
        measurements: [
          { size: 'M (95-100)', shoulder: '55 cm', chest: '64 cm', sleeve: '65 cm', length: '118 cm', stock: '재고 1개' },
          { size: 'L (100-105)', shoulder: '57 cm', chest: '67 cm', sleeve: '67 cm', length: '121 cm', isModelSize: true, stock: '추천 사이즈' },
          { size: 'XL (105-110)', shoulder: '59 cm', chest: '70 cm', sleeve: '69 cm', length: '124 cm', stock: '품절임박' },
        ],
      },
    ];

    setProducts((prev) => [...prev, ...moreProducts]);
    setHasMore(false);
    showToast('예시 컬렉션 4종을 목록에 더했습니다.');
  };

  // 검색어가 있으면 검색이 이긴다. 없으면 카테고리 + 세부분류 + 컬러 + 핏 + 패브릭을 모두 적용한다.
  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return products.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.subCategory.toLowerCase().includes(q)
      );
    }
    return products.filter((item) => {
      if (!matchesCategory(item, selectedCategory)) return false;
      if (selectedSubCategory && item.subCategory !== selectedSubCategory) return false;
      if (
        selectedColor &&
        !item.colors.some((hex) => hex.toLowerCase() === selectedColor.toLowerCase())
      ) {
        return false;
      }
      if (selectedFit && item.fit !== selectedFit) return false;
      if (selectedFabric && item.fabric !== selectedFabric) return false;
      return true;
    });
  }, [products, searchQuery, selectedCategory, selectedSubCategory, selectedColor, selectedFit, selectedFabric]);

  // 칩 목록은 지금 카테고리에 실제로 있는 상품에서 뽑는다 — 결과가 0인 죽은 칩을 만들지 않는다.
  const filterOptions = useMemo<FilterOptions>(() => {
    const inCategory = products.filter((item) => matchesCategory(item, selectedCategory));
    return {
      subCategories: uniq(inCategory.map((item) => item.subCategory)),
      colors: uniq(inCategory.flatMap((item) => item.colors)),
      fits: uniq(inCategory.map((item) => item.fit)),
      fabrics: uniq(inCategory.map((item) => item.fabric)),
    };
  }, [products, selectedCategory]);

  const hasActiveFilters =
    selectedCategory !== '전체보기' ||
    selectedSubCategory !== null ||
    selectedColor !== null ||
    selectedFit !== null ||
    selectedFabric !== null ||
    searchQuery !== '';

  const handleResetFilters = () => {
    setSelectedCategory('전체보기');
    setSelectedSubCategory(null);
    setSelectedColor(null);
    setSelectedFit(null);
    setSelectedFabric(null);
    setSearchQuery('');
    showToast('필터를 해제하고 전체 상품을 표시합니다.');
  };

  // 카테고리를 바꾸면 그 카테고리에 없는 세부 필터는 같이 풀어 준다(0개 화면 방지).
  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubCategory(null);
    setSelectedColor(null);
    setSelectedFit(null);
    setSelectedFabric(null);
    setSearchQuery('');
  };

  const scrollToCatalog = () => {
    document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLookbook = () => {
    document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGoHome = () => {
    handleResetFilters();
    setActiveNav('RANKING');
    setActiveTab('realtime');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 상단 내비는 전부 무언가를 바꾼다 — 예전엔 BRANDS·EXCLUSIVE 가 글자만 굵어지고 끝이었다.
  const handleSelectNav = (nav: string) => {
    setActiveNav(nav);
    setSearchQuery('');
    if (nav === 'LOOKBOOK') {
      scrollToLookbook();
      return;
    }
    // 카테고리를 전체로 되돌릴 때는 속성 필터도 같이 푼다 — 남겨 두면 탭을 눌러도 0개가 나온다.
    if (nav === 'BRANDS') {
      handleSelectCategory('전체보기');
      setActiveTab('md');
    } else if (nav === 'RANKING') {
      setActiveTab('realtime');
    } else if (nav === 'SALE') {
      handleSelectCategory('전체보기');
      setActiveTab('timedeal');
    } else if (nav === 'EXCLUSIVE') {
      handleSelectCategory('전체보기');
      setActiveTab('exclusive');
    }
    scrollToCatalog();
  };

  return (
    <CurrencyProvider>
    <div className="min-h-screen bg-[#0c0d0e] text-[#e3e2e3] font-body-md flex flex-col selection:bg-[#caf300] selection:text-black">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          // 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
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
        setActiveNav={handleSelectNav}
        onGoHome={handleGoHome}
      />

      {/* 3. Deep 4-Tier Category Drawer & Attribute Filter HUD */}
      <CategoryFilter
        categories={CATEGORIES}
        options={filterOptions}
        resultCount={filteredProducts.length}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        selectedSubCategory={selectedSubCategory}
        onSelectSubCategory={setSelectedSubCategory}
        selectedColor={selectedColor}
        onSelectColor={setSelectedColor}
        selectedFit={selectedFit}
        onSelectFit={setSelectedFit}
        selectedFabric={selectedFabric}
        onSelectFabric={setSelectedFabric}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Main Page Canvas */}
      <main className="flex-1">
        {/* Active Search Banner if searching */}
        {searchQuery && (
          <div className="bg-[#1f2021] hairline-b px-4 lg:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs max-w-[1920px] mx-auto">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-[#caf300]">search</span>
              <span>
                '<strong>{searchQuery}</strong>' 검색 결과 ({filteredProducts.length}개)
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#8f9378] hover:text-[#ffffff] underline font-label-sm min-h-11 px-1 shrink-0 cursor-pointer"
            >
              검색 필터 해제
            </button>
          </div>
        )}

        {/* 4. Editorial Hero Runway & Interactive Lookbook Showcase */}
        <HeroEditorial
          onOpenProductSpec={handleOpenProductById}
          onAddLookSetToCart={handleAddLookSetToCart}
          onScrollToCatalog={scrollToCatalog}
          lookSetProducts={lookSetProducts}
        />

        {/* 5. Real-Time Live Ranking & 4-Tab Switcher */}
        <ProductGrid
          products={filteredProducts}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          onOpenProductModal={(product) => {
            setSelectedProduct(product);
            setIsProductModalOpen(true);
          }}
          onToggleWishlist={handleToggleWishlist}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        {/* 6. Street Archive: Seongsu · Hannam · Dosan */}
        <StreetArchive
          onOpenProductModalById={handleOpenProductById}
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

      <SampleNotice
        open={noticeFeature !== null}
        onClose={() => setNoticeFeature(null)}
        slug="atelier-noir"
        industry="commerce"
        featureName={noticeFeature ?? undefined}
      />
    </div>
    </CurrencyProvider>
  );
}
