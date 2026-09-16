"use client";

import React, { useState } from "react";
import { Language, ProductSpec } from "./types";
import HysfaHeader from "./HysfaHeader";
import HysfaHero from "./HysfaHero";
import HysfaScadaSimulator from "./HysfaScadaSimulator";
import HysfaProducts from "./HysfaProducts";
import HysfaCertifications from "./HysfaCertifications";
import HysfaFacility from "./HysfaFacility";
import HysfaContact from "./HysfaContact";
import HysfaFooter from "./HysfaFooter";

interface Props {
  isEmbed?: boolean;
}

export default function HysfaApp({ isEmbed = false }: Props) {
  const [lang, setLang] = useState<Language>("ko");
  const [selectedProduct, setSelectedProduct] = useState<ProductSpec | null>(null);

  const handleOpenRfq = (product?: ProductSpec) => {
    if (product) setSelectedProduct(product);
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <HysfaHeader lang={lang} setLang={setLang} onOpenRfq={() => handleOpenRfq()} />
      <main>
        <HysfaHero lang={lang} onOpenRfq={() => handleOpenRfq()} />
        <HysfaScadaSimulator lang={lang} onOpenRfq={() => handleOpenRfq()} />
        <HysfaProducts lang={lang} onSelectProduct={(p) => handleOpenRfq(p)} />
        <HysfaCertifications lang={lang} />
        <HysfaFacility lang={lang} />
        <HysfaContact lang={lang} selectedProduct={selectedProduct} />
      </main>
      <HysfaFooter lang={lang} />
    </div>
  );
}
