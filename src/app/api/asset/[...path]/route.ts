// 상태를 보고 내주는 정적 파일 — 썸네일(시안 전체 화면 스크린샷)과 업체 원본 이미지(로고·사진).
// GET /api/asset/portfolio/<slug>/<파일> · GET /api/asset/company/<업체폴더>/<파일>
//
// 방문자는 이 주소를 직접 칠 필요가 없다 — proxy 가 옛 주소(/portfolio/<slug>/…, /hysfa/…)를 여기로
// rewrite 한다(src/proxy.ts). 카드 JSON·갤러리 데이터의 주소는 한 줄도 안 바뀐다.
//
// 판정 규칙은 데모 주소와 같다: 그 작업물이 열리면(isReachable) 자산도 내주고, 내려가 있으면 404 다.
// 「없는 것처럼」 404 를 낸다 — 403 은 「여기 뭔가 있다」를 알려 준다.
//
// 상태 읽기는 목록과 같은 getState()(최대 20초 캐시)를 쓴다. 데모 주소 판정(gate.ts)만 매번 지금 값을
// 읽는 이유는 그게 「내려간 것이 되살아나면 안 된다」의 핵심 표면이기 때문이고, 썸네일은 목록과 같은 창에서
// 같이 사라지면 된다. 이미지 1장마다 데이터베이스를 새로 읽으면 목록 한 장에 읽기가 8번 난다.

import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/admin/guard";
import { getPortfolioBySlug } from "@/lib/portfolio/registry";
import { assetTargetFromRoutePath } from "@/lib/portfolio/protected-assets";
import { getState, isReachable, resolveStatus } from "@/lib/portfolio/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** public/ 밖 — Next 가 정적으로 서빙하지 않는 자리 */
const PRIVATE_DIR = path.join(process.cwd(), "private-assets");
/** 옮기지 않은 파일(공개 샘플 썸네일)은 여기서 읽는다 */
const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * 가상 브랜드 샘플(kind=sample) 자산만 방문자 브라우저에 잠깐 둔다(초).
 * 홈 카드에 마우스를 올려 받은 미리보기 영상을 모달에서 또 받지 않게 하려는 것이다.
 * `private` 라 CDN 에는 여전히 안 굳는다 — 내리면 새 방문자에겐 바로 404 이고, 이미 받아 둔 사람 화면에만
 * 이 시간만큼 남는다. 실존 업체 시안(proposal)은 급히 내려야 할 수 있어 지금처럼 전혀 안 굳힌다.
 */
const SAMPLE_BROWSER_CACHE_SECONDS = 600;

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

const NOT_FOUND = () => new NextResponse(null, { status: 404 });

async function readIfExists(abs: string, root: string): Promise<Buffer | null> {
  // 경로 올라가기 이중 차단(주소 해석에서 이미 막지만, 파일을 여는 자리에서 한 번 더 본다)
  if (!abs.startsWith(root + path.sep)) return null;
  try {
    return await fs.readFile(abs);
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params;
  const target = assetTargetFromRoutePath(segments ?? []);
  if (!target) return NOT_FOUND();

  const card = getPortfolioBySlug(target.owner);
  // 카드가 없는 자산은 종류를 모른다 → 가장 엄한 종류(proposal)로 다룬다(gate.ts 와 같은 규칙).
  const kind = card?.kind ?? "proposal";

  // 관리자는 내려간 것도 본다 — 관리자 화면의 썸네일이 「무엇을 내렸는지」 보여 줘야 하기 때문.
  // 서명만 보지 않고 관리자 화면과 같은 판정(해제한 기기·모두 로그아웃 시각)을 거친다 — lib/admin/guard.ts.
  const isAdmin = await isAdminRequest(req);
  if (!isAdmin) {
    const status = resolveStatus(await getState(), target.owner, kind);
    if (!isReachable(status)) return NOT_FOUND();
  }

  const relNative = target.relPath.split("/").join(path.sep);
  let body = await readIfExists(path.join(PRIVATE_DIR, relNative), PRIVATE_DIR);
  if (!body) {
    // 아직 public/ 에 남아 있는 파일(공개 샘플 썸네일). 여기까지 온 요청은 위에서 이미 상태를 봤다.
    const publicNative = target.publicPath.split("/").filter(Boolean).join(path.sep);
    body = await readIfExists(path.join(PUBLIC_DIR, publicNative), PUBLIC_DIR);
  }
  if (!body) return NOT_FOUND();

  const type = CONTENT_TYPES[path.extname(target.relPath).toLowerCase()] ?? "application/octet-stream";
  // 관리자 요청은 내려간 것도 받으므로 샘플이라도 굳히지 않는다.
  const browserCacheable = kind === "sample" && !isAdmin;
  const baseHeaders = {
    "Content-Type": type,
    // 내리면 바로 안 보여야 한다 — CDN 에는 절대 굳히지 않는다(이미 열린 URL 이 남는 것을 막을 수는 없다).
    // 샘플만 방문자 브라우저에 잠깐 둔다(SAMPLE_BROWSER_CACHE_SECONDS 설명 참고).
    "Cache-Control": browserCacheable ? `private, max-age=${SAMPLE_BROWSER_CACHE_SECONDS}` : "private, no-store",
    "X-Robots-Tag": "noindex, nofollow",
    // 동영상은 구간 요청으로 받는다 — 받아 줄 수 있다고 먼저 알린다.
    "Accept-Ranges": "bytes",
  };

  // ── 구간 요청(Range) ──
  // 데모 영상(.mp4)도 이 라우트를 탄다. Safari·iOS 는 구간 요청에 206 으로 답하지 않는 주소에서
  // 영상을 아예 재생하지 않는다 — 200 만 내주면 「내리기」를 고치다가 화면이 깨진다.
  const range = req.headers.get("range");
  const m = range ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null;
  if (m && (m[1] !== "" || m[2] !== "")) {
    const size = body.byteLength;
    let start: number;
    let end: number;
    if (m[1] === "") {
      // bytes=-N — 뒤에서 N 바이트
      const suffix = Number(m[2]);
      start = Math.max(0, size - suffix);
      end = size - 1;
    } else {
      start = Number(m[1]);
      end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= size) {
      return new NextResponse(null, { status: 416, headers: { ...baseHeaders, "Content-Range": `bytes */${size}` } });
    }
    const chunk = body.subarray(start, end + 1);
    return new NextResponse(new Uint8Array(chunk), {
      status: 206,
      headers: {
        ...baseHeaders,
        "Content-Length": String(chunk.byteLength),
        "Content-Range": `bytes ${start}-${end}/${size}`,
      },
    });
  }

  return new NextResponse(new Uint8Array(body), {
    status: 200,
    headers: { ...baseHeaders, "Content-Length": String(body.byteLength) },
  });
}
