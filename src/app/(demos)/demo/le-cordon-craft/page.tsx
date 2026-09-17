import { Metadata } from 'next';
import LeCordonCraftPageClient from './LeCordonCraftPageClient';

export const metadata: Metadata = {
  title: '르 꼬르동 크래프트 아카데미 | 파티시에 & 플라워 하이엔드 아틀리에 (예시)',
  description: '프렌치 하이엔드 파티시에 정밀 템퍼링 랩 및 오뜨 꾸뛰르 플로럴 컬러 팔레트 아카데미 샘플 사이트입니다.',
};

export default function LeCordonCraftPage() {
  return <LeCordonCraftPageClient />;
}
