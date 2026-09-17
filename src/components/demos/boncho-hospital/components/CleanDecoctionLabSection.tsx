import React, { useState } from 'react';
import { SAMPLE_HERB_CERTIFICATES } from '../data/hospitalData';
import { HerbBatchCertificate } from '../types';

export const CleanDecoctionLabSection: React.FC = () => {
  const [searchCode, setSearchCode] = useState('BC-2026-HERB');
  const [selectedCertificate, setSelectedCertificate] = useState<HerbBatchCertificate | null>(
    SAMPLE_HERB_CERTIFICATES['BC-2026-HERB']
  );
  const [notFoundCode, setNotFoundCode] = useState<string | null>(null);

  // 없는 코드에 「적합」 성적서를 지어내 보여 주면, 아무 글자나 넣어도 통과하는 가짜 검증이 된다.
  // 예시 코드 3종만 결과를 내고 나머지는 「조회되지 않음」으로 끝낸다.
  const handleSearch = (codeToSearch?: string) => {
    const code = (codeToSearch ?? searchCode).trim().toUpperCase();
    if (!code) return;

    // 부분 일치 폴백은 두지 않는다 — 하이픈 한 글자에도 「적합」 성적서가 떠 버린다.
    // 오타 구제가 필요하면 8자 이상 입력에 한해 접두 일치만 허용한다.
    let found = SAMPLE_HERB_CERTIFICATES[code];
    if (!found && code.length >= 8) {
      const keys = Object.keys(SAMPLE_HERB_CERTIFICATES).filter((k) => k.startsWith(code));
      if (keys.length === 1) {
        found = SAMPLE_HERB_CERTIFICATES[keys[0]];
      }
    }

    if (found) {
      setSelectedCertificate(found);
      setNotFoundCode(null);
    } else {
      setSelectedCertificate(null);
      setNotFoundCode(code);
    }
  };

  const fillSample = (code: string) => {
    setSearchCode(code);
    handleSearch(code);
  };

  return (
    <section id="smart-decoction-lab" className="w-full bg-[#f4f3f0] py-16 border-y border-[#e9e8e5]">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-[720px] mx-auto mb-12">
          <span className="text-[12px] text-[#75593c] tracking-widest uppercase font-semibold">
            GAP &amp; hGMP 규격 약재 · 원내 탕전
          </span>
          <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold mt-1">
            맑고 깊은 치유의 원천, 원내 스마트 청정 탕전실
          </h2>
          <p className="text-[15px] text-[#424844] mt-2">
            외부 위탁이 아닌 원내 조제 구역에서, 전담 한약사가 4단계 품질 공정을 거쳐 환자 1인 1처방을 달입니다.
          </p>
        </div>

        {/* 4-Step Process Visual Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl border border-[#e3e2e0] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="font-serif text-[28px] text-[#75593c]/25 absolute top-4 right-4 font-bold">
              01
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#e9e8e5] flex items-center justify-center text-[#102a20] mb-4">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <h4 className="text-[17px] font-bold text-[#102a20] mb-2 font-serif">
              엄선된 규격품 본초
            </h4>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              hGMP·GAP 규격 약재를 산지 직송으로 받고(예시 표기), 잔류농약·중금속 시험 성적서를 로트별로 원내에 비치합니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl border border-[#e3e2e0] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="font-serif text-[28px] text-[#75593c]/25 absolute top-4 right-4 font-bold">
              02
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#e9e8e5] flex items-center justify-center text-[#102a20] mb-4">
              <span className="material-symbols-outlined text-[22px]">water</span>
            </div>
            <h4 className="text-[17px] font-bold text-[#102a20] mb-2 font-serif">
              3중 역삼투압 약수 정제
            </h4>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              탕전에 쓰는 물은 미세 불순물과 염소 성분을 걸러 내는 3단계 RO 정수를 거친 물만 사용합니다.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl border border-[#e3e2e0] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="font-serif text-[28px] text-[#75593c]/25 absolute top-4 right-4 font-bold">
              03
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#e9e8e5] flex items-center justify-center text-[#102a20] mb-4">
              <span className="material-symbols-outlined text-[22px]">local_cafe</span>
            </div>
            <h4 className="text-[17px] font-bold text-[#102a20] mb-2 font-serif">
              전통 옹기 무압력 저온 순환
            </h4>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              고온 고압 대신 저온 순환 무압력 방식으로 달여, 휘발성 정유 성분이 날아가는 것을 줄입니다.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-xl border border-[#e3e2e0] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="font-serif text-[28px] text-[#75593c]/25 absolute top-4 right-4 font-bold">
              04
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#e9e8e5] flex items-center justify-center text-[#102a20] mb-4">
              <span className="material-symbols-outlined text-[22px]">sanitizer</span>
            </div>
            <h4 className="text-[17px] font-bold text-[#102a20] mb-2 font-serif">
              4중 알루미늄 무균 밀봉
            </h4>
            <p className="text-[13px] text-[#424844] leading-relaxed">
              4중 파우치로 산소와 직사광선을 차단해 포장하고, 복용 시점과 보관법을 라벨에 적어 드립니다.
            </p>
          </div>
        </div>

        {/* 내 한약 안심 이력조회 인터랙티브 검색 위젯 (Interactive Herb Traceability) */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-md border border-[#e3e2e0] max-w-[1000px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffd9b4] text-[#533417] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">search_check</span>
              </div>
              <div>
                <h3 className="font-serif text-[20px] text-[#102a20] font-semibold">
                  내 한약 이력 조회 (예시 데이터)
                </h3>
                <p className="text-[13px] text-[#424844]">
                  탕약 파우치 상단의 처방코드 또는 배치 번호를 입력하여 시험 성적서를 확인하세요.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => fillSample('BC-2026-HERB')}
                className="px-2.5 py-1 max-lg:min-h-[44px] max-lg:px-3.5 rounded bg-[#efeeeb] text-[#75593c] text-[11px] font-medium hover:bg-[#e3e2e0] transition-colors cursor-pointer"
              >
                암 치료기 회복 처방
              </button>
              <button
                onClick={() => fillSample('BC-2026-TRAFFIC')}
                className="px-2.5 py-1 max-lg:min-h-[44px] max-lg:px-3.5 rounded bg-[#efeeeb] text-[#75593c] text-[11px] font-medium hover:bg-[#e3e2e0] transition-colors cursor-pointer"
              >
                당수활혈탕(교통사고)
              </button>
              <button
                onClick={() => fillSample('BC-2026-REHAB')}
                className="px-2.5 py-1 max-lg:min-h-[44px] max-lg:px-3.5 rounded bg-[#efeeeb] text-[#75593c] text-[11px] font-medium hover:bg-[#e3e2e0] transition-colors cursor-pointer"
              >
                보양환오탕(재활)
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative grow">
              <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-[#727974] text-[20px]">
                qr_code_scanner
              </span>
              <input
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#faf9f6] text-[#1a1c1a] text-[14px] border border-[#c2c8c3] focus:outline-none focus:ring-2 focus:ring-[#102a20] shadow-inner"
                placeholder="처방 이력 코드 입력 (예: BC-2026-HERB)"
                type="text"
              />
            </div>
            <button
              type="button"
              onClick={() => handleSearch()}
              className="px-6 py-3 rounded-lg bg-[#102a20] text-white text-[14px] font-semibold shadow-sm hover:bg-[#264035] active:scale-95 transition-colors shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>안심 성적서 조회</span>
            </button>
          </div>

          {/* 조회 결과 없음 — 지어낸 「적합」 성적서 대신 예시 코드로 안내한다 */}
          {notFoundCode && (
            <div className="mt-6 p-5 rounded-xl bg-[#f4f3f0] border border-[#e3e2e0] flex items-start gap-3 animate-in fade-in duration-200 break-keep">
              <span className="material-symbols-outlined text-[22px] text-[#75593c] shrink-0">search_off</span>
              <div className="text-[13px] text-[#424844] leading-relaxed">
                <strong className="text-[#102a20] block text-[15px] mb-0.5">
                  「{notFoundCode}」 로 조회된 성적서가 없습니다
                </strong>
                이 화면은 가상 브랜드 샘플이라 예시 처방 3건만 담겨 있습니다. 위의 「암 치료기 회복 처방」·
                「당수활혈탕(교통사고)」·「보양환오탕(재활)」 버튼을 눌러 조회 화면을 확인해 보세요.
              </div>
            </div>
          )}

          {/* Search Result Box */}
          {selectedCertificate && (
            <div className="mt-6 p-5 rounded-xl bg-[#f4f3f0] border border-[#e3e2e0] space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#e3e2e0]">
                <div>
                  <span className="text-[11px] text-[#75593c] font-medium">처방 확인 번호</span>
                  <div className="text-[17px] text-[#102a20] font-bold font-serif">
                    {selectedCertificate.code} ({selectedCertificate.name})
                  </div>
                  <div className="text-[12px] text-[#424844] mt-0.5">
                    {selectedCertificate.targetTherapy}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#264035] px-3 py-1 rounded-full text-white text-[12px] font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-[#cbe9da]">check_circle</span>
                  <span>원내 품질 점검 완료 (예시)</span>
                </div>
              </div>

              {/* 3 Metric cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-[13px] text-[#424844]">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-[#e3e2e0]">
                  <span className="text-[11px] text-[#75593c] block font-semibold">
                    핵심 본초 원산지
                  </span>
                  <strong className="text-[#1a1c1a] font-medium">
                    {selectedCertificate.herbs.map((h) => h.name.split(' ')[0]).join(' · ')}
                  </strong>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-[#e3e2e0]">
                  <span className="text-[11px] text-[#75593c] block font-semibold">
                    유해 중금속 (납, 비소, 수은)
                  </span>
                  <strong className="text-[#102a20] font-bold">기준치 이하 (예시 성적)</strong>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-[#e3e2e0]">
                  <span className="text-[11px] text-[#75593c] block font-semibold">
                    잔류농약 정밀 검사
                  </span>
                  <strong className="text-[#102a20] font-bold">전 항목 기준 적합 (예시)</strong>
                </div>
              </div>

              {/* Detailed Herb Inventory Table */}
              <div className="bg-white rounded-lg border border-[#e3e2e0] overflow-hidden">
                <div className="px-3.5 py-2 bg-[#efeeeb] text-[12px] font-bold text-[#102a20] flex justify-between">
                  <span>처방 본초 구성 및 원산지 이력</span>
                  <span className="text-[11px] text-[#75593c]">검사일: {selectedCertificate.inspectionDate}</span>
                </div>
                <div className="divide-y divide-[#efeeeb] text-[12px]">
                  {selectedCertificate.herbs.map((herb, idx) => (
                    <div key={idx} className="px-3.5 py-2 flex flex-col lg:flex-row lg:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#102a20]"></span>
                        <strong className="text-[#1a1c1a]">{herb.name}</strong>
                        <span className="text-[#727974]">({herb.origin})</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#424844]">
                        <span>품질: <strong className="text-[#102a20]">{herb.grade}</strong></span>
                        <span className="text-[#264035] bg-[#cbe9da]/40 px-2 py-0.5 rounded text-[11px]">중금속 {herb.heavyMetals}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[11px] text-[#75593c] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span>
                  조제 담당: {selectedCertificate.inspector} · 시험 성적서 원본은 원내 조제실에 로트별로 보관합니다. (가상 브랜드 샘플의 예시 데이터입니다)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
