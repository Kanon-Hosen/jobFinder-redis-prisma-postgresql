/*
  Warnings:

  - Added the required column `applicationDeadline` to the `Jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceLevel` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "applicationDeadline" TEXT NOT NULL,
ADD COLUMN     "experienceLevel" TEXT NOT NULL;
