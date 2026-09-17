"use client";

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { TopNoticeBar } from './components/TopNoticeBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EngravingSimulator } from './components/EngravingSimulator';
import { ProductCollection } from './components/ProductCollection';
import { BojagiLookbook } from './components/BojagiLookbook';
import { DeliveryAndReviews } from './components/DeliveryAndReviews';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './data';
import { CartItem, CategoryKey, EngravingConfig, Product } from './types';

interface ArtisanGiftAppProps {
  isEmbed?: boolean;
}

export default function ArtisanGiftApp({ isEmbed }: ArtisanGiftAppProps = {}) {
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      productId: 'product-1',
      name: '베지터블 레더 비스포크 아코디언 카드지갑',
      image: PRODUCTS[0].image,
      unitPrice: 89000,
      packagingName: '연꽃 실크 보자기 (+₩5,000)',
      packagingPrice: 5000,
      quantity: 1,
      engraving: {
        text: 'H. G. LEE',
        method: '24K 골드박 각인',
        font: '클래식 세리프',
      },
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  // 헤더 카테고리 메뉴와 컬렉션 필터가 같은 값을 본다 — 메뉴를 누르면 목록이 실제로 바뀐다
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [favorites, setFavorites] = useState<string[]>(['product-1', 'product-3']);
  // 머리말 하트와 컬렉션의 「찜한 작품 N」 칩이 같은 값을 본다.
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [sampleActionName, setSampleActionName] = useState('주문 결제 및 예약');

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderProduct = (product: Product, selectedPackagingId: string) => {
    const packaging = product.packagingOptions.find((opt) => opt.id === selectedPackagingId) || product.packagingOptions[0];
    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      unitPrice: product.price,
      packagingName: packaging.name,
      packagingPrice: packaging.price,
      quantity: 1,
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleApplyEngraving = (config: EngravingConfig) => {
    const wallet = PRODUCTS[0];
    const newItem: CartItem = {
      id: `cart-engraved-${Date.now()}`,
      productId: wallet.id,
      name: `${wallet.name} (비스포크 각인 커스텀)`,
      image: wallet.image,
      unitPrice: wallet.price,
      packagingName: '연꽃 실크 보자기 (+₩5,000)',
      packagingPrice: 5000,
      quantity: 1,
      engraving: {
        text: config.text || 'INITIAL',
        method: config.method === 'gold' ? '24K 골드박' : config.method === 'blind' ? '불도장 음각' : '앤틱 로즈골드박',
        font: config.font,
      },
    };

    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleOpenNotice = (actionName: string) => {
    setSampleActionName(actionName);
    setSampleNoticeOpen(true);
  };

  /**
   * 머리말 하트 — 컬렉션의 「찜한 작품」 필터를 켜고 그 구역으로 데려간다.
   * 예전에는 배지에 「찜 2」가 떠 있는데 누르면 「샘플입니다」 안내창만 떴다. 되는 기능을 안 되는 척했다.
   */
  const handleShowFavorites = () => {
    setOnlyFavorites(true);
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#3e1c06] selection:bg-[#f6b998] selection:text-[#3e1c06]">
      {/* 1. Top Notice Announcement Bar */}
      <TopNoticeBar />

      {/* 2. Primary Navigation Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        favoritesCount={favorites.length}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={handleShowFavorites}
        onOpenConcierge={() => handleOpenNotice('1:1 비스포크 장인 컨시어지 상담')}
        onOpenProfile={() => handleOpenNotice('회원 등급 및 마이페이지 조회')}
      />

      <main className="flex-1 flex flex-col">
        {/* 3. Hero Editorial Section: 30-Year Master Leathercraft Story */}
        <HeroSection />

        {/* 4. Live Bespoke Foil Engraving Simulator */}
        <EngravingSimulator onApplyEngraving={handleApplyEngraving} />

        {/* 5. Masterpiece Collection 4-Column Product Grid */}
        <ProductCollection
          activeCategory={activeCategory}
          onChangeCategory={setActiveCategory}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOrderProduct={handleOrderProduct}
          onGiftLink={(product) => handleOpenNotice(`${product.name} 선물 링크 보내기`)}
          onlyFavorites={onlyFavorites}
          onChangeOnlyFavorites={setOnlyFavorites}
        />

        {/* 6. Traditional Bojagi Gift Wrapping Knot Lookbook */}
        <BojagiLookbook />

        {/* 7. Scheduled Delivery Reservation & Real Unboxing Reviews */}
        <DeliveryAndReviews />
      </main>

      {/* 8. Heritage Certified Footer */}
      <Footer onOpenConcierge={() => handleOpenNotice('1:1 장인 아틀리에 비스포크 컨시어지 상담')} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => handleOpenNotice('비스포크 공예 선물 주문 결제')}
      />

      {/* Demo Sample Notice Modal */}
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="artisan-gift"
        featureName={sampleActionName}
        kind="sample"
        industry="commerce"
      />
    </div>
  );
}
