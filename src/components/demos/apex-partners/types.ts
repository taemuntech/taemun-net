export interface StrategyPillar {
  id: string;
  pillarNumber: string;
  tag: string;
  title: string;
  thesis: string;
  ticket: string;
  targetIrr: string;
  moic: string;
  levers: string[];
}

export type PortfolioCategory = 'all' | 'unicorn' | 'exit' | 'deeptech' | 'healthcare';

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeVariant: 'gold' | 'emerald' | 'slate';
  growthMetric: string;
  growthType: 'metric' | 'exit';
  dealStage: string;
  categories: PortfolioCategory[];
  ticketSize: string;
  targetMoic: string;
  esgRating: string;
  fullThesis: string;
}

export interface LeaderProfile {
  name: string;
  title: string;
  bio: string;
  credentialBadge: string;
  iconType: 'bank' | 'shield' | 'chip' | 'policy';
}

export interface LPApplicationForm {
  institutionType: string;
  targetVintage: string;
  institutionName: string;
  titleDept: string;
  fullName: string;
  corporateEmail: string;
  ndaAgreed: boolean;
}
