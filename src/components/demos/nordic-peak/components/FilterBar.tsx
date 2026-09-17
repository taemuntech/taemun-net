import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  /** 지금 조건으로 걸러진 상품 수 — 필터가 실제로 결과를 바꾸는지 화면에서 보이게 한다 */
  resultCount: number;
}

type ChipGroup = {
  key: keyof FilterState;
  index: string;
  title: string;
  /** 오른쪽 모노 표기 */
  readout: Record<string, string>;
  options: { value: string; label: string; tone?: 'accent' }[];
};

const GROUPS: ChipGroup[] = [
  {
    key: 'season',
    index: '[01]',
    title: '시즌 등급',
    readout: { all: 'ALL-SEASON', winter: '4-SEASON MIL', summer: 'SUMMER MESH' },
    options: [
      { value: 'all', label: '전체' },
      { value: 'winter', label: '❄️ 동계 익스페디션 (극한기)', tone: 'accent' },
      { value: 'summer', label: '☀️ 하계 메쉬' },
    ],
  },
  {
    key: 'capacity',
    index: '[02]',
    title: '수용 인원',
    readout: { all: 'ALL SIZES', '1-2': '1-2P SOLO', '4': '4-PERSON SPEC', '6-8': '6-8P MEGA' },
    options: [
      { value: 'all', label: '전체' },
      { value: '1-2', label: '1-2인 솔로' },
      { value: '4', label: '4인 베이스캠프' },
      { value: '6-8', label: '6-8인 메가' },
    ],
  },
  {
    key: 'pole',
    index: '[03]',
    title: '프레임 폴대',
    readout: { all: 'ALL FRAMES', alloy: 'ALU NSL 11.0mm', '7001': '7001 ALUM', carbon: 'CARBON COMPOSITE' },
    options: [
      { value: 'all', label: '전체' },
      { value: 'alloy', label: '경량 알루미늄 11mm' },
      { value: '7001', label: '7001 항공알루미늄' },
      { value: 'carbon', label: '카본 복합재' },
    ],
  },
  {
    key: 'fabric',
    index: '[04]',
    title: '원단 규격',
    readout: { all: 'ALL FABRICS', '70d': '70D RIPSTOP SIL/PU', '40d': '40D HD NYLON', tc: 'TC COTTON' },
    options: [
      { value: 'all', label: '전체' },
      { value: '70d', label: '70D 립스탑 실리콘/PU' },
      { value: '40d', label: '40D 고강도 나일론' },
      { value: 'tc', label: 'TC 면혼방' },
    ],
  },
];

const isDefault = (f: FilterState) =>
  f.category === 'all' && f.season === 'all' && f.capacity === 'all' && f.pole === 'all' && f.fabric === 'all';

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  resultCount,
}) => {
  const countOf = (key: string) => PRODUCTS.filter((p) => p.category === key).length;

  /**
   * 속성 칩 한 개가 실제로 몇 종을 내는지 — **판정은 NordicPeakApp 과 같은 규칙**을 쓴다
   * (season 은 상품 값이 'all' 이면 어느 계절 조건에도 걸린다).
   *
   * 왜 필요한가(실측 2026-09-17): 상품이 4종뿐인데 칩은 그보다 넓게 깔려 있어서
   * 「6-8인 메가」·「카본 복합재」·「TC 면혼방」은 언제 눌러도 결과가 0종이었다. 위 분류 탭은 개수를
   * 붙여 0종 탭을 막아 뒀는데 아래 속성 칩에는 그 장치가 없었다. 이제 같은 장치를 쓴다.
   */
  const countForOption = (key: keyof FilterState, value: string) => {
    if (value === 'all') return PRODUCTS.length;
    if (key === 'season') return PRODUCTS.filter((p) => p.season === 'all' || p.season === value).length;
    return PRODUCTS.filter((p) => String(p[key as 'capacity' | 'pole' | 'fabric']) === value).length;
  };

  return (
    <section className="bg-surface-container-low border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        {/* 1단계: 분류 탭 — 상품이 있는 분류만 둔다 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-outline-variant no-scrollbar">
          <button
            onClick={() => onFilterChange('category', 'all')}
            aria-pressed={filters.category === 'all'}
            className={`min-h-11 lg:min-h-0 px-3 lg:py-1.5 inline-flex items-center rounded-sm font-label-mono-md text-label-mono-md border whitespace-nowrap transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
            }`}
          >
            전체 기어 ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((c) => {
            const active = filters.category === c.key;
            return (
              <button
                key={c.key}
                onClick={() => onFilterChange('category', c.key)}
                aria-pressed={active}
                className={`min-h-11 lg:min-h-0 px-3 lg:py-1.5 inline-flex items-center gap-2 rounded-sm font-label-mono-md text-label-mono-md border whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>}
                {c.shortLabel} ({countOf(c.key)})
              </button>
            );
          })}
        </div>

        {/* 2·3단계: 속성 필터 — 고른 값이 실제로 아래 목록을 거른다 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 pt-3">
          {GROUPS.map((g) => {
            const current = filters[g.key];
            // 0종 칩은 「준비 중」과 같은 말이라 아예 내보내지 않는다.
            const options = g.options.filter((o) => countForOption(g.key, o.value) > 0);
            if (options.length <= 1) return null;
            return (
              <div key={g.key} className="bg-surface-container p-2.5 rounded-sm border border-outline-variant">
                <div className="font-label-mono-sm text-label-mono-sm text-outline flex items-center justify-between gap-2 mb-1.5">
                  <span className="whitespace-nowrap">
                    {g.index} {g.title}
                  </span>
                  <span className="text-primary font-mono text-right">{g.readout[current] ?? g.readout.all}</span>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {options.map((o) => {
                    const active = current === o.value;
                    const accent = o.tone === 'accent';
                    return (
                      <button
                        key={o.value}
                        onClick={() => onFilterChange(g.key, o.value)}
                        aria-pressed={active}
                        className={`min-h-11 lg:min-h-0 px-2.5 lg:py-1 inline-flex items-center gap-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                          active
                            ? accent
                              ? 'bg-tertiary-container text-on-tertiary-container border-tertiary font-bold'
                              : 'bg-primary-container text-on-primary-container border-primary font-bold'
                            : 'bg-surface-container-high border-outline-variant text-outline hover:text-on-surface'
                        }`}
                      >
                        {o.label}
                        <span className="opacity-70">({countForOption(g.key, o.value)})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 결과 수 + 초기화 */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 font-label-mono-sm text-label-mono-sm">
          <span className="text-outline">
            조건에 맞는 장비{' '}
            <strong className="text-primary font-bold">{resultCount}종</strong>
            <span> / 전체 {PRODUCTS.length}종</span>
          </span>
          <button
            onClick={onResetFilters}
            disabled={isDefault(filters)}
            className="min-h-11 lg:min-h-0 px-3 lg:py-1.5 inline-flex items-center gap-1.5 rounded-sm border border-outline-variant bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
              restart_alt
            </span>
            필터 초기화
          </button>
        </div>
      </div>
    </section>
  );
};
