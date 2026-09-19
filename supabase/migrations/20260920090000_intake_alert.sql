-- 접수 이상 기록 키(crm_settings.intake_alert) — 2026-09-20 가온, 오픈 주간 P1-5·6
--
-- 왜 이 마이그레이션이 필요한가
--   · 견적 접수(/api/inquiry)에서 알림 문자가 실패해도·저장이 실패해도 console 에만 적었다. Vercel 로그는 요금제에 따라
--     1시간~1일이면 사라져, 형은 「문의가 없었다」와 「문의가 왔는데 몰랐다」를 가를 수 없었다.
--   · 이제 route 가 종류별(sms_fail·save_fail·over_cap) 건수·처음/마지막 시각·마지막 접수번호·확인 시각을 JSON 한 칸에 남기고,
--     관리자 「오늘」 빨간 배너·설정 「접수 이상」·아침 문자 「접수 이상 N건」이 읽는다(src/lib/inquiry/intake-core.ts).
--   · crm_settings 는 키 목록을 CHECK 로 못 박아 두었으므로(20260919120000 §7) 새 키를 목록에 더해야 쓸 수 있다.
--     이 파일은 그 제약만 갈아 끼운다. 표·권한·정책은 건드리지 않는다(REVOKE·RLS 는 20260919120000 그대로).
--   · 🔒 값에는 건수·시각·접수번호만 들어간다. 고객 이름·연락처·내용·DB 오류 원문은 넣지 않는다(코드가 넣을 자리를 안 만든다).
--
-- ⚠️ 적용 순서
--   1) 20260919120000_admin_crm_p1.sql 이 **먼저** 적용돼 있어야 한다(crm_settings 표가 있어야 한다).
--   2) 이 파일을 SQL 에디터에서 통째로 실행한다(에디터가 한 트랜잭션으로 돌린다 — 두 문장 중 하나만 남는 일이 없다).
--      다시 실행해도 같은 결과다(DROP IF EXISTS → ADD).
--   3) 코드는 이 파일보다 먼저 올라가도 깨지지 않는다: 기록 쓰기가 23514 로 실패하면 로그 한 줄만 남기고 넘어간다
--      (접수·문자는 그대로 돈다). 다만 그동안은 기록이 안 쌓인다 — 설정·「오늘」 화면이 주황 「아직 기록할 수 없음」
--      줄로 알린다(초록 「이상 없음」이 아니다). → 코드 배포와 같은 날, 오픈(09-21) 전에 적용한다.
--   ⚠️ 이 파일은 intake_alert 행을 '{}' 로 **심는다**(맨 아래 INSERT). 관리자 화면은 이 행이 있어야 「이상 없음」(초록)을 보이고,
--      없으면 「아직 기록할 수 없음」(주황)을 보인다 — 마이그레이션 전에 기록이 전부 실패하는데 화면이 초록으로 「괜찮다」고
--      말하던 구멍을 막는다. 행이 늘 있으므로 코드의 값 비교 쓰기는 insert 대신 update 길('{}' → 새 값)로 간다.
--   ⚠️ 그래서 20260919120000 을 **다시** 실행하면 **언제나** 실패한다: 그 파일의 키 목록(6개)으로 되돌아가려다 intake_alert 행 때문에
--      제약 추가가 23514 로 실패하고 그 파일 전체가 되돌려진다. 그 파일을 다시 돌려야 하면 **먼저** 그 파일의 키 목록에
--      'intake_alert' 를 더한다(또는 intake_alert 행을 잠시 지운다). 이어서 이 파일을 다시 실행한다(행은 다시 심긴다).
--
-- 적용 뒤 확인(SQL 에디터에서):
--   0) 행이 심겼는지 — 한 줄(value 는 '{}' 이거나 이미 쌓인 기록)
--        select key, value, updated_by from public.crm_settings where key = 'intake_alert';
--   1) 키 목록에 intake_alert 가 들어갔는지 — 한 줄, 7개 키가 보여야 한다
--        select conname, pg_get_constraintdef(oid) from pg_constraint
--         where conrelid = 'public.crm_settings'::regclass and contype = 'c';
--   2) 권한이 그대로인지 — 전부 false 여야 한다
--        select r, has_table_privilege(r, 'public.crm_settings', 'select')
--                  or has_table_privilege(r, 'public.crm_settings', 'insert')
--                  or has_table_privilege(r, 'public.crm_settings', 'update') as any_priv
--          from unnest(array['anon','authenticated']) r;

ALTER TABLE public.crm_settings DROP CONSTRAINT IF EXISTS crm_settings_key_check;
ALTER TABLE public.crm_settings ADD CONSTRAINT crm_settings_key_check
  CHECK (key IN (
    'purge_mode', 'purge_cap', 'purge_last_run', 'purge_selftest', 'digest_last', 'sessions_invalid_before',
    'intake_alert'
  ));

-- 빈 기록을 심는다 — 「기록 없음(쓸 수 없음)」과 「이상 없음」을 화면이 가를 수 있게. 이미 있으면(다시 실행·쌓인 기록) 그대로 둔다.
INSERT INTO public.crm_settings (key, value, updated_by) VALUES ('intake_alert', '{}', 'migration')
ON CONFLICT (key) DO NOTHING;
