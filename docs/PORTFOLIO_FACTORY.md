# 포트폴리오 공장 입고 규격서 (PORTFOLIO_FACTORY)

> 대상: 업종별 샘플 사이트를 찍어내는 에이전트(아라). **이 문서만 보고 입고할 수 있게** 썼다.
> 기준 코드(2026-09-16, 브랜치 `demo/agency-infra-v2`): `src/lib/portfolio/schema.ts`(정본) · `registry.ts` ·
> `src/components/demo-kit/*`(SampleNotice·SampleSiteBar·sample-lead·sample-metadata·use-sample-dialog) · `src/app/(demos)/layout.tsx` · 골든 샘플 `src/app/(demos)/demo/atelier-vaucluse/page.tsx` + `src/components/demos/atelier-vaucluse/` ·
> `scripts/audit-portfolio.mjs` · `scripts/capture-portfolio-thumbs.mjs`.
> 이 문서와 코드가 다르면 **코드가 맞다** — 특히 `schema.ts`. 어긋난 곳을 찾으면 이 문서를 고친다.

---

## 0. 먼저 읽을 것 — 2026-09-17 에 실제로 터진 것 (아라에게)

누나가 하루에 15종을 올려 준 덕분에 전시장이 채워졌어요. 고맙습니다.
그걸 공개 가능한 상태로 만들면서 **같은 문제가 종마다 반복**되는 걸 봤어요. 아래 7가지만 지켜 주시면
제가 손댈 게 거의 없어지고, 누나 작업이 올린 그대로 살아납니다.

### 1) 카드 JSON 이 없으면 그 데모는 **안 열립니다**
`src/content/portfolio/<slug>.json` 이 없으면 공개 상태 게이트가 「모르는 것 = 실존 업체 제안 시안」으로
보고 **막아 버립니다**(307 → /gone). 디자인이 아무리 좋아도 아무도 못 봐요. 카드가 곧 등록증입니다.

### 2) 폴더는 반드시 `src/app/(demos)/demo/<slug>/`
라우트 그룹 밖(`src/app/demo/<slug>`)에 두면 **빌드가 깨집니다**(루트 레이아웃이 없어서). 그룹 안에 있어야
고지 띠·검색 차단(noindex)·아이콘 글꼴·주소 차단이 자동으로 붙습니다.

### 3) 실존하는 회사·기관·사람·장소·매체를 쓰지 않습니다
지어낸 브랜드에 **실존 이름을 붙이면** 그 회사가 항의할 수 있고, 손님이 하나만 확인해 봐도 신뢰가 무너집니다.
실제로 나왔던 것: SAMSUNG SDI·TSMC·SK하이닉스·LG에너지솔루션(고객사 로고) · SpaceX·Arianespace(발사 협력사) ·
미래에셋증권·한국투자증권(상장 주관사) · ARCHITECTURAL DIGEST·ELLE DECOR(보도) · 다나와·퀘이사존(실측 근거) ·
카카오페이·토스페이(결제 연동) · 한남 더 힐(시공 사례) · 건축문화대상·국가유산 수리기능자(수상·자격) ·
「서울대 의대 석좌교수」·「존스홉킨스 주임교수」(지어낸 인물의 소속).
→ **바꾸는 법**: `A사`~`F사 (예시)` · `주요 카드사 (예시)` · `간편결제 A (예시)` · 업종 서술(「반도체 부품 제조사」).

### 4) **조회되는 번호**를 지어내지 않습니다
사업자등록번호·상장 종목코드·통신판매업신고·KC/ITAR/FCC 인증번호·등록면허·논문 DOI.
`104-86-49201` 처럼 실제 세무서 대역을 쓰면 **누군가의 진짜 번호일 수 있습니다.** 실존 저널 접두사(`10.1038/`)를
쓴 DOI 는 남의 논문을 가리킵니다.
→ **바꾸는 법**: `000-00-00000` · `1588-0000` · `010-0000-0000` · 「안전 인증 표기 자리 (예시)」.

### 5) 폼은 **실제로 접수되면 안 됩니다**
「접수되었습니다 · 2시간 내 연락드립니다」나 주문번호·예약번호·운송장이 뜨면, 손님은 진짜 접수된 줄 압니다.
→ `src/components/demo-kit/SampleNotice` 를 열어 문의 페이지로 보냅니다(본보기: `maison/ReservationSection.tsx`).
→ 제출 버튼 위에 한 줄: 「샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.」
→ **한 화면에 폼이 여러 개일 수 있습니다.** 메종은 두 번째 폼을 놓칠 뻔했어요.

### 6) 실적처럼 읽히는 수치에는 「예시」를, 최상급은 쓰지 않습니다
「1위」·「최초」·「100%」·「무결점」·「보장」·「완벽」은 계약으로 지킬 수 없는 말이라 대표님께 그대로 돌아옵니다.
AUM·IRR·수율·감축률·고객사 수처럼 **실적으로 읽히는 숫자**는 그 구역 머리에 「예시 수치」 한 줄이면 됩니다.

### 7) 헤더·홈에 데모 이름을 **하드코딩하지 마세요**
`Header.tsx`·`HomeView.tsx` 는 `"use client"` 라, 거기 적힌 이름은 **브라우저가 받아 가는 파일에 박힙니다**(1년 캐시).
관리자 화면에서 「비공개」로 내려도 이름이 남아요. 데모 메뉴는 `src/lib/portfolio/header-links.ts` 에 한 줄만
추가하면 서버가 공개 상태를 보고 알아서 넣고 뺍니다.

### 8) 이미지는 **원본 해상도**로 넣습니다
AI 스튜디오 이미지 주소(`lh3.googleusercontent.com/...`)를 그냥 받으면 **미리보기용 512px 판**이 옵니다.
주소 뒤에 **`=s0`** 을 붙이면 원본(대개 1376px)이 와요. 512px 사진을 노트북 히어로 자리에 놓으면 뿌옇게 보입니다.
이미 저장소에 들어온 것을 한꺼번에 고치려면 `node scripts/upgrade-images.mjs --apply`.
검사가 **긴 변 1024px 미만**이면 경고합니다(로고·아이콘·가로 띠는 자동으로 빠집니다).

### 9) 미디어(이미지·영상) **무단 다운로드 원천 차단** (필수 강령)
우리가 정성스럽게 제작한 이미지와 영상은 **무단 우클릭 저장, 드래그 파일 복제, 브라우저 일괄 저장이 전면 차단**되어야 합니다.
- **전역 자동 방어**: `(site)/layout.tsx`와 `(demos)/layout.tsx`에 `<MediaProtectionGuard />`가 설치되어 있어 `img, video, canvas, picture`의 우클릭(`contextmenu`) 및 드래그(`dragstart`), `Ctrl+S`가 기본으로 차단됩니다.
- **비디오 작성 규격**: 새 컴포넌트에 `<video>` 태그를 삽입할 때는 반드시 아래 방어 속성을 기본으로 명시합니다:
  ```tsx
  <video
    autoPlay loop muted playsInline
    controlsList="nodownload noplaybackrate"
    disablePictureInPicture
    onContextMenu={(e) => e.preventDefault()}
    className="..."
    src="..."
  />
  ```
- **직다운로드 링크 노출 금지**: 버튼이나 앵커 태그에 미디어 파일의 직접 다운로드(`download` 속성)를 제공하지 않습니다.

> 📄 **실제로 무엇이 나왔는지**는 `docs/DEMO_DEFECT_PATTERNS.md` 에 모아 뒀습니다 — 데모 20종을 전수로
> 재고 고친 기록입니다. 특히 「기계가 못 잡는 것」(눌러도 안 되는 단추 · 무엇을 눌러도 같은 모달 ·
> 데이터 자기모순 · 업종별 법)은 그 문서에만 있습니다.

### 9) 하단 고지는 `<SampleFooterNote />` 한 줄 — 문구를 직접 적지 않습니다
푸터에 이 한 줄만 넣으면 됩니다.

```tsx
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";
// …푸터 안 어딘가
<p className="text-xs opacity-60"><SampleFooterNote /></p>
```

화면에는 **「이 화면은 태문 DEV STUDIO의 가상 브랜드 샘플입니다. © 2026 주식회사 태문」** 이 나옵니다.
- 문구는 그 컴포넌트 **한 곳이 정본**입니다. 바꾸고 싶으면 거기만 고치면 전 데모가 같이 바뀝니다. 데모 파일에 문구를 직접 적지 마세요 — 예전엔 10가지 넘게 제각각이었습니다.
- `<span>` 을 그리므로 `<p>`·`<span>` 안에 넣어도 됩니다. 색·크기는 감싼 요소를 따릅니다(데모마다 디자인이 달라서).
- ⚠️ **제안용 시안(실존 업체, `kind: "proposal"`)에는 넣지 않습니다.** 그 회사는 「가상」이 아니에요. 거기는 레이아웃이 별도 고지를 붙입니다.
- 검사가 강제합니다 — 가상 브랜드에 없으면 ERROR, 제안 시안에 있으면 ERROR.
- 「문의·신청은 접수되지 않습니다」는 여기 넣지 않습니다. 그건 **폼마다 제출 버튼 위**에 따로 붙습니다(§0-5).

### 10) 모든 데모는 태문 툴바(`DevicePreviewFrame`)로 감쌉니다
`<Slug>PageClient.tsx` 를 이 모양으로 — 본보기는 `src/app/(demos)/demo/nexus-robotics/NexusRoboticsPageClient.tsx`.

```tsx
if (isEmbed) return <SlugApp isEmbed={true} />;   // 툴바 안쪽 iframe 이 여는 주소
return <DevicePreviewFrame src="/demo/<slug>?embed=true" title=… category=… client=… techStack=… inquiryUrl="/inquiry?from=<slug>" />;
```

툴바는 한 파일이라 **전 데모가 같은 모양**입니다. 직접 만들지 마세요.
- **폰**: `[←]  [PC 화면 ⇄ 모바일]  [제작 의뢰]` — 세 개뿐입니다. 「PC 화면」은 데모를 실제 1440px 로 그린 뒤 폰 폭에 맞춰 줄여 보여 줍니다(두 손가락으로 확대).
- **데스크톱**: `[← 메인 갤러리] [Preview | Code Spec]  [PC · 태블릿 · 모바일]  [새 창] [이 사이트처럼 맞춤 제작 의뢰]`
- 새로고침·전체화면·회전·경로 표시는 뺐습니다. 예전엔 폰에서 그 버튼들이 자리를 먹어 **「제작 의뢰」가 화면 밖으로 밀려나** 안 보였어요.
- 툴바가 없으면 그 데모에는 「메인 갤러리로」·「제작 의뢰」 길이 없어집니다 — 검사가 ERROR 로 막습니다(의료 6종이 그 상태였습니다).

### 11) 본문은 최대 1280px, 배경은 끝까지
큰 모니터(1920px)에서 데모마다 폭이 제각각이었습니다 — 44종은 본문이 1280px 안에 모였고 13종은 화면 끝까지 퍼져 한 줄이 너무 길었어요.

```
|◀────────── 배경·사진·색 띠·영상은 화면 끝까지 ──────────▶|
|        |◀──── 글·카드·버튼·그리드는 1280px ────▶|        |
```

```tsx
<section className="w-full bg-stone-100">              {/* 배경은 끝까지 */}
  <div className="max-w-7xl mx-auto px-4 lg:px-6">      {/* 내용은 1280 안에 */}
    …
  </div>
</section>
```

- 헤더·내비·푸터도 **안쪽 줄**은 `max-w-7xl mx-auto`, 배경은 끝까지.
- 전부 1280 상자에 가두면 큰 모니터에서 양옆이 텅 빈 좁은 상자처럼 보입니다 — 배경은 끝까지 채우세요.
- 신문·잡지 콘셉트도 이 폭 안에서 충분히 나옵니다(실제 신문 사이트도 본문은 1200~1300px 에서 끊습니다).
- 측정 도구가 데스크톱 화면에서 본문 폭을 재서 1280 을 넘으면 `⚠️넓음` 으로 알려 줍니다: `node scripts/qa-demos.mjs --base <주소> --only <slug>`

### 12) 기술 스택엔 실제로 쓴 기술만, 제작 기간은 「예상」
- `techStack`(갤러리·카드 JSON·툴바 세 곳)은 **「적용 기술 스택 & 라이브러리」** 로 찍힙니다. `Next.js 16` · `React 19` ·
  `Tailwind CSS v4` · `TypeScript`, 그리고 **그 데모 소스에서 실제로 쓴** 브라우저 API·라이브러리(`Web Audio API`·`SVG` 등)만.
  「Digital Twin HUD」 같은 **기능 이름은 적지 않습니다** — features·highlights 에 적으세요. 검사가 ERROR 로 막고,
  `node scripts/audit-portfolio.mjs --fix-tech-stack` 이 걸린 태그를 지워 줍니다.
- 갤러리 `period` 는 화면에 **「예상 제작 2주~」** 로 붙습니다 — 샘플을 그 기간에 만들었다는 뜻이 아니라 **이런 사이트를
  맡기면 걸리는 기간**이라는 손님과의 약속이에요. 형이 실제로 납품할 수 있는 기간만 적습니다(모르면 비슷한 샘플 값을 따르기).
- 데모도 외부 링크도 없는 갤러리 카드는 **홈에 안 뜹니다** — 볼 것 없는 카드를 걸면 만든 적 없는 작품을 내건 게 됩니다.

### 올리기 전 한 줄
```bash
node scripts/audit-portfolio.mjs     # ERROR 0 이어야 합니다 (위 3·4·5·6 을 기계가 봅니다)
```
검사가 **ERROR 0** 이어도 사람이 봐야 하는 게 둘 남아요 — 손가락으로 누를 것은 **44px 이상**, 그리고
`href="#"` 처럼 **눌러도 아무 데도 안 가는 링크**는 만들지 않기. 오늘 10종에서 이 둘이 제일 많았습니다
(작은 버튼 23~47개/종, 죽은 링크 최대 8개/종).

> 화면을 실제로 재는 도구를 만들어 뒀어요: `node scripts/qa-demos.mjs --base <주소> --only <slug>`
> 375·768·1440 세 폭에서 가로 넘침·콘솔 에러·작은 버튼·죽은 링크를 재고 스크린샷을 남깁니다.
> ⚠️ 데모는 미리보기 틀(iframe) 안에 들어가므로 **틀 안쪽(`?embed=true`)을 재야** 합니다. 바깥 문서를 재면
> 틀이 안쪽 문제를 가려서 **무엇을 재도 초록**으로 나옵니다.

---

## 1. 한 줄 요약

**샘플 1개 = 얇은 페이지 폴더 1개 + 컴포넌트 폴더 1개 + 카드 JSON 1개 (+ 썸네일 2장).**

```
src/app/(demos)/demo/<slug>/page.tsx          ← 얇은 서버 page (metadata + <Slug>App 렌더만)
src/components/demos/<slug>/<Slug>App.tsx     ← "use client" 화면 루트 (디자인 코드는 이 폴더에)
src/components/demos/<slug>/Header.tsx …      ← 섹션·modals/·data/ 로 쪼개도 된다(검사가 폴더를 재귀로 읽는다)
src/content/portfolio/<slug>.json             ← 포트폴리오 카드
public/portfolio/<slug>/desktop.png, mobile.png  ← 명령이 만든다
```

입고 순서는 **서버가 어떻게 떠 있느냐에 따라 두 갈래**다. `next start` 는 build 산출물만 서빙하므로, 공용 dev 서버가 없으면 build 를 먼저 해야 새 샘플이 찍힌다.

**(A) 공용 dev 서버(3001)가 이미 떠 있을 때** — 켜고 끄지 않는다(공용이다):

```bash
npm run capture:thumbs -- --only <slug>                                    # 1. 썸네일 촬영
npm run audit:portfolio -- --base http://localhost:3001 --strict <slug>    # 2. 입고 검사 — ERROR 0
npm run build                                                              # 3. 빌드 — 카드 JSON 규격 위반이면 여기서 멈춘다
```

**(B) 3001 이 없을 때** — 내 전용 포트(예: 3055)로 띄우고, 끝나면 그 서버만 끈다:

```bash
npm run build                                                              # 1. 빌드 먼저 (next start 는 빌드된 것만 서빙)
npx next start -p 3055                                                     # 2. 서버 (다른 터미널·백그라운드)
npm run capture:thumbs -- --only <slug> --base http://localhost:3055       # 3. 썸네일
npm run audit:portfolio -- --base http://localhost:3055 --strict <slug>    # 4. 입고 검사 — ERROR 0
                                                                           # 5. 3055 서버 종료
```

- 포트는 **띄운 서버에 맞춘다** — capture·audit 의 `--base` 가 둘 다 같은 주소여야 한다.
- `--strict <slug>` 는 내 샘플의 WARN 도 ERROR 로 센다. **입고 기준은 `--strict <slug>` 로 ERROR 0** 이다(WARN 을 남긴 채 입고하지 않는다).

골든 샘플은 **`atelier-vaucluse`** 다. 이웃 샘플을 베끼지 말고 이것을 베낀다.

---

## 2. 폴더 구조와 이름 규칙

### slug

- 영문 소문자·숫자·하이픈만. 정규식 `^[a-z0-9]+(?:-[a-z0-9]+)*$`, 80자 이하.
- **가상 브랜드명을 로마자로** (예: `atelier-vaucluse`, `haneul-dental`). 업종명만(`interior-1`)은 피한다.
- 아래 곳 전부에서 **글자 하나까지 같아야** 한다(audit 이 전부 대조한다 — 틀리면 `/inquiry?from=` 리드가 틀린 slug 로 들어간다):

| 곳 | 값 |
|---|---|
| 페이지 폴더 | `src/app/(demos)/demo/<slug>/` |
| 컴포넌트 폴더 | `src/components/demos/<slug>/` (page.tsx 가 `@/components/demos/<slug>/…` 만 import — 다른 slug 폴더를 import 하면 audit ERROR, 페이지 없는 폴더는 WARN) |
| 카드 파일 이름 | `src/content/portfolio/<slug>.json` |
| JSON `slug` | `"<slug>"` |
| JSON `liveUrl` | `"/demo/<slug>"` |
| 화면 코드 상수 | `const SAMPLE_SLUG = "<slug>"` (SampleNotice 에 넘김) |
| page.tsx | `sampleMetadata({ slug: "<slug>", … })` |
| SampleNotice `industry` | 카드 `industry` 와 같은 키 |

- 이미 쓰는 slug 금지: `atelier-vaucluse`, `lithium-foil`, `taemun-bridge`, `tdocs`.
  `lithium-foil` 도 이제 `src/app/(demos)/demo/` 에 있다(2026-09-16 이동). 같은 이름 폴더를 만들면 덮어쓰게 된다.

### 폴더 위치

- **반드시 `src/app/(demos)/demo/<slug>/`.** `(demos)` 레이아웃이 자동으로 해 주는 것:
  - `robots: noindex, follow` — 가상 브랜드도 제안 시안도 검색에 안 뜬다
  - 제목 템플릿 `%s — 태문 DEV STUDIO 샘플 사이트`
  - `body` 기본 `bg-white text-gray-900` (사이트 틀의 다크 톤은 안 물려받는다)
- **상단 태문 표시는 기기 전환 툴바(`DevicePreviewFrame`)가 맡는다.** `src/app/(demos)/demo/<slug>/<Slug>PageClient.tsx` 가
  `?embed=true` 면 화면만, 아니면 툴바 + iframe 을 그린다(태문 로고·종류 칩·「포트폴리오」·「이런 사이트 제작 문의」·제안 시안 고지 띠).
  `demo-kit/SampleSiteBar.tsx`(높이 44px, sticky)는 **툴바 없이 쓰는 샘플용으로 남아 있고 지금은 아무 데서도 렌더되지 않는다** —
  그래서 `--sample-bar-h` 는 실제로 `0px` 로 읽힌다. 그래도 샘플 헤더는 `sticky top-[var(--sample-bar-h,0px)]` 로 쓴다(바를 붙이는 날 그대로 맞는다).
  어느 쪽이든 **둘 중 하나는 있어야** audit 실측을 통과한다.
- `src/app/(site)/` 아래에 샘플을 만들지 않는다(다크 class·태문 JSON-LD 가 붙고 상단 태문 표시가 없다). kind=sample 카드가 `(site)` 페이지를 가리키면 audit **ERROR**.
- 화면 코드는 `src/components/demos/<slug>/` 에 둔다(아라 실제 패턴). 섹션·모달·데이터로 쪼갠다: `Header.tsx`·`Hero.tsx`·`Consultation.tsx`·`modals/ProjectModal.tsx`·`data/projects.ts` 등(골든 샘플 구조). 검사 스크립트는 `src/app/(demos)/demo/<slug>/**` 와 `src/components/demos/<slug>/**` 를 **둘 다** 재귀로 읽는다 — 폴더 이름이 slug 와 한 글자라도 다르면 검사에서 통째로 빠지니 주의(WARN 으로 알린다).
- 옛 위치 `src/components/demo/<slug>/`(단수, lithium-foil)도 읽지만 새 샘플은 `demos`(복수)에 둔다.
- 이미지 등 정적 파일은 `public/portfolio/<slug>/assets/` 에 둔다(커밋 경로가 하나로 모인다). `desktop.png`·`mobile.png` 두 이름은 썸네일 전용이니 쓰지 않는다.

---

## 3. 코드 템플릿

### 3-1. `page.tsx` (서버 — 그대로 복사, 이름만 바꾼다)

```tsx
import HaneulDentalApp from "@/components/demos/haneul-dental/HaneulDentalApp";
import { sampleMetadata } from "@/components/demo-kit/sample-metadata";

// 서버 페이지 — 메타데이터만 두고 화면은 src/components/demos/haneul-dental/ 의 클라이언트 컴포넌트에 맡긴다.
// 검색 제외(noindex)와 상단 샘플 바는 (demos) 레이아웃이 한다. 제목 뒤 「샘플 사이트」도 레이아웃 템플릿이 붙인다.
export const metadata = sampleMetadata({
  slug: "haneul-dental",
  title: "하늘치과 — 치과 병원",
  description:
    "태문 DEV STUDIO 가 만든 가상 브랜드 샘플 사이트입니다. 진료 과목 소개·의료진 소개·진료 예약 화면을 담았습니다. 실제 병원이 아니며 예약은 접수되지 않습니다.",
});

export default function HaneulDentalDemoPage() {
  return <HaneulDentalApp />;
}
```

지킬 것:
- **`page.tsx` 에 `"use client"` 금지** (audit ERROR — metadata 를 못 쓴다).
- metadata 는 **`sampleMetadata({ slug, title, description })`** 로 만든다. 카카오톡으로 영업 링크를 보냈을 때 뜨는 미리보기(og 제목·썸네일 `/portfolio/<slug>/desktop.png`)까지 채운다. `slug` 는 카드와 같게(audit 대조).
- `title` 필수 (없으면 탭 제목이 레이아웃 기본값 → 실측 audit ERROR). 형식: `<가상 브랜드> — <업종>`. **「샘플」은 넣지 않는다** — 레이아웃 템플릿이 「— 태문 DEV STUDIO 샘플 사이트」를 붙여 두 번 나온다.
- `description` 에 「가상 브랜드 샘플」「실제 업체가 아니며 ○○은 접수되지 않습니다」를 넣는다.
- `robots`·`alternates.canonical` 은 **쓰지 않는다** (레이아웃이 noindex 를 준다. canonical 을 넣으면 noindex 와 어긋난다).
- props 를 넘기려면 직렬화 가능한 값만(문자열·숫자·배열·객체). 함수·아이콘 컴포넌트 금지.

### 3-2. `src/components/demos/<slug>/<Slug>App.tsx` (클라이언트 — 디자인 코드는 이 폴더에 붙인다)

아래는 한 파일짜리 최소 예다. 실제로는 골든 샘플처럼 `<Slug>App.tsx` 가 섹션 파일(`Header`·`Hero`·…·`Consultation`·`Footer`)과 `modals/*` 를 조립하고, **폼이 있는 파일(`Consultation.tsx`)이 SampleNotice 를 직접 렌더**한다(4장).

```tsx
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Phone } from "lucide-react";
import SampleNotice from "@/components/demo-kit/SampleNotice";

// 하늘치과 — 가상의 치과 샘플 사이트.
// 상단 「태문 샘플 사이트」 바는 (demos) 레이아웃이 붙인다. 여기서 직접 넣지 않는다.
// 예약 폼은 입력값을 어디에도 보내지 않는다 — 제출하면 SampleNotice 를 연다.

const SAMPLE_SLUG = "haneul-dental";

export default function HaneulDentalApp() {
  const [noticeOpen, setNoticeOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNoticeOpen(true); // 전송·저장 없음
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      {/* 헤더: sticky + 샘플 바 높이 변수. top-0 금지 */}
      <header className="sticky top-[var(--sample-bar-h,0px)] z-40 border-b bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          <a href="#services">진료 과목</a>
          <a href="#booking">예약</a>
        </nav>
      </header>

      {/* 앵커 대상 섹션: id 필수 + 헤더·바에 가리지 않게 scroll-mt */}
      <section id="services" className="scroll-mt-[calc(var(--sample-bar-h,0px)+4rem)] px-6 py-20">
        ← 스티치 / AI Studio 에서 나온 섹션 JSX 를 여기부터 붙인다
      </section>

      <section id="booking" className="scroll-mt-[calc(var(--sample-bar-h,0px)+4rem)] px-6 py-20">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" required placeholder="이름" className="w-full border px-3 py-2" />
          <input name="phone" placeholder="010-0000-0000" className="w-full border px-3 py-2" />
          {/* 제출 전 고지 필수 — 실명·전화번호를 다 쓰고 나서야 샘플인 걸 알게 하지 않는다 */}
          <p className="text-xs text-slate-500">샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.</p>
          <button type="submit" className="w-full bg-slate-900 py-3 text-white">
            <Phone className="mr-2 inline h-4 w-4" aria-hidden="true" />
            예약 신청
          </button>
        </form>
      </section>

      <SampleNotice
        open={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        slug={SAMPLE_SLUG}
        industry="corporate"
        featureName="진료 예약"
      />

      {/* 푸터 샘플 고지 필수 — 샘플 바를 × 로 접어도 남는 표시 */}
      <footer className="px-6 py-10 text-xs text-slate-500">
        이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 병원이 아니며, 의료진·수치는 예시입니다.
      </footer>
    </div>
  );
}
```

- 컴포넌트는 `export default function PascalCase()`. `any` 금지. 새 npm 패키지 금지(아이콘은 `lucide-react`).
- 렌더 중 `Date.now()`·`new Date()`·`Math.random()` 금지(서버·클라이언트 불일치). 필요하면 고정 값을 쓴다.
- 이미지: `<img>` 로 쓴다. `next/image` 는 **로컬 파일(`/portfolio/<slug>/assets/…`)만** — 외부 주소는 `next.config.ts` 에 `images.remotePatterns` 가 없어 깨진다(설정 파일은 건드리지 않는다).
- z-index 는 **9000 미만** (audit WARN). 샘플 바가 `z-[9999]`, SampleNotice 가 `z-[10000]` 이다.
- 헤더 메뉴의 `#앵커` 는 **실제로 있는 섹션만**. 누르는 동작이 없는 카드에 화살표·`cursor-pointer` 를 달지 않는다.
- 모달은 `role="dialog"` `aria-modal="true"` `aria-labelledby` + `useSampleDialog`(Esc 닫기·포커스 가두기·복귀, `@/components/demo-kit/use-sample-dialog`). 골든 샘플의 `modals/ProjectModal.tsx` 를 베낀다 — **훅은 `if (!open) return null` 보다 앞에** 둔다(뒤에 두면 열고 닫을 때 훅 개수가 달라져 React 가 죽는다).
- `<label>` 은 `htmlFor` 로 입력칸 `id` 와 잇는다(`useId()`).

### 3-3. AI Studio / 스티치 출력 옮기기 체크리스트

AI Studio 결과물은 보통 Vite + React Router + `index.css` + `import.meta.env` + Gemini 호출이다. 하나씩 지운다.

| # | 원본에 있는 것 | 이렇게 바꾼다 |
|---|---|---|
| 1 | `main.tsx`·`index.html`·`vite.config.ts`·`App.tsx` 라우팅 껍데기 | 버린다. 화면 JSX 만 `src/components/demos/<slug>/<Slug>App.tsx`(와 섹션 파일)로 옮긴다. 원본에 있던 자체 「데모 안내 바」도 지운다(샘플 바는 레이아웃 몫) |
| 2 | `react-router-dom` (`<Routes>`, `<Link to>`, `useNavigate`) | **라우터 제거, 한 페이지 섹션 스크롤로.** 페이지마다 `<section id="…">`, 링크는 `<a href="#…">`. 탭처럼 바꿔 보여 줄 거면 `useState` |
| 3 | `index.css`·`App.css` 의 `body{}`·`*{}`·`:root{}`·`h1{}` 같은 전역 규칙 | **전역 CSS 파일 import 금지.** `globals.css` 수정 금지. Tailwind 클래스로 옮기고, 색·폰트는 최상위 `<div>` 의 클래스(`bg-[#FBF9F5] text-[#2C2926]`)로. Tailwind 로 못 옮기는 규칙만 `<Slug>App.module.css`(CSS Modules)로 |
| 4 | `tailwind.config.js` 의 커스텀 색·폰트 | 설정 파일을 만들지 않는다(v4). 임의 값 클래스로: `bg-[#1F1C19]`, `font-[family-name:var(--font-display)]` |
| 5 | `import.meta.env.*`, `process.env.*`, `GEMINI_API_KEY`, `@google/genai` | **전부 삭제.** API 키·환경변수 사용 금지. AI 응답은 고정 문구 배열로 흉내 내고 화면에 「샘플 응답」이라고 적는다 |
| 6 | `fetch(`·`axios`·`"/api/…"` | **삭제** (audit ERROR). 데이터는 파일 안 상수 배열로 |
| 7 | `fixed top-0` 헤더·배너 (`style={{position:"fixed", top:0}}` 포함) | `sticky top-[var(--sample-bar-h,0px)]` (**audit ERROR**). `sticky top-0` 도 바 밑으로 사라지니 같은 값으로(WARN). 원본의 자체 「샘플입니다」 배너와 그만큼의 `pt-14` 여백도 지운다 |
| 8 | `<link href="fonts.googleapis.com…">` in `index.html` | `next/font/google` 을 **`page.tsx`(서버)** 에서 부르고 래퍼에 변수 클래스를 준다 (아래 예시). 한글 폰트는 `preload: false` |
| 9 | `localStorage` 로 가짜 「접수 내역」 보여 주기, 「접수되었습니다」 성공 화면·토스트 | 금지(가짜 접수 — 성공 문구는 audit ERROR, 저장소 저장은 WARN). 폼은 4장 규칙대로 |
| 10 | `window`·`document` 를 컴포넌트 본문에서 바로 읽기 | `useEffect` 안으로 옮긴다(서버 렌더에서 죽는다) |

폰트 예시 (`page.tsx`):

```tsx
import { Noto_Serif_KR } from "next/font/google";
import HaneulDentalApp from "@/components/demos/haneul-dental/HaneulDentalApp";

const display = Noto_Serif_KR({ weight: ["400", "700"], preload: false, variable: "--font-display" });

export default function HaneulDentalDemoPage() {
  return (
    <div className={display.variable}>
      <HaneulDentalApp />
    </div>
  );
}
```

화면에서는 `className="font-[family-name:var(--font-display)]"`. 폰트를 안 쓰면 Tailwind 기본 `font-serif`/`font-sans` 로 충분하다(골든 샘플이 그렇다).

---

## 4. 폼 규칙 — 가짜 접수 금지

**모든 문의·예약·주문·상담·회원가입 폼은 제출하면 `SampleNotice` 를 연다. 그 밖엔 아무것도 안 한다.**

```tsx
const [noticeOpen, setNoticeOpen] = useState(false);

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();          // 페이지 이동·전송 막기
  setNoticeOpen(true);         // 안내 열기 — 이 호출이 없으면 audit ERROR(「SampleNotice 가 한 번도 열리지 않습니다」)
};

<form onSubmit={handleSubmit}>
  …
  <p>샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.</p>  {/* 제출 버튼 위 고지 필수(없으면 WARN) */}
  <button type="submit">예약 신청</button>
</form>

<SampleNotice
  open={noticeOpen}
  onClose={() => setNoticeOpen(false)}
  slug={SAMPLE_SLUG}           // 카드 slug 와 같게
  industry="interior"          // 카드 industry 와 같게 (IndustryKey)
  featureName="1:1 공간 상담 예약" // 방문자가 누른 기능 이름 — 「○○ 그대로 귀사 사이트에 만들어 드립니다」
/>
```

골든 샘플은 폼이 섹션 파일(`Consultation.tsx`) 안에 있고, 그 파일이 검증 → `setNoticeOpen(true)` → `<SampleNotice>` 를 직접 렌더한다(접수 번호·「접수 완료」 모달·브라우저 저장은 없다).

폼이 **모달 안**이면 모달 상태도 선언하고, 제출 때 모달을 닫은 뒤 안내를 연다:

```tsx
const [bookingOpen, setBookingOpen] = useState(false);
const [noticeOpen, setNoticeOpen] = useState(false);
const bookingRef = useRef<HTMLDivElement>(null);
useSampleDialog({ open: bookingOpen, onClose: () => setBookingOpen(false), dialogRef: bookingRef });

const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setBookingOpen(false);   // 모달 닫기 — 입력값은 남겨 둬도 된다
  setNoticeOpen(true);     // 안내 열기
};
```

- `SampleNotice` props 계약(`demo-kit/types.ts`): `open`, `onClose`, `slug`, `industry`, `featureName?`. 이 외 props 없음.
- 안내의 「이런 사이트 제작 문의하기」 버튼이 `/inquiry?from=<slug>&industry=<key>` 로 보낸다. 링크를 직접 만들 일이 있으면 `sampleInquiryHref({ from, industry })`(`@/components/demo-kit/sample-lead`)를 쓴다. 문자열로 조립하지 않는다.
- **금지** (audit ERROR): `fetch`·`axios`·`/api/`·`sendBeacon`·`XMLHttpRequest`·외부 폼 서비스(formspree 등) 호출, 폼 내용을 실은 `mailto:`(`?body=`·`location.href`), 「접수되었습니다」「예약이 완료되었습니다」「전송되었습니다」 성공 화면·토스트. localStorage 에 「신청 내역」 저장도 금지(WARN).
- 버튼 `onClick` 만으로 예약을 흉내 내는 경우(폼 태그 없음)도 같은 규칙: 누르면 `setNoticeOpen(true)`.
- **접수가 아닌 폼**(검색창, 필터, 계산기, 화면 안 상태만 바꾸는 입력)은 태그에 표시해서 검사에서 뺀다:
  - 검색: `<form role="search" onSubmit={…}>`
  - 화면 안 상태만: `<form data-sample-local onSubmit={…}>`
  - 파일 안 **모든** `<form>` 이 이 표시를 달았을 때만 면제된다. 한 파일에 접수 폼이 섞이면 그 파일은 SampleNotice 를 써야 한다.
  - 표시는 스스로 붙이는 것이라, `data-sample-local` 폼 안에 「신청·예약·문의·상담」 버튼이 있으면 WARN 이 난다. 접수 폼에 이 표시를 달아 검사를 피하지 않는다.
- 폼이 여러 파일로 쪼개졌으면 **폼이 있는 파일에서 `SampleNotice` 를 렌더해 연다.** 다른 파일이 SampleNotice 를 가지고 있어도 폼 파일이 안 열면 **ERROR**. 부모가 열게 하려면 폼 컴포넌트가 `onSubmit={onBook}`(props)으로 받는다 — 이때만 WARN 으로 남는다.

---

## 5. 콘텐츠 규칙

| 항목 | 규칙 | 예 |
|---|---|---|
| 브랜드명 | **가상**. 검색해서 같은 업종 실존 업체가 나오면 바꾼다 | 아뜰리에 보클루즈, 하늘치과(흔하면 더 특이하게) |
| 전화 | `010-0000-0000` · `02-0000-0000` · `1588-0000` 같은 자리표시 번호만. 가운데·끝 **두 그룹 모두** 같은 숫자여야 통과. 예외는 입력칸 관례 `010-1234-5678` 하나 | `02-1234-5678`·`031-987-6543`·`(02) 3456-7890`·`02.3456.7890`·`0234567890`·`tel:0212345678` ✗ (WARN) |
| 이메일 | `hello@example.com` (도메인 `example.com`/`.kr` 계열만 통과) | `contact@haneul.co.kr` ✗ |
| 사업자번호 | `000-00-00000` | `123-45-67890` ✗ (WARN) |
| 주소 | 「○○구 ○○동」 수준까지. 번지·건물명·층 금지 | 「서울시 성동구 성수동」 ✓ / 「성수이로 77 ○○타워 5층」 ✗ |
| 사람 | 가상 이름. 실존 인물·유명인·실제 의사·건축가 이름 금지. 얼굴 사진은 스톡 이미지만 | |
| 실적 | 실존 회사·건물·아파트 단지명, 수상·인증(ISO, 우수업체 선정 등), 언론 보도, 고객 후기 실명 **금지** | 「래미안 ○○ 시공」 ✗ |
| 숫자 | 「시공 1,200건」「만족도 98%」「ISO 9001」「2주 완성」 같은 실적·인증·기간 금지(WARN). 넣어야 보기 좋으면 **「예시 수치」라고 화면에 적는다**(그 파일은 면제) | |
| 보증·보장 | 가상 브랜드라도 「3년 품질 보증」「보장」「No.1」을 쓰지 않는다(WARN) | 「공정마다 검수 항목을 두고 확인」 ✓ |
| 샘플 고지 | **푸터에 「이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다」** — 샘플 바를 접어도 남는 표시(없으면 WARN) | 골든 샘플 푸터 |
| 기능 문구 | 화면에 실제로 동작하지 않는 기능을 광고하지 않는다. 금지 표현은 6장 표 | 「실시간 모니터링」 ✗ |
| 이미지 | Unsplash 등 무료 스톡 또는 직접 만든 것. 실존 업체 사진·로고 금지 | |
| 태문 연락처 | 샘플 안에 **넣지 않는다**. 제작 문의는 샘플 바와 SampleNotice 가 한다 | `010-8672-6463` ✗ |

### 5-1. 새 데모 6종(2026-09-16)에서 실제로 걸린 것 — 이제 **게이트가 ERROR 로 막는다**

가상 브랜드 샘플 6개(celebris-biopharma·h2-next·haus-space·nano-advanced·nexus-robotics·stella-orbital)를 한꺼번에
들여오면서 같은 종류의 사고가 반복됐다. **없는 회사에 실존하는 것의 이름을 빌려 주면 무단 사칭·허위 레퍼런스다.**
그때 `audit:portfolio` 는 경고를 한 건도 내지 않았다 — 초록불이 「깨끗하다」가 아니라 「그 범주를 안 봤다」였다.
지금은 **`kind: "sample"` 에서 ERROR**, `kind: "proposal"`(그 회사 자신의 정보라 자연스러운 자리) 에서는 WARN 이다.

| 걸린 것 | 실제 사례 | 이렇게 쓴다 |
|---|---|---|
| 실존 기업명 | 고객사 로고 구름의 `SAMSUNG SDI`·`TSMC TAINAN`·`SK H-SEMIC`·`LG EN-SOL`, 사양표의 `Intel RealSense`·`NVIDIA H100` | `A-FOUNDRY (예시)` · `3D 뎁스 비전 카메라 × 2 (예시)` |
| 실존 규제기관·제도 | `FDA 희귀의약품(ODD) 지정 완료` · `EMA Annex 1 적격 인증` · `K-ETS 등록번호` · `ITAR REGISTERED` · `FCC & ITU LICENSED` | `해외 규제기관(예시) 가이드라인 기준` · `수출통제 준수 표기 (예시)` |
| 실존 대학·인물 직함 | 자문단 약력의 `서울대 의대 석좌교수` · `존스홉킨스 의대 주임교수` · `대한암학회 이사장 역임` | `국내 대학병원 암연구소 교수 (예시)` · 학회 직함·역임 이력은 지운다 |
| 실존 저널·DOI | `Nature Medicine (2025)` + `10.1038/s41591-…` — 진짜 등록 접두사라 조회되는 논문으로 읽힌다 | `국제 종양학 저널 (예시)` · `00.0000/example-2025-0001` 또는 DOI 줄 삭제 |
| 실존 매체·건물 | `ARCHITECTURAL DIGEST`·`ELLE DÉCOR` 보도, `한남 더 힐 펜트하우스` 시공 | `해외 건축 매거진 (예시)` · `도심 하이엔드 펜트하우스(예시)` |
| 조회 가능한 식별번호 | 사업자등록번호 `104-86-49201` · `KOSPI 392810` · 실내건축공사업 면허 `강남 제2015-18호` | `000-00-00000 (예시)` · 종목코드·면허번호는 「표기 자리 (예시)」로 |
| 실존 기관 링크 | 푸터의 `DART 분기/결산 재무제표` → `https://dart.fss.or.kr` (없는 회사의 공시로 이어진다) | 내부 앵커(`#governance`)로 |
| 근거를 실존 출처로 | 계산기 밑 `산업통상자원부 제10차 …·한국거래소 K-ETS 단가 기준 모델링` · `실제 24개 고객사 실측 데이터 기반` | `화면 구성을 보여 주기 위한 예시 산출식입니다` |
| 100%·무결점·완벽 | `이송 병목 100% 해소` · `무결점을 실현합니다` · `완벽 정합` · `하루 만에 완벽한 연동 테스트를 완료` | `병목 개선 (예시)` · `목표 사양(예시)` · `연동 테스트 구성(예시)` |

세 가지를 더 기억한다.

1. **기기 전환 툴바의 `client=` 는 태문이 자기 목소리로 말하는 자리다.** `DevicePreviewFrame` 이 「클라이언트: …」로
   그대로 찍어 영업 상대가 **수주 실적으로 읽는다.** `kind: "sample"` 이면 반드시
   `client="가상 브랜드 샘플 — 실제 업체가 아닙니다 (○○ 설정)"` 형식으로 적는다(없으면 ERROR).
2. **데모가 들고 온 영상·이미지는 `/public` 에 두지 않는다.** `public/videos/*.mp4` 에 둔 데모 영상은 게이트
   (`src/proxy.ts` 의 `config.matcher`) 밖이라 **그 데모를 내려도 200 으로 그대로 열렸다.**
   `private-assets/portfolio/<slug>/<파일>` 에 두고 화면에서는 `/portfolio/<slug>/<파일>` 로 쓴다 —
   그 앞자리는 이미 matcher 에 있어 상태를 따르고, `.mp4` 는 구간 요청(Range)까지 받아 준다.
   (태문 자체 자산 `/images/…`·`/fonts/…` 는 그대로 `/public` 에 둔다. 외부 이미지 호스트 직접 참조도
   같은 이유로 게이트 밖이라 WARN 으로 개수를 보여 준다.)
3. **「예시」 표시는 푸터 한 줄로 충분하지 않다.** 임상 수치·시설 규모처럼 투자·제휴 판단 정보로 읽히는 구역은
   그 **구역 머리에** 「아래 수치는 화면 구성용 예시입니다」를 상시 노출로 붙인다(접히거나 스크롤로 사라지는 자리는 피한다).

**실존 업체 제안 시안**(특정 회사 이름·로고로 만든 시안)은 **형이 지시했을 때만** 만든다 — 공장 기본 출력물이 아니다.
만들 때는 위 표의 「가상 브랜드」 줄 대신 **6-3-1 「실존 업체 제안 시안 만들기」** 를 따른다. 회사 이름이 그대로 걸리는 화면이라
규칙이 더 빡빡하고, 입고 검사도 WARN 이 아니라 **ERROR** 로 막는다.

---

## 6. 카드 JSON

### 6-1. 템플릿 (`src/content/portfolio/atelier-vaucluse.json` 실물)

```json
{
  "slug": "atelier-vaucluse",
  "kind": "sample",
  "industry": "interior",
  "title": "아뜰리에 보클루즈",
  "subtitle": "하이엔드 인테리어 스튜디오 홈페이지 샘플",
  "summary": "가상 인테리어 스튜디오 「아뜰리에 보클루즈」로 만든 홈페이지 샘플입니다. 세리프 타이포그래피와 웜톤 자연석 무드의 에디토리얼 화면에, 공간 유형 필터가 있는 프로젝트 아카이브와 프로젝트 상세·마감재 아카이브·저널 모달, 1:1 상담 신청 폼을 한 페이지에 담았습니다.",
  "features": [
    "사진을 누르면 크게 보는 이미지 라이트박스",
    "주거·상업·리노베이션 필터가 있는 프로젝트 아카이브",
    "갤러리·마감재·주요 특징을 담은 프로젝트 상세 모달",
    "천연 마감재 아카이브 모달",
    "스튜디오 저널·미디어 소개 탭 모달",
    "1:1 공간 상담 신청 폼(샘플 — 접수되지 않음)"
  ],
  "techStack": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
  "liveUrl": "/demo/atelier-vaucluse",
  "featured": true,
  "order": 1,
  "createdAt": "2026-09-15"
}
```

UTF-8(BOM 없이 권장), 들여쓰기 2칸, 끝 쉼표 금지.

### 6-2. 칸 설명

| 칸 | 필수 | 규칙 (`validatePortfolioItem`) |
|---|---|---|
| `slug` | ✓ | slug 규칙 + **파일 이름과 같음** |
| `kind` | ✓ | `service` \| `sample` \| `proposal` \| `case` — 공장 출력물은 **`sample`** |
| `industry` | ✓ | 아래 8개 키 중 하나 |
| `title` | ✓ | 가상 브랜드명 |
| `subtitle` | ✓ | 한 줄. 「○○ 홈페이지 샘플」로 끝내면 좋다 |
| `summary` | ✓ | 2~3문장. 「가상 ○○ 「브랜드」로 만든 샘플입니다」로 시작. **있는 기능만** |
| `features` | ✓ | 문자열 **3~6개**. 화면에서 실제로 보이는 것만. 폼은 「(샘플)」 표기 |
| `techStack` | | 문자열 배열. 샘플은 `["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"]` |
| `liveUrl` | ✓ | 샘플은 **정확히 `/demo/<slug>`** |
| `thumbnail` | | **샘플은 쓰지 않는다** — 쓰면 `capture:thumbs` 가 건너뛴다. 기본 경로 `/portfolio/<slug>/desktop.png`·`mobile.png` |
| `icon` | | 헤더 메뉴 아이콘 키(`sparkles`·`compass`·`activity`·`cpu`·`globe`·`file-text`·`layers`·`building`·`shopping-bag`·`briefcase`·`wrench`). 없으면 업종 기본값(`INDUSTRY_ICON`). 같은 업종 둘을 구분할 때만 쓴다(예: tdocs) |
| `featured` | | 홈 대표작 후보. 공장 샘플은 기본 **생략**(형·가온이 고른다) |
| `order` | | 작을수록 앞. 없으면 `createdAt` 최신순. 공장 샘플은 **생략** |
| `createdAt` | ✓ | `YYYY-MM-DD` (입고한 날, KST) |
| `client` | | **`case` 전용 — 샘플에 쓰면 ERROR** |
| `period` | | **`case` 전용 — 샘플에 쓰면 ERROR** |

`industry` 키 (탭 순서):

| key | 라벨 | key | 라벨 |
|---|---|---|---|
| `interior` | 인테리어 | `manufacturing` | 제조·소재 |
| `construction` | 건축·시공 | `commerce` | 쇼핑몰·예약 |
| `civil` | 토목 | `corporate` | 기업 홈페이지 |
| `facility` | 설비·전기·냉난방 | `platform` | 플랫폼·SaaS |

목록에 없는 업종(병원·학원·음식점 등)은 가장 가까운 키(`corporate` 또는 예약 중심이면 `commerce`)를 쓴다. 키를 새로 만들지 않는다 — 필요하면 가온에게 `schema.ts` 추가를 요청.

### 6-3. kind 고르는 법

| 상황 | kind |
|---|---|
| 가상 브랜드·가상 데이터로 만든 시안 (**공장 출력물 전부**) | `sample` |
| **실존 업체에 제안하려고 만든 시안** (그 회사가 의뢰한 것이 아님) | `proposal` (공장에서 안 씀 — 아래 6-3-1) |
| 태문이 직접 운영 중인 서비스 | `service` (공장에서 안 씀) |
| 계약·납품했고 고객이 공개에 동의한 실제 사례 | `case` (공장에서 안 씀. `client`·`period` 는 여기서만) |

#### 6-3-1. 실존 업체 제안 시안 만들기 (`kind: "proposal"`)

실존 회사 이름·로고·사업 내용을 쓴 시안이다. **계약·납품한 사례가 아니고, 그 회사가 의뢰한 것도 아니다.**
「그 회사가 만든 사이트」로 읽히면 영업 신뢰도 법적 위험도 크다 — 그래서 아래 5가지는 게이트가 **ERROR** 로 막는다.
실물 두 개(`wonik-qnc`·`hysfa`)를 베끼면 된다.

**규칙 5가지**

| # | 규칙 | 어기면 |
|---|---|---|
| 1 | **검색 제외** — `(demos)/layout.tsx` 의 `robots: { index: false }` 를 그대로 쓴다. page 에 `robots`·`canonical` 을 **적지 않는다**(적으면 레이아웃 noindex 를 덮어쓴다) | audit 실측 ERROR `샘플인데 noindex 가 없습니다` |
| 2 | **화면 안 고지** — 「태문 DEV STUDIO 가 제안용으로 만든 시안이며, 해당 회사가 **만들었거나 의뢰한 사이트가 아닙니다**」를 `src/components/demos/<slug>/` 안의 접을 수 없는 자리(헤더 아래 띠 + 푸터)에 넣는다. 툴바(`DevicePreviewFrame`)의 `disclaimer` 띠는 iframe **바깥**이라 `?embed=true` 를 직접 열면 안 보인다 — 툴바 고지는 이것과 **별개로** 같이 넣는다 | audit ERROR `kind=proposal 인데 화면 안에 제안 시안 고지가 없습니다` |
| 3 | **`liveUrl` 은 `/demo/<slug>`** — 그 회사의 실제 사이트로 링크하지 않는다. `client`·`period` 칸은 `sample` 과 똑같이 **금지** | `validatePortfolioItem` ERROR |
| 4 | **폼·다운로드는 전부 `SampleNotice`**, 그리고 `kind="proposal"` 을 넘긴다(모달 제목이 「제안용 시안입니다」로 바뀐다). 「접수되었습니다」·「다운로드가 시작되었습니다」 화면·`alert` 을 만들지 않는다 | audit ERROR `SampleNotice 의 kind 가 「없음(기본 sample)」` · `가짜 접수 문구` |
| 5 | **사실이 아닌 것을 사실처럼 적지 않는다** — 실존 연락처·주소·사업자번호는 자리표시(`000-0000-0000`·`000@example.com`)로, 주가·실적·인증·연혁·뉴스·채용은 화면에 **「예시」** 라고 적는다. 제작 연도·기간·고객·수상·「업계 1위」류는 아예 쓰지 않는다 | audit WARN(전화·이메일·사업자번호·실적 수치·보장·최상급), `--strict <slug>` 면 ERROR |

**카드 JSON 예시** (`src/content/portfolio/wonik-qnc.json` 실물)

```json
{
  "slug": "wonik-qnc",
  "kind": "proposal",
  "industry": "manufacturing",
  "title": "원익큐앤씨 (WONIK QnC)",
  "subtitle": "반도체 쿼츠웨어·정밀 세라믹 기업 사이트 제안용 시안",
  "summary": "태문 DEV STUDIO 가 원익큐앤씨(코스닥 074600)에 제안하려고 만든 제안용 시안입니다. 실제 계약·납품한 사례가 아니고 해당 회사가 만들었거나 의뢰한 사이트도 아니며, 화면의 주가·재무·뉴스·공시·채용 정보는 구성을 보여 주기 위한 예시 값입니다. …",
  "features": ["… (예시)", "… (시안 — 접수되지 않음)", "…"],
  "techStack": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
  "liveUrl": "/demo/wonik-qnc",
  "icon": "globe",
  "featured": true,
  "order": 3,
  "createdAt": "2026-09-16"
}
```

- `title` 은 **회사 이름**(가상 브랜드가 아니다). 「제안용 시안」은 `subtitle` 끝에 붙인다 — 두 시안이 갤러리에 나란히 서므로 모양을 맞춘다.
- `summary` 에는 **「제안용 시안」**(없으면 schema ERROR)과 **「실제 계약·납품한 사례가 아니다」** 취지(없으면 audit WARN)를 둘 다 적는다.
- `features` 의 수치·폼 항목엔 `(예시)` · `(시안 — 접수되지 않음)` 을 붙인다.
- `createdAt` 은 레지스트리에 올린 날이지만 **화면에 연도로 나가지 않는다** — `gallery-items.ts` 가 `kind === "proposal"` 이면 `year` 를 비운다.

**화면에 자동으로 붙는 것** (직접 안 해도 되는 것)

| 자리 | 붙는 것 | 코드 |
|---|---|---|
| 갤러리 배지 | 「제안용 시안」 | `KIND_LABEL.proposal` · `KindBadge` |
| 포트폴리오 카드 | 고지 박스 + 「시안 보기」 버튼 | `PortfolioCardView` |
| 홈 갤러리 모달 | 「제안용 시안 · …」 한 줄, 연도 없음 | `HomeView` `originLine()` |
| 문의 페이지 | 「제안용 시안을 보고 오셨군요」 | `InquiryView` `REFERRAL_NOUN` |
| 검색 | `noindex, follow` | `(demos)/layout.tsx` |

**내리기(공개 중단) 절차** — 제안이 끝났거나 회사가 내려 달라고 하면:

1. `src/content/portfolio/<slug>.json` 을 **지운다** → 홈·`/portfolio`·헤더 드롭다운·문의 유입에서 한 번에 사라진다(목록은 전부 이 폴더를 읽는다).
2. `public/portfolio/<slug>/` 썸네일 2장을 지운다.
3. `src/app/(demos)/demo/<slug>/` 와 `src/components/demos/<slug>/` 를 지운다 — 남겨 두면 주소를 아는 사람은 계속 열 수 있다.
   당장 지우기 아까우면 최소한 **1·2 만 먼저** 하고(목록에서 사라짐) 삭제는 따로 잡는다. audit 은 카드 없는 폴더를 WARN 으로 계속 알려 준다.
4. `npm run audit:portfolio` → ERROR 0, `npm run build` 성공 확인 후 커밋.
5. 배포된 뒤 `/demo/<slug>` 가 404 인지 실제로 눌러 본다. 검색엔진에는 처음부터 `noindex` 였으므로 색인 삭제 요청은 보통 필요 없다.

### 6-4. 금지 표현 (`BANNED_PHRASES`)

카드 JSON(`title`·`subtitle`·`summary`·`features`)에 있으면 **ERROR**, 샘플 소스에 있으면 **WARN**(`--strict <slug>` 면 ERROR). 소스에서도 쓰지 않는다.

| 걸리는 말 (정규식) | 이유 |
|---|---|
| `에스크로`, `구매안전` | 법적 요건이 있는 서비스 — 제공하지 않으면 쓰지 않는다 |
| `100% 법적` (`100%\s*법적`) | 법적 효력을 100% 로 단정할 수 없다 |
| `타사 대비`, `업계 최초`, `국내 유일`, `업계 1위` | 비교·최상급 표현은 근거 자료가 필요 |
| `실시간 모니터링`, `AI 자동 감지` | 샘플에 없는 실시간·AI 기능을 암시 |

소스에서는 「최고의」「No.1」「보장」「무조건」과 실적 수치(「2주 완성」 등)도 WARN 으로 걸린다. 검사에 안 걸려도 같은 부류(「2배 빠른」, 없는 고객 수)는 쓰지 않는다.

---

## 7. 썸네일

```bash
# 서버가 떠 있어야 한다. 스크립트는 서버를 켜지 않는다.
npm run capture:thumbs -- --only <slug>                        # 기본 http://localhost:3001 (dev)
npm run capture:thumbs -- --only <slug> --base http://localhost:3055   # next start 로 띄운 경우
npm run capture:thumbs -- --only <slug> --force                # 이미 있어도 다시 찍기
npm run capture:thumbs -- --help                               # 브라우저 탐지 결과 확인
```

- 3001 dev 서버가 이미 떠 있으면 그것을 쓴다(**켜고 끄지 않는다** — 공용이다). 없으면 1장 (B) 순서:
  `npm run build` → `npx next start -p 3055` → capture·audit **둘 다** `--base http://localhost:3055` → 그 서버만 끈다.
  `next start` 는 build 산출물만 서빙하므로 build 전에 찍으면 새 샘플이 404 다.
- 대상: `liveUrl` 이 `/demo/…` 이고 `thumbnail` 칸이 **없는** 카드. JSON 이 규격 위반이면 건너뛴다.
- 결과: `public/portfolio/<slug>/desktop.png`(1440×900) · `mobile.png`(390×844, 모바일 UA). 페이지가 200 이 아니면 안 찍는다.
- 촬영은 load 후 3초 기다린다. 등장 애니메이션이 3초보다 길면 빈 화면이 찍힌다 → 첫 화면 애니메이션을 짧게.
- 이미 파일이 있으면 「건너뜀」 — 디자인을 고쳤으면 `--force`.
- **찍지 않고 입고하지 않는다.** 2026-09-16 새 데모 6종이 썸네일 없이 들어와 `/portfolio` 카드 14장 중 6장이
  회색 자리표시로 떴다 — 형이 영업 자리에서 목록을 열면 새 작업만 빈 칸이다. 여러 개면 쉼표로 한 번에:
  `npm run capture:thumbs -- --only a,b,c --base http://localhost:<포트>`
- **결과 확인은 필수**: 두 PNG 를 직접 열어 본다(Read 도구로 이미지 열기). 볼 것 — 샘플 바가 맨 위에 있는가 · 헤더가 바에 가리지 않는가 · 빈 화면·에러 화면·깨진 이미지가 아닌가 · 모바일에서 가로 넘침이 없는가.
- 요약 줄 `요약: 완료 N · 건너뜀 N · 실패 N` — 실패가 있으면 종료코드 1.

---

## 8. 입고 검사

```bash
npm run audit:portfolio                                                   # 정적 검사만 (서버 불필요)
npm run audit:portfolio -- --base http://localhost:3001 --strict <slug>   # 정적 + 실측 + 내 샘플 WARN 도 ERROR (입고 전엔 이걸로)
npm run audit:portfolio -- --help                                         # 검사 항목 전체·안 잡는 것
```

포트는 **띄운 서버에 맞춘다**(3001 dev 가 없으면 1장 (B) 의 3055).

출력 읽는 법:

```
포트폴리오 입고 검사 — 카드 5개 · 샘플 소스 파일 21개 · 사이트 문구 파일 8개 · 실측 페이지 5개 (http://localhost:3001) · strict haneul-dental

■ src/components/demos/haneul-dental/Consultation.tsx          ← 문제가 난 파일 (실측은 「실측 <주소>」)
  ERROR  88행: 폼이 있는데 SampleNotice 를 렌더하지 않습니다 — …
  ERROR  12행: fixed + top-0 — 공용 샘플 바(44px)에 가려집니다. 헤더는 sticky top-[var(--sample-bar-h,0px)] 로
  ERROR  (strict) 40행: 실존처럼 보이는 전화번호 「02-2345-9911」 — …      ← WARN 이지만 --strict 라 ERROR 로 셈

요약: ERROR 3 (strict 승격 1) · WARN 5 — 문제 있는 곳 3 / 카드 5 · 소스 21 · 실측 5 → 입고 불가
```

- **입고 기준: `--strict <slug>` 로 ERROR 0.** ERROR 가 있으면 종료코드 1, 「→ 입고 불가」. 커밋하지 않는다.
- 남의 파일(`lithium-foil` 의 DemoApp·RollLogForm)에서 나는 기존 WARN 5건은 알려진 것이다(면제 목록·태문 연락처). `--strict` 는 내 slug 에만 걸리므로 입고를 막지 않는다.

무엇이 걸리나:

| 수준 | 검사 |
|---|---|
| ERROR | 카드 JSON 규격(6장) · `liveUrl` 페이지 폴더 없음 · 샘플이 `(site)` 아래 · `page.tsx` 가 `"use client"` · metadata 없음 · `SAMPLE_SLUG`·`sampleMetadata` slug·SampleNotice `slug`/`industry` 가 카드와 다름 · `page.tsx` 가 다른 slug 의 `@/components/demos/<x>/` 를 import |
| ERROR | 폼 파일이 SampleNotice 를 렌더하지 않음(같은 샘플 다른 파일에 있어도) · SampleNotice 의 open 을 true 로 만드는 setter 호출 없음 · 가짜 접수 문구(「…접수되었」「…완료되었」「전송되었」) |
| ERROR | `fetch(`·`axios`·`"/api/"`·`sendBeacon`·`XMLHttpRequest`·`WebSocket`·`EventSource`·외부 폼 서비스·`<form action="http…">`·폼 내용을 실은 `mailto` |
| ERROR | `fixed` + `top-0` 인 요소 — 한 줄·여러 줄 `className`·`cn()`/`clsx()` 인자·템플릿 리터럴·`style={{position:"fixed", top:0}}` 모두 |
| ERROR (`proposal`) | `SampleNotice` 에 `kind="proposal"` 이 없음 · `src/components/demos/<slug>/` 안에 「만들었거나 의뢰한 사이트가 아닙니다」 고지가 없음 (6-3-1) |
| ERROR | **카드 JSON 이 git 추적 대상이 아님** — `git add` 를 빠뜨리면 카드 없는 데모가 커밋된다(게이트가 「모르는 것 = 제안 시안」으로 다뤄 틀린 고지가 붙고 관리자 목록에서 사라진다) |
| ERROR (`sample`) | 실존 기관·기업·매체 이름 · 실존 저널 접두사를 쓴 DOI · 조회 가능한 식별번호(사업자등록번호·종목코드·등록번호·면허번호) — 5-1 표. `proposal` 에서는 WARN |
| ERROR | 데모가 참조하는 `/public` 파일이 `src/proxy.ts` 의 `matcher` 밖(내려도 그대로 열린다) — 태문 자체 자산 `/images`·`/fonts` 는 제외 |
| ERROR (`sample`) | 기기 전환 툴바의 `client=` 에 가상 브랜드 표시가 없음(툴바가 「클라이언트: …」로 찍는다) |
| ERROR (실측) | 상태 200 아님 · 제목이 레이아웃 기본값 · 샘플인데 noindex 없음 / 상단 태문 표시(기기 전환 툴바 또는 `SampleSiteBar`) 없음 / `<html class="dark">` / JSON-LD · `proposal` 인데 HTML 에 시안 고지 없음 · 사이트 페이지(`/`·`/portfolio`·`/inquiry`) canonical·og:url 이 자기 주소가 아님 |
| WARN | 카드 JSON 없는 `(demos)/demo` 폴더 · 페이지·카드 없는 `src/components/demos/<x>` 폴더(slug 오타) · 썸네일 파일 없음 · 샘플 카드에 `thumbnail`/`featured`/`order` · `proposal` summary 에 「실제 계약·납품한 사례가 아니다」 취지 없음 |
| WARN | 실존처럼 보이는 전화(하이픈·점·공백·괄호·붙여 쓴 번호·`tel:`)·대표번호·사업자번호·이메일 · 태문 실번호 · `mailto` 링크 |
| WARN | `sticky top-0` · `fixed inset-y-0` · `z-[9000 이상]` · `data-sample-local` 폼에 신청·예약·문의 버튼 · 폼 없이 「예약하기」 버튼인데 SampleNotice 없음 · `localStorage/sessionStorage.setItem` · 「접수 완료」 상태 문구 |
| WARN | 실적·인증·기간 수치 · 보장·최상급 · 금지 표현 · 가상 브랜드 샘플 고지 없음 · 접수 폼에 「전송되지 않습니다」 제출 전 고지 없음 |
| WARN | 사이트 문구(`(site)`·Header·FloatingChatWidget·문의 API): 압도적·100%·24시간·1시간 이내·3초·실시간·지체상금·보장 |
| WARN | 데모 공용 파일(`src/components/demos/*.tsx` — 기기 전환 툴바)의 100%·무결점·최상급 문구 · 외부 이미지 호스트 직접 참조(데모당 한 줄) |
| WARN (실측) | `<img>` 주소가 200 이 아님(페이지당 30개) |
| **안 잡는 것** | 이미지 속 글자·실존 업체 사진 · 브랜드명이 실존하는지 · 변수에 담아 조립한 전화번호·주소 · JS 로 계산한 fixed 헤더 위치 · 다른 파일 함수가 여는 가짜 성공 화면 · 코드 뒤 줄 끝 주석은 **걸린다**(샘플엔 주석에도 실번호를 적지 않는다) → **썸네일 두 장과 화면을 눈으로 본다** |

주석 처리: 코드 검사(fetch·폼·fixed)는 주석을 지우고 본다. 글자 검사(전화·이메일·금지 표현·접수 문구)는 블록 주석과 「줄 전체가 주석」인 줄만 지운다 — JSX 텍스트의 `대표번호 // 02-…` 같은 글자도 검사된다.

---

## 9. 커밋

```bash
cd C:\Projects\taemun-net-light
npx tsc --noEmit -p .                                                      # 내 파일 오류 0
npm run audit:portfolio -- --base http://localhost:3001 --strict <slug>    # ERROR 0 (포트는 띄운 서버에 맞춘다)
git add "src/app/(demos)/demo/<slug>" "src/components/demos/<slug>" "src/content/portfolio/<slug>.json" "public/portfolio/<slug>" "private-assets/portfolio/<slug>"
git diff --cached --stat                                                   # 내 경로만 올라갔는지 눈으로 확인
git commit -m "feat(portfolio): <가상 브랜드> <업종> 샘플 입고"
git push
```

- **`git add .` / `git add -A` 금지.** 같은 작업 트리에 다른 에이전트의 미커밋 변경이 있다. 경로를 괄호째 따옴표로 감싼다(`(demos)`).
- **카드 JSON(`src/content/portfolio/<slug>.json`)을 빠뜨리지 않는다.** 2026-09-16 에 데모 `page.tsx` 만 스테이징되고
  카드 3장이 추적조차 안 된 채 남아 있었다 — 그대로 커밋하면 **카드 없는 데모**가 나간다. 지금은 `audit:portfolio` 가 ERROR 로 막는다.
- 데모가 영상·이미지를 들고 왔으면 `private-assets/portfolio/<slug>/` 도 같이 add 한다(5-1 의 2번).
- **`tsconfig.tsbuildinfo` 는 올리지 않는다.** tsc·build 가 매번 다시 쓰는 캐시이고, 샘플 경로가 기록된다.
- `git diff --cached` 에 내 slug 밖 파일이 보이면 `git restore --staged <그 파일>` 로 뺀다.
- 샘플 여러 개를 한 번에 넣어도 **샘플 1개 = 커밋 1개** 가 좋다(문제가 난 샘플만 되돌릴 수 있게).
- `schema.ts`·`demo-kit/*`·`(demos)/layout.tsx`·`globals.css`·`next.config.ts`·`package.json`·스크립트는 공장에서 고치지 않는다. 필요하면 가온에게 요청.
- 빌드 확인이 필요하면 `npm run build` — 카드 JSON 하나라도 규격 위반이면 `포트폴리오 입고 규격 위반 N건` 으로 **빌드 전체가 멈춘다**(Vercel 배포도 멈춤).

---

## 10. 자주 나는 문제

| 증상 | 원인 | 고치기 |
|---|---|---|
| 빌드가 `포트폴리오 입고 규격 위반` 으로 멈춤 | 카드 JSON 규격 위반 | `npm run audit:portfolio` 로 어느 칸인지 보고 고친다 |
| `slug 「…」 가 파일 이름 「….json」 과 다릅니다` | 파일명·slug 오타 | 2장 표의 곳을 전부 똑같이 |
| `liveUrl … 의 페이지가 없습니다` | 폴더명과 liveUrl 불일치, 또는 `page.tsx` 없음 | `src/app/(demos)/demo/<slug>/page.tsx` 확인 |
| `client(고객명)는 kind=case … 에서만` | 샘플에 `client`/`period` | 칸을 지운다 |
| `features 는 문자열 3~6개` | 2개 이하·7개 이상·빈 문자열 | 3~6개로 |
| 포트폴리오 목록에 안 보임 | 카드 JSON 없음(폴더만 있음) | `src/content/portfolio/<slug>.json` 생성 |
| 홈 화면·헤더 드롭다운에 안 보임 | 홈·헤더는 레지스트리 `featured` 카드만 보여 준다. 공장 샘플은 `featured` 를 넣지 않는다 | 정상 — `/portfolio` 에 보이면 입고 완료. 대표작은 형·가온이 고른다 |
| 스크롤하면 헤더가 샘플 바 밑으로 사라짐 / audit `fixed + top-0` ERROR·`sticky top-0` WARN | `sticky top-0` / `fixed top-0` / `style position:fixed; top:0` | `sticky top-[var(--sample-bar-h,0px)]` |
| 메뉴 클릭 시 섹션 제목이 헤더에 가림 | 앵커 섹션에 여백 없음 | `scroll-mt-[calc(var(--sample-bar-h,0px)+<헤더높이>)]` |
| 메뉴를 눌러도 안 움직임 | `href="#process"` 인데 `id="process"` 섹션이 없음 | 섹션을 만들거나 메뉴를 지운다 |
| 샘플 모달이 샘플 바 아래로 깔림/바를 덮음 | z-index | 샘플 z-index 는 9000 미만. 바는 모달 위에 보이는 게 정상 |
| 사이트 전체(다른 샘플·태문 사이트) 글꼴·배경이 바뀜 | 전역 CSS import 또는 `globals.css` 수정 | 전역 CSS 삭제 → Tailwind 클래스 / CSS Modules |
| `window is not defined` / `document is not defined` | 렌더 중 브라우저 API | `useEffect` 안으로 |
| Hydration 경고, 새로고침마다 숫자가 다름 | 렌더 중 `Date.now()`·`Math.random()`·`new Date()` | 고정 값으로 |
| 서버→클라이언트 넘길 때 500 | 함수·아이콘 컴포넌트를 props 로 넘김 | `page.tsx` 는 `<Slug>App />` 만 렌더, 데이터·아이콘은 `src/components/demos/<slug>/` 안에 |
| `next/image` 외부 이미지 오류 | `remotePatterns` 설정 없음 | `<img>` 로 쓰거나 파일을 `public/portfolio/<slug>/assets/` 로 |
| audit 실측 `이미지 상태 404` WARN | 외부 스톡 이미지 주소가 죽음 | 다른 주소로 바꾸거나 로컬 파일로 |
| audit `폼이 있는데 SampleNotice …` ERROR | 접수 폼 파일이 SampleNotice 를 렌더하지 않음(다른 파일에 있어도) | 4장 코드. 폼을 쪼갰으면 `onSubmit={onBook}` props 로 받기. 검색·필터 폼이면 `role="search"` / `data-sample-local` |
| audit `SampleNotice 가 한 번도 열리지 않습니다` ERROR | `<SampleNotice open={noticeOpen}>` 만 두고 `setNoticeOpen(true)` 가 없음 | 제출 핸들러에서 `setNoticeOpen(true)` |
| audit `가짜 접수 문구` ERROR | 「접수되었습니다」「예약이 완료되었습니다」 성공 화면·토스트 | 지우고 SampleNotice 를 연다 |
| audit `SAMPLE_SLUG … 카드 slug 와 다릅니다` / `industry … 다릅니다` ERROR | 복사하면서 이웃 샘플 값이 남음 | 2장 표의 곳을 전부 같은 값으로 |
| audit `fetch( 호출` ERROR | AI Studio 가 넣은 API 호출 | 삭제하고 상수 데이터로 |
| audit `<title> 이 레이아웃 기본 제목` ERROR | `metadata.title` 없음 | 3-1 템플릿대로 |
| audit `샘플인데 noindex 가 없습니다` ERROR | 샘플을 `(site)` 아래에 만들었거나 page 에서 `robots` 를 덮어씀 | `(demos)` 로 옮기고 `robots` 칸 삭제 |
| capture `서버에 연결할 수 없습니다` | 서버가 안 떠 있음 / 포트 다름 | 7장대로 서버 확인, `--base` |
| capture `페이지 상태 500` | 페이지가 서버에서 죽음 | 브라우저 대신 `curl -I http://localhost:3001/demo/<slug>` 와 dev 로그 확인 → 코드 수정 |
| capture 「건너뜀 — 이미 있음」인데 옛 화면 | 기존 PNG 유지 | `--force` |
| capture 대상 0개 | JSON 에 `thumbnail` 칸을 넣었거나 규격 위반 | `thumbnail` 삭제, audit 로 규격 확인 |
| 썸네일이 빈 화면 | 등장 애니메이션 3초 초과·지연 로딩 | 첫 화면 애니메이션 단축, 히어로 이미지에 `loading="lazy"` 를 쓰지 않는다 |
| 샘플 바 × 로 접었더니 바가 안 나옴 | 이 탭(세션) 동안 접힘 유지. 왼쪽 아래 「태문 샘플 사이트」 칩이 남는다 | 칩을 누르면 다시 펼쳐진다 |
| 샘플 폴더를 지우거나 slug 를 바꾼 뒤 `npx tsc` 가 `.next/types/validator.ts … TS2307 Cannot find module '…/page.js'` | `.next` 캐시에 옛 경로가 남음(내 코드 문제 아님) | `npm run build` 한 번 → tsc 다시. `tsconfig.tsbuildinfo` 변경은 커밋하지 않는다 |
| 문의 페이지에서 「샘플을 보고 오셨군요」 칩이 서버 HTML 에 없음 | 수화 후에 주소를 읽는 구조(정상) | 브라우저에서 확인. 링크가 `/inquiry?from=<slug>&industry=<key>` 면 된다 |
