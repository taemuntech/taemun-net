import React from 'react';
import { BRAND_LOGO_URL } from '../data/mockData';

interface FooterProps {
  onOpenDeliveryCheck: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeliveryCheck }) => {
  return (
    <footer className="w-full mt-12 bg-[#f1f3ff] border-t border-[#bccac0]/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Brand & Mission Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              src={BRAND_LOGO_URL}
              alt="LUMINOUS LAB"
              className="w-7 h-7 object-contain"
            referrerPolicy="no-referrer" />
            <span className="text-base font-bold text-[#141b2b]">LUMINOUS LAB</span>
          </div>
          <p className="text-xs text-[#3d4a42] leading-relaxed">
            루미너스 랩은 클린 더마톨로지와 감각적인 텍스처 미학을 융합하여 피부 본연의 건강한 이슬빛 광채를 회복시키는 프리미엄 스킨케어 큐레이션 플랫폼입니다.
          </p>
          <span className="inline-block text-[11px] font-bold text-[#006948] border border-[#006948]/30 px-2 py-0.5 rounded bg-white">
            피부과 전문의 자문 포뮬러 (예시 설정)
          </span>
        </div>

        {/* Quick Category Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#141b2b]">스킨케어 솔루션</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#ranking-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors">
                실시간 베스트 랭킹
              </a>
            </li>
            <li>
              <a href="#filter-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors">
                수부지 진정 앰플 케어
              </a>
            </li>
            <li>
              <a href="#filter-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors">
                100시간 보습 장벽 크림
              </a>
            </li>
            <li>
              <a href="#formula-inspector" className="text-[#3d4a42] hover:text-[#006948] transition-colors">
                클린 그린 등급 선케어
              </a>
            </li>
            <li>
              <a href="#bundle-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors">
                단독 리필 기획세트
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Support & Delivery */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#141b2b]">고객지원 &amp; 당일배송</h4>
          <div className="space-y-1">
            <p className="text-lg font-black text-[#006948]">1588-0000</p>
            <p className="text-xs text-[#3d4a42]">평일 09:00 ~ 18:00 (점심시간 12:00 ~ 13:00)</p>
            <p className="text-[11px] text-[#6d7a72]">주말 및 공휴일 1:1 온라인 문의 가능</p>
          </div>
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
            <button
              onClick={onOpenDeliveryCheck}
              className="px-2.5 py-1 bg-white rounded border border-gray-200 hover:border-[#006948] hover:text-[#006948] transition-colors cursor-pointer"
            >
              당일배송 조회
            </button>
            <button
              onClick={() => alert('공병수거 캠페인: 사용 완료된 루미너스 랩 공병 3개를 반납하시면 5,000P 적립금을 즉시 지급합니다.')}
              className="px-2.5 py-1 bg-white rounded border border-gray-200 hover:border-[#006948] hover:text-[#006948] transition-colors cursor-pointer"
            >
              공병수거 신청
            </button>
          </div>
        </div>

        {/* Legal & Policy Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#141b2b]">약관 및 정책</h4>
          <ul className="space-y-1.5 text-xs">
            <li>
              <button
                onClick={() => alert('LUMINOUS LAB: 과학적 더마톨로지와 클린 뷰티의 조화')}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer"
              >
                회사소개
              </button>
            </li>
            <li>
              <button
                onClick={() => alert('이용약관 안내 전문')}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer"
              >
                이용약관
              </button>
            </li>
            <li>
              <button
                onClick={() => alert('개인정보처리방침 안내 전문')}
                className="text-[#006948] font-bold hover:underline transition-colors cursor-pointer"
              >
                개인정보처리방침
              </button>
            </li>
            <li>
              <button
                onClick={() => alert('원료 & 자체 클린 그린 등급 기준 (예시)')}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer"
              >
                원료 &amp; 클린 등급 기준
              </button>
            </li>
            <li>
              <button
                onClick={() => alert('친환경 리필 & 업사이클링 캠페인')}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer"
              >
                친환경 리필 캠페인
              </button>
            </li>
            <li>
              <a href="tel:1588-0000" className="text-[#3d4a42] hover:text-[#006948] transition-colors">
                고객센터: 1588-0000
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Compliance Bottom Bar */}
      <div className="border-t border-[#bccac0]/20 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-10 space-y-1.5 text-[11px] text-[#6d7a72] leading-relaxed">
          <p>(주)루미너스랩(가상 브랜드) | 대표이사: 홍길동(예시) | 서울특별시 ○○구 ○○로 000, 00층 (예시 주소)</p>
          <p>사업자등록번호: 000-00-00000 (예시) | 통신판매업신고번호: 0000-서울OO-0000 (예시) | 개인정보관리책임자: 홍길동(예시)</p>
          <p>이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며, 주문·결제·상담은 접수되지 않습니다.</p>
          <p className="pt-2 text-[#3d4a42]">
            © 2026 LUMINOUS LAB (가상 브랜드 샘플). 화면의 상호·주소·번호·수치는 모두 예시입니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
