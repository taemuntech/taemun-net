import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "태문 DEV STUDIO | 풀스택 웹·앱 플랫폼 전문 개발",
  description: "0에서 1까지, 맞춤형 모듈 서비스부터 초대형 플랫폼까지 프로덕션급 기술력으로 직접 구축합니다.",
  keywords: ["태문", "웹개발외주", "앱개발외주", "Next.js", "풀스택개발", "전자서식개발", "PG결제연동"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased bg-[#030712] text-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
