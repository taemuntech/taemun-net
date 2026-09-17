import { BodyRegion, RegionQuizData, TechnologyItem, DoctorProfile, RehabEquipment } from '../types';

export const CLINIC_IMAGES = {
  logo: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-09.png',
  interior: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-04.jpg',
  sling: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-05.jpg',
  spineMt: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-02.jpg',
  pilates: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-03.jpg',
  doctorPark: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-08.jpg',
  doctorChoi: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-06.jpg',
  map: '/demo-media/seoul-barun-orthopedics/seoul-barun-orthopedics-07.png',
};

export const INITIAL_QUIZ_DATA: Record<BodyRegion, RegionQuizData> = {
  neck: {
    name: '목 & 어깨 (경추·오십견)',
    label: '목 & 어깨 부위 핵심 임상 문진 (다중 선택 가능)',
    symptoms: [
      { id: 'n1', text: '고개를 뒤로 젖히거나 회전할 때 어깨와 팔 끝으로 찌릿한 저림이 있다.', checked: true },
      { id: 'n2', text: '아침에 일어났을 때 목 뒤와 승모근이 돌처럼 딱딱하고 두통이 동반된다.', checked: true },
      { id: 'n3', text: '팔을 머리 위로 들어 올릴 때 어깨 특정 각도에서 날카로운 걸림 통증이 있다.', checked: true },
      { id: 'n4', text: '밤에 통증이 있는 어깨 쪽으로 누워 자기 힘들고 야간통이 심하다.', checked: false },
      { id: 'n5', text: '손가락 끝 감각이 둔해지거나 젓가락질 시 악력이 빠지는 느낌이 든다.', checked: false }
    ],
    diagnosis: '경추 추간판 탈출증 (목 디스크 초기) 및 회전근개 긴장',
    matchRate: '78%',
    progress: 78,
    step1: { title: 'C-Arm 경추 신경성형차단술', desc: '경추 5-6번 신경근 주위 염증성 부종을 진정시키는 미세 주입' },
    step2: { title: '스톨츠 고에너지 체외충격파', desc: '승모근·견갑거근의 만성 근막통증유발점(TP) 집중 이완' },
    step3: { title: '1:1 경추 슬링(Sling) 재활', desc: '일자목·거북목 C자 커브 복원 및 목 심부 굴곡근 재교육' }
  },
  lumbar: {
    name: '허리 & 골반 (디스크·협착증)',
    label: '허리 & 골반 부위 핵심 임상 문진 (다중 선택 가능)',
    symptoms: [
      { id: 'l1', text: '의자에 30분 이상 앉아 있을 때 허리 깊숙한 곳에서 묵직한 뻐근함이 느껴진다.', checked: true },
      { id: 'l2', text: '허리를 앞으로 숙여 양말을 신거나 세수할 때 허리와 엉치가 당긴다.', checked: true },
      { id: 'l3', text: '엉덩이부터 허벅지 뒤쪽, 종아리 바깥쪽을 따라 찌릿한 방사통이 내려온다.', checked: true },
      { id: 'l4', text: '조금만 걸어도 다리가 터질 듯이 저려서 가다 서다를 반복해야 한다 (간헐적 파행).', checked: true },
      { id: 'l5', text: '기침이나 재채기를 할 때 순간적으로 허리에 심한 충격 통증이 온다.', checked: false }
    ],
    diagnosis: '요추 추간판 탈출증 (허리 디스크) 및 척추관 협착 의증',
    matchRate: '88%',
    progress: 88,
    step1: { title: 'C-Arm 요추 경막외 신경차단술', desc: '탈출된 수핵 주위 신경 부종을 직접 가라앉히는 정밀 시술' },
    step2: { title: '지능형 3D 척추감압기 (Spine MT)', desc: '척추 사이 디스크 압력을 음압으로 감압하여 자연 흡수 촉진' },
    step3: { title: '1:1 코어 다열근 도수안정화', desc: '복부 횡복근 및 골반기저근을 강화하여 허리 재발 영구 방지' }
  },
  knee: {
    name: '무릎 관절 (퇴행성·연골판)',
    label: '무릎 관절 부위 핵심 임상 문진 (다중 선택 가능)',
    symptoms: [
      { id: 'k1', text: '계단을 내려갈 때 무릎 앞쪽이나 안쪽에서 시큰거리는 통증이 발생한다.', checked: true },
      { id: 'k2', text: '양반다리(가부좌)를 하거나 쪼그려 앉을 때 무릎 관절이 찢어지듯 아프다.', checked: true },
      { id: 'k3', text: '무릎을 굽혔다 펼 때 뚝뚝거리는 마찰음이나 무언가 걸리는 느낌이 있다.', checked: false },
      { id: 'k4', text: '아침에 일어났을 때 무릎이 뻣뻣하고 30분 정도 움직여야 풀린다.', checked: false },
      { id: 'k5', text: '오래 걸으면 무릎에 열감이 오르거나 물이 찬 것처럼 붓는다.', checked: false }
    ],
    diagnosis: '초·중기 퇴행성 슬관절염 및 반월상 연골판 미세손상 의증',
    matchRate: '65%',
    progress: 65,
    step1: { title: '초음파 유도하 콘쥬란/PDRN 재생주사', desc: '관절 마찰을 완화하고 연골 기저부 손상 조직 증식 유도' },
    step2: { title: '무릎 인대 방사형 체외충격파', desc: '측부인대 및 슬개건 주변의 미세혈관 재생과 석회 방지' },
    step3: { title: '대퇴사두근 맞춤 근력 재활치료', desc: '무릎 관절 연골에 가해지는 체중 부하를 근육으로 분산' }
  },
  ankle: {
    name: '발목 & 족부 (족저근막염·아킬레스)',
    label: '발목 & 족부 부위 핵심 임상 문진 (다중 선택 가능)',
    symptoms: [
      { id: 'a1', text: '아침에 일어나 첫 발을 디딜 때 발뒤꿈치 바닥에 찢어지는 듯한 통증이 있다.', checked: true },
      { id: 'a2', text: '발목을 안쪽으로 접질린 후 붓기는 빠졌으나 계속 불안정하고 힘이 빠진다.', checked: true },
      { id: 'a3', text: '아킬레스건 주변을 손가락으로 누르면 극심한 압통이 발생한다.', checked: true },
      { id: 'a4', text: '조금만 오래 서 있거나 보행 시 발바닥 아치 부분이 쑤시고 피로하다.', checked: false },
      { id: 'a5', text: '달리기나 점프 운동 후 발뒤꿈치 위쪽 힘줄 부위가 붉게 달아오른다.', checked: false }
    ],
    diagnosis: '만성 족저근막염 및 족관절 전거비인대 만성 불안정성',
    matchRate: '75%',
    progress: 75,
    step1: { title: '집중형 초점식 체외충격파', desc: '발뒤꿈치 근막 부착부 만성 섬유화 조직 분쇄 및 자가 치유 촉진' },
    step2: { title: '초음파 유도 인대강화 프롤로테라피', desc: '느슨해진 발목 인대를 두껍게 강화하여 재접질림 방지' },
    step3: { title: '족부 동적 밸런스 도수교정 & 인솔 처방', desc: '발목 내외번 불균형 및 평발 보행 패턴 1:1 맞춤 교정' }
  }
};

export const TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'eswt',
    badge: '독일 스톨츠사 집중형(Focus) & 방사형(Radial)',
    badgeClass: 'bg-primary/10 text-primary',
    techNum: 'TECHNOLOGY 01',
    title: '고에너지 체외충격파 치료 (Storz Medical ESWT)',
    description: '초음파 속도로 전파되는 강력한 음파 에너지가 손상된 힘줄과 인대 조직 깊숙이 침투하여 석회성 침착물을 분쇄하고, 신생 혈관 생성을 촉진하여 자연 치유 과정을 극대화합니다.',
    targetConditions: '석회성건염, 족저근막염, 테니스엘보',
    specs: [
      { label: '적용 주요 질환', value: '석회성건염, 족저근막염' },
      { label: '침투 깊이', value: '최대 125mm 심부 타겟', highlight: true },
      { label: '시술 시간', value: '1회당 약 10~15분' }
    ],
    footerNote: '마취 및 절개 불필요 / 당일 즉시 일상생활 복귀',
    linkText: '상세 프로세스 보기',
    fullDetail: {
      overview: '독일 명품 스톨츠(STORZ)사의 최고 사양 장비 2종(집중형+방사형)을 동시 구비하여, 병변의 깊이와 질환의 성격에 맞춰 입체적으로 에너지를 전달합니다.',
      mechanism: '충격파가 미세 손상 부위에 물리적 자극을 전달하면 모세혈관 재형성과 성장인자(VEGF) 분비가 급증하여 만성 퇴행성 병변이 급성 치유 반응으로 전환됩니다.',
      targetPatients: ['어깨 석회성건염 환자', '만성 족저근막염으로 첫발 딛기 힘든 분', '팔꿈치 테니스/골프엘보 통증', '아킬레스건염 및 슬개건염'],
      procedureSteps: ['정밀 초음파로 병변 위치 및 석회 크기 특정', '환자 개별 통증 역치에 맞춘 충격파 타수 및 에너지 조절', '집중형 충격파로 심부 석회 분쇄', '방사형 충격파로 주변 근막 및 긴장대 이완'],
      precautions: '시술 후 1~2일간 뻐근한 일시적 반응이 올 수 있으며, 이는 자가 치유가 시작되는 정상적 과정입니다.'
    }
  },
  {
    id: 'prolo',
    badge: '고해상도 정밀 초음파 유도',
    badgeClass: 'bg-[#007D73] text-[#C5FFF5]',
    techNum: 'TECHNOLOGY 02',
    title: '프롤로 인대강화 & PDRN DNA 주사',
    description: '실시간 초음파 모니터링을 통해 0.1mm 단위로 미세 손상 인대와 연골 부위를 식별한 뒤, 고농도 포도당 및 연어 추출 DNA 물질을 주입하여 인대 본연의 두께와 탄성을 복원합니다.',
    targetConditions: '회전근개파열, 테니스엘보, 무릎인대손상',
    specs: [
      { label: '시술 방식', value: '실시간 HD 초음파 유도' },
      { label: '처방 원칙', value: '스테로이드 No-Steroid', highlight: true },
      { label: '치료 주기', value: '2~3주 간격 3~5회' }
    ],
    features: [
      '약화된 만성 인대의 근본적 증식 및 강화',
      '스테로이드 미사용(No-Steroid) 안심 처방 원칙'
    ],
    footerNote: '회전근개파열, 테니스엘보, 무릎인대손상',
    linkText: '자세히',
    fullDetail: {
      overview: '인체 무해한 고농도 포도당 용액(Prolotherapy)과 연어 정소에서 추출한 세포 재생 활성물질 PDRN을 결합하여, 인대와 힘줄의 조직 재생 속도를 3배 이상 단축시킵니다.',
      mechanism: '손상 부위에 조절된 국소 염증 반응을 유도하여 섬유아세포를 자극하고, 콜라겐 섬유의 합성을 증대시켜 늘어지고 얇아진 인대를 두껍고 견고하게 재구축합니다.',
      targetPatients: ['어깨 회전근개 부분파열 환자', '발목 인대 만성 불안정증', '무릎 십자인대/측부인대 부분 손상', '목/허리 후관절 인대 이완 환자'],
      procedureSteps: ['고해상도 근골격계 초음파로 손상 인대 정밀 측정', '소독 및 최소 침습 국소마취', '실시간 니들 트래킹으로 손상 부위 정확 주입', '시술 직후 안정 및 주의사항 교육'],
      precautions: '치료 기간 동안 소염진통제(NSAIDs) 복용을 피하셔야 자가 증식 반응이 원활히 촉진됩니다.'
    }
  },
  {
    id: 'carm',
    badge: 'HD 영상증폭 투시장비',
    badgeClass: 'bg-[#D5E0F8] text-[#586377]',
    techNum: 'TECHNOLOGY 03',
    title: 'C-Arm 정밀 영상유도 척추신경차단술',
    description: '움직이는 X-ray라 불리는 첨단 C-Arm을 통해 척추 신경관과 디스크 탈출 부위를 실시간 투시하며, 신경 유착을 박리하고 급성 부종을 즉각 진정시키는 특수 주사 치료법입니다.',
    targetConditions: '허리·목 디스크 급성 방사통 진정 특화',
    specs: [
      { label: '시술 소요시간', value: '약 5분 내외 완료' },
      { label: '치료 후 회복', value: '30분 안정 후 귀가 가능', highlight: true }
    ],
    footerNote: '허리·목 디스크 급성 방사통 진정 특화',
    linkText: '자세히',
    fullDetail: {
      overview: '수술실 수준의 C-Arm 영상 장비를 시술실에 상시 배치하여, 척추 뼈 사이 1mm 이하의 미세 신경공까지 실시간으로 투시하면서 정확히 타겟팅합니다.',
      mechanism: '탈출된 수핵과 신경근 사이에 발생한 염증성 사이토카인과 유착을 생리식염수와 특수 항염 제재로 부드럽게 세척·박리하여 즉각적인 통증 차단을 달성합니다.',
      targetPatients: ['목/허리 디스크로 인한 극심한 팔다리 저림', '척추관 협착증으로 100m도 걷기 힘든 분', '수술을 권유받았으나 비수술을 우선 희망하는 분', '급성 요추 염좌로 거동이 불가능한 환자'],
      procedureSteps: ['C-Arm 장비 하에서 목표 신경공 위치 조준', '조영제를 미량 투여하여 약물 퍼짐 경로 안전 확인', '신경 염증 부위에 정밀 치료 약제 주입', '회복실에서 20~30분 안정 후 당일 보행 귀가'],
      precautions: '시술 당일은 무리한 사우나나 격렬한 운동을 자제하고 편안한 휴식을 권장합니다.'
    }
  },
  {
    id: 'cryo',
    badge: '-78℃ 신속 항염 & 고출력 레이저',
    badgeClass: 'bg-[#89F5E7] text-[#00201D]',
    techNum: 'TECHNOLOGY 04',
    title: '극저온 크라이오(Cryo) & HILT 고강도 레이저',
    description: '영하 78℃의 급속 냉각 이산화탄소 가스로 피부 온도를 급랭하여 신경 수용체의 통증 전달 경로를 일시 차단하고, 고강도 레이저의 광생체 반응으로 세포 내 미토콘드리아 ATP 생성을 자극합니다.',
    targetConditions: '수술 후 통증 증후군 및 운동선수 급성 외상 케어',
    specs: [
      { label: '극저온 치료', value: '-78℃ CO2 급속 냉각' },
      { label: 'HILT 레이저', value: '세포 내 ATP 합성 촉진', highlight: true }
    ],
    features: [
      '극저온 신경반사 치료: 발목 염좌, 급성 인대 염증 부종 급속 진정',
      'HILT 고출력 레이저: 관절강 내부 심부 세포 대사 활성화'
    ],
    footerNote: '수술 후 통증 증후군 및 운동선수 급성 외상 케어',
    linkText: '치료 안내',
    fullDetail: {
      overview: '프로 스포츠 구단 및 국가대표 선수촌에서 애용되는 비침습 급성 진통·항염 콤비네이션 솔루션입니다.',
      mechanism: '극저온 냉각 가스가 혈관을 급속 수축 후 반사적으로 확장시켜 림프 순환을 4배 가속하며, HILT 고출력 레이저 파장이 심부 10cm까지 도달하여 손상 세포의 에너지 대사를 부활시킵니다.',
      targetPatients: ['발목을 심하게 접질려 퉁퉁 부은 환자', '관절 수술 후 잔여 열감과 부종이 있는 분', '운동 중 햄스트링/종아리 근육 파열', '급성 건초염 및 관절염 활액막염'],
      procedureSteps: ['적외선 체열 검사로 급성 염증 부위 확인', '크라이오 노즐로 환부 온도 2~4℃ 급속 냉각 유도', 'HILT 레이저를 관절강 심부 조사하여 통증 완화', '치료 부위 기능적 테이핑 보강'],
      precautions: '비침습 치료이므로 통증과 흉터가 전혀 없으며 즉시 일상 스포츠 복귀가 가능합니다.'
    }
  }
];

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'park',
    name: '박진우',
    title: '대표원장 / 정형외과 전문의',
    role: '척추센터장',
    centerBadge: '척추센터장',
    badgeBg: 'bg-primary/90 text-on-primary',
    quote: '“척추 질환의 90% 이상은 수술 없이 호전될 수 있습니다. 환자의 관절과 디스크를 최대한 지켜내는 것이 정형외과의 기본입니다.”',
    credentials: [
      '국내 명문 A대학(예시) 의과대학 졸업 및 정형외과 외래교수',
      '국내 명문 A대학(예시) 대학병원(예시) 정형외과 척추외과 전임의',
      '정형외과학회(예시) / 척추외과학회(예시) 정회원',
      'AO Spine 국제 척추 연구기구 공인 코스 수료'
    ],
    specialties: ['경추·요추 디스크', '척추관 협착증', 'C-Arm 신경차단술', '디스크 고주파 수핵감압술'],
    image: CLINIC_IMAGES.doctorPark
  },
  {
    id: 'choi',
    name: '최윤석',
    title: '원장 / 정형외과 전문의',
    role: '관절·스포츠의학 센터장',
    centerBadge: '관절·스포츠의학 센터장',
    badgeBg: 'bg-[#007D73]/90 text-white',
    quote: '“통증 없는 관절의 움직임이 진정한 활력의 시작입니다. 관절 연골 보존과 정밀 프롤로 치료로 통증의 뿌리를 해결합니다.”',
    credentials: [
      '국내 명문 의과대학(예시) 대학병원(예시) 정형외과 전임의',
      '슬관절학회(예시) / 견주관절의학회(예시) 평생회원',
      '스포츠의학회(예시) 분과전문의 자격 취득',
      '전 프로야구 및 프로축구 구단 필드 진료 주치의'
    ],
    specialties: ['무릎 퇴행성 관절염', '어깨 오십견·회전근개', '프롤로·PDRN 주사', '발목 연골손상 재활'],
    image: CLINIC_IMAGES.doctorChoi
  }
];

export const REHAB_EQUIPMENT: RehabEquipment[] = [
  {
    id: 'sling',
    title: '슬링(Sling) 중력무부하 척추안정화',
    badge: '독일 오리지널 Redcord',
    badgeBg: 'bg-primary text-on-primary',
    description: '천장에 고정된 로프를 이용해 체중 부하를 제거한 상태에서, 평소 활성화되지 않던 심부 다열근과 횡복근을 정밀하게 강화하여 만성 척추 불안정성을 근본 교정합니다.',
    targetCases: '수술 후 재활 / 척추측만증 / 일자목',
    highlightTag: '1:1 코칭',
    image: CLINIC_IMAGES.sling,
    features: ['노르웨이/독일 수입 오리지널 레드코드 시스템', '체중 부하 0% 상태에서 무통증 운동 가능', '척추 심부 고유수용성 감각 수용기 재훈련']
  },
  {
    id: 'spine-mt',
    title: '3D 지능형 척추감압기 (Spine MT)',
    badge: '첨단 로봇 3D 감압',
    badgeBg: 'bg-[#007D73] text-white',
    description: '탈출된 디스크 분절만을 정밀 산출하여 해당 척추간 공간에 단계적 음압(Negative Pressure)을 형성, 튀어나온 디스크가 자연스럽게 본래 위치로 흡수되도록 유도합니다.',
    targetCases: '허리·목 디스크 / 척추관 협착증',
    highlightTag: '통증 무자극',
    image: CLINIC_IMAGES.spineMt,
    features: ['경추/요추 3차원 트위스트 및 감압 알고리즘', '디스크 내부 압력을 -150~-200mmHg 감압 유도', '수술 위험 환자 및 고령 협착증 환자도 안전 시행']
  },
  {
    id: 'pilates',
    title: '메디컬 기구 필라테스 & 체형교정',
    badge: '체형·골반 교정',
    badgeBg: 'bg-secondary text-white',
    description: '정밀 체형 분석 장비(Exbody) 데이터를 토대로 골반 틀어짐, 휜 다리, 굽은 등을 바로잡으며 일상 생활 속 잘못된 보행 패턴과 자세 습관을 영구 재교육합니다.',
    targetCases: '골반 부정렬 / 라운드숄더 / 거북목',
    highlightTag: '맞춤 시퀀스',
    image: CLINIC_IMAGES.pilates,
    features: ['의학적 근골격 평가 기반 1:1 맞춤 기구 세팅', '캐딜락, 리포머, 체어를 활용한 관절 가동성 증진', 'Exbody 3D 정적/동적 체형 측정 전후 비교']
  }
];
