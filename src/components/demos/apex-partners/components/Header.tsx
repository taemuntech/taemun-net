import { useState, useEffect } from 'react';
import { Lock, Menu, X, ArrowRight } from 'lucide-react';
import { CREST_LOGO_URL } from '../data/investmentData';

interface HeaderProps {
  onOpenVdr: () => void;
}

export default function Header({ onOpenVdr }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clocks, setClocks] = useState({
    seoul: '16:40 KST',
    sin: '15:40 SGT',
    ldn: '07:40 GMT',
    nyc: '02:40 EST',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const format = (tz: string) => {
        try {
          return new Intl.DateTimeFormat('en-GB', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now);
        } catch {
          return '00:00';
        }
      };

      setClocks({
        seoul: `${format('Asia/Seoul')} KST`,
        sin: `${format('Asia/Singapore')} SGT`,
        ldn: `${format('Europe/London')} GMT`,
        nyc: `${format('America/New_York')} EST`,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#090e17]/90 backdrop-blur-md border-b border-[#4d4635]/40 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-6 lg:px-14 max-w-[1680px] mx-auto h-20">
        {/* Brand Identity */}
        <div className="flex items-center gap-4">
          <a href="#hero" className="flex items-center gap-3 group">
            <img
              src={CREST_LOGO_URL}
              alt="Apex sovereign gold monogram crest"
              className="w-10 h-10 object-contain rounded p-0.5 border border-[#f2ca50]/40 group-hover:border-[#f2ca50] transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-serif-display text-xl tracking-tight text-[#f2ca50] uppercase font-bold">
                APEX PARTNERS
              </span>
              <span className="font-mono-metric text-[11px] tracking-widest text-[#d0c5af]/80 -mt-0.5 hidden lg:inline-block">
                아펙스 글로벌 파트너스 · SOVEREIGN CAPITAL
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono-metric text-[11px] tracking-wider uppercase">
          <a
            href="#hero"
            className="text-[#d0c5af] hover:text-[#f2ca50] transition-all duration-150 py-2"
          >
            운용사 개요 (Firm)
          </a>
          <a
            href="#strategies"
            className="text-[#f2ca50] border-b-2 border-[#f2ca50] font-medium tracking-wider py-2"
          >
            투자 전략 (Strategies)
          </a>
          <a
            href="#portfolio"
            className="text-[#d0c5af] hover:text-[#f2ca50] transition-all duration-150 py-2"
          >
            포트폴리오 (Portfolio)
          </a>
          <a
            href="#performance"
            className="text-[#d0c5af] hover:text-[#f2ca50] transition-all duration-150 py-2"
          >
            운용 성과 (Track Record)
          </a>
          <a
            href="#advisory"
            className="text-[#d0c5af] hover:text-[#f2ca50] transition-all duration-150 py-2"
          >
            글로벌 거점 (Presence)
          </a>
          <a
            href="#vdr"
            className="text-[#d0c5af] hover:text-[#f2ca50] transition-all duration-150 py-2"
          >
            인사이트 (Insights)
          </a>
        </nav>

        {/* Global Clocks & CTA */}
        <div className="flex items-center gap-4">
          {/* Real-time World Markets Clocks */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-[#161c24] border border-[#4d4635]/40 rounded text-[11px] font-mono-metric text-[#d0c5af]">
            <div className="flex items-center gap-1.5 border-r border-[#4d4635]/40 pr-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="text-[#dee2ef] font-semibold">SEL</span>
              <span className="text-[#f2ca50]">{clocks.seoul}</span>
            </div>
            <div className="flex items-center gap-1.5 border-r border-[#4d4635]/40 pr-3">
              <span className="text-[#d0c5af]/70">SIN</span>
              <span className="text-[#dee2ef]">{clocks.sin}</span>
            </div>
            <div className="flex items-center gap-1.5 border-r border-[#4d4635]/40 pr-3">
              <span className="text-[#d0c5af]/70">LDN</span>
              <span className="text-[#dee2ef]">{clocks.ldn}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#d0c5af]/70">NYC</span>
              <span className="text-[#dee2ef]">{clocks.nyc}</span>
            </div>
          </div>

          {/* LP Portal Gateway CTA */}
          <a
            href="#vdr"
            onClick={onOpenVdr}
            className="flex items-center gap-2 px-4 py-2 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] text-xs font-semibold rounded shadow-sm hover:shadow-[#f2ca50]/20 transition-all duration-150 whitespace-nowrap"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>LP Investor Portal</span>
          </a>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#dee2ef] hover:text-[#f2ca50] border border-[#4d4635]/40 rounded"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#4d4635]/40 bg-[#090e17] px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <a
            href="#hero"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-[#dee2ef] hover:text-[#f2ca50] py-1"
          >
            운용사 개요 (Firm)
          </a>
          <a
            href="#strategies"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-[#f2ca50] font-semibold py-1"
          >
            투자 전략 (Strategies)
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-[#dee2ef] hover:text-[#f2ca50] py-1"
          >
            포트폴리오 (Portfolio)
          </a>
          <a
            href="#performance"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-[#dee2ef] hover:text-[#f2ca50] py-1"
          >
            운용 성과 (Track Record)
          </a>
          <a
            href="#advisory"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-[#dee2ef] hover:text-[#f2ca50] py-1"
          >
            글로벌 거점 (Presence)
          </a>
          <a
            href="#vdr"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-[#dee2ef] hover:text-[#f2ca50] py-1"
          >
            인사이트 (Insights)
          </a>

          <div className="pt-3 border-t border-[#4d4635]/20 flex flex-wrap items-center justify-between text-[11px] font-mono-metric text-[#d0c5af]">
            <span>Seoul · SIN · LDN · NYC</span>
            <span className="text-[#4edea3]">가상 브랜드 샘플 (예시)</span>
          </div>
        </div>
      )}
    </header>
  );
}
