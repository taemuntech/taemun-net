<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# taemun.net — 데모(샘플 사이트)를 만들거나 고치기 전에

> 위 블록은 `next dev` 가 관리한다. 이 아래는 그 블록 밖이라 지워지지 않는다.

1. **규칙 정본은 [`docs/PORTFOLIO_FACTORY.md`](docs/PORTFOLIO_FACTORY.md) §0 (1~11번)** — 카드 JSON·`(demos)` 폴더·실존 이름 금지·조회되는 번호 금지·가짜 접수 금지·원본 화질 이미지·`<SampleFooterNote />`·`DevicePreviewFrame`·본문 최대 1280px.
2. 기계가 못 잡는 결함은 [`docs/DEMO_DEFECT_PATTERNS.md`](docs/DEMO_DEFECT_PATTERNS.md) — 무반응 단추·같은 내용 모달·데이터 모순·업종별 법.
3. **푸시 전에 `npm run audit:portfolio`** 를 돌린다. `ERROR` 가 하나라도 있으면 **배포가 안 된다** — `npm run build` 가 이 검사를 먼저 돌리고, Vercel 도 같은 명령으로 빌드한다. 라이브는 이전 버전 그대로 남는다.
4. 화면 폭·탭 크기·죽은 링크는 dev 서버를 띄운 채 `node scripts/qa-demos.mjs` 로 잰다(빌드에는 안 걸려 있다).
5. main 푸시 = 즉시 공개다.
