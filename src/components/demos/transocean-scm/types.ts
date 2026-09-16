export interface ShipmentDossier {
  blId: string;
  title: string;
  carrier: string;
  master: string;
  vesselImo: string;
  status: string;
  originPort: string;
  originDetails: string;
  destPort: string;
  destDetails: string;
  eta: string;
  progressPercent: number;
  distanceTraversed: string;
  internalTemp: string;
  tempTarget: string;
  tempStatus: string;
  relHumidity: string;
  gForce: string;
  sensorBattery: string;
  cargoType: string;
  cargoPriority: string;
  waypoints: {
    step: number;
    label: string;
    location: string;
    subtext: string;
    status: 'completed' | 'active' | 'inbound';
  }[];
}

export interface TradeRoute {
  id: string;
  name: string;
  subtext: string;
  oceanRatePerTeu: number;
  oceanDays: number;
  oceanCo2PerTeu: number;
}

export interface PortHub {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'FLUID' | 'MODERATE' | 'OPTIMAL' | 'HEAVY';
  berthWaitTime: string;
  craneTurnaround: string;
  intermodalDetail: string;
  intermodalLabel: string;
  coordinates: string;
  congestionIndex: number;
}
