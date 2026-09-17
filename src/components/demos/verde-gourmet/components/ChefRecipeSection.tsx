import React, { useState } from 'react';
import { RECIPE_INGREDIENTS } from '../data/mockData';
import { RecipeIngredient } from '../types';

interface ChefRecipeSectionProps {
  onAddRecipeBundle: (selectedItems: RecipeIngredient[], bundlePrice: number) => void;
}

export const ChefRecipeSection: React.FC<ChefRecipeSectionProps> = ({
  onAddRecipeBundle
}) => {
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(RECIPE_INGREDIENTS);

  const toggleIngredient = (id: string) => {
    setIngredients(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const selectedCount = ingredients.filter(i => i.checked).length;
  const originalTotal = ingredients
    .filter(i => i.checked)
    .reduce((sum, item) => sum + item.price, 0);

  // 10% bundle discount if at least 2 items selected
  const hasBundleDiscount = selectedCount >= 2;
  const bundleDiscount = hasBundleDiscount ? Math.round(originalTotal * 0.1) : 0;
  const finalPrice = originalTotal - bundleDiscount;

  // alert() 는 이 저장소에서 쓰지 않는다 — 0종이면 버튼을 잠그고 그 자리에 이유를 적는다
  const handleAddBundle = () => {
    const selected = ingredients.filter(i => i.checked);
    if (selected.length === 0) return;
    onAddRecipeBundle(selected, finalPrice);
  };

  return (
    <section
      id="recipe-section"
      className="bg-surface-container-low rounded-2xl p-6 lg:p-8 border border-outline-variant scroll-mt-[calc(var(--sample-bar-h,0px)_+_140px)]"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-secondary text-xs font-mono font-bold flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-base">dinner_dining</span>
            SIGNATURE CHEF&apos;S RECIPE ARCHIVE
          </span>
          <h2 className="text-xl lg:text-3xl font-bold text-primary">
            시그니처 셰프의 지중해식 로스트 한우 채끝 &amp; 구운 토마토 타르타르
          </h2>
          <p className="text-[13px] text-on-surface-variant mt-1">
            파인다이닝의 정수를 집에서. 베르데 고메의 프리미엄 식재료를 엄선하여 최적의 비율로 구성했습니다.
          </p>
        </div>

        <div className="bg-surface-container-lowest px-4 py-2 rounded-xl border border-outline-variant flex items-center gap-3 shrink-0">
          <span className="material-symbols-outlined text-secondary text-2xl">timer</span>
          <div className="text-left">
            <div className="text-[11px] font-mono text-outline">조리 소요시간</div>
            <div className="text-xs font-mono font-bold text-primary">25분 · 난이도 中</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recipe Showcase Image */}
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden shadow-sm aspect-[4/3] bg-surface-container">
          <img
            src="/demo-media/verde-gourmet/verde-gourmet-02.jpg"
            alt="시그니처 셰프의 지중해식 로스트 한우 채끝 & 구운 토마토 타르타르"
            className="w-full h-full object-cover"
          referrerPolicy="no-referrer" />
          <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/90 backdrop-blur p-3 rounded-lg border border-outline-variant flex flex-col lg:flex-row lg:items-center justify-between gap-0.5 lg:gap-2">
            <span className="text-xs font-bold text-primary">셰프 ○○○ (예시) 감수 꿀팁</span>
            <span className="text-[12px] text-secondary font-medium">고기는 굽기 30분 전 상온 보관 권장</span>
          </div>
        </div>

        {/* Recipe Ingredient Bundle Selector */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <span className="text-base font-bold text-primary">
              레시피 필수 재료 ({selectedCount}종 선택됨)
            </span>
            <span className="text-xs font-mono text-secondary font-semibold">
              번들 구매 시 10% 자동 할인
            </span>
          </div>

          {/* Ingredients Check List */}
          <div className="space-y-3">
            {ingredients.map((ing) => (
              <label
                key={ing.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${ ing.checked ? 'border-secondary/50 bg-surface-container-low/80' : 'border-outline-variant bg-surface-container-lowest opacity-75' }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={ing.checked}
                    onChange={() => toggleIngredient(ing.id)}
                    className="rounded border-outline text-secondary focus:ring-secondary w-5 h-5 shrink-0 cursor-pointer accent-secondary"
                  />
                  <div className="min-w-0">
                    <span className="text-xs lg:text-sm font-bold text-primary block">
                      {ing.name}
                    </span>
                    <span className="text-[12px] text-on-surface-variant block">
                      {ing.subtext}
                    </span>
                  </div>
                </div>
                <span className="text-xs lg:text-sm font-bold text-primary whitespace-nowrap ml-2">
                  ₩{ing.price.toLocaleString('ko-KR')}
                </span>
              </label>
            ))}
          </div>

          {/* Total Price & One-Click Add Button */}
          <div className="pt-4 border-t border-outline-variant flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <div className="text-[12px] text-outline">
                {selectedCount === 0 ? (
                  <>담을 재료를 한 가지 이상 선택해 주세요.</>
                ) : hasBundleDiscount ? (
                  <>정상가 ₩{originalTotal.toLocaleString('ko-KR')} ➔ 10% 레시피 번들 할인 적용</>
                ) : (
                  <>2종 이상 선택 시 10% 번들 할인이 적용됩니다.</>
                )}
              </div>
              <div className="text-lg lg:text-xl font-bold text-primary">
                세트 구매가 <span className="text-secondary">₩{finalPrice.toLocaleString('ko-KR')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBundle}
              disabled={selectedCount === 0}
              className="w-full lg:w-auto min-h-11 bg-primary text-on-primary hover:bg-secondary px-6 py-3.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:bg-surface-container-highest disabled:text-outline disabled:shadow-none"
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              {selectedCount === 0 ? '재료를 선택해 주세요' : `레시피 재료 ${selectedCount}종 한 번에 담기`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
