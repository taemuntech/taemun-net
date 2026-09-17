import React, { useState } from 'react';
import { ProcedureTab, Language } from '../types';
import { OUTCOME_DISCLAIMER } from '../constants';

interface ProcedureComparisonProps {
  language: Language;
}

export const ProcedureComparison: React.FC<ProcedureComparisonProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<ProcedureTab>('smile');

  return (
    <section id="procedure-comparison" className="w-full py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 lg:mb-12">
          <div className="break-keep">
            <div className="flex items-center gap-2 text-primary font-label-caps text-[11px] font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>NEXT-GENERATION REFRACTIVE SURGERY</span>
            </div>
            <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight leading-snug">
              {language === 'KR' ? '렌티큘 추출술 · 라식 · 라섹 비교' : 'Lenticule Extraction vs LASIK vs LASEK'}
            </h2>
            <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
              {language === 'KR'
                ? '본원에서 시행하는 세 가지 시력교정 방식의 절개 형태 · 회복 기간 · 주의사항을 같은 기준으로 정리했습니다. 어떤 방식이 적합한지는 정밀 검진 결과에 따라 달라집니다.'
                : 'The three refractive procedures offered here, compared on incision type, recovery time, and precautions. Suitability depends on your examination results.'}
            </p>
          </div>

          {/* Interactive Switching Tabs */}
          <div className="max-w-full overflow-x-auto pb-1 lg:pb-0">
            <div className="inline-flex p-1.5 rounded-xl bg-surface-container-highest shadow-inner whitespace-nowrap">
              <button
                type="button"
                onClick={() => setActiveTab('smile')}
                className={`px-3.5 lg:px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-headline-sm text-[13px] lg:text-[15px] transition-all cursor-pointer ${
                  activeTab === 'smile'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                렌티큘 추출술
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lasik')}
                className={`px-3.5 lg:px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-headline-sm text-[13px] lg:text-[15px] transition-all cursor-pointer ${
                  activeTab === 'lasik'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                기존 라식 (LASIK)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('lasek')}
                className={`px-3.5 lg:px-4 py-2 min-h-[44px] inline-flex items-center rounded-lg font-headline-sm text-[13px] lg:text-[15px] transition-all cursor-pointer ${
                  activeTab === 'lasek'
                    ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-medium'
                }`}
              >
                기존 라섹 (LASEK)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content: Lenticule Extraction */}
        {activeTab === 'smile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn break-keep">
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
                    펨토초 레이저
                  </span>
                  <span className="font-label-numeric text-[13px] text-tertiary font-semibold">
                    Lenticule Extraction
                  </span>
                </div>
                <h3 className="font-headline-lg text-[22px] lg:text-[26px] text-on-surface font-bold mb-3 leading-snug">
                  수 초 조사 · 2mm 미세 절개 · 각막 절편 미생성
                </h3>
                <p className="font-body-md text-[15px] text-on-surface-variant leading-relaxed mb-6">
                  각막 상피를 벗기거나 각막 뚜껑(절편)을 만들지 않고, 수 초 단위로 각막 내부에서 렌티큘(Lenticule)만을 미세 분리하여 2mm 미세창으로 추출합니다. 절편을 만들지 않아 외부 충격에 상대적으로 유리하며, 운동선수 · 군인 · 승무원 등 활동량이 많은 분들이 많이 선택합니다.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">레이저 조사 시간</span>
                    <div className="font-label-numeric text-[20px] lg:text-[24px] font-bold text-primary mt-1">수 초</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">각막 절개창 크기</span>
                    <div className="font-label-numeric text-[20px] lg:text-[24px] font-bold text-primary mt-1">2.0 mm</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">일상 복귀 시점</span>
                    <div className="font-label-numeric text-[18px] lg:text-[22px] font-bold text-primary mt-1">수술 다음 날</div>
                  </div>
                </div>

                {/* Key laser alignment chips */}
                <div className="p-4 rounded-xl bg-surface-container-high/80 border border-primary/20 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-primary font-headline-sm text-[14px] lg:text-[15px] font-semibold">
                    <span className="material-symbols-outlined text-[20px]">hub</span>
                    <span>듀얼 센서 자동 보정 기술 탑재</span>
                  </div>
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                    <strong>자동 중심 정렬:</strong> 환자가 누웠을 때 변하는 동공 시축 중심을 밀리미터 이하로 감지해 자동 고정.<br />
                    <strong>난시축 자동 보정:</strong> 자세에 따라 눈이 미세하게 돌아가는 회선(Torsion)을 자동 회전 보정하여 난시 교정 정밀도를 높입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Incision Diagram & Visual Spec */}
            <div className="lg:col-span-5 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
              <div>
                <span className="font-headline-sm text-[18px] font-bold text-on-surface mb-2 block">
                  각막 절개창 크기 직관 비교
                </span>
                <p className="font-body-sm text-[13px] text-on-surface-variant mb-6 leading-relaxed">
                  절개창이 작을수록 각막 표면의 지각 신경이 덜 끊겨, 수술 후 안구건조 증상이 비교적 적게 보고됩니다. 다만 정도는 개인차가 있습니다.
                </p>

                {/* SVG Visual Demonstration */}
                <div className="w-full bg-surface-container-low rounded-xl p-6 flex flex-col items-center justify-center border border-surface-container/70">
                  <svg className="w-full max-w-[280px] text-primary" fill="none" viewBox="0 0 320 180">
                    {/* Cornea Dome */}
                    <path
                      className="text-outline-variant"
                      d="M 40 140 A 130 110 0 0 1 280 140"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    {/* Lenticule Shape */}
                    <path
                      className="text-primary-container/40"
                      d="M 110 95 Q 160 85 210 95 Q 160 108 110 95"
                      fill="#0ea5e9"
                      fillOpacity="0.35"
                    />
                    {/* 2mm Micro Incision Marker */}
                    <path d="M 120 70 L 135 68" stroke="#0ea5e9" strokeLinecap="round" strokeWidth="4" />
                    <circle cx="127" cy="69" fill="#006591" r="4" />
                    {/* Laser line indicator */}
                    <line stroke="#0ea5e9" strokeDasharray="4 3" strokeWidth="2" x1="160" x2="160" y1="20" y2="85" />
                  </svg>
                  <div className="flex items-center gap-3 mt-4 text-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-caps text-[11px] font-bold shadow-sm">
                      렌티큘 추출술: 2mm 미세 절개 (각막 표면 신경 보존에 유리)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-[13px]">
                <span>수술 후 보호렌즈 착용:</span>
                <span className="font-bold text-primary">일반적으로 불필요</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: LASIK */}
        {activeTab === 'lasik' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn break-keep">
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] font-bold">
                    전통적 시력교정
                  </span>
                  <span className="font-label-numeric text-[13px] text-outline font-semibold">
                    Flap Creation Technique
                  </span>
                </div>
                <h3 className="font-headline-lg text-[22px] lg:text-[26px] text-on-surface font-bold mb-3 leading-snug">
                  약 20mm 원형 각막 절편(Flap) 생성 후 레이저 절삭
                </h3>
                <p className="font-body-md text-[15px] text-on-surface-variant leading-relaxed mb-6">
                  각막 표면을 20mm가량 동그랗게 잘라 뚜껑(절편)을 젖힌 후 내부 실질을 레이저로 깎고 다시 덮는 방식입니다. 시력 회복은 빠르나 외부 강한 충격 시 절편이 밀릴 위험이 있어 격렬한 운동 시 주의가 필요합니다.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">레이저 조사 시간</span>
                    <div className="font-label-numeric text-[20px] lg:text-[24px] font-bold text-on-surface mt-1">20~30초</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">각막 절개창 크기</span>
                    <div className="font-label-numeric text-[20px] lg:text-[24px] font-bold text-error mt-1">약 20.0 mm</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">격렬한 운동 제한</span>
                    <div className="font-label-numeric text-[18px] lg:text-[22px] font-bold text-on-surface mt-1">2~3주 제한</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container">
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                    ※ 절개 단면이 넓어 각막 표면 지각 신경이 일시적으로 차단되어 수술 초기 1~3개월간 안구 건조 증상이 상대적으로 빈번하게 발생할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
              <div>
                <span className="font-headline-sm text-[18px] font-bold text-on-surface mb-2 block">
                  라식 각막 절편 생성 다이어그램
                </span>
                <p className="font-body-sm text-[13px] text-on-surface-variant mb-6 leading-relaxed">
                  원형 20mm 절편 생성으로 각막 구조적 안정성이 다소 저하될 수 있습니다.
                </p>

                <div className="w-full bg-surface-container-low rounded-xl p-6 flex flex-col items-center justify-center border border-surface-container/70">
                  <svg className="w-full max-w-[280px] text-outline" fill="none" viewBox="0 0 320 180">
                    <path
                      className="text-outline-variant"
                      d="M 40 140 A 130 110 0 0 1 280 140"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <path d="M 65 115 C 90 60 230 60 255 115" stroke="#ba1a1a" strokeDasharray="6 3" strokeWidth="3" />
                    <path d="M 70 100 Q 160 40 250 85" stroke="#ba1a1a" strokeWidth="2" />
                  </svg>
                  <div className="flex items-center gap-3 mt-4 text-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-error-container text-on-error-container font-label-caps text-[11px] font-bold">
                      라식: 20mm 대형 원형 절편 (충격 주의)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-[13px]">
                <span>수술 후 보호렌즈 착용:</span>
                <span className="font-medium text-on-surface">선택적 착용</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: LASEK */}
        {activeTab === 'lasek' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn break-keep">
            <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] font-bold">
                    각막 표면 절삭술
                  </span>
                  <span className="font-label-numeric text-[13px] text-outline font-semibold">
                    Surface Ablation
                  </span>
                </div>
                <h3 className="font-headline-lg text-[22px] lg:text-[26px] text-on-surface font-bold mb-3 leading-snug">
                  각막 상피층 제거 후 엑시머 레이저로 직접 실질 절삭
                </h3>
                <p className="font-body-md text-[15px] text-on-surface-variant leading-relaxed mb-6">
                  각막 가장 바깥쪽 상피를 약품이나 브러시로 벗겨낸 후 레이저로 도수를 교정합니다. 잔여 각막 두께를 많이 남길 수 있어 얇은 각막에도 적용 범위가 넓은 반면, 상피가 다시 자라는 3~5일 동안 통증과 눈부심이 동반될 수 있습니다.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">레이저 조사 시간</span>
                    <div className="font-label-numeric text-[20px] lg:text-[24px] font-bold text-on-surface mt-1">30~50초</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">각막 상피 제거 범위</span>
                    <div className="font-label-numeric text-[20px] lg:text-[24px] font-bold text-error mt-1">표면 전체 박리</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <span className="font-label-caps text-[11px] text-on-surface-variant">통증 및 회복 기간</span>
                    <div className="font-label-numeric text-[18px] lg:text-[22px] font-bold text-error mt-1">3~7일 소요</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-high/60 border border-surface-container">
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                    ※ 상피 재생 완료 시까지 최소 5일간 치료용 특수 보호렌즈 착용이 필수적이며, 장기적인 스테로이드 안약 점안을 통한 각막 혼탁 예방이 필요합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
              <div>
                <span className="font-headline-sm text-[18px] font-bold text-on-surface mb-2 block">
                  라섹 상피 박리 다이어그램
                </span>
                <p className="font-body-sm text-[13px] text-on-surface-variant mb-6 leading-relaxed">
                  재생 과정에서 신경이 노출돼 통증과 눈부심이 동반될 수 있습니다.
                </p>

                <div className="w-full bg-surface-container-low rounded-xl p-6 flex flex-col items-center justify-center border border-surface-container/70">
                  <svg className="w-full max-w-[280px] text-outline" fill="none" viewBox="0 0 320 180">
                    <path
                      className="text-outline-variant"
                      d="M 40 140 A 130 110 0 0 1 280 140"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <path d="M 90 98 C 120 70 200 70 230 98" stroke="#ba1a1a" strokeDasharray="2 3" strokeWidth="3" />
                    <line stroke="#006591" strokeWidth="2" x1="140" x2="150" y1="20" y2="85" />
                    <line stroke="#006591" strokeWidth="2" x1="160" x2="160" y1="20" y2="87" />
                    <line stroke="#006591" strokeWidth="2" x1="180" x2="170" y1="20" y2="85" />
                  </svg>
                  <div className="flex items-center gap-3 mt-4 text-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-label-caps text-[11px] font-bold">
                      라섹: 상피 박리 (3~5일 회복 기간)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-[13px]">
                <span>수술 후 보호렌즈 착용:</span>
                <span className="font-bold text-error">5일간 필수 착용</span>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Matrix Table */}
        <div className="mt-12 bg-surface-container-lowest rounded-2xl p-6 shadow-sm overflow-x-auto border border-surface-container/50">
          <h4 className="font-headline-sm text-[18px] text-on-surface font-bold mb-1">
            수술별 한눈에 보는 비교표
          </h4>
          <p className="font-body-sm text-[12px] text-on-surface-variant mb-4 leading-relaxed break-keep">
            본원에서 시행하는 세 가지 방식을 같은 항목으로 비교한 일반적인 안내이며, 특정 시술이 다른 시술보다 우수하다는 뜻이 아닙니다. 수치와 기간은 예시이고 개인차가 있습니다.
          </p>
          <table className="w-full text-left font-body-sm text-[14px] min-w-[620px]">
            <thead>
              <tr className="bg-surface-container-low text-on-surface font-semibold">
                <th className="p-3.5 rounded-l-lg">구분</th>
                <th className="p-3.5 text-primary font-bold">렌티큘 추출술 (KLEx)</th>
                <th className="p-3.5">기존 라식</th>
                <th className="p-3.5 rounded-r-lg">기존 라섹</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              <tr>
                <td className="p-3.5 font-medium text-on-surface">단안 레이저 시간</td>
                <td className="p-3.5 font-label-numeric font-bold text-primary">수 초 단위</td>
                <td className="p-3.5 font-label-numeric text-on-surface-variant">약 20초~30초</td>
                <td className="p-3.5 font-label-numeric text-on-surface-variant">약 30초~50초</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-on-surface">각막 절개 크기</td>
                <td className="p-3.5 font-label-numeric font-bold text-primary">2.0mm 미세 절개창</td>
                <td className="p-3.5 font-label-numeric text-on-surface-variant">약 20mm (원형 절편)</td>
                <td className="p-3.5 font-label-numeric text-on-surface-variant">상피 전체 박리</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-on-surface">수술 중 · 후 통증</td>
                <td className="p-3.5 font-bold text-primary">수술 중 압박감 위주</td>
                <td className="p-3.5 text-on-surface-variant">당일 2~3시간 시림</td>
                <td className="p-3.5 text-error font-medium">3~5일간 통증 · 눈물</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-on-surface">일상 복귀 및 세안</td>
                <td className="p-3.5 font-bold text-primary">다음 날부터 (의료진 안내에 따름)</td>
                <td className="p-3.5 text-on-surface-variant">3일 후 가벼운 세안</td>
                <td className="p-3.5 text-on-surface-variant">5~7일 후 렌즈 제거 후 세안</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-on-surface">외부 충격 안전성</td>
                <td className="p-3.5 font-bold text-primary">절편을 만들지 않음</td>
                <td className="p-3.5 text-error font-medium">주의 필요 (절편 밀림 가능)</td>
                <td className="p-3.5 font-medium text-on-surface">절편 없음</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-on-surface">안구건조증 유발률</td>
                <td className="p-3.5 font-bold text-primary">표면 신경 손상이 상대적으로 적음</td>
                <td className="p-3.5 text-on-surface-variant">초기 건조감 비교적 큼</td>
                <td className="p-3.5 text-on-surface-variant">보통 수준</td>
              </tr>
            </tbody>
          </table>
          <p className="font-body-sm text-[12px] text-outline mt-4 leading-relaxed break-keep">
            {OUTCOME_DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
};
