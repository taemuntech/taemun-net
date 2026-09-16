import { supabase, getAdminClient } from "@/lib/supabase";
import { sendSms } from "@/lib/solapi";
import { NextResponse } from "next/server";
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { services, budget, timeline, clientName, phone, email, referenceUrl, details } = body;
    const referral = validReferral(body?.referral);

    if (!services || !Array.isArray(services) || services.length === 0) {
      return NextResponse.json({ error: "희망하는 서비스 카테고리를 최소 1개 이상 선택해 주세요." }, { status: 400 });
    }

    if (!clientName || !phone) {
      return NextResponse.json({ error: "성함과 연락처는 필수 입력 항목입니다." }, { status: 400 });
    }

    const payload = {
      services,
      budget: budget || "미정",
      timeline: timeline || "일정 협의",
      client_name: clientName,
      phone,
      email: email || null,
      reference_url: referenceUrl || null,
      // inquiries 표에 유입 전용 칸이 아직 없어(마이그레이션 20260806) 상세 내용 첫 줄에 서버가 붙인다.
      // 칸을 만들면 여기서 referral_from·referral_industry·referral_kind 로 옮긴다.
      details: [referral ? referralLine(referral) : null, details || null].filter(Boolean).join("\n") || null,
      status: "pending",
    };

    // 1. Save to Supabase inquiries table
    let client = getAdminClient();
    let res = await client.from("inquiries").insert([payload]).select();

    if (res.error) {
      console.warn("Admin insert failed, trying standard client...", res.error);
      res = await supabase.from("inquiries").insert([payload]).select();
    }

    if (res.error) {
      console.error("Supabase insert error:", res.error);
      return NextResponse.json(
        { error: `견적 문의 저장 실패: ${res.error.message}` },
        { status: 500 }
      );
    }

    // 2. 견적 접수 알림 — 형 확인 번호 010-8672-6463 (사이트에 적힌 총괄 아키텍트 직통과 같다)
    //    Vercel 에 SOLAPI_ADMIN_RECEIVER_PHONE 이 따로 있으면 그 값이 우선한다
    const adminPhone = process.env.SOLAPI_ADMIN_RECEIVER_PHONE || "01086726463";
    const adminSmsText = `[태문 DEV STUDIO 신규 견적 접수]
■ 고객명: ${clientName}
■ 연락처: ${phone}
■ 서비스: ${services.join(", ")}
■ 예산: ${budget || "미정"}
■ 일정: ${timeline || "일정협의"}
■ 이메일: ${email || "미입력"}
■ 참고URL: ${referenceUrl || "없음"}
■ 유입: ${referralSmsText(referral)}
■ 문의내용: ${details || "없음"}`;

    const adminSmsResult = await sendSms(adminPhone, adminSmsText);
    console.log("Admin SMS notification result:", adminSmsResult);

    // 3. Send auto-confirmation SMS to client's phone (if different from Oppa's number)
    const cleanClientPhone = phone.replace(/[^0-9]/g, "");
    if (cleanClientPhone.length >= 10 && cleanClientPhone !== adminPhone) {
      const clientSmsText = `[태문 DEV STUDIO]
${clientName} 대표님, 맞춤 견적 신청이 정상 접수되었습니다.
내용을 확인한 뒤 담당 아키텍트가 연락드리겠습니다.
■ 문의전화: 010-8672-6463`;

      const clientSmsResult = await sendSms(cleanClientPhone, clientSmsText);
      console.log("Client SMS auto-reply result:", clientSmsResult);
    }

    return NextResponse.json({ success: true, inquiry: res.data ? res.data[0] : null });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "서버 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
