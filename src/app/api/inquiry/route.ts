import { supabase, getAdminClient } from "@/lib/supabase";
import { sendSms } from "@/lib/solapi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { services, budget, timeline, clientName, phone, email, referenceUrl, details } = body;

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
      details: details || null,
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

    // 2. Send SMS to Oppa's phone (010-5460-9005)
    const adminPhone = process.env.SOLAPI_ADMIN_RECEIVER_PHONE || "01054609005";
    const adminSmsText = `[태문 DEV STUDIO 신규 견적 접수]
■ 고객명: ${clientName}
■ 연락처: ${phone}
■ 서비스: ${services.join(", ")}
■ 예산: ${budget || "미정"}
■ 일정: ${timeline || "일정협의"}
■ 이메일: ${email || "미입력"}
■ 참고URL: ${referenceUrl || "없음"}
■ 문의내용: ${details || "없음"}`;

    const adminSmsResult = await sendSms(adminPhone, adminSmsText);
    console.log("Admin SMS notification result:", adminSmsResult);

    // 3. Send auto-confirmation SMS to client's phone (if different from Oppa's number)
    const cleanClientPhone = phone.replace(/[^0-9]/g, "");
    if (cleanClientPhone.length >= 10 && cleanClientPhone !== adminPhone) {
      const clientSmsText = `[태문 DEV STUDIO]
${clientName} 대표님, 맞춤 견적 신청이 정상 접수되었습니다.
담당 아키텍트가 1시간 이내로 연락해 드리겠습니다.
■ 문의전화: 1588-2622`;

      const clientSmsResult = await sendSms(cleanClientPhone, clientSmsText);
      console.log("Client SMS auto-reply result:", clientSmsResult);
    }

    return NextResponse.json({ success: true, inquiry: res.data ? res.data[0] : null });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "서버 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
