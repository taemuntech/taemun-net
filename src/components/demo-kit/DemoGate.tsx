import Link from "next/link";
import { ArrowRight, EyeOff, Mail, Phone } from "lucide-react";

// 내려간 시안 자리에 뜨는 안내 화면.
//
// **회사 이름·시안 내용·slug 를 한 글자도 넣지 않는다.** 항의를 받고 내린 주소라, 내린 자리에 그 회사 이름이
// 남아 있으면 내린 의미가 없다. 주소를 아는 사람이 새로고침해도 「무엇이 있었는지」 알 수 없어야 한다.
// 같은 이유로 판정 사유(어떤 종류·어떤 상태라서 막혔는지)도 화면에 내보내지 않는다 — 서버 로그에만 남긴다.
//
// /gone 페이지가 이것만 렌더한다. 비공개 판정이 난 데모 주소는 (demos) 레이아웃이 /gone 으로 보내므로
// 데모 코드는 브라우저로 아예 나가지 않는다(본문도, page 의 metadata 도).
//
// 응답 코드에 대하여 — 410(Gone)은 못 쓴다. 세 갈래를 다 재 봤다:
// 1) Next 16 App Router 의 page·layout 은 응답 코드를 정하는 API 가 없다(notFound() 의 404, forbidden()/
//    unauthorized() 의 403·401 뿐. gone() 같은 것은 없다).
// 2) proxy 의 NextResponse.rewrite(url, { status: 410 }) 은 status 가 버려진다 — rewrite 는 x-middleware-rewrite
//    헤더만 남기고 최종 status 는 다시 렌더한 결과를 따른다(next/dist/server/web/adapter.js 실측).
// 3) proxy 가 직접 410 본문을 내려면 요청마다 상태 데이터베이스를 읽어야 하는데, 그러면 DB 장애가 데모 전체를
//    멈춘다(1번 원칙 「DB 가 죽어도 사이트는 산다」 위반).
// 그래서 데모 주소는 307(임시 이동) → /gone 200 이다. 데모는 레이아웃 metadata 와 proxy 의 X-Robots-Tag 로
// 이미 noindex 라, 검색 색인을 지우려고 410 을 써야 할 일도 없다. notFound()(404)를 쓰지 않은 이유는
// 그러면 이 안내와 연락처 대신 사이트 공통 404 화면이 뜨기 때문이다.

const PHONE = "010-8672-6463";
const EMAIL = "contact@taemun.co.kr";

export default function DemoGate() {
  return (
    <main className="min-h-screen bg-[#030712] text-gray-100 flex items-center justify-center px-5 py-16 [word-break:keep-all]">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10 text-center backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
          <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
          요청하신 시안은 공개가 종료되었습니다
        </h1>
        <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-gray-400">
          이 주소는 더 이상 열리지 않습니다. 다른 작업물은 포트폴리오에서 보실 수 있고,
          새로 만들고 싶은 화면이 있으시면 아래로 문의해 주세요.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/portfolio"
            className="min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
          >
            <span>포트폴리오 보기</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/inquiry"
            className="min-h-11 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10"
          >
            제작 문의
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-2.5 text-sm">
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Phone className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <span className="font-mono">{PHONE}</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Mail className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            <span>{EMAIL}</span>
          </a>
          <p className="mt-2 text-xs text-gray-500">태문 DEV STUDIO</p>
        </div>
      </div>
    </main>
  );
}
