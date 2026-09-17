export interface StrataZone {
  id: string;
  depth: string;
  strataName: string;
  koreanName: string;
  description: string;
  spec: string;
  safetyFactor: string;
  image: string;
  hotspots: {
    title: string;
    description: string;
    x: number;
    y: number;
  }[];
}

export interface GeotechMaterial {
  id: string;
  name: string;
  category: string;
  spec: string;
  strength: string;
  feature: string;
  description: string;
  image: string;
}

export interface TbmSpec {
  diameter: string;
  thrustForce: string;
  torque: string;
  cutterDiscs: string;
  advanceRate: string;
  liningSegments: string;
}