import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 응답마다 붙던 「X-Powered-By: Next.js」를 끈다 — 방문자에게 쓸모는 없고,
  // 버전별 알려진 취약점을 노리는 자동 스캐너에게 「무엇으로 만들었는지」를 공짜로 알려 주는 표지일 뿐이다.
  poweredByHeader: false,
  experimental: {
    // 루트 레이아웃이 (site)·(demos)·(admin) 세 개 — 매칭 안 되는 주소의 404 는 app/global-not-found.tsx 가 맡는다.
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
  // 관리자 화면·API 의 보안 머리글(관리자 개편 P1a). 고객 이름·연락처가 뜨는 화면이라
  // - 다른 사이트가 iframe 으로 띄워 누르게 하지 못하게(X-Frame-Options + CSP frame-ancestors, 옛 브라우저까지 두 겹)
  // - 관리자 주소(쪽 번호·상태 거르기)가 바깥 링크로 새지 않게(Referrer-Policy)
  // - 검색엔진에 올라가지 않게(robots.ts Disallow·metadata noindex 와 세 겹)
  // Cache-Control 은 여기서 걸지 않는다 — 관리자 페이지는 전부 force-dynamic 이라 Next 가 이미 no-store 로 내보내고,
  // next.config 의 Cache-Control 은 운영 빌드에서 페이지 응답에 덮어써지지 않는다.
  //
  // 공개 화면 전체(2026-09-21 공개 전, 오픈 주간)에도 기본 보안 머리글을 건다. 왜 이 값들인가:
  // - X-Content-Type-Options: nosniff — 브라우저가 Content-Type 을 무시하고 내용을 「짐작」해 실행하지 않게.
  //   /api/asset 처럼 파일을 내주는 라우트에서 이미지로 올라온 것이 스크립트로 해석되는 길을 막는다.
  // - Referrer-Policy: strict-origin-when-cross-origin — 바깥 사이트(카카오맵 링크 등)로 나갈 때 경로·쿼리
  //   (?from=<slug> 같은 유입 표지, 포트폴리오 slug)는 떼고 도메인만 넘긴다. 같은 사이트 안에서는 전체 주소를
  //   그대로 넘기므로 문의 유입 표지는 그대로 동작한다. 요즘 브라우저 기본값과 같지만 옛 브라우저까지 못 박는다.
  // - X-Frame-Options: SAMEORIGIN + CSP frame-ancestors 'self' — 다른 사이트가 우리 화면을 iframe 에 깔고
  //   투명 버튼으로 문의 폼·연락처를 누르게 하는 클릭재킹을 막는다. DENY 가 아니라 SAMEORIGIN 인 이유:
  //   데모 미리보기 틀(src/components/demos/DevicePreviewFrame.tsx)이 같은 사이트의 /demo/<slug>?embed=true 를
  //   iframe 으로 띄운다(2026-09-19 기준 넘기는 src 는 전부 같은 출처 「/demo/…」, 다른 출처에서 우리 화면을
  //   띄우는 곳은 찾지 못했다). DENY 로 걸면 데모 미리보기가 전부 빈 화면이 된다.
  //   두 머리글을 같이 쓰는 건 옛 브라우저(XFO)·요즘 브라우저(CSP) 두 겹 — 둘 다 있으면 요즘 브라우저는 CSP 를 따른다.
  //   CSP 는 frame-ancestors 한 줄만 건다: script-src 등까지 걸면 데모들의 인라인 스크립트·외부 글꼴이 깨질 수 있고,
  //   그건 데모 전수 확인 없이 오픈 주간에 넣을 변경이 아니다.
  // - Permissions-Policy: camera=(), microphone=(), geolocation=() — 쓰는 곳이 없다(src 에서 getUserMedia·
  //   navigator.geolocation 검색 0건, 2026-09-19). 꺼 두면 데모 iframe 이나 끼어든 제3자 스크립트가
  //   방문자에게 카메라·마이크·위치 권한 창을 띄울 수 없다. 클립보드(연락처 복사 버튼)는 목록에 없으니 영향 없다.
  //   나중에 위치·카메라가 필요한 화면이 생기면 여기부터 풀 것(값을 「(self)」로).
  // HSTS 는 여기서 걸지 않는다 — Vercel 이 운영 도메인에 붙여 내보내고, 로컬 http 개발 서버에 걸면 오히려 해롭다.
  //
  // 순서가 곧 우선순위다: 같은 주소에 여러 규칙이 맞고 같은 머리글 이름이 겹치면 Next 는 **나중 규칙의 값**을 쓴다.
  // 그래서 전체 규칙(/:path*)을 맨 앞에, 더 엄한 관리자 규칙(DENY·'none'·no-referrer)을 뒤에 둔다.
  // 순서를 뒤집으면 관리자 화면이 SAMEORIGIN 으로 조용히 느슨해진다 — curl -I /admin/login 으로 DENY 가 나오는지 볼 것.
  async headers() {
    const publicHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    const adminHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
    ];
    return [
      // 전체 먼저 — 아래 관리자 규칙이 겹치는 이름(X-Frame-Options·CSP·Referrer-Policy)을 덮어쓴다.
      // nosniff·Permissions-Policy 는 관리자 규칙에 없으니 관리자 화면에도 그대로 남는다.
      { source: "/:path*", headers: publicHeaders },
      { source: "/admin/:path*", headers: adminHeaders },
      { source: "/api/admin/:path*", headers: adminHeaders },
    ];
  },
};

export default nextConfig;
