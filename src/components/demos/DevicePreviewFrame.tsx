"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  ExternalLink,
  Code2,
  Play,
  Sparkles,
  ArrowLeft,
  Check,
  Copy,
  Layers,
  Info,
} from "lucide-react";

export type DeviceMode = "desktop" | "tablet" | "mobile";
export type Orientation = "portrait" | "landscape";
export type ActiveTab = "preview" | "code";

interface DevicePreviewFrameProps {
  src: string;
  title: string;
  category: string;
  client: string;
  techStack: string[];
  inquiryUrl: string;
  externalUrl?: string;
  specs?: { label: string; value: string }[];
  codeArchitecture?: {
    components: string[];
    features: string[];
    performance: string[];
  };
}

export default function DevicePreviewFrame({
  src,
  title,
  category,
  client,
  techStack,
  inquiryUrl,
  externalUrl,
  specs = [],
  codeArchitecture,
}: DevicePreviewFrameProps) {
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Rotate orientation (only applicable to mobile and tablet)
  const toggleOrientation = () => {
    setOrientation((prev) => (prev === "portrait" ? "landscape" : "portrait"));
  };

  // Switch device helper
  const handleSelectDevice = (mode: DeviceMode) => {
    setDevice(mode);
    // Reset to portrait when switching to mobile or tablet
    if (mode === "desktop") {
      setOrientation("portrait");
    }
  };

  // Copy share URL
  const handleCopyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Dimensions based on device and orientation
  const getDeviceDimensions = () => {
    if (device === "desktop") {
      return { width: "100%", height: "100%", isFramed: false };
    }
    if (device === "tablet") {
      return orientation === "portrait"
        ? { width: "768px", height: "1024px", isFramed: true }
        : { width: "1024px", height: "768px", isFramed: true };
    }
    // mobile
    return orientation === "portrait"
      ? { width: "390px", height: "844px", isFramed: true }
      : { width: "844px", height: "390px", isFramed: true };
  };

  const dims = getDeviceDimensions();

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-screen w-screen bg-[#f3f4f6] text-zinc-900 overflow-hidden font-sans select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. AI STUDIO STYLE TOP CONTROL TOOLBAR
          ───────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-white border-b border-zinc-200/90 px-3 lg:px-4 flex items-center justify-between gap-2 lg:gap-4 shrink-0 shadow-sm z-30">
        
        {/* Left: Back Link & Tab Pills (Preview / Code) */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors text-xs font-semibold"
            title="메인 갤러리로 돌아가기"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">메인 갤러리</span>
          </Link>

          <div className="h-4 w-[1px] bg-zinc-200" />

          {/* AI Studio Tabs: Preview / Code */}
          <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeTab === "preview"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeTab === "code"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Code Spec</span>
            </button>
          </div>

          {/* Route address bar pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-50 border border-zinc-200 text-xs font-mono text-zinc-600">
            <span className="text-zinc-400">/</span>
            <span className="font-semibold text-zinc-800">{src.replace("?embed=true", "")}</span>
          </div>
        </div>

        {/* Center: Device Switcher Buttons (PC / Tablet / Mobile) */}
        <div className="flex items-center justify-center gap-1 bg-zinc-100 p-0.5 rounded-xl border border-zinc-200">
          <button
            onClick={() => handleSelectDevice("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === "desktop"
                ? "bg-white text-zinc-950 shadow-sm font-bold"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
            title="PC 데스크톱 보기 (100%)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">PC</span>
          </button>

          <button
            onClick={() => handleSelectDevice("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === "tablet"
                ? "bg-white text-zinc-950 shadow-sm font-bold"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
            title="태블릿 아이패드 보기 (768 × 1024)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">태블릿</span>
          </button>

          <button
            onClick={() => handleSelectDevice("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              device === "mobile"
                ? "bg-white text-zinc-950 shadow-sm font-bold"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
            title="모바일 스마트폰 보기 (390 × 844)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">모바일</span>
          </button>
        </div>

        {/* Right: Rotate, Refresh, Fullscreen, Inquiry Button */}
        <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
          {/* Rotate Button (Available for Mobile and Tablet) */}
          {device !== "desktop" && (
            <button
              onClick={toggleOrientation}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 text-xs font-semibold border border-zinc-200 transition-all"
              title={`화면 회전 (${orientation === "portrait" ? "가로 모드로 회전" : "세로 모드로 회전"})`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-700 transition-transform active:rotate-180" />
              <span className="hidden lg:inline">
                {orientation === "portrait" ? "가로 회전" : "세로 회전"}
              </span>
            </button>
          )}

          {/* Refresh Button */}
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors"
            title="데모 화면 새로고침"
            aria-label="데모 화면 새로고침"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden lg:flex p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors"
            title={isFullscreen ? "전체화면 닫기" : "전체화면으로 보기"}
            aria-label="전체화면 전환"
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Open in pure window */}
          <a
            href={src.replace("?embed=true", "")}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-950 transition-colors"
            title="새 탭에서 실물 사이트 열기"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Inquiry / Remix Button (AI Studio Remix style) */}
          <Link
            href={inquiryUrl}
            className="flex items-center gap-1.5 px-3 lg:px-4 py-1.5 rounded-lg bg-zinc-950 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>이 사이트처럼 제작 의뢰</span>
          </Link>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. PREVIEW CANVAS OR CODE ARCHITECTURE TAB
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "preview" ? (
        <main className="flex-1 bg-[#e5e7eb] relative flex items-center justify-center overflow-auto p-0 lg:p-6">
          {/* Subtle Canvas Dot Grid for Design Workbench Feel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden="true"
          />

          {/* Desktop Full View */}
          {device === "desktop" ? (
            <div className="w-full h-full bg-white shadow-none">
              <iframe
                key={refreshKey}
                src={src}
                title={title}
                className="w-full h-full border-0 bg-white"
              />
            </div>
          ) : (
            /* Framed Mobile / Tablet View with Realistic Hardware Bezel */
            <div className="flex flex-col items-center justify-center transition-all duration-300">
              
              {/* Responsive Size Meta Indicator */}
              <div className="mb-2 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                <span className="font-bold text-zinc-800 uppercase">
                  {device === "mobile" ? "iPhone Viewport" : "iPad Viewport"}
                </span>
                <span>•</span>
                <span>
                  {dims.width} × {dims.height} ({orientation})
                </span>
              </div>

              {/* Hardware Device Shell */}
              <div
                style={{ width: dims.width, height: dims.height }}
                className={`relative bg-[#090a0f] p-3 shadow-2xl transition-all duration-300 border border-zinc-800/80 flex flex-col justify-between ${
                  device === "mobile"
                    ? orientation === "portrait"
                      ? "rounded-[48px] ring-1 ring-zinc-700/50"
                      : "rounded-[38px] ring-1 ring-zinc-700/50"
                    : "rounded-[36px] ring-1 ring-zinc-700/50"
                }`}
              >
                {/* Dynamic Island / Speaker Notch (Mobile Portrait) */}
                {device === "mobile" && orientation === "portrait" && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 mr-2" />
                    <div className="w-10 h-1 bg-zinc-900 rounded-full" />
                  </div>
                )}

                {/* Tablet Camera Dot */}
                {device === "tablet" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-800 z-20" />
                )}

                {/* Inner Screen Display (iframe) */}
                <div className="w-full h-full rounded-[30px] overflow-hidden bg-white relative">
                  <iframe
                    key={refreshKey}
                    src={src}
                    title={title}
                    className="w-full h-full border-0 bg-white"
                  />
                </div>

                {/* Home Indicator Bar (Mobile Portrait) */}
                {device === "mobile" && orientation === "portrait" && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20" />
                )}
              </div>
            </div>
          )}
        </main>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            3. CODE SPECIFICATION & ARCHITECTURE TAB (AI Studio Code feel)
            ───────────────────────────────────────────────────────────── */
        <main className="flex-1 bg-white overflow-y-auto p-6 lg:p-12 text-zinc-900">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="border-b border-zinc-200 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                  {category}
                </span>
                <span className="text-xs text-zinc-400 font-mono">• 100% PRODUCTION READY</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-zinc-950">{title}</h2>
              <p className="text-xs lg:text-sm text-zinc-600 mt-2 font-light">
                클라이언트: {client} | 태문 DEV STUDIO 직영 아키텍처 명세서
              </p>
            </div>

            {/* Architecture Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>핵심 프레임워크</span>
                </div>
                <div className="text-base font-mono font-bold text-zinc-900">Next.js 16 + React 19</div>
                <p className="text-xs text-zinc-500">Turbopack 번들러 기반 0.8초 미만 초고속 핫 리로드</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>반응형 디자인 시스템</span>
                </div>
                <div className="text-base font-mono font-bold text-zinc-900">Tailwind CSS v4</div>
                <p className="text-xs text-zinc-500">단일 lg: 브레이크포인트 규격으로 태블릿·모바일 무결점 호환</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>타입 안전성</span>
                </div>
                <div className="text-base font-mono font-bold text-zinc-900">TypeScript 5.7+</div>
                <p className="text-xs text-zinc-500">컴포넌트 및 API 데이터 입출력 strict 타입 100% 보장</p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                적용 기술 스택 &amp; 라이브러리
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-white text-zinc-800 border border-zinc-200 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications Details */}
            {specs.length > 0 && (
              <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h4 className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  프로덕션 주요 스펙
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {specs.map((s, idx) => (
                    <div key={idx} className="flex justify-between p-3 rounded-xl bg-white border border-zinc-200 text-xs">
                      <span className="text-zinc-500 font-medium">{s.label}</span>
                      <span className="font-bold text-zinc-900 font-mono">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Call to Action */}
            <div className="p-8 rounded-3xl bg-zinc-950 text-white text-center space-y-4 shadow-xl">
              <h3 className="text-xl font-bold">이 프로젝트 아키텍처 그대로 귀사의 웹을 구축해 드립니다.</h3>
              <p className="text-xs text-zinc-400 max-w-lg mx-auto leading-relaxed">
                소스코드 100% 완전 이전, 반응형 디바이스 뷰포트 최적화, 무상 하자보증까지.
                총괄 아키텍트 직통 상담으로 최적의 견적을 확인하세요.
              </p>
              <div className="pt-2 flex flex-col lg:flex-row items-center justify-center gap-3">
                <Link
                  href={inquiryUrl}
                  className="w-full lg:w-auto px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs transition-all shadow-md"
                >
                  온라인 맞춤 견적 신청하기
                </Link>
                <a
                  href="tel:010-8672-6463"
                  className="w-full lg:w-auto px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 transition-all"
                >
                  직통 유선 상담 (010-8672-6463)
                </a>
              </div>
            </div>

          </div>
        </main>
      )}
    </div>
  );
}
