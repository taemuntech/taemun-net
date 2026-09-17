import React, { useRef } from 'react';
import { X } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

export type PolicyTopic = '이용약관' | '개인정보처리방침' | '사업자 정보 확인' | '고객 케어 센터';

interface PolicyModalProps {
  topic: PolicyTopic | null;
  onClose: () => void;
}

// 푸터의 약관·정책·고객센터 자리. 이 샘플엔 해당 지면이 없어서 예전에는 **눌리는 것처럼 보이지만
// 아무 일도 안 나는 글자**였다. 그 자리에 「무엇을 싣는 자리인가」를 적어 두는 모달로 잇는다.
const BODY: Record<PolicyTopic, string> = {
  이용약관:
    '회원 가입·주문·취소·배송·교환 및 반품 기준을 적는 자리입니다. 이 화면은 태문 DEV STUDIO 가 만든 가상 브랜드 샘플이라 실제 약관이 아니며, 실제 사이트에서는 사업자가 확정한 문안이 들어갑니다.',
  개인정보처리방침:
    '수집하는 항목·이용 목적·보관 기간·위탁 업체·이용자 권리를 적는 자리입니다. 샘플에는 실제 문안 대신 자리만 두었고, 이 화면에 입력하신 내용은 어디에도 전송되지 않습니다.',
  '사업자 정보 확인':
    '상호·대표자·사업자등록번호·통신판매업 신고번호·주소·호스팅 제공자를 표기하는 자리입니다. 푸터에 적힌 값은 모두 예시(000-00-00000)이고 조회되는 실제 번호가 아닙니다.',
  '고객 케어 센터':
    '전화·채팅·1:1 문의 접수 창구를 두는 자리입니다. 샘플이라 문의가 접수되지 않고, 표기된 번호(02-0000-0000)도 예시입니다.'
};

export const PolicyModal: React.FC<PolicyModalProps> = ({ topic, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Esc 로 닫기 · 배경 스크롤 잠금 · 포커스 가두기
  useSampleDialog({ open: topic !== null, onClose, dialogRef });

  if (!topic) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#100e0d]/60 backdrop-blur-xs flex items-end lg:items-center justify-center p-0 lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ma-policy-title"
        tabIndex={-1}
        className="bg-[#fff8f4] max-w-md w-full max-h-[92vh] lg:max-h-[90vh] overflow-y-auto rounded-t-2xl lg:rounded-2xl shadow-2xl border border-[#d0c4c0]/60 p-6 lg:p-8 relative animate-in slide-in-from-bottom-4 lg:slide-in-from-bottom-0 lg:zoom-in-95 duration-200 outline-none"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 flex items-center justify-center w-11 h-11 text-[#7f7571] hover:text-[#100e0d] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] font-bold text-[#944931] uppercase tracking-widest">
          MAISON ARCHITECT — 예시 문안
        </span>
        <h3 id="ma-policy-title" className="font-serif text-xl text-[#100e0d] mt-1 mb-4 pr-10">
          {topic}
        </h3>

        <p className="text-xs text-[#4d4542] leading-relaxed">{BODY[topic]}</p>

        <button
          onClick={onClose}
          className="w-full mt-6 min-h-12 px-4 rounded-lg bg-[#100e0d] hover:bg-[#262322] text-[#fff8f4] text-xs font-semibold tracking-wider transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};
