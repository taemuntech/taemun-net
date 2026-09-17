import { LeetQuestionAnalysis, ExamPassCase, LeetCpaCourse } from '../types';

export const LEET_QUESTIONS: LeetQuestionAnalysis[] = [
  {
    id: 'q-1',
    category: '추리논증 · 규범 및 논리퍼즐',
    title: '2025학년도 기출 32번: 조건부 진술과 공범 관계 성립 판단 (예시)',
    correctRate: '28.4% (예시)',
    passageSummary: '다수의 행위자 간 공모 의사 합치 여부와 실행 행위 분담에 관한 법적 요건을 다룬 고난도 규범 추론 문항입니다.',
    trapOption: '③번 선지 (매력적 오답률 42.1%, 예시)',
    trapRate: '42.1% (예시)',
    keyLogic: '선행 행위자의 과실과 후행 행위자의 고의를 독립적 인과관계로 잘못 오인하게 유도하는 전형적인 논리적 함정입니다.',
  },
  {
    id: 'q-2',
    category: '언어이해 · 법철학 & 규범론',
    title: '2025학년도 기출 14번: 드워킨의 법원리론과 헌법재판 (예시)',
    correctRate: '34.2% (예시)',
    passageSummary: '법실증주의와 자연법론 사이에서 권리 테제를 통해 정합적 법해석의 유일 정해(One Right Answer)를 도출하는 논증 구조입니다.',
    trapOption: '⑤번 선지 (매력적 오답률 38.6%, 예시)',
    trapRate: '38.6% (예시)',
    keyLogic: '법관의 재량권을 전면 인정하는 실증주의적 결론을 지문의 핵심 주장으로 착각하게 만든 역인과 선지입니다.',
  },
  {
    id: 'q-3',
    category: '추리논증 · 과학철학 & 확률모형',
    title: '2024학년도 기출 29번: 베이즈 정리 기반 가설 사후확률 갱신 (예시)',
    correctRate: '21.9% (예시)',
    passageSummary: '새로운 실험 증거가 추가되었을 때 기존 가설의 우도비(Likelihood Ratio)를 계산하여 최적 가설을 채택하는 수리 추론 문항입니다.',
    trapOption: '②번 선지 (매력적 오답률 51.3%, 예시)',
    trapRate: '51.3% (예시)',
    keyLogic: '기저율 오류(Base Rate Fallacy)를 간과하여 사전확률을 누락한 채 표본 확률만으로 계산하게 유도한 킬러 함정입니다.',
  },
];

export const EXAM_PASS_CASES: ExamPassCase[] = [
  {
    id: 'case-1',
    title: 'S대 로스쿨(예시) 일반전형 최초합격',
    track: '법학전문대학원 LEET',
    gpa: '학점 백분위 98.4 (예시)',
    leetScore: 'LEET 표준점수 148.2 (언어 71.4 / 추리 76.8, 예시)',
    interviewNote: '형사소송법 개정 쟁점에 관한 심층 구술면접 최고 득점 (예시)',
    summary: '비법학 전공생으로서 정밀 기출 해체를 통해 추리논증 고득점을 확보하고 서면 정성평가에서 전공 연계성을 부각했습니다.',
  },
  {
    id: 'case-2',
    title: 'K대 로스쿨(예시) 특별전형 수석합격',
    track: '법학전문대학원 LEET',
    gpa: '학점 백분위 96.8 (예시)',
    leetScore: 'LEET 표준점수 141.5 (예시)',
    interviewNote: '공익 인권법 센터 실무수습 경력 정성 포트폴리오 (예시)',
    summary: '철저한 시간 안배 훈련으로 킬러 논리퍼즐 구간을 정복하고 자기소개서 첨삭을 통해 차별화된 지원 동기를 완성했습니다.',
  },
  {
    id: 'case-3',
    title: '제60회 공인회계사(CPA) 동차 최종합격 (예시)',
    track: 'KICPA 공인회계사',
    gpa: '경영학 전공 3.8 / 4.5 (예시)',
    leetScore: '1차 합격 점수 445점 / 2차 5과목 동차합격 (예시)',
    interviewNote: '재무관리 & 세법 모의고사 전국 상위 1% 랭크 (예시)',
    summary: '회계감사 및 원가관리회계 1:1 답안 첨삭 관리반을 통해 취약 과목을 단기에 전략 과목으로 전환했습니다.',
  },
];

export const LEET_CPA_COURSES: LeetCpaCourse[] = [
  {
    id: 'course-1',
    category: 'LEET MASTER',
    title: '로스쿨 LEET 140+ 프레스티지 스파르타 종합반',
    target: '최상위 S·K·Y 로스쿨(예시) 및 인서울 대형 로스쿨 지망생',
    curriculum: [
      '형식논리학 & 기호논리 기반 논리퍼즐 10초 조건식 설계 훈련',
      '최근 15개년 전 문항 핀셋 해체 및 오답 함정(Trap) 역추적 매트릭스',
      '전국 모의고사 실전 시간 관리 및 멘탈 텔레메트리 피드백',
      '로스쿨 출신 전임 변호사의 자기소개서 & 서면 1:1 심층 크리틱',
    ],
    recommended: true,
  },
  {
    id: 'course-2',
    category: 'LEET CRITIQUE',
    title: '추리논증 킬러 정복 & 규범 수리추론 집중 단과',
    target: '추리논증 정답률 60% 정체 구간을 돌파하고자 하는 수험생',
    curriculum: [
      '법조문 요건·효과 분석 및 판례 적용형 문제 논증 도식화',
      '과학·기술 및 게임이론·확률 지문 킬러 문항 집중 풀이',
      '주 1회 실전 하프 모의고사 및 오답 취약점 1:1 대면 클리닉',
    ],
    recommended: false,
  },
  {
    id: 'course-3',
    category: 'CPA PROFESSIONAL',
    title: 'KICPA 공인회계사 1차 파이널 & 2차 동차반',
    target: '회계사 1차 객관식 총정리 및 2차 주관식 유예생',
    curriculum: [
      '재무회계·세법·원가관리·재무관리 핵심 테마 계산 구조화',
      '2차 주관식 답안지 레이아웃 및 득점 포인트 서술 테크닉',
      '4대 회계법인 출신 현직 CPA 강사진의 실전 채점 기준표 피드백',
    ],
    recommended: false,
  },
];
