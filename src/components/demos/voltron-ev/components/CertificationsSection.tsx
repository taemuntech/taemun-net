import React, { useState } from 'react';
import { CheckCircle, Layers, ShieldAlert, Lock, Download, Check, FileCheck } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [entity, setEntity] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !entity) return;

    setDownloadSuccess(true);
    // Auto reset notification after a few seconds
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 6000);
  };

  return (
    <section
      id="certifications"
      className="py-16 lg:py-24 bg-[#0b0e13] border-b border-[#3b494c]/30 relative"
    >
      <div className="max-w-[1720px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text and Cert Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-code text-xs text-[#00e5ff] uppercase tracking-widest block mb-2">
                // RIGOROUS AUTOMOTIVE STANDARDS
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#e1e2ea] tracking-tight uppercase">
                Global OEM Compliance &amp; Powertrain Validation
              </h2>
              <p className="font-body text-sm text-[#bac9cc] mt-2 leading-relaxed">
                Every Voltron 800V component conforms stringently to worldwide Tier-1 automotive
                functional safety, discrete semiconductor endurance, and cybersecurity frameworks.
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                id="badge-iso26262"
                className="p-4 rounded bg-[#191c21] border border-[#3b494c]/40 flex items-start gap-3.5 shadow-md"
              >
                <CheckCircle className="w-6 h-6 text-[#00e5ff] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#e1e2ea]">
                    ISO 26262 ASIL-D
                  </h4>
                  <p className="font-body text-xs text-[#bac9cc] mt-1 leading-relaxed">
                    Highest functional safety integrity level validated by TÜV Rheinland for
                    dual-inverter fail-operational architectures.
                  </p>
                </div>
              </div>

              <div
                id="badge-aecq101"
                className="p-4 rounded bg-[#191c21] border border-[#3b494c]/40 flex items-start gap-3.5 shadow-md"
              >
                <Layers className="w-6 h-6 text-[#5be9ad] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#e1e2ea]">
                    AEC-Q101 Grade 0
                  </h4>
                  <p className="font-body text-xs text-[#bac9cc] mt-1 leading-relaxed">
                    Discrete automotive qualification tested up to 2,000 thermal cycles at extreme
                    junction extremes (-40°C to +175°C).
                  </p>
                </div>
              </div>

              <div
                id="badge-unece-r100"
                className="p-4 rounded bg-[#191c21] border border-[#3b494c]/40 flex items-start gap-3.5 shadow-md"
              >
                <ShieldAlert className="w-6 h-6 text-[#b4c5ff] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#e1e2ea]">
                    UNECE R100 Rev 3
                  </h4>
                  <p className="font-body text-xs text-[#bac9cc] mt-1 leading-relaxed">
                    Electric vehicle electrical safety approval compliant across European, Korean
                    (KMVSS), and North American standards.
                  </p>
                </div>
              </div>

              <div
                id="badge-iso21434"
                className="p-4 rounded bg-[#191c21] border border-[#3b494c]/40 flex items-start gap-3.5 shadow-md"
              >
                <Lock className="w-6 h-6 text-[#c3f5ff] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#e1e2ea]">
                    ISO/SAE 21434
                  </h4>
                  <p className="font-body text-xs text-[#bac9cc] mt-1 leading-relaxed">
                    End-to-end vehicle cybersecurity engineering protecting CAN-FD and Automotive
                    Ethernet telemetry nodes from intrusion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Technical Dossier Download Card */}
          <div
            id="technical-dossier"
            className="lg:col-span-5 hud-bracket p-8 rounded-lg bg-[#1d2025] border border-[#00e5ff]/40 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#00e5ff]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#3b494c]/40 pb-3 mb-5">
              <span className="font-code text-xs text-[#c3f5ff] font-bold">
                // CLASSIFIED OEM DOSSIER
              </span>
              <span className="text-xs font-code text-[#5be9ad] font-semibold">
                RESTRICTED TIER-1
              </span>
            </div>

            <h3 className="font-display text-lg lg:text-xl text-[#e1e2ea] font-bold mb-2">
              Voltron 2026 SiC Powertrain Whitepaper
            </h3>

            <p className="font-body text-xs text-[#bac9cc] mb-6 leading-relaxed">
              Comprehensive 96-page engineering compilation detailing 1,200V trench gate
              capacitance, thermal transient FEM analyses, and hairpin stator slot fill
              benchmarking.
            </p>

            {downloadSuccess ? (
              <div
                id="dossier-success-box"
                className="p-4 rounded bg-[#5be9ad]/10 border border-[#5be9ad] text-[#5be9ad] font-code text-xs space-y-2 animate-fadeIn"
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <FileCheck className="w-5 h-5 text-[#5be9ad]" />
                  <span>TECHNICAL DOSSIER AUTHORIZED</span>
                </div>
                <p className="text-[#bac9cc] text-[11px] leading-relaxed">
                  A high-resolution, watermarked cryptographic PDF (SHA-256 validated) has been
                  dispatched to <strong className="text-[#e1e2ea]">{email}</strong> for entity{' '}
                  <strong className="text-[#e1e2ea]">{entity}</strong>.
                </p>
                <button
                  onClick={() => setDownloadSuccess(false)}
                  className="text-[10px] text-[#00e5ff] hover:underline block pt-1 cursor-pointer"
                >
                  Request another credential copy →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" id="dossier-request-form">
                <div>
                  <label className="block font-code text-xs text-[#849396] mb-1">
                    AUTHORIZED CORPORATE EMAIL (.OEM / .TIER1)
                  </label>
                  <input
                    id="input-dossier-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="architect@oem-mobility.com"
                    className="w-full bg-[#0b0e13] border border-[#3b494c]/60 rounded px-3 py-2 text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                  />
                </div>

                <div>
                  <label className="block font-code text-xs text-[#849396] mb-1">
                    OEM / INTEGRATOR ENTITY
                  </label>
                  <input
                    id="input-dossier-entity"
                    type="text"
                    required
                    value={entity}
                    onChange={e => setEntity(e.target.value)}
                    placeholder="e.g. Hyundai Motor Group, Porsche AG, Lucid"
                    className="w-full bg-[#0b0e13] border border-[#3b494c]/60 rounded px-3 py-2 text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                  />
                </div>

                <button
                  id="btn-submit-dossier-download"
                  type="submit"
                  className="w-full py-3 px-4 bg-[#00e5ff] text-[#0b0e13] font-display text-xs tracking-wider uppercase font-bold rounded hover:shadow-[0_0_16px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD DIRECT TECHNICAL DOSSIER (PDF)
                </button>
              </form>
            )}

            <div className="mt-4 flex items-center gap-2 text-[10px] font-code text-[#849396] justify-center">
              <Lock className="w-3 h-3 text-[#5be9ad]" />
              <span>PROTECTED UNDER MUTUAL NDA // WATERMARKED ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
