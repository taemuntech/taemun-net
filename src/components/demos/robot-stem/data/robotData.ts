import { RobotPart, StemProject, RobotCourse } from '../types';

export const ROBOT_PARTS: RobotPart[] = [
  {
    id: 'part-gripper',
    name: '2핑거 정밀 그리퍼 (End Effector)',
    category: '기구 구동부',
    spec: '서보 토크 2.5kg·cm / 최대 파지폭 65mm',
    explodedOffset: { x: 0, y: -70 },
    description: '고무 패드가 장착된 집게로 다양한 물체의 형상과 무게를 감지하여 정밀하게 파지합니다.',
  },
  {
    id: 'part-arm',
    name: '카본 복합재 암 링크 (Arm Linkage)',
    category: '경량 프레임',
    spec: '3K 카본 파이버 / 무게 45g',
    explodedOffset: { x: -60, y: -20 },
    description: '초경량 고강도 탄소섬유 링크로 모터 관성을 줄이고 고속 포지셔닝 정밀도를 확보합니다.',
  },
  {
    id: 'part-servos',
    name: '메탈 기어 디지털 서보모터 x4',
    category: '액추에이터',
    spec: '0.08sec/60° 정밀도 / 작동 전압 6.0V',
    explodedOffset: { x: 60, y: 0 },
    description: '각 관절의 180도 PWM 각도 제어를 담당하는 고내구성 메탈 기어 서보모터 유닛입니다.',
  },
  {
    id: 'part-controller',
    name: 'ESP32 로보틱스 MCU 보드',
    category: '제어 컴퓨터',
    spec: '듀얼코어 240MHz / Wi-Fi & BLE 내장',
    explodedOffset: { x: 0, y: 70 },
    description: '센서 피드백을 실시간 연산하고 모터 구동 펄스를 생성하는 로봇 두뇌 제어 보드입니다.',
  },
];

export const STEM_PROJECTS: StemProject[] = [
  {
    id: 'proj-1',
    title: '자율주행 라인트레이서 & 장애물 회피 로버',
    author: '수강생 정*호 (초등 6학년, 예시)',
    category: '자율주행 모빌리티',
    hardware: '적외선 5채널 센서 + 초음파 거리 센서',
    software: 'C++ PID 속도 제어 알고리즘',
    description: '급커브와 교차로 구간에서 감속 및 조향각을 실시간 보정하여 주행 이탈률 0%를 달성한 프로젝트입니다.',
  },
  {
    id: 'proj-2',
    title: 'AI 비전 기반 색상별 큐브 분류 로봇팔',
    author: '수강생 김*린 (중등 2학년, 예시)',
    category: '머신비전 & 매니퓰레이터',
    hardware: '4자유도 로봇암 + 광학 카메라 모듈',
    software: 'OpenCV 색상 추적 및 역기구학(IK)',
    description: '카메라로 컨베이어 벨트 위의 빨강·파랑·노랑 블록을 판별하여 지정된 상자에 자동 적재합니다.',
  },
  {
    id: 'proj-3',
    title: 'IoT 스마트 온실 자동 급수 생태 탐사 봇',
    author: '수강생 박*진 (초등 5학년, 예시)',
    category: '환경 센싱 & 사물인터넷',
    hardware: '토양 수분 센서 + 마이크로 워터 펌프',
    software: '블록코딩 클라우드 텔레메트리',
    description: '토양의 습도 데이터를 Wi-Fi로 전송하고 최적 수분량에 도달할 때까지 펌프를 스마트 제어합니다.',
  },
];

export const ROBOT_COURSES: RobotCourse[] = [
  {
    id: 'course-1',
    title: 'K-로봇대회 & FLL 국제 청소년 공학반',
    target: '초등 5학년 ~ 중등 3학년 로봇 공학 영재 (예시)',
    duration: '주 1회 180분 + 대회 시즌 집중 캠프',
    description: '기계 기구학, 센서 융합, 팀워크 기반 미션 완수를 통해 국내외 유수 로봇대회 상위 입상을 목표로 합니다.',
    curriculum: [
      '미션 필드 맵 분석 및 로봇 동역학 구조 최적화',
      '자이로·엔코더 모터 복합 오차 보정 주행 테크닉',
      '공학적 혁신성 프레젠테이션 심층 질의응답 면접',
    ],
    recommended: true,
  },
  {
    id: 'course-2',
    title: '아두이노 & 마이크로컨트롤러 피지컬 컴퓨팅반',
    target: '초등 3학년 ~ 초등 6학년 입문/심화',
    duration: '주 1회 120분 하드웨어 실습',
    description: '브레드보드 회로 결선부터 센서 데이터 처리, C++ 기초 문법까지 전자기학의 기초를 손으로 익힙니다.',
    curriculum: [
      'LED, 저항, 옴의 법칙 및 디지털/아날로그 I/O',
      '초음파·온습도·적외선 센서 모듈 응용 프로젝트',
      'DC 모터 드라이버 및 블루투스 무선 원격 제어',
    ],
    recommended: false,
  },
  {
    id: 'course-3',
    title: 'ROS 2 기반 AI 자율주행 & 매니퓰레이터 심화반',
    target: '중등 2학년 ~ 고등학생 SW/로봇 전공 지망생',
    duration: '주 1회 150분 Linux & Python 실습',
    description: '현대 로봇 공학의 표준인 ROS 2 환경에서 SLAM 라이다 맵핑과 인공지능 비전 추적을 구현합니다.',
    curriculum: [
      'Ubuntu Linux 환경에서의 노드 간 토픽/서비스 통신',
      '2D 라이다 센서를 이용한 Cartographer 실시간 맵핑',
      '역기구학(Inverse Kinematics) 6축 로봇팔 제어',
    ],
    recommended: false,
  },
];
