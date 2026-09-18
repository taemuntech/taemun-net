import { useState, useEffect } from 'react';
import { Lock, Menu, X } from 'lucide-react';
import { CREST_LOGO_URL } from '../data/investmentData';

interface HeaderProps {
  onOpenVdr: () => void;
}

/**
 * 내비게이션 라벨은 실제로 도착하는 구역의 이름으로만 적는다.
 * (전에는 #performance 를 「운용 성과」, #advisory 를 「글로벌 거점」, #vdr 를 「인사이트」로 불러
 *  눌러 보면 다른 화면이 나왔다 — 존재하지 않는 페이지를 가리키는 셈이었다.)
 *
 * `label` 은 서랍(좁은 폭) 용 전체 이름, `short` 는 가로 막대 용 짧은 이름이다.
 * 전체 이름 6개를 가로 막대에 그대로 넣으면 1440 에서 글자가 두 줄로 접히며 상호와 **겹쳤다**.
 */
const NAV_ITEMS: { id: string; label: string; short: string }[] = [
  { id: 'hero', label: '운용사 개요 (Firm)', short: '운용사 개요' },
  { id: 'strategies', label: '투자 전략 (Strategies)', short: '투자 전략' },
  { id: 'portfolio', label: '포트폴리오 (Portfolio)', short: '포트폴리오' },
  { id: 'performance', label: '수익 시뮬레이터 (Simulator)', short: '시뮬레이터' },
  { id: 'advisory', label: '자문 위원회 (Advisory)', short: '자문 위원회' },
  { id: 'vdr', label: 'LP 데이터룸 (VDR)', short: 'LP 데이터룸' },
];

export default function Header({ onOpenVdr }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [crestFailed, setCrestFailed] = useState(false);
  // 현재 보고 있는 구역 — 전에는 「투자 전략」에 활성 표시가 고정돼 있어 스크롤해도 바뀌지 않았다.
  const [activeId, setActiveId] = useState('hero');
  const [clocks, setClocks] = useState({
    seoul: '--:-- KST',
    sin: '--:-- SGT',
    ldn: '--:-- GMT',
    nyc: '--:-- EST',
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
          return '--:--';
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

  // 스크롤 위치에 따라 활성 메뉴를 실제로 갱신한다(모바일 서랍의 표시도 같은 값을 쓴다).
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      // 위쪽은 sticky 헤더(80px) 만큼, 아래쪽은 화면 절반을 잘라 「지금 읽는 구역」만 남긴다
      { rootMargin: '-96px 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'vdr') onOpenVdr();
  };

  return (
    // 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header className="sticky top-[var(--sample-bar-h,0px)] z-50 bg-[#090e17]/90 backdrop-blur-md border-b border-[#4d4635]/40 transition-all duration-200">
      <div className="flex justify-between items-center gap-3 w-full px-4 sm:px-6 lg:px-14 max-w-7xl mx-auto h-20">
        {/* Brand Identity — 375px 에서 상호가 두 줄로 접혀 LP 버튼과 겹쳤다. 한 줄 고정 + 단계별 크기로 막는다. */}
        <div className="flex items-center min-w-0">
          <a
            href="#hero"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group min-w-0"
          >
            {crestFailed ? (
              <span
                aria-hidden="true"
                className="w-10 h-10 shrink-0 rounded border border-[#f2ca50]/40 bg-[#161c24] flex items-center justify-center font-serif-display text-sm font-bold text-[#f2ca50] group-hover:border-[#f2ca50] transition-all duration-300"
              >
                AP
              </span>
            ) : (
              <img
                src={CREST_LOGO_URL}
                alt="Apex sovereign gold monogram crest"
                className="w-10 h-10 shrink-0 object-contain rounded p-0.5 border border-[#f2ca50]/40 group-hover:border-[#f2ca50] transition-all duration-300"
                referrerPolicy="no-referrer"
                onError={() => setCrestFailed(true)}
              />
            )}
            <span className="flex flex-col min-w-0">
              <span className="font-serif-display text-sm sm:text-lg lg:text-xl tracking-tight text-[#f2ca50] uppercase font-bold whitespace-nowrap">
                APEX PARTNERS
              </span>
              <span className="font-mono-metric text-[11px] tracking-widest text-[#d0c5af]/80 -mt-0.5 hidden lg:inline-block whitespace-nowrap">
                아펙스 글로벌 파트너스 · SOVEREIGN CAPITAL
              </span>
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        {/* 가로 막대는 1280(xl) 부터 — 1024~1279 에서는 상호·시각·CTA 만으로도 자리가 없어 서랍으로 내린다 */}
        <nav className="hidden xl:flex shrink-0 items-center gap-5 font-mono-metric text-[11px] tracking-wider uppercase">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                title={item.label}
                className={
                  isActive
                    ? 'whitespace-nowrap text-[#f2ca50] border-b-2 border-[#f2ca50] font-medium tracking-wider py-2'
                    : 'whitespace-nowrap text-[#d0c5af] hover:text-[#f2ca50] transition-all duration-150 py-2 border-b-2 border-transparent'
                }
              >
                {item.short}
              </a>
            );
          })}
        </nav>

        {/* Global Clocks & CTA */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* 세계 시각 — 가로 막대에는 서울 시각만 둔다. 전에는 1620px 부터 네 도시(SEL·SIN·LDN·NYC) 묶음으로
              바꿨는데, 그건 헤더 안쪽 줄이 1680 까지 넓어질 때의 이야기다. 본문 폭을 1280(max-w-7xl) 으로 묶은 뒤로는
              어떤 화면에서도 안쪽 줄이 1280 화면과 같은 폭이라, 1280 에서도 자리가 없던 네 도시 묶음은 넣을 곳이 없다
              (넣으면 상호 부제가 잘린다). 싱가포르 시각은 서랍(xl 미만)에 그대로 있다. */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#161c24] border border-[#4d4635]/40 rounded text-[11px] font-mono-metric">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
            <span className="text-[#dee2ef] font-semibold">SEL</span>
            <span className="text-[#f2ca50]">{clocks.seoul}</span>
          </div>

          {/* LP Portal Gateway CTA */}
          <a
            href="#vdr"
            onClick={() => handleNavClick('vdr')}
            className="flex items-center justify-center gap-2 min-h-11 px-3 sm:px-4 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] text-xs font-semibold rounded shadow-sm hover:shadow-[#f2ca50]/20 transition-all duration-150 whitespace-nowrap"
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">LP Investor Portal</span>
            <span className="sm:hidden">LP 포털</span>
          </a>

          {/* Mobile Drawer Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기/닫기"
            aria-expanded={mobileMenuOpen}
            aria-controls="apex-mobile-nav"
            className="xl:hidden flex items-center justify-center min-h-11 min-w-11 text-[#dee2ef] hover:text-[#f2ca50] border border-[#4d4635]/40 rounded"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="apex-mobile-nav"
          className="xl:hidden border-b border-[#4d4635]/40 bg-[#090e17] px-6 py-3 flex flex-col animate-in slide-in-from-top-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-center min-h-11 text-sm ${ isActive ? 'text-[#f2ca50] font-semibold' : 'text-[#dee2ef] hover:text-[#f2ca50]' }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="mt-3 pt-3 border-t border-[#4d4635]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-metric text-[#d0c5af]">
            <span>
              SEL {clocks.seoul} · SIN {clocks.sin}
            </span>
            <span className="text-[#4edea3]">가상 브랜드 샘플 (예시)</span>
          </div>
        </div>
      )}
    </header>
  );
}
