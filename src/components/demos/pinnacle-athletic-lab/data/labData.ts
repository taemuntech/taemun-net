import { EventConfig, CohortRecord } from '../types';

export const LAB_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1UHPsRAEmC0j3hkJu7kIYdMjYZLh-swJCbJERlEVWYualLGqM4U6ooSgP9U5Yc-_uVz5XjKFmra7K_Gci9elAcUwubzW7d1feetylmcOo_XgmeM4o7CEVfU3TyxGguKFYa7iNWHFa9SRCFoOv03jP2AHSFS56YB1JgjkKQmoxo0QWWwS4XQswcV3zJNGHtFn0FsDxjrHAIIPKs1CRu9DJEZVDn1jSvU9rqVuQ_MgVHc2OIs0mHtsODdOfD2',
  sprintTrack: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDORs1i-q-80oxXXkdogOymzau9BtgZylSkSD3f0XvQlkwEcKVe64P-cl6KlUzrXztnaQ75va5_gYJQsprerYVDjVb-YwGIVube-V2eQVkHegXYgWv4ERidg_xKsOQY6BaSRJKGSLRsg3UbWcpax1WJoO7kZZeak5iRJ3jtqsdI0-POBEAfqrYQzmiPPk7z3c6UXgGLoRufqZLxZtjXW7Kj8z_DshxUCSlObZzfveiewQkzaZW2jKK6Cw',
  jumpTrack: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3gBghc3diRBZB_JNw5PySV1Sv2W4hT5i4Ma6qhrdWHEq3bpsCwXEb1GQ7bFPWYJAPwvHO7NxoTobULNmTBlVxz2eCjqqN6xn-sj5pSMkxLCuutVuM9wJNZUsy0SqGEBuoRjOxig0xptw-EOuUHT3lADy-Ji0Bn_Gl_4Nd9GLdPej6dsDRFHpzeOjjx5vnpOVmw_fdKfj6ARbCMaSiCqPKw0MweozodV4qmFueCMK3a4QPOetG60Oc9A',
  gripTrack: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmuDxPThUWZXRYDxCPzM2YaAuLZFj9N-io73x0isjqWS6VefQpmj1oPFvJyKc5qIDAJBDRDpLGchANwkIOyxjMj0F8-MNfALao2aoRLtpPoCj2PeBBKfABrKdcHT0wb9rKzlRZXSUgAcHjC-02GqzABS6UuBlO6BBKzxKnC2bxXbecC1sEMOIVXwSuIXHUsIvi3ZMjolCI54rFcV2hc3RiCoUHYIHtEVSCP8qhB93zZ0qCKnB2e_Ta1A'
};

export const EVENT_CONFIGS: Record<string, EventConfig> = {
  'long-jump': {
    id: 'long-jump',
    label: '01. 제자리멀리뛰기 (LONG JUMP)',
    englishLabel: 'STANDING LONG JUMP CALIBRATOR',
    unit: 'cm',
    min: 230,
    max: 315,
    step: 1,
    defaultValue: 295,
    rulerMarkers: [
      { val: 230, label: '230 cm (기본선)' },
      { val: 260, label: '260 cm' },
      { val: 280, label: '280 cm (경찰대 만점)', highlight: true, colorClass: 'text-[#ffffff]' },
      { val: 290, label: '290 cm (K대 만점 (예시))', highlight: true, colorClass: 'text-[#c3f400]' },
      { val: 300, label: '300 cm (S대 만점 (예시))', highlight: true, colorClass: 'text-[#ff5625] font-bold' },
      { val: 315, label: '315 cm (국가대표)' },
    ],
    targets: [
      {
        id: 'snu',
        sectionTag: 'SEC_01 // SPORT ED',
        category: '수시 / 정시',
        institution: 'S대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 300cm / 여 250cm',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 300) {
            return {
              score: 100,
              percentage: 100,
              tier: '[ 만점 PASS 확정 ]',
              tierClass: 'text-[#ff5625]'
            };
          }
          const s = Math.max(68, +(100 - (300 - v) * 0.35).toFixed(1));
          return {
            score: s,
            percentage: s,
            tier: v >= 290 ? '[ 안정권 A+ ]' : v >= 275 ? '[ 적정권 B ]' : '[ 취약권 경고 ]',
            tierClass: v >= 290 ? 'text-[#c3f400]' : v >= 275 ? 'text-[#ffffff]' : 'text-[#ffb4ab]'
          };
        }
      },
      {
        id: 'korea',
        sectionTag: 'SEC_02 // K-UNIV (예시)',
        category: '체육교육과',
        institution: 'K대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 290cm / 여 240cm',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 290) {
            return {
              score: 100,
              percentage: 100,
              tier: '[ OVER-SCORE 만점 ]',
              tierClass: 'text-[#ff5625]'
            };
          }
          const s = Math.max(60, +(100 - (290 - v) * 0.45).toFixed(1));
          return {
            score: s,
            percentage: s,
            tier: v >= 280 ? '[ 1등급 안정 ]' : v >= 265 ? '[ 2등급 보완 ]' : '[ 실기 과락선 ]',
            tierClass: v >= 280 ? 'text-[#c3f400]' : v >= 265 ? 'text-[#ffffff]' : 'text-[#ffb4ab]'
          };
        }
      },
      {
        id: 'police',
        sectionTag: 'SEC_03 // POLICE CADET',
        category: '경찰대·간부후보',
        institution: '경찰간부 및 순경공채 (예시)',
        maxCriteria: '실기 최고 10점 만점 기준: 280cm',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 280) {
            return {
              score: 10,
              percentage: 100,
              tier: '[ 10점 만점 ALL CLEAR ]',
              tierClass: 'text-[#c3f400]'
            };
          }
          if (v >= 265) {
            return {
              score: 9,
              percentage: 90,
              tier: '[ 9점 획득 ]',
              tierClass: 'text-[#ffffff]'
            };
          }
          if (v >= 250) {
            return {
              score: 8,
              percentage: 80,
              tier: '[ 8점 커트라인 ]',
              tierClass: 'text-[#ffffff]'
            };
          }
          return {
            score: 7,
            percentage: 70,
            tier: '[ 체력 과락 주의 ]',
            tierClass: 'text-[#ffb4ab]'
          };
        }
      },
      {
        id: 'fire',
        sectionTag: 'SEC_04 // FIRE RESCUE',
        category: '중앙소방학교',
        institution: '소방공무원 구조대 특채 (예시)',
        maxCriteria: '만점 10점 기준선: 290cm',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 290) {
            return {
              score: 10,
              percentage: 100,
              tier: '[ 최고점 PASS 확정 ]',
              tierClass: 'text-[#c3f400]'
            };
          }
          if (v >= 275) {
            return {
              score: 9,
              percentage: 90,
              tier: '[ 9점 기록권 ]',
              tierClass: 'text-[#ffffff]'
            };
          }
          if (v >= 260) {
            return {
              score: 8,
              percentage: 80,
              tier: '[ 8점 평균선 ]',
              tierClass: 'text-[#ffffff]'
            };
          }
          return {
            score: 7,
            percentage: 70,
            tier: '[ 실기 보완 필수 ]',
            tierClass: 'text-[#ffb4ab]'
          };
        }
      }
    ]
  },
  'sprint-100m': {
    id: 'sprint-100m',
    label: '02. 100m 달리기 (100M SPRINT)',
    englishLabel: '100M SPRINT LASER RADAR CALIBRATOR',
    unit: 'sec',
    min: 10.8,
    max: 14.5,
    step: 0.01,
    defaultValue: 11.45,
    rulerMarkers: [
      { val: 10.8, label: '10.80s (한국기록급)', highlight: true, colorClass: 'text-[#ff5625]' },
      { val: 11.5, label: '11.50s (S대 만점 (예시))', highlight: true, colorClass: 'text-[#c3f400]' },
      { val: 12.0, label: '12.00s (K대 1등급 (예시))' },
      { val: 13.0, label: '13.00s (경찰 10점)' },
      { val: 13.8, label: '13.80s (합격 커트라인)' },
      { val: 14.5, label: '14.50s (기준선)' },
    ],
    targets: [
      {
        id: 'snu',
        sectionTag: 'SEC_01 // SPORT ED',
        category: '수시 / 정시',
        institution: 'S대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 11.50초 / 여 13.20초',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v <= 11.5) {
            return { score: 100, percentage: 100, tier: '[ 100m 만점 PASS ]', tierClass: 'text-[#ff5625]' };
          }
          const s = Math.max(65, +(100 - (v - 11.5) * 18).toFixed(1));
          return {
            score: s,
            percentage: s,
            tier: v <= 11.9 ? '[ 안정권 S ]' : v <= 12.4 ? '[ 적정권 B ]' : '[ 가속구간 보완 ]',
            tierClass: v <= 11.9 ? 'text-[#c3f400]' : v <= 12.4 ? 'text-[#ffffff]' : 'text-[#ffb4ab]'
          };
        }
      },
      {
        id: 'korea',
        sectionTag: 'SEC_02 // K-UNIV (예시)',
        category: '체육교육과',
        institution: 'K대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 11.70초 / 여 13.50초',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v <= 11.7) {
            return { score: 100, percentage: 100, tier: '[ 수석 환산점수 ]', tierClass: 'text-[#c3f400]' };
          }
          const s = Math.max(60, +(100 - (v - 11.7) * 20).toFixed(1));
          return {
            score: s,
            percentage: s,
            tier: v <= 12.2 ? '[ 1등급 안정 ]' : '[ 2등급 감점구간 ]',
            tierClass: v <= 12.2 ? 'text-[#c3f400]' : 'text-[#ffb4ab]'
          };
        }
      },
      {
        id: 'police',
        sectionTag: 'SEC_03 // POLICE CADET',
        category: '경찰대·간부후보',
        institution: '경찰간부 및 순경공채 (예시)',
        maxCriteria: '실기 10점 만점: 13.0초 이하',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v <= 13.0) return { score: 10, percentage: 100, tier: '[ 10점 만점 ALL CLEAR ]', tierClass: 'text-[#c3f400]' };
          if (v <= 13.5) return { score: 9, percentage: 90, tier: '[ 9점 획득 ]', tierClass: 'text-[#ffffff]' };
          if (v <= 14.0) return { score: 8, percentage: 80, tier: '[ 8점 기준선 ]', tierClass: 'text-[#ffffff]' };
          return { score: 7, percentage: 70, tier: '[ 스타트 블록 보완 ]', tierClass: 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'fire',
        sectionTag: 'SEC_04 // FIRE RESCUE',
        category: '중앙소방학교',
        institution: '소방공무원 구조대 특채 (예시)',
        maxCriteria: '소방 순발력 기준 12.2초 만점',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v <= 12.2) return { score: 10, percentage: 100, tier: '[ 최고점 PASS 확정 ]', tierClass: 'text-[#c3f400]' };
          if (v <= 12.8) return { score: 9, percentage: 90, tier: '[ 9점 기록권 ]', tierClass: 'text-[#ffffff]' };
          return { score: 8, percentage: 80, tier: '[ 추가 훈련 요망 ]', tierClass: 'text-[#ffb4ab]' };
        }
      }
    ]
  },
  'grip-force': {
    id: 'grip-force',
    label: '03. 악력 정밀 계측 (GRIP FORCE)',
    englishLabel: 'LOAD-CELL DIGITAL DYNAMOMETER CALIBRATOR',
    unit: 'kg',
    min: 40,
    max: 85,
    step: 0.5,
    defaultValue: 74,
    rulerMarkers: [
      { val: 40, label: '40 kg (입문)' },
      { val: 50, label: '50 kg' },
      { val: 60, label: '60 kg (일반 성인)' },
      { val: 64, label: '64 kg (경찰·소방 만점)', highlight: true, colorClass: 'text-[#c3f400]' },
      { val: 70, label: '70 kg (체대 상위 1%)', highlight: true, colorClass: 'text-[#ffffff]' },
      { val: 85, label: '85 kg (엘리트 한계)', highlight: true, colorClass: 'text-[#ff5625]' },
    ],
    targets: [
      {
        id: 'snu',
        sectionTag: 'SEC_01 // SPORT ED',
        category: '기초체력',
        institution: 'S대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 68kg / 여 45kg',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 68) return { score: 100, percentage: 100, tier: '[ 만점 PASS 확정 ]', tierClass: 'text-[#ff5625]' };
          const s = Math.max(70, +(100 - (68 - v) * 1.5).toFixed(1));
          return { score: s, percentage: s, tier: v >= 64 ? '[ 안정권 A+ ]' : '[ 보완 필요 ]', tierClass: v >= 64 ? 'text-[#c3f400]' : 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'korea',
        sectionTag: 'SEC_02 // K-UNIV (예시)',
        category: '기초체력',
        institution: 'K대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 67kg / 여 44kg',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 67) return { score: 100, percentage: 100, tier: '[ OVER-SCORE 만점 ]', tierClass: 'text-[#ff5625]' };
          const s = Math.max(65, +(100 - (67 - v) * 1.6).toFixed(1));
          return { score: s, percentage: s, tier: v >= 62 ? '[ 1등급 안정 ]' : '[ 2등급 주의 ]', tierClass: v >= 62 ? 'text-[#c3f400]' : 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'police',
        sectionTag: 'SEC_03 // POLICE CADET',
        category: '경찰대·순경',
        institution: '경찰간부 및 순경공채 (예시)',
        maxCriteria: '실기 10점 만점 기준: 64kg 이상',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 64) return { score: 10, percentage: 100, tier: '[ 10점 만점 ALL CLEAR ]', tierClass: 'text-[#c3f400]' };
          if (v >= 60) return { score: 9, percentage: 90, tier: '[ 9점 획득 ]', tierClass: 'text-[#ffffff]' };
          if (v >= 55) return { score: 8, percentage: 80, tier: '[ 8점 기준선 ]', tierClass: 'text-[#ffffff]' };
          return { score: 7, percentage: 70, tier: '[ 악력 과락 위험 ]', tierClass: 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'fire',
        sectionTag: 'SEC_04 // FIRE RESCUE',
        category: '중앙소방학교',
        institution: '소방공무원 구조대 특채 (예시)',
        maxCriteria: '악력 10점 만점 기준: 64kg 이상',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 64) return { score: 10, percentage: 100, tier: '[ 최고점 PASS 확정 ]', tierClass: 'text-[#c3f400]' };
          if (v >= 60) return { score: 9, percentage: 90, tier: '[ 9점 기록권 ]', tierClass: 'text-[#ffffff]' };
          return { score: 8, percentage: 80, tier: '[ 8점 커트라인 ]', tierClass: 'text-[#ffb4ab]' };
        }
      }
    ]
  },
  'sit-ups': {
    id: 'sit-ups',
    label: '04. 윗몸일으키기 (SIT-UPS)',
    englishLabel: 'CADENCE OPTICAL SIT-UP SENSOR CALIBRATOR',
    unit: '회/분',
    min: 35,
    max: 80,
    step: 1,
    defaultValue: 65,
    rulerMarkers: [
      { val: 35, label: '35회 (기본)' },
      { val: 45, label: '45회' },
      { val: 55, label: '55회 (소방 만점)', highlight: true, colorClass: 'text-[#c3f400]' },
      { val: 62, label: '62회 (경찰 10점)', highlight: true, colorClass: 'text-[#ffffff]' },
      { val: 70, label: '70회 (체대 만점)', highlight: true, colorClass: 'text-[#ff5625]' },
      { val: 80, label: '80회 (상위 0.1%)' },
    ],
    targets: [
      {
        id: 'snu',
        sectionTag: 'SEC_01 // SPORT ED',
        category: '근지구력',
        institution: 'S대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 70회 / 여 60회 (1분)',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 70) return { score: 100, percentage: 100, tier: '[ 만점 PASS 확정 ]', tierClass: 'text-[#ff5625]' };
          const s = Math.max(70, +(100 - (70 - v) * 1.2).toFixed(1));
          return { score: s, percentage: s, tier: v >= 65 ? '[ 안정권 A+ ]' : '[ 보완 필요 ]', tierClass: v >= 65 ? 'text-[#c3f400]' : 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'korea',
        sectionTag: 'SEC_02 // K-UNIV (예시)',
        category: '근지구력',
        institution: 'K대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 68회 / 여 58회',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 68) return { score: 100, percentage: 100, tier: '[ OVER-SCORE 만점 ]', tierClass: 'text-[#ff5625]' };
          const s = Math.max(65, +(100 - (68 - v) * 1.3).toFixed(1));
          return { score: s, percentage: s, tier: v >= 63 ? '[ 1등급 안정 ]' : '[ 2등급 주의 ]', tierClass: v >= 63 ? 'text-[#c3f400]' : 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'police',
        sectionTag: 'SEC_03 // POLICE CADET',
        category: '경찰대·순경',
        institution: '경찰간부 및 순경공채 (예시)',
        maxCriteria: '1분 58회 이상 10점 만점',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 58) return { score: 10, percentage: 100, tier: '[ 10점 만점 ALL CLEAR ]', tierClass: 'text-[#c3f400]' };
          if (v >= 53) return { score: 9, percentage: 90, tier: '[ 9점 획득 ]', tierClass: 'text-[#ffffff]' };
          if (v >= 48) return { score: 8, percentage: 80, tier: '[ 8점 기준선 ]', tierClass: 'text-[#ffffff]' };
          return { score: 7, percentage: 70, tier: '[ 케이던스 보완 ]', tierClass: 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'fire',
        sectionTag: 'SEC_04 // FIRE RESCUE',
        category: '중앙소방학교',
        institution: '소방공무원 구조대 특채 (예시)',
        maxCriteria: '1분 52회 이상 10점 만점',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 52) return { score: 10, percentage: 100, tier: '[ 최고점 PASS 확정 ]', tierClass: 'text-[#c3f400]' };
          if (v >= 47) return { score: 9, percentage: 90, tier: '[ 9점 기록권 ]', tierClass: 'text-[#ffffff]' };
          return { score: 8, percentage: 80, tier: '[ 실기 점수 보강 ]', tierClass: 'text-[#ffb4ab]' };
        }
      }
    ]
  },
  'back-force': {
    id: 'back-force',
    label: '05. 배근력 (BACK FORCE)',
    englishLabel: 'POSTERIOR CHAIN FORCE-PLATE CALIBRATOR',
    unit: 'kg',
    min: 120,
    max: 270,
    step: 2,
    defaultValue: 228,
    rulerMarkers: [
      { val: 120, label: '120 kg (기본)' },
      { val: 160, label: '160 kg' },
      { val: 206, label: '206 kg (소방 10점)', highlight: true, colorClass: 'text-[#c3f400]' },
      { val: 220, label: '220 kg (체대 만점)', highlight: true, colorClass: 'text-[#ffffff]' },
      { val: 250, label: '250 kg (수석급)', highlight: true, colorClass: 'text-[#ff5625]' },
      { val: 270, label: '270 kg (한계 출력)' },
    ],
    targets: [
      {
        id: 'snu',
        sectionTag: 'SEC_01 // SPORT ED',
        category: '후면사슬 최대출력',
        institution: 'S대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 220kg / 여 150kg',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 220) return { score: 100, percentage: 100, tier: '[ 만점 PASS 확정 ]', tierClass: 'text-[#ff5625]' };
          const s = Math.max(68, +(100 - (220 - v) * 0.5).toFixed(1));
          return { score: s, percentage: s, tier: v >= 205 ? '[ 안정권 A+ ]' : '[ 보완 필요 ]', tierClass: v >= 205 ? 'text-[#c3f400]' : 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'korea',
        sectionTag: 'SEC_02 // K-UNIV (예시)',
        category: '후면사슬 최대출력',
        institution: 'K대 체육교육과 (예시)',
        maxCriteria: '만점 기준선: 남 215kg / 여 145kg',
        maxScore: 100,
        scoreUnit: '/ 100',
        calculateScore: (v: number) => {
          if (v >= 215) return { score: 100, percentage: 100, tier: '[ OVER-SCORE 만점 ]', tierClass: 'text-[#ff5625]' };
          const s = Math.max(65, +(100 - (215 - v) * 0.55).toFixed(1));
          return { score: s, percentage: s, tier: v >= 200 ? '[ 1등급 안정 ]' : '[ 2등급 주의 ]', tierClass: v >= 200 ? 'text-[#c3f400]' : 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'police',
        sectionTag: 'SEC_03 // POLICE CADET',
        category: '특수신체검정',
        institution: '경찰간부 및 순경공채 (예시)',
        maxCriteria: '기준 200kg 이상 10점 만점',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 200) return { score: 10, percentage: 100, tier: '[ 10점 만점 ALL CLEAR ]', tierClass: 'text-[#c3f400]' };
          if (v >= 185) return { score: 9, percentage: 90, tier: '[ 9점 획득 ]', tierClass: 'text-[#ffffff]' };
          return { score: 8, percentage: 80, tier: '[ 요추 신전각 조정 ]', tierClass: 'text-[#ffb4ab]' };
        }
      },
      {
        id: 'fire',
        sectionTag: 'SEC_04 // FIRE RESCUE',
        category: '중앙소방학교',
        institution: '소방공무원 구조대 특채 (예시)',
        maxCriteria: '배근력 10점 만점 기준: 206kg 이상',
        maxScore: 10,
        scoreUnit: '/ 10 pt',
        calculateScore: (v: number) => {
          if (v >= 206) return { score: 10, percentage: 100, tier: '[ 최고점 PASS 확정 ]', tierClass: 'text-[#c3f400]' };
          if (v >= 190) return { score: 9, percentage: 90, tier: '[ 9점 기록권 ]', tierClass: 'text-[#ffffff]' };
          return { score: 8, percentage: 80, tier: '[ 8점 기준선 ]', tierClass: 'text-[#ffb4ab]' };
        }
      }
    ]
  }
};

export const COHORT_RECORDS: CohortRecord[] = [
  {
    id: 'CR-2024-001',
    name: '이*현',
    target: 'S대학교 (예시) 사범대학 체육교육과 (정시)',
    examYear: '2024 학년도',
    admissionStatus: '합격 (예시)',
    verifiedScore: '제멀 307cm / 100m 11.38s',
    keyMetric: '수평추진력 +240N 증가',
    gain: '+21cm 즉각 향상',
    sensorVerification: '1000Hz Kistler FP-01 검증',
    forcePlateId: 'NODE-08-ALPHA'
  },
  {
    id: 'CR-2024-002',
    name: '강*민',
    target: 'K대 체육교육과 (예시) (수시 특기자)',
    examYear: '2024 학년도',
    admissionStatus: '실기 전종목 만점',
    verifiedScore: '제멀 302cm / Z-Run(민첩성) 13.12s',
    keyMetric: '도약각 38.6° 황금비율 고정',
    gain: '+19cm 개선',
    sensorVerification: 'Optotrak 32-Point 3D',
    forcePlateId: 'NODE-12-BETA'
  },
  {
    id: 'CR-2024-003',
    name: '최*우',
    target: '경찰대학 신입학전형 체력검사',
    examYear: '2024 년도',
    admissionStatus: '체력 50/50점 만점',
    verifiedScore: '악력 72.4kg / 100m 12.41s',
    keyMetric: '전완근 모터유닛 99.2% 동원',
    gain: '악력 +12.8kg 향상',
    sensorVerification: '디지털 로드셀 스트레인게이지',
    forcePlateId: 'LOAD-CELL-03'
  },
  {
    id: 'CR-2024-004',
    name: '박*준',
    target: '중앙소방학교 구조대 특채 실기',
    examYear: '2024 년도',
    admissionStatus: '실기평가 상위 0.1% (예시)',
    verifiedScore: '배근력 248kg / 제멀 298cm',
    keyMetric: '요추-둔근 동시 발현각 114°',
    gain: '배근력 +34kg 돌파',
    sensorVerification: 'Optotrak Dual Force Plate',
    forcePlateId: 'FP-02-KISTLER'
  },
  {
    id: 'CR-2024-005',
    name: '정*아',
    target: 'Y대 스포츠응용산업학과 (예시)',
    examYear: '2024 학년도',
    admissionStatus: '실기 A+ 합격',
    verifiedScore: '제멀 258cm / 25m왕복 11.20s',
    keyMetric: '공중 착지 전방폴딩 각도 확보',
    gain: '+16cm 극대화',
    sensorVerification: 'Phantom 4K 1000FPS 초고속',
    forcePlateId: 'PHANTOM-CAM-01'
  }
];
