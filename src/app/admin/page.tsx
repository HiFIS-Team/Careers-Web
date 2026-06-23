import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllOpenings } from "@/lib/openings";
import { deleteOpening, togglePublish } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "공고 관리" };

export default async function AdminOpeningsPage() {
  const openings = await getAllOpenings();

  return (
    <div className="min-h-dvh bg-neutral-50">
      <AdminHeader />
      <main className="mx-auto w-full max-w-5xl px-5 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-neutral-900">
            채용 공고 <span className="text-neutral-400">({openings.length})</span>
          </h1>
          <Link
            href="/admin/openings/new"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-neutral-950 transition-transform hover:scale-105"
          >
            + 새 공고
          </Link>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {openings.length === 0 ? (
            <p className="p-8 text-center text-neutral-500">등록된 공고가 없습니다.</p>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {openings.map((o) => (
                <li
                  key={o.id}
                  className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {o.hot && <span className="text-xs">🔥</span>}
                      <span className="truncate font-semibold text-neutral-900">
                        {o.title}
                      </span>
                      {!o.published && (
                        <span className="shrink-0 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600">
                          비공개
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-neutral-500">
                      {o.job} · {o.location} · {o.employment} · {o.career}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {/* 공개 토글 */}
                    <form
                      action={async () => {
                        "use server";
                        await togglePublish(o.id, !o.published);
                      }}
                    >
                      <button className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-50">
                        {o.published ? "비공개로" : "공개로"}
                      </button>
                    </form>

                    <Link
                      href={`/admin/openings/${o.id}/edit`}
                      className="rounded-md border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-50"
                    >
                      수정
                    </Link>

                    {/* 삭제 */}
                    <form
                      action={async () => {
                        "use server";
                        await deleteOpening(o.id);
                      }}
                    >
                      <button className="rounded-md border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50">
                        삭제
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
