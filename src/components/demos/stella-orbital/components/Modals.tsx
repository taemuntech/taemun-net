import React, { useState } from 'react';
import { Satellite, Radio, X, Check, Download, Layers, ShieldCheck, AlertCircle } from 'lucide-react';
import { ModalType, TaskingFormData } from '../types';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
  taskingData: TaskingFormData | null;
}

export const VIEWER_SPECTRAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAONxcUKaLT_msE-aP-YygIZmLyxk60RldiVGDw2i4rmsRKToTwfYmY1TcWlmnGqnSGKrlVAExUUTRMFBQbic0GAU-Fr0hMENLyeeLtQszl4b2AN9rcFkhBDlBmugxuvQUsoBR9iJhEBnBQK7bGxsevjWFLscjCbois_4jc732Jm2m68ubxSIvrM9Cua4TDAwavEVWwuQPJ1dEywYldL1aVLH_x5L2M96YVXl-lqEor9SK3PLZksUBk";

export default function Modals({ activeModal, onClose, taskingData }: ModalsProps) {
  const [dossierEmail, setDossierEmail] = useState('');
  const [dossierSent, setDossierSent] = useState(false);
  const [selectedBand, setSelectedBand] = useState('BAND 08: NIR (842 nm)');
  const [downloadedGeoJSON, setDownloadedGeoJSON] = useState(false);

  if (!activeModal) return null;

  const handleDossierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDossierSent(true);
    setTimeout(() => {
      setDossierSent(false);
      onClose();
    }, 2500);
  };

  const handleDownloadGeoJSON = () => {
    const geoJsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            mission: "STELLA-ORBITAL-09",
            sensor: "Multi-Spectral Optical 0.3m",
            acquisitionDate: new Date().toISOString(),
            sunElevation: 62.4,
            cloudCoverPercentage: 0.04,
            gsd: 0.30,
            orbit: "502.4km SSO",
            spectralBands: ["Coastal", "Blue", "Green", "Yellow", "Red", "RedEdge", "NIR1", "NIR2", "SWIR1", "SWIR2"]
          },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [127.3504, 36.3204],
                [127.4184, 36.3204],
                [127.4184, 36.3804],
                [127.3504, 36.3804],
                [127.3504, 36.3204]
              ]
            ]
          }
        }
      ]
    };
    const blob = new Blob([JSON.stringify(geoJsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stella-stac-aoi-metadata.geojson';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadedGeoJSON(true);
    setTimeout(() => setDownloadedGeoJSON(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-background/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* 1. Tasking Confirmation Modal */}
      {activeModal === 'tasking' && (
        <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl border border-outline-variant p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <div className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-on-surface">미션 오더 생성 완료</h3>
            </div>
            <button
              type="button"
              className="text-on-surface-variant hover:text-on-surface p-1 rounded cursor-pointer"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            STELLA 궤도 미션 지휘 시스템에 귀하의 촬영 요청이 등록되었습니다. 궤도 계산 알고리즘이 90분 내 최적의 SmallSat 패스 스케줄과 STAC API 엔드포인트 토큰을 담당자 이메일로 전송합니다.
          </p>

          <div className="p-4 bg-surface-container-low rounded border border-outline-variant font-code-mono text-xs space-y-1.5">
            <div>
              ORDER HASH: <span className="text-primary font-bold">ST-LEO-8849-CONFIRMED</span>
            </div>
            <div>
              TARGET COORDS: <span className="text-on-surface font-semibold">{taskingData?.coordinates || '36.3504° N, 127.3845° E'}</span>
            </div>
            <div>
              SENSOR MODE: <span className="text-secondary font-bold">{taskingData?.sensor?.toUpperCase() || 'OPTICAL (0.3M GSD)'}</span>
            </div>
            <div>
              CARRIER STATUS: <span className="text-secondary font-bold">DOWNLINK ALLOCATED (90 MIN SSO)</span>
            </div>
            <div>
              DELIVERY DESTINATION: <span className="text-on-surface">{taskingData?.corpEmail || 'operations@defense-intel.gov'}</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              className="px-5 py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-xs hover:bg-primary-container transition-all cursor-pointer"
              onClick={onClose}
            >
              확인 (Close Window)
            </button>
          </div>
        </div>
      )}

      {/* 2. Mission Dossier PDF Modal */}
      {activeModal === 'dossier' && (
        <div className="bg-surface-container-lowest max-w-lg w-full rounded-xl border border-outline-variant p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-on-surface">2026 Mission Dossier PDF</h3>
            </div>
            <button
              type="button"
              className="text-on-surface-variant hover:text-on-surface p-1 rounded cursor-pointer"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            초소형 위성 군집 32기의 광학 및 X-band SAR 센서 기술 사양서, 궤도 주기, 주파수 인가 내역 및 엔터프라이즈 SLA가 수록된 공식 기술 백서(Whitepaper 48p)를 다운로드합니다.
          </p>

          {dossierSent ? (
            <div className="p-4 bg-surface-container-low border border-primary/40 rounded text-center space-y-2">
              <Check className="w-8 h-8 text-primary mx-auto" />
              <p className="font-bold text-sm text-on-surface">백서 다운로드 링크 전송 완료</p>
              <p className="text-xs text-on-surface-variant">입력하신 이메일({dossierEmail || '담당자 메일'})로 보안 다운로드 링크를 발송하였습니다.</p>
            </div>
          ) : (
            <form onSubmit={handleDossierSubmit} className="space-y-3">
              <input
                className="w-full px-4 py-2.5 border border-outline-variant rounded text-xs outline-none focus:border-primary bg-surface-container-lowest"
                placeholder="기관/기업 공식 이메일을 입력하세요"
                required
                type="email"
                value={dossierEmail}
                onChange={(e) => setDossierEmail(e.target.value)}
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border border-outline-variant rounded font-semibold text-xs text-on-surface cursor-pointer hover:bg-surface-container-low"
                  onClick={onClose}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary rounded font-semibold text-xs hover:bg-primary-container cursor-pointer transition-all"
                >
                  다운로드 링크 발송
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 3. GeoTIFF Spectral Viewer Modal */}
      {activeModal === 'viewer' && (
        <div className="bg-surface-container-lowest max-w-4xl w-full rounded-xl border border-outline-variant p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
            <div className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-on-surface">GeoTIFF 16-Band Spectral Inspector</h3>
            </div>
            <button
              type="button"
              className="text-on-surface-variant hover:text-on-surface p-1 rounded cursor-pointer"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Viewer Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-code-mono">
            {['BAND 08: NIR (842 nm)', 'BAND 04: RED (665 nm)', 'BAND 11: SWIR (1610 nm)', 'FALSE-COLOR COMPOSITE (8-4-3)'].map((band) => (
              <button
                key={band}
                type="button"
                className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${ selectedBand === band ? 'border-primary bg-primary-fixed text-primary font-bold' : 'border-outline-variant bg-surface-container-low text-on-surface-variant hover:border-primary' }`}
                onClick={() => setSelectedBand(band)}
              >
                {band}
              </button>
            ))}
          </div>

          <div className="relative aspect-video rounded bg-on-background overflow-hidden border border-outline-variant">
            <img
              className="w-full h-full object-cover"
              alt="Satellite earth observation radiometric inspection interface displaying multi spectral false color bands"
              src={VIEWER_SPECTRAL_IMG}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-on-background/80 p-2.5 rounded text-surface font-code-mono text-xs border border-outline-variant/40">
              <p className="text-secondary-fixed font-bold">{selectedBand} HIGH-REFLECTANCE</p>
              <p className="text-white/80">RADIOMETRIC RESOLUTION: 14-BIT RAW • CLOUD MASK: 0.04%</p>
            </div>
            <div className="absolute bottom-4 right-4 bg-on-background/80 p-2 rounded text-surface font-code-mono text-[11px] border border-outline-variant/40">
              STAC PROJECTION: EPSG:4326 • TILE ID: ST-2026-N36E127
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between font-code-mono text-xs text-on-surface-variant gap-3">
            <span>COORDINATES: LAT 36.3504° N, LON 127.3845° E (DAEJEON SOC-1 AOI)</span>
            <button
              type="button"
              className="text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
              onClick={handleDownloadGeoJSON}
            >
              <Download className="w-3.5 h-3.5" />
              {downloadedGeoJSON ? 'Downloaded GeoJSON ✓' : 'DOWNLOAD STAC GEOJSON METADATA'}
            </button>
          </div>

          <div className="flex justify-end pt-2 border-t border-outline-variant/60">
            <button
              type="button"
              className="px-5 py-2.5 bg-primary text-on-primary rounded font-semibold text-xs hover:bg-primary-container cursor-pointer transition-all"
              onClick={onClose}
            >
              닫기 (Close Inspector)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
