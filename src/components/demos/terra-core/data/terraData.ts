import { StrataZone, GeotechMaterial, TbmSpec } from '../types';

export const TBM_SPEC: TbmSpec = {
  diameter: '14.2m (초대구경)',
  thrustForce: '220,000 kN (예시)',
  torque: '34,500 kNm (예시)',
  cutterDiscs: '78기 19인치 롤러 (예시)',
  advanceRate: '일 최대 18m 굴진 (예시)',
  liningSegments: '8+1 분할 키 블록 (예시)',
};

export const STRATA_ZONES: StrataZone[] = [
  {
    id: 'zone-shallow',
    depth: '지하 0m ~ 15m',
    strataName: 'Alluvium & Urban Transit Layer',
    koreanName: '도심 매립·충적층 및 지하철 입체 환승 인프라',
    description:
      '상부 도심 고층 빌딩군과 도로 하부를 침하 없이 통과하는 비개착 특수 토목 구간입니다. 지반 변위를 밀리미터 단위로 자동 계측하며 지하철 본선 구조물과 직결합니다.',
    spec: '지반 침하 허용치 5mm 미만 정밀 계측 (예시)',
    safetyFactor: '안전율 2.45 초과 달성 (예시)',
    image: '/portfolio/terra-core/terra-01.jpg',
    hotspots: [
      {
        title: '도심 지하철 입체 환승 본선',
        description: '지하 4층 규모 도심 지하철 플랫폼과 직결되는 대공간 굴착 단면입니다.',
        x: 32,
        y: 82,
      },
      {
        title: '지하 연속벽(Diaphragm Wall)',
        description: '지하수 유입을 차단하고 토압을 지탱하는 철근콘크리트 연속벽체입니다.',
        x: 18,
        y: 46,
      },
      {
        title: '러기드 현장 감리 관제팀',
        description: '초정밀 라이다 스캐너와 실시간 침하 계측 태블릿으로 24시간 안전을 모니터링합니다.',
        x: 74,
        y: 78,
      },
    ],
  },
  {
    id: 'zone-weathered',
    depth: '지하 15m ~ 35m',
    strataName: 'Weathered Rock & Underpinning',
    koreanName: '풍화암층 및 인접 초고층 언더피닝 보강 구간',
    description:
      '지하수압과 불균일 토압이 복합 작용하는 풍화암 구간으로, 자천공 마이크로파일과 고압 분사 교반(JSP) 공법을 통해 상부 기초를 완벽하게 보호합니다.',
    spec: '마이크로파일 하중 1,200kN 지지력 확보 (예시)',
    safetyFactor: '허용 침하각 1/500 이내 제어 (예시)',
    image: '/portfolio/terra-core/terra-04.jpg',
    hotspots: [
      {
        title: '자천공 마이크로파일 천공기',
        description: '협소한 지중 공간에서 암반까지 직접 강관을 삽입해 지지력을 극대화합니다.',
        x: 24,
        y: 72,
      },
      {
        title: '디지털 지질 주상도 대조',
        description: '시추 주상도와 실제 굴착 암질 지수(RQD)를 실시간으로 비교 분석합니다.',
        x: 72,
        y: 35,
      },
      {
        title: '로봇 숏크리트 1차 지보',
        description: '굴착 즉시 급결재를 포함한 고강도 숏크리트를 뿜어붙여 암반 이완을 차단합니다.',
        x: 78,
        y: 74,
      },
    ],
  },
  {
    id: 'zone-softrock',
    depth: '지하 35m ~ 60m',
    strataName: 'Soft Rock TBM Drive Sector',
    koreanName: '연암층 14.2m 대구경 쉴드 TBM 복선 굴진 현장',
    description:
      '단단한 연암층을 직경 14.2m 쉴드 TBM으로 무진동 굴착하며 복선 고속철도 터널을 시공하는 핵심 토목 구간입니다. 전면 커터헤드가 암반을 깎고 후방에서 세그먼트를 즉각 조립합니다.',
    spec: '일 평균 굴진 속도 16m 달성 (예시)',
    safetyFactor: '이토압 균형 100% 자동 유지 (예시)',
    image: '/portfolio/terra-core/terra-02.jpg',
    hotspots: [
      {
        title: '14.2m 텅스텐 카바이드 커터헤드',
        description: '분당 2~3회전하며 암반을 파쇄하는 78기의 특수 합금 디스크 롤러 커터입니다.',
        x: 48,
        y: 44,
      },
      {
        title: '고압 수냉식 슬러리 배출 라인',
        description: '파쇄된 암반 슬러리를 지상 처리 플랜트로 고속 압송하는 배관 시스템입니다.',
        x: 88,
        y: 28,
      },
      {
        title: '22만 kN 유압 추진 잭',
        description: '조립된 세그먼트 링을 발판 삼아 기체 전체를 전진시키는 메가 유압 실린더입니다.',
        x: 78,
        y: 68,
      },
    ],
  },
  {
    id: 'zone-bedrock',
    depth: '지하 60m ~ 80m (대심도)',
    strataName: 'Hard Bedrock & Deep Cavern',
    koreanName: '대심도 화강암반 및 초고압 차수 침매터널 연결 챔버',
    description:
      '지하 80m의 8.4bar에 달하는 거대한 정수압을 버텨내는 완벽한 방수 세그먼트 터널입니다. 고속철도 열차와 유지보수 궤도 차량이 운행되는 영구적 지하 랜드마크입니다.',
    spec: '설계 수명 120년 고내구성 콘크리트 (예시)',
    safetyFactor: '수압 10bar 수밀 시험 통과 (예시)',
    image: '/portfolio/terra-core/terra-03.jpg',
    hotspots: [
      {
        title: '영구 쉴드 세그먼트 라이닝',
        description: '균열 제어 강섬유와 수팽창 개스킷으로 결합된 방수 콘크리트 링 구조체입니다.',
        x: 52,
        y: 32,
      },
      {
        title: '궤도 유지보수 특수 차량',
        description: '레이저 센서로 레일 평탄도와 터널 단면 변위를 0.1mm 정밀도로 검측합니다.',
        x: 35,
        y: 68,
      },
      {
        title: '비상 대피 및 환기 제트팬 갱도',
        description: '화재 및 비상시 승객 안전 확보를 돕는 양압 환기 제어 챔버입니다.',
        x: 62,
        y: 22,
      },
    ],
  },
];

export const GEOTECH_MATERIALS: GeotechMaterial[] = [
  {
    id: 'mat-segment',
    name: 'C60 강섬유 고내구성 세그먼트 콘크리트',
    category: '터널 라이닝 쉴드 구조재',
    spec: '압축강도 60MPa 이상, 강섬유 35kg/m³ 혼입 (예시)',
    strength: '내화 3시간 RABT 화재 곡선 만족 (예시)',
    feature: '미세 균열 자가 치유 및 염해 차단',
    description:
      '대심도 지하수압(8bar 이상)을 견디는 프리캐스트 터널 세그먼트입니다. 인장 균열을 방지하는 강섬유와 초고강도 시멘트 배합으로 120년 이상의 장기 내구성을 목표로 설계되었습니다 (예시).',
    image: '/portfolio/terra-core/terra-05.jpg',
  },
  {
    id: 'mat-gasket',
    name: 'EPDM 복합 수팽창 방수 개스킷',
    category: '세그먼트 조인트 차수재',
    spec: '수팽창 배율 250%, 복원율 95% 이상 (예시)',
    strength: '수밀 성능 1.5MPa (수압 15bar 대응) (예시)',
    feature: '침하·지진 시 조인트 변위 자동 추종 차수',
    description:
      '세그먼트 링 간의 미세한 틈새로 지하수가 침투하지 못하도록 막아주는 고탄성 EPDM 고무 패킹과 수팽창 폴리머의 2중 하이브리드 지수재입니다.',
    image: '/portfolio/terra-core/terra-05.jpg',
  },
  {
    id: 'mat-rockbolt',
    name: 'SD500 고장력 전나선 록볼트 & 구면 와셔',
    category: '암반 지반 보강 앵커재',
    spec: '인장강도 650MPa, 항복강도 500MPa 이상 (예시)',
    strength: '인발 내력 220kN 확보 (예시)',
    feature: '단단한 경암층과 지반의 일체화 구속 효과',
    description:
      '터널 굴착 직후 암반의 이완을 방지하기 위해 천공홀에 수지를 주입하고 고장력 강봉을 정착시켜 지반 자체의 전단 강도를 극대화하는 핵심 지보재입니다.',
    image: '/portfolio/terra-core/terra-05.jpg',
  },
  {
    id: 'mat-grout',
    name: '초미립자 무수축 규산염 그라우트재',
    category: '지반 고결 및 차수 주입재',
    spec: '블리딩률 0%, 28일 압축강도 35MPa (예시)',
    strength: '투수계수 1.0×10⁻⁸ cm/sec 미만 (예시)',
    feature: '미세 절리 틈새 0.1mm 완벽 침투 고결',
    description:
      '쉴드 TBM 후방의 뒤채움 그라우팅과 연약지반 급속 차수에 사용되는 친환경 무수축 주입재입니다. 지하수 오염 없이 지반의 지지력을 급속으로 상승시킵니다.',
    image: '/portfolio/terra-core/terra-05.jpg',
  },
];
