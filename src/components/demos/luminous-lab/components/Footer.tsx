import React from 'react';
import { BRAND_LOGO_URL } from '../data/mockData';
import type { InfoDialogContent } from './InfoDialog';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onOpenDeliveryCheck: () => void;
  onShowInfo: (content: InfoDialogContent) => void;
}

const FOOTER_INFO: Record<string, InfoDialogContent> = {
  bottleReturn: {
    title: '공병 수거 캠페인 (예시 설정)',
    lines: [
      '다 쓴 공병 3개를 모아 보내면 5,000P 를 적립해 드린다는 예시 정책으로 구성한 화면입니다.',
      '실제 서비스라면 수거 신청서·회수 택배 접수·적립 내역 조회가 이 버튼에 연결됩니다.',
    ],
  },
  company: {
    title: '회사소개 (예시 브랜드)',
    lines: [
      '루미너스 랩은 태문넷이 화면 설명을 위해 지어낸 가상 브랜드입니다. 실재하는 회사가 아닙니다.',
      '실제 제작 시에는 연혁·연구소·생산 파트너·브랜드 철학 페이지가 이 자리에 들어갑니다.',
    ],
  },
  terms: {
    title: '이용약관 (예시 자리)',
    lines: [
      '샘플이라 약관 전문을 싣지 않았습니다. 실제 사이트에서는 전자상거래법에 맞춘 약관 전문 페이지가 연결됩니다.',
    ],
  },
  privacy: {
    title: '개인정보처리방침 (예시 자리)',
    lines: [
      '샘플이라 방침 전문을 싣지 않았습니다. 이 샘플은 어떤 개인정보도 수집·전송하지 않습니다.',
      '실제 사이트에서는 수집 항목·보관 기간·위탁 현황을 담은 방침 전문이 연결됩니다.',
    ],
  },
  cleanGrade: {
    title: '원료 & 클린 등급 기준 (예시 기준)',
    lines: [
      '화면의 「클린 그린 등급」은 공인 인증이 아니라 이 샘플에서 지어낸 브랜드 자체 기준입니다.',
      '실제 운영하실 성분 기준표·판정 방식을 그대로 옮겨 드립니다.',
    ],
  },
  refill: {
    title: '친환경 리필 캠페인 (예시 설정)',
    lines: [
      '리필 파우치 구매 시 본품 대비 포장재를 줄인다는 예시 설정으로 구성한 화면입니다.',
      '실제 인증·포장 규격은 운영하시는 내용으로 바꿔 넣습니다.',
    ],
  },
};

export const Footer: React.FC<FooterProps> = ({ onOpenDeliveryCheck, onShowInfo }) => {
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
              <a href="#ranking-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors inline-flex items-center max-lg:min-h-11">
                실시간 베스트 랭킹
              </a>
            </li>
            <li>
              <a href="#filter-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors inline-flex items-center max-lg:min-h-11">
                수부지 진정 앰플 케어
              </a>
            </li>
            <li>
              <a href="#filter-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors inline-flex items-center max-lg:min-h-11">
                100시간 보습 장벽 크림
              </a>
            </li>
            <li>
              <a href="#formula-inspector" className="text-[#3d4a42] hover:text-[#006948] transition-colors inline-flex items-center max-lg:min-h-11">
                클린 그린 등급 선케어
              </a>
            </li>
            <li>
              <a href="#bundle-section" className="text-[#3d4a42] hover:text-[#006948] transition-colors inline-flex items-center max-lg:min-h-11">
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
              className="px-3 py-1 bg-white rounded border border-gray-200 hover:border-[#006948] hover:text-[#006948] transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
            >
              당일배송 조회
            </button>
            <button
              onClick={() => onShowInfo(FOOTER_INFO.bottleReturn)}
              className="px-3 py-1 bg-white rounded border border-gray-200 hover:border-[#006948] hover:text-[#006948] transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
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
                onClick={() => onShowInfo(FOOTER_INFO.company)}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
              >
                회사소개
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowInfo(FOOTER_INFO.terms)}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
              >
                이용약관
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowInfo(FOOTER_INFO.privacy)}
                className="text-[#006948] font-bold hover:underline transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
              >
                개인정보처리방침
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowInfo(FOOTER_INFO.cleanGrade)}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
              >
                원료 &amp; 클린 등급 기준
              </button>
            </li>
            <li>
              <button
                onClick={() => onShowInfo(FOOTER_INFO.refill)}
                className="text-[#3d4a42] hover:text-[#006948] transition-colors cursor-pointer inline-flex items-center max-lg:min-h-11"
              >
                친환경 리필 캠페인
              </button>
            </li>
            <li>
              <a href="tel:1588-0000" className="text-[#3d4a42] hover:text-[#006948] transition-colors inline-flex items-center max-lg:min-h-11">
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
          <p><SampleFooterNote /></p>
        </div>
      </div>
    </footer>
  );
};
