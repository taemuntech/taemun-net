"use client";

import ParticleCanvas from "@/components/ParticleCanvas";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Code, 
  FileCheck, 
  HelpCircle, 
  Layers, 
  Lock, 
  MessageSquare, 
  PhoneCall, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  ThumbsUp, 
  Zap 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InquiryPage() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const serviceOptions = [
    { id: "custom-web-app", label: "맞춤형 웹·앱 제작", desc: "고성능 반응형 사이트 및 서비스" },
    { id: "tdocs-saas", label: "전자서식 SaaS (T-DOCS)", desc: "모바일 캔버스 서식 & 카톡 서명 모듈" },
    { id: "pg-billing", label: "PG 결제 & 정기구독 연동", desc: "단건 결제, 빌링키 정기 결제 시스템" },
    { id: "platform-build", label: "대형 매칭·커머스 플랫폼", desc: "풀스택 B2B/B2C 매칭·유통 시스템" },
    { id: "ai-automation", label: "AI 자동화 & 고도화", desc: "업무 자동화, AI 에이전트 연동" },
    { id: "undecided", label: "아직 미정", desc: "상담을 통해 맞춤형 기능 추천" },
  ];

  const budgetOptions = [
    "300만 원 미만 (기본 런칭)",
    "300만 원 ~ 500만 원 (스마트 패키지)",
    "500만 원 ~ 1,000만 원 (프리미엄 솔루션)",
    "1,000만 원 이상 (대형 플랫폼 / 3D 융합)",
    "미정 (상담 시 안내 받기)",
  ];

  const timelineOptions = [
    "2주 이내 (초고속 MVP 런칭)",
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
    <div className="relative min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background Particle Canvas */}
      <ParticleCanvas />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gray-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src="/images/logo/icon-192-transparent.png"
                alt="태문 로고"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              태문 <span className="text-indigo-400 text-sm font-semibold ml-1">DEV STUDIO</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>메인으로 돌아가기</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Why TAEMUN DEV STUDIO & Trust Badges */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>스마트 3초 무료 맞춤 견적 신청</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                왜 국내 대표님들이<br />
                <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                  태문 개발팀을 선택할까요?
                </span>
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                단순 2D 템플릿 복사가 아닙니다. 기획자·개발자 간의 전달 오류 제로. 총괄 아키텍트가 1:1로 직접 챙기는 고성능 시스템 구축.
              </p>
            </div>

            {/* 4 Trust Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">납기일 엄수 & 지체상금 보장</h4>
                  <p className="text-xs text-gray-400">약속된 기한을 철저히 준수하며 납기 지연 시 일당 지체상금 차감 지원</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">소스코드 100% 소유권 이전</h4>
                  <p className="text-xs text-gray-400">월 관리비 강요 0%. 모든 깃허브 소스코드와 DB 소유권을 완전 양도</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">24시간 실시간 스태징 서버 공개</h4>
                  <p className="text-xs text-gray-400">깜깜이 개발 0%. 개발 진행 중인 스태징 URL을 실시간 공개하여 소통 지원</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gray-900/60 border border-white/10 backdrop-blur-md flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">3개월 무상 버그 A/S 보장</h4>
                  <p className="text-xs text-gray-400">오픈 후 3개월간 버그 및 오타 발생 시 무상으로 즉시 수정 책임 지원</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 backdrop-blur-md text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-300">
                <PhoneCall className="w-4 h-4" />
                <span>유선 전화 상담도 언제든 가능합니다</span>
              </div>
              <p className="text-gray-300">대표전화: 1588-2622 (24시간 접수)</p>
              <p className="text-gray-400">이메일: contact@taemun.co.kr</p>
            </div>
          </div>

          {/* Right Column: Interactive 4-Step Wizard */}
          <div className="lg:col-span-7">
            <div className="bg-gray-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-indigo-500/10 relative">

              {isSubmitted ? (
                /* Success View */
                <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 p-0.5 mx-auto">
                    <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    견적 문의가 정상 접수되었습니다!
                  </h2>

                  <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    작성해 주신 내용을 바탕으로 총괄 아키텍트가 1시간 이내로 연락해 정밀 견적과 개발 일정을 안내해 드리겠습니다.
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
                  {/* Progress Header */}
                  <div className="mb-8 space-y-3">
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
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium animate-in fade-in">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  {/* STEP 1: Services */}
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          1. 어떤 서비스가 필요하세요? <span className="text-indigo-400">*</span>
                        </h3>
                        <p className="text-xs text-gray-400">필요한 모든 항목을 자유롭게 복수 선택해 주세요.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {serviceOptions.map((item) => {
                          const isSelected = selectedServices.includes(item.id);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleService(item.id)}
                              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                                isSelected
                                  ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                                  : "bg-gray-950/60 border-white/10 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-sm">{item.label}</span>
                                <div
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-indigo-500 border-indigo-400 text-white"
                                      : "border-gray-600"
                                  }`}
                                >
                                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>
                              </div>
                              <span className="text-xs text-gray-400">{item.desc}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={handleNextStep}
                          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-all flex items-center gap-2"
                        >
                          <span>다음 단계로 (2/4)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Budget */}
                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          2. 프로젝트 예상 예산 범위는 어느 정도인가요? <span className="text-indigo-400">*</span>
                        </h3>
                        <p className="text-xs text-gray-400">예산에 최적화된 기술 아키텍처를 제안해 드립니다.</p>
                      </div>

                      <div className="space-y-3">
                        {budgetOptions.map((opt, idx) => {
                          const isSelected = budget === opt;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setBudget(opt)}
                              className={`w-full p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10"
                                  : "bg-gray-950/60 border-white/10 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
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

                      <div className="pt-4 flex items-center justify-between">
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
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          3. 언제까지 서비스 완성이 필요하신가요? <span className="text-indigo-400">*</span>
                        </h3>
                        <p className="text-xs text-gray-400">초고속 MVP 런칭부터 정밀 구축까지 선택해 주세요.</p>
                      </div>

                      <div className="space-y-3">
                        {timelineOptions.map((opt, idx) => {
                          const isSelected = timeline === opt;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setTimeline(opt)}
                              className={`w-full p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-pink-600/20 border-pink-500 text-white shadow-lg shadow-pink-500/10"
                                  : "bg-gray-950/60 border-white/10 text-gray-300 hover:border-white/20"
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
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

                      <div className="pt-4 flex items-center justify-between">
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
                    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          4. 맞춤 견적서를 받아보실 정보를 입력해 주세요
                        </h3>
                        <p className="text-xs text-gray-400">입력해 주신 정보로 1시간 이내에 맞춤 제안서를 보내드립니다.</p>
                      </div>

                      <div className="space-y-4 text-left">
                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            성함 / 회사명 <span className="text-indigo-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="예: 홍길동 대표 / 태문기업"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">
                            연락처 (핸드폰 번호) <span className="text-indigo-400">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="예: 010-1234-5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">이메일 (선택)</label>
                            <input
                              type="email"
                              placeholder="example@company.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-300 mb-1">참고 사이트 URL (선택)</label>
                            <input
                              type="url"
                              placeholder="https://example.com"
                              value={referenceUrl}
                              onChange={(e) => setReferenceUrl(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-300 mb-1">기타 문의 내용 (선택)</label>
                          <textarea
                            rows={3}
                            placeholder="구현하고 싶으신 핵심 기능이나 자유로운 문의 내용을 적어주세요."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                          ></textarea>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between">
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
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white font-extrabold text-base shadow-xl shadow-indigo-500/25 hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span>제출 처리 중...</span>
                          ) : (
                            <>
                              <Send className="w-5 h-5" />
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
