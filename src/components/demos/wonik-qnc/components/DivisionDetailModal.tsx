"use client";

import React from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Download, Mail } from 'lucide-react';
import { BusinessDivision } from '../types';

interface DivisionDetailModalProps {
  division: BusinessDivision | null;
  onClose: () => void;
  onInquire: (divisionName: string) => void;
}

export const DivisionDetailModal: React.FC<DivisionDetailModalProps> = ({
  division,
  onClose,
  onInquire,
}) => {
  if (!division) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media */}
        <div className="relative h-48 lg:h-56 bg-[#283044] overflow-hidden shrink-0">
          {division.isSpecialOptics ? (
            <div className="w-full h-full bg-gradient-to-br from-[#283044] to-[#004866] p-8 flex flex-col justify-between relative">
              <div className="absolute inset-0 opacity-20 quartz-grid pointer-events-none" />
              <div className="relative z-10 flex justify-between items-start">
                <span className="bg-white/20 text-[#c6e7ff] font-mono text-xs font-semibold px-2.5 py-1 rounded">
                  {division.tag}
                </span>
              </div>
              <div className="relative z-10">
                <span className="text-5xl font-extrabold text-white tracking-tight font-mono">
                  172<span className="text-base font-normal text-[#81cfff] ml-1">nm</span>
                </span>
                <p className="text-sm text-[#d2d9f4] mt-1">진공 자외선(VUV) 엑시머 광원 제어 시스템</p>
              </div>
            </div>
          ) : (
            <>
              <img
                src={division.imageUrl}
                alt={division.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-4 left-4">
                <span
                  className={`text-white font-mono text-xs font-bold px-3 py-1 rounded shadow-sm ${
                    division.tagColor || 'bg-[#0052cc]'
                  }`}
                >
                  {division.tag}
                </span>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 p-1.5 rounded-full transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="font-mono text-xs text-[#c6e7ff] font-bold block mb-1">
              {division.divisionNumber} • {division.subCategory}
            </span>
            <h3 className="text-2xl font-bold">{division.title}</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#131b2e]">
          <div>
            <h4 className="font-mono text-xs text-[#003d9b] font-bold uppercase tracking-wider mb-1">
              DIVISION OVERVIEW
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {division.description}
            </p>
          </div>

          {/* Key Advantages */}
          <div className="bg-[#f2f3ff] p-4 rounded-lg border border-[#dae2fd]">
            <h5 className="font-bold text-xs text-[#003d9b] uppercase tracking-wider mb-2.5 font-mono">
              KEY ADVANTAGES &amp; SPECS
            </h5>
            <div className="space-y-2">
              {division.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#0052cc] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Parameter Comparison Table */}
          <div>
            <h5 className="font-bold text-xs text-[#131b2e] uppercase tracking-wider mb-2 font-mono">
              품질 보증 및 기술 스펙
            </h5>
            <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200 font-mono text-gray-600">
                  <tr>
                    <th className="p-2.5">검사 항목</th>
                    <th className="p-2.5">기준치 / 허용 공차</th>
                    <th className="p-2.5">적용 공정</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                  <tr>
                    <td className="p-2.5 font-sans font-medium">소재 순도</td>
                    <td className="p-2.5 text-[#0052cc] font-bold">99.999% (5N) 이상</td>
                    <td className="p-2.5 font-sans">고온 확산 / 플라즈마 식각</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium">치수 정밀도</td>
                    <td className="p-2.5 text-[#0052cc] font-bold">±0.01 mm 이하</td>
                    <td className="p-2.5 font-sans">300mm 웨이퍼 핸들링</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium">청정도 등급</td>
                    <td className="p-2.5 text-[#0052cc] font-bold">Class 10 / 100</td>
                    <td className="p-2.5 font-sans">최종 세정 및 진공 포장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-md"
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire(division.title);
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#0052cc] hover:bg-[#003d9b] text-white text-xs font-semibold rounded-md shadow-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>이 사업 부문 기술 상담 신청</span>
          </button>
        </div>
      </div>
    </div>
  );
};
