// 포트폴리오 목록 — 서버(빌드 시점) 전용. src/content/portfolio/*.json 을 읽어 검사·정렬해서 돌려준다.
// 클라이언트 컴포넌트에서 import 하지 말 것(fs). 서버 page 에서 읽어 직렬화 가능한 값만 props 로 넘긴다.
//
// 규격을 어긴 파일이 있으면 빌드를 멈춘다 — 조용히 빠지면 「올렸는데 안 보인다」가 되기 때문.

import fs from "node:fs";
import path from "node:path";
import {
  INDUSTRIES,
  comparePortfolio,
  thumbnailOf,
  validatePortfolioItem,
  type IndustryKey,
  type PortfolioItem,
  type PortfolioKind,
  type PortfolioThumbnail,
} from "./schema";

export const PORTFOLIO_DIR = path.join(process.cwd(), "src", "content", "portfolio");

/** 화면에 넘기는 모양 — 썸네일 기본 경로를 채운 상태 */
export type PortfolioCard = Omit<PortfolioItem, "thumbnail"> & { thumbnail: PortfolioThumbnail };

let cache: PortfolioCard[] | null = null;

export function getPortfolio(): PortfolioCard[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = fs.existsSync(PORTFOLIO_DIR)
    ? fs.readdirSync(PORTFOLIO_DIR).filter((f) => f.endsWith(".json")).sort()
    : [];
  const problems: string[] = [];
  const items: PortfolioCard[] = [];
  for (const file of files) {
    const slug = file.replace(/\.json$/, "");
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(path.join(PORTFOLIO_DIR, file), "utf8"));
    } catch (e) {
      problems.push(`${file}: JSON 문법 오류 — ${(e as Error).message}`);
      continue;
    }
    const errors = validatePortfolioItem(raw, slug);
    if (errors.length) {
      problems.push(...errors.map((m) => `${file}: ${m}`));
      continue;
    }
    const item = raw as PortfolioItem;
    items.push({ ...item, thumbnail: thumbnailOf(item) });
  }
  if (problems.length) {
    throw new Error(`포트폴리오 입고 규격 위반 ${problems.length}건 (npm run audit:portfolio 로 자세히)\n- ${problems.join("\n- ")}`);
  }
  cache = items.sort(comparePortfolio);
  return cache;
}

export function getPortfolioBySlug(slug: string): PortfolioCard | null {
  return getPortfolio().find((p) => p.slug === slug) ?? null;
}

export function getFeaturedPortfolio(limit = 6): PortfolioCard[] {
  return getPortfolio().filter((p) => p.featured).slice(0, limit);
}

export type PortfolioStats = {
  total: number;
  byKind: Record<PortfolioKind, number>;
  /** 항목이 1개 이상인 업종만, INDUSTRIES 순서 */
  industries: Array<{ key: IndustryKey; label: string; count: number }>;
};

export function getPortfolioStats(items: PortfolioCard[] = getPortfolio()): PortfolioStats {
  const byKind: Record<PortfolioKind, number> = { service: 0, sample: 0, proposal: 0, case: 0 };
  for (const it of items) byKind[it.kind] += 1;
  const industries = INDUSTRIES.map((i) => ({ key: i.key, label: i.label, count: items.filter((it) => it.industry === i.key).length })).filter(
    (i) => i.count > 0,
  );
  return { total: items.length, byKind, industries };
}
