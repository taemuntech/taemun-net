"use client";

import React, { useState, useEffect } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Language, BookingState } from './types';
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
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [sampleActionName, setSampleActionName] = useState('원데이 라식/백내장 패스트트랙 예약');

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [bookingState, setBookingState] = useState<BookingState>({
    service: '7초 스마일프로 (비쥬맥스 800)',
    doctor: '상관없음 (가장 빠른 일정 우선)',
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

        {/* 4th Gen SMILE Pro vs LASIK vs LASEK Comparison */}
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
              service: '노안 & 프리미엄 백내장',
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
          onCompleteBooking={() => {
            setSampleActionName('1-Day 원데이 패스트트랙 수술 예약');
            setSampleNoticeOpen(true);
          }}
        />

        {/* Location & Consultation Hours */}
        <LocationAndGuide language={language} />
      </main>

      {/* Floating Quick Action Bar */}
      <QuickActionBar onScrollTo={handleNavigate} />

      {/* Comprehensive Footer */}
      <Footer language={language} />

      {/* 태문 안전 결제 및 샘플 고지 모달 */}
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="prime-vision-eye-clinic"
        featureName={sampleActionName}
        kind="sample"
        industry="corporate"
      />
    </div>
  );
}
