import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import {
  notifyNewApplication,
  notifyApplicationReceived,
  resolveBranch,
} from "@/lib/notify";

/** 파일 처리를 위해 Node 런타임에서 실행 */
export const runtime = "nodejs";

const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * 지원서 접수 API.
 * 프론트의 ApplyForm에서 multipart/form-data 로 POST 합니다.
 * 파일을 디스크에 저장하고, 지원 기록을 DB(Application)에 남깁니다.
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const openingId = String(form.get("openingId") ?? "");
    const openingTitle = String(form.get("openingTitle") ?? "");
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const agreedTerms = String(form.get("agreedTerms") ?? "")
      .split(",")
      .filter(Boolean);

    // 서버측 기본 검증
    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "필수 항목이 누락되었습니다." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    // 첨부 파일 + 문서명 매칭
    const fileEntries = form
      .getAll("documents")
      .filter((f): f is File => f instanceof File);
    const docNames = form.getAll("documentNames").map((v) => String(v));

    // 업로드 디렉터리 (공고별 하위 폴더)
    const destDir = path.join(UPLOAD_DIR, openingId || "unknown");
    await mkdir(destDir, { recursive: true });

    const files: { label: string; name: string; path: string; size: number }[] =
      [];
    for (let i = 0; i < fileEntries.length; i++) {
      const file = fileEntries[i];
      if (file.size === 0) continue;
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, error: `${file.name} 파일이 너무 큽니다(최대 10MB).` },
          { status: 400 }
        );
      }
      const safeName = `${randomUUID()}-${file.name.replace(/[^\w.\-가-힣]/g, "_")}`;
      const filePath = path.join(destDir, safeName);
      const bytes = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, bytes);
      files.push({
        label: docNames[i] ?? "첨부파일",
        name: file.name,
        path: filePath,
        size: file.size,
      });
    }

    // 공고의 근무지에서 지점 판별 (지점별 알림톡 발송에 사용)
    const opening = await prisma.opening.findUnique({
      where: { id: openingId },
      select: { location: true },
    });
    const branch = resolveBranch(opening?.location);

    // DB 저장
    const application = await prisma.application.create({
      data: {
        openingId,
        openingTitle,
        branch,
        name,
        email,
        phone,
        agreedTerms,
        files,
      },
    });

    // 알림톡: 직원에게 새 지원 알림 + 지원자에게 지원 완료 (미설정 시 자동 스킵)
    await Promise.allSettled([
      notifyNewApplication(application),
      notifyApplicationReceived(application),
    ]);

    return NextResponse.json({ ok: true, id: application.id });
  } catch (err) {
    console.error("[지원 접수 오류]", err);
    return NextResponse.json(
      { ok: false, error: "처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
