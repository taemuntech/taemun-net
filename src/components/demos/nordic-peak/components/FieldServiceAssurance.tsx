import React from 'react';

// 여기 3장은 「인증」·「평생 보증」처럼 지킬 수 없는 말이 들어가기 쉬운 자리다.
// 규격 이름은 「기준을 참고한 자체 시험 (예시 표기)」으로만 적고, 보증 범위는 정책 예시로 적는다.
const ITEMS = [
  {
    icon: 'military_tech',
    hoverBorder: 'hover:border-primary',
    iconTone: 'text-primary',
    title: 'MIL-STD-810G 기준 참고 내환경 시험 (예시 표기)',
    body: '저온(-40℃)·결빙·강풍·염수 분무 조건에서 해당 규격의 시험 항목을 참고해 자체 시험한 원단과 금속재를 씁니다. 공인 인증기관의 인증은 아닙니다.',
  },
  {
    icon: 'support_agent',
    hoverBorder: 'hover:border-tertiary',
    iconTone: 'text-tertiary',
    title: '동계 캠핑장 응급 폴대 발송 (예시 서비스)',
    body: '영월·정선·포천·가평 등 동계 거점 캠핑장에서 파손이 생기면 현장 수리 부품 발송을 도와 드립니다. 운영 시간과 지역은 시즌마다 달라집니다.',
  },
  {
    icon: 'workspace_premium',
    hoverBorder: 'hover:border-secondary',
    iconTone: 'text-secondary',
    title: '장기 수리 지원 정책 (예시)',
    // 1인칭 현재형 약속(「…해 드립니다」)은 지킬 수 없는 보증 문구로 읽힌다 — 표기 자리 안내형으로 둔다.
    body: '초기 봉제 불량·심실링 테이프 박리의 무상 수리 기간과, 정상 마모 부품의 실비 교체 조건을 이 자리에 표기합니다. (예시 문안 — 실제 보증 조건은 운영 정책 문서로 정합니다.)',
  },
];

export const FieldServiceAssurance: React.FC = () => {
  return (
    <section className="bg-surface border-b border-outline-variant py-8 scroll-mt-20" id="field-service">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-6">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className={`flex items-start gap-3.5 p-4 bg-surface-container rounded-sm border border-outline-variant transition-colors ${it.hoverBorder}`}
            >
              <span
                className={`material-symbols-outlined shrink-0 ${it.iconTone}`}
                style={{ fontSize: 28 }}
              >
                {it.icon}
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1 [word-break:keep-all]">
                  {it.title}
                </h4>
                <p className="font-body-sm text-body-sm text-outline [word-break:keep-all]">{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
