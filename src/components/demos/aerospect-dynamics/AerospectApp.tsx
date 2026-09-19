'use client';

import React, { useState } from 'react';
import { ScreenType, DefectItem } from './types';
import { TelemetryRibbon } from './components/TelemetryRibbon';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FleetSection } from './components/FleetSection';
import { SplitComparisonViewer } from './components/SplitComparisonViewer';
import { SolutionsSection } from './components/SolutionsSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { SecuritySection } from './components/SecuritySection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { DockSystemView } from './components/DockSystemView';
import { PocModal } from './components/PocModal';
import { ReportModal } from './components/ReportModal';
import { WhitepaperModal } from './components/WhitepaperModal';

interface AerospectAppProps {
  isEmbed?: boolean;
}

export const AerospectApp: React.FC<AerospectAppProps> = ({ isEmbed }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('overview');
  const [isPocModalOpen, setIsPocModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState<boolean>(false);
  const [selectedReportDefect, setSelectedReportDefect] = useState<DefectItem | undefined>(undefined);
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    // Smooth scroll to top when changing screens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReport = (defect?: DefectItem) => {
    setSelectedReportDefect(defect);
    setIsReportModalOpen(true);
  };

  return (
    <div className={`min-h-screen bg-surface text-on-surface flex flex-col selection:bg-secondary-fixed selection:text-on-secondary-fixed ${isEmbed ? 'w-full overflow-x-hidden' : ''}`}>
      {/* Fixed Header with Top Navigation */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenPocModal={() => setIsPocModalOpen(true)}
        onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-20">
        {/* Real-time Dynamic Telemetry Ribbon */}
        <TelemetryRibbon />

        {/* Screen View Switching */}
        {currentScreen === 'overview' && (
          <>
            <HeroSection
              onOpenPocModal={() => setIsPocModalOpen(true)}
              onExploreDualVision={() => {
                const el = document.getElementById('split-viewer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <FleetSection onOpenPocModal={() => setIsPocModalOpen(true)} />
            <SplitComparisonViewer />
            <SolutionsSection onOpenReportModal={handleOpenReport} />
            <DockSystemView onOpenPocModal={() => setIsPocModalOpen(true)} />
            <CaseStudiesSection />
            <SecuritySection />
            <CtaSection />
          </>
        )}

        {currentScreen === 'fleet' && (
          <div className="py-6 flex flex-col gap-6">
            <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex items-center justify-between">
              <button
                onClick={() => handleNavigate('overview')}
                className="text-xs font-telemetry-code text-secondary flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>전체 개요로 돌아가기</span>
              </button>
              <span className="font-telemetry-code text-xs text-on-surface-variant">
                SCREEN: FLEET LINEUP &amp; PAYLOAD SPEC
              </span>
            </div>
            <FleetSection onOpenPocModal={() => setIsPocModalOpen(true)} />
            <SecuritySection />
            <CtaSection />
          </div>
        )}

        {currentScreen === 'solutions' && (
          <div className="py-6 flex flex-col gap-6">
            <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex items-center justify-between">
              <button
                onClick={() => handleNavigate('overview')}
                className="text-xs font-telemetry-code text-secondary flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>전체 개요로 돌아가기</span>
              </button>
              <span className="font-telemetry-code text-xs text-on-surface-variant">
                SCREEN: AERO-CLOUD INTELLIGENT PLATFORM
              </span>
            </div>
            <SolutionsSection onOpenReportModal={handleOpenReport} />
            <SplitComparisonViewer />
            <CtaSection />
          </div>
        )}

        {currentScreen === 'payloads' && (
          <div className="py-6 flex flex-col gap-6">
            <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex items-center justify-between">
              <button
                onClick={() => handleNavigate('overview')}
                className="text-xs font-telemetry-code text-secondary flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>전체 개요로 돌아가기</span>
              </button>
              <span className="font-telemetry-code text-xs text-on-surface-variant">
                SCREEN: 4K OPTICAL RGB &amp; RADIOMETRIC THERMAL
              </span>
            </div>
            <SplitComparisonViewer />
            <SolutionsSection onOpenReportModal={handleOpenReport} />
            <CtaSection />
          </div>
        )}

        {currentScreen === 'dock-system' && (
          <div className="py-6 flex flex-col gap-6">
            <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex items-center justify-between">
              <button
                onClick={() => handleNavigate('overview')}
                className="text-xs font-telemetry-code text-secondary flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>전체 개요로 돌아가기</span>
              </button>
              <span className="font-telemetry-code text-xs text-on-surface-variant">
                SCREEN: SENTINEL DOCK AUTONOMOUS HANGAR
              </span>
            </div>
            <DockSystemView onOpenPocModal={() => setIsPocModalOpen(true)} />
            <SecuritySection />
            <CtaSection />
          </div>
        )}

        {currentScreen === 'case-studies' && (
          <div className="py-6 flex flex-col gap-6">
            <div className="max-w-7xl mx-auto px-4 lg:px-12 w-full flex items-center justify-between">
              <button
                onClick={() => handleNavigate('overview')}
                className="text-xs font-telemetry-code text-secondary flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>전체 개요로 돌아가기</span>
              </button>
              <span className="font-telemetry-code text-xs text-on-surface-variant">
                SCREEN: INDUSTRY SECTOR VERIFIED CASES
              </span>
            </div>
            <CaseStudiesSection />
            <SecuritySection />
            <CtaSection />
          </div>
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
        onOpenPocModal={() => setIsPocModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <PocModal
        isOpen={isPocModalOpen}
        onClose={() => setIsPocModalOpen(false)}
      />

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        defect={selectedReportDefect}
      />

      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
        onOpenPocModal={() => {
          setIsWhitepaperOpen(false);
          setIsPocModalOpen(true);
        }}
      />
    </div>
  );
};

export default AerospectApp;
