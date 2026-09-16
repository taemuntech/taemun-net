"use client";

import React, { useState } from 'react';
import { X, Briefcase, ExternalLink, CheckCircle, Search, Clock, MapPin } from 'lucide-react';

interface RecruitPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruitPortalModal: React.FC<RecruitPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  if (!isOpen) return null;

  const jobPostings = [
    {
      id: 'job-1',
      title: '2026 상반기 R&D 신소재(쿼츠/세라믹) 연구원 채용',
      department: '기술연구소',
      location: '경북 구미 본사',
      type: '정규직 (신입/경력)',
      deadline: '2026.04.15 까지',
      tags: ['석/박사 우대', '무기재료공학', '신소재'],
    },
    {
      id: 'job-2',
      title: '글로벌 반도체 공정 엔지니어 (초정밀 세정/코팅)',
      department: '세정생산팀',
      location: '충북 오창 / 구미',
      type: '정규직 (경력 3년 이상)',
      deadline: '2026.04.10 까지',
      tags: ['화학공학', '클린룸 경력', '플라즈마 코팅'],
    },
    {
      id: 'job-3',
      title: '해외 기술영업 (글로벌 팹 파운드리 계정)',
      department: '글로벌영업본부',
      location: '경기 동탄 마케팅센터',
      type: '정규직 (신입/경력)',
      deadline: '2026.04.20 까지',
      tags: ['영어/중국어 능통자', '해외 출장 가능자'],
    },
    {
      id: 'job-4',
      title: '스마트팩토리 MES / 자동화 로보틱스 개발자',
      department: 'DX추진팀',
      location: '경북 구미 본사',
      type: '정규직 (경력)',
      deadline: '상시 채용',
      tags: ['MES', 'PLC', '스마트팩토리'],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-2xl border border-[#c3c6d6]/50 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#003d9b] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-[#dae2ff] tracking-wider uppercase block">
                WONIK CAREER PORTAL
              </span>
              <h3 className="text-lg font-bold">원익큐앤씨 채용공고</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-200 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#131b2e]">
          {appliedJob ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-900">
                입사지원서 접수 안내
              </h4>
              <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                선택하신 공고에 대한 지원서 작성이 원익그룹 공식 채용 포털(recruit.wonik.com)로 연동됩니다. 회원가입 후 이력서 및 자기소개서를 등록해 주시기 바랍니다.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setAppliedJob(null)}
                  className="px-4 py-2 bg-emerald-700 text-white rounded text-xs font-semibold hover:bg-emerald-800"
                >
                  다른 채용공고 둘러보기
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between bg-[#f2f3ff] p-3.5 rounded-lg border border-[#dae2fd]">
                <div>
                  <span className="font-bold text-xs text-[#003d9b] block">
                    현재 진행 중인 공고 총 {jobPostings.length}건
                  </span>
                  <span className="text-[11px] text-gray-600">
                    세계 최고 반도체 소재의 미래를 함께 만들어 갈 열정 넘치는 동료를 찾습니다.
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {jobPostings.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#0052cc] hover:shadow-xs transition-all bg-white flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-[#003d9b] text-white rounded">
                          {job.department}
                        </span>
                        <span className="text-xs font-medium text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {job.location}
                        </span>
                        <span className="text-xs font-mono text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {job.deadline}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#131b2e] leading-snug">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">
                        {job.type}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAppliedJob(job.title)}
                        className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#0052cc] hover:bg-[#003d9b] text-white rounded text-xs font-semibold shadow-2xs"
                      >
                        <span>온라인 지원하기</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            문의: recruit@wonik.com / 054-479-2580
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-md"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
