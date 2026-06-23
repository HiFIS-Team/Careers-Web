-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "status" TEXT NOT NULL DEFAULT '접수';

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");
