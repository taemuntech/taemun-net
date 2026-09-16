import React from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  if (!isOpen) return null;

  const categories = [
    {
      id: 'meat',
      name: '신선 정육 & 계란',
      icon: 'restaurant',
      sub: ['1++ No.9 한우', '제주 흑돼지', '동물복지 유정란', '샤퀴테리 & 생소시지']
    },
    {
      id: 'seafood',
      name: '산지 수산 직송',
      icon: 'set_meal',
      sub: ['오슬로 생연어', '완도 활전복', '남해 자연산 돌문어', '통영 굴']
    },
    {
      id: 'vegetable',
      name: '친환경 유기농 채소 & 과일',
      icon: 'eco',
      sub: ['제주 송당 햇당근', '담양 딸기', '스마트팜 생바질', '유기농 샐러드']
    },
    {
      id: 'bakery',
      name: '아티장 베이커리 & 치즈',
      icon: 'bakery_dining',
      sub: ['성수 천연발효 사워도우', '이즈니 AOP 버터', '파르미지아노 24M', '수제 잼']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
              <h3 className="text-lg font-bold text-primary">전체 카테고리</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className="p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container hover:border-secondary/50 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:text-secondary">
                  <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.sub.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60 text-on-surface-variant"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                onSelectCategory('all');
                onClose();
              }}
              className="text-xs text-secondary font-bold hover:underline"
            >
              전체 상품 보기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
