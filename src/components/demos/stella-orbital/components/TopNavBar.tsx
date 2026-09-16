import React from 'react';
import { Satellite, Radio, FileText } from 'lucide-react';
import { ModalType } from '../types';

interface TopNavBarProps {
  onOpenModal: (type: ModalType) => void;
}

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1XPaPOHBIoNMumt7W26j6Vl-aVmJaEGIqeQmtBMa_DafToocNI39En9Xk-_u4bBsTiZ5cNJYM3FuqEWpOYt8ZqolPUShU-R4KLY963dsczxG-jgJ3uNOlJpipQjHz0ZeN5d0JNtXlk9BUCz-I62oP1CIjGDk8OwO_i409R_ZS3GL6cCMLrkMe5ZPB0YQYEbIJMQFFkqgWHFHVEPf6YUxJsz-uliW5gjts3hOsh9AvL8fFTNWm98Y1DHKA";

export default function TopNavBar({ onOpenModal }: TopNavBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/60 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
      {/* Top Micro Telemetry Status Bar */}
      <div className="w-full bg-surface-container-low border-b border-outline-variant/40 px-4 lg:px-8 py-1 hidden lg:flex items-center justify-between text-xs font-code-mono text-on-surface-variant">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center gap-1.5 text-secondary font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Constellation Telemetry: 48/48 Nominal
          </span>
          <span className="text-outline-variant">|</span>
          <span>LEO Orbit: 502.4km SSO</span>
          <span className="text-outline-variant">|</span>
          <span>Optical GSD: 0.30m</span>
          <span className="text-outline-variant">|</span>
          <span>SAR: X-Band Quad-Pol</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-on-surface-variant">Ground Stations: 14 Nodes Locked</span>
          <span className="text-outline-variant">|</span>
          <span className="inline-flex items-center gap-1 text-primary font-semibold">
            <Satellite className="w-3.5 h-3.5" />
            Downlink: Active 10Gbps OISL
          </span>
        </div>
      </div>

      {/* Main Navigation Bar Shell */}
      <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo Anchor */}
        <div className="flex items-center gap-4">
          <a className="flex items-center gap-3 group" href="#">
            <img
              alt="STELLA ORBITAL SYSTEMS Logo"
              className="h-8 lg:h-9 w-auto object-contain"
              src={LOGO_URL}
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wide">
          <a
            className="text-primary border-b-2 border-primary pb-1 font-semibold hover:text-primary transition-colors duration-150"
            href="#fleet"
          >
            Fleet
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150"
            href="#solutions"
          >
            Earth Solutions
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150"
            href="#sensors"
          >
            Sensor Specs
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150"
            href="#manufacturing"
          >
            Mission Control
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-150"
            href="#tasking"
          >
            Client Portal
          </a>
        </nav>

        {/* Trailing Action Systems */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-on-surface-variant hover:text-primary border border-outline-variant rounded-lg bg-surface-container-lowest transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
            onClick={() => onOpenModal('dossier')}
          >
            <Radio className="w-4 h-4 text-primary" />
            Request Sensor Whitepaper
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary font-semibold text-xs rounded-lg hover:bg-primary transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
            onClick={() => onOpenModal('tasking')}
          >
            <Satellite className="w-4 h-4" />
            Task a Satellite
          </button>
        </div>
      </div>
    </header>
  );
}
