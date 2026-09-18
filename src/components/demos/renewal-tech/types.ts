export interface RemodelingProject {
  id: string;
  name: string;
  location: string;
  builtYear: string;
  remodeledYear: string;
  gfa: string;
  floors: string;
  scope: string;
  valueIncrease: string;
  beforeImage: string;
  afterImage: string;
  summary: string;
  features: string[];
}

export interface RetrofitTech {
  id: string;
  name: string;
  category: string;
  description: string;
  merits: string[];
  image: string;
}
