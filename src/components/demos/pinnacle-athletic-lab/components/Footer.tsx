import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0e0e0e] py-10 lg:py-16 border-t border-[#2a2a2a]">
      <div className="w-full px-4 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-2">
            <span className="font-telemetry text-[12px] text-[#ffb5a0] font-bold uppercase tracking-wider">
              ACCREDITATION & STANDARDS
            </span>
            <p className="font-sans text-[13px] text-[#9e9b9a] leading-relaxed">
              국립체육대학교 (예시) 스포츠생체역학 산학협약
              <br />
              S대학교 스포츠과학연구소 (예시) 데이터베이스 연계 검증
              <br />
              경찰청 & 소방청 채용 실기시험장 공식 공인 센서 규격 채택 (K-POLICE /
              FIRE TEST SPEC 2024)
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-2">
            <span className="font-telemetry text-[12px] text-[#c3f400] font-bold uppercase tracking-wider">
              TELEMETRY HARDWARE SPEC
            </span>
            <p className="font-sans text-[13px] text-[#9e9b9a] leading-relaxed">
              Optotrak Certus 1,000Hz 3D Optical Tracker
              <br />
              Kistler Dual 3D Force Plate Matrix (FP-01/02)
              <br />
              Brower Laser Timing Gate 0.0001s Dual Beam
              <br />
              Micro-Doppler Radar Launch & Velocity System
            </p>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-2">
            <span className="font-telemetry text-[12px] text-[#ffffff] font-bold uppercase tracking-wider">
              DAECHI CAMPUS
            </span>
            <p className="font-sans text-[13px] text-[#9e9b9a] leading-relaxed">
              서울 강남구 역삼로 415 (대치 체대입시 연구센터)
              <br />
              체육대학 수시/정시 특수목적 실기 측정베이
              <br />
              TEL: 02-0000-0000 // MON-SUN 06:00 - 24:00
            </p>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-2">
            <span className="font-telemetry text-[12px] text-[#ffffff] font-bold uppercase tracking-wider">
              NORYANGJIN CAMPUS
            </span>
            <p className="font-sans text-[13px] text-[#9e9b9a] leading-relaxed">
              서울 동작구 노량진로 140 (소방·경찰 특채관)
              <br />
              공무원 체력 전용 25m 왕복달리기 및 악력/배근력 측정소
              <br />
              TEL: 02-0000-0000 // 24HR LIVE TELEMETRY
            </p>
          </div>
        </div>

        {/* Bottom copyright and live status */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-6 border-t border-[#2a2a2a] gap-4">
          <span className="font-telemetry text-[11px] text-[#9e9b9a]">
            © 2024 PINNACLE ATHLETIC LAB. ALL RIGHTS RESERVED. HIGH-PERFORMANCE
            BIOMECHANICS LAB.
          </span>

          <div className="flex items-center gap-4 text-[#9e9b9a] font-telemetry text-[11px] flex-wrap">
            <span>SYSTEM: ONLINE 1,000Hz</span>
            <span>LATENCY: 0.8ms</span>
            <span className="text-[#c3f400] font-bold">STATUS: CALIBRATED</span>
          </div>
        </div>

        {/* Sample Disclaimer */}
        <div className="pt-4 border-t border-[#2a2a2a]/60 text-center">
          <p className="font-sans text-[11px] text-[#9e9b9a]">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
        </div>
      </div>
    </footer>
  );
};
