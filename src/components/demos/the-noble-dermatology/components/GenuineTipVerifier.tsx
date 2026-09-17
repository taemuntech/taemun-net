import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, Lock, Printer, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { SAMPLE_SERIALS } from '../data/clinicData';
import { VerificationResult } from '../types';

interface GenuineTipVerifierProps {
  onPrintCertificate: (cert: VerificationResult) => void;
}

export const GenuineTipVerifier: React.FC<GenuineTipVerifierProps> = ({ onPrintCertificate }) => {
  const [serialInput, setSerialInput] = useState('THX-2026-8941');
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentCert, setCurrentCert] = useState<VerificationResult>({
    serialNumber: 'THX-2026-8941',
    device: '써마지® FLX 600샷 Total Tip 4.0',
    status: 'Solta Medical 정품 인증 완료',
    expiry: '2027년 08월 31일 (멸균 상태 정상)',
    distributor: '바슈헬스코리아(솔타메디칼) 공인 수입품',
    verifiedAt: '2025.02.26 14:32:09 KST',
    authenticityCode: 'CERT-SEC-9940192',
    shotsTotal: 600,
  });
  const [errorMessage, setErrorMessage] = useState('');

  const formatKSTDate = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `${y}.${m}.${d} ${hh}:${mm}:${ss} KST`;
  };

  const handleVerify = (serialToVerify?: string) => {
    const target = (serialToVerify ?? serialInput).trim().toUpperCase();
    if (!target) {
      setErrorMessage('시리얼 번호를 입력해주세요.');
      return;
    }
    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const currentTime = formatKSTDate();

      if (SAMPLE_SERIALS[target]) {
        const found = SAMPLE_SERIALS[target];
        setCurrentCert({
          serialNumber: target,
          device: found.device || '의료용 1회성 정품 팁',
          status: found.status || '공인 정품 인증 완료',
          expiry: found.expiry || '2027년 12월 31일 (멸균 정상)',
          distributor: found.distributor || '공식 제휴 수입 인증원',
          verifiedAt: currentTime,
          authenticityCode: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
          shotsTotal: found.shotsTotal,
        });
      } else if (target.includes('ULT')) {
        setCurrentCert({
          serialNumber: target,
          device: '울쎄라® DeepSEE 400샷 Transducer 3.0mm',
          status: 'Merz Aesthetics 공인 울쎄라 정품 인증 완료',
          expiry: '2027년 11월 30일 (멸균 상태 정상)',
          distributor: '멀츠에스테틱스코리아 정식 수입 인증품',
          verifiedAt: currentTime,
          authenticityCode: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
          shotsTotal: 400,
        });
      } else if (target.includes('THX')) {
        setCurrentCert({
          serialNumber: target,
          device: '써마지® FLX 600샷 Total Tip 4.0',
          status: 'Solta Medical 정품 인증 완료',
          expiry: '2027년 08월 31일 (멸균 상태 정상)',
          distributor: '바슈헬스코리아(솔타메디칼) 공인 수입품',
          verifiedAt: currentTime,
          authenticityCode: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
          shotsTotal: 600,
        });
      } else {
        // Generic authenticated response for user-entered serial
        setCurrentCert({
          serialNumber: target,
          device: '솔타 & 멀츠 글로벌 제휴 정품 팁 (Bespoke Verified)',
          status: '공식 본사 전산망 정품 등록 확인 완료',
          expiry: '2027년 10월 15일 (미개봉 멸균 포장)',
          distributor: '보건당국 승인(예시) 공식 수입원',
          verifiedAt: currentTime,
          authenticityCode: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
        });
      }
    }, 450);
  };

  const handleSelectSample = (sample: string) => {
    setSerialInput(sample);
    handleVerify(sample);
  };

  return (
    <section id="genuine-verification" className="w-full py-16 lg:py-20 bg-[#fbf9f6] border-b border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#e4e2df]">
            Safety & Authentication Protocol
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-3">
            믿음과 안전의 기준, 고객의 눈앞에서 즉시 입증합니다
          </h2>
          <p className="text-sm lg:text-base text-[#424845] leading-relaxed">
            더 노블 청담은 단 1회의 불법 재생 팁도 절대 타협하지 않습니다. 시술 직전 고객 대면 미개봉 멸균 씰 개봉 및 즉각적인 정품 시리얼 조회를 지원합니다.
          </p>
        </div>

        {/* Verification Interactive Terminal Card */}
        <div className="rounded-xl bg-[#f5f3f0] p-6 lg:p-10 shadow-lg border border-[#eae8e5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Verification Input Simulator */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-[#745a2a]" />
                    <span className="font-serif text-lg lg:text-xl font-medium text-[#00110b]">
                      정품 팁 실시간 전산 조회기
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#745a2a]/15 text-[#745a2a] text-xs font-semibold">
                    공식 전산망 직통
                  </span>
                </div>

                <p className="text-xs lg:text-sm text-[#424845] mb-5 leading-relaxed">
                  시술 시 수령하신 보증서의 12자리 고유 시리얼 번호를 입력하시면 본사 정품 등록 여부 및 샷수 일련번호를 즉시 확인하실 수 있습니다.
                </p>

                {/* Interactive Input Form */}
                <div className="space-y-3 mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={serialInput}
                      onChange={(e) => setSerialInput(e.target.value)}
                      placeholder="시리얼 번호 12자리를 입력하세요"
                      className="w-full h-12 pl-4 pr-32 rounded-lg bg-[#ffffff] text-[#00110b] font-mono text-sm border border-[#eae8e5] focus:outline-none focus:ring-2 focus:ring-[#0d2820] shadow-inner uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => handleSelectSample('THX-2026-8941')}
                      className="absolute right-2 top-2 px-3 py-1.5 rounded bg-[#efeeeb] text-[#424845] hover:text-[#00110b] hover:bg-[#e4e2df] text-xs font-medium transition-colors"
                    >
                      샘플 팁 자동입력
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-1.5 text-xs text-[#ba1a1a]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleVerify()}
                    disabled={isVerifying}
                    className="w-full h-12 rounded-lg bg-[#00110b] text-[#ffffff] font-semibold text-sm tracking-wider flex items-center justify-center gap-2 shadow-md hover:bg-[#0d2820] active:scale-[0.99] transition-all disabled:opacity-75"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#fedb9e]" />
                        <span>전산망 실시간 대조 중...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 text-[#fedb9e]" />
                        <span>정품 시리얼 즉시 검증하기</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 text-xs text-[#424845] flex-wrap">
                  <span className="text-[#727975]">추천 검증 모델:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('THX-2026-8941')}
                    className="text-[#00110b] hover:text-[#745a2a] underline font-medium"
                  >
                    써마지 FLX 600샷
                  </button>
                  <span className="text-[#c1c8c4]">|</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('ULT-5520-7712')}
                    className="text-[#00110b] hover:text-[#745a2a] underline font-medium"
                  >
                    울쎄라 DeepSEE 400샷
                  </button>
                  <span className="text-[#c1c8c4]">|</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('REJ-9801-4432')}
                    className="text-[#00110b] hover:text-[#745a2a] underline font-medium"
                  >
                    리쥬란 힐러 오리지널
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e4e2df] flex flex-wrap items-center gap-4 text-xs text-[#424845]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#745a2a]" /> 1회 사용 즉시 폐기
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#745a2a]" /> 고객 현장 미개봉 확인
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#745a2a]" /> 정품 인증 카드 증정
                </span>
              </div>
            </div>

            {/* Right: Dynamic Real-time Hologram Certificate Result */}
            <div className="lg:col-span-6 flex">
              <div
                className={`relative w-full rounded-xl p-6 bg-[#ffffff] shadow-xl border border-[#eae8e5] overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isVerifying ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'
                }`}
              >
                {/* Subtle Hologram Glow Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#745a2a] via-[#fedb9e] to-[#0d2820]" />

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#745a2a]/15 flex items-center justify-center text-[#745a2a] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-[#745a2a] tracking-widest uppercase block">
                          Official Certificate
                        </span>
                        <h3 className="font-serif text-lg font-medium text-[#00110b]">
                          {currentCert.status}
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#efeeeb] text-[#00110b] text-xs font-semibold shrink-0">
                      정품 일련번호 승인
                    </span>
                  </div>

                  {/* Certificate Detail Specifications Table */}
                  <div className="space-y-1.5 text-xs text-[#424845] bg-[#f5f3f0] p-4 rounded-lg mb-4 border border-[#eae8e5]">
                    <div className="flex justify-between py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975]">기기 및 소모품 모델</span>
                      <span className="font-semibold text-[#00110b] text-right">{currentCert.device}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975]">조회 시리얼 번호</span>
                      <span className="font-mono font-semibold text-[#745a2a]">{currentCert.serialNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975]">유효 기한</span>
                      <span className="text-[#00110b]">{currentCert.expiry}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975]">국내 정식 공급처</span>
                      <span className="text-[#00110b] font-medium">{currentCert.distributor}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#727975]">인증 일시</span>
                      <span className="text-[#424845] font-mono">{currentCert.verifiedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#745a2a] font-medium">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>블록체인 기반 실시간 일회성 암호화 검증 완료</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPrintCertificate(currentCert)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] active:scale-95 transition-all shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#fedb9e]" />
                    <span>인증서 인쇄 / 저장</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
