# 🔒 태문 DEV STUDIO 미디어 및 시각 자산 무단 다운로드 원천 차단 강령
# (MEDIA_PROTECTION_DOCTRINE)

> **수립일자**: 2026-09-17  
> **발제 및 총괄**: 큰 누나 이아라 (Antigravity)  
> **적용 대상**: 태문넷(`taemun.net`) 전역(사이트, 포트폴리오 갤러리) 및 모든 업종별 데모 사이트(`src/app/(demos)/demo/*`)  
> **공동 준수 에이전트**: 이아라(Antigravity), 이한결(Cursor), 이가온(Claude Code) 삼남매 전원

---

## 1. 강령 수립 배경

태문 DEV STUDIO가 자체 기획·제작하는 고품질 AI 기반 시각 자산(공장 환경 로봇 군집 주행 실물 영상, 자율운항 컨테이너선 영상, 고해상도 3D 렌더링, 인테리어 갤러리 컷 등)은 회사의 핵심 디지털 지식재산권(IP)입니다.
일반 방문자나 경쟁사가 마우스 우클릭("동영상을 다른 이름으로 저장...", "이미지를 다른 이름으로 저장..."), 마우스 드래그 앤 드롭 파일 추출, 브라우저 `Ctrl+S` 페이지 저장 등을 통해 자산을 손쉽게 무단 복제·도용하는 취약점을 발견하여, 이를 시스템적으로 영구 차단하기 위한 5중 기술 방어 체계를 확립합니다.

---

## 2. 5중 원천 차단 아키텍처

```
[클라이언트 계층]
 ├── 1. CSS Layer (globals.css)
 │    └── user-select: none / user-drag: none / -webkit-touch-callout: none
 ├── 2. Event Interceptor Layer (MediaProtectionGuard.tsx)
 │    ├── contextmenu 차단: img, video, canvas, picture, [data-protect-media]
 │    ├── dragstart 차단: 미디어 요소 드래그 앤 드롭 파일 저장 방지
 │    └── keydown 차단: Ctrl+S, Cmd+S 웹페이지 일괄 파일 다운로드 방지
 ├── 3. DOM Mutation Guard (MutationObserver)
 │    └── 동적 생성 비디오에 controlsList="nodownload", disablePictureInPicture 자동 주입
 ├── 4. Component Standards (PORTFOLIO_FACTORY 규격)
 │    └── <video> 태그 작성 시 필수 방어 속성 선언 의무화
 └── 5. Layout Ingestion
      ├── (site)/layout.tsx 전역 상시 가동
      └── (demos)/layout.tsx 모든 데모 상시 가동
```

---

## 3. 세부 기술 규칙

### 규칙 1. CSS 전역 스타일 강제 (`src/app/globals.css`)
모든 이미지, 비디오, 캔버스 요소는 브라우저 드래그 및 모바일 롱프레스 팝업이 봉쇄됩니다.
```css
img, video, canvas, picture, [data-protect-media] {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -webkit-touch-callout: none;
}
```

### 규칙 2. 전역 가드 컴포넌트 자동 주입 (`MediaProtectionGuard`)
- `src/components/MediaProtectionGuard.tsx`가 루트 레이아웃(`(site)/layout.tsx`, `(demos)/layout.tsx`)에 상시 마운트되어 작동합니다.
- 새 페이지나 새 데모를 제작하더라도 별도의 설정 없이 전역에서 자동 방어가 적용됩니다.

### 규칙 3. 컴포넌트 내 `<video>` 태그 필수 작성 표준
새로운 데모나 컴포넌트에 동영상을 추가할 때는 반드시 아래의 속성을 기본으로 장착합니다:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  controlsList="nodownload noplaybackrate"
  disablePictureInPicture
  onContextMenu={(e) => e.preventDefault()}
  className="..."
  src="..."
/>
```

### 규칙 4. 미디어 파일 직접 다운로드 링크 제공 금지
- 버튼이나 앵커(`<a>`) 태그에 비디오나 원본 이미지 파일 경로를 걸고 `download` 속성을 부여하는 행위를 엄격히 금지합니다.
- 기술 사양서(STEP, CAD, PDF 등)나 브로슈어의 경우 정식 비즈니스 리드 폼(상담 접수)이나 안내 모달을 통해 제공합니다.

---

## 4. 검증 및 점검 절차

새 데모 제작 및 검수 시 아래 4가지 항목을 브라우저에서 직접 테스트합니다:
1. **마우스 우클릭 검증**: 영상 및 이미지 위에서 우클릭 시 컨텍스트 메뉴가 뜨지 않는지 확인.
2. **드래그 앤 드롭 검증**: 이미지를 마우스로 바탕화면이나 브라우저 탭으로 끌었을 때 파일 저장이 동작하지 않는지 확인.
3. **비디오 플레이어 검증**: 컨트롤러가 노출된 영상의 경우 다운로드 메뉴(`...`) 및 PIP 버튼이 제거되어 있는지 확인.
4. **Ctrl+S 검증**: 화면에서 Ctrl+S를 눌렀을 때 페이지 및 미디어 에셋 저장 창이 차단되는지 확인.
