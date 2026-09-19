// 견적 문의 접수(api/inquiry) 입력 검증 — 서버가 부른다.
//
// 왜 따로 두는가: 전에는 라우트가 「서비스 1개 이상·성함·연락처가 있나」만 봤다. 길이 상한이 없어서
// 수만 자짜리 상세 내용이 그대로 저장되고 형 문자로도 나갔고(LMS 한도를 넘으면 알림이 통째로 안 간다),
// services 에 객체를 넣어도 통과했다. 여기서 모양·길이·형식을 한 번에 본다.
//
// ⚠️ 외부 import 를 두지 않는다 — 순수 함수라 node 로 바로 시험할 수 있다.
//
// 봇 신호(bot=true)는 오류가 아니라 **조용한 성공**으로 돌려준다(라우트가 저장·문자 없이 200). 오류를 주면
// 스크립트가 무엇에 걸렸는지 배워 고친다.
//   - 숨은 칸(website)을 채웠다 — 사람에게는 보이지 않는 칸이다
//   - 위저드를 연 뒤 MIN_FILL_MS 안에 제출했다 — 질문 4단계를 사람이 그 안에 끝낼 수 없다
//   elapsedMs 가 아예 없으면 통과시킨다: 배포 직전에 열어 둔 탭(옛 화면)은 이 값을 보내지 않는다.

export const INQUIRY_LIMITS = {
  name: 50,
  email: 100,
  referenceUrl: 300,
  details: 3000,
  serviceLabel: 60,
  services: 10,
  choice: 60,
} as const;

/** 위저드를 연 뒤 이보다 빨리 제출하면 봇으로 본다 */
export const MIN_FILL_MS = 3000;

export type InquiryInput = {
  services: string[];
  budget: string;
  timeline: string;
  clientName: string;
  /** 하이픈을 넣어 정리한 번호 — 같은 번호 중복 접수를 이 값으로 센다 */
  phone: string;
  email: string | null;
  referenceUrl: string | null;
  details: string | null;
  /** 아래는 흐름 정보 — 화면이 보내는 값이 목록에 없으면 null 로 두고 접수는 받는다(문의를 잃지 않게) */
  entry: InquiryEntry | null;
  path: InquiryPath;
  budgetFlexible: boolean | null;
  contactPref: ContactPref | null;
  referenceUsage: ReferenceUsage | null;
  variant: InquiryVariant | null;
};

export const INQUIRY_ENTRIES = ["home_modal", "inquiry_page", "demo"] as const;
export type InquiryEntry = (typeof INQUIRY_ENTRIES)[number];
/** full = 4단계 끝까지 · quick = 「나머지는 통화로 정할게요 — 연락처만 남기기」 */
export const INQUIRY_PATHS = ["full", "quick"] as const;
export type InquiryPath = (typeof INQUIRY_PATHS)[number];
export const CONTACT_PREFS = ["call", "text_first"] as const;
export type ContactPref = (typeof CONTACT_PREFS)[number];
/** 「이 레퍼런스를 어떻게 쓰실 건가요」 — 디자인 거의 그대로 · 분위기·구성만 참고 · 기능만 가져오기 */
export const REFERENCE_USAGES = ["as_is", "mood", "feature"] as const;
export type ReferenceUsage = (typeof REFERENCE_USAGES)[number];
export const INQUIRY_VARIANTS = ["doc", "plain"] as const;
export type InquiryVariant = (typeof INQUIRY_VARIANTS)[number];

/** 답하지 않고 「연락처만 남기기」로 온 칸에 적는 값 — 요청서·관리자 화면·문자에 같은 말로 보인다 */
export const DECIDE_IN_CONSULT = "상담에서 정함";

function oneOf<T extends string>(list: readonly T[], value: unknown): T | null {
  return typeof value === "string" && (list as readonly string[]).includes(value) ? (value as T) : null;
}

/**
 * 평평한 결과 — 셋 중 하나다.
 * - input 있음: 저장해도 된다
 * - error 있음: 방문자에게 그대로 보여 줄 문장(400)
 * - bot: 조용히 성공으로 돌려보낸다
 */
export type InquiryValidation = {
  input: InquiryInput | null;
  error: string | null;
  bot: boolean;
};

const fail = (error: string): InquiryValidation => ({ input: null, error, bot: false });

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * 제어 문자(탭·줄바꿈 말고)와 짝 없는 서로게이트 — 사람이 입력 칸에 칠 수 없는 글자다.
 * 왜 막나(2026-09-20 오픈 점검 후속): U+0000 은 Postgres TEXT 가 거절하고(22P05) 짝 없는 서로게이트도 인코딩에서 깨진다.
 * 전에는 이것이 「저장 실패」로 떨어져 형에게 **보낸 사람이 쓴 글이 담긴** LMS 가 나갔고, 저장이 안 되니 번호·시간 한도에도
 * 안 잡혀 요청마다 한 통씩 무한히 보낼 수 있었다. 저장 전에 400 으로 돌려보내면 그 길이 처음부터 없다.
 * \t·\n·\r 은 상세 내용 칸의 여러 줄 입력이라 허용한다(한 줄 칸은 trim 과 길이 검사로 충분하다).
 */
const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const LONE_SURROGATE_RE = /\p{Cs}/u;
const BAD_CHAR_ERROR = "입력값에 사용할 수 없는 문자가 있습니다. 내용을 다시 입력해 주세요.";

function hasBadChars(value: string): boolean {
  return CONTROL_RE.test(value) || LONE_SURROGATE_RE.test(value);
}

/**
 * 국내 전화번호를 하이픈 넣은 모양으로 정리한다. 번호가 아니면 null.
 * 010-1234-5678 · 02-123-4567 · 031-123-4567 · 0505-123-4567 처럼 0 으로 시작하는 9~12자리.
 */
export function normalizePhone(raw: string): string | null {
  const d = raw.replace(/[^0-9]/g, "");
  if (!/^0\d{8,11}$/.test(d)) return null;
  if (d.startsWith("02")) {
    if (d.length === 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    if (d.length === 10) return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6)}`;
    return null;
  }
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  if (d.length === 12) return `${d.slice(0, 4)}-${d.slice(4, 8)}-${d.slice(8)}`;
  return null;
}

export function validateInquiryBody(raw: unknown): InquiryValidation {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return fail("요청 형식이 올바르지 않습니다.");
  const body = raw as Record<string, unknown>;

  if (text(body.website) !== "") return { input: null, error: null, bot: true };
  if (typeof body.elapsedMs === "number" && Number.isFinite(body.elapsedMs) && body.elapsedMs < MIN_FILL_MS) {
    return { input: null, error: null, bot: true };
  }

  // 「연락처만 남기기」(quick)는 서비스·일정·예산을 고르지 않고 올 수 있다 — 빈 칸은 「상담에서 정함」으로 적는다
  const path: InquiryPath = oneOf(INQUIRY_PATHS, body.path) ?? "full";
  const rawServices = body.services ?? [];
  if (!Array.isArray(rawServices) || (rawServices.length === 0 && path !== "quick")) {
    return fail("희망하는 서비스 카테고리를 최소 1개 이상 선택해 주세요.");
  }
  if (rawServices.length > INQUIRY_LIMITS.services) return fail("서비스 선택이 너무 많습니다.");
  const services: string[] = [];
  for (const s of rawServices) {
    const label = text(s);
    if (!label || label.length > INQUIRY_LIMITS.serviceLabel) return fail("서비스 선택 값이 올바르지 않습니다.");
    services.push(label);
  }

  const clientName = text(body.clientName);
  const phoneRaw = text(body.phone);
  if (!clientName || !phoneRaw) return fail("성함과 연락처는 필수 입력 항목입니다.");
  if (clientName.length > INQUIRY_LIMITS.name) return fail(`성함·회사명은 ${INQUIRY_LIMITS.name}자 이내로 적어 주세요.`);
  const phone = normalizePhone(phoneRaw);
  if (!phone) return fail("연락처를 다시 확인해 주세요. (예: 010-1234-5678)");

  const email = text(body.email);
  if (email.length > INQUIRY_LIMITS.email || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return fail("이메일 주소를 다시 확인해 주세요.");
  }

  const referenceUrl = text(body.referenceUrl);
  if (referenceUrl.length > INQUIRY_LIMITS.referenceUrl) {
    return fail(`참고 사이트 주소는 ${INQUIRY_LIMITS.referenceUrl}자 이내로 적어 주세요.`);
  }

  const details = text(body.details);
  if (details.length > INQUIRY_LIMITS.details) {
    return fail(`상세 내용은 ${INQUIRY_LIMITS.details.toLocaleString("ko-KR")}자 이내로 적어 주세요.`);
  }

  const budget = text(body.budget);
  const timeline = text(body.timeline);
  if (budget.length > INQUIRY_LIMITS.choice || timeline.length > INQUIRY_LIMITS.choice) {
    return fail("예산·일정 선택 값이 올바르지 않습니다.");
  }

  if ([clientName, email, referenceUrl, details, budget, timeline, ...services].some(hasBadChars)) {
    return fail(BAD_CHAR_ERROR);
  }

  const quick = path === "quick";
  return {
    input: {
      services: services.length > 0 ? services : [DECIDE_IN_CONSULT],
      budget: budget || (quick ? DECIDE_IN_CONSULT : "미정"),
      timeline: timeline || (quick ? DECIDE_IN_CONSULT : "일정 협의"),
      clientName,
      phone,
      email: email || null,
      referenceUrl: referenceUrl || null,
      details: details || null,
      entry: oneOf(INQUIRY_ENTRIES, body.entry),
      path,
      budgetFlexible: typeof body.budgetFlexible === "boolean" ? body.budgetFlexible : null,
      contactPref: oneOf(CONTACT_PREFS, body.contactPref),
      referenceUsage: oneOf(REFERENCE_USAGES, body.referenceUsage),
      variant: oneOf(INQUIRY_VARIANTS, body.variant),
    },
    error: null,
    bot: false,
  };
}
