import { DiningZone, DiningMaterial, LightingMode } from '../types';

export const DINING_ZONES: DiningZone[] = [
  {
    id: 'chef-bar',
    name: '오픈 키친 & 셰프 카운터 바',
    engName: 'Open Kitchen & Artisan Chef Bar',
    subtitle: '조리와 미식이 하나로 이어지는 역동적인 극장형 공간',
    description:
      '화이트 이탈리안 테라조 베이스에 브러시드 황동 트림을 두른 곡선형 아일랜드 바입니다. 셰프의 섬세한 플레이팅과 조리 과정을 바로 눈앞에서 감상하며 미식을 즐길 수 있도록 조도와 배기 설비를 정밀하게 통합했습니다.',
    imageUrl: '/portfolio/nouveau-dining/nouveau-02.jpg',
    capacity: '14석 (바 카운터 전용)',
    lightingSpec: '2,700K 웜 LED 인다이렉트 코브 & 핀 스포트라이트',
    features: [
      '무소음·무진동 언더카운터 인덕션 및 수전 통합',
      '브러시드 황동 엣지와 이탈리안 테라조 마감',
      '조리 열기를 즉시 포집하는 저소음 흡기 후드',
      '편안한 착좌감의 월넛 원목 하이 바스툴',
    ],
    hotspots: [
      {
        x: 48,
        y: 65,
        title: '커브드 테라조 바 카운터',
        desc: '유려한 곡선으로 마감된 천연 골재 테라조 바 카운터',
      },
      {
        x: 75,
        y: 42,
        title: '오픈 셰프 스테이션',
        desc: '스테인리스 스틸과 구리 쿡웨어로 구성된 전문 조리 공간',
      },
      {
        x: 22,
        y: 72,
        title: '월넛 원목 바스툴',
        desc: '장시간 식사에도 피로감이 없는 인체공학적 수제 의자',
      },
    ],
  },
  {
    id: 'terrace-garden',
    name: '어번 글래스하우스 테라스 가든',
    engName: 'Urban Glasshouse Terrace Garden',
    subtitle: '도심 속 사계절 자연 채광이 가득한 온실 정원 테라스',
    description:
      '성수동 도심 빌딩 숲 속에서 만나는 유럽풍 유리 온실 정원입니다. 테라코타와 라임스톤 타일 바닥 위에 올리브 나무와 양치식물을 풍성하게 배치하여 도심 속 여유로운 브런치를 선사합니다.',
    imageUrl: '/portfolio/nouveau-dining/nouveau-03.jpg',
    capacity: '24석 (2~4인 테이블)',
    lightingSpec: '자연 채광 및 펜던트 조명 (3,000K)',
    features: [
      '단열 복층 아치형 글래스루프 및 빗물 배수 설계',
      '수입 올리브 고목과 친환경 생화 플랜테리어',
      '내추럴 테라코타 & 라임스톤 바닥 타일',
      '프렌치 비스트로 라탄 체어 & 천연 대리석 비스트로 테이블',
    ],
    hotspots: [
      {
        x: 52,
        y: 78,
        title: '카라라 마블 비스트로 테이블',
        desc: '주물 다리와 비앙코 대리석 상판이 주는 클래식한 멋',
      },
      {
        x: 20,
        y: 45,
        title: '생화 올리브 플랜테리어',
        desc: '사계절 푸르른 자연미를 전하는 지중해 수종 조경',
      },
      {
        x: 68,
        y: 25,
        title: '단열 온실 아치 글래스',
        desc: '자외선 차단 및 사계절 온도 유지를 돕는 특수 유리',
      },
    ],
  },
  {
    id: 'private-salon',
    name: '르 시엘 프라이빗 다이닝 룸',
    engName: 'Le Ciel VIP Private Dining Salon',
    subtitle: '음향 차음 설계와 온화한 루버 벽면의 독립 살롱',
    description:
      '중요한 비즈니스 미팅과 프라이빗 모임을 위해 3중 차음 설계된 독립형 VIP 룸입니다. 오크 리브드 루버 패널과 은은한 조각 펜던트가 아늑한 프라이버시를 완성합니다.',
    imageUrl: '/portfolio/nouveau-dining/nouveau-04.jpg',
    capacity: '6~8인 단독 룸',
    lightingSpec: '조광 제어 펜던트 (1,800K~2,700K 딤투웜)',
    features: [
      'STC 45 등급 차음 도어 및 리브드 우드 흡음재',
      '조각적 조형미의 맞춤형 황동 링 펜던트',
      '칼라카타 골드 천연 대리석 8인 맞춤 식탁',
      '개별 온도·조도 조절 스마트 월패드',
    ],
    hotspots: [
      {
        x: 50,
        y: 20,
        title: '조각적 황동 링 펜던트',
        desc: '곡선의 빛으로 공간의 격조를 높이는 메인 오브제 조명',
      },
      {
        x: 50,
        y: 75,
        title: '칼라카타 골드 대리석 식탁',
        desc: '금빛 베인이 수놓아진 최고급 천연 대리석 상판',
      },
      {
        x: 82,
        y: 45,
        title: '음향 차음 리브드 패널',
        desc: '대화의 명료도를 높이고 외부 소음을 완벽히 차단하는 패널',
      },
    ],
  },
];

export const LIGHTING_MODES: LightingMode[] = [
  {
    id: 'daylight',
    name: '자연광 브런치 모드 (Daylight)',
    timeRange: '11:00 ~ 15:30',
    lux: 450,
    kelvin: 4000,
    desc: '큰 통창을 통해 쏟아지는 자연광과 산뜻한 식물 테라피를 극대화한 청량한 낮의 분위기',
  },
  {
    id: 'sunset',
    name: '선셋 골든 아워 모드 (Golden Hour)',
    timeRange: '17:30 ~ 19:30',
    lux: 180,
    kelvin: 3000,
    desc: '노을빛을 닮은 웜 코브 조명과 황동 오브제 반사광이 어우러지는 감성적인 저녁 무드',
  },
  {
    id: 'midnight',
    name: '미드나잇 캔들 다이닝 (Midnight Mood)',
    timeRange: '20:00 ~ 24:00',
    lux: 25,
    kelvin: 2200,
    desc: '테이블 핀 스포트라이트와 은은한 촛불 조도로 와인과 깊은 대화에 몰입하는 심야 살롱',
  },
];

export const DINING_MATERIALS: DiningMaterial[] = [
  {
    id: 'mat-terrazzo',
    name: '이탈리안 비앙코 테라조',
    engName: 'Italian Bianco Terrazzo Slab',
    spec: '두께 30mm 천연 대리석 골재 압착 (예시 규격)',
    origin: '이탈리아 베로나 채석 골재 (예시)',
    desc: '천연 비앙코 대리석 칩을 고밀도로 배합해 견고하게 연마한 천연 테라조입니다. 스크래치와 오염에 강해 고급 다이닝 카운터 상판으로 최적입니다.',
    tactileNote: '매끄럽고 차가운 실크 터치감과 천연석 특유의 기품 있는 무게감',
    colorHex: '#e8e4dc',
  },
  {
    id: 'mat-brass',
    name: '브러시드 새틴 황동 트림',
    engName: 'Brushed Satin Brass Trim',
    spec: '두께 3mm PVD 코팅 내마모 규격 (예시)',
    origin: '건축용 고순도 황동 합금 (예시)',
    desc: '시간이 지날수록 자연스러운 에이징 멋이 깊어지는 고급 황동 마감재입니다. 섬세한 헤어라인 가공으로 눈부심 없는 은은한 금빛 반사광을 연출합니다.',
    tactileNote: '헤어라인 텍스처의 정교한 결감과 따뜻한 금속성 온도감',
    colorHex: '#bfa76f',
  },
  {
    id: 'mat-linen',
    name: '프렌치 에크루 오가닉 린넨',
    engName: 'French Ecru Organic Linen',
    spec: '중량 420g/sqm 천연 방직 (예시)',
    origin: '유럽 친환경 섬유 규격 준수 (예시)',
    desc: '표백하지 않은 자연 본연의 에크루 미색을 머금은 100% 천연 린넨 패브릭입니다. 소음을 부드럽게 흡수하고 공간에 온화한 온도를 불어넣습니다.',
    tactileNote: '직조 섬유의 오돌토돌한 천연 촉감과 차분하고 온화한 쿠션감',
    colorHex: '#ded5c4',
  },
  {
    id: 'mat-fluted-oak',
    name: '플루티드 내추럴 오크 리브재',
    engName: 'Fluted Natural White Oak',
    spec: '폭 25mm 삼차원 곡면 CNC 가공 (예시)',
    origin: '지속가능 산림 인증 목재 (예시)',
    desc: '천연 화이트 오크를 반원형 단면으로 입체 가공한 루버 패널입니다. 소리의 난반사를 방지하여 다이닝 공간의 말소리 울림을 자연스럽게 억제합니다.',
    tactileNote: '손끝에 닿는 규칙적인 나무 골의 입체감과 원목 특유의 온기',
    colorHex: '#c79d68',
  },
];
