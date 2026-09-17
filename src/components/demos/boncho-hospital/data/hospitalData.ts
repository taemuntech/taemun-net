import { BedRoom, HerbBatchCertificate } from '../types';

export const HOSPITAL_IMAGES = {
  emblem: '/demo-media/boncho-hospital/boncho-hospital-12.png',
  heroSuite: '/demo-media/boncho-hospital/boncho-hospital-04.jpg',
  hyperthermia: '/demo-media/boncho-hospital/boncho-hospital-10.jpg',
  immuneIV: '/demo-media/boncho-hospital/boncho-hospital-02.jpg',
  chuna: '/demo-media/boncho-hospital/boncho-hospital-11.jpg',
  physicalTherapy: '/demo-media/boncho-hospital/boncho-hospital-05.jpg',
  rehabSling: '/demo-media/boncho-hospital/boncho-hospital-08.jpg',
  rehabTherapy: '/demo-media/boncho-hospital/boncho-hospital-09.jpg',
  royalSuite: '/demo-media/boncho-hospital/boncho-hospital-07.jpg',
  harmonySuite: '/demo-media/boncho-hospital/boncho-hospital-03.jpg',
  mealAbalone: '/demo-media/boncho-hospital/boncho-hospital-01.jpg',
  mealFishPorridge: '/demo-media/boncho-hospital/boncho-hospital-06.jpg',
};

/**
 * 병동 현황 (예시 데이터).
 * 화면 여러 곳이 「1인실 2실 · 2인실 3실」을 각자 적고 있었는데, 목록을 고치면 그 숫자들이 조용히 거짓이 된다.
 * 잔여 실수는 아래 AVAILABLE_ROYAL·AVAILABLE_HARMONY 로만 세어 쓴다.
 */
export const BED_ROOMS: BedRoom[] = [
  // 3F~5F 1인실 로열 스위트
  { floor: '3F', room: '301호', type: 'royal', status: 'occupied', view: '도심 조망' },
  { floor: '3F', room: '302호', type: 'royal', status: 'occupied', view: '정원 테라스' },
  { floor: '3F', room: '303호', type: 'royal', status: 'occupied', view: '편백 테라스' },
  { floor: '3F', room: '304호', type: 'royal', status: 'available', view: '편백나무 힐링 테라스' },
  { floor: '4F', room: '401호', type: 'royal', status: 'occupied', view: '정원 테라스' },
  { floor: '4F', room: '402호', type: 'royal', status: 'occupied', view: '정원 테라스' },
  { floor: '4F', room: '403호', type: 'royal', status: 'occupied', view: '편백 테라스' },
  { floor: '4F', room: '404호', type: 'royal', status: 'occupied', view: '편백 테라스' },
  { floor: '5F', room: '501호', type: 'royal', status: 'occupied', view: '스카이 정원' },
  { floor: '5F', room: '502호', type: 'royal', status: 'available', view: '스카이 힐링 테라스' },
  { floor: '5F', room: '503호', type: 'royal', status: 'occupied', view: '스카이 테라스' },

  // 6F~7F 2인실 하모니 스위트
  { floor: '6F', room: '601호-A', type: 'harmony', status: 'available', view: '창가 독립구역' },
  { floor: '6F', room: '601호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
  { floor: '6F', room: '602호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
  { floor: '6F', room: '602호-B', type: 'harmony', status: 'available', view: '내측 독립구역' },
  { floor: '6F', room: '603호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
  { floor: '6F', room: '603호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
  { floor: '7F', room: '701호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
  { floor: '7F', room: '701호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
  { floor: '7F', room: '702호-A', type: 'harmony', status: 'occupied', view: '창가 독립구역' },
  { floor: '7F', room: '702호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
  { floor: '7F', room: '703호-A', type: 'harmony', status: 'available', view: '창가 독립구역' },
  { floor: '7F', room: '703호-B', type: 'harmony', status: 'occupied', view: '내측 독립구역' },
];

export const AVAILABLE_ROYAL = BED_ROOMS.filter((r) => r.type === 'royal' && r.status === 'available').length;
export const AVAILABLE_HARMONY = BED_ROOMS.filter((r) => r.type === 'harmony' && r.status === 'available').length;
export const AVAILABLE_TOTAL = AVAILABLE_ROYAL + AVAILABLE_HARMONY;

/**
 * 탕약 이력조회 예시 성적서.
 * 의료법 제56조 제2항 — 처방 이름·설명에 「완화·재건·억제」 같은 치료 효과 단정을 쓰지 않는다.
 * 조제 담당자의 면허번호와 시험기관 실명도 쓰지 않는다(조회 가능한 번호·실존 기관).
 */
export const SAMPLE_HERB_CERTIFICATES: Record<string, HerbBatchCertificate> = {
  'BC-2026-HERB': {
    code: 'BC-2026-HERB-0428',
    name: '본초 맞춤 보중탕 (암 치료 중 회복기 처방 · 예시)',
    targetTherapy: '암 치료 중 식사량·기력 저하로 내원하신 환자에게 1:1로 낸 처방 예시',
    inspectionDate: '2026-09-12',
    inspector: '원내 한약사 (예시 표기) · 외부 공인 시험기관 (예시)',
    batchNumber: '2026-BCH-0428-A',
    herbs: [
      { name: '지리산 참당귀', origin: '경남 산청군 지리산 해발 600m', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '풍기 6년근 홍삼', origin: '경북 영주시 풍기읍 계약재배지', grade: '1등급 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '강원 양구 황기', origin: '강원도 양구군 고랭지', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '제주 백출 & 복령', origin: '제주 서귀포 한라산 일대', grade: '약용 규격품 (예시 표기)', heavyMetals: '기준 이하' },
    ],
    pesticideResult: '잔류농약 검사 항목 전부 기준 적합 (예시 성적)',
    heavyMetalResult: '납, 비소, 카드뮴, 수은 전 항목 기준치 이하 (예시 성적)',
    waterQuality: '3단계 역삼투압(RO) 정제수 사용',
    sealType: '식품용 4중 알루미늄 파우치 질소 충진',
    status: 'passed',
  },
  'BC-2026-TRAFFIC': {
    code: 'BC-2026-TRF-0914',
    name: '본초 당수활혈탕 (교통사고 입원 처방 · 예시)',
    targetTherapy: '사고 후 경추·요추 염좌로 입원하신 환자에게 낸 처방 예시',
    inspectionDate: '2026-09-14',
    inspector: '원내 한약사 (예시 표기)',
    batchNumber: '2026-TRF-0914-C',
    herbs: [
      { name: '경북 영천 당귀미', origin: '경북 영천시 금호읍', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '전남 화순 천궁', origin: '전남 화순군 백아면', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '충북 제천 도인 & 홍화', origin: '충북 제천시 한방특구', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
    ],
    pesticideResult: '잔류농약 검사 항목 전부 기준 적합 (예시 성적)',
    heavyMetalResult: '중금속 4종 기준치 이하 (예시 성적)',
    waterQuality: '3단계 역삼투압(RO) 정제수 사용',
    sealType: '알루미늄 4중 은박 포장',
    status: 'passed',
  },
  'BC-2026-REHAB': {
    code: 'BC-2026-RHB-0830',
    name: '본초 보양환오탕 (수술 후 재활기 처방 · 예시)',
    targetTherapy: '관절 치환술·뇌혈관 질환 후 재활 입원 중 낸 처방 예시',
    inspectionDate: '2026-09-10',
    inspector: '원내 한약사 (예시 표기)',
    batchNumber: '2026-RHB-0830-B',
    herbs: [
      { name: '정선 고랭지 생황기', origin: '강원도 정선군 청정림', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '지리산 지룡 (정제 추출)', origin: '경남 산청 약용 농가', grade: '정제물 규격품 (예시 표기)', heavyMetals: '기준 이하' },
      { name: '영천 적작약 & 천궁', origin: '경북 영천시', grade: '규격품 (예시 표기)', heavyMetals: '기준 이하' },
    ],
    pesticideResult: '잔류농약 검사 항목 전부 기준 적합 (예시 성적)',
    heavyMetalResult: '중금속 전 항목 기준치 이하 (예시 성적)',
    waterQuality: '3단계 역삼투압(RO) 정제수 사용',
    sealType: '자외선 살균 4중 파우치',
    status: 'passed',
  },
};
