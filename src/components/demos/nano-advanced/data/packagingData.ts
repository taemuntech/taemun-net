import { LayerData } from '../types';

export const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1Xad06wDMonnkAjtGVp8KmHZ-5wSr4vWy1HawYJ3vIvI7fSUGMn1umktxHeG7umXRncb3DCGw7QHACVO_oLniLapSKU8OX-vrsxuhVY5bgMdQ50iZJ-Jxe_WrLXhO1tLexZMi1jl1k08Jk2ePb63hHl8-d3pXO7j5wm4HGnpppvGly1HBLWYvzwSKdW1HlqqIlOImwG62XJkdGKK3-o6DbXXE2opaHA43BEs_30ONzUhiYJJddJ8wZW0Q';

export const HERO_WAFER_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuArheP-3UGGs4_vt7ioU63acGsr_qDfsQ-DBqDNXZnWBPkoZACRWN069Lhp_B9K27JYuvwp5v10KPE1ZztMNNSRyKpad0Vu1hhEI8j7arrBIun-KTrzzLTmacPMrshavMLzlMWCyaOoACs3Nrs0Wzq7gmdd5H5kyT_1eRW7KyHyPCinecLFoV5yCWMzvNeqBzVgYk_frQrFvEoXt3aMk_JzHz1xQQMfyGDzpqsxROBT8g6ckY-ZmkD6';

export const LAYERS: LayerData[] = [
  {
    id: 1,
    label: 'L1',
    tag: 'LAYER 01 : TOP CHIPSET & HBM4',
    title: 'GPU/NPU Logic Die & HBM4 High-Density Stack',
    subtitle: '1,200W 초고발열 소산 및 16-Hi 수직 메모리 접합',
    desc: '첨단 3nm/2nm 공정의 초대형 가속기 코어 다이와 최신 HBM4 스택이 집적되는 최상단 레이어입니다. 다이 간 간격(D2D)을 100µm 이내로 압축하고, 상단 직접 수랭식(Direct-to-Die) 히트싱크 접촉 인터페이스를 최적화하여 1,200W 초고발열 상태에서도 접합 신뢰성을 유지합니다.',
    thermal: '0.08 °C/W',
    thermalPercent: 25,
    bandwidth: '4.8 TB/s',
    bandwidthPercent: 90,
    warpage: '< 12.4 µm',
    warpagePercent: 15,
    node: 'Sub-3nm EUV Multi-Die Compatible',
    underfill: '0.42 mm/s (Zero Void Guarantee)',
    cap: '0.05 pF/mm (Ultra-low loss)',
  },
  {
    id: 2,
    label: 'L2',
    tag: 'LAYER 02 : HIGH DENSITY INTERPOSER',
    title: '5µm Ultra-Fine Silicon Interposer',
    subtitle: '초고밀도 TSV 관통 전극 및 4.8 TB/s 신호 전송 라인',
    desc: '로직 다이와 HBM 메모리 사이를 연결하는 초정밀 실리콘 인터포저 레이어입니다. TSV(Through Silicon Via) 관통 전극을 통해 수만 개의 신호 배선을 5µm 피치로 구현하여 기생 저항과 정전용량을 40% 이상 극소화합니다.',
    thermal: '0.06 °C/W',
    thermalPercent: 20,
    bandwidth: '4.8 TB/s',
    bandwidthPercent: 95,
    warpage: '< 9.8 µm',
    warpagePercent: 10,
    node: 'Line/Space 2/2µm Multi-RDL',
    underfill: 'TSV Aspect Ratio 10:1 Cu Filled',
    cap: '0.04 pF/mm (Near-Zero Jitter)',
  },
  {
    id: 3,
    label: 'L3',
    tag: 'LAYER 03 : INTERCONNECT INTERFACE',
    title: 'Micro-Bump & Hybrid Cu-Cu Direct Bonding',
    subtitle: '솔더리스 분자 결합 및 초미세 9µm 피치 인터커넥트',
    desc: '기존의 솔더 기반 범프를 분자 결합 수준의 Cu-Cu 직접 접합으로 대체하는 차세대 인터커넥트 인터페이스입니다. 피치를 9µm 이하로 축소하여 접합 저항을 0.01Ω 미만으로 낮추고 고전력 전송 시의 전자이동(Electromigration) 현상을 근본적으로 억제합니다.',
    thermal: '0.04 °C/W',
    thermalPercent: 15,
    bandwidth: '9.6 TB/s',
    bandwidthPercent: 98,
    warpage: '< 8.5 µm',
    warpagePercent: 8,
    node: 'Atomic Fusion Direct Bonding',
    underfill: 'Bumpless Dielectric Passivation',
    cap: '0.02 pF/mm (True Nano Contact)',
  },
  {
    id: 4,
    label: 'L4',
    tag: 'LAYER 04 : ULTRA-FLAT BASE CORE',
    title: 'Next-Gen 24-Layer FC-BGA & Glass Core Substrate',
    subtitle: '120×120mm 대면적 제로-워피지 휨 제어 및 고주파 절연',
    desc: '패키지 최하단을 지지하는 대면적 120×120mm 베이스 기판입니다. 유기 코어 대신 초평탄 글래스(Glass) 소재를 적용하여 고온 솔더링 리플로우 공정 중의 휨을 50% 이상 억제하며, TGV 고주파 관통 홀을 통해 시스템 메인보드로 초저손실 전력을 공급합니다.',
    thermal: '0.09 °C/W',
    thermalPercent: 30,
    bandwidth: '12.8 TB/s',
    bandwidthPercent: 99,
    warpage: '< 14.8 µm',
    warpagePercent: 18,
    node: '120×120mm Large-Panel Form Factor',
    underfill: 'TGV Laser Induced Etching (Aspect 12:1)',
    cap: '0.03 pF/mm (Rigid Zero-Strain Core)',
  },
];

export const PILLARS = [
  {
    code: 'PILLAR 01 • SILICON INTERPOSER',
    title: 'Sub-5µm Fine Pitch Silicon Interposer',
    desc: 'HBM4 인터페이스 규격에 완벽 정합하는 5µm 초미세 배선 피치(Line/Space 2/2µm)와 TSV 관통 전극을 통해 다이 간 4.8 TB/s의 폭발적인 대역폭을 손실 없이 전송합니다.',
    bullets: [
      '기생 커패시턴스 0.05pF/mm 이하 억제',
      'TSV 밀도: 10,000 vias / mm² 초고집적',
      '4배 레티클(Reticle) 크기 대면적 스티칭 공정',
    ],
    actionText: '인터포저 기술 백서 다운로드',
    icon: 'grid_4x4',
    themeColor: 'primary',
  },
  {
    code: 'PILLAR 02 • NEXT-GEN GLASS CORE',
    title: 'Ultra-Flat Glass Substrate Core',
    desc: '기존 유기 기판(FC-BGA)의 치명적 한계인 휨 현상을 50% 이상 저감하며, 120×120mm 이상의 초대형 AI 칩셋 환경에서도 표면 평탄도 0.1µm 이하의 무결점을 실현합니다.',
    bullets: [
      'TGV (Through Glass Via) 종횡비 10:1',
      '고주파 전송 유전 손실률(Loss Tangent) 1/3 단축',
      '강성 계수 3배 향상으로 다이 크랙 방지',
    ],
    actionText: '글래스 코어 양산 데이터 검토',
    icon: 'view_in_ar',
    themeColor: 'secondary',
  },
  {
    code: 'PILLAR 03 • WAFER-TO-WAFER',
    title: 'Hybrid Bonding Direct Cu-Cu',
    desc: '솔더 범프를 완전히 배제한 원자 단위 Cu-Cu 직접 접합(Direct Bond Interconnect) 기술로 배선 밀도를 10배 끌어올리고, 접속 저항을 0.01Ω 이하로 극소화합니다.',
    bullets: [
      '범프리스 초미세 피치: 서브 9µm 인터커넥트',
      '에너지 소비(pJ/bit) 기존 대비 75% 절감',
      'Die-to-Wafer / Wafer-to-Wafer 전 공정 지원',
    ],
    actionText: '하이브리드 본딩 수율 분석 요청',
    icon: 'join_inner',
    themeColor: 'tertiary-container',
  },
];

export const CERTIFICATIONS = [
  {
    title: 'TSMC OIP',
    desc: 'Open Innovation Platform 인증',
    color: 'text-[#00288e]',
  },
  {
    title: 'Samsung SAFE™',
    desc: 'Advanced Packaging 파트너',
    color: 'text-[#00687a]',
  },
  {
    title: 'SEMI Global',
    desc: '국제 반도체 표준 규격 준수',
    color: 'text-[#0b1c30]',
  },
  {
    title: 'ISO 9001/14001',
    desc: '반도체 품질·환경 인증 팹',
    color: 'text-[#00563a]',
  },
];

export const INSPECTION_STEPS = [
  {
    step: '01',
    title: '고해상도 3D X-ray 비파괴 단층 검사',
    desc: '마이크로 솔더 내부의 미세 공극(Micro-void 0.001%)까지 실시간 투과 스캔하여 불량을 사전에 차단합니다.',
    badge: '100% Full-die Scanned',
  },
  {
    step: '02',
    title: '서브나노 레이저 공초점 휨 3D 맵핑',
    desc: '공초점 레이저 변위 센서로 120mm 대형 글래스 코어의 서브나노미터 표면 고저차 및 국소 휨을 정밀 측정합니다.',
    badge: 'Resolution: 0.05 µm',
  },
  {
    step: '03',
    title: '1,000사이클 극저온-고온 열충격 검증',
    desc: '-65℃에서 +150℃를 오가는 극단적 가혹 환경 테스트를 통과하여 접합 계면의 균열 및 박리를 원천 차단합니다.',
    badge: 'MIL-STD-883 Validated',
  },
  {
    step: '04',
    title: '고주파 TDR/VNA 신호 무결성 전수 계측',
    desc: 'Vector Network Analyzer를 통해 고속 인터커넥트 라인의 임피던스 불연속성과 고주파 삽입 손실을 전수 판정합니다.',
    badge: 'Bandwidth: Up to 112Gbps',
  },
  {
    step: '05',
    title: '클린룸 Class 1 이물 파티클 광학 자동 판별',
    desc: 'AI 비전 기반 결함 검출 엔진이 나노 스케일 미세 잔여물 및 파티클을 0.1초 내 감지하여 무결점 패키징을 수호합니다.',
    badge: 'Zero-Particle Cleanliness',
  },
];
