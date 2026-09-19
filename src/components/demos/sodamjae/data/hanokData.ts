import { Project, PhilosophyItem, EngineeringFeature, RoadmapStep } from '../types';

export const LOGO_URL = '/portfolio/sodamjae/sodamjae-07.png';

export const HERO_IMAGE_URL = '/portfolio/sodamjae/sodamjae-06.jpg';

export const MASTER_BUILDER_IMAGE_URL = '/portfolio/sodamjae/sodamjae-05.jpg';

export const HERO_FEATURED_PROJECT: Project = {
  id: 'damsolheon',
  index: '2024 대표작',
  category: '살림집',
  categoryLabel: '대표 완공 주택',
  name: '가평 서종 호반 한옥주택',
  hanjaName: '담솔헌 (澹率軒)',
  location: '경기 가평군 서종면 문호리',
  year: '2024 완공',
  area: '연면적 258㎡ (78평)',
  description: '배산임수의 축을 따라 유려하게 휘어진 팔작지붕과 북한강 물안개를 품는 대청 통창, 최고 효율 지열 공조 시스템이 융합된 78평형 주거 한옥.',
  detailedStory: '북한강의 유려한 물결과 서종의 솔숲을 조망하는 대지에 지어진 담솔헌은 대청마루 전면을 대형 3중 로이 단열 통창으로 구성하여 사계절의 파노라마 차경을 집안 가득 끌어들였습니다. 강원도 태백산맥 80년생 금강송을 7년간 음지 자연 건조하여 목재의 뒤틀림을 0%에 수렴하도록 가공했으며, 독일식 패시브 기밀공법과 지열 냉난방을 채택해 겨울철 난방비 65% 절감 실증을 완료했습니다.',
  imageUrl: HERO_IMAGE_URL,
  tags: ['북한강 차경', '금강송 육송', '지열 히트펌프', '3중 로이창호', '사개맞춤'],
  specs: {
    wood: '강원도 태백산 금강송 (함수율 12%)',
    insulation: '불연 고밀도 세라믹 외단열 150mm + 기밀 테이핑',
    joinery: '전통 무금속 사개맞춤 및 주먹장 결구',
    heating: '친환경 지열 히트펌프 복사 난방 및 ERV 열회수 환기'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'suyeonjae',
    index: '01 / 04',
    category: '살림집',
    categoryLabel: '01 / 04 · 살림집',
    name: '양평 수연재',
    hanjaName: '秀然齋',
    location: '경기 양평 문호리',
    year: '2023 완공',
    area: '연면적 215㎡ (65평)',
    description: 'ㄷ자형 중정을 감싸는 누마루와 현대식 아일랜드 대형 주방을 결합한 주거형 한옥. 최고 등급 3중 창호로 단열 걱정 없는 실용적 평면.',
    detailedStory: '가족 구성원의 사생활 보호와 마당 중심의 열린 커뮤니티를 모두 만족시키는 ㄷ자형 배치. 서종천의 시원한 바람을 마당으로 유도하고, 전통 툇마루와 연결되는 입식 주방을 통해 전통 한옥의 정취와 아파트의 실용적인 동선을 완벽히 양립시켰습니다.',
    imageUrl: '/portfolio/sodamjae/sodamjae-04.jpg',
    tags: ['강원 금강송', '지열 냉난방', '사개맞춤'],
    specs: {
      wood: '강원 금강송 1등급 건조목',
      insulation: '독일식 기밀 테이프 + 3중 세라믹 단열',
      joinery: '도편수 전통 수작업 결구',
      heating: '심야전기 온돌 및 고효율 히트펌프'
    }
  },
  {
    id: 'euncheongru',
    index: '02 / 04',
    category: '도심형 한옥',
    categoryLabel: '02 / 04 · 도심형 한옥',
    name: '북촌 은청루',
    hanjaName: '隱淸樓',
    location: '서울 종로구 가회동',
    year: '2023 완공',
    area: '연면적 178㎡ (54평)',
    description: '도심 북촌 한옥마을의 전통 경관을 보존하며 지하 암반층에 현대식 와인셀러와 미디어룸을 은밀히 구축한 도시형 프라이빗 주택.',
    detailedStory: '서울 북촌 한옥 보존지구의 엄격한 건축 심의를 100% 통과하며 기존 100년 목재 고재를 정밀 해체 복원했습니다. 지상은 단아한 전통 팔작 기와지붕과 누마루의 고즈넉함을 살리고, 지하 암반 절토면에는 현대식 음향 설비를 갖춘 홈시네마 및 항온항습 와인셀러를 배치하여 도심 주거의 새로운 패러다임을 열었습니다.',
    imageUrl: '/portfolio/sodamjae/sodamjae-01.jpg',
    tags: ['육송 고재 복원', '지하 암반 복합구조', '누마루 차경'],
    specs: {
      wood: '북촌 백년 고재 복원 육송 & 북미산 더글라스 퍼',
      insulation: '내외벽 듀얼 에어로겔 기밀 단열 시스템',
      joinery: '전통 장부 맞춤 및 철골 하이브리드 기초',
      heating: '도시가스 콘덴싱 및 지하 항온항습 공조'
    }
  },
  {
    id: 'soyooheon',
    index: '03 / 04',
    category: '별서·세컨하우스',
    categoryLabel: '03 / 04 · 별서·세컨하우스',
    name: '탐라 소요헌',
    hanjaName: '逍遙軒',
    location: '제주 애월읍 신엄리',
    year: '2024 완공',
    area: '연면적 248㎡ (75평)',
    description: '제주 현무암 돌담과 강풍에 견디는 낮은 곡선 처마를 현대적으로 재해석하여 애월 바다의 낙조를 품은 힐링 휴양 별서.',
    detailedStory: '제주도의 거센 해풍과 염분에 대비해 특수 천연 옻칠 및 고내후성 스테인 마감을 적용한 별서입니다. 제주 전통 가옥의 밭담 및 안거리·밖거리 구조를 재해석하여, 바다를 조망하는 노천 편백나무 히노키탕과 자연석 바닥 마감을 통해 도심을 벗어난 완전한 쉼을 선사합니다.',
    imageUrl: '/portfolio/sodamjae/sodamjae-03.jpg',
    tags: ['해풍 내후성 특수도장', '현무암 마당', '노천 히노키탕'],
    specs: {
      wood: '고밀도 낙엽송 및 천연 편백나무',
      insulation: '염분 저항형 기밀막 + 43mm 로이 3중창',
      joinery: '내풍압 보강 전통 맞춤',
      heating: '인버터 냉난방 공조 및 복사 바닥난방'
    }
  },
  {
    id: 'solbaramjae',
    index: '04 / 04',
    category: '살림집',
    categoryLabel: '04 / 04 · 단독 살림집',
    name: '경포 솔바람재',
    hanjaName: '松風齋',
    location: '강원 강릉시 저동',
    year: '2024 완공',
    area: '연면적 198㎡ (60평)',
    description: '경포 솔숲의 향기를 가득 들이는 개방형 대청마루 통창과 툇마루를 갖추고, 현대식 드레스룸과 욕실을 전진 배치한 친환경 목조 살림집.',
    detailedStory: '경포호 인근 수백 년 소나무 숲의 피톤치드를 집안 곳곳으로 순환시키는 평면 설계. 은은한 한지 조명과 매립형 시스템 에어컨, 넉넉한 수납공간의 펜트리를 자연스럽게 빌트인하여 한옥 특유의 공간 비효율을 완벽히 해결했습니다.',
    imageUrl: '/portfolio/sodamjae/sodamjae-02.jpg',
    tags: ['강릉 솔송', '개방형 대청', '스마트 환기 ERV'],
    specs: {
      wood: '강릉 자생 솔송 및 춘양목 육송',
      insulation: '준불연 경질 우레탄 + 세라믹 사이딩 결구',
      joinery: '도편수 사개맞춤',
      heating: 'IoT 연동형 스마트 보일러'
    }
  }
];

export const PHILOSOPHIES: PhilosophyItem[] = [
  {
    number: '01',
    title: '유려한 처마선과 차경(借景)',
    description: '마당의 계절과 먼 산마루의 능선을 집 안 대청마루 통창 액자로 고스란히 끌어들이는 자연 친화적 배치를 지향합니다. 계절의 빛 각도를 계산한 처마 돌출로 여름엔 서늘하고 겨울엔 깊은 햇살을 맞이합니다.',
    subtext: '자연과 주택의 유기적 경계 허물기',
    iconName: 'landscape'
  },
  {
    number: '02',
    title: '못을 쓰지 않는 전통 맞춤(結構)',
    description: '기둥과 보, 도리가 하나로 맞물리는 전통 사개맞춤과 주먹장 결구는 쇠못 하나 없이도 수백 년 동안 수축과 이완을 함께하며 지진과 뒤틀림을 흡수하는 유연하고 견고한 내진 목구조의 정수입니다.',
    subtext: '도편수의 손끝으로 다듬는 무금속 결구미',
    iconName: 'architecture'
  },
  {
    number: '03',
    title: '현대식 고효율 주거 기능',
    description: '"한옥은 겨울에 춥다"는 해묵은 편견을 종식합니다. 한지 창살의 단아한 온기를 유지하면서도 패시브 건축 기준의 삼중 로이 기밀창호와 고밀도 세라믹 단열재를 일체화하여 아파트보다 아늑한 정주 환경을 구현합니다.',
    subtext: '열손실 없는 쾌적한 사계절 에너지 설계',
    iconName: 'thermostat'
  }
];

export const ENGINEERING_FEATURES: EngineeringFeature[] = [
  {
    number: '01',
    badge: '구조 공학',
    title: '내진 1등급 목구조',
    description: '고강도 목재 집성 기술과 전통 장부 맞춤을 연계하여 규모 7.0 지진에도 뒤틀림 없이 하중을 분산하는 과학적 프레임워크.',
    iconName: 'trees'
  },
  {
    number: '02',
    badge: '단열·기밀',
    title: '외단열 복합 시스템',
    description: '숨 쉬는 친환경 세라믹 기밀막과 불연 단열재 3중 적층으로 벽체 결로와 웃풍을 원천 차단하고 쾌적한 실내 습도를 자동 조절.',
    iconName: 'layers'
  },
  {
    number: '03',
    badge: '창호 기술',
    title: '한지 질감 3중 로이창호',
    description: '외부는 알루미늄 피복, 내부는 자연 원목과 아크릴 한지 질감 필름을 적용한 43mm 아르곤 가스 3중 시스템 창호 시공.',
    iconName: 'frame'
  },
  {
    number: '04',
    badge: '스마트 제어',
    title: '목조 특화 IoT 안전 설비',
    description: '벽체 및 천장 내부 미세 온습도·연기 감지 IoT 센서와 열회수 환기장치(ERV)가 연동되어 365일 실내 공기질과 화재 안전 보장.',
    iconName: 'cpu'
  }
];

export const ROADMAP_STEPS: RoadmapStep[] = [
  {
    step: 'STEP 01',
    title: '대지 답사 및 일조 분석',
    description: '도편수 및 건축사가 직접 현장을 방문하여 지형 레벨, 풍수지리적 바람길, 일조 궤적 및 한옥 관련 지자체 조례·건축법을 정밀 분석합니다.',
    duration: '소요 기간: 1~2주'
  },
  {
    step: 'STEP 02',
    title: '맞춤형 3D 가상 설계',
    description: '건축주 가족의 라이프스타일을 반영한 동선 설계. 마당, 대청, 입식 주방 및 가구 배치를 실물 크기의 3D 가상 모델링으로 사전 확인합니다.',
    duration: '소요 기간: 4~6주'
  },
  {
    step: 'STEP 03',
    title: '원목 엄선 및 정밀 치목',
    description: '함수율 15% 이하 건조 육송을 선별하여 소담재 전용 양평 공방에서 도편수의 지휘 아래 기둥과 보를 깎고 다듬는 수작업 치목을 완료합니다.',
    duration: '소요 기간: 8~10주'
  },
  {
    step: 'STEP 04',
    title: '상량 조립 및 단열 시공',
    description: '현장 골조 결구 상량식 진행 후, 고기밀 세라믹 단열재, 전통 건식 기와, 독일식 3중 시스템 창호 및 배관·전기 설비를 완벽 시공합니다.',
    duration: '소요 기간: 12~14주'
  },
  {
    step: 'STEP 05',
    title: '준공 및 10년 케어 보증',
    description: '건축물 준공 검사 후 입주 점검. 계절 변화에 따른 목재의 자연스러운 수축 팽창 모니터링과 천연 오일 스테인 보수를 10년간 보증합니다.',
    duration: '10년 품질 보증서 발급'
  }
];
