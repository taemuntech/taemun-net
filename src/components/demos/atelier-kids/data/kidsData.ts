import { AgeCurriculum, ArtworkPiece, SensoryMetric } from '../types';

export const ARTWORK_PIECES: ArtworkPiece[] = [
  {
    id: 'art-1',
    title: '우주를 여행하는 무지개 해파리',
    artistAge: '만 5세 김민준 어린이 (예시)',
    category: 'collage',
    colorTag: 'yellow',
    description: '반짝이는 홀로그램지와 한지 찢어붙이기를 통해 심해와 우주의 경계를 상상하여 표현한 비정형 입체 꼴라주입니다.',
    palette: ['#FBBF24', '#F472B6', '#60A5FA'],
  },
  {
    id: 'art-2',
    title: '숲속 동물 친구들의 비밀 티타임',
    artistAge: '만 7세 이서연 어린이 (예시)',
    category: 'clay',
    colorTag: 'green',
    description: '자연 흙 점토로 빚어낸 미니어처 찻잔과 나뭇잎 오브제를 수채 과슈로 채색한 테이블 스토리텔링 조형작품입니다.',
    palette: ['#34D399', '#A7F3D0', '#FCD34D'],
  },
  {
    id: 'art-3',
    title: '모네의 정원에서 헤엄치는 금붕어',
    artistAge: '만 9세 박도현 어린이 (예시)',
    category: 'watercolor',
    colorTag: 'blue',
    description: '물감의 번짐과 소금 기법(Salt effect)을 활용해 빛의 일렁임을 포착한 인상파 오마주 수채화입니다.',
    palette: ['#38BDF8', '#818CF8', '#C084FC'],
  },
  {
    id: 'art-4',
    title: '달콤한 마카롱 타워 도시',
    artistAge: '만 6세 정하윤 어린이 (예시)',
    category: 'mixed',
    colorTag: 'pink',
    description: '골판지와 아크릴 폼 클레이를 층층이 쌓아 올려 구조적 균형 감각을 탐구한 복합 미디어 건축 조형입니다.',
    palette: ['#FB7185', '#F43F5E', '#FED7AA'],
  },
  {
    id: 'art-5',
    title: '노을 지는 사바나의 거인 기린',
    artistAge: '만 8세 송지우 어린이 (예시)',
    category: 'watercolor',
    colorTag: 'yellow',
    description: '따뜻한 웜톤 그라데이션 위에 먹물 실루엣 펜 드로잉을 얹어 공간의 원근과 빛의 방향성을 탐구했습니다.',
    palette: ['#F59E0B', '#EF4444', '#78350F'],
  },
  {
    id: 'art-6',
    title: '기하학 패턴으로 수놓은 로봇 숲',
    artistAge: '만 11세 최건우 어린이 (예시)',
    category: 'mixed',
    colorTag: 'green',
    description: '재활용 목재와 아크릴 물감, 패브릭 테이프를 조합하여 미래 생태계의 공존을 표현한 주니어 포트폴리오작입니다.',
    palette: ['#10B981', '#064E3B', '#FDE047'],
  },
];

export const AGE_CURRICULUMS: AgeCurriculum[] = [
  {
    id: 'curri-1',
    ageGroup: '4~5세 (유아)',
    stageName: '1단계: 감각 열기 & 오감 꼴라주',
    theme: '질감과 색채를 직접 만지고 찢으며 느끼는 순수 감각 탐색',
    description: '손가락 핑거 페인팅, 천연 곡물 및 한지 꼴라주를 통해 억압 없는 자유로운 자기표현과 소근육 기초 발달을 도모합니다.',
    keySkills: ['자유로운 색채 직관', '소근육 쥐기·찢기', '정서적 애착 형성'],
    materials: ['무독성 식물성 핑거페인트', '다양한 텍스처 천연 종이', '자연 나뭇가지 & 돌'],
  },
  {
    id: 'curri-2',
    ageGroup: '6~7세 (취학 전)',
    stageName: '2단계: 스토리텔링 & 입체 조형',
    theme: '머릿속 상상과 이야기를 3차원 입체 공간으로 번역하기',
    description: '자신만의 동화적 서사를 점토, 와이어, 박스 오브제로 구축하며 공간 지각력과 논리적 조형 감각을 깨웁니다.',
    keySkills: ['내러티브 전개력', '입체 균형·구조 감각', '색상 혼합 규칙 발견'],
    materials: ['테라코타 찰흙', '아크릴 폼클레이', '우드락 및 재활용 재료'],
  },
  {
    id: 'curri-3',
    ageGroup: '8~10세 (초등 저학년)',
    stageName: '3단계: 명화 탐구 & 복합 매체',
    theme: '모네, 마티스, 피카소의 시각을 빌려 세상을 재해석하는 눈',
    description: '미술사 거장들의 표현 기법(점묘, 입체파 분할, 야수파 강렬한 원색)을 아이의 일상 시선과 융합하여 독창적인 캔버스 연작을 완성합니다.',
    keySkills: ['시각적 관찰력', '원근·명암의 기초 이해', '다양한 화구 숙련도'],
    materials: ['코튼 캔버스', '전문가용 수채과슈', '오일파스텔 & 잉크'],
  },
  {
    id: 'curri-4',
    ageGroup: '11~13세 (초등 고학년)',
    stageName: '4단계: 주니어 아티스트 & 포트폴리오',
    theme: '나만의 시각 언어를 정립하고 주제 의식을 담는 아티스트 북',
    description: '개인별 관심 테마(환경, 도시, 감정, SF)를 깊이 있게 탐구하여 개인 전시회 출품작 및 주니어 포트폴리오를 디렉팅합니다.',
    keySkills: ['작품 의도 프레젠테이션', '비례 및 해부학 기초', '심화 아크릴 테크닉'],
    materials: ['헤비바디 아크릴 물감', '판화 도구 세트', '하드커버 아티스트 북'],
  },
];

export const SENSORY_METRICS_BY_STAGE: Record<string, SensoryMetric[]> = {
  'curri-1': [
    { name: '오감 촉각 감수성', score: 96, description: '다양한 재질 촉각에 대한 민감한 반응' },
    { name: '자유 발산 몰입도', score: 94, description: '틀에 얽매이지 않는 자기주도 표현' },
    { name: '소근육 쥐기·조작', score: 85, description: '도구 쥐기와 손가락 협응 기초' },
    { name: '색채 호기심', score: 92, description: '원색 및 파스텔톤 대비에 대한 탐색' },
  ],
  'curri-2': [
    { name: '스토리텔링 상상력', score: 98, description: '작품에 서사와 캐릭터를 부여하는 능력' },
    { name: '3차원 공간 지각', score: 88, description: '입체 구조물의 중심과 높이 조율' },
    { name: '재료 융합력', score: 90, description: '점토와 종이 등 이종 재료의 결합' },
    { name: '소근육 정밀 조작', score: 91, description: '가위질과 세밀한 조형 다듬기' },
  ],
  'curri-3': [
    { name: '명화 기법 소화력', score: 92, description: '인상파·야수파 회화 원리 적용' },
    { name: '색채 조화·배색', score: 95, description: '보색과 유사색의 감각적 조율' },
    { name: '사물 정밀 관찰력', score: 89, description: '빛과 그림자, 형태 디테일 포착' },
    { name: '지속적 완성도', score: 93, description: '한 작품을 끝까지 밀도 있게 완성' },
  ],
  'curri-4': [
    { name: '작가적 주제 의식', score: 96, description: '자신만의 메시지와 철학 반영' },
    { name: '아크릴·판화 테크닉', score: 94, description: '전문 미술 화구의 능숙한 운용' },
    { name: '시각적 프레젠테이션', score: 91, description: '작품 설명 및 큐레이션 기획력' },
    { name: '포트폴리오 독창성', score: 97, description: '개성 있는 시각 언어 구축' },
  ],
};
