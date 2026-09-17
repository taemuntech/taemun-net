"use client";

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { GenuineTipVerifier } from './components/GenuineTipVerifier';
import { SkinSpectrumShowcase } from './components/SkinSpectrumShowcase';
import { TreatmentMenu } from './components/TreatmentMenu';
import { PrivateSuiteTour } from './components/PrivateSuiteTour';
import { DoctorsSection } from './components/DoctorsSection';
import { VipBookingSection } from './components/VipBookingSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { SuiteModal } from './components/SuiteModal';
import { BookingFormState, Treatment, VerificationResult } from './types';

interface TheNobleDermatologyAppProps {
  isEmbed?: boolean;
}

/** 예약 폼 기본 날짜 — 브라우저 표준시가 아니라 KST 로 이틀 뒤를 잡는다(해외에서 열어도 같은 날짜) */
function defaultVisitDate(): string {
  const twoDaysLater = new Date(Date.now() + 86400000 * 2);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(twoDaysLater);
}

export default function TheNobleDermatologyApp({ isEmbed }: TheNobleDermatologyAppProps = {}) {
  void isEmbed;
  const [selectedCertificate, setSelectedCertificate] = useState<VerificationResult | null>(null);
  const [isSuiteModalOpen, setIsSuiteModalOpen] = useState(false);
  const [sampleNoticeOpen, setSampleNoticeOpen] = useState(false);
  const [sampleActionName, setSampleActionName] = useState('VIP 예약 및 상담');

  const [formData, setFormData] = useState<BookingFormState>({
    concerns: ['탄력 / 페이스 리프팅 (초음파·고주파)'],
    doctor: '김도현 대표원장',
    date: defaultVisitDate(),
    timeSlot: '오전 10:30 (여유로운 프라이빗 타임)',
    painSensitivity: '보통 (일반 마취크림)',
    downtimePreference: '즉각적인 일상 복귀 필요',
    valetRequired: '발렛 파킹 신청',
    customerName: '',
    customerPhone: '',
  });

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const scrollToBooking = () => scrollToId('vip-reservation');
  const scrollToSkinSpectrum = () => scrollToId('skin-spectrum');

  // 시술 카드의 「상세 상담 신청」 — 고른 시술이 예약 폼 1단계에서 실제로 선택된 상태가 된다
  const handleSelectTreatment = (treatment: Treatment) => {
    setFormData((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(treatment.concern)
        ? prev.concerns
        : [treatment.concern, ...prev.concerns],
    }));
    scrollToBooking();
  };

  // 의료진 카드의 「1:1 상담 예약」 — 누른 의료진이 예약 폼 2단계에 선택돼 내려간다
  const handleSelectDoctor = (doctorName: string) => {
    setFormData((prev) => ({ ...prev, doctor: doctorName }));
    scrollToBooking();
  };

  // 폼 제출은 어디에도 보내지 않는다 — 가짜 「예약 완료」 화면을 만들지 않고 샘플 안내만 연다
  const handleBookingSubmit = () => {
    setSampleActionName('1:1 VIP 프라이빗 진료 예약');
    setSampleNoticeOpen(true);
  };

  const openSampleNotice = (featureName: string) => {
    setSampleActionName(featureName);
    setSampleNoticeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] flex flex-col selection:bg-[#fedb9e] selection:text-[#00110b]">
      {/* Fixed Sticky Header Navigation */}
      <Header onOpenBooking={scrollToBooking} />

      {/* Main Content Sections */}
      {/* 헤더 높이 = 유틸리티 띠(폰 44 · 웹 40) + 내비 80 */}
      <main className="flex-1 pt-[124px] lg:pt-[120px]">
        {/* 1. Hero Showcase Section */}
        <HeroSection
          onOpenBooking={scrollToBooking}
          onExploreSkinSpectrum={scrollToSkinSpectrum}
          onExploreSuite={() => setIsSuiteModalOpen(true)}
        />

        {/* 2. Sterile Tip Check Widget */}
        <GenuineTipVerifier onPrintCertificate={(cert) => setSelectedCertificate(cert)} />

        {/* 3. 4-Light Skin Spectrum Diagnostic Showcase */}
        <SkinSpectrumShowcase />

        {/* 4. Signature Lifting & Anti-Aging Protocol Menu */}
        <TreatmentMenu onSelectTreatment={handleSelectTreatment} />

        {/* 5. 1-Person Private Suites & Powder Room */}
        <PrivateSuiteTour onOpenBooking={scrollToBooking} />

        {/* 6. Medical Staff Profiles */}
        <DoctorsSection onSelectDoctor={handleSelectDoctor} />

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
      <Footer onOpenPolicy={openSampleNotice} />

      {/* Modals */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <SuiteModal
        isOpen={isSuiteModalOpen}
        onClose={() => setIsSuiteModalOpen(false)}
        onOpenBooking={scrollToBooking}
      />

      {/* 태문 샘플 고지 모달 — 폼 제출·정책 링크가 모두 이것으로 모인다 */}
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
