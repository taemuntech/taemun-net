// 배포 환경 판정 — 관리자 화면·API·아침 문자를 **프리뷰 배포에서 막는** 한 곳.
//
// 왜: 프리뷰 배포(브랜치마다 생기는 *.vercel.app 주소)는 운영과 같은 코드를 돌리지만 주소가 공개돼 있고,
// 환경변수가 섞여 들어가면 운영 데이터베이스를 그 주소에서 만질 수 있게 된다. 형이 비밀값을 Production 전용으로
// 격리해 두었어도, 화면 자체를 막아 두면 「실수로 Preview 에도 체크한」 하루가 사고가 되지 않는다.
//
// ⚠️ 판정은 **정확히 "preview" 또는 "development" 일 때만** 참이다. VERCEL_ENV 가 없으면(로컬 개발,
// 또는 시스템 환경변수를 안 내보내는 운영) 거짓 — 운영을 실수로 막는 쪽으로 기울지 않게 한다.
// 운영이 막히면 항의 전화 중에 「전부 내리기」를 못 누른다. 그게 이 파일이 피해야 하는 최악이다.

/** 프리뷰·개발 배포인가 (Vercel 시스템 환경변수 VERCEL_ENV 기준) */
export function isNonProductionDeployment(): boolean {
  const env = process.env.VERCEL_ENV;
  return env === "preview" || env === "development";
}
