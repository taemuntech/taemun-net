import { FloorZone, MaterialItem, ProjectCase } from '../types';

export const SHOWROOM_BRAND = {
  name: 'ATELIER MOOD SEONGSU',
  koreanName: '아틀리에 무드 성수',
  tagline: '원초적 물성과 현대적 구조가 완성하는 하이엔드 상업 공간',
  address: '서울특별시 성동구 성수동2가 일대 (예시 주소)',
  phone: '02-0000-0000',
  email: 'contact@example.com',
  workingHours: '월-금 10:00 - 19:00 (사전 예약제)',
};

/**
 * 층별 존 — **사진에 실제로 찍힌 것**만 적고, 핀 좌표도 그 사진을 보고 찍는다.
 * 2026-09-18 수리: 예전에는 1F 사진(밝은 우드·글라스 라운지) 위에 「9M 통 원석 아일랜드 바」·
 * 「러프 노출 콘크리트」 핀이 찍혀 있었고, 3F 는 아예 다른 데모(stay-jeju)와 같은 파일이었다.
 * 사진을 바꿀 수 없어 **사진 쪽을 정본으로 두고 문안과 핀을 다시 썼다**.
 */
export const FLOOR_ZONES: FloorZone[] = [
  {
    id: 'floor-1f',
    floor: '1F',
    name: 'WELCOME LOUNGE',
    subtitle: '감각의 전이와 첫인상을 설계하는 진입 라운지',
    concept: 'Soft Daylight & Framed Transparency',
    area: '185 m² (약 56평)',
    ceilingHeight: '4.2m 층고 오픈형',
    lightingTemp: '자연 채광 + 3,000K 보조 조명',
    acousticRating: 'NRC 0.65 흡음 설계 (예시 사양)',
    description:
      '성수동의 오래된 공장 건물 구조를 남긴 채, 미색으로 도장한 목재 프레임과 반투명 리브 글라스로 안쪽 공간을 나눴습니다. 큰 창으로 들어온 빛이 파티션을 한 번 걸러 라운지 전체에 고르게 퍼지고, 낮은 모듈러 소파가 첫 응대 동선을 잡아 줍니다.',
    imageUrl: '/portfolio/seongsu-showroom/seongsu-01.jpg',
    keyMaterials: ['미색 도장 목재 프레임', '반투명 리브 글라스', '패브릭 모듈러 소파', '오크 오픈 셸빙'],
    hotspots: [
      {
        x: 37,
        y: 17,
        title: '2단 아치 플로어 램프',
        desc: '천장을 뚫지 않고 빛의 높이를 만드는 장치입니다. 갓 두 개의 각도를 따로 틀어 응대석과 대기석을 나눠 비춥니다.',
      },
      {
        x: 25,
        y: 30,
        title: '목재 프레임 & 리브 글라스 파티션',
        desc: '시야는 반쯤 통하고 소리는 한 번 걸러지도록, 반투명 유리를 목재 프레임에 끼워 짰습니다.',
      },
      {
        x: 70,
        y: 67,
        title: '모듈러 라운지 소파',
        desc: '등받이 없는 낮은 모듈을 이어 붙여, 행사 때는 떼어 옮기고 평소에는 ㄱ 자로 붙여 씁니다.',
      },
    ],
  },
  {
    id: 'floor-2f',
    floor: '2F',
    name: 'CURATED GALLERY CORRIDOR',
    subtitle: '긴 복도를 따라 전시와 상담실을 나눈 메인 쇼룸',
    concept: 'Linear Framing & Seamless Floor',
    area: '210 m² (약 63평)',
    ceilingHeight: '3.2m 루버 천장',
    lightingTemp: '3,000K ~ 4,000K 듀얼 스펙트럼 (CRI 97+ · 예시 사양)',
    acousticRating: 'NRC 0.75 흡음 루버 천장 (예시 사양)',
    description:
      '한쪽 벽을 짙은 남색으로 눌러 복도의 길이를 강조하고, 맞은편은 스틸 프레임 유리벽으로 짜 상담실과 전시 공간을 시선으로만 나눴습니다. 바닥은 줄눈 없는 마이크로 시멘트로 이어 청소 동선과 카트 이동을 방해하지 않습니다.',
    imageUrl: '/portfolio/seongsu-showroom/seongsu-04.jpg',
    keyMaterials: ['스틸 프레임 글라스 파티션', '목재 루버 천장', '마이크로 시멘트 바닥', '오크 디스플레이 셸빙'],
    hotspots: [
      {
        x: 53,
        y: 40,
        title: '스틸 프레임 글라스 파티션',
        desc: '얇은 각재로 격자를 짜 유리를 끼웠습니다. 문을 닫아도 복도에서 안쪽 조명이 그대로 보입니다.',
      },
      {
        x: 23,
        y: 56,
        title: '오크 디스플레이 셸빙 & 벤치',
        desc: '벤치와 진열장을 한 몸으로 짜 벽을 따라 붙였습니다. 앉는 자리와 보는 자리를 같은 가구가 맡습니다.',
      },
      {
        x: 50,
        y: 85,
        title: '줄눈 없는 마이크로 시멘트 바닥',
        desc: '이음매가 없어 반사가 고르고, 진열 집기를 옮겨도 자국이 남는 줄눈이 없습니다.',
      },
    ],
  },
  {
    id: 'floor-3f',
    floor: '3F',
    name: 'PRIVATE SALON',
    subtitle: 'VIP 고객을 위한 1:1 상담 살롱',
    concept: 'Warm Materials & Corner Daylight',
    area: '160 m² (약 48평)',
    ceilingHeight: '3.0m 평천장 + 고측창',
    lightingTemp: '2,500K 캔들라이트 톤 & 남향 자연광',
    acousticRating: 'NRC 0.85 프라이빗 방음 설계 (예시 사양)',
    description:
      '두 면을 코너 통창으로 열어 정원의 초록을 들이고, 천장 가까이 낸 가로로 긴 고측창으로 안쪽 벽까지 빛을 흘렸습니다. 원목 마루와 가죽·직물을 섞어 상담이 길어져도 피로하지 않은 톤으로 맞췄습니다.',
    imageUrl: '/portfolio/seongsu-showroom/seongsu-02.jpg',
    keyMaterials: ['원목 마루', '통원목 로우 테이블', '가죽 오토만 & 라운지 체어', '황동 아치 플로어 램프'],
    hotspots: [
      {
        x: 90,
        y: 45,
        title: '정원으로 열린 코너 통창',
        desc: '모서리에서 두 면을 함께 열어, 앉은 자리 어디에서도 바깥 초록이 시야에 들어옵니다.',
      },
      {
        x: 63,
        y: 40,
        title: '황동 아치 플로어 램프',
        desc: '천장에 등을 달지 않고 스탠드 하나로 테이블 위만 밝혀, 상담 중 시선이 흩어지지 않게 했습니다.',
      },
      {
        x: 50,
        y: 74,
        title: '통원목 로우 테이블 & 가죽 오토만',
        desc: '두꺼운 통판 상판에 가죽 오토만을 붙여, 상담용 테이블과 여분 좌석을 한 자리에서 씁니다.',
      },
    ],
  },
];

export const MATERIALS: MaterialItem[] = [
  {
    id: 'mat-concrete',
    name: '러프 노출 콘크리트',
    engName: 'Fair-faced Raw Concrete',
    category: 'Concrete',
    origin: '국내 맞춤 타설 배합 (예시)',
    textureDesc: '거푸집의 질감과 기포 흔적을 자연스럽게 살려 원초적 물성을 극대화한 표면',
    durability: '내구성 우수 · 장기 유지 관리 용이',
    recommendedUse: '쇼룸 메인 벽체, 기둥 구조체, 진입 파사드',
    colorHex: '#8e9092',
    lightingPairing: '3,000K 사광 간접 조명 권장 (콘크리트 질감 음영 극대화)',
    specDetails: ['무공해 수성 발수 코팅 처리', '크랙 억제 탄소섬유 보강재 함유', '불연 성능 자재 규격 (예시 표기)'],
  },
  {
    id: 'mat-steel',
    name: '브러시드 스테인리스 316',
    engName: 'Brushed SUS 316',
    category: 'Metal',
    origin: '국내 제철사 정밀 압연 강판 (가상)',
    textureDesc: '헤어라인 텍스처로 미세하게 가공되어 빛을 부드럽게 난반사하는 쿨톤 메탈',
    durability: '내지문 특수 PVD 코팅 · 오염 저항성 우수',
    recommendedUse: '카운터 상판, 디스플레이 쉘프, 도어 핸들',
    colorHex: '#cbd5e1',
    lightingPairing: '4,000K 쿨화이트 핀포인트 조명 (선명한 메탈릭 에지)',
    specDetails: ['두께 3.0T 레이저 정밀 절곡', '항균 및 방청 성능 보강', '미세 헤어라인 #400 마감'],
  },
  {
    id: 'mat-stone',
    name: '이탈리안 트래버틴 로마노',
    engName: 'Travertino Romano Classico',
    category: 'Stone',
    origin: '이탈리아 티볼리 채석장 (예시)',
    textureDesc: '퇴적층의 천연 기공과 베이지-아이보리의 온화한 색조가 어우러진 하이엔드 석재',
    durability: '자연스러운 에이징 · 실내 전용 석재',
    recommendedUse: '아일랜드 바, 리셉션 데스크, VIP 라운지 플로어',
    colorHex: '#e2d7c5',
    lightingPairing: '2,700K 웜톤 다운라이트 (따스하고 고급스러운 무드)',
    specDetails: ['오픈 포어(Open Pore) 반광 가공', '자연석 크랙 레진 함침 보강', '석재 발수 오염 방지 실러 시공'],
  },
  {
    id: 'mat-wood',
    name: '유러피안 훈증 오크',
    engName: 'Smoked European White Oak',
    category: 'Wood',
    origin: '독일 블랙포레스트 엄선 목재 (예시)',
    textureDesc: '암모니아 훈증 기법으로 심재 깊숙이 짙은 초콜릿 톤을 입힌 천연 원목',
    durability: '습도 변화에 따른 수축/팽창 최소화 처리',
    recommendedUse: '벽면 루버, 맞춤 수납장, 테이블 탑',
    colorHex: '#4a3728',
    lightingPairing: '2,500K ~ 2,700K 소프트 백라이팅',
    specDetails: ['친환경 천연 오일 피니시', 'E0 등급 친환경 합판 코어 (예시 표기)', '와이드 220mm 광폭 규격'],
  },
  {
    id: 'mat-glass',
    name: '이탈리안 플루티드 리브 글라스',
    engName: 'Architectural Fluted Glass',
    category: 'Glass',
    origin: '유럽 직수입 강화 유리 (예시)',
    textureDesc: '세로 줄무늬 리브 패턴을 통해 시선을 반투명하게 여과하고 빛을 산란시키는 글라스',
    durability: '8T 안전 강화 유리 규격',
    recommendedUse: 'VIP 피팅룸 파티션, 상담실 가벽, 쇼윈도 스크린',
    colorHex: '#94a3b8',
    lightingPairing: '백라이트 패널 또는 림 라이팅',
    specDetails: ['파티션 프레임리스 시공 가능', '안전 필름 라미네이팅 마감', '사운드 투과 손실 32dB'],
  },
];

/**
 * 시공 사례 — **사진을 싣지 않는다**.
 * 2026-09-18: 네 건의 썸네일이 전부 위 FLOOR_ZONES 의 「우리 쇼룸 3개 층」 사진을 돌려 쓴 것이었다
 * (1F↔아이웨어 · 2F↔퍼퓸 · 3F↔파인다이닝). 같은 사진 한 장이 「우리 쇼룸」이자 「남의 시공 사례」로
 * 두 번 쓰이면 그 자체가 거짓이라, 전용 사진이 생기기 전까지는 사진 자리를 개념 판(타이포)으로 둔다.
 */
export const PROJECT_CASES: ProjectCase[] = [
  {
    id: 'case-eyewear-flagship',
    title: '성수 모던 아이웨어 플래그십 스토어',
    category: 'Retail',
    location: '서울시 성동구 성수동2가',
    area: '260 m² (약 78평)',
    period: '8주 (설계 3주 + 시공 5주)',
    year: '2025 (예시)',
    concept: '미니멀 옵틱 랩 (Optic Laboratory)',
    summary: '안경이라는 정밀 광학 제품의 물성을 콘크리트 슬래브와 투명 아크릴, 스틸 그리드로 재해석한 쇼룸 공간입니다.',
    features: [
      '300여 종의 프레임을 눈부심 없이 감상하는 광천장 디스플레이',
      '고객의 얼굴형 분석을 위한 1:1 페이스 컨설팅 룸 설계',
      '외벽 붉은 벽돌과 대비되는 극단적 미니멀리즘 인테리어',
    ],
    clientQuote:
      '“단순한 매장이 아니라 브랜드의 철학이 공간 전체에서 느껴집니다. 방문객의 평균 체류 시간이 기존 매장 대비 2.5배 늘어났습니다.”',
  },
  {
    id: 'case-beauty-perfume',
    title: '한남 니치 퍼퓸 프라이빗 살롱',
    category: 'Lounge',
    location: '서울시 용산구 한남동 일대',
    area: '145 m² (약 44평)',
    period: '6주 (설계 2주 + 시공 4주)',
    year: '2025 (예시)',
    concept: '후각의 시각화 (Sculpted Scent)',
    summary: '향수 방울이 떨어지는 찰나의 파동을 곡면 미장벽과 음각 간접 조명으로 형상화한 VIP 예약제 향수 살롱입니다.',
    features: [
      '무향 존과 시향 존을 철저히 분리하는 양압 공조 환기 시스템',
      '이탈리아 피에트라 원석으로 조각한 중앙 센트 테이스팅 바',
      '차분한 명상을 유도하는 다크 톤 마이크로 시멘트 바닥재',
    ],
    clientQuote:
      '“고객들이 문을 열고 들어서는 순간 깊은 안도감을 느낀다고 말씀하십니다. 마감 디테일을 꼼꼼하게 챙겨 주셨습니다.”',
  },
  {
    id: 'case-dining-wine',
    title: '도산 파인다이닝 & 워크인 와인 셀러',
    category: 'F&B',
    location: '서울시 강남구 신사동 도산공원길',
    area: '320 m² (약 97평)',
    period: '10주 (설계 4주 + 시공 6주)',
    year: '2024 (예시)',
    concept: '지하 동굴의 시간 (The Cave of Terroir)',
    summary: '오래된 와인이 익어가는 카브(Cave)의 숙성감을 거친 화강석 록페이스와 훈증 목재로 입체감 있게 구현했습니다.',
    features: [
      '항온항습 14℃ 정밀 제어 글라스 워크인 와인 셀러 룸',
      '테이블 간 시선을 자연스럽게 분리하는 석재 루버 파티션',
      '음식과 와인의 색감을 돋보이게 하는 테이블 전용 좁은 각도 스팟',
    ],
    clientQuote:
      '“와인 애호가 고객들의 재방문율이 70%를 넘겼습니다. 공간이 주는 몰입감이 요리의 가치를 한층 더 높여줍니다.”',
  },
  {
    id: 'case-curated-lifestyle',
    title: '청담 오디오 & 리빙 큐레이션 하우스',
    category: 'Showroom',
    location: '서울시 강남구 청담동 명품거리',
    area: '215 m² (약 65평)',
    period: '7주 (설계 3주 + 시공 4주)',
    year: '2024 (예시)',
    concept: '음향의 안식처 (Acoustic Sanctuary)',
    summary: '하이엔드 스피커와 디자이너 가구의 정교한 음향 밸런스를 위해 룸 어쿠스틱 시뮬레이션을 거쳐 완성한 청음 쇼룸입니다.',
    features: [
      '공진을 흡수하고 음향 반사를 최적화한 목재 음향 디퓨저 벽면',
      '조명과 블라인드, 오디오 시스템을 원터치 제어하는 스마트 홈 연동',
      'VIP 고객을 위한 프라이빗 리스닝 체어 존 구성',
    ],
    clientQuote:
      '“스피커 소리가 공간과 하나가 됩니다. 인테리어 스튜디오의 음향에 대한 전문적 이해도에 깊은 감명을 받았습니다.”',
  },
];

export const ESTIMATE_OPTIONS = {
  businessTypes: [
    { id: 'fnb', label: '카페 & 레스토랑 F&B', basePerPyung: 380, desc: '주방 설비, 방수, 환기 닥트 공조 최적화' },
    { id: 'retail', label: '패션 & 뷰티 플래그십', basePerPyung: 320, desc: '맞춤 진열 집기, 고연색성 조명, 피팅룸' },
    { id: 'showroom', label: '복합문화 쇼룸 & 갤러리', basePerPyung: 350, desc: '가변 파티션, 대형 미디어 월, 동선 기획' },
    { id: 'lounge', label: 'VIP 프라이빗 라운지', basePerPyung: 420, desc: '고급 원석, 고성능 차음재, 개별 룸 설계' },
  ],
  areaSizes: [
    { id: 'under30', label: '30평 미만 (소형 부티크)', pyung: 25, multiplier: 1.15 },
    { id: 'size50', label: '30~50평형 (표준 플래그십)', pyung: 45, multiplier: 1.0 },
    { id: 'size100', label: '50~100평형 (대형 쇼룸)', pyung: 80, multiplier: 0.95 },
    { id: 'over150', label: '100평 이상 (복합 사옥/스토어)', pyung: 130, multiplier: 0.9 },
  ],
  styleMoods: [
    { id: 'industrial', label: '성수 인더스트리얼 브루탈리즘', factor: 1.0, desc: '노출 콘크리트, 브러시드 스틸, 오픈 천장' },
    { id: 'natural_stone', label: '내추럴 웜 & 이탈리안 스톤', factor: 1.2, desc: '천연 트래버틴, 훈증 오크, 앰비언트 간접등' },
    { id: 'hitech_minimal', label: '하이테크 퓨처리즘 & 미니멀', factor: 1.15, desc: '슬림 알루미늄, 리브 글라스, 스마트 IoT' },
  ],
};
