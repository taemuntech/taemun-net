// Supabase 프로젝트 주소 한 곳.
//
// 왜 따로 두는가: 주소를 읽는 곳이 세 군데인데(문의 API 의 src/lib/supabase.ts, 상태 읽기 state.ts,
// 관리자 쓰기 admin/store.ts) **읽는 방법이 서로 달랐다.** supabase.ts 는 환경변수가 없으면 아래 기본값으로
// 넘어가고, state.ts·store.ts 는 환경변수만 봤다. 그래서 Vercel 에 NEXT_PUBLIC_SUPABASE_URL 이 없고
// SUPABASE_SERVICE_ROLE_KEY 만 있으면 — 문의 접수는 멀쩡한데 관리자 화면만 「서버 설정 오류입니다.」 로
// 영영 막히고, 그 이유가 화면에 드러나지 않는다. 한 곳에서 같은 방법으로 읽게 모은다.
//
// 기본값을 코드에 두는 것이 안전한 이유: 이 주소는 브라우저에 그대로 나가는 공개 값이다(anon 키와 함께
// src/lib/supabase.ts 가 이미 클라이언트 번들에 싣는다). 비밀은 주소가 아니라 **키**이고,
// service_role 키는 어디에도 기본값을 두지 않는다 — 없으면 관리자 경로가 503 으로 시끄럽게 실패한다.

/** 환경변수가 없을 때 쓰는 프로젝트 주소 (공개 값) */
const DEFAULT_SUPABASE_URL = "https://xqseomobgscamtchktki.supabase.co";

/** 끝의 / 는 떼고 돌려준다 — `${SUPABASE_URL}/rest/v1/...` 로 붙여 쓰는 곳들이 // 가 되지 않게 */
export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/+$/, "");
