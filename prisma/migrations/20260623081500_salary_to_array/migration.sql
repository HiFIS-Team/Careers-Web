-- 급여(salary)를 단일 텍스트에서 여러 줄(텍스트 배열)로 변경
ALTER TABLE "Opening" DROP COLUMN "salary",
ADD COLUMN "salary" TEXT[];
