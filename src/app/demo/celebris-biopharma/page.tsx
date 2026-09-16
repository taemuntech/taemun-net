import type { Metadata } from 'next';
import CelebrisBiopharmaPageClient from './CelebrisBiopharmaPageClient';

export const metadata: Metadata = {
  title: 'CELEBRIS BIOPHARMA — 표적단백질분해(TPD) & ADC 혁신신약 바이오텍 | 태문 DEV STUDIO',
  description:
    '자체 AI 신약 발굴 플랫폼 PROTEA-AI 기반 표적 단백질 분해제 및 차세대 다중특이성 ADC 파이프라인. 코스닥 기술특례상장 준비 바이오텍 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'CELEBRIS BIOPHARMA — 표적단백질분해 & ADC 혁신신약 바이오텍',
    description: '태문 DEV STUDIO 바이오/제약 딥사이언스 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function CelebrisBiopharmaPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <CelebrisBiopharmaPageClient isEmbed={isEmbed} />;
}
