import React, { useState } from 'react';
import { COHORT_RECORDS } from '../data/labData';
import { CheckCircle2, Search, Database } from 'lucide-react';

export const CohortRecordsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'univ' | 'police' | 'fire'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecords = COHORT_RECORDS.filter((rec) => {
    const matchesSearch =
      rec.name.includes(searchTerm) ||
      rec.target.includes(searchTerm) ||
      rec.verifiedScore.includes(searchTerm);

    if (!matchesSearch) return false;
    if (filter === 'univ') return (rec.target.includes('대') || rec.target.includes('사범대학'));
    if (filter === 'police') return rec.target.includes('경찰');
    if (filter === 'fire') return rec.target.includes('소방');
    return true;
  });

  return (
    <section
      id="cohort-records"
      className="w-full bg-[#131313] px-4 lg:px-12 py-10 lg:py-16 border-b border-[#201f1f]"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-telemetry text-[12px] text-[#ff5625] font-bold uppercase tracking-widest">
            [ VERIFIED COHORT ARCHIVE // 2023-2025 ]
          </span>
          <span className="h-px bg-[#2a2a2a] flex-1"></span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-[28px] lg:text-[36px] lg:text-[40px] font-bold text-[#ffffff] uppercase tracking-tight">
              실기 합격 코호트 정밀 계측 아카이브
            </h2>
            <p className="font-sans text-[14px] lg:text-[15px] text-[#9e9b9a] max-w-3xl mt-1">
              실제 피나클 1,000Hz 센서베이를 거쳐 S대·K대 및 소방·경찰 특채에 합격한 (예시) 수험생들의 실계측 지면반력 및 관절 궤적 데이터베이스입니다.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#9e9b9a] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="지원자명 / 지망대학 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#1c1b1b] border border-[#2a2a2a] pl-9 pr-3 py-1.5 text-[13px] text-[#ffffff] focus:outline-none focus:border-[#c3f400] transition-colors"
              />
            </div>

            <div className="flex items-center bg-[#1c1b1b] p-1 border border-[#2a2a2a]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setFilter('univ')}
                className={`px-2.5 py-1 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  filter === 'univ'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                체대입시
              </button>
              <button
                onClick={() => setFilter('police')}
                className={`px-2.5 py-1 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  filter === 'police'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                경찰특채
              </button>
              <button
                onClick={() => setFilter('fire')}
                className={`px-2.5 py-1 font-telemetry text-[11px] font-bold transition-colors cursor-pointer ${
                  filter === 'fire'
                    ? 'bg-[#c3f400] text-[#161e00]'
                    : 'text-[#9e9b9a] hover:text-[#ffffff]'
                }`}
              >
                소방특채
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((rec) => (
          <div
            key={rec.id}
            className="p-5 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-telemetry text-[11px] text-[#ff5625] font-bold">
                  {rec.id}
                </span>
                <span className="font-telemetry text-[10px] px-2 py-0.5 bg-[#2a2a2a] border border-[#353534] text-[#c3f400] font-bold">
                  {rec.admissionStatus}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="font-sans text-[18px] text-[#ffffff] font-bold">
                  {rec.name}
                </h3>
                <span className="font-telemetry text-[11px] text-[#9e9b9a]">
                  ({rec.examYear})
                </span>
              </div>

              <p className="font-sans text-[13px] text-[#ffb5a0] mb-3">
                {rec.target}
              </p>

              <div className="p-3 bg-[#0e0e0e] border border-[#2a2a2a] flex flex-col gap-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="font-telemetry text-[10px] text-[#9e9b9a]">
                    공식 검증 기록:
                  </span>
                  <span className="font-telemetry text-[13px] text-[#c3f400] font-bold">
                    {rec.verifiedScore}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-telemetry text-[10px] text-[#9e9b9a]">
                    바이오메카닉스 개선:
                  </span>
                  <span className="font-telemetry text-[12px] text-[#ffffff] font-bold">
                    {rec.gain}
                  </span>
                </div>
                <div className="text-[12px] text-[#9e9b9a] border-t border-[#2a2a2a] pt-1.5 mt-0.5">
                  핵심 지표: <span className="text-[#ffffff]">{rec.keyMetric}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2a2a2a] flex items-center justify-between font-telemetry text-[10px] text-[#9e9b9a]">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-[#c3f400]" />
                {rec.forcePlateId}
              </span>
              <span>{rec.sensorVerification}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
