-- 작업물 공개 상태 표 (taemun.net 관리자 페이지)
--
-- 이 저장소의 공개 키(NEXT_PUBLIC_SUPABASE_ANON_KEY)는 소스에 박혀 있고 저장소가 공개다.
-- 그래서 「키가 비밀이라 안전하다」는 전제를 쓰지 않는다 — 아래 표는 anon·authenticated 에게서
-- 권한을 회수하고 정책을 하나도 만들지 않는다(= 서버의 service_role 만 통과).
-- 적용 후 반드시 공개 키로 직접 찔러 막혔는지 확인할 것(대시보드는 관리자 권한이라 확인이 안 된다).

-- 1) 상태 표 — 작업물 1개 = 1행. 행이 없으면 코드가 기본값을 쓴다(제안 시안은 링크 전용, 나머지는 공개).
CREATE TABLE IF NOT EXISTS public.portfolio_state (
  slug        TEXT PRIMARY KEY,
  status      TEXT NOT NULL CHECK (status IN ('public', 'unlisted', 'private')),
  sort_order  INTEGER,
  featured    BOOLEAN,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by  TEXT NOT NULL DEFAULT 'admin'
);

COMMENT ON TABLE public.portfolio_state IS '작업물 공개 상태. 행이 없으면 코드 기본값(kind=proposal 은 unlisted, 그 외 public).';
COMMENT ON COLUMN public.portfolio_state.status IS 'public=목록·링크 모두 / unlisted=링크만 / private=차단(410)';

-- 2) 변경 이력 — 추가 전용. 누가 언제 무엇을 바꿨는지. 되돌리기·사고 조사용.
CREATE TABLE IF NOT EXISTS public.portfolio_state_log (
  id          BIGSERIAL PRIMARY KEY,
  slug        TEXT NOT NULL,
  from_status TEXT,
  to_status   TEXT,
  action      TEXT NOT NULL,
  actor       TEXT NOT NULL,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS portfolio_state_log_created_idx ON public.portfolio_state_log (created_at DESC);

-- 이력은 고치거나 지울 수 없다(추가 전용)
CREATE OR REPLACE FUNCTION public.portfolio_state_log_append_only()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION '이력은 추가만 됩니다 (수정·삭제 불가)';
END;
$$;

DROP TRIGGER IF EXISTS portfolio_state_log_no_update ON public.portfolio_state_log;
CREATE TRIGGER portfolio_state_log_no_update
  BEFORE UPDATE OR DELETE ON public.portfolio_state_log
  FOR EACH ROW EXECUTE FUNCTION public.portfolio_state_log_append_only();

-- 3) 전역 스위치 — 「제안 시안 전부 내리기」 같은 한 번에 끄는 스위치
CREATE TABLE IF NOT EXISTS public.portfolio_flags (
  key         TEXT PRIMARY KEY,
  enabled     BOOLEAN NOT NULL DEFAULT false,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by  TEXT NOT NULL DEFAULT 'admin'
);

COMMENT ON TABLE public.portfolio_flags IS '전역 스위치. proposals_down=제안 시안 전부 차단, all_demos_down=데모 전부 차단.';

-- 4) 권한 — 공개 키(anon)와 로그인 사용자(authenticated) 에게서 전부 회수.
--    PUBLIC 을 먼저 회수해야 한다(역할별 REVOKE 만으로는 안 닫힌다).
ALTER TABLE public.portfolio_state      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_state_log  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_flags      ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.portfolio_state     FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.portfolio_state_log FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.portfolio_flags     FROM PUBLIC, anon, authenticated;
REVOKE ALL ON SEQUENCE public.portfolio_state_log_id_seq FROM PUBLIC, anon, authenticated;

GRANT ALL ON public.portfolio_state     TO service_role;
GRANT ALL ON public.portfolio_state_log TO service_role;
GRANT ALL ON public.portfolio_flags     TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.portfolio_state_log_id_seq TO service_role;

-- RLS 정책은 일부러 하나도 만들지 않는다 — service_role 은 RLS 를 우회하고, 나머지는 전부 막힌다.
