import React, { useId, useRef, useState } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";
// language prop 을 받아 두고 한 번도 쓰지 않으면 「번역되는 것처럼 보이는」 죽은 배선이 된다.
// 푸터 본문(비급여 진료비·개인정보처리방침·환자 권리)은 국문 고정이라 prop 을 받지 않는다.

type FooterModalId = 'price' | 'privacy' | 'rights';

/**
 * 푸터 모달 공통 껍데기.
 * 세 모달이 Esc·배경 클릭·배경 스크롤 잠금·포커스 가두기를 똑같이 써야 해서 한 곳으로 모았다
 * (예전에는 셋 다 닫기 버튼으로만 닫혔고, 열어 둔 채 뒤 화면이 그대로 스크롤됐다).
 * 모바일에서는 시트형으로 바닥에 붙는다.
 */
function FooterModal({
  open,
  onClose,
  title,
  size = 'md',
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  size?: 'md' | 'lg';
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open, onClose, dialogRef });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`bg-surface-container-lowest rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 w-full ${
          size === 'lg' ? 'lg:max-w-2xl' : 'lg:max-w-xl'
        } shadow-2xl border border-surface-container max-h-[88vh] lg:max-h-[85vh] overflow-y-auto outline-none break-keep`}
      >
        <div className="flex items-center justify-between gap-2 pb-4 border-b border-surface-container">
          <h3 id={titleId} className="font-headline-sm text-[17px] lg:text-[18px] font-bold text-on-surface">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="-mr-2 w-11 h-11 shrink-0 flex items-center justify-center rounded-lg text-outline hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {children}

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 py-3 min-h-[44px] rounded-xl bg-primary text-on-primary font-headline-sm text-[14px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export const Footer: React.FC = () => {
  const [openModal, setOpenModal] = useState<FooterModalId | null>(null);
  const close = () => setOpenModal(null);

  return (
    <>
      <footer className="w-full bg-surface-container-high border-t border-surface-container text-on-surface-variant font-body-sm text-[13px] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* 진료·장비 구성 (제조사 상표 대신 일반 명칭 — 가상 병원에 실존 제조사 공인 표기를 붙이지 않는다) */}
          <div className="pb-12 border-b border-surface-container/80 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-secondary">
                펨토초 레이저 시력교정 센터
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-primary">
                안내렌즈삽입술 전담 센터
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-tertiary">
                3D 각막 단층 정밀 진단
              </span>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-lowest flex items-center justify-center text-center border border-surface-container shadow-xs">
              <span className="font-label-caps text-[11px] font-bold text-on-surface">
                프리미엄 인공수정체 진료
              </span>
            </div>
          </div>

          {/* Main Footer Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-07.png"
                  alt="Prime Vision Eye Clinic Logo"
                  className="h-6 w-auto object-contain"
                 referrerPolicy="no-referrer" />
                <span className="font-headline-sm text-[16px] font-bold text-on-surface">
                  프라임 스마트 아이 안과의원
                </span>
              </div>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                대표원장: 강현우, 윤소희 (예시 인물) | 사업자등록번호: 000-00-00000 (예시)<br />
                의료기관명칭: 프라임스마트아이안과의원 | 의료기관 개설신고번호: 제0000-000-0000-00000호 (예시)<br />
                소재지: 서울특별시 강남구 테헤란로 124 프라임 메디컬 타워 4~7층 (예시 주소)<br />
                대표전화: 02-0000-0000 | 팩스: 02-0000-0000
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-2">
              <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                진료 안내 및 수술 후 케어
              </span>
              <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                평일 09:30 ~ 18:30 (금요일 야간 20:30까지)<br />
                토요일 09:00 ~ 16:00 (점심시간 없음)<br />
                점심시간 13:00 ~ 14:00 (월~금)<br />
                일요일 및 공휴일 휴진 (수술 후 응급 문의 전용 핫라인 24시간 운영)
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-3">
              <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                고객 편의 및 규정
              </span>
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => setOpenModal('price')}
                  className="flex items-center text-left min-h-[44px] text-primary hover:underline font-semibold cursor-pointer"
                >
                  비급여 진료비 고지 안내
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal('privacy')}
                  className="flex items-center text-left min-h-[44px] text-on-surface-variant hover:text-on-surface hover:underline cursor-pointer"
                >
                  개인정보처리방침
                </button>
                {/* 예전에는 링크처럼 생긴 <span> 이라 눌러도 아무 일도 없었다 — 실제 내용을 붙였다 */}
                <button
                  type="button"
                  onClick={() => setOpenModal('rights')}
                  className="flex items-center text-left min-h-[44px] text-on-surface-variant hover:text-on-surface hover:underline cursor-pointer"
                >
                  환자 권리 &amp; 수술 주의사항
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-surface-container flex flex-col gap-4 text-[12px] text-outline">
            <p className="leading-relaxed break-keep text-on-surface-variant"><SampleFooterNote /></p>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
              <p>Designed for Patient Safety &amp; Optical Precision</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 비급여 진료비용 고지 */}
      <FooterModal
        open={openModal === 'price'}
        onClose={close}
        size="lg"
        title="비급여 진료비용 고지 (의료법 제45조)"
      >
        <div className="py-5 overflow-x-auto">
          <table className="w-full text-left font-body-sm text-[13px] min-w-[520px]">
            <thead className="bg-surface-container-low text-on-surface font-semibold">
              <tr>
                <th className="p-3">항목</th>
                <th className="p-3">세부 내역</th>
                <th className="p-3">비용 (양안 기준, VAT 포함)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              <tr>
                <td className="p-3 font-medium">렌티큘 추출술 (KLEx)</td>
                <td className="p-3 text-on-surface-variant">자동 중심 정렬 · 난시축 보정 적용</td>
                <td className="p-3 font-label-numeric font-bold text-primary">2,600,000원 ~ 3,100,000원</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">토포가이드 맞춤 라식</td>
                <td className="p-3 text-on-surface-variant">각막 미세 지형도 맞춤 절삭</td>
                <td className="p-3 font-label-numeric font-bold text-primary">1,900,000원 ~ 2,400,000원</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">안내렌즈삽입술</td>
                <td className="p-3 text-on-surface-variant">난시 교정 유무에 따라 차등</td>
                <td className="p-3 font-label-numeric font-bold text-primary">4,300,000원 ~ 5,200,000원</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">프리미엄 노안 · 백내장 다초점</td>
                <td className="p-3 text-on-surface-variant">인공수정체 종류에 따라 차등 (단안 기준)</td>
                <td className="p-3 font-label-numeric font-bold text-primary">2,500,000원 ~ 3,600,000원</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">50단계 정밀 안종합 검진비</td>
                <td className="p-3 text-on-surface-variant">수술 여부와 무관하게 동일하게 청구</td>
                <td className="p-3 font-label-numeric font-bold text-primary">100,000원</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-body-sm text-[12px] text-outline leading-relaxed">
          ※ 위 금액은 <strong>샘플용 예시</strong>이며 실제 진료비가 아닙니다. 환자의 각막 두께, 난시 정도, 동공
          크기 및 선택하시는 인공수정체 종류에 따라 최종 비용은 달라질 수 있습니다. 모든 수술에는 부작용이 따를
          수 있으므로 진료 시 충분히 상담하시기 바랍니다.
        </p>
      </FooterModal>

      {/* 개인정보 처리방침 */}
      <FooterModal open={openModal === 'privacy'} onClose={close} title="개인정보 처리방침 요약">
        <div className="py-4 space-y-3 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
          <p className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface">
            샘플 사이트입니다 — 이 화면의 어떤 폼도 실제로 개인정보를 수집하지 않으며, 입력하신 내용은 어디에도
            저장 · 전송되지 않습니다. 아래는 실제 사이트에 들어갈 내용의 예시입니다.
          </p>
          <p>
            프라임스마트아이안과의원은 개인정보 보호법 및 의료법에 따라 진료 예약 및 환자 상담 목적 이외에는
            수집한 정보를 활용하거나 제3자에게 제공하지 않습니다.
          </p>
          <p>
            <strong>1. 수집 항목:</strong> 성명, 연락처, 희망 진료 및 예약 일시, 진료 관련 상담 내용
          </p>
          <p>
            <strong>2. 보유 및 이용 기간:</strong> 의료법 시행규칙에 따른 진료 기록 보존 기간 및 상담 관리 목적
            달성 시까지
          </p>
          <p>
            <strong>3. 동의를 거부할 권리:</strong> 수집에 동의하지 않으실 수 있으며, 이 경우 온라인 예약 접수가
            제한될 수 있습니다.
          </p>
        </div>
      </FooterModal>

      {/* 환자 권리 & 수술 주의사항 */}
      <FooterModal open={openModal === 'rights'} onClose={close} title="환자 권리 · 수술 주의사항">
        <div className="py-4 space-y-4 font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
          <div>
            <strong className="block text-on-surface mb-1">환자의 권리</strong>
            <ul className="space-y-1 list-disc pl-4">
              <li>진료 방법, 예상되는 결과와 부작용, 비용을 설명받고 스스로 선택할 권리</li>
              <li>수술 동의 이후에도 마음을 바꾸어 수술을 취소할 권리</li>
              <li>본인의 진료 기록 열람 및 사본 발급을 요청할 권리</li>
              <li>진료 과정에서 알게 된 개인정보와 신체의 비밀을 보호받을 권리</li>
            </ul>
          </div>
          <div>
            <strong className="block text-on-surface mb-1">수술 전 · 후 주의사항</strong>
            <ul className="space-y-1 list-disc pl-4">
              <li>
                정확한 각막 곡률 측정을 위해 소프트렌즈는 최소 3일, 난시교정용 · 하드렌즈는 최소 7일간 착용을
                중단한 뒤 내원해 주세요.
              </li>
              <li>수술 당일에는 눈 화장과 향수를 피하시고, 보호자와 함께 내원하시기를 권합니다.</li>
              <li>수술 직후 일시적인 눈부심 · 빛번짐 · 안구건조 · 시야 흐림이 나타날 수 있습니다.</li>
              <li>
                드물게 감염, 각막 확장증, 교정 부족 또는 과교정으로 재수술이 필요할 수 있으며, 회복 속도와 최종
                시력에는 개인차가 있습니다.
              </li>
              <li>수술 후 정해진 경과 관찰 일정과 안약 점안 지시를 반드시 지켜 주세요.</li>
            </ul>
          </div>
          <p className="text-[12px] text-outline">
            ※ 위 내용은 샘플용 일반 안내이며, 개별 환자에게 적용되는 적응증과 주의사항은 진료 시 담당 의료진의
            설명을 따라야 합니다.
          </p>
        </div>
      </FooterModal>
    </>
  );
};
