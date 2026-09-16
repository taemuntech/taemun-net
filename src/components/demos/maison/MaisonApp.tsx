'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CuratorsPick } from './components/CuratorsPick';
import { CuratedCategories } from './components/CuratedCategories';
import { NewArrivals } from './components/NewArrivals';
import { AtelierSection } from './components/AtelierSection';
import { ReservationSection } from './components/ReservationSection';
import { ResidenceStories } from './components/ResidenceStories';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartFolioDrawer } from './components/CartFolioDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { Product } from './types';

export default function MaisonApp({ isEmbed = false }: { isEmbed?: boolean } = {}) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleAddToCart = (product: Product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      setCartItems((prev) => [...prev, product]);
      showToast(`'${product.name}' 작품이 소장 희망 서류함에 담겼습니다.`);
    } else {
      showToast(`'${product.name}' 작품은 이미 서류함에 담겨 있습니다.`);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    if (wishlistItems.some((item) => item.id === product.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`'${product.name}' 작품이 보관함에서 제외되었습니다.`);
    } else {
      setWishlistItems((prev) => [...prev, product]);
      showToast(`'${product.name}' 작품이 관심 아카이브에 보관되었습니다.`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategoryFilter(categoryKey);
    scrollToSection('arrivals');
  };

  const handleInquireCuratorsPick = (product: Product) => {
    handleAddToCart(product);
    scrollToSection('viewing');
  };

  const wishlistIds = wishlistItems.map((item) => item.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff8f5] text-[#1e1b18] font-sans antialiased selection:bg-[#4a1e23] selection:text-[#fff8f5]">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside aria-label="데모 안내 바" className="sticky top-0 z-[60] bg-gray-950/95 backdrop-blur-md text-white border-b border-gray-800 text-xs py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>포트폴리오 목록</span>
            </Link>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5 font-medium text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span className="font-semibold text-white">메종 당티크 (Maison d'Antique)</span> 실물 라이브 데모
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-gray-400">
              태문 DEV STUDIO 하이엔드 앤틱 살롱 &amp; D2C 아카이브 레퍼런스
            </span>
            <Link
              href="/inquiry?from=maison-antique"
              className="bg-rose-800 hover:bg-rose-700 text-white font-medium px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>이런 사이트 제작 문의</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          id="system-toast-notification"
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-[#300a10] text-[#fff8f5] px-5 py-3 border border-[#735b24] shadow-xl text-xs font-serif flex items-center space-x-3 animate-in slide-in-from-bottom-3 duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-[#735b24] shrink-0"></span>
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-[#e9e1dc] hover:text-[#ffffff] pl-2 cursor-pointer"
          >
            &times;
          </button>
        </div>
      )}

      {/* Global Header */}
      <Header
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('arrivals')}
          onReserveClick={() => scrollToSection('viewing')}
        />

        {/* 2. Curator's Pick (Featured Louis XV Commode) */}
        <CuratorsPick
          onSelectProduct={(p) => setSelectedProduct(p)}
          onInquire={handleInquireCuratorsPick}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes('MDA-1782-PROV')}
        />

        {/* 3. Catalog Divisions (Categories) */}
        <CuratedCategories onSelectCategory={handleCategorySelect} />

        {/* 4. New Arrivals Registry */}
        <NewArrivals
          selectedFilter={selectedCategoryFilter}
          onFilterChange={(f) => setSelectedCategoryFilter(f)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 5. Conservation Atelier Section */}
        <AtelierSection
          onConsultationClick={() => scrollToSection('viewing')}
        />

        {/* 6. Hannam Salon Private Viewing Reservation */}
        <ReservationSection />

        {/* 7. Patrons & Modern Residence Stories */}
        <ResidenceStories />
      </main>

      {/* Global Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Product Detail Dossier Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={
          selectedProduct ? wishlistIds.includes(selectedProduct.id) : false
        }
        isInCart={
          selectedProduct
            ? cartItems.some((item) => item.id === selectedProduct.id)
            : false
        }
        onReserveViewing={() => scrollToSection('viewing')}
      />

      {/* Acquisition Folio Drawer */}
      <CartFolioDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onProceedToInquiry={() => scrollToSection('viewing')}
      />

      {/* Saved Archival Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={handleRemoveFromWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Full Catalog Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
