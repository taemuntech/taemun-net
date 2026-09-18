import { WellnessZone, WellnessMaterial, AirSensorTelemetry } from '../types';

export const WELLNESS_ZONES: WellnessZone[] = [
  {
    id: 'private-reformer',
    name: '1:1 프라이빗 리포머 룸',
    engName: 'Private Reformer Sanctuary',
    subtitle: '곡선형 간접조명 아치와 웜 오크 바닥의 독립 레슨 스튜디오',
    description:
      '부드러운 테라코타 미장 벽면과 아치형 백라이트 니치가 감싸는 프라이빗 1:1 레슨 룸입니다. 소음 차단 패널과 통창의 린넨 커튼을 통해 자연 채광을 온화하게 분산하여 온전한 신체 정렬과 호흡에 집중할 수 있습니다.',
    imageUrl: '/portfolio/arche-wellness/arche-02.jpg',
    capacity: '1:1 개인 레슨 전용 (단독 룸)',
    airSpec: '개별 청정 외기 공조 (미세먼지 차단 필터, 예시)',
    features: [
      '북미산 화이트 오크 프레임 프리미엄 리포머',
      '눈부심 없는 3,000K 웜 아치 간접 조명',
      '린넨 패브릭 커튼을 통한 부드러운 자연광 확산',
      '친환경 천연 규조토 흡방습 미장 마감',
    ],
    hotspots: [
      {
        x: 32,
        y: 35,
        title: '아치형 백라이트 니치',
        desc: '곡선의 미학과 간접 조명이 선사하는 심리적 안정감',
      },
      {
        x: 52,
        y: 62,
        title: '천연 오크 리포머 기구',
        desc: '캐러멜 가죽 패딩과 천연 원목 프레임의 정밀 기구',
      },
      {
        x: 85,
        y: 55,
        title: '린넨 드레이프 통창',
        desc: '외부 시선을 차단하고 온화한 햇살만 투과시키는 린넨',
      },
    ],
  },
  {
    id: 'tea-lounge',
    name: '허벌 티 & 웰니스 라운지',
    engName: 'Herbal Tea & Restorative Lounge',
    subtitle: '운동 전후 차분한 휴식과 수분 보충을 위한 오가닉 라운지',
    description:
      '곡선형 부클레 패브릭 소파와 플루티드 라임스톤 티 카운터가 어우러진 휴식 공간입니다. 실내 올리브 수목과 자연석 오브제가 주는 자연의 온기 속에서 따뜻한 허브차를 음미할 수 있습니다.',
    imageUrl: '/portfolio/arche-wellness/arche-03.jpg',
    capacity: '12석 (라운지 소파 & 카운터)',
    airSpec: '중앙 항온항습 에어 케어 텔레메트리 연동',
    features: [
      '곡선형 이탈리아 부클레 패브릭 라운지 소파',
      '플루티드 라임스톤 티 아일랜드 카운터',
      '실내 생화 올리브 수목 및 천연석 조형물',
      '천연 황마(Jute) 섬유 러그 바닥재',
    ],
    hotspots: [
      {
        x: 20,
        y: 72,
        title: '부클레 패브릭 소파',
        desc: '몸을 포근하게 감싸는 친환경 양모 텍스처 소파',
      },
      {
        x: 28,
        y: 48,
        title: '라임스톤 티 카운터',
        desc: '자연석 질감의 아일랜드 수전과 티 브루잉 공간',
      },
      {
        x: 75,
        y: 50,
        title: '생화 올리브 조경',
        desc: '싱그러움과 시각적 휴식을 더하는 실내 수목',
      },
    ],
  },
  {
    id: 'vip-powder',
    name: '호텔식 프라이빗 파우더 & 스파 샤워실',
    engName: 'Boutique Vanity & Hinoki Spa',
    subtitle: '천연 편백 향기와 테라코타 세면대가 선사하는 프라이빗 리추얼',
    description:
      '레슨 후 상쾌한 마무리를 돕는 1인 독립형 파우더룸입니다. 히노끼 편백나무 벽면에서 피어나는 천연 피톤치드와 무프레임 백라이트 거울, 테라코타 세면대가 호텔 스파의 품격을 완성합니다.',
    imageUrl: '/portfolio/arche-wellness/arche-04.jpg',
    capacity: '프라이빗 1인 파우더 & 샤워 부스',
    airSpec: '급속 제습 및 배기 순환 시스템 (예시 사양)',
    features: [
      '천연 히노끼 원목 벽면 마감',
      '수제 질감의 테라코타 더블 세면대 & 브러시드 니켈 수전',
      '조광 제어가 가능한 무프레임 비정형 거울',
      '프리미엄 스타일링 드라이어 및 비건 어메니티 세팅 공간',
    ],
    hotspots: [
      {
        x: 38,
        y: 32,
        title: '비정형 백라이트 미러',
        desc: '그림자를 줄여 얼굴을 부드럽게 밝히는 고연색성 거울',
      },
      {
        x: 38,
        y: 62,
        title: '테라코타 수제 세면대',
        desc: '흙의 따스한 온기를 담은 자연 건조 점토 볼',
      },
      {
        x: 65,
        y: 40,
        title: '히노끼 편백 벽체',
        desc: '은은한 숲의 향기와 습도 조절 기능을 갖춘 편백',
      },
    ],
  },
];

export const WELLNESS_MATERIALS: WellnessMaterial[] = [
  {
    id: 'mat-terracotta',
    name: '핸드메이드 러스틱 테라코타 타일',
    engName: 'Handcrafted Terracotta Tile',
    spec: '자연 건조 천연 점토 소성 타일 (예시 규격)',
    ecoCert: '친환경 무독성 원료 규격 (예시)',
    desc: '인공 안료 없이 순수 황토와 점토만을 빚어 구워낸 친환경 타일입니다. 발끝에 전해지는 흙의 부드러운 질감과 따스한 색감이 심리적 안정감을 전합니다.',
    sensoryNote: '따스하고 매트한 흙 질감과 자연스러운 주황빛 테라코타 톤',
    colorHex: '#d27952',
  },
  {
    id: 'mat-hinoki',
    name: '천연 무절 히노끼 편백 집성목',
    engName: 'Solid Hinoki Cypress Timber',
    spec: '함수율 12% 이하 정밀 건조 목재 (예시 규격)',
    ecoCert: '지속가능 산림 관리 목재 규격 (예시)',
    desc: '옹이가 없는 엄선된 편백나무로 제작된 프리미엄 내장재입니다. 습기에 강해 물을 쓰는 공간에 두루 쓰이며, 은은한 편백 향이 감도는 마감을 만듭니다.',
    sensoryNote: '은은하고 맑은 숲속 피톤치드 향기와 비단결 같은 원목 표면',
    colorHex: '#e8cb9e',
  },
  {
    id: 'mat-diatom',
    name: '천연 규조토 흡방습 기능성 미장재',
    engName: 'Natural Diatomaceous Earth Plaster',
    spec: '미세 다공질 실리카 자연 미장 (예시 규격)',
    ecoCert: '실내 공기질 친환경 자재 규격 (예시)',
    desc: '바다 플랑크톤 유해가 퇴적된 천연 규조토 벽재입니다. 실내 습도가 높을 때는 수분을 머금고 건조할 때는 내보내, 쾌적 습도 범위(45~55%, 예시)를 지키는 데 도움을 줍니다.',
    sensoryNote: '햇빛을 부드럽게 분산시키는 포근하고 매트한 백사장 질감',
    colorHex: '#e5ded1',
  },
  {
    id: 'mat-raw-linen',
    name: '천연 오가닉 퓨어 린넨 패브릭',
    engName: 'Pure Organic Flax Linen',
    spec: '평량 380g/sqm 순수 아마(Flax) 섬유 직조 (예시 규격)',
    ecoCert: '글로벌 섬유 친환경 안전 규격 (예시)',
    desc: '화학 가공을 거치지 않은 순수 아마 섬유로 짠 린넨 커튼입니다. 정전기가 잘 생기지 않아 먼지가 덜 붙고, 관리가 수월한 청정 스튜디오를 만듭니다.',
    sensoryNote: '자연 바람에 산들거리는 청량하고 포근한 천연 직조감',
    colorHex: '#cbbfad',
  },
];

// 전부 연출용 예시 값이다 — 화면에도 항목마다 「예시」를 달아 실측치로 읽히지 않게 한다.
export const INITIAL_TELEMETRY: AirSensorTelemetry = {
  oxygenRate: 21.2,
  co2Level: 420,
  humidity: 52,
  temperature: 23.5,
};
