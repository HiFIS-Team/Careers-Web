-- 지도 주소(address)를 필수값으로 변경
-- 기존에 주소가 비어있던 공고는 임시 값으로 채운 뒤 NOT NULL 적용
UPDATE "Opening" SET "address" = '주소 미입력' WHERE "address" IS NULL;
ALTER TABLE "Opening" ALTER COLUMN "address" SET NOT NULL;
