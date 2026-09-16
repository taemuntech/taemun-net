// 포트폴리오 카드 → /portfolio 갤러리 화면용 변환 — 서버(빌드 시점) 전용(fs).
// 홈 화면은 아라가 만든 galleryData.ts 를 그대로 쓴다(형 지시: 있는 그대로 올린다). 관리자 페이지가 들어오면 그때 홈도 카드 데이터로 옮긴다.
// 클라이언트 컴포넌트에서 import 하지 말 것. 결과는 직렬화 가능한 값만 담는다(아이콘·함수 없음).

import fs from "node:fs";
import path from "node:path";
import type { GalleryItem } from "@/components/portfolio/PortfolioCardView";
import type { PortfolioCard } from "./registry";
import { assetTargetFromPublicPath } from "./protected-assets";
import { industryLabel } from "./schema";

const PUBLIC_DIR = path.join(process.cwd(), "public");
/** 상태를 따라야 하는 자산은 public/ 밖에 둔다 — 주소는 그대로고 proxy 가 보호 라우트로 넘긴다 */
const PRIVATE_DIR = path.join(process.cwd(), "private-assets");

function existsUnder(root: string, relPath: string): boolean {
  const abs = path.resolve(root, `.${relPath.startsWith("/") ? relPath : `/${relPath}`}`);
  if (!abs.startsWith(root + path.sep)) return false;
  return fs.existsSync(abs);
}

/**
 * 그 주소의 파일이 실제로 있을 때만 주소를 돌려준다(없는 썸네일은 자리표시로).
 * public/ 과 private-assets/ 두 곳을 본다 — 제안 시안 썸네일은 public 밖으로 옮겼지만
 * **화면에 쓰는 주소는 그대로**이기 때문이다(proxy 가 /api/asset/… 으로 넘긴다).
 */
export function existingPublicFile(src: string | undefined): string | null {
  if (!src || !src.startsWith("/")) return null;
  if (existsUnder(PUBLIC_DIR, src)) return src;
  const target = assetTargetFromPublicPath(src);
  if (target && existsUnder(PRIVATE_DIR, target.relPath)) return src;
  return null;
}

export function toGalleryItem(p: PortfolioCard): GalleryItem {
  return {
    slug: p.slug,
    kind: p.kind,
    industry: p.industry,
    industryLabel: industryLabel(p.industry),
    title: p.title,
    subtitle: p.subtitle,
    features: p.features,
    liveUrl: p.liveUrl,
    thumbnailSrc: existingPublicFile(p.thumbnail.desktop),
  };
}

/** 헤더 드롭다운에 넘기는 짧은 목록 — 레지스트리의 featured 를 그대로 쓴다(하드코딩하지 않는다) */
