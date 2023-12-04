/*
  Warnings:

  - Added the required column `full_desrciption` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course` ADD COLUMN `full_desrciption` LONGTEXT NOT NULL;
