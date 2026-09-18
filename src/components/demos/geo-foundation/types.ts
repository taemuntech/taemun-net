export interface FoundationProject {
  id: string;
  title: string;
  category: 'deep-excavation' | 'd-wall' | 'rcd-pile' | 'grouting';
  categoryLabel: string;
  location: string;
  depth: string;
  wallType: string;
  period: string;
  image: string;
  summary: string;
  specs: string[];
}

export interface StrataLayer {
  depthRange: string;
  soilName: string;
  description: string;
  retainingMethod: string;
  riskFactor: string;
}
