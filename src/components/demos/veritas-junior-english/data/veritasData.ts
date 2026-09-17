import { LexileBook, EnglishCourse, VeritasFaculty } from '../types';

export const LEXILE_BOOKS: LexileBook[] = [
  {
    id: 'book-1',
    title: 'The Whispering Forest',
    author: 'Emily Watson (예시)',
    lexile: 280,
    arLevel: 1.8,
    targetAge: '7세 ~ 초등 1학년',
    genre: 'Fantasy / Early Reader',
    summary: '숲속 동물들의 모험을 통해 기초 사이트워드(Sight Words)와 파닉스 블렌딩을 자연스럽게 습득하는 원서입니다.',
    keyVocabulary: ['whisper', 'acorn', 'curious', 'glimmer'],
    coverColor: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'book-2',
    title: 'Mystery at St. Jude Island',
    author: 'Jonathan Reed (예시)',
    lexile: 520,
    arLevel: 3.2,
    targetAge: '초등 2~3학년',
    genre: 'Adventure / Detective',
    summary: '섬의 등대에서 벌어지는 비밀을 풀며 과거시제와 형용사 묘사 구문을 집중 학습하는 챕터북입니다.',
    keyVocabulary: ['lighthouse', 'investigate', 'clue', 'shadowy'],
    coverColor: 'from-blue-600 to-indigo-900',
  },
  {
    id: 'book-3',
    title: 'The Clockwork Alchemist',
    author: 'Sarah Kensington (예시)',
    lexile: 780,
    arLevel: 5.1,
    targetAge: '초등 4~5학년',
    genre: 'Historical Sci-Fi',
    summary: '빅토리아 시대를 배경으로 스팀펑크 기계 장치와 과학적 상상력을 융합한 심층 디베이트용 뉴베리 후보작 원서입니다.',
    keyVocabulary: ['chronometer', 'hypothesis', 'metallurgy', 'revolution'],
    coverColor: 'from-amber-600 to-orange-900',
  },
  {
    id: 'book-4',
    title: 'Echoes of the Constitutional Hall',
    author: 'Dr. Arthur Vance (예시)',
    lexile: 1040,
    arLevel: 7.4,
    targetAge: '초등 6학년 ~ 예비중',
    genre: 'History / Social Studies',
    summary: '미국 독립선언문과 민주주의 담론을 영어 원문으로 독해하고 아카데믹 에세이를 작성하는 최상위 영재 프로그램 교재입니다.',
    keyVocabulary: ['sovereignty', 'inalienable', 'amendment', 'perspective'],
    coverColor: 'from-purple-600 to-violet-950',
  },
];

export const ENGLISH_COURSES: EnglishCourse[] = [
  {
    id: 'course-1',
    levelName: 'Sprout Immersion (킨더 몰입반)',
    targetGrade: '유치부 7세 ~ 초등 1학년',
    lexileRange: '200L ~ 400L',
    description: '원어민 담임제 환경에서 소리와 글자의 관계를 깨우치고 영어 그림책 100권 읽기를 달성합니다.',
    weeklySchedule: '주 5회 매일 80분 (예시)',
    keyOutcomes: [
      '파닉스 단모음/장모음 및 사이트워드 220단어 마스터',
      '문장 단위 기초 구두 스피킹 & 감정 표현 발화',
      '오감 놀이형 원어민 리더스 북클럽 연계',
    ],
  },
  {
    id: 'course-2',
    levelName: 'Junior Scholar (챕터북 리딩 & 스피치반)',
    targetGrade: '초등 2학년 ~ 초등 3학년',
    lexileRange: '450L ~ 700L',
    description: '뉴베리 수상작 챕터북 다독과 북리포트 작성, 주 1회 주제별 프레젠테이션 스피치를 훈련합니다.',
    weeklySchedule: '주 3회 회당 110분 (예시)',
    keyOutcomes: [
      '논리적 인과관계 파악 및 비판적 텍스트 독해',
      '주제별 3분 영어 프레젠테이션 발표력 배양',
      '5문장 패러그래프(Paragraph) 라이팅 구조화',
    ],
    badge: '인기 프로그램',
  },
  {
    id: 'course-3',
    levelName: 'Prestige Honors (아카데믹 디베이트반)',
    targetGrade: '초등 4학년 ~ 초등 6학년',
    lexileRange: '750L ~ 1100L+',
    description: '시사·과학·인문 복합 지문을 바탕으로 칼 포퍼(Karl Popper) 식 의회 토론과 학술 소논문 에세이를 완성합니다.',
    weeklySchedule: '주 2회 회당 150분 (예시)',
    keyOutcomes: [
      '미국 중학교 수준 교과 텍스트 아카데믹 리딩',
      '논거 제시형 5문단 에세이 첨삭 및 완성',
      '국제 청소년 영어 디베이트 모의 토론 출전 대비',
    ],
  },
];

export const FACULTY_MEMBERS: VeritasFaculty[] = [
  {
    name: 'Sarah Jenkins (예시)',
    role: '주니어 리딩 디렉터',
    almaMater: 'Columbia University 영문학 (예시)',
    experience: '국제학교 ESL 커리큘럼 설계 12년 (예시)',
    specialty: '렉사일 맞춤형 심층 독서 지도',
  },
  {
    name: 'Michael Davis (예시)',
    role: '아카데믹 디베이트 수석 코치',
    almaMater: 'Oxford University 정치철학 (예시)',
    experience: '아시아 청소년 디베이트 대회 심사위원 (예시)',
    specialty: '비판적 사고 및 설득적 스피치',
  },
  {
    name: 'Claire Moreau (예시)',
    role: '파닉스 & 초기 리터러시 전임',
    almaMater: 'UC Berkeley 교육학 (예시)',
    experience: '미국 사립 유치부 교원 자격 (예시)',
    specialty: '유아·초등 초기 발음 교정 & 스토리텔링',
  },
];
