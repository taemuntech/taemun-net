import { StrategyPillar, PortfolioItem, LeaderProfile } from '../types';

export const CREST_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VBUUQPXxLIpEYWHCpwmJno0nZU0hgHZy6vd8aoS8xDobgiS6cOhr73eIi4qoGI3pq3Z6DKTyIM2ooXjxepVgux0IVdJWYholTa-iegdc8z1BIXaektwFfkzr73TAtzf05lUbOKMAP1JsDK0iHdDkEfGk9FQoxwzYBkpvSf4D1wc2oUhtxHOQnmmI2C5RnRiWVk23zBNCielhmsjd3Wsbhk00wNlNkhbgWnImNov6A3KJqIkvpb-G0fJzA';

export const BOARDROOM_IMG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe68hJkQbw3iNmUtaebjkqXeO060iE8Wo98SB-sxwQT03Q_rb8tTYuhBDmAsUkFL2feqfv13g7HliVuFDY_kR5rmZj6nJ34Mxf-2zs5vNUXQBwICKmSoR0OP8jzTrhmEvqg-XVSPx5nS0RZ2TK0_04ie3Cu9w0iA_53haUrDJI6Z0LPhu3EZWOn-IuGLIXBImWSV-CFBvl-I8rbDE2HWoWORpAugUSA6m6ewU52zVg5ekoWQrbHEIh';

export const STRATEGY_PILLARS: StrategyPillar[] = [
  {
    id: 'buyout',
    pillarNumber: 'PILLAR 01',
    tag: '플래그십 바이아웃 (Buyout)',
    title: '경영권 인수 및 밸류업 프로그램 (Flagship Buyout)',
    thesis: '대한민국 및 아시아의 독보적 시장 지배력을 보유한 중견 제조, 첨단 헬스케어 강소기업의 경영권을 100% 또는 과반 인수합니다. 이후 전담 오퍼레이션 파트너가 상주하여 디지털 트랜스포메이션, 글로벌 공급망 다변화, 볼트온(Bolt-on) M&A를 실행해 기업가치를 비약적으로 개선합니다.',
    ticket: '₩1,000억 ~ ₩2,500억 원 (단독 또는 컨소시엄)',
    targetIrr: '22% ~ 28% Net IRR',
    moic: '3.2x ~ 4.0x',
    levers: [
      '원가 구조 혁신 & ERP 현대화',
      '해외 크로스보더 판로 개척',
      'EBITDA 마진 3.2배 증대',
      '전략적 해외 기업으로의 M&A 매각'
    ]
  },
  {
    id: 'deeptech',
    pillarNumber: 'PILLAR 02',
    tag: '딥테크 그로쓰 (Tech Growth)',
    title: '피지컬 AI & 초격차 딥테크 (Tech Growth Equity)',
    thesis: '글로벌 상용화 전환점에 도달한 원천기술(차세대 HBM 인터포저, 자율주행 AMR 로보틱스, 우주항공 광학)을 보유한 스케일업 유니콘에 집중 투자합니다. 기술적 실사(Due Diligence)는 박사급 테크 파트너가 직접 주도하며 글로벌 테크 빅테크와의 납품 파트너십을 연결합니다.',
    ticket: '₩300억 ~ ₩800억 원 (Series B/C/Pre-IPO 리드)',
    targetIrr: '26% ~ 35% Net IRR',
    moic: '3.5x ~ 5.0x',
    levers: [
      '미국/EU 글로벌 특허 포트폴리오 구축',
      '빅테크 공급망 벤더 공식 등록',
      'KOSDAQ & NASDAQ 듀얼 리스팅 지원',
      '전략적 코인베스트먼트(Co-Investment) 매칭'
    ]
  },
  {
    id: 'infra',
    pillarNumber: 'PILLAR 03',
    tag: '크로스보더 인프라 (Infra & ESG)',
    title: '크로스보더 인프라 & ESG 에너지 (Cross-Border Infra)',
    thesis: '하이퍼스케일 AI 데이터센터 전력망, 신재생 에너지 변전소, 청정수소 공급망 등 장기 현금흐름이 보장된 핵심 국가 기반시설 자산에 투자합니다. 장기 PPA 계약 및 정부 물가연동 인덱스를 통해 하방 리스크를 절대적으로 방어합니다.',
    ticket: '₩800억 ~ ₩2,000억 원',
    targetIrr: '14% ~ 18% Net IRR (안정적 연간 배당 8%+)',
    moic: '2.0x ~ 2.5x',
    levers: [
      '정부 공인 물가연동 장기 오프테이크(PPA)',
      'EU Taxonomy & K-ESG 최고 등급 획득',
      '정기 분기 배당 현금흐름 창출',
      '인프라 국부펀드 앞 블록세일 매각'
    ]
  },
  {
    id: 'credit',
    pillarNumber: 'PILLAR 04',
    tag: '스페셜 시츄에이션 (Private Credit)',
    title: '스페셜 시츄에이션 & 사모 대출 (Private Credit)',
    thesis: '기업의 일시적 유동성 경색, 지배구조 개편, 메자닌 전환사채(CB/BW) 및 우량 담보부 사모대출에 투자하여 시장 변동성과 무관하게 확정적 계약 수익을 추구합니다. 담보인정비율(LTV 40% 이하)을 엄격히 고수하여 원금 보존성을 극대화합니다.',
    ticket: '₩500억 ~ ₩1,500억 원',
    targetIrr: '12% ~ 16% 확정형 수익률',
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
    growthMetric: '매출성장 +420%',
    growthType: 'metric',
    dealStage: 'Series C Lead',
    categories: ['unicorn', 'deeptech'],
    ticketSize: 'Series C 리드 (₩750억)',
    targetMoic: '4.6x',
    esgRating: 'AA+ (Zero Hazardous Emissions)',
    fullThesis: '2026 KOSDAQ / NASDAQ 동시 상장 승인 준비 완료, HBM4 필수 패키징 독점 납품 계약 체결.'
  },
  {
    id: 'cryobio',
    title: '초저온 의약품 스마트 콜드체인',
    subtitle: '글로벌 mRNA/ADC 바이오 의약품 전용 스마트 인프라',
    description: '운영 효율화 및 자동화 시스템 도입을 통한 볼트온 전략 수행, 글로벌 제약사 장기 독점 공급계약 체결.',
    badge: '바이아웃 턴어라운드',
    badgeVariant: 'slate',
    growthMetric: 'EBITDA +180%',
    growthType: 'metric',
    dealStage: 'Buyout 100% Control',
    categories: ['unicorn', 'healthcare'],
    ticketSize: '경영권 바이아웃 (₩1,200억)',
    targetMoic: '3.8x',
    esgRating: 'AAA (ESG Governance Excellence)',
    fullThesis: '글로벌 mRNA 및 ADC 바이오의약품 전용 항온 물류 1위 구축, 볼트온 2건 완료.'
  },
  {
    id: 'solidstate-battery',
    title: '차세대 전고체 배터리 소재',
    subtitle: '황화물계 고체전해질 대량 합성 공정 독점',
    description: '기존 액체 전해질 대비 발화 위험 제로 및 에너지 밀도 2배 향상. 글로벌 완성차사 Tier-1 납품 확정.',
    badge: '전략적 공동투자',
    badgeVariant: 'gold',
    growthMetric: '글로벌 특허 34건',
    growthType: 'metric',
    dealStage: 'Growth Equity Round',
    categories: ['unicorn', 'deeptech'],
    ticketSize: 'Strategic Co-Investment (₩600억)',
    targetMoic: '3.2x',
    esgRating: 'A+ (Clean Energy Frontier)',
    fullThesis: '미국·유럽 핵심 특허 34건 등록, 글로벌 완성차 Tier-1 전용 파일럿 라인 가동.'
  },
  {
    id: 'aerooptic',
    title: '위성통신 광학 레이더 시스템',
    subtitle: '초소형 SAR 위성 탑재체 및 국방 통신 솔루션',
    description: '군 통신망 및 상용 지구관측 위성에 탑재되는 독점적 광학 레이더 원천기술 상용화 후 코스닥 상장 회수.',
    badge: 'IPO 성공 엑싯',
    badgeVariant: 'emerald',
    growthMetric: 'MoIC 4.8x 달성',
    growthType: 'exit',
    dealStage: 'DPI Distribution Complete',
    categories: ['exit', 'deeptech'],
    ticketSize: '초기 Series A 리드 후 IPO 회수',
    targetMoic: '4.8x MoIC 달성',
    esgRating: 'AA (Institutional Compliance)',
    fullThesis: 'KOSDAQ 공모 청약 역대 최고 경쟁률 기록, 전량 성공적 분배 완료 (DPI 100% 실현).'
  },
  {
    id: 'omnifin',
    title: '클라우드 ERP 핀테크 플랫폼',
    subtitle: '중견·대기업 연동 재무제표 실시간 감사 엔진',
    description: '국내 대기업 그룹사 40% 도입 점유율 달성 후 글로벌 메가 사모펀드로 지분 100% 매각 완료.',
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
    description: '밀리미터급 오차 정밀 제어 LiDAR 내재화로 북미 및 유럽 기가팩토리 표준 로봇 공급사 지정.',
    badge: 'Pre-IPO 라운드',
    badgeVariant: 'gold',
    growthMetric: '글로벌 점유율 1위',
    growthType: 'metric',
    dealStage: 'Pre-IPO 2025 Mandate',
    categories: ['unicorn', 'deeptech'],
    ticketSize: 'Pre-IPO 라운드 리드 (₩500억)',
    targetMoic: '2.9x (Unrealized)',
    esgRating: 'AAA (Zero Incident Automation)',
    fullThesis: '반도체·배터리 클린룸 무인 운반 로봇 글로벌 1위 납품 점유율.'
  }
];

export const LEADERS: LeaderProfile[] = [
  {
    name: '권진우 대표 파트너',
    title: 'Managing Partner & Chairman',
    bio: '전 골드만삭스 아시아 M&A 총괄 전무. 서울대학교 경제학 학사 및 하버드 MBA. 25년 이상 아시아 크로스보더 메가 딜 및 적대적 M&A 방어 주도.',
    credentialBadge: 'Seoul Investment Committee Chair',
    iconType: 'bank'
  },
  {
    name: 'Marcus von Stein',
    title: 'Senior Partner · European LP',
    bio: '전 스위스 UBS 프라이빗 뱅킹 글로벌 초고액자산가(UHNW) 총괄. 취리히 연방공대 및 옥스퍼드 금융학 석사. 유럽 가문 패밀리오피스 신탁 자산 결성.',
    credentialBadge: 'Zurich & London Desk Head',
    iconType: 'shield'
  },
  {
    name: '엘레나 강 파트너',
    title: 'Partner · Deep-Tech Buyout',
    bio: 'MIT 재료공학 박사. 전 글로벌 종합 반도체 기업 사외이사 및 실리콘밸리 기술투자 총괄. AI 가속기 및 차세대 반도체 공정 특허 12건 보유.',
    credentialBadge: 'Tech Due Diligence Director',
    iconType: 'chip'
  },
  {
    name: '최승원 수석 고문',
    title: 'Senior Macro & Policy Advisor',
    bio: '전 금융위원회 자문위원 및 한국은행 금융안정국 자문역. 거시경제 규제 정책 수립 및 금융감독 컴플라이언스 준수 총괄 가이드라인 제공.',
    credentialBadge: 'Regulatory Compliance Advisor',
    iconType: 'policy'
  }
];
