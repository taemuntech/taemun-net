import {
  CompetencyAxis,
  FunnelStage,
  KillerCallout,
  LearningScheduleItem,
  UniversityAdmission,
} from '../types';

export const ASSETS = {
  logo: '/portfolio/daechi-prestige/logo.png',
  boothStudent: '/portfolio/daechi-prestige/booth-student.jpg',
  consultingRoom: '/portfolio/daechi-prestige/consulting-room.jpg',
};

export const COMPETENCY_AXES: CompetencyAxis[] = [
  {
    id: 'concept',
    name: '1. 개념 완성도',
    baseline: 64,
    target: 98,
    badge: '12주 완성(예시)',
    growth: '+34% UP',
    description: '개념 완성도 & 논리 전개력',
    details: '출제위원 관점의 증명 수식 직관화 및 유도 과정 자동화',
    clinicalNote: '기출 출제위원 채점기준표 기반 논리 전개 체득(예시)',
  },
  {
    id: 'speed',
    name: '2. 킬러 연산 속도',
    baseline: 58,
    target: 99,
    badge: '속도 혁신(예시)',
    growth: '-78% Time',
    description: '킬러 연산 속도 (Speed Shortcut)',
    details: '미적분 30번 기준 15분 수식 전개를 3분 30초 대칭 숏컷으로 압축(예시)',
    clinicalNote: '대칭축/변곡점 기하학적 직관을 통해 불필요한 사차함수 전개식 전면 생략',
  },
  {
    id: 'pacing',
    name: '3. 실전 시간 안배',
    baseline: 62,
    target: 97,
    badge: '안정권 확보(예시)',
    growth: '50min 버퍼',
    description: '실전 100분 시간 안배 통제력',
    details: '비킬러 27문항 40분 주파 후 킬러 3문항 50분 검토 버퍼 확보(예시)',
    clinicalNote: '실전 모의 30회 훈련을 통해 시험지 인쇄 상태 확인부터 마킹까지 타임라인 고정(예시)',
  },
  {
    id: 'resilience',
    name: '4. 실전 멘탈 회복력',
    baseline: 66,
    target: 98,
    badge: '멘탈 클리닉(예시)',
    growth: '회복 탄력성(예시)',
    description: '당일 시험장 멘탈 회복 탄력성',
    details: '1교시 국어 돌발 난이도 충격 후 2교시 수학 집중도 3분 내 복원 프로토콜',
    clinicalNote: '대치 프레스티지 고유의 바이오피드백 호흡 및 인지전환 루틴 훈련 제공(예시)',
  },
  {
    id: 'defense',
    name: '5. 오답 함정 방어율',
    baseline: 70,
    target: 99.4,
    badge: '실수 방어(예시)',
    growth: '99.4% 방어(예시)',
    description: '모의고사 오답 함정 방어율',
    details: '평가원 고난도 지문 속 부호 역전 및 극값 배제 함정 식별',
    clinicalNote: '진수 조건, 정의구역 제한, 분모 0 조건 등 메디컬 핵심 실수 방어(예시)',
  },
];

export const FUNNEL_STAGES: FunnelStage[] = [
  {
    stage: 'STAGE 01',
    icon: 'biotech',
    title: '수능 킬러 3문항 정복(예시)',
    description:
      '수학 미적분 30번 및 과탐 생명과학II 가계도 코돈 킬러 유형 정밀 해체. 유형별 패턴 구조화로 문제 직면 시 풀이 알고리즘 즉시 발동(예시).',
    metricLabel: '개념 킬러 정복도',
    metricValue: '99% 마스터(예시)',
    progressPercent: 100,
    colorType: 'primary',
    curriculum: [
      '미적분 고난도 삼각함수 극한 & 사차함수 대칭 숏컷',
      '수학II 극값 분기점 3초 스캐닝 알고리즘',
      '생명과학II 복대립/가계도 필살 트리 구조화',
    ],
  },
  {
    stage: 'STAGE 02',
    icon: 'calculate',
    title: '가중치·변환표준점수 환산 최적화(예시)',
    description:
      '목표 대학별(S대, Y대, C대 등 가상 예시) 국/수/탐 영역별 반영비율 정밀 맞춤 시뮬레이션. 1점 차이로 당락이 갈리는 환산점수 0.1점 최적화(예시).',
    metricLabel: '대학별 환산 득점률',
    metricValue: '99.8% 달성(예시)',
    progressPercent: 95,
    colorType: 'tertiary',
    curriculum: [
      '대학별 변환표준점수 유불리 정밀 역추산',
      '국어 언매 vs 화작 / 수학 미적 vs 기하 표점 격차 헤징',
      '탐구 백분위 보정 공식 기반 지원선 0.1점 단위 세분화',
    ],
  },
  {
    stage: 'STAGE 03',
    icon: 'record_voice_over',
    title: '의대 MMI 심층면접 & 최종 안착(예시)',
    description:
      '의료 인성 및 생명윤리 딜레마 다면 인적성 면접(MMI) 실전 시뮬레이션. S대 의예과 출신(예시) 전임 교수진의 1:1 심층 피드백.',
    metricLabel: 'MMI 모의 면접 이수',
    metricValue: '30회 완수(예시)',
    progressPercent: 100,
    colorType: 'primary',
    curriculum: [
      '명문 의대 MMI 5개 방 롤플레잉 및 압박질문 대응(예시)',
      '의료 윤리(연명의료, AI 의료, 뇌사 판정) 심층 구술 정리',
      '합격생 기출 비디오 모니터링 & 시선/발화 교정(예시)',
    ],
  },
];

export const KILLER_CALLOUTS: KillerCallout[] = [
  {
    id: 'A',
    title: '발문 속 3초 숨은 조건 포착 (Gold Protocol)',
    description:
      '“모든 양수에서 g\'(x) ≤ 0” ➔ 도함수 부호 변화 지점을 극대/극소 그래프 대칭축과 3초 만에 즉각 일치화.',
    badge: 'Gold Protocol',
    bgColor: '#FFFBEB',
    textColor: '#725B38',
    accentColor: '#C5A880',
  },
  {
    id: 'B',
    title: '수험생 90%가 빠지는 오답 함정 (Red Alarm)',
    description:
      'x → 0에서의 진수 조건(f(x) > 0)을 망각하여 불필요한 미분 연산 3페이지를 전개하다 시간 초과로 침몰.',
    badge: 'Red Alarm',
    bgColor: '#FEF2F2',
    textColor: '#BA1A1A',
    accentColor: '#BA1A1A',
  },
  {
    id: 'C',
    title: '15분 수식을 3분으로 줄이는 프레스티지 대칭 숏컷',
    description:
      '사차함수 이중접선 공식과 로그함수의 점근선 관계를 접목하여 단 3줄 만에 최고차항 계수 결정 및 정답 도출.',
    badge: 'Shortcut Method',
    bgColor: '#ECFDF5',
    textColor: '#047857',
    accentColor: '#10B981',
  },
];

export const LEARNING_SCHEDULE: LearningScheduleItem[] = [
  {
    time: '08:00',
    title: '아침 데일리 킬러 10제 즉각 점검',
    description:
      '입실 직후 수능 1교시 생체리듬 동기화. 뇌 신경 활성화를 위한 고난도 킬러 10제 타임어택 테스트 및 즉시 자동 채점(예시).',
    category: 'Daily Assessment',
  },
  {
    time: '10:00',
    title: '수능 최상위 출제원리 핀셋 정규 본강의',
    description:
      '대치동 의대 전문 강사진의 출제 메커니즘 분해 강의. 문항 유형별 숨겨진 조건 즉시 포착 훈련.',
    category: 'Master Lecture',
  },
  {
    time: '14:00',
    title: '프리미엄 1인 독립 오크 원목 부스 순공 몰입',
    description:
      '소음 차단 방음 및 양압 항온항습 공조 시스템 속에서 하루 순수 집중 7시간 달성(예시). 백색소음 시스템 상시 가동.',
    category: 'Deep Work Lab',
  },
  {
    time: '18:00',
    title: '당일 취약점 1:1 맞춤 클리닉 (메디컬 튜터 상주)',
    description:
      '명문대 의예과 출신 튜터 상주(예시). 오늘 발생한 오답 1문항도 남김없이 당일 해소하는 1:1 대면 문답 클리닉.',
    category: '1:1 Clinic',
  },
  {
    time: '21:00',
    title: '학부모 안심 모바일 데일리 성적 리포트 발송',
    description:
      '오늘의 순공 시간, 모의 테스트 백분위, 취약 개념 처방전이 학부모님 스마트폰으로 전송됩니다(예시).',
    highlight: true,
    category: 'Parent Intelligence',
  },
];

export const UNIVERSITIES: UniversityAdmission[] = [
  {
    id: 'snu',
    code: 'SNU',
    name: 'S대 의예과 (예시)',
    baseConvertedScore: 418.5,
    weightKorean: 1.33,
    weightMath: 1.6,
    weightScience: 1.32,
    statusThreshSafe: 418.0,
    statusThreshOptimal: 416.0,
    statusThreshChallenge: 414.0,
    quotaNote: '(정원 내 예시)',
  },
  {
    id: 'ysu',
    code: 'YSU',
    name: 'Y대 의예과 (예시)',
    baseConvertedScore: 415.2,
    weightKorean: 1.31,
    weightMath: 1.58,
    weightScience: 1.33,
    statusThreshSafe: 416.5,
    statusThreshOptimal: 414.5,
    statusThreshChallenge: 412.5,
    quotaNote: '(일반전형 예시)',
  },
  {
    id: 'cmc',
    code: 'CMC',
    name: 'C대 의예과 (예시)',
    baseConvertedScore: 414.8,
    weightKorean: 1.3,
    weightMath: 1.57,
    weightScience: 1.32,
    statusThreshSafe: 414.5,
    statusThreshOptimal: 412.8,
    statusThreshChallenge: 410.5,
    quotaNote: '(학교장추천/일반 예시)',
  },
  {
    id: 'khu',
    code: 'KHU',
    name: 'K대 한의예과 (예시)',
    baseConvertedScore: 409.1,
    weightKorean: 1.28,
    weightMath: 1.54,
    weightScience: 1.3,
    statusThreshSafe: 408.5,
    statusThreshOptimal: 406.0,
    statusThreshChallenge: 403.0,
    quotaNote: '(수능위주 예시)',
  },
];
