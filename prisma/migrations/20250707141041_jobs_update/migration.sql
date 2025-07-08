/*
  Warnings:

  - Added the required column `available` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverLetter` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expectedSalary` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedIn` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `portfolio` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `Applications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skills` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "available" TEXT NOT NULL,
ADD COLUMN     "coverLetter" TEXT NOT NULL,
ADD COLUMN     "expectedSalary" TEXT NOT NULL,
ADD COLUMN     "experience" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "linkedIn" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "portfolio" TEXT NOT NULL,
ADD COLUMN     "resume" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT NOT NULL;
