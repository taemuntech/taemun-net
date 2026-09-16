import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// 루트 레이아웃이 (site)·(demos) 두 개라 매칭 안 되는 주소의 404 는 이 파일이 처리한다.
// 레이아웃을 거치지 않으므로 html/body·전역 CSS·다크 톤을 여기서 직접 건다.
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지가 없거나 주소가 바뀌었습니다.",
};

export default function GlobalNotFound() {
  return (
    <html lang="ko" className="dark">
      <body className="antialiased bg-[#030712] text-gray-100 min-h-screen [word-break:keep-all]">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <p className="text-sm font-semibold tracking-widest text-indigo-400">404</p>
            <h1 className="mt-3 text-2xl font-bold text-white">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              요청하신 페이지가 없거나 주소가 바뀌었습니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                홈으로
              </Link>
              <Link
                href="/portfolio"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-white/10"
              >
                포트폴리오
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
