/*
  Warnings:

  - Added the required column `color` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `color` VARCHAR(255) NOT NULL,
    ADD COLUMN `icon` VARCHAR(255) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
