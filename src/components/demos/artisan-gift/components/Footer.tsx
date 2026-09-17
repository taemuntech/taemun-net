import React from 'react';
import { ShieldCheck, Leaf, Award } from 'lucide-react';

interface FooterProps {
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConcierge }) => {
  return (
    <footer id="main-footer" className="bg-[#f6f3ee] border-t border-[#d6c3ba]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-16 flex flex-col space-y-8">
        {/* Top Row: Brand & Trust Badges */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#d6c3ba]/40">
          <div>
            <span className="text-xl font-serif font-bold text-[#3e1c06] tracking-widest">
              ARTISAN &amp; GIFT
            </span>
            <p className="text-xs text-[#51443d] mt-1.5">
              한국 전통 공예 장인 아틀리에 연합 &amp; 비스포크 헤리티지 기프팅 플랫폼
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs text-[#83746c]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#815439]" />
              안심 예치 결제 연동 (예시)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-[#815439]" />
              FSC 인증 친환경 한지 포장
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-[#815439]" />
              장인 정품 보증서 발급
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
          <a
            href="#leathercraft"
            className="text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Artisan Workshop Registry
          </a>
          <a
            href="#lookbook"
            className="text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Bojagi Wrapping Certification
          </a>
          <a
            href="#leathercraft"
            className="text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Heritage Master Archive
          </a>
          <a
            href="#collection"
            className="text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Escrow &amp; Provenance Assurance
          </a>
          <button
            type="button"
            onClick={onOpenConcierge}
            className="text-left text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Bespoke Concierge &amp; Consultation
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('아르티장 헤리티지 트러스트 규정 (예시 안내): 전통 수작업 공정 준수 및 정품 전승 공예품 품질 관리 규정을 준수합니다.');
            }}
            className="text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Terms of Heritage Trust
          </a>
        </div>

        {/* Bottom Copyright & CS */}
        <div className="pt-4 flex flex-col lg:flex-row items-center justify-between text-xs text-[#51443d] gap-2 border-t border-[#d6c3ba]/30">
          <p>
            © 2025 ARTISAN &amp; GIFT Atelier Inc. All rights reserved. Registered Korean Heritage Craftsmanship &amp; Bojagi Packaging Certification.
          </p>
          <p className="text-[#83746c]">고객센터: 02-0000-0000 (예시) (평일 10:00 - 18:00, 점심 12:30 - 13:30)</p>
          <p className="text-[11px] text-[#83746c]/70 mt-1">상호명: (주)아티장앤기프트 | 대표: 김민성 | 사업자등록번호: 000-00-00000 | 통신판매업신고: 표기 자리 (예시) | 주소: 서울특별시 종로구 북촌로 45 (가상 주소) | 개인정보관리책임자: 박서준 (privacy@example.com)</p>
        </div>
      </div>
    </footer>
  );
};
