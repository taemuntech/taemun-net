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
import { EscrowModal } from './components/EscrowModal';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { INITIAL_CART_ITEM, HERO_ITEM } from './data/luxuryData';
import { CartItem, LuxuryItem } from './types';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface MaisonDeLuxeAppProps {
  isEmbed?: boolean;
}

export default function MaisonDeLuxeApp({ isEmbed }: MaisonDeLuxeAppProps = {}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([INITIAL_CART_ITEM]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSerialModalOpen, setIsSerialModalOpen] = useState<boolean>(false);
  const [selectedSerialCode, setSelectedSerialCode] = useState<string>('MDL-CH-89210-KR');
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState<boolean>(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState<boolean>(false);

  const handleToggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddToCart = (item: LuxuryItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          brand: item.brand,
          name: item.name,
          price: item.salePrice,
          taxNote: '관·부가세 전액 포함',
          image: item.image,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddToCartHero = () => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === 'chanel-classic-flap-initial');
      if (existing) {
        return prev.map((i) =>
          i.id === 'chanel-classic-flap-initial'
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...prev,
        {
          id: 'chanel-classic-flap-initial',
          brand: HERO_ITEM.brand,
          name: HERO_ITEM.name,
          price: HERO_ITEM.price,
          taxNote: '관·부가세 전액 포함',
          image: HERO_ITEM.image,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleOpenSerialForLot = (lotId: string) => {
    setSelectedSerialCode(lotId);
    setIsSerialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col relative selection:bg-[#d4af37] selection:text-[#0e0e0e]">
      {/* Top Application Bar */}
      <Header
        onOpenSerialModal={() => {
          setSelectedSerialCode('MDL-CH-89210-KR');
          setIsSerialModalOpen(true);
        }}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlistIds.size}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <HeroSection
          onOpenSerialModal={() => {
            setSelectedSerialCode('MDL-CH-89210-KR');
            setIsSerialModalOpen(true);
          }}
          onOpenConcierge={() => setIsConciergeOpen(true)}
          onAddToCartHero={handleAddToCartHero}
        />

        <InspectionSystem />

        <VaultCollection
          onOrderClick={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          searchQuery={searchQuery}
        />

        <PackagingService />

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
        onProceedCheckout={() => setIsEscrowModalOpen(true)}
      />

      {/* Serial Number & Cryptographic Authenticator Modal */}
      <SerialModal
        isOpen={isSerialModalOpen}
        onClose={() => setIsSerialModalOpen(false)}
        initialCode={selectedSerialCode}
      />

      {/* VIP 1:1 Concierge Live Chat Drawer */}
      <ConciergeChatDrawer
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      {/* Escrow Contract Confirmation Modal */}
      <EscrowModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        items={cartItems}
        onSuccess={() => {
          setCartItems([]);
          setSampleNoticeOpen(true);
        }}
      />

      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="maison-de-luxe"
        industry="commerce"
        featureName="장바구니 주문 및 안심 결제"
      />
    </div>
  );
}
