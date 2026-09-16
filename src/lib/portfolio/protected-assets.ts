// 상태를 따르는 정적 파일(썸네일·업체 원본 이미지)의 주소 규칙 — proxy 와 서빙 라우트가 같이 쓴다.
//
// 왜 필요한가(실측): 게이트가 /demo/* 만 봤다. 그래서 「제안 시안 전부 내리기」를 눌러도
//   /portfolio/wonik-qnc/desktop.png → 200 (417KB, 시안 전체 화면 스크린샷)
//   /portfolio/hysfa/desktop.png     → 200 (711KB)
//   /hysfa/logo.png                  → 200 (실존 업체 로고)
// 가 그대로 열렸다. 주소는 slug(=회사 이름)로 추측되고, 내리기 전에 목록에 떠 있었으니 이미 알려져 있다.
// 내린 자리에 회사 로고와 시안 스크린샷이 남으면 내린 의미가 없다.
//
// 두 겹으로 막는다:
// 1) **파일을 public/ 밖으로 옮긴다** — private-assets/ 는 Next 가 정적으로 서빙하지 않는다.
//    프록시가 안 돌아도(파일 삭제·설정 변경) 파일 자체가 없으므로 404 다(fail-closed).
// 2) proxy 가 옛 주소를 보호 라우트(/api/asset/…)로 rewrite 한다 — 카드 JSON·갤러리 데이터의
//    주소를 한 줄도 고치지 않고 그대로 두기 위해서다(고치면 빠뜨린 한 곳이 구멍이 된다).
//
// 이 파일은 **fs·레지스트리를 쓰지 않는다** — proxy(경량 런타임)에서 import 하기 때문이다.

/** 보호 라우트의 앞자리 */
export const ASSET_ROUTE_PREFIX = "/api/asset";

/** private-assets 아래 첫 칸 — 주소에서 바로 읽어 낸다(임의 경로 접근을 막으려고 두 개만 허용) */
export const ASSET_GROUPS = ["portfolio", "company"] as const;
export type AssetGroup = (typeof ASSET_GROUPS)[number];

/** 파일 이름·slug 규칙 — 경로 올라가기(..)·숨김 파일·희한한 문자를 전부 막는다 */
const SEGMENT_RE = /^[a-z0-9][a-z0-9._-]*$/i;

/**
 * 업체 원본 이미지 폴더(로고·사옥 사진 등) → 그 자산이 딸린 작업물 slug.
 *
 * 새 제안 시안이 업체 원본 이미지를 들고 오면 **여기 한 줄과 proxy 의 matcher 한 줄**을 같이 추가한다.
 * (썸네일 /portfolio/<slug>/… 은 주소에서 slug 가 그대로 나오므로 목록이 필요 없다.)
 */
export const COMPANY_ASSET_OWNERS: Record<string, string> = {
  hysfa: "hysfa",
};

export type AssetTarget = {
  group: AssetGroup;
  /** 이 자산의 공개 여부를 정하는 작업물 slug */
  owner: string;
  /** private-assets 기준 상대 경로 (예: portfolio/hysfa/desktop.png) */
  relPath: string;
  /** public 에 아직 남아 있는 경우의 원래 주소 (예: /portfolio/hysfa/desktop.png) */
  publicPath: string;
};

function safeSegments(parts: string[]): string[] | null {
  if (parts.length === 0) return null;
  for (const p of parts) {
    if (!p || p === "." || p === ".." || !SEGMENT_RE.test(p)) return null;
  }
  return parts;
}

/**
 * 공개 주소(/portfolio/<slug>/<파일> · /<업체폴더>/<파일>)를 보호 대상으로 해석한다.
 * 규칙에 안 맞으면 null — 부르는 쪽은 null 이면 건드리지 않는다.
 */
export function assetTargetFromPublicPath(pathname: string): AssetTarget | null {
  const parts = safeSegments(pathname.split("/").filter(Boolean));
  if (!parts) return null;

  if (parts[0] === "portfolio" && parts.length >= 3) {
    const [, slug, ...rest] = parts;
    return {
      group: "portfolio",
      owner: slug,
      relPath: ["portfolio", slug, ...rest].join("/"),
      publicPath: `/${parts.join("/")}`,
    };
  }

  const owner = COMPANY_ASSET_OWNERS[parts[0]];
  if (owner && parts.length >= 2) {
    return {
      group: "company",
      owner,
      relPath: ["company", ...parts].join("/"),
      publicPath: `/${parts.join("/")}`,
    };
  }
  return null;
}

/** 보호 라우트 주소 — proxy 가 rewrite 할 자리 */
export function assetRoutePath(target: AssetTarget): string {
  return `${ASSET_ROUTE_PREFIX}/${target.relPath}`;
}

/**
 * 보호 라우트가 받은 경로(/api/asset 뒤쪽)를 되풀이 해석한다.
 * 라우트는 이 결과로만 파일을 찾는다 — 주소에서 직접 경로를 만들지 않는다(경로 올라가기 차단).
 */
export function assetTargetFromRoutePath(segments: string[]): AssetTarget | null {
  const parts = safeSegments(segments);
  if (!parts || parts.length < 3) return null;
  const [group, slug, ...rest] = parts;
  if (!(ASSET_GROUPS as readonly string[]).includes(group)) return null;

  if (group === "portfolio") {
    return {
      group: "portfolio",
      owner: slug,
      relPath: parts.join("/"),
      publicPath: `/portfolio/${slug}/${rest.join("/")}`,
    };
  }
  const owner = COMPANY_ASSET_OWNERS[slug];
  if (!owner) return null;
  return {
    group: "company",
    owner,
    relPath: parts.join("/"),
    publicPath: `/${slug}/${rest.join("/")}`,
  };
}
