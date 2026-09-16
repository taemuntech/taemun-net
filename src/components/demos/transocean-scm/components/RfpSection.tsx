import React, { useState } from 'react';
import { Send, Shield, Database, Award, CheckCircle2, Phone, Mail, Clock } from 'lucide-react';

interface RfpSectionProps {
  prefilledPlanNote?: string | null;
}

export const RfpSection: React.FC<RfpSectionProps> = ({ prefilledPlanNote }) => {
  const [scopeType, setScopeType] = useState('fcl');
  const [corridor, setCorridor] = useState('Asia - Northern Europe (Busan/Shanghai -> Rotterdam/Hamburg)');
  const [volume, setVolume] = useState('2,500 - 10,000 TEU / Year');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [ndaAgreed, setNdaAgreed] = useState(true);
  const [apiDocRequested, setApiDocRequested] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfqId, setSubmittedRfqId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `RFQ-2025-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedRfqId(generatedId);
    }, 1200);
  };

  return (
    <section id="rfpSection" className="py-12 bg-[#061426] border-b border-[#434655]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Narrative & Key Contacts */}
          <div className="lg:col-span-5">
            <span className="font-mono text-xs text-[#ffb693] uppercase tracking-widest block mb-1 font-semibold">
              GLOBAL ENTERPRISE CARRIAGE CONTRACT
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              Request Master Service RFP &amp; Dedicated TEU Allocation
            </h2>
            <p className="text-sm text-[#c3c6d7] leading-relaxed mb-6">
              대기업 및 글로벌 공급망 운영사를 위한 엔터프라이즈 전용 선복 보장(Guaranteed Allocation) 및 
              ERP EDI 연동 계약 문의를 접수합니다. 영업일 24시간 내 글로벌 키 어카운트 디렉터가 전담 분석 보고서를 회신합니다.
            </p>

            <div className="space-y-3 font-mono text-xs text-[#d6e3fe] mb-8">
              <div className="flex items-center space-x-2.5">
                <Shield className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                <span>Tier-1 Enterprise NDA &amp; Trade Secret Protection</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Database className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                <span>Seamless SAP / Oracle / BlueYonder API Telemetry Webhooks</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Award className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                <span>FMC &amp; IMO Licensed Guaranteed Fixed BAF Matrix</span>
              </div>
            </div>

            {/* Direct Accounts Desk Card */}
            <div className="p-4 lg:p-5 rounded-lg bg-[#0e1c2f] border border-[#434655]/40 shadow-md">
              <div className="font-mono text-[11px] text-[#8d90a0] uppercase mb-1 font-semibold">
                DIRECT KEY ACCOUNTS DESK
              </div>
              <div className="text-base font-bold text-white mb-2">Transocean Global Commercial HQ</div>
              <div className="font-mono text-xs text-[#c3c6d7] space-y-1">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#ffb693]" />
                  <span>Busan: +82 51-998-8400 • Rotterdam: +31 10-892-4100</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#ffb693]" />
                  <span>enterprise@transocean-scm.com</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Average Response: &lt; 2.5 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 bg-[#132033] border border-[#434655]/40 rounded-lg p-5 lg:p-8 shadow-xl">
            {prefilledPlanNote && (
              <div className="mb-4 p-3 rounded bg-blue-950/60 border border-[#2563eb]/50 text-xs font-mono text-[#b4c5ff]">
                <span className="font-bold">Prefilled Simulator Quote: </span>
                <span>{prefilledPlanNote}</span>
              </div>
            )}

            {submittedRfqId ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise RFQ Dispatched</h3>
                <div className="font-mono text-sm text-emerald-400 bg-[#0e1c2f] p-3 rounded-lg border border-emerald-500/30 max-w-md mx-auto">
                  Registered Docket: <span className="font-bold">{submittedRfqId}</span>
                </div>
                <p className="text-sm text-[#c3c6d7] max-w-md mx-auto">
                  An executive key accounts manager has been assigned to <span className="text-white font-semibold">{company}</span> ({email}). A formal tariff sheet and EDI telemetry sandbox token will arrive within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedRfqId(null)}
                  className="bg-[#2563eb] text-white px-6 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1d4ed8] transition-colors"
                >
                  Submit Another RFQ
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Step 1: Cargo Scope */}
                <div>
                  <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-2 font-semibold">
                    1. Shipment Scope &amp; Equipment Type
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      { id: 'fcl', label: 'FCL (Dry 20/40)' },
                      { id: 'reefer', label: 'Cold Chain Reefer' },
                      { id: 'project', label: 'Breakbulk/Project' },
                      { id: 'lcl', label: 'LCL Consolidation' },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center space-x-2 p-2.5 rounded border cursor-pointer text-xs transition-colors ${ scopeType === item.id ? 'bg-[#1d2a3e] border-[#2563eb] text-white font-semibold' : 'bg-[#0e1c2f] border-[#434655]/40 text-[#c3c6d7] hover:border-[#b4c5ff]' }`}
                      >
                        <input
                          type="radio"
                          name="scopeType"
                          checked={scopeType === item.id}
                          onChange={() => setScopeType(item.id)}
                          className="accent-[#2563eb]"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 2: Trade Lane & Volume */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      2. Primary Trade Lane Corridor
                    </label>
                    <select
                      value={corridor}
                      onChange={(e) => setCorridor(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded p-2.5 text-xs text-white focus:border-[#2563eb] focus:outline-none"
                    >
                      <option>Asia - Northern Europe (Busan/Shanghai -&gt; Rotterdam/Hamburg)</option>
                      <option>Trans-Pacific US West Coast (Busan -&gt; LA/Long Beach)</option>
                      <option>Trans-Pacific US East Coast (via Panama Corridor)</option>
                      <option>Intra-Asia Dedicated Loop (Korea -&gt; Vietnam/Singapore)</option>
                      <option>Global Multi-Corridor Enterprise Master Agreement</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      Annual Projected Volume
                    </label>
                    <select
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded p-2.5 text-xs text-white focus:border-[#2563eb] focus:outline-none"
                    >
                      <option>500 - 2,500 TEU / Year</option>
                      <option>2,500 - 10,000 TEU / Year</option>
                      <option>10,000 - 50,000 TEU / Year</option>
                      <option>50,000+ TEU Mega Enterprise Commitment</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Company & Contact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      Corporate Entity / Brand
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyundai Glovis / Samsung SCM"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded p-2.5 text-xs text-white focus:border-[#2563eb] focus:outline-none placeholder:text-[#8d90a0]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      Logistics Director / Lead Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="corporate.scm@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded p-2.5 text-xs text-white focus:border-[#2563eb] focus:outline-none placeholder:text-[#8d90a0]"
                    />
                  </div>
                </div>

                {/* Step 4: NDA & Integration Checkbox */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-start space-x-2 cursor-pointer text-xs text-[#c3c6d7]">
                    <input
                      type="checkbox"
                      checked={ndaAgreed}
                      onChange={(e) => setNdaAgreed(e.target.checked)}
                      className="rounded border-[#434655] accent-[#2563eb] mt-0.5"
                    />
                    <span>I require an executed Corporate Non-Disclosure Agreement (Mutual NDA) prior to sharing freight lane volumes.</span>
                  </label>

                  <label className="flex items-start space-x-2 cursor-pointer text-xs text-[#c3c6d7]">
                    <input
                      type="checkbox"
                      checked={apiDocRequested}
                      onChange={(e) => setApiDocRequested(e.target.checked)}
                      className="rounded border-[#434655] accent-[#2563eb] mt-0.5"
                    />
                    <span>Include Transocean REST API &amp; EDI 304/310 Telemetry Sandbox documentation with quotation.</span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="rfp-submit-btn"
                    disabled={isSubmitting}
                    className="w-full bg-[#fe6b00] text-white py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-xl hover:shadow-orange-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                        <span>Securing Carrier Allocation Node...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Formal Enterprise RFQ to Commercial Directorate</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
