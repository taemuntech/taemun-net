import React, { useState } from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <footer className="w-full bg-surface-container-high border-t border-surface-container text-on-surface-variant font-body-sm text-[13px] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Partner & Tech Accreditation Grid */}
          <div className="pb-12 border-b border-surface-container/80 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-secondary">
                ZEISS VISUMAX 800 CENTER
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-primary">
                STAAR EVO+ ICL CERTIFIED
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-tertiary">
                OCULUS PENTACAM HR 3D
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-on-surface">
                J&amp;J VISION PREMIER PARTNER
              </span>
            </div>
          </div>

          {/* Main Footer Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UcsLi0Iukay6aZ5VBpaymqF5sVkpP0rtPPxrfvzLfVzm3ThaWxHlzE5r3gDet38VdD0YJdE-U8Zpe2aE7QRa-4rZ72yXeG8aG_VUZX-YTLu8_7vE0B5rQ3hYMkR18N3W4zDg1kXWvr1PWrH44EPcjJCgWEPPuhcVqERZQLnbGk38Et_3i4WyC2HfLjhPctI8dve8s3txthiRPxZKjksD_moXOoWlbCrTIN7aezDgyIzlUO9Wr_9cNr2v0S"
                  alt="Prime Vision Eye Clinic Logo"
                  className="h-6 w-auto object-contain"
                 referrerPolicy="no-referrer" />
                <span className="font-headline-sm text-[16px] font-bold text-on-surface">
                  프라임 스마트 아이 안과의원
                </span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                대표원장: 강현우, 윤소희 | 사업자등록번호: 000-00-00000 (샘플용)<br />
                의료기관명칭: 프라임스마트아이안과의원 | 의료기관개설신고번호: 제 3230000-041-2023-00018호<br />
                소재지: 서울특별시 강남구 테헤란로 124 프라임 메디컬 타워 4~7층<br />
                대표전화: 02-0000-0000 | 팩스: 02-0000-0000
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2">
              <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                진료 안내 및 긴급 수술 케어
              </span>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                평일 09:30 ~ 18:30 (금요일 야간 20:30까지)<br />
                토요일 09:00 ~ 16:00 (점심시간 없음)<br />
                점심시간 13:00 ~ 14:00 (월~금)<br />
                일요일 및 공휴일 휴진 (수술 당직 케어 전용 핫라인 24시간 운영)
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                고객 편의 및 규정
              </span>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setShowPriceModal(true)}
                  className="text-left text-primary hover:underline font-semibold cursor-pointer"
                >
                  비급여 진료비 고지 안내
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-left text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  개인정보처리방침
                </button>
                <span className="text-on-surface-variant">환자 권리장전 &amp; 주의사항</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-surface-container flex flex-col lg:flex-row items-center justify-between gap-4 text-[12px] text-outline">
            <p>
              © 2026 PRIME VISION EYE CLINIC. All rights reserved. 본 웹사이트의 모든 콘텐츠 및 의료 정보는
              의료법 및 저작권법에 의해 보호받습니다.
            </p>
            <p>Designed for Ultimate Patient Safety &amp; Optical Precision</p>
          </div>
        </div>
      </footer>

      {/* Non-Covered Pricing Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 max-w-2xl w-full shadow-2xl border border-surface-container max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">
                비급여 진료비용 고지 (의료법 제45조 준수)
              </h3>
              <button
                type="button"
                onClick={() => setShowPriceModal(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-5 overflow-x-auto">
              <table className="w-full text-left font-body-sm text-[13px]">
                <thead className="bg-surface-container-low text-on-surface font-semibold">
                  <tr>
                    <th className="p-3">항목</th>
                    <th className="p-3">세부 내역</th>
                    <th className="p-3">비용 (양안 기준, VAT 포함)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr>
                    <td className="p-3 font-medium">자이스 비쥬맥스 800 스마일프로</td>
                    <td className="p-3 text-on-surface-variant">CentraLign &amp; OcuLign 동시 적용</td>
                    <td className="p-3 font-label-numeric font-bold text-primary">2,600,000원 ~ 3,100,000원</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">토포가이드 커스텀 라식</td>
                    <td className="p-3 text-on-surface-variant">각막 미세 지형도 맞춤 절삭</td>
                    <td className="p-3 font-label-numeric font-bold text-primary">1,900,000원 ~ 2,400,000원</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">EVO+ 아쿠아 ICL 안내렌즈</td>
                    <td className="p-3 text-on-surface-variant">난시 교정 유무에 따라 차등</td>
                    <td className="p-3 font-label-numeric font-bold text-primary">4,300,000원 ~ 5,200,000원</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">프리미엄 노안·백내장 4초점</td>
                    <td className="p-3 text-on-surface-variant">자이스 광학 렌즈 (단안 기준)</td>
                    <td className="p-3 font-label-numeric font-bold text-primary">2,500,000원 ~ 3,600,000원</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">50단계 정밀 안종합 검진비</td>
                    <td className="p-3 text-on-surface-variant">수술 당일 진행 시 전액 지원</td>
                    <td className="p-3 font-label-numeric font-bold text-primary">100,000원 (수술 시 면제)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="font-body-sm text-[12px] text-outline mb-6">
              ※ 환자의 각막 두께, 고도 난시 여부, 동공 크기 및 선택하시는 인공수정체 렌즈 브랜드에 따라 최종 수술비용은 상이할 수 있습니다.
            </p>

            <button
              type="button"
              onClick={() => setShowPriceModal(false)}
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-headline-sm text-[14px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 max-w-xl w-full shadow-2xl border border-surface-container max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
              <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">
                개인정보 처리방침 요약
              </h3>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="p-1 rounded-lg text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="py-4 space-y-3 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              <p>
                프라임스마트아이안과의원은 고객님의 개인정보를 소중히 다루며, 개인정보 보호법 및 의료법에 의거하여 진료 예약 및 환자 상담 목적 이외에는 절대 무단 활용하거나 제3자에게 제공하지 않습니다.
              </p>
              <p>
                <strong>1. 수집 항목:</strong> 성명, 연락처, 희망 진료 및 예약 일시, 진료 관련 상담 내용
              </p>
              <p>
                <strong>2. 보유 및 이용 기간:</strong> 의료법 시행규칙에 따른 진료 기록 및 상담 관리 목적 달성 시까지
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPrivacyModal(false)}
              className="w-full mt-4 py-3 rounded-xl bg-primary text-on-primary font-headline-sm text-[14px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};
