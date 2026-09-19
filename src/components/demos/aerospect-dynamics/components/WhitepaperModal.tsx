import React from 'react';

interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPocModal: () => void;
}

export const WhitepaperModal: React.FC<WhitepaperModalProps> = ({
  isOpen,
  onClose,
  onOpenPocModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl border border-outline-variant max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="flex flex-col gap-1">
          <span className="px-2.5 py-0.5 rounded bg-surface-container font-telemetry-code text-xs font-bold text-on-surface w-fit">
            KR-DEF // TECH WHITEPAPER REV 4.2
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
            항공 자율제어 아키텍처 및 산업 보안 표준 기술 백서
          </h2>
          <p className="text-xs font-body-sm text-on-surface-variant">
            AEROSPECT DYNAMICS Autonomous UAV Platform Engineering Specification &amp; Security Whitepaper
          </p>
        </div>

        <div className="flex flex-col gap-5 text-sm text-on-surface font-body-sm">
          {/* Chapter 1 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
            <h3 className="font-headline-sm text-sm font-bold text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              1. 고신뢰성 비행제어 아키텍처 (NeuroPilot Flight Control System)
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              NeuroPilot 삼중 여유도(Triple Redundant) 비행 제어 컴퓨터는 IMU 3기, 기압계 2기, 전자 나침반 2기를 실시간 교차 칼만 필터(EKF3)로 연동합니다. 1개 센서의 전자기 교란이나 물리적 고장이 감지될 시 0.002초(2ms) 이내에 정상 센서로 자동 절체(Failover)되어 송전탑 고압 자기장(765kV) 하부에서도 기체 추락 위험을 원천 차단하도록 설계되었습니다.
            </p>
          </div>

          {/* Chapter 2 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
            <h3 className="font-headline-sm text-sm font-bold text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              2. 전술형 통신 데이터링크 및 데이터 보호 (AES-256 C2 &amp; On-Premise)
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              C2 원격 조종 신호와 4K 실시간 영상 스트림은 산업 보안 칩셋을 거쳐 AES-256-GCM 알고리즘으로 실시간 암호화됩니다. 군집 드론 간 전파 도청 및 GPS 스푸핑(Spoofing) 공격 발생 시 즉시 관성 항법(INS) 모드로 자동 전환하여 안전 복귀(Return-to-Home)합니다. 수집된 모든 사진·LiDAR 데이터는 고객사 폐쇄 사설망으로만 단방향 암호화 전송됩니다.
            </p>
          </div>

          {/* Chapter 3 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-2">
            <h3 className="font-headline-sm text-sm font-bold text-secondary flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              3. 방폭 및 극한 환경 신뢰성 설계 (MIL-STD-810H &amp; Ex d IIB T4)
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-telemetry-code text-[11px]">
              <div className="p-2 bg-surface-container rounded border border-outline-variant/30 text-center">
                <span className="block text-on-surface-variant text-[10px]">내환경 규격</span>
                <span className="font-bold text-on-surface">MIL-STD-810H</span>
              </div>
              <div className="p-2 bg-surface-container rounded border border-outline-variant/30 text-center">
                <span className="block text-on-surface-variant text-[10px]">방수방진</span>
                <span className="font-bold text-on-surface">IP55 / IP67</span>
              </div>
              <div className="p-2 bg-surface-container rounded border border-outline-variant/30 text-center">
                <span className="block text-on-surface-variant text-[10px]">방폭 등급</span>
                <span className="font-bold text-on-surface">Ex d IIB T4</span>
              </div>
              <div className="p-2 bg-surface-container rounded border border-outline-variant/30 text-center">
                <span className="block text-on-surface-variant text-[10px]">운용 온도</span>
                <span className="font-bold text-on-surface">-20°C ~ +55°C</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
          <button
            onClick={() => {
              onClose();
              onOpenPocModal();
            }}
            className="px-4 py-2 bg-secondary text-white rounded text-xs font-telemetry-label uppercase tracking-wider hover:bg-secondary/90 cursor-pointer"
          >
            기체 기술 문의 및 PoC 신청
          </button>
          <button
            onClick={() => {
              alert('공식 국방·산업 백서 PDF(48p) 다운로드 패키지가 브라우저를 통해 준비되었습니다.');
            }}
            className="px-5 py-2 bg-primary text-on-primary rounded text-xs font-telemetry-label uppercase tracking-wider hover:bg-surface-container-high hover:text-on-surface cursor-pointer"
          >
            백서 전문 PDF 다운로드
          </button>
        </div>
      </div>
    </div>
  );
};
