import React, { useState } from 'react';

const COT_LABELS = ['A', 'B', 'C', 'D'];
const COT_POSITIONS = ['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'];

export const BlueprintSimulator: React.FC = () => {
  const [cotCount, setCotCount] = useState<number>(4);
  const [stoveActive, setStoveActive] = useState<boolean>(true);
  const [windSpeed, setWindSpeed] = useState<number>(25); // m/s
  const [showAnchors, setShowAnchors] = useState<boolean>(true);

  // 슬라이더에 따라 움직이는 예시 지표(모의 계산이며 실제 측정값이 아니다)
  const tensionEfficiency = Math.max(85, Math.min(99.4, 98.4 - (windSpeed - 25) * 0.4)).toFixed(1);
  const snowLoadSupport = Math.max(
    90,
    Math.min(140, 120 + (windSpeed < 20 ? 10 : -((windSpeed - 20) * 1.5))),
  ).toFixed(0);
  const airVentRate = (14 + windSpeed * 0.2).toFixed(1);

  return (
    <section
      className="bg-surface-container-low border-y border-outline-variant py-12 lg:py-16 scroll-mt-20"
      id="dimension-sim"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 font-label-mono-sm text-label-mono-sm text-primary mb-1">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              architecture
            </span>
            <span>TENT ARCHITECTURAL BLUEPRINT // SPEC 380×380</span>
          </div>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface">
            바르그 4.2 플로어플랜 설계도 및 공간 시뮬레이터
          </h2>
          <p className="font-body-md text-body-md text-outline mt-1 [word-break:keep-all]">
            중앙 화목난로 연통 홀과 야전침대 4대를 배치했을 때의 직경 380cm 거주성을 눈으로 확인하실
            수 있습니다.
          </p>
          <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-sm border border-outline-variant bg-surface-container text-outline font-label-mono-sm text-label-mono-sm">
            아래 수치는 모의 계산 예시입니다 — 실제 시험 성적이 아닙니다
          </span>
        </div>

        {/* 조작부 */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-surface-container p-3 rounded-sm border border-outline-variant">
          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <span className="font-label-mono-sm text-label-mono-sm text-outline">
              야전침대 배치 수:
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => setCotCount(count)}
                  aria-pressed={cotCount === count}
                  className={`min-h-11 min-w-11 lg:min-h-0 lg:min-w-0 px-2.5 lg:py-1 inline-flex items-center justify-center rounded font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer border ${
                    cotCount === count
                      ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                      : 'bg-surface-container-high border-outline-variant text-outline hover:text-on-surface'
                  }`}
                >
                  {count}대
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <button
              onClick={() => setStoveActive(!stoveActive)}
              aria-pressed={stoveActive}
              className={`min-h-11 lg:min-h-0 px-3 lg:py-1 rounded font-label-mono-sm text-label-mono-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer border ${
                stoveActive
                  ? 'bg-tertiary-container text-on-tertiary-container border-tertiary'
                  : 'bg-surface-container-high border-outline-variant text-outline'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                mode_heat
              </span>
              화목난로 연통 홀 {stoveActive ? '활성 (동계)' : '수납 (하계)'}
            </button>

            <button
              onClick={() => setShowAnchors(!showAnchors)}
              aria-pressed={showAnchors}
              className={`min-h-11 lg:min-h-0 px-3 lg:py-1 rounded font-label-mono-sm text-label-mono-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer border ${
                showAnchors
                  ? 'bg-primary-container text-on-primary-container border-primary'
                  : 'bg-surface-container-high border-outline-variant text-outline'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                adjust
              </span>
              12포인트 앵커 {showAnchors ? '표시' : '숨김'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 왼쪽: 설계도 */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-4 lg:p-6 rounded-sm relative blueprint-grid overflow-hidden">
            <div className="flex flex-wrap justify-between items-center gap-x-4 gap-y-1 mb-6 font-label-mono-sm text-label-mono-sm border-b border-outline-variant pb-3">
              <span className="text-primary font-bold">FLAT PLAN: 3,800mm × 3,800mm</span>
              <span className="text-on-surface-variant">MAX PEAK HEIGHT: 2,100mm</span>
              <span className="bg-surface-container px-2 py-0.5 rounded text-outline">SCALE 1:25</span>
            </div>

            <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center select-none">
              <div className="absolute inset-4 rounded-full border-2 border-primary flex items-center justify-center transition-all duration-300">
                <div className="absolute inset-0 border border-dashed border-outline-variant rounded-full"></div>
                <div className="absolute w-full h-[1px] bg-outline-variant"></div>
                <div className="absolute h-full w-[1px] bg-outline-variant"></div>
                <div className="absolute w-full h-[1px] bg-outline-variant rotate-45"></div>
                <div className="absolute w-full h-[1px] bg-outline-variant -rotate-45"></div>

                <div className="absolute w-3/4 h-3/4 rounded-full border border-outline-variant"></div>
                <div className="absolute w-1/2 h-1/2 rounded-full border border-dashed border-outline-variant"></div>

                {stoveActive && (
                  <div className="w-24 h-24 rounded-full bg-surface-container border border-tertiary flex flex-col items-center justify-center text-center p-1 z-10 transition-transform duration-300 shadow-md">
                    <span className="material-symbols-outlined text-tertiary" style={{ fontSize: 20 }}>
                      mode_heat
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface font-bold">
                      화목난로 구역
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-outline">
                      연통 배출구
                    </span>
                  </div>
                )}

                {COT_LABELS.slice(0, cotCount).map((label, i) => (
                  <div
                    key={label}
                    className={`absolute ${COT_POSITIONS[i]} max-w-[45%] bg-surface-container-high border border-outline px-2 py-1 rounded text-center shadow transition-all duration-300`}
                  >
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface whitespace-nowrap">
                      야전침대 {label}
                    </span>
                  </div>
                ))}

                {showAnchors && (
                  <>
                    <span
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full"
                      title="가이라인 팩 포인트 A"
                    />
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full"
                      title="가이라인 팩 포인트 B"
                    />
                    <span
                      className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full"
                      title="가이라인 팩 포인트 C"
                    />
                    <span
                      className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full"
                      title="가이라인 팩 포인트 D"
                    />
                    <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                    <span className="absolute bottom-3 left-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                    <span className="absolute bottom-3 right-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-outline-variant flex flex-wrap items-center justify-between gap-2 font-label-mono-sm text-label-mono-sm text-outline">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full inline-block"></span>
                12포인트 인장력 분산 앵커 팩
              </span>
              <span>중앙 기립 가능 높이 210cm</span>
            </div>
          </div>

          {/* 오른쪽: 사양·풍속 모의 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-surface-container p-4 lg:p-5 rounded-sm border border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">air</span>
                <span>외풍 25m/s 를 상정한 유체역학 설계</span>
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4 [word-break:keep-all]">
                바르그 4.2 는 5라인 교차 지오데식 구조를 써서, 사내 모의에서 일반 돔 텐트보다 공기
                저항 계수(Cd)를 약 38% 낮춘 것으로 계산됐습니다(예시 수치). 어느 방향의 돌풍이든
                외벽을 타고 흘러 팩에 걸리는 힘을 줄이도록 설계했습니다.
              </p>

              <div className="bg-surface-container-lowest p-3 rounded-sm border border-outline-variant mb-4">
                <label
                  htmlFor="np-wind"
                  className="flex flex-wrap justify-between items-center gap-2 mb-1.5 font-label-mono-sm text-label-mono-sm"
                >
                  <span className="text-outline">모의 풍속 조절:</span>
                  <span className="text-tertiary font-bold">
                    {windSpeed} m/s ({Math.round(windSpeed * 3.6)} km/h)
                  </span>
                </label>
                <input
                  id="np-wind"
                  type="range"
                  min="5"
                  max="35"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full h-6 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-outline font-mono mt-1 gap-1">
                  <span>5 m/s</span>
                  <span>25 m/s (설산 폭풍)</span>
                  <span>35 m/s</span>
                </div>
              </div>

              <div className="space-y-3 font-label-mono-sm text-label-mono-sm">
                <div>
                  <div className="flex justify-between gap-2 text-outline mb-1">
                    <span>가이라인 장력 분산 효율</span>
                    <span className="text-primary font-bold">{tensionEfficiency}% (모의)</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${tensionEfficiency}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between gap-2 text-outline mb-1">
                    <span>설하중(積雪) 지지 능력</span>
                    <span className="text-tertiary font-bold">약 {snowLoadSupport}kg/m² (모의)</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-tertiary h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (Number(snowLoadSupport) / 140) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between gap-2 text-outline mb-1">
                    <span>내부 공기 순환 (상/하단 벤틸레이션)</span>
                    <span className="text-secondary font-bold">초당 {airVentRate}L (모의)</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Number(airVentRate) * 4)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container p-4 rounded-sm border border-outline-variant">
              <div className="font-label-mono-sm text-label-mono-sm text-primary mb-2 font-bold">
                [EXPEDITION PACKAGE BUNDLE] 기본 구성품
              </div>
              <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1.5 list-disc list-inside [word-break:keep-all]">
                <li>바르그 4.2 스킨 (70D 립스탑 실리콘/PU 코팅)</li>
                <li>경량 알루미늄 11mm 폴대 풀 세트 (메인 5본 + 릿지 1본)</li>
                <li>단조 팩 16EA &amp; 초고분자량 폴리에틸렌(UHMWPE) 가이라인 12조</li>
                <li>연통 내열 실리콘 플랜지 패널 기본 장착</li>
                <li>드라이 컴프레션 기어 압축백 (방수 지퍼)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
