/*
  Warnings:

  - Added the required column `expiresAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `token` VARCHAR(191) NOT NULL;
