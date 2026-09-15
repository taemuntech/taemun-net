"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  X,
  CheckCircle2,
  Layers,
  Compass,
  Award,
  ChevronRight,
  Phone,
  Clock,
  MapPin,
} from "lucide-react";

export default function AtelierVaucluseDemoPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    spaceType: "residential",
    area: "",
    budget: "1억~2억원",
    note: "",
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingOpen(false);
      setFormData({
        name: "",
        phone: "",
        spaceType: "residential",
        area: "",
        budget: "1억~2억원",
        note: "",
      });
    }, 2500);
  };

  const projects = [
    {
      id: "hannam",
      title: "Residence Private Sanctuary Hannam",
      category: "residential",
      categoryLabel: "주거 공간",
      location: "서울시 용산구 한남동 UN빌리지",
      area: "85평 (280㎡)",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      materials: "Travertine, French White Oak, Lime Plaster",
    },
    {
      id: "cheongdam",
      title: "Penthouse Horizon Pavilion",
      category: "residential",
      categoryLabel: "주거 공간",
      location: "서울시 강남구 청담동 PH129",
      area: "110평 (363㎡)",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      materials: "Nero Marquina, Smoked Walnut, Gunmetal Steel",
    },
    {
      id: "seongsu",
      title: "Atelier flagship Archive Seongsu",
      category: "commercial",
      categoryLabel: "상업 공간",
      location: "서울시 성동구 성수동 갤러리아포레 인근",
      area: "65평 (214㎡)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      materials: "Exposed Concrete, Microcement, Brass Detail",
    },
    {
      id: "pangyo",
      title: "Courtyard Villa of Stillness",
      category: "residential",
      categoryLabel: "주거 공간",
      location: "경기도 성남시 판교 운중동 단독주택",
      area: "135평 (446㎡)",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      materials: "Cedar Wood, Basalt Stone, Natural Clay Wall",
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#2C2926] font-sans antialiased selection:bg-[#D4C5B9] selection:text-[#1A1816]">
      {/* 1. TAEMUN STUDIO TOP FLOATING BANNER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#121826]/90 backdrop-blur-md border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-3">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>포트폴리오 목록으로 돌아가기</span>
          </Link>
          <span className="hidden lg:inline text-gray-400">|</span>
          <span className="hidden lg:inline text-gray-300">
            태문 DEV STUDIO 실물 라이브 데모 : <strong className="text-amber-400">ATELIER VAUCLUSE (아뜰리에 보클루즈)</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>이런 감성 웹사이트 제작 문의</span>
          </Link>
        </div>
      </div>

      {/* 2. DEMO SITE NAVIGATION */}
      <header className="pt-14 border-b border-[#EBE6DF] sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl lg:text-2xl font-serif tracking-[0.2em] font-semibold text-[#1F1C19]">
              ATELIER VAUCLUSE
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#8C827A] uppercase mt-0.5">
              Architecture & Spatial Interior
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.15em] font-medium text-[#6B635B] uppercase">
            <a href="#philosophy" className="hover:text-[#1F1C19] transition-colors">Philosophy</a>
            <a href="#portfolio" className="hover:text-[#1F1C19] transition-colors">Portfolio</a>
            <a href="#process" className="hover:text-[#1F1C19] transition-colors">Process</a>
            <a href="#materials" className="hover:text-[#1F1C19] transition-colors">Materials</a>
            <a href="#journal" className="hover:text-[#1F1C19] transition-colors">Journal</a>
          </nav>

          <button
            onClick={() => setBookingOpen(true)}
            className="px-5 py-2.5 rounded-none bg-[#1F1C19] hover:bg-[#3D3732] text-white text-xs tracking-[0.15em] uppercase font-medium transition-colors"
          >
            Book Consultation
          </button>
        </div>
      </header>

      {/* 3. HERO SHOWCASE SECTION */}
      <section className="px-6 lg:px-12 py-12 lg:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Hero Visual */}
          <div className="lg:col-span-8 relative rounded-none overflow-hidden group min-h-[440px] lg:min-h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85"
              alt="Residence Private Sanctuary Hannam"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E8DFD8] block mb-2 font-medium">
                Featured Space Archive
              </span>
              <h1 className="text-2xl lg:text-4xl font-serif tracking-wide leading-tight text-white mb-2">
                RESIDENCE PRIVATE SANCTUARY HANNAM
              </h1>
              <p className="text-xs lg:text-sm text-gray-200 font-light max-w-xl">
                시간의 흐름에 따라 변화하는 빛의 질감과 트래버틴 천연석이 빚어내는 궁극의 휴식 공간
              </p>
            </div>
          </div>

          {/* Side Editorial Grid */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="relative flex-1 rounded-none overflow-hidden group min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                alt="Material Composition 01"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E0D7D0]">Details</span>
                <div className="text-sm font-serif">Material Composition 01</div>
              </div>
            </div>

            <div className="relative flex-1 rounded-none overflow-hidden group min-h-[220px]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                alt="Spatial Perspective 02"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E0D7D0]">Geometry</span>
                <div className="text-sm font-serif">Spatial Perspective 02</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE PHILOSOPHY SECTION */}
      <section id="philosophy" className="py-20 lg:py-28 px-6 lg:px-12 border-t border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E948B] font-semibold block mb-3">
              Our Core Philosophy
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif text-[#1F1C19] leading-tight mb-6">
              공간을 대하는 보클루즈의
              <br />
              세 가지 시선
            </h2>
            <p className="text-sm lg:text-base text-[#6B635B] leading-relaxed font-light">
              우리는 눈으로 드러나는 일시적 장식을 지양하고, 사용자의 호흡과 시간의 두께를 오롯이 담아내는 구조적 본질에 집중합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Pillar 01 */}
            <div className="p-8 bg-[#F4EFEA] border-t-2 border-[#1F1C19] flex flex-col justify-between">
              <div>
                <span className="text-3xl font-serif text-[#A89F95] block mb-6">01</span>
                <h3 className="text-lg font-serif font-bold text-[#1F1C19] mb-3 tracking-wide">
                  MATERIALITY (물성의 깊이)
                </h3>
                <p className="text-xs lg:text-sm text-[#6B635B] leading-relaxed font-light">
                  천연 트래버틴, 석회 라임 플라스터, 러스틱 화이트 오크. 세월이 흐를수록 스스로 기품을 더해가는 자연 그대로의 마감재만을 엄선합니다.
                </p>
              </div>
              <div className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#8C827A] flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Natural Elements</span>
              </div>
            </div>

            {/* Pillar 02 */}
            <div className="p-8 bg-[#F4EFEA] border-t-2 border-[#1F1C19] flex flex-col justify-between">
              <div>
                <span className="text-3xl font-serif text-[#A89F95] block mb-6">02</span>
                <h3 className="text-lg font-serif font-bold text-[#1F1C19] mb-3 tracking-wide">
                  SPATIAL GEOMETRY (비례와 여백)
                </h3>
                <p className="text-xs lg:text-sm text-[#6B635B] leading-relaxed font-light">
                  자연광이 하루 동안 그리는 그림자의 궤적을 계산합니다. 불필요한 벽을 덜어내고 빛과 공기가 머무는 유기적인 순환 동선을 구축합니다.
                </p>
              </div>
              <div className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#8C827A] flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Light & Volume</span>
              </div>
            </div>

            {/* Pillar 03 */}
            <div className="p-8 bg-[#F4EFEA] border-t-2 border-[#1F1C19] flex flex-col justify-between">
              <div>
                <span className="text-3xl font-serif text-[#A89F95] block mb-6">03</span>
                <h3 className="text-lg font-serif font-bold text-[#1F1C19] mb-3 tracking-wide">
                  PRECISION (정밀 시공)
                </h3>
                <p className="text-xs lg:text-sm text-[#6B635B] leading-relaxed font-light">
                  보이지 않는 배관·단열 기초부터 1mm의 몰딩 단차까지. 직영 감리팀의 3단계 전수 검수를 거쳐 3년 품질 책임 보증을 약속합니다.
                </p>
              </div>
              <div className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#8C827A] flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>3-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARCHIVE PORTFOLIO SECTION */}
      <section id="portfolio" className="py-20 px-6 lg:px-12 bg-[#F6F3EE] border-t border-[#EBE6DF]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E948B] font-semibold block mb-2">
                Selected Works
              </span>
              <h2 className="text-3xl lg:text-4xl font-serif text-[#1F1C19]">
                프로젝트 아카이브
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors \${
                  selectedCategory === "all"
                    ? "bg-[#1F1C19] text-white"
                    : "bg-white text-[#6B635B] hover:bg-[#EBE6DF]"
                }`}
              >
                All Works
              </button>
              <button
                onClick={() => setSelectedCategory("residential")}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors \${
                  selectedCategory === "residential"
                    ? "bg-[#1F1C19] text-white"
                    : "bg-white text-[#6B635B] hover:bg-[#EBE6DF]"
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => setSelectedCategory("commercial")}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors \${
                  selectedCategory === "commercial"
                    ? "bg-[#1F1C19] text-white"
                    : "bg-white text-[#6B635B] hover:bg-[#EBE6DF]"
                }`}
              >
                Commercial
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredProjects.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-gray-200">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1F1C19]/80 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase">
                    {p.categoryLabel}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-serif text-[#1F1C19] group-hover:text-[#B45309] transition-colors mb-1">
                      {p.title}
                    </h3>
                    <div className="text-xs text-[#7A726A] flex items-center gap-3">
                      <span>{p.location}</span>
                      <span>•</span>
                      <span>{p.area}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#9E948B] group-hover:translate-x-1 transition-transform mt-1" />
                </div>
                <div className="text-[11px] text-[#8C827A] mt-2 font-mono">
                  Materials: {p.materials}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#FBF9F5] border border-[#E0D7CD] p-8 lg:p-10 shadow-2xl">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-6 right-6 text-[#6B635B] hover:text-[#1F1C19]"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-amber-700 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-serif text-[#1F1C19] mb-2">
                  상담 신청이 접수되었습니다
                </h3>
                <p className="text-xs text-[#6B635B] leading-relaxed">
                  보클루즈 총괄 디렉터가 영업일 기준 24시간 이내에
                  <br />
                  남겨주신 번호로 직접 사전 상담 전화를 드립니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E948B] font-semibold block">
                    Private Consultation
                  </span>
                  <h3 className="text-2xl font-serif text-[#1F1C19]">
                    1:1 공간 디자인 상담 신청
                  </h3>
                  <p className="text-xs text-[#6B635B] mt-1">
                    프로젝트의 기본 정보를 입력해 주시면 최적의 전담 설계팀을 배정합니다.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443E] mb-1">
                    성함 또는 기업명 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="예: 홍길동"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D1C7] text-sm text-[#1F1C19] focus:outline-none focus:border-[#1F1C19]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443E] mb-1">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-0000-0000"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D9D1C7] text-sm text-[#1F1C19] focus:outline-none focus:border-[#1F1C19]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A443E] mb-1">
                      공간 유형
                    </label>
                    <select
                      value={formData.spaceType}
                      onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#D9D1C7] text-xs text-[#1F1C19] focus:outline-none focus:border-[#1F1C19]"
                    >
                      <option value="residential">주거 (아파트/빌라)</option>
                      <option value="house">단독/타운하우스</option>
                      <option value="commercial">상업/오피스 공간</option>
                      <option value="hospitality">호텔/쇼룸</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A443E] mb-1">
                      공급 면적
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="예: 65평"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D9D1C7] text-sm text-[#1F1C19] focus:outline-none focus:border-[#1F1C19]"
                    >
                    </input>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443E] mb-1">
                    프로젝트 상세 내용 및 요청사항
                  </label>
                  <textarea
                    rows={3}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="공간 위치, 입주 예정 시기, 선호하시는 무드 등을 자유롭게 적어주세요."
                    className="w-full px-3.5 py-2 bg-white border border-[#D9D1C7] text-xs text-[#1F1C19] focus:outline-none focus:border-[#1F1C19] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1F1C19] hover:bg-[#3D3732] text-white text-xs tracking-widest uppercase font-semibold transition-colors mt-2"
                >
                  상담 신청 완료하기
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 7. FOOTER */}
      <footer className="py-12 px-6 lg:px-12 border-t border-[#EBE6DF] bg-[#F4EFEA] text-xs text-[#8C827A]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="font-serif text-sm font-semibold text-[#1F1C19] tracking-wider mb-1">
              ATELIER VAUCLUSE
            </div>
            <p>Architectural Design & Spatial Interior Studio</p>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <span>본 데모는 태문 DEV STUDIO가 구축한 실물 인터랙티브 포트폴리오입니다.</span>
            <Link
              href="/portfolio"
              className="text-amber-800 font-semibold hover:underline"
            >
              전체 포트폴리오 보기 →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
