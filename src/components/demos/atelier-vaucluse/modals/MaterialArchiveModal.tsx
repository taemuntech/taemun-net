'use client';

import React from 'react';
import { X, Check } from 'lucide-react';
import { HERO_IMAGES } from '../data/projects';

interface MaterialArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

const MATERIALS_DATA = [
  {
    nameKr: '나보나 천연 트래버틴',
    nameEn: 'Navona Travertine Slab',
    origin: 'Italy (Tivoli)',
    finish: 'Honed / Vein-cut',
    description:
      '로마 건축의 영겁을 지탱해 온 다공성 석재로, 표면의 자연스러운 기공과 따뜻한 베이지 빛깔이 공간에 부드럽고 차분한 온기를 형성합니다.',
    usage: '아일랜드 카운터탑, 욕조 에이프런, 벽체 석재 패널',
    imageUrl: HERO_IMAGES.detail1.url,
  },
  {
    nameKr: '수작업 천연 미장 회벽',
    nameEn: 'Hand-applied Lime Plaster',
    origin: 'Belgium / France',
    finish: 'Tactile Matte Smooth',
    description:
      '인공 화학 도료 대신 석회와 천연 광물 안료를 배합하여 흙손(Trowel)으로 섬세하게 레이어링한 벽체 마감입니다. 습도 조절 능력이 뛰어나며 자연광의 확산이 아름답습니다.',
    usage: '거실 메인 벽체, 복도 벽면, 라운드 코너 천장',
    imageUrl: HERO_IMAGES.main.url,
  },
  {
    nameKr: '유러피안 광폭 화이트오크 & 훈증목',
    nameEn: 'European Prime White Oak',
    origin: 'Germany / Austria',
    finish: 'Natural Ultra-Matte Oil',
    description:
      '엄격하게 건조된 240mm 이상의 광폭 참나무 원목으로, 인위적인 코팅 광택 없이 목재 고유의 호흡과 결을 살려 발끝에 닿는 감촉이 탁월합니다.',
    usage: '원목 마루, 맞춤 주방 가구, 히든 도어 무늬목',
    imageUrl: HERO_IMAGES.detail2.url,
  },
  {
    nameKr: '정밀 벨기에 마이크로시멘트',
    nameEn: 'Seamless Micro-cement',
    origin: 'Belgium',
    finish: 'Silky Waterproof Matt',
    description:
      '줄눈(Grout) 없는 3mm 박막 미장 시스템으로 바닥과 벽체가 하나로 이어지는 모놀리식(Monolithic) 공간감을 연출합니다.',
    usage: '마스터 바스룸, 주방 바닥, 테라스 전환부',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTLcnuCkDatRqNrBpYy4ZyAGkKZJGfsTeMSjc_aLvASQtgnDGqUKqX98pOmU1EVNntHHsKIbd8qw3blYgomM-PoTT4IrLO1noZoT2yvM1GevpDjuWbX3V2_5sENeOsKS_2bv0e8i0XZ1RfWe7zmvFu-U3xsTsTMMNYe6AeSBpTdJ2MZ0EmWYCEiY_oBDXD4ngRqUOke4F1dTfwj1BkCemA1Tw8f0p-K5vVhSSJWoB7fLF0BWF3zvug',
  },
];

export const MaterialArchiveModal: React.FC<MaterialArchiveModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#faf9f7] rounded max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c8c7bf]/30 bg-[#faf9f7] sticky top-0 z-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#904b35] font-sans block">
              Atelier Material Archive
            </span>
            <h3 className="text-xl lg:text-2xl font-serif text-[#161714] break-keep [word-break:keep-all]">
              보클루즈 천연 소재 &amp; 마감재 라이브러리
            </h3>
          </div>

          <button
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] p-1.5 rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-8">
          <p className="text-sm text-[#474741] font-sans font-light leading-relaxed break-keep [word-break:keep-all]">
            아뜰리에 보클루즈는 합성 비닐 시트나 인공 유광 코팅제를 배제하고, 세월의 흐름에 따라 아름답게 숙성되는 영속적 천연 자재만을 고집합니다. 도산 쇼룸에서 모든 자재의 촉감을 직접 경험하실 수 있습니다.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MATERIALS_DATA.map((mat, i) => (
              <div
                key={i}
                className="bg-[#f4f3f1] rounded border border-[#c8c7bf]/30 overflow-hidden flex flex-col justify-between"
              >
                <div className="h-44 overflow-hidden bg-[#efeeec] relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={mat.imageUrl}
                    alt={mat.nameKr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#161714]/80 text-[#faf9f7] px-2.5 py-1 rounded text-[10px] tracking-wider uppercase font-sans">
                    {mat.origin}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-serif text-[#161714]">{mat.nameKr}</h4>
                    <span className="text-xs text-[#777770] font-sans block mb-2">{mat.nameEn}</span>
                    <p className="text-xs text-[#474741] leading-relaxed font-sans font-light">
                      {mat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#c8c7bf]/30 space-y-1.5 text-xs font-sans text-[#474741]">
                    <div className="flex justify-between">
                      <span className="text-[#777770]">가공 기법:</span>
                      <span className="text-[#161714] font-medium">{mat.finish}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#777770]">주요 적용:</span>
                      <span className="text-[#161714] font-medium">{mat.usage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#efeeec] p-5 rounded border border-[#c8c7bf]/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-sans text-[#161714]">
              <Check size={16} className="text-[#904b35]" />
              <span>원산지 인증서 및 친환경 자재 성적서 100% 교부</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="text-xs font-semibold uppercase tracking-wider text-[#904b35] hover:underline cursor-pointer"
            >
              쇼룸 방문 예약하기 &rarr;
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#c8c7bf]/30 bg-[#f4f3f1] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-6 py-2.5 rounded text-xs uppercase tracking-wider font-semibold font-sans transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
