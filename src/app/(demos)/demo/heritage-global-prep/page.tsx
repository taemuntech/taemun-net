import { Metadata } from 'next';
import HeritageGlobalPrepPageClient from './HeritageGlobalPrepPageClient';

export const metadata: Metadata = {
  title: '헤리티지 글로벌 프렙 | 아이비리그 입시 가제트 & Digital SAT 1600 (예시)',
  description: '아이비리그 공인 입시 전략 브로드시트 가제트, Digital SAT 1600 적응형 텔레메트리 및 수석 사정관 에세이 핀셋 해체 아카이브 샘플 사이트입니다.',
};

export default function HeritageGlobalPrepPage() {
  return <HeritageGlobalPrepPageClient />;
}
