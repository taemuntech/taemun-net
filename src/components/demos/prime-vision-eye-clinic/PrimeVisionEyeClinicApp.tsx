"use client";

import React, { useState, useEffect } from 'react';
import { Language, BookingState } from './types';
import { SERVICES, DOCTORS } from './constants';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProcedureComparison } from './components/ProcedureComparison';
import { SuitabilityCalculator } from './components/SuitabilityCalculator';
import { LensSimulator } from './components/LensSimulator';
import { DiagnosticSuite } from './components/DiagnosticSuite';
import { MedicalFaculty } from './components/MedicalFaculty';
import { FastTrackBooking } from './components/FastTrackBooking';
import { LocationAndGuide } from './components/LocationAndGuide';
import { QuickActionBar } from './components/QuickActionBar';
import { Footer } from './components/Footer';

interface PrimeVisionEyeClinicAppProps {
  isEmbed?: boolean;
}

export default function PrimeVisionEyeClinicApp({ isEmbed }: PrimeVisionEyeClinicAppProps = {}) {
  const [language, setLanguage] = useState<Language>('KR');
  const [activeSection, setActiveSection] = useState<string>('clinic-story');

  // toISOString() 은 UTC 기준이라 한국 시간 새벽에는 「내일」이 오늘로 찍힌다 — 로컬 날짜로 만든다.
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const [bookingState, setBookingState] = useState<BookingState>({
    service: SERVICES.klex,
    doctor: DOCTORS.any,
    sameday: '검사 당일 즉시 수술까지 희망 (원데이 패스트트랙)',
    date: getTomorrowDate(),
    time: '09:30 (오전 첫 타임)',
    patientName: '',
    patientPhone: '',
    lensCautionAccepted: false,
  });

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectRecommendedService = (serviceName: string) => {
    setBookingState((prev) => ({
      ...prev,
      service: serviceName,
    }));
    handleNavigate('fast-track-section');
  };

  const handleSelectDoctor = (doctorName: string) => {
    setBookingState((prev) => ({
      ...prev,
      doctor: doctorName,
    }));
    handleNavigate('fast-track-section');
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'clinic-story',
        'specialists',
        'procedure-comparison',
        'lens-simulator',
        'diagnostic-suite',
        'suitability-calculator',
        'fast-track-section',
        'location-guide',
      ];

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      {/* Fixed Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 pt-[116px]">
        {/* Hero Section */}
        <Hero language={language} onNavigate={handleNavigate} />

        {/* 4th Gen Lenticule Extraction vs LASIK vs LASEK Comparison */}
        <ProcedureComparison language={language} />

        {/* 1-Minute Vision Correction Suitability Calculator */}
        <SuitabilityCalculator
          language={language}
          onSelectRecommendedService={handleSelectRecommendedService}
        />

        {/* Presbyopia & Cataract IOL Visual Simulator */}
        <LensSimulator
          language={language}
          onNavigateBooking={() => {
            setBookingState((prev) => ({
              ...prev,
              service: SERVICES.cataract,
            }));
            handleNavigate('fast-track-section');
          }}
        />

        {/* 50-Step Advanced Diagnostics Suite */}
        <DiagnosticSuite language={language} />

        {/* Cornea & Retina Specialist Faculty */}
        <MedicalFaculty language={language} onSelectDoctor={handleSelectDoctor} />

        {/* 1-Day Fast-Track Booking */}
        <FastTrackBooking
          language={language}
          bookingState={bookingState}
          setBookingState={setBookingState}
        />

        {/* Location & Consultation Hours */}
        <LocationAndGuide language={language} />
      </main>

      {/* Floating Quick Action Bar */}
      <QuickActionBar onScrollTo={handleNavigate} />

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
