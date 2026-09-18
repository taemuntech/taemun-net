import { ClinicZone, MedicalMaterial } from '../types';

export const CLINIC_ZONES: ClinicZone[] = [
  {
    id: 'suite',
    name: '프라이빗 1인 레이저 & 트리트먼트 스위트',
    engName: 'Private 1-Person Treatment Suite',
    tag: 'ZONE 01 · 1인 독립 스위트',
    description: '다른 환자와 마주치지 않는 1인 단독 진료·시술 공간입니다. 이중 차음벽과 자동 환기 설비, 전동 메모리 리클라이너를 갖추었습니다.',
    specs: [
      { label: '음향 차음 기준', value: '45dB 이하 유지 (예시)' },
      { label: '환기 횟수', value: '시간당 12회 이상 (예시)' },
      { label: '조명 연출', value: '서카디언 3000K 간접 조명' },
      { label: '공간 구성', value: '시술 베드 · 파우더 · 상담 일체형' },
    ],
    image: '/portfolio/aether-medical/aether-02.jpg',
  },
  {
    id: 'powder',
    name: '호텔식 프라이빗 파우더 & 스파 샤워 룸',
    engName: 'Hotel-Style Powder & Spa Suite',
    tag: 'ZONE 02 · 프라이빗 파우더',
    description: '시술 후 흐트러진 매무새를 편안하게 정돈할 수 있는 호텔식 파우더 룸입니다. 트래버틴 천연석 세면대와 플루티드 글라스 파티션으로 프라이버시를 보호합니다.',
    specs: [
      { label: '석재 마감', value: '천연 로만 트래버틴 원석' },
      { label: '거울 조명', value: 'CRI 95+ 고연색성 백라이트' },
      { label: '수전 설비', value: '샴페인 골드 매립형 수전' },
      { label: '어메니티', value: '프라이빗 파우더 트레이 완비' },
    ],
    image: '/portfolio/aether-medical/aether-03.jpg',
  },
  {
    id: 'counsel',
    name: '원장 심층 상담 & 3D 안면 분석 아틀리에',
    engName: 'Bespoke Consultation Atelier',
    tag: 'ZONE 03 · 1:1 심층 상담실',
    description: '원장과 고객이 편안하게 마주 앉아 1:1 맞춤 진단을 진행하는 공간입니다. 캐시미어 크림 톤의 곡면 벽체와 내추럴 오크 가구가 심리적 안정감을 선사합니다.',
    specs: [
      { label: '가구 설계', value: '라운드 내추럴 화이트 오크' },
      { label: '패브릭', value: '방오 코팅 부클레 암체어' },
      { label: '자연 채광', value: '이중 린넨 쉬폰 커튼 채광' },
      { label: '상담 환경', value: '디지털 디스플레이 매립 설계' },
    ],
    image: '/portfolio/aether-medical/aether-04.jpg',
  },
];

export const MEDICAL_MATERIALS: MedicalMaterial[] = [
  {
    id: 'mat-1',
    name: '의료용 항균 규조 미장 회벽',
    engName: 'Antibacterial Lime Plaster',
    category: '벽체 마감재',
    origin: '천연 규조토 및 석회 미장 (이탈리아)',
    specs: '두께 2.5mm / 곰팡이 저항성 A등급 (예시)',
    description: '자연 유래 성분으로 시공되는 친환경 미장재로, 포름알데히드 흡착과 습도 조절 능력이 뛰어나며 차분한 캐시미어 텍스처를 구현합니다.',
    // 실제 친환경 건축자재 인증(HB 마크)의 등급 이름을 그대로 쓰면 「받았다」로 읽힌다 — 자리표시로만 둔다
    certification: '친환경 건축자재 등급 표기 자리 (예시)',
  },
  {
    id: 'mat-2',
    name: '천연 로만 트래버틴 원석 슬랩',
    engName: 'Natural Roman Travertine Stone',
    category: '석재 마감재',
    origin: '이탈리아 티볼리 채석장 직수입',
    specs: '두께 30mm 혼드(Honed) 무광 마감',
    description: '고대 로마 건축부터 이어져 온 베이지 톤의 천연 석회석으로, 은은한 기공과 부드러운 물성이 품격 있는 웰컴 라운지와 파우더 공간을 완성합니다.',
  },
  {
    id: 'mat-3',
    name: '브러시드 페일 샴페인 골드 트림',
    engName: 'Brushed Pale Champagne Gold Trim',
    category: '금속 디테일',
    origin: '국내 맞춤 아노다이징 알루미늄 가공',
    specs: '두께 3.0mm 무광 헤어라인 표면 처리',
    description: '차가운 스테인리스 대신 은은한 샴페인 골드 광택을 부여하여, 메디컬 공간 전체에 따뜻하고 고급스러운 금속 악센트를 제공합니다.',
  },
  {
    id: 'mat-4',
    name: '음향 차음 슬랫 오크 우드 패널',
    engName: 'Acoustic Slatted Oak Wood Panel',
    category: '음향 차음재',
    origin: '유럽산 화이트 오크 원목 & 재생 PET 펠트',
    specs: 'NRC 0.85 고성능 흡음률 (예시)',
    description: '1인 치료실 내부의 프라이버시를 지켜주는 음향 흡음재로, 정밀한 원목 루버 디자인을 통해 시각적 따스함과 청각적 고요를 동시에 구현합니다.',
    acousticRating: '45dB 차음 구조 (예시)',
  },
  {
    id: 'mat-5',
    name: '저반사 플루티드 인테리어 글라스',
    engName: 'Low-Iron Fluted Privacy Glass',
    category: '유리 파티션',
    origin: '독일 직수입 저철분 세라믹 강화유리',
    specs: '두께 10mm 강화 처리 / 줄무늬 12mm 피치',
    description: '자연 채광은 부드럽게 통과시키면서도 환자의 프라이버시를 시각적으로 차단하는 호텔식 파티션 유리입니다.',
  },
];
