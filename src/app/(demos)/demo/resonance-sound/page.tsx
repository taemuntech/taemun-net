import { Metadata } from 'next';
import ResonanceSoundPageClient from './ResonanceSoundPageClient';

export const metadata: Metadata = {
  title: '공명 | 성수 하이파이 오디오 청음실 & 바이닐 스튜디오 인테리어 디자인',
  description: '빛이 쏟아지는 지상 라운지, 화이트 오크와 패브릭 어쿠스틱 청음 공간 인테리어 웹사이트 샘플입니다.',
};

export default function ResonanceSoundPage() {
  return <ResonanceSoundPageClient />;
}
