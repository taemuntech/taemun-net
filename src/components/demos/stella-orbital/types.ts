export type SensorModeKey = 'optical' | 'sar' | 'hyper';

/**
 * 센서 스위처 한 칸이 들고 있는 값 — 탭을 바꾸면 화면의 이 값들이 전부 따라 바뀐다.
 * (예전에는 여기에 안 쓰는 필드가 여덟 개 있었고, 정작 화면의 FOV/GSD 줄은 어떤 탭에서도
 *  광학 값으로 고정돼 있었다. 「탭이 결과를 바꾸지 않는」 자리라 값을 이 표로 끌어왔다.)
 */
export interface SensorSpec {
  /** 탭 카드 머리의 모드 번호 — MODE // 01 */
  code: string;
  /** 탭 카드 오른쪽 배지 */
  badge: string;
  /** 탭 카드 제목 */
  name: string;
  /** 탭 카드 설명 */
  shortDesc: string;
  /** 아래 사양 패널 제목 */
  detailTitle: string;
  gsd: string;
  swath: string;
  bands: string;
  latency: string;
  revisit: string;
  /** 미리보기 좌상단 HUD 줄 */
  hudLabel: string;
  /** 미리보기 우하단 HUD 줄 */
  polarization: string;
  /** 미리보기 아래 좌측 광학계 표기 */
  fovGsd: string;
  imageUrl: string;
  imageAlt: string;
  /**
   * 미리보기 이미지에 입히는 표현 — SAR 는 흑백 후방산란, 초분광은 위색 합성이라
   * 같은 사진을 써도 탭을 바꾸면 화면이 실제로 달라진다.
   */
  imageClass: string;
}

// 샘플이라 촬영 의뢰를 받지 않는다 — 폼 제출은 SampleNotice 만 연다.
// 예전에는 세 번째 모달이 미션 오더 번호가 찍힌 가짜 접수증을 띄웠다(상단 바 버튼만 눌러도
// 폼 없이 떴다). 그래서 그 모달과 제출값 타입을 통째로 없앴다.
export type ModalType = 'dossier' | 'viewer' | null;

/** GeoTIFF 뷰어 모달의 밴드 한 칸 — 고르면 미리보기·판독값이 함께 바뀐다. */
export interface SpectralBand {
  id: string;
  label: string;
  /** 이 밴드가 무엇을 읽어 내는지 (모달 본문 설명) */
  reads: string;
  /** 미리보기 이미지에 입히는 표현 */
  imageClass: string;
  /** HUD 판독 줄 */
  readout: string;
  reflectance: string;
}
