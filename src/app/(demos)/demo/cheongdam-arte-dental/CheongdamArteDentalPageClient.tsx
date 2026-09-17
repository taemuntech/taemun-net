"use client";

import CheongdamArteDentalApp from "@/components/demos/cheongdam-arte-dental/CheongdamArteDentalApp";

interface CheongdamArteDentalPageClientProps {
  isEmbed?: boolean;
}

export default function CheongdamArteDentalPageClient({
  isEmbed = false,
}: CheongdamArteDentalPageClientProps) {
  return <CheongdamArteDentalApp isEmbed={isEmbed} />;
}
