"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Code2,
  Send,
  Palette,
  ArrowLeft,
  Layers,
  Info,
} from "lucide-react";

export type DeviceMode = "desktop" | "tablet" | "mobile";
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

/** 폰에서 「PC 화면」을 누르면 데모를 이 폭으로 그린 뒤 화면 폭에 맞춰 줄인다 */
const PC_VIEW_WIDTH = 1440;
/** 이 저장소의 웹/모바일 경계(lg). 이 폭 이상이면 데스크톱 툴바, 미만이면 모바일 툴바 */
const LG_QUERY = "(min-width: 1024px)";

/**
 * 카테고리 텍스트와 데모 URL로부터 메인 갤러리의 정확한 복귀 앵커를 산출합니다.
 */
function resolveCategoryAnchor(categoryText: string, srcUrl: string): { categoryId: string; projectId: string } {
  const cleanSrc = srcUrl.split("?")[0] || "";
  const projectId = cleanSrc.replace("/demo/", "").trim();

  let categoryId = "gallery";
  if (categoryText.includes("인테리어")) categoryId = "interior";
  else if (categoryText.includes("건축") || categoryText.includes("토목") || categoryText.includes("한옥")) categoryId = "architecture";
  else if (categoryText.includes("제조") || categoryText.includes("소재") || categoryText.includes("공정") || categoryText.includes("스마트팩토리") || categoryText.includes("반도체")) categoryId = "manufacturing";
  else if (categoryText.includes("커머스") || categoryText.includes("쇼핑몰") || categoryText.includes("패션") || categoryText.includes("식품") || categoryText.includes("뷰티") || categoryText.includes("명품")) categoryId = "commerce";
  else if (categoryText.includes("SaaS") || categoryText.includes("플랫폼") || categoryText.includes("서약") || categoryText.includes("전자서명")) categoryId = "saas";
  else if (categoryText.includes("메디컬") || categoryText.includes("병원") || categoryText.includes("의료") || categoryText.includes("클리닉") || categoryText.includes("병의원")) categoryId = "medical";
  else if (categoryText.includes("기업") || categoryText.includes("스타트업") || categoryText.includes("플래그십")) categoryId = "corporate";
  else if (categoryText.includes("교육") || categoryText.includes("학원") || categoryText.includes("아카데미")) categoryId = "education";

  return { categoryId, projectId };
}

/**
 * 모든 데모를 감싸는 태문 툴바 + 미리보기 틀.
 *
 * ── 툴바 규칙 (2026-09-18 형 지시 · 전 데모 공통) ──
 * 폰(lg 미만)   [←]  ……  [🖥 PC 화면 ⇄ 📱 모바일]  [제작 의뢰 →]
 * 데스크톱      [← 메인 갤러리] [Preview | Code Spec]  [PC · 태블릿 · 모바일]  [↗ 새 창] [이 사이트처럼 맞춤 제작 의뢰]
 *
 * 뺀 것과 이유 — 새로고침(브라우저에 있다) · 전체화면(「새 창」과 같은 일) · 회전(쓰는 사람이 거의 없다) ·
 * 경로 표시 /demo/…(개발자용 정보). 예전엔 폰에서 기기 전환 3개·회전·새로고침이 자리를 먹어
 * **「제작 의뢰」 버튼이 화면 밖으로 밀려나** 보이지 않았다 — 이 툴바에서 매출로 이어지는 유일한 버튼이다.
 *
 * 폰의 「PC 화면」 — 예전 「PC」 버튼은 폭 100% 였는데 폰에선 100% = 375px 라 데모가 **그냥 모바일 화면을
 * 그렸다**(누른 사람은 「똑같네?」). 지금은 데모를 실제로 1440px 로 그린 뒤 폰 폭에 맞춰 줄인다 —
 * 진짜 PC 레이아웃의 축소판이고, 두 손가락으로 확대해 볼 수 있다. 폰에서 태블릿 보기는 뺐다.
 */
export default function DevicePreviewFrame({
  src,
  title,
  category,
  client,
  techStack,
  inquiryUrl,
  specs = [],
}: DevicePreviewFrameProps) {
  const router = useRouter();
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const [backHref, setBackHref] = useState<string>("/#gallery");
  /** 폰에서만 쓰는 「PC 화면으로 보기」 */
  const [mobilePcView, setMobilePcView] = useState(false);
  const canvasRef = useRef<HTMLElement>(null);
  const [canvas, setCanvas] = useState({ w: 0, h: 0 });
  const pureUrl = src.replace("?embed=true", "");

  // 메인 갤러리 복귀 앵커 설정 (URL searchParams 우선, 없으면 category 및 slug 매핑)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const queryCat = params.get("fromCategory");
    const queryProj = params.get("fromProject");

    const resolved = resolveCategoryAnchor(category, src);
    const targetProject = queryProj || resolved.projectId;
    const targetCategory = queryCat || resolved.categoryId;

    if (targetProject) {
      setBackHref(`/#project-${targetProject}`);
    } else if (targetCategory && targetCategory !== "gallery") {
      setBackHref(`/#category-${targetCategory}`);
    } else {
      setBackHref("/#gallery");
    }
  }, [category, src]);

  // 폭이 lg 경계를 넘나들면 서로의 상태를 풀어 준다 — 데스크톱에서 고른 「태블릿」이 폰으로 넘어와
  // 768px 고정 틀로 화면 밖에 잘리거나, 폰의 「PC 화면」 축소판이 데스크톱에 남지 않게.
  useEffect(() => {
    const mq = window.matchMedia(LG_QUERY);
    const onChange = () => {
      if (mq.matches) setMobilePcView(false);
      else setDevice("desktop");
    };
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // 「PC 화면」 축소 비율을 정하려고 미리보기 영역 크기를 잰다
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setCanvas({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [activeTab]);

  const handleBackToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(backHref);
  };

  // Dimensions based on device (데스크톱에서 고르는 틀)
  const dims =
    device === "tablet"
      ? { width: "768px", height: "1024px" }
      : device === "mobile"
        ? { width: "390px", height: "844px" }
        : { width: "100%", height: "100%" };

  const pcScale = canvas.w > 0 ? Math.min(1, canvas.w / PC_VIEW_WIDTH) : 1;

  const deviceButton = (mode: DeviceMode, label: string, hint: string, Icon: typeof Monitor) => (
    <button
      type="button"
      onClick={() => setDevice(mode)}
      aria-pressed={device === mode}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        device === mode ? "bg-white text-zinc-950 shadow-sm font-bold" : "text-zinc-500 hover:text-zinc-800"
      }`}
      title={hint}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-[#f3f4f6] text-zinc-900 overflow-hidden font-sans select-none">
      {/* ─────────────────────────────────────────────────────────────
          1. 툴바 — 폰과 데스크톱이 서로 다른 한 줄을 쓴다 (규칙은 위 주석)
          ───────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-white border-b border-zinc-200/90 px-2 lg:px-4 flex items-center justify-between gap-2 lg:gap-4 shrink-0 shadow-sm z-30">
        {/* 왼쪽: 갤러리로 (폰은 아이콘만) + 데스크톱 전용 Preview/Code Spec */}
        <div className="flex items-center gap-2 lg:gap-3 min-w-0">
          <Link
            href={backHref}
            onClick={handleBackToGallery}
            className="flex items-center justify-center gap-1.5 min-h-11 min-w-11 lg:min-w-0 px-2.5 lg:py-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors text-xs font-semibold group"
            title="메인 갤러리로 돌아가기 (진입했던 카테고리로 복귀)"
            aria-label="메인 갤러리로 돌아가기"
          >
            <ArrowLeft className="w-4 h-4 lg:w-3.5 lg:h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden lg:inline">메인 갤러리</span>
          </Link>

          <div className="hidden lg:block h-4 w-[1px] bg-zinc-200" />

          <div className="hidden lg:flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              aria-pressed={activeTab === "preview"}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeTab === "preview" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              aria-pressed={activeTab === "code"}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                activeTab === "code" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Code Spec</span>
            </button>
          </div>
        </div>

        {/* 가운데: 데스크톱 전용 기기 전환 — 영업 상대가 노트북에서 「모바일에선 이렇게」를 한 번에 본다 */}
        <div className="hidden lg:flex items-center justify-center gap-1 bg-zinc-100 p-0.5 rounded-xl border border-zinc-200">
          {deviceButton("desktop", "PC", "PC 데스크톱 보기", Monitor)}
          {deviceButton("tablet", "태블릿", "태블릿 보기 (768 × 1024)", Tablet)}
          {deviceButton("mobile", "모바일", "모바일 보기 (390 × 844)", Smartphone)}
        </div>

        {/* 오른쪽 */}
        <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
          {/* 폰 전용: PC 화면 ⇄ 모바일 */}
          <button
            type="button"
            onClick={() => setMobilePcView((v) => !v)}
            aria-pressed={mobilePcView}
            className="lg:hidden flex items-center justify-center gap-1.5 min-h-11 px-3 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold border border-zinc-200 transition-colors"
            title={mobilePcView ? "모바일 화면으로 돌아가기" : "PC 화면으로 보기 (축소판 · 두 손가락으로 확대)"}
          >
            {mobilePcView ? (
              <>
                <Smartphone className="w-4 h-4" />
                <span>모바일</span>
              </>
            ) : (
              <>
                <Monitor className="w-4 h-4" />
                <span>PC 화면</span>
              </>
            )}
          </button>

          {/* 데스크톱 전용: 틀 없이 새 창 */}
          <a
            href={pureUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 text-xs font-semibold transition-colors"
            title="틀 없이 새 창에서 보기"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>새 창</span>
          </a>

          {/* 제작 의뢰 — 이 툴바에서 매출로 이어지는 유일한 버튼이라 폰에서도 반드시 보인다 */}
          <Link
            href={inquiryUrl}
            className="flex items-center justify-center gap-1.5 min-h-11 lg:min-h-0 px-3 lg:px-4 lg:py-1.5 rounded-lg bg-zinc-950 hover:bg-black text-white text-xs font-bold transition-all shadow-sm group whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
            <span className="lg:hidden">제작 의뢰</span>
            <span className="hidden lg:inline">이 사이트처럼 맞춤 제작 의뢰</span>
          </Link>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. PREVIEW CANVAS OR CODE ARCHITECTURE TAB
          ───────────────────────────────────────────────────────────── */}
      {activeTab === "preview" ? (
        <main
          ref={canvasRef}
          className="flex-1 bg-[#e5e7eb] relative flex items-center justify-center overflow-auto p-0 lg:p-6"
        >
          {/* Subtle Canvas Dot Grid for Design Workbench Feel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden="true"
          />

          {mobilePcView ? (
            /* 폰의 「PC 화면」 — 데모를 실제 1440px 로 그리고 폰 폭에 맞춰 줄인다(데모는 1440px 화면이라고 믿고 PC 레이아웃을 그린다) */
            <div className="absolute inset-0 overflow-hidden bg-white">
              <iframe
                src={src}
                title={`${title} — PC 화면`}
                className="border-0 bg-white"
                style={{
                  width: PC_VIEW_WIDTH,
                  height: pcScale > 0 ? canvas.h / pcScale : "100%",
                  transform: `scale(${pcScale})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          ) : device === "desktop" ? (
            <div className="w-full h-full bg-white shadow-none">
              <iframe src={src} title={title} className="w-full h-full border-0 bg-white" />
            </div>
          ) : (
            /* Framed Mobile / Tablet View with Realistic Hardware Bezel (데스크톱에서만) */
            <div className="flex flex-col items-center justify-center transition-all duration-300">
              <div className="mb-2 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
                <span className="font-bold text-zinc-800 uppercase">
                  {device === "mobile" ? "Mobile Viewport" : "Tablet Viewport"}
                </span>
                <span>•</span>
                <span>
                  {dims.width} × {dims.height}
                </span>
              </div>

              <div
                style={{ width: dims.width, height: dims.height }}
                className={`relative bg-[#090a0f] p-3 shadow-2xl transition-all duration-300 border border-zinc-800/80 flex flex-col justify-between ring-1 ring-zinc-700/50 ${
                  device === "mobile" ? "rounded-[48px]" : "rounded-[36px]"
                }`}
              >
                {device === "mobile" && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 mr-2" />
                    <div className="w-10 h-1 bg-zinc-900 rounded-full" />
                  </div>
                )}

                {device === "tablet" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-800 z-20" />
                )}

                <div className="w-full h-full rounded-[30px] overflow-hidden bg-white relative">
                  <iframe src={src} title={title} className="w-full h-full border-0 bg-white" />
                </div>

                {device === "mobile" && (
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
                <span className="text-xs text-zinc-400 font-mono">• PRODUCTION READY BUILD</span>
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
                  <Palette className="w-4 h-4 text-amber-600" />
                  <span>반응형 디자인 시스템</span>
                </div>
                <div className="text-base font-mono font-bold text-zinc-900">Tailwind CSS v4</div>
                <p className="text-xs text-zinc-500">단일 lg: 브레이크포인트 규격으로 태블릿·모바일까지 대응</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>타입 안전성</span>
                </div>
                <div className="text-base font-mono font-bold text-zinc-900">TypeScript 5.7+</div>
                <p className="text-xs text-zinc-500">컴포넌트 및 API 데이터 입출력에 strict 타입 적용</p>
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
                소스코드 전체 이전, 반응형 디바이스 뷰포트 최적화, 하자 대응까지.
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
