export interface LayerData {
  id: number;
  label: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  thermal: string;
  thermalPercent: number;
  bandwidth: string;
  bandwidthPercent: number;
  warpage: string;
  warpagePercent: number;
  node: string;
  underfill: string;
  cap: string;
}

export interface SimSettings {
  pkgDim: number; // in mm, e.g. 50, 75, 100, 120
  hbmCount: number; // e.g. 4, 8, 12, 16
  tdp: number; // in W, e.g. 300 to 1500
}

// ConsultationFormData 는 폼 제출값을 가짜 접수 모달로 넘기던 형식이었다 —
// 샘플은 입력값을 어디에도 보내지 않고 SampleNotice 만 열므로 더 쓰지 않는다(2026-09-16 제거).
