"use client";

import BonchoHospitalApp from "@/components/demos/boncho-hospital/BonchoHospitalApp";

interface BonchoHospitalPageClientProps {
  isEmbed?: boolean;
}

export default function BonchoHospitalPageClient({
  isEmbed = false,
}: BonchoHospitalPageClientProps) {
  return <BonchoHospitalApp isEmbed={isEmbed} />;
}
