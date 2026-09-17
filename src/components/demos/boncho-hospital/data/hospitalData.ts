import { HerbBatchCertificate, BedAvailabilityInfo } from '../types';

export const HOSPITAL_IMAGES = {
  emblem: '/demo-media/boncho-hospital/boncho-hospital-12.png',
  heroSuite: '/demo-media/boncho-hospital/boncho-hospital-04.jpg',
  oncothermia: '/demo-media/boncho-hospital/boncho-hospital-10.jpg',
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

export const INITIAL_BED_STATUS: BedAvailabilityInfo = {
  singleRoomsTotal: 32,
  singleRoomsAvailable: 2,
  doubleRoomsTotal: 48,
  doubleRoomsAvailable: 3,
  lastUpdated: '오늘 22:15 기준 (안내)',
  emergencyCareAvailable: true,
};

export const SAMPLE_HERB_CERTIFICATES: Record<string, HerbBatchCertificate> = {
  'BC-2026-HERB': {
    code: 'BC-2026-HERB-0428',
    name: '본초 맞춤 암면역 보완탕 (항암 부작용 완화 및 체력 재건)',
    targetTherapy: '위암·유방암 항암제 투여 후 식욕부진 및 말초신경병증 완화',
    inspectionDate: '2026-09-12',
    inspector: '수석한약사 박준영 (면허 제4829호) · 한국의약품시험연구원',
    batchNumber: '2026-BCH-0428-A',
    herbs: [
      { name: '지리산 GAP 참당귀', origin: '경남 산청군 지리산 해발 600m', grade: '특상품 (식약처 hGMP)', heavyMetals: '불검출' },
      { name: '풍기 6년근 정품 홍삼', origin: '경북 영주시 풍기읍 계약재배지', grade: '1등급 (사포닌 고농축)', heavyMetals: '불검출' },
      { name: '강원 양구 황기', origin: '강원도 양구군 청정 고랭지', grade: '특상품 (다당류 풍부)', heavyMetals: '불검출' },
      { name: '제주 자연산 백출 & 복령', origin: '제주 서귀포 한라산 일대', grade: '약용 규격품', heavyMetals: '불검출' },
    ],
    pesticideResult: '잔류농약 320종 전 항목 불검출 (0.00 mg/kg)',
    heavyMetalResult: '납, 비소, 카드뮴, 수은 전 항목 기준치 이하 불검출',
    waterQuality: '3단계 역삼투압(RO) 시스템 정밀 정제 청정수 (미세플라스틱 0%)',
    sealType: '식품용 4중 알루미늄 파우치 질소 무균 충진',
    status: 'passed',
  },
  'BC-2026-TRAFFIC': {
    code: 'BC-2026-TRF-0914',
    name: '본초 당수활혈탕 (교통사고 급성 편타성 손상 및 어혈 제거)',
    targetTherapy: '사고 후 경추·요추 염좌 및 미세 혈전 급속 배출',
    inspectionDate: '2026-09-14',
    inspector: '임상한약사 김세연 (면허 제5102호)',
    batchNumber: '2026-TRF-0914-C',
    herbs: [
      { name: '경북 영천 당귀미', origin: '경북 영천시 금호읍', grade: '어혈 배출 특등급', heavyMetals: '불검출' },
      { name: '전남 화순 천궁', origin: '전남 화순군 백아면', grade: '정유 성분 99% 보존', heavyMetals: '불검출' },
      { name: '충북 제천 도인 & 홍화', origin: '충북 제천시 한방특구', grade: '친환경 hGMP 규격품', heavyMetals: '불검출' },
    ],
    pesticideResult: '잔류농약 320종 전 항목 불검출',
    heavyMetalResult: '중금속 4종 기준치 절대 미달 0.00mg/kg',
    waterQuality: '3중 RO 정수 청정수',
    sealType: '알루미늄 4중 무균 은박 포장',
    status: 'passed',
  },
  'BC-2026-REHAB': {
    code: 'BC-2026-RHB-0830',
    name: '본초 보양환오탕 (뇌신경 재활 및 관절 수술 후 기력 보강)',
    targetTherapy: '관절 치환술 후 건·인대 조직 재생 촉진 및 중풍 후유증 완화',
    inspectionDate: '2026-09-10',
    inspector: '수석한약사 박준영 (면허 제4829호)',
    batchNumber: '2026-RHB-0830-B',
    herbs: [
      { name: '정선 고랭지 생황기', origin: '강원도 정선군 청정림', grade: '기혈 보익 특상품', heavyMetals: '불검출' },
      { name: '지리산 지룡 (정제 추출)', origin: '경남 산청 약용 농가', grade: '혈행 개선 규격 정제물', heavyMetals: '불검출' },
      { name: '영천 적작약 & 천궁', origin: '경북 영천시', grade: 'hGMP 인증 약재', heavyMetals: '불검출' },
    ],
    pesticideResult: '잔류농약 320종 불검출 확인',
    heavyMetalResult: '중금속 전 항목 불검출 (적합)',
    waterQuality: '3단계 역삼투압 순수 정제수',
    sealType: '자외선 살균 4중 파우치',
    status: 'passed',
  },
};
