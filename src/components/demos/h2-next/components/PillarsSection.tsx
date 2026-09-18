'use client';

import React, { useState } from 'react';
import { PILLARS_DATA } from '../data/mockData';
import type { PillarData } from '../types';
import { Wind, Snowflake, Network, Cpu, ArrowUpRight, ArrowRight } from './Icons';
import { DetailModal } from './DetailModal';

export const PillarsSection: React.FC = () => {
  // 「상세 스펙 시트」는 앵커로 문의 폼에 던져 두지 않고 카드의 상세 모달을 연다(빈 모달·죽은 링크 금지).
  const [detailPillar, setDetailPillar] = useState<PillarData | null>(null);

  const getPillarIcon = (iconName: string, colorType: 'primary' | 'secondary') => {
    const colorClass = colorType === 'primary' ? 'text-[#00685f]' : 'text-[#006398]';
    switch (iconName) {
      case 'cyclone':
        return <Wind className={`w-6 h-6 ${colorClass} group-hover:scale-110 transition-transform`} />;
      case 'ac_unit':
        return <Snowflake className={`w-6 h-6 ${colorClass} group-hover:scale-110 transition-transform`} />;
      case 'hub':
        return <Network className={`w-6 h-6 ${colorClass} group-hover:scale-110 transition-transform`} />;
      default:
        return <Cpu className={`w-6 h-6 ${colorClass}`} />;
    }
  };

  return (
    <section id="pillars" className="py-16 bg-[#f8f9ff] border-b border-[#bcc9c6]/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[#00685f] font-mono text-xs uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>Proprietary Green Hydrogen Engineering</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-[#0b1c30] [word-break:keep-all]">
              3대 핵심 청정에너지 솔루션
            </h2>
          </div>
          <div className="mt-3 lg:mt-0 lg:text-right">
            <p className="text-sm lg:text-base text-[#3d4947] max-w-lg leading-relaxed [word-break:keep-all]">
              해상풍력의 잉여 전력을 무탄소 분자(H2)로 치환하고, 극저온 액화와 분산형 전력망을 통해 산업 현장에 공급합니다.
            </p>
            {/* 규격·효율 값이 실적처럼 읽히지 않게 구역 머리에 한 번 적는다 */}
            <span className="mt-2 inline-block rounded-full border border-[#bcc9c6]/50 bg-white px-2.5 py-1 font-mono text-[11px] text-[#6d7a77] [word-break:keep-all]">
              아래 규격·효율 값은 모두 예시 수치입니다
            </span>
          </div>
        </div>

        {/* Pillar Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PILLARS_DATA.map((pillar) => {
            const isPrimary = pillar.colorType === 'primary';
            const badgeBg = isPrimary
              ? 'bg-[#00685f]/10 text-[#00685f] border-[#00685f]/20'
              : 'bg-[#006398]/10 text-[#006398] border-[#006398]/20';
            const accentText = isPrimary ? 'text-[#00685f]' : 'text-[#006398]';

            return (
              <div
                key={pillar.id}
                id={pillar.id}
                // 푸터의 기술 링크가 이 카드로 바로 온다 — 고정 헤더에 가리지 않게 여백을 둔다
                style={{ scrollMarginTop: '6rem' }}
                className="bg-white rounded-xl border border-[#bcc9c6]/50 p-6 shadow-xs hover:border-[#00685f]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#e5eeff] mb-4">
                    <span className={`font-mono text-xs px-2.5 py-1 rounded font-semibold border ${badgeBg}`}>
                      {pillar.pillarNum}
                    </span>
                    {getPillarIcon(pillar.icon, pillar.colorType)}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#0b1c30] mb-2 [word-break:keep-all]">{pillar.title}</h3>
                  <p className="text-sm text-[#3d4947] mb-5 leading-relaxed [word-break:keep-all]">{pillar.desc}</p>

                  {/* Progress Metric Bar — 좁은 폭에서 라벨과 값이 서로를 밀지 않게 모바일은 두 줄로 */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3 font-mono text-xs text-[#3d4947]">
                      <span className="[word-break:keep-all]">{pillar.progressLabel}</span>
                      <span className={`font-bold ${accentText}`}>{pillar.progressValue}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isPrimary
                            ? 'bg-gradient-to-r from-[#006398] to-[#00685f]'
                            : 'bg-gradient-to-r from-[#00685f] to-[#006398]'
                        }`}
                        style={{ width: `${pillar.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Technical Specification Table — 모바일은 라벨/값 두 줄, sm 이상은 한 줄 양끝 */}
                  <div className="rounded-lg bg-[#eff4ff] p-3 space-y-2 border border-[#bcc9c6]/30 font-mono text-xs">
                    {pillar.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3 text-[#3d4947]"
                      >
                        <span className="[word-break:keep-all]">{spec.label}</span>
                        <span className="font-bold text-[#0b1c30] sm:text-right [word-break:keep-all]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="mt-6 pt-3 border-t border-[#e5eeff] flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#6d7a77] [word-break:keep-all]">{pillar.certLabel}</span>
                  {/*
                    예전에는 actionHref 가 있는 카드(3번)만 앵커로 빠져 상세 모달이 아예 열리지 않았다 —
                    데이터에는 본문이 다 들어 있는데 화면에 나올 길이 없었다. 셋 다 모달로 통일하고,
                    계산기로 보내는 동선은 모달 footer 버튼이 맡는다.
                  */}
                  <button
                    type="button"
                    onClick={() => setDetailPillar(pillar)}
                    aria-haspopup="dialog"
                    className={`text-sm font-semibold hover:underline inline-flex items-center gap-1 py-2 max-lg:py-3 cursor-pointer ${accentText}`}
                  >
                    <span>{pillar.actionText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 기술 카드 상세 — 카드마다 본문이 채워져 있다(빈 모달 금지) */}
      <DetailModal
        open={detailPillar !== null}
        onClose={() => setDetailPillar(null)}
        eyebrow={detailPillar?.pillarNum}
        title={detailPillar?.title ?? ''}
        footer={
          <div className="flex w-full flex-col gap-2 lg:w-auto lg:flex-row">
          {detailPillar?.actionHref && (
            <a
              href={detailPillar.actionHref}
              onClick={(e) => {
                // 모달을 먼저 닫고 옮긴다 — 포커스 복원이 화면을 되돌리는 것을 피하려고 아래와 같은 방식
                e.preventDefault();
                const targetId = detailPillar.actionHref!.replace('#', '');
                setDetailPillar(null);
                window.setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 0);
              }}
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#00685f] px-5 text-sm font-semibold text-[#00685f] transition-colors hover:bg-[#eff4ff] lg:w-auto"
            >
              <span>PPA 단가 산출기 열기</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
          <a
            href="#consultation"
            onClick={(e) => {
              // 모달이 닫히면 useSampleDialog 가 포커스를 이 카드 버튼으로 되돌리며 화면을 위로 당긴다.
              // 해시 이동을 그대로 두면 문의 구역으로 갔다가 되돌아오므로, 닫힌 뒤에 직접 옮긴다.
              e.preventDefault();
              setDetailPillar(null);
              window.setTimeout(() => {
                document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 0);
            }}
            className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#00685f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#008378] lg:w-auto"
          >
            <span>이 기술로 제휴 문의</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          </div>
        }
      >
        {detailPillar && (
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-[#3d4947] [word-break:keep-all]">
              {detailPillar.detail.overview}
            </p>

            {/* 카드에 있던 규격표를 그대로 다시 보여 준다 — 모달을 닫지 않고도 대조할 수 있게 */}
            <div className="rounded-xl border border-[#bcc9c6]/40 bg-[#eff4ff] p-4">
              <span className="mb-2.5 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6d7a77]">
                Key Specification (예시)
              </span>
              <dl className="space-y-2 font-mono text-xs">
                {detailPillar.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3">
                    <dt className="text-[#3d4947] [word-break:keep-all]">{spec.label}</dt>
                    <dd className="font-bold text-[#0b1c30] sm:text-right [word-break:keep-all]">{spec.value}</dd>
                  </div>
                ))}
                <div className="flex flex-col gap-0.5 border-t border-[#bcc9c6]/40 pt-2 sm:flex-row sm:justify-between sm:gap-3">
                  <dt className="text-[#3d4947] [word-break:keep-all]">{detailPillar.progressLabel}</dt>
                  <dd className="font-bold text-[#00685f] sm:text-right [word-break:keep-all]">
                    {detailPillar.progressValue}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              {detailPillar.detail.blocks.map((block, i) => (
                <div key={i}>
                  <h4 className="mb-1 text-sm font-bold text-[#0b1c30] [word-break:keep-all]">{block.title}</h4>
                  <p className="text-sm leading-relaxed text-[#3d4947] [word-break:keep-all]">{block.body}</p>
                </div>
              ))}
            </div>

            <div>
              <span className="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#6d7a77]">
                적용 분야
              </span>
              <div className="flex flex-wrap gap-2">
                {detailPillar.detail.applications.map((app) => (
                  <span
                    key={app}
                    className="rounded-full border border-[#bcc9c6]/50 bg-white px-3 py-1 text-xs text-[#3d4947] [word-break:keep-all]"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <p className="rounded-lg border border-[#00685f]/30 bg-[#f8f9ff] px-3 py-2.5 text-[12px] leading-relaxed text-[#0b1c30] [word-break:keep-all]">
              {detailPillar.detail.note}
            </p>
          </div>
        )}
      </DetailModal>
    </section>
  );
};
