export interface TelemetryStats {
  busVoltage: number;
  junctionTemp: number;
  peakPower: number;
  motorTemp: number;
  batterySoc: number;
  inverterEfficiency: number;
  rotorSpeed: number;
  torqueLatencyMs: number;
}

export interface SimulationParams {
  batteryCapacity: number; // kWh (75 - 120)
  ambientTemp: number; // °C (-20 to +45)
  chargerPower: number; // kW (150, 350, 500)
}

export interface SimulationResults {
  chargingTimeMinutes: string;
  rangeAdded5Min: number;
  peakHeatRejectionKw: string;
  preconditioningLabel: string;
  preconditioningType: 'optimal' | 'heating' | 'cooling';
  coolingLoopText: string;
  currentAmps: string;
  timeProgressPercent: number;
  rangeProgressPercent: number;
  heatProgressPercent: number;
}

export interface ArchitectureComponent {
  id: string;
  code: string;
  badge: string;
  title: string;
  summary: string;
  icon: string;
  specs: {
    label: string;
    value: string;
    highlight?: boolean;
    color?: string;
  }[];
  footerTag: string;
  actionText: string;
  colorTheme: 'cyan' | 'purple' | 'emerald';
  fullDetails: {
    description: string;
    keyFeatures: string[];
    technicalTable: { param: string; val: string; tol: string }[];
  };
}

export interface RfqFormData {
  vehicleSegment: 'hypercar' | 'passenger_d' | 'commercial' | 'evtol';
  topology: '800v_pure' | 'hybrid_boost' | 'custom_sic';
  sopTimeline: '2026_q2' | '2027' | '2028_beyond';
  contactName: string;
  corporateEmail: string;
  specNotes: string;
}
