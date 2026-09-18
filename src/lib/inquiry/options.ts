// 견적 요청 선택지 — 한 벌만 둔다(화면·요청서 패널·서버 저장이 같은 말을 쓴다).
//
// 저장은 **라벨 문자열**로 한다(inquiries.services 는 옛 행부터 라벨로 쌓였다). 그래서 라벨을 바꾸면 관리자 화면에서
// 옛 값과 새 값이 따로 보인다 — 바꾼 라벨은 LEGACY_LABELS 에 옛 이름을 남긴다.
//
// 가격 문구 원칙(형 결정 #172 — 공개 가격 보류): 예산 칸은 **고객이 생각하는 예산**을 묻는 것이지 태문의 가격표가
// 아니다. 그래서 「스마트 패키지」「프리미엄 솔루션」처럼 상품처럼 읽히는 이름을 붙이지 않는다.

export type ServiceOption = { id: string; label: string; desc: string };

export const SERVICE_OPTIONS: readonly ServiceOption[] = [
  { id: "company-homepage", label: "기업/회사 홍보 홈페이지", desc: "브랜드 대표 반응형 사이트 & 랜딩페이지" },
  { id: "shopping-mall", label: "쇼핑몰 · 예약 · 커머스", desc: "제품 판매, 예약 시스템, PG 결제 연동" },
  { id: "custom-web-app", label: "맞춤형 웹 · 앱 개발", desc: "회원/관리자 시스템, 대형 플랫폼, 특수 웹앱" },
  { id: "tdocs-saas", label: "모바일 전자서식 (T-DOCS)", desc: "카카오톡 모바일 전자서명 & 전자서식" },
  { id: "pg-billing", label: "PG 결제 & 정기구독 빌링", desc: "포트원·토스페이먼츠 정기자동결제 모듈" },
  { id: "renewal-maintenance", label: "웹사이트 리뉴얼 & 고도화", desc: "디자인 리뉴얼 및 기능 고도화 유지보수" },
  { id: "undecided", label: "아직 모르겠어요 — 상담에서 정할게요", desc: "들어 보고 맞는 방법을 추천해 드립니다" },
];

export const TIMELINE_OPTIONS: readonly string[] = [
  "2주 이내",
  "1개월 이내",
  "2개월 이내",
  "아직 정하지 않았어요 · 협의할게요",
];

/** 「상담 후 결정」을 맨 앞에 둔다 — 예산을 정하지 못한 사람이 먼저 보고 떠나지 않게 */
export const BUDGET_OPTIONS: readonly string[] = [
  "상담 후 결정",
  "300만 원 미만",
  "300만 원 ~ 500만 원",
  "500만 원 ~ 1,000만 원",
  "1,000만 원 이상",
];

/** 바뀐 라벨의 옛 이름 → 새 이름 (관리자 화면이 같은 값으로 묶는다) */
export const LEGACY_LABELS: Record<string, string> = {
  "아직 미정": "아직 모르겠어요 — 상담에서 정할게요",
  "일정 협의 가능": "아직 정하지 않았어요 · 협의할게요",
  "미정 (상담 시 안내 받기)": "상담 후 결정",
  "300만 원 미만 (기본 런칭)": "300만 원 미만",
  "300만 원 ~ 500만 원 (스마트 패키지)": "300만 원 ~ 500만 원",
  "500만 원 ~ 1,000만 원 (프리미엄 솔루션)": "500만 원 ~ 1,000만 원",
  "1,000만 원 이상 (대형 플랫폼)": "1,000만 원 이상",
};

export function serviceLabelOf(id: string): string {
  return SERVICE_OPTIONS.find((s) => s.id === id)?.label ?? id;
}
