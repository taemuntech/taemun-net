export interface LayerData {
  id: number;
  label: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  thermal: string;
  thermalPercent: number;
  bandwidth: string;
  bandwidthPercent: number;
  warpage: string;
  warpagePercent: number;
  node: string;
  underfill: string;
  cap: string;
}

export interface SimSettings {
  pkgDim: number; // in mm, e.g. 50, 75, 100, 120
  hbmCount: number; // e.g. 4, 8, 12, 16
  tdp: number; // in W, e.g. 300 to 1500
}

export interface ConsultationFormData {
  sector: string;
  solutions: string[];
  company: string;
  department: string;
  name: string;
  email: string;
  ndaAgreed: boolean;
}
