import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { StatusButtons } from "@/components/admin/StatusButtons";
import { getApplication, type ApplicationFile } from "@/lib/applications";
import { deleteApplication } from "../../actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "지원 상세" };

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-3">
      <dt className="w-24 shrink-0 text-sm text-neutral-500">{label}</dt>
      <dd className="text-sm font-medium text-neutral-900">{value}</dd>
    </div>
  );
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getApplication(id);
  if (!app) notFound();

  const files = (app.files as unknown as ApplicationFile[]) ?? [];

  return (
    <div className="min-h-dvh bg-neutral-50">
      <AdminHeader />
      <main className="mx-auto w-full max-w-3xl px-5 py-10">
        <Link
          href="/admin/applications"
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          ← 지원자 목록
        </Link>

        <div className="mt-4 flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-neutral-900">{app.name}</h1>
          <StatusBadge status={app.status} />
        </div>
        <p className="mt-1 text-neutral-500">{app.openingTitle}</p>

        {/* 상태 변경 */}
        <div className="mt-6">
          <StatusButtons appId={app.id} current={app.status} />
        </div>

        {/* 지원자 정보 */}
        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-bold text-neutral-900">지원자 정보</h2>
          <dl className="mt-3 divide-y divide-neutral-100">
            <Row label="이메일" value={<a href={`mailto:${app.email}`} className="text-brand hover:underline">{app.email}</a>} />
            <Row label="연락처" value={<a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>} />
            <Row label="지원 포지션" value={app.openingTitle} />
            <Row
              label="접수 일시"
              value={new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short" }).format(app.createdAt)}
            />
            <Row label="동의 항목" value={app.agreedTerms.join(", ") || "-"} />
          </dl>
        </div>

        {/* 제출 서류 */}
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-base font-bold text-neutral-900">제출 서류</h2>
          {files.length === 0 ? (
            <p className="mt-3 text-sm text-neutral-500">첨부 파일 없음</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {files.map((f, i) => (
                <li key={i}>
                  <a
                    href={`/api/admin/applications/${app.id}/files/${i}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 text-sm hover:border-brand hover:bg-brand/5"
                  >
                    <span className="text-lg">📄</span>
                    <span className="flex-1">
                      <span className="font-semibold text-neutral-900">{f.label}</span>
                      <span className="ml-2 text-neutral-500">{f.name}</span>
                    </span>
                    <span className="text-xs text-neutral-400">
                      {(f.size / 1024).toFixed(0)} KB · 다운로드
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 삭제 */}
        <form
          action={async () => {
            "use server";
            await deleteApplication(app.id);
            const { redirect } = await import("next/navigation");
            redirect("/admin/applications");
          }}
          className="mt-8"
        >
          <button className="text-sm text-red-500 hover:underline">
            이 지원 삭제
          </button>
        </form>
      </main>
    </div>
  );
}
