'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SMART_MEETING_ROOMS } from '../data/workData';
import { SmartMeetingRoom } from '../types';

interface MeetingRoomHUDProps {
  onOpenBookingNotice: (roomName: string) => void;
}

export const MeetingRoomHUD: React.FC<MeetingRoomHUDProps> = ({ onOpenBookingNotice }) => {
  const [rooms, setRooms] = useState<SmartMeetingRoom[]>(SMART_MEETING_ROOMS);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('room-board');

  const currentRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  // 스마트 글래스 프라이버시 모드 토글 인터랙션
  const togglePrivacyGlass = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, smartGlassPrivacy: !r.smartGlassPrivacy } : r
      )
    );
  };

  // 재실 상태 토글 인터랙션
  const toggleOccupancy = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, isOccupied: !r.isOccupied } : r
      )
    );
  };

  return (
    <section id="meeting-hud" className="py-24 bg-[#0a0c12] text-zinc-100 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              SMART FACILITY HUD & TELEMETRY
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400">IoT 센서 실시간 연동 (예시)</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white mt-1">
            스마트 회의실 중앙 환경 관제 HUD
          </h2>
          <p className="text-zinc-400 text-sm mt-2 font-light leading-relaxed">
            재실 센서, 공기질(CO2) 및 DALI 조도 제어, 불투명 스마트 글래스가 결합된 차세대 회의 공간입니다.
            직접 컨트롤러를 조작하여 스마트 오피스 환경 제어를 체험해 보세요.
          </p>
        </div>

        {/* HUD Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Room Selector & Interactive Console (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Room List Tabs */}
            <div className="space-y-2.5">
              {rooms.map((room) => {
                const isSelected = room.id === selectedRoomId;
                return (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-zinc-900 border-cyan-500/80 shadow-lg shadow-cyan-950/30'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-sm font-bold text-white">{room.name}</h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            room.isOccupied
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {room.isOccupied ? '● 사용 중' : '○ 예약 가능'}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-500">
                          {room.capacity}인실
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-light truncate">{room.type}</p>
                  </div>
                );
              })}
            </div>

            {/* Selected Room Controller Panel */}
            <div className="p-6 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 block">SELECTED ROOM</span>
                  <h3 className="text-base font-bold text-white">{currentRoom.name}</h3>
                </div>
                <button
                  onClick={() => onOpenBookingNotice(currentRoom.name)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold font-mono transition-colors"
                >
                  회의실 예약 →
                </button>
              </div>

              {/* Sensor Telemetry Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/80 text-center">
                  <span className="text-[10px] font-mono text-zinc-400 block mb-1">실내 온도</span>
                  <span className="text-base font-mono font-bold text-cyan-300">
                    {currentRoom.currentTemp}°C
                  </span>
                  <span className="text-[9px] text-zinc-500 block mt-0.5 font-mono">적정 (쾌적)</span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/80 text-center">
                  <span className="text-[10px] font-mono text-zinc-400 block mb-1">CO2 농도</span>
                  <span className="text-base font-mono font-bold text-emerald-400">
                    {currentRoom.co2Level}
                    <span className="text-[10px] ml-0.5">ppm</span>
                  </span>
                  <span className="text-[9px] text-emerald-400/80 block mt-0.5 font-mono">매우 좋음</span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/80 text-center">
                  <span className="text-[10px] font-mono text-zinc-400 block mb-1">조도 럭스</span>
                  <span className="text-base font-mono font-bold text-amber-300">
                    {currentRoom.lux}
                    <span className="text-[10px] ml-0.5">lx</span>
                  </span>
                  <span className="text-[9px] text-zinc-500 block mt-0.5 font-mono">DALI 디밍</span>
                </div>
              </div>

              {/* Interactive Control Toggles */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block">
                      스마트 프라이버시 글래스
                    </span>
                    <span className="text-[11px] text-zinc-400 font-light">
                      {currentRoom.smartGlassPrivacy ? '불투명 차폐 활성화' : '투명 개방 모드'}
                    </span>
                  </div>
                  <button
                    onClick={() => togglePrivacyGlass(currentRoom.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      currentRoom.smartGlassPrivacy
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {currentRoom.smartGlassPrivacy ? '차폐 중 (ON)' : '개방 (OFF)'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div>
                    <span className="text-xs font-semibold text-zinc-200 block">
                      재실 센서 상태 시뮬레이션
                    </span>
                    <span className="text-[11px] text-zinc-400 font-light">
                      {currentRoom.isOccupied ? '현재 회의 진행 중' : '현재 비어 있음'}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleOccupancy(currentRoom.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                      currentRoom.isOccupied
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {currentRoom.isOccupied ? '재실 중' : '공실 상태'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Boardroom Frame (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl group">
              <Image
                src="/portfolio/nexus-work/nexus-05.jpg"
                alt="넥서스 워크 스마트 보드룸"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Dynamic Glass Privacy Overlay Effect */}
              {currentRoom.smartGlassPrivacy && (
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none transition-all duration-500 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-black/80 border border-white/20 text-xs font-mono text-cyan-300">
                    🔒 SMART GLASS PRIVACY MODE ENGAGED
                  </div>
                </div>
              )}

              {/* Top Left HUD */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-zinc-200">
                <span className="text-cyan-400">ROOM:</span>
                <span className="font-bold text-white">{currentRoom.name}</span>
              </div>

              {/* Top Right Occupancy Indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentRoom.isOccupied ? 'bg-rose-500 animate-pulse' : 'bg-emerald-400'
                  }`}
                />
                <span className={currentRoom.isOccupied ? 'text-rose-300 font-bold' : 'text-emerald-300'}>
                  {currentRoom.isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  INSTALLED SMART EQUIPMENT
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentRoom.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/90 text-zinc-200 font-light border border-zinc-700/60"
                    >
                      ✓ {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Informational Guidance */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 font-light flex items-center justify-between">
              <span>회의실 스마트 글래스 및 공조 센서는 IoT 게이트웨이와 실시간 양방향 통신으로 연결됩니다.</span>
              <span className="font-mono text-cyan-400 hidden lg:inline">DALI 2.0 PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
