import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://taemun.net"),
  title: {
    default: "홈페이지 제작 & 웹·앱 개발 외주 전문 | 태문 DEV STUDIO",
    template: "%s | 태문 DEV STUDIO",
  },
  description:
    "맞춤형 홈페이지 제작부터 고성능 웹·앱 솔루션, 전자서식 SaaS, PG 결제 연동까지. 타사 대비 2배 빠른 0→1 프로덕션 구축! 개발 외주 문의 1588-2622",
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
    "태문 DEV STUDIO",
    "태문",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문 DEV STUDIO",
    title: "홈페이지 제작 & 웹·앱 개발 외주 전문 | 태문 DEV STUDIO",
    description:
      "맞춤형 홈페이지 제작부터 고성능 웹·앱 솔루션, 전자서식 SaaS, PG 결제 연동까지. 타사 대비 2배 빠른 0→1 프로덕션 구축!",
    url: "https://taemun.net",
  },
  twitter: {
    card: "summary_large_image",
    title: "홈페이지 제작 & 웹·앱 개발 외주 전문 | 태문 DEV STUDIO",
    description:
      "맞춤형 홈페이지 제작부터 고성능 웹·앱 솔루션, 전자서식 SaaS, PG 결제 연동까지. 타사 대비 2배 빠른 0→1 프로덕션 구축!",
  },
  verification: {
    google: "googlef6d4a13fe73ddf52",
    other: {
      "naver-site-verification": "0c25d962d5be87c42ab7e467839070ad0050eaf3",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "태문 DEV STUDIO",
              legalName: "주식회사 태문",
              url: "https://taemun.net",
              description:
                "홈페이지 제작, 웹·앱 플랫폼 개발, 전자서식 SaaS 및 PG 결제 시스템 전문 외주 개발 스튜디오",
              telephone: "+82-1588-2622",
              email: "contact@taemun.co.kr",
              areaServed: "KR",
              availableLanguage: "Korean",
              serviceType: [
                "홈페이지 제작",
                "웹 앱 개발",
                "전자서식 솔루션",
                "PG 결제 및 정기구독 연동",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased bg-[#030712] text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
