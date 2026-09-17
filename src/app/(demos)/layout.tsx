import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import MediaProtectionGuard from "@/components/MediaProtectionGuard";
import DemoDisclaimer from "@/components/demo-kit/DemoDisclaimer";
import { DEMO_GONE_PATH, DEMO_SLUG_HEADER, decideDemoAccess } from "@/lib/portfolio/gate";

// 샘플 사이트·제안용 시안 전용 루트 레이아웃.
// - 사이트 틀((site)/layout.tsx)의 다크 톤·JSON-LD 를 물려받지 않는다 — 샘플은 각자 디자인.
// - 가상 브랜드도, 실존 업체 제안 시안도 검색에 뜨면 안 된다 → index: false (하위 page 가 robots 를 다시 적지 않는다).
// - GA 는 영업 링크 방문 측정용으로 사이트와 같은 조건부 코드.
// - 상단 「태문 표시 · 포트폴리오 · 제작 문의」 는 기기 전환 툴바(DevicePreviewFrame)가 맡는다.
//   여기서 SampleSiteBar 를 또 렌더하면 상단 바가 둘이 된다. 툴바 없이 쓰는 샘플이 생기면 그때 이 레이아웃이 아니라
//   그 샘플의 page 에서 SampleSiteBar 를 붙인다(--sample-bar-h 는 바가 없으면 0px 로 읽힌다).
//
// 🔒 **주소 막기는 여기 한 곳이다.** proxy 가 실어 준 x-demo-slug 로 공개 상태를 판정해, 비공개면
//    안내 화면(/gone)으로 보낸다. 데모별 page.tsx 를 고칠 필요가 없어 새 데모도 자동으로 걸린다.
//    상태 읽기가 실패하면 제안 시안은 막히는 쪽으로 넘어진다(lib/portfolio/gate.ts).
//    headers() 를 쓰므로 데모 라우트는 전부 동적 렌더가 된다 — 내려간 화면이 정적 HTML 로 굳어 남지 않는다.
export const metadata: Metadata = {
  metadataBase: new URL("https://taemun.net"),
  title: {
    default: "샘플 사이트 — 태문 DEV STUDIO",
    template: "%s — 태문 DEV STUDIO",
  },
  robots: {
    index: false,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/images/logo/icon-192-transparent.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/logo/icon-192-transparent.png",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default async function DemosRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 🔒 주소 막기(본문). 제목·og 는 데모 page 의 generateMetadata 가 같은 판정으로 따로 막는다 —
  // redirect 는 metadata 해석 **뒤**라 이것만으로는 307 본문에 회사 이름이 실려 나간다(lib/portfolio/gate.ts).
  const access = await decideDemoAccess((await headers()).get(DEMO_SLUG_HEADER));
  if (access.blocked) redirect(DEMO_GONE_PATH);

  // 고지 한 줄에는 **지금 이 데모가 제안 시안인가** 불리언 하나만 넘긴다.
  // slug→종류 표를 통째로 내려 주면 공개 샘플 한 장의 HTML 에도 「wonik-qnc:proposal」 같은 목록이 남아,
  // 내린 시안의 존재와 주소(=회사 이름)가 계속 새어 나간다(실측: /demo/maison 본문에 8개가 전부 있었다).
  const isProposal = access.kind === "proposal";

  return (
    <html lang="ko">
      <head>
        {/* 아이콘 글꼴 — 메종·한양시스템 데모가 Material Symbols 리거처(<span className="material-symbols-outlined">search</span>)를 쓴다.
            (site) 레이아웃에만 있어서 데모에서는 아이콘 자리에 「search favorite shopping_bag」 글자가 그대로 찍혔다(썸네일 실측 2026-09-16). */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased bg-white text-gray-900 min-h-screen">
        <MediaProtectionGuard />
        <DemoDisclaimer isProposal={isProposal} slug={access.slug} />
        {children}
      </body>
    </html>
  );
}
