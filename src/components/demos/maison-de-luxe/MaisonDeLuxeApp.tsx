"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InspectionSystem } from './components/InspectionSystem';
import { VaultCollection } from './components/VaultCollection';
import { PackagingService } from './components/PackagingService';
import { ArchivalLedger } from './components/ArchivalLedger';
import { CartDrawer } from './components/CartDrawer';
import { SerialModal } from './components/SerialModal';
import { ConciergeChatDrawer } from './components/ConciergeChatDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { INITIAL_CART_ITEM, HERO_ITEM, DEFAULT_SERIAL_CODE } from './data/luxuryData';
import { CartItem, LuxuryItem, PackagingOptions } from './types';

interface MaisonDeLuxeAppProps {
  isEmbed?: boolean;
}

export default function MaisonDeLuxeApp(_props: MaisonDeLuxeAppProps = {}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([INITIAL_CART_ITEM]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSerialModalOpen, setIsSerialModalOpen] = useState<boolean>(false);
  const [selectedSerialCode, setSelectedSerialCode] = useState<string>(DEFAULT_SERIAL_CODE);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [wishlistOnly, setWishlistOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [packaging, setPackaging] = useState<PackagingOptions>({
    boutiquePackage: true,
    valetDelivery: false,
  });

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      // 마지막 하나를 빼면 「위시리스트만 보기」가 빈 화면으로 남는다 — 같이 푼다
      if (next.size === 0) setWishlistOnly(false);
      return next;
    });
  };

  // 헤더 하트 = 컬렉션을 위시리스트만으로 좁히기. 예전엔 아무 핸들러도 없는 버튼이었다.
  const handleToggleWishlistOnly = () => {
    setWishlistOnly((prev) => {
      const next = !prev;
      if (next) {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return next;
    });
  };

  const addToCart = (entry: Omit<CartItem, 'quantity' | 'taxNote'>) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === entry.id);
      if (existing) {
        return prev.map((i) => (i.id === entry.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...entry, taxNote: '관·부가세 포함 표시가 (예시)', quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddToCart = (item: LuxuryItem) => {
    addToCart({ id: item.id, brand: item.brand, name: item.name, price: item.salePrice, image: item.image });
  };

  const handleAddToCartHero = () => {
    addToCart({
      id: HERO_ITEM.id,
      brand: HERO_ITEM.brand,
      name: HERO_ITEM.name,
      price: HERO_ITEM.price,
      image: HERO_ITEM.image,
    });
  };

  const handleChangeQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)),
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleOpenSerialForLot = (lotId: string) => {
    setSelectedSerialCode(lotId);
    setIsSerialModalOpen(true);
  };

  const openSerialModal = () => {
    setSelectedSerialCode(DEFAULT_SERIAL_CODE);
    setIsSerialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col relative selection:bg-[#d4af37] selection:text-[#0e0e0e]">
      {/* Top Application Bar */}
      <Header
        onOpenSerialModal={openSerialModal}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlistIds.size}
        wishlistOnly={wishlistOnly}
        onToggleWishlistOnly={handleToggleWishlistOnly}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <HeroSection
          onOpenSerialModal={openSerialModal}
          onOpenConcierge={() => setIsConciergeOpen(true)}
          onAddToCartHero={handleAddToCartHero}
        />

        <InspectionSystem />

        <VaultCollection
          onOrderClick={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          wishlistOnly={wishlistOnly}
          onClearWishlistOnly={() => setWishlistOnly(false)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        <PackagingService options={packaging} onChange={setPackaging} />

        <ArchivalLedger onSelectLot={handleOpenSerialForLot} />
      </main>

      {/* Heritage Luxury Footer */}
      <Footer />

      {/* Floating Concierge Action Trigger */}
      <FloatingConcierge onOpen={() => setIsConciergeOpen(true)} />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onChangeQuantity={handleChangeQuantity}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Lot Number Inspection Record Modal */}
      <SerialModal
        isOpen={isSerialModalOpen}
        onClose={() => setIsSerialModalOpen(false)}
        initialCode={selectedSerialCode}
      />

      {/* 1:1 Concierge Chat Drawer */}
      <ConciergeChatDrawer isOpen={isConciergeOpen} onClose={() => setIsConciergeOpen(false)} />

      {/* Order Form Modal — 제출해도 어디에도 전송되지 않는다 */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        packaging={packaging}
        onSuccess={() => {
          // 안내 모달은 CheckoutModal 이 이미 띄웠다 — 여기서 또 열면 닫자마자 같은 모달이 한 번 더 뜬다.
          // **장바구니는 비우지 않는다.** 「어디에도 전송되지 않습니다」라고 말한 직후에 담아 둔 것이
          // 사라지면 방문자는 주문이 들어간 것으로 읽는다(verde-gourmet·technova-gear 와 같은 처리).
          setIsCartOpen(false);
        }}
      />
    </div>
  );
}
