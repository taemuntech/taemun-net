import React from 'react';
import { LOGO_URL } from './TopNavBar';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/60 text-on-surface mt-auto">
      <div className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col space-y-6">
        {/* Top Row: Logo & Compliance Specs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-outline-variant/50">
          <div>
            <img
              alt="STELLA ORBITAL SYSTEMS Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
              referrerPolicy="no-referrer"
            />
            <p className="text-xs text-on-surface-variant mt-2 max-w-md leading-relaxed">
              Next-Generation Autonomous SmallSat Earth Observation Constellation. Real-time planetary intelligence powered by orbital edge AI.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-code-mono text-xs text-on-surface-variant">
            <span className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant rounded">
              ITAR COMPLIANT
            </span>
            <span className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant rounded">
              FCC &amp; ITU LICENSED
            </span>
            <span className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant rounded">
              ISO 9001:2015 AS
            </span>
          </div>
        </div>

        {/* Middle Row: Institutional Links */}
        <div className="flex flex-wrap gap-y-3 gap-x-8 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          <a className="hover:text-primary transition-colors duration-150" href="#compliance">
            ITAR Compliance
          </a>
          <a className="hover:text-primary transition-colors duration-150" href="#licenses">
            Satellite Radio Licenses
          </a>
          <a className="hover:text-primary transition-colors duration-150" href="#soc">
            Space Operations Centers
          </a>
          <a className="hover:text-primary transition-colors duration-150" href="#privacy">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors duration-150" href="#security">
            Security Architecture
          </a>
          <a className="hover:text-primary transition-colors duration-150" href="#status">
            System Status
          </a>
        </div>

        {/* Space Operations Hubs Metadata */}
        <div className="font-code-mono text-xs text-on-surface-variant flex flex-wrap gap-y-2 gap-x-6">
          <span>SPACE OPS HUB 1: DAEJEON (SOC-1 AERO CLUSTER)</span>
          <span>•</span>
          <span>SPACE OPS HUB 2: SINGAPORE (SOC-2 APAC DOWNLINK)</span>
          <span>•</span>
          <span>SPACE OPS HUB 3: LUXEMBOURG (SOC-3 EUROPE GATEWAY)</span>
        </div>

        {/* Copyright Notice */}
        <div className="pt-4 text-xs text-on-surface-variant/80 border-t border-outline-variant/40 leading-relaxed">
          © 2025 STELLA ORBITAL SYSTEMS INC. ALL RIGHTS RESERVED. DEFENSE EXPORT COMPLIANCE ITAR REGISTERED / NO-EXP-889. FCC &amp; ITU SATELLITE RADIO LICENSES GRANTED. SPACE OPS HUBS: DAEJEON (SOC-1) • SINGAPORE (SOC-2) • LUXEMBOURG (SOC-3).
        </div>
      </div>
    </footer>
  );
}
