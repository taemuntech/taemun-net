"use client";

// 비밀번호 한 칸. 실패 메시지는 서버가 준 문구를 그대로 보여 준다(429 의 남은 시간 안내 포함).

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";

export default function LoginView() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      let message: string | null = null;
      try {
        const json: unknown = await res.json();
        if (typeof json === "object" && json !== null) {
          const err = (json as Record<string, unknown>).error;
          if (typeof err === "string") message = err;
        }
      } catch {
        message = null;
      }
      if (!res.ok) {
        setError(message ?? `로그인에 실패했습니다 (${res.status})`);
        setBusy(false);
        return;
      }
      setPasscode("");
      router.replace("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "네트워크 오류로 로그인하지 못했습니다");
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-gray-100 px-4 py-16 flex items-start justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <Lock className="h-5 w-5 text-indigo-300" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-white">태문 DEV STUDIO 관리자</h1>
          <p className="mt-1.5 text-sm text-gray-400">작업물 공개 상태를 바꾸는 화면입니다.</p>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <label htmlFor="admin-passcode" className="block text-sm font-medium text-gray-200">
            비밀번호
          </label>
          <input
            id="admin-passcode"
            name="passcode"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="mt-2 block w-full min-h-11 rounded-xl border border-white/10 bg-black/40 px-3.5 text-base text-white placeholder:text-gray-600 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
            placeholder="관리자 비밀번호"
            aria-describedby={error ? "admin-login-error" : "admin-login-hint"}
            aria-invalid={error ? true : undefined}
          />

          {error ? (
            <p
              id="admin-login-error"
              role="alert"
              className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
            >
              {error}
            </p>
          ) : (
            <p id="admin-login-hint" className="mt-3 text-xs leading-relaxed text-gray-500">
              5분에 5번까지만 시도할 수 있습니다. 넘기면 잠시 기다렸다가 다시 시도해 주세요.
            </p>
          )}

          <button
            type="submit"
            disabled={busy || passcode.length === 0}
            className="mt-4 inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {busy ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </main>
  );
}
