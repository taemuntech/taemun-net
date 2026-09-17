import { BeforeAfterCase, RoadmapStage, DoctorProfile } from '../types';

export const CLINIC_IMAGES = {
  logoProfile: 'https://lh3.googleusercontent.com/aida/AEtjO1UgOzBxasnj30qTFsb974fh5r24K04W3BkV_sS-coZZ-lUtnr1S3keZKnLmGj_P0xPtCQ6cL9u78JcL_xVopnw7oD3_wOGzUlrkGmr6OS6GyFwpGjz085mx8XDsHTRDReJaOZsnP8ymlBsfWa_psEk3fWhQ78CtSI7c6ml4qIuYAszrso1FPGsC59ZFkBfLX-xSWcspqEucqVHa2zl4i1rmPECD3YiL8wlNEBAQsVdDKEtTSVU2e07rv78',
  heroModel: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBotHgAqgRJxbwEeRYWCVqYsdlellV-I-upeLoa1Pcwdi4rKblDbDMT5syprqtSfh3OLIFvpGw20nXcRJbLDsRDMMzofGM2hbJewoM5b6nHdpjbhvde-DBHvElmkqYBAcCSh3U4OnB6tGUjKN-70ojHmxzi_J36mVJyBaqwqYuOZ0EVaDpKYFjjWWlLcAcoJFYFmhyBaWSO1Wy-puoX6TuTMox0JqtD2QoQSbM2WwEJt9d2Vr58WkSjZQ',
  philosophyNatural: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzz1yNKuTlkt0MfT7pH1HjGhUY1tC-L8_F_6DzZsiUZyEHW3pM_JKWy2yzvcF_AY-fOyOR9BHg6zAg12Hvw4VgKf18wfvWOAnyJMQ4GZRpQ2IvJ4zFJJVZhk-3N-rwxQL2fvkqCoW4sAPRylBP41kS8nlSuddmO-5G0kWkHXW4bvP3zJoECCbF44Nlk-Bo7Ko4MRrBhlLexbWq-Wrs32YjdFlVXv_CS0-wYoo71S_dtQrbl0U4_ZgFyw',
  philosophySuture: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3wIwj4tyQxITmD61czpbjakEq9KeQDVlV76M-5uao9UaFdpnZ6TJ3emRbOCR7E9ksJmstVatdj9QxXFswMMQF9ErzCjl7y6xNBHdDG0t2gxbiUy2ZU59vodTHCVXmQtuEyPGFm74mhGi114UfIXd-4smxsabkUbag8xeuhKnTVHk95ZRyQWl1ZJQfFs9Kg1BmEf9LoNpCJ-WlMF68lX2_qbPmw2Nz03FKjiSAc7h8rPYarES6OjHWPA',
  eyeAfter: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnRlxBNdmCFfz9-ED4Uc9EU7LCMcOOV3LiZNvZZkn8elrnbRny_1XWGt_0GBunsUHnjujF0JXZacgXJQZrh4jMS5j4xbZwCMZ3lqgTFz1koYDq-prVchmcwuXLSj8h9bSMAIEWR1dY8T2HziIUDKq6lV9DXZ-rI2yk8BEHd-cbmxkwIFdJehaVfUBr881b_u1pbZBQXE5sUjR1tVUWRtQpTi5-9sjmqOQXj6a6UU3bqNOor4w5tS4TVg',
  eyeBefore: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1MChQsBld_b1E1o-_-AiF41kVgVOxdKw0SBvkuiHLngeKkrdWce52Tm8jKHHq1yeNbegxmIepZctH75TqFKcZ7wf17d4aC287gfpaLZzo0tPcCp8kw8j6cvd3FnQ_z9QhQ-TITYknND-0zsJSEaOIdYImRb2DDb7Le5z_Nf6Awo9LO59I8SAVV81S-xy4L_oVcUElNenaFpS0NzL6WqOtIvjePTBTzeF5qU2xNrnk_AI6BclFW0vEmA',
  recoverySuite: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUErukH6XHN2rqXucMOdQCRxyx1j8B5OzqdWr7bNMOovSCs5WqPGtmKV9KCfsf6et2GFf_3aw81SpK3k89pB-pkktLSlrhPKe2CbHdwLlC8R2PMVptzuVfuwkjkvxE19pLZZuUPOmDfLERPm1h_KEgQ-O32qFQI1rmrR63A6xKetwlBXcSUD21ADyoyLvEEuPGdolnkjYKz6ffUQea0LZ6275n2OnKdYRH-Fr3Xq0pmhN_ZzGOXFLmrQ',
  doctorKang: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR0qAi2ZPFEJbG3Oe6URJwuwg-c0sUdtPTAUYeqWjjq9v2OkGc3W6SH_9aHuaJdpn1rKXyyprNnxrwkH7Zg76anQGj6W6qTgI53nniGuAW7vu4T2JMHxzsjAvqKAgksx1az0iV4Z02SnbrcwDtvPskgxLqwDXN4yCIWKzhBF3hAlQsQUQORGwp0iPpfsOTon_Yis9x61cB0NuyOKe-J0tsVncTsl0NERFTWS1b8XGI9QucuvwHLj-IqQ',
  doctorYoon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVH2OVx1K0iBuDysXdfzjzLQdiQYzuXY-BNgc8CNb_OZZIo6xpheYVF_zi_2bEayg6OaMOwZGpvMgHIvnMCqQp8SH6cORgO1DRqkkE4_vVHuiE-SVvt-p7ePLackELfXCZ8yShNfRfqdzfNwS-z7bslhCQNOy0QV3_DjXNYNNKU24iMkb1Zei62VnY6h0U7DAcyp7oWiGOMRMV8gykRmsKJLyHvA-yeHtmZAj5ajC0xQ_KqKa4auajpg',
  doctorPark: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmwXgmaflbuXBlaXwnJTEfFl__1vvHb8oWmCbU-aiUdVn-w4MT_4_u8IkuoxWi3MrXH7YFFt_oF0wOBd_tmAeQLvCCqSMl8YSJ1ybf-KsVb9D1okG49XtuT1s1BvSuciLV0i6OhcnbVoTYlifTc0t8cbu4Wa6qDmSQrxEPnLIjRkT-Asn_WXC3umTL83aMmUeVfcFfAKl8coGmDgXZ2hWF5PGANub4pnpJdEgA0TNtl2AA3_tSO_OAYA',
  mapView: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn-30R1IwxTpi_rH6pTYStVEDXjc6vOc4JBu_CMim-sbeAW1uoxEo-x71jap2JfFyY8_qifL7VzC68lNQ57oJY_fmh05EMu6bcVPJZOW0fKcWGzpnufa8eD1CvsymxhwbKSqvuuQqFbpSDTZCe8bvUNjTiRM26jbqKg97Fchyi6xxpYowJCAW8G8xB_7kV1Uy9SPVtzIbsXu6beSu4xJBt4v8xX2_P0x4YoT4actke02YpAz3L5mPjTA'
};

export const BEFORE_AFTER_CASES: Record<string, BeforeAfterCase> = {
  eye: {
    id: 'case-eye',
    category: 'eye',
    title: '자연유착 인아웃 라인 쌍꺼풀 + 비절개 눈매교정',
    subtitle: '피부 절개 없이 미세 홀을 통한 6포인트 연속 결찰',
    desc: '절개 없이 미세 홀을 통한 6포인트 연속 결찰로 풀림 방지 및 붓기 4일만 완화',
    beforeImg: CLINIC_IMAGES.eyeBefore,
    afterImg: CLINIC_IMAGES.eyeAfter,
    recoveryPeriod: '4~6일 (메이크업 가능)',
    keyPoints: ['피부 절개 흉터 최소화 설계', '안검하수 0.8mm 정밀 리프팅', '자연스러운 인아웃 라인 도출']
  },
  nose: {
    id: 'case-nose',
    category: 'nose',
    title: '무보형물 비중격 자가연골 코성형 (직반버선 라인)',
    subtitle: '실리콘 이물감 없는 자가 생체 조직 재건',
    desc: '실리콘 이물질 없이 자가 비중격 연골로만 코끝을 세워 비순각 98도 자연스러움 도출',
    beforeImg: CLINIC_IMAGES.philosophyNatural,
    afterImg: CLINIC_IMAGES.heroModel,
    recoveryPeriod: '7일 (부목 및 테이핑 제거)',
    keyPoints: ['보형물 비침 및 염증 우려 영구 배제', '비순각 98° 여성스러운 곡선미', '콧볼 미세 축소 병행']
  },
  lift: {
    id: 'case-lift',
    category: 'lift',
    title: '미니 SMAS 안면거상 + 심부볼 정밀 리프팅',
    subtitle: '귀 뒤 헤어라인 미세 절개선으로 흉터 눈에 띄지 않게 배치',
    desc: '귀 뒤 미세 절개선으로 흉터 은폐, 처진 턱선과 팔자주름을 근막층부터 2중 견인',
    beforeImg: CLINIC_IMAGES.eyeBefore,
    afterImg: CLINIC_IMAGES.philosophyNatural,
    recoveryPeriod: '5~7일 (일상생활 복귀)',
    keyPoints: ['피부 표면이 아닌 SMAS 근막층 박리', '팔자주름 및 이중턱 동시 개선', '자연스러운 귀 형태 보존']
  }
};

export const ROADMAP_STAGES: Record<string, RoadmapStage> = {
  day0: {
    id: 'day0',
    stageName: '수술 당일',
    stageBadge: 'STAGE 01 · SURGERY DAY',
    title: '냉각 림프 순환 케어 & 프라이빗 스위트 휴식',
    description: '수술 직후 전용 1인 스위트에서 미세 출혈을 예방하는 쿨링 패치 처치와 힐라이트 II 진정 광선을 1차 적용합니다. 전문 간호사가 1:1로 바이탈을 점검하며 안전한 귀가를 지원합니다.',
    residualEdemaPct: 100,
    badge: '초기 진정 프로토콜 가동',
    careDetails: ['전용 1인 회복 스위트 배정', '힐라이트 II 진정 광선 1차 조사', '미세 압박 드레싱 및 얼음팩 제공']
  },
  day3: {
    id: 'day3',
    stageName: '3일차 (피크 붓기)',
    stageBadge: 'STAGE 02 · DAY 03 (PEAK EDEMA)',
    title: '고압산소 챔버 2.0 ATA 급속 디톡스 집중 치료',
    description: '수술 후 붓기가 가장 최고조에 달하는 3일차에 고압산소 챔버를 통해 혈액 순환 속도를 3배 높이고 조직 부종을 집중 흡수시킵니다. 멍 크림과 맞춤형 온/냉 림프 팩이 제공됩니다.',
    residualEdemaPct: 55,
    badge: '부종 45% 즉각 경감',
    careDetails: ['고압산소 챔버 2.0 ATA 40분 치료', '멍 케어 아르니카 연고 도포', '온/냉 림프 순환 수기 트리트먼트']
  },
  day7: {
    id: 'day7',
    stageName: '7일차 (실밥 발거)',
    stageBadge: 'STAGE 03 · DAY 07 (SUTURE REMOVAL)',
    title: '미세 실밥 발거 & 힐라이트 II 흉터 재생 조사',
    description: '담당 집도의가 직접 0.1mm 단위 미세 봉합사를 흉터 없이 제거하며 절개부 유착 상태를 체크합니다. 재생 광선 테라피로 붉은 기를 지우고 표정 근육 스트레칭을 코칭합니다.',
    residualEdemaPct: 20,
    badge: '외출 및 가벼운 화장 가능',
    careDetails: ['집도의 1:1 직접 실밥 발거', '미세 흉터 레이저 1차 조사', '세안 및 가벼운 메이크업 시작']
  },
  day14: {
    id: 'day14',
    stageName: '14일차 (일상 복귀)',
    stageBadge: 'STAGE 04 · DAY 14 (FINAL RECOVERY)',
    title: '최종 3D 윤곽 완성도 점검 & 메디컬 스킨케어',
    description: '잔붓기가 90% 이상 빠지며 본연의 라인이 완성되는 시기입니다. 3D-CT 비교 분석을 통해 초기 시뮬레이션과의 일치율을 확인하고, 미세 잔붓기 림프 마사지로 마무리합니다.',
    residualEdemaPct: 5,
    badge: '일상생활 일상생활 복귀',
    careDetails: ['3D 안면스캐너 최종 정밀 측정', '고주파 잔붓기 배출 관리', '정기 사후관리 보증서 발급']
  }
};

export const DOCTORS: DoctorProfile[] = [
  {
    id: 'kang',
    name: '강민우 대표원장',
    role: '대표원장',
    subRole: '성형외과 전문의',
    quote: '"과한 변화는 얼굴의 본질을 해칩니다. 당신만이 가진 본연의 선을 찾아 가장 자연스러운 황금비율을 빚어냅니다."',
    credentials: [
      '주요 의과대학 졸업 및 의학석사',
      '주요 대학병원 성형외과 임상자문의',
      '대한성형외과학회 안면성형연구회 정회원',
      '국제미용성형외과학회(ISAPS) 액티브 멤버'
    ],
    specialties: '3D 자연유착 눈성형, 무보형물 코성형',
    image: CLINIC_IMAGES.doctorKang
  },
  {
    id: 'yoon',
    name: '윤서아 원장',
    role: '원장',
    subRole: '성형외과 전문의',
    quote: '"미세한 1mm의 차이가 인상의 온화함과 우아함을 결정합니다. 흉터 없는 섬세한 디테일을 약속합니다."',
    credentials: [
      '주요 의과대학 졸업',
      '대학병원 성형외과 외래교수',
      '대한미용성형외과학회 정회원',
      '대한성형외과학회 눈·코성형연구회 정회원'
    ],
    specialties: '섬세 눈재수술, 동안 안면거상 & 쁘띠 리쥬비네이션',
    image: CLINIC_IMAGES.doctorYoon
  },
  {
    id: 'park',
    name: '박진형 센터장',
    role: '마취안전센터장',
    subRole: '마취통증의학과 전문의',
    quote: '"환자분이 잠드시는 순간부터 완전히 깨어나실 때까지, 1초도 곁을 떠나지 않고 안전을 지킵니다."',
    credentials: [
      '주요 의과대학 졸업',
      '대학병원 마취통증의학과 전임의',
      '대한마취통증의학회 정회원',
      '대한중환자의학회 세부전문의'
    ],
    specialties: '1:1 수면/전신마취 전담 모니터링, 악성고열증 예방',
    image: CLINIC_IMAGES.doctorPark
  }
];

export const SAFETY_PILLARS = [
  {
    pillarNumber: 'PILLAR 01',
    title: '수술 실명제 (전문의 100% 집도)',
    desc: '상담을 진행한 대표/담당 원장이 마취 전 확인부터 수술 전과정, 실밥 제거와 최종 경과 체크까지 100% 직접 책임집니다.',
    guarantee: '원내 전담 실명 확인제 엄수',
    icon: 'verified_user'
  },
  {
    pillarNumber: 'PILLAR 02',
    title: '마취과 전문의 1:1 전담 상주',
    desc: '출장 마취의가 아닌 온새미로 상주 마취통증의학과 전문의가 실시간 SpO2, 혈압, 심전도를 초 단위로 집중 모니터링합니다.',
    guarantee: '심장자동제세동기(AED) 구비',
    icon: 'ecg_heart'
  },
  {
    pillarNumber: 'PILLAR 03',
    title: '보호자 안심 참관 CCTV 시스템',
    desc: '수술실 내 사각지대 없는 고화질 CCTV를 설치하여, 보호자가 원하실 경우 대기실 모니터를 통해 실시간 상황을 투명하게 시청할 수 있습니다.',
    guarantee: '의료법 제38조의2 전면 준수',
    icon: 'visibility'
  },
  {
    pillarNumber: 'PILLAR 04',
    title: '무정전 전원 공급 장치 (UPS & 단트롤렌)',
    desc: '천재지변이나 한전 정전 시에도 즉각 비상 전력을 가동하는 대용량 UPS와, 희귀 마취 합병증 치료제인 닥트롤렌(Dantrolene)을 상시 비치합니다.',
    guarantee: '악성고열증 철저 대비',
    icon: 'power'
  },
  {
    pillarNumber: 'PILLAR 05',
    title: '10단계 무균 양압 클린 수술실 (Class 1,000)',
    desc: '대학병원 뇌수술실 수준의 Class 1,000 HEPA 필터 양압 공조 시스템으로 외부 먼지와 공기 중 바이러스를 99.97% 철저 차단하여 감염 확률을 0%에 수렴시킵니다.',
    guarantee: '에어샤워 & 플라즈마 저온 멸균 소독기 운용',
    icon: 'air'
  }
];
