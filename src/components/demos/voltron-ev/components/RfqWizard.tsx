import React, { useState } from 'react';
import {
  Trophy,
  Car,
  Truck,
  Plane,
  Send,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { RfqFormData } from '../types';

export const RfqWizard: React.FC = () => {
  const [formData, setFormData] = useState<RfqFormData>({
    vehicleSegment: 'hypercar',
    topology: '800v_pure',
    sopTimeline: '2026_q2',
    contactName: '',
    corporateEmail: '',
    specNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.corporateEmail) return;

    // Generate simulated cryptographic hash
    const fakeHash = '0x' + Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    setTxHash(fakeHash);
    setSubmitted(true);
  };

  return (
    <section
      id="rfq-wizard"
      className="py-16 lg:py-24 bg-[#101319] border-b border-[#3b494c]/30 relative"
    >
      <div className="max-w-[1720px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-code text-xs text-[#00e5ff] uppercase tracking-widest block mb-2">
            // CONFIDENTIAL PROCUREMENT GATEWAY
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#e1e2ea] tracking-tight uppercase">
            Confidential OEM RFQ &amp; Engineering Consultation
          </h2>
          <p className="font-body text-sm text-[#bac9cc] mt-2">
            비공개 견적 및 맞춤형 전력반도체 파워트레인 아키텍처 수주 개발을 위한 최고 엔지니어링
            디렉터 직통 채널입니다.
          </p>
        </div>

        {/* Multi-Step Interactive RFQ Form Container */}
        <div className="max-w-4xl mx-auto bg-[#191c21] rounded-lg border border-[#3b494c]/40 p-6 lg:p-10 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-8" id="rfq-form">
            {/* Step 1: Vehicle Segment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-2">
                <span className="font-display text-sm font-bold text-[#c3f5ff] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#00e5ff] text-[#0b0e13] flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  TARGET VEHICLE PLATFORM SEGMENT
                </span>
                <span className="font-code text-[11px] text-[#849396]">REQUIRED</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-code text-xs">
                {/* Hypercar */}
                <label
                  className={`cursor-pointer p-3 rounded bg-[#1d2025] border flex flex-col items-center gap-2 text-center transition-all ${ formData.vehicleSegment === 'hypercar' ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)] text-[#00e5ff]' : 'border-[#3b494c]/50 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="vehicle_segment"
                    value="hypercar"
                    checked={formData.vehicleSegment === 'hypercar'}
                    onChange={() => setFormData(f => ({ ...f, vehicleSegment: 'hypercar' }))}
                    className="hidden"
                  />
                  <Trophy
                    className={`w-6 h-6 ${ formData.vehicleSegment === 'hypercar' ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  />
                  <span className="font-bold text-[#e1e2ea]">Hypercar / GT</span>
                  <span className="text-[9px] text-[#849396]">800V-1000V High Rev</span>
                </label>

                {/* Premium Sedan/SUV */}
                <label
                  className={`cursor-pointer p-3 rounded bg-[#1d2025] border flex flex-col items-center gap-2 text-center transition-all ${ formData.vehicleSegment === 'passenger_d' ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)] text-[#00e5ff]' : 'border-[#3b494c]/50 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="vehicle_segment"
                    value="passenger_d"
                    checked={formData.vehicleSegment === 'passenger_d'}
                    onChange={() => setFormData(f => ({ ...f, vehicleSegment: 'passenger_d' }))}
                    className="hidden"
                  />
                  <Car
                    className={`w-6 h-6 ${ formData.vehicleSegment === 'passenger_d' ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  />
                  <span className="font-bold text-[#e1e2ea]">Premium Sedan/SUV</span>
                  <span className="text-[9px] text-[#849396]">High Efficiency Dual</span>
                </label>

                {/* Heavy Commercial */}
                <label
                  className={`cursor-pointer p-3 rounded bg-[#1d2025] border flex flex-col items-center gap-2 text-center transition-all ${ formData.vehicleSegment === 'commercial' ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)] text-[#00e5ff]' : 'border-[#3b494c]/50 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="vehicle_segment"
                    value="commercial"
                    checked={formData.vehicleSegment === 'commercial'}
                    onChange={() => setFormData(f => ({ ...f, vehicleSegment: 'commercial' }))}
                    className="hidden"
                  />
                  <Truck
                    className={`w-6 h-6 ${ formData.vehicleSegment === 'commercial' ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  />
                  <span className="font-bold text-[#e1e2ea]">Heavy Commercial</span>
                  <span className="text-[9px] text-[#849396]">Megawatt Duty Cycle</span>
                </label>

                {/* eVTOL Aerospace */}
                <label
                  className={`cursor-pointer p-3 rounded bg-[#1d2025] border flex flex-col items-center gap-2 text-center transition-all ${ formData.vehicleSegment === 'evtol' ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)] text-[#00e5ff]' : 'border-[#3b494c]/50 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="vehicle_segment"
                    value="evtol"
                    checked={formData.vehicleSegment === 'evtol'}
                    onChange={() => setFormData(f => ({ ...f, vehicleSegment: 'evtol' }))}
                    className="hidden"
                  />
                  <Plane
                    className={`w-6 h-6 ${ formData.vehicleSegment === 'evtol' ? 'text-[#00e5ff]' : 'text-[#849396]' }`}
                  />
                  <span className="font-bold text-[#e1e2ea]">eVTOL Aerospace</span>
                  <span className="text-[9px] text-[#849396]">Extreme Gravimetric</span>
                </label>
              </div>
            </div>

            {/* Step 2: System Architecture */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-2">
                <span className="font-display text-sm font-bold text-[#c3f5ff] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#00e5ff] text-[#0b0e13] flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  POWERTRAIN TOPOLOGY &amp; BUS ARCHITECTURE
                </span>
                <span className="font-code text-[11px] text-[#849396]">REQUIRED</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 font-code text-xs">
                <label
                  className={`p-3 rounded bg-[#1d2025] border transition-all cursor-pointer ${ formData.topology === '800v_pure' ? 'border-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'border-[#3b494c]/50 hover:border-[#00e5ff]' }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="topology"
                      value="800v_pure"
                      checked={formData.topology === '800v_pure'}
                      onChange={() => setFormData(f => ({ ...f, topology: '800v_pure' }))}
                      className="text-[#00e5ff] focus:ring-0"
                    />
                    <span className="font-bold text-[#e1e2ea]">Native 800V Dedicated</span>
                  </div>
                  <p className="text-[10px] text-[#bac9cc] mt-1 pl-5">
                    Direct SiC dual-inverter with high-voltage HVAC &amp; onboard 500kW DC charge.
                  </p>
                </label>

                <label
                  className={`p-3 rounded bg-[#1d2025] border transition-all cursor-pointer ${ formData.topology === 'hybrid_boost' ? 'border-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'border-[#3b494c]/50 hover:border-[#00e5ff]' }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="topology"
                      value="hybrid_boost"
                      checked={formData.topology === 'hybrid_boost'}
                      onChange={() => setFormData(f => ({ ...f, topology: 'hybrid_boost' }))}
                      className="text-[#00e5ff] focus:ring-0"
                    />
                    <span className="font-bold text-[#e1e2ea]">400V / 800V Dual Bus Boost</span>
                  </div>
                  <p className="text-[10px] text-[#bac9cc] mt-1 pl-5">
                    Interleaved DC-DC boost stage for legacy 400V battery retrofitting.
                  </p>
                </label>

                <label
                  className={`p-3 rounded bg-[#1d2025] border transition-all cursor-pointer ${ formData.topology === 'custom_sic' ? 'border-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'border-[#3b494c]/50 hover:border-[#00e5ff]' }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="topology"
                      value="custom_sic"
                      checked={formData.topology === 'custom_sic'}
                      onChange={() => setFormData(f => ({ ...f, topology: 'custom_sic' }))}
                      className="text-[#00e5ff] focus:ring-0"
                    />
                    <span className="font-bold text-[#e1e2ea]">Custom SiC Bare-Die Inverter</span>
                  </div>
                  <p className="text-[10px] text-[#bac9cc] mt-1 pl-5">
                    OEM proprietary housing integration with Voltron bare-die modules.
                  </p>
                </label>
              </div>
            </div>

            {/* Step 3: Target SOP */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-2">
                <span className="font-display text-sm font-bold text-[#c3f5ff] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#00e5ff] text-[#0b0e13] flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  PROJECT SOP (START OF PRODUCTION) TIMELINE
                </span>
                <span className="font-code text-[11px] text-[#849396]">REQUIRED</span>
              </div>

              <div className="grid grid-cols-3 gap-3 font-code text-xs">
                <label
                  className={`p-2.5 rounded bg-[#1d2025] border transition-all cursor-pointer text-center ${ formData.sopTimeline === '2026_q2' ? 'border-[#00e5ff] text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'border-[#3b494c]/40 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="sop"
                    value="2026_q2"
                    checked={formData.sopTimeline === '2026_q2'}
                    onChange={() => setFormData(f => ({ ...f, sopTimeline: '2026_q2' }))}
                    className="mr-1.5 text-[#00e5ff]"
                  />
                  <span className="font-bold text-[#e1e2ea]">2026 Q2 - Q4</span>
                </label>

                <label
                  className={`p-2.5 rounded bg-[#1d2025] border transition-all cursor-pointer text-center ${ formData.sopTimeline === '2027' ? 'border-[#00e5ff] text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'border-[#3b494c]/40 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="sop"
                    value="2027"
                    checked={formData.sopTimeline === '2027'}
                    onChange={() => setFormData(f => ({ ...f, sopTimeline: '2027' }))}
                    className="mr-1.5 text-[#00e5ff]"
                  />
                  <span className="font-bold text-[#e1e2ea]">2027 Full Year</span>
                </label>

                <label
                  className={`p-2.5 rounded bg-[#1d2025] border transition-all cursor-pointer text-center ${ formData.sopTimeline === '2028_beyond' ? 'border-[#00e5ff] text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'border-[#3b494c]/40 text-[#bac9cc] hover:border-[#00e5ff]' }`}
                >
                  <input
                    type="radio"
                    name="sop"
                    value="2028_beyond"
                    checked={formData.sopTimeline === '2028_beyond'}
                    onChange={() => setFormData(f => ({ ...f, sopTimeline: '2028_beyond' }))}
                    className="mr-1.5 text-[#00e5ff]"
                  />
                  <span className="font-bold text-[#e1e2ea]">2028+ Advanced R&amp;D</span>
                </label>
              </div>
            </div>

            {/* Step 4: Contact & Secure Dispatch */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#3b494c]/30 pb-2">
                <span className="font-display text-sm font-bold text-[#c3f5ff] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#00e5ff] text-[#0b0e13] flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  LEAD SYSTEMS ARCHITECT DISPATCH &amp; CREDENTIALS
                </span>
                <span className="font-code text-[11px] text-[#5be9ad] flex items-center gap-1 font-bold">
                  <Lock className="w-3 h-3 text-[#5be9ad]" /> ENCRYPTED
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block font-code text-xs text-[#849396] mb-1">
                    PRIMARY CONTACT NAME &amp; TITLE
                  </label>
                  <input
                    id="input-rfq-name"
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={e => setFormData(f => ({ ...f, contactName: e.target.value }))}
                    placeholder="Dr. Johannes Vance // Head of HV Propulsion"
                    className="w-full bg-[#1d2025] border border-[#3b494c]/60 rounded px-3 py-2 text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>

                <div>
                  <label className="block font-code text-xs text-[#849396] mb-1">
                    OEM CORPORATE DOMAIN EMAIL
                  </label>
                  <input
                    id="input-rfq-email"
                    type="email"
                    required
                    value={formData.corporateEmail}
                    onChange={e => setFormData(f => ({ ...f, corporateEmail: e.target.value }))}
                    placeholder="j.vance@automotive-oem.com"
                    className="w-full bg-[#1d2025] border border-[#3b494c]/60 rounded px-3 py-2 text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-code text-xs text-[#849396] mb-1">
                  CUSTOM TECHNICAL SPECIFICATIONS &amp; ANNUAL VOLUME TARGET
                </label>
                <textarea
                  id="textarea-rfq-specs"
                  rows={3}
                  value={formData.specNotes}
                  onChange={e => setFormData(f => ({ ...f, specNotes: e.target.value }))}
                  placeholder="Specify estimated annual unit volume (e.g. 25,000 units/year), peak torque vectors, and any custom bus geometry requirements..."
                  className="w-full bg-[#1d2025] border border-[#3b494c]/60 rounded px-3 py-2 text-xs font-code text-[#e1e2ea] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                id="btn-submit-rfq-directorate"
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#00e5ff] to-cyan-500 text-[#0b0e13] font-display text-sm tracking-wider uppercase font-bold clip-chamfer shadow-[0_0_24px_rgba(0,229,255,0.4)] hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
                DISPATCH CONFIDENTIAL RFQ TO DIRECTORATE
              </button>
            </div>
          </form>

          {/* Submission Feedback Overlay */}
          {submitted && (
            <div
              id="rfqSuccessMsg"
              className="mt-6 p-5 rounded bg-[#5be9ad]/10 border border-[#5be9ad] text-[#5be9ad] font-code text-xs flex flex-col lg:flex-row items-start lg:items-center gap-4 animate-fadeIn shadow-lg"
            >
              <CheckCircle2 className="w-6 h-6 text-[#5be9ad] shrink-0" />
              <div className="space-y-1">
                <span className="font-bold block text-sm">
                  TRANSMISSION CONFIRMED // ENCRYPTED TIER-1 RFQ LOGGED
                </span>
                <span className="text-[#bac9cc] block">
                  Voltron Directorate Lead Systems Engineer will establish contact via PGP secure channel
                  within 4 operational hours.
                </span>
                <div className="text-[10px] text-[#849396] pt-1">
                  SECURE RECEIPT HASH: <span className="text-[#00e5ff]">{txHash}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
