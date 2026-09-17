export interface CultivarProfile {
  id: string;
  name: string;
  subName: string;
  description: string;
  yieldMultiplier: number;
  priceMultiplier: number;
  waterMultiplier: number;
  growthDays: number;
  targetBrix: string;
  tag: string;
}

export interface SpectrumMode {
  id: number;
  peakNm: string;
  title: string;
  badge: string;
  colorName: string;
  colorHex: string;
  description: string;
  markerPercent: string;
  ppfd: number;
  photosynthesisRate: number;
  photosynthesisLabel: string;
  nutrientDensity: number;
  nutrientLabel: string;
  crispIndex: number;
  crispLabel: string;
  targetCanopyTitle: string;
}

/** 관제 모달의 시설 탭 하나. 탭을 바꾸면 아래 지표·서브시스템이 통째로 바뀐다(탭이 화면을 실제로 바꾸게 하는 데이터). */
export interface FacilityTelemetry {
  id: 'towerA' | 'towerB' | 'sejong';
  /** 데스크톱 탭 라벨 */
  label: string;
  /** 모바일 탭 라벨 — 좁은 화면에서 탭 줄이 넘치지 않게 짧게 */
  shortLabel: string;
  /** 탭 본문 머리의 한 줄 설명 */
  caption: string;
  /** 양압 차압 기준값(Pa) — 화면에서 미세 변동을 더해 보여 준다 */
  pressurePa: number;
  /** 시간당 공기 순환 횟수(ACH) */
  airChanges: string;
  /** 양액 pH 기준값 */
  phBase: number;
  /** 용존산소량 기준값(mg/L) */
  doBase: number;
  /** 재배 중인 라인 */
  cropLine: string;
  subsystems: {
    label: string;
    value: string;
    /** 점 색 — primary(녹) · secondary(청) */
    tone: 'primary' | 'secondary';
  }[];
}

/** 푸터·내비에서 여는 자료 모달 한 건. 6개 링크가 모두 자기 내용을 갖는다(기본값으로 떨어지는 링크 없음). */
export interface DocEntry {
  subtitle: string;
  content: string[];
}

export interface CalculatorState {
  footprintPyung: number;
  selectedCropId: string;
}

/**
 * 계산기의 「현재 시뮬레이션 조건으로 견적 요청」이 B2B 폼에 실어 보내는 값.
 * stamp 는 같은 조건으로 다시 눌러도 폼이 새로 채워지게 하는 호출 도장이다.
 */
export interface QuotePrefill {
  stamp: number;
  footprintPyung: number;
  cropName: string;
  annualTonnes: number;
}

export interface B2BInquiryData {
  inquiryType: 'turnkey' | 'supply' | 'rnd';
  companyName: string;
  representative: string;
  email: string;
  phone: string;
  scaleOption: string;
  tourDate: string;
  details: string;
}
