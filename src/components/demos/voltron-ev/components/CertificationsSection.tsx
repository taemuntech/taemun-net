import React, { useState } from 'react';
import { CheckCircle, Layers, ShieldAlert, Lock, Download } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

export const CertificationsSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [entity, setEntity] = useState('');

  // 샘플이라 백서를 보내지 않는다 — 「메일로 발송했다」는 가짜 접수 화면 대신 공용 안내(SampleNotice)만 연다.
  // 입력값은 이 컴포넌트 밖으로 한 글자도 나가지 않는다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <section
      id="certifications"
      className="py-16 lg:py-24 bg-[#0b0e13] border-b border-[#3b494c]/30 relative"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
                functional safety, discrete semiconductor endurance, and cybersecurity frameworks. 가상 브랜드 샘플이라 아래 인증 배지와 시험 조건은 모두 예시 수치·예시 표기입니다.
              </p>
            </div>

            {/* Badges Grid — 태블릿(768) 중간 단계. 모바일/웹 경계는 그대로 lg 이다 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                id="badge-iso26262"
                className="p-4 rounded bg-[#191c21] border border-[#3b494c]/40 flex items-start gap-3.5 shadow-md"
              >
                <CheckCircle className="w-6 h-6 text-[#00e5ff] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-sm font-bold text-[#e1e2ea]">
                    ISO 26262 ASIL-D (예시 표기)
                  </h4>
                  <p className="font-body text-xs text-[#bac9cc] mt-1 leading-relaxed">
                    Highest functional safety integrity level assessed by an international
                    certification body (예시 표기) for dual-inverter fail-operational architectures.
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
                    AEC-Q101 Grade 0 (예시 표기)
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
                    UNECE R100 Rev 3 (예시 표기)
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
                    ISO/SAE 21434 (예시 표기)
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

            {/* gap 이 없어 375 에서 「RESTRICTED TIER-1」 이 「TIER-」/「1」 로 쪼개졌다 */}
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-[#3b494c]/40 pb-3 mb-5">
              <span className="font-code text-xs text-[#c3f5ff] font-bold whitespace-nowrap">
                // CLASSIFIED OEM DOSSIER
              </span>
              <span className="text-xs font-code text-[#5be9ad] font-semibold whitespace-nowrap">
                RESTRICTED TIER-1
              </span>
            </div>

            <h3 className="font-display text-lg lg:text-xl text-[#e1e2ea] font-bold mb-2">
              Voltron 2026 SiC Powertrain Whitepaper
            </h3>

            <p className="font-body text-xs text-[#bac9cc] mb-6 leading-relaxed">
              Comprehensive 96-page engineering compilation (예시) detailing 1,200V trench gate
              capacitance, thermal transient FEM analyses, and hairpin stator slot fill
              benchmarking.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" id="dossier-request-form">
              <div>
                <label htmlFor="input-dossier-email" className="block font-code text-xs text-[#849396] mb-1">
                  AUTHORIZED CORPORATE EMAIL (.OEM / .TIER1)
                </label>
                {/* 폰에서 16px 미만이면 iOS 가 초점을 잡을 때 화면을 확대해 가로 스크롤이 생긴다 — lg 미만만 16px */}
                <input
                  id="input-dossier-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="architect@example.com"
                  className="w-full min-h-11 bg-[#0b0e13] border border-[#3b494c]/60 rounded px-3 py-2 text-[16px] lg:text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                />
              </div>

              <div>
                <label htmlFor="input-dossier-entity" className="block font-code text-xs text-[#849396] mb-1">
                  OEM / INTEGRATOR ENTITY
                </label>
                <input
                  id="input-dossier-entity"
                  type="text"
                  required
                  value={entity}
                  onChange={e => setEntity(e.target.value)}
                  placeholder="예) A사 · B모빌리티 · C오토 (예시)"
                  className="w-full min-h-11 bg-[#0b0e13] border border-[#3b494c]/60 rounded px-3 py-2 text-[16px] lg:text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                />
              </div>

              <p className="font-body text-[11px] leading-relaxed text-[#bac9cc] [word-break:keep-all]">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>

              <button
                id="btn-submit-dossier-download"
                type="submit"
                className="w-full py-3 px-4 bg-[#00e5ff] text-[#0b0e13] font-display text-xs tracking-wider uppercase font-bold rounded hover:shadow-[0_0_16px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD DIRECT TECHNICAL DOSSIER (PDF)
              </button>
            </form>

            <div className="mt-4 flex items-center gap-2 text-[10px] font-code text-[#849396] justify-center">
              <Lock className="w-3 h-3 text-[#5be9ad]" />
              <span>PROTECTED UNDER MUTUAL NDA // WATERMARKED ACCESS (예시 표기)</span>
            </div>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="voltron-ev"
        industry="manufacturing"
        featureName="엔지니어링 백서(기술 자료) 신청 폼"
      />
    </section>
  );
};
