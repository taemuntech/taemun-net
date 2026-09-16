import React from 'react';

interface DocModalProps {
  title: string | null;
  onClose: () => void;
}

export const DocModal: React.FC<DocModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  const getDocContent = (docTitle: string) => {
    switch (docTitle) {
      case 'Investor Portal':
        return {
          subtitle: '그린큐브 IR 정보 및 지속가능경영 공시 (예시 수치)',
          content: [
            '누적 스마트팜 시설 수주 잔고 840억 원 — 화면 구성을 보여 주기 위한 예시 수치입니다',
            '재생에너지 100% 자립형 수직스마트팜 전력 계통 연계 (예시)',
            '시리즈 B 라운드 지속가능 펀드 및 B2B 식품사 컨소시엄 투자 유치 (예시)',
            '무농약·우수농산물 관리 기준 충족 (예시 표기 — 실제 지정·인증이 아닙니다)',
          ],
        };
      case 'Cleanroom Protocols':
        return {
          subtitle: 'Class 1000급 클린룸 운영 프로토콜 (예시 기준)',
          content: [
            '차압(Differential Pressure): 인접 구역 대비 +15~20Pa 양압 유지',
            '공기 정화: H14급 고성능 HEPA 필터링 (0.3µm 초미세 입자 99.995% 차단)',
            '작업자 프로토콜: 3단계 에어샤워, 전신 정전기 방지 무균 방진복 착용 필수',
            '해충 및 병원균: 토양 매개 세균 및 외부 해충의 원천 유입 0% 차단 검증',
          ],
        };
      case 'Cultivar Registry':
        return {
          subtitle: '스마트팜 전용 품종 등록부 (예시 수치)',
          content: [
            'GC-B01 (버터헤드): 엽두께 1.4mm, 수분 유지력 14일 (예시)',
            'GC-R03 (크리스피 로메인): 광도 380 PPFD 적응형, 질산염 잔류량 관리 기준 대비 60% 이하 (예시)',
            'GC-M07 (바이오 약용식물): 루테인·폴리페놀 지표성분 노지 재배 대비 210% 증폭 (예시)',
          ],
        };
      default:
        return {
          subtitle: '품질 경영 및 지속가능 표준 준수 가이드라인 (예시 수치)',
          content: [
            '국제 식품안전 표준과 위해요소 관리 체계를 전 공정에 적용하는 설정 (예시)',
            '농약·중금속·기생충 전 항목 불검출 성적서 주기적 공개 (예시)',
            '폐수 방류량 0% 지향: 98.4% 폐쇄형 순환 여과 에어로포닉스 용수 재활용 (예시)',
            'Scope 1 & 3 탄소 배출량 연간 211.5 tCO2eq 감축 (예시)',
          ],
        };
    }
  };

  const info = getDocContent(title);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#bccac0] shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="p-6 border-b border-[#bccac0]/30 flex items-center justify-between bg-[#faf8ff]">
          <div>
            <h3 className="font-headline text-lg font-bold text-[#131b2e]">
              {title}
            </h3>
            <p className="font-mono text-xs text-[#006948] mt-0.5">
              {info.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6d7a72] hover:text-[#131b2e] hover:bg-gray-100 transition cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-3 font-body text-sm text-[#3d4a42]">
          {info.content.map((point, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#f2f3ff] border border-[#bccac0]/20">
              <span className="material-symbols-outlined text-[#006948] text-base shrink-0 mt-0.5">
                verified
              </span>
              <span className="leading-relaxed">{point}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#faf8ff] border-t border-[#bccac0]/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#006948] text-white font-mono text-xs rounded-lg hover:bg-[#00855d] transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
