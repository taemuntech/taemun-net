// 리튬 호일 공정 데이터 데모 — 도메인 타입
// 가상 시드 데이터 전용. 실제 회사·고객 데이터가 아니다. 단위는 필드명 접미사로 밝힌다.

export const ICP_ELEMENTS = ["Na", "K", "Ca", "Fe", "Ni", "Cr", "Si"] as const;
export type IcpElement = (typeof ICP_ELEMENTS)[number];

/** 출하 규격 상한(ppm). 0.015% = 150ppm, 0.01% = 100ppm, 0.005% = 50ppm */
export const SPEC_LIMIT_PPM: Record<IcpElement, number> = {
  Na: 150,
  K: 100,
  Ca: 150,
  Fe: 50,
  Ni: 50,
  Cr: 50,
  Si: 100,
};

/** 리튬 금속 밀도 g/cm³ — 면밀도(g/m²) ↔ 두께(µm) 환산에 쓴다 */
export const LI_DENSITY_G_CM3 = 0.534;

export type MaterialLotType = "lithium_feed" | "release_film" | "rolling_oil" | "argon";
export type MaterialOrigin = "purchased" | "internal_scrap";

export type MaterialLot = {
  id: string; // RM-YYMM-NNN
  type: MaterialLotType;
  origin: MaterialOrigin;
  supplier: string;
  receivedAt: string; // YYYY-MM-DD
  massKg: number | null;
  coaAttached: boolean;
};

export type RefineMethod = "electro" | "precip";

export type RefineBatch = {
  id: string; // B-LI-YYMMDD-NN
  inputLotIds: string[];
  inputKg: number;
  outputKg: number;
  method: RefineMethod;
  recipeId: string;
  /** 도가니 누적 사용 횟수 — 교체 후 1 로 돌아간다 */
  crucibleUseCount: number;
  startedAt: string; // ISO datetime (+09:00)
  endedAt: string;
  operator: string;
};

export type IcpResult = {
  element: IcpElement;
  valuePpm: number;
  /** '<' 는 검출한계 미만 — 통계에 숫자로 넣지 않는다 */
  qualifier: "=" | "<";
  lab: string;
  reportedAt: string; // YYYY-MM-DD
};

export type Ingot = {
  id: string; // ING-YYMMDD-NN
  batchId: string;
  castAt: string; // YYYY-MM-DD
  massKg: number;
  densityGcm3: number;
  appearanceOk: boolean;
  icp: IcpResult[];
};

export type RollStage = "strip" | "mother" | "slit";
export type SurfaceGrade = "A" | "B" | "C";
export type RollStatus = "in_process" | "released" | "hold" | "shipped" | "scrapped";

export type Roll = {
  id: string; // R-<ING>-<M|S>-NN
  parentRollId: string | null;
  ingotId: string;
  stage: RollStage;
  widthMm: number;
  targetThicknessUm: number;
  recipeId: string;
  passCount: number;
  filmLotId: string | null;
  /** 이형 필름 재사용 횟수 (1 = 새 필름) */
  filmReuseCount: number | null;
  tearCount: number;
  lostLengthM: number;
  goodLengthM: number;
  /** 모 롤만 — 잉곳에서 떼어 압연에 투입한 리튬 질량(g). 슬릿 롤은 0 */
  billetG: number;
  grossG: number;
  tareG: number;
  /** 교대 시작 노점(℃). 수기 입력이라 결측이 있다 */
  dewPointC: number | null;
  startedAt: string; // ISO datetime
  endedAt: string;
  /** 면밀도 3점 (좌·중·우) g/m². 두께의 정본 */
  arealDensityGm2: [number, number, number] | null;
  surfaceGrade: SurfaceGrade | null;
  operator: string;
  status: RollStatus;
  /** 데모 전용 — 사용자가 화면에서 입력한 롤 구분 */
  entryMode: "seed" | "user";
};

export type ShipmentVerdict = "pending" | "accepted" | "claim";

export type Shipment = {
  id: string; // SH-YYMMDD-NN
  customer: string;
  orderDate: string; // YYYY-MM-DD
  promisedDate: string;
  shippedAt: string | null;
  rollIds: string[];
  verdict: ShipmentVerdict;
  claimReason: string | null;
};

export type NcType = "internal" | "claim" | "safety";
export type NcTargetType = "roll" | "ingot" | "shipment" | "batch";

export type NonConformance = {
  id: string; // NC-YYYY-NNN
  type: NcType;
  targetType: NcTargetType;
  targetId: string;
  reasonCode: string;
  description: string;
  openedAt: string; // YYYY-MM-DD
  closedAt: string | null;
};

/** 레시피 — 조건 원값(압하력·장력·전압 등)은 별도 보안 스키마. 운영 표엔 id 만 */
export type Recipe = {
  id: string;
  kind: "refine" | "rolling";
  name: string;
  note: string;
};

export type Dataset = {
  /** 기준일 — 모든 집계는 이 날짜 기준 */
  asOf: string;
  materialLots: MaterialLot[];
  batches: RefineBatch[];
  ingots: Ingot[];
  rolls: Roll[];
  shipments: Shipment[];
  nonconformances: NonConformance[];
  recipes: Recipe[];
};

/** 롤 일지 화면에서 받는 입력 — 모 롤 1개를 만든다 */
export type RollLogInput = {
  ingotId: string;
  recipeId: string;
  passCount: number;
  filmLotId: string;
  filmReuseCount: number;
  dewPointC: number | null;
  tearCount: number;
  lostLengthM: number;
  goodLengthM: number;
  widthMm: number;
  arealDensityGm2: [number, number, number] | null;
  surfaceGrade: SurfaceGrade | null;
  operator: string;
};
