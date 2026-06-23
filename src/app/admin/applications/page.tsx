import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getApplications } from "@/lib/applications";

export const dynamic = "force-dynamic";
export const metadata = { title: "지원자 관리" };

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

export default async function AdminApplicationsPage() {
  const applications = await getApplications();

  return (
    <div className="min-h-dvh bg-neutral-50">
      <AdminHeader />
      <main className="mx-auto w-full max-w-5xl px-5 py-10">
        <h1 className="text-2xl font-extrabold text-neutral-900">
          지원자 <span className="text-neutral-400">({applications.length})</span>
        </h1>

        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {applications.length === 0 ? (
            <p className="p-8 text-center text-neutral-500">
              아직 지원자가 없습니다.
            </p>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {applications.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/admin/applications/${a.id}`}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">
                          {a.name}
                        </span>
                        <StatusBadge status={a.status} />
                      </div>
                      <p className="mt-0.5 truncate text-sm text-neutral-500">
                        {a.openingTitle} · {a.email} · {a.phone}
                      </p>
                    </div>
                    <span className="hidden shrink-0 text-sm text-neutral-400 sm:block">
                      {fmtDate(a.createdAt)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
