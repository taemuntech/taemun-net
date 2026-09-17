import { PolyhedronData, MathCourse, EulerProblem } from '../types';

export const POLYHEDRONS: PolyhedronData[] = [
  {
    id: 'tetrahedron',
    name: 'Regular Tetrahedron',
    koreanName: '정사면체 (Regular Tetrahedron)',
    vertices: 4,
    edges: 6,
    faces: 4,
    shape: '정삼각형 4개',
    description: '가장 단순한 3차원 볼록 다면체로, 각 꼭짓점에 3개의 정삼각형이 모입니다. V - E + F = 4 - 6 + 4 = 2 성립.',
  },
  {
    id: 'cube',
    name: 'Regular Hexahedron (Cube)',
    koreanName: '정육면체 (Cube)',
    vertices: 8,
    edges: 12,
    faces: 6,
    shape: '정사각형 6개',
    description: '3차원 공간을 빈틈없이 채울 수 있는 유일한 플라톤 입체입니다. V - E + F = 8 - 12 + 6 = 2 성립.',
  },
  {
    id: 'octahedron',
    name: 'Regular Octahedron',
    koreanName: '정팔면체 (Regular Octahedron)',
    vertices: 6,
    edges: 12,
    faces: 8,
    shape: '정삼각형 8개',
    description: '정육면체의 쌍대다면체(Dual Polyhedron)로, 각 면의 중심을 연결하면 정육면체가 됩니다. V - E + F = 6 - 12 + 8 = 2 성립.',
  },
  {
    id: 'dodecahedron',
    name: 'Regular Dodecahedron',
    koreanName: '정십이면체 (Regular Dodecahedron)',
    vertices: 20,
    edges: 30,
    faces: 12,
    shape: '정오각형 12개',
    description: '황금비율(1:1.618)과 정오각형의 대칭성이 극대화된 아름다운 입체입니다. V - E + F = 20 - 30 + 12 = 2 성립.',
  },
  {
    id: 'icosahedron',
    name: 'Regular Icosahedron',
    koreanName: '정이십면체 (Regular Icosahedron)',
    vertices: 12,
    edges: 30,
    faces: 20,
    shape: '정삼각형 20개',
    description: '정십이면체의 쌍대입체로, 3차원 구에 가장 가까운 부피 효율을 가집니다. V - E + F = 12 - 30 + 20 = 2 성립.',
  },
];

export const MATH_COURSES: MathCourse[] = [
  {
    id: 'course-1',
    title: 'KMO 올림피아드 1차·2차 입상 대비반',
    target: '초등 5학년 ~ 중등 2학년 수학 영재',
    schedule: '주 2회 회당 180분 + 주말 실전 모의고사 (예시)',
    description: '정수론, 기하학, 대수학, 조합론 4대 영역의 심층 증명 및 창의적 발상 테크닉을 집중 훈련합니다.',
    curriculum: [
      '정수론: 합동식, 페르마의 소정리, 오일러 파이 함수',
      '기하학: 방심, 체바·메넬라오스 정리, 원과 비례',
      '대수학: 코시-슈바르츠 부등식, 다항식의 근과 계수',
      '조합론: 비둘기집 원리, 생성함수, 점화식 해법',
    ],
    recommended: true,
  },
  {
    id: 'course-2',
    title: '영재학교·과학고 3단계 심층 구술면접반',
    target: 'S과학영재교(예시)·H과학고(예시) 지망 중3 수험생',
    schedule: '주 3회 실전 구술 토론 + 면접관 1:1 크리틱 (예시)',
    description: '단순 답안 작성을 넘어 수학적 사고의 논리 전개 과정과 창의적 반례 제시 역량을 평가위원 앞에서 구술 시뮬레이션합니다.',
    curriculum: [
      '수학적 귀납법과 모순 증명법(귀류법) 심층 구술',
      '다면체 단면 및 극한 개념 융합 열린 문항 탐구',
      '역대 기출 문제 핀셋 분석 및 블라인드 심층 면접',
    ],
    recommended: false,
  },
  {
    id: 'course-3',
    title: '초등 심화사고력 & 수학적 모델링 Lab',
    target: '초등 3학년 ~ 5학년 수학 잠재력 우수생',
    schedule: '주 1회 150분 교구 실습 & 탐구 리포트 (예시)',
    description: '공식 암기 이전 교구 조작과 수학사적 배경 탐구를 통해 자발적 문제 발견 능력과 직관적 통찰력을 형성합니다.',
    curriculum: [
      '입체기하 교구를 통한 오일러 지표 및 위상수학 입문',
      '암호학(Cryptography)과 소수의 성질 탐구 프로젝트',
      '프랙탈 차원과 자연계 속 피보나치 수열 시각화',
    ],
    recommended: false,
  },
];

export const SAMPLE_PROBLEMS: EulerProblem[] = [
  {
    id: 'prob-1',
    title: '오일러 직선(Euler Line)과 무게중심의 2:1 내분 증명',
    category: '기하',
    difficulty: 'KMO 1차 수준 (예시)',
    question: '삼각형 ABC에서 외심 O, 무게중심 G, 수심 H가 한 직선 위에 있음을 보이고, OG : GH = 1 : 2임을 벡터를 활용해 증명하시오.',
    keyInsight: '삼각형의 세 꼭짓점을 원점으로 하는 위치벡터의 합과 수심의 벡터적 성질 OH = OA + OB + OC 를 연계합니다.',
    steps: [
      'Step 1: 외심 O를 원점으로 설정하고 OA, OB, OC의 위치벡터를 각각 a, b, c라 둔다.',
      'Step 2: 무게중심 G의 위치벡터는 g = (a + b + c) / 3 이다.',
      'Step 3: 수심 H의 위치벡터가 h = a + b + c 임을 수직성(Dot Product = 0)으로 증명한다.',
      'Step 4: h = 3g 이므로 O, G, H는 한 직선 위에 있으며 OH = 3 OG, 즉 OG : GH = 1 : 2 가 성립한다.',
    ],
  },
  {
    id: 'prob-2',
    title: '오일러 다면체 정리의 평면 그래프 귀환 증명',
    category: '조합',
    difficulty: '영재교 심층 구술 (예시)',
    question: '연결된 평면 그래프(Connected Planar Graph)에서 꼭짓점 수 V, 모서리 수 E, 면의 수 F에 대해 V - E + F = 2가 성립함을 수학적 귀납법으로 증명하시오.',
    keyInsight: '모서리 수 E에 대한 수학적 귀납법 또는 사이클(폐곡선)의 유무를 기준으로 트리를 분할하여 면의 수를 축소합니다.',
    steps: [
      'Step 1: 사이클이 없는 경우(트리), E = V - 1 이고 면은 외부 영역 1개뿐(F = 1)이므로 V - (V - 1) + 1 = 2 가 항상 성립한다.',
      'Step 2: 사이클이 있는 경우, 사이클 상의 모서리 하나를 제거하면 새로운 그래프 G\'는 연결성을 유지하고 면의 수는 1 감소(F\' = F - 1), 모서리는 1 감소(E\' = E - 1)한다.',
      'Step 3: 귀납 가정에 의해 V - E\' + F\' = 2 가 성립하므로, V - (E - 1) + (F - 1) = V - E + F = 2 가 성립한다.',
    ],
  },
];
