'use client';

import React, { useState } from 'react';
import { LOGO_URL } from '../data/mockData';
import { DetailModal } from './DetailModal';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

// 예전에는 #privacy·#terms·#whistleblower 로 가는 앵커였는데 그런 구역이 페이지에 없어 아무 데도 가지 않았다.
// 없애는 대신 기업 사이트에 실제로 들어가는 지면을 모달로 채운다 — 단, 샘플이므로 「가상 브랜드 예시」임을 본문에 적는다.
type PolicyKey = 'privacy' | 'terms' | 'whistleblower';

const POLICY_DOCS: Record<PolicyKey, { label: string; eyebrow: string; title: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    label: '개인정보처리방침',
    eyebrow: 'PRIVACY POLICY (예시 지면)',
    title: '개인정보처리방침',
    sections: [
      {
        h: '1. 수집하는 항목',
        p: '제휴·미팅 신청 화면에서 기업명(법인명), 담당 부서·직책, 담당자 성함, 업무용 이메일, 사업장 소재지와 희망 공급 시점을 받습니다. 개인 식별에 필요한 최소 항목만 두고 주민등록번호·계좌·결제 정보는 받지 않습니다.',
      },
      {
        h: '2. 이용 목적',
        p: '전력 직거래(PPA) 타당성 검토와 회신, 그리고 회신에 필요한 범위의 연락에만 씁니다. 광고·마케팅 발송에는 별도 동의를 다시 받습니다.',
      },
      {
        h: '3. 보유 기간',
        p: '검토가 끝나 회신을 마치면 지체 없이 파기하되, 계약으로 이어진 건은 관계 법령이 정한 기간 동안 보관합니다.',
      },
      {
        h: '4. 제3자 제공·위탁',
        p: '법령에 근거가 있거나 정보주체가 따로 동의한 경우가 아니면 제3자에게 제공하지 않습니다. 시스템 운영을 위탁하는 경우 수탁자와 보호 의무를 계약으로 정합니다.',
      },
      {
        h: '5. 정보주체의 권리',
        p: '열람·정정·삭제·처리정지를 언제든 요구할 수 있고, 요구를 받으면 지체 없이 처리합니다.',
      },
    ],
  },
  terms: {
    label: '이용약관',
    eyebrow: 'TERMS OF USE (예시 지면)',
    title: '이용약관',
    sections: [
      {
        h: '제1조 (목적)',
        p: '이 약관은 회사가 웹사이트에서 제공하는 정보와 문의 접수 기능의 이용 조건, 회사와 이용자의 권리·의무를 정하는 것을 목적으로 합니다.',
      },
      {
        h: '제2조 (게시 정보의 성격)',
        p: '사이트에 실린 설비 용량·효율·감축량·단가 등의 수치는 안내를 위한 참고 값이며, 그 자체로 청약이나 계약 조건이 되지 않습니다. 구체적 조건은 개별 계약서로 정합니다.',
      },
      {
        h: '제3조 (산출기 결과)',
        p: '전력·연도·전환 대수를 입력해 얻는 산출 결과는 가정을 단순화한 추정치입니다. 실제 계약 단가·감축량과 다를 수 있으므로 투자 판단의 근거로 쓰지 않습니다.',
      },
      {
        h: '제4조 (지식재산권)',
        p: '사이트의 문서·도표·구성에 대한 권리는 회사에 있으며, 회사의 사전 승낙 없이 복제·배포·2차 가공할 수 없습니다.',
      },
      {
        h: '제5조 (책임의 한계)',
        p: '천재지변, 통신 장애 등 회사의 통제를 벗어난 사유로 서비스가 중단된 경우 회사는 책임을 지지 않습니다.',
      },
    ],
  },
  whistleblower: {
    label: '사이버신문고',
    eyebrow: 'SPEAK-UP CHANNEL (예시 지면)',
    title: '사이버신문고 (윤리·안전 제보)',
    sections: [
      {
        h: '무엇을 제보하나요',
        p: '금품 수수와 부당한 요구, 회계·계약 관련 부정, 안전 수칙을 건너뛴 작업 지시, 협력사에 대한 불공정 행위, 괴롭힘과 차별을 받습니다. 임직원뿐 아니라 협력사·지역 주민 누구나 낼 수 있습니다.',
      },
      {
        h: '제보자 보호',
        p: '제보자의 신원과 제보 내용은 조사 담당자 외에는 열람할 수 없게 분리 보관하며, 제보를 이유로 한 불이익 처우를 금지합니다. 익명으로도 접수할 수 있고, 이 경우 조회번호로 진행 상황을 확인합니다.',
      },
      {
        h: '처리 절차',
        p: '접수 → 사실관계 확인 → 조사 → 조치 → 결과 통지 순으로 진행하며, 접수 사실은 영업일 기준 3일 안에 알려 드립니다.',
      },
      {
        h: '오·허위 제보',
        p: '고의로 사실과 다른 내용을 제보해 타인에게 피해를 입힌 경우에는 보호 대상에서 제외될 수 있습니다.',
      },
    ],
  },
};

/** 푸터 거점 링크 — HUBS_DATA 순서와 같다(거점 화면의 선택을 그대로 바꾼다) */
const HUB_LINKS = [
  '신안 자은 1.2GW 해상풍력',
  '울산 남항 액화수소 터미널',
  '포항 80MW 수소연료전지',
  '필바라 수출 기지',
];

/** IR 문서 — 누르면 그 문서 이름을 실은 샘플 안내가 열린다(전에는 넷 다 #governance 로만 갔다) */
const IR_DOCS = [
  '지속가능경영보고서',
  '기후 리스크 보고 (예시)',
  '분기/결산 재무제표 (예시)',
  '이사회 및 윤리경영 규정',
];

interface FooterProps {
  onSelectHub: (index: number) => void;
  onRequestDoc: (docName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectHub, onRequestDoc }) => {
  const [policy, setPolicy] = useState<PolicyKey | null>(null);
  // 로고는 외부 호스트 직접 참조라 차단·만료되면 깨진 그림이 뜬다 — 그때는 글자 마크로 대신한다.
  const [logoFailed, setLogoFailed] = useState(false);
  const doc = policy ? POLICY_DOCS[policy] : null;

  return (
    <footer className="w-full bg-white border-t border-[#bcc9c6]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-16">
        {/* Top Row: Brand, Credentials, Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#bcc9c6]/30">
          {/* Brand & Vision (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              {logoFailed ? (
                <span
                  aria-hidden="true"
                  className="h-8 w-8 shrink-0 rounded bg-white border border-[#bcc9c6]/40 flex items-center justify-center text-[11px] font-bold text-[#00685f]"
                >
                  H2
                </span>
              ) : (
                <img
                  alt="H2 NEXT Brand Logo"
                  className="h-8 w-8 shrink-0 object-contain"
                  src={LOGO_URL}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                />
              )}
              <span className="text-xl font-bold text-[#00685f]">H2 NEXT</span>
            </div>
            <p className="text-xs lg:text-sm text-[#3d4947] max-w-sm leading-relaxed [word-break:keep-all]">
              H2 NEXT(하이드로젠 넥스트)는 기가와트 해상풍력과 PEM 고효율 수전해, 극저온 액화수소 밸류체인을 다루는 청정에너지 엔지니어링 기업입니다.
            </p>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#6d7a77] pt-1">
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] border border-[#bcc9c6]/40">
                종목코드 (예시)
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] border border-[#bcc9c6]/40">
                RE100 표기 (예시)
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] border border-[#bcc9c6]/40">
                인증 표기 (예시)
              </span>
            </div>
          </div>

          {/* Links Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">그린수소 기술</h5>
              <ul className="space-y-1 text-xs lg:text-sm text-[#3d4947] [word-break:keep-all]">
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#pillar-1">PEM 수전해 스택</a></li>
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#pillar-2">-253℃ 극저온 구형탱크</a></li>
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#pillar-3">분산형 PPA 그리드</a></li>
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#nodes">거점별 기술 적용 현황</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">발전 및 터미널 거점</h5>
              <ul className="space-y-1 text-xs lg:text-sm text-[#3d4947] [word-break:keep-all]">
                {HUB_LINKS.map((label, index) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSelectHub(index)}
                      className="block w-full text-left py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">ESG &amp; IR 공시</h5>
              <ul className="space-y-1 text-xs lg:text-sm text-[#3d4947] [word-break:keep-all]">
                {IR_DOCS.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onRequestDoc(label)}
                      className="block w-full text-left py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">엔지니어링 문의</h5>
              <ul className="space-y-1 text-xs lg:text-sm text-[#3d4947] [word-break:keep-all]">
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#consultation">기업 RE100 컨설팅</a></li>
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#calculator">배출권 산출기</a></li>
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="#consultation">EPC 기술 제휴</a></li>
                <li><a className="block py-1.5 max-lg:py-3.5 hover:text-[#00685f] transition-colors" href="mailto:hello@example.com">IR 투자자 미팅 접수</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Corporate Info */}
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-[#6d7a77]">
          <div className="space-y-1 [word-break:keep-all]">
            <p>
              <span className="font-semibold text-[#0b1c30]">H2 NEXT Energy Systems Inc. (주식회사 하이드로젠넥스트)</span> | 대표이사: 홍길동(예시) | 사업자등록번호: 000-00-00000 (예시)
            </p>
            <p>
              서울 본사: 서울특별시 종로구 (사옥 주소 표기 자리 · 예시) | 울산 캠퍼스: 울산광역시 남구 (사업장 주소 표기 자리 · 예시)
            </p>
            <p className="font-mono text-[11px] pt-1">
              © 2026 H2 NEXT Energy Systems Inc. All rights reserved. 인증 표기 자리 (예시).
            </p>
            {/* 접을 수 없는 자리에 남기는 샘플 고지 — 화면만(?embed=true) 열어도 보여야 한다 */}
            <p className="mt-2 rounded-lg border border-[#00685f]/40 bg-[#eff4ff] px-3 py-2 text-[12px] leading-relaxed text-[#0b1c30]"><SampleFooterNote /></p>
          </div>

          {/* 정책 지면 — 앵커가 아니라 내용이 채워진 모달을 연다 */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs">
            {(Object.keys(POLICY_DOCS) as PolicyKey[]).map((key, i) => (
              <React.Fragment key={key}>
                {i > 0 && <span className="text-[#bcc9c6]">|</span>}
                <button
                  type="button"
                  onClick={() => setPolicy(key)}
                  aria-haspopup="dialog"
                  className="min-h-11 cursor-pointer px-2 text-[#3d4947] hover:text-[#00685f] hover:underline"
                >
                  {POLICY_DOCS[key].label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <DetailModal
        open={doc !== null}
        onClose={() => setPolicy(null)}
        eyebrow={doc?.eyebrow}
        title={doc?.title ?? ''}
      >
        {doc && (
          <div className="space-y-5">
            {doc.sections.map((s) => (
              <div key={s.h}>
                <h4 className="mb-1 text-sm font-bold text-[#0b1c30] [word-break:keep-all]">{s.h}</h4>
                <p className="text-sm leading-relaxed text-[#3d4947] [word-break:keep-all]">{s.p}</p>
              </div>
            ))}
          </div>
        )}
      </DetailModal>
    </footer>
  );
};
