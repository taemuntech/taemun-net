'use client';

import React from 'react';
import type { InfoModalContent } from './Modals/InfoModal';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onShowInfo: (content: InfoModalContent) => void;
}

// 푸터 안내 링크 — 예전에는 전부 alert() 였다(저장소 규칙상 금지). 이제 데모 안 모달로 연다.
// 「공식 수입원 정품」·「제조사 공식 수입 정품」 처럼 실존 제조사와의 제휴·공인 유통처럼 읽히는 말은 쓰지 않는다.
const FOOTER_INFO: Record<string, InfoModalContent> = {
  genuine: {
    title: '판매·A/S 표기 안내',
    lines: [
      '테크노바 기어는 지어낸 브랜드이고, 화면의 유통 경로·보증 기간은 모두 예시 표기입니다. 어떤 제조사의 공인 판매처도 아닙니다.',
      '실제 운영 시에는 수입·유통 경로와 보증 주체, 보증 기간을 계약한 내용 그대로 이 자리에 적습니다.',
    ],
  },
  safety: {
    title: '안전 인증 표기 안내',
    lines: [
      '이 화면에는 인증번호가 없습니다. 조회하면 실제로 나오는 번호를 지어내지 않기 위해서입니다.',
      '실제 운영 시에는 품목별로 발급받은 안전 인증 번호와 인증 기관을 상품 상세에 그대로 표기합니다.',
    ],
  },
  installment: {
    title: '무이자 할부 혜택 (예시)',
    lines: [
      '화면의 할부 개월 수와 청구할인율은 예시 수치입니다. 실제 카드사 이름은 적지 않았습니다.',
      '실제 운영 시에는 결제대행사·카드사와 맺은 행사 조건을 월별로 갱신해 이 자리에 붙입니다.',
    ],
  },
  support: {
    title: '고객지원 센터',
    lines: [
      '샘플 사이트라 A/S 접수·수리 조회가 동작하지 않습니다. 화면의 연락처와 운영 시간은 예시 표기입니다.',
      '실제 운영 시에는 접수 폼·진행 상태 조회·택배 회수 신청을 이 자리에 붙입니다.',
    ],
  },
  terms: {
    title: '이용약관',
    lines: [
      '샘플 사이트라 약관 본문이 없습니다. 실제 운영 시에는 전자상거래 관련 법령에 맞춰 작성한 약관 전문을 이 자리에 둡니다.',
    ],
  },
  privacy: {
    title: '개인정보처리방침',
    lines: [
      '이 샘플은 개인정보를 수집하지 않습니다. 입력창에 적은 내용은 어디에도 전송되지 않고 화면을 벗어나지 않습니다.',
      '실제 운영 시에는 수집 항목·보유 기간·위탁 업체를 명시한 처리방침 전문을 이 자리에 둡니다.',
    ],
  },
};

export const Footer: React.FC<FooterProps> = ({ onShowInfo }) => {
  const linkClass =
    'text-[#c2c6d6] hover:text-[#dfe2ee] text-left transition-colors cursor-pointer min-h-11 flex items-center';

  return (
    <footer id="main-footer" className="bg-[#0a0e16] border-t border-[#424754] w-full mt-10">
      <div className="w-full px-4 lg:px-6 py-8 lg:py-10 mx-auto max-w-7xl flex flex-col gap-6">
        {/* Upper Trust Assurance Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-b border-[#424754] pb-6 text-xs font-label">
          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">verified_user</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">판매·A/S 안내</span>
              <span className="text-[#8c909f] text-[11px]">유통 경로 &amp; 보증 조건 표기 자리 (예시)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">electric_bolt</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">테크노바 새벽배송</span>
              <span className="text-[#8c909f] text-[11px]">수도권 심야 주문 시 익일 오전 도착 (예시)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">credit_card</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">최대 24개월 무이자</span>
              <span className="text-[#8c909f] text-[11px]">국내 주요 카드사 (예시)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">support_agent</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">테크노바 전문 엔지니어 상담</span>
              <span className="text-[#8c909f] text-[11px]">평일 09:00 - 18:00 (1:1 하드웨어 상담 · 예시)</span>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Company Deck */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-1 max-w-md">
            <span className="text-xl font-headline font-bold text-[#dfe2ee] uppercase tracking-tight">
              TECHNOVA GEAR
            </span>
            <p className="text-xs text-[#8c909f] leading-relaxed">
              주식회사 테크노바기어 | 대표이사: 엔지니어링 그룹 | 사업자등록번호: 000-00-00000
              <br />
              통신판매업신고: 0000-0000-0000 (표기 자리) | 서울특별시 용산구 청파로 109 (예시 주소)
              <br />
              고객센터: 1588-0000 (오전 9시 - 오후 6시 / 주말·공휴일 휴무)
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-label">
            <div className="flex flex-col">
              <span className="text-[#dfe2ee] font-bold mb-1">신뢰 &amp; 안전 가이드</span>
              <button type="button" onClick={() => onShowInfo(FOOTER_INFO.genuine)} className={linkClass}>
                판매·A/S 표기 안내
              </button>
              <button type="button" onClick={() => onShowInfo(FOOTER_INFO.safety)} className={linkClass}>
                안전 인증 표기 안내
              </button>
              <button type="button" onClick={() => onShowInfo(FOOTER_INFO.installment)} className={linkClass}>
                무이자 할부 혜택
              </button>
            </div>

            <div className="flex flex-col">
              <span className="text-[#dfe2ee] font-bold mb-1">고객 지원 &amp; 정책</span>
              <button type="button" onClick={() => onShowInfo(FOOTER_INFO.support)} className={linkClass}>
                고객지원 센터
              </button>
              <button type="button" onClick={() => onShowInfo(FOOTER_INFO.terms)} className={linkClass}>
                이용약관
              </button>
              <button
                type="button"
                onClick={() => onShowInfo(FOOTER_INFO.privacy)}
                className="text-[#4cd7f6] underline text-left transition-colors cursor-pointer min-h-11 flex items-center"
              >
                개인정보처리방침
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[#dfe2ee] font-bold mb-1">안전 결제 안내</span>
              <p className="text-[#8c909f] text-[11px] max-w-[200px] leading-relaxed">
                샘플 사이트라 결제가 이뤄지지 않습니다. 안전거래 안내 문구는 실제 운영 시 계약한 결제대행사 기준으로
                넣습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Copyright Row */}
        <div className="border-t border-[#424754]/60 pt-4 flex flex-col lg:flex-row items-center justify-between text-xs text-[#8c909f] gap-2">
          <p><SampleFooterNote /></p>
          <div className="flex items-center gap-4 text-xs font-label">
            <span className="text-[#4cd7f6] flex items-center gap-1 font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              SYSTEM ALL GREEN (예시 표기)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
