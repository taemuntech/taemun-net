import React from 'react';

export const SecuritySection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-high py-12 border-y border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="font-telemetry-code text-telemetry-code text-secondary font-bold uppercase">
              SECURITY &amp; REGULATORY INTEGRITY
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              국가 중요 시설 납품 기준 고등급 보안 체계
            </h2>
          </div>
          <span className="font-telemetry-code text-telemetry-code text-on-surface-variant">
            DEFENSE-GRADE STANDARDS VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-surface-container-lowest flex flex-col gap-2 shadow-sm border border-outline-variant/30 hover:border-secondary/50 transition-colors">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-xl">enhanced_encryption</span>
              <span className="font-telemetry-label text-telemetry-label font-bold text-on-surface">
                AES-256 비도 검증
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              산업 암호화 모듈 적용으로 비행 중 C2 제어 신호 및 영상 데이터 탈취(Spoofing/Jamming)를 철저히 차단합니다.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-lowest flex flex-col gap-2 shadow-sm border border-outline-variant/30 hover:border-secondary/50 transition-colors">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-xl">database</span>
              <span className="font-telemetry-label text-telemetry-label font-bold text-on-surface">
                온프레미스 데이터 보호
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              해외 클라우드 서버 경유를 일체 배제하고 고객사 폐쇄망 사내 서버에 전송 데이터를 안전하게 로컬 격리 보관합니다.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-lowest flex flex-col gap-2 shadow-sm border border-outline-variant/30 hover:border-secondary/50 transition-colors">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-xl">verified_user</span>
              <span className="font-telemetry-label text-telemetry-label font-bold text-on-surface">
                비행안전성 인증 규격 충족
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              공인 비행안전성 인증 기준 및 기체 형식증명(TC) 설계 요건을 철저히 충족합니다.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-lowest flex flex-col gap-2 shadow-sm border border-outline-variant/30 hover:border-secondary/50 transition-colors">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-xl">emergency</span>
              <span className="font-telemetry-label text-telemetry-label font-bold text-on-surface">
                방폭형 기체 설계
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              석유화학 플랜트 및 폭발 위험 가스 환경에 대응하는 Ex d IIB T4 방폭 규격 밀폐 하우징을 적용합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
