import SampleNotice from '@/components/demo-kit/SampleNotice';
import React, { useState, useEffect } from 'react';
import { CarrelSeat, ApplicationFormData } from '../types';
import { ShieldCheck, CheckCircle2, AlertCircle, Printer, FileText, ArrowRight } from 'lucide-react';

interface AdmissionAuditFormProps {
  selectedSeat: CarrelSeat | null;
}

export const AdmissionAuditForm: React.FC<AdmissionAuditFormProps> = ({
  selectedSeat,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    mobile: '',
    track: 'leet-sky',
    almaMater: '',
    gpa: '',
    englishScore: '',
    mockScore: '',
    carrelWing: 'zone-a',
    commencementDate: '2025-03',
    diagnosticMemo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submissionCode, setSubmissionCode] = useState('');
  const [submittedTime, setSubmittedTime] = useState('');
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  // Sync with seat selection from module III if user selected one
  useEffect(() => {
    if (selectedSeat) {
      const wingMap: Record<string, string> = {
        A: 'zone-a',
        B: 'zone-b',
        C: 'zone-c',
      };
      setFormData((prev) => ({
        ...prev,
        carrelWing: wingMap[selectedSeat.zone] || 'zone-a',
        selectedSeatId: selectedSeat.id,
      }));
    }
  }, [selectedSeat]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `APX-2025-${Math.floor(1000 + Math.random() * 9000)}X`;
    setSubmissionCode(randomCode);
    setSubmittedTime(new Date().toLocaleString('ko-KR'));
    setSubmitted(true);
    setIsNoticeOpen(true);

    // Smooth scroll to confirmation receipt
    setTimeout(() => {
      const banner = document.getElementById('submit-success-banner');
      if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 100);
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  return (
    <section
      id="audit-form"
      className="w-full px-4 lg:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 bg-[#eff4ff]"
    >
      {isNoticeOpen && (
        <SampleNotice
          open={isNoticeOpen}
          onClose={() => setIsNoticeOpen(false)}
          slug="apex-legal-cpa"
          industry="corporate"
          featureName="LEET·CPA 입학 사정 진단 및 1인 방음석 신청"
        />
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="font-label-sm text-xs text-[#45464d] uppercase tracking-widest">
              MODULE V // ADMISSION SCRUTINY PROTOCOL
            </span>
            <span className="text-[#45464d]">◆</span>
            <span className="font-label-sm text-xs text-[#cf6721] font-semibold uppercase">
              ACADEMIC AUDIT
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl lg:text-4xl text-[#0d1c2f] uppercase tracking-tight font-bold">
            Candidate Screening & Diagnostic Audit
          </h2>
          <p className="font-body-md text-sm lg:text-base text-[#45464d] max-w-2xl mx-auto leading-relaxed">
            APEX 아카데미는 엄정한 학업 분위기 유지를 위해 원장단 서류 심사 및 진단 고사를 거쳐
            분기별 한정 인원만을 최종 선발합니다.
          </p>
        </div>

        {/* Formal Screening Form Card */}
        <div className="bg-[#ffffff] p-6 lg:p-10 border border-[#0d1c2f]/15 shadow-md space-y-6">
          <div className="mb-4">
            <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-900">
              샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} data-sample-local="true" className="space-y-6">
              {/* Row 1: Candidate Basic Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    수험생 성명 (FULL LEGAL NAME) *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="예: 김민우"
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    연락처 (MOBILE PHONE DIRECT) *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Desired Career Track & Alma Mater */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    지원 트랙 구분 (PREPARATION TRACK) *
                  </label>
                  <select
                    name="track"
                    required
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] transition-colors cursor-pointer"
                  >
                    <option value="leet-sky">LEET 법학전문대학원 집중반 (SKY/인서울 종합)</option>
                    <option value="cpa-primary">공인회계사(CPA) 1차 전과목 정예반</option>
                    <option value="cpa-secondary">공인회계사(CPA) 유예생 2차 심화반</option>
                    <option value="bar-exam">변호사시험(Bar Exam) 기록형·사례형 전임관리반</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    출신 대학 및 학부 전공 (ALMA MATER & MAJOR) *
                  </label>
                  <input
                    type="text"
                    name="almaMater"
                    required
                    value={formData.almaMater}
                    onChange={handleChange}
                    placeholder="예: S대학교 경제학부 (졸업/졸업예정) (예시)"
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Quantitative Telemetry */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    학부 학점 (GPA 백분위) *
                  </label>
                  <input
                    type="text"
                    name="gpa"
                    required
                    value={formData.gpa}
                    onChange={handleChange}
                    placeholder="예: 96.8 / 100"
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    공인영어 성적 (TOEIC / TEPS)
                  </label>
                  <input
                    type="text"
                    name="englishScore"
                    value={formData.englishScore}
                    onChange={handleChange}
                    placeholder="예: TOEIC 990 or TEPS 510"
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    최근 모의고사 백분위 (또는 기응시)
                  </label>
                  <input
                    type="text"
                    name="mockScore"
                    value={formData.mockScore}
                    onChange={handleChange}
                    placeholder="예: LEET 138pt / 상위 1.2%"
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Study Pod Preference & Start Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block flex items-center justify-between">
                    <span>독서실 희망 구역 (CARREL ALLOCATION WING)</span>
                    {formData.selectedSeatId && (
                      <span className="text-[#cf6721] font-semibold text-[11px]">
                        [선택 좌석: #{formData.selectedSeatId}]
                      </span>
                    )}
                  </label>
                  <select
                    name="carrelWing"
                    value={formData.carrelWing}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] transition-colors cursor-pointer"
                  >
                    <option value="zone-a">Zone A: High-Silent Solitary Wing (완전 무음 1인실)</option>
                    <option value="zone-b">Zone B: Supreme Law Case Archive (판례 연구 특화실)</option>
                    <option value="zone-c">Zone C: CPA Numerical Intensive Lab (계산기 허용실)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                    희망 입실 일정 (DESIRED COMMENCEMENT) *
                  </label>
                  <select
                    name="commencementDate"
                    required
                    value={formData.commencementDate}
                    onChange={handleChange}
                    className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] transition-colors cursor-pointer"
                  >
                    <option value="2025-03">2025년 3월 정규 1차 개강반 (잔여 14석)</option>
                    <option value="2025-04">2025년 4월 LEET 실전 파이널 집중반</option>
                    <option value="2025-summer">2025년 하계 집중 스파르타 몰입반</option>
                  </select>
                </div>
              </div>

              {/* Statement of Purpose & Focus Area */}
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs uppercase tracking-wider text-[#0d1c2f] font-bold block">
                  학업 계획 및 취약 영역 진단 기술 (DIAGNOSTIC MEMORANDUM)
                </label>
                <textarea
                  rows={4}
                  name="diagnosticMemo"
                  value={formData.diagnosticMemo}
                  onChange={handleChange}
                  placeholder="현재 취약한 과목(예: 추리논증 형식논리학, 재무회계 고급회계), 주당 학습 가능 시간, 목표 법전원/회계법인을 간략히 서술하십시오."
                  className="w-full p-3 bg-[#e6eeff] text-[#0d1c2f] font-body-md text-sm lg:text-base border border-[#0d1c2f]/15 focus:bg-[#ffffff] focus:outline-none focus:border-[#0d1c2f] placeholder:text-[#45464d]/60 placeholder:italic transition-colors"
                ></textarea>
              </div>

              {/* Statutory Confidentiality Disclosure */}
              <div className="p-4 bg-[#eff4ff] border border-[#0d1c2f]/15 shadow-xs flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#cf6721] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-label-sm text-xs text-[#0d1c2f] font-bold uppercase tracking-wider block">
                    LEGAL PRIVILEGE & STATUTORY CONFIDENTIALITY PROTOCOL
                  </span>
                  <p className="font-body-sm text-xs lg:text-sm text-[#45464d] leading-relaxed">
                    본 아카데미에 제출된 지원자의 인적 사항, 공인 성적 및 학업 기록은 변호사법
                    제26조(비밀유지의무) 및 개인정보보호법에 의거하여 최고 수준으로 암호화 관리되며,
                    입학 사정 목적 외 절대 외부 열람되지 않습니다.
                  </p>
                </div>
              </div>

              {/* Submit Button & Feedback */}
              <div className="pt-2 flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="font-label-sm text-xs text-[#45464d]">
                  * 심사 결과는 접수 후 영업일 기준 48시간 이내에 개별 통보됩니다.
                </div>
                <p className="text-[11px] text-[#45464d] text-center font-sans mb-2">※ 본 화면은 포트폴리오 시연용 가상 샘플이며, 입력하신 정보는 실제로 전송되지 않습니다.</p>
              <button type="submit"
                  className="w-full lg:w-auto px-8 py-3.5 bg-[#000000] text-white font-label-md text-xs lg:text-sm uppercase tracking-wider font-semibold shadow-md hover:bg-[#131b2e] hover:text-[#dae2fd] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>정밀 입학 심사 서류 제출 (SUBMIT AUDIT APPLICATION)</span>
                  <ArrowRight className="w-4 h-4 text-[#ffb68e]" />
                </button>
              </div>
            </form>
          ) : (
            /* Dynamic Success Banner & Formal Admission Receipt */
            <div
              id="submit-success-banner"
              className="p-6 lg:p-8 bg-[#f8f9ff] border-2 border-[#131b2e] text-[#0d1c2f] space-y-6 animate-in fade-in duration-300"
            >
              <div className="flex items-start justify-between border-b border-[#0d1c2f]/15 pb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-[#cf6721] shrink-0" />
                  <div>
                    <h3 className="font-headline-md text-2xl font-bold text-[#0d1c2f]">
                      입학 심사 접수가 정식 완료되었습니다.
                    </h3>
                    <p className="font-body-sm text-xs lg:text-sm text-[#45464d] mt-0.5">
                      APEX Scholastic Council // Admissions Audit Registry Dossier
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#131b2e] text-white font-label-sm text-xs tracking-wider">
                  접수 확인 완료
                </span>
              </div>

              {/* Receipt Dossier Table */}
              <div className="bg-[#ffffff] border border-[#0d1c2f]/15 p-5 space-y-3 font-body-sm text-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-3 border-b border-[#0d1c2f]/10">
                  <div>
                    <span className="font-label-sm text-xs text-[#45464d] uppercase block">
                      지원자 고유 식별코드 (DOSSIER ID):
                    </span>
                    <span className="font-label-md text-base font-bold text-[#0d1c2f]">
                      {submissionCode}
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-xs text-[#45464d] uppercase block">
                      접수 일시 (TIMESTAMP):
                    </span>
                    <span className="font-label-sm text-xs text-[#0d1c2f]">
                      {submittedTime}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs lg:text-sm">
                  <div>
                    <span className="text-[#45464d] block font-label-sm text-[11px]">지원자 성명:</span>
                    <strong className="text-[#0d1c2f]">{formData.fullName || '김민우'}</strong>
                  </div>
                  <div>
                    <span className="text-[#45464d] block font-label-sm text-[11px]">연락처:</span>
                    <strong className="text-[#0d1c2f]">{formData.mobile || '010-0000-0000'}</strong>
                  </div>
                  <div>
                    <span className="text-[#45464d] block font-label-sm text-[11px]">학부 / 전공:</span>
                    <strong className="text-[#0d1c2f]">{formData.almaMater || 'S대학교 (예시)'}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs lg:text-sm pt-2">
                  <div>
                    <span className="text-[#45464d] block font-label-sm text-[11px]">지원 트랙:</span>
                    <strong className="text-[#0d1c2f]">
                      {formData.track === 'leet-sky'
                        ? 'LEET 법학전문대학원 집중반'
                        : formData.track === 'cpa-primary'
                        ? 'CPA 1차 전과목 정예반'
                        : formData.track === 'cpa-secondary'
                        ? 'CPA 유예생 2차 심화반'
                        : '변호사시험 기록형 관리반'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#45464d] block font-label-sm text-[11px]">희망 배정 구역:</span>
                    <strong className="text-[#0d1c2f]">
                      {formData.carrelWing === 'zone-a'
                        ? 'Zone A (완전 무음 1인실)'
                        : formData.carrelWing === 'zone-b'
                        ? 'Zone B (판례 연구 특화실)'
                        : 'Zone C (CPA 집중실)'}
                      {formData.selectedSeatId && ` [Carrel #${formData.selectedSeatId}]`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#45464d] block font-label-sm text-[11px]">희망 개강:</span>
                    <strong className="text-[#0d1c2f]">
                      {formData.commencementDate === '2025-03' ? '2025년 3월 1차' : formData.commencementDate}
                    </strong>
                  </div>
                </div>
              </div>

              <p className="font-body-sm text-xs lg:text-sm text-[#45464d] leading-relaxed">
                기재하신 유선 번호로 서초 사법캠퍼스 입학사정관실(02-0000-0000)에서 유선 연락을
                드리며, 1차 원장단 서류 통과자에 한하여 심층 진단 면접 및 개별 Carrel 지정석 배정
                안내가 진행됩니다.
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#ffffff] border border-[#0d1c2f]/20 font-label-sm text-xs uppercase flex items-center gap-1.5 hover:bg-[#eff4ff]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>접수증 인쇄 (PRINT DOSSIER)</span>
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-2 bg-[#000000] text-white font-label-sm text-xs uppercase hover:bg-[#131b2e] transition-colors"
                >
                  신규 접수 작성
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
