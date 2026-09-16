export interface RobotModel {
 id: string;
 tabLabel: string;
 category: string;
 title: string;
 desc: string;
 payload: string;
 docking: string;
 cert: string;
 battery: string;
 modelCode: string;
 dimensions: string;
 staticDischarge: string;
 noiseLevel: string;
 turningRadius: string;
 sensors: string;
 vision: string;
}

export interface RoiSimulation {
 area: number;
 workers: number;
 is247: boolean;
 annualSavings: string;
 recommendedRobots: number;
 paybackMonths: string;
}

export interface ConsultationFormData {
 fabEnv: string;
 targetProcess: string;
 dailyVolume: string;
 companyName: string;
 contactName: string;
 email: string;
 phone: string;
 ndaAgreed: boolean;
}
