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

/**
 * 색 이름만 넘긴다 — Tailwind 클래스는 Header.tsx 의 지도에 리터럴로 적혀 있다.
 * `onyx` 는 「짙은 스톤 바탕 + 앰버 글자」 조합이다(색 이름 하나로는 안 되는 짝이라 이름을 따로 줬다).
 */
export type DemoLinkTone =
  | "blue"
  | "amber"
  | "stone"
  | "rose"
  | "cyan"
  | "emerald"
  | "teal"
  | "indigo"
  | "sky"
  | "onyx"
  // 앰버 계열이지만 글자만 한 단계 짙다 — 아라 쪽 디자인 그대로다.
  | "gold"
  // 검정 바탕 + 형광 라임 글자 조합(색 이름 하나로는 안 되는 짝이라 이름을 따로 줬다).
  | "noir";

/** 아이콘 이름만 넘긴다 — lucide 컴포넌트 연결은 Header.tsx 의 지도가 한다 */
export type DemoLinkIconKey =
  | "globe"
  | "compass"
  | "landmark"
  | "crown"
  | "cpu"
  | "activity"
  | "dna"
  | "boxes"
  | "satellite"
  | "layers"
  | "trendingUp"
  | "palmtree"
  | "ship"
  | "zap"
  | "sprout"
  | "shoppingBag"
  | "apple"
  | "sparkles";

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
    slug: "nexus-robotics",
    label: "넥서스 로보틱스",
    badge: "NEW",
    description: "반도체 클린룸 자율주행 AMR & 디지털 트윈",
    mobileDescription: "반도체 클린룸 자율주행 AMR & 디지털 트윈",
    tone: "blue",
    iconKey: "cpu",
  },
  {
    slug: "h2-next",
    label: "하이드로젠 넥스트",
    badge: "NEW",
    description: "신재생에너지 & 극저온 액화수소 플랜트",
    mobileDescription: "신재생에너지 & 극저온 액화수소 플랜트",
    tone: "teal",
    iconKey: "activity",
  },
  {
    slug: "celebris-biopharma",
    label: "셀레브리스 바이오파마",
    badge: "NEW",
    description: "표적단백질분해(TPD) & ADC 혁신신약",
    mobileDescription: "표적단백질분해(TPD) & ADC 혁신신약",
    tone: "indigo",
    iconKey: "dna",
  },
  {
    slug: "nano-advanced",
    label: "나노어드밴스드",
    badge: "NEW",
    description: "2.5D/3D 반도체 패키징 & 글래스 기판",
    mobileDescription: "2.5D/3D 반도체 패키징 & 글래스 기판",
    tone: "sky",
    iconKey: "boxes",
  },
  {
    slug: "stella-orbital",
    label: "스텔라 궤도 데이터",
    badge: "NEW",
    description: "초소형 위성 군집 & 지구관측 AI",
    mobileDescription: "초소형 위성 군집 & 지구관측 AI",
    tone: "cyan",
    iconKey: "satellite",
  },
  {
    slug: "apex-partners",
    label: "아펙스 파트너스",
    badge: "NEW",
    // 설명은 사실 서술로 — 아라 쪽 원문은 「대체투자 AUM 4.2조」였다.
    // 가상 운용사의 지어낸 운용자산 규모를 실적처럼 읽히게 적지 않는다.
    description: "사모펀드 & 대체투자 운용사 IR 데모",
    mobileDescription: "사모펀드 & 대체투자 IR 데모",
    tone: "gold",
    iconKey: "trendingUp",
  },
  {
    slug: "atlas-resort",
    label: "아틀라스 리조트",
    badge: "NEW",
    description: "럭셔리 부티크 & 프라이빗 빌라",
    mobileDescription: "럭셔리 부티크 & 프라이빗 빌라",
    tone: "stone",
    iconKey: "palmtree",
  },
  {
    slug: "transocean-scm",
    label: "트랜스오션 SCM",
    badge: "NEW",
    description: "스마트 항만 & AI 복합물류",
    mobileDescription: "스마트 항만 & AI 복합물류",
    tone: "sky",
    iconKey: "ship",
  },
  {
    slug: "voltron-ev",
    label: "볼트론 EV 전장",
    badge: "NEW",
    description: "800V SiC 전력반도체 & 메가와트 충전",
    mobileDescription: "800V SiC 전력반도체 & 메가와트 충전",
    tone: "cyan",
    iconKey: "zap",
  },
  {
    slug: "greencube-agri",
    label: "그린큐브 스마트팜",
    badge: "NEW",
    description: "AI 밀폐형 수직농장 & 바이오 소재",
    mobileDescription: "AI 밀폐형 수직농장 & 바이오 소재",
    tone: "emerald",
    iconKey: "sprout",
  },
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
    slug: "haus-space",
    label: "HAUS & SPACE",
    badge: "펜트하우스",
    description: "하이엔드 펜트하우스 B&A 슬라이더 & 360 VR 데모",
    mobileDescription: "하이엔드 펜트하우스 B&A 슬라이더 & VR 데모",
    tone: "onyx",
    iconKey: "layers",
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
    slug: "atelier-noir",
    label: "아틀리에 누아르",
    mobileLabel: "아틀리에 누아르 (ATELIER NOIR)",
    badge: "쇼핑몰 01",
    // 설명에서 실존 플랫폼 이름을 뺐다 — 아라 쪽 원문은 「(무신사/29CM)」였다.
    // 가상 브랜드 시안이 그 회사들과 관계가 있는 것처럼 읽힌다.
    description: "K-패션 & 디자이너 셀렉트샵 커머스",
    mobileDescription: "K-패션 & 디자이너 셀렉트샵 데모",
    tone: "noir",
    iconKey: "shoppingBag",
  },
  {
    slug: "verde-gourmet",
    label: "베르데 고메",
    mobileLabel: "베르데 고메 (VERDE GOURMET)",
    badge: "쇼핑몰 02",
    description: "프리미엄 신선식품 & 풀콜드체인 새벽배송",
    mobileDescription: "신선식품 & 새벽배송 데모",
    tone: "emerald",
    iconKey: "apple",
  },
  {
    slug: "luminous-lab",
    label: "루미너스 랩",
    mobileLabel: "루미너스 랩 (LUMINOUS LAB)",
    badge: "쇼핑몰 03",
    // 설명에서 실존 유통사 이름을 뺐다 — 아라 쪽 원문은 「(올리브영)」이었다(위 atelier-noir 와 같은 이유).
    description: "K-뷰티 & 클린 더마 코스메틱",
    mobileDescription: "K-뷰티 & 클린 더마 코스메틱 데모",
    tone: "teal",
    iconKey: "sparkles",
  },
  {
    slug: "technova-gear",
    label: "테크노바 기어",
    mobileLabel: "테크노바 기어 (TECHNOVA GEAR)",
    badge: "쇼핑몰 04",
    // 설명에 실존 제조사·가격비교 사이트 이름을 적지 않는다(위 atelier-noir·luminous-lab 과 같은 이유).
    description: "디지털 가전 & 하이테크 하드웨어 커머스",
    mobileDescription: "디지털 가전 & 하이테크 하드웨어 데모",
    tone: "cyan",
    iconKey: "cpu",
  },
  {
    slug: "maison-architect",
    label: "메종 아키텍트",
    mobileLabel: "메종 아키텍트 (MAISON ARCHITECT)",
    badge: "쇼핑몰 05",
    description: "홈퍼니싱 & 감성 인테리어 스튜디오 커머스",
    mobileDescription: "홈퍼니싱 & 감성 인테리어 데모",
    tone: "amber",
    iconKey: "boxes",
  },
  {
    slug: "maison-de-luxe",
    label: "메종 드 럭스",
    mobileLabel: "메종 드 럭스 (MAISON DE LUXE)",
    badge: "쇼핑몰 06",
    description: "하이엔드 럭셔리 & 명품 부티크 살롱 커머스",
    mobileDescription: "하이엔드 럭셔리 & 명품 부티크 데모",
    tone: "amber",
    iconKey: "crown",
  },
  {
    slug: "nordic-peak",
    label: "노르딕 피크",
    mobileLabel: "노르딕 피크 (NORDIC PEAK)",
    badge: "쇼핑몰 07",
    description: "테크니컬 아웃도어 & 익스페디션 기어 커머스",
    mobileDescription: "테크니컬 아웃도어 & 캠핑 기어 데모",
    tone: "teal",
    iconKey: "compass",
  },
  {
    slug: "paws-tail",
    label: "포우즈 앤 테일",
    mobileLabel: "포우즈 앤 테일 (PAWS & TAIL VET)",
    badge: "쇼핑몰 08",
    description: "반려동물 임상영양 & 맞춤 처방식 커머스",
    mobileDescription: "반려동물 임상영양 & 맞춤 처방식 데모",
    tone: "emerald",
    iconKey: "activity",
  },
  {
    slug: "artisan-gift",
    label: "아티장 앤 기프트",
    mobileLabel: "아티장 앤 기프트 (ARTISAN & GIFT)",
    badge: "쇼핑몰 09",
    description: "전통 수공예 & 비스포크 기프팅 셀렉트샵",
    mobileDescription: "전통 수공예 & 비스포크 기프트 데모",
    tone: "amber",
    iconKey: "shoppingBag",
  },
  {
    slug: "cheongdam-arte-dental",
    label: "청담 아르떼 치과",
    mobileLabel: "청담 아르떼 치과 (ARTE DENTAL)",
    badge: "메디컬 01",
    description: "3D 네비게이션 임플란트 & 심미치과",
    mobileDescription: "임플란트 & 심미치과 데모",
    tone: "gold",
    iconKey: "sparkles",
  },
  {
    slug: "the-noble-dermatology",
    label: "더 노블 청담 피부과",
    mobileLabel: "더 노블 청담 피부과 (THE NOBLE)",
    badge: "메디컬 02",
    description: "정품인증 & 1인 프라이빗 안티에이징",
    mobileDescription: "정품인증 & 1인실 안티에이징 데모",
    tone: "emerald",
    iconKey: "sparkles",
  },
  {
    slug: "prime-vision-eye-clinic",
    label: "프라임 스마트 아이 안과",
    mobileLabel: "프라임 스마트 아이 안과 (PRIME VISION)",
    badge: "메디컬 03",
    description: "스마일프로 7초 & 노안백내장 센터",
    mobileDescription: "스마일프로 & 백내장 데모",
    tone: "cyan",
    iconKey: "sparkles",
  },
  {
    slug: "seoul-barun-orthopedics",
    label: "서울 바른마디 정형외과",
    mobileLabel: "서울 바른마디 정형외과 (BARUN MADI)",
    badge: "메디컬 04",
    description: "비수술 척추·관절 & 100평 도수재활센터",
    mobileDescription: "척추관절 & 도수재활 데모",
    tone: "teal",
    iconKey: "sparkles",
  },
  {
    slug: "boncho-hospital",
    label: "본초 통합한방병원",
    mobileLabel: "본초 통합한방병원 (BONCHO)",
    badge: "메디컬 05",
    description: "의·한의 협진 80병상 & 암면역·수술재활센터",
    mobileDescription: "암면역·수술재활 & 1인실 스위트 데모",
    tone: "emerald",
    iconKey: "sparkles",
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
