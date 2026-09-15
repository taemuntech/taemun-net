"use client";

// 데모 데이터 컨텍스트 — 시드 데이터 + 사용자가 롤 일지 화면에서 추가한 롤.
// 서버·DB 없음. 새로고침하면 시드로 돌아간다(의도된 동작 — 데모).

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { createDemoDataset, rollFromInput } from "@/lib/demo/lithium-foil/seed";
import type { Dataset, Roll, RollLogInput } from "@/lib/demo/lithium-foil/types";

export type DemoDataContextValue = {
  dataset: Dataset;
  /** 롤 일지 입력 → 모 롤 추가. 추가된 롤을 돌려준다 */
  addRoll: (input: RollLogInput) => Roll;
  /** 사용자가 추가한 롤만 지우고 시드로 되돌린다 */
  reset: () => void;
  userRolls: Roll[];
};

const DemoDataContext = createContext<DemoDataContextValue | null>(null);

export function DemoDataProvider({ children }: { children: ReactNode }) {
  const seed = useMemo(() => createDemoDataset(), []);
  const [userRolls, setUserRolls] = useState<Roll[]>([]);

  const dataset = useMemo<Dataset>(
    () => (userRolls.length ? { ...seed, rolls: [...seed.rolls, ...userRolls] } : seed),
    [seed, userRolls],
  );

  const addRoll = useCallback(
    (input: RollLogInput) => {
      const roll = rollFromInput(dataset, input);
      setUserRolls((prev) => [...prev, roll]);
      return roll;
    },
    [dataset],
  );

  const reset = useCallback(() => setUserRolls([]), []);

  const value = useMemo<DemoDataContextValue>(
    () => ({ dataset, addRoll, reset, userRolls }),
    [dataset, addRoll, reset, userRolls],
  );

  return <DemoDataContext.Provider value={value}>{children}</DemoDataContext.Provider>;
}

export function useDemoData(): DemoDataContextValue {
  const ctx = useContext(DemoDataContext);
  if (!ctx) throw new Error("useDemoData 는 DemoDataProvider 안에서만 쓸 수 있습니다.");
  return ctx;
}
