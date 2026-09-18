import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Activity, Gauge, Zap } from 'lucide-react';
import { SimulationState } from '../types';

interface SimulationModalProps {
  simulationState: SimulationState;
  onClose: () => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({
  simulationState,
  onClose,
}) => {
  if (!simulationState.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-[#1c1b1b] border-2 border-[#ff5625] shadow-[6px_6px_0px_#000000] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2a2a2a] border-b border-[#353534]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#ff5625] animate-ping"></span>
            <span className="font-telemetry text-[13px] text-[#ffffff] font-bold tracking-wider uppercase">
              {simulationState.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#9e9b9a] hover:text-[#ffffff] p-1 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content depending on simulation type */}
        <div className="p-6">
          {simulationState.type === 'sprint' && <SprintSimulationContent />}
          {simulationState.type === 'jump' && <JumpSimulationContent />}
          {simulationState.type === 'grip' && <GripSimulationContent />}
        </div>
      </div>
    </div>
  );
};

// Sub-component 1: Sprint Drive Simulation
const SprintSimulationContent: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0.118);
  const [blockAngle, setBlockAngle] = useState(44.5);
  const [peakGrf, setPeakGrf] = useState(1420);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 2.5) {
            setIsRunning(false);
            return 2.5;
          }
          return +(prev + 0.05).toFixed(3);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setTimer(0.118);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0.118);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3">
          <span className="font-telemetry text-[10px] text-[#9e9b9a]">
            반응 잠복시간 (LATENCY)
          </span>
          <div className="font-telemetry text-[22px] text-[#c3f400] font-bold">
            {timer.toFixed(3)} s
          </div>
        </div>
        <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3">
          <span className="font-telemetry text-[10px] text-[#9e9b9a]">
            지면반력 수직 피크 (GRF)
          </span>
          <div className="font-telemetry text-[22px] text-[#ffffff] font-bold">
            {(peakGrf * (blockAngle / 45)).toFixed(0)} N
          </div>
        </div>
        <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-3">
          <span className="font-telemetry text-[10px] text-[#9e9b9a]">
            1보 발진 각도 (ANGLE)
          </span>
          <div className="font-telemetry text-[22px] text-[#ff5625] font-bold">
            {blockAngle}°
          </div>
        </div>
      </div>

      {/* Simulated Velocity Curve Graph */}
      <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] font-telemetry">
          <span className="text-[#9e9b9a]">
            HORIZON ACCELERATION PROFILE // 0 - 30M
          </span>
          <span className="text-[#c3f400]">
            {isRunning ? 'ACCELERATING...' : 'READY'}
          </span>
        </div>
        <div className="w-full h-32 relative flex items-end border-b border-[#353534]">
          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            <path
              d="M 0 100 Q 50 10 150 20 T 400 5"
              fill="none"
              stroke="#ff5625"
              strokeWidth="2.5"
            />
            <path
              d="M 0 100 Q 80 40 200 45 T 400 20"
              fill="none"
              stroke="#9e9b9a"
              strokeDasharray="4 4"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="flex justify-between text-[10px] font-telemetry text-[#9e9b9a]">
          <span>0m (블록 이탈)</span>
          <span>10m (가속도 전환)</span>
          <span>30m (최고속 도달)</span>
        </div>
      </div>

      {/* Slider for Block Angle */}
      <div className="flex flex-col gap-2 bg-[#0e0e0e] p-3 border border-[#2a2a2a]">
        <div className="flex justify-between text-[12px] font-sans">
          <span className="text-[#ffffff]">스타팅 블록 페달 각도 미세조정</span>
          <span className="text-[#c3f400] font-telemetry font-bold">
            {blockAngle}° (추천: 44.0° ~ 45.0°)
          </span>
        </div>
        <input
          type="range"
          min="38"
          max="52"
          step="0.5"
          value={blockAngle}
          onChange={(e) => setBlockAngle(parseFloat(e.target.value))}
          className="w-full accent-[#ff5625] cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="flex-1 py-3 bg-[#ff5625] hover:bg-[#ff7147] disabled:opacity-50 text-[#541100] font-sans text-[14px] font-bold uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000000]"
        >
          <Play className="w-4 h-4 fill-current" />
          {isRunning ? '측정중...' : '발진 추진 시뮬레이션 시작'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-3 bg-[#2a2a2a] hover:bg-[#353534] text-[#ffffff] border border-[#353534] flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          리셋
        </button>
      </div>
    </div>
  );
};

// Sub-component 2: Jump Slow-mo
const JumpSimulationContent: React.FC = () => {
  const [frame, setFrame] = useState(38);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setFrame((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 40);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="flex flex-col gap-6">
      {/* Visual Frame Screen */}
      <div className="relative w-full h-56 bg-[#0e0e0e] border border-[#2a2a2a] flex items-center justify-center overflow-hidden">
        <div className="absolute top-3 left-3 font-telemetry text-[11px] text-[#c3f400]">
          PHANTOM 4K // FRAME: {frame.toString().padStart(3, '0')} / 100 [
          {(frame * 0.006).toFixed(3)}s]
        </div>
        <div className="absolute top-3 right-3 font-telemetry text-[11px] text-[#ffffff]">
          TAKEOFF TRAJECTORY 1,000 FPS
        </div>

        {/* Dynamic Skeleton Representation for current frame */}
        <div className="text-center font-sans">
          <div className="text-[32px] text-[#c3f400] font-telemetry font-bold">
            {frame < 30
              ? '프레임 01: 도약 준비 및 팔 스윙 가속기'
              : frame < 65
              ? '프레임 02: 트리플 익스텐션 & 38.5° 정점 체공'
              : '프레임 03: 하체 전방 폴딩 및 충격 흡수 착지'}
          </div>
          <div className="text-[13px] text-[#9e9b9a] mt-2">
            고관절 각도: {(110 + (frame % 30)).toFixed(1)}° | 지면반력 백터: 1.48
          </div>
        </div>
      </div>

      {/* Frame Scrubber */}
      <div className="flex flex-col gap-2 bg-[#0e0e0e] p-3 border border-[#2a2a2a]">
        <div className="flex justify-between text-[11px] font-telemetry">
          <span className="text-[#9e9b9a]">SLOW-MO FRAME SCRUBBER</span>
          <span className="text-[#c3f400] font-bold">
            FRAME {frame} ({(frame * 0.006).toFixed(3)}s)
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={frame}
          onChange={(e) => setFrame(parseInt(e.target.value))}
          className="w-full accent-[#c3f400] cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-1 py-3 bg-[#c3f400] hover:bg-[#d6ff24] text-[#161e00] font-sans text-[14px] font-bold uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000000]"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
          {isPlaying ? '슬로우모션 정지' : '1000FPS 슬로우모션 재생'}
        </button>
        <button
          onClick={() => setFrame(38)}
          className="px-4 py-3 bg-[#2a2a2a] hover:bg-[#353534] text-[#ffffff] border border-[#353534] flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          도약 정점(Frame 38)
        </button>
      </div>
    </div>
  );
};

// Sub-component 3: Grip Load Cell Telemetry
const GripSimulationContent: React.FC = () => {
  const [isPressing, setIsPressing] = useState(false);
  const [currentKg, setCurrentKg] = useState(78.4);
  const [peakKg, setPeakKg] = useState(78.4);

  const handleSqueeze = () => {
    setIsPressing(true);
    const newKg = +(74 + Math.random() * 6).toFixed(1);
    setCurrentKg(newKg);
    if (newKg > peakKg) setPeakKg(newKg);
    setTimeout(() => setIsPressing(false), 600);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-4 text-center">
          <span className="font-telemetry text-[11px] text-[#9e9b9a] block mb-1">
            실시간 악력 부하 (CURRENT TORQUE)
          </span>
          <span className="font-telemetry text-[36px] text-[#ffffff] font-bold">
            {currentKg} <span className="text-[20px] text-[#9e9b9a]">kg</span>
          </span>
        </div>

        <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-4 text-center">
          <span className="font-telemetry text-[11px] text-[#9e9b9a] block mb-1">
            순간 최고 출력 (PEAK FORCE)
          </span>
          <span className="font-telemetry text-[36px] text-[#c3f400] font-bold">
            {peakKg} <span className="text-[20px] text-[#9e9b9a]">kg</span>
          </span>
        </div>
      </div>

      <div className="bg-[#0e0e0e] border border-[#2a2a2a] p-4 flex flex-col gap-3">
        <span className="font-telemetry text-[11px] text-[#9e9b9a]">
          전완근 모터유닛 활성 비율 (MOTOR UNIT SYNCHRONIZATION)
        </span>
        <div className="w-full bg-[#2a2a2a] h-3">
          <div
            className="bg-[#c3f400] h-full transition-all duration-300"
            style={{ width: `${Math.min(100, (currentKg / 80) * 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-[10px] font-telemetry text-[#9e9b9a]">
          <span>소방 만점: 64kg</span>
          <span>경찰대 만점: 64kg</span>
          <span className="text-[#ff5625]">피나클 한계: 80kg+</span>
        </div>
      </div>

      <button
        onClick={handleSqueeze}
        className="w-full py-4 bg-[#ff5625] hover:bg-[#ff7147] active:scale-[0.98] text-[#541100] font-sans text-[15px] font-bold uppercase tracking-tight flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] transition-transform cursor-pointer"
      >
        <Zap className="w-5 h-5 fill-current" />
        {isPressing ? '풀 파워 수축 계측중...' : '전자 로드셀 파지 압력 테스트 (SQUEEZE)'}
      </button>
    </div>
  );
};
