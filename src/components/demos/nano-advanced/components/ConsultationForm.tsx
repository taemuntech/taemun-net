import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { ConsultationFormData } from '../types';

interface ConsultationFormProps {
  onSubmitSuccess: (data: ConsultationFormData) => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSubmitSuccess }) => {
  const [sector, setSector] = useState<string>('AI 가속기 (LLM)');
  const [solutions, setSolutions] = useState<string[]>([
    '2.5D 서브 5µm 실리콘 인터포저 (Silicon Interposer)',
    '초평탄 글래스 코어 기판 (Glass Core Substrate)',
  ]);
  const [company, setCompany] = useState<string>('');
  const [department, setDepartment] = useState<string>('패키징 설계 / 신뢰성 연구소');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [ndaAgreed, setNdaAgreed] = useState<boolean>(true);

  const toggleSolution = (item: string) => {
    if (solutions.includes(item)) {
      setSolutions(solutions.filter((s) => s !== item));
    } else {
      setSolutions([...solutions, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaAgreed) {
      alert('비밀유지협약(Mutual NDA) 사전 동의가 필요합니다.');
      return;
    }
    onSubmitSuccess({
      sector,
      solutions,
      company: company || '테크놀로지 파트너스',
      department,
      name: name || '수석 엔지니어',
      email: email || 'engineer@enterprise.com',
      ndaAgreed,
    });
  };

  const sectors = [
    'AI 가속기 (LLM)',
    'HPC 고성능 서버',
    '자율주행 모빌리티',
    '차세대 6G 통신',
  ];

  const solutionOptions = [
    '2.5D 서브 5µm 실리콘 인터포저 (Silicon Interposer)',
    '초평탄 글래스 코어 기판 (Glass Core Substrate)',
    '3D 하이브리드 본딩 직접 Cu-Cu 접합',
    '턴키 맞춤형 복합 이종 패키징 개발',
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-[#c4c5d5]/30" id="technical-request">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-[#00288e] uppercase tracking-widest mb-2 font-mono">
            Engineering Consultation
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30] mb-3 tracking-tight">
            엔지니어링 평가 샘플 및 테크니컬 미팅 신청
          </h2>
          <p className="text-base text-[#444653] leading-relaxed max-w-2xl mx-auto">
            차세대 반도체 아키텍처에 맞춤형 2.5D/3D 패키징 샘플 웨이퍼 제작 및 수율 검토 미팅을
            신청하십시오. 전담 패키징 수석 연구원이 24시간 내 직접 기술 회신을 드립니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#eff4ff] p-6 lg:p-10 rounded-2xl border border-[#c4c5d5]/50 space-y-8 shadow-xs"
        >
          {/* Step 1: Target Semiconductor Sector */}
          <div>
            <label className="block text-base text-[#0b1c30] font-bold mb-3">
              Step 1. 목표 반도체 적용 분야
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {sectors.map((sec) => {
                const isSelected = sector === sec;
                return (
                  <label
                    key={sec}
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${ isSelected ? 'border-[#00288e] bg-white shadow-xs' : 'border-[#c4c5d5]/40 bg-white hover:border-[#00288e]/60' }`}
                  >
                    <input
                      type="radio"
                      name="target_sector"
                      value={sec}
                      checked={isSelected}
                      onChange={() => setSector(sec)}
                      className="text-[#00288e] focus:ring-[#00288e] h-4 w-4 accent-[#00288e]"
                    />
                    <span className="text-xs font-semibold text-[#0b1c30]">{sec}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 2: Packaging Process Solution */}
          <div>
            <label className="block text-base text-[#0b1c30] font-bold mb-3">
              Step 2. 검토 희망 패키징 솔루션 공법
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {solutionOptions.map((sol) => {
                const isChecked = solutions.includes(sol);
                return (
                  <label
                    key={sol}
                    className={`p-3.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${ isChecked ? 'border-[#00288e] bg-white shadow-xs' : 'border-[#c4c5d5]/40 bg-white hover:border-[#00288e]/60' }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSolution(sol)}
                      className="rounded text-[#00288e] focus:ring-[#00288e] h-4 w-4 accent-[#00288e]"
                    />
                    <span className="text-xs font-semibold text-[#0b1c30]">{sol}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 3: Enterprise Contact Information */}
          <div>
            <label className="block text-base text-[#0b1c30] font-bold mb-3">
              Step 3. 기업 및 기술 담당자 정보
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1.5">
                  회사명 / 기관명 *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="예: 글로벌 반도체 테크놀로지스"
                  className="w-full bg-white border border-[#c4c5d5]/60 rounded-lg p-3 text-sm text-[#0b1c30] focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] outline-none transition-all placeholder:text-[#757684]/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1.5">
                  담당 부서 *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white border border-[#c4c5d5]/60 rounded-lg p-3 text-sm text-[#0b1c30] focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] outline-none transition-all cursor-pointer"
                >
                  <option>패키징 설계 / 신뢰성 연구소</option>
                  <option>공정 R&D 엔지니어링</option>
                  <option>글로벌 소싱 및 파운드리 조달</option>
                  <option>임원진 및 전략기획실</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1.5">
                  성함 및 직책 *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동 수석 엔지니어"
                  className="w-full bg-white border border-[#c4c5d5]/60 rounded-lg p-3 text-sm text-[#0b1c30] focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] outline-none transition-all placeholder:text-[#757684]/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444653] mb-1.5">
                  업무용 공식 이메일 *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@enterprise.com"
                  className="w-full bg-white border border-[#c4c5d5]/60 rounded-lg p-3 text-sm text-[#0b1c30] focus:border-[#00288e] focus:ring-1 focus:ring-[#00288e] outline-none transition-all placeholder:text-[#757684]/60"
                />
              </div>
            </div>
          </div>

          {/* Step 4: NDA & Compliance Agreement */}
          <div className="pt-4 border-t border-[#c4c5d5]/30">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={ndaAgreed}
                onChange={(e) => setNdaAgreed(e.target.checked)}
                className="mt-1 rounded text-[#00288e] focus:ring-[#00288e] h-4 w-4 accent-[#00288e]"
              />
              <span className="text-xs text-[#444653] leading-relaxed">
                [필수] 기술 미팅 및 엔지니어링 샘플 교환을 위한{' '}
                <strong className="text-[#0b1c30]">
                  양방향 상호 비밀유지협약(Mutual NDA)
                </strong>{' '}
                사전 적용 및 보안 검토 규정에 동의합니다.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#00288e] hover:bg-[#1e40af] text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>엔지니어링 테크니컬 미팅 및 평가 샘플 발송 요청</span>
          </button>
        </form>
      </div>
    </section>
  );
};
