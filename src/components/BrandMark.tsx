// 태문넷 브랜드 표시 한 곳 — 검은 사각형 안의 T-Gate 모노그램 + 「태문넷 DEV STUDIO」 글자.
//
// 왜 따로 뺐나: 공용 Header 와 견적 화면(/inquiry)의 집중형 헤더가 같은 로고를 써야 하는데, 예전에는 견적 화면만
// 옛 알록달록 TM 아이콘 이미지와 파란 DEV STUDIO 글자를 따로 그려서 홈과 다른 사이트처럼 보였다(2026-09-19 형 피드백).
// 한 곳에 두면 로고를 바꿀 때 한 번만 고치면 된다. 파비콘·홈 화면 아이콘(public/favicon.* · apple-touch-icon.png)은
// 같은 모노그램으로 scripts/generate-brand-icons.mjs 가 만든다.
//
// 상태·브라우저 API 가 없어 서버·클라이언트 어디서나 쓸 수 있다.

export function BrandMonogram({ className = "" }: { className?: string }) {
  return (
    <span
      className={`w-9 lg:w-10 h-9 lg:h-10 rounded-xl bg-zinc-950 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:bg-zinc-800 transition-all ${className}`}
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        {/* Minimalist Architectural T-Gate Mark */}
        <path d="M4 6.5H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 6.5V18.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="18.5" cy="18" r="2" fill="#d97706" />
      </svg>
    </span>
  );
}

/** 모노그램 + 「태문넷 DEV STUDIO」(+ 선택: 아래 한 줄 부제). 링크는 부르는 쪽이 감싼다 */
export function BrandLockup({ tagline = "Bespoke Digital Gallery" }: { tagline?: string | null }) {
  return (
    <span className="flex items-center gap-2.5 lg:gap-3 min-w-0">
      <BrandMonogram />
      <span className="flex flex-col text-left">
        <span className="flex items-center gap-1.5">
          <span className="text-base lg:text-lg font-extrabold tracking-tight text-zinc-950 leading-none group-hover:text-black transition-colors">
            태문넷
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-500 uppercase">DEV STUDIO</span>
        </span>
        {tagline ? (
          <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono mt-0.5">{tagline}</span>
        ) : null}
      </span>
    </span>
  );
}
