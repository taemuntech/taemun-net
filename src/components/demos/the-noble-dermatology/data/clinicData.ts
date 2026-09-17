// 가상 브랜드 샘플 데이터.
//
// 의료광고 규제 때문에 이 파일에서 지킨 것(고객이 이 템플릿을 그대로 쓰면 실제 의료기관이 된다):
//  - 실존 장비·의약품·제조사·유통사 이름을 쓰지 않는다. 시술은 「집속초음파(HIFU)」·「모노폴라 고주파」처럼
//    일반 명칭으로만 적고, 제품명이 필요한 자리는 지어낸 자체 프로토콜 이름을 쓴다.
//  - 실존 학회·대학·인증기관을 약력에 붙이지 않는다(전부 「(예시)」 표기).
//  - 효과를 단정하지 않는다(효과를 약속하는 말투를 쓰지 않고 「목표로 합니다」로 적는다).
//  - 치료경험담·후기·전후 사진을 두지 않는다(의료법 제56조 제2항 제1호).
//  - 할인·이벤트·경품 같은 환자 유인 표현을 두지 않는다(의료법 제27조 제3항).

import { Doctor, SpectrumData, Treatment, VerificationResult } from '../types';

export const CLINIC_INFO = {
  name: '더 노블 청담 피부과',
  nameEn: 'The Noble Cheongdam Medical',
  address: '서울시 강남구 압구정로 412 더 노블 메디컬 타워 4·5F',
  addressShort: '압구정로데오역 3번 출구 도보 3분',
  subway: '분당선 압구정로데오역 3번 출구 도보 3분 / 7호선 청담역 8번 출구 인접',
  valet: '더 노블 메디컬 타워 1층 정문 진입 시 발렛 크루가 차량을 지하 주차장으로 입고해 드립니다.',
  phone: '02-0000-0000',
  email: 'contact@example.com',
  hours: [
    { days: '월요일 · 금요일 (야간 진료)', time: '10:00 ~ 20:30 (야간)', highlight: true },
    { days: '화요일 · 수요일 · 목요일', time: '10:00 ~ 19:00', highlight: false },
    { days: '토요일', time: '10:00 ~ 16:00 (점심시간 없이 진료)', highlight: true },
    { days: '일요일 및 공휴일', time: '사전 예약제 운영 (휴진)', highlight: false },
  ],
  lunchHour: '13:00 ~ 14:00 (토요일은 점심시간 없이 연속 진료)',
};

export const SPECTRUM_LIST: SpectrumData[] = [
  {
    id: 'normal',
    number: '01',
    nameKr: '일반광',
    nameEn: 'Normal Light',
    tag: '표피 텍스처',
    title: '일반광 모드 — 표피 텍스처 및 모공 미세 계측',
    param1: '모공 밀집도: 정상 범위 (14.2%)',
    param2: '피부 탄력 지수: 82 / 100',
    desc: '일반광 스펙트럼에서는 피부 표면의 미세 잔주름과 굴곡을 살펴봅니다. 불필요한 과도한 시술을 지양하고, 이 데이터를 토대로 초음파·고주파 리프팅의 조사 방향과 범위를 1:1로 설계합니다.',
    filterStyle: 'brightness(1.02) contrast(1.05)',
    highlightZone: '모공 및 표피 미세 잔주름 계측 완료',
  },
  {
    id: 'polarized',
    number: '02',
    nameKr: '편광',
    nameEn: 'Polarized Light',
    tag: '잠재 기미/색소',
    title: '편광 모드 — 표피 직하부 멜라닌 및 잠재 색소 추적',
    param1: '잠재성 기미 분포: 18.5% 검출',
    param2: '표피 멜라닌 지수: 안정화 필요 (Medium)',
    desc: '편광 모드는 표면 반사광을 차단하여 아직 눈에 드러나지 않은 기미, 주근깨, 잡티의 상태를 살펴봅니다. 색소 레이저 토닝의 파장과 에너지 강도를 개인에 맞게 조율하는 근거로 씁니다.',
    filterStyle: 'contrast(1.3) sepia(0.2) saturate(1.2)',
    highlightZone: '표피 기저층 잠재 멜라닌 색소 군집 맵',
  },
  {
    id: 'crosspol',
    number: '03',
    nameKr: '교차편광',
    nameEn: 'Cross-Polarized',
    tag: '혈관/홍반 맵',
    title: '교차편광 모드 — 미세 모세혈관 확장 및 안면 홍조 맵',
    param1: '홍반 지수: 민감성 (26.4%)',
    param2: '피부 장벽 상태: 중등도 주의',
    desc: '교차편광은 피부 속 헤모글로빈 분포를 시각화하여 미세 혈관 확장, 염증, 붉은 자국을 살펴봅니다. 자극이 적은 스킨부스터와 혈관 진정 레이저를 어떻게 조합할지 상담 단계에서 함께 정합니다.',
    filterStyle: 'hue-rotate(-25deg) contrast(1.4) saturate(1.4)',
    highlightZone: '안면 홍조 및 미세 모세혈관 확장 영역',
  },
  {
    id: 'uv',
    number: '04',
    nameKr: 'UV 자외선광',
    nameEn: 'UV Light',
    tag: '피지/포르피린',
    title: 'UV 자외선광 모드 — 피지선 분포 및 포르피린 반응',
    param1: '포르피린 활성도: T존 국소 집중',
    param2: '피지 분비 밸런스: 유수분 불균형',
    desc: 'UV 광원 분석은 모공 속 피지 분비와 형광 물질(포르피린)의 발광 정도를 살펴, 딥 클렌징과 스킨부스터 처방의 강도를 정하는 데 참고합니다.',
    filterStyle: 'hue-rotate(200deg) contrast(1.5) brightness(0.9) saturate(1.6)',
    highlightZone: 'T존/U존 포르피린 형광 반응 분포',
  },
];

export const TREATMENTS: Treatment[] = [
  {
    id: 'hifu-lifting',
    category: 'HIFU 초음파 리프팅',
    categoryEn: 'Ultrasound SMAS Lifting',
    partner: '집속초음파 장비 (예시 사양)',
    title: '노블 딥리프트 — 집속초음파(HIFU) SMAS 리프팅',
    description:
      '1.5mm / 3.0mm / 4.5mm 깊이별 카트리지를 써서 근막층(SMAS)까지 초음파 에너지를 전달합니다. 실시간 초음파 영상으로 조사 부위를 확인하며 깊이를 맞춥니다.',
    duration: '40 ~ 50분 내외',
    recovery: '당일 일상 복귀 (개인차 있음)',
    painCare: '1:1 맞춤 마취 및 통증 관리',
    recommendation: '페이스 300 / 600샷',
    badge: '시술 기록 차트 제공',
    concern: '탄력 / 페이스 리프팅 (초음파·고주파)',
  },
  {
    id: 'rf-volumizing',
    category: '고주파 탄력 리프팅',
    categoryEn: 'Monopolar RF Volumizing',
    partner: '모노폴라 고주파 장비 (예시 사양)',
    title: '노블 RF 볼류마이징 — 모노폴라 고주파 탄력 관리',
    description:
      '모노폴라 고주파로 진피층에 열을 균일하게 전달해 콜라겐 수축과 재생 반응을 유도하는 방식입니다. 반응 정도와 유지 기간에는 개인차가 있습니다.',
    duration: '45분 내외',
    recovery: '시술 당일 메이크업 가능',
    painCare: '다방향 진동 · 표면 쿨링 동시 적용',
    recommendation: '아이 225샷 / 토탈 600샷',
    badge: '현장에서 미개봉 멸균 씰 확인',
    concern: '탄력 / 페이스 리프팅 (초음파·고주파)',
  },
  {
    id: 'skin-booster',
    category: '진피 재생 스킨부스터',
    categoryEn: 'Bespoke Dermal Regeneration',
    partner: 'PN · PDLLA 성분 (일반 명칭)',
    title: '노블 리커버 부스터 — PN & PDLLA 진피 재생',
    description:
      '폴리뉴클레오타이드(PN)와 자가 콜라겐 생성을 돕는 미세 분자 PDLLA 성분을 피부 상태에 맞춰 나누어 주입합니다. 피부 장벽 회복과 잔주름 볼륨 개선을 목표로 하는 시술입니다.',
    duration: '20 ~ 30분',
    recovery: '자동 인젝터 사용 (통증 최소화)',
    painCare: '유수분 밸런스 · 속건조 관리 병행',
    recommendation: '3~4주 간격 3회 권장',
    badge: '정량 계량 후 개봉 시술',
    concern: '스킨부스터 / 장벽 재생 (PN·PDLLA)',
  },
  {
    id: 'pico-toning',
    category: '색소 & 혈관 레이저',
    categoryEn: 'Picosecond & Long-Pulsed Laser',
    partner: '피코초 · 755/1064nm (일반 명칭)',
    title: '노블 클리어 토닝 — 피코초 · 장파장 복합 토닝',
    description:
      '피코초 단위의 짧은 펄스로 멜라닌 색소에 선택적으로 작용하는 방식입니다. 기미·잡티·색소 침착의 개선을 목표로 하며, 필요한 횟수와 결과는 색소의 깊이와 피부 상태에 따라 다릅니다.',
    duration: '30분 내외',
    recovery: '냉각 쿨링 & 진정 마스크 병행',
    painCare: '표면 자극 최소화 설계',
    recommendation: '755nm / 1064nm 복합 조사',
    badge: '냉각 시스템 동시 적용',
    concern: '난치성 색소 / 기미 / 화이트닝',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-kim',
    name: '김도현 대표원장',
    role: '대표원장 • 피부과 전문의',
    roleEn: 'Chief Dermatologist',
    specialty: '리프팅 마스터',
    image: '/demo-media/the-noble-dermatology/the-noble-dermatology-03.jpg',
    credentials: [
      '국내 명문 A대학(예시) 의과대학 졸업 및 동 대학원 의학석사',
      '국내 명문 A대학(예시)병원 피부과 전문의 수련',
      '피부과학회(예시) 정회원',
      '해외 피부과학회(예시) 정회원',
      '고주파·초음파 리프팅 술기 강의 (예시 약력)',
    ],
    quote:
      '안티에이징의 본질은 인위적인 과도한 변화가 아닌, 당신이 지닌 가장 젊고 우아했던 순간의 자연스러운 균형을 되찾는 것입니다.',
  },
  {
    id: 'dr-lee',
    name: '이정서 원장',
    role: '원장 • 피부과 전문의',
    roleEn: 'Director of Aesthetic Dermatology',
    specialty: '스킨부스터',
    image: '/demo-media/the-noble-dermatology/the-noble-dermatology-04.jpg',
    credentials: [
      '국내 명문 A대학(예시) 의과대학 졸업',
      '국내 명문 A대학(예시)병원 피부과 전임의',
      '피부과 의사회(예시) 정회원',
      '초음파 리프팅 술기 연구회(예시) 참여',
      '스킨부스터 복합 시술 임상 연구 (예시 약력)',
    ],
    quote:
      '개개인의 피부 두께와 안면 곡률에 맞춘 0.1J, 0.1mm 단위의 정밀한 에너지 조사로 불필요한 통증을 줄이는 것을 목표로 합니다.',
  },
  {
    id: 'dr-park',
    name: '박시윤 원장',
    role: '원장 • 피부과 전문의',
    roleEn: 'Director of Laser & Pigmentation',
    specialty: '색소/레이저',
    image: '/demo-media/the-noble-dermatology/the-noble-dermatology-06.jpg',
    credentials: [
      '국내 명문 A대학(예시) 의과대학 졸업',
      '국내 명문 A대학(예시)병원 피부과 임상강사',
      '의학레이저학회(예시) 정회원',
      '미용피부외과학회(예시) 정회원',
      '색소 질환 레이저 복합 치료 연구 (예시 약력)',
    ],
    quote:
      '멜라닌의 깊이와 혈관의 확장을 나누어 해석하는 레이저 설계로, 피부 부담을 줄이면서 색소를 다루는 것을 지향합니다.',
  },
];

// 조회기 데모용 예시 시리얼. 실존 제조사·수입사 이름을 쓰지 않고, 조회 결과 자체가 「샘플」임을 값 안에 적는다.
export const SAMPLE_SERIALS: Record<string, Partial<VerificationResult>> = {
  'RF-2026-8941': {
    device: '고주파(RF) 시술용 팁 600샷 (예시 모델)',
    status: '미개봉 멸균 팁 확인 (샘플 조회 결과)',
    expiry: '2027년 08월 31일 (멸균 상태 정상)',
    distributor: '국내 정식 수입 유통사 (예시 표기)',
    shotsTotal: 600,
  },
  'HIFU-5520-7712': {
    device: '집속초음파 카트리지 400샷 3.0mm (예시 모델)',
    status: '미개봉 멸균 카트리지 확인 (샘플 조회 결과)',
    expiry: '2027년 11월 30일 (멸균 상태 정상)',
    distributor: '국내 정식 수입 유통사 (예시 표기)',
    shotsTotal: 400,
  },
  'PN-9801-4432': {
    device: 'PN 스킨부스터 앰플 2cc (예시 모델)',
    status: '미개봉 정량 앰플 확인 (샘플 조회 결과)',
    expiry: '2028년 01월 15일 (포장 상태 정상)',
    distributor: '국내 정식 수입 유통사 (예시 표기)',
  },
};
