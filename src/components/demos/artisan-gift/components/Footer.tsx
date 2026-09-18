import React, { useRef, useState } from 'react';
import { ShieldCheck, Leaf, Award, X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConcierge }) => {
  // 예전에는 이 자리가 alert() 였다 — 저장소 규칙(네이티브 다이얼로그 금지)이라 데모 안 모달로 바꿨다.
  // Esc·배경 클릭 닫힘·배경 스크롤 잠금은 공용 훅(use-sample-dialog)이 맡는다.
  const [termsOpen, setTermsOpen] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  useSampleDialog({ open: termsOpen, onClose: () => setTermsOpen(false), dialogRef: termsRef });

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

          {/* 세 가지 표기 모두 사실 관계를 손봤다:
              ① 「안심 예치 결제」 는 결제대금예치(에스크로)를 다른 말로 적은 것이라 제도 이름을 아예 뺐다
              ② FSC 는 실존 인증기관이라 지어낸 브랜드가 인증받았다고 쓸 수 없다
              ③ 「정품 보증서」 는 발급 주체가 없는 보증이라 동봉물 표기로 낮췄다 */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs text-[#83746c]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#815439]" />
              결제 화면 연동 (예시)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Leaf className="w-4 h-4 text-[#815439]" />
              친환경 한지 포장 (예시 표기)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Award className="w-4 h-4 text-[#815439]" />
              장인 제작 이력 카드 동봉 (예시)
            </span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-xs">
          <a
            href="#leathercraft"
            className="min-h-11 lg:min-h-0 flex items-center text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Artisan Workshop Registry
          </a>
          <a
            href="#lookbook"
            className="min-h-11 lg:min-h-0 flex items-center text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Bojagi Wrapping Guide
          </a>
          <a
            href="#leathercraft"
            className="min-h-11 lg:min-h-0 flex items-center text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Heritage Master Archive
          </a>
          <a
            href="#collection"
            className="min-h-11 lg:min-h-0 flex items-center text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Provenance &amp; Care Guide
          </a>
          <button
            type="button"
            onClick={onOpenConcierge}
            className="min-h-11 lg:min-h-0 flex items-center text-left text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Bespoke Concierge &amp; Consultation
          </button>
          <button
            type="button"
            onClick={() => setTermsOpen(true)}
            className="min-h-11 lg:min-h-0 flex items-center text-left text-[#51443d] hover:text-[#3e1c06] hover:underline transition-colors"
          >
            Terms of Heritage Trust
          </button>
        </div>

        {/* Bottom Copyright & CS */}
        <div className="pt-4 flex flex-col lg:flex-row items-center justify-between text-xs text-[#51443d] gap-2 border-t border-[#d6c3ba]/30">
          <p className="text-center lg:text-left"><SampleFooterNote /></p>
          <p className="text-[#83746c] text-center lg:text-right">
            고객센터: 02-0000-0000 (예시) (평일 10:00 - 18:00, 점심 12:30 - 13:30)
          </p>
          <p className="text-[11px] text-[#83746c]/70 mt-1 text-center lg:text-right">
            상호명: (주)아티장앤기프트 (예시) | 대표: 홍길동 (예시) | 사업자등록번호: 000-00-00000 | 통신판매업신고:
            표기 자리 (예시) | 주소: 서울특별시 종로구 북촌로 45 (가상 주소) | 개인정보관리책임자: 표기 자리 (예시)
            (privacy@example.com)
          </p>
        </div>
      </div>

      {/* Heritage Trust 안내 모달 — 브라우저 기본 경고창 대신 이 데모의 모달로 */}
      {termsOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setTermsOpen(false);
          }}
        >
          <div
            ref={termsRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="heritage-trust-title"
            tabIndex={-1}
            className="bg-[#fcf9f4] border border-[#d6c3ba] rounded-lg max-w-lg w-full p-6 relative shadow-xl space-y-4 outline-none max-h-[85vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setTermsOpen(false)}
              aria-label="닫기"
              className="absolute top-3 right-3 w-11 h-11 lg:w-9 lg:h-9 flex items-center justify-center text-[#51443d] hover:text-[#3e1c06] rounded"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#C84B31]">HERITAGE TRUST</span>
            <h3 id="heritage-trust-title" className="text-xl font-serif text-[#3e1c06] pr-10">
              아르티장 헤리티지 트러스트 규정 (예시 안내)
            </h3>

            <ul className="text-sm text-[#51443d] leading-relaxed space-y-2.5 list-disc pl-5">
              <li>모든 작품은 등록된 공방의 장인이 주문 후 수작업으로 제작하는 것을 원칙으로 합니다.</li>
              <li>소재·공정·제작 기간은 작품 상세에 적힌 대로 표기하며, 표기와 다르면 교환·반품 대상으로 봅니다.</li>
              <li>각인·보자기 포장 등 맞춤 제작 옵션은 제작 착수 전까지 변경하실 수 있습니다.</li>
              <li>제작 이력 카드에는 공방명과 제작 일자를 적어 동봉합니다(감정·정품 인증 서류가 아닙니다).</li>
            </ul>

          </div>
        </div>
      )}
    </footer>
  );
};
