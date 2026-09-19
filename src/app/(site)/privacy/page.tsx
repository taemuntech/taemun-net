import type { Metadata } from "next";
import Link from "next/link";
import { SITE_OG_IMAGES } from "@/lib/site-og";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";
import { SiteBusinessInfo } from "@/components/SiteBusinessInfo";

// 개인정보 처리방침 — 견적 문의(/inquiry)가 성함·연락처를 받으므로 공개해야 한다(개인정보 보호법 제30조).
// 2026-09-18 가온 초안, 09-19 형 확인(보유기간 접수일부터 1년 · 보호책임자 이동주) 뒤 시행.
// 문의 화면·API 가 실제로 하는 일만 적는다 — 기능을 바꾸면 여기도 같이 고친다:
//   - 받는 칸: src/app/(site)/inquiry/InquiryView.tsx · 서버 검증 src/lib/inquiry/validate.ts
//   - 저장·알림: src/app/api/inquiry/route.ts (Supabase 저장 → 솔라피 문자로 태문 담당자에게 알림. 고객에게는 문자를 보내지 않는다)
//   - 분석 도구: (site)/layout.tsx 의 GA 는 NEXT_PUBLIC_GA_ID 가 있을 때만 켜진다. 09-18 운영 HTML 에 없음 — 켜면 7항을 고친다.

const EFFECTIVE_DATE = "2026년 9월 19일";
// 7항 변경(문의 단계 기록) — 11항 「시행 7일 전에 알립니다」 약속대로 공지일과 시행일을 7일 띄운다.
// 기록 코드도 시행일 전에는 아무것도 보내지 않는다(src/lib/inquiry/track.ts TRACKING_STARTS_AT — 날짜를 같이 바꿀 것).
const REVISION_NOTICE_DATE = "2026년 9월 19일";
const REVISION_DATE = "2026년 9월 26일";
// 정정(약속한 내용은 그대로 두고 사실 표기만 바로잡음 — 11항의 「시행 7일 전 공지」 대상인 변경이 아니라 게시 즉시 반영).
// 2026-09-19: 5·6항 수탁자 명칭을 각 업체가 공개한 정식 명칭으로, 6항에 이전받는 자 연락처와 문의 DB 의
// 실제 보관 위치(서울)를 적었다. 출처 URL 은 5·6항 표 위 주석.
const CORRECTION_DATE = "2026년 9월 19일";
const PRIVACY_OFFICER = "이동주";
const CONTACT_EMAIL = "contact@taemun.co.kr";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "태문넷(주식회사 태문)이 견적 문의로 받는 개인정보를 어떻게 처리하는지 안내합니다.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "태문넷",
    title: "개인정보 처리방침 | 태문넷",
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
            ← 태문넷
          </Link>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">개인정보 처리방침</h1>
          <p className="text-sm text-zinc-600 leading-relaxed">
            주식회사 태문(이하 「태문」)은 태문넷 사이트(taemun.net)에서 견적 문의를 받으면서 필요한 만큼의
            개인정보만 처리합니다. 이 방침은 어떤 정보를 왜 받고, 얼마 동안 보관하며, 누구에게 맡기는지 안내합니다.
          </p>
          <p className="text-xs text-zinc-500">
            시행일: {EFFECTIVE_DATE} ·{" "}
            <a href="#privacy-change-7" className="underline underline-offset-2">
              변경 예정: {REVISION_DATE}(7항)
            </a>{" "}
            ·{" "}
            <a href="#privacy-history" className="underline underline-offset-2">
              정정: {CORRECTION_DATE}
            </a>
          </p>
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
                    이메일, 참고 사이트 주소, 문의 내용, 문의 화면에서 고르신 값(서비스·예산·일정·연락 방법·레퍼런스 활용 방식)
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
          {/* 수탁자 정식 명칭 출처(2026-09-19 확인):
              - Supabase Pte. Ltd. — https://supabase.com/privacy 첫 문장 「Supabase Pte. Ltd., ("Supabase" …)」,
                https://supabase.com/terms 계약 당사자 「SUPABASE PTE. LTD., a Singapore entity」(65 Chulia Street #38-02/03,
                OCBC Centre, Singapore 049513). 예전 표기 「Supabase, Inc.」는 처리방침·약관이 가리키는 법인이 아니었다.
              - Vercel Inc. — https://vercel.com/legal/privacy-policy 연락처 「Vercel Inc. 440 N Barranca Avenue #4133
                Covina, CA 91723 United States」(Last Updated June 1, 2026). 쉼표 없는 「Vercel Inc.」가 정식 표기.
              - 솔라피(주) — https://solapi.com/ 꼬리말 「솔라피(주)」 · 사업자등록번호 217-81-33791. */}
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
                  <td className={cell}>Supabase Pte. Ltd.</td>
                  <td className={cell}>문의 내용 저장(데이터베이스)</td>
                </tr>
                <tr>
                  <td className={cell}>Vercel Inc.</td>
                  <td className={cell}>사이트 호스팅, 접속 기록 보관</td>
                </tr>
                <tr>
                  <td className={cell}>솔라피(주)(SOLAPI)</td>
                  <td className={cell}>
                    문의가 접수되면 태문 담당자에게 알림 문자 발송(연락처·이메일·문의 내용 요약과 문의 화면에서 고르신 값이 담깁니다)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section n={6} title="국외 이전">
          {/* 개인정보 보호법 제28조의8 제2항 — 이전받는 자의 법인명·연락처, 이전 국가·일시·방법, 항목, 목적·보유기간,
              거부 방법·절차·효과를 알린다. 사실 근거(2026-09-19):
              - 문의 DB 위치: Supabase 프로젝트 DB 호스트 IPv6 2406:da12:5ca:… 가 https://ip-ranges.amazonaws.com/ip-ranges.json
                의 2406:da12::/36 (region ap-northeast-2, 서울)에 속함(리드 확인). 수탁 법인(Supabase Pte. Ltd.)이 싱가포르
                법인이라 데이터가 서울에 있어도 국외 법인이 처리하는 것으로 보고 이 항에 적는다(보수적 해석).
              - Supabase 연락처: https://supabase.com/privacy 「please send us an email at privacy@supabase.com」.
                Supabase 직원·재수탁자가 어느 나라에서 접근하는지는 공개 문서에서 확정하지 못함(미확인). 다만 개인정보 처리방침이
                「primarily hosted in and provided from the United States」, 재수탁자 시설 어디서든 처리할 수 있다고 적으므로
                (https://supabase.com/privacy · https://supabase.com/legal/dpa) 초판에 적었던 미국을 빼지 않고 「싱가포르·미국 등」으로 적는다.
              - Vercel 함수 위치: 운영 응답 헤더 X-Vercel-Id 「icn1::iad1」(서울 접점 → iad1 실행). iad1 = 「Washington, D.C., USA」
                (https://vercel.com/docs/regions — 함수 기본 지역도 iad1). 연락처 privacy@vercel.com(https://vercel.com/legal/privacy-policy).
              - Vercel 기록 보관: https://vercel.com/docs/logs/runtime 「Limits」 표 — 요금제별 1시간~30일. 태문넷 요금제는 확인 안 함(미확인).
                문의 API 는 오류가 나면 DB 오류 내용을 기록하므로(입력값 일부가 담길 수 있다) 「기록이 남을 수 있다」로 적는다. */}
          <p>
            문의를 처리하는 과정에서 아래와 같이 국외 법인에 개인정보가 전송되거나 국외 법인이 개인정보를 처리합니다. 문의
            내용이 저장되는 데이터베이스는 대한민국(서울)에 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className={cell}>이전받는 자(연락처)</th>
                  <th className={cell}>이전 국가</th>
                  <th className={cell}>이전 일시·방법</th>
                  <th className={cell}>이용 목적·항목</th>
                  <th className={cell}>보유기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cell}>
                    Supabase Pte. Ltd.
                    <br />
                    <a href="mailto:privacy@supabase.com" className="underline underline-offset-2">
                      privacy@supabase.com
                    </a>
                  </td>
                  <td className={cell}>
                    데이터 보관: 대한민국(서울, AWS 서울 리전). 운영·장애 대응을 위해 Supabase(싱가포르 법인)와 그 재수탁자가
                    국외(싱가포르·미국 등)에서 접근·처리할 수 있습니다.
                  </td>
                  <td className={cell}>문의를 제출할 때, 암호화된 통신(HTTPS)으로 전송</td>
                  <td className={cell}>문의 내용 저장(데이터베이스) · 2항의 항목 전부</td>
                  <td className={cell}>3항의 기간(접수일로부터 1년) 동안 보관한 뒤 파기</td>
                </tr>
                <tr>
                  <td className={cell}>
                    Vercel Inc.
                    <br />
                    <a href="mailto:privacy@vercel.com" className="underline underline-offset-2">
                      privacy@vercel.com
                    </a>
                  </td>
                  <td className={cell}>미국(워싱턴 D.C. 지역 서버)</td>
                  <td className={cell}>사이트에 접속하거나 문의를 제출할 때, 암호화된 통신(HTTPS)으로 전송</td>
                  <td className={cell}>
                    사이트 호스팅과 문의 접수 처리 · 2항의 항목(문의 제출 시), 접속 기록(IP 주소·접속 일시·브라우저 정보)
                  </td>
                  <td className={cell}>
                    문의 내용은 Vercel 에 따로 저장하지 않고 접수 즉시 데이터베이스로 넘깁니다. 접속·오류 기록(오류가 나면 입력하신
                    내용 일부가 담길 수 있습니다)은 Vercel 의 기록 보관 기간(요금제에 따라 1시간~30일) 동안 남은 뒤 삭제됩니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            거부 방법: 국외 이전을 원하지 않으시면 문의 화면 대신 전화({STUDIO_PHONE})로 문의해 주세요. 이 경우 사이트에
            정보가 저장되지 않습니다.
          </p>
        </Section>

        <Section n={7} title="쿠키와 분석 도구">
          <p>견적 문의 화면은 쿠키를 쓰지 않습니다. 방문 통계 도구도 쓰지 않습니다.</p>
          <div id="privacy-change-7" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950">
            <p className="font-bold">변경 예정 — {REVISION_DATE} 시행 (공지 {REVISION_NOTICE_DATE})</p>
            <p className="mt-1">
              문의 화면을 더 쓰기 쉽게 고치려고, 방문하신 분이 문의 단계를 몇 단계까지 진행했는지와 어느 버튼을 눌렀는지를
              기록합니다. 이 기록에는 이름·연락처·입력하신 내용·IP 주소가 들어가지 않고, 브라우저 탭마다 새로 만드는 임의
              번호로만 묶어 누구인지 알 수 없습니다. 쿠키는 계속 쓰지 않습니다.
            </p>
          </div>
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
          <div id="privacy-history" className="space-y-1">
            <p className="font-bold text-zinc-900">변경·정정 이력</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{EFFECTIVE_DATE}: 시행</li>
              <li>
                {CORRECTION_DATE} 정정: 문의 데이터 보관 위치(대한민국 서울) 명시, 국외 이전받는 자의 연락처 추가, 수탁자
                명칭을 각 업체가 공개한 정식 명칭(Supabase Pte. Ltd.·Vercel Inc.·솔라피(주))으로 정정, 알림 문자에 담기는 항목을
                실제와 맞게 정정. 3항 보유기간(접수일로부터 1년)과 처리 목적·항목은 바뀌지 않았습니다. 6항에는 이전 국가를
                업체별로 나눠 적고 Vercel 접속·오류 기록의 보관 기간을 따로 적었습니다.
              </li>
              <li>
                {REVISION_DATE} 변경 예정(공지 {REVISION_NOTICE_DATE}): 7항 문의 단계 기록 —{" "}
                <a href="#privacy-change-7" className="underline underline-offset-2">
                  내용 보기
                </a>
              </li>
            </ul>
          </div>
        </Section>

        {/* 사업자 정보는 SiteBusinessInfo 한 곳(홈·/inquiry 와 같은 값) */}
        <footer className="border-t border-zinc-200 pt-6">
          <SiteBusinessInfo />
        </footer>
      </div>
    </main>
  );
}
