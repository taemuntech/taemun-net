import React, { useState } from 'react';
import { Satellite, Radio, X, Download } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ModalType } from '../types';

interface ModalsProps {
  activeModal: ModalType;
  onClose: () => void;
}

export const VIEWER_SPECTRAL_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAONxcUKaLT_msE-aP-YygIZmLyxk60RldiVGDw2i4rmsRKToTwfYmY1TcWlmnGqnSGKrlVAExUUTRMFBQbic0GAU-Fr0hMENLyeeLtQszl4b2AN9rcFkhBDlBmugxuvQUsoBR9iJhEBnBQK7bGxsevjWFLscjCbois_4jc732Jm2m68ubxSIvrM9Cua4TDAwavEVWwuQPJ1dEywYldL1aVLH_x5L2M96YVXl-lqEor9SK3PLZksUBk";

export default function Modals({ activeModal, onClose }: ModalsProps) {
  const [dossierEmail, setDossierEmail] = useState('');
  const [selectedBand, setSelectedBand] = useState('BAND 08: NIR (842 nm)');
  const [downloadedGeoJSON, setDownloadedGeoJSON] = useState(false);

  // 샘플이라 백서를 보내지 않는다 — 「보안 다운로드 링크를 발송하였습니다」 라는 가짜 성공 화면 대신
  // 공용 안내(SampleNotice)만 연다. 입력한 이메일은 어디에도 나가지 않는다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleDossierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    setIsNoticeOpen(true);
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
    <>
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-on-background/60 backdrop-blur-sm flex items-center justify-center p-4">
          {/* 1. Mission Dossier PDF Modal */}
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

            <form onSubmit={handleDossierSubmit} className="space-y-3">
              <input
                className="w-full px-4 py-2.5 border border-outline-variant rounded text-xs outline-none focus:border-primary bg-surface-container-lowest"
                placeholder="기관/기업 공식 이메일을 입력하세요"
                required
                type="email"
                value={dossierEmail}
                onChange={(e) => setDossierEmail(e.target.value)}
              />
              <p className="rounded border border-outline-variant bg-surface-container-low px-3 py-2 text-center text-xs font-semibold leading-relaxed text-on-surface">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>
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
          </div>
        )}

          {/* 2. GeoTIFF Spectral Viewer Modal */}
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
      )}

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="stella-orbital"
        industry="corporate"
        featureName="기술 백서(Mission Dossier) 신청 폼"
      />
    </>
  );
}
