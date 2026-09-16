'use client';

import React, { useState } from 'react';
import { Handshake, Lock } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { PartneringFormData } from '../types';

export const PartneringWizard: React.FC = () => {
  const [formData, setFormData] = useState<PartneringFormData>({
    targetPipelines: ['CB-101'],
    partnershipType: 'LO',
    companyName: '',
    department: '',
    contactName: '',
    contactEmail: '',
    ndaAgreed: false
  });

  // 샘플이라 파트너링 신청을 받지 않는다 — 가짜 접수번호(VDR-REQ-…)·「발송되었습니다」 성공 화면 대신
  // 공용 안내(SampleNotice)만 연다. 입력값은 어디에도 보내지 않는다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePipeline = (pipeline: string) => {
    setFormData(prev => {
      const exists = prev.targetPipelines.includes(pipeline);
      const updated = exists
        ? prev.targetPipelines.filter(p => p !== pipeline)
        : [...prev.targetPipelines, pipeline];
      return { ...prev, targetPipelines: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.targetPipelines.length === 0) {
      setErrorMessage('최소 1개 이상의 관심 파이프라인을 선택해 주세요.');
      return;
    }
    if (!formData.ndaAgreed) {
      setErrorMessage('CDA/NDA 기밀유지협약 및 보안 규정에 동의해 주셔야 합니다.');
      return;
    }

    setErrorMessage('');
    setIsNoticeOpen(true);
  };

  return (
    <section className="py-24 bg-[#eff4ff]/60 border-t border-[#c4c5d5]/30" id="wizard">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#1e40af] text-white text-[12px] font-code-mono font-bold mb-3 shadow-xs">
            <Handshake className="w-4 h-4" />
            <span>CONFIDENTIAL BD DATA ROOM ACCESS</span>
          </div>
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[#0b1c30] tracking-tight">
            글로벌 파트너링 및 기술수출(L/O) 신청
          </h2>
          <p className="text-[16px] text-[#444653] mt-2">
            비공개 가상 데이터룸(VDR) 열람 및 전문 BD 실무팀과의 1:1 라이선싱 미팅을 신청하십시오.
          </p>
        </div>

        {/* 4-Step Wizard Container */}
        <div className="bg-white rounded-xl border border-[#c4c5d5]/40 shadow-sm p-8 lg:p-10">
          {/* Step Indicators */}
          <div className="grid grid-cols-4 gap-2 mb-8 border-b border-[#c4c5d5]/30 pb-6 text-center font-code-mono text-[12px]">
            <div className={`pb-2 ${formData.targetPipelines.length > 0 ? 'text-[#00288e] font-bold border-b-2 border-[#00288e]' : 'text-[#757684]'}`}>
              01. 관심 파이프라인
            </div>
            <div className={`pb-2 ${formData.partnershipType ? 'text-[#00288e] font-bold border-b-2 border-[#00288e]' : 'text-[#757684]'}`}>
              02. 제휴 유형
            </div>
            <div className={`pb-2 ${formData.companyName && formData.contactEmail ? 'text-[#00288e] font-bold border-b-2 border-[#00288e]' : 'text-[#757684]'}`}>
              03. 담당자 정보
            </div>
            <div className={`pb-2 ${formData.ndaAgreed ? 'text-[#00288e] font-bold border-b-2 border-[#00288e]' : 'text-[#757684]'}`}>
              04. CDA & 제출
            </div>
          </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Step 1: Pipeline Select */}
              <div className="space-y-3">
                <label className="block text-[15px] text-[#0b1c30] font-bold">
                  1단계: 기술이전(L/O) 또는 협력 관심 파이프라인 선택 <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.targetPipelines.includes('CB-101')
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#1e40af] focus:ring-[#1e40af] border-[#c4c5d5]"
                      checked={formData.targetPipelines.includes('CB-101')}
                      onChange={() => togglePipeline('CB-101')}
                    />
                    <div>
                      <div className="text-[14px] font-bold text-[#0b1c30]">
                        CB-101 (KRAS G12D/V TPD)
                      </div>
                      <div className="text-[12px] text-[#444653]">
                        비소세포폐암·췌장암 임상 2a상
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.targetPipelines.includes('CB-204')
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#1e40af] focus:ring-[#1e40af] border-[#c4c5d5]"
                      checked={formData.targetPipelines.includes('CB-204')}
                      onChange={() => togglePipeline('CB-204')}
                    />
                    <div>
                      <div className="text-[14px] font-bold text-[#0b1c30]">
                        CB-204 (Trop-2 x Topo1 ADC)
                      </div>
                      <div className="text-[12px] text-[#444653]">
                        삼중음성유방암 임상 1b상
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.targetPipelines.includes('CB-308')
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#1e40af] focus:ring-[#1e40af] border-[#c4c5d5]"
                      checked={formData.targetPipelines.includes('CB-308')}
                      onChange={() => togglePipeline('CB-308')}
                    />
                    <div>
                      <div className="text-[14px] font-bold text-[#0b1c30]">
                        CB-308 (CD73 x TGF-β Bispecific)
                      </div>
                      <div className="text-[12px] text-[#444653]">
                        췌장암·난소암 IND 승인 완료
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center space-x-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.targetPipelines.includes('PROTEA-AI')
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#1e40af] focus:ring-[#1e40af] border-[#c4c5d5]"
                      checked={formData.targetPipelines.includes('PROTEA-AI')}
                      onChange={() => togglePipeline('PROTEA-AI')}
                    />
                    <div>
                      <div className="text-[14px] font-bold text-[#0b1c30]">
                        PROTEA-AI 플랫폼 공동연구
                      </div>
                      <div className="text-[12px] text-[#444653]">
                        AI 기반 타깃 분해제 발굴 엔진 제휴
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 2: Partnership Type */}
              <div className="space-y-3">
                <label className="block text-[15px] text-[#0b1c30] font-bold">
                  2단계: 파트너링 제휴 유형 <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <label
                    className={`flex items-center space-x-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.partnershipType === 'LO'
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="partnership_type"
                      value="LO"
                      checked={formData.partnershipType === 'LO'}
                      onChange={() => setFormData({ ...formData, partnershipType: 'LO' })}
                      className="text-[#1e40af] focus:ring-[#1e40af]"
                    />
                    <span className="text-[14px] text-[#0b1c30] font-medium">글로벌 전용 판권 L/O</span>
                  </label>

                  <label
                    className={`flex items-center space-x-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.partnershipType === 'CODEV'
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="partnership_type"
                      value="CODEV"
                      checked={formData.partnershipType === 'CODEV'}
                      onChange={() => setFormData({ ...formData, partnershipType: 'CODEV' })}
                      className="text-[#1e40af] focus:ring-[#1e40af]"
                    />
                    <span className="text-[14px] text-[#0b1c30] font-medium">공동 연구개발 (Co-Dev)</span>
                  </label>

                  <label
                    className={`flex items-center space-x-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.partnershipType === 'CDMO'
                        ? 'border-[#1e40af] bg-[#eff4ff]'
                        : 'border-[#c4c5d5]/50 hover:bg-[#eff4ff]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="partnership_type"
                      value="CDMO"
                      checked={formData.partnershipType === 'CDMO'}
                      onChange={() => setFormData({ ...formData, partnershipType: 'CDMO' })}
                      className="text-[#1e40af] focus:ring-[#1e40af]"
                    />
                    <span className="text-[14px] text-[#0b1c30] font-medium">cGMP 위탁생산 및 CMC</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="space-y-4">
                <label className="block text-[15px] text-[#0b1c30] font-bold">
                  3단계: 기관 및 신청 담당자 정보 <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[12px] text-[#444653] mb-1 font-medium">
                      소속 기업 / 투자기관명
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="예: 글로벌 제약사 · 바이오 투자기관"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c4c5d5]/60 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] text-[14px] outline-hidden"
                    />
                  </div>
                  <div>
                    <span className="block text-[12px] text-[#444653] mb-1 font-medium">
                      담당 부서
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="예: Global Business Development (BD)"
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c4c5d5]/60 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] text-[14px] outline-hidden"
                    />
                  </div>
                  <div>
                    <span className="block text-[12px] text-[#444653] mb-1 font-medium">
                      성함 및 직책
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="예: 홍길동 상무 / Managing Director"
                      value={formData.contactName}
                      onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c4c5d5]/60 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] text-[14px] outline-hidden"
                    />
                  </div>
                  <div>
                    <span className="block text-[12px] text-[#444653] mb-1 font-medium">
                      공식 업무용 이메일
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.contactEmail}
                      onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c4c5d5]/60 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] text-[14px] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: NDA / CDA Check */}
              <div className="p-4 rounded-xl bg-[#eff4ff]/60 border border-[#c4c5d5]/40 space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.ndaAgreed}
                    onChange={e => setFormData({ ...formData, ndaAgreed: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#1e40af] focus:ring-[#1e40af] border-[#c4c5d5]"
                  />
                  <div className="text-[13px] text-[#444653] leading-relaxed">
                    <strong className="text-[#0b1c30] font-semibold">[필수] 상호 기밀유지협약(CDA/NDA) 동의 및 VDR 보안 감사 규정 준수:</strong>{' '}
                    열람 신청 시 제공되는 CB-101/204의 3상 전임상 원천 데이터 및 제조공정(CMC) 문서는 미공개 핵심 기술자산으로, 내부 검토 목적 외 제3자 배포 및 무단 유출이 엄격히 금지됩니다.
                  </div>
                </label>
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-xl border border-[#1e40af]/40 bg-white px-4 py-3 text-[13px] font-semibold text-[#00288e]"
                >
                  {errorMessage}
                </p>
              )}

              {/* 제출 전 고지 — 샘플이라 아무 데도 보내지 않는다 */}
              <p className="rounded-xl border border-[#1e40af]/40 bg-white px-4 py-3 text-center text-[13px] leading-relaxed text-[#0b1c30]">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 <strong className="font-bold text-[#00288e]">전송되지 않습니다</strong>.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#1e40af] hover:bg-[#00288e] text-white font-bold text-[14px] transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-99"
              >
                <Lock className="w-5 h-5" />
                <span>전문 BD 파트너링 미팅 및 VDR 열람 신청</span>
              </button>
            </form>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="celebris-biopharma"
        industry="corporate"
        featureName="기술이전(L/O) 파트너링 신청"
      />
    </section>
  );
};
