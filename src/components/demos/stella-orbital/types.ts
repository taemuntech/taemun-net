export type SensorModeKey = 'optical' | 'sar' | 'hyper';

export interface SensorSpec {
  mode: SensorModeKey;
  code: string;
  badge: string;
  badgeClass: string;
  name: string;
  shortDesc: string;
  detailTitle: string;
  gsd: string;
  swath: string;
  bands: string;
  latency: string;
  revisit: string;
  hudLabel: string;
  polarization: string;
  fovGsd: string;
  imageUrl: string;
  imageAlt: string;
}

export interface TaskingFormData {
  coordinates: string;
  radius: string;
  sensor: string;
  urgency: string;
  formats: {
    cloudGeoTiff: boolean;
    cloudIngest: boolean;
    stacRestApi: boolean;
  };
  orgName: string;
  corpEmail: string;
  agreedITAR: boolean;
}

export type ModalType = 'tasking' | 'dossier' | 'viewer' | null;
