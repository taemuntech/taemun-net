export interface CommercialBuilding {
  id: string;
  name: string;
  location: string;
  district: string;
  gfa: string;
  siteArea: string;
  floors: string;
  mainTenants: string;
  rentalYield: string;
  image: string;
  concept: string;
  summary: string;
  features: string[];
}

export interface YieldSimulationResult {
  pyeong: number;
  zoning: string;
  maxFar: number;
  bcr: number;
  totalGfa: number;
  floors: string;
  estBuildCost: number;
  estDeposit: number;
  estMonthlyRent: number;
  estAnnualYield: number;
}
