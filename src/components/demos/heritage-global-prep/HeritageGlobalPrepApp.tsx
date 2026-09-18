'use client';
import React, { useState } from 'react';
import { ScreenTab, CandidateDossier, IvyInstitution } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DispatchScreen } from './components/DispatchScreen';
import { CalculatorScreen } from './components/CalculatorScreen';
import { EssayDissectionScreen } from './components/EssayDissectionScreen';
import { IvyRosterScreen } from './components/IvyRosterScreen';
import { RegistryScreen } from './components/RegistryScreen';


const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,700;1,6..72,400;1,6..72,700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;600;700&display=swap');
  
  .font-serif { font-family: 'Newsreader', Georgia, serif; }
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  
  .dropcap::first-letter {
    float: left;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 3.5rem;
    line-height: 2.8rem;
    font-weight: 700;
    color: #aa304f;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
  }
`;

export default function HeritageGlobalPrepApp() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('dispatch');
  const [activeEssayCaseId, setActiveEssayCaseId] = useState<string>('case-2024-h08');
  const [calculatedRwScore, setCalculatedRwScore] = useState<number>(790);
  const [calculatedMathScore, setCalculatedMathScore] = useState<number>(800);
  const [dossierCount, setDossierCount] = useState<number>(3);

  const handleTabChange = (tab: ScreenTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestAudit = () => {
    setCurrentTab('registry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyScoreToRegistry = (rw: number, math: number) => {
    setCalculatedRwScore(rw);
    setCalculatedMathScore(math);
  };

  const handleOpenCandidateCase = (caseId: string) => {
    setActiveEssayCaseId(caseId);
    setCurrentTab('essay');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDossierCreated = (_dossier: CandidateDossier) => {
    setDossierCount((prev) => prev + 1);
  };

    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] flex flex-col selection:bg-[#aa304f] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      {/* Broadsheet Top Navigation & Gazette Masthead */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onRequestAudit={handleRequestAudit}
        dossierCount={dossierCount}
      />

      {/* Main Content Area (padded top for fixed broadsheet header) */}
      <main className="flex-1 w-full pt-[176px] lg:pt-[180px] bg-[#fbf9f5]">
        {currentTab === 'dispatch' && (
          <DispatchScreen
            onSelectTab={handleTabChange}
            onOpenCandidateCase={handleOpenCandidateCase}
          />
        )}

        {currentTab === 'calculator' && (
          <CalculatorScreen
            initialRw={calculatedRwScore}
            initialMath={calculatedMathScore}
            onApplyScoreToRegistry={handleApplyScoreToRegistry}
            onSelectTab={handleTabChange}
          />
        )}

        {currentTab === 'essay' && (
          <EssayDissectionScreen
            selectedCaseId={activeEssayCaseId}
            onSelectTab={handleTabChange}
          />
        )}

        {currentTab === 'roster' && (
          <IvyRosterScreen onSelectTab={handleTabChange} />
        )}

        {currentTab === 'registry' && (
          <RegistryScreen
            initialSatScore={calculatedRwScore + calculatedMathScore}
            onDossierCreated={handleDossierCreated}
          />
        )}
      </main>

      {/* Broadsheet Archival Footer */}
      <Footer onSelectTab={handleTabChange} />
    </div>
  );
}
