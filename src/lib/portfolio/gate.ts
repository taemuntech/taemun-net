// 데모 주소 판정 — 「이 주소를 지금 열어 줄 것인가」 한 곳.
// (demos) 루트 레이아웃이 이 판정만 보고 데모 대신 안내 화면을 그린다. 데모별 page 는 건드리지 않는다
// (새 데모가 들어와도 자동으로 걸린다).
//
// 설계 근거 세 가지:
// 1) **slug 는 proxy 가 실어 준 x-demo-slug 헤더만 믿는다.** proxy 는 /demo/* 전체에 걸려 있고 들어온 값을
//    무조건 덮어쓰므로 방문자가 위조할 수 없다. Vercel 의 x-matched-path·x-invoke-path 같은 경로 헤더는
//    셀프 호스팅에서 방문자가 붙일 수 있고, 위조가 「막힌 시안을 열어 주는」 방향으로 작동한다 —
//    그래서 보조 수단으로도 쓰지 않는다(referer 도 같은 이유로 제외. referer 는 직전 페이지라 값 자체도 틀리다).
// 2) **slug 를 모르면 안전한 쪽으로 넘어진다.** 지금 내려간 작업물이 하나라도 있으면(= 개별 private,
//    플래그, 또는 DB 읽기 실패로 제안 시안이 fallback private) 어느 주소인지 가릴 수 없으므로 전부 막는다.
//    내려간 것이 하나도 없을 때만 통과시킨다 — 그때는 막아서 지킬 것이 없다.
// 3) **링크 전용(unlisted)은 보안이 아니다.** 목록에서만 빠지고 주소를 아는 사람은 그대로 연다.
//    「보이면 안 되는 것」은 반드시 private(비공개) 이어야 한다.

import { getPortfolio } from "./registry";
import type { PortfolioKind } from "./schema";
import {
  isReachable,
  readStateForRequest,
  resolveStatus,
  type PortfolioStatus,
  type StateSnapshot,
} from "./state";

/** proxy 가 요청 헤더에 실어 주는 이름 — proxy.ts 와 (demos) 레이아웃이 같이 쓴다 */
export const DEMO_SLUG_HEADER = "x-demo-slug";

/**
 * 내려간 주소를 보낼 안내 화면.
 *
 * ⚠️ (demos) 레이아웃에서 children 대신 안내 화면을 그리는 방법은 **쓰면 안 된다.** 레이아웃이 데모 본문을
 * 안 그려도 Next 는 그 page 의 `metadata`(title·description·og:*)를 따로 해석해 head 와 RSC 페이로드에 싣는다.
 * 실측(curl /demo/<제안시안>): 본문은 안 나갔지만 <title> 과 og:title·description 에 회사 이름과 시안 설명이
 * 그대로 남았다. 레이아웃에서는 그 metadata 를 덮을 방법이 없다(page 가 layout 을 이긴다).
 *
 * ⚠️⚠️ **redirect 로 세그먼트를 떠나도 그 metadata 는 이미 해석된 뒤다.** 예전 주석은 「redirect 하면 데모
 * page 가 아예 해석되지 않는다」고 적었는데 실측은 반대였다: 전부 내리기 ON 에서 `curl -D- /demo/<제안시안>`
 * → 307 인데 본문이 9,691바이트로 따라오고 그 안에 회사 이름·종목코드·og:url 이 그대로 있었다(브라우저는
 * 리다이렉트를 따라가지만 curl·링크 미리보기 봇은 이 본문을 읽는다). 그래서 **판정을 metadata 해석 앞으로**
 * 옮겼다 — 데모 page 는 정적 `metadata` 대신 `demoMetadata()`(lib/portfolio/demo-metadata.ts)로
 * `generateMetadata` 를 내보내고, 막힌 요청에는 회사 이름 없는 중립 제목만 돌려준다.
 * 레이아웃의 redirect 는 **본문**을 막는 두 번째 겹으로 그대로 둔다.
 */
export const DEMO_GONE_PATH = "/gone";

/** /demo/<slug> 의 slug 규칙 — schema.ts 의 SLUG_RE 와 같은 모양 */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** 경로에서 데모 slug 를 뽑는다. proxy 가 쓴다(레이아웃은 헤더만 읽는다) */
export function demoSlugFromPath(pathname: string): string | null {
  const m = /^\/demo\/([^/?#]+)/.exec(pathname);
  const slug = m?.[1];
  return slug && SLUG_RE.test(slug) ? slug : null;
}

export type DemoAccess = {
  /** 판정에 쓴 slug — 헤더가 없었으면 null */
  slug: string | null;
  /** slug 를 알아냈을 때의 상태. 모르면 null */
  status: PortfolioStatus | null;
  /**
   * 이 데모의 종류. slug 를 모르면 null.
   * 고지 한 줄(DemoDisclaimer)이 이 값 하나만 받는다 — 레이아웃이 slug→종류 표를 통째로 내려 주면
   * 공개 샘플 한 장의 HTML 에 「내려간 제안 시안의 slug(=회사 이름)」가 남는다.
   */
  kind: PortfolioKind | null;
  /** true 면 데모 대신 안내 화면을 그린다 */
  blocked: boolean;
  /** 서버 로그·점검용 사유 (화면에 내보내지 않는다 — 회사 이름·시안 내용이 새면 안 된다) */
  reason: string;
};

/** 지금 내려가 있는 작업물이 하나라도 있는가 — slug 를 모를 때의 판정 근거 */
function anythingIsDown(snapshot: StateSnapshot): boolean {
  return getPortfolio().some((item) => !isReachable(resolveStatus(snapshot, item.slug, item.kind)));
}

/**
 * 헤더에서 읽은 slug 로 이 요청을 열어 줄지 정한다.
 * 상태 읽기가 실패해도 예외를 던지지 않는다(readStateUncached 가 ok:false 로 돌려준다) — 사이트는 계속 산다.
 *
 * ⚠️ 여기서는 **캐시된 getState() 를 쓰지 않는다**(목록 화면은 그대로 쓴다). 실측에서 잡힌 이유:
 * getState 의 unstable_cache 는 기한이 지난 값을 **일단 내주고 뒤에서 갱신한다**(stale-while-revalidate).
 * 그래서 서버가 다시 뜨거나 캐시가 기한을 넘긴 직후의 요청은 **내려가기 전의 스냅숏**으로 판정돼,
 * 비공개로 바꾼 시안이 그 창 동안 200 으로 열렸다(3080 에서 재현: 앞 시나리오의 스냅숏이 뒤 시나리오에 그대로 나왔다).
 * 「내려간 것이 되살아나면 안 된다」가 이 기능의 존재 이유라, 주소를 여닫는 판정만은 매번 지금 값을 읽는다.
 * 목록(홈·포트폴리오)은 관리자가 저장할 때 revalidateTag 로 갈아 끼우므로 캐시를 그대로 둔다.
 *
 * 비용: 데모 요청 1건당 상태 읽기 1회. 데모는 영업 링크로만 들어오는 소량 트래픽이고,
 * 읽기가 느리거나 죽어도 state.ts 의 타임아웃이 잘라 준다(그때는 제안 시안만 막히고 사이트는 산다).
 */
export async function decideDemoAccess(headerSlug: string | null | undefined): Promise<DemoAccess> {
  // 요청 단위 메모(readStateForRequest) — 레이아웃과 generateMetadata 가 같은 요청에서 두 번 부르므로
  // 읽기는 한 번이면 된다. 캐시가 아니라 메모라 요청이 끝나면 사라진다(낡은 값이 살아남지 않는다).
  const snapshot = await readStateForRequest();
  const slug = headerSlug && SLUG_RE.test(headerSlug) ? headerSlug : null;

  if (!slug) {
    // proxy 가 안 돌았거나(파일 삭제·설정 변경) 헤더가 유실된 비정상 상태. 조용히 열어 주지 않는다.
    const blocked = anythingIsDown(snapshot);
    if (blocked) {
      console.error(
        `[demo-gate] ${DEMO_SLUG_HEADER} 헤더가 없어 주소를 가릴 수 없습니다 — 내려간 작업물이 있어 데모 전체를 막습니다. src/proxy.ts 가 도는지 확인하세요.`,
      );
    }
    return {
      slug: null,
      status: null,
      kind: null,
      blocked,
      reason: blocked ? "slug-unknown-and-something-down" : "slug-unknown-nothing-down",
    };
  }

  const item = getPortfolio().find((p) => p.slug === slug);
  // 카드 JSON 이 없는 데모 폴더는 종류를 모른다 → 가장 엄한 종류(proposal)로 다룬다.
  // 등록 안 된 채 올라온 실존 업체 시안이 DB 장애 때 살아 있는 일이 없게.
  const kind = item?.kind ?? "proposal";
  const status = resolveStatus(snapshot, slug, kind);

  return {
    slug,
    status,
    kind,
    blocked: !isReachable(status),
    reason: item ? `${kind}:${status}${snapshot.ok ? "" : ":db-fallback"}` : `unregistered:${status}`,
  };
}
