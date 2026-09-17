import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#eff4ff] border-t border-[#bfc9c1]/60 mt-auto">
      <div className="w-full px-4 lg:px-8 py-10 lg:py-14 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Row: Certification Seals & Vet Hotline */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-8 border-b border-[#bfc9c1]/60">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f5238] text-3xl shrink-0">
              verified
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">AAFCO / FEDIAF 기준 준수</h4>
              <p className="text-[11px] text-[#404943]">글로벌 반려동물 영양 가이드라인 충족</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f5238] text-3xl shrink-0">
              local_police
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">제조업 정식 인허가 완료</h4>
              <p className="text-[11px] text-[#404943]">동물용의약외품 및 배합사료 등록증 보유</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f5238] text-3xl shrink-0">
              lock
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">토스페이먼츠 안심 결제</h4>
              <p className="text-[11px] text-[#404943]">안심 예치 결제 연동 (예시)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#dee9fc] p-3 rounded-xl border border-[#bfc9c1]/40">
            <span className="material-symbols-outlined text-[#835418] text-3xl shrink-0">
              support_agent
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">수의영양 고객센터 02-0000-0000 (예시)</h4>
              <p className="text-[11px] text-[#404943]">평일 09:30 ~ 18:30 (점심 12:30~13:30)</p>
            </div>
          </div>
        </div>

        {/* Middle Row: Brand Identity & Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <span className="text-lg font-bold text-[#0f5238] tracking-tight">PAWS &amp; TAIL VET</span>
            <span className="ml-2 text-xs text-[#404943]">임상영양 수의학 연구소</span>
          </div>

          <div className="flex flex-wrap gap-3 lg:gap-4 text-xs text-[#404943]">
            <a href="#" className="hover:text-[#0f5238] transition-colors hover:underline">
              수의사 면허정보 및 처방 가이드라인
            </a>
            <span className="text-[#bfc9c1]">|</span>
            <a href="#" className="hover:text-[#0f5238] transition-colors hover:underline">
              원산지 및 배치성분 검사표
            </a>
            <span className="text-[#bfc9c1]">|</span>
            <a href="#" className="hover:text-[#0f5238] transition-colors hover:underline">
              정기구독 안심 예치 결제 서비스
            </a>
            <span className="text-[#bfc9c1]">|</span>
            <a href="#" className="hover:text-[#0f5238] transition-colors hover:underline">
              이용약관
            </a>
            <span className="text-[#bfc9c1]">|</span>
            <a href="#" className="font-bold text-[#121c2a] hover:text-[#0f5238] transition-colors hover:underline">
              개인정보처리방침
            </a>
          </div>
        </div>

        {/* Bottom Row: Mandatory Legal & Copyright Text */}
        <div className="text-xs text-[#404943]/80 space-y-1.5 pt-2 border-t border-[#bfc9c1]/40 leading-relaxed">
          <p>
            상호명: (주)포우즈앤테일임상영양 | 대표이사: 김민준 | 수의사 면허 등록번호: 표기 자리 (예시) | 사업자등록번호: 000-00-00000 | 통신판매업신고: 표기 자리 (예시)
          </p>
          <p>
            사업장 소재지: 서울특별시 강남구 테헤란로 427 (가상 주소) | 동물용의약외품 제조업 허가 표기 자리 (예시) | 개인정보관리책임자: 정재훈 (privacy@example.com)
          </p>
          <p className="pt-2 text-[#707973]">
            © 2025 PAWS &amp; TAIL VET Clinical Nutrition Inc. AAFCO / FEDIAF Certified Formulation Standards. 동물용의약외품 및 사료제조업 등록 완료. 안심 예치 결제 연동 (예시).
          </p>
        </div>
      </div>
    </footer>
  );
};
