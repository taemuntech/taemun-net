import type { Metadata } from "next";
import HomeView from "./HomeView";

// 홈 — 화면은 HomeView(아라 화이트 갤러리, 클라이언트 컴포넌트) 그대로.
// 이 서버 래퍼는 canonical 만 선언한다: 레이아웃에 두면 모든 하위 페이지가 홈을 정본 주소로 물려받는다.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeView />;
}
