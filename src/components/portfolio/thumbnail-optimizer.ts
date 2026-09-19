// 썸네일을 Next 이미지 최적화기(/_next/image)에 태워도 되는지 — 홈 카드·홈 모달·/portfolio 카드가 같이 쓴다.
//
// 왜 갈라야 하는가(2026-09-19 오픈 점검, node_modules/next/dist/server/image-optimizer.js 를 읽어 확인):
//   최적화기는 원본 응답의 Cache-Control 과 상관없이 **max(minimumCacheTTL, 원본 max-age)** 동안 결과를 굳힌다.
//   minimumCacheTTL 기본값은 14400초(4시간)이고, 원본이 「private, no-store」여도 원본 max-age 가 0 으로 읽힐 뿐
//   4시간은 그대로 남는다. /_next/image 응답 자체도 public 캐시로 나간다(Vercel 이미지 캐시도 같은 규칙).
//   그래서 실존 업체 제안 시안(proposal)의 썸네일을 최적화기에 태우면, 관리자가 「내리기」를 눌러
//   /api/asset 이 404 를 내기 시작해도 **이미 만들어진 /_next/image?url=… 주소는 최대 4시간 계속 200** 이다.
//   급히 내려야 할 수 있는 것(api/asset 라우트가 브라우저에도 안 굳히는 그 종류)은 최적화기를 건너뛴다(unoptimized) —
//   그러면 브라우저가 원래 주소를 그대로 받고, 그 주소는 proxy → /api/asset 이 매번 상태를 본다.
//
// 가르는 기준은 **종류(kind)** 다. 주소 모양(/portfolio/<slug>/…·업체 폴더)으로 가르지 않는 이유:
//   주소 규칙(lib/portfolio/protected-assets.ts)을 클라이언트에서 import 하면 업체 폴더 이름 표가
//   클라이언트 청크에 박힌다(HomeView.tsx 머리말의 「회사 이름이 청크로 샌다」와 같은 누수).
//   종류는 서버가 이미 카드·레퍼런스에 실어 보내는 값이라 새로 새는 것이 없다.
//
// - sample(가상 브랜드 샘플): 최적화한다. 내려도 최적화 결과가 최대 4시간 남을 수 있다 — 가상 브랜드라 감수한다
//   (api/asset 도 샘플만 브라우저에 10분 굳힌다. 같은 판단).
// - service(태문이 운영하는 서비스): 최적화한다. 자사 서비스 화면이고 public/ 정적 파일이다.
// - proposal(실존 업체 제안 시안) · **모르는 것(undefined)**: 건너뛴다. 모르면 가장 엄한 쪽으로 넘어진다
//   (api/asset 라우트가 카드 없는 자산을 proposal 로 다루는 것과 같은 규칙).
//
// ⚠️ 이 파일은 'use client' 컴포넌트가 import 한다 — 값(slug·회사 이름·주소 표)을 한 글자도 두지 않는다.

import type { PortfolioKind } from "@/lib/portfolio/schema";

/** true 면 next/image 에 unoptimized 를 준다(최적화기를 거치지 않고 원래 주소를 그대로 받는다) */
export function bypassImageOptimizer(kind: PortfolioKind | null | undefined): boolean {
  return kind !== "sample" && kind !== "service";
}
