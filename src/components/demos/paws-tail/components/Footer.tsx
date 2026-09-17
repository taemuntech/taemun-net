import React, { useState } from 'react';
import { InfoModal, type InfoModalSection } from './InfoModal';

type DisclosureKey = 'license' | 'origin' | 'subscription' | 'terms' | 'privacy';

type Disclosure = {
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: InfoModalSection[];
};

/**
 * 푸터 고지 5종.
 *
 * 예전에는 전부 빈 앵커 주소라 아무 데도 가지 않았다. 「준비 중」 빈 창을 띄우는 대신 각 항목의 본문을
 * 실제로 채워서 연다 — 내용은 전부 예시라고 창 안에서 밝힌다.
 */
const DISCLOSURES: Record<DisclosureKey, Disclosure> = {
  license: {
    label: '수의사 면허정보 및 처방 가이드라인',
    eyebrow: '면허·처방 안내',
    title: '수의사 면허정보 및 처방 가이드라인',
    lead: '실제 서비스라면 이 자리에 담당 수의사의 면허번호와 처방 기준을 적습니다.',
    sections: [
      {
        heading: '면허 정보 표기 자리 (예시)',
        body: '담당 수의사 성명과 수의사 면허 등록번호를 적는 자리입니다. 이 샘플에는 조회 가능한 번호를 넣지 않았습니다.',
      },
      {
        heading: '처방식 안내의 성격',
        body: '화면의 AI 영양 프로파일러와 급여량 계산기는 RER/DER 공식으로 계산한 참고값입니다. 진단이나 치료를 대신하지 않으며, 질환이 있는 반려동물의 식이는 담당 수의사와 상의해 정해야 합니다.',
      },
      {
        heading: 'AAFCO · FEDIAF 표기에 대하여',
        body: 'AAFCO 와 FEDIAF 는 반려동물 사료의 영양 기준을 내는 단체이고, 개별 제품에 「인증서」를 발급하는 기관이 아닙니다. 이 샘플의 표기는 기준을 참고했다는 뜻의 예시 표기입니다.',
      },
    ],
  },
  origin: {
    label: '원산지 및 배치성분 검사표',
    eyebrow: '원료·검사 안내',
    title: '원산지 및 배치성분 검사표',
    lead: '실제 서비스라면 생산 배치별 검사 성적서를 내려받는 자리입니다.',
    sections: [
      {
        heading: '배치 번호로 찾아보기 (예시)',
        body: '포장 뒷면의 배치 번호를 넣으면 해당 배치의 원료 원산지와 성분 분석치를 보여 주는 구성입니다.',
      },
      {
        heading: '표기하는 항목 (예시)',
        body: '주원료의 원산지, 조단백질·조지방·조회분·수분 분석치, 보관 조건과 유통기한을 적습니다.',
      },
      {
        heading: '이 샘플의 수치',
        body: '화면에 보이는 성분 수치·개선율·만족도는 모두 지어낸 예시 값이며 실제 검사 결과가 아닙니다.',
      },
    ],
  },
  subscription: {
    label: '정기구독 이용 안내',
    eyebrow: '정기구독 안내',
    title: '정기구독 이용 안내',
    lead: '아래 조건은 화면 구성을 보여 주기 위한 예시입니다.',
    sections: [
      {
        heading: '주기 변경과 건너뛰기',
        body: '배송 주기를 2주 / 4주 / 6주 중에서 고르고, 남은 사료량에 맞춰 이번 회차만 건너뛸 수 있는 구성입니다.',
      },
      {
        heading: '할인 적용 방식',
        body: '구독을 유지하는 동안 정가 대비 15% 를 더 깎는 구성입니다. 장바구니에서 상품별로 켜고 끌 수 있고, 켜는 즉시 합계에 반영됩니다.',
      },
      {
        heading: '해지와 환불',
        body: '다음 결제일 전에 해지하면 다음 회차부터 청구되지 않는 구성입니다. 실제 환불 조건은 전자상거래법과 각 사의 약관에 따라 정해집니다.',
      },
    ],
  },
  terms: {
    label: '이용약관',
    eyebrow: '이용약관',
    title: '이용약관 (예시 문안)',
    lead: '아래는 실제 약관이 아니라 약관 화면이 어떤 모양인지 보여 주는 예시 문안입니다.',
    sections: [
      {
        heading: '제1조 (목적)',
        body: '이 약관은 회사가 제공하는 온라인 판매 서비스의 이용 조건과 절차, 회사와 이용자의 권리·의무를 정하는 것을 목적으로 합니다.',
      },
      {
        heading: '제2조 (주문과 계약의 성립)',
        body: '이용자의 주문에 대해 회사가 승낙의 의사를 표시한 때 계약이 성립합니다. 이 샘플 사이트에서는 주문이 접수되지 않으므로 어떤 계약도 성립하지 않습니다.',
      },
      {
        heading: '제3조 (청약철회)',
        body: '이용자는 전자상거래법이 정한 기간 안에 청약을 철회할 수 있습니다. 다만 개봉해 다시 판매하기 어려운 식품은 법이 정한 범위에서 제한될 수 있습니다.',
      },
    ],
  },
  privacy: {
    label: '개인정보처리방침',
    eyebrow: '개인정보처리방침',
    title: '개인정보처리방침 (예시 문안)',
    lead: '아래는 실제 방침이 아니라 화면 구성을 보여 주기 위한 예시 문안입니다.',
    sections: [
      {
        heading: '수집하는 항목과 목적',
        body: '주문 처리와 배송을 위해 이름·연락처·주소를, 문진 상담을 위해 반려동물 정보를 받는 구성입니다.',
      },
      {
        heading: '보유 기간',
        body: '전자상거래법이 정한 기간(계약·청약철회 기록 5년, 결제 기록 5년, 소비자 불만 처리 기록 3년) 동안 보관한 뒤 파기하는 구성입니다.',
      },
      {
        heading: '이 샘플에서의 처리',
        body: '이 사이트의 모든 입력란은 어디에도 전송되지 않고 브라우저를 벗어나지 않습니다. 수집하거나 저장하는 개인정보가 없습니다.',
      },
    ],
  },
};

const LINK_ORDER: DisclosureKey[] = ['license', 'origin', 'subscription', 'terms', 'privacy'];

export const Footer: React.FC = () => {
  const [openKey, setOpenKey] = useState<DisclosureKey | null>(null);
  const active = openKey ? DISCLOSURES[openKey] : null;

  return (
    <footer className="bg-[#eff4ff] border-t border-[#bfc9c1]/60 mt-auto">
      <div className="w-full px-4 lg:px-8 py-10 lg:py-14 max-w-7xl mx-auto flex flex-col gap-8">
        {/* Top Row: Certification Seals & Vet Hotline */}
        {/* 없는 인증·허가를 「완료」라고 쓰지 않는다 — 기준 이름만 예시 표기로 남긴다 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-[#bfc9c1]/60">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f5238] text-3xl shrink-0">
              verified
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">AAFCO / FEDIAF 급여기준 참고</h4>
              <p className="text-[11px] text-[#404943]">
                글로벌 영양 가이드라인 참고 배합 (예시 표기)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f5238] text-3xl shrink-0">
              local_police
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">제조·유통 인허가 표기 자리</h4>
              <p className="text-[11px] text-[#404943]">허가·등록 번호 표기 자리 (예시)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0f5238] text-3xl shrink-0">lock</span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">카드·간편결제 모듈 연동</h4>
              <p className="text-[11px] text-[#404943]">결제대행사 표기 자리 (예시)</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#dee9fc] p-3 rounded-xl border border-[#bfc9c1]/40">
            <span className="material-symbols-outlined text-[#835418] text-3xl shrink-0">
              support_agent
            </span>
            <div>
              <h4 className="text-xs font-bold text-[#121c2a]">
                수의영양 고객센터 02-0000-0000 (예시)
              </h4>
              <p className="text-[11px] text-[#404943]">평일 09:30 ~ 18:30 (점심 12:30~13:30)</p>
            </div>
          </div>
        </div>

        {/* Middle Row: Brand Identity & Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <span className="text-lg font-bold text-[#0f5238] tracking-tight">
              PAWS &amp; TAIL VET
            </span>
            <span className="ml-2 text-xs text-[#404943]">임상영양 수의학 연구소</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 lg:gap-x-4 text-xs text-[#404943]">
            {LINK_ORDER.map((key, index) => (
              <React.Fragment key={key}>
                {index > 0 && <span className="text-[#bfc9c1]">|</span>}
                <button
                  type="button"
                  onClick={() => setOpenKey(key)}
                  className={`min-h-11 text-left transition-colors hover:text-[#0f5238] hover:underline ${
                    key === 'privacy' ? 'font-bold text-[#121c2a]' : ''
                  }`}
                >
                  {DISCLOSURES[key].label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Row: Mandatory Legal & Copyright Text */}
        <div className="text-xs text-[#404943]/80 space-y-1.5 pt-2 border-t border-[#bfc9c1]/40 leading-relaxed">
          <p>
            상호명: (주)포우즈앤테일임상영양 | 대표이사: 김민준 | 수의사 면허 등록번호: 표기 자리
            (예시) | 사업자등록번호: 000-00-00000 | 통신판매업신고: 표기 자리 (예시)
          </p>
          <p>
            사업장 소재지: 서울특별시 강남구 테헤란로 427 (가상 주소) | 동물용의약외품 제조업 허가
            표기 자리 (예시) | 개인정보관리책임자: 정재훈 (privacy@example.com)
          </p>
          <p className="pt-2 text-[#707973]">
            © 2025 PAWS &amp; TAIL VET Clinical Nutrition Inc. 태문 DEV STUDIO 가 만든 가상 브랜드
            샘플입니다 — 실제 업체가 아니며 주문·결제는 접수되지 않습니다. 화면의 인증·허가·수치
            표기는 모두 예시입니다.
          </p>
        </div>
      </div>

      {active && (
        <InfoModal
          isOpen={openKey !== null}
          onClose={() => setOpenKey(null)}
          eyebrow={active.eyebrow}
          title={active.title}
          lead={active.lead}
          sections={active.sections}
        />
      )}
    </footer>
  );
};
