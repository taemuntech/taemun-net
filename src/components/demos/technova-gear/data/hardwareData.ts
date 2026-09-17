// ⚠️ 부품은 **일반 규격**으로만 적는다(nordic-peak/data/products.ts 와 같은 기준).
// 실존 제조사의 제품 라인 이름(그래픽카드·CPU 모델명·인터페이스 상표)을 지어낸 브랜드의 사양표에
// 적으면 제휴·정품 공급처럼 읽힌다. 「외장 GPU 16GB」·「USB4 40Gbps」 처럼 규격으로 내린다.
import { HardwareProduct, ComparisonModel } from '../types';

export const INITIAL_PRODUCTS: HardwareProduct[] = [
  {
    id: 'titan-16-pro',
    sku: 'TITAN-16',
    category: 'laptop',
    categoryName: 'LAPTOP & WORKSTATION',
    name: '테크노바 타이탄 16 프로 G-EDITION',
    subtitle: '16코어 CPU / 외장 GPU 16GB / OLED 240Hz / 32GB',
    tag: 'TGP 175W',
    tagColor: 'secondary',
    image: '/demo-media/technova-gear/technova-gear-02.jpg',
    originalPrice: 3520000,
    discountPrice: 2890000,
    discountRate: 18,
    rating: 4.9,
    reviewCount: 142,
    chips: ['3D 베이퍼챔버', 'USB4 40Gbps', '당일출고'],
    specs: {
      cpu: '모바일 CPU 16코어 22스레드',
      gpu: '외장 GPU 16GB GDDR6',
      tgp: '175W 동적 부스트 최대치',
      ram: '32GB DDR5 5600MHz',
      storage: '1TB PCIe 4.0 NVMe',
      display: '16형 2.5K OLED 240Hz 0.2ms',
      cooling: '풀커버 3D 베이퍼 챔버 + 듀얼 0.1mm 팬',
      weight: '1.98kg / 99.9Whr',
      ports: 'USB4 40Gbps x2, HDMI 2.1, 2.5G LAN, SD'
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
    chips: ['가변주사율(VRR)', '90W Type-C', '10bit 컬러'],
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
    chips: ['공간 음향', '80시간 재생', 'ANC 노이즈캔슬'],
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
    cpu: '모바일 CPU 16코어 22스레드',
    cpuDetail: '16C/22T (최대 5.1GHz) + NPU 탑재',
    gpu: '외장 GPU 16GB GDDR6 (175W)',
    gpuPercent: 88,
    gpuColor: '#4cd7f6',
    display: '16형 2.5K (2560x1600) OLED 240Hz',
    displayDetail: '0.2ms 응답 / 저잔상 구동 (예시 표기)',
    cooling: '풀커버 3D 베이퍼 챔버 + 듀얼 0.1mm 팬',
    coolingDetail: '액체 금속 서멀(리퀴드 메탈) 기본 도포',
    io: 'USB4 40Gbps x2, HDMI 2.1, 2.5G LAN, SD',
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
    cpu: '전세대 모바일 CPU 20코어',
    cpuDetail: '20C/28T (최대 5.5GHz)',
    gpu: '외장 GPU 8GB GDDR6 (105W)',
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
    cpu: '고성능 모바일 CPU 16코어',
    cpuDetail: '16C/32T (고성능 코어 전 구성)',
    gpu: '최상위 외장 GPU 16GB GDDR6 (175W 풀언락)',
    gpuPercent: 100,
    gpuColor: '#4d8eff',
    display: '17.3형 4K UHD Mini-LED 165Hz',
    displayDetail: '1,152 로컬 디밍존 / HDR 1000',
    cooling: '트리플 팬 챔버 + 외장 수랭 도킹 루프 지원',
    coolingDetail: '수랭 킷 별매 결합 가능',
    io: 'USB4 40Gbps x3, Mini-DP 1.4, HDMI 2.1, 5G LAN',
    weight: '3.15kg / 99.9Whr (데스크탑 대체형)',
    timeSpy: '23,900 pts',
    timeSpyTarget: '111%',
    isCurrent: false
  }
];

export const BRAND_LOGO_URL = '/demo-media/technova-gear/technova-gear-06.png';
