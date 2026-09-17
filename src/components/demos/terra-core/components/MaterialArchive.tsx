import React from 'react';
import Image from 'next/image';
import { Hammer, ArrowUpRight } from 'lucide-react';
import { GEOTECH_MATERIALS } from '../data/terraData';
import { GeotechMaterial } from '../types';

interface MaterialArchiveProps {
  onSelectMaterial: (material: GeotechMaterial) => void;
}

export const MaterialArchive: React.FC<MaterialArchiveProps> = ({ onSelectMaterial }) => {
  return (
    <section id="materials" className="py-20 bg-[#0d1117] text-white border-b border-[#30363d] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#ff6b2b]/15 text-[#ff6b2b] text-xs font-mono tracking-widest uppercase mb-3">
            <Hammer className="w-3.5 h-3.5" />
            <span>GEOTECHNICAL MATERIAL ARCHIVE</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black font-mono tracking-tight text-white">
            대심도 지반 보강 &amp; 수밀 신소재
          </h2>
          <p className="text-xs lg:text-sm text-[#8b949e] font-sans mt-2">
            지하수압 10bar를 영구적으로 버텨내는 세그먼트 라이닝과 수팽창 개스킷,
            고장력 록볼트와 친환경 무수축 그라우트 등 특수 토목 핵심 자재 아카이브입니다.
          </p>
        </div>

        {/* Material 4-Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {GEOTECH_MATERIALS.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="group bg-[#161b22] border border-[#30363d] hover:border-[#ff6b2b] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#ff6b2b]/10 flex flex-col font-mono"
            >
              {/* Material Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0d1117]">
                <Image
                  src={mat.image}
                  alt={mat.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-[#8b949e] group-hover:text-white transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Material Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#ff6b2b] uppercase tracking-wider block font-bold mb-1">
                    {mat.category}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#ff6b2b] transition-colors line-clamp-2">
                    {mat.name}
                  </h3>
                  <p className="text-xs font-sans text-[#8b949e] mt-2 line-clamp-2">
                    {mat.feature}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#30363d] text-[11px] text-[#8b949e]">
                  <span className="block truncate font-mono text-[#c9d1d9]">{mat.strength}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
