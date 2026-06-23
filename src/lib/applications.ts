import { prisma } from "@/lib/prisma";

export type ApplicationFile = {
  label: string;
  name: string;
  path: string;
  size: number;
};

/** 관리자용: 전체 지원 목록 (최신순) */
export async function getApplications() {
  return prisma.application.findMany({ orderBy: { createdAt: "desc" } });
}

/** 관리자용: 지원 단건 */
export async function getApplication(id: string) {
  return prisma.application.findUnique({ where: { id } });
}
