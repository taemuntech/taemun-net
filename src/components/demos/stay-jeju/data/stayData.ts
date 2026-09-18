import { TimeMoodPreset, SpatialZone, StayMaterial } from '../types';

export const STAY_BRAND = {
  name: 'SOSOJAE JEJU',
  koreanName: '소소재 제주 (小素齋)',
  tagline: '비움과 여백, 제주의 시간과 돌담이 머무는 프라이빗 독채 스테이',
  // 지번까지 적으면 조회 가능한 실제 필지를 가리키게 된다 — 읍·리 수준까지만 두고 가상임을 밝힌다.
  address: '제주특별자치도 제주시 애월읍 고내리 일원 (가상 주소)',
  phone: '064-000-0000',
  email: 'contact@example.com',
  checkIn: '체크인 16:00 · 체크아웃 11:00 (사전 예약제)',
  bizNumber: '사업자등록번호 000-00-00000 · 숙박업 신고번호 표기 자리 (예시)',
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
    // 사진에 실제로 찍힌 것만 적는다 — 아침 햇살이 원목 마루에 떨어지는 침실. 돌담·감귤나무는 이 사진에 없다.
    imageUrl: '/portfolio/stay-jeju/jeju-01.jpg',
    ambientSoundName: '제주 애월의 바람과 풍경 소리',
    description:
      '전면 목재 창호를 열면 아침 햇살이 짙은 원목 마루 위로 길게 떨어집니다. 얇은 커튼이 빛을 한 번 걸러 내고, 정원의 초록이 그대로 실내 색으로 들어옵니다.',
    quote: '“창틀이 하나의 액자가 되어 아침의 빛과 정원을 그대로 품어냅니다.”',
  },
  {
    id: 'sunset',
    name: 'GOLDEN HOUR EMBER',
    koreanName: '노을빛이 깃드는 석양',
    timeRange: '17:00 - 19:30',
    colorTemp: '2,800K 앰비언트 골든 웜',
    lightConcept: 'Warm Horizon Reflection & Low Silhouette',
    bgGradient: 'from-orange-950/40 via-amber-900/20 to-transparent',
    // 노을 무드 = 절벽 위 수영 테라스 사진(jeju-03). 예전엔 접시에 담긴 요리 사진이 걸려 있었다.
    imageUrl: '/portfolio/stay-jeju/jeju-03.jpg',
    ambientSoundName: '저녁 노을의 파도와 잔잔한 현악',
    description:
      '수평선 너머로 해가 저물며 붉고 따스한 노을빛이 테라스 수면과 돌벽을 물들입니다. 실내 조명이 서서히 숨을 쉬듯 켜지며 아늑한 온기를 준비합니다.',
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
    // 밤 무드 = 숲과 현무암 사이에 등불이 켜진 독채 외관(jeju-05).
    imageUrl: '/portfolio/stay-jeju/jeju-05.jpg',
    ambientSoundName: '풀벌레 소리와 따스한 물소리',
    description:
      '모든 소음이 잦아든 제주의 밤. 낮은 등불이 현무암 디딤돌과 수반 위로 번지고, 은은한 간접 조명 아래 따스한 차 한 잔과 함께 온전한 쉼에 빠져듭니다.',
    quote: '“빛을 줄일수록 물에 비친 불빛과 내면의 목소리가 선명해집니다.”',
  },
];

/**
 * 공간 존 — **사진에 실제로 찍힌 것**만 적고, 핀 좌표도 그 사진을 보고 찍는다.
 * 2026-09-18 수리: 예전에는 다도 라운지에 온천 욕실 사진이, 노천탕에 외관 야경 사진이 걸려 있었고
 * 핀 세 개가 전부 사진에 없는 물건을 가리켰다(석조 욕조 위에 「통원목 티 테이블」 등).
 */
export const SPATIAL_ZONES: SpatialZone[] = [
  {
    id: 'zone-living',
    name: '저녁 다이닝 테이블 (Dining Pavilion)',
    subtitle: '통창 너머 수평선을 마주 보는 원목 통판 식탁',
    area: '42 m² (약 13평)',
    ceiling: '2.7m 목재 노출보 천장',
    viewAngle: '서향 바다 수평선 조망',
    description:
      '통판 원목 식탁 하나를 중심에 두고 나머지를 비운 다이닝 공간입니다. 해가 기울면 조도를 낮추고 캔들 하나만 남겨, 창 너머 수평선과 접시 위 음식에만 시선이 머물도록 설계했습니다.',
    imageUrl: '/portfolio/stay-jeju/jeju-02.jpg',
    materials: ['통판 원목 식탁', '무광 흑유 도기', '리넨 테이블 러너', '황동 캔들 홀더'],
    hotspots: [
      {
        x: 50,
        y: 62,
        title: '통판 원목 다이닝 테이블',
        desc: '이어 붙이지 않은 한 장 널을 그대로 써서 결과 옹이가 그날의 상차림 배경이 됩니다.',
      },
      {
        x: 32,
        y: 33,
        title: '캔들 하나로 맞추는 저녁 조도',
        desc: '천장 조명을 끄고 테이블 위 촛불만 남겨 음식의 색과 질감이 먼저 보이도록 조도를 낮춥니다.',
      },
      {
        x: 13,
        y: 15,
        title: '수평선을 담는 통창',
        desc: '식탁에 앉은 눈높이에 창 하단을 맞춰, 앉으면 바다만 보이고 서면 정원까지 보입니다.',
      },
    ],
  },
  {
    id: 'zone-bath',
    // 「온천」은 온천법이 정한 지하수를 쓸 때만 붙일 수 있는 말이다 — 데운 물을 채우는 탕이라 「노천탕」으로.
    // 욕조는 사진 그대로 **석조 통욕조**다. 편백은 벽체·툇마루·소품에 쓴다.
    name: '노천 석조탕 & 편백 목욕채 (Stone Bath House)',
    subtitle: '대나무 정원을 향해 열린 통창 아래 놓인 석조 통욕조',
    area: '36 m² (노천 테라스 포함)',
    ceiling: '2.6m 편백 루버 평천장',
    viewAngle: '대나무 정원 전면 통창',
    description:
      '한 덩어리 자연석을 파낸 석조 통욕조에 약 40도 전후로 데운 온수를 채웁니다. 벽과 바닥, 툇마루를 편백으로 마감해 수증기가 오를 때 목재 향이 함께 퍼지고, 통창 밖 대나무가 시선을 가려 줍니다.',
    imageUrl: '/portfolio/stay-jeju/jeju-04.jpg',
    materials: ['자연석 석조 통욕조', '무절 편백 벽체·툇마루', '제주 현무암 디딤돌', '대나무 수목 조경'],
    hotspots: [
      {
        x: 56,
        y: 71,
        title: '자연석 석조 통욕조',
        desc: '한 덩어리 자연석을 파내어 가장자리를 낮게 다듬었습니다. 돌이 열을 머금어 물이 천천히 식습니다.',
      },
      {
        x: 51,
        y: 28,
        title: '대나무 정원을 향한 전면 통창',
        desc: '탕에 몸을 담근 눈높이에 맞춰 창 하단을 낮추고, 바깥 대나무를 차폐와 조경으로 함께 씁니다.',
      },
      {
        x: 13,
        y: 68,
        title: '편백 툇마루 & 무명 수건',
        desc: '탕에 드나드는 자리에만 툇마루를 덧대 맨발이 젖은 돌을 딛지 않도록 동선을 나눴습니다.',
      },
    ],
  },
  {
    id: 'zone-bedroom',
    name: '정원 침실 (Garden-facing Sleeping Room)',
    subtitle: '전면 목재 창호로 정원이 그대로 들어오는 수면 공간',
    area: '32 m² (약 10평)',
    ceiling: '2.8m 원목 루버 평천장',
    viewAngle: '남향 중정 정원 조망',
    description:
      '수면의 본질에 집중할 수 있도록 간결하게 정돈된 침실입니다. 벽 한 면을 전부 목재 창호로 두어, 커튼을 걷으면 아침 햇살과 정원의 초록이 침대 위까지 들어옵니다.',
    imageUrl: '/portfolio/stay-jeju/jeju-01.jpg',
    materials: ['워싱 린넨 침구', '저상형 원목 침대 프레임', '짙은 원목 마루·천장', '리넨 시어 커튼'],
    hotspots: [
      {
        x: 33,
        y: 52,
        title: '저상형 원목 침대 & 워싱 린넨',
        desc: '프레임을 바닥 가까이 낮춰 천장이 더 높아 보이게 하고, 침구는 세탁할수록 부드러워지는 린넨으로 맞췄습니다.',
      },
      {
        x: 80,
        y: 35,
        title: '전면 목재 창호 & 시어 커튼',
        desc: '벽 한 면을 통째로 창호로 짜고 얇은 커튼을 덧대, 빛을 한 번 걸러 아침에 눈이 부시지 않게 했습니다.',
      },
      {
        x: 55,
        y: 80,
        title: '발치 원목 벤치',
        desc: '짐을 올려 두는 자리를 침대 발치에 따로 두어, 침구 위에 가방을 올리지 않아도 되도록 했습니다.',
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
    origin: '고산지대 천연 편백 (가상 · 특정 산지를 지정하지 않습니다)',
    textureDesc: '결이 곱고 나뭇결이 균일하며 물에 닿을 때 부드러운 살결 같은 감촉',
    sensoryNote: '따스한 수증기와 만나는 순간 숲속 한가운데 서 있는 듯한 짙은 삼림욕 향기',
    craftsmanship: '옹이가 없는 무절(無節) 부위만을 선별하여 정밀 대패 마감',
    colorHex: '#d8c29d',
    // 「항균」은 표시·광고가 따로 규제되는 문구라 근거 없이 못 쓴다 — 목재의 물성 설명으로 바꿨다.
    specs: ['수분에 강해 욕실·탕에 오래 쓰는 목재', '수축·변형을 줄이는 고온 증기 건조', '천연 오일 마감 (예시 사양)'],
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
    // 「불연」은 등급 판정이 따로 있고 「방출 제로」는 단정이다 — 둘 다 사양 표기로 낮췄다.
    specs: ['실내 습도 조절을 돕는 미장 마감', '무기질 기반 마감재 (불연 등급은 시공 사양에 따름)', '유해 화학물질 저방출 자재 적용 (예시 사양)'],
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
    // 「인증 규격」·「방충 효과」는 시험 성적이 있어야 쓰는 말이다 — 직물 특성 설명으로 바꿨다.
    specs: ['공기가 잘 통하는 천연 린넨 조직', '제주 전통 감물 염색 마감', '세탁할수록 부드러워지는 물성'],
  },
];
