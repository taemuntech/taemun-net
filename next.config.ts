import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 루트 레이아웃이 (site)·(demos) 두 개 — 매칭 안 되는 주소의 404 는 app/global-not-found.tsx 가 맡는다.
    globalNotFound: true,
  },
  // 문의 API 가 유입 slug 의 종류·업종을 레지스트리(src/content/portfolio/*.json, fs 로 읽음)에서 다시 찾는다 —
  // 서버리스 함수 번들에 JSON 이 빠지지 않게 추적 대상에 넣는다. 못 읽어도 API 는 「unknown」으로 계속 동작한다.
  outputFileTracingIncludes: {
    "/api/inquiry": ["./src/content/portfolio/*.json"],
  },
};

export default nextConfig;
