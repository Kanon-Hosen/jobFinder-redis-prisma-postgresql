/*
  Warnings:

  - Added the required column `workSetting` to the `Jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "workSetting" TEXT NOT NULL;
