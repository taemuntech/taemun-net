// 포트폴리오 입고 규격 — 이 파일이 정본이다.
// 포트폴리오 1개 = src/content/portfolio/<slug>.json 1개 (+ 데모 사이트면 src/app/(demos)/demo/<slug>/).
// 브라우저·서버·스크립트(audit:portfolio) 가 모두 이 규칙으로 판정한다. 외부 의존성 없음(스크립트에서 그대로 쓰기 위해).

/**
 * 표시 종류 — 방문자에게 배지로 그대로 보인다. 사실과 다르게 고르면 영업 신뢰가 무너진다.
 * - service: 태문이 직접 운영 중인 서비스 (태문브릿지·T-DOCS)
 * - sample:  업종별 샘플 사이트 (가상 브랜드·가상 데이터로 만든 시안). 고객명·제작 기간을 적지 않는다
 * - proposal: 실존 업체에 제안하려고 만든 시안. 계약·납품한 사례가 아니고 그 회사가 의뢰한 것도 아니다.
 *             고객명·제작 기간·연도를 적지 않고, 카드 설명에 「제안용 시안」이라고 밝힌다. 검색에서 뺀다((demos) 레이아웃이 noindex)
 * - case:    계약하고 납품한 실제 구축 사례. 고객 동의를 받은 경우에만
 */
export const PORTFOLIO_KINDS = ["service", "sample", "proposal", "case"] as const;
export type PortfolioKind = (typeof PORTFOLIO_KINDS)[number];

export const KIND_LABEL: Record<PortfolioKind, string> = {
  service: "운영 중 서비스",
  sample: "업종별 샘플",
  proposal: "제안용 시안",
  case: "구축 사례",
};

/**
 * 제안용 시안(kind=proposal)이 화면에 반드시 달고 다니는 고지.
 * 실존 업체 이름이 걸린 시안이라 「그 회사가 만든 사이트」로 읽히면 곤란하다 — 카드·모달·샘플 바가 모두 이 문장을 쓴다.
 */
export const PROPOSAL_DISCLAIMER =
  "태문 DEV STUDIO 가 제안용으로 만든 시안이며, 해당 회사가 만들었거나 의뢰한 사이트가 아닙니다.";

/** 카드 summary 에 「제안용 시안」 성격이 드러나는지 — audit·레지스트리가 같이 쓴다 */
export const PROPOSAL_SUMMARY_RE = /제안(용)?\s*시안|제안서?\s*시안/;

/** 업종 — 필터 탭·업종 페이지(/industries/<key>)의 키. 순서가 탭 순서다 */
export const INDUSTRIES = [
  { key: "interior", label: "인테리어", search: "인테리어 홈페이지 제작" },
  { key: "construction", label: "건축·시공", search: "건축 시공 회사 홈페이지 제작" },
  { key: "civil", label: "토목", search: "토목 회사 홈페이지 제작" },
  { key: "facility", label: "설비·전기·냉난방", search: "설비 업체 홈페이지 제작" },
  { key: "manufacturing", label: "제조·소재", search: "제조업 홈페이지 제작" },
  { key: "commerce", label: "쇼핑몰·예약", search: "쇼핑몰 예약 사이트 제작" },
  { key: "corporate", label: "기업 홈페이지", search: "기업 홈페이지 제작" },
  { key: "platform", label: "플랫폼·SaaS", search: "플랫폼 개발 외주" },
] as const;
export type IndustryKey = (typeof INDUSTRIES)[number]["key"];
export const INDUSTRY_KEYS = INDUSTRIES.map((i) => i.key) as readonly IndustryKey[];

export function industryLabel(key: IndustryKey): string {
  return INDUSTRIES.find((i) => i.key === key)?.label ?? key;
}

/**
 * 헤더 드롭다운·모바일 드로어 아이콘 키 — 문자열이라 서버→클라이언트로 그대로 넘긴다(아이콘 컴포넌트는 Header 가 고른다).
 * JSON 에 icon 이 없으면 업종 기본값(INDUSTRY_ICON)을 쓴다. 같은 업종 안에서 구분이 필요할 때만 적는다(예: tdocs → file-text).
 */
export const PORTFOLIO_ICON_KEYS = [
  "sparkles",
  "compass",
  "activity",
  "cpu",
  "globe",
  "file-text",
  "layers",
  "building",
  "shopping-bag",
  "briefcase",
  "wrench",
] as const;
export type PortfolioIconKey = (typeof PORTFOLIO_ICON_KEYS)[number];

export const INDUSTRY_ICON: Record<IndustryKey, PortfolioIconKey> = {
  // 인테리어 기본값은 compass — 아라가 4724580 에서 「AI 반짝이」 아이콘을 실무 아이콘으로 바꿨다
  interior: "compass",
  construction: "building",
  civil: "building",
  facility: "wrench",
  manufacturing: "activity",
  commerce: "shopping-bag",
  corporate: "briefcase",
  platform: "layers",
};

export type PortfolioThumbnail = {
  /** public 기준 경로. 기본값은 /portfolio/<slug>/desktop.png (npm run capture:thumbs 가 만든다) */
  desktop: string;
  mobile?: string;
};

export type PortfolioItem = {
  /** 파일 이름과 같아야 한다. 영문 소문자·숫자·하이픈 */
  slug: string;
  kind: PortfolioKind;
  industry: IndustryKey;
  /** 카드 제목 — 샘플이면 가상 브랜드명 (예: "아뜰리에 보클루즈") */
  title: string;
  /** 한 줄 설명 (예: "하이엔드 인테리어 스튜디오 홈페이지") */
  subtitle: string;
  /** 카드 본문 2~3문장 — 있는 기능만 */
  summary: string;
  /** 이 사이트에 실제로 들어 있는 기능 3~6개 */
  features: string[];
  /** 사용 기술 (선택) */
  techStack?: string[];
  /** 샘플·데모는 "/demo/<slug>", 운영 서비스는 https://… */
  liveUrl: string;
  /** 없으면 기본 경로 규칙을 쓴다 */
  thumbnail?: PortfolioThumbnail;
  /** 헤더 메뉴 아이콘 (선택) — 없으면 업종 기본값 */
  icon?: PortfolioIconKey;
  /** 홈 대표작에 올릴지 */
  featured?: boolean;
  /** 작을수록 앞. 없으면 createdAt 최신순 */
  order?: number;
  /** YYYY-MM-DD */
  createdAt: string;
  /** kind=case 에서만 — 동의 받은 고객 표기 */
  client?: string;
  /** kind=case 에서만 — 실제 제작 기간 */
  period?: string;
};

export function defaultThumbnail(slug: string): PortfolioThumbnail {
  return { desktop: `/portfolio/${slug}/desktop.png`, mobile: `/portfolio/${slug}/mobile.png` };
}

export function thumbnailOf(item: PortfolioItem): PortfolioThumbnail {
  return item.thumbnail ?? defaultThumbnail(item.slug);
}

/** 영업 문구에서 쓰지 않는 표현 — 사실 확인 없이 쓰면 문제가 되는 것들 */
export const BANNED_PHRASES: Array<{ pattern: RegExp; why: string }> = [
  { pattern: /에스크로|구매안전/, why: "에스크로(구매안전서비스)는 법적 요건이 있는 서비스 — 제공하지 않으면 쓰지 않는다" },
  { pattern: /100%\s*법적/, why: "법적 효력을 100% 로 단정할 수 없다" },
  { pattern: /타사 대비|업계 최초|국내 유일|업계 1위/, why: "비교·최상급 표현은 근거 자료가 있어야 한다" },
  { pattern: /실시간 모니터링|AI 자동 감지/, why: "샘플에 없는 실시간·AI 기능을 암시한다 — 실제 기능만 적는다" },
];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** 입고 검사 — 문제 목록을 돌려준다(빈 배열이면 통과). fileSlug 는 파일 이름에서 뽑은 slug */
export function validatePortfolioItem(raw: unknown, fileSlug: string): string[] {
  const errors: string[] = [];
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return ["JSON 최상위가 객체가 아닙니다"];
  const it = raw as Record<string, unknown>;
  const str = (k: string) => typeof it[k] === "string" && (it[k] as string).trim().length > 0;

  for (const k of ["slug", "kind", "industry", "title", "subtitle", "summary", "liveUrl", "createdAt"]) {
    if (!str(k)) errors.push(`필수 문자열 칸 「${k}」 가 비어 있습니다`);
  }
  if (str("slug")) {
    if (!SLUG_RE.test(it.slug as string)) errors.push(`slug 「${it.slug}」 는 영문 소문자·숫자·하이픈만 씁니다`);
    if (it.slug !== fileSlug) errors.push(`slug 「${it.slug}」 가 파일 이름 「${fileSlug}.json」 과 다릅니다`);
  }
  if (str("kind") && !PORTFOLIO_KINDS.includes(it.kind as PortfolioKind)) {
    errors.push(`kind 「${it.kind}」 는 ${PORTFOLIO_KINDS.join(" | ")} 중 하나여야 합니다`);
  }
  if (str("industry") && !INDUSTRY_KEYS.includes(it.industry as IndustryKey)) {
    errors.push(`industry 「${it.industry}」 는 ${INDUSTRY_KEYS.join(" | ")} 중 하나여야 합니다`);
  }
  if (!Array.isArray(it.features) || it.features.length < 3 || it.features.length > 6 || !it.features.every((f) => typeof f === "string" && f.trim())) {
    errors.push("features 는 문자열 3~6개 배열이어야 합니다");
  }
  if (it.icon !== undefined && !PORTFOLIO_ICON_KEYS.includes(it.icon as PortfolioIconKey)) {
    errors.push(`icon 「${String(it.icon)}」 는 ${PORTFOLIO_ICON_KEYS.join(" | ")} 중 하나여야 합니다`);
  }
  if (it.techStack !== undefined &&(!Array.isArray(it.techStack) || !it.techStack.every((t) => typeof t === "string"))) {
    errors.push("techStack 은 문자열 배열이어야 합니다");
  }
  if (str("createdAt") && !DATE_RE.test(it.createdAt as string)) errors.push("createdAt 은 YYYY-MM-DD 형식입니다");
  if (str("liveUrl")) {
    const url = it.liveUrl as string;
    const internal = url.startsWith("/demo/");
    const external = /^https:\/\//.test(url);
    if (!internal && !external) errors.push(`liveUrl 「${url}」 는 /demo/<slug> 또는 https:// 주소여야 합니다`);
    if (it.kind === "sample" && !internal) errors.push("sample 은 liveUrl 이 /demo/<slug> 여야 합니다(우리 사이트 안 샘플)");
    if (it.kind === "proposal" && !internal) {
      errors.push("proposal 은 liveUrl 이 /demo/<slug> 여야 합니다 — 실존 업체의 실제 사이트로 링크하지 않습니다");
    }
    if (internal && url !== `/demo/${fileSlug}`) {
      errors.push(`liveUrl 「${url}」 가 /demo/${fileSlug} 와 다릅니다`);
    }
  }
  if (it.kind !== "case") {
    if (it.client !== undefined) errors.push("client(고객명)는 kind=case(계약·동의 받은 실제 사례)에서만 씁니다");
    if (it.period !== undefined) errors.push("period(제작 기간)는 kind=case 에서만 씁니다");
  }
  // 제안용 시안은 카드 한 줄 설명만 읽고 지나가는 사람이 「그 회사가 만든 사이트」로 오해하지 않아야 한다
  if (it.kind === "proposal" && str("summary") && !PROPOSAL_SUMMARY_RE.test(it.summary as string)) {
    errors.push("proposal 은 summary 에 「제안용 시안」이라는 성격이 드러나야 합니다");
  }
  if (it.thumbnail !== undefined) {
    const th = it.thumbnail as Record<string, unknown>;
    if (typeof th !== "object" || th === null || typeof th.desktop !== "string") errors.push("thumbnail.desktop 경로가 필요합니다");
  }
  const text = [it.title, it.subtitle, it.summary, ...(Array.isArray(it.features) ? it.features : [])]
    .filter((v): v is string => typeof v === "string")
    .join("\n");
  for (const b of BANNED_PHRASES) {
    if (b.pattern.test(text)) errors.push(`금지 표현 ${b.pattern} — ${b.why}`);
  }
  return errors;
}

/** 정렬: order 오름차순 → createdAt 최신순 → slug */
export function comparePortfolio(a: PortfolioItem, b: PortfolioItem): number {
  const ao = a.order ?? Number.MAX_SAFE_INTEGER;
  const bo = b.order ?? Number.MAX_SAFE_INTEGER;
  if (ao !== bo) return ao - bo;
  if (a.createdAt !== b.createdAt) return a.createdAt < b.createdAt ? 1 : -1;
  return a.slug.localeCompare(b.slug);
}
