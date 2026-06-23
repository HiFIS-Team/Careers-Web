import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

export async function AdminHeader() {
  const session = await auth();
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-5">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <Link href="/admin" className="flex shrink-0 items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="피트니스스타"
              width={830}
              height={427}
              priority
              className="h-8 w-auto object-contain"
            />
            <span className="hidden text-sm font-semibold text-neutral-400 sm:inline">
              관리자
            </span>
          </Link>
          <nav className="flex shrink-0 items-center gap-4 text-sm font-medium">
            <Link
              href="/admin"
              className="whitespace-nowrap text-neutral-600 hover:text-neutral-900"
            >
              공고
            </Link>
            <Link
              href="/admin/applications"
              className="whitespace-nowrap text-neutral-600 hover:text-neutral-900"
            >
              지원자
            </Link>
          </nav>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-sm sm:gap-4">
          <Link
            href="/"
            className="hidden whitespace-nowrap text-neutral-500 hover:text-neutral-900 sm:inline"
          >
            사이트 보기
          </Link>
          {session?.user?.email && (
            <span className="hidden text-neutral-400 lg:inline">
              {session.user.email}
            </span>
          )}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="whitespace-nowrap rounded-full border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 hover:bg-neutral-50">
              로그아웃
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
