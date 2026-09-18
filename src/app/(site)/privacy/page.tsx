import type { Metadata } from "next";
import Link from "next/link";
import { SITE_OG_IMAGES } from "@/lib/site-og";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";

// 개인정보 처리방침 — 견적 문의(/inquiry)가 성함·연락처를 받으므로 공개해야 한다(개인정보 보호법 제30조).
// 2026-09-18 가온 초안, 09-19 형 확인(보유기간 접수일부터 1년 · 보호책임자 이동주) 뒤 시행.
// 문의 화면·API 가 실제로 하는 일만 적는다 — 기능을 바꾸면 여기도 같이 고친다:
//   - 받는 칸: src/app/(site)/inquiry/InquiryView.tsx · 서버 검증 src/lib/inquiry/validate.ts
//   - 저장·알림: src/app/api/inquiry/route.ts (Supabase 저장 → 솔라피 문자로 태문 담당자에게 알림. 고객에게는 문자를 보내지 않는다)
//   - 분석 도구: (site)/layout.tsx 의 GA 는 NEXT_PUBLIC_GA_ID 가 있을 때만 켜진다. 09-18 운영 HTML 에 없음 — 켜면 7항을 고친다.

const EFFECTIVE_DATE = "2026년 9월 19일";
const PRIVACY_OFFICER = "이동주";
const CONTACT_EMAIL = "contact@taemun.co.kr";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "태문 DEV STUDIO(주식회사 태문)가 견적 문의로 받는 개인정보를 어떻게 처리하는지 안내합니다.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문 DEV STUDIO",
    title: "개인정보 처리방침 | 태문 DEV STUDIO",
    description: "견적 문의로 받는 개인정보의 처리 목적·항목·보유기간·위탁·국외 이전·권리 행사 방법",
    url: "/privacy",
    images: SITE_OG_IMAGES,
  },
};

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3" aria-labelledby={`privacy-${n}`}>
      <h2 id={`privacy-${n}`} className="text-base lg:text-lg font-bold text-zinc-900">
        {n}. {title}
      </h2>
      <div className="space-y-2 text-sm leading-relaxed text-zinc-700">{children}</div>
    </section>
  );
}

const cell = "border border-zinc-200 px-3 py-2 align-top text-left";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 [word-break:keep-all]">
      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12 lg:py-16 space-y-10">
        <header className="space-y-3 border-b border-zinc-200 pb-8">
          <Link href="/" className="text-xs font-bold text-zinc-500 hover:text-zinc-900">
            ← 태문 DEV STUDIO
          </Link>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">개인정보 처리방침</h1>
          <p className="text-sm text-zinc-600 leading-relaxed">
            주식회사 태문(이하 「태문」)은 태문 DEV STUDIO 사이트(taemun.net)에서 견적 문의를 받으면서 필요한 만큼의
            개인정보만 처리합니다. 이 방침은 어떤 정보를 왜 받고, 얼마 동안 보관하며, 누구에게 맡기는지 안내합니다.
          </p>
          <p className="text-xs text-zinc-500">시행일: {EFFECTIVE_DATE}</p>
        </header>

        <Section n={1} title="처리 목적">
          <p>견적 문의를 접수하고, 문의하신 분께 연락해 상담하고 견적을 드리기 위해서만 씁니다. 광고·홍보 문자나 메일은 보내지 않습니다.</p>
        </Section>

        <Section n={2} title="처리하는 항목과 받는 방법">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className={cell}>구분</th>
                  <th className={cell}>항목</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cell}>필수</td>
                  <td className={cell}>성함 또는 회사명, 휴대폰(연락처) 번호</td>
                </tr>
                <tr>
                  <td className={cell}>선택</td>
                  <td className={cell}>
                    이메일, 참고 사이트 주소, 문의 내용, 고르신 서비스·예산·일정
                  </td>
                </tr>
                <tr>
                  <td className={cell}>자동으로 남는 정보</td>
                  <td className={cell}>
                    어느 샘플·페이지에서 문의 화면으로 오셨는지(유입 정보), 접수 일시. 사이트를 보는 동안 호스팅 서버에
                    접속 기록(IP 주소·접속 일시·브라우저 정보)이 남을 수 있습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            문의 화면에 직접 입력하신 정보만 받습니다. 개인정보 보호법 제15조 제1항 제4호(계약 체결을 위해 정보주체가 요청한
            조치)에 따라 따로 동의를 받지 않고 처리합니다.
          </p>
        </Section>

        <Section n={3} title="보유기간과 파기">
          <p>
            접수일로부터 <strong>1년</strong> 동안 보관한 뒤 지체 없이 파기합니다. 상담 뒤 계약을 맺으신 경우에는 계약이 끝날
            때까지 보관하고, 관계 법령이 보존을 요구하는 기록은 그 기간 동안 보관합니다.
          </p>
          <p>전자 파일은 되살릴 수 없는 방법으로 지우고, 종이 문서는 분쇄하거나 소각합니다.</p>
        </Section>

        <Section n={4} title="제3자 제공">
          <p>받은 개인정보를 다른 회사나 기관에 제공하지 않습니다. 법령에 따라 수사기관 등이 요구하는 경우만 예외입니다.</p>
        </Section>

        <Section n={5} title="처리 위탁">
          <p>사이트 운영과 문의 접수를 위해 아래 업체에 처리를 맡깁니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className={cell}>수탁자</th>
                  <th className={cell}>맡기는 일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cell}>Supabase, Inc.</td>
                  <td className={cell}>문의 내용 저장(데이터베이스)</td>
                </tr>
                <tr>
                  <td className={cell}>Vercel, Inc.</td>
                  <td className={cell}>사이트 호스팅, 접속 기록 보관</td>
                </tr>
                <tr>
                  <td className={cell}>솔라피(SOLAPI)</td>
                  <td className={cell}>문의가 접수되면 태문 담당자에게 알림 문자 발송(성함·연락처·문의 요약이 담깁니다)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section n={6} title="국외 이전">
          <p>
            위 수탁자 중 Supabase, Inc.와 Vercel, Inc.는 미국 법인이라, 문의하실 때 입력하신 정보가 인터넷으로 이 업체들의
            서버에 전송·보관됩니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>이전 국가: 미국 및 각 업체가 운영하는 서버 소재 국가</li>
            <li>이전 항목: 2항의 항목 전부</li>
            <li>이전 시점·방법: 문의를 제출할 때, 암호화된 통신(HTTPS)으로 전송</li>
            <li>목적과 보유기간: 5항의 일을 위해, 3항의 기간 동안</li>
            <li>
              거부 방법: 국외 이전을 원하지 않으시면 문의 화면 대신 전화({STUDIO_PHONE})로 문의해 주세요. 이 경우 사이트에
              정보가 저장되지 않습니다.
            </li>
          </ul>
        </Section>

        <Section n={7} title="쿠키와 분석 도구">
          <p>견적 문의 화면은 쿠키를 쓰지 않습니다. 방문 통계 도구도 쓰지 않습니다.</p>
        </Section>

        <Section n={8} title="정보주체의 권리">
          <p>
            내 정보의 열람·정정·삭제·처리정지를 언제든 요구하실 수 있습니다. 아래 연락처로 말씀해 주시면 지체 없이 처리하고
            결과를 알려 드립니다. 법정대리인이나 위임받은 분을 통해서도 요구하실 수 있습니다.
          </p>
        </Section>

        <Section n={9} title="안전성 확보 조치">
          <ul className="list-disc pl-5 space-y-1">
            <li>문의 내용은 관리 권한을 가진 사람만 볼 수 있습니다.</li>
            <li>사이트와 주고받는 모든 정보는 암호화된 통신(HTTPS)으로 전송합니다.</li>
            <li>문의 접수 단계에서 입력값을 검사하고, 같은 번호의 반복 접수와 자동 등록을 걸러 냅니다.</li>
          </ul>
        </Section>

        <Section n={10} title="개인정보 보호책임자와 문의처">
          <ul className="space-y-1">
            <li>개인정보 보호책임자: {PRIVACY_OFFICER}</li>
            <li>
              이메일: <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">{CONTACT_EMAIL}</a>
            </li>
            <li>
              전화: <a href={`tel:${STUDIO_PHONE}`} className="underline underline-offset-2">{STUDIO_PHONE}</a>
            </li>
          </ul>
          <p>
            개인정보 침해에 대한 신고·상담은 개인정보침해신고센터(국번 없이 118, privacy.kisa.or.kr), 개인정보
            분쟁조정위원회(1833-6972, www.kopico.go.kr)에도 하실 수 있습니다.
          </p>
        </Section>

        <Section n={11} title="방침의 변경">
          <p>이 방침을 바꾸면 시행 7일 전에 이 페이지에 알립니다.</p>
        </Section>

        <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 space-y-1">
          <p>주식회사 태문 · 사업자등록번호 696-86-03651 · 대전광역시 대덕구 대화로 120, 2층</p>
        </footer>
      </div>
    </main>
  );
}
