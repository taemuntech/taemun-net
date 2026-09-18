"use client";

// 프로젝트 견적 문의 화면 — 서버 래퍼는 page.tsx.
// 샘플 사이트에서 넘어온 경우(/inquiry?from=<slug>&industry=<key>) 서비스를 미리 고르고 안내 칩을 띄운다.
// 어느 샘플을 보고 왔는지는 방문자가 고칠 수 있는 「기타 문의 내용」이 아니라 요청 본문의 referral 칸으로 따로 보낸다
// (API 가 다시 검증해 저장·문자에 넣는다 — 샘플별 전환을 셀 수 있게). 백엔드는 src/app/api/inquiry.
//
// 약속 문구 원칙: 연락 시각(「1시간 이내」「24시간」)·지체상금·무상 A/S 기간처럼 계약서에 없는 조건을 쓰지 않는다.
// 형이 조건을 확정하면 화면·홈(진행 방식 섹션 포함)·상담 위젯을 같은 문구로 맞춘다.
// (고객 자동 접수 문자는 2026-09-18 없앴다 — 방문자가 적은 아무 번호로나 문자가 나가는 통로였다. api/inquiry 머리말)

import ParticleCanvas from "@/components/ParticleCanvas";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Code, 
  FileCheck, 
  FileText, 
  HelpCircle, 
  Layers, 
  Lock, 
  MessageSquare, 
  PhoneCall, 
  Send, 
  ShieldCheck, 
  ThumbsUp, 
  Zap 
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { INQUIRY_LIMITS } from "@/lib/inquiry/validate";
import { parseInquiryIndustry, parseSampleInquiry } from "@/components/demo-kit/sample-lead";
import { industryLabel, type IndustryKey, type PortfolioKind } from "@/lib/portfolio/schema";

/** 포트폴리오 등록 정보 색인(샘플·운영 서비스·사례 전부) — 서버 page 가 넘긴다(직렬화 가능한 값만) */
export type SampleIndex = Record<string, { title: string; industry: IndustryKey; kind: PortfolioKind }>;

/** 포트폴리오(샘플 바·샘플 안내·갤러리 카드)에서 넘어온 문의 — 화면에 쓰기 좋게 풀어 둔 것 */
export type SampleReferral = {
  from: string;
  title: string;
  industry?: IndustryKey;
  /** 등록되지 않은 slug 면 없음 — 「포트폴리오」로 부른다 */
  kind?: PortfolioKind;
};

/** 칩·상세 내용에 쓰는 이름. 운영 서비스를 「샘플」이라고 부르지 않게 종류별로 나눈다 */
const REFERRAL_NOUN: Record<PortfolioKind | "unknown", { label: string; object: string }> = {
  sample: { label: "샘플", object: "샘플을" },
  proposal: { label: "제안용 시안", object: "제안용 시안을" },
  service: { label: "운영 서비스", object: "운영 서비스를" },
  case: { label: "구축 사례", object: "구축 사례를" },
  unknown: { label: "포트폴리오", object: "포트폴리오를" },
};

function referralNoun(referral: SampleReferral) {
  return REFERRAL_NOUN[referral.kind ?? "unknown"];
}

function serviceForIndustry(industry: IndustryKey | undefined): string {
  if (industry === "commerce") return "shopping-mall";
  if (industry === "platform") return "custom-web-app";
  return "company-homepage";
}

/** 요청 본문의 referral 칸 — API 가 parseSampleInquiry 규칙으로 다시 검증한다. 업종만 들고 온 문의(?industry=)는 from 이 없다 */
export type InquiryReferralPayload = {
  from?: string;
  industry?: IndustryKey;
  kind?: PortfolioKind;
};

function referralPayload(referral: SampleReferral): InquiryReferralPayload {
  return { from: referral.from, industry: referral.industry, kind: referral.kind };
}

function referralChipLabel(referral: SampleReferral): string {
  const industry = referral.industry ? ` · ${industryLabel(referral.industry)}` : "";
  return `${referralNoun(referral).label}${industry}`;
}

/**
 * 주소의 from·industry 를 읽어 InquiryView 에 넘긴다. useSearchParams 를 쓰므로 page.tsx 에서 Suspense 안에 둔다.
 * industry 가 주소에 없으면(상단 바에서 온 경우) 포트폴리오 등록 정보로 채운다.
 */
export function InquiryViewWithReferral({ sampleIndex }: { sampleIndex: SampleIndex }) {
  const searchParams = useSearchParams();
  const parsed = parseSampleInquiry(searchParams);
  const known = parsed ? sampleIndex[parsed.from] : undefined;
  // from 없이 업종만 온 경우(홈 갤러리 구성 예시·아직 샘플이 없는 업종 안내) — 서비스만 미리 고르고 업종을 함께 보낸다
  const industryLead = parsed ? null : parseInquiryIndustry(searchParams);
  const referral: SampleReferral | null = parsed
    ? {
        from: parsed.from,
        title: known?.title ?? parsed.from,
        // 등록 정보가 정본 — 주소의 industry 는 등록되지 않은 slug 일 때만 쓴다
        industry: known?.industry ?? parsed.industry,
        kind: known?.kind,
      }
    : null;
  return <InquiryView referral={referral} industryLead={industryLead} />;
}

export default function InquiryView({
  referral,
  industryLead = null,
}: {
  referral: SampleReferral | null;
  industryLead?: IndustryKey | null;
}) {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    referral ? [serviceForIndustry(referral.industry)] : industryLead ? [serviceForIndustry(industryLead)] : []
  );
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [details, setDetails] = useState("");
  const fieldId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // 봇 걸러내기 두 가지 — 서버가 본다(src/lib/inquiry/validate.ts). 걸리면 서버는 저장·문자 없이 조용히 성공을 돌려준다.
  // 1) 사람에게 보이지 않는 칸(website)을 채워 왔는가  2) 화면을 연 뒤 너무 빨리(3초 안에) 제출했는가
  const [website, setWebsite] = useState("");
  const openedAtRef = useRef<number | null>(null);
  useEffect(() => {
    openedAtRef.current = Date.now();
  }, []);

  const serviceOptions = [
    { id: "company-homepage", label: "기업/회사 홍보 홈페이지", desc: "브랜드 대표 반응형 사이트 & 랜딩페이지" },
    { id: "shopping-mall", label: "쇼핑몰 · 예약 · 커머스", desc: "제품 판매, 예약 시스템, PG 결제 연동" },
    { id: "custom-web-app", label: "맞춤형 웹 · 앱 개발", desc: "회원/관리자 시스템, 대형 플랫폼, 특수 웹앱" },
    { id: "tdocs-saas", label: "모바일 전자서식 (T-DOCS)", desc: "카카오톡 모바일 전자서명 & 240여 종 서식" },
    { id: "pg-billing", label: "PG 결제 & 정기구독 빌링", desc: "포트원·토스페이먼츠 정기자동결제 모듈" },
    { id: "renewal-maintenance", label: "웹사이트 리뉴얼 & 고도화", desc: "디자인 리뉴얼 및 기능 고도화 유지보수" },
    { id: "undecided", label: "아직 미정", desc: "상담을 통해 맞춤형 서비스 추천" },
  ];

  const budgetOptions = [
    "300만 원 미만 (기본 런칭)",
    "300만 원 ~ 500만 원 (스마트 패키지)",
    "500만 원 ~ 1,000만 원 (프리미엄 솔루션)",
    "1,000만 원 이상 (대형 플랫폼)",
    "미정 (상담 시 안내 받기)",
  ];

  const timelineOptions = [
    "2주 이내",
    "1개월 이내",
    "2개월 이내",
    "일정 협의 가능",
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleNextStep = () => {
    setErrorMessage("");
    if (step === 1 && selectedServices.length === 0) {
      setErrorMessage("서비스 카테고리를 최소 1개 이상 선택해 주세요.");
      return;
    }
    if (step === 2 && !budget) {
      setErrorMessage("예상 예산 범위를 선택해 주세요.");
      return;
    }
    if (step === 3 && !timeline) {
      setErrorMessage("희망 완수 일정을 선택해 주세요.");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!clientName.trim() || !phone.trim()) {
      setErrorMessage("성함과 연락처는 필수 입력 항목입니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices.map(
            (id) => serviceOptions.find((s) => s.id === id)?.label || id
          ),
          budget,
          timeline,
          clientName,
          phone,
          email,
          referenceUrl,
          details,
          referral: referral ? referralPayload(referral) : industryLead ? { industry: industryLead } : undefined,
          website,
          elapsedMs: openedAtRef.current === null ? undefined : Date.now() - openedAtRef.current,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "제출 중 오류가 발생했습니다.");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "제출 중 오류가 발생했습니다.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white [word-break:keep-all]">
      {/* Background Particle Canvas */}
      <ParticleCanvas />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/images/logo/icon-192-transparent.png"
                alt="태문 로고"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-lg lg:text-xl font-bold tracking-tight text-white">
              태문넷 <span className="text-indigo-400 text-xs lg:text-sm font-semibold ml-1">DEV STUDIO</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-3.5 lg:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>메인으로 돌아가기</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="pt-28 lg:pt-32 pb-20 lg:pb-24 px-4 lg:px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 일하는 방식 — 계약서에 적을 수 있는 사실만. 모바일에서는 위저드 아래로 내려간다 */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                <span>4단계 무료 견적 문의</span>
              </div>
              <h1 className="text-2xl lg:text-4xl font-extrabold text-white leading-tight">
                태문넷은<br />
                <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  이렇게 일합니다
                </span>
              </h1>
              <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                업종별 샘플을 먼저 보고, 필요한 기능과 예산·일정을 골라 보내 주세요. 상담부터 개발까지 총괄 개발자가 직접 맡습니다.
              </p>
            </div>

            {/* 일하는 방식 4가지 — 「보장」「0%」「24시간」 같은 단정 대신 계약서로 정하는 항목으로 적는다 */}
            <div className="space-y-3 lg:space-y-4">
              <div className="p-4 lg:p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-3.5">
                <div className="w-9 lg:w-10 h-9 lg:h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs lg:text-sm font-bold text-white mb-0.5">범위와 일정을 먼저 문서로 합의</h2>
                  <p className="text-[11px] lg:text-xs text-gray-400">만들 기능·일정·납품물을 계약 전에 문서로 정리하고, 그 기준으로 진행합니다</p>
                </div>
              </div>

              <div className="p-4 lg:p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-3.5">
                <div className="w-9 lg:w-10 h-9 lg:h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Code className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs lg:text-sm font-bold text-white mb-0.5">소스코드·데이터 이전</h2>
                  <p className="text-[11px] lg:text-xs text-gray-400">납품할 때 소스코드와 데이터베이스를 넘겨 드립니다. 이전 범위는 계약서에 적습니다</p>
                </div>
              </div>

              <div className="p-4 lg:p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-3.5">
                <div className="w-9 lg:w-10 h-9 lg:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs lg:text-sm font-bold text-white mb-0.5">개발 중 확인용 주소 공유</h2>
                  <p className="text-[11px] lg:text-xs text-gray-400">만들고 있는 화면을 테스트 주소로 공유해 중간중간 직접 눌러 보실 수 있습니다</p>
                </div>
              </div>

              <div className="p-4 lg:p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-3.5">
                <div className="w-9 lg:w-10 h-9 lg:h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <ThumbsUp className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs lg:text-sm font-bold text-white mb-0.5">오픈 후 수정 지원</h2>
                  <p className="text-[11px] lg:text-xs text-gray-400">오픈 뒤 발견된 오류의 무상 수정 기간과 범위는 계약서에 명시합니다</p>
                </div>
              </div>
            </div>

            <div className="p-5 lg:p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 backdrop-blur-md text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-indigo-300">
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span>전화로 상담하셔도 됩니다</span>
              </div>
              <div className="grid grid-cols-1 gap-2 pt-1">
                <a href="tel:010-8672-6463" className="flex items-center gap-3 p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:border-indigo-400 transition-all text-white font-bold">
                  <PhoneCall className="w-4.5 h-4.5 text-indigo-400 shrink-0" aria-hidden="true" />
                  <div className="text-left">
                    <div className="text-[10px] text-indigo-300 uppercase font-bold">총괄 아키텍트 직통</div>
                    <div className="text-sm lg:text-base text-white">010-8672-6463</div>
                  </div>
                </a>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between text-gray-300 gap-1 px-1 pt-1">
                  <span>직통전화: 010-8672-6463</span>
                  <span className="text-gray-400">이메일: contact@taemun.co.kr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 4-Step Wizard — 모바일(lg 미만)에서는 맨 위. 문의하러 온 방문자가 첫 화면에서 폼을 본다 */}
          <div className="lg:col-span-7 order-first lg:order-none">
            <div className="bg-gray-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-10 shadow-2xl shadow-indigo-500/10 relative">

              {isSubmitted ? (
                /* Success View */
                <div className="py-10 lg:py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 p-0.5 mx-auto">
                    <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 lg:w-10 h-8 lg:h-10" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl lg:text-3xl font-extrabold text-white">
                    견적 문의가 정상 접수되었습니다!
                  </h2>

                  <p className="text-xs lg:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    작성해 주신 내용을 확인한 뒤 총괄 아키텍트가 연락드려 견적과 개발 일정을 안내해 드리겠습니다.
                  </p>

                  <div className="pt-4">
                    <Link
                      href="/"
                      className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:opacity-90 transition-all"
                    >
                      <span>메인 페이지로 이동</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                /* Step Wizard View */
                <div>
                  {/* 샘플 사이트에서 넘어온 경우 안내 칩 */}
                  {referral && (
                    <div className="mb-5 lg:mb-6 inline-flex max-w-full items-start gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      <Layers className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        「{referral.title}」 {referralNoun(referral).object} 보고 오셨군요 — 비슷하게 만들어 드립니다
                        <span className="sr-only"> ({referralChipLabel(referral)})</span>
                      </span>
                    </div>
                  )}
                  {!referral && industryLead && (
                    <div className="mb-5 lg:mb-6 inline-flex max-w-full items-start gap-2 px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                      <Layers className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>「{industryLabel(industryLead)}」 업종으로 문의하시는군요 — 업종에 맞춰 상담해 드립니다</span>
                    </div>
                  )}

                  {/* Progress Header */}
                  <div className="mb-6 lg:mb-8 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-indigo-400 uppercase tracking-widest">{step} / 4 단계</span>
                      <span className="text-gray-400">{step * 25}% 완료</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${step * 25}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div role="alert" className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium animate-in fade-in">
                      <span aria-hidden="true">⚠️ </span>
                      {errorMessage}
                    </div>
                  )}

                  {/* STEP 1: Services */}
                  {step === 1 && (
                    <div className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1.5">
                          1. 어떤 서비스가 필요하세요? <span className="text-indigo-400">*</span>
                        </h3>
                        <p className="text-xs text-gray-400">필요한 모든 항목을 자유롭게 복수 선택해 주세요.</p>
                      </div>

                      <div role="group" aria-label="필요한 서비스 (복수 선택)" className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {serviceOptions.map((item) => {
                          const isSelected = selectedServices.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => toggleService(item.id)}
                              className={`p-3.5 lg:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                                isSelected
                                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                                  : "bg-gray-950/60 border-white/10 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-bold text-xs lg:text-sm">{item.label}</span>
                                <div
                                  className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                                    isSelected
                                      ? "bg-indigo-500 border-indigo-400 text-white"
                                      : "border-gray-600"
                                  }`}
                                >
                                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                              </div>
                              <span className="text-[11px] lg:text-xs text-gray-400">{item.desc}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={handleNextStep}
                          className="w-full lg:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          <span>다음 단계로 (2/4)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Budget */}
                  {step === 2 && (
                    <div className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1.5">
                          2. 프로젝트 예상 예산 범위는 어느 정도인가요? <span className="text-indigo-400">*</span>
                        </h3>
                        <p className="text-xs text-gray-400">예산에 최적화된 기술 아키텍처를 제안해 드립니다.</p>
                      </div>

                      <div role="radiogroup" aria-label="예상 예산 범위" className="space-y-2.5 lg:space-y-3">
                        {budgetOptions.map((opt, idx) => {
                          const isSelected = budget === opt;
                          return (
                            <button
                              key={idx}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setBudget(opt)}
                              className={`w-full p-3.5 lg:p-4 rounded-2xl border text-left font-bold text-xs lg:text-sm transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10"
                                  : "bg-gray-950/60 border-white/10 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected
                                    ? "bg-purple-500 border-purple-400 text-white"
                                    : "border-gray-600"
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-3">
                        <button
                          onClick={() => setStep(1)}
                          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-all"
                        >
                          이전 단계
                        </button>
                        <button
                          onClick={handleNextStep}
                          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all flex items-center gap-2"
                        >
                          <span>다음 단계로 (3/4)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Timeline */}
                  {step === 3 && (
                    <div className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1.5">
                          3. 언제까지 서비스 완성이 필요하신가요? <span className="text-indigo-400">*</span>
                        </h3>
                        <p className="text-xs text-gray-400">희망 일정을 선택해 주세요. 실제 일정은 범위에 맞춰 견적서에 적습니다.</p>
                      </div>

                      <div role="radiogroup" aria-label="희망 완수 일정" className="space-y-2.5 lg:space-y-3">
                        {timelineOptions.map((opt, idx) => {
                          const isSelected = timeline === opt;
                          return (
                            <button
                              key={idx}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setTimeline(opt)}
                              className={`w-full p-3.5 lg:p-4 rounded-2xl border text-left font-bold text-xs lg:text-sm transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-pink-600/20 border-pink-500 text-white shadow-lg shadow-pink-500/10"
                                  : "bg-gray-950/60 border-white/10 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected
                                    ? "bg-pink-500 border-pink-400 text-white"
                                    : "border-gray-600"
                                }`}
                              >
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 flex items-center justify-between gap-3">
                        <button
                          onClick={() => setStep(2)}
                          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-all"
                        >
                          이전 단계
                        </button>
                        <button
                          onClick={handleNextStep}
                          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all flex items-center gap-2"
                        >
                          <span>다음 단계로 (4/4)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Client Contact Form */}
                  {step === 4 && (
                    <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white mb-1.5">
                          4. 맞춤 견적서를 받아보실 정보를 입력해 주세요
                        </h3>
                        <p className="text-xs text-gray-400">입력해 주신 연락처로 확인 후 연락드려 견적을 안내해 드립니다.</p>
                      </div>

                      {/* 봇 걸러내기 칸 — 화면 밖에 두고 탭 이동·보조기기에서도 뺀다. 사람은 채울 일이 없다 */}
                      <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                        <label>
                          웹사이트
                          <input
                            type="text"
                            name="website"
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </label>
                      </div>

                      <div className="space-y-3.5 lg:space-y-4 text-left">
                        <div>
                          <label htmlFor={`${fieldId}-name`} className="block text-xs font-bold text-gray-300 mb-1">
                            성함 / 회사명 <span className="text-indigo-400" aria-hidden="true">*</span>
                          </label>
                          <input
                            id={`${fieldId}-name`}
                            type="text"
                            autoComplete="name"
                            required
                            placeholder="예: 홍길동 대표 / 태문기업"
                            maxLength={INQUIRY_LIMITS.name}
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor={`${fieldId}-phone`} className="block text-xs font-bold text-gray-300 mb-1">
                            연락처 (핸드폰 번호) <span className="text-indigo-400" aria-hidden="true">*</span>
                          </label>
                          <input
                            id={`${fieldId}-phone`}
                            type="tel"
                            autoComplete="tel"
                            required
                            placeholder="예: 010-1234-5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 lg:gap-4">
                          <div>
                            <label htmlFor={`${fieldId}-email`} className="block text-xs font-bold text-gray-300 mb-1">이메일 (선택)</label>
                            <input
                              id={`${fieldId}-email`}
                              type="email"
                              autoComplete="email"
                              placeholder="example@company.com"
                              maxLength={INQUIRY_LIMITS.email}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>

                          <div>
                            <label htmlFor={`${fieldId}-reference`} className="block text-xs font-bold text-gray-300 mb-1">참고 사이트 URL (선택)</label>
                            <input
                              id={`${fieldId}-reference`}
                              type="url"
                              placeholder="https://example.com"
                              maxLength={INQUIRY_LIMITS.referenceUrl}
                              value={referenceUrl}
                              onChange={(e) => setReferenceUrl(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor={`${fieldId}-details`} className="block text-xs font-bold text-gray-300 mb-1">기타 문의 내용 (선택)</label>
                          <textarea
                            id={`${fieldId}-details`}
                            rows={3}
                            placeholder="구현하고 싶으신 핵심 기능이나 자유로운 문의 내용을 적어주세요."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            maxLength={INQUIRY_LIMITS.details}
                            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                          ></textarea>
                        </div>
                      </div>

                      {/* 개인정보 고지 — 제출 버튼 바로 위. 동의 체크박스는 두지 않는다(견적을 요청하신 분의 요청에 따른 처리,
                          개인정보 보호법 제15조 제1항 제4호). 항목·기간은 /privacy 와 같게 유지한다 */}
                      <p className="text-[11px] leading-relaxed text-gray-400">
                        견적 회신과 상담을 위해 성함(회사명)·휴대폰 번호와, 적어 주신 경우 이메일·참고 주소·문의 내용을 받습니다.
                        접수일로부터 1년 동안 보관한 뒤 파기합니다. 자세한 내용은{" "}
                        <Link href="/privacy" className="underline underline-offset-2 text-gray-300 hover:text-white">
                          개인정보 처리방침
                        </Link>
                        을 확인해 주세요.
                      </p>

                      <div className="pt-2 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-all"
                        >
                          이전 단계
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 lg:px-8 py-3.5 lg:py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white font-extrabold text-sm lg:text-base shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>제출 처리 중...</span>
                          ) : (
                            <>
                              <Send className="w-4.5 h-4.5" />
                              <span>무료 맞춤 견적서 신청하기</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
