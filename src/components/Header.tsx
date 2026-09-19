"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ExternalLink,
  Menu,
  PhoneCall,
  X,
  Layers,
  FileText,
  Activity,
  ArrowRight,
  Compass,
  Send,
  Cpu,
  Globe,
  Landmark,
  Crown,
  Dna,
  Boxes,
  Satellite,
  TrendingUp,
  Palmtree,
  Ship,
  Zap,
  Sprout,
  ShoppingBag,
  Apple,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
// ⚠️ **타입만** 가져온다. 값(HEADER_DEMO_LINKS)을 import 하면 이 파일이 'use client' 라
// 회사 이름·설명·/demo/<slug> 가 클라이언트 청크에 다시 박힌다 — 이 화면을 고친 이유가 그것이다.
// 이 파일에는 slug·회사 이름·설명이 한 글자도 없어야 한다(slug 자체가 회사 이름이나 마찬가지다).
import type { DemoLinkIconKey, DemoLinkTone, HeaderDemoLink } from "@/lib/portfolio/header-links";
import { BrandLockup } from "@/components/BrandMark";

/**
 * 자사 서비스 「태문브릿지」 링크(데스크톱 드롭다운·모바일 메뉴 두 곳)를 보일지.
 * 2026-09-19 형: 브릿지 잠정 중단 — 다시 열면 이 줄만 되돌린다(true).
 * 홈·/portfolio 카드는 src/content/portfolio/taemun-bridge.json 의 "paused" 칸이 따로 가른다 — 다시 열 때 그 칸도 지운다.
 */
const SHOW_TAEMUN_BRIDGE: boolean = false;

/**
 * 홈 구획으로 가는 메뉴 — **앞에 「/」 를 붙인 절대 주소**로 둔다.
 *
 * 왜(2026-09-19 오픈 점검 P1-13): 이 헤더는 홈과 /portfolio 두 곳에서 그려진다. 예전엔 `#gallery` 처럼 해시만 적어서
 * /portfolio 에서 누르면 /portfolio#gallery 가 되어 **아무 일도 안 일어났다**(그 페이지엔 그 구획이 없다).
 * `/#gallery` 면 다른 페이지에서는 홈으로 가서 그 구획으로 내려간다(HomeView 가 첫 렌더 뒤 해시를 읽어 스크롤한다).
 * **홈에서는 그리는 순간 앞의 「/」 를 떼어 `#gallery` 로 둔다**(sectionHref). 해시만 다른 주소여야 새로 불러오지 않고 스크롤만
 * 하는데, `/?utm_source=kakao` 처럼 쿼리가 붙은 홈에서 `/#gallery` 는 쿼리가 달라 **문서를 통째로 다시 불러왔다**
 * (서버 렌더·DB 읽기·쿼리 소실·펼친 분류 초기화). 해시만 적힌 주소는 쿼리를 그대로 두므로 어떤 쿼리에서도 스크롤만 한다.
 * next/link 가 아니라 <a> 로 두는 이유: Link 는 해시 이동을 pushState 로 해서 hashchange 가 안 난다 —
 * 홈의 「#project-… 이면 분류를 펼친다」 처리가 그 이벤트에 걸려 있다.
 * 데스크톱 메뉴와 모바일 메뉴가 이 한 표를 같이 돈다(라벨만 다르다).
 */
const SECTION_LINKS: readonly { href: string; label: string; mobileLabel: string }[] = [
  { href: "/#gallery", label: "갤러리 아카이브", mobileLabel: "갤러리 아카이브" },
  { href: "/#capabilities", label: "전문 영역", mobileLabel: "전문 영역 (Capabilities)" },
  { href: "/#process", label: "개발 프로세스", mobileLabel: "개발 프로세스 (Process)" },
];

/** 업종별로 골라 보는 목록 화면. 09-19 점검 때까지 홈 어디에도 이 주소로 가는 링크가 없었다(P1-13) */
const PORTFOLIO_HREF = "/portfolio";

/**
 * 색 이름 → Tailwind 클래스.
 *
 * ⚠️ Tailwind v4 는 소스에서 **클래스 이름 문자열을 훑어** CSS 를 만든다. 그래서 `bg-${tone}-100` 처럼
 * 조합하면 그 클래스가 아예 생성되지 않아 스타일이 통째로 사라진다 — 반드시 완전한 이름을 리터럴로 적는다.
 */
const TONE_CLASSES: Record<
  DemoLinkTone,
  { dropdownItem: string; dropdownIcon: string; dropdownBadge: string; mobileItem: string; mobileIcon: string; mobileBadge: string }
> = {
  blue: {
    dropdownItem: "hover:bg-blue-50/60 hover:border-blue-200",
    dropdownIcon: "bg-blue-100 text-blue-800 border-blue-200",
    dropdownBadge: "bg-blue-100 text-blue-800",
    mobileItem: "hover:border-blue-400",
    mobileIcon: "text-blue-700",
    mobileBadge: "bg-blue-100 text-blue-800",
  },
  amber: {
    dropdownItem: "hover:bg-amber-50/60 hover:border-amber-200",
    dropdownIcon: "bg-amber-100 text-amber-800 border-amber-200",
    dropdownBadge: "bg-amber-100 text-amber-800",
    mobileItem: "hover:border-amber-400",
    mobileIcon: "text-amber-700",
    mobileBadge: "bg-amber-100 text-amber-800",
  },
  stone: {
    dropdownItem: "hover:bg-stone-100 hover:border-stone-300",
    dropdownIcon: "bg-stone-200 text-stone-800 border-stone-300",
    dropdownBadge: "bg-stone-200 text-stone-800",
    mobileItem: "hover:border-stone-400",
    mobileIcon: "text-stone-700",
    mobileBadge: "bg-stone-200 text-stone-800",
  },
  rose: {
    dropdownItem: "hover:bg-rose-50/60 hover:border-rose-200",
    dropdownIcon: "bg-rose-100 text-rose-800 border-rose-200",
    dropdownBadge: "bg-rose-100 text-rose-800",
    mobileItem: "hover:border-rose-400",
    mobileIcon: "text-rose-800",
    mobileBadge: "bg-rose-100 text-rose-800",
  },
  cyan: {
    dropdownItem: "hover:bg-cyan-50/60 hover:border-cyan-200",
    dropdownIcon: "bg-cyan-100 text-cyan-800 border-cyan-200",
    dropdownBadge: "bg-cyan-100 text-cyan-800",
    mobileItem: "hover:border-cyan-400",
    mobileIcon: "text-cyan-700",
    mobileBadge: "bg-cyan-100 text-cyan-800",
  },
  emerald: {
    dropdownItem: "hover:bg-emerald-50/60 hover:border-emerald-200",
    dropdownIcon: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dropdownBadge: "bg-emerald-100 text-emerald-800",
    mobileItem: "hover:border-emerald-400",
    mobileIcon: "text-emerald-700",
    mobileBadge: "bg-emerald-100 text-emerald-800",
  },
  teal: {
    dropdownItem: "hover:bg-teal-50/60 hover:border-teal-200",
    dropdownIcon: "bg-teal-100 text-teal-800 border-teal-200",
    dropdownBadge: "bg-teal-100 text-teal-800",
    mobileItem: "hover:border-teal-400",
    mobileIcon: "text-teal-700",
    mobileBadge: "bg-teal-100 text-teal-800",
  },
  indigo: {
    dropdownItem: "hover:bg-indigo-50/60 hover:border-indigo-200",
    dropdownIcon: "bg-indigo-100 text-indigo-800 border-indigo-200",
    dropdownBadge: "bg-indigo-100 text-indigo-800",
    mobileItem: "hover:border-indigo-400",
    mobileIcon: "text-indigo-700",
    mobileBadge: "bg-indigo-100 text-indigo-800",
  },
  sky: {
    dropdownItem: "hover:bg-sky-50/60 hover:border-sky-200",
    dropdownIcon: "bg-sky-100 text-sky-800 border-sky-200",
    dropdownBadge: "bg-sky-100 text-sky-800",
    mobileItem: "hover:border-sky-400",
    mobileIcon: "text-sky-700",
    mobileBadge: "bg-sky-100 text-sky-800",
  },
  // 짙은 스톤 바탕 + 앰버 글자 — 색 이름 하나로 안 되는 짝이라 지도에만 이름을 둔다.
  onyx: {
    dropdownItem: "hover:bg-stone-100 hover:border-stone-300",
    dropdownIcon: "bg-stone-900 text-amber-300 border-stone-800",
    dropdownBadge: "bg-amber-100 text-amber-900",
    mobileItem: "hover:border-stone-400",
    mobileIcon: "text-amber-700",
    mobileBadge: "bg-amber-100 text-amber-900",
  },
  // amber 와 같은 계열이지만 글자만 한 단계 짙다.
  gold: {
    dropdownItem: "hover:bg-amber-50/60 hover:border-amber-200",
    dropdownIcon: "bg-amber-100 text-amber-900 border-amber-200",
    dropdownBadge: "bg-amber-100 text-amber-900",
    mobileItem: "hover:border-amber-400",
    mobileIcon: "text-amber-800",
    mobileBadge: "bg-amber-100 text-amber-900",
  },
  // 검정 바탕 + 형광 라임 글자 — onyx 와 같은 이유로 이름을 따로 뒀다.
  noir: {
    dropdownItem: "hover:bg-zinc-100 hover:border-zinc-300",
    dropdownIcon: "bg-zinc-900 text-[#caf300] border-zinc-700",
    dropdownBadge: "bg-zinc-900 text-[#caf300]",
    mobileItem: "hover:border-zinc-900",
    mobileIcon: "text-zinc-900",
    mobileBadge: "bg-zinc-900 text-[#caf300]",
  },
};

/** 아이콘 이름 → lucide 컴포넌트 */
const DEMO_ICONS: Record<DemoLinkIconKey, LucideIcon> = {
  globe: Globe,
  compass: Compass,
  landmark: Landmark,
  crown: Crown,
  cpu: Cpu,
  activity: Activity,
  dna: Dna,
  boxes: Boxes,
  satellite: Satellite,
  layers: Layers,
  trendingUp: TrendingUp,
  palmtree: Palmtree,
  ship: Ship,
  zap: Zap,
  sprout: Sprout,
  shoppingBag: ShoppingBag,
  apple: Apple,
  sparkles: Sparkles,
};

export type HeaderProps = {
  /**
   * 드롭다운·모바일 메뉴에 실을 내부 데모 목록 — **서버가 공개 상태로 걸러서** 넘겨 준다
   * (src/lib/portfolio/header-links.ts 의 listedDemoLinks).
   *
   * 기본값이 빈 배열인 것은 일부러다: 안 넘기면 아무 것도 안 뜨는 쪽으로 넘어진다(안전한 기본값).
   * 회사 이름이 새는 방향으로 넘어지지 않게 하려는 것이다.
   */
  demoLinks?: readonly HeaderDemoLink[];
};

export default function Header({ demoLinks = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // 지금 /portfolio 면 그 메뉴에 「현재 페이지」 표시(aria-current)를 붙인다
  const pathname = usePathname();
  const onPortfolio = pathname === PORTFOLIO_HREF;
  /** 홈이면 해시만(쿼리 유지·스크롤만), 다른 페이지면 `/#…`(홈으로 이동) — SECTION_LINKS 주석 */
  const sectionHref = (href: string) => (pathname === "/" ? href.slice(1) : href);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPortfolioDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 lg:gap-3 group min-w-0" onClick={() => setMobileMenuOpen(false)}>
          {/* 로고는 견적 화면 헤더와 같은 한 곳(BrandMark.tsx)에서 그린다 */}
          <BrandLockup />
        </Link>

        {/* Desktop Navigation (lg:flex) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-zinc-600">
          {/* 누르는 자리는 44px(min-h-11) — 글자 크기·간격은 그대로이고 위아래 여백만 넓어진다(헤더가 h-20 이라 보이는 차이 없음) */}
          {SECTION_LINKS.map((link) => (
            <a key={link.href} href={sectionHref(link.href)} className="inline-flex items-center min-h-11 hover:text-zinc-950 transition-colors py-1">
              {link.label}
            </a>
          ))}

          <Link
            href={PORTFOLIO_HREF}
            aria-current={onPortfolio ? "page" : undefined}
            className={`inline-flex items-center min-h-11 hover:text-zinc-950 transition-colors py-1 ${onPortfolio ? "text-zinc-950" : ""}`}
          >
            포트폴리오
          </Link>

          {/* Unified Portfolio & Solutions Dropdown */}
          {/* 내부 데모가 0개여도 아래 자사 서비스(T-DOCS) 줄은 항상 남는다(태문브릿지는 잠정 중단 — SHOW_TAEMUN_BRIDGE) —
              그래서 이 버튼을 눌렀을 때 빈 상자가 뜨는 경우는 없다. */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortfolioDropdownOpen(!portfolioDropdownOpen)}
              className="flex items-center gap-1.5 py-2 hover:text-zinc-950 transition-colors font-semibold text-zinc-600 focus:outline-none cursor-pointer"
            >
              <span>라이브 데모 &amp; 솔루션</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${portfolioDropdownOpen ? "rotate-180 text-zinc-800" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {portfolioDropdownOpen && (
              // 헤더가 fixed 라 드롭다운이 뷰포트를 넘치면 페이지를 스크롤해도 넘친 줄에 닿을 수 없다.
              // 데모가 늘면 바로 그렇게 된다(지금 22줄 ≈ 1,400px > 세로 768px 노트북) — 목록 자체를 스크롤하게 둔다.
              <div className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-white border border-zinc-200 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 text-left max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-contain">

                {/* 내부 데모 — 서버가 「공개」인 것만 걸러서 내려 준 배열 */}
                {demoLinks.map((link) => {
                  const tone = TONE_CLASSES[link.tone];
                  const Icon = DEMO_ICONS[link.iconKey];
                  return (
                    <Link
                      key={link.slug}
                      href={`/demo/${link.slug}`}
                      onClick={() => setPortfolioDropdownOpen(false)}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all group border border-transparent ${tone.dropdownItem}`}
                    >
                      <div className={`p-2 rounded-lg border shrink-0 group-hover:scale-105 transition-transform ${tone.dropdownIcon}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                          <span>{link.label}</span>
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${tone.dropdownBadge}`}>{link.badge}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                          {link.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}

                {/* T-DOCS */}
                <a
                  href="https://tdocs.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-purple-50/60 transition-all group border border-transparent hover:border-purple-200"
                >
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-800 border border-purple-200 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                      <span>T-DOCS (티독스)</span>
                      <ExternalLink className="w-3 h-3 text-purple-600" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      업종별 서식 편집 &amp; 모바일 전자서명 SaaS
                    </p>
                  </div>
                </a>

                {/* Taemun Bridge — 2026-09-19 잠정 중단, SHOW_TAEMUN_BRIDGE 참고 */}
                {SHOW_TAEMUN_BRIDGE && (
                <a
                  href="https://taemun.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setPortfolioDropdownOpen(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 transition-all group border border-transparent hover:border-blue-200"
                >
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800 border border-blue-200 shrink-0 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                      <span>태문브릿지</span>
                      <ExternalLink className="w-3 h-3 text-blue-600" />
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 leading-tight">
                      건축·설비 엔지니어링 매칭 B2B 플랫폼
                    </p>
                  </div>
                </a>
                )}
              </div>
            )}
          </div>

          {/* Direct Inquiry Link */}
          <Link
            href="/inquiry"
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-black text-white font-bold text-xs transition-all shadow-sm"
          >
            <span>프로젝트 견적 의뢰</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Button (lg:hidden) */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200 transition-colors focus:outline-none"
            aria-label="모바일 메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (lg:hidden) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white/98 backdrop-blur-2xl z-50 p-6 overflow-y-auto border-t border-zinc-200 animate-in slide-in-from-top duration-200">
          <div className="max-w-md mx-auto space-y-6">

            {/* Primary Nav Links */}
            <div className="space-y-3 pb-6 border-b border-zinc-200">
              {/* 모바일은 손가락으로 누르므로 한 줄을 44px(min-h-11) 로 둔다 — 예전 py-1 은 36px 남짓이었다 */}
              {SECTION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-11 text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors py-1"
                >
                  {link.mobileLabel}
                </a>
              ))}
              <Link
                href={PORTFOLIO_HREF}
                aria-current={onPortfolio ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center min-h-11 text-lg font-bold text-zinc-900 hover:text-amber-700 transition-colors py-1"
              >
                포트폴리오 (Portfolio)
              </Link>
            </div>

            {/* Operating Solutions Section */}
            {/* 데스크톱 드롭다운과 같은 배열을 돈다. 내부 데모가 0개여도 자사 서비스 두 줄이 남으므로
                이 구획이 빈 채로 뜨지는 않는다. */}
            <div>
              <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                운영 솔루션 &amp; 라이브 데모
              </div>
              <div className="space-y-2">
                {demoLinks.map((link) => {
                  const tone = TONE_CLASSES[link.tone];
                  const Icon = DEMO_ICONS[link.iconKey];
                  return (
                    <Link
                      key={link.slug}
                      href={`/demo/${link.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left transition-all ${tone.mobileItem}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${tone.mobileIcon}`} />
                        <div>
                          <div className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                            <span>{link.mobileLabel ?? link.label}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${tone.mobileBadge}`}>{link.badge}</span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">{link.mobileDescription}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </Link>
                  );
                })}

                <a
                  href="https://tdocs.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-purple-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                        <span>T-DOCS (티독스)</span>
                        <ExternalLink className="w-3 h-3 text-purple-600" />
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">모바일 전자서명 SaaS</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </a>

                {/* Taemun Bridge — 2026-09-19 잠정 중단, SHOW_TAEMUN_BRIDGE 참고 */}
                {SHOW_TAEMUN_BRIDGE && (
                <a
                  href="https://taemun.co.kr"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-blue-400 text-left transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-blue-700" />
                    <div>
                      <div className="text-sm font-bold text-zinc-900 flex items-center gap-1">
                        <span>태문브릿지</span>
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">건축·설비 엔지니어링 매칭 플랫폼</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </a>
                )}
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-3">
              <Link
                href="/inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-black"
              >
                <Send className="w-4 h-4" />
                <span>프로젝트 무료 맞춤 견적 문의하기</span>
              </Link>

              <a
                href="tel:010-8672-6463"
                className="w-full py-3.5 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-900 font-bold text-sm flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-zinc-700" />
                <span>총괄 아키텍트 직통 연결</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
