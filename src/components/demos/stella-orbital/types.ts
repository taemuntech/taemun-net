export type SensorModeKey = 'optical' | 'sar' | 'hyper';

export interface SensorSpec {
  mode: SensorModeKey;
  code: string;
  badge: string;
  badgeClass: string;
  name: string;
  shortDesc: string;
  detailTitle: string;
  gsd: string;
  swath: string;
  bands: string;
  latency: string;
  revisit: string;
  hudLabel: string;
  polarization: string;
  fovGsd: string;
  imageUrl: string;
  imageAlt: string;
}

// 샘플이라 촬영 의뢰를 받지 않는다 — 폼 제출은 SampleNotice 만 연다.
// 예전에는 세 번째 모달이 미션 오더 번호가 찍힌 가짜 접수증을 띄웠다(상단 바 버튼만 눌러도
// 폼 없이 떴다). 그래서 그 모달과 제출값 타입을 통째로 없앴다.
export type ModalType = 'dossier' | 'viewer' | null;
