import type { Metadata } from "next";
import Script from "next/script";
import { SITE_OG_IMAGES } from "@/lib/site-og";
import MediaProtectionGuard from "@/components/MediaProtectionGuard";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://taemun.net"),
  title: {
    default: "홈페이지 제작 & 웹·앱 개발 외주 전문 | 태문넷",
    template: "%s | 태문넷",
  },
  description:
    "맞춤형 홈페이지 제작부터 고성능 웹·앱 솔루션, 전자서식 SaaS, PG 결제 연동까지. 업종별 샘플로 시안을 먼저 보고 결정하세요. 개발 외주 문의 010-8672-6463",
  keywords: [
    "홈페이지 제작",
    "홈페이지 제작 외주",
    "웹 앱개발",
    "웹 개발 외주",
    "앱 개발 외주",
    "웹개발회사",
    "Next.js 개발",
    "풀스택 개발 외주",
    "전자서식 개발",
    "PG 결제 연동",
    "태문넷",
    "taemun.net",
    "태문",
    // 2026-09-19 개명 전 이름 — 예전 이름으로 찾는 사람도 이어지게 남긴다
    "태문 DEV STUDIO",
  ],
  // alternates.canonical 은 레이아웃에 두지 않는다 — 하위 페이지가 전부 홈을 canonical 로
  // 물려받는 결함이 있었다. 홈만 (site)/page.tsx 에서 "/" 를 선언한다.
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문넷",
    title: "홈페이지 제작 & 웹·앱 개발 외주 전문 | 태문넷",
    description:
      "맞춤형 홈페이지 제작부터 고성능 웹·앱 솔루션, 전자서식 SaaS, PG 결제 연동까지. 업종별 샘플로 시안을 먼저 보고 결정하세요.",
    url: "https://taemun.net",
    images: SITE_OG_IMAGES,
  },
  // twitter 에는 card 만 둔다 — title·description 을 여기 적으면 하위 페이지가 전부 홈 문구를 물려받는다
  // (metadata 는 키 단위로 얕게 합쳐져 페이지의 openGraph 가 twitter 를 덮지 않음). 비워 두면 Next 가 각 페이지 openGraph 에서 채운다.
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "googlef6d4a13fe73ddf52",
    other: {
      "naver-site-verification": "0c25d962d5be87c42ab7e467839070ad0050eaf3",
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 아라가 a45bebf 에서 추가한 아이콘 폰트 — 그대로 유지 */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // 사이트 이름은 「태문넷」(2026-09-19 개명 — 도메인 taemun.net 과 같은 이름). 검색 결과에 뜨는 사이트 이름은
            // WebSite 의 name 을 먼저 본다. 옛 이름 「태문 DEV STUDIO」는 alternateName 으로 남겨 같은 사이트로 이어지게 한다.
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "태문넷",
                  alternateName: ["taemun.net", "태문 DEV STUDIO"],
                  url: "https://taemun.net/",
                },
                {
                  "@type": "ProfessionalService",
                  name: "태문넷",
                  alternateName: ["태문 DEV STUDIO", "taemun.net"],
                  legalName: "주식회사 태문",
                  url: "https://taemun.net",
                  description:
                    "홈페이지 제작, 웹·앱 플랫폼 개발, 전자서식 SaaS 및 PG 결제 시스템 전문 외주 개발 스튜디오",
                  telephone: "+82-10-8672-6463",
                  email: "contact@taemun.co.kr",
                  areaServed: "KR",
                  availableLanguage: "Korean",
                  serviceType: [
                    "홈페이지 제작",
                    "웹 앱 개발",
                    "전자서식 솔루션",
                    "PG 결제 및 정기구독 연동",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-zinc-900 min-h-screen selection:bg-zinc-900 selection:text-white">
        <MediaProtectionGuard />
        {children}
      </body>
    </html>
  );
}
