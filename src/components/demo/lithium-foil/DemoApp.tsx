"use client";

// 소재 공정 데이터 플랫폼 데모 — 셸.
// 헤더·히어로·탭 바·탭 패널·상담 CTA·푸터를 소유하고, 탭 상태와 계보 조회 대상을 화면 사이에 중계한다.
// 데이터는 DemoDataProvider 안에서 각 화면이 useDemoData() 로 직접 읽는다.

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  GitBranch,
  LayoutDashboard,
  Lightbulb,
  Mail,
  NotebookPen,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { DemoDataProvider, useDemoData } from "./DemoDataContext";
import KpiBoard from "./screens/KpiBoard";
import RollLogForm from "./screens/RollLogForm";
import TraceExplorer from "./screens/TraceExplorer";
import SuggestionsPanel from "./screens/SuggestionsPanel";
import SchemaView from "./screens/SchemaView";
import type { DemoTab, TraceTarget } from "./screens/types";
import { fmtNum } from "./ui";

type TabDef = { key: DemoTab; label: string; icon: LucideIcon };

const TABS: TabDef[] = [
  { key: "kpi", label: "KPI 보드", icon: LayoutDashboard },
  { key: "log", label: "롤 일지 입력", icon: NotebookPen },
  { key: "trace", label: "계보 추적", icon: GitBranch },
  { key: "suggest", label: "개선 제안", icon: Lightbulb },
  { key: "schema", label: "데이터 구조", icon: Database },
];

const DEFAULT_TAB: DemoTab = "kpi";
/** 고정 헤더 높이(h-20 = 80px) — 탭 바로 스크롤할 때 이만큼 비운다 */
const HEADER_OFFSET_PX = 80;
const PANEL_ID = "lithium-demo-panel";

function isDemoTab(value: string): value is DemoTab {
  return TABS.some((t) => t.key === value);
}

function tabId(key: DemoTab): string {
  return `lithium-demo-tab-${key}`;
}

export default function DemoApp() {
  return (
    <DemoDataProvider>
      <DemoShell />
    </DemoDataProvider>
  );
}

function DemoShell() {
  const [tab, setTab] = useState<DemoTab>(DEFAULT_TAB);
  const [traceTarget, setTraceTarget] = useState<TraceTarget | null>(null);
  const [hashReady, setHashReady] = useState(false);

  /** 탭 바 바로 위의 흐름 요소 — sticky 요소는 붙어 있을 때 위치가 바뀌므로 이것을 기준으로 스크롤한다 */
  const anchorRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<Partial<Record<DemoTab, HTMLButtonElement | null>>>({});

  // 마운트 후에만 URL 해시를 읽는다 (렌더 중 window 접근 금지 — 하이드레이션)
  useEffect(() => {
    const fromHash = window.location.hash.replace(/^#/, "");
    if (isDemoTab(fromHash)) setTab(fromHash);
    setHashReady(true);

    const onHashChange = () => {
      const next = window.location.hash.replace(/^#/, "");
      if (isDemoTab(next)) setTab(next);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // 탭이 바뀌면 해시를 조용히 바꾼다 (히스토리 쌓지 않음)
  useEffect(() => {
    if (!hashReady) return;
    const current = window.location.hash.replace(/^#/, "");
    if (current === tab) return;
    if (!current && tab === DEFAULT_TAB) return;
    const url = `${window.location.pathname}${window.location.search}#${tab}`;
    window.history.replaceState(window.history.state, "", url);
  }, [tab, hashReady]);

  // 모바일 가로 스크롤 탭 바에서 활성 탭을 보이는 곳으로 — 페이지 세로 스크롤은 건드리지 않는다
  useEffect(() => {
    const list = tabListRef.current;
    const button = tabButtonRefs.current[tab];
    if (!list || !button) return;
    if (list.scrollWidth <= list.clientWidth) return;
    const left = button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [tab]);

  const scrollToTabs = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const top = anchor.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const onNavigate = useCallback(
    (next: DemoTab) => {
      setTab(next);
      scrollToTabs();
    },
    [scrollToTabs],
  );

  const onTrace = useCallback(
    (target: TraceTarget) => {
      setTraceTarget(target);
      setTab("trace");
      scrollToTabs();
    },
    [scrollToTabs],
  );

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = TABS.findIndex((t) => t.key === tab);
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = TABS.length - 1;
    else return;
    event.preventDefault();
    const next = TABS[nextIndex].key;
    setTab(next);
    tabButtonRefs.current[next]?.focus();
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden selection:bg-indigo-500 selection:text-white [word-break:keep-all]">
      {/* 은은한 배경 조명 */}
      <div
        aria-hidden
        className="absolute top-[-8%] left-[15%] w-[420px] lg:w-[500px] h-[420px] lg:h-[500px] bg-indigo-600/20 blur-[120px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden
        className="absolute top-[18%] right-[5%] w-[460px] lg:w-[600px] h-[460px] lg:h-[600px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full"
      />

      <DemoHeader />
      <DemoHero />

      {/* 탭 바 스크롤 기준점 */}
      <div ref={anchorRef} aria-hidden />

      {/* 탭 바 */}
      <div className="sticky top-20 z-40 backdrop-blur-md bg-gray-950/80 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="데모 화면"
            className="relative flex gap-1 lg:gap-2 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((t) => (
              <TabButton
                key={t.key}
                def={t}
                active={t.key === tab}
                onSelect={() => setTab(t.key)}
                onKeyDown={onTabKeyDown}
                buttonRef={(el) => {
                  tabButtonRefs.current[t.key] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 탭 패널 — 선택된 화면만 렌더 */}
      <main
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={tabId(tab)}
        tabIndex={-1}
        className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-10 min-h-[60vh] focus:outline-none"
      >
        {tab === "kpi" && <KpiBoard onTrace={onTrace} />}
        {tab === "log" && <RollLogForm onNavigate={onNavigate} onTrace={onTrace} />}
        {tab === "trace" && <TraceExplorer target={traceTarget} onTargetChange={setTraceTarget} />}
        {tab === "suggest" && <SuggestionsPanel onTrace={onTrace} onNavigate={onNavigate} />}
        {tab === "schema" && <SchemaView onNavigate={onNavigate} />}
      </main>

      <DemoCta />
      <DemoFooter />
    </div>
  );
}

function TabButton({
  def,
  active,
  onSelect,
  onKeyDown,
  buttonRef,
}: {
  def: TabDef;
  active: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const { userRolls } = useDemoData();
  const Icon = def.icon;
  const badgeCount = def.key === "log" ? userRolls.length : 0;

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={tabId(def.key)}
      aria-selected={active}
      aria-controls={PANEL_ID}
      tabIndex={active ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className={`shrink-0 inline-flex items-center gap-1.5 min-h-10 px-3.5 lg:px-4 rounded-xl text-xs lg:text-sm font-semibold whitespace-nowrap border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
        active
          ? "bg-indigo-600/25 border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10"
          : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <Icon className={`w-4 h-4 ${active ? "text-indigo-300" : "text-gray-500"}`} aria-hidden />
      <span>{def.label}</span>
      {badgeCount > 0 && (
        <span
          className="ml-0.5 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold"
          aria-label={`입력한 롤 ${badgeCount}개`}
        >
          {badgeCount}
        </span>
      )}
    </button>
  );
}

function DemoHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 min-w-0" aria-label="태문 DEV STUDIO 홈으로">
          <span className="w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center select-none shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- 홈 헤더와 같은 로고 표기 */}
            <img
              src="/images/logo/icon-192-transparent.png"
              alt=""
              className="w-10 lg:w-12 h-10 lg:h-12 object-contain scale-110"
            />
          </span>
          <span className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center -ml-1 whitespace-nowrap">
            태문 <span className="text-indigo-400 text-xs lg:text-sm font-semibold tracking-normal ml-1">DEV STUDIO</span>
          </span>
        </Link>

        <nav className="flex items-center gap-2 lg:gap-6 text-sm font-medium text-gray-400">
          <Link href="/" className="hidden lg:inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden />
            <span>스튜디오 홈</span>
          </Link>
          <Link
            href="/inquiry"
            className="inline-flex items-center justify-center min-h-10 px-4 lg:px-5 rounded-full bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 border border-indigo-500/50 text-white font-bold text-xs hover:border-indigo-400 transition-all backdrop-blur-md shadow-lg shadow-indigo-500/25 whitespace-nowrap"
          >
            이런 시스템 문의
          </Link>
        </nav>
      </div>
    </header>
  );
}

function DemoHero() {
  const { dataset, userRolls } = useDemoData();
  const motherCount = dataset.rolls.filter((r) => r.stage === "mother").length;
  const slitCount = dataset.rolls.filter((r) => r.stage === "slit").length;

  const chips: Array<{ label: string; value: number; extra?: string }> = [
    { label: "정제 배치", value: dataset.batches.length },
    { label: "잉곳", value: dataset.ingots.length },
    {
      label: "모 롤",
      value: motherCount,
      extra: userRolls.length ? `직접 입력 ${fmtNum(userRolls.length, 0)}` : undefined,
    },
    { label: "슬릿 롤", value: slitCount },
    { label: "출하", value: dataset.shipments.length },
    { label: "부적합", value: dataset.nonconformances.length },
  ];

  return (
    <section className="relative z-10 pt-28 lg:pt-36 pb-6 lg:pb-10 px-4 lg:px-6 max-w-7xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4 lg:mb-5 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
        <span>LIVE DEMO · 가상 데이터</span>
      </div>

      <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-snug mb-3 lg:mb-4">
        <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">소재 공정</span>{" "}
        데이터 플랫폼
      </h1>

      <p className="text-gray-400 text-sm lg:text-lg max-w-3xl leading-relaxed">
        리튬 호일 제조 공정 12주치 가상 데이터로 돌아갑니다. 롤 일지를 입력하면 KPI·관리도·로트 계보·개선 제안이 즉시 다시
        계산됩니다.
      </p>

      <ul className="mt-5 lg:mt-6 flex flex-wrap gap-2" aria-label="데모 데이터 규모">
        {chips.map((c) => (
          <li
            key={c.label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900/60 backdrop-blur-md border border-white/10 text-xs"
          >
            <span className="text-gray-400">{c.label}</span>
            <span className="font-bold text-white tabular-nums">{fmtNum(c.value, 0)}</span>
            {c.extra && <span className="text-emerald-300 font-semibold">({c.extra})</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DemoCta() {
  return (
    <section className="relative z-10 py-12 lg:py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-md px-5 py-8 lg:p-16 rounded-3xl text-center border border-indigo-500/30">
        <div className="max-w-3xl mx-auto space-y-5 lg:space-y-6">
          <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest">FROM DEMO TO FACTORY</div>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
            이 데모는 설계 문서의 첫 6개월 범위를 그대로 옮긴 것입니다.
          </p>
          <h2 className="text-2xl lg:text-4xl font-extrabold text-white leading-snug">
            우리 공장 데이터로 만들면?
            <br />
            <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              현장 실사 1~2주부터 시작합니다.
            </span>
          </h2>

          <div className="pt-2 lg:pt-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-3 lg:gap-4">
            <Link
              href="/inquiry"
              className="w-full lg:w-auto min-h-12 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm lg:text-base shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
            >
              <span>프로젝트 상담 문의</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden />
            </Link>

            <a
              href="tel:1588-2622"
              className="w-full lg:w-auto flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <PhoneCall className="w-5 h-5 text-indigo-400" aria-hidden />
              <span className="text-left">
                <span className="block text-[10px] text-gray-400 font-bold">대표 전화</span>
                <span className="block text-base font-bold text-white">1588-2622</span>
              </span>
            </a>

            <a
              href="mailto:contact@taemun.co.kr"
              className="w-full lg:w-auto flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <Mail className="w-5 h-5 text-gray-400" aria-hidden />
              <span className="text-left">
                <span className="block text-[10px] text-gray-400 font-bold">이메일</span>
                <span className="block text-base font-bold text-white">contact@taemun.co.kr</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoFooter() {
  return (
    <footer className="relative z-10 py-10 lg:py-12 px-4 lg:px-6 border-t border-white/5 text-center text-xs text-gray-500">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4">
          <div>
            <span className="font-bold text-gray-400">태문 DEV STUDIO</span> • 대표전화: 1588-2622 • 이메일: contact@taemun.co.kr
          </div>
          <div>© 2026 TAEMUN DEV STUDIO. All rights reserved. (Domain: taemun.net)</div>
        </div>
        <p className="text-gray-500 leading-relaxed">
          이 페이지의 모든 회사·고객·수치는 시연용 가상 데이터이며 실존 기업과 무관합니다.
        </p>
      </div>
    </footer>
  );
}
