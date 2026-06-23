import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { ApplicationFile } from "@/lib/applications";

export const runtime = "nodejs";

function isAdmin(email?: string | null) {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return !!email && admins.includes(email.toLowerCase());
}

/** 관리자 전용: 지원서 첨부파일 다운로드 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string; index: string }> }
) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id, index } = await params;
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app) return new NextResponse("Not found", { status: 404 });

  const files = (app.files as unknown as ApplicationFile[]) ?? [];
  const file = files[Number(index)];
  if (!file) return new NextResponse("Not found", { status: 404 });

  try {
    const buf = await readFile(file.path);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename*=UTF-8''${encodeURIComponent(
          file.name
        )}`,
      },
    });
  } catch {
    return new NextResponse("File not found on disk", { status: 404 });
  }
}
