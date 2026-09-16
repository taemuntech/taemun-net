import React, { useState } from 'react';
import { X, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ArchitectureComponent } from '../types';

interface DetailModalProps {
  component: ArchitectureComponent | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ component, onClose }) => {
  // 샘플이라 내려받을 도면·데이터시트가 없다 — 「내보내는 중」이라고 속이지 않고 공용 안내(SampleNotice)를 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  if (!component) return null;

  return (
    <div
      id="architecture-detail-modal"
      className="fixed inset-0 z-50 bg-[#0b0e13]/85 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
      onClick={onClose}
    >
      <div
        className="bg-[#191c21] border border-[#00e5ff]/50 rounded-lg w-full max-w-3xl overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] relative hud-bracket"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#3b494c]/40 p-5 bg-[#101319]">
          <div className="flex items-center gap-3">
            <span className="font-code text-xs text-[#00e5ff] font-bold">
              // {component.code}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-code bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30">
              {component.badge}
            </span>
            <span className="font-code text-xs text-[#849396] hidden">
              RESTRICTED TIER-1 ENGINEERING
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#849396] hover:text-[#e1e2ea] hover:bg-[#272a30] transition-colors cursor-pointer"
            id="btn-close-detail-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          <div>
            <h3 className="font-display text-xl font-bold text-[#e1e2ea] mb-2">
              {component.title}
            </h3>
            <p className="font-body text-sm text-[#bac9cc] leading-relaxed">
              {component.fullDetails.description}
            </p>
          </div>

          {/* Key Engineering Features */}
          <div className="p-4 rounded bg-[#0b0e13] border border-[#3b494c]/30">
            <h4 className="font-display text-xs text-[#00e5ff] font-bold tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5be9ad]" />
              VALIDATED ARCHITECTURAL ATTRIBUTES
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 text-xs font-body text-[#e1e2ea]">
              {component.fullDetails.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5be9ad] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specs Table */}
          <div>
            <h4 className="font-code text-xs text-[#849396] uppercase tracking-wider mb-2">
              PARAMETRIC MEASUREMENT MATRIX (예시 수치)
            </h4>
            <div className="border border-[#3b494c]/40 rounded overflow-hidden">
              <table className="w-full text-left font-code text-xs">
                <thead className="bg-[#101319] text-[#849396] border-b border-[#3b494c]/40">
                  <tr>
                    <th className="py-2.5 px-4">PARAMETER</th>
                    <th className="py-2.5 px-4">RATED NOMINAL</th>
                    <th className="py-2.5 px-4">TEST MARGIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#3b494c]/20 bg-[#1d2025]/50">
                  {component.fullDetails.technicalTable.map((row, i) => (
                    <tr key={i} className="hover:bg-[#1d2025]">
                      <td className="py-2.5 px-4 text-[#bac9cc]">{row.param}</td>
                      <td className="py-2.5 px-4 text-[#00e5ff] font-bold">{row.val}</td>
                      <td className="py-2.5 px-4 text-[#5be9ad]">{row.tol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#101319] border-t border-[#3b494c]/40">
          <div className="flex items-center gap-2 text-[11px] font-code text-[#849396]">
            <span className="w-2 h-2 rounded-full bg-[#5be9ad]" />
            <span>ISO 26262 ASIL-D VALIDATED // PANGYO WAFER FAB (예시 표기)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsNoticeOpen(true)}
              className="px-4 py-2 bg-[#00e5ff] text-[#0b0e13] font-display text-xs font-bold uppercase tracking-wider rounded hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              EXPORT CAD / DATASHEET (.STEP / .PDF)
            </button>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="voltron-ev"
        industry="manufacturing"
        featureName="부품 도면·데이터시트 내려받기 버튼"
      />
    </div>
  );
};
