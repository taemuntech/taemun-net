import { Villa, Destination, AddOnOption, ExperiencePillar } from '../types';

// 목적지는 빌라와 1:1 로 맞춘다 — 예전에는 대응하는 빌라가 없는 「교토 아라시야마」가 있어서
// 교토를 고르면 남해·제주·발리 빌라가 그대로 붙은 채 요금만 1.25배가 되고,
// 예약 모달이 「선택 안식처: 교토 / 선택 빌라: Cliff Pool Villa」를 나란히 찍었다.
export const DESTINATIONS: Destination[] = [
  {
    id: 'namhae',
    name: 'Namhae Ocean Cliff',
    nameKo: '남해 오션 클리프',
    multiplier: 1.0,
    temp: '19°C',
    timeZone: 'Asia/Seoul',
  },
  {
    id: 'jeju',
    name: 'Jeju Gotjawal',
    nameKo: '제주 곶자왈',
    multiplier: 1.15,
    temp: '18°C',
    timeZone: 'Asia/Seoul',
  },
  {
    id: 'bali',
    name: 'Bali Ubud',
    nameKo: '발리 우붓',
    multiplier: 0.9,
    temp: '28°C',
    timeZone: 'Asia/Makassar',
  },
];

export const VILLAS: Villa[] = [
  {
    id: 'cliff',
    type: 'cliff',
    name: 'Cliff Pool Villa',
    nameKo: '클리프 인피니티 풀빌라 (Cliff Pool Villa)',
    shortLabel: '클리프 풀빌라 · 420㎡',
    badge: 'Exclusive Pavilion',
    region: 'Namhae Ocean Cliff',
    areaText: '남해 절벽 풀빌라 - 420㎡ / 127평',
    description: '남해 60미터 해안 암벽 위에 얹힌 미니멀리스틱 석재 파빌리온. 180도 파노라마 오션뷰와 정교한 소음 차단 음향 설계를 갖췄습니다. (예시 사양)',
    specs: {
      suite: '2 침실 (킹사이즈)',
      pool: '18m 온수 해수풀',
      circulation: '버틀러 전용 통로',
    },
    refinements: [
      '프리미엄 헤어 스타일링 기기 완비',
      '하이엔드 무선 사운드 시스템',
      '유기농 프리미엄 다도 세트',
      '24시간 전담 버틀러 팀',
    ],
    pricePerNight: 2800000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCozZMbR8Jj_DCUr1G4KdKVhg1Km_XGNvRaUqLuPu1pyq5_u_xxpiDZlJYY1PGXfrGXYtT0AKi7u15kfplSs9hcWE313IyFJ-XxojYYraGXG7RFMWyd3w5qtNjgFbAaP2ZQJBzK82r4iXoJoxpEofko7qgLzgGqIzZLTOEsoED8JYjzwIxmp9G_xzo6fLvLK32BlvV441TGya_7B7TDAftUK5JzVyU7hB6PTjj0m6l20UREWjnFy99X',
    alt: 'Expansive ultra-luxury cliffside private villa overlooking serene ocean waters',
    // 원본 사진 왼쪽 위와 아래쪽에 다른 브랜드 이름(The Azure Cliff Villa)·달러 요금이 박혀 있다.
    // 화면 문구와 어긋나는 가짜 정보라 위쪽 기준으로 확대해 그 부분을 잘라낸다.
    imageCropStyle: { transform: 'scale(1.42)', transformOrigin: 'top center' },
  },
  {
    id: 'presidential',
    type: 'presidential',
    name: 'Presidential Estate',
    nameKo: '제주 곶자왈 프레지덴셜 에스테이트 (Presidential Estate)',
    shortLabel: '프레지덴셜 에스테이트 · 850㎡',
    badge: 'Monumental Sanctuary',
    region: 'Jeju Gotjawal',
    areaText: '제주 곶자왈 프레지덴셜 - 850㎡ / 257평',
    description: '태고의 원시림 속에 고요히 파묻힌 대저택. 3동의 독립형 파빌리온, 개인 헬리패드 진입로 및 프라이빗 셰프 전용 주방을 갖췄습니다. (예시 사양)',
    specs: {
      suite: '4 침실 & 4 서재',
      pool: '25m 화산석 온천풀',
      circulation: '독립 보안초소 완비',
    },
    refinements: [
      '프리미엄 딥티슈 스파베드',
      '개인 히노키 사우나',
      '와인 셀러 60병 컬렉션',
      '전속 셰프 & 수석 버틀러',
    ],
    pricePerNight: 5500000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-pbD78mrAzMulIOP365IEy8njLYyMjpGxOXrVzhfn_uBswxJHUwihQdm54G21enhleWmhfo8vRHQgjFD35xUwZEKzNpM6LM0MmHL0_cA9nudaEMd7irvEEd4eY9qJ9jRPfISNHTiBtWG7n1zmNaK-GJsYyXgcDxvlCGhVFHxr5qLmwZdxkPsFZh8yy5irN413WCIFle9Qu59aRHRQBjQ9B5r4Z1Sq-y6-sTOhIWz1RrEuyO4DzC2r',
    alt: 'Ultra-spacious editorial architectural presidential estate in ancient Gotjawal forest of Jeju',
  },
  {
    id: 'forest',
    type: 'forest',
    name: 'Forest Sanctuary',
    nameKo: '우붓 프라이빗 밸리 생츄어리 (Forest Sanctuary)',
    shortLabel: '포레스트 생츄어리 · 380㎡',
    badge: 'Sacred Valley Retreat',
    region: 'Bali Ubud',
    areaText: '우붓 프라이빗 밸리 - 380㎡ / 115평',
    description: '아융강 계곡의 물소리와 정글 캐노피에 둘러싸인 목재 중심 건축. 야외 석재 욕조와 명상용 오픈 에어 살라(Sala)가 마련되어 있습니다. (예시 사양)',
    specs: {
      suite: '1 침실 & 오픈 살라',
      pool: '15m 천연 슬레이트풀',
      circulation: '전용 요가 파빌리온',
    },
    refinements: [
      '발리 유기농 허브 티 컬렉션',
      '천연 아로마 배스 리추얼',
      '수제 티크우드 음향 스피커',
      '전담 웰니스 컨시어지',
    ],
    pricePerNight: 2100000,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuQ1u9yt3Is1In_FuTL1-u1oEz_F2nmGF1RuoNKauWBVTpHRaOHkWlLJn3BZ6pmU7ffcaDJvTmI8JWLj7y1Gi0r4odsgjrlQFLaoFgF8t3q0sSo2ye2Gx0lBcFA3D09tb5mQqbY6FG2DUxxirbZzE9zpZ2ON1Xycpknhm_GFVePvIMUIZ3JCCZha3wdtA9wP3Ny7EjoaCxk6fa74sG5wl6jZAoGMvUJbWkqUOjkXZEpgoYEKLpEL7p',
    alt: 'Exclusive luxury tropical sanctuary in Ubud Bali perched above lush river valley jungle canopy',
  },
];

export const ADDONS: AddOnOption[] = [
  {
    id: 'addon-yacht',
    title: '선셋 프라이빗 요트 세일링 & 샴페인',
    price: 1500000,
    defaultChecked: true,
  },
  {
    id: 'addon-dinner',
    title: '수석 셰프 인빌라 테이스팅 디너 & 소믈리에 페어링',
    price: 850000,
    defaultChecked: true,
  },
  {
    id: 'addon-heli',
    title: '공항 VIP 헬리콥터 전용 트랜스퍼 (왕복)',
    price: 2200000,
    defaultChecked: false,
  },
  {
    id: 'addon-spa',
    title: '프라이빗 사운드 배스 & 아유르베다 스파 리추얼',
    price: 600000,
    defaultChecked: false,
  },
];

export const PILLARS: ExperiencePillar[] = [
  {
    id: 'gastro',
    tabTitle: '01. Gastronomy',
    category: 'The Culinary Art',
    title: '로컬 대지의 생명력을 담아낸 하이엔드 파인다이닝',
    description: '제주 해녀가 당일 채취한 해양 식자재, 남해의 유기농 올리브와 허브, 지리산 제철 산나물을 재해석한 현대적 오뜨 퀴진(Haute Cuisine). 프라이빗 셀러에는 빈티지 그랑 크뤼를 포함한 3,000병 규모의 와인 아카이브가 준비되어 있습니다. (예시 수치)',
    stats: {
      label1: '와인 아카이브',
      val1: '3,000+ Bottles (예시)',
      label2: '프라이빗 다이닝',
      val2: '인빌라 전속 셰프 서빙',
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANmm2AdHfG7MzSVBILnNDogKKvYYXbkGipKncMYqigj_rGsV6K5w0JOn3jYrogvMkQx-3z71ipBpO8tQA7BTWb6NbIvDss_6EYCbh6D-rDb81H_Gqu0r9QKOVoYYzLr8bKqXUUrpgG1Ku4fvYWxG_DiHfLk75akdKAhDHpdFT2C9HbLbPWa9DEkFBFxfxicn6v9-OMsePSowI_xtmKL71AuLT6xPXD6_Zh0sRleSpBDMWvoaBPbSsP',
    alt: 'Exquisite minimalist fine dining plate in luxury resort',
  },
  {
    id: 'wellness',
    tabTitle: '02. Wellness & Spa',
    category: 'Ancient Mineral Sanctuary',
    title: '천연 미네랄 온천수와 히노키 파빌리온의 리추얼',
    description: '지하 800미터 화산 암반층에서 용출되는 알칼리 천연 온천수와 티벳 명상 싱잉볼을 활용한 딥 사운드 배스. 체류 기간 동안 개인별 체질 진단을 통해 맞춤 제작된 동양 한방 아로마 테라피를 함께 준비합니다. (예시 구성)',
    stats: {
      label1: '미네랄 온천수 온도',
      val1: '41.5°C 일정 유지 (예시)',
      label2: '테라피 구성',
      val2: '사운드 배스 & 아유르베다',
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnVUHG5R-4vN9HyWxsBaYdeybyERwvdqVRzxSs6e6DK0gsrhk_BxXz3w8W6yAE6Ib2q9wLx-lc8R9JnEE_8uj4I9uDqrt3Y8IDrL1XbRa9VlTlCjaMPq6Y1XeZp0NL49i0br3LVC3ww-SyPQCVDDSA0yeYkONv-7fg8ZWbYJttIZdV-C_dWCkzIgKZ3MOpHaXz6nlBdjrAbK_V4MBlHBDyd6t65p8TaTfBzG_tk_Hio-dAngeFTU6m',
    alt: 'Minimalist private luxury spa pavilion with steaming hot spring water bath carved from natural grey granite stone',
  },
  {
    id: 'journeys',
    tabTitle: '03. Bespoke Journeys',
    category: 'Curated Discovery',
    title: '대자연의 숨겨진 비경 속으로 인도하는 프라이빗 탐험',
    description: '곶자왈 숲 수목 해설가와 함께하는 비공개 트레킹, 남해 청정 무인도 해양 고고학 스노클링, 그리고 한밤의 천문학자와 함께하는 야간 별빛 명상. 상업화되지 않은 자연 속에서 귀하를 위해 따로 여는 여정으로 구성합니다. (예시 프로그램)',
    stats: {
      label1: '가이드 자격',
      val1: '생태학 전문 가이드 (예시)',
      label2: '진행 방식',
      val2: '프라이빗 1:1 진행',
    },
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd1p1XYJqcYwhYD724vlWV93VA7VJ9EeCDzOrFEDZRi5r-h3dn_a8bOiZy30QxpEshtD_XL4BPMXTcyBIlxY3AusRY6ZudbcRC0Q4HlHy6yMS7w-ReIuMK1M1JJPMw6lrQ4SN8yJ3i-s0NZcA2gpzZtuBCCsvUkXCsU6DNPOwbVEsfg7HUTa9w7NY2VXpQYNQ6Jv1uzUeRbGxiyIBJKBCzFdYFbEJ62BoT3My1V19-0KjXRhcXEOqg',
    alt: 'An exclusive private yacht sailing into the sunset along tranquil emerald coastal cliffs',
  },
];

export const HERO_BG_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAUIvUCsJX6H1AibZsMmrS90iFdaon3IS0GbYX5yfZc6IJ-Jkic54Oo15DKvebVbb5qzTwayFujn-MTBjvzJwp4MZfY5xr_LHaQUr0V7RMB5qwR0k1LEGKOYteTldjMzcu8JIFl_wqXH-tA260pcistWUuSU2KFNpigO8_O9CQAdheF-1S0zuYawO2XwbekvP9QSnl2rRxub6_qdxFq_BSSwQuNUGIkmRMmq0Sm_d91Aw9X7lLuWvBu';
