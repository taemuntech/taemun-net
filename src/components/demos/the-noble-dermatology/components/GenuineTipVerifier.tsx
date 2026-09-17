import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, Info, Printer, Award, AlertCircle, RefreshCw } from 'lucide-react';
import { SAMPLE_SERIALS } from '../data/clinicData';
import { VerificationResult } from '../types';

interface GenuineTipVerifierProps {
  onPrintCertificate: (cert: VerificationResult) => void;
}

// 시술 소모품 확인 위젯.
// 원래는 실존 제조사·수입사 이름으로 「본사 전산망 정품 인증 완료」를 찍어 줬다 — 지어낸 의원이 실존 기업의
// 인증을 대신 발급하는 모양이라 전부 일반 명칭과 「(예시)」 표기로 바꿨고, 화면에도 샘플 조회라고 적는다.
export const GenuineTipVerifier: React.FC<GenuineTipVerifierProps> = ({ onPrintCertificate }) => {
  const [serialInput, setSerialInput] = useState('RF-2026-8941');
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentCert, setCurrentCert] = useState<VerificationResult>({
    serialNumber: 'RF-2026-8941',
    device: '고주파(RF) 시술용 팁 600샷 (예시 모델)',
    status: '미개봉 멸균 팁 확인 (샘플 조회 결과)',
    expiry: '2027년 08월 31일 (멸균 상태 정상)',
    distributor: '국내 정식 수입 유통사 (예시 표기)',
    verifiedAt: '2026.02.26 14:32:09 KST (예시)',
    authenticityCode: 'SAMPLE-9940192',
    shotsTotal: 600,
  });
  const [errorMessage, setErrorMessage] = useState('');

  // 브라우저 표준시로 찍고 KST 라고 적으면 해외에서 여는 사람에게는 거짓이 된다 — 서울 시각으로 만든다
  const formatKSTDate = () => {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '00';
    return `${get('year')}.${get('month')}.${get('day')} ${get('hour')}:${get('minute')}:${get('second')} KST`;
  };

  const sampleCode = () => `SAMPLE-${Math.floor(100000 + Math.random() * 900000)}`;

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
          device: found.device || '의료용 1회용 멸균 소모품 (예시 모델)',
          status: found.status || '미개봉 멸균 상태 확인 (샘플 조회 결과)',
          expiry: found.expiry || '2027년 12월 31일 (멸균 정상)',
          distributor: found.distributor || '국내 정식 수입 유통사 (예시 표기)',
          verifiedAt: currentTime,
          authenticityCode: sampleCode(),
          shotsTotal: found.shotsTotal,
        });
      } else if (target.includes('HIFU')) {
        setCurrentCert({
          serialNumber: target,
          device: '집속초음파 카트리지 400샷 3.0mm (예시 모델)',
          status: '미개봉 멸균 카트리지 확인 (샘플 조회 결과)',
          expiry: '2027년 11월 30일 (멸균 상태 정상)',
          distributor: '국내 정식 수입 유통사 (예시 표기)',
          verifiedAt: currentTime,
          authenticityCode: sampleCode(),
          shotsTotal: 400,
        });
      } else if (target.includes('RF')) {
        setCurrentCert({
          serialNumber: target,
          device: '고주파(RF) 시술용 팁 600샷 (예시 모델)',
          status: '미개봉 멸균 팁 확인 (샘플 조회 결과)',
          expiry: '2027년 08월 31일 (멸균 상태 정상)',
          distributor: '국내 정식 수입 유통사 (예시 표기)',
          verifiedAt: currentTime,
          authenticityCode: sampleCode(),
          shotsTotal: 600,
        });
      } else {
        // 그 밖의 번호 — 실제 조회가 아니라는 사실을 결과 값 안에도 적는다
        setCurrentCert({
          serialNumber: target,
          device: '1회용 멸균 시술 소모품 (예시 모델)',
          status: '샘플 조회 결과 — 실제 조회가 아닙니다',
          expiry: '2027년 10월 15일 (미개봉 멸균 포장)',
          distributor: '국내 정식 수입 유통사 (예시 표기)',
          verifiedAt: currentTime,
          authenticityCode: sampleCode(),
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
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#e4e2df]">
            Safety & Sterile Check Protocol
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-3">
            시술에 쓰는 소모품을 고객 앞에서 확인합니다
          </h2>
          <p className="text-sm lg:text-base text-[#424845] leading-relaxed">
            더 노블 청담은 모든 시술 소모품을 1회용 멸균 제품으로만 사용합니다. 시술 직전 고객 앞에서 미개봉 멸균 씰을 확인하고 개봉하며, 수령하신 보증서의 번호로 사용 내역을 함께 확인해 드립니다.
          </p>
        </div>

        {/* Verification Interactive Terminal Card */}
        <div className="rounded-xl bg-[#f5f3f0] p-6 lg:p-10 shadow-lg border border-[#eae8e5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Verification Input Simulator */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-[#745a2a] shrink-0" />
                    <span className="font-serif text-lg lg:text-xl font-medium text-[#00110b]">
                      소모품 번호 조회기
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#745a2a]/15 text-[#745a2a] text-xs font-semibold shrink-0">
                    샘플 시뮬레이션
                  </span>
                </div>

                <p className="text-xs lg:text-sm text-[#424845] mb-5 leading-relaxed">
                  시술 시 수령하신 보증서의 고유 번호를 입력하면 소모품 종류와 멸균 유효기간, 샷수를 확인하는 화면입니다.
                </p>

                {/* 이 화면이 무엇인지 — 진짜 조회기로 오해되지 않게 입력창 바로 위에 적는다 */}
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-[#e4e2df] bg-[#ffffff] p-3 text-[11px] leading-relaxed text-[#424845]">
                  <Info className="w-4 h-4 text-[#745a2a] shrink-0 mt-0.5" />
                  <span>
                    샘플 사이트의 시연용 화면입니다. 제조사·수입사의 전산망과 연결되어 있지 않으며, 표시되는
                    모델명·유통사·번호는 모두 예시입니다.
                  </span>
                </div>

                {/* Interactive Input Form */}
                <div className="space-y-3 mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={serialInput}
                      onChange={(e) => setSerialInput(e.target.value)}
                      placeholder="보증서의 번호를 입력하세요"
                      aria-label="소모품 번호"
                      className="w-full h-12 pl-4 pr-32 rounded-lg bg-[#ffffff] text-[#00110b] font-mono text-sm border border-[#eae8e5] focus:outline-none focus:ring-2 focus:ring-[#0d2820] shadow-inner uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => handleSelectSample('RF-2026-8941')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-3 h-11 rounded bg-[#efeeeb] text-[#424845] hover:text-[#00110b] hover:bg-[#e4e2df] text-xs font-medium transition-colors"
                    >
                      예시 번호 입력
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
                        <span>조회하는 중...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 text-[#fedb9e]" />
                        <span>소모품 번호 조회하기</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-x-2 gap-y-1 text-xs text-[#424845] flex-wrap">
                  <span className="text-[#727975]">예시로 볼 소모품:</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('RF-2026-8941')}
                    className="min-h-11 flex items-center text-[#00110b] hover:text-[#745a2a] underline font-medium"
                  >
                    고주파 팁 600샷
                  </button>
                  <span className="text-[#c1c8c4]">|</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('HIFU-5520-7712')}
                    className="min-h-11 flex items-center text-[#00110b] hover:text-[#745a2a] underline font-medium"
                  >
                    초음파 카트리지 400샷
                  </button>
                  <span className="text-[#c1c8c4]">|</span>
                  <button
                    type="button"
                    onClick={() => handleSelectSample('PN-9801-4432')}
                    className="min-h-11 flex items-center text-[#00110b] hover:text-[#745a2a] underline font-medium"
                  >
                    PN 스킨부스터 앰플
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e4e2df] flex flex-wrap items-center gap-4 text-xs text-[#424845]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#745a2a]" /> 1회 사용 후 폐기
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#745a2a]" /> 고객 앞에서 미개봉 확인
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#745a2a]" /> 사용 내역 안내
                </span>
              </div>
            </div>

            {/* Right: Dynamic Result Card */}
            <div className="lg:col-span-6 flex">
              <div
                className={`relative w-full rounded-xl p-6 bg-[#ffffff] shadow-xl border border-[#eae8e5] overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  isVerifying ? 'opacity-60 scale-[0.99]' : 'opacity-100 scale-100'
                }`}
              >
                {/* Subtle Glow Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#745a2a] via-[#fedb9e] to-[#0d2820]" />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#745a2a]/15 flex items-center justify-center text-[#745a2a] shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold text-[#745a2a] tracking-widest uppercase block">
                          Sample Result
                        </span>
                        <h3 className="font-serif text-base lg:text-lg font-medium text-[#00110b] break-keep">
                          {currentCert.status}
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#efeeeb] text-[#00110b] text-xs font-semibold shrink-0">
                      예시 데이터
                    </span>
                  </div>

                  {/* Result Detail Table */}
                  <div className="space-y-1.5 text-xs text-[#424845] bg-[#f5f3f0] p-4 rounded-lg mb-4 border border-[#eae8e5]">
                    <div className="flex justify-between gap-3 py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975] shrink-0">기기 및 소모품 모델</span>
                      <span className="font-semibold text-[#00110b] text-right">{currentCert.device}</span>
                    </div>
                    <div className="flex justify-between gap-3 py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975] shrink-0">조회 번호</span>
                      <span className="font-mono font-semibold text-[#745a2a] text-right break-all">
                        {currentCert.serialNumber}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975] shrink-0">유효 기한</span>
                      <span className="text-[#00110b] text-right">{currentCert.expiry}</span>
                    </div>
                    <div className="flex justify-between gap-3 py-1 border-b border-[#efeeeb]">
                      <span className="text-[#727975] shrink-0">국내 공급처</span>
                      <span className="text-[#00110b] font-medium text-right">{currentCert.distributor}</span>
                    </div>
                    <div className="flex justify-between gap-3 py-1">
                      <span className="text-[#727975] shrink-0">조회 일시</span>
                      <span className="text-[#424845] font-mono text-right">{currentCert.verifiedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
                  <div className="flex items-start gap-1.5 text-xs text-[#745a2a] font-medium">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>샘플 시뮬레이션 결과입니다 — 제조사 전산망 조회가 아닙니다</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPrintCertificate(currentCert)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 min-h-11 rounded-lg bg-[#00110b] text-[#ffffff] text-xs font-semibold hover:bg-[#0d2820] active:scale-95 transition-all shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#fedb9e]" />
                    <span>확인서 미리보기</span>
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
