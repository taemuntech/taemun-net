import React from 'react';

export const FieldServiceAssurance: React.FC = () => {
  return (
    <section className="bg-surface border-b border-outline-variant py-8" id="field-service">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start gap-3.5 p-4 bg-surface-container rounded-sm border border-outline-variant hover:border-primary transition-colors">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: 28 }}>
              military_tech
            </span>
            <div>
              <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                MIL-STD-810G 내환경 인증
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                저온(-40℃), 결빙, 강풍, 염수 분무 환경에서 미 국방성 규격 테스트를 통과한 원단과 금속재를 사용합니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 bg-surface-container rounded-sm border border-outline-variant hover:border-tertiary transition-colors">
            <span className="material-symbols-outlined text-tertiary" style={{ fontSize: 28 }}>
              support_agent
            </span>
            <div>
              <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                동계 캠핑장 응급 폴대 발송
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                영월, 정선, 포천, 가평 등 주요 동계 거점 캠핑장에서 파손 발생 시 당일 퀵서비스 현장 수리 부품을 지원합니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 bg-surface-container rounded-sm border border-outline-variant hover:border-secondary transition-colors">
            <span className="material-symbols-outlined text-secondary" style={{ fontSize: 28 }}>
              workspace_premium
            </span>
            <div>
              <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
                평생 안심 워런티 (Lifetime)
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                초기 봉제 불량 및 심실링 테이프 박리는 무기한 무상 수리되며, 정상 마모 부품은 원가 실비로 교체해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
