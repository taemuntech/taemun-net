import React, { useState, useMemo } from 'react';
import { ADMISSION_MATRIX_DATA } from '../data/mockData';
import { MatrixCategory, AdmissionCutoffItem } from '../types';
import { Search, Download, Scale, LineChart, CheckCircle2, FileText, ChevronDown } from 'lucide-react';

export const AdmissionMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MatrixCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exporting, setExporting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AdmissionCutoffItem | null>(null);

  const categories: { id: MatrixCategory; label: string }[] = [
    { id: 'all', label: '전체 보기 (ALL)' },
    { id: 'sky', label: 'S·K·Y 주요 로스쿨 (예시)' },
    { id: 'metro', label: '수도권 주요 로스쿨' },
    { id: 'national', label: '지방 거점 국립대' },
    { id: 'cpa', label: 'CPA 1차·2차 커트라인' },
  ];

  const filteredData = useMemo(() => {
    return ADMISSION_MATRIX_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.division.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        item.cut2024.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const handleExportCsv = () => {
    setExporting(true);
    setTimeout(() => {
      const headers = [
        '대학/기관명',
        '군구분',
        '모집정원',
        '2024 Cut',
        '2023 Cut',
        '2022 Cut',
        '3개년 표준환산',
        'GPA 최저',
        '공인영어',
        'APEX 점유율',
        '전형 분석'
      ];
      const rows = filteredData.map((d) => [
        `"${d.name}"`,
        `"${d.division}"`,
        `"${d.quota}"`,
        `"${d.cut2024}"`,
        `"${d.cut2023}"`,
        `"${d.cut2022}"`,
        `"${d.threeYearAvg}"`,
        `"${d.minGpa}"`,
        `"${d.englishReq}"`,
        `"${d.apexShare}"`,
        `"${d.comment}"`
      ]);

      const csvContent =
        '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `APEX_2025_LEET_CPA_Percentile_Matrix_${activeCategory}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExporting(false);
    }, 600);
  };

  return (
    <section
      id="matrix-section"
      className="w-full px-4 lg:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 bg-[#f8f9ff]"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-[#0d1c2f]/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5">
              <span className="font-label-sm text-xs text-[#45464d] uppercase tracking-widest">
                MODULE II // DATA ARCHIVE
              </span>
              <span className="text-[#45464d]">◆</span>
              <span className="font-label-sm text-xs text-[#cf6721] font-semibold uppercase">
                VERIFIED EMPIRICAL CUTOFFS
              </span>
            </div>
            <h2 className="font-headline-lg text-3xl lg:text-4xl text-[#0d1c2f] uppercase tracking-tight font-bold">
              3-Year LEET & CPA Percentile Matrix
            </h2>
            <p className="font-body-md text-sm lg:text-base text-[#45464d] max-w-3xl mt-1 leading-relaxed">
              최근 3개년 전국 법학전문대학원 정시 1단계 통과자 환산 성적 및 공인회계사(CPA) 1·2차
              표준점수 마지노선 심층 비교표.
            </p>
          </div>

          {/* Export & Timestamp */}
          <div className="flex items-center gap-3 self-start lg:self-end">
            <span className="font-label-sm text-[11px] text-[#45464d] uppercase tracking-wider hidden lg:inline">
              DATABASE TIMESTAMP: 2025.02 VER.
            </span>
            <button
              onClick={handleExportCsv}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e6eeff] text-[#0d1c2f] font-label-sm text-xs tracking-wider uppercase border border-[#0d1c2f]/15 hover:bg-[#dde9ff] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#cf6721]" />
              <span>{exporting ? 'CSV 생성 중...' : 'CSV 추출'}</span>
            </button>
          </div>
        </div>

        {/* Filter Tab Bar & Search Engine */}
        <div className="bg-[#ffffff] p-3 lg:p-4 border border-[#0d1c2f]/10 shadow-xs space-y-3">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 font-label-sm text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#000000] text-white font-semibold'
                        : 'bg-[#e6eeff] text-[#0d1c2f] hover:bg-[#dde9ff]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-2.5 top-2.5 text-[#45464d] w-4 h-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="대학명, 군 구분, 전형 검색..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#e6eeff] text-[#0d1c2f] font-body-sm text-xs lg:text-sm border border-[#0d1c2f]/15 focus:outline-none focus:bg-[#ffffff] focus:border-[#0d1c2f]/40 placeholder:text-[#45464d]/70"
              />
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="w-full overflow-x-auto border border-[#0d1c2f]/10 shadow-xs bg-[#ffffff]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#eff4ff] text-[#0d1c2f] font-label-sm text-[11px] uppercase tracking-wider border-b border-[#0d1c2f]/15">
                <th className="p-3">로스쿨 / 전형 구분</th>
                <th className="p-3 text-center">모집정원</th>
                <th className="p-3 text-right">2024 백분위 Cut</th>
                <th className="p-3 text-right">2023 백분위 Cut</th>
                <th className="p-3 text-right">2022 백분위 Cut</th>
                <th className="p-3 text-right">3개년 표준점수 환산</th>
                <th className="p-3 text-right">GPA 최저선</th>
                <th className="p-3 text-center">공인영어</th>
                <th className="p-3 text-right">APEX 합격점유율</th>
                <th className="p-3">전형 분석 코멘트</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-xs lg:text-sm divide-y divide-[#0d1c2f]/10">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-[#45464d] font-serif">
                    검색 조건에 일치하는 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => {
                  const isSelected = selectedItem?.id === row.id;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedItem(isSelected ? null : row)}
                      className={`hover:bg-[#eff4ff]/80 transition-colors cursor-pointer ${
                        row.isCpa ? 'bg-[#eff4ff]/30' : ''
                      } ${isSelected ? 'bg-[#dae2fd]/40' : ''}`}
                    >
                      <td className="p-3 font-semibold text-[#0d1c2f]">
                        <div className="flex items-center gap-2">
                          {row.isCpa ? (
                            <LineChart className="w-4 h-4 text-[#cf6721] shrink-0" />
                          ) : (
                            <Scale className="w-4 h-4 text-[#cf6721] shrink-0" />
                          )}
                          <span className="font-medium">{row.name}</span>
                          <span
                            className={`px-1.5 py-0.5 text-[10px] font-label-sm shrink-0 ${
                              row.isCpa
                                ? 'bg-[#000000] text-white'
                                : 'bg-[#e6eeff] text-[#0d1c2f] border border-[#0d1c2f]/15'
                            }`}
                          >
                            {row.division}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-center font-label-md text-xs">{row.quota}</td>
                      <td className="p-3 text-right font-label-md text-xs font-bold text-[#0d1c2f]">
                        {row.cut2024}
                      </td>
                      <td className="p-3 text-right font-label-md text-xs text-[#45464d]">
                        {row.cut2023}
                      </td>
                      <td className="p-3 text-right font-label-md text-xs text-[#45464d]">
                        {row.cut2022}
                      </td>
                      <td className="p-3 text-right font-label-md text-xs text-[#0d1c2f] font-semibold">
                        {row.threeYearAvg}
                      </td>
                      <td className="p-3 text-right font-label-md text-xs text-[#0d1c2f]">
                        {row.minGpa}
                      </td>
                      <td className="p-3 text-center font-label-sm text-xs text-[#45464d]">
                        {row.englishReq}
                      </td>
                      <td className="p-3 text-right">
                        <span className="font-label-md text-xs font-bold text-[#0d1c2f] bg-[#e6eeff] px-2 py-0.5 inline-block">
                          {row.apexShare}
                        </span>
                      </td>
                      <td className="p-3 text-[#45464d] text-xs leading-snug max-w-xs">
                        {row.comment}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Row Drawer Detail */}
        {selectedItem && (
          <div className="p-4 bg-[#eff4ff] border border-[#cf6721]/30 text-[#0d1c2f] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 animate-in fade-in duration-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#000000] text-white font-label-sm text-xs">
                  {selectedItem.division}
                </span>
                <span className="font-headline-md text-base font-bold">
                  {selectedItem.name} 정밀 입시 프로파일
                </span>
              </div>
              <p className="font-body-sm text-xs lg:text-sm text-[#45464d]">
                2024년 백분위 Cut: <strong className="text-[#0d1c2f]">{selectedItem.cut2024}</strong> | 
                3개년 평균: <strong className="text-[#0d1c2f]">{selectedItem.threeYearAvg}</strong> | 
                최저 GPA: <strong className="text-[#0d1c2f]">{selectedItem.minGpa}</strong> | 
                APEX 점유율: <strong className="text-[#cf6721]">{selectedItem.apexShare}</strong>
              </p>
            </div>
            <a
              href="#audit-form"
              className="px-4 py-2 bg-[#000000] text-white font-label-sm text-xs uppercase tracking-wider hover:bg-[#131b2e] transition-colors shrink-0"
            >
              해당 학교 목표 전형 상담 신청
            </a>
          </div>
        )}

        {/* Data Matrix Footer Legend */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-3.5 bg-[#eff4ff] border border-[#0d1c2f]/10 shadow-xs gap-2">
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-xs text-[#45464d] uppercase font-semibold">
              AUDIT VERIFICATION CERTIFIED:
            </span>
            <span className="inline-flex items-center gap-1.5 font-label-sm text-xs text-[#0d1c2f]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#cf6721]" />
              2024 입시 결과 공식 전수 조사 완료
            </span>
          </div>
          <div className="font-label-sm text-[11px] text-[#45464d]">
            * 표기된 LEET 점수는 법학전문대학원협의회 표준점수 총점 기준임.
          </div>
        </div>
      </div>
    </section>
  );
};
