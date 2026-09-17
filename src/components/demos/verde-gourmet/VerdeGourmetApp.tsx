/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductSection } from './components/ProductSection';
import { ChefRecipeSection } from './components/ChefRecipeSection';
import { ColdchainTelemetry } from './components/ColdchainTelemetry';
import { PillarsSection } from './components/PillarsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { ColdchainModal } from './components/ColdchainModal';
import { AddressModal } from './components/AddressModal';
import { CategoryModal } from './components/CategoryModal';
import { Toast } from './components/Toast';
import { PRODUCTS } from './data/mockData';
import { CartItem, Product, RecipeIngredient } from './types';

export default function VerdeGourmetApp({ isEmbed = false }: { isEmbed?: boolean }) {
  // Initial cart populated with 3 items matching the design's cart count badge (3)
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[1], quantity: 1 },
    { product: PRODUCTS[2], quantity: 1 }
  ]);

  const [wishlist, setWishlist] = useState<string[]>(['prod-hanwoo-1']);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPill, setSelectedPill] = useState<string>('신선정육 (1++)');
  const [currentAddress, setCurrentAddress] = useState<string>('서울 용산구 한남동 일대 (예시)');

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isColdchainModalOpen, setIsColdchainModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // 샘플이라 주문을 접수하지 않는다 — 「주문이 완료되었습니다」 대신 공용 안내(SampleNotice)를 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastSubMessage, setToastSubMessage] = useState<string | undefined>();

  const showToast = (msg: string, sub?: string) => {
    setToastMessage(msg);
    setToastSubMessage(sub);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    showToast(
      `${product.name}이(가) 장바구니에 담겼습니다.`,
      '밤 11시 전 결제 시 내일 아침 7시 도착!'
    );
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Recipe Bundle Add
  const handleAddRecipeBundle = (selectedItems: RecipeIngredient[], bundlePrice: number) => {
    // Add recipe bundle item to cart
    const bundleProduct: Product = {
      id: `recipe-bundle-${Date.now()}`,
      name: `시그니처 셰프 레시피 패키지 (${selectedItems.length}종 재료)`,
      origin: '시그니처 셰프 ○○○ (예시) 감수',
      tag: selectedItems.map(i => i.name).join(', '),
      tempBadge: '❄️ 콜드체인 합포장',
      price: bundlePrice,
      unitPrice: '레시피 번들 특가 10% OFF',
      rating: 5.0,
      reviewCount: 420,
      image: '/demo-media/verde-gourmet/verde-gourmet-02.jpg',
      category: 'all',
      description: '지중해식 로스트 한우 채끝 & 구운 토마토 타르타르 레시피에 필요한 모든 필수 식재료 세트.'
    };

    setCart(prev => [...prev, { product: bundleProduct, quantity: 1 }]);
    showToast(
      '레시피 재료 패키지가 장바구니에 담겼습니다.',
      `10% 번들 할인이 적용되어 ₩${bundlePrice.toLocaleString('ko-KR')}에 추가되었습니다.`
    );
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('찜 목록에서 제외되었습니다.');
        return prev.filter(id => id !== productId);
      } else {
        showToast('관심 상품에 저장되었습니다.');
        return [...prev, productId];
      }
    });
  };

  // 장바구니는 그대로 둔다 — 비우면 「주문이 접수됐다」로 읽힌다.
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsNoticeOpen(true);
  };

  const handleSelectPill = (pillName: string) => {
    setSelectedPill(pillName);
    if (pillName.includes('정육')) {
      setActiveCategory('meat');
    } else if (pillName.includes('수산')) {
      setActiveCategory('seafood');
    } else if (pillName.includes('채소') || pillName.includes('과일')) {
      setActiveCategory('vegetable');
    } else if (pillName.includes('베이커리') || pillName.includes('치즈')) {
      setActiveCategory('bakery');
    } else {
      setActiveCategory('all');
    }

    const section = document.getElementById('best-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSearchKeyword = (keyword: string) => {
    if (keyword.includes('한우')) setActiveCategory('meat');
    else if (keyword.includes('연어')) setActiveCategory('seafood');
    else if (keyword.includes('당근')) setActiveCategory('vegetable');
    else if (keyword.includes('사워도우')) setActiveCategory('bakery');
    else setActiveCategory('all');

    showToast(`'${keyword}' 검색 결과로 이동했습니다.`);
    const section = document.getElementById('best-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f3fbf6] text-[#151d1a] min-h-screen flex flex-col font-sans selection:bg-[#006e2d] selection:text-white verde-gourmet-theme">
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
              [쇼핑몰 02] 베르데 고메 (VERDE GOURMET) — 프리미엄 신선식품 &amp; 풀콜드체인 새벽배송
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=verde-gourmet"
              className="px-3 py-1 rounded bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 쇼핑몰 구축 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Embedded Verde Gourmet CSS theme variables */}
      <style jsx global>{`
        :root, .verde-gourmet-theme {
          --color-error-container: #ffdad6;
          --color-on-secondary-fixed-variant: #005320;
          --color-surface-container-low: #edf6f0;
          --color-tertiary: #301600;
          --color-on-surface-variant: #414845;
          --color-on-primary: #ffffff;
          --color-primary-fixed: #c1ecda;
          --color-tertiary-fixed: #ffdcc3;
          --color-tertiary-container: #4f2700;
          --color-on-error-container: #93000a;
          --color-secondary-fixed: #7ffc97;
          --color-on-error: #ffffff;
          --color-primary-container: #0e382c;
          --color-surface: #f3fbf6;
          --color-tertiary-fixed-dim: #ffb77d;
          --color-inverse-surface: #2a322f;
          --color-surface-bright: #f3fbf6;
          --color-on-tertiary-container: #e48015;
          --color-surface-container-highest: #dce5df;
          --color-surface-container-high: #e2eae5;
          --color-surface-variant: #dce5df;
          --color-on-primary-container: #79a292;
          --color-on-secondary: #ffffff;
          --color-on-secondary-fixed: #002109;
          --color-secondary-fixed-dim: #62df7d;
          --color-on-tertiary: #ffffff;
          --color-primary-fixed-dim: #a5d0be;
          --color-on-surface: #151d1a;
          --color-on-background: #151d1a;
          --color-inverse-primary: #a5d0be;
          --color-on-secondary-container: #007230;
          --color-secondary: #006e2d;
          --color-outline-variant: #c0c8c3;
          --color-surface-container: #e7f0eb;
          --color-on-primary-fixed: #002117;
          --color-inverse-on-surface: #eaf3ee;
          --color-secondary-container: #7cf994;
          --color-surface-dim: #d3dcd7;
          --color-background: #f3fbf6;
          --color-on-primary-fixed-variant: #264e41;
          --color-error: #ba1a1a;
          --color-surface-tint: #3e6658;
          --color-on-tertiary-fixed-variant: #6e3900;
          --color-on-tertiary-fixed: #2f1500;
          --color-outline: #717975;
          --color-primary: #002218;
          --color-surface-container-lowest: #ffffff;
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-dawn-pulse {
          animation: subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* HEADER */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAddress={() => setIsAddressModalOpen(true)}
        onOpenCategory={() => setIsCategoryModalOpen(true)}
        onSelectSearchKeyword={handleSelectSearchKeyword}
        selectedPill={selectedPill}
        onSelectPill={handleSelectPill}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => showToast(`관심 상품 ${wishlist.length}개가 보관되어 있습니다.`)}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-12 py-4 lg:py-6 space-y-12">
        {/* HERO CULINARY SHOWCASE */}
        <HeroSection
          onExploreProducts={() => {
            const section = document.getElementById('best-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenColdchain={() => setIsColdchainModalOpen(true)}
        />

        {/* REAL-TIME BEST & TIME SPECIAL */}
        <ProductSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* CHEF'S RECIPE ARCHIVE */}
        <ChefRecipeSection onAddRecipeBundle={handleAddRecipeBundle} />

        {/* COLDCHAIN TELEMETRY */}
        <ColdchainTelemetry onOpenReportModal={() => setIsColdchainModalOpen(true)} />

        {/* 3 PILLARS */}
        <PillarsSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <ColdchainModal
        isOpen={isColdchainModalOpen}
        onClose={() => setIsColdchainModalOpen(false)}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        currentAddress={currentAddress}
        onSelectAddress={(addr) => {
          setCurrentAddress(addr);
          showToast('배송지가 변경되었습니다.', addr);
        }}
      />

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          const section = document.getElementById('best-section');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* FLOATING TOAST NOTIFICATION */}
      <Toast
        message={toastMessage}
        subMessage={toastSubMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* 주문하기 — 샘플이라 접수하지 않는다는 공용 안내 */}
      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="verde-gourmet"
        industry="commerce"
        featureName="장바구니 주문·결제 흐름"
      />
    </div>
  );
}
