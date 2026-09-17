import { CultivarProfile, DocEntry, FacilityTelemetry, SpectrumMode } from '../types';

export const CULTIVARS: CultivarProfile[] = [
  {
    id: 'butterhead',
    name: '프리미엄 버터헤드 레터스 (Butterhead)',
    subName: '버터 같은 부드러운 식감을 살린 품종',
    description: '버터 같은 부드러운 식감을 살린 품종으로, 파인다이닝·특급호텔 납품을 상정한 라인입니다.',
    yieldMultiplier: 1.0,
    priceMultiplier: 1.2,
    waterMultiplier: 0.9,
    growthDays: 28,
    targetBrix: '4.8°Bx',
    tag: '호텔 & 다이닝 납품용',
  },
  {
    id: 'romaine',
    name: '크리스피 로메인 & 카이피라 (Crispy Romaine)',
    subName: '아삭한 식감 유지 14일 (예시 수치)',
    description: '아삭한 식감 유지 14일(예시), 프리미엄 샐러드팩 및 기내식 케이터링 공급 설정',
    yieldMultiplier: 1.25,
    priceMultiplier: 1.1,
    waterMultiplier: 1.05,
    growthDays: 30,
    targetBrix: '4.2°Bx',
    tag: '대량 공급 최적화',
  },
  {
    id: 'medicinal',
    name: '기능성 희귀 바이오 약용작물 (Bio-Medicinal Herb)',
    subName: '지표성분 정밀 표준화',
    description: '지표성분 정밀 표준화, 고부가가치 화장품 및 제약 원료 추출물',
    yieldMultiplier: 0.65,
    priceMultiplier: 2.4,
    waterMultiplier: 1.4,
    growthDays: 35,
    targetBrix: '6.5°Bx',
    tag: '초고부가가치 원료',
  },
];

export const SPECTRUM_MODES: SpectrumMode[] = [
  {
    id: 1,
    peakNm: '450nm PEAK',
    title: 'Blue Spectrum (450nm) - 엽록소 강화 및 조직 치밀화',
    badge: '영양 생장 모드',
    colorName: 'secondary',
    colorHex: '#00687a',
    description: '엽록소 A와 B의 흡수 구간에 광량을 몰아 줄기를 굵게 하고 잎 표면 세포벽을 치밀하게 만드는 모드입니다. 보관 기간(Shelf-life) 연장을 노린 설정값이며 아래 지표는 예시 수치입니다.',
    markerPercent: '20%',
    ppfd: 320,
    photosynthesisRate: 84,
    photosynthesisLabel: '84% of Theoretical Max',
    nutrientDensity: 92,
    nutrientLabel: '92 / 100 Index',
    crispIndex: 98,
    crispLabel: '98 / 100 (Optimal)',
    targetCanopyTitle: 'Blue Dominated (450nm Heavy)',
  },
  {
    id: 2,
    peakNm: '660nm HYPER-RED',
    title: 'Red Spectrum (660nm) - 광합성 및 생체중 증대',
    badge: '바이오매스 가속',
    colorName: 'error',
    colorHex: '#ba1a1a',
    description: '광계 II의 광자 수용 구간을 집중 자극해 생체중(Fresh Weight) 증가 속도를 끌어올리고 당도(Brix)를 단기간에 높이는 것을 목표로 한 모드입니다. 아래 지표는 예시 수치입니다.',
    markerPercent: '75%',
    ppfd: 380,
    photosynthesisRate: 99,
    photosynthesisLabel: '99% (Maximum Speed)',
    nutrientDensity: 88,
    nutrientLabel: '88 / 100 Index',
    crispIndex: 74,
    crispLabel: '74 / 100 (Rapid Tissue)',
    targetCanopyTitle: 'Red Dominated (660nm Biomass Boost)',
  },
  {
    id: 3,
    peakNm: '730nm FAR-RED + UV',
    title: 'Far-Red / UV (730nm) - 기능성 파이토케미컬 강화',
    badge: '기능성 소재 특화',
    colorName: 'primary',
    colorHex: '#006948',
    description: '피토크롬 원적색광 반응과 온화한 UV 스트레스를 유도해 폴리페놀·루테인·안토시아닌 등 항산화 대사물질 생성을 늘리는 것을 목표로 한 모드입니다. 아래 지표는 예시 수치입니다.',
    markerPercent: '90%',
    ppfd: 290,
    photosynthesisRate: 78,
    photosynthesisLabel: '78% (Specialized Metabolic)',
    nutrientDensity: 99,
    nutrientLabel: '99 / 100 (Peak Bioactive)',
    crispIndex: 89,
    crispLabel: '89 / 100 (Sturdy)',
    targetCanopyTitle: 'Far-Red + Mild UV Phytochemical Trigger',
  },
];

export const COLD_CHAIN_STEPS = [
  {
    step: 'STEP 01',
    time: '04:00 AM',
    title: '무균 자동 수확 및 저온 예냉',
    icon: 'precision_manufacturing',
    color: 'primary',
    description: 'Class 1000급 클린룸(예시 기준) 내부에서 사람의 손이 닿지 않는 로봇 암 자동 커팅 후 2°C 진공 급속 예냉(Pre-cooling)으로 호흡열을 급속 제어합니다.',
  },
  {
    step: 'STEP 02',
    time: '05:30 AM',
    title: '친환경 산소차단 MAP 포장',
    icon: 'package_2',
    color: 'secondary',
    description: '생분해성 식물성 필름과 미세 기체 치환(MAP) 포장을 적용하고, 박스마다 실시간 무선 온도·습도 감지 IoT 비콘을 부착합니다.',
  },
  {
    step: 'STEP 03',
    time: '06:30 AM',
    title: '친환경 전기 냉장 탑차 직배송',
    icon: 'electric_car',
    color: 'tertiary',
    description: '진천 기가팜 및 세종 물류 허브에서 수도권 전역으로 주행 중 배기가스가 없는 EV Cold-Van이 3~5°C 항온을 유지하며 논스톱 주행하는 구성입니다.',
  },
  {
    step: 'STEP 04',
    time: '08:00 AM',
    title: '특급 파트너사 입고 완료',
    icon: 'domain_verification',
    color: 'primary',
    description: '수확 4시간 만에 호텔 키친, 기내식 조리 센터 및 프리미엄 유통 매장에 신선도를 유지한 상태로 전달하는 공정 설정입니다. (예시)',
  },
];

/**
 * 관제 모달의 시설 3곳. 값이 시설마다 달라야 탭이 「실제로 화면을 바꾸는」 탭이 된다
 * (예전엔 탭만 켜지고 본문은 그대로였다). 전부 가상 시설의 예시 수치다.
 */
export const FACILITY_TELEMETRY: FacilityTelemetry[] = [
  {
    id: 'towerA',
    label: '진천 제1 기가팜 타워 A (버터헤드 라인)',
    shortLabel: '타워 A',
    caption: '상용 출하용 버터헤드 레터스 12단 적층 타워 — 28일 회전 배치 운영 설정',
    pressurePa: 18.2,
    airChanges: '48.5 ACH',
    phBase: 5.82,
    doBase: 8.4,
    cropLine: '프리미엄 버터헤드 레터스 (GC-B01)',
    subsystems: [
      { label: '초음파 에어로포닉스 분무 노즐 어레이', value: '1,280 / 1,280 노즐 정상 분사', tone: 'primary' },
      { label: 'HEPA H14 필터 차압 및 청정도', value: '0.3µm 입자 포집률 99.995% (예시)', tone: 'primary' },
      { label: 'AI 멀티스펙트럼 LED 드라이버 전력망', value: '태양광 ESS 연계 가동 (예시)', tone: 'secondary' },
    ],
  },
  {
    id: 'towerB',
    label: '진천 제1 기가팜 타워 B (로메인 라인)',
    shortLabel: '타워 B',
    caption: '샐러드팩·케이터링 대량 공급용 로메인 라인 — 660nm 바이오매스 가속 모드 운영 설정',
    pressurePa: 16.7,
    airChanges: '52.0 ACH',
    phBase: 6.04,
    doBase: 7.9,
    cropLine: '크리스피 로메인 & 카이피라 (GC-R03)',
    subsystems: [
      { label: '초음파 에어로포닉스 분무 노즐 어레이', value: '1,536 / 1,540 노즐 가동 · 4기 정기 세정 중', tone: 'secondary' },
      { label: 'HEPA H14 필터 차압 및 청정도', value: '필터 교체 주기 잔여 38일 (예시)', tone: 'primary' },
      { label: 'AI 멀티스펙트럼 LED 드라이버 전력망', value: '660nm 가속 모드 · 정격 대비 출력 92%', tone: 'secondary' },
    ],
  },
  {
    id: 'sejong',
    label: '세종 AI R&D 연구소 (바이오 의약용)',
    shortLabel: '세종 R&D',
    caption: '지표성분 표준화를 검증하는 소규모 실증 챔버 — 730nm 원적색광 + 미약 UV 조건 시험 설정',
    pressurePa: 22.5,
    airChanges: '61.2 ACH',
    phBase: 5.64,
    doBase: 9.1,
    cropLine: '기능성 희귀 바이오 약용작물 (GC-M07)',
    subsystems: [
      { label: '실증 챔버 분무 노즐 어레이', value: '96 / 96 노즐 정상 분사 · 챔버 4기 병렬', tone: 'primary' },
      { label: 'HEPA H14 필터 차압 및 청정도', value: '연구동 기준 강화 운영 (예시 기준)', tone: 'primary' },
      { label: '지표성분 분석 (HPLC) 큐', value: '금일 배치 12건 분석 대기', tone: 'secondary' },
    ],
  },
];

/**
 * 푸터 6개 링크와 내비의 Investor Portal 이 여는 자료 모달 본문.
 * 예전엔 3건만 내용이 있고 나머지는 같은 기본값으로 떨어져 「빈 모달」처럼 읽혔다 — 7건 모두 자기 내용을 갖는다.
 * 전부 가상 브랜드의 예시 표기이며 실제 인증·지정·성적서가 아니다.
 */
export const DOC_ENTRIES: Record<string, DocEntry> = {
  'Investor Portal': {
    subtitle: '그린큐브 IR 정보 및 지속가능경영 공시 (예시 수치)',
    content: [
      '누적 스마트팜 시설 수주 잔고 840억 원 — 화면 구성을 보여 주기 위한 예시 수치입니다',
      '재생에너지 자립형 수직스마트팜 전력 계통 연계를 목표로 한 설정 (예시)',
      '시리즈 B 라운드 지속가능 펀드 및 B2B 식품사 컨소시엄 투자 유치 (예시)',
      '무농약·우수농산물 관리 기준 충족 (예시 표기 — 실제 지정·인증이 아닙니다)',
    ],
  },
  'Food Safety Compliance': {
    subtitle: '식품안전 관리 체계 (예시 기준 — 실제 인증이 아닙니다)',
    content: [
      '파종·생육·수확·포장 4개 공정에 위해요소 중점관리 기준을 적용하는 설정 (예시)',
      '작업자 위생: 에어샤워 통과 기록과 방진복 착용 이력을 배치 번호에 함께 남기는 구성',
      '잔류 농약·중금속 검사 성적서를 분기마다 공개하는 운영 설정 (예시)',
      '출하 배치마다 재배 타워·품종·수확 시각을 되짚을 수 있는 이력 추적 번호 부여',
    ],
  },
  'Cleanroom Protocols': {
    subtitle: 'Class 1000급 클린룸 운영 프로토콜 (예시 기준)',
    content: [
      '차압(Differential Pressure): 인접 구역 대비 +15~20Pa 양압 유지',
      '공기 정화: H14급 고성능 HEPA 필터링 (0.3µm 초미세 입자 99.995% 차단 — 예시 수치)',
      '작업자 프로토콜: 3단계 에어샤워, 전신 정전기 방지 무균 방진복 착용 필수',
      '해충 및 병원균: 토양 매개 세균과 외부 해충의 유입 경로를 차단하는 밀폐 구조 (예시 기준)',
    ],
  },
  'Cultivar Registry': {
    subtitle: '스마트팜 전용 품종 등록부 (예시 수치)',
    content: [
      'GC-B01 (버터헤드): 엽두께 1.4mm, 수분 유지력 14일 (예시)',
      'GC-R03 (크리스피 로메인): 광도 380 PPFD 적응형, 질산염 잔류량 관리 기준 대비 60% 이하 (예시)',
      'GC-M07 (바이오 약용식물): 루테인·폴리페놀 지표성분 노지 재배 대비 증폭을 목표로 한 설정 (예시)',
    ],
  },
  'ESG Transparency': {
    subtitle: '지속가능경영 지표 공개 기준 (예시 수치)',
    content: [
      'Scope 1·2·3 배출량을 연 1회 산정해 공개하는 설정 — 화면의 감축량은 예시 수치입니다',
      '용수: 폐쇄형 순환 여과로 98.4% 재활용, 방류량 최소화를 목표로 한 설계 (예시)',
      '전력: 태양광 ESS 연계 비중을 단계적으로 늘리는 전환 계획 (예시)',
      '포장: 생분해성 식물성 필름 적용 비중과 회수율을 함께 공개하는 구성',
    ],
  },
  'Biosecurity Terms': {
    subtitle: '생물보안 및 참관 준수 사항 (예시 기준)',
    content: [
      '참관 전 48시간 이내 타 농장·축사 방문 이력이 있으면 참관이 제한되는 운영 기준 (예시)',
      '반입 금지: 외부 식물체, 토양, 미개봉 식품, 살아 있는 곤충',
      '촬영은 지정 구역에서만 가능하며 클린룸 내부 장비 근접 촬영은 사전 협의 대상',
      '생육 데이터·분광 제어 파라미터는 계약 상대방에게만 제공하는 영업비밀 취급',
    ],
  },
  'Privacy Shield': {
    subtitle: '개인정보 처리 안내 (샘플 화면 — 실제 수집이 없습니다)',
    content: [
      '이 화면은 가상 브랜드 샘플이라 문의·예약 폼의 입력값을 저장하거나 전송하지 않습니다',
      '실제 운영 사이트라면 문의 접수에 필요한 최소 항목만 받고 보유 기간을 함께 고지합니다',
      '수집 항목·목적·보유 기간·파기 절차를 표로 공개하는 구성을 그대로 만들어 드립니다',
      '문의 내역 열람·정정·삭제 요청 창구를 페이지 안에 두는 구성 (예시)',
    ],
  },
};

export const CLIENT_TIERS = [
  {
    icon: 'apartment',
    title: '5-STAR LUXURY HOTELS',
    subtitle: 'VIP 파인다이닝 식자재 납품',
    color: 'text-primary',
  },
  {
    icon: 'flight_takeoff',
    title: 'GLOBAL AIRLINES',
    subtitle: '퍼스트/비즈니스 라운지 공급',
    color: 'text-secondary',
  },
  {
    icon: 'shopping_basket',
    title: 'PREMIUM RETAIL HUBS',
    subtitle: '유기농 클린 무농약 전용관',
    color: 'text-tertiary',
  },
  {
    icon: 'science',
    title: 'BIO-PHARMA LABS',
    subtitle: '고순도 지표 약용작물 R&D 제휴',
    color: 'text-outline',
  },
];
