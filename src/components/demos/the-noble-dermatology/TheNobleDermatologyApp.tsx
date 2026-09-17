"use client";

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GenuineTipVerifier } from './components/GenuineTipVerifier';
import { MarkVuShowcase } from './components/MarkVuShowcase';
import { TreatmentMenu } from './components/TreatmentMenu';
import { PrivateSuiteTour } from './components/PrivateSuiteTour';
import { DoctorsSection } from './components/DoctorsSection';
import { VipBookingSection } from './components/VipBookingSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { SuiteModal } from './components/SuiteModal';
import { BookingFormState, Treatment, VerificationResult } from './types';
import { Calendar, PhoneCall, ArrowUp } from 'lucide-react';
import { CLINIC_INFO } from './data/clinicData';

interface TheNobleDermatologyAppProps {
  isEmbed?: boolean;
}

export default function TheNobleDermatologyApp({ isEmbed }: TheNobleDermatologyAppProps = {}) {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');
  const [selectedCertificate, setSelectedCertificate] = useState<VerificationResult | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormState | null>(null);
  const [isSuiteModalOpen, setIsSuiteModalOpen] = useState(false);
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [sampleActionName, setSampleActionName] = useState('VIP 예약 및 상담');

  const [formData, setFormData] = useState<BookingFormState>({
    concerns: ['탄력 / 페이스 리프팅 (울쎄라·써마지)'],
    doctor: '김도현 대표원장',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '오전 10:30 (여유로운 프라이빗 타임)',
    painSensitivity: '보통 (일반 마취크림)',
    downtimePreference: '즉각적인 일상 복귀 필요',
    valetRequired: '무료 VIP 발렛 파킹 신청',
    customerName: '',
    customerPhone: '',
  });

  const scrollToBooking = () => {
    const el = document.getElementById('vip-reservation');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToMarkVu = () => {
    const el = document.getElementById('mark-vu-section');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSelectTreatment = (treatment: Treatment) => {
    setFormData((prev) => ({
      ...prev,
      concerns: Array.from(new Set([`${treatment.category} (${treatment.title.split(' ')[0]})`, ...prev.concerns])),
    }));
    scrollToBooking();
  };

  const handleBookingSubmit = (data: BookingFormState) => {
    setConfirmedBooking(data);
    setSampleActionName('1:1 VIP 프라이빗 진료 예약');
    setSampleNoticeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex flex-col selection:bg-[#fedb9e] selection:text-[#00110b]">
      {/* Fixed Sticky Header Navigation */}
      <Header onOpenBooking={scrollToBooking} lang={lang} setLang={setLang} />

      {/* Main Content Sections */}
      <main className="flex-1 pt-[120px]">
        {/* 1. Hero Showcase Section */}
        <HeroSection
          onOpenBooking={scrollToBooking}
          onExploreMarkVu={scrollToMarkVu}
          onExploreSuite={() => setIsSuiteModalOpen(true)}
        />

        {/* 2. Genuine Tip Real-Time Verification Widget */}
        <GenuineTipVerifier onPrintCertificate={(cert) => setSelectedCertificate(cert)} />

        {/* 3. Mark-Vu 4D Skin Spectrum Diagnostic */}
        <MarkVuShowcase />

        {/* 4. Signature Lifting & Anti-Aging Protocol Menu */}
        <TreatmentMenu onSelectTreatment={handleSelectTreatment} />

        {/* 5. 1-Person Private Suites & Powder Room */}
        <PrivateSuiteTour onOpenBooking={scrollToBooking} />

        {/* 6. Medical Staff Profiles */}
        <DoctorsSection onSelectDoctor={() => scrollToBooking()} />

        {/* 7. 1:1 VIP Reservation & Pre-Consultation Form */}
        <VipBookingSection
          formData={formData}
          setFormData={setFormData}
          onSubmitBooking={handleBookingSubmit}
        />

        {/* 8. Cheongdam Location & Valet Parking */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <BookingSuccessModal
        bookingData={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
      />

      <SuiteModal
        isOpen={isSuiteModalOpen}
        onClose={() => setIsSuiteModalOpen(false)}
        onOpenBooking={scrollToBooking}
      />

      {/* 태문 안전 결제 및 샘플 고지 모달 */}
      <SampleNotice
        open={sampleNoticeOpen}
        onClose={() => setSampleNoticeOpen(false)}
        slug="the-noble-dermatology"
        featureName={sampleActionName}
        kind="sample"
        industry="corporate"
      />
    </div>
  );
}
