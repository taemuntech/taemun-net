/**
 * 사진 원본 가장자리에 화면 요소(브라우저 창·상단 바·자막 띠 등)가 찍혀 있을 때 그만큼을 밀어내는 값.
 * 이미지를 감싼 상자가 overflow-hidden 이라, 확대한 만큼이 상자 밖으로 나가며 잘린다.
 * `scale` 배, 세로 기준점 `originY`(%) — 기준점이 아래쪽이면 위가, 위쪽이면 아래가 더 잘린다.
 * 남는 화면 비율은 1/scale 이므로 값이 클수록 쓰는 화소가 줄어든다.
 * **원본 사진을 다시 만드는 것이 정답이고 이건 임시 가림이다.**
 */
export type ImageCrop = {
  scale: number;
  /** 0 = 위, 50 = 가운데, 100 = 아래 */
  originY: number;
};

/** ImageCrop 을 img 에 그대로 얹을 수 있는 style 로 바꾼다. 값이 없으면 아무 것도 건드리지 않는다. */
export function imageCropStyle(crop?: ImageCrop): { transform: string; transformOrigin: string } | undefined {
  if (!crop) return undefined;
  return { transform: `scale(${crop.scale})`, transformOrigin: `50% ${crop.originY}%` };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Luxury Residential' | 'Commercial Lounge' | 'Workspace';
  koreanCategory: string;
  area: string;
  completionYear: string;
  location: string;
  subtitle: string;
  description: string;
  materialsUsed: string;
  image: string;
  imageCrop?: ImageCrop;
  renderImage?: string;
  gallery?: string[];
  specs?: {
    label: string;
    value: string;
  }[];
  features?: string[];
}

export interface MaterialSpecimen {
  id: string;
  tag: string;
  title: string;
  description: string;
  origin: string;
  image: string;
  imageCrop?: ImageCrop;
  specsDetails?: {
    grade?: string;
    finish?: string;
    thickness?: string;
    application?: string;
  };
}

/**
 * 프로젝트 카드·상세 모달에서 상담 폼으로 내려보내는 값.
 *
 * ⚠️ 프로젝트 제목을 「프로젝트 유형」 select 로 보내지 않는다 — option 목록에 없는 문자열이 들어가면
 *    제어 select 의 selectedIndex 가 -1 로 떨어져 **필수 항목이 빈 칸으로 보인다**. 제목은 메시지에만 싣는다.
 * nonce 로 「같은 프로젝트를 다시 눌러도 다시 적용」을 만든다 — key 재마운트로 하면 이미 친 성함·연락처가 지워진다.
 */
export interface ConsultationPrefill {
  nonce: number;
  message: string;
}

export interface ConsultationFormState {
  clientName: string;
  phone: string;
  location: string;
  area: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  privacyAgree: boolean;
}
