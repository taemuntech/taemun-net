import { TrackChannel, VocalTrackSample, VocalCourse, StudioGear } from '../types';

export const INITIAL_TRACKS: TrackChannel[] = [
  { id: 'track-1', name: 'Lead Vocal (Lead)', category: 'vocal', volume: 85, isMuted: false, isSolo: false, color: '#EC4899' },
  { id: 'track-2', name: 'Grand Piano (Comping)', category: 'piano', volume: 75, isMuted: false, isSolo: false, color: '#38BDF8' },
  { id: 'track-3', name: 'Acoustic Bass (Groove)', category: 'bass', volume: 70, isMuted: false, isSolo: false, color: '#F59E0B' },
  { id: 'track-4', name: 'Brush Drums (Rhythm)', category: 'drum', volume: 65, isMuted: false, isSolo: false, color: '#10B981' },
];

export const VOCAL_SAMPLES: VocalTrackSample[] = [
  {
    id: 'sample-1',
    title: 'Midnight Serenade (자작곡 데모)',
    artist: '수강생 이*아 (예시)',
    genre: 'R&B / Soul',
    bpm: 78,
    key: 'Db Major',
    duration: '03:24',
    description: '호흡의 디테일과 가성-진성 전환(Passaggio)을 살린 감성 보컬 레코딩 트랙입니다.',
  },
  {
    id: 'sample-2',
    title: 'Neon Skyline (오디션 제출작)',
    artist: '수강생 박*진 (예시)',
    genre: 'K-POP Pop Dance',
    bpm: 116,
    key: 'F# Minor',
    duration: '02:58',
    description: '파워풀한 벨팅(Belting) 발성과 정확한 음정 피치를 강조한 기획사 제출용 데모입니다.',
  },
  {
    id: 'sample-3',
    title: 'Rainy Cafe (실기 모의평가)',
    artist: '수강생 정*우 (예시)',
    genre: 'Jazz Ballad',
    bpm: 64,
    key: 'Bb Major',
    duration: '04:12',
    description: '풍부한 흉성 공명과 섬세한 비브라토 컨트롤이 돋보이는 실기 입시 연주곡입니다.',
  },
];

export const VOCAL_COURSES: VocalCourse[] = [
  {
    id: 'course-1',
    title: 'K-POP 기획사 오디션 & 비주얼 레코딩반',
    target: '주요 연예기획사 비공개 내방 오디션 준비생 (예시)',
    duration: '주 2회 보컬 트레이닝 + 월 2회 멀티트랙 스튜디오 레코딩',
    description: '개인별 음색 맞춤 톤 메이킹, 마이크 테크닉, 무대 제스처 및 카메라 레코딩 모니터링을 진행합니다.',
    features: [
      '대형 기획사 캐스팅 디렉터 정기 내방 오디션 기회 제공 (예시)',
      '프로페셔널 프로툴스(Pro Tools) 보컬 튠 및 믹싱 완성본 음원 납품',
      '고화질 4K 라이브 클립 영상 포트폴리오 제작 연계',
    ],
    recommended: true,
  },
  {
    id: 'course-2',
    title: '명문 실용음악과 수시·정시 입시 마스터반',
    target: 'S실용예대(예시)·H예대(예시)·D동아(예시) 보컬 전공 수험생',
    duration: '주 2회 전임교수 1:1 레슨 + 매주 실전 모의 실기 평가',
    description: '초견 가창, 리듬 시창, 스캣(Scat) 즉흥 표현 및 심사위원 질의응답 면접까지 원스톱으로 코칭합니다.',
    features: [
      '실용음악과 전임 외래교수진의 1:1 심층 크리틱 (예시)',
      '실전 고사장 음향 환경을 재현한 앰프/마이크 모의 리허설',
      '입시곡 맞춤 피아노 반주 MR 커스텀 편곡 지원',
    ],
    recommended: false,
  },
  {
    id: 'course-3',
    title: '싱어송라이터 자작곡 음원 발매 프로덕션반',
    target: '나만의 오리지널 곡으로 정식 음원을 발매하고자 하는 창작자',
    duration: '주 2회 탑라인 작곡 + 보컬 디렉팅 + 스튜디오 마스터링',
    description: '가사 작사부터 멜로디 빌드업, 전문 보컬 세션 레코딩, 믹싱/마스터링 및 유통 배급까지 총괄합니다.',
    features: [
      '개인 음원 멜론/스포티파이 글로벌 음원 플랫폼 정식 발매 지원 (예시)',
      '전문 작곡가와의 1:1 코드 프로그레션 및 탑라인 작곡 코칭',
      '노이만 U87 콘덴서 마이크 및 아발론 프리앰프 풀트랙 세션',
    ],
    recommended: false,
  },
];

export const STUDIO_GEAR: StudioGear[] = [
  {
    category: 'Microphones',
    model: 'U87 Ai / TLM 103',
    brand: 'Neumann (예시)',
    description: '전 세계 하이엔드 레코딩 스튜디오 표준 보컬 콘덴서 마이크로 초고해상도 숨소리까지 포착합니다.',
  },
  {
    category: 'Preamp & Channel Strip',
    model: 'VT-737sp Vacuum Tube',
    brand: 'Avalon Design (예시)',
    description: '클래스 A 진공관 프리앰프와 광학 컴프레서로 풍부하고 따뜻한 보컬 하모닉스를 완성합니다.',
  },
  {
    category: 'Audio Interface & DSP',
    model: 'Apollo x8p Heritage Edition',
    brand: 'Universal Audio (예시)',
    description: '실시간 UAD 니브(Neve)·1176 빈티지 아날로그 에뮬레이션 제로 레이턴시 트래킹을 지원합니다.',
  },
  {
    category: 'Acoustic Monitoring',
    model: 'KH 120 II DSP + Genelec 8330A',
    brand: 'Neumann & Genelec (예시)',
    description: '정밀 보정 룸 어쿠스틱 시스템으로 왜곡 없는 정확한 보컬 밸런스를 모니터링합니다.',
  },
];
