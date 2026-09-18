export interface LogisProject {
  id: string;
  title: string;
  type: 'cold-storage' | 'fulfillment' | 'ambient';
  typeLabel: string;
  location: string;
  gfa: string;
  floors: string;
  tempZones: string;
  image: string;
  summary: string;
  specs: string[];
}

export interface ChamberZone {
  id: string;
  name: string;
  tempRange: string;
  description: string;
  targetItems: string;
  insulationSpec: string;
}
