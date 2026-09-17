'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { ConsultationFormData } from '../types';

export function ConsultationWizardSection() {
 const [formData, setFormData] = useState<ConsultationFormData>({
 fabEnv: 'semi',
 targetProcess: '',
 dailyVolume: '',
 companyName: '',
 contactName: '',
 email: '',
 phone: '',
 ndaAgreed: true,
 });

 // 샘플이라 실사·PoC 신청을 받지 않는다 — 가짜 접수 번호·「24시간 내 연락」 대신 공용 안내(SampleNotice)만 연다.
 const [isNoticeOpen, setIsNoticeOpen] = useState(false);

 // 예전에는 1번만 파랗고 2·3·4는 무엇을 채워도 영원히 회색이었다(죽은 장식).
 // 각 칸을 그 구간의 입력값으로 판정해 실제로 따라가게 한다.
 const filled = (value: string) => value.trim() !== '';
 const step2Done = filled(formData.targetProcess) && filled(formData.dailyVolume);
 const step3Done = filled(formData.companyName) && filled(formData.contactName) && filled(formData.email);
 const steps = [
 { label: '팹 환경 선택', done: filled(formData.fabEnv) },
 { label: '이송 공정 사양', done: step2Done },
 { label: '담당자 정보', done: step3Done },
 { label: 'NDA & 접수', done: step2Done && step3Done && formData.ndaAgreed },
 ];

 const handleSubmit = (e: FormEvent) => {
 e.preventDefault();
 setIsNoticeOpen(true);
 setFormData({
 fabEnv: 'semi',
 targetProcess: '',
 dailyVolume: '',
 companyName: '',
 contactName: '',
 email: '',
 phone: '',
 ndaAgreed: true,
 });
 };

 return (
 <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200" id="consultation-wizard">
 <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
 <div className="text-center max-w-2xl mx-auto mb-10">
 <div className="inline-flex items-center gap-2 mb-2">
 <span className="h-2 w-2 rounded bg-blue-600" />
 <span className="text-xs font-mono font-bold text-blue-600 uppercase">
 FAST TECHNICAL ONBOARDING
 </span>
 </div>
 <h2 className="text-2xl lg:text-4xl font-extrabold text-slate-900 tracking-tight [word-break:keep-all]">
 현장 엔지니어링 실사 & PoC 신청
 </h2>
 <p className="text-sm lg:text-base text-slate-600 mt-2 leading-relaxed [word-break:keep-all]">
 NEXUS 수석 로보틱스 솔루션 아키텍트가 귀사 클린룸 팹의 평면도를 분석하고 맞춤 설계를 제안합니다.
 </p>
 </div>

 {/* 4-Step Pure White Wizard Card */}
 <div className="bg-white rounded-lg border border-slate-200 p-5 sm:p-6 lg:p-10 shadow-sm">
 {/* Step Indicator — 입력 상태를 따라간다 */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 pb-6 border-b border-slate-200 text-center">
 {steps.map((step, idx) => (
 <div key={step.label} className="flex flex-col items-center">
 <span
 aria-hidden="true"
 className={`w-7 h-7 rounded-full font-mono text-xs flex items-center justify-center font-bold mb-1 transition-colors ${
 step.done ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
 }`}
 >
 {idx + 1}
 </span>
 <span className={`text-xs font-mono ${step.done ? 'font-bold text-slate-900' : 'text-slate-500'}`}>
 {step.label}
 </span>
 <span className="sr-only">{step.done ? '작성 완료' : '작성 전'}</span>
 </div>
 ))}
 </div>

 {/* Form Body */}
 <form className="space-y-6" onSubmit={handleSubmit}>
 {/* Step 1: Environment */}
 <div>
 <label className="block text-sm font-semibold text-slate-900 mb-3">
 1. 구축 희망 클린룸 환경 규격
 </label>
 <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3">
 <label
 className={`p-3.5 min-h-12 rounded border cursor-pointer flex items-center gap-3 transition-colors ${
 formData.fabEnv === 'semi'
 ? 'border-blue-600 bg-blue-50/50'
 : 'border-slate-200 hover:border-slate-300 bg-white'
 }`}
 >
 <input
 type="radio"
 name="fab_env"
 value="semi"
 checked={formData.fabEnv === 'semi'}
 onChange={(e) => setFormData({ ...formData, fabEnv: e.target.value })}
 className="h-5 w-5 shrink-0 text-blue-600 focus:ring-blue-500"
 />
 <span className="text-xs font-medium text-slate-800 [word-break:keep-all]">
 반도체 클린룸 (Class 1-100)
 </span>
 </label>

 <label
 className={`p-3.5 min-h-12 rounded border cursor-pointer flex items-center gap-3 transition-colors ${
 formData.fabEnv === 'battery'
 ? 'border-blue-600 bg-blue-50/50'
 : 'border-slate-200 hover:border-slate-300 bg-white'
 }`}
 >
 <input
 type="radio"
 name="fab_env"
 value="battery"
 checked={formData.fabEnv === 'battery'}
 onChange={(e) => setFormData({ ...formData, fabEnv: e.target.value })}
 className="h-5 w-5 shrink-0 text-blue-600 focus:ring-blue-500"
 />
 <span className="text-xs font-medium text-slate-800 [word-break:keep-all]">
 2차전지 드라이룸 (-50℃ 노점)
 </span>
 </label>

 <label
 className={`p-3.5 min-h-12 rounded border cursor-pointer flex items-center gap-3 transition-colors ${
 formData.fabEnv === 'bio'
 ? 'border-blue-600 bg-blue-50/50'
 : 'border-slate-200 hover:border-slate-300 bg-white'
 }`}
 >
 <input
 type="radio"
 name="fab_env"
 value="bio"
 checked={formData.fabEnv === 'bio'}
 onChange={(e) => setFormData({ ...formData, fabEnv: e.target.value })}
 className="h-5 w-5 shrink-0 text-blue-600 focus:ring-blue-500"
 />
 <span className="text-xs font-medium text-slate-800 [word-break:keep-all]">
 바이오·제약 무균실 (GMP)
 </span>
 </label>

 <label
 className={`p-3.5 min-h-12 rounded border cursor-pointer flex items-center gap-3 transition-colors ${
 formData.fabEnv === 'precision'
 ? 'border-blue-600 bg-blue-50/50'
 : 'border-slate-200 hover:border-slate-300 bg-white'
 }`}
 >
 <input
 type="radio"
 name="fab_env"
 value="precision"
 checked={formData.fabEnv === 'precision'}
 onChange={(e) => setFormData({ ...formData, fabEnv: e.target.value })}
 className="h-5 w-5 shrink-0 text-blue-600 focus:ring-blue-500"
 />
 <span className="text-xs font-medium text-slate-800 [word-break:keep-all]">
 고정밀 디스플레이/스마트 팩토리
 </span>
 </label>
 </div>
 </div>

 {/* Step 2: Target Process & Volume */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 <div>
 <label
 htmlFor="input-process"
 className="block text-xs font-medium text-slate-800 mb-1"
 >
 적용 대상 공정 (예: FOUP 반송, 파렛트 이송, 전극 롤 공급)
 </label>
 <input
 id="input-process"
 type="text"
 required
 placeholder="예: 300mm FOUP 베이 간 무인 자동 반송"
 value={formData.targetProcess}
 onChange={(e) => setFormData({ ...formData, targetProcess: e.target.value })}
 className="w-full h-11 px-3 rounded border border-slate-200 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
 />
 </div>
 <div>
 <label
 htmlFor="input-volume"
 className="block text-xs font-medium text-slate-800 mb-1"
 >
 일일 예상 반송 물동량
 </label>
 <input
 id="input-volume"
 type="text"
 required
 placeholder="예: 약 1,200 카세트 / Day"
 value={formData.dailyVolume}
 onChange={(e) => setFormData({ ...formData, dailyVolume: e.target.value })}
 className="w-full h-11 px-3 rounded border border-slate-200 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
 />
 </div>
 </div>

 {/* Step 3: Contact Details */}
 <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-4">
 <div>
 <label
 htmlFor="input-company"
 className="block text-xs font-medium text-slate-800 mb-1"
 >
 기업명
 </label>
 <input
 id="input-company"
 type="text"
 required
 placeholder="회사명 입력"
 value={formData.companyName}
 onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
 className="w-full h-11 px-3 rounded border border-slate-200 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
 />
 </div>
 <div>
 <label
 htmlFor="input-name"
 className="block text-xs font-medium text-slate-800 mb-1"
 >
 성함 및 직책
 </label>
 <input
 id="input-name"
 type="text"
 required
 placeholder="홍길동 수석연구원"
 value={formData.contactName}
 onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
 className="w-full h-11 px-3 rounded border border-slate-200 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
 />
 </div>
 <div>
 <label
 htmlFor="input-email"
 className="block text-xs font-medium text-slate-800 mb-1"
 >
 업무용 이메일
 </label>
 <input
 id="input-email"
 type="email"
 required
 placeholder="name@example.com"
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="w-full h-11 px-3 rounded border border-slate-200 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
 />
 </div>
 <div>
 <label
 htmlFor="input-phone"
 className="block text-xs font-medium text-slate-800 mb-1"
 >
 연락처
 </label>
 <input
 id="input-phone"
 type="tel"
 required
 placeholder="010-0000-0000"
 value={formData.phone}
 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
 className="w-full h-11 px-3 rounded border border-slate-200 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
 />
 </div>
 </div>

 {/* Step 4: NDA Checkbox */}
 <div className="pt-2">
 <label className="flex items-start gap-2.5 min-h-11 py-1 text-xs text-slate-800 cursor-pointer [word-break:keep-all]">
 <input
 type="checkbox"
 checked={formData.ndaAgreed}
 onChange={(e) => setFormData({ ...formData, ndaAgreed: e.target.checked })}
 className="h-5 w-5 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
 />
 <span>
 [보안 필수] 미팅 전 사전 표준 비밀유지협약(NDA) 체결을 희망합니다. (도면 및 레이아웃 보호)
 </span>
 </label>
 </div>

 {/* 제출 전 고지 — 흐린 잔글씨로 두지 않는다(읽혀야 의미가 있다) */}
 <div className="mt-2 rounded border border-blue-200 bg-blue-50/70 px-4 py-3 text-sm font-medium text-slate-800">
 샘플 사이트입니다 — 입력하신 내용은 어디에도 <strong className="font-bold">전송되지 않습니다</strong>. 실제 실사·PoC 신청은 접수되지 않습니다.
 </div>

 {/* Submit Button */}
 <div className="pt-4 flex flex-wrap items-center justify-end gap-4">
 <button
 type="submit"
 className="w-full sm:w-auto px-8 py-3.5 min-h-12 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer [word-break:keep-all]"
 >
 <span>엔지니어링 기술 검토 및 방문 실사 신청</span>
 <Send className="w-4 h-4" />
 </button>
 </div>
 </form>
 </div>
 </div>

 <SampleNotice
 open={isNoticeOpen}
 onClose={() => setIsNoticeOpen(false)}
 slug="nexus-robotics"
 industry="corporate"
 featureName="현장 엔지니어링 실사·PoC 신청 폼"
 />
 </section>
 );
}
