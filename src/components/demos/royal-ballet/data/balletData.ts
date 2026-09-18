import { BalletCourse, BalletPosition, PerformanceItem } from '../types';

export const BALLET_POSITIONS: BalletPosition[] = [
  {
    id: 1,
    name: '제1번 포지션',
    frenchName: 'Première Position',
    turnoutAngle: '180° 완전 외회전 (Full Turnout)',
    centerOfGravity: '양 발뒤꿈치 사이 수직 중심축',
    muscleEngagement: ['둔근(대둔근·중둔근) 내회전 방지', '내전근(허벅지 안쪽) 밀착', '코어 복횡근 수축'],
    description: '뒤꿈치를 완전히 붙이고 발가락 끝을 바깥쪽으로 수평 정렬하는 클래식 발레의 가장 기초이자 핵심적인 서 있는 자세입니다.',
  },
  {
    id: 2,
    name: '제2번 포지션',
    frenchName: 'Seconde Position',
    turnoutAngle: '180° 외회전 + 어깨너비 간격',
    centerOfGravity: '양 발 사이 1.5족장 중앙 균등 분배',
    muscleEngagement: ['대퇴사두근 상향 신장', '골반 수평 안정화', '견갑골 하강 및 폴드브라 지지'],
    description: '1번 포지션에서 양 발뒤꿈치를 어깨너비만큼 벌린 자세로, 도약과 착지 및 플리에(Plié)의 안정적인 기저면을 제공합니다.',
  },
  {
    id: 3,
    name: '제3번 포지션',
    frenchName: 'Troisième Position',
    turnoutAngle: '160°~180° 교차 외회전',
    centerOfGravity: '앞뒤 발 사이 교차 지점',
    muscleEngagement: ['발목 안정근', '비복근 및 가자미근 지지', '척추 기립근 상체 업라이트'],
    description: '한쪽 발의 뒤꿈치가 반대쪽 발의 아치 중앙에 닿도록 교차하는 자세로, 주니어 발레리나의 5번 포지션 적응 단계에서 주로 훈련됩니다.',
  },
  {
    id: 4,
    name: '제4번 포지션',
    frenchName: 'Quatrième Position',
    turnoutAngle: '180° 평행 전후 분할',
    centerOfGravity: '앞발과 뒷발 사이 1족장 전후 균형',
    muscleEngagement: ['장요근 골반 전방 경사 방지', '햄스트링 텐션', '발바닥 3점 지지(아치 보호)'],
    description: '5번 자세에서 한 발을 앞쪽으로 1족장만큼 내민 자세로, 피루엣 회전의 도약 준비 및 아라베스크 진입의 핵심 축입니다.',
  },
  {
    id: 5,
    name: '제5번 포지션',
    frenchName: 'Cinquième Position',
    turnoutAngle: '180° 완전 밀착 교차 (Tight Cross)',
    centerOfGravity: '앞발 엄지발가락과 뒷발 뒤꿈치 수직선',
    muscleEngagement: ['심부 외회전근(Obturator)', '골반저근 및 횡격막 호흡 연동', '종아리 비복근 텐션'],
    description: '앞발의 뒤꿈치가 뒷발의 엄지발가락 관절과 빈틈없이 맞물리는 가장 세련되고 난도 높은 클래식 발레의 시그니처 자세입니다.',
  },
];

export const BALLET_COURSES: BalletCourse[] = [
  {
    id: 'course-1',
    title: '바가노바 영재 입시반 (예중·예고·한예종)',
    target: '예원학교·선화예고·국립국악고 및 한예종 무용원 목표 (예시)',
    method: '러시아 정통 바가노바(Vaganova) 8단계 메소드',
    description: '정밀한 턴아웃 골반 정렬과 상체 폴드브라의 음악적 호흡을 바탕으로 전국 콩쿠르 상위 입상 및 명문 무용과 실기를 전담 지도합니다.',
    curriculum: [
      '해부학적 턴아웃 스트레칭 & 바레(Barre) 테크닉',
      '센터 알레그로(도약) 및 포인트 슈즈 토슈즈 적응 클리닉',
      '클래식 바리에이션(Solo) 1:1 작품 디렉팅',
      '실전 무대 의상 착용 모의 오디션 시뮬레이션',
    ],
    schedule: '주 5회 집중 클래스 (예시)',
  },
  {
    id: 'course-2',
    title: '해외 유수 발레단 및 무용원 유학 프로페셔널 트랙',
    target: '영국 로열발레학교·러시아 바가노바·모나코 그레이스 왕립 지망생',
    method: '영국 RAD(Royal Academy of Dance) & 현대무용 레퍼토리',
    description: '해외 발레단 오디션 필수 레퍼토리와 컨템포러리 무용 즉흥 표현력을 융합하여 글로벌 컴퍼니 입단을 지원합니다.',
    curriculum: [
      '해외 콩쿠르(로잔, YAGP 등) 출품작 포트폴리오 영상 촬영',
      '컨템포러리 무용 플로어워크 및 즉흥 안무 훈련',
      '영국·러시아 발레 마스터 초청 인터내셔널 워크숍',
      '해외 무용단 이력서(CV) 및 오디션 비디오 에디팅',
    ],
    schedule: '주 4회 심화 레퍼토리 (예시)',
  },
  {
    id: 'course-3',
    title: '성인 클래식 발레 & 바레 체형 교정 살롱',
    target: '아름다운 신체 라인과 코어 정렬을 원하는 성인 애호가 및 전공자',
    method: '프랑스 파리 오페라 스타일 우아한 아다지오',
    description: '무리한 관절 꺾임 없이 해부학적 원리에 입각하여 거북목, 골반 불균형을 교정하고 우아한 근력과 유연성을 기릅니다.',
    curriculum: [
      '매트 코어 필라테스 & 관절 가동성 증진',
      '클래식 바레 워크 & 앙드당/앙드오르 회전 기초',
      '우아한 상체 에폴망(Épaulment)과 손끝 시선 처리',
      '성인 아마추어 정기 갈라 공연 무대 경험',
    ],
    schedule: '오전/저녁 선택 클래스 (예시)',
  },
];

export const PERFORMANCE_ITEMS: PerformanceItem[] = [
  {
    id: 'perf-1',
    title: '백조의 호수 (Swan Lake) 中 오딜 바리에이션',
    composer: 'P. I. Tchaikovsky',
    role: '흑조 오딜 (Odile)',
    dancer: '김채원 원생 (예시)',
    year: '2026',
    award: '전국 무용 콩쿠르 대상 수상작 (예시)',
  },
  {
    id: 'perf-2',
    title: '지젤 (Giselle) 1막 中 바리에이션',
    composer: 'Adolphe Adam',
    role: '지젤 (Giselle)',
    dancer: '박예린 원생 (예시)',
    year: '2025',
    award: '예원학교 무용과 수석 합격 (예시)',
  },
  {
    id: 'perf-3',
    title: '돈키호테 (Don Quixote) 中 키트리 캐스터네츠',
    composer: 'Ludwig Minkus',
    role: '키트리 (Kitri)',
    dancer: '이지민 원생 (예시)',
    year: '2025',
    award: '선화예고 실기 우수 장학생 (예시)',
  },
];
