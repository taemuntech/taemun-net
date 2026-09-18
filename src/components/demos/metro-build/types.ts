export interface MetroProject {
  id: string;
  title: string;
  category: 'corporate' | 'knowledge-center' | 'rnd-facility';
  categoryLabel: string;
  location: string;
  gfa: string;
  floors: string;
  duration: string;
  image: string;
  summary: string;
  highlights: string[];
}

export interface BimFeature {
  id: string;
  title: string;
  badge: string;
  description: string;
  metrics: string;
}
