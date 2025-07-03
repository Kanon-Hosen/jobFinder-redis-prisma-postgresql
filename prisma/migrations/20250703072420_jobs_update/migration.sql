/*
  Warnings:

  - You are about to drop the column `createAt` on the `Jobs` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Jobs` table. All the data in the column will be lost.
  - Added the required column `company` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "salary" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updateAt" DROP DEFAULT;
