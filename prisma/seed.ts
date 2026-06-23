import { PrismaClient } from "@prisma/client";
import { openings } from "../src/data/openings";

const prisma = new PrismaClient();

/**
 * 기존 정적 공고(src/data/openings.ts)를 DB에 시드합니다.
 * id(슬러그)를 그대로 사용해 기존 URL을 유지합니다. 이미 있으면 갱신.
 */
async function main() {
  for (let i = 0; i < openings.length; i++) {
    const o = openings[i];
    const data = {
      title: o.title,
      group: o.group,
      job: o.job,
      location: o.location,
      address: o.address,
      employment: o.employment,
      career: o.career,
      salary: o.salary ?? [],
      workHours: o.workHours ?? [],
      summary: o.summary,
      hot: !!o.hot,
      applyUrl: o.applyUrl ?? null,
      description: o.description ?? null,
      appeal: o.appeal ?? [],
      responsibilities: o.responsibilities ?? [],
      qualifications: o.qualifications ?? [],
      preferred: o.preferred ?? [],
      published: true,
      sortOrder: i,
    };
    await prisma.opening.upsert({
      where: { id: o.id },
      update: data,
      create: { id: o.id, ...data },
    });
    console.log(`seeded: ${o.id} - ${o.title}`);
  }
}

main()
  .then(() => console.log("✓ 공고 시드 완료"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
