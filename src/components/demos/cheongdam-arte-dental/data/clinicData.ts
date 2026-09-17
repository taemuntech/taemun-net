import { ComparisonData, DoctorProfile, VeneerCase, ClinicFacility } from '../types';

export const CLINIC_IMAGES = {
  logo: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-10.png",
  heroSuite: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-04.jpg",
  veneerAfter: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-03.jpg",
  veneerBefore: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-07.jpg",
  drMin: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-09.jpg",
  drMinThumb: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-08.jpg",
  drJeong: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-06.jpg",
  drJeongThumb: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-02.jpg",
  mapBackground: "/demo-media/cheongdam-arte-dental/cheongdam-arte-dental-05.png"
};

export const COMPARISON_DATA: Record<'arte' | 'conv', ComparisonData> = {
  arte: {
    cutVal: "약 1mm 미세 홀 방식",
    cutDesc: "가이드를 통해 작은 구멍으로 진입하는 방식으로, 적응증에 따라 봉합을 생략하기도 합니다",
    painVal: "절개 범위가 작음",
    painDesc: "연조직 절개가 적어 수술 후 불편감을 줄이는 것을 목표로 하며, 경과는 개인차가 있습니다",
    visitVal: "약 3회 방문 (예시)",
    visitDesc: "진단, 식립 및 임시치아, 최종 보철 결합 순서로 일정을 계획합니다",
    timeVal: "10 ~ 15분 내외 (예시)",
    timeDesc: "가이드로 계획된 위치에 식립하므로 체어 타임을 짧게 잡습니다",
    safeVal: "3D 계획 기반 식립",
    safeDesc: "시뮬레이션에서 신경관·상악동과의 거리를 미리 확인하고 드릴 깊이를 제한합니다"
  },
  conv: {
    cutVal: "절개 후 봉합",
    cutDesc: "잇몸을 열어 뼈를 직접 확인한 뒤 식립하고, 봉합과 실밥 제거 과정이 따릅니다",
    painVal: "수술 후 부종 가능",
    painDesc: "연조직 절개 범위가 커 부기나 불편감이 생길 수 있으며, 정도는 개인차가 있습니다",
    visitVal: "내원 횟수 증가",
    visitDesc: "절개·봉합사 발거·2차 수술·인상 채득 등 단계가 나뉘어 방문 횟수가 늘어납니다",
    timeVal: "개당 30 ~ 50분 (예시)",
    timeDesc: "골 상태를 직접 보며 진행하므로 수술 시간이 길어지는 편입니다",
    safeVal: "직접 시야로 확인",
    safeDesc: "뼈를 눈으로 확인하며 식립하는 방식으로, 골 이식이 필요한 경우 등에 선택됩니다"
  }
};

export const VENEER_CASES: VeneerCase[] = [
  {
    id: 1,
    tag: "0.1mm 초박막 · 상악 전치부 계획 (예시)",
    title: "치간 이개(벌어진 앞니)와 치아 폭 비율을 다듬는 계획",
    desc: "자연치아 삭제를 최소화하는 초박막 라미네이트로 앞니 사이 공간과 폭 비율을 다듬는 방식입니다. 치아 표면의 미세 결과 끝부분의 반투명한 층을 살리는 것을 목표로 설계합니다. 적용 가능 여부와 결과는 잇몸·치아 상태에 따라 달라집니다.",
    beforeImg: CLINIC_IMAGES.veneerBefore,
    afterImg: CLINIC_IMAGES.veneerAfter,
    shadeApplied: "A1"
  },
  {
    id: 2,
    tag: "최소 삭제 0.2mm · 변색 치아 계획 (예시)",
    title: "누렇게 변색된 치아 색조를 세라믹으로 다듬는 계획",
    desc: "노후된 불투명 레진을 정리하고 내면 형광성을 고려한 맞춤 세라믹을 적용하는 방식입니다. 주변 치아와의 경계가 덜 드러나도록 색조와 투명도를 맞춰 제작합니다. 변색의 원인과 정도에 따라 치료 방법은 달라질 수 있습니다.",
    beforeImg: CLINIC_IMAGES.veneerBefore,
    afterImg: CLINIC_IMAGES.veneerAfter,
    shadeApplied: "BL2"
  },
  {
    id: 3,
    tag: "잇몸 라인 조화 · 스마일 라인 계획 (예시)",
    title: "잇몸 높낮이와 스마일 라인의 대칭을 고려한 계획",
    desc: "치아 길이와 잇몸 라인의 높낮이를 함께 보고 입술 곡선과의 조화를 설계하는 방식입니다. 진단 모형과 디지털 미리보기로 방향을 먼저 맞춘 뒤 진행 여부를 상담합니다. 잇몸 치료가 먼저 필요한 경우도 있습니다.",
    beforeImg: CLINIC_IMAGES.veneerBefore,
    afterImg: CLINIC_IMAGES.veneerAfter,
    shadeApplied: "BL1"
  }
];

export const DOCTOR_PROFILES: DoctorProfile[] = [
  {
    name: "민경훈",
    title: "대표원장",
    department: "구강악안면외과 전문의",
    almaMater: "국내 A대학 치과대학(예시) • 치의학 박사",
    image: CLINIC_IMAGES.drMin,
    quote: "“한 분 한 분의 뼈와 신경 구조는 지문처럼 모두 다릅니다. 단 0.1mm의 오차도 환자의 평생 저작 기능에 영향을 미친다는 타협 없는 철학으로 집도합니다.”",
    credentials: [
      "국내 치과대학(예시) 졸업 및 동 대학원 치의학 박사",
      "대학 치과병원(예시) 구강악안면외과 전공의 수련",
      "구강악안면외과 전문의 자격 취득 (예시)",
      "국제 임플란트 학술 모임 정회원 (예시)",
      "골융합·임플란트 관련 해외 학술 과정 이수 (예시)"
    ],
    specialty: "컴퓨터 분석 1-Day 네비게이션 임플란트 • 고난도 뼈이식술",
    tagColor: "primary"
  },
  {
    name: "정서윤",
    title: "원장",
    department: "치과보철과 전문의",
    almaMater: "국내 B대학 치과대학(예시) 졸업",
    image: CLINIC_IMAGES.drJeong,
    quote: "“치아의 진정한 아름다움은 과장된 백색이 아닌, 입술 곡선과 안면 근육, 피부 톤에 자연스럽게 스며드는 조화에서 비로소 완성됩니다.”",
    credentials: [
      "국내 B대학 치과대학(예시) 졸업",
      "대학 치과병원(예시) 치과보철과 전공의 수련",
      "치과보철과 전문의 자격 취득 (예시)",
      "심미보철 관련 국내 학술 모임 정회원 (예시)",
      "디지털 심미보철 아카데미 과정 수료 (예시)"
    ],
    specialty: "초박막 미세삭제 라미네이트 • 지르코니아 올세라믹 심미교합",
    tagColor: "secondary"
  }
];

export const CLINIC_FACILITIES: ClinicFacility[] = [
  {
    id: "suite",
    title: "1인 독립 VIP 음압·양압 수술실",
    subtitle: "Cheongdam Arte Garden View Suite",
    description: "외부 공기 유입을 줄이도록 설계한 독립 양압 환기 시스템과 프라이빗 가든 뷰 통창을 갖춘 단독 1인 진료 공간입니다. 대기부터 마취, 시술까지 다른 환자와 동선이 겹치지 않게 운영합니다.",
    image: CLINIC_IMAGES.heroSuite,
    specs: ["HEPA 14등급 클린에어", "체온 일치 36.5°C 마취액 보온", "독립 음압/양압 환기 시스템"]
  },
  {
    id: "cadcam",
    title: "원내 3D 디지털 CAD/CAM 밀링 센터",
    subtitle: "In-House Digital Laboratory",
    description: "구강 스캔 데이터를 외부 기공소로 보내지 않고 원내 5축 밀링 장비와 3D 프린터로 임시보철과 세라믹 보철을 제작합니다. 제작 일정은 보철 종류와 구강 상태에 따라 달라집니다.",
    image: CLINIC_IMAGES.heroSuite,
    specs: ["원내 5축 밀링 장비", "디지털 구강 스캐너", "의료용 생체적합 3D 프린터"]
  },
  {
    id: "sterilization",
    title: "9단계 중앙 멸균 소독실",
    subtitle: "Central Sterilization Protocol",
    description: "1회용 기구는 즉시 폐기하고, 클래스 B 고압증기 멸균기로 9단계 멸균 절차를 거칩니다. 모든 진료 기구는 1인 1팩 멸균 파우치에 밀봉해 진료 직전 환자 앞에서 개봉합니다.",
    image: CLINIC_IMAGES.heroSuite,
    specs: ["클래스 B 고압증기 멸균기", "화학적 인디케이터 검증", "1인 1팩 멸균 밀봉 개봉"]
  }
];

/**
 * 안심 사전 문진 항목 — 예약 폼과 확인 모달이 같은 목록을 읽는다.
 * 모달이 개수만 세고 고정 문구를 띄우면 「무엇을 골라도 같은 내용」이 되므로,
 * 고른 항목의 detail 을 모달 본문에 그대로 펼친다.
 */
export const FEAR_OPTIONS = [
  { id: 'pain', label: '마취 주사 통증에 극도로 민감합니다', detail: '컴퓨터 제어 저통증 마취 4단계 프로토콜 적용' },
  { id: 'sound', label: '치료 소리(기계음) 및 냄새에 불안감을 느낍니다', detail: '노이즈 캔슬링 헤드셋 및 아로마 테라피' },
  { id: 'gag', label: '과거 치료 시 구토 반사(Gag reflex) 또는 턱관절 통증 경험', detail: '3D 디지털 구강스캔 우선' },
  { id: 'sedation', label: '필요 시 수면 진정요법(가수면 치료) 상담을 희망합니다', detail: '전문 모니터링 장비 구비' }
];
