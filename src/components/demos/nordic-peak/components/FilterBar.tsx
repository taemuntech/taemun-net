import React from 'react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <section className="bg-surface-container-low border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        {/* Tier 1: Primary Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-outline-variant no-scrollbar">
          <button
            onClick={() => onFilterChange('category', 'all')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-md text-label-mono-md border whitespace-nowrap transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
            }`}
          >
            전체 기어
          </button>
          <button
            onClick={() => onFilterChange('category', 'shelter')}
            className={`px-3.5 py-1.5 rounded-sm font-label-mono-md text-label-mono-md border flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              filters.category === 'shelter'
                ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
            }`}
          >
            {filters.category === 'shelter' && (
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            )}
            지오데식 돔 텐트 {filters.category === 'shelter' && '(선택됨)'}
          </button>
          <button
            onClick={() => onFilterChange('category', 'tunnel')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-md text-label-mono-md border whitespace-nowrap transition-colors cursor-pointer ${
              filters.category === 'tunnel'
                ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
            }`}
          >
            2룸 터널 텐트
          </button>
          <button
            onClick={() => onFilterChange('category', 'backpacking')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-md text-label-mono-md border whitespace-nowrap transition-colors cursor-pointer ${
              filters.category === 'backpacking'
                ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
            }`}
          >
            초경량 백패킹
          </button>
          <button
            onClick={() => onFilterChange('category', 'tarp')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-md text-label-mono-md border whitespace-nowrap transition-colors cursor-pointer ${
              filters.category === 'tarp'
                ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface border-outline-variant'
            }`}
          >
            옥타 쉘터 시스템
          </button>
        </div>

        {/* Tier 2 & 3: Tactical Parametric Attribute Filters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 pt-3">
          {/* Filter 1: Season */}
          <div className="bg-surface-container p-2.5 rounded-sm border border-outline-variant">
            <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase flex items-center justify-between mb-1.5">
              <span>[01] 시즌 등급</span>
              <span className="text-primary font-mono">
                {filters.season === 'winter'
                  ? '4-SEASON MIL'
                  : filters.season === 'summer'
                  ? 'SUMMER MESH'
                  : 'ALL-SEASON'}
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => onFilterChange('season', 'all')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.season === 'all'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                    : 'bg-surface-container-high border-outline-variant text-on-surface'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => onFilterChange('season', 'winter')}
                className={`px-2 py-1 rounded font-label-mono-sm text-label-mono-sm flex items-center gap-1 transition-colors cursor-pointer ${
                  filters.season === 'winter'
                    ? 'bg-tertiary-container text-on-tertiary-container font-bold border border-tertiary'
                    : 'bg-surface-container-high border border-outline-variant text-outline'
                }`}
              >
                ❄️ 동계 익스페디션 (극한기)
              </button>
              <button
                onClick={() => onFilterChange('season', 'summer')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.season === 'summer'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                ☀️ 하계 메쉬
              </button>
            </div>
          </div>

          {/* Filter 2: Capacity */}
          <div className="bg-surface-container p-2.5 rounded-sm border border-outline-variant">
            <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase flex items-center justify-between mb-1.5">
              <span>[02] 수용 인원</span>
              <span className="text-primary font-mono">
                {filters.capacity === '4'
                  ? '4-PERSON SPEC'
                  : filters.capacity === '1-2'
                  ? '1-2P SOLO'
                  : filters.capacity === '6-8'
                  ? '6-8P MEGA'
                  : 'ALL SIZES'}
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => onFilterChange('capacity', '1-2')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.capacity === '1-2'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                1-2인 솔로
              </button>
              <button
                onClick={() => onFilterChange('capacity', '4')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.capacity === '4'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                4인 베이스캠프
              </button>
              <button
                onClick={() => onFilterChange('capacity', '6-8')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.capacity === '6-8'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                6-8인 메가
              </button>
            </div>
          </div>

          {/* Filter 3: Pole Architecture */}
          <div className="bg-surface-container p-2.5 rounded-sm border border-outline-variant">
            <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase flex items-center justify-between mb-1.5">
              <span>[03] 프레임 폴대</span>
              <span className="text-primary font-mono">
                {filters.pole === 'dac'
                  ? 'DAC NSL 11.0mm'
                  : filters.pole === '7001'
                  ? '7001 ALUM'
                  : 'CARBON COMPOSITE'}
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => onFilterChange('pole', 'dac')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.pole === 'dac'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                DAC 페더라이트 NSL
              </button>
              <button
                onClick={() => onFilterChange('pole', '7001')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.pole === '7001'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                7001 항공알루미늄
              </button>
              <button
                onClick={() => onFilterChange('pole', 'carbon')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.pole === 'carbon'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                카본 복합재
              </button>
            </div>
          </div>

          {/* Filter 4: Fabric Spec */}
          <div className="bg-surface-container p-2.5 rounded-sm border border-outline-variant">
            <div className="font-label-mono-sm text-label-mono-sm text-outline uppercase flex items-center justify-between mb-1.5">
              <span>[04] 원단 규격</span>
              <span className="text-primary font-mono">
                {filters.fabric === '70d'
                  ? '70D RIPSTOP SIL/PU'
                  : filters.fabric === '40d'
                  ? '40D CORDURA'
                  : 'TC COTTON'}
              </span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => onFilterChange('fabric', '70d')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.fabric === '70d'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                70D 립스탑 실리콘/PU
              </button>
              <button
                onClick={() => onFilterChange('fabric', '40d')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.fabric === '40d'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                40D 코듀라 방폭
              </button>
              <button
                onClick={() => onFilterChange('fabric', 'tc')}
                className={`px-2 py-1 rounded border font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                  filters.fabric === 'tc'
                    ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                    : 'bg-surface-container-high border-outline-variant text-outline'
                }`}
              >
                TC 면혼방
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
