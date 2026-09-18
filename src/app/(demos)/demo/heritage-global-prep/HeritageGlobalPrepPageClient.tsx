'use client';

import dynamic from 'next/dynamic';

const HeritageGlobalPrepApp = dynamic(
  () => import('@/components/demos/heritage-global-prep/HeritageGlobalPrepApp'),
  { ssr: false }
);

export default function HeritageGlobalPrepPageClient() {
  return <HeritageGlobalPrepApp />;
}
