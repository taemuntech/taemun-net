"use client";

import SeoulBarunOrthopedicsApp from "@/components/demos/seoul-barun-orthopedics/SeoulBarunOrthopedicsApp";

interface SeoulBarunOrthopedicsPageClientProps {
  isEmbed?: boolean;
}

export default function SeoulBarunOrthopedicsPageClient({
  isEmbed = false,
}: SeoulBarunOrthopedicsPageClientProps) {
  return <SeoulBarunOrthopedicsApp isEmbed={isEmbed} />;
}
