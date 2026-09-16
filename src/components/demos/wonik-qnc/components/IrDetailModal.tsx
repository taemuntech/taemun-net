"use client";

import React, { useState } from 'react';
import { X, TrendingUp, Download, ExternalLink, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { IrHubItem, StockData } from '../types';

interface IrDetailModalProps {
  item: IrHubItem | null;
  stock: StockData;
  isStockDetailMode?: boolean;
  onClose: () => void;
}

export const IrDetailModal: React.FC<IrDetailModalProps> = ({
  item,
  stock,
  isStockDetailMode = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'financial' | 'disclosure' | 'irbook' | 'contact'>(
    isStockDetailMode
      ? 'financial'
      : item?.id === 'financial'
      ? 'financial'
      : item?.id === 'disclosure'
      ? 'disclosure'
      : item?.id === 'ir-book'
      ? 'irbook'
      : 'contact'
  );

  const [questionSent, setQuestionSent] = useState(false);

  if (!item && !isStockDetailMode) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#283044] text-white p-5 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-[#c6e7ff] tracking-wider uppercase block">
              INVESTOR RELATIONS CENTER
            </span>
            <h3 className="text-xl font-bold">
              원익큐앤씨 IR &amp; 주주 가치 정보
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('financial')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'financial'
                ? 'border-[#0052cc] text-[#0052cc] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            경영 실적 &amp; 주가
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('disclosure')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'disclosure'
                ? 'border-[#0052cc] text-[#0052cc] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            전자공시(DART)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('irbook')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'irbook'
                ? 'border-[#0052cc] text-[#0052cc] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            IR 발표 자료
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'border-[#0052cc] text-[#0052cc] bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            IR 문의 &amp; Q&amp;A
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#131b2e]">
          {activeTab === 'financial' && (
            <div className="space-y-4">
              {/* Stock Snapshot */}
              <div className="p-4 bg-[#f2f3ff] rounded-lg border border-[#dae2fd] flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-gray-500 block">
                    KOSDAQ 074600 • 현재가
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-[#131b2e]">
                      {stock.price.toLocaleString()} KRW
                    </span>
                    <span className="text-xs font-mono text-emerald-600 font-bold">
                      +{stock.change} (+{stock.changeRate}%)
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs font-mono text-gray-500">
                  <div>시가총액: {stock.marketCap}</div>
                  <div>외인소진: {stock.foreignOwnership}</div>
                </div>
              </div>

              {/* Financial Highlights Table */}
              <div>
                <h5 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-2 font-mono">
                  연간 실적 요약 (연결 기준 / 단위: 억원)
                </h5>
                <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b font-mono text-gray-600">
                      <tr>
                        <th className="p-2.5">구분</th>
                        <th className="p-2.5">2023 (A)</th>
                        <th className="p-2.5">2024 (A)</th>
                        <th className="p-2.5">2025 (E)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                      <tr>
                        <td className="p-2.5 font-sans font-medium">매출액</td>
                        <td className="p-2.5">5,820</td>
                        <td className="p-2.5">6,180</td>
                        <td className="p-2.5 font-bold text-[#0052cc]">6,540 (+5.8%)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-medium">영업이익</td>
                        <td className="p-2.5">720</td>
                        <td className="p-2.5">830</td>
                        <td className="p-2.5 font-bold text-[#0052cc]">910 (+9.6%)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-medium">당기순이익</td>
                        <td className="p-2.5">510</td>
                        <td className="p-2.5">620</td>
                        <td className="p-2.5 font-bold text-[#0052cc]">710 (+14.5%)</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-sans font-medium">영업이익률</td>
                        <td className="p-2.5">12.3%</td>
                        <td className="p-2.5">13.4%</td>
                        <td className="p-2.5 font-bold text-[#0052cc]">13.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'disclosure' && (
            <div className="space-y-3">
              <h5 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-2 font-mono">
                최근 주요 공시 내역 (금융감독원 DART 연동)
              </h5>
              <div className="space-y-2">
                {[
                  { title: '[정기공시] 분기보고서 (2025.09)', date: '2025.11.14', submitter: '원익큐앤씨' },
                  { title: '[수시공시] 단일판매·공급계약체결 (반도체 쿼츠웨어 부품)', date: '2025.10.18', submitter: '원익큐앤씨' },
                  { title: '[거래소공시] 기업설명회(IR) 개최 안내', date: '2025.09.28', submitter: '한국거래소' },
                  { title: '[정기공시] 반기보고서 (2025.06)', date: '2025.08.14', submitter: '원익큐앤씨' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-gray-900 block">{item.title}</span>
                      <span className="font-mono text-gray-500 text-[11px]">
                        제출인: {item.submitter} | 공시일: {item.date}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`[${item.title}] DART 원문 열람 링크로 연결됩니다.`)}
                      className="inline-flex items-center gap-1 text-[#0052cc] hover:underline font-mono text-xs"
                    >
                      <span>원문보기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'irbook' && (
            <div className="space-y-3">
              <h5 className="font-bold text-xs text-gray-700 uppercase tracking-wider mb-2 font-mono">
                경영 실적 발표 자료 (IR Presentation PDF)
              </h5>
              <div className="space-y-2">
                {[
                  { name: '2025 3Q 경영 실적 및 반도체 업황 전망 IR 북', size: '12.4 MB', date: '2025.11.15' },
                  { name: '2025 2Q 경영 실적 발표 프레젠테이션', size: '9.8 MB', date: '2025.08.16' },
                  { name: '원익큐앤씨 기업설명회(NDR) 공식 Fact Sheet', size: '4.2 MB', date: '2025.05.20' },
                ].map((file, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-semibold text-gray-900 block">{file.name}</span>
                      <span className="font-mono text-gray-500 text-[11px]">
                        발행일: {file.date} | 파일 크기: {file.size}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`[${file.name}] 다운로드가 시작되었습니다.`)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      다운로드
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              {questionSent ? (
                <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h6 className="font-bold text-emerald-900">
                    IR 문의가 접수되었습니다
                  </h6>
                  <p className="text-xs text-emerald-700">
                    원익큐앤씨 IR/재무기획팀에서 등록하신 이메일로 영업일 기준 24시간 이내에 답변드리겠습니다.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setQuestionSent(true);
                  }}
                  className="space-y-3"
                >
                  <p className="text-xs text-gray-600">
                    원익큐앤씨 주주 및 기관투자자 미팅 신청, 실적 관련 문의사항을 남겨주시면 담당 부서에서 신속히 답변드립니다.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="성함 / 기관명"
                      className="px-3 py-2 border rounded text-xs outline-none focus:border-[#0052cc]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="답변 받으실 이메일"
                      className="px-3 py-2 border rounded text-xs outline-none focus:border-[#0052cc]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="문의 내용을 입력해 주세요 (예: 기관 미팅 신청, 분기 가이던스 질의 등)"
                    className="w-full px-3 py-2 border rounded text-xs outline-none focus:border-[#0052cc] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0052cc] text-white text-xs font-semibold rounded hover:bg-[#003d9b]"
                    >
                      문의 제출하기
                    </button>
                  </div>
                </form>
              )}

              <div className="p-3 bg-gray-100 rounded-lg text-xs text-gray-600 font-mono">
                <div>• IR 담당부서: 재무기획팀 IR 파트</div>
                <div>• 대표 연락처: 054-479-2540 | 이메일: ir@wonik.com</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
