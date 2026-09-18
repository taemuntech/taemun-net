import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { sampleInquiryHref } from "@/components/demo-kit/sample-lead";
import { GALLERY_PROJECTS } from "@/lib/portfolio/galleryData";
import { gallerySlugOf } from "@/lib/portfolio/gallery-ref";
import { getPortfolio } from "@/lib/portfolio/registry";
import { getState, isReachable, resolveStatus, type StateSnapshot } from "@/lib/portfolio/state";
import { thumbnailOf } from "@/lib/portfolio/schema";
import { SITE_OG_IMAGES } from "@/lib/site-og";
import { resolveInquiryContext, type SampleIndex } from "@/lib/inquiry/context";
import InquiryView from "./InquiryView";

// 프로젝트 견적 문의 — 서버 래퍼. 화면은 InquiryView(클라이언트).
// 샘플 유입(?from=&industry=&entry=)은 여기 서버에서 읽어 레퍼런스 **한 건만** 넘긴다(src/lib/inquiry/context.ts).
// 2026-09-19 전에는 클라이언트가 useSearchParams 로 읽어 Suspense 폴백이 먼저 그려지고, 색인 전체(작업물 제목 전부)가
// HTML 에 실렸다.

const DESCRIPTION =
  "홈페이지·쇼핑몰·예약 사이트·맞춤형 웹 개발 견적 문의. 필요한 서비스와 예산·일정을 4단계로 골라 보내 주시면 태문넷이 연락드립니다.";

// openGraph 를 페이지에서 따로 선언한다 — 없으면 레이아웃(홈)의 og:url·og:title 을 물려받아 공유 미리보기가 홈으로 샌다.
export const metadata: Metadata = {
  title: "프로젝트 견적 문의",
  description: DESCRIPTION,
  alternates: { canonical: "/inquiry" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문넷",
    title: "프로젝트 견적 문의 | 태문넷",
    description: DESCRIPTION,
    url: "/inquiry",
    images: SITE_OG_IMAGES,
  },
};

// 이 표는 서버에만 있다(화면에는 찾은 한 건만 간다). 그래도 내려간 시안의 제목(= 실존 업체 이름)이 화면에 되살아나지
// 않게 상태를 본다.
// 빼는 기준은 「목록 노출(isListed)」이 아니라 「주소가 열리는가(isReachable)」다: 링크 전용(unlisted)
// 제안 시안은 영업 링크로 들어온 사람이 ?from= 을 달고 오므로 표에 있어야 유입 문구가 뜬다.
// 비공개(private)·전부 내리기·DB 읽기 실패로 막힌 것만 뺀다.
function buildSampleIndex(snapshot: StateSnapshot): SampleIndex {
  const index: SampleIndex = {};
  // 갤러리 카드는 운영 서비스(https 링크)에서도 ?from= 을 넘기므로 막히지 않은 것은 전부 싣는다
  for (const item of getPortfolio()) {
    if (!isReachable(resolveStatus(snapshot, item.slug, item.kind))) continue;
    // thumb 는 등록 정보 규칙(thumbnailOf) 한 곳에서 — 홈 카드와 같은 그림을 위저드 머리에 고정한다
    index[item.slug] = {
      title: item.title,
      subtitle: item.subtitle,
      industry: item.industry,
      kind: item.kind,
      thumb: thumbnailOf(item).desktop,
    };
  }
  return index;
}

/**
 * 옛 주소 `?project=<갤러리 카드 제목>` → `?from=<slug>`.
 *
 * 홈 카드 모달의 「이 레퍼런스로 제작 문의」가 카드 **제목**을 project 로 붙여 보냈는데, 이 화면은 from(slug)만 읽는다.
 * 그래서 홈에서 들어온 문의는 어느 레퍼런스를 보고 왔는지가 통째로 빠졌다 — 서비스 미리 고르기·안내 칩·형 문자의
 * 「유입」 줄 전부(2026-09-18 확인). 홈 버튼은 모달 개편(구현계획서 P4) 때 바뀌므로, 들어오는 쪽에서 먼저 잇는다.
 * 카드 id 는 slug 와 다를 수 있어(09-18 실측: 이어지는 카드 58장 중 22장) 제목 → 카드 → 카드가 가리키는 주소로
 * slug 를 찾는다(gallery-ref.ts). 같은 날 58장 전부 올바른 slug 로 되돌려지는 것을 로컬에서 확인했다.
 *
 * 되돌리지 않는 경우: 이미 from 이 있다 · 제목에 맞는 카드가 없다 · 막힌(내려간) 작업물이다(표에 없다).
 * 마지막 경우에 주소를 바꾸면 내려간 시안의 slug 가 주소창에 드러나므로 그대로 둔다.
 */
function legacyProjectHref(
  params: Record<string, string | string[] | undefined>,
  sampleIndex: SampleIndex,
): string | null {
  const title = typeof params.project === "string" ? params.project : null;
  if (!title || params.from !== undefined) return null;
  const card = GALLERY_PROJECTS.find((p) => p.title === title);
  if (!card) return null;
  const slug = gallerySlugOf(card, getPortfolio());
  if (!slug || !sampleIndex[slug]) return null;
  // entry=home_modal — 이 옛 주소는 홈 카드 모달 버튼만 만든다. 위저드가 유입 경로로 기록한다
  return `${sampleInquiryHref({ from: slug })}&entry=home_modal`;
}

// 상태를 접속 때마다 다시 본다 — 홈·포트폴리오와 같은 이유(빌드 스냅숏이 굳으면 내려도 이름이 남는다)
export const dynamic = "force-dynamic";

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const sampleIndex = buildSampleIndex(await getState());
  const legacy = legacyProjectHref(params, sampleIndex);
  if (legacy) redirect(legacy);
  const { reference, industryLead, entry } = resolveInquiryContext(params, sampleIndex);
  return <InquiryView reference={reference} entry={entry} industryLead={industryLead} />;
}
