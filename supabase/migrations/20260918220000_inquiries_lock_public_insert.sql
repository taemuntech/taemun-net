-- 견적 문의 표(inquiries): 공개(anon)·로그인(authenticated) 키로 직접 쓰기를 막는다 — 2026-09-18 가온, 구현계획서 P0 M0
--
-- 왜: 20260806 마이그레이션의 「Anyone can insert inquiry」 정책은 누구나 공개 키(브라우저 번들에 들어 있는 값)로
-- /api/inquiry 를 거치지 않고 표에 바로 행을 넣을 수 있게 열어 둔다. 그러면 API 의 검증·중복·빈도 제한을 전부
-- 건너뛴다. 이제 API 는 service_role 로만 저장하므로(2026-09-18 부터) 이 정책이 필요 없다.
--
-- ⚠️ 적용 순서: service_role 로만 저장하는 API 가 운영에 올라가고 **실제 접수 1건이 확인된 뒤에** 적용한다.
--    먼저 적용하면 옛 API(공개 키로 내려가던 경로)가 막혀 문의가 저장되지 않는다.
--
-- 적용 뒤 확인(SQL 에디터):
--   select policyname from pg_policies where schemaname = 'public' and tablename = 'inquiries';
--     → 「Service role full access on inquiries」 하나만 남아야 한다
--   select grantee, privilege_type from information_schema.role_table_grants
--    where table_schema = 'public' and table_name = 'inquiries' and grantee in ('anon', 'authenticated');
--     → 0행이어야 한다
-- 그리고 공개 키로 직접 찔러 본다(가온이 한다): POST /rest/v1/inquiries 에 빈 본문 → 42501(권한 없음)이어야 한다.
-- 23502(NOT NULL 위반)가 나오면 아직 열려 있다는 뜻이다.

DROP POLICY IF EXISTS "Anyone can insert inquiry" ON public.inquiries;

-- 정책만 지우면 RLS 가 막지만, 표 권한까지 거둬 두 겹으로 닫는다(RLS 가 꺼지는 사고가 나도 새지 않게).
REVOKE ALL ON public.inquiries FROM anon, authenticated;

-- API 의 중복·빈도 제한이 세는 쿼리용
CREATE INDEX IF NOT EXISTS inquiries_phone_created_at_idx ON public.inquiries (phone, created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON public.inquiries (created_at DESC);
