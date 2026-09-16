import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#0a0e16] border-t border-[#424754] w-full mt-10">
      <div className="w-full px-4 lg:px-6 py-8 lg:py-10 mx-auto max-w-7xl flex flex-col gap-6">
        {/* Upper Trust Assurance Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 border-b border-[#424754] pb-6 text-xs font-label">
          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">verified_user</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">100% 정품 보증</span>
              <span className="text-[#8c909f] text-[11px]">제조사 공식 수입 정품 &amp; 2년 A/S</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">electric_bolt</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">로켓디지털 새벽배송</span>
              <span className="text-[#8c909f] text-[11px]">수도권 밤 12시 주문 시 내일 아침 7시 도착</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">credit_card</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">최대 24개월 무이자</span>
              <span className="text-[#8c909f] text-[11px]">국민, 신한, 삼성, 현대, 롯데 주요 카드사</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#1c2028] rounded border border-[#424754]/50">
            <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">support_agent</span>
            <div>
              <span className="font-bold text-[#dfe2ee] block">테크노바 전문 엔지니어 상담</span>
              <span className="text-[#8c909f] text-[11px]">평일 09:00 - 18:00 (1:1 하드웨어 상담)</span>
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
              주식회사 테크노바기어 | 대표이사: 엔지니어링 그룹 | 사업자등록번호: 220-88-99412
              <br />
              통신판매업신고: 2025-서울용산-0891호 | 서울특별시 용산구 청파로 109 나진전자월드 7F
              <br />
              고객센터: 1588-4921 (오전 9시 - 오후 6시 / 주말·공휴일 휴무)
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-label">
            <div className="flex flex-col gap-1.5">
              <span className="text-[#dfe2ee] font-bold mb-1">신뢰 &amp; 안전 가이드</span>
              <button
                onClick={() => alert('공식 수입원 정품 인증 및 KC 적합성 등록증 조회')}
                className="text-[#c2c6d6] hover:text-[#dfe2ee] text-left transition-colors cursor-pointer"
              >
                100% 정품 보증 안내
              </button>
              <button
                onClick={() => alert('KC 적합성평가 인증번호: R-R-TNV-TITAN16P')}
                className="text-[#c2c6d6] hover:text-[#dfe2ee] text-left transition-colors cursor-pointer"
              >
                KC 인증 현황
              </button>
              <button
                onClick={() => alert('주요 6대 카드사 무이자 24개월 혜택 제공')}
                className="text-[#c2c6d6] hover:text-[#dfe2ee] text-left transition-colors cursor-pointer"
              >
                무이자 할부 혜택
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[#dfe2ee] font-bold mb-1">고객 지원 &amp; 정책</span>
              <button
                onClick={() => alert('테크노바 24/7 기술 지원 및 RMA 센터 접수 안내')}
                className="text-[#c2c6d6] hover:text-[#dfe2ee] text-left transition-colors cursor-pointer"
              >
                고객지원 센터
              </button>
              <button
                onClick={() => alert('전자상거래 표준약관 준수')}
                className="text-[#c2c6d6] hover:text-[#dfe2ee] text-left transition-colors cursor-pointer"
              >
                이용약관
              </button>
              <button
                onClick={() => alert('개인정보처리방침 규정 안내')}
                className="text-[#4cd7f6] underline text-left transition-colors cursor-pointer"
              >
                개인정보처리방침
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[#dfe2ee] font-bold mb-1">결제 에스크로</span>
              <p className="text-[#8c909f] text-[11px] max-w-[200px] leading-relaxed">
                고객님의 안전거래를 위해 현금 결제 시 토스페이먼츠 구매안전(에스크로) 서비스를 이용하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Copyright Row */}
        <div className="border-t border-[#424754]/60 pt-4 flex flex-col lg:flex-row items-center justify-between text-xs text-[#8c909f] gap-2">
          <p>© 2025 TECHNOVA GEAR INC. 100% 정품 보증 | KC 인증 안전 관리 규격 준수 | 최대 24개월 무이자 할부 제휴사 지원</p>
          <div className="flex items-center gap-4 text-xs font-label">
            <span>SERVER LATENCY: 12ms</span>
            <span className="text-[#4cd7f6] flex items-center gap-1 font-bold">
              <span className="inline-block w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              SYSTEM ALL GREEN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
