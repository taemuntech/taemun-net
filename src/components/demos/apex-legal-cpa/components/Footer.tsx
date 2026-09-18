import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#eff4ff] border-t border-[#0d1c2f]/15 mt-16">
      <div className="w-full px-4 lg:px-8 lg:px-12 xl:px-16 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Col 1 */}
          <div className="space-y-3">
            <span className="font-headline-md text-xl tracking-tight uppercase text-[#0d1c2f] font-bold block">
              APEX JURIDICAL
            </span>
            <p className="font-body-sm text-xs lg:text-sm text-[#45464d] leading-relaxed">
              Elite Academy for the Legal Scholastic Society (예시) Bar Examinations, Judicial Research &
              Training Institute Entrance, Legal Education Eligibility Test (LEET), and Certified
              Public Accountant (KICPA) Pre-Cadre Preparation.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <span className="font-label-md text-xs uppercase text-[#0d1c2f] tracking-widest font-bold block">
              Academic Collegium
            </span>
            <ul className="space-y-2 font-body-sm text-xs lg:text-sm text-[#45464d]">
              <li className="hover:text-[#0d1c2f] transition-colors cursor-pointer">
                Constitutional Judicial Tracts (예시) Bench Clerk Prep
              </li>
              <li className="hover:text-[#0d1c2f] transition-colors cursor-pointer">
                S-Univ & K-Univ (예시) LEET Chamber
              </li>
              <li className="hover:text-[#0d1c2f] transition-colors cursor-pointer">
                Fiscal Oversight Atelier (예시) KICPA Audit Atelier
              </li>
              <li className="hover:text-[#0d1c2f] transition-colors cursor-pointer">
                Bioethics, Administrative Law & Jurisprudence Tracts
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <span className="font-label-md text-xs uppercase text-[#0d1c2f] tracking-widest font-bold block">
              Seocho Judicial Campus
            </span>
            <p className="font-body-sm text-xs lg:text-sm text-[#45464d] leading-relaxed">
              Campus Address: 서초 법조타운 테헤란로 12 (12 Teheran-ro, Seocho Judicial District,
              Seoul)
              <br />
              Registrar Tel: 02-0000-0000
              <br />
              Admissions Registry: audit@example.com
            </p>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <span className="font-label-md text-xs uppercase text-[#0d1c2f] tracking-widest font-bold block">
              Accreditation & Disclosures
            </span>
            <p className="font-body-sm text-xs lg:text-sm text-[#45464d] leading-relaxed">
              Registered under Seoul Metropolitan Office of Education Academic Institute Act.
              Licensed for National Bar, LEET & CPA Exam Candidate Instruction. All matriculation
              quotas audited by the Supreme Academic Council.
            </p>
          </div>
        </div>

        {/* Bottom copyright & legal terms */}
        <div className="mt-12 pt-6 border-t border-[#0d1c2f]/10 flex flex-col lg:flex-row justify-between items-center gap-4">
          <span className="font-label-sm text-[11px] lg:text-xs text-[#45464d] tracking-wider uppercase text-center lg:text-left">
            © 2025 APEX LEGAL & CPA ACADEMY. ALL JURIDICAL PREROGATIVES RESERVED.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            <span className="font-label-sm text-[11px] lg:text-xs text-[#45464d] uppercase tracking-wider hover:text-[#0d1c2f] transition-colors cursor-pointer">
              Ethical Code of Conduct
            </span>
            <span className="font-label-sm text-[11px] lg:text-xs text-[#45464d] uppercase tracking-wider hover:text-[#0d1c2f] transition-colors cursor-pointer">
              Statutory Disclosures
            </span>
            <span className="font-label-sm text-[11px] lg:text-xs text-[#45464d] uppercase tracking-wider hover:text-[#0d1c2f] transition-colors cursor-pointer">
              Dossier Privacy Protocol
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
