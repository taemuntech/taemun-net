import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { FLEET_DATA } from '../data/mockData';

interface PocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PocModal: React.FC<PocModalProps> = ({ isOpen, onClose }) => {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    department: '',
    name: '',
    phone: '',
    email: '',
    selectedFleet: 'HEXA-INSPECT 600',
    infrastructureType: '교량 및 토목 구조물',
    targetDate: '',
    remarks: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl p-6 lg:p-8 flex flex-col gap-6 shadow-2xl border border-outline-variant max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <div className="flex flex-col gap-1">
            <span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-telemetry-code text-xs font-bold w-fit">
              KR-DEF // FIELD DEMO REQUEST
            </span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
              현장 실증(PoC) 비행 및 기술 시연 신청
            </h2>
            <p className="text-on-surface-variant text-xs font-body-sm">
              에어로스펙트 전문 비행팀이 귀사 현장 환경을 사전 답사하고 최적 기종 및 센서 구성을 무료 제안합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  기관 / 고객사명 *
                </label>
                <input
                  required
                  placeholder="예: 가스에너지공사 안전점검팀"
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  부서 및 직함
                </label>
                <input
                  placeholder="인프라진단과 책임연구원"
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  담당자 성함 *
                </label>
                <input
                  required
                  placeholder="홍길동"
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  연락처 (휴대전화) *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="010-0000-0000"
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  공식 업무 이메일 *
                </label>
                <input
                  required
                  type="email"
                  placeholder="contact@example.com"
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  희망 검증 기종
                </label>
                <select
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.selectedFleet}
                  onChange={(e) => setFormData({ ...formData, selectedFleet: e.target.value })}
                >
                  {FLEET_DATA.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.category})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                  검측 대상 인프라
                </label>
                <select
                  className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                  value={formData.infrastructureType}
                  onChange={(e) => setFormData({ ...formData, infrastructureType: e.target.value })}
                >
                  <option value="교량 및 토목 구조물">교량 및 토목 구조물 (콘크리트 미세 균열)</option>
                  <option value="초고압 송전선 및 전력 설비">초고압 송전선 및 전력 설비 (발열 핫스팟)</option>
                  <option value="태양광 및 해상 풍력">태양광 및 해상 풍력 블레이드 (내부 층간 박리)</option>
                  <option value="항만 및 보안 시설">항만 및 보안 시설 (24시간 무인 순찰 도크)</option>
                  <option value="산림 방재 및 급경사지">산림 방재 및 급경사지 (지형 변위 측량)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-telemetry-code text-on-surface-variant mb-1">
                특이사항 및 요구 정밀도 (선택)
              </label>
              <textarea
                rows={2}
                placeholder="예: GPS 음영 터널 갱구부 자율비행 여부 및 0.1mm 크랙 식별 테스트 희망"
                className="w-full px-3 py-2 rounded bg-surface-container-low border border-outline-variant focus:outline-none focus:border-secondary text-on-surface text-xs"
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30">
              <p className="text-center text-xs text-on-surface-variant">
                샘플 사이트입니다 · 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-telemetry-code text-on-surface-variant">
                  🔒 철저한 보안 서약 및 산업보안 규정 준수
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-on-primary rounded font-telemetry-label text-xs uppercase tracking-wider hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer"
                >
                  PoC 실증 신청서 제출
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => {
          setIsNoticeOpen(false);
          onClose();
        }}
        slug="aerospect-dynamics"
        industry="corporate"
        featureName="현장 실증(PoC) 비행 신청 모달"
      />
    </>
  );
};
