import { StrategyPillar, PortfolioItem, LeaderProfile } from '../types';

export const CREST_LOGO_URL = '/demo-media/apex-partners/apex-partners-02.png';

export const BOARDROOM_IMG_URL = '/demo-media/apex-partners/apex-partners-01.jpg';

export const STRATEGY_PILLARS: StrategyPillar[] = [
  {
    id: 'buyout',
    pillarNumber: 'PILLAR 01',
    tag: '플래그십 바이아웃 (Buyout)',
    title: '경영권 인수 및 밸류업 프로그램 (Flagship Buyout)',
    thesis: '대한민국 및 아시아에서 확고한 시장 지위를 가진 중견 제조, 첨단 헬스케어 강소기업의 경영권을 100% 또는 과반 인수합니다. 이후 전담 오퍼레이션 파트너가 상주하여 디지털 트랜스포메이션, 글로벌 공급망 다변화, 볼트온(Bolt-on) M&A를 실행해 기업가치 개선을 목표로 하는 설정입니다.',
    ticket: '₩1,000억 ~ ₩2,500억 원 (예시 · 단독 또는 컨소시엄)',
    targetIrr: '22% ~ 28% 목표 Net IRR (예시)',
    moic: '3.2x ~ 4.0x',
    levers: [
      '원가 구조 혁신 & ERP 현대화',
      '해외 크로스보더 판로 개척',
      'EBITDA 마진 개선 프로그램',
      '전략적 해외 기업으로의 M&A 매각'
    ]
  },
  {
    id: 'deeptech',
    pillarNumber: 'PILLAR 02',
    tag: '딥테크 그로쓰 (Tech Growth)',
    title: '피지컬 AI & 초격차 딥테크 (Tech Growth Equity)',
    thesis: '글로벌 상용화 전환점에 도달한 원천기술(차세대 HBM 인터포저, 자율주행 AMR 로보틱스, 우주항공 광학)을 보유한 스케일업 유니콘에 집중 투자합니다. 기술적 실사(Due Diligence)는 박사급 테크 파트너가 직접 주도하며 글로벌 테크 빅테크와의 납품 파트너십을 연결합니다.',
    ticket: '₩300억 ~ ₩800억 원 (예시 · Series B/C/Pre-IPO 리드)',
    targetIrr: '26% ~ 35% 목표 Net IRR (예시)',
    moic: '3.5x ~ 5.0x',
    levers: [
      '미국/EU 글로벌 특허 포트폴리오 구축',
      '글로벌 공급망 벤더 등록 지원',
      '국내·해외 증시 동시 상장 지원',
      '전략적 코인베스트먼트(Co-Investment) 매칭'
    ]
  },
  {
    id: 'infra',
    pillarNumber: 'PILLAR 03',
    tag: '크로스보더 인프라 (Infra & ESG)',
    title: '크로스보더 인프라 & ESG 에너지 (Cross-Border Infra)',
    thesis: '하이퍼스케일 AI 데이터센터 전력망, 신재생 에너지 변전소, 청정수소 공급망 등 장기 현금흐름이 기대되는 핵심 기반시설 자산에 투자하는 설정입니다. 장기 PPA 계약 및 물가연동 인덱스를 통해 하방 변동성을 줄이는 구조를 설계합니다.',
    ticket: '₩800억 ~ ₩2,000억 원 (예시)',
    targetIrr: '14% ~ 18% 목표 Net IRR (연 배당 8% 내외 가정 · 예시)',
    moic: '2.0x ~ 2.5x',
    levers: [
      '물가연동 장기 오프테이크(PPA) 계약',
      '친환경 분류체계 대응 및 ESG 등급 관리',
      '정기 분기 배당 현금흐름 창출',
      '인프라 국부펀드 앞 블록세일 매각'
    ]
  },
  {
    id: 'credit',
    pillarNumber: 'PILLAR 04',
    tag: '스페셜 시츄에이션 (Private Credit)',
    title: '스페셜 시츄에이션 & 사모 대출 (Private Credit)',
    thesis: '기업의 일시적 유동성 경색, 지배구조 개편, 메자닌 전환사채(CB/BW) 및 우량 담보부 사모대출에 투자하여 시장 변동성의 영향을 줄인 계약 기반 수익을 추구하는 설정입니다. 담보인정비율(LTV 40% 이하)을 기준으로 원금 보존 가능성을 높이는 구조를 지향합니다.',
    ticket: '₩500억 ~ ₩1,500억 원 (예시)',
    targetIrr: '12% ~ 16% 목표 수익률 (예시 · 확정 수익 아님)',
    moic: '1.6x ~ 2.0x',
    levers: [
      '1순위 부동산 및 핵심 지분 질권 설정',
      '다운사이드 프로텍션 풋옵션 확보',
      '유동성 위기 완화 후 조기 상환 트리거',
      '전환권 행사를 통한 알파(Alpha) 향유'
    ]
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'hyperscale-ai',
    title: '하이퍼스케일 AI 인터포저',
    subtitle: '2.5D/3D 첨단 패키징 실리콘 브릿지 소재 독점',
    description: '글로벌 톱티어 파운드리 및 AI 가속기 빅테크에 초정밀 기판용 실리콘 인터포저 양산 공급권 확보.',
    badge: '액티브 유니콘',
    badgeVariant: 'gold',
    growthMetric: '매출성장 +420% (예시)',
    growthType: 'metric',
    dealStage: 'Series C Lead',
    categories: ['unicorn', 'deeptech'],
    ticketSize: 'Series C 리드 (₩750억)',
    targetMoic: '4.6x',
    esgRating: 'AA+ (Low-Emission Operations)',
    fullThesis: '국내·해외 증시 동시 상장 준비 단계, 첨단 패키징 소재 장기 공급 계약 체결 (예시 설정).'
  },
  {
    id: 'cryobio',
    title: '초저온 의약품 스마트 콜드체인',
    subtitle: '글로벌 mRNA/ADC 바이오 의약품 전용 스마트 인프라',
    description: '운영 효율화 및 자동화 시스템 도입을 통한 볼트온 전략 수행, 글로벌 제약사 장기 독점 공급계약 체결.',
    badge: '바이아웃 턴어라운드',
    badgeVariant: 'slate',
    growthMetric: 'EBITDA +180% (예시)',
    growthType: 'metric',
    dealStage: 'Buyout 100% Control',
    categories: ['unicorn', 'healthcare'],
    ticketSize: '경영권 바이아웃 (₩1,200억)',
    targetMoic: '3.8x',
    esgRating: 'AAA (ESG Governance Excellence)',
    fullThesis: '글로벌 mRNA 및 ADC 바이오의약품 전용 항온 물류망 구축, 볼트온 2건 완료 (예시 설정).'
  },
  {
    id: 'solidstate-battery',
    title: '차세대 전고체 배터리 소재',
    subtitle: '황화물계 고체전해질 대량 합성 공정 독점',
    description: '기존 액체 전해질 대비 발화 위험을 낮추고 에너지 밀도를 높인 설계. 글로벌 완성차사 Tier-1 납품 진행 (예시 설정).',
    badge: '전략적 공동투자',
    badgeVariant: 'gold',
    growthMetric: '글로벌 특허 34건 (예시)',
    growthType: 'metric',
    dealStage: 'Growth Equity Round',
    categories: ['unicorn', 'deeptech'],
    ticketSize: 'Strategic Co-Investment (₩600억)',
    targetMoic: '3.2x',
    esgRating: 'A+ (Clean Energy Frontier)',
    fullThesis: '미국·유럽 핵심 특허 34건 등록, 글로벌 완성차 Tier-1 전용 파일럿 라인 가동 (예시 수치).'
  },
  {
    id: 'aerooptic',
    title: '위성통신 광학 레이더 시스템',
    subtitle: '초소형 SAR 위성 탑재체 및 국방 통신 솔루션',
    description: '군 통신망 및 상용 지구관측 위성에 탑재되는 광학 레이더 원천기술 상용화 후 국내 증시 상장으로 회수 (예시 설정).',
    badge: 'IPO 성공 엑싯',
    badgeVariant: 'emerald',
    growthMetric: 'MoIC 4.8x 달성',
    growthType: 'exit',
    dealStage: 'DPI Distribution Complete',
    categories: ['exit', 'deeptech'],
    ticketSize: '초기 Series A 리드 후 IPO 회수',
    targetMoic: '4.8x MoIC 달성',
    esgRating: 'AA (Institutional Compliance)',
    fullThesis: '국내 증시 공모 청약 완료 후 보유 지분 전량 분배 (예시 설정).'
  },
  {
    id: 'omnifin',
    title: '클라우드 ERP 핀테크 플랫폼',
    subtitle: '중견·대기업 연동 재무제표 실시간 감사 엔진',
    description: '국내 중견·대기업 도입 확대 후 해외 사모펀드에 보유 지분 전량 매각 (예시 설정).',
    badge: '세컨더리 엑싯',
    badgeVariant: 'emerald',
    growthMetric: 'MoIC 3.6x 달성',
    growthType: 'exit',
    dealStage: 'M&A Secondary Exit',
    categories: ['exit'],
    ticketSize: '성장 단계 지분 매입',
    targetMoic: '3.6x MoIC 달성',
    esgRating: 'A (Standard Cloud Security)',
    fullThesis: '글로벌 사모펀드(PEF)로의 2차 구주 매각을 통해 신속한 유동성 창출.'
  },
  {
    id: 'omnibotics',
    title: '초정밀 로보틱스 모빌리티',
    subtitle: '클린룸 전용 자율주행 무인 운송 로봇 (AMR)',
    description: '밀리미터급 오차 정밀 제어 LiDAR 내재화로 북미 및 유럽 기가팩토리 공급사 등록 (예시 설정).',
    badge: 'Pre-IPO 라운드',
    badgeVariant: 'gold',
    growthMetric: '글로벌 공급 확대 (예시)',
    growthType: 'metric',
    dealStage: 'Pre-IPO 2025 Mandate',
    categories: ['unicorn', 'deeptech'],
    ticketSize: 'Pre-IPO 라운드 리드 (₩500억)',
    targetMoic: '2.9x (Unrealized)',
    esgRating: 'AAA (Safety-First Automation)',
    fullThesis: '반도체·배터리 클린룸 무인 운반 로봇 글로벌 납품 확대 (예시 설정).'
  }
];

export const LEADERS: LeaderProfile[] = [
  {
    name: '권진우 대표 파트너',
    title: 'Managing Partner & Chairman',
    bio: '전 글로벌 투자은행 아시아 M&A 총괄 전무(예시 약력). 경제학 학사 및 해외 MBA. 25년 이상 아시아 크로스보더 딜 및 경영권 방어 자문 주도.',
    credentialBadge: 'Seoul Investment Committee Chair',
    iconType: 'bank'
  },
  {
    name: 'Marcus von Stein',
    title: 'Senior Partner · European LP',
    bio: '전 스위스 대형 프라이빗 뱅크 초고액자산가(UHNW) 총괄(예시 약력). 유럽 공과대학 및 영국 대학원 금융학 석사. 유럽 패밀리오피스 신탁 자산 결성.',
    credentialBadge: 'Zurich & London Desk Head',
    iconType: 'shield'
  },
  {
    name: '엘레나 강 파트너',
    title: 'Partner · Deep-Tech Buyout',
    bio: '해외 공과대학 재료공학 박사(예시 약력). 전 글로벌 종합 반도체 기업 사외이사 및 기술투자 총괄. AI 가속기 및 차세대 반도체 공정 특허 12건 보유.',
    credentialBadge: 'Tech Due Diligence Director',
    iconType: 'chip'
  },
  {
    name: '최승원 수석 고문',
    title: 'Senior Macro & Policy Advisor',
    bio: '전 금융 규제기관 자문위원 및 중앙은행 금융안정 부문 자문역(예시 약력). 거시경제 규제 정책 검토 및 컴플라이언스 가이드라인 제공.',
    credentialBadge: 'Regulatory Compliance Advisor',
    iconType: 'policy'
  }
];
