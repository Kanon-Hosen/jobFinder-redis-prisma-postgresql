/*
  Warnings:

  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SEEKER', 'EMPLOYER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'SEEKER',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
