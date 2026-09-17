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
    cutVal: "1mm 미세 홀 펀칭",
    cutDesc: "잇몸을 가르지 않고 작은 구멍으로만 정밀 진입하여 봉합 불필요",
    painVal: "붓기 · 멍 거의 없음",
    painDesc: "혈관 손상이 최소화되어 진통소염제 복용량 70% 감소",
    visitVal: "약 3회 방문",
    visitDesc: "진단, 식립 및 당일임시치아, 최종 보철 결합으로 스케줄 절약",
    timeVal: "10 ~ 15분 내외",
    timeDesc: "가이드 키트로 계획된 위치에 즉시 식립하므로 체어 타임 단축",
    safeVal: "사전 위험 100% 차단",
    safeDesc: "3D 시뮬레이션 드릴 스토퍼 적용으로 신경관 접근 원천 방지"
  },
  conv: {
    cutVal: "광범위 절개 및 봉합",
    cutDesc: "잇몸을 넓게 째어 뼈를 육안으로 확인 후 식립하여 잇몸 봉합 및 실밥 제거 필요",
    painVal: "심한 부종 (3~7일)",
    painDesc: "잇몸 및 연조직 절개로 인한 출혈과 턱 부위 멍, 통증 발생 빈도 높음",
    visitVal: "6 ~ 8회 내원",
    visitDesc: "절개, 봉합사 발거, 2차 수술, 인상 채득 등 잦은 치과 방문 요구",
    timeVal: "개당 30 ~ 50분",
    timeDesc: "시술자의 육안과 직관에 의존하여 골 상태를 확인하며 긴 시간 소요",
    safeVal: "시술자 감각 의존",
    safeDesc: "식립 각도 및 깊이 오차로 인한 신경 손상 또는 인접 치아 간섭 위험 상존"
  }
};

export const VENEER_CASES: VeneerCase[] = [
  {
    id: 1,
    tag: "0.1mm 무삭제 · 상악 6전치 시술",
    title: "치간 이개(벌어진 치아) 및 왜소치 공간 황금비율 재건",
    desc: "자연치아 삭제를 일절 진행하지 않는 초박막 0.1mm 라미네이트로 시술되었습니다. 치아 표면의 미세 결(Perikymata)과 끝부분의 반투명 유백색 층을 살려 어떤 빛 아래에서도 진짜 치아처럼 자연스럽습니다.",
    beforeImg: CLINIC_IMAGES.veneerBefore,
    afterImg: CLINIC_IMAGES.veneerAfter,
    shadeApplied: "A1 (Natural Enamel)"
  },
  {
    id: 2,
    tag: "최소 삭제 0.2mm · 변색 치아 리커버리",
    title: "기존 레진 탈락 및 어두운 변색치아 스위스 이맥스 재건",
    desc: "노후화된 불투명 레진을 걷어내고 내면 세라믹 형광성을 강화한 맞춤 라미네이트를 적용했습니다. 주변 본래 치아와 경계선이 전혀 구분되지 않는 무결점 투명도를 자랑합니다.",
    beforeImg: CLINIC_IMAGES.veneerBefore,
    afterImg: CLINIC_IMAGES.veneerAfter,
    shadeApplied: "BL2 (Natural Bright)"
  },
  {
    id: 3,
    tag: "파절 파편 재건 · 잇몸 핑크 에스테틱 조화",
    title: "외부 충격으로 파절된 상악 중절치 및 잇몸 라인 대칭 복원",
    desc: "파절된 상악 치아의 신경을 보존하며 정밀 프랩 후 올세라믹 보철을 결합했습니다. 스마일 라인과 잇몸 높낮이를 0.1mm 단위로 리디자인하여 완벽한 미소를 완성했습니다.",
    beforeImg: CLINIC_IMAGES.veneerBefore,
    afterImg: CLINIC_IMAGES.veneerAfter,
    shadeApplied: "BL1 (Hollywood White)"
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
      "국내 명문 치과대학(예시) 졸업 및 동 대학원 치의학 박사",
      "대학 치과병원(예시) 구강악안면외과 전공의 수련 & 임상외래교수",
      "대한구강악안면외과학회 전문의 및 정회원",
      "스위스 ITI (International Team for Implantology) 국제정회원",
      "미국 AO (Academy of Osseointegration) Active Member"
    ],
    specialty: "컴퓨터 분석 1-Day 네비게이션 임플란트 • 고난도 뼈이식술",
    tagColor: "primary"
  },
  {
    name: "정서윤",
    title: "원장",
    department: "치과보철과 전문의",
    almaMater: "국내 B대학 치과대학(예시) 수석 졸업",
    image: CLINIC_IMAGES.drJeong,
    quote: "“치아의 진정한 아름다움은 과장된 백색이 아닌, 입술 곡선과 안면 근육, 피부 톤에 자연스럽게 스며드는 조화에서 비로소 완성됩니다.”",
    credentials: [
      "국내 B대학 치과대학(예시) 수석 졸업",
      "대학병원(예시) 치과보철과 전공의 수련 및 임상강사",
      "대한치과보철학회 인정의 및 정회원",
      "대한심미치과학회(KAED) 정회원 및 우수학술연구자상 수상",
      "독일 CEREC Digital Aesthetics Master 과정 수료"
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
    description: "외부의 감염원 유입을 원천 차단하는 독립 양압 환기 시스템과 프라이빗 가든 뷰 통창을 갖춘 단독 1인 진료 공간입니다. 대기부터 마취, 시술까지 타 환자와의 접촉 없이 프라이빗하게 진행됩니다.",
    image: CLINIC_IMAGES.heroSuite,
    specs: ["HEPA 14등급 클린에어", "체온 일치 36.5°C 무통마취기", "독립 음압/양압 멸균 시스템"]
  },
  {
    id: "cadcam",
    title: "원내 3D 디지털 CAD/CAM 밀링 센터",
    subtitle: "Swiss In-House Digital Laboratory",
    description: "구강 스캔 후 외부 기공소로 보내는 지체 시간을 없애고, 0.01mm 오차의 초정밀 독일/스위스 5축 밀링 머신으로 당일 임시보철 및 최종 세라믹을 즉시 원내에서 제작합니다.",
    image: CLINIC_IMAGES.mapBackground,
    specs: ["독일 CEREC 5-Axis Milling", "3D Trios 5 초정밀 스캐너", "의료용 생체적합 3D 프린터"]
  },
  {
    id: "sterilization",
    title: "9단계 대학병원급 중앙 멸균 소독실",
    subtitle: "Zero Infection Central Protocol",
    description: "1회용 기구 즉시 폐기 원칙 및 독일 Melag 클래스B 고압 증기 멸균기를 통한 9단계 철저 멸균. 모든 진료 기구는 1인 1팩 멸균 파우치 밀봉 후 진료 직전 환자 입회 하에 개봉됩니다.",
    image: CLINIC_IMAGES.heroSuite,
    specs: ["독일 Melag Class B 멸균기", "화학적 인디케이터 전수 검증", "1인 1팩 멸균 밀봉 개봉"]
  }
];
