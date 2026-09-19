// 사업자 정보 표기 — 전자상거래법 제10조의 표시 항목 형식(상호·대표자·주소·전화·이메일·사업자등록번호·통신판매업
// 신고번호·호스팅서비스 제공자)으로 적는다. 태문넷은 문의만 받고 사이트에서 계약·결제를 하지 않아 이용약관 페이지는 두지
// 않는다(같은 조 5호) — 온라인 결제를 붙이게 되면 약관부터 만들 것.
// 홈·/inquiry·/privacy 꼬리말이 이 한 곳을 같이 쓴다 — 값이 바뀌면 여기만 고친다.
//
// 값의 출처: 2026-09-19 형 확인(대표 정미현) + 같은 회사의 T-DOCS/브릿지 꼬리말(Taemun-bridge src/components/Footer.tsx).
// 주소는 태문넷에 이미 공개돼 있던 표기(「대전광역시 대덕구 대화로 120, 2층」)를 그대로 둔다.
// ⚠️ 브릿지 꼬리말의 「통신판매중개자로서 …」 문장은 옮기지 않는다 — 태문넷은 중개 플랫폼이 아니라 태문이 직접
//    계약·개발하는 사이트다.
// 훅·이벤트 없음 — 서버 컴포넌트(privacy)와 클라이언트 컴포넌트(HomeView·InquiryView) 양쪽에서 그대로 쓴다.

import { STUDIO_PHONE } from "@/lib/inquiry/contact";

export const BUSINESS_INFO = {
  name: "주식회사 태문",
  ceo: "정미현",
  bizNo: "696-86-03651",
  bizCheckUrl: "https://www.ftc.go.kr/bizCommPop.do?wrkr_no=6968603651",
  mailOrderNo: "제2026-대전대덕-0229호",
  address: "대전광역시 대덕구 대화로 120, 2층",
  hosting: "Vercel Inc.",
  email: "contact@taemun.co.kr",
  phone: STUDIO_PHONE,
} as const;

const sep = <span className="hidden lg:inline text-zinc-300" aria-hidden="true">|</span>;

export function SiteBusinessInfo({ className = "" }: { className?: string }) {
  const b = BUSINESS_INFO;
  return (
    <address
      className={`not-italic text-[11px] lg:text-xs leading-relaxed text-zinc-500 space-y-1 [word-break:keep-all] ${className}`}
    >
      <p className="flex flex-col gap-0.5 lg:flex-row lg:flex-wrap lg:gap-x-2">
        <span>상호: {b.name}</span>
        {sep}
        <span>대표자: {b.ceo}</span>
        {sep}
        <span>
          사업자등록번호: {b.bizNo}{" "}
          <a
            href={b.bizCheckUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline underline-offset-2 hover:text-zinc-900"
          >
            사업자정보 확인
          </a>
        </span>
        {sep}
        <span>통신판매업신고: {b.mailOrderNo}</span>
      </p>
      <p className="flex flex-col gap-0.5 lg:flex-row lg:flex-wrap lg:gap-x-2">
        <span>주소: {b.address}</span>
        {sep}
        <span>호스팅서비스 제공자: {b.hosting}</span>
      </p>
      <p className="flex flex-col gap-0.5 lg:flex-row lg:flex-wrap lg:gap-x-2">
        <span>
          이메일:{" "}
          <a href={`mailto:${b.email}`} className="underline underline-offset-2 hover:text-zinc-900">
            {b.email}
          </a>
        </span>
        {sep}
        <span>
          전화:{" "}
          <a href={`tel:${b.phone}`} className="underline underline-offset-2 hover:text-zinc-900">
            {b.phone}
          </a>
        </span>
      </p>
    </address>
  );
}
