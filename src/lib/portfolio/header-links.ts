// 헤더 드롭다운·모바일 메뉴에 싣는 **내부 데모 목록** — 서버 전용.
//
// 왜 파일을 따로 뺐나: Header.tsx 는 'use client' 다. 거기에 회사 이름·설명·배지·/demo/<slug> 를 적어 두면
// 관리자 화면에서 「비공개」로 내려도 그 문자열이 홈·포트폴리오가 내려받는 클라이언트 청크
// (/_next/static/chunks/*.js, Cache-Control: immutable 1년)에 그대로 박혀 누구에게나 200 으로 나간다.
// 실측(고치기 전, next start): 홈 HTML 에는 0건인데 청크 1개에 회사 이름·slug 가 12건 있었다.
// slug 자체가 회사 이름이나 마찬가지다(wonik-qnc). 그래서 **서버가 공개 상태로 걸러 낸 배열만**
// props 로 내려보낸다 — HomeView 가 galleryData 를 끊은 것과 같은 결이다(src/app/(site)/page.tsx 주석 참고).
//
// ⚠️ 클라이언트 컴포넌트에서 이 파일의 **값**을 import 하지 말 것. 타입(`import type`)만 가져간다.
//    (registry.ts 를 통해 node:fs 가 딸려 오므로, 실수로 값을 가져가면 빌드가 시끄럽게 깨진다.)
//
// ⚠️ 문구 규칙: 실존 업체에 대한 **최상급·단정 표현을 쓰지 않는다**(허락 없이 만든 제안용 시안이다).
//    사실 서술만 적는다 — schema.ts 의 BANNED_PHRASES 와 같은 취지.
//    (이 파일은 audit:portfolio 의 「사이트 문구」 검사 대상에 등록돼 있다 — scripts/audit-portfolio.mjs)

import { getPortfolio } from "./registry";
import { isListed, resolveStatus, type StateSnapshot } from "./state";

/** 색 이름만 넘긴다 — Tailwind 클래스는 Header.tsx 의 지도에 리터럴로 적혀 있다 */
export type DemoLinkTone = "blue" | "amber" | "stone" | "rose" | "cyan" | "emerald";

/** 아이콘 이름만 넘긴다 — lucide 컴포넌트 연결은 Header.tsx 의 지도가 한다 */
export type DemoLinkIconKey = "globe" | "compass" | "landmark" | "crown" | "cpu" | "activity";

export type HeaderDemoLink = {
  /** /demo/<slug> — 공개 상태 판정 열쇠이기도 하다 */
  slug: string;
  /** 데스크톱 드롭다운에 쓰는 이름 */
  label: string;
  /** 모바일 메뉴에서만 다른 이름을 쓸 때 (없으면 label) */
  mobileLabel?: string;
  badge: string;
  /** 데스크톱 드롭다운 한 줄 설명 */
  description: string;
  /** 모바일 메뉴 한 줄 설명 */
  mobileDescription: string;
  tone: DemoLinkTone;
  iconKey: DemoLinkIconKey;
};

/**
 * 순서는 지금 드롭다운에 보이던 순서 그대로다.
 * 여기 있다고 화면에 뜨는 것이 아니다 — 아래 listedDemoLinks() 가 공개 상태로 한 번 더 거른다.
 */
export const HEADER_DEMO_LINKS: readonly HeaderDemoLink[] = [
  {
    slug: "wonik-qnc",
    label: "원익큐앤씨 (WONIK QnC)",
    // 배지는 사실 서술로 — 예전엔 「GLOBAL 1위」였다. 허락 없이 만든 시안에 그 회사의 최상급 주장을 적지 않는다.
    badge: "코스닥 상장",
    description: "반도체 쿼츠웨어 & 정밀 세라믹 코스닥 상장사",
    mobileDescription: "반도체 쿼츠웨어 & KOSDAQ IR 데모",
    tone: "blue",
    iconKey: "globe",
  },
  {
    slug: "atelier-vaucluse",
    label: "아뜰리에 보클루즈",
    badge: "DEMO",
    description: "하이엔드 건축·인테리어 스튜디오 실물 사이트",
    mobileDescription: "건축·인테리어 스튜디오 실물 데모",
    tone: "amber",
    iconKey: "compass",
  },
  {
    slug: "sodamjae",
    label: "소담재 건축공방",
    // 배지는 사실 서술로 — 예전엔 「한옥 명가」였다(위 wonik-qnc 와 같은 이유).
    badge: "한옥 전문",
    description: "전통 결구 & 현대식 패시브 주거 한옥",
    mobileDescription: "전통 결구 & 패시브 주거 한옥 데모",
    tone: "stone",
    iconKey: "landmark",
  },
  {
    slug: "maison",
    label: "메종 당티크 (Maison)",
    badge: "D2C 살롱",
    description: "유러피안 오리지널 앤틱 & 프라이빗 살롱",
    mobileDescription: "유러피안 앤틱 가구 & 프라이빗 살롱 데모",
    tone: "rose",
    iconKey: "crown",
  },
  {
    slug: "hysfa",
    label: "한양시스템 (SEMES SSQ)",
    badge: "SEMES 협력사",
    description: "반도체 FA 장비 & 초고순도 가스 시스템",
    mobileDescription: "반도체 FA 장비 & 가스 시스템 데모",
    tone: "cyan",
    iconKey: "cpu",
  },
  {
    slug: "lithium-foil",
    label: "공정 데이터 모니터링",
    mobileLabel: "공정 데이터 데모",
    badge: "LIVE",
    description: "리튬박 제조 KPI·수율·관리도 플랫폼",
    mobileDescription: "리튬박 제조 KPI·수율 대시보드",
    tone: "emerald",
    iconKey: "activity",
  },
];

/**
 * 지금 헤더에 실어도 되는 항목만 골라 낸다.
 *
 * 판정은 목록 화면(src/app/(site)/page.tsx · /portfolio)과 **같은 함수**를 쓴다 — 규칙을 두 벌로 만들지 않는다.
 * 기준은 isListed(= 「공개」만). 제안용 시안은 기본이 「링크 전용」이라 여기서 빠지는 것이 맞다:
 * 공개 내비게이션은 「목록」이고, 허락 없이 만든 시안이 거기 뜰 이유가 없다.
 * 관리자 화면에서 「공개」로 바꾸면 그때 나타난다.
 *
 * 카드 JSON 이 없는 slug 는 목록에 없으므로 **싣지 않는 쪽**으로 넘어진다(안전한 기본값).
 *
 * @param snapshot 호출한 쪽이 이미 읽어 둔 상태 — 한 요청에서 상태를 두 번 읽지 않게 인자로 받는다.
 */
export function listedDemoLinks(snapshot: StateSnapshot): HeaderDemoLink[] {
  const listedSlugs = new Set(
    getPortfolio()
      .filter((item) => isListed(resolveStatus(snapshot, item.slug, item.kind)))
      .map((item) => item.slug),
  );
  return HEADER_DEMO_LINKS.filter((link) => listedSlugs.has(link.slug));
}
