"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowUp,
  ArrowRight,
  ChevronRight,
  Landmark,
  FileSpreadsheet,
  Download,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { INITIAL_STOCK, IR_HUB_ITEMS } from '../data';
import { IrHubItem, StockData } from '../types';

interface IrStockSectionProps {
  onSelectIrItem: (item: IrHubItem) => void;
  onOpenStockDetail: () => void;
}

export const IrStockSection: React.FC<IrStockSectionProps> = ({
  onSelectIrItem,
  onOpenStockDetail,
}) => {
  const [stock, setStock] = useState<StockData>(INITIAL_STOCK);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshStock = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate minor fluctuation
      const delta = (Math.random() - 0.4) * 200;
      const roundedDelta = Math.round(delta / 50) * 50;
      const newPrice = Math.max(25000, stock.price + roundedDelta);
      const newDiff = newPrice - stock.prevClose;
      const newRate = Number(((newDiff / stock.prevClose) * 100).toFixed(2));

      setStock({
        ...stock,
        price: newPrice,
        change: Math.abs(newDiff),
        changeRate: newRate,
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' KST',
      });
      setIsRefreshing(false);
    }, 400);
  };

  const getIrIcon = (type: IrHubItem['iconType']) => {
    switch (type) {
      case 'balance':
        return <Landmark className="w-7 h-7 text-[#003d9b]" />;
      case 'document':
        return <FileSpreadsheet className="w-7 h-7 text-[#003d9b]" />;
      case 'download':
        return <Download className="w-7 h-7 text-[#003d9b]" />;
      case 'support':
        return <HelpCircle className="w-7 h-7 text-[#003d9b]" />;
      default:
        return <Landmark className="w-7 h-7 text-[#003d9b]" />;
    }
  };

  const isPositive = stock.changeRate >= 0;

  return (
    <section className="py-24 bg-[#faf8ff] relative" id="ir">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Live Stock & Market Status Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#283044] text-white p-8 rounded-xl border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#0052cc]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#c6e7ff] font-bold">
                  KOSDAQ : {stock.code}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefreshStock}
                    title="시세 새로고침"
                    className="text-white/60 hover:text-white p-1 transition-colors"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#c6e7ff]' : ''}`}
                    />
                  </button>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    실시간 주가 연동
                  </span>
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-1">{stock.name}</h3>
              <p className="text-sm text-[#d2d9f4] mb-8 font-light">
                {stock.englishName} Stock Information
              </p>

              {/* Stock Price Display */}
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-mono text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {stock.price.toLocaleString()}
                </span>
                <span className="text-xl text-[#d2d9f4] font-medium">KRW</span>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border mb-8 ${
                  isPositive
                    ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/20'
                    : 'text-red-400 bg-red-950/40 border-red-500/20'
                }`}
              >
                <ArrowUp
                  className={`w-4 h-4 ${!isPositive ? 'rotate-180 text-red-400' : ''}`}
                />
                <span>
                  {isPositive ? '+' : '-'}
                  {stock.change.toLocaleString()} ({isPositive ? '+' : ''}
                  {stock.changeRate}%, 전일대비)
                </span>
              </div>

              {/* Key Indicators Array */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-sm">
                <div>
                  <span className="font-mono text-xs text-[#d2d9f4]/80 block mb-1">
                    전일 종가
                  </span>
                  <span className="font-mono text-sm text-white font-semibold">
                    {stock.prevClose.toLocaleString()} KRW
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#d2d9f4]/80 block mb-1">
                    시가총액
                  </span>
                  <span className="font-mono text-sm text-white font-semibold">
                    {stock.marketCap}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#d2d9f4]/80 block mb-1">
                    외국인 소진율
                  </span>
                  <span className="font-mono text-sm text-white font-semibold">
                    {stock.foreignOwnership}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-xs text-[#d2d9f4]/80 block mb-1">
                    기준 일시
                  </span>
                  <span className="font-mono text-sm text-white font-semibold">
                    {stock.timestamp}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs text-[#d2d9f4]/80">
              <span>제공: 한국거래소(KRX) 20분 지연</span>
              <button
                type="button"
                onClick={onOpenStockDetail}
                className="text-[#c6e7ff] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>주식정보 상세보기</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

          {/* IR Quick Hub (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-[#003d9b] uppercase tracking-wider block mb-2 font-bold">
                Investor Relations
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#131b2e] tracking-tight">
                투명한 경영으로 주주 가치를 증대합니다
              </h2>
              <p className="text-base text-[#434654] mt-2 leading-relaxed">
                원익큐앤씨는 정기 경영 실적 공시와 IR 컨퍼런스를 통해 시장과의 투명하고 적극적인 소통을 실천하고 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {IR_HUB_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectIrItem(item)}
                  className="group p-6 bg-white rounded-xl border border-[#c3c6d6]/40 hover:border-[#003d9b] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      {getIrIcon(item.iconType)}
                      <ChevronRight className="w-5 h-5 text-[#737685] group-hover:text-[#003d9b] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h4 className="text-lg font-bold text-[#131b2e] mb-1 group-hover:text-[#003d9b] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#434654] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-[#0052cc]">
                    <span>상세 자료 열람</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
