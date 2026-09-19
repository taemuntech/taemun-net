-- 관리자 관리대장 P1b — 문의 상태 이력·다음 할 일·보관기간·자동 파기·관리자 세션·접속기록 — 2026-09-19 가온
--
-- 왜 이 마이그레이션이 필요한가
--   · 문의 상태를 바꿔도 「언제 누가 왜」가 남지 않았다 → 추가 전용 이력 표(inquiry_status_log)와, 상태 바꾸기를
--     한 트랜잭션으로 묶는 함수(inquiry_transition)를 둔다. 상태·보관 근거·이력이 따로 놀면 파기 대상이 틀어진다.
--   · 개인정보 처리방침에 「접수일부터 1년 보관 뒤 파기」라고 적어 놓고 실제로 지우는 장치가 없었다 → 행마다
--     보관 근거(retention_basis)와 보관 끝(retain_until)을 두고, 매일 00:10(KST) crm_purge_due 가 지난 행의
--     이름·연락처·내용을 지운다. 행 자체는 남긴다(접수번호·날짜·상태로 집계가 이어지게) — 그래서 이름 등 칸의
--     NOT NULL 을 풀고, 「파기 전에는 반드시 있어야 한다」는 CHECK 로 바꾼다.
--   · 기본은 **시험 모드(dry_run)** — 지우지 않고 대상만 purge_log 에 적는다. 형이 설정 화면에서 실행 모드로 바꿔야
--     실제로 지운다. 한 번에 오래된 것부터 50건(purge_cap)씩만 처리하고 나머지는 다음 실행으로 넘긴다(밀린 건이
--     며칠에 걸쳐 빠진다). 대상이 비정상적으로 많으면(max(한도×20, 1000)건 초과) 사고로 보고 아무 것도 지우지 않는다.
--   · 보관 규칙(계약=자동 파기 없음 / 그 밖=접수일+1년)은 **DB 트리거**(inquiries_status_retention)가 지킨다 —
--     상태를 어느 길로 바꾸든(옛 관리자 코드의 직접 UPDATE 포함) 보관 근거가 따라 바뀐다. 계약에서 되돌린 오래된
--     문의는 최소 7일 유예를 둔다(잘못 누른 것을 밤 파기 전에 되돌릴 수 있게).
--   · 아침 요약 문자(digest)는 하루 한 번만 — crm_claim_digest 가 보내기 **전에** 그날 몫을 원자적으로 차지한다
--     (동시에 두 번 불려도 한 번만 보낸다). 실패한 날은 다시 차지할 수 있다.
--   · 관리자 로그인이 서명 쿠키 하나뿐이라 「다른 기기 로그아웃」이 불가능했다 → admin_sessions 표. 누가 무엇을
--     봤는지 남기는 admin_access_log(개인정보 안전성 확보조치 기준의 접속기록). 둘 다 서버(service_role)만 쓴다.
--   · 이력·접속기록·파기기록은 **추가 전용**이다 — service_role 에게도 UPDATE/DELETE/TRUNCATE 권한을 주지 않고,
--     트리거로 한 겹 더 막는다. 예외는 단 하나: postgres 소유의 파기 함수가 crm.purge 플래그를 켠 동안
--     (이력 메모 지우기, 보관기간 지난 접속기록 삭제).
--
-- 권한 원칙(20260916120000 과 같다): 공개 키(anon)는 소스·번들에 있고 저장소가 공개라 비밀이 아니다.
--   Supabase 는 public 의 새 표·함수·시퀀스에 anon·authenticated·service_role 로 ALL 을 기본 부여하고,
--   Postgres 는 새 함수에 PUBLIC EXECUTE 를 준다 → 새 객체마다 PUBLIC·anon·authenticated 에서 명시적으로 회수한다.
--   RLS 는 켜고 정책은 만들지 않는다(= service_role 만 통과).
--
-- ⚠️ 적용 순서: **P1b 코드를 올리기 전에** 이 파일을 SQL 에디터에서 통째로 실행한다(스크립트 전체가 한
--    트랜잭션 — 어디서든 오류가 나면 전부 되돌아간다). 코드가 먼저 올라가면 새 칸·함수가 없어 관리자 화면이 깨진다.
--    옛 코드는 새 칸을 모르므로 이 마이그레이션을 먼저 적용해도 지금 운영은 그대로 돈다.
--
-- 적용 뒤 확인(SQL 에디터에서 하나씩):
--   1) 새 표 5개가 공개 키·로그인 키로 막혔는지 — 전부 false 여야 한다
--        select t, r, has_table_privilege(r, 'public.' || t, 'select')
--                  or has_table_privilege(r, 'public.' || t, 'insert')
--                  or has_table_privilege(r, 'public.' || t, 'update')
--                  or has_table_privilege(r, 'public.' || t, 'delete') as any_priv
--          from unnest(array['inquiry_status_log','admin_sessions','admin_access_log','purge_log','crm_settings']) t,
--               unnest(array['anon','authenticated']) r;
--   2) 함수 3개를 공개 키·로그인 키로 못 부르는지 — 전부 false
--        select f, r, has_function_privilege(r, f, 'execute')
--          from unnest(array['public.inquiry_transition(uuid,text,text,text,text,uuid)',
--                            'public.crm_purge_due(text,uuid)',
--                            'public.crm_claim_digest(text)']) f,
--               unnest(array['anon','authenticated']) r;
--   3) 자체 시험 결과 — purge_selftest 가 「ok 2026-…」 이어야 한다(「fail …」 이면 가온에게 그대로 보내 주세요)
--        select key, value from public.crm_settings order by key;
--      → purge_mode = dry_run, purge_cap = 50, purge_selftest = ok …
--   4) 매일 파기 예약 — 'taemun-crm-purge-due' | '10 15 * * *' 한 줄(UTC 15:10 = KST 00:10)
--        select jobname, schedule from cron.job;
--   5) 옛 문의에 보관 끝이 채워졌는지, 계약 상태인데 접수 보관으로 남은 행이 없는지 — 둘 다 0 이어야 한다
--        select (select count(*) from public.inquiries where retention_basis = 'inquiry' and retain_until is null) as no_until,
--               (select count(*) from public.inquiries where status = 'contracted' and retention_basis <> 'contract') as contract_mismatch;
-- 그리고 공개 키로 직접 찔러 본다(가온이 한다): POST /rest/v1/rpc/crm_purge_due → 401/403(42501)이어야 한다.

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 1. inquiries — 상태 정리·보관기간 칸·다음 할 일
-- ═══════════════════════════════════════════════════════════════════════════════════════════════

-- 1-1) 옛 행 정리: 상태가 비었거나 모르는 값이면 「접수」로, 접수 시각이 비었으면 지금으로.
--      (화면은 이미 빈 상태를 「접수」로 세어 왔다 — 값만 그 해석에 맞춘다)
UPDATE public.inquiries
   SET status = 'pending'
 WHERE status IS NULL
    OR status NOT IN ('pending', 'contacted', 'quoted', 'contracted', 'closed');

UPDATE public.inquiries SET created_at = now() WHERE created_at IS NULL;

ALTER TABLE public.inquiries ALTER COLUMN created_at SET NOT NULL;
ALTER TABLE public.inquiries ALTER COLUMN status SET DEFAULT 'pending';
ALTER TABLE public.inquiries ALTER COLUMN status SET NOT NULL;

-- 1-2) 새 칸
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS updated_at       TIMESTAMPTZ,                         -- 마지막으로 상태·할 일을 바꾼 때(멈춘 딜 계산)
  ADD COLUMN IF NOT EXISTS closed_reason    TEXT,                                -- 종료 사유(가격·시기·무응답·안 맞음·진행 완료)
  ADD COLUMN IF NOT EXISTS next_action      TEXT,                                -- 다음 할 일(짧은 글)
  ADD COLUMN IF NOT EXISTS next_action_due  DATE,                                -- 다음 할 일 날짜(KST 달력 날짜)
  ADD COLUMN IF NOT EXISTS retention_basis  TEXT NOT NULL DEFAULT 'inquiry',     -- inquiry=접수 1년 보관 / contract=계약(파기 대상 아님)
  ADD COLUMN IF NOT EXISTS retain_until     TIMESTAMPTZ,                         -- 이 시각이 지나면 파기 대상(inquiry 일 때만)
  ADD COLUMN IF NOT EXISTS purged_at        TIMESTAMPTZ;                         -- 개인정보를 지운 시각(행은 남는다)

COMMENT ON COLUMN public.inquiries.retention_basis IS 'inquiry=접수일부터 1년 보관 뒤 파기 / contract=계약 — 계약 문서 보관 근거로 자동 파기 대상이 아님';
COMMENT ON COLUMN public.inquiries.retain_until    IS 'retention_basis=inquiry 일 때 보관 끝. crm_purge_due 가 이 시각이 지난 행의 개인정보를 지운다';
COMMENT ON COLUMN public.inquiries.purged_at       IS '개인정보(이름·연락처·내용·다음 할 일)를 지운 시각. 행과 접수번호·상태는 집계용으로 남는다';

-- 1-3) 이름·연락처 등은 파기 뒤 비워야 하므로 NOT NULL 을 푼다. 대신 「파기 전에는 반드시 있다」를 CHECK 로 지킨다.
ALTER TABLE public.inquiries ALTER COLUMN client_name DROP NOT NULL;
ALTER TABLE public.inquiries ALTER COLUMN phone       DROP NOT NULL;
ALTER TABLE public.inquiries ALTER COLUMN services    DROP NOT NULL;
ALTER TABLE public.inquiries ALTER COLUMN budget      DROP NOT NULL;
ALTER TABLE public.inquiries ALTER COLUMN timeline    DROP NOT NULL;

ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_pii_until_purged_chk;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_pii_until_purged_chk CHECK (
  purged_at IS NOT NULL
  OR (client_name IS NOT NULL AND phone IS NOT NULL AND services IS NOT NULL AND budget IS NOT NULL AND timeline IS NOT NULL)
);

ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_status_chk;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_status_chk
  CHECK (status IN ('pending', 'contacted', 'quoted', 'contracted', 'closed'));

ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_closed_reason_chk;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_closed_reason_chk
  CHECK (closed_reason IS NULL OR closed_reason IN ('price', 'timing', 'no_response', 'not_fit', 'completed'));

ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_retention_basis_chk;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_retention_basis_chk
  CHECK (retention_basis IN ('inquiry', 'contract'));

ALTER TABLE public.inquiries DROP CONSTRAINT IF EXISTS inquiries_next_action_len_chk;
ALTER TABLE public.inquiries ADD CONSTRAINT inquiries_next_action_len_chk
  CHECK (next_action IS NULL OR char_length(next_action) <= 200);

-- 1-4) 보관 근거 채우기: 계약된 행은 계약 보관(자동 파기 없음), 나머지는 접수일 + 1년.
UPDATE public.inquiries
   SET retention_basis = 'contract', retain_until = NULL
 WHERE status = 'contracted';

UPDATE public.inquiries
   SET retain_until = created_at + interval '1 year'
 WHERE retention_basis = 'inquiry' AND retain_until IS NULL;

-- 1-5) 새 문의는 저장 순간 보관 끝이 정해진다(API 가 칸을 몰라도 빠지지 않게 DB 가 채운다).
CREATE OR REPLACE FUNCTION public.inquiries_set_retention()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.created_at IS NULL THEN
    NEW.created_at := now();
  END IF;
  IF NEW.retention_basis IS NULL THEN
    NEW.retention_basis := 'inquiry';
  END IF;
  IF NEW.retention_basis = 'inquiry' AND NEW.retain_until IS NULL THEN
    NEW.retain_until := NEW.created_at + interval '1 year';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS inquiries_set_retention ON public.inquiries;
CREATE TRIGGER inquiries_set_retention
  BEFORE INSERT ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.inquiries_set_retention();

-- 1-5b) 상태가 바뀌면 보관 근거도 DB 가 바꾼다 — 보관 규칙의 **유일한 정본**. inquiry_transition 도, 옛 관리자 코드의
--       직접 UPDATE 도, 앞으로의 어떤 service_role 쓰기도 이 규칙을 비껴갈 수 없다.
--       · → 계약(contracted): 계약 보관(자동 파기 없음), 보관 끝 없음
--       · 계약 보관이던 행 → 접수·연락함·견적 보냄: 접수 보관으로, 보관 끝 = max(접수일+1년, 지금+7일)
--         (1년 지난 문의를 잘못 되돌려도 그날 밤 바로 지워지지 않게 7일 유예 — 그 사이 다시 계약으로 돌리면 된다)
--       · 그 밖 → 접수·연락함·견적 보냄: 보관 끝이 있으면 그대로, 없으면 접수일+1년
--       · → 종료(closed): 그대로(계약 뒤 종료면 계약 보관, 접수 보관이면 접수 보관)
CREATE OR REPLACE FUNCTION public.inquiries_status_retention()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NEW.status IS NOT DISTINCT FROM OLD.status THEN
    RETURN NEW;
  END IF;
  IF NEW.status = 'contracted' THEN
    NEW.retention_basis := 'contract';
    NEW.retain_until    := NULL;
  ELSIF NEW.status IN ('pending', 'contacted', 'quoted') THEN
    IF OLD.retention_basis = 'contract' THEN
      NEW.retention_basis := 'inquiry';
      NEW.retain_until    := greatest(NEW.created_at + interval '1 year', now() + interval '7 days');
    ELSE
      NEW.retention_basis := 'inquiry';
      NEW.retain_until    := coalesce(OLD.retain_until, NEW.created_at + interval '1 year');
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS inquiries_status_retention ON public.inquiries;
CREATE TRIGGER inquiries_status_retention
  BEFORE UPDATE OF status ON public.inquiries
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION public.inquiries_status_retention();

-- 1-6) 색인: 「오늘」 화면(다음 할 일 날짜순), 파기 대상 찾기, 상태 탭 목록.
CREATE INDEX IF NOT EXISTS inquiries_next_action_due_idx
  ON public.inquiries (next_action_due)
  WHERE purged_at IS NULL AND next_action_due IS NOT NULL;
CREATE INDEX IF NOT EXISTS inquiries_retain_until_idx
  ON public.inquiries (retain_until)
  WHERE purged_at IS NULL AND retention_basis = 'inquiry';
CREATE INDEX IF NOT EXISTS inquiries_status_created_idx
  ON public.inquiries (status, created_at DESC);

-- 1-7) 앞선 마이그레이션은 anon·authenticated 만 회수하고 PUBLIC 은 회수하지 않았다 — 여기서 닫는다.
REVOKE ALL ON public.inquiries, public.inquiry_events FROM PUBLIC;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 2. inquiry_status_log — 상태 이력(추가 전용). FK 는 일부러 없다(문의 행 정리와 이력 보존을 서로 묶지 않는다).
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.inquiry_status_log (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  inquiry_id    UUID NOT NULL,
  from_status   TEXT,
  to_status     TEXT NOT NULL,
  closed_reason TEXT,
  note          TEXT CHECK (char_length(note) <= 300),        -- 파기 때 지워진다(자유 글이라 개인정보가 섞일 수 있다)
  actor         TEXT NOT NULL CHECK (char_length(actor) <= 40),
  session_id    UUID,
  at            TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS inquiry_status_log_inquiry_at_idx ON public.inquiry_status_log (inquiry_id, at DESC);
COMMENT ON TABLE public.inquiry_status_log IS '문의 상태 이력(추가 전용). 수정·삭제는 파기 함수만 — note 비우기';

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 4. admin_sessions — 로그인한 기기. 쿠키에 담긴 sid 가 여기 없거나 해제되면 개인정보 화면이 막힌다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.admin_sessions (
  id             UUID PRIMARY KEY,
  actor          TEXT NOT NULL DEFAULT 'owner',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen_at   TIMESTAMPTZ,
  expires_at     TIMESTAMPTZ NOT NULL,
  revoked_at     TIMESTAMPTZ,
  revoked_reason TEXT CHECK (char_length(revoked_reason) <= 100),
  ip             TEXT CHECK (char_length(ip) <= 64),
  ua             TEXT CHECK (char_length(ua) <= 300)
);
COMMENT ON TABLE public.admin_sessions IS '관리자 로그인 기기. 만료·해제 뒤 90일이 지나면 crm_purge_due 가 지운다';

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 5. admin_access_log — 접속기록(추가 전용). 로그인류 3년, 나머지 2년 보관 뒤 파기 함수가 지운다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.admin_access_log (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor       TEXT NOT NULL,
  session_id  UUID,
  ip          TEXT CHECK (char_length(ip) <= 64),
  ua          TEXT CHECK (char_length(ua) <= 300),
  method      TEXT CHECK (char_length(method) <= 10),
  route       TEXT CHECK (char_length(route) <= 200),
  action      TEXT NOT NULL CHECK (action IN ('view', 'update', 'login', 'login_fail', 'logout', 'session_revoke', 'setting', 'purge_run', 'export')),
  resource    TEXT CHECK (char_length(resource) <= 60),
  resource_id TEXT CHECK (char_length(resource_id) <= 100),
  subject_ids UUID[],
  detail      TEXT CHECK (char_length(detail) <= 300),
  outcome     TEXT NOT NULL DEFAULT 'ok' CHECK (outcome IN ('ok', 'denied', 'error'))
);
CREATE INDEX IF NOT EXISTS admin_access_log_at_idx ON public.admin_access_log (at DESC);
COMMENT ON TABLE public.admin_access_log IS '관리자 접속기록(추가 전용). 로그인류 3년·그 밖 2년 뒤 crm_purge_due 가 지운다';

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 6. purge_log — 파기 실행 기록(추가 전용). 시험 모드에서도 「무엇을 지웠을지」가 남는다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.purge_log (
  id        BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  run_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  mode      TEXT CHECK (mode IN ('dry_run', 'live')),
  trigger   TEXT CHECK (trigger IN ('schedule', 'manual', 'selftest')),
  target    TEXT CHECK (target IN ('inquiry', 'access_log', 'session')),
  row_count INT NOT NULL DEFAULT 0,
  ids       UUID[],
  outcome   TEXT NOT NULL DEFAULT 'ok' CHECK (outcome IN ('ok', 'refused_over_cap', 'error')),
  note      TEXT CHECK (char_length(note) <= 300)
);
COMMENT ON TABLE public.purge_log IS '파기 실행 기록(추가 전용). ids 는 문의 id — 이름·연락처는 넣지 않는다';

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 7. crm_settings — 파기 모드 등 몇 개 안 되는 설정. 키를 CHECK 로 못 박는다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
--    sessions_invalid_before: 「이 기기 말고 모두 로그아웃」 시각(ISO). 이보다 먼저 발급된 **sid 없는** 옛 쿠키를 끊는다.
CREATE TABLE IF NOT EXISTS public.crm_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by TEXT NOT NULL
);
-- 키 목록은 이름 붙은 제약으로 둔다 — 다시 실행하면 새 목록으로 갈아 끼운다(표가 이미 있어도).
ALTER TABLE public.crm_settings DROP CONSTRAINT IF EXISTS crm_settings_key_check;
ALTER TABLE public.crm_settings ADD CONSTRAINT crm_settings_key_check
  CHECK (key IN ('purge_mode', 'purge_cap', 'purge_last_run', 'purge_selftest', 'digest_last', 'sessions_invalid_before'));

INSERT INTO public.crm_settings (key, value, updated_by) VALUES
  ('purge_mode', 'dry_run', 'migration'),
  ('purge_cap',  '50',      'migration')
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 8. 추가 전용 지킴이 — 이력·접속기록·파기기록 3표의 UPDATE·DELETE·TRUNCATE 를 막는다.
--    통과 조건은 둘 다: crm.purge 플래그(파기 함수가 트랜잭션 안에서만 켠다) AND 현재 사용자가 postgres
--    (파기 함수가 postgres 소유 SECURITY DEFINER 라 그 안에서만 참). service_role 이 플래그를 켜도 못 지나간다.
--    이 함수는 일부러 SECURITY DEFINER 가 아니다 — current_user 가 호출한 쪽 그대로여야 한다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.crm_append_only_guard()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  IF coalesce(current_setting('crm.purge', true), '') = 'on' AND current_user = 'postgres' THEN
    IF TG_LEVEL = 'STATEMENT' THEN
      RETURN NULL;
    ELSIF TG_OP = 'DELETE' THEN
      RETURN OLD;
    ELSE
      RETURN NEW;
    END IF;
  END IF;
  RAISE EXCEPTION USING
    ERRCODE = '42501',
    MESSAGE = format('%s 는 추가 전용입니다 (%s 불가)', TG_TABLE_NAME, TG_OP);
END;
$$;

DROP TRIGGER IF EXISTS inquiry_status_log_append_only ON public.inquiry_status_log;
CREATE TRIGGER inquiry_status_log_append_only
  BEFORE UPDATE OR DELETE ON public.inquiry_status_log
  FOR EACH ROW EXECUTE FUNCTION public.crm_append_only_guard();
DROP TRIGGER IF EXISTS inquiry_status_log_no_truncate ON public.inquiry_status_log;
CREATE TRIGGER inquiry_status_log_no_truncate
  BEFORE TRUNCATE ON public.inquiry_status_log
  FOR EACH STATEMENT EXECUTE FUNCTION public.crm_append_only_guard();

DROP TRIGGER IF EXISTS admin_access_log_append_only ON public.admin_access_log;
CREATE TRIGGER admin_access_log_append_only
  BEFORE UPDATE OR DELETE ON public.admin_access_log
  FOR EACH ROW EXECUTE FUNCTION public.crm_append_only_guard();
DROP TRIGGER IF EXISTS admin_access_log_no_truncate ON public.admin_access_log;
CREATE TRIGGER admin_access_log_no_truncate
  BEFORE TRUNCATE ON public.admin_access_log
  FOR EACH STATEMENT EXECUTE FUNCTION public.crm_append_only_guard();

DROP TRIGGER IF EXISTS purge_log_append_only ON public.purge_log;
CREATE TRIGGER purge_log_append_only
  BEFORE UPDATE OR DELETE ON public.purge_log
  FOR EACH ROW EXECUTE FUNCTION public.crm_append_only_guard();
DROP TRIGGER IF EXISTS purge_log_no_truncate ON public.purge_log;
CREATE TRIGGER purge_log_no_truncate
  BEFORE TRUNCATE ON public.purge_log
  FOR EACH STATEMENT EXECUTE FUNCTION public.crm_append_only_guard();

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 3. inquiry_transition — 상태 바꾸기 + 이력을 한 번에(행 잠금). SECURITY INVOKER: service_role 권한으로 돈다.
--    보관 근거·보관 끝은 여기서 계산하지 않는다 — 상태 UPDATE 가 트리거(1-5b)를 부르고, 그게 유일한 정본이다.
--    오류 코드(서버 crm-store 가 이걸로 갈라 읽는다): 22023 잘못된 값 · P0002 없는 문의 · 55000 이미 파기됨.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.inquiry_transition(
  p_id            UUID,
  p_to            TEXT,
  p_closed_reason TEXT,
  p_note          TEXT,
  p_actor         TEXT,
  p_session       UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_row public.inquiries%ROWTYPE;
BEGIN
  IF p_to IS NULL OR p_to NOT IN ('pending', 'contacted', 'quoted', 'contracted', 'closed') THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = format('알 수 없는 상태입니다: %s', coalesce(p_to, '(없음)'));
  END IF;
  IF p_actor IS NULL OR char_length(p_actor) = 0 OR char_length(p_actor) > 40 THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = '처리자(actor)가 비었거나 너무 깁니다';
  END IF;
  IF p_note IS NOT NULL AND char_length(p_note) > 300 THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = '메모는 300자까지입니다';
  END IF;

  SELECT * INTO v_row FROM public.inquiries WHERE id = p_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION USING ERRCODE = 'P0002', MESSAGE = '그 문의를 찾지 못했습니다';
  END IF;
  IF v_row.purged_at IS NOT NULL THEN
    RAISE EXCEPTION USING ERRCODE = '55000', MESSAGE = '보관 기간이 지나 파기된 문의입니다';
  END IF;

  IF p_to = 'closed' THEN
    IF p_closed_reason IS NULL OR p_closed_reason NOT IN ('price', 'timing', 'no_response', 'not_fit', 'completed') THEN
      RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = '종료 사유가 필요합니다';
    END IF;
    IF p_closed_reason = 'completed' AND v_row.retention_basis <> 'contract' THEN
      RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = '「진행 완료」는 계약한 문의에만 쓸 수 있습니다';
    END IF;
  END IF;

  -- 같은 상태(종료면 같은 사유까지)면 아무 것도 하지 않는다 — 이력도 남기지 않는다.
  IF v_row.status = p_to AND (p_to <> 'closed' OR v_row.closed_reason IS NOT DISTINCT FROM p_closed_reason) THEN
    RETURN jsonb_build_object('changed', false, 'from', v_row.status, 'to', p_to);
  END IF;

  -- 「진행 완료」 판정(위)은 바꾸기 **전** 행의 보관 근거를 읽는다. 보관 근거는 아래 UPDATE 의 트리거가 바꾼다.
  UPDATE public.inquiries
     SET status        = p_to,
         closed_reason = CASE WHEN p_to = 'closed' THEN p_closed_reason ELSE NULL END,
         updated_at    = now()
   WHERE id = p_id;

  INSERT INTO public.inquiry_status_log (inquiry_id, from_status, to_status, closed_reason, note, actor, session_id)
  VALUES (p_id, v_row.status, p_to, CASE WHEN p_to = 'closed' THEN p_closed_reason ELSE NULL END, p_note, p_actor, p_session);

  RETURN jsonb_build_object('changed', true, 'from', v_row.status, 'to', p_to);
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 9. crm_purge_due — 매일 한 번(pg_cron). postgres 소유 SECURITY DEFINER.
--    · 모드: crm_settings.purge_mode — 'live' 가 아니면 전부 시험(dry_run). 한도: purge_cap(잘못된 값이면 50).
--    · 한도는 **한 번에 처리할 양**이다 — 보관 끝이 오래된 것부터 한도만큼 처리하고, 나머지는 다음 실행이 이어 받는다
--      (시험 모드로 몇 주 두었거나, 스팸이 몰린 날이 1년 뒤 한꺼번에 만료돼도 며칠에 걸쳐 빠진다).
--    · 비상 제동: 대상이 max(한도×20, 1000)건을 넘으면 설정·시계 사고로 보고 아무 것도 지우지 않고 refused_over_cap 만 적는다.
--    · 계약 상태(contracted) 행은 보관 근거와 무관하게 대상에서 뺀다(트리거 1-5b 의 이중 안전장치).
--    · p_only 는 **마이그레이션 자체 시험 전용** — 넣으면 그 id 한 건만 대상으로 본다(진짜 문의를 건드리지 않게).
--      실제 호출(예약·수동)은 넘기지 않는다. selftest 가 아닌 호출에서 p_only 를 넘기면 거절한다.
--    · 접속기록 보관기간 정리·오래된 세션 삭제는 모드와 무관하게 돈다(고객 개인정보가 아니다).
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.crm_purge_due(p_trigger TEXT DEFAULT 'schedule', p_only UUID DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_mode_txt TEXT;
  v_cap_txt  TEXT;
  v_mode     TEXT := 'dry_run';
  v_cap      INT  := 50;
  v_total    INT  := 0;
  v_ids      UUID[] := '{}';
  v_purged   INT  := 0;
  v_refused  BOOLEAN := false;
  v_brake    INT;
  v_batch    TEXT := NULL;
  v_al       INT  := 0;
  v_sess     INT  := 0;
BEGIN
  IF p_trigger IS NULL OR p_trigger NOT IN ('schedule', 'manual', 'selftest') THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = format('알 수 없는 실행 구분입니다: %s', coalesce(p_trigger, '(없음)'));
  END IF;
  IF p_only IS NOT NULL AND p_trigger <> 'selftest' THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = 'p_only 는 자체 시험 전용입니다';
  END IF;

  -- 두 실행이 겹치지 않게(예약 + 수동이 같은 순간에 도는 경우)
  PERFORM pg_advisory_xact_lock(hashtext('public.crm_purge_due'));

  SELECT value INTO v_mode_txt FROM public.crm_settings WHERE key = 'purge_mode';
  IF v_mode_txt = 'live' THEN
    v_mode := 'live';
  END IF;

  SELECT value INTO v_cap_txt FROM public.crm_settings WHERE key = 'purge_cap';
  IF v_cap_txt IS NOT NULL AND v_cap_txt ~ '^[0-9]{1,6}$' THEN
    IF v_cap_txt::INT >= 1 THEN
      v_cap := v_cap_txt::INT;
    END IF;
  END IF;

  v_brake := greatest(v_cap * 20, 1000);

  -- ── 문의 개인정보 파기 ──
  SELECT count(*)::INT INTO v_total
    FROM public.inquiries
   WHERE purged_at IS NULL
     AND retention_basis = 'inquiry'
     AND status <> 'contracted'
     AND retain_until < now()
     AND (p_only IS NULL OR id = p_only);

  IF v_total > v_brake THEN
    v_refused := true;
    INSERT INTO public.purge_log (mode, trigger, target, row_count, ids, outcome, note)
    VALUES (v_mode, p_trigger, 'inquiry', v_total, NULL, 'refused_over_cap',
            format('대상 %s건이 비상 제동선 %s건(한도 %s건×20, 최소 1000건)을 넘어 아무 것도 지우지 않았습니다',
                   v_total, v_brake, v_cap));
  ELSIF v_total > 0 THEN
    IF v_total > v_cap THEN
      v_batch := format('대상 %s건 중 오래된 %s건만 처리 — 나머지는 다음 실행', v_total, v_cap);
    END IF;

    SELECT coalesce(array_agg(s.id ORDER BY s.retain_until, s.id), '{}')
      INTO v_ids
      FROM (
        SELECT id, retain_until
          FROM public.inquiries
         WHERE purged_at IS NULL
           AND retention_basis = 'inquiry'
           AND status <> 'contracted'
           AND retain_until < now()
           AND (p_only IS NULL OR id = p_only)
         ORDER BY retain_until, id
         LIMIT v_cap
           FOR UPDATE
      ) s;

    IF v_mode = 'live' THEN
      PERFORM set_config('crm.purge', 'on', true);

      UPDATE public.inquiries
         SET client_name     = NULL,
             phone           = NULL,
             email           = NULL,
             details         = NULL,
             reference_url   = NULL,
             services        = NULL,
             budget          = NULL,
             timeline        = NULL,
             next_action     = NULL,
             next_action_due = NULL,
             purged_at       = now(),
             updated_at      = now()
       WHERE id = ANY (v_ids)
         AND purged_at IS NULL;
      GET DIAGNOSTICS v_purged = ROW_COUNT;

      UPDATE public.inquiry_status_log
         SET note = NULL
       WHERE inquiry_id = ANY (v_ids)
         AND note IS NOT NULL;

      PERFORM set_config('crm.purge', 'off', true);

      INSERT INTO public.purge_log (mode, trigger, target, row_count, ids, outcome, note)
      VALUES ('live', p_trigger, 'inquiry', v_purged, v_ids, 'ok', v_batch);
    ELSE
      INSERT INTO public.purge_log (mode, trigger, target, row_count, ids, outcome, note)
      VALUES ('dry_run', p_trigger, 'inquiry', coalesce(array_length(v_ids, 1), 0), v_ids, 'ok',
              '시험 모드 — 지우지 않고 대상만 기록했습니다' || coalesce(' · ' || v_batch, ''));
    END IF;
  END IF;

  -- ── 접속기록 보관기간 정리(로그인류 3년·그 밖 2년). 모드와 무관 ──
  PERFORM set_config('crm.purge', 'on', true);
  DELETE FROM public.admin_access_log
   WHERE (action IN ('login', 'login_fail', 'logout', 'session_revoke', 'setting') AND at < now() - interval '3 years')
      OR (action NOT IN ('login', 'login_fail', 'logout', 'session_revoke', 'setting') AND at < now() - interval '2 years');
  GET DIAGNOSTICS v_al = ROW_COUNT;
  PERFORM set_config('crm.purge', 'off', true);

  IF v_al > 0 THEN
    INSERT INTO public.purge_log (mode, trigger, target, row_count, ids, outcome, note)
    VALUES ('live', p_trigger, 'access_log', v_al, NULL, 'ok', '보관기간 지난 접속기록 삭제(파기 모드와 무관)');
  END IF;

  -- ── 만료·해제 뒤 90일 지난 로그인 기기 ──
  DELETE FROM public.admin_sessions
   WHERE expires_at < now() - interval '90 days'
      OR revoked_at < now() - interval '90 days';
  GET DIAGNOSTICS v_sess = ROW_COUNT;

  IF v_sess > 0 THEN
    INSERT INTO public.purge_log (mode, trigger, target, row_count, ids, outcome, note)
    VALUES ('live', p_trigger, 'session', v_sess, NULL, 'ok', '만료·해제 뒤 90일 지난 로그인 기기 삭제(파기 모드와 무관)');
  END IF;

  INSERT INTO public.crm_settings (key, value, updated_at, updated_by)
  VALUES ('purge_last_run', to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), now(), p_trigger)
  ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at, updated_by = EXCLUDED.updated_by;

  RETURN jsonb_build_object(
    'mode', v_mode,
    'candidates', v_total,
    'purged', v_purged,
    'refused', v_refused,
    'remaining', CASE WHEN v_refused THEN v_total ELSE greatest(v_total - v_cap, 0) END,
    'access_log_deleted', v_al,
    'sessions_deleted', v_sess
  );
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 9b. crm_claim_digest — 아침 요약 문자의 그날 몫을 **보내기 전에** 원자적으로 차지한다. SECURITY INVOKER(service_role).
--     digest_last 를 「보내는 중」 기록으로 바꾸는 데 성공하면 true(= 이 호출이 보낸다), 아니면 false(= 건너뛴다).
--     차지할 수 있는 경우: 기록이 없다 · JSON 이 아니다 · 날짜가 다르다 ·
--       같은 날이지만 보내지 못했고(sent 가 true 아님) 건너뛴 것도 아니며(skipped 가 비었음)
--       「보내는 중」이 아니거나 「보내는 중」이 10분 넘게 멈춰 있다(그 실행이 죽은 것으로 본다).
--     행 잠금(FOR UPDATE) 뒤에 판정하므로 동시에 두 번 불려도 하나만 true 다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.crm_claim_digest(p_date TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_value   TEXT;
  v_at      TIMESTAMPTZ;
  v_json    JSONB;
  v_claim   TEXT;
  v_n       INT;
BEGIN
  IF p_date IS NULL OR p_date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN
    RAISE EXCEPTION USING ERRCODE = '22023', MESSAGE = format('날짜 형식이 아닙니다: %s', coalesce(p_date, '(없음)'));
  END IF;

  v_claim := jsonb_build_object(
    'date', p_date, 'state', 'sending', 'sent', false, 'skipped', NULL, 'error', NULL, 'summary', '',
    'at', to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')
  )::TEXT;

  LOOP
    SELECT value, updated_at INTO v_value, v_at
      FROM public.crm_settings
     WHERE key = 'digest_last'
       FOR UPDATE;

    IF NOT FOUND THEN
      INSERT INTO public.crm_settings (key, value, updated_at, updated_by)
      VALUES ('digest_last', v_claim, now(), 'cron')
      ON CONFLICT (key) DO NOTHING;
      GET DIAGNOSTICS v_n = ROW_COUNT;
      IF v_n = 1 THEN
        RETURN true;
      END IF;
      CONTINUE;   -- 같은 순간 다른 실행이 먼저 넣었다 — 잠그고 다시 판정
    END IF;

    BEGIN
      v_json := v_value::JSONB;
      IF jsonb_typeof(v_json) <> 'object' THEN
        v_json := NULL;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_json := NULL;   -- JSON 이 아닌 값은 차지할 수 있는 것으로 본다
    END;

    IF v_json IS NOT NULL
       AND (v_json ->> 'date') IS NOT DISTINCT FROM p_date
       AND (
            (v_json -> 'sent') = 'true'::JSONB
         OR coalesce(jsonb_typeof(v_json -> 'skipped'), 'null') <> 'null'
         OR ((v_json ->> 'state') IS NOT DISTINCT FROM 'sending' AND v_at >= now() - interval '10 minutes')
       ) THEN
      RETURN false;
    END IF;

    UPDATE public.crm_settings
       SET value = v_claim, updated_at = now(), updated_by = 'cron'
     WHERE key = 'digest_last';
    RETURN true;
  END LOOP;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 10. 권한 — RLS 켜고 정책 없음. PUBLIC·anon·authenticated 전부 회수, service_role 은 필요한 만큼만.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
ALTER TABLE public.inquiry_status_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_access_log   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purge_log          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_settings       ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.inquiry_status_log, public.admin_sessions, public.admin_access_log, public.purge_log, public.crm_settings
  FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SEQUENCE public.inquiry_status_log_id_seq, public.admin_access_log_id_seq, public.purge_log_id_seq
  FROM PUBLIC, anon, authenticated;

-- 추가 전용 3표: service_role 은 읽기·추가만. (기본 부여된 ALL 을 먼저 거둔 뒤 둘만 다시 준다 —
-- UPDATE·DELETE·TRUNCATE 뿐 아니라 REFERENCES·TRIGGER 등도 필요 없다)
REVOKE ALL ON public.inquiry_status_log, public.admin_access_log, public.purge_log FROM service_role;
GRANT SELECT, INSERT ON public.inquiry_status_log, public.admin_access_log, public.purge_log TO service_role;
REVOKE ALL ON SEQUENCE public.inquiry_status_log_id_seq, public.admin_access_log_id_seq, public.purge_log_id_seq FROM service_role;
GRANT USAGE, SELECT ON SEQUENCE public.inquiry_status_log_id_seq, public.admin_access_log_id_seq, public.purge_log_id_seq TO service_role;

REVOKE ALL ON public.admin_sessions FROM service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_sessions TO service_role;

REVOKE ALL ON public.crm_settings FROM service_role;
GRANT SELECT, INSERT, UPDATE ON public.crm_settings TO service_role;

REVOKE ALL ON FUNCTION public.inquiry_transition(UUID, TEXT, TEXT, TEXT, TEXT, UUID) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.inquiry_transition(UUID, TEXT, TEXT, TEXT, TEXT, UUID) TO service_role;

REVOKE ALL ON FUNCTION public.crm_purge_due(TEXT, UUID) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.crm_purge_due(TEXT, UUID) TO service_role;

REVOKE ALL ON FUNCTION public.crm_claim_digest(TEXT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.crm_claim_digest(TEXT) TO service_role;

REVOKE ALL ON FUNCTION public.crm_append_only_guard()      FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.inquiries_set_retention()    FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.inquiries_status_retention() FROM PUBLIC, anon, authenticated;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 11. 자체 시험 — 적용하는 그 순간 운영 DB 에서 파기가 정말 되는지 확인하고, 흔적 없이 되돌린다.
--     · 가짜 문의 1건(SELFTEST, 접수 400일 전)만 대상으로(p_only) 실행 모드 파기를 돌려 개인정보가 비는지 본다.
--       진짜 문의는 p_only 때문에 대상에 들어가지 않는다 — 그리고 어차피 아래 블록은 통째로 되돌린다.
--     · 플래그 없이 이력을 고치면 막히는지 본다.
--     · 끝에서 crm_selftest_ok 를 일부러 던져 블록(하위 트랜잭션) 전체를 되돌린다.
--     · 그 밖의 오류는 마이그레이션을 멈추지 않고 NOTICE + 결과 기록(purge_selftest = fail …)으로 남긴다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
DO $selftest$
DECLARE
  v_id      UUID := gen_random_uuid();
  v_res     JSONB;
  v_row     public.inquiries%ROWTYPE;
  v_note    TEXT;
  v_state   TEXT;
  v_msg     TEXT;
  v_result  TEXT;
BEGIN
  BEGIN
    INSERT INTO public.crm_settings (key, value, updated_by) VALUES ('purge_mode', 'live', 'selftest')
    ON CONFLICT (key) DO UPDATE SET value = 'live', updated_at = now(), updated_by = 'selftest';

    INSERT INTO public.inquiries (id, client_name, phone, email, services, budget, timeline, reference_url, details,
                                  status, created_at, next_action, next_action_due)
    VALUES (v_id, 'SELFTEST', '000-0000-0000', 'selftest@example.invalid', ARRAY['SELFTEST'], 'SELFTEST', 'SELFTEST',
            'https://example.invalid/selftest', 'SELFTEST', 'pending', now() - interval '400 days',
            'SELFTEST', current_date);

    INSERT INTO public.inquiry_status_log (inquiry_id, from_status, to_status, note, actor)
    VALUES (v_id, NULL, 'pending', 'SELFTEST', 'migration');

    SELECT * INTO v_row FROM public.inquiries WHERE id = v_id;
    IF v_row.retain_until IS NULL OR v_row.retain_until >= now() THEN
      RAISE EXCEPTION 'selftest: 보관 끝이 채워지지 않았습니다 (retain_until=%)', v_row.retain_until;
    END IF;

    v_res := public.crm_purge_due('selftest', v_id);
    IF (v_res ->> 'mode') <> 'live' OR (v_res ->> 'purged')::INT <> 1 OR (v_res ->> 'candidates')::INT <> 1 THEN
      RAISE EXCEPTION 'selftest: 파기 결과가 이상합니다 (%)', v_res;
    END IF;

    SELECT * INTO v_row FROM public.inquiries WHERE id = v_id;
    IF v_row.purged_at IS NULL
       OR v_row.client_name IS NOT NULL OR v_row.phone IS NOT NULL OR v_row.email IS NOT NULL
       OR v_row.details IS NOT NULL OR v_row.reference_url IS NOT NULL OR v_row.services IS NOT NULL
       OR v_row.budget IS NOT NULL OR v_row.timeline IS NOT NULL
       OR v_row.next_action IS NOT NULL OR v_row.next_action_due IS NOT NULL THEN
      RAISE EXCEPTION 'selftest: 개인정보가 지워지지 않았습니다';
    END IF;

    SELECT note INTO v_note FROM public.inquiry_status_log WHERE inquiry_id = v_id;
    IF v_note IS NOT NULL THEN
      RAISE EXCEPTION 'selftest: 이력 메모가 지워지지 않았습니다';
    END IF;

    -- 플래그 없이 이력 고치기 → 42501 이어야 한다
    BEGIN
      UPDATE public.inquiry_status_log SET note = 'x' WHERE inquiry_id = v_id;
      RAISE EXCEPTION 'selftest: 추가 전용 지킴이가 이력 수정을 막지 않았습니다';
    EXCEPTION WHEN insufficient_privilege THEN
      NULL;
    END;

    RAISE EXCEPTION 'crm_selftest_ok';
  EXCEPTION WHEN OTHERS THEN
    GET STACKED DIAGNOSTICS v_state = RETURNED_SQLSTATE, v_msg = MESSAGE_TEXT;
    IF v_msg = 'crm_selftest_ok' THEN
      v_result := 'ok ' || to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"');
    ELSE
      RAISE NOTICE 'crm 자체 시험 실패: % %', v_state, v_msg;
      v_result := left('fail ' || v_state || ' ' || v_msg, 500);
    END IF;
  END;

  INSERT INTO public.crm_settings (key, value, updated_at, updated_by)
  VALUES ('purge_selftest', v_result, now(), 'migration')
  ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at, updated_by = EXCLUDED.updated_by;
END;
$selftest$;

-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- 12. 매일 00:10(KST) 파기 실행 예약. pg_cron 은 UTC 로 돈다 → '10 15 * * *'.
--     같은 이름으로 다시 실행하면 새로 만들지 않고 덮어쓴다.
-- ═══════════════════════════════════════════════════════════════════════════════════════════════
-- ▼ pg_cron
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;
SELECT cron.schedule('taemun-crm-purge-due', '10 15 * * *', $$select public.crm_purge_due('schedule');$$);
-- ▲ pg_cron
