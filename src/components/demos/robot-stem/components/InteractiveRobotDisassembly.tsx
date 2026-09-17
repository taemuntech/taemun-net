'use client';

import React, { useState } from 'react';
import { ROBOT_PARTS } from '../data/robotData';
import { RobotPart } from '../types';

export function InteractiveRobotDisassembly() {
  const [activeTab, setActiveTab] = useState<'explode' | 'control'>('explode');
  const [explodeRate, setExplodeRate] = useState<number>(50);
  const [selectedPart, setSelectedPart] = useState<RobotPart>(ROBOT_PARTS[0]);

  // Joint Angles for Kinematics simulation
  const [baseAngle, setBaseAngle] = useState<number>(0);
  const [shoulderAngle, setShoulderAngle] = useState<number>(45);
  const [elbowAngle, setElbowAngle] = useState<number>(-30);
  const [gripperOpen, setGripperOpen] = useState<number>(60);

  // Computed joint positions for SVG rendering
  // Base at (200, 280)
  const basePos = { x: 200, y: 280 };
  const radS = ((shoulderAngle - 90) * Math.PI) / 180;
  const link1Len = 90;
  const elbowPos = {
    x: basePos.x + link1Len * Math.cos(radS),
    y: basePos.y + link1Len * Math.sin(radS),
  };
  const radE = ((shoulderAngle - 90 + elbowAngle) * Math.PI) / 180;
  const link2Len = 80;
  const wristPos = {
    x: elbowPos.x + link2Len * Math.cos(radE),
    y: elbowPos.y + link2Len * Math.sin(radE),
  };

  const explodeFactor = explodeRate / 100;

  return (
    <section id="robot-lab" className="py-16 lg:py-24 bg-[#0A0D18] border-b border-orange-500/20 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              Kinematics &amp; Hardware Telemetry Lab
            </div>
            <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white">
              4자유도(4-DOF) 로봇암 분해 &amp; 실시간 제어 시뮬레이터
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
              하드웨어 분해도(Exploded View)로 기계 기구의 구조를 분해·조립하고,
              각 관절의 서보 각도를 제어하여 실시간 아두이노 및 ROS 2 코드를 즉각 확인하십시오.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('explode')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                activeTab === 'explode'
                  ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ① 기구 분해도 (Exploded View)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('control')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all min-h-[38px] cursor-pointer ${
                activeTab === 'control'
                  ? 'bg-orange-500 text-slate-950 shadow-md shadow-orange-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ② 실시간 관절 제어 &amp; Live Code
            </button>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas (SVG Visualizer) */}
          <div className="lg:col-span-7 bg-[#070A12] border border-orange-500/20 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient HUD marks */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-500 flex gap-4">
              <span>SYS: KINETICS-ARM-V4</span>
              <span>DOF: 4-AXIS SERVO</span>
              <span className="text-orange-400">STATUS: ACTIVE</span>
            </div>

            {/* SVG Visualizer */}
            <div className="w-full h-80 lg:h-96 flex items-center justify-center relative my-4">
              <svg viewBox="0 0 400 350" className="w-full h-full select-none">
                {/* Grid guidelines */}
                <line x1="40" y1="280" x2="360" y2="280" stroke="#1F2937" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="200" cy="280" r="80" fill="none" stroke="#1F2937" strokeWidth="1" strokeDasharray="2 4" />

                {activeTab === 'explode' ? (
                  /* EXPLODED VIEW RENDER */
                  <g className="transition-all duration-300 ease-out">
                    {/* Part 4: Controller Board (Bottom offset) */}
                    <g
                      transform={`translate(${ROBOT_PARTS[3].explodedOffset.x * explodeFactor}, ${ROBOT_PARTS[3].explodedOffset.y * explodeFactor})`}
                      onClick={() => setSelectedPart(ROBOT_PARTS[3])}
                      className="cursor-pointer group"
                    >
                      <rect
                        x="150"
                        y="280"
                        width="100"
                        height="40"
                        rx="6"
                        fill="#0F172A"
                        stroke={selectedPart.id === 'part-controller' ? '#F97316' : '#334155'}
                        strokeWidth={selectedPart.id === 'part-controller' ? '2.5' : '1.5'}
                      />
                      <circle cx="165" cy="300" r="4" fill="#38BDF8" className="animate-pulse" />
                      <rect x="180" y="290" width="30" height="20" fill="#1E293B" rx="2" />
                      <text x="220" y="304" fill="#94A3B8" fontSize="9" fontFamily="monospace">ESP32</text>
                    </g>

                    {/* Part 3: Servos / Base Turntable */}
                    <g
                      transform={`translate(${ROBOT_PARTS[2].explodedOffset.x * explodeFactor}, ${ROBOT_PARTS[2].explodedOffset.y * explodeFactor})`}
                      onClick={() => setSelectedPart(ROBOT_PARTS[2])}
                      className="cursor-pointer group"
                    >
                      <rect
                        x="170"
                        y="230"
                        width="60"
                        height="40"
                        rx="4"
                        fill="#1E293B"
                        stroke={selectedPart.id === 'part-servos' ? '#F97316' : '#475569'}
                        strokeWidth={selectedPart.id === 'part-servos' ? '2.5' : '1.5'}
                      />
                      <circle cx="200" cy="250" r="10" fill="#0F172A" stroke="#F97316" strokeWidth="2" />
                      <text x="200" y="222" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontFamily="monospace">SERVO-M1</text>
                    </g>

                    {/* Part 2: Carbon Arm Link */}
                    <g
                      transform={`translate(${ROBOT_PARTS[1].explodedOffset.x * explodeFactor}, ${ROBOT_PARTS[1].explodedOffset.y * explodeFactor})`}
                      onClick={() => setSelectedPart(ROBOT_PARTS[1])}
                      className="cursor-pointer group"
                    >
                      <line
                        x1="185"
                        y1="230"
                        x2="150"
                        y2="130"
                        stroke={selectedPart.id === 'part-arm' ? '#F97316' : '#64748B'}
                        strokeWidth="12"
                        strokeLinecap="round"
                      />
                      <line
                        x1="185"
                        y1="230"
                        x2="150"
                        y2="130"
                        stroke="#0F172A"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <circle cx="150" cy="130" r="8" fill="#1E293B" stroke="#F97316" strokeWidth="2" />
                      <text x="130" y="180" fill="#CBD5E1" fontSize="9" fontFamily="monospace">CARBON-LINK</text>
                    </g>

                    {/* Part 1: Gripper (Top offset) */}
                    <g
                      transform={`translate(${ROBOT_PARTS[0].explodedOffset.x * explodeFactor}, ${ROBOT_PARTS[0].explodedOffset.y * explodeFactor})`}
                      onClick={() => setSelectedPart(ROBOT_PARTS[0])}
                      className="cursor-pointer group"
                    >
                      <path
                        d="M 140 120 L 130 90 L 145 90 L 150 110 L 155 90 L 170 90 L 160 120 Z"
                        fill="#F97316"
                        stroke={selectedPart.id === 'part-gripper' ? '#FDE047' : '#C2410C'}
                        strokeWidth="2"
                      />
                      <rect x="145" y="115" width="10" height="15" fill="#334155" rx="2" />
                      <text x="150" y="75" textAnchor="middle" fill="#FDBA74" fontSize="9" fontFamily="monospace">2-FINGER GRIP</text>
                    </g>

                    {/* Exploded dashed lines when separated */}
                    {explodeFactor > 0.1 && (
                      <g stroke="#F97316" strokeWidth="1" strokeDasharray="3 3" opacity={explodeFactor * 0.7}>
                        <line x1="200" y1="280" x2={200 + ROBOT_PARTS[3].explodedOffset.x * explodeFactor} y2={280 + ROBOT_PARTS[3].explodedOffset.y * explodeFactor} />
                        <line x1="200" y1="230" x2={200 + ROBOT_PARTS[2].explodedOffset.x * explodeFactor} y2={230 + ROBOT_PARTS[2].explodedOffset.y * explodeFactor} />
                        <line x1="185" y1="230" x2={185 + ROBOT_PARTS[1].explodedOffset.x * explodeFactor} y2={230 + ROBOT_PARTS[1].explodedOffset.y * explodeFactor} />
                        <line x1="150" y1="130" x2={150 + ROBOT_PARTS[0].explodedOffset.x * explodeFactor} y2={130 + ROBOT_PARTS[0].explodedOffset.y * explodeFactor} />
                      </g>
                    )}
                  </g>
                ) : (
                  /* KINEMATICS ACTIVE CONTROL RENDER */
                  <g className="transition-all duration-150">
                    {/* Base Pedestal */}
                    <rect x="160" y="270" width="80" height="20" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                    <rect x="180" y="250" width="40" height="20" rx="3" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
                    <circle cx="200" cy="260" r="5" fill="#F97316" />

                    {/* Link 1: Base to Elbow */}
                    <line
                      x1={basePos.x}
                      y1={basePos.y - 20}
                      x2={elbowPos.x}
                      y2={elbowPos.y}
                      stroke="#475569"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <line
                      x1={basePos.x}
                      y1={basePos.y - 20}
                      x2={elbowPos.x}
                      y2={elbowPos.y}
                      stroke="#0F172A"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    {/* Joint 2: Elbow Servo */}
                    <circle cx={elbowPos.x} cy={elbowPos.y} r="10" fill="#1E293B" stroke="#F97316" strokeWidth="2.5" />

                    {/* Link 2: Elbow to Wrist */}
                    <line
                      x1={elbowPos.x}
                      y1={elbowPos.y}
                      x2={wristPos.x}
                      y2={wristPos.y}
                      stroke="#64748B"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />

                    {/* Joint 3: Wrist & End Effector */}
                    <circle cx={wristPos.x} cy={wristPos.y} r="7" fill="#F97316" />

                    {/* Gripper Fingers */}
                    <g transform={`translate(${wristPos.x}, ${wristPos.y})`}>
                      {/* Left finger */}
                      <path
                        d={`M 0 0 L ${-10 - (gripperOpen / 100) * 15} -25 L ${-5 - (gripperOpen / 100) * 15} -35`}
                        stroke="#F97316"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Right finger */}
                      <path
                        d={`M 0 0 L ${10 + (gripperOpen / 100) * 15} -25 L ${5 + (gripperOpen / 100) * 15} -35`}
                        stroke="#F97316"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  </g>
                )}
              </svg>
            </div>

            {/* Bottom Controls depending on active tab */}
            <div className="pt-4 border-t border-zinc-800">
              {activeTab === 'explode' ? (
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-zinc-400">분해율 (Exploded Offset):</span>
                    <span className="text-orange-400 font-bold">{explodeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={explodeRate}
                    onChange={(e) => setExplodeRate(Number(e.target.value))}
                    className="w-full accent-orange-500 h-2 bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                    <span>0% (완전 조립 상태)</span>
                    <span>100% (완전 분해도)</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-zinc-400">J1: Shoulder 각도</span>
                      <span className="text-orange-400">{shoulderAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="110"
                      value={shoulderAngle}
                      onChange={(e) => setShoulderAngle(Number(e.target.value))}
                      className="w-full accent-orange-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-zinc-400">J2: Elbow 각도</span>
                      <span className="text-orange-400">{elbowAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={elbowAngle}
                      onChange={(e) => setElbowAngle(Number(e.target.value))}
                      className="w-full accent-orange-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-zinc-400">J3: Gripper 개폐</span>
                      <span className="text-orange-400">{gripperOpen}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={gripperOpen}
                      onChange={(e) => setGripperOpen(Number(e.target.value))}
                      className="w-full accent-orange-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono mb-1">
                      <span className="text-zinc-400">J0: Base 회전각</span>
                      <span className="text-orange-400">{baseAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      value={baseAngle}
                      onChange={(e) => setBaseAngle(Number(e.target.value))}
                      className="w-full accent-orange-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Detail Panel */}
          <div className="lg:col-span-5 space-y-4">
            {activeTab === 'explode' ? (
              /* Part Specification Card */
              <div className="p-6 rounded-3xl bg-[#0F172A] border border-orange-500/30 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/40">
                    PART SPECIFICATION
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    ID: {selectedPart.id}
                  </span>
                </div>

                <h3 className="text-lg lg:text-xl font-mono font-bold text-white mb-1">
                  {selectedPart.name}
                </h3>
                <span className="text-xs text-orange-400 font-semibold block mb-4">
                  분류: {selectedPart.category}
                </span>

                <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 font-mono text-xs text-amber-300 mb-4">
                  {selectedPart.spec}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {selectedPart.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-zinc-800">
                  <span className="text-[11px] text-zinc-400 font-medium block">
                    모듈 선택 빠른 전환:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {ROBOT_PARTS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPart(p)}
                        className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          selectedPart.id === p.id
                            ? 'bg-orange-500/20 border border-orange-500 text-white font-bold'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {p.name.split('(')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Live Code Generator Terminal */
              <div className="p-6 rounded-3xl bg-[#030712] border border-zinc-800 shadow-xl font-mono">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs text-zinc-400 ml-2">robot_arm_kinematics.ino</span>
                  </div>
                  <span className="text-[10px] text-orange-400 px-2 py-0.5 rounded bg-orange-500/10">
                    LIVE SYNC
                  </span>
                </div>

                <pre className="text-xs text-zinc-300 overflow-x-auto p-2 bg-black/60 rounded-xl leading-relaxed">
{`// 4-DOF 로봇암 관절 제어 실시간 C++ 코드
#include <Servo.h>

Servo servoBase, servoShoulder, servoElbow, servoGrip;

void setup() {
  servoBase.attach(9);
  servoShoulder.attach(10);
  servoElbow.attach(11);
  servoGrip.attach(12);
}

void loop() {
  // 슬라이더 값 실시간 반영
  servoBase.write(${baseAngle + 90});      // Base: ${baseAngle}°
  servoShoulder.write(${shoulderAngle}); // Shoulder: ${shoulderAngle}°
  servoElbow.write(${elbowAngle + 60});    // Elbow: ${elbowAngle}°
  servoGrip.write(${gripperOpen});       // Gripper: ${gripperOpen}%
  delay(15);
}`}
                </pre>

                <div className="mt-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[11px] text-orange-300 leading-normal">
                  💡 <strong>키네틱스 코딩 원리:</strong> 슬라이더의 물리적 회전각이 아두이노 PWM 듀티비(544µs~2400µs)로 실시간 변환되어 로봇 관절의 토크를 제어합니다.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
