"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notifyApplicationResult } from "@/lib/notify";

/** 서버 액션에서도 관리자 권한 재확인 (방어적) */
async function requireAdmin() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (!email || !admins.includes(email)) {
    throw new Error("Unauthorized");
  }
}

const str = (v: FormDataEntryValue | null) => String(v ?? "").trim();
const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

function parse(formData: FormData) {
  return {
    title: str(formData.get("title")),
    group: str(formData.get("group")),
    job: str(formData.get("job")),
    location: str(formData.get("location")),
    address: str(formData.get("address")) || null,
    employment: str(formData.get("employment")),
    career: str(formData.get("career")),
    summary: str(formData.get("summary")),
    hot: formData.get("hot") === "on",
    published: formData.get("published") === "on",
    applyUrl: str(formData.get("applyUrl")) || null,
    description: str(formData.get("description")) || null,
    appeal: lines(formData.get("appeal")),
    responsibilities: lines(formData.get("responsibilities")),
    qualifications: lines(formData.get("qualifications")),
    preferred: lines(formData.get("preferred")),
    sortOrder: Number(formData.get("sortOrder") || 0),
  };
}

export async function createOpening(formData: FormData) {
  await requireAdmin();
  await prisma.opening.create({ data: parse(formData) });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateOpening(id: string, formData: FormData) {
  await requireAdmin();
  await prisma.opening.update({ where: { id }, data: parse(formData) });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteOpening(id: string) {
  await requireAdmin();
  await prisma.opening.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function togglePublish(id: string, published: boolean) {
  await requireAdmin();
  await prisma.opening.update({ where: { id }, data: { published } });
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---- 지원자 관리 ----

export async function setApplicationStatus(id: string, status: string) {
  await requireAdmin();
  const app = await prisma.application.update({ where: { id }, data: { status } });
  // 합격/불합격으로 변경 시 지원자에게 결과 알림톡 (미설정 시 자동 스킵)
  if (status === "합격" || status === "불합격") {
    await notifyApplicationResult(app, status === "합격");
  }
  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${id}`);
}

export async function deleteApplication(id: string) {
  await requireAdmin();
  await prisma.application.delete({ where: { id } });
  revalidatePath("/admin/applications");
}
