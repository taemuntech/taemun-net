import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./supabase-url";

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_MBPx3nAIgmMPeBrhY41BtQ_Y2PI2w5p";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ⚠️ 키가 없으면 **공개(anon) 키로 조용히 내려간다** — 문의 접수(api/inquiry)가 그 동작에 기대고 있어 남겨 둔다.
 * 작업물 공개 상태를 다루는 관리자 경로에서는 절대 쓰지 말 것: 조용히 강등되면 「저장했다」고 해 놓고
 * 실제로는 아무것도 안 바뀌는 상태가 된다. 그쪽은 src/lib/admin/store.ts 가 service_role 키를 직접 요구하고,
 * 없으면 503 「서버 설정 오류입니다.」 로 시끄럽게 실패한다.
 */
export function getAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceRoleKey);
}
