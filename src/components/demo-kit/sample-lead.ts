// 샘플 사이트 → 태문 문의 페이지로 넘기는 쿼리 규칙 — 만드는 쪽(sampleInquiryHref)과 읽는 쪽(parseSampleInquiry)이 한 파일에 있다.
// 서버·클라이언트 어디서나 import 가능(브라우저 API·fs 없음).

import { INDUSTRY_KEYS, type IndustryKey } from "@/lib/portfolio/schema";
import type { SampleInquiryParams } from "./types";

/** schema.ts 의 slug 규칙과 같다(영문 소문자·숫자·하이픈). 주소창에서 온 값이라 여기서 다시 본다 */
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX = 80;

/** /inquiry?from=<slug>&industry=<key> — industry 를 모르면(예: 상단 바) 생략한다 */
export function sampleInquiryHref({ from, industry }: SampleInquiryParams): string {
  const query = [`from=${encodeURIComponent(from)}`];
  if (industry) query.push(`industry=${encodeURIComponent(industry)}`);
  return `/inquiry?${query.join("&")}`;
}

/** useSearchParams() 결과든, 서버 page 의 searchParams 객체든 받는다 */
export type SearchParamsLike =
  | { get(name: string): string | null }
  | Record<string, string | string[] | undefined>;

function readParam(sp: SearchParamsLike, name: string): string | null {
  if (typeof (sp as { get?: unknown }).get === "function") {
    return (sp as { get(name: string): string | null }).get(name);
  }
  const v = (sp as Record<string, string | string[] | undefined>)[name];
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

export function isSampleSlug(value: string): boolean {
  return value.length <= SLUG_MAX && SLUG_RE.test(value);
}

export function isIndustryKey(value: string): value is IndustryKey {
  return (INDUSTRY_KEYS as readonly string[]).includes(value);
}

/**
 * 문의 페이지에서 샘플 유입을 읽는다.
 * - from 이 slug 규칙에 안 맞으면 null (임의 문구가 상세 내용 칸에 들어가지 않게)
 * - industry 는 INDUSTRY_KEYS 에 있을 때만 싣는다. 없거나 틀리면 생략(from 만 돌려준다)
 */
export function parseSampleInquiry(searchParams: SearchParamsLike | null | undefined): SampleInquiryParams | null {
  if (!searchParams) return null;
  const from = readParam(searchParams, "from")?.trim() ?? "";
  if (!from || !isSampleSlug(from)) return null;
  const industry = readParam(searchParams, "industry")?.trim() ?? "";
  return isIndustryKey(industry) ? { from, industry } : { from };
}

/**
 * 특정 샘플 없이 업종만 들고 가는 문의 — /inquiry?industry=<key>
 * (홈 갤러리의 구성 예시, 포트폴리오에서 아직 샘플이 없는 업종 안내에서 쓴다)
 */
export function industryInquiryHref(industry: IndustryKey): string {
  return `/inquiry?industry=${encodeURIComponent(industry)}`;
}

/** from 이 없을 때 읽는 업종만의 유입 — INDUSTRY_KEYS 에 있을 때만. from 이 있으면 parseSampleInquiry 를 쓴다 */
export function parseInquiryIndustry(searchParams: SearchParamsLike | null | undefined): IndustryKey | null {
  if (!searchParams) return null;
  const industry = readParam(searchParams, "industry")?.trim() ?? "";
  return isIndustryKey(industry) ? industry : null;
}
