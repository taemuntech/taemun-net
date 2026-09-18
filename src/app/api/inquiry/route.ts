import { createClient } from "@supabase/supabase-js";
import { sendSms } from "@/lib/solapi";
import { NextResponse } from "next/server";
import { SUPABASE_URL } from "@/lib/supabase-url";
import { guardJsonWrite } from "@/lib/admin/request-guard";
import { validateInquiryBody, type InquiryInput } from "@/lib/inquiry/validate";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";
import { parseInquiryIndustry, parseSampleInquiry } from "@/components/demo-kit/sample-lead";
import { getPortfolioBySlug, type PortfolioCard } from "@/lib/portfolio/registry";
import { KIND_LABEL, industryLabel, type IndustryKey, type PortfolioKind } from "@/lib/portfolio/schema";

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
/** 사이트 전체로 한 시간에 이만큼 넘게 오면 막는다 — 형 휴대폰으로 알림 문자가 쏟아지지 않게 */
const GLOBAL_HOURLY_MAX = 30;
/** 알림 문자에 싣는 상세 내용 길이 — LMS 한도(2,000바이트)를 넘으면 알림이 통째로 안 간다 */
const SMS_DETAILS_MAX = 400;

const CALL_US = `전화(${STUDIO_PHONE})로 연락 주시면 바로 도와드리겠습니다.`;

function clip(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max)}…(이하 관리자 화면)` : value;
}

function adminSmsText(input: InquiryInput, referral: ValidReferral | null): string {
  return `[태문넷 신규 견적 접수]
■ 고객명: ${input.clientName}
■ 연락처: ${input.phone}
■ 서비스: ${input.services.join(", ")}
■ 예산: ${input.budget}
■ 일정: ${input.timeline}
■ 이메일: ${input.email ?? "미입력"}
■ 참고URL: ${input.referenceUrl ?? "없음"}
■ 유입: ${referralSmsText(referral)}
■ 문의내용: ${input.details ? clip(input.details, SMS_DETAILS_MAX) : "없음"}`;
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
 * - 응답에 저장된 행을 싣지 않는다 — 화면은 success 만 본다.
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

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.error("inquiry: SUPABASE_SERVICE_ROLE_KEY 가 없습니다 — 접수를 받을 수 없음");
    return NextResponse.json({ error: `서버 설정 오류입니다. ${CALL_US}` }, { status: 503 });
  }

  try {
    const db = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
    const now = Date.now();

    // 중복·빈도 제한 — 표에서 센다(서버리스라 메모리 카운터는 인스턴스마다 따로 논다).
    // 세는 쿼리가 실패하면 막지 않고 접수를 받는다: 문의 한 건을 잃는 쪽이 더 비싸다.
    const [recent, daily, hourly] = await Promise.all([
      db.from("inquiries").select("id", { count: "exact", head: true })
        .eq("phone", input.phone).gte("created_at", new Date(now - DUPLICATE_WINDOW_MS).toISOString()),
      db.from("inquiries").select("id", { count: "exact", head: true })
        .eq("phone", input.phone).gte("created_at", new Date(now - 24 * 60 * 60 * 1000).toISOString()),
      db.from("inquiries").select("id", { count: "exact", head: true })
        .gte("created_at", new Date(now - 60 * 60 * 1000).toISOString()),
    ]);
    for (const r of [recent, daily, hourly]) {
      if (r.error) console.warn("inquiry: rate-limit count failed (접수는 계속):", r.error.code);
    }
    if ((recent.count ?? 0) > 0) {
      console.info("inquiry: duplicate within window — stored nothing");
      return NextResponse.json({ success: true });
    }
    if ((daily.count ?? 0) >= PER_PHONE_DAILY_MAX || (hourly.count ?? 0) >= GLOBAL_HOURLY_MAX) {
      console.warn("inquiry: rate limited", { daily: daily.count, hourly: hourly.count });
      return NextResponse.json({ error: `지금은 온라인 접수를 잠시 받을 수 없습니다. ${CALL_US}` }, { status: 429 });
    }

    const payload = {
      services: input.services,
      budget: input.budget,
      timeline: input.timeline,
      client_name: input.clientName,
      phone: input.phone,
      email: input.email,
      reference_url: input.referenceUrl,
      // inquiries 표에 유입 전용 칸이 아직 없어(마이그레이션 20260806) 상세 내용 첫 줄에 서버가 붙인다.
      // 칸을 만들면 여기서 referral_from·referral_industry·referral_kind 로 옮긴다.
      details: [referral ? referralLine(referral) : null, input.details].filter(Boolean).join("\n") || null,
      status: "pending",
    };

    const saved = await db.from("inquiries").insert([payload]);
    if (saved.error) {
      console.error("inquiry: insert failed:", saved.error);
      return NextResponse.json(
        { error: `접수 중 문제가 생겼습니다. 잠시 뒤 다시 시도하시거나 ${CALL_US}` },
        { status: 500 },
      );
    }

    // 접수 알림 — 형 확인 번호(사이트에 적힌 총괄 아키텍트 직통과 같다).
    // Vercel 에 SOLAPI_ADMIN_RECEIVER_PHONE 이 따로 있으면 그 값이 우선한다. 문자가 실패해도 접수는 저장됐다.
    const adminPhone = process.env.SOLAPI_ADMIN_RECEIVER_PHONE || STUDIO_PHONE.replace(/-/g, "");
    const smsResult = await sendSms(adminPhone, adminSmsText(input, referral));
    console.log("Admin SMS notification result:", smsResult);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("inquiry: unexpected error:", err);
    return NextResponse.json(
      { error: `접수 중 문제가 생겼습니다. 잠시 뒤 다시 시도하시거나 ${CALL_US}` },
      { status: 500 },
    );
  }
}
