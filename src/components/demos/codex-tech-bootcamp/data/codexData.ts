import { StudentProject, BootcampCourse, CommitDay } from '../types';

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    title: 'FlowSync: CRDT 기반 초저지연 실시간 협업 화이트보드 SaaS',
    category: 'Full-Stack / Distributed System',
    summary: '웹소켓과 Yjs CRDT를 결합하여 동시 200명 접속 시에도 충돌 없는 실시간 다자간 벡터 드로잉 및 노션 스타일 블록 에디터를 구현했습니다.',
    techStack: ['Next.js 15', 'TypeScript', 'Yjs CRDT', 'WebSockets', 'Tailwind CSS', 'Redis Pub/Sub'],
    metrics: 'P99 동기화 지연시간 < 24ms 달성 (예시)',
    team: '수강생 8기 3팀 (프론트 2 / 백엔드 2, 예시)',
  },
  {
    id: 'proj-2',
    title: 'JurisMind: 하이브리드 RAG 기반 AI 판례·법률 질의응답 플랫폼',
    category: 'AI Engineering / NLP',
    summary: '대법원 판례 12만 건을 임베딩하고 벡터 검색(Dense)과 BM25(Sparse)의 하이브리드 검색으로 환각률을 3% 미만으로 억제한 도메인 특화 법률 AI 비서입니다.',
    techStack: ['Python FastAPI', 'LangChain', 'Qdrant Vector DB', 'Claude 3.5 Sonnet API', 'React 19'],
    metrics: '법률 벤치마크 정확도 91.4% (예시)',
    team: '수강생 9기 1팀 (AI 엔지니어 3, 예시)',
  },
  {
    id: 'proj-3',
    title: 'QuantForge: 고빈도 호가 데이터 실시간 백테스팅 퀀트 엔진',
    category: 'High-Performance Backend',
    summary: 'Go 언어 기반 비동기 파이프라인과 ClickHouse 시계열 DB를 사용하여 10년 치 초 단위 호가 데이터를 8초 만에 백테스팅하는 금융 엔진입니다.',
    techStack: ['Go 1.22', 'ClickHouse', 'Apache Kafka', 'Next.js Dashboard', 'Docker'],
    metrics: '초당 150,000건 틱 데이터 처리 (예시)',
    team: '수강생 8기 5팀 (백엔드 3, 예시)',
  },
];

export const BOOTCAMP_COURSES: BootcampCourse[] = [
  {
    id: 'course-1',
    phase: 'STAGE 01',
    title: '컴퓨터 사이언스 핵심 & 모던 풀스택 아키텍처',
    duration: '1~6주차 (월~금 몰입 480시간)',
    description: '자료구조, 알고리즘, 네트워크, 운영체제(OS)의 CS 기본기를 다지고 TypeScript 기반 Next.js App Router와 RDBMS 정규화를 완벽히 마스터합니다.',
    topics: [
      '자료구조 & 알고리즘 100제 풀이 및 시간/공간 복잡도 분석',
      'TypeScript 심화 타입 시스템 & React Server Component(RSC) 아키텍처',
      'PostgreSQL 인덱싱 원리, 트랜잭션 격리 수준(ACID) 및 ORM 설계',
    ],
    recommended: false,
  },
  {
    id: 'course-2',
    phase: 'STAGE 02',
    title: '대규모 분산 백엔드 & 클라우드 인프라 (DevOps)',
    duration: '7~12주차 (월~금 몰입 480시간)',
    description: '단일 서버의 한계를 넘어 Redis 캐싱, Kafka 이벤트 브로커, Docker 컨테이너라이징, AWS ECS 무중단 CI/CD 파이프라인을 직접 구축합니다.',
    topics: [
      'Redis 분산 락(Distributed Lock)과 세션 클러스터링',
      'Apache Kafka 기반 이벤트 주도 아키텍처(EDA) 구현',
      'Docker 멀티스테이지 빌드 & GitHub Actions 무중단 Blue/Green 배포',
    ],
    recommended: true,
  },
  {
    id: 'course-3',
    phase: 'STAGE 03',
    title: '엔터프라이즈 AI 엔지니어링 & 실전 프로덕션 론칭',
    duration: '13~16주차 (월~금 몰입 320시간)',
    description: '현업 수준의 실무 프로젝트를 팀별로 기획부터 론칭까지 완수합니다. LLM RAG 파이프라인과 모델 모니터링 체계를 갖춘 실제 SaaS를 배포합니다.',
    topics: [
      'LangChain & Vector DB 기반 하이브리드 검색 RAG 엔진 개발',
      'OpenTelemetry & Grafana/Prometheus 실시간 시스템 APM 관제',
      '빅테크 현직 시니어 개발자 1:1 심층 코드 리뷰 및 모의 테크 면접',
    ],
    recommended: false,
  },
];

// 16주간의 가상 커밋 데이터 생성 (7x16 그리드)
export const COMMIT_HEATMAP: CommitDay[][] = Array.from({ length: 16 }, (_, weekIdx) => {
  return Array.from({ length: 7 }, (_, dayIdx) => {
    const isWeekend = dayIdx === 5 || dayIdx === 6;
    const baseCount = isWeekend ? Math.floor(Math.random() * 3) : Math.floor(Math.random() * 8) + 2;
    const count = weekIdx === 15 && dayIdx > 4 ? 0 : baseCount;
    const msgs = [
      'feat: implement redis distributed lock',
      'fix: resolve memory leak in websocket connection',
      'perf: optimize postgresql composite index query',
      'test: add e2e testing with playwright',
      'refactor: extract custom auth middleware',
      'feat: integrate rag vector embedding pipeline',
      'docs: update swagger openapi specs',
    ];
    return {
      date: `2026. W${weekIdx + 1}-D${dayIdx + 1}`,
      week: weekIdx + 1,
      count,
      commitMsg: count > 0 ? msgs[(weekIdx * 7 + dayIdx) % msgs.length] : 'No commits on this day',
    };
  });
});
