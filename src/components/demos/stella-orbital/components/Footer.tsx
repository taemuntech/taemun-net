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
              수출통제 준수 표기 (예시)
            </span>
            <span className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant rounded">
              위성 전파 면허 표기 (예시)
            </span>
            <span className="px-2.5 py-1 bg-surface-container-lowest border border-outline-variant rounded">
              품질 인증 표기 (예시)
            </span>
          </div>
        </div>

        {/* Middle Row: Institutional Links */}
        <div className="flex flex-wrap gap-y-3 gap-x-8 text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
          <a className="hover:text-primary transition-colors duration-150" href="#compliance">
            수출통제 준수
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

        {/* 샘플 고지 — 접을 수 없는 자리에 남긴다(?embed=true 로 화면만 직접 열어도 보인다) */}
        <div className="rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-xs leading-relaxed text-on-surface [word-break:keep-all]">
          <span className="font-bold">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </span>{' '}
          화면의 회사 이름·수치·발사 이력·인증 표기·연락처는 모두 예시이며, 의뢰·백서 신청 폼은 접수되지 않습니다.
        </div>

        {/* Copyright Notice */}
        <div className="pt-4 text-xs text-on-surface-variant/80 border-t border-outline-variant/40 leading-relaxed">
          © 2025 STELLA ORBITAL SYSTEMS INC. ALL RIGHTS RESERVED. EXPORT COMPLIANCE & RADIO LICENSE 표기 자리 (예시). SPACE OPS HUBS: DAEJEON (SOC-1) • SINGAPORE (SOC-2) • LUXEMBOURG (SOC-3).
        </div>
      </div>
    </footer>
  );
}
