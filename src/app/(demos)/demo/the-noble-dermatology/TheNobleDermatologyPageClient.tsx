"use client";

import TheNobleDermatologyApp from "@/components/demos/the-noble-dermatology/TheNobleDermatologyApp";

interface TheNobleDermatologyPageClientProps {
  isEmbed?: boolean;
}

export default function TheNobleDermatologyPageClient({
  isEmbed = false,
}: TheNobleDermatologyPageClientProps) {
  return <TheNobleDermatologyApp isEmbed={isEmbed} />;
}
