// 문의 화면의 출발점 — 주소(from·industry·entry)와 서버 색인으로 위저드에 넘길 값을 만든다. 서버(page.tsx)에서 부른다.
//
// 왜 서버에서: 예전엔 클라이언트가 useSearchParams 로 주소를 읽어 Suspense 뒤로 미뤘고, 그 때문에 색인 전체(막히지 않은
// 작업물 전부의 제목)가 HTML 에 실렸으며 보이는 화면은 폴백이 한 번 그려진 뒤 바뀌었다. 페이지가 이미 동적이라
// 서버가 주소를 읽고 **필요한 한 건만** 넘긴다.

import { parseInquiryIndustry, parseSampleInquiry, type SearchParamsLike } from "@/components/demo-kit/sample-lead";
import type { WizardReference } from "@/components/inquiry/types";
import type { IndustryKey, PortfolioKind } from "@/lib/portfolio/schema";
import type { InquiryEntry } from "./validate";

/** 포트폴리오 등록 정보 색인(막히지 않은 샘플·운영 서비스·사례) — 서버에만 둔다 */
export type SampleIndex = Record<
  string,
  { title: string; subtitle: string; industry: IndustryKey; kind: PortfolioKind; thumb: string }
>;

export type InquiryContext = {
  reference: WizardReference | null;
  industryLead: IndustryKey | null;
  entry: InquiryEntry;
};

/**
 * 레퍼런스 정보(제목·종류·썸네일)는 주소가 아니라 서버 색인이 정본이다. 색인에 없는 slug(등록 안 됨·막힘)는
 * slug 만 남긴다 — 막힌 작업물의 제목을 화면에 되살리지 않는다.
 */
export function resolveInquiryContext(params: SearchParamsLike, index: SampleIndex): InquiryContext {
  const parsed = parseSampleInquiry(params);
  const known = parsed ? index[parsed.from] : undefined;
  const reference: WizardReference | null = parsed
    ? {
        slug: parsed.from,
        title: known?.title ?? parsed.from,
        subtitle: known?.subtitle,
        // 등록 정보가 정본 — 주소의 industry 는 등록되지 않은 slug 일 때만 쓴다
        industry: known?.industry ?? parsed.industry,
        kind: known?.kind,
        thumb: known?.thumb,
      }
    : null;
  const rawEntry = Array.isArray((params as Record<string, unknown>).entry)
    ? null
    : typeof (params as { get?: unknown }).get === "function"
      ? (params as { get(n: string): string | null }).get("entry")
      : ((params as Record<string, string | undefined>).entry ?? null);
  // 홈 카드 모달에서 온 문의는 서버가 ?entry=home_modal 을 붙여 보낸다(page.tsx 의 옛 ?project= 되돌림)
  const entry: InquiryEntry = rawEntry === "home_modal" ? "home_modal" : parsed ? "demo" : "inquiry_page";
  return { reference, industryLead: parsed ? null : parseInquiryIndustry(params), entry };
}
