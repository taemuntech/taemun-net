import type { CSSProperties } from 'react';

export type VillaType = 'cliff' | 'presidential' | 'forest';
export type VillaFilter = 'all' | VillaType;

/** 표시 통화 — 헤더 토글이 실제로 금액을 바꾼다(환율은 예시 고정값, lib/format.ts) */
export type Currency = 'KRW' | 'USD';

export interface Villa {
  id: string;
  type: VillaType;
  name: string;
  nameKo: string;
  /** 필터 탭에 쓰는 짧은 이름 — 면적까지 들어간 긴 이름은 모바일에서 석 줄로 깨진다 */
  shortLabel: string;
  badge: string;
  region: string;
  areaText: string;
  description: string;
  specs: {
    suite: string;
    pool: string;
    circulation: string;
  };
  refinements: string[];
  pricePerNight: number;
  imageUrl: string;
  alt: string;
  /** 원본 사진에 다른 브랜드명·요금이 박혀 있을 때 그 부분을 잘라내는 크롭(인라인 style) */
  imageCropStyle?: CSSProperties;
}

export interface Destination {
  id: string;
  name: string;
  nameKo: string;
  multiplier: number;
  temp: string;
  /** 히어로 시계용 IANA 시간대 — 박제된 문자열 대신 실제 현지 시각을 표시한다 */
  timeZone: string;
}

export interface AddOnOption {
  id: string;
  title: string;
  price: number;
  defaultChecked?: boolean;
}

export interface StayCalculationState {
  destination: Destination;
  villa: Villa;
  nights: number;
  selectedAddonIds: string[];
}

export type ExperiencePillarId = 'gastro' | 'wellness' | 'journeys';

/** 헤더 메뉴 항목 — 이동만 하지 않고 해당 구역의 필터·탭까지 바꾼다 */
export type NavTarget = 'collection' | 'estates' | 'wellness' | 'gastronomy' | 'journeys';

export interface ExperiencePillar {
  id: ExperiencePillarId;
  tabTitle: string;
  category: string;
  title: string;
  description: string;
  stats: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  imageUrl: string;
  alt: string;
}

/** 푸터의 「차터(Charter)」 문서 — 죽은 빈 앵커 대신 실제로 열리는 모달 내용 */
export interface Charter {
  id: string;
  label: string;
  title: string;
  lead: string;
  clauses: { heading: string; body: string }[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  destination: string;
  partySize: string;
  preferredDates: string;
  specialRequirements: string;
}
