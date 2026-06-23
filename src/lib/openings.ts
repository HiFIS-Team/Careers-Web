import { prisma } from "@/lib/prisma";
import type { Opening, CareerType, EmploymentType, JobGroupKey } from "@/lib/types";

type Row = {
  id: string;
  title: string;
  group: string;
  job: string;
  location: string;
  address: string;
  employment: string;
  career: string;
  salary: string[];
  workHours: string[];
  summary: string;
  hot: boolean;
  applyUrl: string | null;
  description: string | null;
  appeal: string[];
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
};

function toOpening(o: Row): Opening {
  return {
    id: o.id,
    title: o.title,
    group: o.group as JobGroupKey,
    job: o.job,
    location: o.location,
    address: o.address,
    employment: o.employment as EmploymentType,
    career: o.career as CareerType,
    salary: o.salary,
    workHours: o.workHours,
    summary: o.summary,
    hot: o.hot,
    applyUrl: o.applyUrl ?? undefined,
    description: o.description ?? undefined,
    appeal: o.appeal,
    responsibilities: o.responsibilities,
    qualifications: o.qualifications,
    preferred: o.preferred,
  };
}

/** 공개된 공고 목록 (정렬 순서 → 최신순) */
export async function getOpenings(): Promise<Opening[]> {
  const rows = await prisma.opening.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return rows.map(toOpening);
}

/** id로 공개 공고 1건 (없거나 비공개면 null) */
export async function getOpening(id: string): Promise<Opening | null> {
  const row = await prisma.opening.findUnique({ where: { id } });
  if (!row || !row.published) return null;
  return toOpening(row);
}

/** 관리자용: 비공개 포함 전체 공고 (원본 행) */
export async function getAllOpenings() {
  return prisma.opening.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

/** 관리자용: 비공개 포함 단건 (편집용 원본 행) */
export async function getAdminOpening(id: string) {
  return prisma.opening.findUnique({ where: { id } });
}
