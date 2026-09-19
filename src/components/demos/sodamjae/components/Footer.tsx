"use client";

import React from 'react';
import { LOGO_URL } from '../data/hanokData';
import { SampleFooterNote } from '@/components/demo-kit/SampleFooterNote';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="w-full border-t border-[#c8c7bf]/30 bg-[#efeeec]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-12 lg:py-16 lg:px-16">
        {/* Top Row: Logo & Navigation Cluster */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-[#c8c7bf]/20">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="소담재 건축공방 로고"
              className="h-9 w-9 object-contain rounded-xs"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl text-[#161714] font-normal leading-tight">
                Sodamjae Hanok Architecture
              </span>
              <span className="text-xs text-[#474741] font-light">
                소담재 건축공방 · 프리미엄 현대식 한옥 연구소
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#474741]">
            <a href="#projects" className="text-[#161714] underline hover:text-[#904b35] transition-colors">
              건축 포트폴리오 열람
            </a>
            <a href="#master-builder" className="hover:text-[#904b35] transition-colors">
              도편수 목재 아카이브
            </a>
            <a href="#technology" className="hover:text-[#904b35] transition-colors">
              현대 단열 한옥 기술서 사양
            </a>
            <a href="#consultation" className="hover:text-[#904b35] transition-colors">
              상담 예약 및 대지 분석 안내
            </a>
            <a href="#consultation" className="hover:text-[#904b35] transition-colors">
              개인정보처리방침
            </a>
          </nav>
        </div>

        {/* Bottom Row: Legal Copyright & Certifications */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[11px] text-[#474741]">
          <p className="leading-relaxed font-light">
            © 2024 소담재 한옥건축 (Sodamjae Hanok Architecture). 등록번호(예시) 제00-00-00호 | 면허번호(예시) 제00-0000호. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[#777770]">
            <span>서울 종로구 (예시 주소)</span>
            <span>·</span>
            <span>경기 양평군 서종면 문호리 목공방</span>
          </div>
        </div>

        {/* 가상 브랜드 샘플 하단 고지 — 문구는 SampleFooterNote 한 곳이 정본(2026-09-19 형: 소담재는 실존 업체가 아니다) */}
        <div className="mt-6 border-t border-[#c8c7bf]/30 pt-4 text-center">
          <p className="text-xs text-[#474741] font-light"><SampleFooterNote /></p>
        </div>
      </div>
    </footer>
  );
};
