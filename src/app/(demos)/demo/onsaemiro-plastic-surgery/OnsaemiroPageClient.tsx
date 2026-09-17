'use client';

import { OnsaemiroApp } from '@/components/demos/onsaemiro-plastic-surgery/OnsaemiroApp';

interface OnsaemiroPageClientProps {
  isEmbed?: boolean;
}

export default function OnsaemiroPageClient({
  isEmbed = false,
}: OnsaemiroPageClientProps) {
  return <OnsaemiroApp isEmbed={isEmbed} />;
}
