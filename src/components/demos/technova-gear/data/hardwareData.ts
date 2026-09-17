import { HardwareProduct, ComparisonModel } from '../types';

export const INITIAL_PRODUCTS: HardwareProduct[] = [
  {
    id: 'titan-16-pro',
    sku: 'TITAN-16',
    category: 'laptop',
    categoryName: 'LAPTOP & WORKSTATION',
    name: '테크노바 타이탄 16 프로 G-EDITION',
    subtitle: 'Ultra 9 185H / RTX 4080 / OLED 240Hz / 32GB',
    tag: 'TGP 175W',
    tagColor: 'secondary',
    image: '/demo-media/technova-gear/technova-gear-02.jpg',
    originalPrice: 3520000,
    discountPrice: 2890000,
    discountRate: 18,
    rating: 4.9,
    reviewCount: 142,
    chips: ['3D 베이퍼챔버', '썬더볼트4', '당일출고'],
    specs: {
      cpu: 'Core Ultra 9 185H',
      gpu: 'RTX 4080 16GB GDDR6X',
      tgp: '175W Max Dynamic Boost',
      ram: '32GB DDR5 5600MHz',
      storage: '1TB PCIe 4.0 NVMe',
      display: '16형 2.5K OLED 240Hz 0.2ms',
      cooling: '풀커버 3D 베이퍼 챔버 + 듀얼 0.1mm 팬',
      weight: '1.98kg / 99.9Whr',
      ports: 'Thunderbolt 4 x2, HDMI 2.1, 2.5G LAN, SD'
    }
  },
  {
    id: 'qd-oled-32',
    sku: 'QD32-4K240',
    category: 'display',
    categoryName: 'DISPLAY & MONITOR',
    name: '32인치 4K UHD 240Hz QD-OLED 모니터',
    subtitle: '퀀텀닷 3세대 / 0.03ms GtG / DP 2.1 UHBR20',
    tag: '0.03ms 응답',
    tagColor: 'primary',
    image: '/demo-media/technova-gear/technova-gear-04.jpg',
    originalPrice: 1640000,
    discountPrice: 1390000,
    discountRate: 15,
    rating: 4.9,
    reviewCount: 89,
    chips: ['G-Sync 호환', '90W Type-C', '무결점 보증'],
    specs: {
      display: '32인치 4K (3840x2160) QD-OLED 240Hz',
      ports: 'DP 2.1 x1, HDMI 2.1 x2, USB-C 90W PD',
      cooling: '그래핀 방열패드 + 커스텀 히트싱크 (팬리스)'
    }
  },
  {
    id: 'mag-alu75',
    sku: 'MAG-ALU75',
    category: 'gear',
    categoryName: 'GAMING GEAR & INPUT',
    name: '래피드 트리거 풀알루미늄 무선 키보드',
    subtitle: '자석축 홀센서 0.02mm 스트로크 조절 / 무선 2.4G',
    tag: '8000Hz 폴링',
    tagColor: 'tertiary',
    image: '/demo-media/technova-gear/technova-gear-03.jpg',
    originalPrice: 320000,
    discountPrice: 249000,
    discountRate: 22,
    rating: 5.0,
    reviewCount: 318,
    chips: ['가스켓 마운트', '8,000Hz', '블루투스 5.3'],
    specs: {
      ports: 'USB Type-C 유선 / 2.4GHz 무선 / BT 5.3',
      weight: '1,840g (풀알루미늄 6063 CNC)'
    }
  },
  {
    id: 'audio-planar1',
    sku: 'AUDIO-PLANAR1',
    category: 'audio',
    categoryName: 'AUDIO & ACOUSTICS',
    name: '공간음향 ANC 무선 플래그십 헤드셋',
    subtitle: '90mm 평판 자계형 드라이버 / 24bit 96kHz 무손실',
    tag: '플래너 마그네틱',
    tagColor: 'secondary',
    image: '/demo-media/technova-gear/technova-gear-05.jpg',
    originalPrice: 489000,
    discountPrice: 429000,
    discountRate: 12,
    rating: 4.8,
    reviewCount: 64,
    chips: ['돌비 애트모스', '80시간 재생', 'AI 노이즈캔슬'],
    specs: {
      ports: 'USB Type-C / 3.5mm AUX / 2.4G 동글',
      weight: '385g (카본 파이버 헤드밴드)'
    }
  }
];

export const COMPARISON_MODELS: ComparisonModel[] = [
  {
    id: 'titan-16-pro',
    badge: 'BEST PERFORMANCE',
    badgeType: 'secondary',
    name: '테크노바 타이탄 16 프로',
    price: '₩2,890,000',
    cpu: '코어 Ultra 9 185H',
    cpuDetail: '16C/22T (최대 5.1GHz) + NPU 탑재',
    gpu: 'RTX 4080 GDDR6X 12GB (175W)',
    gpuPercent: 88,
    gpuColor: '#4cd7f6',
    display: '16형 2.5K (2560x1600) OLED 240Hz',
    displayDetail: '0.2ms 응답 / VESA ClearMR 9000',
    cooling: '풀커버 3D 베이퍼 챔버 + 듀얼 0.1mm 팬',
    coolingDetail: '액체 금속 서멀(리퀴드 메탈) 기본 도포',
    io: 'Thunderbolt 4 x2, HDMI 2.1, 2.5G LAN, SD',
    weight: '1.98kg / 99.9Whr (기내 반입 최대치)',
    timeSpy: '21,500 pts',
    timeSpyTarget: '타겟 100%',
    isCurrent: true
  },
  {
    id: 'aero-14-stealth',
    badge: 'BEST VALUE',
    badgeType: 'primary',
    name: '테크노바 에어로 14 스텔스',
    price: '₩1,890,000',
    cpu: '14세대 코어 i7-14700HX',
    cpuDetail: '20C/28T (최대 5.5GHz)',
    gpu: 'RTX 4060 GDDR6 8GB (105W)',
    gpuPercent: 52,
    gpuColor: '#8c909f',
    display: '14형 QHD+ (2560x1600) IPS 165Hz',
    displayDetail: '3ms 응답 / sRGB 100%',
    cooling: '하이브리드 3 히트파이프 + 듀얼 팬',
    coolingDetail: '고성능 서멀 페이스트',
    io: 'USB-C 3.2 Gen2 x2, HDMI 2.1, MicroSD',
    weight: '1.42kg / 75Whr (경량 고성능)',
    timeSpy: '11,200 pts',
    timeSpyTarget: '52%',
    isCurrent: false
  },
  {
    id: 'quantum-workstation',
    badge: 'EXTREME WORKSTATION',
    badgeType: 'accent',
    name: '테크노바 퀀텀 워크스테이션',
    price: '₩4,250,000',
    cpu: '라이젠 9 7945HX',
    cpuDetail: '16C/32T (풀 Zen4 고성능)',
    gpu: 'RTX 4090 GDDR6X 16GB (175W 풀언락)',
    gpuPercent: 100,
    gpuColor: '#4d8eff',
    display: '17.3형 4K UHD Mini-LED 165Hz',
    displayDetail: '1,152 로컬 디밍존 / HDR 1000',
    cooling: '트리플 팬 챔버 + 외장 수랭 도킹 루프 지원',
    coolingDetail: '수랭 킷 별매 결합 가능',
    io: 'Thunderbolt 4 x3, Mini-DP 1.4, HDMI 2.1, 5G LAN',
    weight: '3.15kg / 99.9Whr (데스크탑 대체형)',
    timeSpy: '23,900 pts',
    timeSpyTarget: '111%',
    isCurrent: false
  }
];

export const BRAND_LOGO_URL = '/demo-media/technova-gear/technova-gear-06.png';
