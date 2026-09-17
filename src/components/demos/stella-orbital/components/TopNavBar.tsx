'use client';

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Satellite, Radio, Menu, X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { ModalType } from '../types';

interface TopNavBarProps {
  onOpenModal: (type: ModalType) => void;
  /** 「Task a Satellite」 는 촬영 의뢰 폼으로 내려보낸다 — 예전엔 폼도 없이 가짜 접수증 모달을 띄웠다 */
  onScrollToTasking: () => void;
}

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1XPaPOHBIoNMumt7W26j6Vl-aVmJaEGIqeQmtBMa_DafToocNI39En9Xk-_u4bBsTiZ5cNJYM3FuqEWpOYt8ZqolPUShU-R4KLY963dsczxG-jgJ3uNOlJpipQjHz0ZeN5d0JNtXlk9BUCz-I62oP1CIjGDk8OwO_i409R_ZS3GL6cCMLrkMe5ZPB0YQYEbIJMQFFkqgWHFHVEPf6YUxJsz-uliW5gjts3hOsh9AvL8fFTNWm98Y1DHKA";

/** 지면에 실재하는 섹션만 건다 — 대상 없는 앵커는 눌러도 아무 데도 가지 않으므로 두지 않는다. */
export const NAV_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: '#fleet', label: 'Fleet' },
  { href: '#solutions', label: 'Earth Solutions' },
  { href: '#sensors', label: 'Sensor Specs' },
  { href: '#manufacturing', label: 'Mission Control' },
  { href: '#tasking', label: 'Client Portal' },
];

export default function TopNavBar({ onOpenModal, onScrollToTasking }: TopNavBarProps) {
  // lg 미만(0~1023px)에서는 가로 내비가 통째로 숨어 있어 다섯 링크와 백서 버튼이 닿지 않았다 — 시트로 연다.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useSampleDialog({ open: isMenuOpen, onClose: () => setIsMenuOpen(false), dialogRef: menuRef });

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 w-full bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/60 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
      {/* Top Micro Telemetry Status Bar */}
      <div className="w-full bg-surface-container-low border-b border-outline-variant/40 px-4 lg:px-8 py-1 hidden lg:flex items-center justify-between text-xs font-code-mono text-on-surface-variant">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center gap-1.5 text-secondary font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Constellation Telemetry: 32/32 Nominal (예시)
          </span>
          <span className="text-outline-variant">|</span>
          <span>LEO Orbit: 502.4km SSO</span>
          <span className="text-outline-variant">|</span>
          <span>Optical GSD: 0.30m</span>
          <span className="text-outline-variant">|</span>
          <span>SAR: X-Band Quad-Pol</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-on-surface-variant">Ground Stations: 14 Nodes Locked (예시)</span>
          <span className="text-outline-variant">|</span>
          <span className="inline-flex items-center gap-1 text-primary font-semibold">
            <Satellite className="w-3.5 h-3.5" />
            Downlink: Active 10Gbps OISL
          </span>
        </div>
      </div>

      {/* Main Navigation Bar Shell */}
      <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo Anchor */}
        <div className="flex items-center gap-4 min-w-0">
          <a
            className="flex items-center gap-3 group max-lg:min-h-11 shrink-0"
            href="#fleet"
            aria-label="STELLA ORBITAL SYSTEMS — 함대 소개로 이동"
          >
            <img
              alt="STELLA ORBITAL SYSTEMS Logo"
              className="h-8 lg:h-9 w-auto max-w-[160px] object-contain"
              src={LOGO_URL}
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wide">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              className={
                index === 0
                  ? 'text-primary border-b-2 border-primary pb-1 font-semibold hover:text-primary transition-colors duration-150'
                  : 'text-on-surface-variant font-medium hover:text-primary transition-colors duration-150'
              }
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Action Systems */}
        <div className="flex items-center gap-2 lg:gap-3">
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
            className="inline-flex items-center justify-center gap-2 px-4 py-2 max-lg:min-h-11 bg-primary-container text-on-primary font-semibold text-xs rounded-lg hover:bg-primary transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
            onClick={onScrollToTasking}
          >
            <Satellite className="w-4 h-4 shrink-0" />
            <span className="max-lg:hidden">Task a Satellite</span>
            <span className="lg:hidden">Tasking</span>
          </button>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg border border-outline-variant text-on-surface-variant hover:text-primary bg-surface-container-lowest transition-colors cursor-pointer"
            aria-label="메뉴 열기"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile · Tablet Navigation Sheet — lg 미만 전용.
          헤더에 backdrop-blur 가 걸려 있어 그 안의 fixed 는 헤더 높이에 갇힌다(필터가 컨테이닝 블록이 된다).
          그래서 body 로 포털해서 띄운다. */}
      {isMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="lg:hidden fixed inset-0 z-50 bg-on-background/60 backdrop-blur-sm flex flex-col justify-start p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsMenuOpen(false);
          }}
        >
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="사이트 메뉴"
            tabIndex={-1}
            className="w-full max-h-[85vh] overflow-y-auto rounded-xl border border-outline-variant bg-surface-container-lowest p-4 shadow-2xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
              <span className="font-code-mono text-xs font-bold text-primary">NAVIGATION</span>
              <button
                type="button"
                className="inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low cursor-pointer"
                aria-label="메뉴 닫기"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col py-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  className="flex items-center min-h-11 px-2 text-sm font-semibold text-on-surface border-b border-outline-variant/40 last:border-b-0 hover:text-primary transition-colors"
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-outline-variant/60 space-y-2">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-1.5 min-h-11 px-4 text-xs font-semibold text-on-surface-variant hover:text-primary border border-outline-variant rounded-lg bg-surface-container-lowest transition-colors cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenModal('dossier');
                }}
              >
                <Radio className="w-4 h-4 text-primary" />
                Request Sensor Whitepaper
              </button>
              <button
                type="button"
                className="w-full inline-flex items-center justify-center gap-2 min-h-11 px-4 bg-primary text-on-primary font-semibold text-xs rounded-lg hover:bg-primary-container transition-colors cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  onScrollToTasking();
                }}
              >
                <Satellite className="w-4 h-4" />
                Task a Satellite
              </button>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-on-surface-variant [word-break:keep-all]">
              가상 브랜드 샘플입니다 — 화면의 수치·이력은 모두 예시입니다.
            </p>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
