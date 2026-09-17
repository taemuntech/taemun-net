import React, { useState } from 'react';

export const BlueprintSimulator: React.FC = () => {
  const [cotCount, setCotCount] = useState<number>(4);
  const [stoveActive, setStoveActive] = useState<boolean>(true);
  const [windSpeed, setWindSpeed] = useState<number>(25); // m/s
  const [showAnchors, setShowAnchors] = useState<boolean>(true);

  // Dynamic calculations based on simulated wind speed
  const tensionEfficiency = Math.max(85, Math.min(99.4, 98.4 - (windSpeed - 25) * 0.4)).toFixed(1);
  const snowLoadSupport = Math.max(90, Math.min(140, 120 + (windSpeed < 20 ? 10 : -((windSpeed - 20) * 1.5)))).toFixed(0);
  const airVentRate = (14 + (windSpeed * 0.2)).toFixed(1);

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
          <p className="font-body-md text-body-md text-outline mt-1">
            중앙 화목난로 연통 배출 홀과 야전침대 4대를 완벽 배치할 수 있는 직경 380cm의 지오데식 거주성 지표를 확인하십시오.
          </p>
        </div>

        {/* Blueprint Interaction Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-surface-container p-3 rounded-sm border border-outline-variant">
          <div className="flex items-center gap-3">
            <span className="font-label-mono-sm text-label-mono-sm text-outline">야전침대 배치 수:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => setCotCount(count)}
                  className={`px-2.5 py-1 rounded font-label-mono-sm text-label-mono-sm transition-colors cursor-pointer ${
                    cotCount === count
                      ? 'bg-primary-container text-on-primary-container font-bold border border-primary'
                      : 'bg-surface-container-high border border-outline-variant text-outline hover:text-on-surface'
                  }`}
                >
                  {count}대
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStoveActive(!stoveActive)}
              className={`px-3 py-1 rounded font-label-mono-sm text-label-mono-sm flex items-center gap-1.5 transition-colors cursor-pointer border ${
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
              className={`px-3 py-1 rounded font-label-mono-sm text-label-mono-sm flex items-center gap-1.5 transition-colors cursor-pointer border ${
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
          {/* Left Blueprint Interactive Visual (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-6 rounded-sm relative blueprint-grid">
            {/* Top Metric Overlays */}
            <div className="flex justify-between items-center mb-6 font-label-mono-sm text-label-mono-sm border-b border-outline-variant pb-3">
              <span className="text-primary font-bold">FLAT PLAN: 3,800mm × 3,800mm</span>
              <span className="text-on-surface-variant">MAX PEAK HEIGHT: 2,100mm</span>
              <span className="bg-surface-container px-2 py-0.5 rounded text-outline">SCALE 1:25</span>
            </div>

            {/* Blueprint SVG / HTML Visualization */}
            <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center select-none">
              {/* Outer Octagonal/Geodesic Ring */}
              <div className="absolute inset-4 rounded-full border-2 border-primary/50 flex items-center justify-center transition-all duration-300">
                {/* Inner Guyline Tension Vectors */}
                <div className="absolute inset-0 border border-dashed border-outline-variant rounded-full"></div>
                <div className="absolute w-full h-[1px] bg-outline-variant"></div>
                <div className="absolute h-full w-[1px] bg-outline-variant"></div>
                <div className="absolute w-full h-[1px] bg-outline-variant rotate-45"></div>
                <div className="absolute w-full h-[1px] bg-outline-variant -rotate-45"></div>

                {/* Inner 5-Pole Diamond Geodesic Wireframe Circle */}
                <div className="absolute w-3/4 h-3/4 rounded-full border border-primary/30"></div>
                <div className="absolute w-1/2 h-1/2 rounded-full border border-dashed border-primary/20"></div>

                {/* Center Stove Setup Zone */}
                {stoveActive && (
                  <div className="w-24 h-24 rounded-full bg-tertiary-container/30 border border-tertiary flex flex-col items-center justify-center text-center p-1 z-10 transition-transform duration-300 hover:scale-105 shadow-md">
                    <span className="material-symbols-outlined text-tertiary animate-pulse" style={{ fontSize: 20 }}>
                      mode_heat
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-on-tertiary-container font-bold">
                      화목난로 구역
                    </span>
                    <span className="font-label-mono-sm text-label-mono-sm text-outline">
                      연통 배출구
                    </span>
                  </div>
                )}

                {/* Cot Placements */}
                {cotCount >= 1 && (
                  <div className="absolute top-6 left-8 bg-surface-container-high border border-outline px-2.5 py-1 rounded text-center shadow transition-all duration-300 hover:border-primary">
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface">
                      야전침대 A (190cm)
                    </span>
                  </div>
                )}
                {cotCount >= 2 && (
                  <div className="absolute top-6 right-8 bg-surface-container-high border border-outline px-2.5 py-1 rounded text-center shadow transition-all duration-300 hover:border-primary">
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface">
                      야전침대 B (190cm)
                    </span>
                  </div>
                )}
                {cotCount >= 3 && (
                  <div className="absolute bottom-6 left-8 bg-surface-container-high border border-outline px-2.5 py-1 rounded text-center shadow transition-all duration-300 hover:border-primary">
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface">
                      야전침대 C (190cm)
                    </span>
                  </div>
                )}
                {cotCount >= 4 && (
                  <div className="absolute bottom-6 right-8 bg-surface-container-high border border-outline px-2.5 py-1 rounded text-center shadow transition-all duration-300 hover:border-primary">
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface">
                      야전침대 D (190cm)
                    </span>
                  </div>
                )}

                {/* 12 Guyline Anchor Points */}
                {showAnchors && (
                  <>
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full animate-ping" />
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full" title="가이라인 팩 포인트 #1" />
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full" title="가이라인 팩 포인트 #2" />
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full" title="가이라인 팩 포인트 #3" />
                    <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-tertiary-container border border-tertiary rounded-full" title="가이라인 팩 포인트 #4" />
                    {/* Diagonal pegs */}
                    <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                    <span className="absolute bottom-3 left-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                    <span className="absolute bottom-3 right-3 w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full" />
                  </>
                )}
              </div>
            </div>

            {/* Blueprint Footer Legend */}
            <div className="mt-6 pt-3 border-t border-outline-variant flex items-center justify-between font-label-mono-sm text-label-mono-sm text-outline">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-tertiary-container border border-tertiary rounded-full inline-block"></span>
                <span>12포인트 인장력 분산 앵커 팩</span>
              </div>
              <div>중앙 기립 가능 높이 210cm</div>
            </div>
          </div>

          {/* Right Technical Spec & Wind Dynamics (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-surface-container p-5 rounded-sm border border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">air</span>
                <span>극한 외풍 25m/s 유체역학 설계</span>
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                바르그 4.2는 공기 저항 계수(Cd)를 일반 돔 텐트 대비 38% 낮춘 5라인 교차 지오데식 구조를 채택했습니다. 어떠한 방향에서 불어오는 돌풍도 텐트 외벽을 타고 미끄러지듯 흘러내려 팩 이탈을 원천 차단합니다.
              </p>

              {/* Interactive Wind Velocity Slider */}
              <div className="bg-surface-container-lowest p-3 rounded-sm border border-outline-variant mb-4">
                <div className="flex justify-between items-center mb-1.5 font-label-mono-sm text-label-mono-sm">
                  <span className="text-outline">윈드터널 모의 풍속 조절:</span>
                  <span className="text-tertiary font-bold">{windSpeed} m/s ({Math.round(windSpeed * 3.6)} km/h)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  value={windSpeed}
                  onChange={(e) => setWindSpeed(Number(e.target.value))}
                  className="w-full accent-tertiary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-outline font-mono mt-1">
                  <span>5 m/s (산들바람)</span>
                  <span>25 m/s (설산 폭풍)</span>
                  <span>35 m/s (극한 허리케인)</span>
                </div>
              </div>

              {/* Progress / Telemetry Bars */}
              <div className="space-y-3 font-label-mono-sm text-label-mono-sm">
                <div>
                  <div className="flex justify-between text-outline mb-1">
                    <span>가이라인 장력 분산 효율</span>
                    <span className="text-primary font-bold">{tensionEfficiency}% 최적화</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300"
                      style={{ width: `${tensionEfficiency}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-outline mb-1">
                    <span>설하중(積雪) 지지 능력</span>
                    <span className="text-tertiary font-bold">최대 {snowLoadSupport}kg/m² 견딤</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-tertiary-container h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (Number(snowLoadSupport) / 140) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-outline mb-1">
                    <span>내부 공기 순환 (상/하단 벤틸레이션)</span>
                    <span className="text-secondary font-bold">초당 {airVentRate}L 결로 억제</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary-container h-full transition-all duration-300"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pitching Kit Component Checklist */}
            <div className="bg-surface-container p-4 rounded-sm border border-outline-variant">
              <div className="font-label-mono-sm text-label-mono-sm text-primary mb-2 font-bold">
                [EXPEDITION PACKAGE BUNDLE] 기본 구성품
              </div>
              <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1.5 list-disc list-inside">
                <li>바르그 4.2 스킨 (70D 립스탑 실리콘/PU 방폭 코팅)</li>
                <li>DAC Featherlite NSL 11mm 풀 세트 (메인 5본 + 릿지 1본)</li>
                <li>군용 단조 팩 16EA & 초고분자량 폴리에틸렌 다이니마 가이라인 12조</li>
                <li>연통 내열 방화 실리콘 플랜지 패널 기본 장착</li>
                <li>드라이 컴프레션 기어 압축백 (완전 방수 지퍼 장착)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
