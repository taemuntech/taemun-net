/**
 * 플래그십(타이탄 16 프로) 구성기 — **한 곳짜리 계산**.
 *
 * 왜 뽑았나(실측 2026-09-17): 같은 계산이 HeroSpotlight 와 TechnovaGearApp 에 한 벌씩 있어서,
 * 구성기에서 GPU 를 올리면 히어로 값만 오르고 바로 아래 대조 매트릭스는 옛 값을 그대로 띄웠다.
 * 한 지면에 같은 모델의 가격이 두 개 뜨고, 매트릭스의 구매 단추를 누르면 주문서에는 **또 다른** 값이 찍혔다.
 * 이제 히어로·매트릭스·주문서가 전부 이 함수 하나를 부른다.
 *
 * ⚠️ 부품 이름은 **일반 규격**으로만 적는다(nordic-peak/data/products.ts 와 같은 기준).
 *    실존 제조사의 제품 라인 이름(그래픽카드·CPU 모델명)을 지어낸 브랜드의 사양표에 적으면
 *    제휴·정품 공급처럼 읽힌다. 상표 이름이 필요하면 「외장 GPU 16GB」 처럼 규격으로 내린다.
 */

export type SpecFilterState = {
  gpu: string;
  cpu: string;
  display: string;
  ram: string;
};

export type SpecOption = { value: string; label: string };

export const GPU_OPTIONS: ReadonlyArray<SpecOption> = [
  { value: 'gpu-ultra', label: '16GB 최상위' },
  { value: 'gpu-high', label: '16GB 상위' },
  { value: 'gpu-mid', label: '12GB 상급' },
  { value: 'gpu-alt', label: '16GB 대체칩' },
];

export const CPU_OPTIONS: ReadonlyArray<SpecOption> = [
  { value: 'cpu-npu', label: '16코어 NPU형' },
  { value: 'cpu-mt', label: '16코어 32스레드형' },
];

export const DISPLAY_OPTIONS: ReadonlyArray<SpecOption> = [
  { value: 'OLED 240Hz', label: 'OLED 240Hz' },
  { value: '4K Mini-LED 165Hz', label: '4K Mini-LED 165Hz' },
  { value: 'QHD 360Hz', label: 'QHD 360Hz' },
];

export const RAM_OPTIONS: ReadonlyArray<SpecOption> = [
  { value: '16GB', label: '16GB' },
  { value: '32GB DDR5', label: '32GB DDR5' },
  { value: '64GB', label: '64GB' },
];

export const DEFAULT_FILTERS: SpecFilterState = {
  gpu: 'gpu-high',
  cpu: 'cpu-npu',
  display: 'OLED 240Hz',
  ram: '32GB DDR5',
};

const OPTION_GROUPS: Record<keyof SpecFilterState, ReadonlyArray<SpecOption>> = {
  gpu: GPU_OPTIONS,
  cpu: CPU_OPTIONS,
  display: DISPLAY_OPTIONS,
  ram: RAM_OPTIONS,
};

/** 화면에 보일 이름. 값(코드)을 그대로 토스트에 쓰면 「gpu-high 적용」 같은 말이 나온다. */
export function labelOf(key: keyof SpecFilterState, value: string): string {
  return OPTION_GROUPS[key].find((o) => o.value === value)?.label ?? value;
}

export type FlagshipConfig = {
  price: number;
  originalPrice: number;
  discountRate: number;
  score: number;
  gpuName: string;
  tgpText: string;
  cpuName: string;
  cpuDetail: string;
  panelName: string;
  ramName: string;
  monthlyInstallment: number;
  sku: string;
  summary: string;
};

const GPU_TABLE: Record<string, { price: number; originalPrice: number; score: number; gpuName: string; tgpText: string }> = {
  'gpu-ultra': {
    price: 3490000,
    originalPrice: 4190000,
    score: 24800,
    gpuName: '외장 GPU 16GB (최상위)',
    tgpText: '최대 TGP 175W 풀언락 (OC 모드)',
  },
  'gpu-high': {
    price: 2890000,
    originalPrice: 3520000,
    score: 21500,
    gpuName: '외장 GPU 16GB (상위)',
    tgpText: '최대 TGP 175W + 동적 부스트',
  },
  'gpu-mid': {
    price: 2490000,
    originalPrice: 2990000,
    score: 17900,
    gpuName: '외장 GPU 12GB (상급)',
    tgpText: '최대 TGP 140W 저소음 고효율',
  },
  'gpu-alt': {
    price: 2650000,
    originalPrice: 3190000,
    score: 19800,
    gpuName: '외장 GPU 16GB (대체 아키텍처)',
    tgpText: '최대 TGP 180W 전력 자동 배분',
  },
};

export function computeFlagshipConfig(filters: SpecFilterState): FlagshipConfig {
  const base = GPU_TABLE[filters.gpu] ?? GPU_TABLE['gpu-high'];

  let price = base.price;
  let originalPrice = base.originalPrice;

  if (filters.ram === '64GB') {
    price += 250000;
    originalPrice += 300000;
  } else if (filters.ram === '16GB') {
    price -= 120000;
    originalPrice -= 150000;
  }

  const isMultiThread = filters.cpu === 'cpu-mt';
  const cpuName = isMultiThread ? '모바일 CPU 16코어 32스레드' : '모바일 CPU 16코어 22스레드';
  const cpuDetail = isMultiThread
    ? '32스레드 고성능 코어 전 구성 (예시 표기)'
    : '22스레드 + 내장 NPU AI 가속 (예시 표기)';

  const panelName =
    filters.display === '4K Mini-LED 165Hz'
      ? '16형 4K Mini-LED 165Hz'
      : filters.display === 'QHD 360Hz'
        ? '16형 QHD+ 360Hz Fast-IPS'
        : '16형 2.5K OLED 240Hz';

  const ramName = labelOf('ram', filters.ram);
  const skuCpu = filters.cpu.replace(/^cpu-/, '').toUpperCase();
  const skuGpu = filters.gpu.replace(/^gpu-/, '').toUpperCase();

  return {
    price,
    originalPrice,
    discountRate: Math.round(((originalPrice - price) / originalPrice) * 100),
    score: base.score,
    gpuName: base.gpuName,
    tgpText: base.tgpText,
    cpuName,
    cpuDetail,
    panelName,
    ramName,
    monthlyInstallment: Math.round(price / 24),
    sku: `TN-G16-${skuCpu}-${skuGpu}`,
    summary: `${cpuName} / ${base.gpuName} / ${ramName} / ${panelName}`,
  };
}
