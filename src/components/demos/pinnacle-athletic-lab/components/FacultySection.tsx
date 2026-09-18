import React from 'react';
import { Activity, Award, Shield, CheckCircle2 } from 'lucide-react';

export const FacultySection: React.FC = () => {
  return (
    <section className="w-full bg-[#201f1f] px-4 lg:px-12 py-10 lg:py-16 border-b border-[#2a2a2a]">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <span className="font-telemetry text-[12px] text-[#c3f400] font-bold uppercase tracking-widest">
            [ LAB FACULTY // RESEARCH FELLOWS ]
          </span>
          <span className="h-px bg-[#2a2a2a] flex-1"></span>
        </div>

        <h2 className="font-sans text-[28px] lg:text-[36px] lg:text-[40px] font-bold text-[#ffffff] uppercase tracking-tight">
          국가대표 생체역학 연구진 & 특채 수석 코칭스태프
        </h2>

        <p className="font-sans text-[14px] lg:text-[15px] text-[#9e9b9a]">
          감(Feeling)에 의존하는 훈련을 종식합니다. 대한민국 엘리트 체육 연구원 및 특수실기 지도관 출신이 1,000Hz 센서 데이터를 기반으로 합격을 설계합니다.
        </p>
      </div>

      {/* Coach Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coach 1 */}
        <div className="p-6 lg:p-8 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-telemetry text-[11px] text-[#ff5625] font-bold uppercase">
                HEAD COACH // 01
              </span>
              <span className="px-2 py-0.5 bg-[#2a2a2a] border border-[#353534] font-telemetry text-[10px] text-[#ffffff]">
                국가대표 출신
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#2a2a2a] border border-[#353534] flex items-center justify-center shadow-[1px_1px_0px_#000000] shrink-0">
                <Activity className="w-8 h-8 text-[#ffffff]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-sans text-[20px] text-[#ffffff] font-bold">
                  김태훈 총괄 수석 코치
                </h3>
                <span className="font-telemetry text-[11px] text-[#ffb5a0] font-bold">
                  국립체육대학교 육상 출신 (예시)
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#0e0e0e] border border-[#2a2a2a] mb-4">
              <span className="font-telemetry text-[10px] text-[#c3f400] font-bold block mb-1">
                RECORD SPECIFICATION:
              </span>
              <p className="font-sans text-[13px] text-[#e5e2e1] leading-relaxed">
                공식 제자리멀리뛰기 최고기록{' '}
                <span className="text-[#c3f400] font-bold">328 cm</span>. 지면반력 전달 메커니즘을 적용하여 입시생 평균 비거리 +23cm 즉각 상승 달성.
              </p>
            </div>

            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#9e9b9a]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>대한육상연맹 공인 1급 지도자 자격 보유</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>S대 체육교육과 실기 우수 합격자 (예시) 18명 배출</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>K-Elite 스프린트 블록 드라이브 메트릭스 저자</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
            <span className="font-telemetry text-[10px] text-[#9e9b9a]">SPECIALTY:</span>
            <span className="font-sans text-[12px] text-[#ffffff] font-bold">
              제자리멀리뛰기 / 100m 폭발 드라이브
            </span>
          </div>
        </div>

        {/* Coach 2 */}
        <div className="p-6 lg:p-8 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-telemetry text-[11px] text-[#c3f400] font-bold uppercase">
                RESEARCH SCIENTIST // 02
              </span>
              <span className="px-2 py-0.5 bg-[#2a2a2a] border border-[#353534] font-telemetry text-[10px] text-[#c3f400] font-bold">
                박사 연구원
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#2a2a2a] border border-[#353534] flex items-center justify-center shadow-[1px_1px_0px_#000000] shrink-0">
                <Award className="w-8 h-8 text-[#c3f400]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-sans text-[20px] text-[#ffffff] font-bold">
                  박서연 바이오메카닉스 박사
                </h3>
                <span className="font-telemetry text-[11px] text-[#c3f400] font-bold">
                  S대 스포츠과학연구소 연구원 (예시)
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#0e0e0e] border border-[#2a2a2a] mb-4">
              <span className="font-telemetry text-[10px] text-[#ff5625] font-bold block mb-1">
                LAB ALGORITHM LEAD:
              </span>
              <p className="font-sans text-[13px] text-[#e5e2e1] leading-relaxed">
                1,000Hz 3D 광학 모션캡처 및 근전도(EMG) 실시간 주파수 분석. 부상 위험 최소화 기반의 최대 근출력 신경계 동원 프로토콜 설계.
              </p>
            </div>

            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#9e9b9a]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>S대학교 체육학 박사 (예시) (운동역학/생체역학)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>국립체육대 스포츠생체역학 (예시) 산학연구 논문 22편 등재</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>경찰청 채용센서 오차 판정 자문위원</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
            <span className="font-telemetry text-[10px] text-[#9e9b9a]">SPECIALTY:</span>
            <span className="font-sans text-[12px] text-[#ffffff] font-bold">
              3D 모션분석 / 관절 모멘트 & 재활가속
            </span>
          </div>
        </div>

        {/* Coach 3 */}
        <div className="p-6 lg:p-8 bg-[#1c1b1b] border border-[#2a2a2a] shadow-[2px_2px_0px_#000000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-telemetry text-[11px] text-[#ff5625] font-bold uppercase">
                MASTER INSTRUCTOR // 03
              </span>
              <span className="px-2 py-0.5 bg-[#2a2a2a] border border-[#353534] font-telemetry text-[10px] text-[#ff5625] font-bold">
                전직 시험관
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#2a2a2a] border border-[#353534] flex items-center justify-center shadow-[1px_1px_0px_#000000] shrink-0">
                <Shield className="w-8 h-8 text-[#ff5625]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-sans text-[20px] text-[#ffffff] font-bold">
                  최진혁 특채 실기 마스터
                </h3>
                <span className="font-telemetry text-[11px] text-[#ffb5a0] font-bold">
                  중앙경찰학교 실기 지도관 역임
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#0e0e0e] border border-[#2a2a2a] mb-4">
              <span className="font-telemetry text-[10px] text-[#c3f400] font-bold block mb-1">
                TACTICAL PERFORMANCE:
              </span>
              <p className="font-sans text-[13px] text-[#e5e2e1] leading-relaxed">
                소방·경찰·해경 특채 <span className="text-[#ff5625] font-bold">실기 만점률 94.8%</span> 기록. 전자 악력계 70kg+ 돌파 및 25m 왕복달리기 초정밀 턴 훈련 직강.
              </p>
            </div>

            <ul className="flex flex-col gap-2 font-sans text-[13px] text-[#9e9b9a]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>경찰특공대 실기시험장 공식 운영관 경력</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>중앙소방학교 구조대 실기 합격생 120+명 육성</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c3f400] shrink-0 mt-0.5" />
                <span>악력 로드셀 파지법 & 배근력 각도 특허 출원</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
            <span className="font-telemetry text-[10px] text-[#9e9b9a]">SPECIALTY:</span>
            <span className="font-sans text-[12px] text-[#ffffff] font-bold">
              소방·경찰 실기 전 종목 만점 세팅
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
