"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setApplicationStatus } from "@/app/admin/actions";

const STATUSES = ["서류합격", "최종합격", "불합격"];

/** 지원자 전형 상태 변경 버튼. 확인창 + 현재 상태 비활성(재발송 방지). */
export function StatusButtons({
  appId,
  current,
}: {
  appId: string;
  current: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function change(status: string) {
    if (status === current || pending) return;
    const ok = window.confirm(
      `'${status}'(으)로 변경하고 지원자에게 알림톡을 보냅니다.\n진행할까요?`
    );
    if (!ok) return;
    startTransition(async () => {
      await setApplicationStatus(appId, status);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-neutral-500">상태 변경:</span>
      {STATUSES.map((s) => {
        const active = current === s;
        return (
          <button
            key={s}
            type="button"
            disabled={active || pending}
            onClick={() => change(s)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? "cursor-default border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
            }`}
          >
            {s}
          </button>
        );
      })}
      {pending && <span className="text-sm text-neutral-400">변경 중…</span>}
    </div>
  );
}
