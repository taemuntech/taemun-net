import React, { useCallback, useId, useRef, useState } from 'react';
import { X, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { ArchitectureComponent } from '../types';

interface DetailModalProps {
  component: ArchitectureComponent | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ component, onClose }) => {
  // 샘플이라 내려받을 도면·데이터시트가 없다 — 「내보내는 중」이라고 속이지 않고 공용 안내(SampleNotice)를 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // SampleNotice 가 이 모달 위에 겹쳐 열릴 때 Esc 한 번에 둘 다 닫히지 않게 막는다
  // (두 훅의 keydown 이 모두 document 에 달린다). 배경 잠금은 안내가 닫히면 이 모달 것으로 되돌아온다.
  const handleDialogClose = useCallback(() => {
    if (isNoticeOpen) return;
    onClose();
  }, [isNoticeOpen, onClose]);

  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기·복귀 — 저장소 공용 훅(use-sample-dialog.ts)
  useSampleDialog({ open: component !== null, onClose: handleDialogClose, dialogRef });

  if (!component) return null;

  return (
    <div
      id="architecture-detail-modal"
      className="fixed inset-0 z-50 bg-[#0b0e13]/85 backdrop-blur-md flex items-end lg:items-center justify-center p-0 lg:p-8"
      onMouseDown={e => {
        if (e.target === e.currentTarget) handleDialogClose();
      }}
    >
      {/* 폰에서는 화면 아래에서 올라오는 시트로, lg 이상에서는 가운데 카드로 — 머리말·꼬리말은 고정하고 본문만 구른다 */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-[#191c21] border border-[#00e5ff]/50 rounded-t-2xl lg:rounded-lg w-full max-w-3xl max-h-[92dvh] lg:max-h-[calc(100dvh-4rem)] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.25)] relative hud-bracket outline-none"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#3b494c]/40 p-4 lg:p-5 bg-[#101319] shrink-0">
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 min-w-0">
            <span className="font-code text-xs text-[#00e5ff] font-bold whitespace-nowrap">
              // {component.code}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-code bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/30 whitespace-nowrap">
              {component.badge}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="사양 상세 닫기"
            className="p-2.5 -mr-1 shrink-0 rounded text-[#849396] hover:text-[#e1e2ea] hover:bg-[#272a30] transition-colors cursor-pointer"
            id="btn-close-detail-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 lg:p-6 flex-1 min-h-0 overflow-y-auto space-y-6">
          <div>
            <h3
              id={titleId}
              className="font-display text-lg lg:text-xl font-bold text-[#e1e2ea] mb-2"
            >
              {component.title}
            </h3>
            <p className="font-body text-sm text-[#bac9cc] leading-relaxed">
              {component.fullDetails.description}
            </p>
          </div>

          {/* Key Engineering Features */}
          <div className="p-4 rounded bg-[#0b0e13] border border-[#3b494c]/30">
            <h4 className="font-display text-xs text-[#00e5ff] font-bold tracking-wider uppercase mb-3 flex items-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5be9ad] shrink-0 mt-px" />
              VALIDATED ARCHITECTURAL ATTRIBUTES (예시 표기)
            </h4>
            {/* 태블릿(768) 중간 단계 — 모바일/웹 경계는 그대로 lg 이다 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-body text-[#e1e2ea]">
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
            {/* 3열 표가 폰에서 뭉개지지 않게 자기 가로 스크롤 상자 안에 둔다 */}
            <div className="border border-[#3b494c]/40 rounded overflow-x-auto">
              <table className="w-full min-w-[480px] text-left font-code text-xs">
                <thead className="bg-[#101319] text-[#849396] border-b border-[#3b494c]/40">
                  <tr>
                    <th scope="col" className="py-2.5 px-4">PARAMETER</th>
                    <th scope="col" className="py-2.5 px-4">RATED NOMINAL</th>
                    <th scope="col" className="py-2.5 px-4">TEST MARGIN</th>
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
            <p className="font-code text-[10px] text-[#849396] mt-1.5 lg:hidden">
              표를 옆으로 밀어 보세요 →
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 lg:p-5 bg-[#101319] border-t border-[#3b494c]/40 shrink-0">
          <div className="flex items-start gap-2 text-[11px] font-code text-[#849396] min-w-0">
            <span className="w-2 h-2 shrink-0 rounded-full bg-[#5be9ad] mt-1" />
            <span>ISO 26262 ASIL-D VALIDATED // PANGYO WAFER FAB (예시 표기)</span>
          </div>

          <button
            onClick={() => setIsNoticeOpen(true)}
            className="w-full lg:w-auto px-4 min-h-11 py-2 bg-[#00e5ff] text-[#0b0e13] font-display text-xs font-bold uppercase tracking-wider rounded hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            EXPORT CAD / DATASHEET (.STEP / .PDF)
          </button>
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
