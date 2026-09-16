import {
  NavItem,
  VideoItem,
  BusinessDivision,
  EsgPillar,
  StockData,
  IrHubItem,
  NewsItem,
  FamilySite,
} from './types';

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1VVc68zDenv9A5zgOxL0pfm3Z1lLkpoTqdxb3nUlvQKIGR1a8wtblKnpMDE0sInjJ74X5yU45QFjVUDlfsnJm1-A_307UmDcWHrKbLkNCKgffWsfeNDaBuXhQAup_Tq0cA58FMH5n1iqFbwOOb4KjwvakWe_1pAflCaKDqJP5MfblJDUFr5pRbahIuyQitKjmGQXZDWAK0XmPIuOOkMgOWVtHONLm1jP9ZGU1jbMTU9fv3USsOD0pELhHw';

export const NAV_ITEMS: NavItem[] = [
  { label: '회사소개', href: '#company' },
  { label: '사업소개', href: '#business', isActive: true },
  { label: 'ESG', href: '#esg' },
  { label: '투자정보', href: '#ir' },
  { label: '미디어룸', href: '#media' },
  { label: '인재채용', href: '#recruit' },
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'anniversary-40',
    title: '원익큐앤씨 40주년 기념 홍보 영상 (40th Anniversary Film)',
    duration: '04:12',
    durationSeconds: 252,
    category: 'SPECIAL FILM',
    badge: '40th ANNIVERSARY SPECIAL FILM',
    isUhd: true,
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgg1CFsX4Rlv7v8iswdosWchI-qMhyrD7vwnGmzOaR6P-3sCJD0XKtk3YCJebSRHSgrWQfTr1SQN79YTb7LobEF40hJaWrjcIyvbZyuxBi30x9cCYDsUv2XQsfpBCr_QHZ5qK1L1koYU4K9vg0r_8xrlGh9lhAfNHaUpRpM5KhGQ8Rfl3EBfuB-BbnFEs5Y1dunYaSmlNz5v4jkAwBK8m09fzboo4jrX0KCGkod1YWjeDPjqdaShEl',
    description:
      '1984년 창립 이래 반도체 쿼츠웨어 국산화의 신화를 쓰고 글로벌 1위에 오르기까지, 원익큐앤씨가 고객과 함께 걸어온 40년의 열정과 혁신 기술을 생생하게 담아냈습니다.',
    chapterText: '초기 국산화 도전기 · 글로벌 M&A 도약 · 차세대 나노 소재 연구',
  },
  {
    id: 'brand-film',
    title: '원익큐앤씨 기업 홍보 영상',
    duration: '03:30',
    durationSeconds: 210,
    category: 'BRAND FILM',
    badge: 'BRAND FILM',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJHbg9b6BVQkMomNNffDnJrgOcb8gA6inOIjAeP4TX9CzQ2SkiessDf25b5XMcqkUQFuUQBDGM8YAUvxeiy0onbZLDu1k4nuvyv1Tgs756Winj37GPWys_NLf7iDtn4hhwHTnXWPttIBbCE8Qs5QMVnCgO2Vm-eEcjZZ7zpzKORXTNIeqE3HQDOnVpc-3VDtgWTgZvesmbpfgED96MPHxSZuYWQTHoIvzJ9aKhsk6F-NMUDv_xEvea',
    description:
      '최첨단 반도체 패브리케이션에 공급되는 초고순도 쿼츠웨어 제조 라인, 정밀 세라믹 소결 공정, 첨단 세정 시스템의 실제 구동 화면을 소개합니다.',
    chapterText: '쿼츠 · 세라믹 · 세정 · 옵틱',
  },
  {
    id: 'clip-quartz-robotics',
    title: '세계 최고 쿼츠 가공 로보틱스',
    duration: '01:15',
    durationSeconds: 75,
    category: 'HIGHLIGHT CLIP',
    badge: 'ROBOTICS AUTOMATION',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJHbg9b6BVQkMomNNffDnJrgOcb8gA6inOIjAeP4TX9CzQ2SkiessDf25b5XMcqkUQFuUQBDGM8YAUvxeiy0onbZLDu1k4nuvyv1Tgs756Winj37GPWys_NLf7iDtn4hhwHTnXWPttIBbCE8Qs5QMVnCgO2Vm-eEcjZZ7zpzKORXTNIeqE3HQDOnVpc-3VDtgWTgZvesmbpfgED96MPHxSZuYWQTHoIvzJ9aKhsk6F-NMUDv_xEvea',
    description:
      '초정밀 레이저 측정 및 6축 다관절 로봇 자동 열가공으로 웨이퍼 치수 공차 오차 0.01mm 미만을 구현하는 최첨단 설비 클립입니다.',
    chapterText: '자동 열가공 · 비전 치수 검사 · 클린룸 패키징',
  },
  {
    id: 'clip-ceramics-test',
    title: '차세대 SiC/세라믹 내식성 테스트',
    duration: '00:54',
    durationSeconds: 54,
    category: 'HIGHLIGHT CLIP',
    badge: 'ADVANCED R&D',
    posterUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2YGxUeBmw52ZsaHgLeK7qjJ05HKC4VSDKBwYE1VpWvb9N1iNoHeRec_YvBLTlq4RDU3QE5dhV3tJ0_gQEZ8CjUMagQC13Ovy23LudeB5ALwK09ftzkBkORaMq8GLF1xonLVJEevq_2XkVAgjuMpn4KmvxGglxjRAZPKwi9OErsU74M8_TLirReziFzZXCqYfeza_-aMtIgMgg8cc7xLt2eqFjQC7j__HlspxlapgAIHezJl1D__WC',
    description:
      '불소/염소계 플라즈마 식각 분위기에서 고순도 SiC 및 알루미나 세라믹의 내구성과 내식성을 비교 검증하는 실험 영상입니다.',
    chapterText: '플라즈마 노출 시편 분석 · 내마모성 측정',
  },
];

export const BUSINESS_DIVISIONS: BusinessDivision[] = [
  {
    id: 'quartz',
    divisionNumber: 'DIVISION 01',
    title: '쿼츠 (Quartz)',
    subtitle: '반도체 공정 핵심 소재 쿼츠웨어',
    tag: 'GLOBAL NO.1',
    tagColor: 'bg-[#0052cc]',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJHbg9b6BVQkMomNNffDnJrgOcb8gA6inOIjAeP4TX9CzQ2SkiessDf25b5XMcqkUQFuUQBDGM8YAUvxeiy0onbZLDu1k4nuvyv1Tgs756Winj37GPWys_NLf7iDtn4hhwHTnXWPttIBbCE8Qs5QMVnCgO2Vm-eEcjZZ7zpzKORXTNIeqE3HQDOnVpc-3VDtgWTgZvesmbpfgED96MPHxSZuYWQTHoIvzJ9aKhsk6F-NMUDv_xEvea',
    description:
      '세계적인 기술력으로 반도체 웨이퍼 식각, 확산 공정에 필수적인 고순도 Quartz Ware를 제조하는 글로벌 리딩 브랜드입니다.',
    subCategory: 'Diffusion / Etch Tube',
    highlights: [
      '글로벌 쿼츠웨어 시장 점유율 1위',
      '초고순도 천연/합성 쿼츠 정밀 용접 및 열가공',
      '300mm / 차세대 파운드리 & 메모리 라인 양산 공급',
    ],
  },
  {
    id: 'ceramics',
    divisionNumber: 'DIVISION 02',
    title: '세라믹 (Ceramics)',
    subtitle: '고온·고내식 파인 세라믹 솔루션',
    tag: 'PRECISION SINTERING',
    tagColor: 'bg-[#006187]',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2YGxUeBmw52ZsaHgLeK7qjJ05HKC4VSDKBwYE1VpWvb9N1iNoHeRec_YvBLTlq4RDU3QE5dhV3tJ0_gQEZ8CjUMagQC13Ovy23LudeB5ALwK09ftzkBkORaMq8GLF1xonLVJEevq_2XkVAgjuMpn4KmvxGglxjRAZPKwi9OErsU74M8_TLirReziFzZXCqYfeza_-aMtIgMgg8cc7xLt2eqFjQC7j__HlspxlapgAIHezJl1D__WC',
    description:
      '축적된 가공 및 소결 기술로 초고온·고내식성 환경을 견디는 첨단 파인 세라믹 소재를 공급하여 공정 안정성을 확보합니다.',
    subCategory: 'Al2O3 / SiC Ring',
    highlights: [
      'SiC (실리콘 카바이드) 포커스 링 초정밀 연마',
      '초고온 내식 알루미나(Al2O3) 복합 소결체 제조',
      '플라즈마 식각 챔버 내구성 극대화',
    ],
  },
  {
    id: 'cleaning',
    divisionNumber: 'DIVISION 03',
    title: '세정 & 코팅 (Cleaning)',
    subtitle: '초정밀 파티클 제어 및 수명 연장',
    tag: 'SUB-MICRON CLEANING',
    tagColor: 'bg-[#515f78]',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAehzPsRm2xbeaT38aotXRbCvzR8WfuWk63r6Z78436R6Wio8-AcqmmbYvIMwQAkzcDA-feO-ICWPKfNc5Kg9FDD5zRSeu7_h3lZzRnj7UrNxrYIBbqmlWTn7lbpos3d6bKK93N8UdGdjNxqFzxWEYgzx_i4EyTOZ05rCe-VYruQiq0wNU3GcrJpFrLmDFujBF5hv3GsHoHf6TATAv1EXaKO-dz3GltRr8pR_jJdq6vQdFiVvJ3Ae2',
    description:
      '반도체, 디스플레이 핵심 장비 부품의 초정밀 오염물질 제거 및 나노 표면 코팅 기술로 부품 수명을 획기적으로 연장합니다.',
    subCategory: 'Plasma Spray Coating',
    highlights: [
      '초정밀 화학/물리 복합 세정 및 서브마이크론 파티클 제거',
      '고밀도 플라즈마 스프레이 내플라즈마 코팅(Y2O3)',
      '고객사 챔버 부품 재생 수명 최대 300% 연장',
    ],
  },
  {
    id: 'optics',
    divisionNumber: 'DIVISION 04',
    title: '옵틱 (Optics)',
    subtitle: '첨단 VUV 엑시머 광원 솔루션',
    tag: 'UV & EXCIMER',
    isSpecialOptics: true,
    wavelength: '172nm',
    description:
      '반도체 및 차세대 디스플레이 표면 개질 및 친환경 건식 세정을 위한 첨단 엑시머 램프(Excimer Lamp) 광원 기술을 개발합니다.',
    subCategory: 'Excimer VUV System',
    highlights: [
      '172nm 진공 자외선(VUV) 단파장 고출력 조사 기술',
      '유기 오염물질 친환경 건식 분해 제거',
      '초미세 회로 패턴 형성 전 친수성 표면 개질',
    ],
  },
];

export const ESG_PILLARS: EsgPillar[] = [
  {
    number: '01',
    name: 'With',
    title: '환경경영 (Environment)',
    description:
      '친환경 공정 전환, 폐쿼츠 리사이클링 시스템, 온실가스 배출 저감 및 탄소중립 로드맵을 체계적으로 이행합니다.',
    badge: 'Scope 1 & 2 절감 목표 100% 관리',
    iconName: 'eco',
  },
  {
    number: '02',
    name: 'Worth',
    title: '사회적 책임 (Respect)',
    description:
      '안전보건 경영시스템(ISO 45001) 구축, 임직원 인권 존중, 일·생활 균형 우수 기업 인증을 획득하였습니다.',
    badge: '2025 일·생활 균형 우수 기업 인증',
    iconName: 'diversity',
  },
  {
    number: '03',
    name: 'Will',
    title: '투명 지배구조 (Governance)',
    description:
      '이사회 중심의 투명한 의사결정, 윤리경영 사이버 신문고 상시 운영, 주주 권익 보호 원칙을 준수합니다.',
    badge: '독립 감사위원회 및 공정거래 준수',
    iconName: 'gavel',
  },
  {
    number: '04',
    name: 'Wave',
    title: '상생 협력 (Social Wave)',
    description:
      '협력사 동반성장 펀드 운영, 정밀 소재 가공 기술 전수 및 지역사회 공헌 활동을 전개합니다.',
    badge: '동반성장 상생 펀드 및 SRM 포털',
    iconName: 'handshake',
  },
];

export const INITIAL_STOCK: StockData = {
  code: '074600',
  name: '원익큐앤씨',
  englishName: 'WONIK QnC Corp.',
  price: 26500,
  change: 900,
  changeRate: 3.52,
  prevClose: 25600,
  marketCap: '6,980 억원',
  foreignOwnership: '18.42%',
  timestamp: '2026.09.15 KST',
};

export const IR_HUB_ITEMS: IrHubItem[] = [
  {
    id: 'financial',
    title: '요약 재무제표',
    description: '손익계산서, 재무상태표 및 외부감사인 보고서',
    iconType: 'balance',
    detail: '최근 3개년 매출액 연평균 15.4% 성장, 영업이익률 및 EBITDA 추이 확인',
  },
  {
    id: 'disclosure',
    title: '경영 공시 자료실',
    description: '전자공시(DART) 연동 및 정기 주주총회 소집 결과',
    iconType: 'document',
    detail: '정기 주총 안건 승인 및 분기 사업보고서, 주요경영사항 공시 내역',
  },
  {
    id: 'presentation',
    title: 'IR 프레젠테이션 북',
    description: '2025 분기별 경영 실적 발표 자료 (PDF)',
    iconType: 'download',
    detail: '반도체 업황 사이클 전망 및 신규 팹 진입 쿼츠/세라믹 매출 가이던스',
  },
  {
    id: 'inquiry',
    title: 'IR Q&A 및 문의',
    description: '기관투자자 미팅 신청 및 주주 전용 상담 채널',
    iconType: 'support',
    detail: '기업설명회 1:1 컨퍼런스콜 예약 및 IR 담당자 직통 문의 접수',
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 726,
    category: '사회공헌',
    categoryType: 'community',
    date: '2025. 12. 01',
    title: '원익큐앤씨, 2025 연말 따뜻한 지역사회 만들기 실천',
    summary:
      '구미 지역 취약계층 가구를 대상으로 한 임직원 동절기 난방 및 물품 나눔 봉사활동 진행',
    readTime: '2분 소요',
  },
  {
    id: 725,
    category: '인증성과',
    categoryType: 'certification',
    date: '2025. 11. 27',
    title: '원익큐앤씨, 2025 일·생활 균형 우수 기업 선정',
    summary:
      '유연근무제 정착 및 모성보호 프로그램의 선도적 도입으로 고용노동부 우수 기업 현판 수여',
    readTime: '3분 소요',
  },
  {
    id: 724,
    category: '기술세미나',
    categoryType: 'tech',
    date: '2025. 10. 21',
    title: '원익큐앤씨, 산업 트렌드 특강 (스마트팩토리와 AI 미래 조망)',
    summary:
      '글로벌 반도체 공정 자동화와 인공지능 기반 품질 검사 시스템 혁신 전략 논의',
    readTime: '4분 소요',
  },
];

export const FAMILY_SITES: FamilySite[] = [
  { name: '원익 홈페이지', url: 'https://www.wonik.com' },
  { name: '원익IPS', url: 'https://www.ips.co.kr/ko/' },
  { name: '원익홀딩스', url: 'https://www.wonikholdings.kr/' },
  { name: '원익머트리얼즈', url: 'https://www.wimco.co.kr/' },
  { name: '모멘티브 테크놀로지스', url: 'https://www.momentivetech.com/' },
  { name: 'TLi', url: 'https://www.tli.co.kr/' },
  { name: '원익PNE', url: 'https://www.wonikpne.com/kr/index.php' },
  { name: '원익로보틱스', url: 'https://wonikrobotics.com/index.php' },
];
