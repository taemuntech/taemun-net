'use client';

import dynamic from 'next/dynamic';

const ResonanceSoundApp = dynamic(
  () => import('@/components/demos/resonance-sound/ResonanceSoundApp'),
  { ssr: false }
);

export default function ResonanceSoundPageClient() {
  return <ResonanceSoundApp />;
}
