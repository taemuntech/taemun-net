import { ProjectItem, MaterialSpecimen } from '../types';

export const BRAND_LOGO_URL =
  '/demo-media/haus-space/haus-space-12.png';

// 히어로 = 이 폴더에서 유일하게 화면 요소가 안 박힌 원본 사진(2000x1333). 전에 쓰던 13 번은
// 시공 전후 슬라이더의 「완공 후」로 옮겼다 — 슬라이더의 「시공 전」이 실내 골조 렌더라 실내 사진이 짝이 맞는다.
export const HERO_IMAGE_URL =
  '/demo-media/haus-space/haus-space-01.avif';

export const BEFORE_AFTER_DATA = {
  // 예전에 쓰던 02 번은 사진이 아니라 **다른 화면을 찍은 스크린샷**이었다 — 흰 카드와 닫기 버튼,
  // 그리고 실존 고급 주택단지 이름이 픽셀에 박혀 있었고 671x941 이라 크게 늘어나 뿌옜다.
  // 13 번(완공된 리빙 파빌리온)으로 바꿔야 아래 pins 의 트래버틴 벽난로·월넛 서가가 실제로 사진에 있다.
  afterImage:
    '/demo-media/haus-space/haus-space-13.jpg',
  beforeImage:
    '/demo-media/haus-space/haus-space-04.jpg',
  // 2026-09-18: 04 번 원본 위쪽에 찍혀 있던 웹사이트 상단 바를 **파일에서 직접 잘라 냈다**.
  // CSS 로 가리면 지면만 가려지고 /demo-media/ 로 직접 연 파일에는 그대로 남는다 — 그래서 원본을 고쳤다.
  title: '도심 하이엔드 펜트하우스(예시) 주거 공간 아카이브',
  badge: '주거공간 • 2025 완공',
  client: '하이엔드 프라이빗 인테리어 랩',
  duration: '제작 및 시공 기간: 8개월 (디지털 아카이브 구축: 2주)',
  deliverables: [
    {
      title: 'Before & After 시공 전후 비교 슬라이더',
      desc: '착공 전 3D 기획 렌더와 완공 사진을 같은 자리에서 겹쳐 보는 검수 화면 (수치는 예시)',
    },
    {
      title: '주방 가구 · 조명 스펙 핀 마킹',
      desc: '맞춤 제작 가구와 고연색(Ra 98급) 매립 조명 스펙을 사진 위 핀으로 표기 (예시)',
    },
    {
      title: '공간별 와이드 장면 뷰어 연동',
      desc: '리빙 파빌리온, 중정 전경, 착공 전 골조 스캔을 좌우로 끌어 보는 와이드 장면 뷰어로 제공',
    },
  ],
  // 핀 좌표는 **완공 사진(haus-space-13.jpg)에 실제로 찍힌 것** 기준이다.
  // 좌측 트래버틴 벽난로 아트월(가로 22%)·우측 월넛 진열 서가(가로 80%).
  // 핀 자체는 사진이 아니라 무대 상자 기준이라, 사진이 가로로 잘리는 lg 미만에서는 자리가 어긋난다
  // → 아래 TransformationSection 에서 lg 미만은 핀 대신 같은 내용을 카드 목록으로 편다.
  pins: [
    {
      id: '01',
      xPercent: 22,
      yPercent: 64,
      category: 'Stonework Spec',
      name: 'Italian Navona Travertine',
      detail: '이탈리아산 나보나 트래버틴 벽난로 아트월 및 챔퍼 엣지 가공',
    },
    {
      id: '02',
      xPercent: 80,
      yPercent: 48,
      category: 'Custom Millwork',
      name: 'North American Walnut Shelving',
      detail: '북미산 천연 월넛 오더메이드 빌트인 서가 및 레일 조명 매립',
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hannam-penthouse',
    title: '도심 하이엔드 펜트하우스(예시) 105평',
    category: 'Luxury Residential',
    koreanCategory: '주거 • 105평',
    area: '105평 (347㎡)',
    completionYear: '2025 완공',
    location: 'Hannam-dong, Seoul',
    subtitle: 'Private Penthouse',
    description:
      '트래버틴 대리석과 월넛 원목을 맞춤 시공하여 시간이 흐를수록 깊이를 더하는 주거 공간. 개방형 중정과 연계된 이중 층고 구조.',
    materialsUsed: 'Travertine, Walnut, Slim Sliding Doors',
    image:
      '/demo-media/haus-space/haus-space-10.jpg',
    // 2026-09-18: 브라우저 창과 실존 고급 주택단지 이름이 든 영문 캡션을 **파일에서 잘라 냈다**(1280x633).
    features: [
      '6m 보이드 천장과 연계된 남향 채광 유입',
      '이탈리아산 미니멀 프레임 슬라이딩 도어 전면 시공',
      '지하 와인 셀러 및 전용 사우나 큐레이션',
    ],
    specs: [
      { label: '위치', value: '서울시 용산구 한남동' },
      { label: '규모', value: '지상 복층형 펜트하우스 347㎡' },
      { label: '주요 자재', value: '이탈리아산 나보나 트래버틴, 훈증 월넛, 대형 세라믹 슬랩' },
      { label: '공사 기간', value: '약 8개월 (2024.06 ~ 2025.02)' },
    ],
  },
  {
    id: 'cheongdam-wellness',
    title: '청담동 프라이빗 에스테틱 & 웰니스 라운지',
    category: 'Commercial Lounge',
    koreanCategory: '상업 • 85평',
    area: '85평 (280㎡)',
    completionYear: '2024 완공',
    location: 'Cheongdam-dong, Seoul',
    subtitle: 'Wellness Lounge',
    description:
      '곡면 미학과 유럽산 미장 마감재를 활용하여 도심 속 온전한 몰입과 치유를 선사하는 VIP 전용 메디컬 스파 공간.',
    materialsUsed: 'Microcement, Fluted Glass, Acoustic Plaster',
    image:
      '/demo-media/haus-space/haus-space-05.jpg',
    features: [
      '유기적 곡면 파티션으로 동선의 프라이버시 극대화',
      '음향 흡음 미장재를 통한 잔향 시간 0.4초 제어',
      '색온도 2200K~3000K 바이오리듬 연동 조명 시스템',
    ],
    specs: [
      { label: '위치', value: '서울시 강남구 청담동 명품거리' },
      { label: '규모', value: '상업시설 2개 층 280㎡' },
      { label: '주요 자재', value: '스페인 마이크로시멘트, 플루티드 글라스, 라임플라스터' },
      { label: '공사 기간', value: '약 4개월' },
    ],
  },
  {
    id: 'seongsu-tech-hq',
    title: '성수동 크리에이티브 테크 오피스 사옥',
    category: 'Workspace',
    koreanCategory: '오피스 사옥 • 210평',
    area: '210평 (694㎡)',
    completionYear: '2024 완공',
    location: 'Seongsu-dong, Seoul',
    subtitle: 'Creative HQ',
    description:
      '성수의 붉은 벽돌 질감과 현대적 미니멀리즘의 조화. 유연한 협업 공간과 프라이빗 포커스 룸을 유기적으로 배치.',
    materialsUsed: 'Architectural Concrete, White Oak, Steel Glazing',
    image:
      '/demo-media/haus-space/haus-space-11.jpg',
    features: [
      '오픈형 워크스테이션과 8개의 독립 방음 미팅 부스',
      '인더스트리얼 노출 콘크리트와 따뜻한 화이트 오크의 대조',
      '중앙 타운홀 계단식 라운지 및 커스텀 바리스타 바',
    ],
    specs: [
      { label: '위치', value: '서울시 성동구 성수동2가' },
      { label: '규모', value: '지상 3개 층 사옥 694㎡' },
      { label: '주요 자재', value: '노출 콘크리트 코팅, 북미산 화이트 오크, 스틸 글레이징' },
      { label: '공사 기간', value: '약 6개월' },
    ],
  },
  {
    id: 'pyeongchang-residence',
    title: '평창동 단독주택 리노베이션',
    category: 'Luxury Residential',
    koreanCategory: '단독주택 • 160평',
    area: '160평 (528㎡)',
    completionYear: '2023 완공',
    location: 'Pyeongchang-dong, Seoul',
    subtitle: 'Single Residence',
    description:
      '북악산의 사계절을 품은 마당 정원 파노라마 뷰와 현대식 중정을 설계하여 자연과 건축이 호흡하는 독립 주거.',
    materialsUsed: 'Aluminium Glazing, Smoked Oak, Granite Patio',
    image:
      '/demo-media/haus-space/haus-space-09.jpg',
    // 2026-09-18: 위아래에 찍혀 있던 웹사이트 상단 바와 자막 띠를 **파일에서 잘라 냈다**(1340x558).
    features: [
      '북악산 풍경을 프레임하는 벨기에산 3중 시스템 창호',
      '자연 화강석 파티오와 연결된 일본식 이끼 중정 정원',
      '마스터 스위트룸 전용 히노끼 탕 및 독립 테라스',
    ],
    specs: [
      { label: '위치', value: '서울시 종로구 평창동' },
      { label: '규모', value: '지하 1층 ~ 지상 2층 단독주택 528㎡' },
      { label: '주요 자재', value: '스모크드 오크 광폭 원목, 알루미늄 시스템창호, 마천석 화강석' },
      { label: '공사 기간', value: '약 9개월' },
    ],
  },
];

export const MATERIALS: MaterialSpecimen[] = [
  {
    id: 'smoked-oak',
    tag: 'Natural Timber',
    title: '유러피안 스모크드 오크 원목 마루',
    description:
      '독일 친환경 천연 오일로 마감된 240mm 초광폭 원목. 습도 변화에 강하며 발끝에 닿는 온화한 질감을 선사합니다.',
    origin: 'Bavaria, Germany',
    image:
      '/demo-media/haus-space/haus-space-03.jpg',
    specsDetails: {
      grade: 'Select & Better Grade',
      finish: 'Natural Matte Hardwax Oil',
      thickness: '20mm (상판 단판 6mm 오크)',
      application: '펜트하우스 거실, 마스터 침실',
    },
  },
  {
    id: 'navona-travertine',
    tag: 'Quarried Stone',
    title: '이탈리아 나보나 트래버틴 대리석',
    description:
      '로마 고전 건축의 품격을 담은 혼드 마감. 특유의 기공과 자연스러운 층상 구조가 실내에 안락한 조형미를 부여합니다.',
    origin: 'Tivoli, Italy',
    image:
      '/demo-media/haus-space/haus-space-08.jpg',
    specsDetails: {
      grade: 'Extra Prima Navona Vein Cut',
      finish: 'Honed & Filled (수작업 기공 메움)',
      thickness: '20mm / 30mm 북매칭 슬랩',
      application: '벽난로 아트월, 메인 아일랜드 상판, 욕실 바닥',
    },
  },
  {
    id: 'slim-glazing',
    tag: 'Architectural Glazing',
    title: '미니멀 알루미늄 슬림 시스템 창호',
    description:
      '프레임 두께 25mm의 슬림 라인. 외부 풍경을 한 폭의 회화처럼 내부로 끌어들이는 하이엔드 시스템 창호.',
    origin: 'Belgium / Switzerland',
    image:
      '/demo-media/haus-space/haus-space-07.jpg',
    // 2026-09-18: 위쪽에 찍혀 있던 웹사이트 상단 바를 **파일에서 잘라 냈다**(1408x710).
    specsDetails: {
      grade: 'Triple Low-E Glazing',
      finish: 'Deep Bronze Anodized Hard Anodizing',
      thickness: '52mm 단열 3중 복층유리 (Ug: 0.6W/m²K)',
      application: '테라스 전면창, 거실 파노라마 창',
    },
  },
  {
    id: 'optical-lighting',
    tag: 'Architectural Lighting',
    title: '하이엔드 조명 라이브러리 & 광학 렌즈',
    description:
      '눈부심이 없는 다크 라이트 기술과 연색성 Ra 98 이상의 고감도 LED. 밤의 공간을 갤러리처럼 연출하는 프리미엄 조명.',
    origin: 'Specs: European Optical Lighting',
    image:
      '/demo-media/haus-space/haus-space-06.jpg',
    // 2026-09-18: 브라우저 창과 **지어낸 등록번호가 찍힌 꼬리말 띠**를 파일에서 잘라 냈다(1280x542).
    // CSS 로 가리면 /demo-media/ 로 파일을 직접 열었을 때 번호가 그대로 보인다 — 원본을 고쳐야 한다.
    specsDetails: {
      grade: 'Museum Optical Grade CRI 98+',
      finish: 'Burnished Brass & Knurled Metal',
      thickness: 'Optical Zoom Lens (15°~60° 수동 조절)',
      application: '작품 스포트라이트, 식탁 펜던트, 무드 간접등',
    },
  },
];

export const PROCESS_PHASES = [
  {
    number: '01',
    phase: 'Phase 01 • Discovery',
    title: '공간 철학 심층 인터뷰 및 라이프스타일 분석 (Consultation & Lifestyle Profiling)',
    description:
      '고객의 기상 시간부터 수면 패턴, 컬렉션하는 미술품, 요리와 휴식의 리듬까지 세밀하게 기록합니다. 단순한 평면 구성이 아닌 거주자의 삶에 맞춘 공간 동선과 조도 프로그램을 기획합니다.',
    tags: ['라이프스타일 문진표', '대지 및 일조 분석', '스페이스 아이덴티티 수립'],
  },
  {
    number: '02',
    phase: 'Phase 02 • Visualization',
    title: '8K 포토리얼리스틱 3D 비주얼라이제이션 & 공간 기획 (Design & 3D Rendering)',
    description:
      '가상 시공에 가까운 8K 고해상도 3D 모델링을 통해 가구 배치, 천연 석재의 마블 패턴 매칭, 시간대별 인공 조명 시뮬레이션을 착공 전에 미리 검증합니다.',
    tags: ['8K 광학 렌더링', '석재 북매칭 시뮬레이션', '와이드 장면 뷰어 시연'],
  },
  {
    number: '03',
    phase: 'Phase 03 • Execution',
    title: '오더메이드 가구 제작 및 직영 마스터 빌더 정밀 시공 (Bespoke Construction)',
    description:
      '밀리미터 단위를 목표로 하는 정밀 시공. 목공 직영 아틀리에에서 제작되는 빌트인 시스템 가구와 수입 자재를 숙련된 시공 팀이 직접 체결합니다.',
    tags: ['자체 제작 아틀리에', '매일 일일 공정 보고서', '레이저 정밀 레벨링'],
  },
  {
    number: '04',
    phase: 'Phase 04 • Legacy',
    // 「3년 무상 보증」은 기간·범위·면책이 붙는 계약 조건이라 샘플 화면에서 약속하지 않는다 — 점검 프로그램 표기로만 남긴다.
    title: '홈스타일링, 아트 피스 큐레이션 및 사후 점검 (Styling & Aftercare)',
    description:
      '준공 후 전문 큐레이터가 공간의 스케일에 맞는 빈티지 조명과 아트워크를 스타일링합니다. 사후 품질 점검 프로그램의 기간·범위는 계약 조건에 따라 달라지며, 화면의 표기는 예시입니다.',
    tags: ['빈티지 조명 큐레이션', '사후 품질 점검 표기 자리(예시)', '정기 공간 컨디션 진단'],
  },
];

export const PRESS_ACCOLADES = [
  {
    press: '글로벌 인테리어 매거진 (예시)',
    description: '2024년 주목할 대한민국 공간 디자인 랩 선정',
  },
  {
    press: '해외 건축 매거진 (예시)',
    description: '서울 도심 펜트하우스(예시) 트래버틴 미학 심층 커버',
  },
  {
    press: '공간 디자인 어워드 (예시)',
    description: '공간 건축 부문 수상 이력 표기 자리 (예시)',
  },
  {
    press: '하이엔드 주거 매거진 (예시)',
    description: '직영 시공 신뢰도 평가 표기 자리 (예시)',
  },
];
