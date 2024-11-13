/*
  Warnings:

  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `status` ENUM('REGISTERED', 'ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'REGISTERED',
    MODIFY `role` ENUM('OWNER', 'CUSTOM', 'USER') NOT NULL;
