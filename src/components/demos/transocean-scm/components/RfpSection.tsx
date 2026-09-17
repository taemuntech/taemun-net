'use client';

import React, { useState } from 'react';
import { Send, Shield, Database, Award, Phone, Mail, Clock } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

interface RfpSectionProps {
  prefilledPlanNote?: string | null;
}

export const RfpSection: React.FC<RfpSectionProps> = ({ prefilledPlanNote }) => {
  const [scopeType, setScopeType] = useState('fcl');
  const [corridor, setCorridor] = useState('Asia - Northern Europe (Busan/Shanghai -> Rotterdam/Hamburg)');
  const [volume, setVolume] = useState('2,500 - 10,000 TEU / Year');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [ndaAgreed, setNdaAgreed] = useState(true);
  const [apiDocRequested, setApiDocRequested] = useState(true);

  // 샘플이라 RFQ 를 접수하지 않는다 — 가짜 접수번호(RFQ-2025-…)·「24시간 내 회신」 성공 화면 대신
  // 공용 안내(SampleNotice)만 연다. 입력값은 어디에도 보내지 않는다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !email) return;
    setIsNoticeOpen(true);
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
              대기업 및 글로벌 공급망 운영사를 위한 엔터프라이즈 전용 선복 배정과 ERP EDI 연동 계약 문의를 받는 지면입니다.
              이 화면은 가상 브랜드 샘플이라 문의가 실제로 접수되지 않고, 아래 내용은 어디에도 전송되지 않습니다.
            </p>

            <div className="space-y-3 font-mono text-xs text-[#d6e3fe] mb-8">
              <div className="flex items-center space-x-2.5">
                <Shield className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                <span>Tier-1 Enterprise NDA &amp; Trade Secret Protection (예시)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Database className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                <span>표준 ERP · WMS API 텔레메트리 웹훅 연동 (예시)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Award className="w-4 h-4 text-[#b4c5ff] shrink-0" />
                <span>고정 BAF 매트릭스 · 국제 해운 규정 준수 (예시)</span>
              </div>
            </div>

            {/* Direct Accounts Desk Card */}
            <div className="p-4 lg:p-5 rounded-lg bg-[#0e1c2f] border border-[#434655]/40 shadow-md">
              <div className="font-mono text-[11px] text-[#8d90a0] uppercase mb-1 font-semibold">
                DIRECT KEY ACCOUNTS DESK
              </div>
              <div className="text-base font-bold text-white mb-2">Transocean Global Commercial HQ</div>
              <div className="font-mono text-xs text-[#c3c6d7] space-y-1">
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#ffb693]" />
                  <span className="break-words">Busan: 000-0000-0000 • Rotterdam: 00-000-0000 (예시)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#ffb693]" />
                  <span>enterprise@example.com (예시)</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-400 pt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Average Response: &lt; 2.5 Hours (예시)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 bg-[#132033] border border-[#434655]/40 rounded-lg p-5 lg:p-8 shadow-xl">
            {prefilledPlanNote && (
              <div className="mb-4 p-3 rounded bg-blue-950/60 border border-[#2563eb]/50 text-xs font-mono text-[#b4c5ff] break-words">
                <span className="font-bold">Prefilled Simulator Quote: </span>
                <span>{prefilledPlanNote}</span>
              </div>
            )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Step 1: Cargo Scope */}
                <div>
                  <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-2 font-semibold">
                    1. Shipment Scope &amp; Equipment Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'fcl', label: 'FCL (Dry 20/40)' },
                      { id: 'reefer', label: 'Cold Chain Reefer' },
                      { id: 'project', label: 'Breakbulk/Project' },
                      { id: 'lcl', label: 'LCL Consolidation' },
                    ].map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center space-x-2 px-2.5 min-h-11 rounded border cursor-pointer text-xs transition-colors ${ scopeType === item.id ? 'bg-[#1d2a3e] border-[#2563eb] text-white font-semibold' : 'bg-[#0e1c2f] border-[#434655]/40 text-[#c3c6d7] hover:border-[#b4c5ff]' }`}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      2. Primary Trade Lane Corridor
                    </label>
                    <select
                      value={corridor}
                      onChange={(e) => setCorridor(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded px-2.5 min-h-11 text-xs text-white focus:border-[#2563eb] focus:outline-none"
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
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded px-2.5 min-h-11 text-xs text-white focus:border-[#2563eb] focus:outline-none"
                    >
                      <option>500 - 2,500 TEU / Year</option>
                      <option>2,500 - 10,000 TEU / Year</option>
                      <option>10,000 - 50,000 TEU / Year</option>
                      <option>50,000+ TEU Mega Enterprise Commitment</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Company & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      Corporate Entity / Brand
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: A물류 / B상사"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded px-2.5 min-h-11 text-xs text-white focus:border-[#2563eb] focus:outline-none placeholder:text-[#8d90a0]"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#8d90a0] uppercase block mb-1 font-semibold">
                      Logistics Director / Lead Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="corporate.scm@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0e1c2f] border border-[#434655]/50 rounded px-2.5 min-h-11 text-xs text-white focus:border-[#2563eb] focus:outline-none placeholder:text-[#8d90a0]"
                    />
                  </div>
                </div>

                {/* Step 4: NDA & Integration Checkbox */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-start gap-2 cursor-pointer py-1.5 text-xs text-[#c3c6d7] [word-break:keep-all]">
                    <input
                      type="checkbox"
                      checked={ndaAgreed}
                      onChange={(e) => setNdaAgreed(e.target.checked)}
                      className="rounded border-[#434655] accent-[#2563eb] mt-0.5"
                    />
                    <span>I require an executed Corporate Non-Disclosure Agreement (Mutual NDA) prior to sharing freight lane volumes.</span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer py-1.5 text-xs text-[#c3c6d7] [word-break:keep-all]">
                    <input
                      type="checkbox"
                      checked={apiDocRequested}
                      onChange={(e) => setApiDocRequested(e.target.checked)}
                      className="rounded border-[#434655] accent-[#2563eb] mt-0.5"
                    />
                    <span>Include Transocean REST API &amp; EDI 304/310 Telemetry Sandbox documentation with quotation.</span>
                  </label>
                </div>

                {/* 제출 전 고지 — 샘플이라 아무 데도 보내지 않는다 */}
                <p className="rounded border border-[#2563eb]/40 bg-[#0e1c2f] px-4 py-3 text-center text-xs leading-relaxed text-[#d6e3fe]">
                  샘플 사이트입니다 — 입력하신 내용은 어디에도 <strong className="font-bold text-[#b4c5ff]">전송되지 않습니다</strong>.
                </p>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="rfp-submit-btn"
                    className="w-full bg-[#fe6b00] text-white py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-xl hover:shadow-orange-500/20"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">Dispatch Formal Enterprise RFQ to Commercial Directorate</span>
                    <span className="sm:hidden">엔터프라이즈 RFQ 보내기</span>
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="transocean-scm"
        industry="corporate"
        featureName="엔터프라이즈 RFQ·선복 배정 신청"
      />
    </section>
  );
};
