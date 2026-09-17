'use client';

import dynamic from 'next/dynamic';

const AetherMedicalApp = dynamic(
  () => import('@/components/demos/aether-medical/AetherMedicalApp'),
  { ssr: false }
);

export default function AetherMedicalPageClient() {
  return <AetherMedicalApp />;
}
