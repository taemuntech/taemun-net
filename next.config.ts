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
    // 관리자 API 도 같은 JSON 을 fs 로 읽는다 — 저장할 slug 가 등록된 것인지(state),
    // 확인할 공개 주소가 무엇인지(verify) 레지스트리에서 다시 찾기 때문.
    // 빠뜨리면 로컬은 멀쩡하고 운영에서만 400/500 이 난다.
    "/api/admin/state": ["./src/content/portfolio/*.json"],
    "/api/admin/verify": ["./src/content/portfolio/*.json"],
    // 상태를 보고 내주는 자산(제안 시안 썸네일·업체 원본 이미지)은 public/ 밖(private-assets/)에 둔다 —
    // public/ 과 달리 자동으로 배포되지 않으므로 이 라우트 번들에 직접 넣어야 한다.
    // 빠뜨리면 로컬은 멀쩡하고 운영에서만 그 썸네일이 전부 404 가 된다.
    "/api/asset/[...path]": ["./private-assets/**", "./src/content/portfolio/*.json"],
  },
};

export default nextConfig;
