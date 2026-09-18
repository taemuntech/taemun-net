"use client";

import { useState, useEffect, type SyntheticEvent } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import FloatingChatWidget from "@/components/FloatingChatWidget";
// ⚠️ **값(GALLERY_PROJECTS·GALLERY_CATEGORIES)을 import 하지 않는다 — 타입만 가져온다.**
// 이 파일은 'use client' 라, 값을 import 하면 galleryData.ts 가 통째로 클라이언트 청크에 들어간다.
// 서버가 걸러 렌더해도 청크는 별개라, 실측에서 내려간 시안의 회사 이름·클라이언트 표기·설명·/demo/<slug>
// 링크가 `/_next/static/chunks/*.js`(72KB, Cache-Control: immutable 1년)로 누구에게나 200 으로 나갔다.
// 그래서 **서버(page.tsx)가 걸러낸 배열 자체**를 props 로 받는다.
import type {
  GalleryCategoryId,
  GalleryCategoryMeta,
  GalleryProject,
} from "@/lib/portfolio/galleryData";
// 헤더 드롭다운 항목도 같은 이유로 **서버에서 받아 그대로 전달**한다(타입만 import).
import type { HeaderDemoLink } from "@/lib/portfolio/header-links";
// 분류 머리의 바로가기 버튼도 같은 이유로 서버에서 받는다(타입만 import).
// 예전엔 이 버튼들이 여기 JSX 로 박혀 있어서, 렌더를 막아도 「/demo/<slug>」·회사 이름 문자열이
// 홈 청크에 그대로 남았다(실측으로 잡힘 — lib/portfolio/home-shortcuts.ts 머리말 참고).
import type { HomeShortcut } from "@/lib/portfolio/home-shortcuts";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Play,
  Layers,
  FileText,
  Activity,
  PhoneCall,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Clock,
  Building2,
  Cpu,
  ShoppingBag,
  Briefcase,
  Monitor,
  Stethoscope,
  GraduationCap,
} from "lucide-react";

/**
 * 홈 갤러리에 **실어도 되는 작업물만** 담긴 배열 — 서버(page.tsx)가 공개 상태를 읽어 걸러서 내려 준다.
 *
 * 왜 서버에서 걸러 받는가: 이 갤러리는 galleryData.ts 에 손으로 적은 목록이라 공개 상태를 모른다.
 * 그래서 /portfolio 에서 빠진 실존 업체 제안 시안이 홈에는 회사 이름·설명째로 그대로 남아 있었다
 * (「전부 내리기」를 눌러도 링크만 막히고 홈 카드는 살아 있었다 — 내리는 목적이 반쯤 깨진다).
 * 판정 규칙(resolveStatus·isListed)은 서버에만 두고 여기서는 받은 것을 그리기만 한다 — 규칙을 두 벌로 만들지 않는다.
 *
 * ⚠️ 예전에는 「실을 slug 목록」만 받고 배열은 이 파일에서 import 했다. 그러면 **렌더 결과만** 걸러질 뿐,
 * 배열 전체가 클라이언트 청크에 박혀 내려간 회사 이름이 그대로 나갔다(파일 맨 위 import 주석의 실측).
 * 지금은 걸러낸 **배열 자체**를 받는다 — HTML 에도, 청크에도 보여도 되는 것만 남는다.
 */
export type HomeViewProps = {
  /** 공개 상태가 「공개」인 작업물만 담긴 갤러리 카드 배열 */
  projects: GalleryProject[];
  /** 분류 메타(회사 정보 없음) — 값 import 를 끊으려고 이것도 서버에서 받는다 */
  categories: GalleryCategoryMeta[];
  /** 헤더 드롭다운·모바일 메뉴에 실을 내부 데모 — 서버가 「공개」인 것만 걸러서 준다. 여기서는 Header 로 넘기기만 한다 */
  demoLinks?: readonly HeaderDemoLink[];
  /** 분류 머리의 바로가기 버튼 — 서버가 「공개」인 것만 걸러서 준다. 내려간 시안은 배열에 없다 */
  shortcuts?: readonly HomeShortcut[];
};

/**
 * 썸네일 주소가 죽었을 때(외부 CDN 만료·파일 누락) 깨진 이미지 아이콘 대신 빈 타일만 남긴다.
 *
 * ⚠️ **카드 격자와 카드 모달이 같은 주소(thumbnailUrl)를 두 번 그린다.** 한쪽만 막으면 격자는 멀쩡한데
 *    카드를 눌러 연 모달에서 16:10 크기로 깨진 채 보인다(실측 2026-09-17: 죽은 주소 1건이 두 자리에 나왔다).
 *    그래서 처리를 이 한 함수에 두고 두 곳이 같이 쓴다 — 자리가 늘면 여기에 붙인다.
 */
function hideBrokenThumbnail(e: SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.visibility = "hidden";
}

/**
 * 작업물 성격 표시 — 카드 썸네일과 모달 이미지 귀퉁이에 붙는 작은 표.
 *
 * 가르는 것은 딱 두 갈래다: **밖에서 실제로 운영 중인 서비스**인가, 태문이 만든 **시연용 샘플**인가.
 * 판정은 새 칸을 만들지 않고 **이미 있는 칸(externalUrl)** 으로 한다 — 밖으로 나가는 진짜 서비스 주소가
 * 붙은 것만 「운영 중」(티독스·태문브릿지 둘)이고, 나머지는 전부 「샘플」이다.
 * 이러면 카드 데이터 54개에 손대지 않고도 카드마다 사실대로 표가 붙는다.
 *
 * ⚠️ 문구를 더 세게(예: 「가상 브랜드 샘플」)·약하게(예: 「데모」) 바꾸려면 **여기 한 곳만** 고친다 —
 *    카드와 모달이 같은 함수를 쓰므로 두 벌로 갈라지지 않는다.
 */
function WorkMark({ project, className = "" }: { project: GalleryProject; className?: string }) {
  const live = Boolean(project.externalUrl);
  return (
    <span
      className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold shadow-sm backdrop-blur-sm ${
        live ? "border-emerald-700/30 bg-emerald-600/90 text-white" : "border-white/20 bg-zinc-900/70 text-white"
      } ${className}`}
    >
      {live ? "운영 중" : "샘플"}
    </span>
  );
}

/**
 * 상세 모달의 대표 화면 — 사진을 먼저 깔고, 미리보기 영상(previewVideoUrl)이 있으면 **재생이 시작된 뒤에**
 * 그 위로 서서히 겹친다.
 *
 * 사진을 먼저 까는 이유: 방금 누른 카드와 같은 사진이라 이미 받아 둔 것이고, 영상이 늦거나 못 도는 경우
 * (아이폰 저전력 모드는 자동재생을 막는다·네트워크 오류)에도 빈 칸 대신 사진이 남는다.
 * 동작 줄이기 설정·데이터 절약 모드인 방문자에겐 영상을 아예 받지 않는다.
 *
 * 영상은 누르면 데모로 가는 링크 안에 있으므로 클릭을 가로채지 않게 pointer-events 를 끈다.
 * 모달은 카드를 눌러야 그려지므로(서버 렌더 없음) 초기값에서 window 를 바로 읽어도 된다.
 */
function ModalPreviewMedia({ project, zoomOnHover }: { project: GalleryProject; zoomOnHover: boolean }) {
  const [allowVideo] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    return !reduceMotion && !saveData;
  });
  const [videoPlaying, setVideoPlaying] = useState(false);
  const zoom = zoomOnHover ? "group-hover:scale-[1.03]" : "";

  return (
    <>
      <img
        src={project.thumbnailUrl}
        alt={project.title}
        onError={hideBrokenThumbnail}
        className={`w-full h-full object-cover transition-transform duration-500 ${zoom}`}
      />
      {project.previewVideoUrl && allowVideo && (
        <video
          src={project.previewVideoUrl}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate"
          onPlaying={() => setVideoPlaying(true)}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-[opacity,transform] duration-500 ${zoom} ${
            videoPlaying ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}

export default function HomeView({ projects, categories, demoLinks, shortcuts = [] }: HomeViewProps) {
  // 이름만 옛것 그대로 둔다(아래 화면 코드가 이 이름을 쓴다) — 값은 서버가 이미 걸러 준 배열이다
  const galleryProjects = projects;
  const GALLERY_CATEGORIES = categories;

  // 모바일 화면(1024px 미만) 감지
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // State for category accordion visible count (undefined이면 기본값: 모바일 4개 / 데스크톱 5개)
  const [categoryVisibleCounts, setCategoryVisibleCounts] = useState<Partial<Record<GalleryCategoryId, number>>>({});

  // State for project detail modal
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const handleCategoryStep = (categoryId: GalleryCategoryId, totalCount: number) => {
    const defaultCount = isMobile ? 4 : 5;
    const step = isMobile ? 4 : 5;
    const currentCount = categoryVisibleCounts[categoryId] ?? defaultCount;

    if (currentCount >= totalCount) {
      // 이미 전체가 다 펼쳐진 상태 -> 기본값으로 초기화 (접기)
      setCategoryVisibleCounts((prev) => {
        const next = { ...prev };
        delete next[categoryId];
        return next;
      });
      // 해당 카테고리 헤더로 부드럽게 스크롤
      const el = document.getElementById(`category-${categoryId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // +4(모바일) 또는 +5(데스크톱) 추가
      const nextCount = Math.min(currentCount + step, totalCount);
      setCategoryVisibleCounts((prev) => ({
        ...prev,
        [categoryId]: nextCount,
      }));
    }
  };

  // 데모 뷰어에서 메인 갤러리로 복귀 시 원래 보던 카테고리/프로젝트 위치로 자동 스크롤
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.replace("#", "");

      // 만약 #project-{id} 형태라면, 해당 프로젝트가 속한 카테고리를 전체 펼쳐줌
      if (targetId.startsWith("project-")) {
        const projectId = targetId.replace("project-", "");
        const project = galleryProjects.find((p) => p.id === projectId);
        if (project) {
          const categoryTotal = galleryProjects.filter((p) => p.category === project.category).length;
          setCategoryVisibleCounts((prev) => ({
            ...prev,
            [project.category]: categoryTotal,
          }));
        }
      }

      // 렌더링 및 아코디언 상태 반영 후 부드럽게 스크롤
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [galleryProjects]);

  // 모달 오픈 시 배경 스크롤 방지
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Helper icons for category headers
  const getCategoryIcon = (id: GalleryCategoryId) => {
    switch (id) {
      case "manufacturing":
        return <Cpu className="w-4 h-4 text-emerald-700" />;
      case "interior":
        return <Compass className="w-4 h-4 text-amber-700" />;
      case "architecture":
        return <Building2 className="w-4 h-4 text-stone-700" />;
      case "saas":
        return <Layers className="w-4 h-4 text-indigo-700" />;
      case "commerce":
        return <ShoppingBag className="w-4 h-4 text-rose-700" />;
      case "corporate":
        return <Briefcase className="w-4 h-4 text-blue-700" />;
      case "medical":
        return <Stethoscope className="w-4 h-4 text-teal-700" />;
      case "education":
        return <GraduationCap className="w-4 h-4 text-sky-700" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white [word-break:keep-all] font-sans">
      {/* Subtle Warm Grid Overlay for Depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Agency Navigation Bar */}
      <Header demoLinks={demoLinks} />

      {/* ─────────────────────────────────────────────────────────────
          1. FULL-WIDTH CINEMATIC VIDEO BACKGROUND HERO SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden min-h-[680px] lg:min-h-[760px] flex flex-col justify-between pt-32 lg:pt-40 pb-8 lg:pb-12">
        
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src="/videos/taemun-hero-kling.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 brightness-105"
          />
          {/* High-Contrast Luxury Cinematic Gradient Overlays (Brightened ~20%) */}
          {/* 1. Base dark tint (lightened from black/55 to black/30) */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.5px]" />
          {/* 2. Left-focused gradient for razor-sharp typography while keeping right side bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/55 to-transparent" />
          {/* 3. Top fade for header */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
          {/* 4. Bottom smooth fade into pure white gallery section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center my-6 lg:my-10">
          <div className="max-w-2xl text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 lg:px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="tracking-wider uppercase text-[11px] lg:text-xs font-mono text-zinc-100">
                TAEMUN DEV STUDIO • BESPOKE DIGITAL GALLERY
              </span>
            </div>

            <h1 className="text-3xl lg:text-[54px] font-light tracking-[-0.03em] text-white leading-[1.2] lg:leading-[1.12] drop-shadow-md">
              산업의 본질을 세공하는<br />
              <span className="font-serif italic text-amber-200 font-normal">디지털 플래그십 아카이브</span>
            </h1>

            <p className="text-zinc-200 text-sm lg:text-base max-w-xl font-light leading-relaxed drop-shadow-sm break-keep [word-break:keep-all]">
              공정 통계 모니터링부터 하이엔드 건축 인테리어, 전자서약 SaaS, B2B 커머스까지.<br className="hidden lg:inline" />
              기획서 속 그림이 아닌 브라우저에서 프로덕션 레퍼런스를 둘러보세요.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 pt-2">
              <Link
                href="/inquiry"
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs lg:text-sm transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>프로젝트 견적 문의하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:010-8672-6463"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs lg:text-sm transition-all border border-white/25 backdrop-blur-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
                <span>총괄 아키텍트 직통 상담</span>
              </a>
            </div>

            {/* Studio Trust Metrics / Badges */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>100% 직영 개발</span>
              </div>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Next.js 16 최신 스택</span>
              </div>
              <span className="text-zinc-600">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>엔터프라이즈 레퍼런스</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 Quick Category Navigation Pills (Full Width, Floating Over Transition) */}
        <div id="gallery" className="max-w-7xl mx-auto px-4 lg:px-8 relative z-20 w-full pt-4">
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {GALLERY_CATEGORIES.map((cat) => {
              const count = galleryProjects.filter((p) => p.category === cat.id).length;
              // 작업물이 다 내려간 분류는 바로가기도 없앤다 — 눌러도 빈 자리로 가는 칸을 남기지 않는다
              if (count === 0) return null;
              return (
                <a
                  key={cat.id}
                  href={`#category-${cat.id}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white/95 hover:bg-white text-zinc-800 hover:text-black border border-zinc-200/90 shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span className="font-mono text-[11px] text-zinc-400">{cat.number}</span>
                  <span>{cat.name.split(" · ")[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-100 text-zinc-700 font-mono border border-zinc-200">
                    {count}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. THE 6-CATEGORY PORTFOLIO GALLERIES (5-COLUMN GRID + ACCORDION)
          ───────────────────────────────────────────────────────────── */}
      <section className="pb-24 lg:pb-36 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-20 lg:space-y-28">
        {GALLERY_CATEGORIES.map((category) => {
          const allProjects = galleryProjects.filter((p) => p.category === category.id);
          // 다 내려간 분류는 제목·설명까지 통째로 뺀다(「총 0개 작품」 자리가 남지 않게)
          if (allProjects.length === 0) return null;

          const isInitial = categoryVisibleCounts[category.id] === undefined;
          // 초기 상태에서는 데스크톱(5개)과 모바일(4개)을 CSS로 분기하기 위해 5개를 렌더링하고 5번째 카드를 hidden lg:flex 처리
          const visibleProjects = isInitial
            ? allProjects.slice(0, 5)
            : allProjects.slice(0, categoryVisibleCounts[category.id]);

          // 모바일/데스크톱 화면별 확장 상태 및 다음 단계 표시 개수
          const currentCountMobile = isInitial ? 4 : (categoryVisibleCounts[category.id] ?? 4);
          const currentCountDesktop = isInitial ? 5 : (categoryVisibleCounts[category.id] ?? 5);
          const isFullyExpandedMobile = currentCountMobile >= allProjects.length;
          const isFullyExpandedDesktop = currentCountDesktop >= allProjects.length;
          const nextMobileAdd = Math.min(4, allProjects.length - currentCountMobile);
          const nextDesktopAdd = Math.min(5, allProjects.length - currentCountDesktop);
          const categoryShortName = category.name.split(" · ")[0];
          const hasMoreThanDefault = allProjects.length > 4;

          return (
            <div
              key={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-28 pt-4"
            >
              {/* Category Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 lg:mb-8 pb-4 border-b border-zinc-200 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-zinc-400">
                      SECTION {category.number}
                    </span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                      {category.engName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-zinc-100 border border-zinc-200">
                      {getCategoryIcon(category.id)}
                    </div>
                    <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-950">
                      {category.name}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-mono border border-zinc-200">
                      총 {allProjects.length}개 작품
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm text-zinc-500 mt-2 max-w-3xl font-light">
                    {category.description}
                  </p>
                </div>

                {/* Right Quick Action: Live Demo Direct Links */}
                {/* 손으로 적은 바로가기라 카드와 따로 논다 — 그 시안이 내려가면 이 버튼도 같이 빠져야 한다.
                    **표는 서버 모듈(lib/portfolio/home-shortcuts.ts)에 두고 걸러진 배열만 받는다.**
                    여기에 주소·회사 이름을 적으면 렌더를 막아도 문자열이 홈 청크에 남는다(실측으로 잡힌 누수).
                    firstProject 는 따로 뜨는 화면이 없는 분류(메디컬)용 — 그 분류에 남아 있는 첫 카드를 모달로 연다.
                    allProjects 는 서버가 걸러 준 배열이고 length 0 이면 분류째 빠지므로 [0] 은 항상 있다. */}
                {shortcuts
                  .filter((shortcut) => shortcut.categoryId === category.id)
                  .map((shortcut) => {
                    const icon =
                      shortcut.icon === "external" ? (
                        <ExternalLink className="w-3 h-3" />
                      ) : (
                        <Play className="w-3 h-3 fill-current" />
                      );
                    if (shortcut.action === "firstProject") {
                      return (
                        <button
                          key={shortcut.label}
                          type="button"
                          onClick={() => setSelectedProject(allProjects[0])}
                          className={shortcut.className}
                        >
                          {icon}
                          <span>{shortcut.label}</span>
                        </button>
                      );
                    }
                    if (shortcut.action === "external") {
                      return (
                        <a
                          key={shortcut.label}
                          href={shortcut.href}
                          target="_blank"
                          rel="noreferrer"
                          className={shortcut.className}
                        >
                          {icon}
                          <span>{shortcut.label}</span>
                        </a>
                      );
                    }
                    return (
                      <Link key={shortcut.label} href={shortcut.href ?? "#"} className={shortcut.className}>
                        {icon}
                        <span>{shortcut.label}</span>
                      </Link>
                    );
                  })}
              </div>

              {/* 5-Column Gallery Grid (PC: lg:grid-cols-5, Mobile: grid-cols-2) */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4.5">
                {visibleProjects.map((project, index) => {
                  const isFifthHiddenOnMobile = isInitial && index === 4;
                  return (
                    <div
                      key={project.id}
                      id={`project-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      className={`${
                        isFifthHiddenOnMobile ? "hidden lg:flex" : "flex"
                      } group relative rounded-2xl bg-zinc-50 border border-zinc-200/90 hover:border-zinc-400 p-2.5 lg:p-3 flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden scroll-mt-32`}
                    >
                    {/* Thumbnail Image Container */}
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 relative mb-3">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        onError={hideBrokenThumbnail}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2">
                        <span className="text-[10px] text-white font-medium bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                          상세보기
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>

                      {/* Top Badge — '실물 라이브 데모' 텍스트 박스는 노출하지 않고 우측 '샘플' 표식만 유지 */}
                      {project.badge && project.badge !== "실물 라이브 데모" && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold text-zinc-900 shadow-sm border border-zinc-200/60">
                          {project.badge}
                        </div>
                      )}

                      {/* 성격 표시 — 왼쪽 배지는 마케팅 문구 자리라, 사실 표시는 반대쪽 귀퉁이에 따로 둔다 */}
                      <WorkMark project={project} className="absolute top-2 right-2" />
                    </div>

                    {/* Meta info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-zinc-400 font-mono flex items-center justify-between mb-1">
                          <span>{project.categoryName}</span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-xs lg:text-sm font-bold text-zinc-900 group-hover:text-amber-800 transition-colors line-clamp-1 leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 mt-1 font-light leading-tight">
                          {project.summary}
                        </p>
                      </div>

                      {/* Tech stack pills */}
                      <div className="pt-2.5 mt-2 border-t border-zinc-200/60 flex items-center justify-between">
                        <div className="flex items-center gap-1 overflow-hidden">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700 font-mono truncate max-w-[90px]">
                            {project.techStack[0]}
                          </span>
                          {project.techStack[1] && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 text-zinc-700 font-mono truncate max-w-[90px]">
                              {project.techStack[1]}
                            </span>
                          )}
                        </div>
                        {/* 제작 기간은 사실이고 이 회사의 핵심 세일즈 포인트라 흐릿하게 두지 않는다 */}
                        <span className="text-[10px] text-zinc-700 font-mono font-bold shrink-0">
                          제작 {project.period}
                        </span>
                      </div>
                    </div>
                    </div>
                  );
                })}
              </div>

              {/* Accordion Expand/Collapse Button (모바일 4개 단위, 데스크톱 5개 단위) */}
              {hasMoreThanDefault && (
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => handleCategoryStep(category.id, allProjects.length)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold border border-zinc-200 shadow-sm transition-all cursor-pointer group"
                  >
                    {/* 모바일 화면 텍스트 */}
                    <span className="lg:hidden">
                      {isFullyExpandedMobile
                        ? `${categoryShortName} 상위 4개만 보기`
                        : `${categoryShortName} +${nextMobileAdd}개 프로젝트 더보기`}
                    </span>
                    {/* 데스크톱 화면 텍스트 */}
                    <span className="hidden lg:inline">
                      {isFullyExpandedDesktop
                        ? `${categoryShortName} 상위 5개만 보기`
                        : `${categoryShortName} +${nextDesktopAdd}개 프로젝트 더보기`}
                    </span>
                    {/* 모바일 화면 아이콘 */}
                    <span className="lg:hidden inline-flex items-center">
                      {isFullyExpandedMobile ? (
                        <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </span>
                    {/* 데스크톱 화면 아이콘 */}
                    <span className="hidden lg:inline-flex items-center">
                      {isFullyExpandedDesktop ? (
                        <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                      )}
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CAPABILITIES (4 PILLARS IN WHITE ARCHITECTURAL CARDS)
          ───────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-zinc-200">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400 block mb-2 font-mono">
            CAPABILITIES
          </span>
          <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 tracking-tight">
            태문 데브스튜디오의 <span className="font-serif italic text-zinc-800 font-normal">전문 역량 4대 축</span>
          </h2>
          <p className="text-zinc-500 text-xs lg:text-sm mt-2 font-light">
            단순 웹사이트 제작을 넘어, 산업 현장의 복잡한 요구조건을 풀스택 아키텍처로 정밀하게 해결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-200">
                <Compass className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">01 / BRANDING</div>
              <h3 className="text-lg font-serif text-zinc-950 font-bold">디지털 플래그십 &amp; 브랜드 웹</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                건축, 인테리어, 명품 패션, 프리미엄 소비재를 위한 압도적 감도의 타이포그래피와 고해상도 화보형 반응형 웹사이트.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-amber-800 font-mono">
              • 반응형 갤러리 &amp; 예약 위저드
            </div>
          </div>

          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">02 / INDUSTRY DATA</div>
              <h3 className="text-lg font-bold text-zinc-950">스마트 공정 데이터 플랫폼</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                제조·설비·소재 현장의 수기 엑셀을 실시간 SPC 관리도, 수율 분석, 4단계 로트 계보 역추적 시스템으로 디지털 전환.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-emerald-800 font-mono">
              • 실시간 SPC 통계 &amp; 불량 감지
            </div>
          </div>

          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">03 / LEGAL TECH</div>
              <h3 className="text-lg font-bold text-zinc-950">전자서약 &amp; 스마트 서식</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                카카오 알림톡 원클릭 전자서명, PDF/PNG 실시간 벡터 합성 엔진, 전자서명법 기준 감사추적증명서 3중 보안 모듈 구축.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-purple-800 font-mono">
              • 전자서명법 근거 &amp; 감사추적
            </div>
          </div>

          <div className="bg-zinc-50 p-6 lg:p-7 rounded-2xl border border-zinc-200 hover:border-zinc-400 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center border border-blue-200">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[11px] font-mono text-zinc-400">04 / TRANSACTIONS</div>
              <h3 className="text-lg font-bold text-zinc-950">PG 결제 &amp; 안전 정산 빌링</h3>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                신용카드 단건 결제부터 빌링키 정기 구독, 단계별 기성 검수 정산 모듈, 본인인증(PASS/KGI) 연동까지 완벽 구축.
              </p>
            </div>
            <div className="pt-3 border-t border-zinc-200 text-[11px] text-blue-800 font-mono">
              • PortOne V2 &amp; 결제 자동화
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE TAEMUN WAY (CREATIVE & ARCHITECTURAL PROCESS)
          ───────────────────────────────────────────────────────────── */}
      <section id="process" className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-zinc-200">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400 block mb-2 font-mono">
            THE TAEMUN WAY
          </span>
          <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 tracking-tight">
            실패 없는 개발을 위한 <span className="font-serif italic text-zinc-800 font-normal">4단계 직영 파이프라인</span>
          </h2>
          <p className="text-zinc-500 text-xs lg:text-sm mt-2 font-light">
            하청 없는 총괄 아키텍트 직영 책임 감리로 기획 오류와 소통 부재를 원천 차단합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 01</span>
            <h4 className="text-base font-bold text-zinc-950">본질 심층 분석</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              업종의 특성과 고객사의 핵심 수익 모델, 필수 기능만을 총괄 아키텍트가 1:1로 정밀 분석하여 낭비 없는 스펙을 정의합니다.
            </p>
          </div>

          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 02</span>
            <h4 className="text-base font-bold text-zinc-950">7일 실물 프로토타입</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              그림이나 PPT 기획서가 아닌, 실제 브라우저에서 버튼이 눌리고 모달이 열리는 100% 실물 데모 사이트를 단 7일 만에 시연합니다.
            </p>
          </div>

          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 03</span>
            <h4 className="text-base font-bold text-zinc-950">풀스택 장인 시공</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Next.js 16, TypeScript, Tailwind v4, Supabase RLS 등 최고 수준의 기술 스택으로 한 땀 한 땀 결점 없이 견고하게 코딩합니다.
            </p>
          </div>

          <div className="p-6 lg:p-7 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <span className="text-amber-800 font-mono text-xs font-bold block">STEP 04</span>
            <h4 className="text-base font-bold text-zinc-950">소스 완전 이전 &amp; 케어</h4>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              개발된 모든 소스코드와 지식재산권을 100% 완전 이전하며, 런칭 후 안정적 운영을 위한 전담 무상 하자보증을 약속합니다.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. START A PROJECT (HIGH-END INQUIRY & CONTACT)
          ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 lg:py-28 px-4 lg:px-8 max-w-5xl mx-auto text-center relative z-10">
        <div className="bg-zinc-50 p-8 lg:p-14 rounded-3xl border border-zinc-200 shadow-lg relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-xs font-semibold mb-6">
            <span>START A PROJECT</span>
          </div>

          <h2 className="text-2xl lg:text-4xl font-light text-zinc-950 mb-4 leading-tight">
            귀사의 다음 프로젝트를 <br />
            <span className="font-serif italic text-zinc-800 font-normal">태문과 함께 상상해 보세요.</span>
          </h2>

          <p className="text-zinc-600 text-xs lg:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
            아이디어 단계의 간단한 구상부터 대형 엔터프라이즈 플랫폼까지, 총괄 아키텍트가 24시간 이내에 직접 검토 후 최적의 방향을 제시합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
            <Link
              href="/inquiry"
              className="w-full py-3.5 px-6 rounded-xl bg-zinc-950 hover:bg-black text-white font-bold text-xs lg:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>온라인 맞춤 견적 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-zinc-200 flex flex-col lg:flex-row items-center justify-center gap-6 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-zinc-700" />
              <span>직통 유선 상담: 010-8672-6463</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-700" />
              <span>공식 이메일: contact@taemun.co.kr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agency Minimal Footer */}
      <footer className="border-t border-zinc-200 py-10 px-4 lg:px-8 max-w-7xl mx-auto text-xs text-zinc-500 flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 text-center lg:text-left">
          <span className="font-bold text-zinc-900 tracking-wide">TAEMUN DEV STUDIO</span>
          <span className="hidden lg:inline text-zinc-300">|</span>
          <span>(주)태문 • 사업자등록번호 211-88-94103</span>
          <span className="hidden lg:inline text-zinc-300">|</span>
          <span>서울시 강남구 테헤란로</span>
        </div>
        <div>
          &copy; {new Date().getFullYear()} TAEMUN DEV STUDIO. All rights reserved.
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          6. PROJECT EXHIBITION MODAL (POPUP ON CARD CLICK)
          ───────────────────────────────────────────────────────────── */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shadow-2xl border border-zinc-200 flex flex-col justify-between text-left">
            {/* Modal Header */}
            <div className="p-5 lg:p-6 border-b border-zinc-200 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-20">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold border border-zinc-200">
                  {selectedProject.categoryName}
                </span>
                <span className="text-xs text-zinc-400 font-mono">• {selectedProject.year}</span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 lg:p-6 space-y-6">
              {/* Image Preview */}
              <div>
                {selectedProject.liveDemoUrl ? (
                  <Link
                    href={`${selectedProject.liveDemoUrl}${selectedProject.liveDemoUrl.includes('?') ? '&' : '?'}fromCategory=${selectedProject.category}&fromProject=${selectedProject.id}`}
                    className="block group aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative cursor-pointer"
                    title="반응형 뷰어로 체험 (PC · 태블릿 · 모바일)"
                  >
                    <ModalPreviewMedia key={selectedProject.id} project={selectedProject} zoomOnHover />
                    {selectedProject.badge && selectedProject.badge !== "실물 라이브 데모" && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/95 text-xs font-bold text-zinc-900 shadow-md">
                        {selectedProject.badge}
                      </span>
                    )}
                    {/* 카드와 같은 표를 같은 함수로 — 카드에서 본 것이 모달에서도 그대로 보인다 */}
                    <WorkMark project={selectedProject} className="absolute top-3 right-3" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </Link>
                ) : selectedProject.externalUrl ? (
                  <a
                    href={selectedProject.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block group aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative cursor-pointer"
                    title="실제 운영 사이트 방문하기"
                  >
                    <ModalPreviewMedia key={selectedProject.id} project={selectedProject} zoomOnHover />
                    {selectedProject.badge && selectedProject.badge !== "실물 라이브 데모" && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/95 text-xs font-bold text-zinc-900 shadow-md">
                        {selectedProject.badge}
                      </span>
                    )}
                    <WorkMark project={selectedProject} className="absolute top-3 right-3" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                  </a>
                ) : (
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 relative">
                    <ModalPreviewMedia key={selectedProject.id} project={selectedProject} zoomOnHover={false} />
                    {selectedProject.badge && selectedProject.badge !== "실물 라이브 데모" && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/95 text-xs font-bold text-zinc-900 shadow-md">
                        {selectedProject.badge}
                      </span>
                    )}
                    <WorkMark project={selectedProject} className="absolute top-3 right-3" />
                  </div>
                )}
                {selectedProject.liveDemoUrl && (
                  <Link
                    href={`${selectedProject.liveDemoUrl}${selectedProject.liveDemoUrl.includes('?') ? '&' : '?'}fromCategory=${selectedProject.category}&fromProject=${selectedProject.id}`}
                    className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors group cursor-pointer"
                    title="반응형 뷰어로 체험 (PC · 태블릿 · 모바일)"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>멀티 디바이스 반응형</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-zinc-900 transition-all" />
                  </Link>
                )}
              </div>

              {/* Title & Target */}
              <div>
                {/* 「클라이언트」가 아니라 「제작 대상」 — 이 화면을 어떤 업종·조직을 상정하고 만들었는가라는 뜻이다.
                    실제 계약 고객을 가리키는 말이 아니므로 라벨을 바꿔 뜻을 맞춘다(성격은 오른쪽 위 표가 말한다). */}
                <div className="text-xs text-zinc-500 break-keep [word-break:keep-all] leading-relaxed mb-1.5">
                  <span className="font-mono text-zinc-400">제작 대상:</span>{" "}
                  <span>{selectedProject.client}</span>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-zinc-950 break-keep [word-break:keep-all] [text-wrap:balance] leading-snug">
                  {selectedProject.title}
                </h3>
                <p className="text-xs lg:text-sm text-zinc-600 mt-2.5 font-normal leading-relaxed break-keep [word-break:keep-all] [text-wrap:pretty]">
                  {selectedProject.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2.5">
                <div className="text-xs font-bold text-zinc-700 mb-1">핵심 구현 기술 및 산출물</div>
                {selectedProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-600 break-keep [word-break:keep-all] leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="flex-1">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack & Period */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>제작 기간: {selectedProject.period}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-5 lg:p-6 border-t border-zinc-200 bg-zinc-50/70 rounded-b-3xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {selectedProject.liveDemoUrl ? (
                <Link
                  href={`${selectedProject.liveDemoUrl}${selectedProject.liveDemoUrl.includes('?') ? '&' : '?'}fromCategory=${selectedProject.category}&fromProject=${selectedProject.id}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-950 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all group break-keep text-center"
                >
                  <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>반응형 뷰어로 체험 (PC · 태블릿 · 모바일)</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </Link>
              ) : selectedProject.externalUrl ? (
                <a
                  href={selectedProject.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all break-keep text-center"
                >
                  <span>실제 운영 사이트 방문하기</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              ) : null}

              <Link
                href={`/inquiry?project=${encodeURIComponent(selectedProject.title)}`}
                onClick={() => setSelectedProject(null)}
                className="py-3 px-5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all break-keep text-center shrink-0"
              >
                <span>이 레퍼런스로 제작 문의</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Widget — 웹페이지 미리보기 모달(selectedProject)이 열려 있을 때는 화면을 가리지 않도록 숨김 */}
      {!selectedProject && <FloatingChatWidget />}
    </div>
  );
}
