import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

// 푸터의 「이용약관·개인정보처리방침·비급여 진료비용·환자의 권리와 의무」는 눌러도 아무 일이 없는
// <span> 이었다. 네 항목 모두 본문이 다른 실제 창으로 연결한다.
export type PolicyKey = 'terms' | 'privacy' | 'nonCovered' | 'rights';

type PolicyDoc = { title: string; lead: string; body: string[] };

export const POLICY_DOCS: Record<PolicyKey, PolicyDoc> = {
  terms: {
    title: '이용약관 (예시)',
    lead: '가상 브랜드 샘플의 예시 약관입니다. 실제 계약 효력이 없습니다.',
    body: [
      '제1조(목적) 이 약관은 본초 통합한방병원(가상 브랜드) 웹사이트가 제공하는 정보 안내 서비스의 이용 조건을 정하기 위한 예시 문서입니다.',
      '제2조(서비스의 범위) 이 사이트는 진료 과목·시설·비용 안내만을 제공하며, 예약 접수·진료 상담·의무기록 열람 기능은 제공하지 않습니다.',
      '제3조(책임의 한계) 화면의 치료 소개는 일반적인 안내이며 진단이나 처방을 대신하지 않습니다. 증상에 대한 판단은 반드시 의료진과의 진료를 통해 이루어져야 합니다.',
      '제4조(포트폴리오 고지) 이 웹사이트는 태문 DEV STUDIO 가 제작한 가상 브랜드 시안으로, 실제 의료기관이 아니며 어떠한 진료 계약도 성립하지 않습니다.',
    ],
  },
  privacy: {
    title: '개인정보처리방침 (예시)',
    lead: '이 화면의 입력값은 어디에도 전송되지 않으며 저장되지도 않습니다.',
    body: [
      '수집 항목 — 실제 운영 시에는 입원 상담을 위해 성명·연락처·희망 일자를 받습니다. 이 샘플 화면에서는 어떤 값도 서버로 보내지 않고 브라우저 안에서만 쓰입니다.',
      '건강정보 — 증상·병력 같은 건강정보는 개인정보 보호법상 민감정보라 별도 동의 없이 수집할 수 없습니다. 이 샘플의 상담 입력란도 전송·저장하지 않습니다.',
      '보유 기간 — 실제 운영 시 상담 목적이 끝나면 지체 없이 파기합니다. 진료가 이루어진 경우의 진료기록부는 의료법 제22조에 따른 보존 기간을 따릅니다.',
      '문의 — 예시 표기: 개인정보보호책임자 (성명 표기 자리) · 02-0000-0000',
    ],
  },
  nonCovered: {
    title: '비급여 진료비용 안내 (예시)',
    lead: '의료법 제45조에 따른 고지 항목을 어떻게 싣는지 보여 주는 예시 표입니다. 실제 수가가 아닙니다.',
    body: [
      '1인실 로열 스위트 입원료 — 1일 250,000원 (예시)',
      '2인실 하모니 스위트 입원료 — 1일 90,000원 (예시)',
      '고주파 온열치료 1회 — 150,000원 (예시)',
      '약침 시술 1회 — 30,000원 (예시)',
      '맞춤 탕약 1제(20일분) — 400,000원 (예시)',
      '※ 비급여 항목과 금액은 의료기관마다 다르며, 실제 운영 시에는 접수창구와 홈페이지에 고지한 금액을 따릅니다.',
    ],
  },
  rights: {
    title: '환자의 권리와 의무 (예시)',
    lead: '의료법 시행규칙 별표에 따른 게시 항목을 예시로 옮긴 것입니다.',
    body: [
      '진료받을 권리 — 성별·나이·종교·사회적 신분이나 경제적 사정을 이유로 진료를 거부당하지 않습니다.',
      '알 권리 및 자기결정권 — 질병 상태, 치료 방법, 예상 결과와 진료비용에 관해 설명을 듣고 스스로 선택할 수 있습니다.',
      '비밀을 보호받을 권리 — 진료와 관련된 신체상·건강상의 비밀을 침해받지 않습니다.',
      '상담·조정을 신청할 권리 — 의료서비스 관련 분쟁이 생기면 의료분쟁 조정·중재 기관에 상담과 조정을 신청할 수 있습니다.',
      '환자의 의무 — 자신의 건강 상태를 정확히 알리고 치료 계획을 신뢰하며 따라야 하며, 진료 전 본인의 신분을 밝혀야 합니다.',
    ],
  },
};

interface PolicyModalProps {
  openKey: PolicyKey | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ openKey, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기 (샘플 공용 훅)
  useSampleDialog({ open: openKey !== null, onClose, dialogRef });

  if (!openKey) return null;
  const doc = POLICY_DOCS[openKey];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-end lg:items-center justify-center p-0 lg:p-6 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="boncho-policy-title"
        tabIndex={-1}
        className="bg-[#faf9f6] w-full max-w-[640px] rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-2xl border border-[#e3e2e0] flex flex-col max-h-[88vh] outline-none"
      >
        <div className="p-4 lg:px-6 bg-[#102a20] text-white flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 id="boncho-policy-title" className="font-serif text-[18px] lg:text-[20px] font-bold break-keep">
              {doc.title}
            </h3>
            <p className="text-[12px] text-[#8fab9d] mt-0.5 break-keep">{doc.lead}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="창 닫기"
            className="w-11 h-11 lg:w-8 lg:h-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 lg:p-6 overflow-y-auto grow min-h-0 space-y-3">
          {doc.body.map((line) => (
            <p key={line} className="text-[13px] lg:text-[14px] text-[#424844] leading-relaxed break-keep">
              {line}
            </p>
          ))}
        </div>

        <div className="p-4 bg-[#efeeeb] border-t border-[#e3e2e0] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 min-h-[44px] rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
