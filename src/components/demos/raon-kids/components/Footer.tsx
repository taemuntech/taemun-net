'use client';

import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-[#f5ecda] border-t border-[#ebdcd0] text-[#6e5840]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ebdcd0]/70">
          <div>
            <span className="font-serif text-xl font-bold text-[#3b2e1e] block">
              RAON ATELIER KIDS
            </span>
            <span className="text-xs text-[#8c7456] font-mono">
              Eco-Friendly Kids Architecture Studio
            </span>
          </div>

          <p className="text-xs text-[#8c7456] text-center lg:text-right [word-break:keep-all]"><SampleFooterNote /></p>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#8c7456]">
          <p>© 2026 RAON ATELIER KIDS. All architectural rights reserved.</p>
          <p>Designed by TAEMUN DEV STUDIO</p>
        </div>
      </div>
    </footer>
  );
};
