import { Metadata } from 'next';
import RaonKidsPageClient from './RaonKidsPageClient';

export const metadata: Metadata = {
  title: '라온 키즈 아틀리에 | 프리미엄 키즈 에듀 & 복합문화공간 인테리어 디자인',
  description: '자연 채광과 부드러운 곡면, 무독성 친환경 감성의 서초·판교 프리미엄 키즈 아틀리에 인테리어 웹사이트 샘플입니다.',
};

export default function RaonKidsPage() {
  return <RaonKidsPageClient />;
}
