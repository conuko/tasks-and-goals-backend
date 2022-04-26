-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
