'use client';

import React, { useState } from 'react';
import { COMMIT_HEATMAP } from '../data/codexData';
import { CommitDay } from '../types';

export function InteractiveDevTerminal() {
  const [activeTab, setActiveTab] = useState<'cli' | 'heatmap'>('cli');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to CODEX Interactive Sandbox [v2.4.0-release]',
    'Type "help" or click the quick command chips below to inspect system telemetry.',
  ]);
  const [inputVal, setInputVal] = useState('');
  const [hoveredCommit, setHoveredCommit] = useState<CommitDay | null>(null);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLogs: string[] = [`$ ${cmd}`];

    if (trimmed === 'npm test' || trimmed === 'npm run test') {
      newLogs.push(
        'PASS src/backend/crdt.test.ts (2.1s)',
        '  ✓ should resolve concurrent text insert conflict without data loss (18ms)',
        '  ✓ should handle 200 simultaneous websocket peers below 50ms latency (124ms)',
        'PASS src/ai/rag_pipeline.test.ts (3.4s)',
        '  ✓ should compute cosine similarity on 1536-dim vector embeddings (45ms)',
        '  ✓ should fallback to BM25 sparse search when dense confidence < 0.7 (82ms)',
        'Test Suites: 2 passed, 2 total | Tests: 14 passed, 14 total | Snapshots: 0 | Time: 5.82s'
      );
    } else if (trimmed === 'docker compose up' || trimmed === 'docker-compose up') {
      newLogs.push(
        '[+] Running 4/4',
        ' ✔ Container codex-postgres-1   Healthy (port 5432)',
        ' ✔ Container codex-redis-1      Healthy (port 6379)',
        ' ✔ Container codex-backend-1    Started (listening on http://0.0.0.0:8000)',
        ' ✔ Container codex-frontend-1   Started (ready on http://localhost:3000)',
        'INFO: [FastAPI] Application startup complete. Uvicorn running on uvloop (workers: 4)'
      );
    } else if (trimmed === 'git log' || trimmed === 'git log --oneline') {
      newLogs.push(
        'a8f91c2 (HEAD -> main) feat: integrate Qdrant hybrid vector index for legal corpus',
        'e390bd1 perf: optimize composite B-tree index on user_sessions table',
        '71c8402 fix: handle websocket reconnection heartbeat timeout',
        '92f418a feat: implement distributed lock with redis redlock algorithm',
        '04d1a9e chore: configure github actions CI/CD for AWS ECS automated deployment'
      );
    } else if (trimmed === 'help') {
      newLogs.push(
        'Available commands:',
        '  npm test             - Execute full backend & AI unit test suite',
        '  docker compose up    - Spin up local multi-container development environment',
        '  git log              - View real student production commit history',
        '  clear                - Clear terminal logs'
      );
    } else if (trimmed === 'clear') {
      setTerminalHistory([]);
      return;
    } else {
      newLogs.push(`Command not recognized: "${cmd}". Type "help" for available commands.`);
    }

    setTerminalHistory((prev) => [...prev, ...newLogs]);
  };

  const handleCommandSubmit = () => {
    if (!inputVal) return;
    runCommand(inputVal);
    setInputVal('');
  };

  return (
    <section id="terminal-sandbox" className="py-16 lg:py-24 bg-[#050811] border-b border-emerald-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Developer Environment &amp; Learning Telemetry
            </div>
            <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white">
              실시간 개발자 CLI 콘솔 &amp; 16주 몰입 잔디
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-mono">
              실제 수강생들이 다루는 Docker 컨테이너, CI/CD 테스트 러너, 그리고
              16주 동안 한 칸도 빠짐없이 빼곡히 채워지는 Git 커밋 잔디를 확인하십시오.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('cli')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                activeTab === 'cli'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ① 인터랙티브 CLI 샌드박스
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('heatmap')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                activeTab === 'heatmap'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ② 16주 Git 커밋 잔디 (Heatmap)
            </button>
          </div>
        </div>

        {activeTab === 'cli' ? (
          /* CLI TERMINAL VIEW */
          <div className="bg-[#02050B] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl font-mono">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-zinc-400 ml-2">codex@production-dev:~/project</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span>NODE: v22.11.0</span>
                <span>DOCKER: v27.3.1</span>
                <span className="text-emerald-400">STATUS: READY</span>
              </div>
            </div>

            {/* Quick Command Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs text-zinc-500 py-1.5 self-center">빠른 명령어:</span>
              <button
                type="button"
                onClick={() => runCommand('npm test')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/50 transition-all cursor-pointer"
              >
                npm test (단위 테스트)
              </button>
              <button
                type="button"
                onClick={() => runCommand('docker compose up')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-teal-300 hover:bg-teal-950/40 hover:border-teal-500/50 transition-all cursor-pointer"
              >
                docker compose up (컨테이너 구동)
              </button>
              <button
                type="button"
                onClick={() => runCommand('git log --oneline')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                git log (커밋 그래프)
              </button>
              <button
                type="button"
                onClick={() => runCommand('clear')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                clear
              </button>
            </div>

            {/* Terminal Output Area */}
            <div className="min-h-56 max-h-80 overflow-y-auto space-y-1.5 text-xs text-zinc-300 p-4 bg-black/70 rounded-2xl border border-zinc-900">
              {terminalHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.startsWith('$')
                      ? 'text-emerald-400 font-bold'
                      : line.includes('PASS') || line.includes('✔')
                      ? 'text-emerald-300'
                      : line.includes('INFO')
                      ? 'text-cyan-300'
                      : 'text-zinc-300'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Terminal Input Controls */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-sm select-none">&gt;</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCommandSubmit();
                  }
                }}
                placeholder="명령어를 입력하세요 (예: npm test, docker compose up, help)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={handleCommandSubmit}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 active:scale-95 transition-all min-h-[38px] cursor-pointer"
              >
                실행 (Enter)
              </button>
            </div>
          </div>
        ) : (
          /* GIT COMMIT HEATMAP VIEW */
          <div className="bg-[#0B0F17] border border-emerald-500/30 rounded-3xl p-6 lg:p-8 shadow-2xl font-mono">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
              <div>
                <span className="text-xs text-emerald-400 font-bold block mb-1">
                  STUDENT REPOSITORY ACTIVITY
                </span>
                <h3 className="text-xl font-bold text-white">
                  16주간 누적 840+ 회의 실제 프로덕션 커밋 잔디 (예시)
                </h3>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Less</span>
                <span className="w-3 h-3 rounded-sm bg-[#161B22]" />
                <span className="w-3 h-3 rounded-sm bg-[#0E4429]" />
                <span className="w-3 h-3 rounded-sm bg-[#006D32]" />
                <span className="w-3 h-3 rounded-sm bg-[#26A641]" />
                <span className="w-3 h-3 rounded-sm bg-[#39D353]" />
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto pb-4">
              <div className="inline-flex gap-1.5 p-4 rounded-2xl bg-black/50 border border-zinc-800">
                {COMMIT_HEATMAP.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((day, dIdx) => {
                      let colorClass = 'bg-[#161B22]';
                      if (day.count > 6) colorClass = 'bg-[#39D353]';
                      else if (day.count > 4) colorClass = 'bg-[#26A641]';
                      else if (day.count > 2) colorClass = 'bg-[#006D32]';
                      else if (day.count > 0) colorClass = 'bg-[#0E4429]';

                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setHoveredCommit(day)}
                          className={`w-4 h-4 rounded-sm ${colorClass} cursor-pointer transition-transform hover:scale-125 border border-black/30`}
                          title={`${day.date}: ${day.count} commits`}
                        />
                      );
                    })}
                    <span className="text-[9px] text-zinc-500 text-center mt-1">W{wIdx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hovered Commit Detail Card */}
            <div className="mt-4 p-4 rounded-2xl bg-[#03060C] border border-zinc-800 flex items-center justify-between text-xs">
              {hoveredCommit ? (
                <div>
                  <span className="text-zinc-500">[{hoveredCommit.date}]</span>{' '}
                  <span className="text-emerald-400 font-bold">{hoveredCommit.count} commits</span>{' '}
                  <span className="text-zinc-300 ml-2">&quot;{hoveredCommit.commitMsg}&quot;</span>
                </div>
              ) : (
                <div className="text-zinc-500">
                  커밋 잔디 블록에 마우스를 올리면 당일 작성된 커밋 메시지와 변경 사항이 표시됩니다.
                </div>
              )}
              <span className="text-[10px] text-zinc-500">GITHUB ACTIONS VERIFIED</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
