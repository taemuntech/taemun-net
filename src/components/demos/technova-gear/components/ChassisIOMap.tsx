'use client';

import React, { useState } from 'react';

export const ChassisIOMap: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState<string | null>(null);

  const portDetails: Record<string, { title: string; bandwidth: string; spec: string; note: string }> = {
    dc: {
      title: 'DC-In 330W 슬림 어댑터',
      bandwidth: '20V / 16.5A (최대 330W)',
      spec: 'GaN(질화갈륨) FET 아키텍처',
      note: '급속 충전 시 30분에 70% 충전 (예시 수치). 고부하 구간에서도 정격 출력을 유지하도록 설계했습니다.',
    },
    hdmi: {
      title: 'HDMI 2.1 FRL',
      bandwidth: '48Gbps (4 레인 12Gbps)',
      spec: 'Fixed Rate Link 규격 지원',
      note: 'DSC 압축 적용 시 4K 240Hz 10bit HDR 및 8K 60Hz 출력, 가변 주사율(VRR)·자동 저지연(ALLM) 지원.',
    },
    lan: {
      title: '2.5G 이더넷 컨트롤러',
      bandwidth: '2,500Mbps 풀듀플렉스',
      spec: '패킷 우선순위 엔진 (자체 표기)',
      note: '게임 트래픽을 먼저 내보내 버퍼블로트를 줄이고, 핑 변동을 완화하도록 대역폭을 배분합니다.',
    },
    tb4: {
      title: 'USB4 40Gbps x2 포트',
      bandwidth: '40Gbps 양방향 전송 x2',
      spec: 'PCIe 32Gbps 터널링 / DisplayPort 1.4a',
      note: '최대 100W USB-PD 고속 충전, 8K 모니터 출력 및 고성능 외장 eGPU 도킹 호환.',
    },
    dac: {
      title: '3.5mm Hi-Fi 콤보 잭 (쿼드 DAC 내장)',
      bandwidth: '32-bit / 384kHz PCM, DSD512',
      spec: 'SNR 130dB, THD+N -115dB',
      note: '스튜디오 모니터링급 600옴 하이 임피던스 헤드폰 직결 가능. 오디오 왜곡 최소화 기술 탑재.',
    },
    vent: {
      title: '에어로다이내믹 4웨이 벤트',
      bandwidth: '풍량 67 CFM / 유속 8.2 m/s',
      spec: '280매 초박형 0.1mm 구리 방열핀',
      note: '섀시 후면 및 측면으로 신속히 배출되는 에어로 터널 설계로 키보드 팜레스트 표면 온도 34°C 이하 유지.',
    },
    usba: {
      title: 'USB 3.2 Gen2 Type-A x2',
      bandwidth: '10Gbps 대역폭 (포트당)',
      spec: 'Sleep-and-Charge 고속 충전 지원',
      note: '시스템 전원이 꺼져 있어도 스마트폰, 무선 마우스 등 외부 기기를 상시 고속 충전 가능.',
    },
    sd: {
      title: 'UHS-II SD 익스프레스 카드 슬롯',
      bandwidth: '최대 312MB/s 읽기/쓰기',
      spec: 'SD 4.0 / UHS-II 버스 인터페이스',
      note: '4K/8K RAW 카메라 영상 및 사진 데이터를 외부 카드리더기 없이 초고속으로 즉시 백업.',
    },
    kensington: {
      title: '켄싱턴 나노(Nano) 보안 슬롯',
      bandwidth: '물리적 잠금 규격',
      spec: 'T-Bar 클리트 앵커링 시스템',
      note: '오프라인 전시회, 대회장 및 공유 오피스에서 쓰는 도난 방지 잠금 케이블을 체결할 수 있습니다.',
    },
  };

  return (
    <section id="chassis-interface-section" className="bg-[#0a0e16] border border-[#424754] rounded-xl p-4 lg:p-6 spec-hairline">
      {/* Header */}
      <div className="border-b border-[#424754]/80 pb-2 mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[#4cd7f6] font-label text-xs font-bold uppercase tracking-wider block">
            CHASSIS INTERFACE &amp; ARCHITECTURE
          </span>
          <h2 className="text-lg lg:text-xl font-headline font-bold text-[#dfe2ee]">
            TECHNOVA TITAN 16 PRO 물리적 I/O 인터페이스 맵
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-label">
          <span className="text-[#8c909f]">섀시 재질: 6000시리즈 CNC 알루미늄 (예시 사양)</span>
        </div>
      </div>

      {/* Port Inspection Alert if selected */}
      {selectedPort && portDetails[selectedPort] && (
        <div className="mb-4 p-3 bg-[#181c24] border border-[#4cd7f6] rounded-lg text-xs flex items-start justify-between gap-3 animate-fadeIn">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping"></span>
              <span className="font-bold text-[#4cd7f6]">{portDetails[selectedPort].title}</span>
              <span className="text-[10px] font-label text-[#8c909f] bg-[#0a0e16] px-1.5 py-0.5 rounded border border-[#424754]">
                {portDetails[selectedPort].spec}
              </span>
            </div>
            <div className="mt-1 text-[#dfe2ee]">대역폭: <span className="font-bold text-[#adc6ff]">{portDetails[selectedPort].bandwidth}</span></div>
            <div className="text-[11px] text-[#c2c6d6] mt-0.5">{portDetails[selectedPort].note}</div>
          </div>
          <button
            onClick={() => setSelectedPort(null)}
            type="button"
            className="text-[#8c909f] hover:text-[#dfe2ee] text-xs font-label cursor-pointer min-h-11 min-w-11 shrink-0"
          >
            닫기
          </button>
        </div>
      )}

      {/* 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Rear Ports Array */}
        <div className="bg-[#181c24] border border-[#424754] rounded p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-label border-b border-[#424754]/60 pb-1.5">
            <span className="text-[#adc6ff] font-bold">후면 인터페이스 (Rear Deck)</span>
            <span className="text-[#8c909f] text-[10px]">고대역폭 전원 &amp; 디스플레이</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('dc')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                power
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">DC-In 330W 슬림 어댑터</span>
                <span className="text-[11px] text-[#8c909f]">GaN 초소형 고효율 급속 충전 지원</span>
              </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('hdmi')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                settings_input_hdmi
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">HDMI 2.1 FRL (최대 48Gbps)</span>
                <span className="text-[11px] text-[#8c909f]">4K 144Hz / 8K 60Hz 무손실 외장 출력</span>
              </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('lan')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#4cd7f6] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                lan
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">RJ-45 2.5G 초고속 이더넷</span>
                <span className="text-[11px] text-[#8c909f]">로우 레이턴시 게이밍 NIC</span>
              </div>
              </button>
            </li>
          </ul>
        </div>

        {/* Left Side Ports */}
        <div className="bg-[#181c24] border border-[#424754] rounded p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-label border-b border-[#424754]/60 pb-1.5">
            <span className="text-[#4cd7f6] font-bold">좌측 인터페이스 (Left Rail)</span>
            <span className="text-[#8c909f] text-[10px]">초고속 데이터 &amp; 오디오</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('tb4')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#adc6ff] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                bolt
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">USB4 40Gbps x2 포트</span>
                <span className="text-[11px] text-[#8c909f]">40Gbps 전송, PD 100W 충전, eGPU 지원</span>
              </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('dac')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#8c909f] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                headphones
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">3.5mm Hi-Fi 콤보 잭</span>
                <span className="text-[11px] text-[#8c909f]">쿼드 Hi-Fi DAC 내장 (384kHz/32bit)</span>
              </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('vent')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#8c909f] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                air
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">에어로다이내믹 4웨이 벤트</span>
                <span className="text-[11px] text-[#8c909f]">구리 히트싱크 핀 280개 레이저 용접</span>
              </div>
              </button>
            </li>
          </ul>
        </div>

        {/* Right Side Ports */}
        <div className="bg-[#181c24] border border-[#424754] rounded p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-label border-b border-[#424754]/60 pb-1.5">
            <span className="text-[#ffb690] font-bold">우측 인터페이스 (Right Rail)</span>
            <span className="text-[#8c909f] text-[10px]">주변기기 &amp; 크리에이티브</span>
          </div>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('usba')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#8c909f] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                usb
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">USB 3.2 Gen2 Type-A x2</span>
                <span className="text-[11px] text-[#8c909f]">10Gbps 대역폭, Sleep-and-Charge 지원</span>
              </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('sd')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#8c909f] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                sd_card
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">UHS-II SD 익스프레스 카드 슬롯</span>
                <span className="text-[11px] text-[#8c909f]">최대 312MB/s 프로 카메라 고속 전송</span>
              </div>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedPort('kensington')}
                className="w-full text-left max-lg:min-h-11 flex items-start gap-2 p-1.5 rounded hover:bg-[#1c2028] transition-colors cursor-pointer group"
              >
              <span className="material-symbols-outlined text-[#8c909f] text-[18px] mt-0.5 group-hover:scale-110 transition-transform">
                lock
              </span>
              <div>
                <span className="font-bold text-[#dfe2ee] block">켄싱턴 나노 보안 슬롯</span>
                <span className="text-[11px] text-[#8c909f]">하드웨어 도난 방지 잠금 규격 지원</span>
              </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
