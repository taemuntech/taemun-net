import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sendSms } from "@/lib/solapi";
import { after, NextResponse } from "next/server";
import { SUPABASE_URL } from "@/lib/supabase-url";
import { guardJsonWrite } from "@/lib/admin/request-guard";
import { validateInquiryBody, type InquiryInput } from "@/lib/inquiry/validate";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";
import { adminReceiverPhone } from "@/lib/admin/notify";
import { CONTACT_PREF_LABEL, REFERENCE_USAGE_LABEL } from "@/lib/inquiry/labels";
import { kstYymmdd } from "@/lib/kst";
import { parseInquiryIndustry, parseSampleInquiry } from "@/components/demo-kit/sample-lead";
import { getPortfolioBySlug, type PortfolioCard } from "@/lib/portfolio/registry";
import { KIND_LABEL, industryLabel, type IndustryKey, type PortfolioKind } from "@/lib/portfolio/schema";
import { getCrmSettings, recordIntakeAlert, recordOverCap } from "@/lib/admin/crm-store";
import {
  capNoticeSmsText,
  decideNotify,
  fitLms,
  saveFailSmsAllowedByRecord,
  saveFailSmsText,
  slidingWindowAllow,
  type IntakeAlertKind,
} from "@/lib/inquiry/intake-core";

type ValidReferral = { from?: string; industry?: IndustryKey; industryLabel?: string; kind?: PortfolioKind };

/** 레지스트리에서 slug 를 찾는다 — 파일을 못 읽는 환경이면 null(유입은 「unknown」으로 남는다) */
function registeredPortfolio(slug: string): PortfolioCard | null {
  try {
    return getPortfolioBySlug(slug);
  } catch (e) {
    console.warn("portfolio registry unavailable for referral check:", e);
    return null;
  }
}

/**
 * 문의 화면이 따로 실어 보낸 유입(어느 샘플·서비스를 보고 왔는지)을 다시 검증한다.
 * 규칙은 주소창을 읽을 때와 같은 parseSampleInquiry(slug 규칙·업종 키).
 * kind·industry 는 클라이언트 값을 믿지 않고 레지스트리(src/content/portfolio)에서 다시 찾는다 —
 * 등록되지 않은 slug 면 kind 를 비워 「unknown」으로 남기고 업종만 요청 값을 쓴다.
 * from 없이 업종만 온 문의(홈 갤러리 구성 예시·샘플 없는 업종 안내)는 업종만 남긴다.
 * 방문자가 고칠 수 있는 상세 내용 칸과 달리 이 값은 화면에서 지워지지 않는다.
 */
function validReferral(raw: unknown): ValidReferral | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  const params = {
    from: typeof r.from === "string" ? r.from : undefined,
    industry: typeof r.industry === "string" ? r.industry : undefined,
  };
  const parsed = parseSampleInquiry(params);
  if (!parsed) {
    const industryOnly = parseInquiryIndustry(params);
    return industryOnly ? { industry: industryOnly, industryLabel: industryLabel(industryOnly) } : null;
  }
  const registered = registeredPortfolio(parsed.from);
  const industry = registered?.industry ?? parsed.industry;
  return {
    from: parsed.from,
    industry,
    industryLabel: industry ? industryLabel(industry) : undefined,
    kind: registered?.kind,
  };
}

/** 저장·문자에 같은 모양으로 남긴다 — 「[유입] sample · atelier-vaucluse · interior」 형식이라 나중에 details 칸을 grep 해 샘플별로 셀 수 있다 */
function referralLine(ref: ValidReferral): string {
  const kind = ref.kind ?? (ref.from ? "unknown" : "industry");
  return `[유입] ${kind} · ${ref.from ?? "-"} · ${ref.industry ?? "-"}`;
}

function referralSmsText(ref: ValidReferral | null): string {
  if (!ref) return "직접 방문";
  const industry = ref.industryLabel ? ` (${ref.industryLabel})` : "";
  if (!ref.from) return `업종 문의${industry}`;
  return `${ref.kind ? KIND_LABEL[ref.kind] : "포트폴리오"} ${ref.from}${industry}`;
}

/** 같은 번호로 이 시간 안에 다시 오면 중복으로 보고 저장·문자 없이 성공만 돌려준다(두 번 누름·새로고침 재전송) */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
/** 같은 번호로 하루 이만큼 넘게 오면 막는다 */
const PER_PHONE_DAILY_MAX = 3;
/**
 * 사이트 전체로 한 시간에 이만큼 넘게 오면 **알림 문자만** 묶는다 — 형 휴대폰으로 문자가 쏟아지지 않게.
 * 2026-09-20: 예전에는 접수 자체를 429 로 막았다. 번호만 바꿔 30건을 채우는 스크립트 하나로 그 한 시간 동안 진짜 고객이
 * 전부 거절당했다(오픈 점검 P1-5). 이제 저장은 늘 하고, 넘은 건은 「접수 이상(over_cap)」으로 세어 관리자 화면·아침 문자에 뜬다.
 * 판단은 intake-core.decideNotify(시험: scripts/tests/inquiry-intake-core.test.mjs).
 */
const GLOBAL_HOURLY_MAX = 30;
/** 한도 안내 문자 끝에 붙는 주소 — 아침 문자와 같은 「오늘」 화면 */
const ADMIN_TODAY_URL = "taemun.net/admin/today";
/** 알림 문자에 싣는 상세 내용 길이 — LMS 한도(2,000바이트)를 넘으면 알림이 통째로 안 간다 */
const SMS_DETAILS_MAX = 400;

const CALL_US = `전화(${STUDIO_PHONE})로 연락 주시면 바로 도와드리겠습니다.`;

// ── 인스턴스 안 울타리(2026-09-20 오픈 점검 후속) ─────────────────────────────
//
// 서버리스라 아래 값은 인스턴스마다 따로 논다 — 정확한 한도가 아니라 **표를 못 믿을 때의 마지막 울타리**다.
// 한도의 정본은 (1) 표에서 세는 번호별 한도, (2) 접수 이상 기록(crm_settings.intake_alert), (3) Vercel 방화벽 규칙이다.

const HOUR_MS = 60 * 60 * 1000;

/**
 * IP 하나가 이 창 안에 보낼 수 있는 접수 수(인스턴스마다). 번호만 바꿔 도는 스크립트가 표를 수천 건으로 채워
 * 오픈 날 진짜 문의를 「새 문의」 더미 밑에 묻는 길을 좁힌다. 사이트 전체 상한(예: 시간당 200건 넘으면 거절)은
 * 두지 않는다 — 그건 도배 한 번에 진짜 고객 전원이 거절당하던 P1-5 를 더 높은 문턱에서 되살린다.
 * ⚠️ 저장 건수의 진짜 상한은 Vercel 방화벽 규칙(/api/inquiry POST · IP 당 600초에 5건)이 맡는다 — 이 코드만으로는
 *   인스턴스가 늘면 뚫린다. 규칙이 켜져 있는지는 형이 Vercel 대시보드에서 확인해야 한다(오픈 전 점검 항목).
 */
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const PER_IP_MAX = 5;
const ipHits = new Map<string, number[]>();

/** 「저장 실패」 문자 — 인스턴스마다 1시간에 이만큼(기록을 못 읽을 때의 울타리) */
const SAVE_FAIL_SMS_INSTANCE_MAX = 5;
let saveFailSmsTimes: number[] = [];
/** service_role 키가 없을 때(503) — 기록도 못 읽으니 인스턴스마다 1시간에 한 통만. 형은 첫 문자로 설정이 빠진 것을 안다 */
let noKeySmsTimes: number[] = [];
/** 같은 번호의 「저장 실패」 문자는 이 창 안에 한 번 — 장애 중 고객이 「다시 시도」할 때마다 같은 문의로 문자가 가지 않게 */
const SAVE_FAIL_SAME_PHONE_MS = 10 * 60 * 1000;
const saveFailSmsByPhone = new Map<string, number>();

/** 맵이 끝없이 커지지 않게 — 창이 지난 것을 걷고, 그래도 크면 비운다(울타리가 잠깐 풀리는 쪽이 메모리가 터지는 쪽보다 낫다) */
const MAP_SOFT_MAX = 5000;
function pruneMap<V>(map: Map<string, V>, isStale: (v: V) => boolean): void {
  if (map.size < MAP_SOFT_MAX) return;
  for (const [k, v] of map) if (isStale(v)) map.delete(k);
  if (map.size >= MAP_SOFT_MAX) map.clear();
}

/** Vercel 이 붙이는 x-real-ip, 없으면 x-forwarded-for 첫 값. 둘 다 없으면(로컬) null — 울타리를 건너뛴다 */
function clientIp(request: Request): string | null {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  const fwd = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || null;
}

function ipAllowed(ip: string | null, nowMs: number): boolean {
  if (!ip) return true;
  pruneMap(ipHits, (times) => times.every((t) => nowMs - t >= PER_IP_WINDOW_MS));
  const w = slidingWindowAllow(ipHits.get(ip) ?? [], nowMs, PER_IP_WINDOW_MS, PER_IP_MAX);
  ipHits.set(ip, w.times);
  return w.allowed;
}

/**
 * 저장 실패가 **보낸 사람 입력 때문**인 오류 — 400 으로 돌려보내고 「저장 실패」 문자는 보내지 않는다.
 * 22P05(U+0000 등 쓸 수 없는 글자)·22021(잘못된 인코딩)은 입력 검사(validate.ts)가 먼저 막지만, 빠져나온 것이 있어도
 * 공격자가 형 휴대폰으로 자기 글을 LMS 로 보내는 통로가 되지 않게 여기서 한 번 더 끊는다.
 * 22001(길이 초과)·23514(체크 제약)는 일부러 넣지 않았다: 입력 검사가 길이·허용 목록을 이미 강제하므로 이 둘이 나면
 * **우리 표·코드가 어긋난 것**(마이그레이션 누락 등)이고, 그때 400 으로 끊으면 진짜 고객 문의가 문자도 없이 사라진다.
 * 그 둘은 「저장 실패」 문자로 가되, 아래 세 울타리(기록 1시간 N건·인스턴스 창·같은 번호)가 도배를 막는다.
 */
const CLIENT_DATA_ERROR_CODES = new Set(["22P05", "22021"]);

function clip(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max)}…(이하 관리자 화면)` : value;
}

/** 형에게 가는 접수 알림 본문. LMS 2,000바이트를 넘지 않게 뒤(문의 내용)에서 자른다 — 넘으면 문자가 통째로 안 간다 */
function adminSmsText(input: InquiryInput, referral: ValidReferral | null, requestNo: string | null): string {
  return fitLms(adminSmsBody(input, referral, requestNo));
}

function adminSmsBody(input: InquiryInput, referral: ValidReferral | null, requestNo: string | null): string {
  const extra = [
    input.path === "quick" ? "■ 경로: 연락처만 남김(질문 생략)" : null,
    input.referenceUsage ? `■ 레퍼런스 활용: ${REFERENCE_USAGE_LABEL[input.referenceUsage]}` : null,
    input.budgetFlexible ? "■ 예산 조정 가능" : null,
    input.contactPref ? `■ 연락 방법: ${CONTACT_PREF_LABEL[input.contactPref]}` : null,
  ].filter(Boolean);
  return `[태문넷 신규 견적 접수${requestNo ? ` ${requestNo}` : ""}]
■ 연락처: ${input.phone}
■ 서비스: ${input.services.join(", ")}
■ 예산: ${input.budget}
■ 일정: ${input.timeline}
■ 이메일: ${input.email ?? "미입력"}
■ 참고URL: ${input.referenceUrl ?? "없음"}
■ 유입: ${referralSmsText(referral)}${extra.length ? `\n${extra.join("\n")}` : ""}
■ 문의내용: ${input.details ? clip(input.details, SMS_DETAILS_MAX) : "없음"}`;
}

/**
 * 접수번호 「TM-YYMMDD-NN」 — 날짜는 KST, NN 은 그날 순번(01부터). 완료 화면에 보여 주고 통화 때 찾는 번호다.
 * 그날 이미 번호가 붙은 행 수 + 1 로 정하고, 동시에 두 건이 같은 번호를 잡으면 유일 인덱스(23505)에 걸리므로
 * 호출하는 쪽이 순번을 올려 다시 넣는다.
 */
async function firstRequestSeq(db: SupabaseClient, now: Date): Promise<{ prefix: string; seq: number }> {
  const prefix = `TM-${kstYymmdd(now)}-`;
  const counted = await db
    .from("inquiries")
    .select("id", { count: "exact", head: true })
    .like("request_no", `${prefix}%`);
  if (counted.error) console.warn("inquiry: request_no count failed:", counted.error.code);
  return { prefix, seq: (counted.count ?? 0) + 1 };
}

const requestNoOf = (prefix: string, seq: number) => `${prefix}${String(seq).padStart(2, "0")}`;

/**
 * 접수 이상을 crm_settings.intake_alert 에 남긴다 — **응답 뒤에**(after), 실패해도 던지지 않는다.
 * 기록이 안 되면(마이그레이션 전·DB 장애) recordIntakeAlert 가 로그 한 줄만 남긴다. 고객 응답은 이것을 기다리지 않는다.
 * 🔒 종류·시각·접수번호만 넘긴다. DB 오류 원문·고객 정보는 넘길 자리가 없다.
 */
function noteIntakeAlert(kind: IntakeAlertKind, requestNo: string | null): void {
  const at = new Date().toISOString();
  try {
    after(async () => {
      await recordIntakeAlert({ kind, at, requestNo });
    });
  } catch (e) {
    // after() 는 요청 밖에서 부르면 던진다 — 그때도 접수 응답은 계속 간다
    console.error("inquiry: could not schedule intake alert:", kind, e instanceof Error ? e.message : e);
  }
}

/**
 * 저장에 실패한 문의를 형에게 문자로 보낸다 — 이 문자가 그 문의의 **유일한 기록**이다.
 * 첫 줄 「[저장 실패 — 이 문자로만 남았습니다]」 + 평소 접수 알림과 같은 본문(adminSmsBody), LMS 2,000바이트 안으로 자름.
 * 🔒 DB 오류 원문은 넣지 않는다(표·칸 이름이 발송 대행사 기록에 남는다). 문자도 실패하면 로그와 기록만 남는다.
 *
 * 2026-09-20 오픈 점검 후속 — 상한 없이 보내면 누구나 저장이 실패하는 요청을 되풀이해 형 휴대폰으로 자기 글을 무한히 보낼 수
 * 있었다(번호·시간 한도는 **저장된** 행만 센다). 그래서 기록(save_fail)은 늘 남기되 문자는 세 울타리를 지날 때만:
 *   1) 같은 번호는 SAVE_FAIL_SAME_PHONE_MS 안에 한 번(장애 중 고객의 「다시 시도」마다 문자가 가지 않게)
 *   2) 인스턴스마다 1시간 SAVE_FAIL_SMS_INSTANCE_MAX 통(기록을 못 읽어도 막힌다) — 키가 없을 때(hasServiceKey=false)는 1통
 *   3) 기록의 열린 save_fail 묶음이 1시간 안에 이미 N건이면(intake-core.saveFailSmsAllowedByRecord) 보내지 않는다
 * 문자를 건너뛴 건도 save_fail 건수로 세어 「오늘」 배너·아침 문자에 뜬다.
 */
async function sendSaveFailSms(input: InquiryInput, referral: ValidReferral | null, hasServiceKey: boolean): Promise<void> {
  noteIntakeAlert("save_fail", null);
  const nowMs = Date.now();

  // 🔒 운영 배포에서만 보낸다. 미리보기 배포·로컬 개발 서버에는 DB 키가 없어 **모든** 접수가 이 길로 오는데,
  // 문자 발송은 키가 없어도 동작한다(solapi.ts 기본값 — 형 결정으로 그대로 둠). 그대로 두면 미리보기 주소를 아는
  // 누구나(또는 로컬에서 시험하던 우리가) 형 휴대폰으로 문자를 보낼 수 있다. VERCEL_ENV 는 운영에서 "production".
  if (process.env.VERCEL_ENV !== "production") {
    console.warn("inquiry: save-fail SMS skipped — not a production deployment (VERCEL_ENV != production)");
    return;
  }

  const lastForPhone = saveFailSmsByPhone.get(input.phone);
  if (lastForPhone !== undefined && nowMs - lastForPhone < SAVE_FAIL_SAME_PHONE_MS) {
    console.warn("inquiry: save-fail SMS skipped — same phone within window (기록만)");
    return;
  }
  if (hasServiceKey) {
    const w = slidingWindowAllow(saveFailSmsTimes, nowMs, HOUR_MS, SAVE_FAIL_SMS_INSTANCE_MAX);
    if (!w.allowed) {
      console.warn("inquiry: save-fail SMS skipped — instance hourly cap (기록만)");
      return;
    }
    // 기록을 읽어 사이트 전체로 본다. 못 읽으면(DB 장애) 인스턴스 울타리만 믿고 보낸다 — 문의를 모르는 쪽이 더 비싸다.
    const settings = await getCrmSettings();
    if (settings.ok && !saveFailSmsAllowedByRecord(settings.data.intakeAlerts, new Date(nowMs).toISOString())) {
      console.warn("inquiry: save-fail SMS skipped — open save_fail bundle already at cap (기록만)");
      return;
    }
    saveFailSmsTimes = w.times;
  } else {
    const w = slidingWindowAllow(noKeySmsTimes, nowMs, HOUR_MS, 1);
    if (!w.allowed) {
      console.warn("inquiry: save-fail SMS skipped — no service key, already texted this hour");
      return;
    }
    noKeySmsTimes = w.times;
  }
  pruneMap(saveFailSmsByPhone, (t) => nowMs - t >= SAVE_FAIL_SAME_PHONE_MS);
  saveFailSmsByPhone.set(input.phone, nowMs);

  try {
    const r = await sendSms(adminReceiverPhone(), saveFailSmsText(adminSmsBody(input, referral, null)));
    if (!r.success) {
      console.error("inquiry: save-fail SMS also failed — 이 문의는 어디에도 남지 않았습니다");
      noteIntakeAlert("sms_fail", null);
    }
  } catch (e) {
    console.error("inquiry: save-fail SMS threw:", e instanceof Error ? e.message : e);
    noteIntakeAlert("sms_fail", null);
  }
}

// ── 한도 초과 기록·안내 문자(2026-09-20 오픈 점검 후속) ───────────────────────
//
// 왜 모아 쓰나: 도배 요청마다 기록(intake_alert 한 행)에 값 비교 쓰기를 돌리면 요청 하나에 DB 왕복이 최대 8번 붙고, 같은 행을
// 두고 서로 밀어내(4번 재시도 소진) 건수가 사라지고 sms_fail·save_fail·형의 「확인」 쓰기까지 밀려난다.
// 그래서 인스턴스마다 OVER_CAP_FLUSH_MS 에 한 번만 쓰고, 그사이 건수는 모아 두었다가 다음 쓰기에 한꺼번에 더한다.
// 인스턴스의 **첫** 초과는 바로 쓴다 — 안내 문자가 늦지 않게. 도배가 끝난 뒤 인스턴스에 남은 몇 건(최대 1분치)은
// 기록에 안 더해질 수 있다(건수가 조금 적게 보인다 — 문의 자체는 전부 표에 저장돼 있다).
// 안내 문자는 recordOverCap 이 「이 쓰기가 새 묶음을 열었다」고 답한 요청 하나만 보낸다. 기록을 못 쓰면(마이그레이션 전)
// 인스턴스마다 1시간에 한 통으로 대신한다 — 안내 없이 문자가 끊기지 않게.
const OVER_CAP_FLUSH_MS = 60 * 1000;
let overCapPending = 0;
let overCapLastFlushMs = 0;
let capNoticeFallbackTimes: number[] = [];

function noteOverCap(requestNo: string): void {
  overCapPending += 1;
  const nowMs = Date.now();
  if (overCapLastFlushMs !== 0 && nowMs - overCapLastFlushMs < OVER_CAP_FLUSH_MS) return;
  const count = overCapPending;
  overCapPending = 0;
  overCapLastFlushMs = nowMs;
  const at = new Date(nowMs).toISOString();
  try {
    after(async () => {
      const outcome = await recordOverCap({ kind: "over_cap", at, requestNo, count });
      let send = outcome === "claimed";
      if (outcome === "failed") {
        const w = slidingWindowAllow(capNoticeFallbackTimes, Date.now(), HOUR_MS, 1);
        capNoticeFallbackTimes = w.times;
        send = w.allowed;
      }
      if (!send) return;
      try {
        const sms = await sendSms(adminReceiverPhone(), capNoticeSmsText(GLOBAL_HOURLY_MAX, ADMIN_TODAY_URL));
        if (!sms.success) {
          console.error("inquiry: cap notice SMS failed", { requestNo });
          await recordIntakeAlert({ kind: "sms_fail", at: new Date().toISOString(), requestNo });
        }
      } catch (e) {
        console.error("inquiry: cap notice SMS threw:", e instanceof Error ? e.message : e);
        await recordIntakeAlert({ kind: "sms_fail", at: new Date().toISOString(), requestNo });
      }
    });
  } catch (e) {
    // after() 를 못 걸었으면 모은 건수를 되돌려 다음 요청이 다시 쓰게 한다
    overCapPending += count;
    overCapLastFlushMs = 0;
    console.error("inquiry: could not schedule over-cap record:", e instanceof Error ? e.message : e);
  }
}

/**
 * 견적 문의 접수.
 *
 * 순서(2026-09-18 가온, 구현계획서 P0): 출처 검사 → 입력 검증·봇 신호 → service_role 확인 → 중복·빈도 제한 → 저장 → 형에게 알림 문자.
 *
 * 전과 달라진 것
 * - **고객 자동 문자를 보내지 않는다.** 방문자가 적은 아무 번호로나 태문 발신 문자가 나가는 통로였다
 *   (남의 번호를 적어 문자 폭탄을 보낼 수 있었다). 접수 확인은 완료 화면이 맡는다.
 * - **공개(anon) 키로 내려가지 않는다.** service_role 키가 없으면 503. 공개 키 삽입은 표의 INSERT 정책에
 *   기대는데, 그 정책은 누구나 이 API 를 거치지 않고 표에 직접 쓰게 열어 둔다 — 마이그레이션으로 닫는다.
 * - 저장 오류 원문(Supabase 메시지)을 방문자에게 돌려주지 않는다. 표 이름·칸 이름이 새어 나갔다.
 * - 응답에 저장된 행을 싣지 않는다 — 화면은 success 와 접수번호(requestNo)만 본다.
 *
 * 2026-09-19 추가: 접수번호(TM-YYMMDD-NN, KST) · 유입·흐름 칸(referral_*·entry·path·reference_usage 등,
 * 마이그레이션 20260919090000). 칸이 없으면 저장이 통째로 실패하므로 그 마이그레이션이 먼저 적용돼 있어야 한다.
 *
 * 2026-09-20 (오픈 주간 P1-5·6) — 진짜 고객 문의가 **소리 없이 사라지지 않게**:
 * - 저장 실패(23505 말고 다른 오류·번호 충돌 5번·저장 전 예외)나 service_role 키 없음 → 형에게 「저장 실패」 문자로
 *   내용을 보내고, 고객에게는 예전과 같은 오류(전화 안내)를 돌려준다. 접수 이상(save_fail)도 남긴다.
 * - 사이트 전체 1시간 한도는 이제 접수를 막지 않는다 — 저장하고 문자만 건너뛴다(over_cap). 번호별 제한(10분 중복·하루 3건)은 그대로.
 * - 알림 문자가 실패하면(sendSms 가 success:false) 접수 이상(sms_fail)으로 남긴다. 예전엔 console 에만 적어 묻혔다.
 * - (후속) 입력에 제어 문자·짝 없는 서로게이트가 있으면 400(validate.ts). 「저장 실패」 문자는 같은 번호·인스턴스·기록 1시간 N건
 *   세 울타리로 묶는다. IP 당 10분 5건(인스턴스마다 — 진짜 상한은 Vercel 방화벽). 순번이 계속 겹치면 무작위 꼬리 번호로 한 번 더 넣는다.
 * 기록(crm_settings.intake_alert)은 관리자 「오늘」 빨간 배너·설정 「접수 이상」·아침 문자 「접수 이상 N건」이 읽는다.
 */
export async function POST(request: Request) {
  const blocked = guardJsonWrite(request);
  if (blocked) return blocked;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }

  const checked = validateInquiryBody(body);
  if (checked.bot) {
    console.warn("inquiry: bot signal — stored nothing");
    return NextResponse.json({ success: true });
  }
  const input = checked.input;
  if (!input) {
    return NextResponse.json({ error: checked.error ?? "입력값을 확인해 주세요." }, { status: 400 });
  }
  const referral = validReferral((body as Record<string, unknown>).referral);

  if (!ipAllowed(clientIp(request), Date.now())) {
    console.warn("inquiry: rate limited (per ip, instance)");
    return NextResponse.json({ error: `지금은 온라인 접수를 잠시 받을 수 없습니다. ${CALL_US}` }, { status: 429 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("inquiry: SUPABASE_SERVICE_ROLE_KEY 가 없습니다 — 접수를 받을 수 없음(내용은 형에게 문자로)");
    // 키가 없으니 기록(intake_alert)도 못 쓴다 — recordIntakeAlert 가 로그만 남긴다. 이 경우 형이 아는 길은 문자뿐이다.
    await sendSaveFailSms(input, referral, false);
    return NextResponse.json({ error: `서버 설정 오류입니다. ${CALL_US}` }, { status: 503 });
  }

  // 저장이 끝났는가 — 끝난 뒤 예외가 나면 「저장 실패」 문자를 보내면 안 된다(이미 표에 있다)
  let savedRequestNo: string | null = null;
  try {
    const db = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
    const now = Date.now();

    // 중복·빈도 제한 — 표에서 센다(서버리스라 메모리 카운터는 인스턴스마다 따로 논다).
    // 세는 쿼리가 실패하면 막지 않고 접수를 받는다: 문의 한 건을 잃는 쪽이 더 비싸다.
    const [recent, daily, hourly] = await Promise.all([
      db.from("inquiries").select("request_no")
        .eq("phone", input.phone).gte("created_at", new Date(now - DUPLICATE_WINDOW_MS).toISOString())
        .order("created_at", { ascending: false }).limit(1),
      db.from("inquiries").select("id", { count: "exact", head: true })
        .eq("phone", input.phone).gte("created_at", new Date(now - 24 * 60 * 60 * 1000).toISOString()),
      db.from("inquiries").select("id", { count: "exact", head: true })
        .gte("created_at", new Date(now - 60 * 60 * 1000).toISOString()),
    ]);
    for (const r of [recent, daily, hourly]) {
      if (r.error) console.warn("inquiry: rate-limit count failed (접수는 계속):", r.error.code);
    }
    if (recent.data && recent.data.length > 0) {
      // 두 번 누름·새로고침 재전송 — 새로 저장하지 않고 앞 접수의 번호를 그대로 보여 준다
      console.info("inquiry: duplicate within window — stored nothing");
      const previous = (recent.data[0] as { request_no: string | null }).request_no;
      return NextResponse.json({ success: true, requestNo: previous ?? null });
    }
    // 번호별 하루 한도만 접수를 막는다. 사이트 전체 1시간 한도는 아래(저장 뒤)에서 문자만 묶는다.
    if ((daily.count ?? 0) >= PER_PHONE_DAILY_MAX) {
      console.warn("inquiry: rate limited (per phone)", { daily: daily.count });
      return NextResponse.json({ error: `지금은 온라인 접수를 잠시 받을 수 없습니다. ${CALL_US}` }, { status: 429 });
    }
    const notify = decideNotify(hourly.error ? null : (hourly.count ?? null), GLOBAL_HOURLY_MAX);

    const payload = {
      services: input.services,
      budget: input.budget,
      timeline: input.timeline,
      client_name: input.clientName,
      phone: input.phone,
      email: input.email,
      reference_url: input.referenceUrl,
      // 유입은 칸(referral_*)에 싣는다(마이그레이션 20260919090000). 옛 행과 같이 세려고 한동안
      // 상세 내용 첫 줄 「[유입] …」 도 같이 남긴다.
      details: [referral ? referralLine(referral) : null, input.details].filter(Boolean).join("\n") || null,
      referral_from: referral?.from ?? null,
      referral_kind: referral?.kind ?? null,
      referral_industry: referral?.industry ?? null,
      entry: input.entry,
      path: input.path,
      budget_flexible: input.budgetFlexible,
      contact_pref: input.contactPref,
      reference_usage: input.referenceUsage,
      variant: input.variant,
      status: "pending",
    };

    // 접수번호가 겹치면(동시 접수) 순번을 올려 다시 넣는다. 다른 오류는 바로 실패로 본다.
    const first = await firstRequestSeq(db, new Date(now));
    const prefix = first.prefix;
    let seq = first.seq;
    let requestNo: string | null = null;
    let insertError: { code?: string } | null = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const candidate = requestNoOf(prefix, seq);
      const saved = await db.from("inquiries").insert([{ ...payload, request_no: candidate }]);
      if (!saved.error) {
        requestNo = candidate;
        break;
      }
      if (saved.error.code === "23505") {
        seq += 1;
        continue;
      }
      // 오류 원문은 서버 로그에만. 문자·응답에는 싣지 않는다.
      console.error("inquiry: insert failed:", saved.error);
      insertError = saved.error;
      break;
    }
    if (!requestNo && !insertError) {
      // 순번이 5번 겹쳤다(동시 접수가 몰림). 예전엔 여기서 포기하고 「저장 실패」 문자를 보냈다 — 도배가 순번을 겹치게 만들면
      // 문자가 그만큼 나갔다. 이제 겹칠 일이 사실상 없는 번호(순번 뒤에 무작위 세 자리)로 한 번 더 넣는다. 모양은 그대로 TM-YYMMDD-숫자.
      const candidate = `${requestNoOf(prefix, seq)}${String(100 + Math.floor(Math.random() * 900))}`;
      const saved = await db.from("inquiries").insert([{ ...payload, request_no: candidate }]);
      if (!saved.error) {
        requestNo = candidate;
      } else {
        console.error("inquiry: insert failed after request_no collisions:", saved.error);
        insertError = saved.error;
      }
    }
    if (!requestNo) {
      if (insertError?.code && CLIENT_DATA_ERROR_CODES.has(insertError.code)) {
        // 보낸 사람 입력이 DB 가 받을 수 없는 글자였다 — 고쳐 보내라고 돌려준다. 문자·기록 없음(도배 통로가 되지 않게).
        return NextResponse.json(
          { error: `입력값에 사용할 수 없는 문자가 있습니다. 내용을 다시 입력해 주시거나 ${CALL_US}` },
          { status: 400 },
        );
      }
      await sendSaveFailSms(input, referral, true);
      return NextResponse.json(
        { error: `접수 중 문제가 생겼습니다. 잠시 뒤 다시 시도하시거나 ${CALL_US}` },
        { status: 500 },
      );
    }

    // 접수 알림 — 형 확인 번호(사이트에 적힌 총괄 아키텍트 직통과 같다).
    // Vercel 에 SOLAPI_ADMIN_RECEIVER_PHONE 이 따로 있으면 그 값이 우선한다. 문자가 실패해도 접수는 저장됐다.
    // 받는 번호는 아침 요약 문자와 같은 한 곳(lib/admin/notify.ts)에서 고른다.
    // 2026-09-19: 문자에서 고객 이름 줄을 뺐다(형 승인) — 잠금 화면 미리보기·발송 대행사 기록에 이름이 남지 않게.
    savedRequestNo = requestNo;
    // 2026-09-20: 1시간 한도 이상이면 건마다 가는 문자는 건너뛰고 over_cap 으로 센다. 한도 안내 문자는 기록 쓰기에 성공해
    // 새 묶음을 연 한 요청만 응답 뒤에 보낸다(noteOverCap) — 「딱 30」을 아무도 못 봐도, 여럿이 봐도 한 통.
    // 저장은 이미 끝났으니 문의는 「오늘」 화면·아침 문자의 「새 문의」로 형에게 간다.
    if (notify === "over_cap") {
      console.warn("inquiry: over hourly cap — saved, SMS skipped", { hourly: hourly.count, requestNo });
      noteOverCap(requestNo);
      return NextResponse.json({ success: true, requestNo });
    }
    const smsText = adminSmsText(input, referral, requestNo);
    const smsResult = await sendSms(adminReceiverPhone(), smsText);
    if (smsResult.success) {
      console.log("inquiry: admin SMS sent", { requestNo });
    } else {
      // 문자 실패 사유(솔라피 문구)는 로그에만. 기록에는 종류·시각·접수번호만.
      console.error("inquiry: admin SMS failed — 접수는 저장됨", { requestNo, error: smsResult.error });
      noteIntakeAlert("sms_fail", requestNo);
    }

    return NextResponse.json({ success: true, requestNo });
  } catch (err) {
    console.error("inquiry: unexpected error:", err);
    // 저장 전에 터졌으면 문의가 어디에도 없다 — 형에게 문자로 남긴다. 저장 뒤라면(문자 단계) 이미 표에 있다.
    if (savedRequestNo === null) await sendSaveFailSms(input, referral, true);
    return NextResponse.json(
      { error: `접수 중 문제가 생겼습니다. 잠시 뒤 다시 시도하시거나 ${CALL_US}` },
      { status: 500 },
    );
  }
}
