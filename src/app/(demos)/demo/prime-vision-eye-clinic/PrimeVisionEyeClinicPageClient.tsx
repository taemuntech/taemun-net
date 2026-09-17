"use client";

import PrimeVisionEyeClinicApp from "@/components/demos/prime-vision-eye-clinic/PrimeVisionEyeClinicApp";

interface PrimeVisionEyeClinicPageClientProps {
  isEmbed?: boolean;
}

export default function PrimeVisionEyeClinicPageClient({
  isEmbed = false,
}: PrimeVisionEyeClinicPageClientProps) {
  return <PrimeVisionEyeClinicApp isEmbed={isEmbed} />;
}
