import { TimeMoodPreset, SpatialZone, StayMaterial } from '../types';

export const STAY_BRAND = {
  name: 'SOSOJAE JEJU',
  koreanName: '소소재 제주 (小素齋)',
  tagline: '비움과 여백, 제주의 시간과 돌담이 머무는 프라이빗 독채 스테이',
  address: '제주특별자치도 제주시 애월읍 고내리 420 (가상)',
  phone: '064-000-0000',
  email: 'contact@example.com',
  checkIn: '체크인 16:00 · 체크아웃 11:00 (사전 예약제)',
};

export const TIME_MOODS: TimeMoodPreset[] = [
  {
    id: 'day',
    name: 'DAYLIGHT REPOSE',
    koreanName: '맑은 아침과 낮의 채광',
    timeRange: '10:00 - 16:30',
    colorTemp: '5,000K 순수 자연광',
    lightConcept: 'Natural Skyflow & Deep Shadow',
    bgGradient: 'from-amber-50/40 via-stone-100/10 to-transparent',
    imageUrl: '/portfolio/stay-jeju/jeju-01.avif',
    ambientSoundName: '제주 애월의 바람과 풍경 소리',
    description:
      '애월 바다에서 불어오는 부드러운 바람과 현무암 돌담 사이로 부서지는 자연광이 실내 미색 회벽에 긴 그림자를 드리웁니다. 창을 열면 감귤나무 잎이 스치는 소리가 여백을 채웁니다.',
    quote: '“창틀이 하나의 액자가 되어 제주의 하늘과 바다를 온전히 품어냅니다.”',
  },
  {
    id: 'sunset',
    name: 'GOLDEN HOUR EMBER',
    koreanName: '노을빛이 깃드는 석양',
    timeRange: '17:00 - 19:30',
    colorTemp: '2,800K 앰비언트 골든 웜',
    lightConcept: 'Warm Horizon Reflection & Low Silhouette',
    bgGradient: 'from-orange-950/40 via-amber-900/20 to-transparent',
    imageUrl: '/portfolio/stay-jeju/jeju-02.jpg',
    ambientSoundName: '저녁 노을의 파도와 잔잔한 현악',
    description:
      '수평선 너머로 해가 저물며 붉고 따스한 노을빛이 노천 히노끼탕과 거실의 고재 마루를 물들입니다. 공간의 조명들이 서서히 숨을 쉬듯 켜지며 아늑한 온기를 준비합니다.',
    quote: '“해가 지는 시간, 돌담 너머 하늘은 매일 다른 한 폭의 수묵화가 됩니다.”',
  },
  {
    id: 'night',
    name: 'STARRY QUIETUDE',
    koreanName: '별빛과 등불의 고요한 밤',
    timeRange: '20:00 - 06:00',
    colorTemp: '2,200K 캔들라이트 간접 미광',
    lightConcept: 'Concealed Glow & Deep Acoustic Calm',
    bgGradient: 'from-[#0b0c10]/80 via-[#0b0c10]/40 to-transparent',
    imageUrl: '/portfolio/stay-jeju/jeju-03.jpg',
    ambientSoundName: '풀벌레 소리와 따스한 물소리',
    description:
      '모든 소음이 잦아든 제주의 밤. 천창을 통해 쏟아지는 밤하늘의 별을 바라보며, 은은한 간접 조명 아래 따스한 차 한 잔과 함께 온전한 쉼에 빠져듭니다.',
    quote: '“빛을 줄일수록 밤하늘의 별과 내면의 목소리가 선명해집니다.”',
  },
];

export const SPATIAL_ZONES: SpatialZone[] = [
  {
    id: 'zone-living',
    name: '안채 다도 라운지 (Tea Pavilion & Lounge)',
    subtitle: '100년 편백 고재와 통창 돌담이 마주하는 명상의 공간',
    area: '48 m² (약 15평)',
    ceiling: '3.4m 서까래 노출 박공 구조',
    viewAngle: '남향 중정 돌담 정원 조망',
    description:
      '낮은 좌식 다도상과 제주 감태 방석이 놓인 중앙 라운지입니다. 전통 가옥의 서까래 구조를 보존하면서도 현대적 통창 유리 파사드를 결합하여 계절의 변화를 파노라마로 감상할 수 있습니다.',
    imageUrl: '/portfolio/stay-jeju/jeju-04.jpg',
    materials: ['전통 가옥 편백 고재', '제주 자연석 바닥 타일', '한지 규조토 미장벽', '황동 수전 오브제'],
    hotspots: [
      {
        x: 32,
        y: 65,
        title: '통원목 티 테이블 & 다도구',
        desc: '제주 자생 편백 원목을 건조하여 결을 살린 좌식 다도 테이블입니다.',
      },
      {
        x: 70,
        y: 40,
        title: '3.4M 박공 서까래 오픈 천장',
        desc: '전통 구조목 결구 방식을 드러내어 웅장함과 아늑한 비례감을 동시에 선사합니다.',
      },
      {
        x: 85,
        y: 72,
        title: '프레임리스 픽스 윈도우',
        desc: '시야를 가리는 프레임을 바닥에 매립하여 정원의 돌담이 실내로 연속되는 착시를 연출했습니다.',
      },
    ],
  },
  {
    id: 'zone-bath',
    name: '노천 온천탕 & 히노끼 스파 (Outdoor Hinoki Bath)',
    subtitle: '제주 화산석과 피톤치드 편백 향이 감싸는 프라이빗 탕',
    area: '36 m² (노천 테라스 포함)',
    ceiling: '하늘 오픈형 (Sky Open)',
    viewAngle: '사방 현무암 겹돌담 완벽 차폐',
    description:
      '외부 시선이 완벽히 차단된 돌담 안쪽에 자리한 야외 노천탕입니다. 40도 온수가 유지되는 일본 키소산 히노끼 원목 욕조와 제주 현무암 판석이 어우러져 사계절 내내 프라이빗한 웰니스를 선사합니다.',
    imageUrl: '/portfolio/stay-jeju/jeju-05.jpg',
    materials: ['키소산 무절 편백나무', '제주 구멍 현무암 겹돌담', '화강암 자연석 디딤돌', '대나무 수목 조경'],
    hotspots: [
      {
        x: 48,
        y: 68,
        title: '키소산 편백(히노끼) 통욕조',
        desc: '옹이가 없는 엄선된 목재로 제작되어 물에 젖을 때마다 짙은 피톤치드 향을 뿜어냅니다.',
      },
      {
        x: 25,
        y: 35,
        title: '2.4M 높이 제주 겹돌담',
        desc: '제주 장인이 정돌로 쌓아 올린 전통 겹담으로, 바람은 통하고 외부 시선은 차단합니다.',
      },
      {
        x: 75,
        y: 55,
        title: '온도 유지 스마트 순환 시스템',
        desc: '사계절 내내 희망하는 온도를 정밀하게 유지해주는 스마트 히팅 공조 설비입니다.',
      },
    ],
  },
  {
    id: 'zone-bedroom',
    name: '별빛 침실 (Skyview Sleeping Sanctuary)',
    subtitle: '천창으로 밤하늘을 올려다보는 고요한 수면 공간',
    area: '32 m² (약 10평)',
    ceiling: '최고 3.2m 경사 천창 시스템',
    viewAngle: '북서쪽 애월 밤하늘 및 바다 수평선',
    description:
      '수면의 본질에 집중할 수 있도록 간결하게 정돈된 침실입니다. 침대 헤드 위에 배치된 천창 전동 블라인드를 열면 침대에 누운 채로 제주의 별빛과 밤하늘을 마주할 수 있습니다.',
    imageUrl: '/portfolio/stay-jeju/jeju-03.jpg',
    materials: ['유기농 워싱 린넨 침구', '간접 매립형 라인 조명', '저상형 오크 원목 프레임', '흡음 규조토 벽체'],
    hotspots: [
      {
        x: 50,
        y: 30,
        title: '전동 롤스크린 천창 윈도우',
        desc: '스마트 리모컨으로 차광과 개방을 부드럽게 조절하는 스카이라이트 창호입니다.',
      },
      {
        x: 35,
        y: 75,
        title: '저상형 맞춤 오크 침대 프레임',
        desc: '공간의 시각적 무게를 낮추어 천장이 더욱 높아 보이도록 유도한 저상형 설계입니다.',
      },
      {
        x: 80,
        y: 60,
        title: '수면 유도 2,200K 나이트 라이트',
        desc: '눈부심이 전혀 없는 바닥 글레어리스 슬릿 조명으로 깊은 숙면을 유도합니다.',
      },
    ],
  },
];

export const STAY_MATERIALS: StayMaterial[] = [
  {
    id: 'mat-basalt',
    name: '제주 화산 현무암',
    engName: 'Jeju Volcanic Basalt Stone',
    origin: '제주도 현지 채취 정돌 가공 (가상)',
    textureDesc: '자연스러운 다공질 기포와 묵직한 다크 차콜 톤이 주는 제주 고유의 원초적 질감',
    sensoryNote: '비가 내릴 때 특유의 흙내음과 석재 향을 머금어 깊은 정취를 자아냄',
    craftsmanship: '기계 절단이 아닌 석공 장인의 전통 정다듬 손가공',
    colorHex: '#383a3f',
    specs: ['자연 다공질 흡음 및 습도 조절', '외벽 겹돌담 및 테라스 바닥 시공', '풍화에 강한 내구성'],
  },
  {
    id: 'mat-hinoki',
    name: '100년산 편백(히노끼) 원목',
    engName: 'Selected Aged Hinoki Wood',
    origin: '엄선 고산지대 천연 편백 (가상)',
    textureDesc: '결이 곱고 나뭇결이 균일하며 물에 닿을 때 부드러운 살결 같은 감촉',
    sensoryNote: '따스한 수증기와 만나는 순간 숲속 한가운데 서 있는 듯한 짙은 삼림욕 향기',
    craftsmanship: '옹이가 없는 무절(無節) 부위만을 선별하여 정밀 대패 마감',
    colorHex: '#d8c29d',
    specs: ['천연 항균 및 곰팡이 저항성', '수축/변형 억제 고온 증기 건조', '친환경 천연 오일 마감'],
  },
  {
    id: 'mat-diatom',
    name: '한지 규조토 미장벽',
    engName: 'Natural Diatomaceous Earth Plaster',
    origin: '국내산 천연 광물 & 닥나무 한지 섬유 (가상)',
    textureDesc: '빛을 흡수하여 부드러운 음영을 연출하는 모래알 질감의 무광 베이지 회벽',
    sensoryNote: '손끝에 닿는 온화한 미네랄의 질감과 은은한 온기',
    craftsmanship: '미장공이 흙손으로 한 획씩 손으로 결을 살려 도포',
    colorHex: '#e8e3d8',
    specs: ['실내 습도 자율 조절 및 악취 흡착', '화재에 안전한 불연 무기질재', '유해 화학물질 방출 제로'],
  },
  {
    id: 'mat-linen',
    name: '제주 감물 워싱 린넨',
    engName: 'Natural Persimmon Washed Linen',
    origin: '제주 전통 풋감 염색 린넨 (가상)',
    textureDesc: '자연스러운 구김과 세월의 태가 묻어나는 살구빛 브라운 톤 패브릭',
    sensoryNote: '몸을 포근하게 감싸주며 땀과 습기를 빠르게 증발시키는 쾌적함',
    craftsmanship: '제주 전통 방식 태양광 자연 건조 및 바이오 워싱',
    colorHex: '#bfa58a',
    specs: ['통기성 및 피부 저자극 인증 규격', '천연 감물 염색 방충 효과', '세탁할수록 부드러워지는 물성'],
  },
];
