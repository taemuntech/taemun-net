import React, { useState } from 'react';
import { HOSPITAL_IMAGES } from '../data/hospitalData';
import { PolicyKey, PolicyModal } from './modals/PolicyModal';

const POLICY_LINKS: Array<{ key: PolicyKey; label: string }> = [
  { key: 'terms', label: '이용약관' },
  { key: 'privacy', label: '개인정보처리방침' },
  { key: 'nonCovered', label: '비급여 진료비용' },
  { key: 'rights', label: '환자의 권리와 의무' },
];

export const Footer: React.FC = () => {
  const [openPolicy, setOpenPolicy] = useState<PolicyKey | null>(null);

  return (
    <footer className="w-full bg-[#102a20] text-[#e9e8e5] pt-14 pb-10 border-t border-[#264035]">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#264035]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="본초 통합한방병원 엠블럼"
                className="h-9 w-auto brightness-0 invert"
                src={HOSPITAL_IMAGES.emblem}
              />
              <div>
                <div className="font-serif text-[18px] text-white font-bold">
                  본초 통합한방병원
                </div>
                <div className="text-[11px] text-[#8fab9d] tracking-widest uppercase">
                  Boncho Integrative Medicine Hospital
                </div>
              </div>
            </div>

            <p className="text-[13px] text-[#b0cdbe] leading-relaxed break-keep">
              비움과 채움의 치유 미학. 80병상 입원 병동을 갖춘 의·한의 통합 진료 병원으로, 치료 기간과 회복기를 함께 보내는 것을 일로 삼습니다.
            </p>

            <div className="flex items-center gap-3 text-[12px] text-[#cbe9da] break-keep">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>의·한의 협진 80병상</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">local_pharmacy</span>
                <span>hGMP 규격 약재 사용 (예시 표기)</span>
              </span>
            </div>
          </div>

          {/* Col 2: Clinic Hours */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-[16px] text-white font-bold">
              진료 시간 및 입원 수속 안내
            </h4>
            <div className="text-[13px] space-y-1.5 text-[#e9e8e5]">
              <div className="flex justify-between">
                <span className="text-[#8fab9d]">평일 외래 진료</span>
                <span className="font-medium text-white">09:00 ~ 20:00 (야간진료 시행)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8fab9d]">토·일·공휴일 진료</span>
                <span className="font-medium text-white">09:00 ~ 17:00 (점심시간 없음)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8fab9d]">평일 점심시간</span>
                <span className="font-medium text-white">13:00 ~ 14:00</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#264035]">
                <span className="text-[#ffd9b4] font-semibold">365일 24시간 입원실</span>
                <span className="font-bold text-[#ffd9b4]">당직의 및 전담 간호사 24h 상주</span>
              </div>
            </div>
          </div>

          {/* Col 3: Contact & Direct Inquiries */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-[16px] text-white font-bold">
              24시간 직통 상담 &amp; 고객지원
            </h4>
            <div className="space-y-2 text-[13px]">
              <div>
                <span className="text-[#8fab9d] text-[11px] block">24시간 입원 상담 직통</span>
                <a
                  href="tel:02-0000-0000"
                  className="font-bold text-[22px] text-white hover:text-[#cbe9da] transition-colors"
                >
                  02-0000-0000
                </a>
              </div>
              <div className="text-[#b0cdbe] text-[12px] space-y-0.5">
                <p>• 외래 진료 예약: 02-0000-0000</p>
                <p>• 원무과 / 팩스: 02-0000-0000</p>
                <p>• 긴급 앰뷸런스 이송 핫라인: 010-0000-0000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Registration & Disclaimer */}
        <div className="pt-6 space-y-3 text-[11px] text-[#8fab9d] leading-relaxed">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>의료기관명: 의료법인 본초의료재단 본초통합한방병원 (가상 브랜드)</span>
            <span>대표자: 정원석 (의사·한의사 복수면허 · 예시)</span>
            <span>사업자등록번호: 000-00-00000 (샘플용)</span>
            <span>의료기관 개설허가번호: 제0000-00000호 (예시)</span>
          </div>

          <p>
            소재지: 서울특별시 서초구 반포대로 180 (서초동, 본초빌딩 전관 1층~7층) | 개인정보보호책임자: 표기 자리 (예시)
          </p>

          <div className="bg-white/5 p-2.5 rounded-lg text-[#cbe9da] text-[11px] mb-3 border border-[#264035]">
            [포트폴리오 가상 시안 고지] 이 웹사이트는 태문 DEV STUDIO 가 제작한 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약이나 개인정보는 일절 수집·접수되지 않습니다.
          </div>
          {/* 예전 문구는 「모든 치료 후기와 전후 사례」를 준수해 작성했다고 적었는데, 이 화면에는 후기도 전후
              사진도 없다 — 없는 것을 있다고 고지하면 그 자체가 거짓 표시다. 실제로 지키는 내용만 남긴다. */}
          <p className="text-[#727974] pt-2 border-t border-[#264035]/60 break-keep">
            [의료광고 관련 고지] 의료법 제56조 제2항에 따라 이 웹사이트에는 치료경험담·환자 후기, 시술 전후
            비교 사진, 다른 의료기관과의 비교, 치료 효과를 단정하는 표현을 싣지 않습니다. 화면의 치료 소개는
            일반적인 안내이며, 개인의 체질과 기저 질환에 따라 경과가 다르고 부작용이 생길 수 있어 진료 전
            의료진과의 상담이 필요합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 pt-2 text-[#727974]">
            <div>© 2026 BONCHO INTEGRATIVE KOREAN MEDICINE HOSPITAL. ALL RIGHTS RESERVED.</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {POLICY_LINKS.map((link) => (
                <button
                  key={link.key}
                  type="button"
                  onClick={() => setOpenPolicy(link.key)}
                  className="hover:text-white underline underline-offset-2 max-lg:min-h-[44px] cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PolicyModal openKey={openPolicy} onClose={() => setOpenPolicy(null)} />
    </footer>
  );
};
