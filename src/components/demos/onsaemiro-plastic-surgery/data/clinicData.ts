import { BeforeAfterCase, RoadmapStage, DoctorProfile } from '../types';

export const CLINIC_IMAGES = {
  logoProfile: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-11.png',
  heroModel: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-hero.png',
  philosophyNatural: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-05.jpg',
  philosophySuture: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-08.jpg',
  eyeAfter: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-eye-after.png',
  eyeBefore: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-eye-before.png',
  noseAfter: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-nose-after.png',
  noseBefore: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-nose-before.png',
  liftAfter: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-lift-after.png',
  liftBefore: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-lift-before.png',
  recoverySuite: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-02.jpg',
  doctorKang: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-01.jpg',
  doctorYoon: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-06.jpg',
  doctorPark: '/demo-media/onsaemiro-plastic-surgery/onsaemiro-plastic-surgery-03.jpg'
  // mapView 는 뺐다 — 구글 지도 캡처(구글 로고·「Map data ©2026 TMap Mobility」가 찍힌 이미지)라
  // 지어낸 의원 화면에 실존 서비스 자산을 얹는 꼴이었다. LocationConcierge 에서 약도 그래픽으로 대체했다.
};

export const BEFORE_AFTER_CASES: Record<string, BeforeAfterCase> = {
  eye: {
    id: 'case-eye',
    category: 'eye',
    title: '자연유착 인아웃 라인 쌍꺼풀 + 비절개 눈매교정',
    subtitle: '피부 절개 없이 미세 홀을 통한 6포인트 연속 결찰',
    desc: '절개 없이 미세 홀을 통한 6포인트 연속 결찰 방식으로, 눈꺼풀 상태에 맞추어 눈매 라인을 설계합니다.',
    beforeImg: CLINIC_IMAGES.eyeBefore,
    afterImg: CLINIC_IMAGES.eyeAfter,
    recoveryPeriod: '약 4~6일 (개인차 있음)',
    keyPoints: ['피부 절개 범위를 줄인 설계', '눈꺼풀 처짐 정도에 맞춘 미세 조절', '눈매 라인 사전 디자인 상담']
  },
  nose: {
    id: 'case-nose',
    category: 'nose',
    title: '무보형물 비중격 자가연골 코성형 (직반버선 라인)',
    subtitle: '실리콘 이물감 없는 자가 생체 조직 재건',
    desc: '인공 보형물 대신 자가 비중격 연골을 사용해 코끝 지지대를 만드는 방식입니다.',
    beforeImg: CLINIC_IMAGES.noseBefore,
    afterImg: CLINIC_IMAGES.noseAfter,
    recoveryPeriod: '약 7일 (개인차 있음)',
    keyPoints: ['인공 보형물을 쓰지 않는 자가조직 방식', '비순각 98° 목표로 한 사전 설계', '콧볼 미세 축소 병행 가능']
  },
  lift: {
    id: 'case-lift',
    category: 'lift',
    title: '미니 SMAS 안면거상 + 심부볼 정밀 리프팅',
    subtitle: '귀 뒤 헤어라인을 따라 미세 절개선을 배치하는 설계',
    desc: '절개선을 귀 뒤 헤어라인을 따라 배치하고, 처진 턱선과 팔자주름을 근막층부터 견인하는 방식입니다.',
    beforeImg: CLINIC_IMAGES.liftBefore,
    afterImg: CLINIC_IMAGES.liftAfter,
    recoveryPeriod: '약 5~7일 (개인차 있음)',
    keyPoints: ['피부 표면이 아닌 SMAS 근막층 박리', '턱선·팔자주름 부위 동시 접근', '귀 형태를 고려한 절개선 설계']
  }
};

export const ROADMAP_STAGES: Record<string, RoadmapStage> = {
  day0: {
    id: 'day0',
    stageName: '수술 당일',
    stageBadge: 'STAGE 01 · SURGERY DAY',
    title: '냉각 림프 순환 케어 & 프라이빗 스위트 휴식',
    description: '수술 직후 전용 1인 스위트에서 쿨링 패치 처치와 저출력 LED 광(光) 진정 케어를 1차 적용합니다. 간호 인력이 1:1로 활력징후를 점검하며 귀가를 돕습니다.',
    residualEdemaPct: 100,
    badge: '초기 진정 프로토콜 가동',
    careDetails: ['전용 1인 회복 스위트 배정', '저출력 LED 광 진정 케어 1차', '미세 압박 드레싱 및 얼음팩 제공']
  },
  day3: {
    id: 'day3',
    stageName: '3일차 (피크 붓기)',
    stageBadge: 'STAGE 02 · DAY 03 (PEAK EDEMA)',
    title: '고압산소 챔버 2.0 ATA 회복 집중 관리',
    description: '붓기가 대체로 가장 심한 3일차에 고압산소 챔버 관리와 온/냉 림프 순환 케어를 병행합니다. 멍 완화 연고와 맞춤형 림프 팩이 함께 제공됩니다.',
    residualEdemaPct: 55,
    badge: '붓기 관리 집중 구간',
    careDetails: ['고압산소 챔버 2.0 ATA 40분 치료', '멍 케어 아르니카 연고 도포', '온/냉 림프 순환 수기 트리트먼트']
  },
  day7: {
    id: 'day7',
    stageName: '7일차 (실밥 발거)',
    stageBadge: 'STAGE 03 · DAY 07 (SUTURE REMOVAL)',
    title: '미세 실밥 발거 & 흉터 관리 광(光) 케어',
    description: '담당 집도의가 직접 미세 봉합사를 제거하며 절개부 상태를 확인합니다. 저출력 LED 광 케어로 붉은 기를 관리하고 표정 근육 스트레칭을 안내합니다.',
    residualEdemaPct: 20,
    badge: '경과에 따라 외출 가능',
    careDetails: ['집도의 1:1 직접 실밥 발거', '흉터 부위 광(光) 케어 1차', '세안 및 가벼운 메이크업 안내']
  },
  day14: {
    id: 'day14',
    stageName: '14일차 (일상 복귀)',
    stageBadge: 'STAGE 04 · DAY 14 (FINAL RECOVERY)',
    title: '최종 3D 윤곽 경과 점검 & 메디컬 스킨케어',
    description: '대체로 잔붓기가 많이 가라앉는 시기입니다. 3D 계측 비교로 수술 전 계획과의 차이를 확인하고, 잔붓기 림프 관리로 마무리합니다. 경과 속도는 개인차가 큽니다.',
    residualEdemaPct: 5,
    badge: '일상생활 복귀 안내 구간',
    careDetails: ['3D 안면스캐너 최종 계측', '고주파 잔붓기 관리', '정기 사후관리 일정 안내']
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
      '주요 의과대학 졸업 및 의학석사 (예시 이력)',
      '주요 대학병원 성형외과 임상자문의 (예시 이력)',
      '안면성형 관련 학회 정회원 (예시 이력)',
      '국제 미용성형 학술대회 참가 (예시 이력)'
    ],
    specialties: '3D 자연유착 눈성형, 무보형물 코성형',
    image: CLINIC_IMAGES.doctorKang
  },
  {
    id: 'yoon',
    name: '윤서아 원장',
    role: '원장',
    subRole: '성형외과 전문의',
    quote: '"미세한 1mm의 차이가 인상의 온화함과 우아함을 좌우한다고 생각합니다. 흉터가 덜 남도록 섬세하게 마무리하겠습니다."',
    credentials: [
      '주요 의과대학 졸업 (예시 이력)',
      '대학병원 성형외과 외래교수 (예시 이력)',
      '미용성형 관련 학회 정회원 (예시 이력)',
      '눈·코성형 연구 모임 활동 (예시 이력)'
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
      '주요 의과대학 졸업 (예시 이력)',
      '대학병원 마취통증의학과 전임의 (예시 이력)',
      '마취통증의학 관련 학회 정회원 (예시 이력)',
      '중환자의학 세부전문의 (예시 이력)'
    ],
    specialties: '1:1 수면/전신마취 전담 모니터링, 악성고열증 대응 체계 운영',
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
    desc: '원내 상주 마취통증의학과 전문의가 수술 시작부터 회복실 퇴실까지 SpO2, 혈압, 심전도를 실시간으로 모니터링합니다.',
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
    title: '무정전 전원 공급 장치 (UPS) & 응급 약제 비치',
    desc: '정전 시에도 즉시 비상 전력을 공급하는 대용량 UPS를 갖추고, 드물게 발생하는 마취 합병증에 쓰이는 단트롤렌(Dantrolene)을 상시 비치합니다.',
    guarantee: '악성고열증 대응 약제 상시 비치',
    icon: 'power'
  },
  {
    pillarNumber: 'PILLAR 05',
    title: '10단계 무균 양압 클린 수술실 (Class 1,000)',
    desc: 'Class 1,000 규격의 HEPA 필터 양압 공조 시스템(0.3㎛ 입자 99.97% 포집 사양)을 운용해 수술실 내 부유 입자와 오염 요인을 지속적으로 관리합니다.',
    guarantee: '에어샤워 & 플라즈마 저온 멸균 소독기 운용',
    icon: 'air'
  }
];
