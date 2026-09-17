import { BeforeAfterCase, DoctorProfile, RecoveryStep, SafetyProtocol } from '../types';

export const CLINIC_INFO = {
  name: '온새미로 성형외과의원',
  englishName: 'ONSAEMIRO AESTHETIC & PLASTIC SURGERY',
  meaning: '가르거나 쪼개지 않고 자연 그대로의 본래 모습',
  slogan: '본연의 아름다움을 거스르지 않는 자연스러움의 미학',
  tel: '02-0000-0000',
  address: '서울특별시 강남구 압구정로 000 (온새미로 메디컬 타워 4~6F)',
  subway: '수인분당선 압구정로데오역 5번 출구 도보 2분',
  hours: {
    weekday: '월 - 금  AM 10:00 - PM 07:00',
    saturday: '토 요 일  AM 10:00 - PM 04:00 (점심시간 없음)',
    closed: '일요일 및 법정 공휴일 휴진 (사전 예약 수술 상담 가능)',
  },
  registrationNumber: '000-00-00000 (샘플용)',
};

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'ba-01',
    category: 'eye',
    categoryName: '눈성형',
    title: '자연유착 쌍꺼풀 & 눈매교정',
    description: '눈꺼풀 피부와 근육의 연결을 섬세하게 유도하여 절개 흉터 걱정 없이 또렷하고 자연스러운 인라인 쌍꺼풀을 완성했습니다.',
    doctorName: '대표원장 강민우 성형외과 전문의',
    tags: ['인아웃라인', '비절개눈매교정', '멍·붓기최소화'],
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    period: '수술 후 3개월 경과 (예시)',
    caution: '개인에 따라 출혈, 감염, 비대칭 등의 부작용이 발생할 수 있으므로 전문의와의 심층 상담이 필요합니다.',
  },
  {
    id: 'ba-02',
    category: 'nose',
    categoryName: '코성형',
    title: '자가연골 3D 입체 코성형 (직반버선 라인)',
    description: '비중격 및 귀연골을 활용하여 코끝 처짐을 방지하고, 비순각 98도의 이상적인 각도로 세련되고 입체적인 프로필을 연출했습니다.',
    doctorName: '원장 윤서아 성형외과 전문의',
    tags: ['직반버선', '자가비중격', '비순각교정'],
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    period: '수술 후 6개월 경과 (예시)',
    caution: '수술 후 초기 충격에 주의해야 하며, 개인 체질에 따라 회복 기간에 차이가 있을 수 있습니다.',
  },
  {
    id: 'ba-03',
    category: 'lifting',
    categoryName: '리프팅 & 동안',
    title: '미니 딥플레인 스마스(SMAS) 안면거상',
    description: '피부 표면만 당기지 않고 깊은 근막층(SMAS)과 유지인대를 함께 박리·재배치하여 어색하지 않고 10년 전 본연의 얼굴선을 되찾았습니다.',
    doctorName: '대표원장 강민우 성형외과 전문의',
    tags: ['SMAS안면거상', '귀앞미세절개', '심부볼처짐개선'],
    beforeImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    period: '수술 후 4개월 경과 (예시)',
    caution: '염증 및 흉터 예방을 위해 술, 담배를 금하고 정기적인 흉터 레이저 사후관리를 권장합니다.',
  },
  {
    id: 'ba-04',
    category: 'contour',
    categoryName: '안면윤곽',
    title: '소프트 광대축소 & 턱끝 밸런스 절골',
    description: '과도한 뼈 깎기를 배제하고 필요한 볼륨만 정밀 회전 밀어넣기하여 볼처짐 없이 매끄러운 오발(Oval) 페이스 라인을 구현했습니다.',
    doctorName: '대표원장 강민우 성형외과 전문의',
    tags: ['3D-CT시뮬레이션', '무고정밀착', '자연스러운윤곽'],
    beforeImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    period: '수술 후 8개월 경과 (예시)',
    caution: '단단한 음식 섭취를 삼가고 구강 내 청결 유지를 철저히 해야 합니다.',
  },
];

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-01',
    name: '강민우',
    role: '대표원장 / 성형외과 전문의',
    specialty: '눈·코 심미성형, SMAS 안면거상, 고난도 안면윤곽',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    quote: '성형의 참된 가치는 다른 사람의 얼굴을 흉내 내는 것이 아니라, 본래 지닌 가장 아름다운 균형을 찾아주는 데 있습니다.',
    career: [
      '성형외과 전문의 자격 취득',
      '대한성형외과학회 종신 정회원',
      '대한미용성형외과학회(KSAPS) 정회원',
      '국제성형외과학회(IPRAS) 정회원',
      '전 서울 주요 대학병원 성형외과 임상자문의',
    ],
    academic: [
      '「동양인의 안면 해부학적 특성에 따른 최소절개 안면거상술의 유효성」 발표',
      '미국 PRS(Plastic and Reconstructive Surgery) 저널 논문 게재',
      '대한성형외과학회 코성형연구회 패널 발표',
    ],
  },
  {
    id: 'doc-02',
    name: '윤서아',
    role: '원장 / 성형외과 전문의',
    specialty: '자연유착 눈매교정, 비절개 코끝성형, 동안 눈밑지방재배치',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    quote: '1mm의 미세한 곡선 차이가 전체 인상의 온화함과 조화를 결정합니다. 섬세한 여성 전문의의 시선으로 빚어냅니다.',
    career: [
      '성형외과 전문의 자격 취득',
      '대한성형외과학회 눈성형연구회 학술위원',
      '대한미용성형외과학회 정회원',
      '대한두개안면성형외과학회 정회원',
    ],
    academic: [
      '「다층 봉합술을 이용한 자연유착 쌍꺼풀의 장기 추적 관찰」 연구',
      '아시아 안면성형 심포지엄 초청 연자',
    ],
  },
  {
    id: 'doc-03',
    name: '박진형',
    role: '마취통증의학과 전문의 / 안심마취센터장',
    specialty: '성형외과 수면·전신마취 전담, 실시간 생체신호 감시, 무통 통증관리',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    quote: '수술 시작부터 회복실 퇴실까지 단 1초의 호흡 변화도 놓치지 않고 곁을 지킵니다. 안전은 타협할 수 없는 첫 번째 원칙입니다.',
    career: [
      '마취통증의학과 전문의 자격 취득',
      '대한마취통증의학회 정회원',
      '미국 심장협회 전문심폐소생술(ACLS) Provider 자격 취득',
      '온새미로 1:1 안심마취 케어 시스템 총괄 책임자',
    ],
    academic: [
      '「외래 환자 수술 마취의 신속 회복 프로토콜에 관한 임상 고찰」 연구',
      '마취 중 실시간 호기말 이산화탄소(EtCO2) 모니터링 가이드라인 수립',
    ],
  },
];

export const SAFETY_PROTOCOLS: SafetyProtocol[] = [
  {
    id: 'safety-01',
    icon: 'UserCheck',
    title: '수술 실명제 (대리수술 원천 차단)',
    subtitle: '상담한 전문의가 직접 끝까지 집도',
    description: '상담부터 수술 계획 수립, 절개, 봉합까지 담당 지정 전문의가 100% 직접 책임 집도하며 대리수술(쉐도우 닥터)을 원천 차단합니다.',
    details: [
      '환자 및 보호자 수술 집도의 실명 확인 서약서 발급',
      '수술 전 집도의 환자 대면 확인 절차(Time-out) 의무화',
      '수술 기록지 및 참여 의료진 실명 전자 서명 보관',
    ],
  },
  {
    id: 'safety-02',
    icon: 'Activity',
    title: '마취과 전문의 1:1 전담 상주',
    subtitle: '수술 시작부터 회복까지 1:1 전담 밀착 감시',
    description: '마취통증의학과 전문의가 병원 내 상주하며 수술 전 정밀 심전도 검사부터 수술 중 실시간 바이탈 감시, 수술 후 각성까지 전담합니다.',
    details: [
      '실시간 호기말 이산화탄소(EtCO2) 및 산소포화도 정밀 모니터링',
      '환자별 연령 및 체중 맞춤형 표적제어 수면마취(TCI) 장비 운용',
      '무통 주사 및 수술 후 통증 완화 자가조절장치(PCA) 제공',
    ],
  },
  {
    id: 'safety-03',
    icon: 'Video',
    title: '보호자 안심 참관 CCTV 운영',
    subtitle: '투명하고 정직한 의료 과정 실시간 열람',
    description: '수술실 내 사각지대 없는 고화질 CCTV를 설치하여 환자 및 직계 보호자의 동의하에 안전하게 수술 전 과정을 실시간 모니터링할 수 있습니다.',
    details: [
      '개인정보보호법 및 의료법 기준을 준수한 엄격한 보안 프로토콜',
      '수술 시작부터 봉합 종료까지 투명한 영상 보존 시스템',
      '원내 보호자 전용 독립 대기실 모니터 참관 지원',
    ],
  },
  {
    id: 'safety-04',
    icon: 'Zap',
    title: '무정전 전원 공급 장치 (UPS)',
    subtitle: '정전 및 비상 상황에도 멈추지 않는 수술 환경',
    description: '천재지변이나 기습 정전 시에도 수술 장비와 생명 유지 장치에 즉각 무중단 비상 전력을 공급하는 대용량 UPS 시스템을 가동합니다.',
    details: [
      '정전 발생 시 0.01초 내 자동 비상 전력 전환 시스템',
      '자동심장충격기(AED) 및 전문 기도확보 응급 카트 완비',
      '대학병원급 비상 핫라인 및 신속 응급 이송 네트워크 구축',
    ],
  },
  {
    id: 'safety-05',
    icon: 'ShieldCheck',
    title: '10단계 무균 양압 클린 수술실',
    subtitle: '대학병원급 공조 에어샤워 및 헤파필터 시스템',
    description: '미세먼지와 바이러스를 99.9% 차단하는 고성능 헤파(HEPA) 필터 양압 공조 시스템으로 수술실 내 감염 위험을 사전에 방지합니다.',
    details: [
      '수술실 내부 기압을 높여 외부 오염 공기 유입을 차단하는 양압 설비',
      '에어샤워 멸균 게이트 및 플라즈마 저온 멸균 소독기 운용',
      '1회용 멸균 수술포 및 1회용 소모품 원칙 준수',
    ],
  },
];

export const RECOVERY_STEPS: RecoveryStep[] = [
  {
    day: '당일 (Day 0)',
    title: '1인 VIP 전용 리커버리실 집중 안정',
    careDetails: [
      '마취과 전문의의 완벽한 의식 회복 및 활력징후 확인',
      '수술 부위 즉각 아이스 쿨링 팩 적용으로 초기 붓기 억제',
      '1:1 전담 간호사의 주의사항 설명 및 전용 회복 키트 증정',
    ],
    tips: '머리를 심장보다 20~30도 높게 유지하고 무리한 이동을 피하세요.',
  },
  {
    day: '1~3일차',
    title: '고압산소 챔버 & 힐라이트 레이저 케어',
    careDetails: [
      '고순도 산소를 모세혈관 깊숙이 공급하여 세포 재생 2배 촉진',
      '830nm 힐라이트(Healite II) 광선 조사로 멍과 통증 신속 완화',
      '원내 처방 소염 림프 순환 약제 복용 가이드',
    ],
    tips: '냉찜질을 48시간 지속하고 짠 음식과 자극적인 식단을 삼가세요.',
  },
  {
    day: '5~7일차',
    title: '실밥 제거 및 미세 림프 순환 트리트먼트',
    careDetails: [
      '성형외과 전문의의 상처 부위 직접 확인 및 섬세한 실밥 제거',
      '초음파 LDM 림프 드레니쥐를 통한 단단해진 조직 연화',
      '세안 및 가벼운 일상 메이크업 가능 시점 판정',
    ],
    tips: '온찜질로 전환하여 혈액 순환을 돕고 가벼운 산책을 권장합니다.',
  },
  {
    day: '2주~1개월',
    title: '흉터 방지 레이저 & 최종 라인 안착 검진',
    careDetails: [
      '프락셔널 흉터 레이저 및 의료용 실리콘 겔 처방',
      '원장단 1:1 정밀 경과 상담 및 비포애프터 3D 촬영 비교',
      '최종 잔붓기 배출을 위한 페이셜 마사지 가이드',
    ],
    tips: '자외선 차단제를 꼼꼼히 바르고 격한 운동은 4주 후부터 시작하세요.',
  },
];
