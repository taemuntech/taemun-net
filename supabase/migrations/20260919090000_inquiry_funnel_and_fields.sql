-- 견적 요청 흐름 개편용 표·칸 — 2026-09-19 가온, 구현계획서 M1(계측) + M3(문의 칸)
--
-- 둘 다 **추가만** 한다(새 표 하나, 문의 표에 빈 칸 몇 개). 지금 운영 코드는 이 칸들을 모르므로 먼저 적용해도
-- 아무 것도 바뀌지 않는다. 이 칸을 쓰는 코드는 적용·확인 뒤에 올린다.
--
-- 적용 뒤 확인(SQL 에디터):
--   select column_name from information_schema.columns
--    where table_schema = 'public' and table_name = 'inquiries'
--      and column_name in ('request_no','referral_from','referral_kind','referral_industry','entry','path',
--                          'budget_flexible','contact_pref','reference_usage','variant');
--     → 10행
--   select count(*) from public.inquiry_events;   → 0
--   select grantee from information_schema.role_table_grants
--    where table_schema = 'public' and table_name = 'inquiry_events' and grantee in ('anon','authenticated');
--     → 0행

-- ── M1. 퍼널 계측 표 ─────────────────────────────────────────────────────────────
-- 어느 단계에서 몇 명이 떠나는지 세려고 둔다. **개인정보를 넣지 않는다** — 이름·연락처·입력값·IP 없음.
-- sid 는 브라우저 탭마다 만드는 난수(sessionStorage)라 사람을 특정하지 않는다.
-- 쓰기는 서버(api/inquiry/event, service_role)만 한다.
CREATE TABLE IF NOT EXISTS public.inquiry_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sid UUID NOT NULL,
  event TEXT NOT NULL CHECK (char_length(event) BETWEEN 1 AND 40),
  step SMALLINT CHECK (step BETWEEN 0 AND 9),
  variant TEXT CHECK (char_length(variant) <= 20),
  entry TEXT CHECK (char_length(entry) <= 20),
  referral_from TEXT CHECK (char_length(referral_from) <= 80),
  value TEXT CHECK (char_length(value) <= 40),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.inquiry_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.inquiry_events FROM anon, authenticated;
CREATE INDEX IF NOT EXISTS inquiry_events_created_at_idx ON public.inquiry_events (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiry_events_sid_idx ON public.inquiry_events (sid, created_at);

-- ── M3. 문의 표에 칸 추가 ────────────────────────────────────────────────────────
-- 지금은 유입 정보를 details 첫 줄 「[유입] …」 에 글로 붙여 두는데, 샘플별로 세기 어렵다. 칸으로 옮긴다
-- (한동안 details 첫 줄도 같이 남긴다).
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS request_no TEXT,              -- 접수번호 TM-YYMMDD-NN (KST 날짜 + 그날 순번). 완료 화면에 보여 준다
  ADD COLUMN IF NOT EXISTS referral_from TEXT,           -- 보고 온 포트폴리오 slug
  ADD COLUMN IF NOT EXISTS referral_kind TEXT,           -- sample / proposal / service / case
  ADD COLUMN IF NOT EXISTS referral_industry TEXT,       -- 업종 키
  ADD COLUMN IF NOT EXISTS entry TEXT,                   -- home_modal / inquiry_page / demo
  ADD COLUMN IF NOT EXISTS path TEXT,                    -- full(4단계 끝까지) / quick(연락처만 남기기)
  ADD COLUMN IF NOT EXISTS budget_flexible BOOLEAN,      -- 「예산 조정 가능」
  ADD COLUMN IF NOT EXISTS contact_pref TEXT,            -- call / text_first
  ADD COLUMN IF NOT EXISTS reference_usage TEXT,         -- as_is(디자인 거의 그대로) / mood(분위기만 참고) / feature(기능만)
  ADD COLUMN IF NOT EXISTS variant TEXT;                 -- 화면 변형(요청서 패널 시험)

CREATE UNIQUE INDEX IF NOT EXISTS inquiries_request_no_key ON public.inquiries (request_no) WHERE request_no IS NOT NULL;
