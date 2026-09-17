import { BeforeAfterCase, RoadmapStage, DoctorProfile } from '../types';

export const CLINIC_IMAGES = {
  logoProfile: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-11.png',
  heroModel: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-07.jpg',
  philosophyNatural: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-05.jpg',
  philosophySuture: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-08.jpg',
  eyeAfter: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-eye-after.png',
  eyeBefore: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-eye-before.png',
  noseAfter: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-nose-after.png',
  noseBefore: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-nose-before.png',
  recoverySuite: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-02.jpg',
  doctorKang: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-01.jpg',
  doctorYoon: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-06.jpg',
  doctorPark: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-03.jpg',
  mapView: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-09.png'
};

export const BEFORE_AFTER_CASES: Record<string, BeforeAfterCase> = {
  eye: {
    id: 'case-eye',
    category: 'eye',
    title: '자연유착 인아웃 라인 쌍꺼풀 + 비절개 눈매교정',
    subtitle: '피부 절개 없이 미세 홀을 통한 6포인트 연속 결찰',
    desc: '절개 없이 미세 홀을 통한 6포인트 연속 결찰로 풀림 방지 및 붓기 4일만 완화',
    beforeImg: CLINIC_IMAGES.eyeBefore,
    afterImg: CLINIC_IMAGES.eyeAfter,
    recoveryPeriod: '4~6일 (메이크업 가능)',
    keyPoints: ['피부 절개 흉터 최소화 설계', '안검하수 0.8mm 정밀 리프팅', '자연스러운 인아웃 라인 도출']
  },
  nose: {
    id: 'case-nose',
    category: 'nose',
    title: '무보형물 비중격 자가연골 코성형 (직반버선 라인)',
    subtitle: '실리콘 이물감 없는 자가 생체 조직 재건',
    desc: '실리콘 이물질 없이 자가 비중격 연골로만 코끝을 세워 비순각 98도 자연스러움 도출',
    beforeImg: CLINIC_IMAGES.noseBefore,
    afterImg: CLINIC_IMAGES.noseAfter,
    recoveryPeriod: '7일 (부목 및 테이핑 제거)',
    keyPoints: ['보형물 비침 및 염증 우려 영구 배제', '비순각 98° 여성스러운 곡선미', '콧볼 미세 축소 병행']
  },
  lift: {
    id: 'case-lift',
    category: 'lift',
    title: '미니 SMAS 안면거상 + 심부볼 정밀 리프팅',
    subtitle: '귀 뒤 헤어라인 미세 절개선으로 흉터 눈에 띄지 않게 배치',
    desc: '귀 뒤 미세 절개선으로 흉터 은폐, 처진 턱선과 팔자주름을 근막층부터 2중 견인',
    beforeImg: CLINIC_IMAGES.eyeBefore,
    afterImg: CLINIC_IMAGES.philosophyNatural,
    recoveryPeriod: '5~7일 (일상생활 복귀)',
    keyPoints: ['피부 표면이 아닌 SMAS 근막층 박리', '팔자주름 및 이중턱 동시 개선', '자연스러운 귀 형태 보존']
  }
};

export const ROADMAP_STAGES: Record<string, RoadmapStage> = {
  day0: {
    id: 'day0',
    stageName: '수술 당일',
    stageBadge: 'STAGE 01 · SURGERY DAY',
    title: '냉각 림프 순환 케어 & 프라이빗 스위트 휴식',
    description: '수술 직후 전용 1인 스위트에서 미세 출혈을 예방하는 쿨링 패치 처치와 힐라이트 II 진정 광선을 1차 적용합니다. 전문 간호사가 1:1로 바이탈을 점검하며 안전한 귀가를 지원합니다.',
    residualEdemaPct: 100,
    badge: '초기 진정 프로토콜 가동',
    careDetails: ['전용 1인 회복 스위트 배정', '힐라이트 II 진정 광선 1차 조사', '미세 압박 드레싱 및 얼음팩 제공']
  },
  day3: {
    id: 'day3',
    stageName: '3일차 (피크 붓기)',
    stageBadge: 'STAGE 02 · DAY 03 (PEAK EDEMA)',
    title: '고압산소 챔버 2.0 ATA 급속 디톡스 집중 치료',
    description: '수술 후 붓기가 가장 최고조에 달하는 3일차에 고압산소 챔버를 통해 혈액 순환 속도를 3배 높이고 조직 부종을 집중 흡수시킵니다. 멍 크림과 맞춤형 온/냉 림프 팩이 제공됩니다.',
    residualEdemaPct: 55,
    badge: '부종 45% 즉각 경감',
    careDetails: ['고압산소 챔버 2.0 ATA 40분 치료', '멍 케어 아르니카 연고 도포', '온/냉 림프 순환 수기 트리트먼트']
  },
  day7: {
    id: 'day7',
    stageName: '7일차 (실밥 발거)',
    stageBadge: 'STAGE 03 · DAY 07 (SUTURE REMOVAL)',
    title: '미세 실밥 발거 & 힐라이트 II 흉터 재생 조사',
    description: '담당 집도의가 직접 0.1mm 단위 미세 봉합사를 흉터 없이 제거하며 절개부 유착 상태를 체크합니다. 재생 광선 테라피로 붉은 기를 지우고 표정 근육 스트레칭을 코칭합니다.',
    residualEdemaPct: 20,
    badge: '외출 및 가벼운 화장 가능',
    careDetails: ['집도의 1:1 직접 실밥 발거', '미세 흉터 레이저 1차 조사', '세안 및 가벼운 메이크업 시작']
  },
  day14: {
    id: 'day14',
    stageName: '14일차 (일상 복귀)',
    stageBadge: 'STAGE 04 · DAY 14 (FINAL RECOVERY)',
    title: '최종 3D 윤곽 완성도 점검 & 메디컬 스킨케어',
    description: '잔붓기가 90% 이상 빠지며 본연의 라인이 완성되는 시기입니다. 3D-CT 비교 분석을 통해 초기 시뮬레이션과의 일치율을 확인하고, 미세 잔붓기 림프 마사지로 마무리합니다.',
    residualEdemaPct: 5,
    badge: '일상생활 일상생활 복귀',
    careDetails: ['3D 안면스캐너 최종 정밀 측정', '고주파 잔붓기 배출 관리', '정기 사후관리 보증서 발급']
  }
};

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'kang',
    name: '강민우 대표원장',
    role: '대표원장',
    subRole: '성형외과 전문의',
    quote: '"과한 변화는 얼굴의 본질을 해칩니다. 당신만이 가진 본연의 선을 찾아 가장 자연스러운 황금비율을 빚어냅니다."',
    credentials: [
      '주요 의과대학 졸업 및 의학석사',
      '주요 대학병원 성형외과 임상자문의',
      '대한성형외과학회 안면성형연구회 정회원',
      '국제미용성형외과학회(ISAPS) 액티브 멤버'
    ],
    specialties: '3D 자연유착 눈성형, 무보형물 코성형',
    image: CLINIC_IMAGES.doctorKang
  },
  {
    id: 'yoon',
    name: '윤서아 원장',
    role: '원장',
    subRole: '성형외과 전문의',
    quote: '"미세한 1mm의 차이가 인상의 온화함과 우아함을 결정합니다. 흉터 없는 섬세한 디테일을 약속합니다."',
    credentials: [
      '주요 의과대학 졸업',
      '대학병원 성형외과 외래교수',
      '대한미용성형외과학회 정회원',
      '대한성형외과학회 눈·코성형연구회 정회원'
    ],
    specialties: '섬세 눈재수술, 동안 안면거상 & 쁘띠 리쥬비네이션',
    image: CLINIC_IMAGES.doctorYoon
  },
  {
    id: 'park',
    name: '박진형 센터장',
    role: '마취안전센터장',
    subRole: '마취통증의학과 전문의',
    quote: '"환자분이 잠드시는 순간부터 완전히 깨어나실 때까지, 1초도 곁을 떠나지 않고 안전을 지킵니다."',
    credentials: [
      '주요 의과대학 졸업',
      '대학병원 마취통증의학과 전임의',
      '대한마취통증의학회 정회원',
      '대한중환자의학회 세부전문의'
    ],
    specialties: '1:1 수면/전신마취 전담 모니터링, 악성고열증 예방',
    image: CLINIC_IMAGES.doctorPark
  }
];

export const SAFETY_PILLARS = [
  {
    pillarNumber: 'PILLAR 01',
    title: '수술 실명제 (전문의 100% 집도)',
    desc: '상담을 진행한 대표/담당 원장이 마취 전 확인부터 수술 전과정, 실밥 제거와 최종 경과 체크까지 100% 직접 책임집니다.',
    guarantee: '원내 전담 실명 확인제 엄수',
    icon: 'verified_user'
  },
  {
    pillarNumber: 'PILLAR 02',
    title: '마취과 전문의 1:1 전담 상주',
    desc: '출장 마취의가 아닌 온새미로 상주 마취통증의학과 전문의가 실시간 SpO2, 혈압, 심전도를 초 단위로 집중 모니터링합니다.',
    guarantee: '심장자동제세동기(AED) 구비',
    icon: 'ecg_heart'
  },
  {
    pillarNumber: 'PILLAR 03',
    title: '보호자 안심 참관 CCTV 시스템',
    desc: '수술실 내 사각지대 없는 고화질 CCTV를 설치하여, 보호자가 원하실 경우 대기실 모니터를 통해 실시간 상황을 투명하게 시청할 수 있습니다.',
    guarantee: '의료법 제38조의2 전면 준수',
    icon: 'visibility'
  },
  {
    pillarNumber: 'PILLAR 04',
    title: '무정전 전원 공급 장치 (UPS & 단트롤렌)',
    desc: '천재지변이나 한전 정전 시에도 즉각 비상 전력을 가동하는 대용량 UPS와, 희귀 마취 합병증 치료제인 닥트롤렌(Dantrolene)을 상시 비치합니다.',
    guarantee: '악성고열증 철저 대비',
    icon: 'power'
  },
  {
    pillarNumber: 'PILLAR 05',
    title: '10단계 무균 양압 클린 수술실 (Class 1,000)',
    desc: '대학병원 뇌수술실 수준의 Class 1,000 HEPA 필터 양압 공조 시스템으로 외부 먼지와 공기 중 바이러스를 99.97% 철저 차단하여 감염 확률을 0%에 수렴시킵니다.',
    guarantee: '에어샤워 & 플라즈마 저온 멸균 소독기 운용',
    icon: 'air'
  }
];
