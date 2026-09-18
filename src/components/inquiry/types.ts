import type { IndustryKey, PortfolioKind } from "@/lib/portfolio/schema";
import type { ContactPref, ReferenceUsage } from "@/lib/inquiry/validate";

/** 문의에 첨부된 레퍼런스 — 서버가 등록 정보(src/content/portfolio)에서 찾아 넘긴다. 막힌 작업물은 넘어오지 않는다 */
export type WizardReference = {
  slug: string;
  title: string;
  subtitle?: string;
  kind?: PortfolioKind;
  industry?: IndustryKey;
  /** 썸네일 경로(등록 정보 thumbnailOf) — 없거나 깨지면 칸만 남긴다 */
  thumb?: string;
};

/** 견적요청서 패널이 그리는 값 — 연락처는 칸에서 손을 뗄 때 반영된 값(한 글자마다 바뀌지 않게) */
export type QuoteRequestData = {
  reference: WizardReference | null;
  referenceUsage: ReferenceUsage | null;
  /** 서비스 라벨 */
  services: string[];
  timeline: string | null;
  budget: string | null;
  budgetFlexible: boolean;
  /** 「연락처만 남기기」로 건너뛴 칸은 「상담에서 정함」으로 보인다 */
  quick: boolean;
  contact: {
    name: string;
    phone: string;
    email: string;
    referenceUrl: string;
    details: string;
    pref: ContactPref | null;
  };
  requestNo?: string | null;
  submittedAt?: Date | null;
};
