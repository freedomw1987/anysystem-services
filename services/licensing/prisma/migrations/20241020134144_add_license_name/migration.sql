-- AlterTable
ALTER TABLE `License` ADD COLUMN `name` ENUM('STANDARD', 'PREMIUM') NOT NULL DEFAULT 'STANDARD';
