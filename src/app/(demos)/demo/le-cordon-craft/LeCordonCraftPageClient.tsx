'use client';

import dynamic from 'next/dynamic';

const LeCordonCraftApp = dynamic(
  () => import('@/components/demos/le-cordon-craft/LeCordonCraftApp'),
  { ssr: false }
);

export default function LeCordonCraftPageClient() {
  return <LeCordonCraftApp />;
}
