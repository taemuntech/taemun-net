export type PortfolioCategory =
  | 'all'
  | 'interior'
  | 'manufacturing'
  | 'saas'
  | 'platform'
  | 'corporate'
  | 'commerce';

export interface PortfolioCategoryMeta {
  key: PortfolioCategory;
  label: string;
  count: number;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  thumbnailUrl: string;
  mockupType: 'desktop' | 'mobile' | 'responsive';
  liveDemoUrl?: string;
  externalUrl?: string;
  techStack: string[];
  period: string;
  highlights: string[];
  featured: boolean;
  accentColor: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategoryMeta[] = [
  { key: 'all', label: '전체보기', count: 4 },
  { key: 'interior', label: '건축·인테리어', count: 1 },
  { key: 'manufacturing', label: '제조·소재공정', count: 1 },
  { key: 'saas', label: 'SaaS 솔루션', count: 1 },
  { key: 'platform', label: 'B2B 플랫폼', count: 1 },
  { key: 'commerce', label: '쇼핑몰·커머스', count: 0 },
  { key: 'corporate', label: '기업 랜딩', count: 0 },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'atelier-vaucluse',
    slug: 'atelier-vaucluse',
    title: '아뜰리에 보클루즈 (ATELIER VAUCLUSE)',
    client: '건축·인테리어 업종 특화 레퍼런스 데모',
    category: 'interior',
    categoryLabel: '건축 & 인테리어',
    summary: '고급 주거·상업공간 하이엔드 건축 인테리어 스튜디오 웹사이트',
    description:
      '미니멀 세리프 타이포그래피와 샌드·오트밀 웜톤의 건축적 감성을 극대화한 브랜드 웹사이트입니다. 공간 철학 3대 축 소개, 반응형 프로젝트 아카이브 및 필터링, 1:1 프라이빗 공간 컨설팅 예약 위저드 시스템을 완벽하게 탑재했습니다.',
    thumbnailUrl: '/images/mockup_vaucluse.jpg',
    mockupType: 'responsive',
    liveDemoUrl: '/demo/atelier-vaucluse',
    techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Responsive UI', 'Modal Booking'],
    period: '2주 내외',
    highlights: [
      '공간 철학 및 4단계 건축 프로세스 인터랙션',
      '고해상도 건축 프로젝트 갤러리 & 동적 필터',
      '프라이빗 1:1 고객 상담 예약 위저드',
      '천연 트래버틴/오크 등 마감재 디지털 라이브러리',
    ],
    featured: true,
    accentColor: '#D97706',
  },
  {
    id: 'lithium-foil',
    slug: 'lithium-foil',
    title: '리튬박 공정 데이터 모니터링 플랫폼',
    client: '2차전지 배터리 소재 / 제조공정 특화 데모',
    category: 'manufacturing',
    categoryLabel: '제조 & 공정데이터',
    summary: '현장 롤 일지 입력 시 수율·관리도·로트 계보가 즉시 갱신되는 스마트 제조 플랫폼',
    description:
      '제조 현장의 수기 엑셀 장부를 웹 기반 실시간 엔터프라이즈 모니터링 시스템으로 전환한 프로젝트입니다. 7대 불순물 ICP 통계 관리도(SPC), 12주 수율 워터폴 분석, 잉곳부터 슬리팅까지 완벽한 로트 계보(Traceability) 역추적 엔진을 갖추고 있습니다.',
    thumbnailUrl: '/demo-media/lithium-foil/lithium-foil-01.png',
    mockupType: 'desktop',
    liveDemoUrl: '/demo/lithium-foil',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Custom SPC Charts'],
    period: '3주 내외',
    highlights: [
      '12주 시뮬레이션 데이터 기반 실시간 통계 관리도 (Control Chart)',
      '슬리팅 현장 롤 일지 입력 즉시 전역 데이터 실시간 갱신',
      '잉곳-원료-슬리팅 4단계 로트(Lot) 계보 완벽 역추적',
      '불량 패턴 자동 감지 및 공정 개선 제안 알고리즘',
    ],
    featured: true,
    accentColor: '#10B981',
  },
  {
    id: 'tdocs',
    slug: 'tdocs',
    title: 'T-DOCS (티독스)',
    client: '주식회사 태문 직영 SaaS',
    category: 'saas',
    categoryLabel: '스마트 전자서명 SaaS',
    summary: '300여 종 산업 서식 및 전자서명법에 근거한 카카오톡 모바일 전자서명 플랫폼',
    description:
      '건축, 인테리어, 부동산, 일반 기업 실무에 필수적인 300여 종의 전문 서식을 웹 에디터로 실시간 작성하고, 카카오 알림톡으로 전송하여 1분 만에 전자서명을 체결하는 올인원 스마트 도큐먼트 플랫폼입니다.',
    thumbnailUrl: '/images/mockup_tdocs.jpg',
    mockupType: 'responsive',
    externalUrl: 'https://tdocs.kr',
    techStack: ['Next.js', 'React', 'Supabase', 'PortOne V2', 'SOLAPI Alimtalk', 'Vector PDF'],
    period: '12주',
    highlights: [
      '300여 종 전문 서식 반응형 지면 프리뷰 에디터',
      '카카오톡 원클릭 전자서명 및 감사추적 증명서 발급',
      'PDF 벡터 엔진 기반 타임스탬프 위변조 방지',
      '정기 구독 빌링 및 포인트 복합 결제 시스템',
    ],
    featured: true,
    accentColor: '#8B5CF6',
  },
  {
    id: 'taemun-bridge',
    slug: 'taemun-bridge',
    title: '태문브릿지 (Taemun Bridge)',
    client: '주식회사 태문 직영 플랫폼',
    category: 'platform',
    categoryLabel: 'B2B 매칭 & 결제 플랫폼',
    summary: '산업 전문가 매칭 및 안심 직거래 단계별 정산 풀스택 플랫폼',
    description:
      '건축, 인테리어, 설비 산업의 의뢰인과 전문 시공팀을 연결하는 엔터프라이즈 B2B2C 플랫폼입니다. 7단계 견적 라이프사이클 관리, PASS 본인인증, 안전한 단계별 기성 정산 체계을 통해 거래 투명성을 보장합니다.',
    thumbnailUrl: '/images/mockup_taemun_bridge.jpg',
    mockupType: 'desktop',
    externalUrl: 'https://taemun.co.kr',
    techStack: ['Next.js', 'Supabase RLS', 'PortOne PASS', 'Tailwind CSS', 'Admin CMS'],
    period: '16주',
    highlights: [
      '7단계 견적-계약-검수-정산 라이프사이클 엔진',
      'PASS 본인인증 및 안전한 기성 정산 모듈',
      '전문가 프로필 및 실적 포트폴리오 관리 시스템',
      '실시간 견적 상태 변경 카카오 알림톡 자동 통보',
    ],
    featured: true,
    accentColor: '#3B82F6',
  },
];
