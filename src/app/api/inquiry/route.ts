import { supabase, getAdminClient } from "@/lib/supabase";
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

    // Try admin client first, fallback to standard client if RLS is open
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

    return NextResponse.json({ success: true, inquiry: res.data ? res.data[0] : null });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "서버 처리 중 오류가 발생했습니다." }, { status: 500 });
  }
}
