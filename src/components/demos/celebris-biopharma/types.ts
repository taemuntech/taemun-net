export type PipelineCategory = 'all' | 'tpd' | 'adc' | 'bispecific';

export interface PipelineItem {
  id: string;
  code: string;
  category: 'tpd' | 'adc' | 'bispecific';
  target: string;
  indication: string;
  moa: string;
  characteristic: string;
  phase: 'discovery' | 'preclinical' | 'phase1' | 'phase2a' | 'phase1b' | 'phase3';
  phaseBadge: string;
  phaseBadgeColor: string;
  progressPercentage: number;
  highlightStatus: string;
  subStatus: string;
  partnershipStatus: 'L/O Open' | 'Co-Dev' | 'Negotiating';
  activePhaseIndex: number; // 0: Discovery, 1: Preclinical, 2: Phase 1, 3: Phase 2, 4: Phase 3
  protocolFileName: string;
  protocolDetails: {
    title: string;
    objective: string;
    targetPatient: string;
    dosingRegimen: string;
    biomarkers: string;
  };
}

export interface SabAdvisor {
  initials: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  specialty: string;
  colorTheme: 'primary' | 'secondary' | 'tertiary';
}

export interface Publication {
  journal: string;
  year: string;
  doi: string;
  title: string;
  description: string;
  badgeBg: string;
  abstract: string;
  filePdfName: string;
}

export interface PartneringFormData {
  targetPipelines: string[];
  partnershipType: 'LO' | 'CODEV' | 'CDMO';
  companyName: string;
  department: string;
  contactName: string;
  contactEmail: string;
  ndaAgreed: boolean;
}
