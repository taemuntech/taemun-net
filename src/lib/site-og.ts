// 사이트 틀((site)) 페이지의 공유 미리보기 이미지 — 카카오톡·메신저 링크 공유에 그림이 나오게 한다.
// 페이지가 openGraph 를 따로 선언하면 레이아웃의 openGraph 를 통째로 덮으므로(키 단위 얕은 병합) 각 페이지도 이 값을 같이 넣는다.
// twitter:image 는 비워 두면 Next 가 openGraph.images 에서 채운다.
// 전용 OG 이미지(1200×630)가 생기면 여기만 바꾼다. 지금은 업종별 샘플(아뜰리에 보클루즈) 캡처 썸네일.

export const SITE_OG_IMAGES = [
  {
    url: "/portfolio/atelier-vaucluse/desktop.png",
    width: 1440,
    height: 900,
    alt: "태문 DEV STUDIO 가 만든 업종별 샘플 사이트 화면",
  },
];
