import React from 'react';
import { DefectItem } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  defect?: DefectItem;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  defect,
}) => {
  if (!isOpen) return null;

  const currentDefect = defect || {
    id: 'CRK-2025-001',
    type: '콘크리트 휨 균열 (Flexural Crack)',
    location: 'P4 교각 상단 하부 슬래브 #2 거더',
    severity: 'C',
    severityLabel: '주의 요망 (3종 결함)',
    crackWidth: '0.12mm',
    depth: '14.2mm',
    confidence: 99.4,
    timestamp: '2025-05-12 14:22:08',
    status: '주의',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl border border-outline-variant max-h-[92vh] overflow-y-auto relative print:m-0 print:p-0 print:border-none">
        {/* Modal Controls */}
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-surface-container font-telemetry-code text-xs text-on-surface font-bold">
              SAFETY-2025-AERO-0941
            </span>
            <span className="text-xs font-telemetry-code text-on-surface-variant">
              공식 정밀안전진단 외관조사망도 보고서
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-secondary-fixed text-on-secondary-fixed text-xs font-telemetry-label flex items-center gap-1 hover:bg-secondary-fixed-dim transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>인쇄 / PDF 저장</span>
            </button>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Printable Report Body */}
        <div className="flex flex-col gap-6 text-on-surface font-body-sm">
          {/* Header Block */}
          <div className="flex justify-between items-start border-b-2 border-on-surface pb-3">
            <div>
              <h1 className="font-headline-md font-bold text-on-surface">
                시설물 안전 및 유지관리에 관한 특별법 의거
              </h1>
              <p className="text-base font-semibold text-secondary pt-0.5">
                무인항공기(UAV) AI 기반 외관 결함 조사 및 3D 정밀진단 총괄표
              </p>
            </div>
            <div className="text-right text-[11px] font-telemetry-code text-on-surface-variant">
              <div>진단일자: 2025.05.12</div>
              <div>진단책임자: 국방/항공 구조기술사</div>
              <div>비행 기종: HEXA-INSPECT 600</div>
            </div>
          </div>

          {/* Infrastructure Meta Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 text-xs font-telemetry-code">
            <div>
              <span className="text-on-surface-variant block">대상 시설물:</span>
              <span className="font-bold text-on-surface">서해안 구간 시범 교량 (예시)</span>
            </div>
            <div>
              <span className="text-on-surface-variant block">관리 주체:</span>
              <span className="font-bold text-on-surface">도로관리공단 사업소 (예시)</span>
            </div>
            <div>
              <span className="text-on-surface-variant block">센서 해상도:</span>
              <span className="font-bold text-on-surface">4K 광학 + 640p 열화상</span>
            </div>
            <div>
              <span className="text-on-surface-variant block">GSD / 정합도:</span>
              <span className="font-bold text-emerald-600">0.08mm/px (RTK)</span>
            </div>
          </div>

          {/* Defect Photo & Bounding Box Inspection Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] border border-outline-variant/40">
              <img
                src={ASSET_IMAGES.caseCivils}
                alt="Infrastructure Crack Analysis"
                className="w-full h-full object-cover"
              />
              {/* AI Bounding Box Overlay */}
              <div className="absolute top-[35%] left-[28%] w-[42%] h-[32%] border-2 border-red-500 rounded bg-red-500/15 flex flex-col justify-between p-1">
                <span className="text-[10px] bg-red-600 text-white font-telemetry-code font-bold px-1 rounded w-fit">
                  {currentDefect.id} // {currentDefect.crackWidth}
                </span>
                <span className="text-[9px] text-white font-telemetry-code bg-black/70 px-1 rounded self-end">
                  CONF: {currentDefect.confidence}%
                </span>
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur rounded text-[10px] font-telemetry-code text-white">
                4K OPTICAL CAMERA (200x ZOOM)
              </div>
            </div>

            {/* Thermal / Heatmap Reference */}
            <div className="relative rounded-xl overflow-hidden bg-black aspect-[4/3] border border-outline-variant/40">
              <img
                src={ASSET_IMAGES.thermalTower}
                alt="Thermal Cross Check"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur rounded text-[10px] font-telemetry-code text-amber-300">
                RADIOMETRIC THERMAL VERIFICATION
              </div>
            </div>
          </div>

          {/* Defect Specification Table */}
          <div className="border border-outline-variant/40 rounded-xl overflow-hidden text-xs">
            <div className="bg-surface-container-high px-4 py-2 font-bold font-telemetry-code text-on-surface flex justify-between">
              <span>식별 결함 공학 분석 데이터 (DEFECT SPECIFICATION)</span>
              <span className="text-secondary font-bold">시설안전 기준 등급 {currentDefect.severity}</span>
            </div>
            <table className="w-full text-left font-telemetry-code divide-y divide-outline-variant/20">
              <tbody>
                <tr className="divide-x divide-outline-variant/20">
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant w-1/4">결함 관리 고유번호</td>
                  <td className="p-2.5 font-bold text-secondary">{currentDefect.id}</td>
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant w-1/4">결함 유형</td>
                  <td className="p-2.5">{currentDefect.type}</td>
                </tr>
                <tr className="divide-x divide-outline-variant/20">
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant">발생 위치 좌표</td>
                  <td className="p-2.5">{currentDefect.location}</td>
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant">균열 폭 (Crack Width)</td>
                  <td className="p-2.5 font-bold text-red-600">{currentDefect.crackWidth}</td>
                </tr>
                <tr className="divide-x divide-outline-variant/20">
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant">예측 진전 깊이</td>
                  <td className="p-2.5">{currentDefect.depth}</td>
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant">AI 판독 신뢰도</td>
                  <td className="p-2.5 text-emerald-600 font-bold">{currentDefect.confidence}%</td>
                </tr>
                <tr className="divide-x divide-outline-variant/20">
                  <td className="p-2.5 bg-surface-container font-medium text-on-surface-variant">보수·보강 권고사항</td>
                  <td colSpan={3} className="p-2.5 text-on-surface leading-relaxed">
                    본 균열은 허용 균열폭(0.20mm) 이하이나 하절기 염화물 침투 및 우수 침하 우려 구역에 위치하므로 에폭시 수지 저압 주입 공법(Low Pressure Resin Injection)에 의한 표면 방수 처리를 권고함.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Engineer Seal & Verification Signature */}
          <div className="flex justify-between items-center p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <div className="flex flex-col text-xs font-telemetry-code">
              <span className="text-on-surface font-bold">진단검증: AEROSPECT AI AUTONOMY LAB // KR-DEF</span>
              <span className="text-on-surface-variant">공인 항공안전 형식인증 기준 충족 (예시)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right text-[11px] font-telemetry-code">
                <span className="block font-bold">인증 수석 기술사 날인</span>
                <span className="text-on-surface-variant">서명 완료 (DIGITALLY SIGNED)</span>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-red-600 text-red-600 flex items-center justify-center font-bold text-[10px] transform rotate-12">
                인증필
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant/30">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-surface-container text-on-surface rounded text-xs font-telemetry-label uppercase tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            보고서 닫기
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-primary text-on-primary rounded text-xs font-telemetry-label uppercase tracking-wider hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            PDF 내보내기
          </button>
        </div>
      </div>
    </div>
  );
};
