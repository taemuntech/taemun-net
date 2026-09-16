import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import DemoDisclaimer from "@/components/demo-kit/DemoDisclaimer";
import { getPortfolio } from "@/lib/portfolio/registry";

// 샘플 사이트·제안용 시안 전용 루트 레이아웃.
// - 사이트 틀((site)/layout.tsx)의 다크 톤·JSON-LD 를 물려받지 않는다 — 샘플은 각자 디자인.
// - 가상 브랜드도, 실존 업체 제안 시안도 검색에 뜨면 안 된다 → index: false (하위 page 가 robots 를 다시 적지 않는다).
// - GA 는 영업 링크 방문 측정용으로 사이트와 같은 조건부 코드.
// - 상단 「태문 표시 · 포트폴리오 · 제작 문의」 는 기기 전환 툴바(DevicePreviewFrame)가 맡는다.
//   여기서 SampleSiteBar 를 또 렌더하면 상단 바가 둘이 된다. 툴바 없이 쓰는 샘플이 생기면 그때 이 레이아웃이 아니라
//   그 샘플의 page 에서 SampleSiteBar 를 붙인다(--sample-bar-h 는 바가 없으면 0px 로 읽힌다).
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

export default function DemosRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 제안용 시안 고지에 넘길 slug→종류 표 (레지스트리는 서버에서만 읽힌다)
  const kinds: Record<string, string> = Object.fromEntries(getPortfolio().map((item) => [item.slug, item.kind]));

  return (
    <html lang="ko">
      <head>
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
        <DemoDisclaimer kinds={kinds} />
        {children}</body>
    </html>
  );
}
