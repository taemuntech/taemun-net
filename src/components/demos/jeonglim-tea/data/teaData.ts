import { HanokZone, HanokMaterial, WeatherMood } from '../types';

export const HANOK_ZONES: HanokZone[] = [
  {
    id: 'paengju-bar',
    name: '다도 팽주석 & 먹색 화강석 티 바',
    engName: 'Master Paengju Tea Bar',
    subtitle: '천장 서까래와 현대식 무광 화강석 다도대의 절제된 조화',
    description:
      '북촌 한옥의 결을 머금은 고재 소나무 서까래를 그대로 노출하고, 현대적인 블랙 무광 화강석 다도대를 L자형으로 배치한 공간입니다. 팽주(茶主)가 정성껏 우려내는 맑은 찻물 소리와 무쇠 주전자 김이 오르는 정경을 감상할 수 있습니다.',
    imageUrl: '/portfolio/jeonglim-tea/jeonglim-01.jpg',
    capacity: '8석 (카운터 다도석)',
    timberSpec: '춘양목 고재 소나무 보 & 서까래 복원 (예시)',
    features: [
      '무광 샌딩 처리된 블랙 화강석 L자형 티 브루잉 카운터',
      '전통 무쇠 탕관(주전자)과 매립형 인덕션 웰',
      '수제 한지 창호문을 통한 부드러운 은은한 채광',
      '장시간 편안한 착석을 돕는 모던 한옥 좌식 평상',
    ],
    hotspots: [
      {
        x: 50,
        y: 60,
        title: '블랙 화강석 다도대',
        desc: '먹색의 깊은 무게감으로 찻자리의 격조를 높이는 상판',
      },
      {
        x: 25,
        y: 20,
        title: '전통 춘양목 서까래',
        desc: '백 년의 세월을 견뎌온 소나무의 묵직하고 자연스러운 곡선',
      },
      {
        x: 88,
        y: 40,
        title: '창호지 미닫이 분합문',
        desc: '외부 햇살을 은은하게 분산시키는 닥나무 수제 한지 창호',
      },
    ],
  },
  {
    id: 'courtyard-deck',
    name: '중정 이끼 정원 & 툇마루 평상석',
    engName: 'Courtyard Moss Garden & Floor Deck',
    subtitle: '비 내리는 처마 빗소리와 돌담 너머 석등을 조망하는 평상',
    description:
      '통유리창을 통해 사계절 변화하는 중정 정원을 한눈에 담는 툇마루 평상 공간입니다. 푸른 이끼와 단풍나무, 고즈넉한 석등을 바라보며 자연과 내가 하나 되는 명상의 시간을 누릴 수 있습니다.',
    imageUrl: '/portfolio/jeonglim-tea/jeonglim-02.jpg',
    capacity: '10석 (툇마루 평상석)',
    timberSpec: '천연 오일 마감 고재 소나무 툇마루 (예시)',
    features: [
      '단열 복층 통유리창으로 프레임리스 정원 파노라마 뷰',
      '비 오는 날 처마에서 떨어지는 낙수물 연출 시스템',
      '천연 현무암과 강돌, 솔이끼로 조성된 한국 전통 중정',
      '도톰한 삼베 방석과 자연목 미니 찻상',
    ],
    hotspots: [
      {
        x: 50,
        y: 50,
        title: '전통 석등과 이끼 정원',
        desc: '자연의 숨결과 시간의 깊이를 전하는 한국식 고요한 정원',
      },
      {
        x: 25,
        y: 72,
        title: '소나무 고재 툇마루',
        desc: '자연 건조 고목 특유의 단단하고 온화한 질감의 바닥재',
      },
      {
        x: 50,
        y: 15,
        title: '기와 처마 낙수 라인',
        desc: '처마 끝으로 떨어지는 빗소리가 천연 화이트노이즈를 형성',
      },
    ],
  },
  {
    id: 'soban-salon',
    name: '소반 온돌 프라이빗 다실',
    engName: 'Soban Ondol Private Tea Salon',
    subtitle: '팔각 소반과 따스한 온돌 마루가 감싸는 아늑한 별채',
    description:
      '소중한 분들과 프라이빗한 대화를 나눌 수 있는 온돌 다실입니다. 옻칠된 전통 팔각 소반과 한지 분합문, 토벽 미장이 아늑함을 더하며 다도 코스를 정갈하게 즐길 수 있습니다.',
    imageUrl: '/portfolio/jeonglim-tea/jeonglim-03.jpg',
    capacity: '4~6인 단독 다실',
    timberSpec: '황토 온돌 위 친환경 참나무 온돌마루 (예시)',
    features: [
      '장인이 옻칠한 전통 팔각 괴목 소반',
      '사계절 쾌적한 전통 온돌 난방 및 황토 토벽',
      '외부 정원으로 바로 이어지는 개방형 쪽마루 도어',
      '정갈한 백자 다기와 덖음차 다도 세트',
    ],
    hotspots: [
      {
        x: 50,
        y: 72,
        title: '전통 옻칠 팔각 소반',
        desc: '곡선의 다리와 단정한 상판이 돋보이는 수제 소반',
      },
      {
        x: 85,
        y: 40,
        title: '토벽 미장과 서까래',
        desc: '자연 흙과 짚을 섞어 바른 친환경 숨 쉬는 벽체',
      },
      {
        x: 50,
        y: 35,
        title: '정원 조망 쪽마루',
        desc: '문만 열면 사계절 정원의 바람이 스며드는 힐링 공간',
      },
    ],
  },
];

export const WEATHER_MOODS: WeatherMood[] = [
  {
    id: 'clear',
    name: '청명한 아침 햇살 (Clear Morning)',
    koreanPoetic: '창호지 문살 사이로 드는 맑은 볕',
    soundscape: '새소리와 산들바람 풍경(風磬) 소리',
    temperatureNote: '온도 22°C · 습도 48% (예시)',
    recommendedTea: '지리산 야생 어린 잎 세작 녹차',
  },
  {
    id: 'rain',
    name: '처마 끝 단비 (Rainy Afternoon)',
    koreanPoetic: '기와 처마 끝으로 떨어지는 빗소리',
    soundscape: '낙수물 소리와 촉촉한 흙내음',
    temperatureNote: '온도 20°C · 습도 65% (예시)',
    recommendedTea: '하동 작설 발효 홍차 & 구운 인절미',
  },
  {
    id: 'snow',
    name: '설경의 고요 (Winter Serenity)',
    koreanPoetic: '소복이 쌓이는 눈과 따스한 온돌',
    soundscape: '타닥타닥 탕관의 찻물 끓는 소리',
    temperatureNote: '온도 24°C (온돌 온기) · 습도 50% (예시)',
    recommendedTea: '지리산 고로쇠 곶감 대추 단차',
  },
];

export const HANOK_MATERIALS: HanokMaterial[] = [
  {
    id: 'mat-pine',
    name: '100년 숙성 백두대간 고재 소나무',
    engName: 'Reclaimed Century-Old Pine Timber',
    spec: '자연 건조 100년 이상 고재 대들보 (예시)',
    craftHeritage: '전통 목수 결구(치목) 기법 (예시)',
    desc: '세월의 비바람을 견디며 자연 수축 팽창을 마친 천연 소나무 고목입니다. 뒤틀림이나 갈라짐이 없으며 깊은 먹색과 갈색이 어우러진 장엄한 기품을 뿜어냅니다.',
    sensoryNote: '손바닥에 전해지는 묵직한 나무 나이테의 결감과 은은한 솔향',
    colorHex: '#4a3525',
  },
  {
    id: 'mat-hanji',
    name: '천연 닥나무 수제 창호 한지',
    engName: 'Traditional Mulberry Hanji Paper',
    spec: '국산 참닥나무 수제 발틀지 (예시)',
    craftHeritage: '전통 외발뜨기 한지 장인 규격 (예시)',
    desc: '닥나무 껍질을 삶고 두드려 손으로 뜬 전통 한지입니다. 햇살의 강한 자외선은 차단하고 부드러운 산란광만을 실내로 들여와 눈이 편안한 여백의 공간을 만듭니다.',
    sensoryNote: '눈부심 없는 따스한 미색과 섬세한 닥나무 섬유의 감촉',
    colorHex: '#f4ede2',
  },
  {
    id: 'mat-basalt',
    name: '제주 다공질 먹색 현무암 디딤돌',
    engName: 'Volcanic Basalt Stepping Stone',
    spec: '두께 50mm 자연 쇄석 표면 (예시)',
    craftHeritage: '자연 마모 현무암 선별 (예시)',
    desc: '화산암 특유의 자연스러운 숨구멍을 지닌 먹색 현무암입니다. 툇마루 아래 디딤돌과 중정 석등 주변에 배치되어 차분한 대지의 안정감을 부여합니다.',
    sensoryNote: '물에 젖었을 때 더욱 짙어지는 검은 먹색과 거친 암석 표면',
    colorHex: '#38383a',
  },
  {
    id: 'mat-brass-iron',
    name: '단조 황동 & 수제 무쇠 철물',
    engName: 'Forged Brass & Blacksmith Iron Hardware',
    spec: '손망치 두드림 수제 단조 (예시)',
    craftHeritage: '전통 방식 두석(豆錫) 철물 손잡이·문고리 (예시)',
    desc: '기계 프레스가 아닌 대장간 손망치로 두드려 만든 문고리와 돌쩌귀입니다. 자연스러운 두드림 자국과 시간이 흐를수록 깊어지는 파티나(고색)가 일품입니다.',
    sensoryNote: '묵직하고 서늘한 금속의 무게와 손에 착 감기는 문고리 촉감',
    colorHex: '#806c4f',
  },
];
