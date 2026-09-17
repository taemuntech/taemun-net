import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'varg-42-dome',
    sku: 'NP-V42-OLV',
    title: '바르그 4.2 지오데식 돔 텐트',
    category: 'shelter',
    subCategoryTitle: '지오데식 돔 텐트',
    categoryTag: '올리브 드랩 / 다이아몬드 구조',
    price: 1380000,
    originalPrice: 1725000,
    weightTag: '4.8kg ULTRA-DOME',
    badge: 'BEST SELLER',
    specHighlight: '압축 체적 18L',
    imageUrl:
      '/demo-media/nordic-peak/nordic-peak-04.jpg',
    imageAlt: '바르그 4.2 지오데식 돔 텐트',
    specs: [
      { label: '원단 내수압:', value: '5,000mm H₂O' },
      { label: '폴대 규격:', value: 'DAC NSL 11mm (5라인)' },
      { label: '수용 정원:', value: '4인 쾌적 (야전침대 4EA)' },
      { label: '패킹 크기:', value: '500ml 생수병 12개 체적', highlight: true },
    ],
    season: 'winter',
    capacity: '4',
    pole: 'dac',
    fabric: '70d',
    description:
      '히말라야 및 북유럽 동계 원정대의 생존을 위해 설계된 5라인 다이아몬드 지오데식 프레임워크. 눈보라의 하중을 분산시키고 영하 35℃의 돌풍 속에서도 내부의 온기와 기압을 완벽하게 수호합니다.',
  },
  {
    id: 'aegir-sil-tarp-50',
    sku: 'NP-TRP-50-KHK',
    title: '에기르 헥사 옥타 실타프 5.0',
    category: 'tarp',
    subCategoryTitle: '옥타 쉘터 시스템',
    categoryTag: '웨더드 카키 / 방폭 실타프',
    price: 420000,
    originalPrice: 480000,
    weightTag: '1.4kg FEATHER-TARP',
    badge: 'SIL/PU 차광',
    imageUrl:
      '/demo-media/nordic-peak/nordic-peak-03.jpg',
    imageAlt: '에기르 헥사 옥타 실타프 5.0',
    specs: [
      { label: '원단 내수압:', value: '4,000mm 양면 실리콘' },
      { label: '차광 기능:', value: '피그먼트 블랙 UV CUT' },
      { label: '면적 크기:', value: '500cm × 440cm' },
      { label: '중량/재질:', value: '1.4kg / 40D 코듀라', highlight: true },
    ],
    season: 'all',
    capacity: '4',
    pole: '7001',
    fabric: '40d',
    description:
      '초고강도 40D 코듀라 립스탑에 양면 실리콘 코팅을 적용하여 강풍 인장력과 완벽한 차광을 제공하는 테크니컬 헥사 옥타 윙 타프입니다.',
  },
  {
    id: 'valhalla-chair-7075',
    sku: 'NP-CHR-7075-BLK',
    title: '발할라 택티컬 하이백 체어',
    category: 'furniture',
    subCategoryTitle: '퍼니처/체어',
    categoryTag: '매트 블랙 / 항공알루미늄',
    price: 210000,
    originalPrice: 240000,
    weightTag: '1,020g ULTRA-CHAIR',
    badge: '허리 지지 인체공학',
    imageUrl:
      '/demo-media/nordic-peak/nordic-peak-05.jpg',
    imageAlt: '발할라 택티컬 하이백 체어',
    specs: [
      { label: '최대 지지하중:', value: '150 kg 공인 인증' },
      { label: '프레임 구조:', value: '듀랄루민 7075 T6' },
      { label: '시트 원단:', value: '1000D 방탄 코듀라' },
      { label: '수납 규격:', value: '42cm × 12cm 초소형', highlight: true },
    ],
    season: 'all',
    capacity: '1-2',
    pole: '7001',
    fabric: '40d',
    description:
      '항공기 소재 듀랄루민 7075 T6 프레임과 1000D 방탄 코듀라로 마감되어 150kg 하중을 흔들림 없이 지탱하는 극한 캠핑 체어입니다.',
  },
  {
    id: 'midgard-titanium-1200',
    sku: 'NP-CK-1200-TI',
    title: '미드가르드 티타늄 1,200ml 콤보',
    category: 'cookware',
    subCategoryTitle: '쿡웨어/스토브',
    categoryTag: '순수 티타늄 1호 / 내열 800℃',
    price: 168000,
    originalPrice: 195000,
    weightTag: '230g GRADE-1 TITANIUM',
    badge: '초경량 순수 티타늄',
    imageUrl:
      '/demo-media/nordic-peak/nordic-peak-01.jpg',
    imageAlt: '미드가르드 티타늄 1,200ml 콤보',
    specs: [
      { label: '소재 등급:', value: 'Grade 1 순수 티타늄' },
      { label: '용량/규격:', value: '1,200ml + 전용 리드' },
      { label: '전체 중량:', value: '단 230g (포트+버너)' },
      { label: '수납 특성:', value: '이소가스 230g 완벽 네스팅', highlight: true },
    ],
    season: 'all',
    capacity: '1-2',
    pole: 'dac',
    fabric: '70d',
    description:
      '우주항공 등급 Grade 1 순수 티타늄으로 제작되어 부식 없이 영구적인 내구성을 자랑하며 230g 초경량으로 극한 원정의 무게를 덜어줍니다.',
  },
];

export const BRAND_LOGO_URL =
  '/demo-media/nordic-peak/nordic-peak-06.png';

export const HERO_BG_IMAGE =
  '/demo-media/nordic-peak/nordic-peak-02.jpg';
