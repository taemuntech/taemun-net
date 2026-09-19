import type { Metadata, Viewport } from "next";
import "../globals.css";

// 관리자 전용 루트 레이아웃 — 2026-09-19 가온, 관리자 개편 P1a.
//
// 왜 (site) 레이아웃을 쓰지 않나:
// - (site) 는 NEXT_PUBLIC_GA_ID 가 있으면 GA 를 싣는다. 관리자 화면에는 고객 이름·연락처가 뜨므로
//   방문 통계 도구가 그 주소·화면을 읽을 여지를 아예 두지 않는다(09-19 운영 HTML 에 GA 없음 — 그래도 겹으로 막는다).
// - 검색용 JSON-LD·아이콘 글꼴·미디어 보호 스크립트는 관리자에 필요 없다. 외부 요청을 줄인다.
// - 관리자 화면은 전부 어두운 톤이라 바탕도 여기서 어둡게 깐다(흰 바탕이 스크롤 끝에서 비치지 않게).
//
// ⚠️ 주소는 그대로 /admin… 이다. 폴더만 (site) → (admin) 으로 옮겼다.
//    보안 머리글(다른 사이트 안에 띄우기 금지·리퍼러 안 보냄·검색 제외)은 next.config.ts 의 headers() 가 건다.
export const metadata: Metadata = {
  metadataBase: new URL("https://taemun.net"),
  title: {
    default: "관리자",
    template: "%s | 태문넷",
  },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased bg-[#030712] text-gray-100 min-h-screen [word-break:keep-all]">{children}</body>
    </html>
  );
}
