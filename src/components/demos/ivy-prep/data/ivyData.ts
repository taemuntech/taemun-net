import { AdmissionCompetency, AdmissionCase, IvyCourse } from '../types';

export const RADAR_CATEGORIES: AdmissionCompetency[] = [
  {
    key: 'gpa',
    name: 'Unweighted GPA',
    score: 95,
    fullMark: 100,
    description: '최상위 AP/IB 과목 이수를 포함한 전 학년 올 A 학업 성취도',
    strategy: '9학년부터 12학년까지 점진적 상승 곡선(Upward Trend) 유지 및 학교 내 클래스 랭크 1~3% 유지',
  },
  {
    key: 'sat',
    name: 'Digital SAT / ACT',
    score: 98,
    fullMark: 100,
    description: 'Digital SAT 1560+ 또는 ACT 35+ 이상의 상위 0.1% 표준화 시험 점수',
    strategy: 'Module 2 고난도 적응형 문제 완벽 대비 및 수학 800점 만점 전략을 통한 총점 극대화',
  },
  {
    key: 'ap',
    name: 'AP / IB HL (5점)',
    score: 92,
    fullMark: 100,
    description: '전공 적합성에 맞춘 AP 8~12개 과목 이수 및 전 과목 5점 만점 달성',
    strategy: 'STEM 지망생의 경우 Calculus BC, Physics C, Chemistry 선제 5점 확보 및 리서치 연계',
  },
  {
    key: 'ec',
    name: 'Extracurricular (EC)',
    score: 90,
    fullMark: 100,
    description: '단순 참여가 아닌 창립자(Founder) 및 리더십 중심의 독보적 임팩트',
    strategy: '지역사회를 넘어 글로벌 단위로 확장된 NGO 설립 또는 특허/창업 프로젝트 스파이크 형성',
  },
  {
    key: 'honors',
    name: 'Honors & Awards',
    score: 88,
    fullMark: 100,
    description: 'USAMO/AIME, Regeneron ISEF, Scholastic Art & Writing 등 국가·국제 단위 수상',
    strategy: '전미 수학/과학 올림피아드 입상 및 권위 있는 학술 저널에 제1저자 논문 등재 가이드',
  },
  {
    key: 'essay',
    name: 'Personal Statement',
    score: 96,
    fullMark: 100,
    description: '사정관의 마음을 움직이는 독창적 스토리텔링과 지적 호기심(Intellectual Curiosity)',
    strategy: '입체적 자아 성찰과 삶의 변곡점을 조명하는 커먼앱(Common App) 및 대학별 서플먼트 에세이 완성',
  },
];

export const ADMISSION_CASES: AdmissionCase[] = [
  {
    id: 'case-1',
    studentInitials: '수강생 J* Park (예시)',
    schoolAdmitted: 'H-Univ(예시) 대학교(H-Univ) 컴퓨터과학과 합격 (예시)',
    gpa: 'Unweighted 4.0 / Weighted 4.42 (예시)',
    sat: 'Digital SAT 1580 (M800 / RW780, 예시)',
    apCount: 'AP 11과목 5점 (예시)',
    hook: '시각장애인을 위한 촉각 AI 인터페이스 오픈소스 프로젝트 개발',
    summary: '단순 코딩을 넘어 전 세계 12개국 복지관에 배포된 접근성 도구를 커먼앱 에세이 메인 테마로 입체화하여 합격을 거머쥐었습니다.',
  },
  {
    id: 'case-2',
    studentInitials: '수강생 C* Lee (예시)',
    schoolAdmitted: '필립스 아카데미 앤도버(Andover) 9학년 입학 (예시)',
    gpa: '중등 전과목 A (예시)',
    sat: 'SSAT 상위 99% (예시)',
    apCount: 'AMC 8 만점 & AMC 10 우수상 (예시)',
    hook: '청소년 모의유엔 사무총장 & 바이올린 전국 콩쿠르 최상위 입상(예시)',
    summary: '뛰어난 학업 성적과 더불어 오케스트라 악장 활동 및 독창적 다문화 리더십 인터뷰를 철저히 훈련하여 톱 보딩스쿨에 합격했습니다.',
  },
  {
    id: 'case-3',
    studentInitials: '수강생 E* Kim (예시)',
    schoolAdmitted: 'C-Univ(예시) 대학교(C-Univ) 경제학과 조기합격 (예시)',
    gpa: 'Unweighted 3.96 (예시)',
    sat: 'Digital SAT 1560 (예시)',
    apCount: 'AP 9과목 5점 (Micro, Macro, Calc BC 포함, 예시)',
    hook: '개발도상국 소상공인 마이크로크레딧 금융 데이터 분석 논문',
    summary: '경제학 이론을 실제 데이터로 증명한 리서치 포트폴리오와 C-Univ(예시) 코어 커리큘럼에 대한 열정을 담은 서플먼트로 어필했습니다.',
  },
];

export const IVY_COURSES: IvyCourse[] = [
  {
    id: 'course-1',
    category: 'FULL CONSULTING',
    title: 'Ivy & Top 20 보딩스쿨 올인원 입시 컨설팅',
    target: '8학년 ~ 12학년 아이비리그 및 명문 보딩 지망생 (예시)',
    features: [
      'H-Univ(예시)·C-Univ(예시) 출신 입시 디렉터 1:1 전담 배정 (예시)',
      '학기별 GPA 관리 및 과외활동(EC) 스파이크 맞춤 설계',
      'Common App 메인 에세이 & 대학별 서플먼트 무제한 첨삭',
      '동문 입학사정관 모의 인터뷰 및 비디오 포트폴리오 디렉팅',
    ],
    recommended: true,
  },
  {
    id: 'course-2',
    category: 'TEST PREP',
    title: 'Digital SAT 1550+ 단기 완성 프레스티지반',
    target: 'SAT 목표 점수 1500점대 돌파를 희망하는 수험생',
    features: [
      '적응형(Adaptive) 최신 모의고사 30회 및 정밀 취약점 분석',
      'Reading/Writing 고난도 어휘 및 논증 추론 핀셋 훈련',
      'Math 800점 만점을 위한 Desmos 공학용 계산기 고급 테크닉',
    ],
    recommended: false,
  },
  {
    id: 'course-3',
    category: 'ACADEMIC LAB',
    title: 'AP 전과목 5점 완성 & 명문대 리서치 멘토링',
    target: 'AP 과목 이수 및 국제 대회 출전을 준비하는 재학생',
    features: [
      'Calculus BC, Physics C, Chemistry, Econ 1:1 심화 지도',
      '아이비리그 재직 교수진 및 연구원 연계 학술 리서치 멘토링',
      'USAMO, AMC, Regeneron ISEF 경시대회 파이널 대비',
    ],
    recommended: false,
  },
];
