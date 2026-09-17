import { Metadata } from 'next';
import AetherMedicalPageClient from './AetherMedicalPageClient';

export const metadata: Metadata = {
  title: '에테르 메디컬 | 청담 VIP 프라이빗 메디컬 인테리어 디자인',
  description: '6성급 호텔 라운지 감성의 청담·압구정 VIP 피부과 & 안티에이징 센터 인테리어 웹사이트 샘플입니다.',
};

export default function AetherMedicalPage() {
  return <AetherMedicalPageClient />;
}
