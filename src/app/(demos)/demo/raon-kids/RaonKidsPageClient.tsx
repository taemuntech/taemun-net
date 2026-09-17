'use client';

import dynamic from 'next/dynamic';

const RaonKidsApp = dynamic(
  () => import('@/components/demos/raon-kids/RaonKidsApp'),
  { ssr: false }
);

export default function RaonKidsPageClient() {
  return <RaonKidsApp />;
}
