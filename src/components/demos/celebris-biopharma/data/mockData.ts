import { PipelineItem, SabAdvisor, Publication } from '../types';

export const LOGO_IMG_URL = "https://lh3.googleusercontent.com/aida/AEtjO1VDEon11kBziXiMb5a0f27WvMFwNfxX0jiKmHMKPfpGsnhwJuxHbZivibPgrFFOCGL0wXRv4nPjdKYdyL_GP5WcGiHtwOmn38llnJddPSSjlnU2YLiNKzLwjZUmlmC-WfKjDYLe_E52I8VK1pUPVv5OoWMgQvBKwBMI8ogEVPG333dLlh6Uq6BZJ6VIWto7PtS1bW36YUxAaGyKnXAEuFHeFs-BSCi9Vs4fSX6EUx7USw88p0jDA3SHYA";

export const CLEANROOM_IMG_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBe97IvD3tZ5kr3Yc4Tfny1FiKRxLpBrS59MFc2QrdYOTlyQtzDrK1d1j5-_XfoJCHF7eA8HuSHBKU5gmKyqXGyPro5BtIIh3DwqCgWtgFUpckAXBAnkkyQ52IE4t84At3zpvrMWlcQx5rSWDXezBE0NXtT_5DCbsTLOpbSG4kgS9W-mx7eKdwVWaZ5TJAvheb-bZgt5Fn8rSq8P5X64kBOGmsx_kO15R8yo7fSp1KgB02Y1plsH7N0";

export const TRUST_METRICS = [
  {
    label: "GLOBAL PATENTS",
    value: "54건",
    subtext: "미국·유럽·일본 원천특허 포트폴리오",
    colorClass: "text-[#1e40af]"
  },
  {
    label: "TECH TRANSFER (L/O)",
    value: "1.2조 원",
    subtext: "글로벌 빅파마 2건 계약 (선급금 $85M)",
    colorClass: "text-[#00687a]"
  },
  {
    label: "SONGDO cGMP CAMPUS",
    value: "12,000평",
    subtext: "2,000L 배양기 4기 완전 가동 체제",
    colorClass: "text-[#00288e]"
  },
  {
    label: "CLINICAL PIPELINES",
    value: "4종 임상",
    subtext: "국내외 규제기관 IND 표기 자리 (예시)",
    colorClass: "text-[#00563a]"
  }
];

export const PIPELINE_DATA: PipelineItem[] = [
  {
    id: "cb-101",
    code: "CB-101",
    category: "tpd",
    target: "KRAS G12D/V 변이 TPD 분해제",
    indication: "비소세포폐암 (NSCLC), 췌장암 (PDAC)",
    moa: "Oral VHL-recruiting Degrader",
    characteristic: "경구 생체이용률 68% • BBB 투과율 42%",
    phase: "phase2a",
    phaseBadge: "Phase IIa",
    phaseBadgeColor: "bg-[#e5eeff] text-[#1e40af]",
    progressPercentage: 70,
    highlightStatus: "희귀의약품 지정 표시 자리 (예시)",
    subStatus: "글로벌 5개국 임상 진행 중",
    partnershipStatus: "L/O Open",
    activePhaseIndex: 3,
    protocolFileName: "CB-101_Phase2a_Protocol_Synopsis_v2.4.pdf",
    protocolDetails: {
      title: "CB-101 글로벌 임상 2a상 프로토콜 요약",
      objective: "진행성 KRAS G12D/V 변이 비소세포폐암 및 췌장암 환자 대상 1일 1회 경구 투여 시의 유효성, 안전성 및 체내 약동학적(PK/PD) 프로파일 평가",
      targetPatient: "표준치료 실패 또는 불응성 KRAS 변이 양성 고형암 환자 (n=120, 글로벌 5개국 34개 기관)",
      dosingRegimen: "코호트 확정 용량 350mg QD (경구 식후 30분 내 복용)",
      biomarkers: "순환종양 DNA (ctDNA) 내 KRAS 돌연변이 대립유전자 분율(MAF) 모니터링"
    }
  },
  {
    id: "cb-204",
    code: "CB-204",
    category: "adc",
    target: "Trop-2 x Topo1 차세대 ADC",
    indication: "삼중음성유방암 (TNBC), 요로상피암",
    moa: "Enzyme-Cleavable Peptide Linker",
    characteristic: "DAR 4 균일 접합 • 전신 독성 70% 감소",
    phase: "phase1b",
    phaseBadge: "Phase Ib",
    phaseBadgeColor: "bg-[#dce9ff] text-[#00687a]",
    progressPercentage: 50,
    highlightStatus: "유럽 빅파마 공동 임상 진행",
    subStatus: "용량 증량 코호트 순항",
    partnershipStatus: "Co-Dev",
    activePhaseIndex: 2,
    protocolFileName: "CB-204_Phase1b_Trop2_ADC_Protocol.pdf",
    protocolDetails: {
      title: "CB-204 Trop-2 표적 차세대 ADC 임상 1b상 시험계획서",
      objective: "신규 수용성 펩타이드 링커가 접합된 Trop-2 표적 Topo1 억제 ADC의 삼중음성유방암 환자 대상 MTD 및 초기 항종양 활성(ORR) 입증",
      targetPatient: "2차 이상 전신 화학요법 진행 이력이 있는 전이성 TNBC 환자 (n=64)",
      dosingRegimen: "3주 간격(Q3W) 정맥주사 4.5 mg/kg ~ 6.0 mg/kg 코호트 증량",
      biomarkers: "종양 조직 생검 내 Trop-2 발현 H-score 및 혈장 유리 페이로드(Payload Cmax)"
    }
  },
  {
    id: "cb-308",
    code: "CB-308",
    category: "bispecific",
    target: "CD73 x TGF-β TME 이중항체",
    indication: "췌장암, 난소암 종양미세환경 대사 표적",
    moa: "Dual-Immunometabolism Inhibition",
    characteristic: "환자 유래 오가노이드 TGI 82% 입증",
    phase: "preclinical",
    phaseBadge: "IND Approved",
    phaseBadgeColor: "bg-[#eff4ff] text-[#00563a]",
    progressPercentage: 30,
    highlightStatus: "2026 Q1 임상 1상 환자 첫 투약 예정",
    subStatus: "전임상 패키지 완료",
    partnershipStatus: "L/O Open",
    activePhaseIndex: 1,
    protocolFileName: "CB-308_IND_Approved_Investigator_Brochure.pdf",
    protocolDetails: {
      title: "CB-308 면역관문·종양미세환경 억제 이중항체 IND 승인 패키지",
      objective: "종양미세환경 내 아데노신 생성 억제(CD73) 및 면역 억제성 사이토카인(TGF-β) 동시 중화 시너지 검증",
      targetPatient: "면역관문억제제 불응성 불응 난치암 및 고형암 환자",
      dosingRegimen: "격주 정맥투여(Q2W) 용량 증량 계획",
      biomarkers: "종양 침윤 림프구(TIL) 활성화 및 혈청 sCD73 활성도 저해도"
    }
  },
  {
    id: "cb-401",
    code: "CB-401",
    category: "tpd",
    target: "IRAK4 / RIPK1 분해 신약",
    indication: "난치성 자가면역 질환, 류마티스 관절염",
    moa: "Kinase Kinome Degron Engine",
    characteristic: "표적 선택성 99.9% • 비표적 독성 배제",
    phase: "discovery",
    phaseBadge: "Lead Opt",
    phaseBadgeColor: "bg-[#e5eeff] text-[#757684]",
    progressPercentage: 15,
    highlightStatus: "글로벌 제약사 Term-Sheet 논의 중",
    subStatus: "후보물질 최종 선정 단계",
    partnershipStatus: "Negotiating",
    activePhaseIndex: 0,
    protocolFileName: "CB-401_Lead_Optimization_Report.pdf",
    protocolDetails: {
      title: "CB-401 IRAK4/RIPK1 선택적 분해 표적 최적화 연구 데이터",
      objective: "염증성 키나아제 신호 전달 복합체의 원천 단백질 분해를 통한 자가면역 질환 동물 모델에서의 전신 관절염 지수 완화",
      targetPatient: "생물학적 제제 불응성 류마티스 및 전신 홍반성 루푸스",
      dosingRegimen: "경구 투여 정제 제형 스크리닝",
      biomarkers: "말초혈액 단핵구(PBMC) 내 IRAK4 분해율(DC50 < 5 nM)"
    }
  }
];

export const SAB_ADVISORS: SabAdvisor[] = [
  {
    initials: "KH",
    name: "김형석 박사",
    role: "Scientific Chairman",
    affiliation: "국내 대학병원 암연구소 교수 (예시)",
    bio: "난치성 폐암 및 RAS 단백질 변이 기전을 연구한 종양학 전문가. 글로벌 임상시험 PI 경력 (예시 약력).",
    specialty: "Specialty: KRAS Oncology & Translational Medicine",
    colorTheme: "primary"
  },
  {
    initials: "AV",
    name: "Dr. Arthur Vance, M.D.",
    role: "SAB Member / Clinical Strategy",
    affiliation: "해외 의대 종양내과 교수 (예시)",
    bio: "다중특이성 항체-약물 접합체(ADC) 초기 임상 프로토콜 설계 전문가 (예시 약력).",
    specialty: "Specialty: Regulatory Affairs & ADC Clinical Trial Design",
    colorTheme: "secondary"
  },
  {
    initials: "ER",
    name: "Dr. Elena Rostova, Ph.D.",
    role: "Head of Molecular AI Advisory",
    affiliation: "해외 유전체 연구소 출신 (예시)",
    bio: "구조 생물정보학 및 거대 분자 시뮬레이션 알고리즘 설계 선구자. PROTEA-AI 결합 에너지 예측 코어 파이프라인 공동 설계.",
    specialty: "Specialty: De Novo Molecular Generation & Structural AI",
    colorTheme: "tertiary"
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    journal: "국제 종양학 저널 (예시)",
    year: "2025",
    doi: "00.0000/example-2025-0001",
    title: '"Targeted degradation of KRAS-mutant oncoproteins via oral PROTAC CB-101"',
    description: "KRAS G12D/V 선택적 분해를 통한 체내 종양 퇴행 및 전임상 약동학 프로파일 규명",
    badgeBg: "bg-[#1e40af] text-white",
    abstract: "본 연구는 삼차원 유도적합 결합 모델링을 통해 발굴된 경구용 PROTAC CB-101이 KRAS G12D 및 G12V 변이 종양 모델에서 높은 표적 선택성(DC50 = 3.2 nM)과 경구 생체이용률(F = 68%)을 나타내며, 기존 억제제 대비 내성 돌연변이 발생 빈도를 유의미하게 억제함을 검증하였습니다.",
    filePdfName: "Journal_Example_2025_CB101_Full_Paper.pdf"
  },
  {
    journal: "국제 암연구 저널 (예시)",
    year: "2024",
    doi: "00.0000/example-2024-0002",
    title: '"Overcoming payload resistance in Trop-2 directed ADCs with novel hydrophilic linkers"',
    description: "삼중음성유방암에서의 페이로드 내성 극복 및 Bystander Effect 극대화 분석",
    badgeBg: "bg-[#00687a] text-white",
    abstract: "친수성 펩타이드 링커 기술이 적용된 CB-204는 혈중 순환계에서 99.8%의 초고안정성을 유지하면서도 종양 내 카텝신 B에 의해 신속하게 절단되어 주변 암세포까지 광범위하게 사멸시키는 바이스탠더 효과(Bystander Killing)를 유도함을 입증하였습니다.",
    filePdfName: "Journal_Example_2024_Trop2_ADC_Paper.pdf"
  }
];
