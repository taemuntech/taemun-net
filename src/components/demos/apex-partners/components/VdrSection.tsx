'use client';

import { useState, FormEvent } from 'react';
import { ShieldCheck, Fingerprint, History, Lock } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

const INSTITUTION_TYPES = [
  { id: 'pension', label: '국공립 연기금/공제회' },
  { id: 'bank', label: '시중은행 / 보험사' },
  { id: 'family', label: '단일 패밀리오피스' },
  { id: 'sovereign', label: '해외 국부펀드 (SWF)' },
  { id: 'securities', label: '종투사 / 증권사 IB' },
  { id: 'other', label: '기타 적격 전문투자자' },
];

export default function VdrSection() {
  const [selectedType, setSelectedType] = useState('pension');
  const [targetVintage, setTargetVintage] = useState(
    'Apex Flagship Buyout Fund VII호 (목표 결성액 ₩8,000억)'
  );
  const [institutionName, setInstitutionName] = useState('');
  const [titleDept, setTitleDept] = useState('');
  const [fullName, setFullName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [ndaAgreed, setNdaAgreed] = useState(false);

  // 샘플이라 VDR 접근 신청을 받지 않는다 — 가짜 접수 문구·「2시간 내 발송」 대신 공용 안내(SampleNotice)만 연다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ndaAgreed) return;

    setIsNoticeOpen(true);
    setInstitutionName('');
    setTitleDept('');
    setFullName('');
    setCorporateEmail('');
    setNdaAgreed(false);
  };

  return (
    <section
      className="py-20 bg-[#090e17] border-t border-[#4d4635]/20 relative scroll-mt-24"
      id="vdr"
    >
      <div className="max-w-[1680px] mx-auto px-6 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Security Protocols & Accreditation */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161c24] border border-[#f2ca50]/40 w-fit">
              <Lock className="w-3.5 h-3.5 text-[#f2ca50]" />
              <span className="font-mono-metric text-[11px] text-[#f2ca50] tracking-widest uppercase">
                AIR-GAPPED LP DATA ROOM
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif-display text-[#dee2ef]">
              기관투자자(LP) 전용 <br />
              가상 데이터룸(VDR) 신청
            </h2>

            <p className="text-sm lg:text-base text-[#d0c5af]/90 leading-relaxed">
APEX PARTNERS의 펀드 운용 내역, 감사 보고서, 포트폴리오 기업 실사(DD) 자료를 금융권 수준의 보안 규격과 다중 인증 아래 제공하는 화면 설정입니다 (가상 브랜드 샘플 — 실제로 동작하는 데이터룸이 아닙니다).
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3 p-3.5 bg-[#161c24] border border-[#4d4635]/30 rounded">
                <Fingerprint className="w-6 h-6 text-[#f2ca50] flex-shrink-0" />
                <div>
                  <span className="text-xs lg:text-sm text-[#dee2ef] font-semibold block">
                    일회용 기관 OTP &amp; 토큰 인증
                  </span>
                  <span className="font-mono-metric text-[11px] text-[#d0c5af]">
                    사전 인가된 적격 기관투자자 도메인만 열람 가능
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-[#161c24] border border-[#4d4635]/30 rounded">
                <History className="w-6 h-6 text-[#4edea3] flex-shrink-0" />
                <div>
                  <span className="text-xs lg:text-sm text-[#dee2ef] font-semibold block">
                    블록체인 타임스탬프 감사 추적
                  </span>
                  <span className="font-mono-metric text-[11px] text-[#d0c5af]">
                    열람 로그 보존 및 동적 워터마킹 적용 설정
                  </span>
                </div>
              </div>
            </div>

            <div className="font-mono-metric text-[11px] text-[#d0c5af]/70 mt-2">
              * 샘플 화면이라 실제 적격성 심사·데이터룸 접근은 이뤄지지 않습니다.
            </div>
          </div>

          {/* Right Column: 3-Step Institutional VDR Request Form */}
          <div className="lg:col-span-7 bg-[#161c24] border border-[#4d4635]/40 rounded-xl p-6 lg:p-10 shadow-2xl relative">
            {/* 375 에서 배지가 제목을 파고들어 「…신청」/「서」로 쪼개졌다 — 좁은 폭에서는 위아래로 나눈다 */}
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 mb-6 pb-4 border-b border-[#4d4635]/30">
              <h3 className="font-serif-display text-xl lg:text-2xl text-[#dee2ef] [word-break:keep-all]">
                기관 적격성 심사 및 접근권한 신청서
              </h3>
              <span className="font-mono-metric text-[11px] text-[#f2ca50] font-normal whitespace-nowrap">
                SAMPLE · NO DATA SENT
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* 1. Institution Type Radio Group */}
              <div>
                <label className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-2">
                  1. 기관 유형 선택 (Institution Type)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {INSTITUTION_TYPES.map((type) => {
                    const isChecked = selectedType === type.id;
                    return (
                      <label
                        key={type.id}
                        className={`flex items-center gap-2 p-3 min-h-11 rounded font-mono-metric text-[11px] cursor-pointer transition-all border ${ isChecked ? 'bg-[#090e17] border-[#f2ca50] text-[#f2ca50]' : 'bg-[#090e17] border-[#4d4635]/40 text-[#d0c5af] hover:border-[#f2ca50]/50' }`}
                      >
                        <input
                          type="radio"
                          name="lp_type"
                          value={type.id}
                          checked={isChecked}
                          onChange={() => setSelectedType(type.id)}
                          className="text-[#f2ca50] focus:ring-[#f2ca50] accent-[#f2ca50]"
                        />
                        <span>{type.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 2. Target Vintage */}
              <div>
                <label
                  htmlFor="vdr-target-vintage"
                  className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1.5"
                >
                  2. 관심 펀드 빈티지 (Target Fund Vintage)
                </label>
                <select
                  id="vdr-target-vintage"
                  value={targetVintage}
                  onChange={(e) => setTargetVintage(e.target.value)}
                  className="w-full min-h-11 bg-[#090e17] border border-[#4d4635]/40 rounded px-3 py-2.5 text-xs text-[#dee2ef] focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] outline-none"
                >
                  <option>Apex Flagship Buyout Fund VII호 (목표 결성액 ₩8,000억)</option>
                  <option>Apex Deep-Tech Growth Equity Fund III호 (목표 결성액 ₩4,000억)</option>
                  <option>Cross-Border Special Situations &amp; Infra II호</option>
                  <option>단독 포트폴리오 코인베스트먼트 (Co-Investment Project)</option>
                </select>
              </div>

              {/* 3. Key Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="vdr-institution-name"
                    className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1.5"
                  >
                    기관명 (Institution Legal Name)
                  </label>
                  <input
                    id="vdr-institution-name"
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="예: ○○공제회 / ○○생명"
                    className="w-full min-h-11 bg-[#090e17] border border-[#4d4635]/40 rounded px-3 py-2 text-xs text-[#dee2ef] placeholder-[#d0c5af]/50 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vdr-title-dept"
                    className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1.5"
                  >
                    담당 부서 및 직책 (Title / Dept)
                  </label>
                  <input
                    id="vdr-title-dept"
                    type="text"
                    required
                    value={titleDept}
                    onChange={(e) => setTitleDept(e.target.value)}
                    placeholder="예: 대체투자본부 팀장 / 운용역"
                    className="w-full min-h-11 bg-[#090e17] border border-[#4d4635]/40 rounded px-3 py-2 text-xs text-[#dee2ef] placeholder-[#d0c5af]/50 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="vdr-full-name"
                    className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1.5"
                  >
                    담당자 성함 (Full Name)
                  </label>
                  <input
                    id="vdr-full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="성함을 입력하세요"
                    className="w-full min-h-11 bg-[#090e17] border border-[#4d4635]/40 rounded px-3 py-2 text-xs text-[#dee2ef] placeholder-[#d0c5af]/50 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vdr-corporate-email"
                    className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-1.5"
                  >
                    공식 기관 이메일 (Official Corporate Email)
                  </label>
                  <input
                    id="vdr-corporate-email"
                    type="email"
                    required
                    value={corporateEmail}
                    onChange={(e) => setCorporateEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full min-h-11 bg-[#090e17] border border-[#4d4635]/40 rounded px-3 py-2 text-xs text-[#dee2ef] placeholder-[#d0c5af]/50 focus:border-[#f2ca50] focus:ring-1 focus:ring-[#f2ca50] outline-none"
                  />
                </div>
              </div>

              {/* NDA Consent */}
              <div className="p-3 bg-[#090e17] border border-[#4d4635]/30 rounded flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="nda-agree"
                  required
                  checked={ndaAgreed}
                  onChange={(e) => setNdaAgreed(e.target.checked)}
                  className="mt-0.5 text-[#f2ca50] focus:ring-[#f2ca50] accent-[#f2ca50] rounded cursor-pointer"
                />
                <label
                  htmlFor="nda-agree"
                  className="text-xs text-[#d0c5af] leading-relaxed cursor-pointer select-none"
                >
                  [필수] 표준 비밀유지협약(NDA) 조건에 동의하며, 발급받은 일회용 VDR 접근 권한을 제3자에게 양도 및 재배포하지 않을 것을 서약합니다.
                </label>
              </div>

              {/* 제출 전 고지 — 흐린 잔글씨로 두지 않는다(읽혀야 의미가 있다) */}
              <div className="p-3.5 bg-[#1a2029] border border-[#f2ca50]/40 rounded text-xs text-[#dee2ef] leading-relaxed">
                샘플 사이트입니다 — 입력하신 내용은 어디에도{' '}
                <strong className="font-bold text-[#f2ca50]">전송되지 않습니다</strong>. 실제 VDR 접근 신청은 접수되지 않습니다.
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full min-h-12 px-4 py-3 bg-[#f2ca50] hover:bg-[#e9c349] text-[#3c2f00] text-xs font-semibold rounded shadow-md hover:shadow-[#f2ca50]/30 transition-all flex items-center justify-center gap-2 text-center"
              >
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>기관 적격성 심사 및 VDR 접근 신청</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="apex-partners"
        industry="corporate"
        featureName="기관투자자(LP) VDR 접근 신청 폼"
      />
    </section>
  );
}
